import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { createEpaycoSession } from '@/lib/payments';
import { expireStaleOrders } from '@/lib/orders';
import { isTrustedAppRequest, privateApiHeaders } from '@/lib/request-security';

export async function POST(req: Request) {
  if (!isTrustedAppRequest(req)) return NextResponse.json({ error: 'Origen no autorizado' }, { status: 403, headers: privateApiHeaders() });
  try {
    const { orderId } = z.object({ orderId: z.string().cuid() }).parse(await req.json());
    await expireStaleOrders();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payments: { where: { status: { in: ['CREATING', 'PENDING', 'APPROVED'] } }, select: { id: true } } },
    });
    if (!order || !['PENDING', 'PAYMENT_INITIATED'].includes(order.status)) return NextResponse.json({ error: 'Pedido no disponible para pago' }, { status: 400, headers: privateApiHeaders() });
    if (order.payments.length > 0) return NextResponse.json({ error: 'Este pedido ya tiene un pago en curso o fue pagado.' }, { status: 400, headers: privateApiHeaders() });
    const payment = await prisma.$transaction(async (tx) => {
      const claimed = await tx.order.updateMany({ where: { id: orderId, status: { in: ['PENDING', 'PAYMENT_INITIATED'] } }, data: { status: 'PAYMENT_INITIATED' } });
      if (claimed.count !== 1) throw new Error('El pago ya está en curso');
      return tx.payment.create({ data: { orderId, method: 'EPAYCO_LINK', amount: order.total, currency: order.currency, status: 'CREATING' } });
    });
    try {
      const session = await createEpaycoSession(payment.id, Number(order.total), order.currency);
      await prisma.$transaction([
        prisma.payment.updateMany({ where: { id: payment.id, status: 'CREATING' }, data: { status: 'PENDING', reference: payment.id, providerId: session.sessionId } }),
      ]);
      return NextResponse.json(session, { status: 201, headers: privateApiHeaders() });
    } catch {
      await prisma.$transaction([
        prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED', errorMessage: 'No se pudo crear la sesión' } }),
        prisma.order.updateMany({ where: { id: orderId, status: 'PAYMENT_INITIATED' }, data: { status: 'PENDING' } }),
      ]);
      return NextResponse.json({ error: 'No fue posible iniciar el pago. Intenta nuevamente.' }, { status: 502, headers: privateApiHeaders() });
    }
  } catch {
    return NextResponse.json({ error: 'Solicitud de pago inválida' }, { status: 400, headers: privateApiHeaders() });
  }
}
