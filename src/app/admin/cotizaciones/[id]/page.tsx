import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { getAdminUser } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';
import { formatDate, formatPrice, getQuoteStatusLabel } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const pieceTypeLabels: Record<string, string> = {
  SHELF: 'Repisa', LAMP: 'Lámpara', DECORATIVE_PANEL: 'Panel decorativo',
  FURNITURE: 'Mueble', SUPPORT: 'Soporte', SIGNAGE: 'Señalética', PLATE: 'Placa',
  PERSONALIZED_GIFT: 'Regalo personalizado', ARCHITECTURAL_PIECE: 'Pieza arquitectónica', OTHER: 'Otro',
};
const materialLabels: Record<string, string> = {
  STEEL: 'Acero', STAINLESS_STEEL: 'Acero inoxidable', ALUMINUM: 'Aluminio', BRASS: 'Bronce',
  COPPER: 'Cobre', CORTEN_STEEL: 'Acero corten', IRON: 'Hierro', OTHER: 'Otro',
};
const finishLabels: Record<string, string> = {
  MATTE_BLACK: 'Negro mate', GLOSSY_BLACK: 'Negro brillante', BRUSHED: 'Cepillado', POLISHED: 'Pulido',
  POWDER_COATED: 'Pintura electrostática', RAW: 'Crudo', PATINA: 'Pátina', CUSTOM: 'Personalizado',
};

function Detail({ label, value }: { label: string; value: string | null }) {
  return <div><dt className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</dt><dd className="mt-1 text-sm text-stone-900">{value || 'No especificado'}</dd></div>;
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminUser())) redirect('/admin/login');
  const { id } = await params;
  const quote = await prisma.quote.findUnique({ where: { id } });
  if (!quote) notFound();

  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <AdminHeader title={`Cotización ${quote.quoteNumber}`} />
        <Link href="/admin/cotizaciones" className="mb-5 inline-block text-sm underline underline-offset-4">← Volver a cotizaciones</Link>
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-6">
            <div><p className="text-sm text-stone-500">Recibida el {formatDate(quote.createdAt)}</p><h2 className="mt-1 text-xl font-semibold">{getQuoteStatusLabel(quote.status)}</h2></div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-900">{getQuoteStatusLabel(quote.status)}</span>
          </div>
          <div className="grid gap-8 p-6 md:grid-cols-2">
            <div className="space-y-5"><h3 className="font-semibold">Datos de contacto</h3><dl className="grid gap-4"><Detail label="Nombre" value={quote.name} /><Detail label="Correo" value={quote.email} /><Detail label="Teléfono / WhatsApp" value={quote.phone} /><Detail label="Ciudad de entrega" value={quote.deliveryCity} /></dl></div>
            <div className="space-y-5"><h3 className="font-semibold">Pieza solicitada</h3><dl className="grid gap-4"><Detail label="Tipo de pieza" value={pieceTypeLabels[quote.pieceType] || quote.pieceType} /><Detail label="Uso" value={quote.usage} /><Detail label="Medidas" value={quote.dimensions} /><Detail label="Material" value={quote.material ? materialLabels[quote.material] || quote.material : null} /><Detail label="Acabado" value={quote.finish ? finishLabels[quote.finish] || quote.finish : null} /><Detail label="Presupuesto estimado" value={quote.estimatedBudget ? formatPrice(String(quote.estimatedBudget)) : null} /><Detail label="Texto para grabar" value={quote.engravingText} /></dl></div>
          </div>
          <div className="border-t p-6"><h3 className="font-semibold">Descripción del cliente</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-stone-700">{quote.description}</p></div>
        </section>
      </div>
    </main>
  );
}
