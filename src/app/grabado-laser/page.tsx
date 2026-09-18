import type { Metadata } from 'next';
import Image from 'next/image';
import { Layout } from '@/components/layout';
import { QuoteForm } from '@/components/forms/QuoteForm';
export const metadata: Metadata = {
  title: 'Grabado láser',
  description: 'Grabado láser de nombres, logos, códigos QR, placas y regalos corporativos.',
};
export default function LaserPage() {
  const uses = [
    'Nombres y fechas',
    'Logos y símbolos',
    'Códigos QR',
    'Seriales y placas',
    'Regalos',
    'Piezas corporativas',
  ];
  return (
    <Layout>
      <section className="container grid items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">
            Precisión que permanece
          </p>
          <h1 className="mt-4 text-5xl font-bold">Grabado láser</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Personalizamos metal y otros materiales con trazos precisos, repetibles y resistentes.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {uses.map((x) => (
              <div key={x} className="rounded-lg bg-stone-100 p-4 text-sm">
                {x}
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src="/productos/Panel decorativo “Árbol de Luz”.png"
            alt="Detalle de trabajo de corte y grabado"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="bg-stone-100 py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold">¿Cómo funciona?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              'Envías el diseño',
              'Validamos el material',
              'Hacemos una prueba',
              'Grabamos y entregamos',
            ].map((x, i) => (
              <div key={x}>
                <span className="text-irons-warm-gold">0{i + 1}</span>
                <h3 className="mt-2 font-bold">{x}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container max-w-5xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Cotiza tu grabado</h2>
        <QuoteForm service="Grabado láser" />
      </section>
    </Layout>
  );
}
