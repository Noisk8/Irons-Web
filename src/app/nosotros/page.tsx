import type { Metadata } from 'next';
import Image from 'next/image';
import { Layout } from '@/components/layout';
export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Diseño, metalistería y fabricación local para hogares y empresas.',
};
export default function AboutPage() {
  return (
    <Layout>
      <section className="container grid items-center gap-12 px-4 py-16 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">Hecho localmente</p>
          <h1 className="mt-4 text-5xl font-bold">Diseño preciso. Oficio humano.</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Irons combina diseño contemporáneo, metalistería y tecnología de corte y grabado para
            crear soluciones honestas, funcionales y duraderas.
          </p>
          <p className="mt-4 leading-7 text-gray-600">
            Trabajamos con hogares, restaurantes, hoteles, oficinas y equipos de arquitectura. Cada
            proyecto parte de escuchar el espacio y termina con una pieza bien resuelta.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="/productos/Lámpara mural geométrica.png"
            alt="Lámpara diseñada y fabricada por Irons"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>
      <section className="bg-irons-charcoal py-16 text-white">
        <div className="container grid gap-8 px-4 md:grid-cols-3">
          {[
            ['Diseño', 'Proporción, función y detalle antes de fabricar.'],
            ['Fabricación local', 'Procesos cercanos y control de calidad pieza a pieza.'],
            ['Personalización', 'Medidas, materiales y acabados ajustados al proyecto.'],
          ].map(([t, d]) => (
            <div key={t}>
              <h2 className="text-2xl font-bold">{t}</h2>
              <p className="mt-3 text-stone-400">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
