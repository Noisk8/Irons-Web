import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';
import { Layout } from '@/components/layout';
import { ClearCartOnApproval } from '@/components/checkout/ClearCartOnApproval';
import { epaycoPaymentStatus } from '@/lib/epayco';
import { lookupEpayco } from '@/lib/payments';
import { syncEpaycoTransaction } from '@/lib/payment-sync';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const messages = {
  APPROVED: 'Tu pago fue aprobado. Gracias por tu compra.',
  REJECTED: 'Tu pago fue rechazado. Comunícate con nosotros para intentar nuevamente.',
  FAILED: 'No fue posible completar el pago. Comunícate con nosotros para recibir ayuda.',
  REFUNDED: 'Tu pago fue reversado. El dinero se devolverá a tu medio de pago.',
} as const;

function maskEmail(email: string) {
  const [name, domain] = email.split('@');
  return `${name.slice(0, 2)}${'*'.repeat(Math.max(name.length - 2, 1))}@${domain}`;
}

function buyerName(shippingAddress: unknown) {
  return ((shippingAddress as { name?: string } | null)?.name ?? '').trim();
}

export default async function PaymentResult({ searchParams }: { searchParams: Promise<{ ref_payco?: string }> }) {
  const { ref_payco } = await searchParams;
  let status: keyof typeof messages | undefined;
  let order: { orderNumber: string; email: string; name: string } | null = null;
  if (ref_payco) {
    try {
      // The status comes from ePayco's server-side query, not from the URL. It is also applied to the order,
      // so the admin stays in sync even if the webhook was not delivered.
      const transaction = await lookupEpayco(ref_payco);
      await syncEpaycoTransaction(transaction);
      const current = epaycoPaymentStatus(transaction);
      if (current && current in messages) status = current as keyof typeof messages;
      const invoice = transaction.x_id_invoice || transaction.x_id_factura;
      const payment = invoice ? await prisma.payment.findUnique({ where: { id: invoice }, include: { order: true } }) : null;
      if (payment) order = { orderNumber: payment.order.orderNumber, email: payment.order.email, name: buyerName(payment.order.shippingAddress) };
    } catch { /* A temporary error keeps the pending message. */ }
  }

  if (status === 'APPROVED' && order) {
    const firstName = order.name.split(/\s+/)[0];
    return (
      <Layout>
        <ClearCartOnApproval />
        <section className="container mx-auto max-w-2xl px-4 py-16">
          <CheckCircle2 className="h-14 w-14 text-green-700" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-bold">¡Pago aprobado{firstName ? `, ${firstName}` : ''}!</h1>
          <p className="mt-4 leading-7">Gracias por tu compra. Tu pedido <strong>{order.orderNumber}</strong> está confirmado.</p>
          <div className="mt-8 flex gap-4 rounded-xl border border-stone-200 bg-white p-5">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
            <div className="text-sm leading-6">
              <p className="font-semibold">Revisa tu correo</p>
              <p className="mt-1 text-stone-700">Enviamos la confirmación a <strong>{maskEmail(order.email)}</strong>. Busca también el correo de ePayco para validar tu transacción y guarda ese comprobante. Si no lo ves en unos minutos, revisa la carpeta de spam.</p>
            </div>
          </div>
          <Link className="mt-8 inline-block underline" href="/tienda">Volver a la tienda</Link>
        </section>
      </Layout>
    );
  }

  const message = status ? messages[status] : 'Estamos esperando la confirmación de tu pago. Si acabas de pagar, vuelve a consultar en unos minutos.';
  return <Layout><section className="container mx-auto max-w-2xl px-4 py-16"><h1 className="text-3xl font-bold">Resultado de tu pago</h1><p className="mt-5 leading-7">{message}</p><Link className="mt-8 inline-block underline" href="/tienda">Volver a la tienda</Link></section></Layout>;
}
