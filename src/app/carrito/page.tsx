'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Layout } from '@/components/layout';
import { useCartStore } from '@/store/cart';
import { calculateShipping } from '@/lib/commerce';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);

  return (
    <Layout>
      <section className="container px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">Tu carrito</h1>
        {!items.length ? (
          <div className="py-20 text-center sm:py-24"><p className="mb-6 text-gray-500">Tu carrito está vacío.</p><Link href="/tienda" className="inline-flex rounded-md bg-irons-charcoal px-6 py-3 text-white">Explorar tienda</Link></div>
        ) : (
          <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
            <div className="min-w-0 space-y-4">
              {items.map((item) => (
                <article key={item.id} className="grid gap-4 rounded-xl border bg-white p-4 sm:grid-cols-[112px_minmax(0,1fr)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:aspect-square sm:w-28"><Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width:640px) 100vw, 112px" /></div>
                  <div className="flex min-w-0 flex-col justify-between gap-5">
                    <div className="flex items-start justify-between gap-3"><div className="min-w-0"><Link href={`/producto/${item.slug}`} className="block break-words font-semibold">{item.name}</Link><p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)}</p></div><button onClick={() => removeItem(item.id)} className="shrink-0 rounded-md p-2 hover:bg-stone-100" aria-label={`Eliminar ${item.name}`}><Trash2 className="h-5 w-5" /></button></div>
                    <div className="flex w-fit items-center overflow-hidden rounded-full border"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="grid h-10 w-10 place-items-center" aria-label="Reducir cantidad"><Minus className="h-4 w-4" /></button><span className="min-w-8 text-center">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="grid h-10 w-10 place-items-center" aria-label="Aumentar cantidad"><Plus className="h-4 w-4" /></button></div>
                  </div>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-xl bg-irons-charcoal p-5 text-white sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold">Resumen</h2>
              <div className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4"><span>Subtotal</span><span className="text-right">{formatPrice(subtotal)}</span></div><div className="flex justify-between gap-4"><span>Envío estimado</span><span className="text-right">{shipping ? formatPrice(shipping) : 'Gratis'}</span></div><div className="flex justify-between gap-4 border-t pt-4 text-lg font-bold"><span>Total</span><span className="text-right">{formatPrice(subtotal + shipping)}</span></div></div>
              <p className="mt-5 text-xs text-stone-400">El servidor recalculará precios e inventario antes del pago.</p>
              <button className="mt-6 min-h-12 w-full rounded-md bg-irons-warm-gold px-4 py-3 font-semibold text-black">Continuar al checkout (demo)</button>
            </aside>
          </div>
        )}
      </section>
    </Layout>
  );
}
