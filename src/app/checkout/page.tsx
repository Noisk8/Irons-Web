import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { Layout } from '@/components/layout';

export const metadata = { title: 'Checkout', description: 'Confirma los datos de entrega de tu pedido.' };

export default function CheckoutPage() {
  return <Layout><section className="container px-4 py-10 sm:py-14"><CheckoutForm /></section></Layout>;
}
