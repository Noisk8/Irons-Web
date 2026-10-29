import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { getAdminUser } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';
import { getQuoteStatusLabel } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function QuotesPage() {
  if (!(await getAdminUser())) redirect('/admin/login');
  const quotes = await prisma.quote.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-7xl">
        <AdminHeader title="Cotizaciones" />
        <section className="overflow-hidden rounded-2xl border bg-white">
          <div className="border-b p-5"><p className="text-sm text-stone-500">Solicitudes recibidas: {quotes.length}</p></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-stone-50 text-stone-500"><tr><th className="p-4">Solicitud</th><th>Cliente</th><th>Pieza</th><th>Ciudad</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>{quotes.map((quote) => <tr key={quote.id} className="border-t transition hover:bg-stone-50"><td className="p-4 font-medium"><Link href={`/admin/cotizaciones/${quote.id}`} className="underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900">{quote.quoteNumber}</Link><span className="mt-1 block max-w-xs truncate text-xs font-normal text-stone-500">{quote.description}</span></td><td>{quote.name}<span className="block text-xs text-stone-500">{quote.email}</span></td><td>{quote.pieceType}</td><td>{quote.deliveryCity || '—'}</td><td>{getQuoteStatusLabel(quote.status)}</td><td>{quote.createdAt.toLocaleDateString('es-CO')}</td></tr>)}</tbody></table>{quotes.length === 0 && <p className="p-6 text-sm text-stone-500">Aún no hay cotizaciones.</p>}</div>
        </section>
      </div>
    </main>
  );
}
