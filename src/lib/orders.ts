import type { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';

type Tx = Prisma.TransactionClient;

const PAYMENT_TIMEOUT_MS = 30 * 60 * 1000;
const ORDER_TIMEOUT_MS = 60 * 60 * 1000;

/** Returns the stock held by an order's items to the catalog. Call only after a status transition that succeeded. */
export async function releaseOrderStock(tx: Tx, orderId: string) {
  const items = await tx.orderItem.findMany({ where: { orderId }, select: { productId: true, quantity: true } });
  for (const item of items) {
    await tx.product.update({ where: { id: item.productId }, data: { stock: { increment: item.quantity } } });
  }
}

/**
 * Takes the stock again for an order that was released but later approved.
 * The stock can go negative if other customers bought the units meanwhile; that is logged for manual review.
 */
export async function reserveOrderStock(tx: Tx, orderId: string) {
  const items = await tx.orderItem.findMany({ where: { orderId }, select: { productId: true, quantity: true } });
  for (const item of items) {
    const product = await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
    if (product.stock < 0) console.error(`Stock negativo tras aprobar el pedido ${orderId}; revisar inventario del producto ${item.productId}`);
  }
}

/** Frees orders and payment sessions that were never completed, so their stock returns to the catalog and the customer can pay again. */
export async function expireStaleOrders() {
  await prisma.payment.updateMany({
    where: { status: { in: ['CREATING', 'PENDING'] }, createdAt: { lt: new Date(Date.now() - PAYMENT_TIMEOUT_MS) } },
    data: { status: 'FAILED', errorMessage: 'Sesión de pago expirada' },
  });

  const stale = await prisma.order.findMany({
    where: {
      status: { in: ['PENDING', 'PAYMENT_INITIATED'] },
      createdAt: { lt: new Date(Date.now() - ORDER_TIMEOUT_MS) },
      payments: { none: { status: { in: ['CREATING', 'PENDING', 'APPROVED'] } } },
    },
    select: { id: true },
  });

  for (const { id } of stale) {
    await prisma.$transaction(async (tx) => {
      const cancelled = await tx.order.updateMany({ where: { id, status: { in: ['PENDING', 'PAYMENT_INITIATED'] } }, data: { status: 'CANCELLED' } });
      if (cancelled.count === 1) await releaseOrderStock(tx, id);
    });
  }
}
