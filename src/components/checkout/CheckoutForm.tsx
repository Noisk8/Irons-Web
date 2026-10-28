'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { calculateShipping } from '@/lib/commerce';
import { formatPrice } from '@/lib/utils';

type OrderResponse = {
  id: string;
  orderNumber: string;
  total: number;
  currency: 'COP';
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCartReady, setIsCartReady] = useState(false);
  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => setIsCartReady(true), 0);
    return () => window.clearTimeout(hydrationTimer);
  }, []);
  const requiresQuote = useMemo(() => items.some((item) => item.requiresQuote), [items]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length || requiresQuote) return;
    setError('');
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);
    const shippingAddress = {
      name: String(form.get('name') || ''),
      address: String(form.get('address') || ''),
      city: String(form.get('city') || ''),
      department: String(form.get('department') || ''),
      notes: String(form.get('notes') || ''),
    };

    try {
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.get('email'),
          phone: form.get('phone'),
          shippingAddress,
          items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        }),
      });
      const order = (await orderResponse.json()) as OrderResponse & { error?: string };
      if (!orderResponse.ok) throw new Error(order.error || 'No fue posible crear el pedido.');

      const paymentResponse = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, amount: order.total, currency: order.currency }),
      });
      const payment = (await paymentResponse.json()) as { reference?: string; error?: string };
      if (!paymentResponse.ok || !payment.reference) {
        throw new Error(payment.error || 'El pedido fue creado, pero no se pudo preparar el pago.');
      }

      clearCart();
      const query = new URLSearchParams({
        order: order.orderNumber,
        reference: payment.reference,
        total: String(order.total),
      });
      router.push(`/pago/pendiente?${query.toString()}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ocurrió un error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isCartReady) {
    return <div className="rounded-2xl border bg-white p-8 text-center text-irons-metal-medium shadow-sm sm:p-12" role="status">Cargando checkout…</div>;
  }

  if (!items.length) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm sm:p-12">
        <h1 className="font-display text-3xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-3 text-irons-metal-medium">Agrega una pieza antes de iniciar el checkout.</p>
        <Link href="/tienda" className="mt-7 inline-flex min-h-11 items-center rounded-md bg-irons-charcoal px-5 py-3 font-medium text-white">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
      <section className="rounded-2xl border bg-white p-5 shadow-sm sm:p-8">
        <Link href="/carrito" className="inline-flex items-center gap-2 text-sm text-irons-metal-medium hover:text-irons-charcoal">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al carrito
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Datos de entrega</h1>
        <p className="mt-2 text-sm text-irons-metal-medium">Confirma tus datos para registrar el pedido.</p>

        {requiresQuote && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Hay productos que requieren cotización. Retíralos del carrito o solicítalos desde su ficha antes de continuar.
          </div>
        )}
        {error && <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium sm:col-span-2">Nombre completo<input required name="name" autoComplete="name" className="mt-2 h-12 w-full rounded-md border px-3" /></label>
          <label className="text-sm font-medium">Correo electrónico<input required type="email" name="email" autoComplete="email" className="mt-2 h-12 w-full rounded-md border px-3" /></label>
          <label className="text-sm font-medium">Teléfono o WhatsApp<input required name="phone" inputMode="tel" autoComplete="tel" className="mt-2 h-12 w-full rounded-md border px-3" /></label>
          <label className="text-sm font-medium sm:col-span-2">Dirección de entrega<input required name="address" autoComplete="street-address" className="mt-2 h-12 w-full rounded-md border px-3" /></label>
          <label className="text-sm font-medium">Ciudad<input required name="city" autoComplete="address-level2" className="mt-2 h-12 w-full rounded-md border px-3" /></label>
          <label className="text-sm font-medium">Departamento<input required name="department" autoComplete="address-level1" className="mt-2 h-12 w-full rounded-md border px-3" /></label>
          <label className="text-sm font-medium sm:col-span-2">Indicaciones de entrega <span className="font-normal text-irons-metal-light">(opcional)</span><textarea name="notes" rows={3} className="mt-2 w-full rounded-md border p-3" /></label>
        </div>
      </section>

      <aside className="h-fit rounded-2xl bg-irons-charcoal p-5 text-white sm:p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-2xl font-bold">Resumen del pedido</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 border-b border-white/10 pb-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white/10"><Image src={item.image} alt="" fill sizes="64px" className="object-cover" /></div>
              <div className="min-w-0 flex-1"><p className="break-words text-sm font-medium">{item.name}</p><p className="mt-1 text-xs text-stone-400">Cantidad: {item.quantity}</p></div>
              <strong className="shrink-0 text-sm">{formatPrice(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-sm text-stone-300"><div className="flex justify-between gap-4"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between gap-4"><span>Envío</span><span>{shipping ? formatPrice(shipping) : 'Gratis'}</span></div><div className="flex justify-between gap-4 border-t border-white/15 pt-4 text-lg font-bold text-white"><span>Total</span><span>{formatPrice(total)}</span></div></div>
        <button disabled={isSubmitting || requiresQuote} className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-irons-warm-gold px-4 py-3 font-semibold text-irons-charcoal disabled:cursor-not-allowed disabled:opacity-50">
          <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? 'Creando pedido…' : 'Continuar al pago'}
        </button>
        <p className="mt-4 text-center text-xs leading-5 text-stone-400">No se realizará ningún cobro hasta conectar la pasarela de pagos.</p>
      </aside>
    </form>
  );
}
