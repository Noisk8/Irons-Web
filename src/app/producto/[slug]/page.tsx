import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Lightbulb, SlidersHorizontal } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Layout } from '@/components/layout';
import { ProductActions } from '@/components/shop/ProductActions';
import { ProductCard } from '@/components/shop/ProductCard';
import { products } from '@/data/products';
import { getCatalogProduct, getCatalogProducts } from '@/lib/catalog';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProduct(slug);
  return product
    ? { title: product.name, description: product.description }
    : { title: 'Producto no encontrado' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalogProducts = await getCatalogProducts();
  const product = catalogProducts.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = catalogProducts
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.categorySlug === product.categorySlug || item.categorySlug === 'decoracion-interior')
    )
    .slice(0, 3);
  const specs = [
    ['Tipo', product.type],
    ['Material', product.material],
    ['Diseño', product.design],
    ['Acabado', product.finish],
    ['Medida estándar', product.dimensions],
    ['Grosor de lámina', product.sheetThickness],
    ['Profundidad instalada', product.installedDepth],
    ['Iluminación', product.lighting],
    ['Temperatura de color', product.colorTemperature],
    ['Alimentación', product.power],
    ['Control', product.control],
    ['Uso', product.usage],
    ['Instalación', product.installation],
    ['Fabricación', product.productionTime],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <Layout>
      <div className="container px-4 py-10">
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/">Inicio</Link> / <Link href="/tienda">Tienda</Link> /{' '}
          <Link href={`/tienda?category=${product.categorySlug}`}>{product.category}</Link> /{' '}
          {product.name}
        </nav>
        <div className="grid gap-10 lg:grid-cols-2">
          <div
            className={`product-shine relative overflow-hidden rounded-2xl bg-stone-100 shadow-xl lg:sticky lg:top-24 ${product.imageOrientation === 'landscape' ? 'aspect-[3/2]' : 'aspect-[4/5]'}`}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-irons-warm-gold">
              {product.category} · Bajo pedido
            </p>
            <h1 className="mt-3 break-words text-3xl font-bold sm:text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-2xl font-semibold">
              {product.requiresQuote ? 'Precio según proyecto' : formatPrice(product.price)}
            </p>
            <p className="mt-6 text-lg leading-8 text-irons-metal-medium">{product.description}</p>
            <dl className="my-8 grid grid-cols-1 gap-x-5 gap-y-4 border-y py-6 text-sm sm:grid-cols-2">
              {specs.slice(0, 8).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-gray-500">{key}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <ProductActions product={product} />
            <a
              href={getWhatsAppUrl(`Hola Irons, quiero consultar y personalizar ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block text-sm underline"
            >
              Consultar disponibilidad por WhatsApp
            </a>
            <p className="mt-6 rounded-lg bg-stone-100 p-4 text-sm">
              Las medidas y especificaciones son una propuesta inicial de catálogo. Se confirman
              según el grosor, peso, sistema LED e instalación final.
            </p>
          </div>
        </div>

        {specs.length > 8 && (
          <section className="py-16">
            <p className="text-xs uppercase tracking-[.25em] text-irons-warm-gold">Ficha técnica</p>
            <h2 className="mt-3 text-3xl font-bold">Especificaciones completas</h2>
            <dl className="mt-8 overflow-hidden rounded-2xl border bg-white">
              {specs.map(([key, value], index) => (
                <div
                  key={key}
                  className={`grid gap-2 p-4 sm:grid-cols-[220px_1fr] ${index % 2 ? 'bg-stone-50' : ''}`}
                >
                  <dt className="font-medium">{key}</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {(product.lightingOptions || product.customizations) && (
          <section className="grid gap-8 py-8 lg:grid-cols-2">
            {product.lightingOptions && (
              <div className="rounded-2xl bg-irons-charcoal p-8 text-white">
                <Lightbulb className="h-8 w-8 text-irons-warm-gold" />
                <h2 className="mt-5 text-3xl font-bold">Opciones de iluminación</h2>
                <ul className="mt-6 space-y-4 text-stone-300">
                  {product.lightingOptions.map((option) => (
                    <li key={option} className="flex gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-irons-warm-gold" />
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.customizations && (
              <div className="rounded-2xl border bg-white p-8">
                <SlidersHorizontal className="h-8 w-8 text-irons-warm-gold" />
                <h2 className="mt-5 text-3xl font-bold">Personaliza este panel</h2>
                <ul className="mt-6 space-y-4 text-gray-600">
                  {product.customizations.map((option) => (
                    <li key={option} className="flex gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-irons-warm-gold" />
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/disena-tu-pieza?product=${product.slug}`}
                  className="mt-8 inline-flex rounded-md bg-irons-warm-gold px-6 py-3 font-medium"
                >
                  Diseñar una versión a medida
                </Link>
              </div>
            )}
          </section>
        )}

        {product.recommendedUses && (
          <section className="py-14">
            <h2 className="text-3xl font-bold">Usos recomendados</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.recommendedUses.map((use) => (
                <span key={use} className="rounded-full border bg-white px-4 py-2 text-sm">
                  {use}
                </span>
              ))}
            </div>
            {product.care && (
              <div className="mt-10 rounded-xl border-l-4 border-irons-warm-gold bg-stone-100 p-6">
                <h3 className="font-bold">Cuidados</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{product.care}</p>
              </div>
            )}
          </section>
        )}

        {related.length > 0 && (
          <section className="py-20">
            <h2 className="mb-8 text-3xl font-bold">Otros diseños y piezas relacionadas</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
