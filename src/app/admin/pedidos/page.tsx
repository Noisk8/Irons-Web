import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { getAdminUser } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';
import { formatPrice, getOrderStatusLabel } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  if (!(await getAdminUser())) redirect('/admin/login');
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { items: { select: { name: true, quantity: true } }, payments: { select: { status: true, providerId: true }, orderBy: { createdAt: 'desc' }, take: 1 } },
  });
  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-7xl">
        <AdminHeader title="Pedidos" />
        <section className="overflow-hidden rounded-2xl border bg-white">
          <div className="border-b p-5"><p className="text-sm text-stone-500">Pedidos recientes: {orders.length}</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-stone-50 text-stone-500"><tr><th className="p-4">Pedido</th><th>Cliente</th><th>Productos</th><th>Total</th><th>Estado</th><th>Pago ePayco</th><th>Fecha</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t transition hover:bg-stone-50"><td className="p-4 font-medium">{order.orderNumber}</td><td>{(order.shippingAddress as { name?: string } | null)?.name || '—'}<span className="block text-xs text-stone-500">{order.email}</span></td><td>{order.items.map((item) => `${item.quantity} × ${item.name}`).join(', ')}</td><td>{formatPrice(Number(order.total))}</td><td>{getOrderStatusLabel(order.status)}</td><td>{order.payments[0] ? `${order.payments[0].status}${order.payments[0].providerId ? ` · ${order.payments[0].providerId}` : ''}` : '—'}</td><td>{order.createdAt.toLocaleDateString('es-CO')}</td></tr>)}</tbody></table>{orders.length === 0 && <p className="p-6 text-sm text-stone-500">Aún no hay pedidos.</p>}</div>
        </section>
      </div>
    </main>
  );
}
