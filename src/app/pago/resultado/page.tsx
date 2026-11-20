import Link from 'next/link';
import { Layout } from '@/components/layout';
import { epaycoPaymentStatus } from '@/lib/epayco';
import { lookupEpayco } from '@/lib/payments';

export const dynamic = 'force-dynamic';

const messages = {
  APPROVED: 'Tu pago fue aprobado. Gracias por tu compra.',
  REJECTED: 'Tu pago fue rechazado. Comunícate con nosotros para intentar nuevamente.',
  FAILED: 'No fue posible completar el pago. Comunícate con nosotros para recibir ayuda.',
  REFUNDED: 'Tu pago fue reversado. El dinero se devolverá a tu medio de pago.',
} as const;

export default async function PaymentResult({ searchParams }: { searchParams: Promise<{ ref_payco?: string }> }) {
  const { ref_payco } = await searchParams;
  let message = 'Estamos esperando la confirmación de tu pago. Si acabas de pagar, vuelve a consultar en unos minutos.';
  if (ref_payco) {
    try {
      // The status comes from ePayco's server-side query, not from the URL. The webhook updates the order separately.
      const status = epaycoPaymentStatus(await lookupEpayco(ref_payco));
      if (status && status in messages) message = messages[status as keyof typeof messages];
    } catch { /* A temporary error keeps the pending message. */ }
  }
  return <Layout><section className="container mx-auto max-w-2xl px-4 py-16"><h1 className="text-3xl font-bold">Resultado de tu pago</h1><p className="mt-5 leading-7">{message}</p><Link className="mt-8 inline-block underline" href="/tienda">Volver a la tienda</Link></section></Layout>;
}
