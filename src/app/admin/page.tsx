import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Package, ShoppingBag, Tags, FileText } from 'lucide-react';
import { getAdminUser } from '@/lib/admin-auth';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!isSupabaseConfigured()) redirect('/admin/configuracion');
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
  const [products, categories, orders, quotes] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.quote.count(),
  ]);
  const cards = [
    { label: 'Productos', value: products, icon: Package, href: '/admin/productos' },
    { label: 'Categorías', value: categories, icon: Tags, href: '/admin/categorias' },
    { label: 'Pedidos', value: orders, icon: ShoppingBag, href: '/admin' },
    { label: 'Cotizaciones', value: quotes, icon: FileText, href: '/admin' },
  ];
  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[.3em] text-amber-700">Administración</p>
            <h1 className="mt-2 text-3xl font-bold">Panel Irons</h1>
            <p className="mt-1 text-sm text-stone-500">Sesión: {user.email}</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-lg border bg-white px-4 py-2 text-sm">Cerrar sesión</button>
          </form>
        </header>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, href }) => (
            <Link
              href={href}
              key={label}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon className="h-5 w-5 text-amber-700" />
              <p className="mt-5 text-3xl font-bold">{value}</p>
              <p className="text-sm text-stone-500">{label}</p>
            </Link>
          ))}
        </section>
        <section className="mt-8 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Gestión de catálogo</h2>
          <p className="mt-2 text-sm text-stone-600">
            Crea y edita productos, inventario, precios, imágenes y categorías.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/productos"
              className="rounded-lg bg-stone-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Administrar productos
            </Link>
            <Link
              href="/admin/categorias"
              className="rounded-lg border px-5 py-3 text-sm font-semibold"
            >
              Administrar categorías
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
