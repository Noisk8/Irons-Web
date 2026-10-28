import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, HelpCircle, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout';

const pages = {
  faq: {
    title: 'Preguntas frecuentes',
    description: 'Resolvemos dudas sobre diseños, tiempos de fabricación, envíos y personalización.',
    icon: HelpCircle,
    content:
      'Cada pieza puede requerir una validación de medidas, material y acabado. Escríbenos para confirmar disponibilidad, tiempos y opciones de personalización antes de fabricar.',
  },
  envios: {
    title: 'Envíos y entregas',
    description: 'Información sobre cobertura, despacho y entrega de tus piezas.',
    icon: Truck,
    content:
      'Realizamos envíos nacionales. El tiempo final de entrega se confirma según la ciudad de destino, el tamaño de la pieza y el proceso de fabricación requerido.',
  },
  devoluciones: {
    title: 'Devoluciones',
    description: 'Acompañamiento para revisar cualquier novedad con tu pedido.',
    icon: PackageCheck,
    content:
      'Si tu pedido presenta una novedad, contáctanos con el número de orden y fotografías del producto. Revisaremos cada caso para darte una solución adecuada.',
  },
  garantia: {
    title: 'Garantía',
    description: 'Nuestro compromiso con la calidad de cada pieza Irons.',
    icon: ShieldCheck,
    content:
      'Todas las piezas se revisan antes del despacho. La garantía aplicable depende del material, acabado, uso e instalación; te confirmaremos las condiciones de tu proyecto al cotizar.',
  },
  terminos: {
    title: 'Términos y condiciones',
    description: 'Condiciones generales para compras y proyectos personalizados.',
    icon: FileText,
    content:
      'Los valores, materiales, acabados y tiempos de fabricación se confirman en la cotización aprobada. Las piezas personalizadas se producen tras validar sus especificaciones finales.',
  },
  privacidad: {
    title: 'Política de privacidad',
    description: 'Cómo usamos los datos que compartes al contactarnos.',
    icon: ShieldCheck,
    content:
      'Usamos tus datos de contacto exclusivamente para responder solicitudes, preparar cotizaciones y gestionar pedidos. No compartimos tu información con terceros ajenos a la operación del servicio.',
  },
} as const;

type InformationSlug = keyof typeof pages;

function isInformationSlug(slug: string): slug is InformationSlug {
  return slug in pages;
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isInformationSlug(slug)) return {};
  return { title: pages[slug].title, description: pages[slug].description };
}

export default async function InformationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isInformationSlug(slug)) notFound();
  const page = pages[slug];
  const Icon = page.icon;

  return (
    <Layout>
      <section className="bg-irons-charcoal px-4 py-16 text-white sm:py-20">
        <div className="container max-w-4xl">
          <Icon className="h-8 w-8 text-irons-warm-gold" aria-hidden="true" />
          <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">{page.description}</p>
        </div>
      </section>
      <section className="container max-w-4xl px-4 py-14 sm:py-20">
        <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-10">
          <p className="text-lg leading-8 text-irons-metal-dark">{page.content}</p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-irons-charcoal px-5 py-3 font-medium text-white transition-colors hover:bg-irons-charcoal-light"
          >
            Resolver una inquietud
            <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
