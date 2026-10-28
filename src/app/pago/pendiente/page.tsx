import Link from 'next/link';
import { Clock3, CreditCard, ReceiptText } from 'lucide-react';
import { Layout } from '@/components/layout';
import { formatPrice } from '@/lib/utils';

export const metadata = { title: 'Pago pendiente', description: 'Tu pedido fue registrado y está listo para el pago.' };

export default async function PendingPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; reference?: string; total?: string }>;
}) {
  const { order, reference, total } = await searchParams;
  const amount = Number(total);
  const hasValidAmount = Number.isFinite(amount) && amount > 0;

  return (
    <Layout>
      <section className="container max-w-3xl px-4 py-12 sm:py-20">
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="bg-irons-charcoal p-7 text-white sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-irons-warm-gold text-irons-charcoal"><Clock3 className="h-7 w-7" aria-hidden="true" /></div>
            <p className="mt-7 text-xs font-medium uppercase tracking-[0.24em] text-irons-warm-gold">Pedido registrado</p>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Tu pago está pendiente</h1>
            <p className="mt-4 max-w-xl leading-7 text-stone-300">Guardamos tu pedido. La pasarela de pagos aún está en modo de preparación, por lo que no se ha realizado ningún cobro.</p>
          </div>
          <div className="p-6 sm:p-10">
            <div className="grid gap-4 rounded-2xl bg-stone-100 p-5 text-sm sm:grid-cols-2">
              <div><p className="text-stone-500">Número de pedido</p><p className="mt-1 break-all font-semibold text-irons-charcoal">{order || 'Pendiente de asignación'}</p></div>
              <div><p className="text-stone-500">Total a pagar</p><p className="mt-1 font-semibold text-irons-charcoal">{hasValidAmount ? formatPrice(amount) : 'Por confirmar'}</p></div>
              {reference && <div className="sm:col-span-2"><p className="text-stone-500">Referencia de pago</p><p className="mt-1 break-all font-mono text-xs text-irons-charcoal">{reference}</p></div>}
            </div>
            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><CreditCard className="mb-3 h-5 w-5" aria-hidden="true" />Cuando conectemos ePayco, esta pantalla enviará de forma segura a la plataforma de pago usando la referencia de este pedido.</div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/tienda" className="inline-flex min-h-11 items-center justify-center rounded-md bg-irons-charcoal px-5 py-3 font-medium text-white">Seguir explorando</Link><Link href="/contacto" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-3 font-medium"><ReceiptText className="h-4 w-4" aria-hidden="true" />Consultar mi pedido</Link></div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
