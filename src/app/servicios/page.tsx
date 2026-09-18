import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, DraftingCompass, ScanLine } from 'lucide-react';
import { Layout } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Diseño y fabricación de piezas a medida y grabado láser de precisión.',
};

const services = [
  {
    title: 'Diseña tu pieza',
    description:
      'Desarrollamos piezas desde una medida, un boceto o una necesidad concreta. Definimos material, acabado y sistema de instalación contigo.',
    href: '/disena-tu-pieza',
    image: '/productos/Mesa auxiliar - “Vinyl Stand”.png',
    icon: DraftingCompass,
    action: 'Empezar un proyecto',
  },
  {
    title: 'Grabado láser',
    description:
      'Personalización precisa de nombres, fechas, logos, seriales, placas y códigos QR para proyectos personales o corporativos.',
    href: '/grabado-laser',
    image: '/productos/Panel decorativo “Árbol de Luz”.png',
    icon: ScanLine,
    action: 'Cotizar un grabado',
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      <section className="bg-irons-charcoal px-4 py-24 text-white">
        <div className="container">
          <p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">Servicios Irons</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold md:text-7xl">
            Ideas únicas, ejecutadas con precisión.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
            Del diseño a medida al detalle grabado: acompañamos cada proyecto desde la conversación
            inicial hasta la entrega.
          </p>
        </div>
      </section>
      <section className="container space-y-10 px-4 py-20">
        {services.map(({ title, description, href, image, icon: Icon, action }, index) => (
          <article
            key={title}
            className="grid overflow-hidden rounded-2xl border bg-white lg:grid-cols-2"
          >
            <div className={`relative min-h-80 ${index % 2 ? 'lg:order-2' : ''}`}>
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <Icon className="h-8 w-8 text-irons-warm-gold" />
              <h2 className="mt-5 text-4xl font-bold">{title}</h2>
              <p className="mt-5 leading-7 text-gray-600">{description}</p>
              <Link
                href={href}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-irons-charcoal px-6 py-3 text-white"
              >
                {action}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
