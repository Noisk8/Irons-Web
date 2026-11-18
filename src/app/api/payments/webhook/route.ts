import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { epaycoPaymentStatus, isValidEpaycoConfirmation, type EpaycoConfirmation } from '@/lib/epayco';
import { lookupEpayco, paymentConfig } from '@/lib/payments';

export const runtime = 'nodejs';

async function confirmation(request: Request) {
  try {
    const type = request.headers.get('content-type') ?? '';
    const payload: EpaycoConfirmation = request.method === 'GET'
      ? Object.fromEntries(new URL(request.url).searchParams.entries())
      : type.includes('application/json')
        ? Object.fromEntries(Object.entries(await request.json() as Record<string, unknown>).map(([key, value]) => [key, String(value)]))
        : Object.fromEntries((await request.formData()).entries()) as EpaycoConfirmation;
    if (!isValidEpaycoConfirmation(payload)) return NextResponse.json({ error: 'Firma inválida' }, { status: 401 });

    // The signature does not cover the invoice or response code. Obtain both
    // directly from ePayco before applying any state change.
    const verified = await lookupEpayco(payload.x_ref_payco!);
    const invoice = verified.x_id_invoice || verified.x_id_factura;
    const status = epaycoPaymentStatus(verified);
    if (!invoice || !status || verified.x_ref_payco !== payload.x_ref_payco || verified.x_transaction_id !== payload.x_transaction_id || verified.x_currency_code !== payload.x_currency_code || !verified.x_amount || !new Prisma.Decimal(verified.x_amount).equals(payload.x_amount!)) {
      return NextResponse.json({ error: 'Transacción no coincidente' }, { status: 400 });
    }
    const test = paymentConfig().EPAYCO_TEST_MODE === 'true';
    if (!['true', 'false', '1', '0'].includes(verified.x_test_request?.toLowerCase()) || ['true', '1'].includes(verified.x_test_request.toLowerCase()) !== test) {
      return NextResponse.json({ error: 'Entorno no coincidente' }, { status: 400 });
    }
    const payment = await prisma.payment.findUnique({ where: { id: invoice }, include: { order: true } });
    if (!payment || payment.currency !== verified.x_currency_code || !payment.amount.equals(verified.x_amount) || !payment.order.total.equals(payment.amount)) {
      return NextResponse.json({ error: 'Pedido no coincidente' }, { status: 400 });
    }
    await prisma.$transaction(async (tx) => {
      // Approval is terminal here; repeated or delayed notifications cannot undo it.
      if (status === 'APPROVED') {
        await tx.order.updateMany({ where: { id: payment.orderId, status: { in: ['PENDING', 'PAYMENT_INITIATED', 'REJECTED', 'FAILED'] } }, data: { status: 'APPROVED', paidAt: new Date() } });
      } else if (status !== 'PENDING') {
        await tx.order.updateMany({ where: { id: payment.orderId, status: { in: ['PENDING', 'PAYMENT_INITIATED'] } }, data: { status } });
      }
      await tx.payment.updateMany({ where: { id: payment.id, status: { not: 'APPROVED' } }, data: { status, providerId: verified.x_ref_payco, processedAt: status === 'PENDING' ? null : new Date() } });
    });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('No se pudo procesar la confirmación de ePayco:', error instanceof Error ? error.message : 'error');
    return NextResponse.json({ error: 'No fue posible procesar la confirmación' }, { status: 503 });
  }
}
export const POST = confirmation;
export const GET = confirmation;
