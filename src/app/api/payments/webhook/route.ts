import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { isValidEpaycoConfirmation, type EpaycoConfirmation } from '@/lib/epayco';
import { lookupEpayco } from '@/lib/payments';
import { syncEpaycoTransaction } from '@/lib/payment-sync';

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
    if (!verified.x_amount || verified.x_ref_payco !== payload.x_ref_payco || verified.x_transaction_id !== payload.x_transaction_id || verified.x_currency_code !== payload.x_currency_code || !new Prisma.Decimal(verified.x_amount).equals(payload.x_amount!)) {
      return NextResponse.json({ error: 'Transacción no coincidente' }, { status: 400 });
    }
    const error = await syncEpaycoTransaction(verified);
    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('No se pudo procesar la confirmación de ePayco:', error instanceof Error ? error.message : 'error');
    return NextResponse.json({ error: 'No fue posible procesar la confirmación' }, { status: 503 });
  }
}
export const POST = confirmation;
export const GET = confirmation;
