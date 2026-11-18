import Link from 'next/link';
import { Layout } from '@/components/layout';
import { lookupEpayco } from '@/lib/payments';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function PaymentResult({ searchParams }: { searchParams: Promise<{ ref_payco?: string }> }) {
  const { ref_payco } = await searchParams;
  let message = 'Estamos esperando la confirmación de tu pago. Si acabas de pagar, vuelve a consultar en unos minutos.';
  if (ref_payco) {
    try {
      const transaction = await lookupEpayco(ref_payco);
      const invoice = transaction.x_id_invoice || transaction.x_id_factura;
      const payment = invoice ? await prisma.payment.findUnique({ where: { id: invoice }, select: { status: true, providerId: true } }) : null;
      if (payment?.providerId === ref_payco) {
        if (payment.status === 'APPROVED') message = 'Tu pago fue aprobado. Gracias por tu compra.';
        else if (payment.status === 'REJECTED') message = 'Tu pago fue rechazado. Comunícate con nosotros para intentar nuevamente.';
        else if (payment.status === 'FAILED') message = 'No fue posible completar el pago. Comunícate con nosotros para recibir ayuda.';
      }
    } catch { /* The webhook remains authoritative; a temporary error stays pending. */ }
  }
  return <Layout><section className="container mx-auto max-w-2xl px-4 py-16"><h1 className="text-3xl font-bold">Resultado de tu pago</h1><p className="mt-5 leading-7">{message}</p><Link className="mt-8 inline-block underline" href="/tienda">Volver a la tienda</Link></section></Layout>;
}
