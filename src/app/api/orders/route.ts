import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { calculateShipping } from '@/lib/commerce';
import { checkoutDetailsSchema, checkoutFieldErrors } from '@/lib/checkout-validation';
import { generateOrderNumber } from '@/lib/utils';
import { isTrustedAppRequest, privateApiHeaders } from '@/lib/request-security';

const input = checkoutDetailsSchema.extend({
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(20) })).min(1).max(50),
});

export async function POST(req: Request) {
  if (!isTrustedAppRequest(req)) return NextResponse.json({ error: 'Origen no autorizado' }, { status: 403, headers: privateApiHeaders() });
  // Keep live charges disabled until the complete ePayco sandbox flow is verified.
  if (process.env.EPAYCO_TEST_MODE !== 'true') return NextResponse.json({ error: 'Los pagos están disponibles únicamente en modo de prueba.' }, { status: 503, headers: privateApiHeaders() });
  try {
    const data = input.parse(await req.json());
    const quantities = new Map<string, number>();
    for (const item of data.items) quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
    if ([...quantities.values()].some((quantity) => quantity > 20)) throw new Error('Cantidad inválida');
    const products = await prisma.product.findMany({
      where: { id: { in: [...quantities.keys()] }, status: 'ACTIVE', requiresQuote: false, category: { isActive: true } },
    });
    if (products.length !== quantities.size) throw new Error('Producto no disponible');
    const items = products.map((product) => {
      const quantity = quantities.get(product.id)!;
      const price = Number(product.price);
      if (product.stock < quantity || !Number.isFinite(price) || price <= 0) throw new Error('Producto no disponible');
      return { productId: product.id, name: product.name, price, quantity, total: price * quantity };
    });
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const shippingCost = calculateShipping(subtotal);
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(), email: data.email, phone: data.phone,
        shippingAddress: data.shippingAddress, subtotal, shippingCost, total: subtotal + shippingCost,
        items: { create: items },
      },
    });
    return NextResponse.json({ id: order.id, orderNumber: order.orderNumber, status: order.status, total: Number(order.total), currency: order.currency }, { status: 201, headers: privateApiHeaders() });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Revisa los campos indicados.', fieldErrors: checkoutFieldErrors(error) }, { status: 400, headers: privateApiHeaders() });
    console.error('No fue posible crear el pedido:', error);
    return NextResponse.json({ error: 'No fue posible crear el pedido. Revisa productos, inventario y datos.' }, { status: 400, headers: privateApiHeaders() });
  }
}
