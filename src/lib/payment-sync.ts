import prisma from '@/lib/prisma';
import { epaycoPaymentStatus, type EpaycoConfirmation } from '@/lib/epayco';
import { paymentConfig } from '@/lib/payments';
import { releaseOrderStock, reserveOrderStock } from '@/lib/orders';

/**
 * Applies a transaction state reported by ePayco's server-side query to the order and payment.
 * Safe to run more than once: each transition only happens from the states it expects.
 * Returns an error message when the transaction does not match a payment, or null when applied.
 */
export async function syncEpaycoTransaction(verified: EpaycoConfirmation): Promise<string | null> {
  const invoice = verified.x_id_invoice || verified.x_id_factura;
  const status = epaycoPaymentStatus(verified);
  if (!invoice || !status || !verified.x_ref_payco || !verified.x_transaction_id || !verified.x_currency_code || !verified.x_amount) return 'Transacción no coincidente';

  const test = paymentConfig().EPAYCO_TEST_MODE === 'true';
  const testRequest = verified.x_test_request?.toLowerCase() ?? '';
  if (!['true', 'false', '1', '0'].includes(testRequest) || ['true', '1'].includes(testRequest) !== test) return 'Entorno no coincidente';

  const payment = await prisma.payment.findUnique({ where: { id: invoice }, include: { order: true } });
  if (!payment || payment.currency !== verified.x_currency_code || !payment.amount.equals(verified.x_amount) || !payment.order.total.equals(payment.amount)) return 'Pedido no coincidente';

  const now = new Date();
  await prisma.$transaction(async (tx) => {
    // Stock is reserved when the order is created. It is released exactly once, on the transition that closes the order.
    if (status === 'APPROVED') {
      const approved = await tx.order.updateMany({ where: { id: payment.orderId, status: { in: ['PENDING', 'PAYMENT_INITIATED'] } }, data: { status: 'APPROVED', paidAt: now } });
      if (approved.count === 0) {
        const reopened = await tx.order.updateMany({ where: { id: payment.orderId, status: { in: ['REJECTED', 'FAILED', 'CANCELLED', 'REFUNDED'] } }, data: { status: 'APPROVED', paidAt: now } });
        if (reopened.count === 1) await reserveOrderStock(tx, payment.orderId);
      }
    } else if (status === 'REFUNDED') {
      const refunded = await tx.order.updateMany({ where: { id: payment.orderId, status: 'APPROVED' }, data: { status: 'REFUNDED' } });
      if (refunded.count === 1) await releaseOrderStock(tx, payment.orderId);
    } else if (status === 'REJECTED' || status === 'FAILED') {
      const closed = await tx.order.updateMany({ where: { id: payment.orderId, status: { in: ['PENDING', 'PAYMENT_INITIATED'] } }, data: { status } });
      if (closed.count === 1) await releaseOrderStock(tx, payment.orderId);
    }
    await tx.payment.updateMany({
      where: { id: payment.id, ...(status === 'REFUNDED' ? {} : { status: { not: 'APPROVED' } }) },
      data: { status, providerId: verified.x_ref_payco, processedAt: status === 'PENDING' ? null : now },
    });
  });
  return null;
}
