'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ArrowRight, Bath, Lamp, Leaf, Sofa } from 'lucide-react';
import { Layout } from '@/components/layout';
import { ProductCard } from '@/components/shop/ProductCard';
import { products } from '@/data/products';
import { Reveal } from '@/components/ui/reveal';

// Lazy Loading de componentes pesados
const Process = dynamic(() => import('@/components/home/Process').then(mod => mod.Process), {
  loading: () => <div className="py-20 text-center animate-pulse text-irons-metal-medium">Cargando proceso...</div>,
  ssr: false
});
const Projects = dynamic(() => import('@/components/home/Projects').then(mod => mod.Projects), {
  loading: () => <div className="py-20 text-center animate-pulse text-irons-metal-medium">Cargando proyectos...</div>,
  ssr: false
});
const Testimonials = dynamic(() => import('@/components/home/Testimonials').then(mod => mod.Testimonials), {
  loading: () => <div className="py-20 text-center animate-pulse text-irons-metal-medium">Cargando testimonios...</div>,
  ssr: false
});
const FinalCTA = dynamic(() => import('@/components/home/FinalCTA').then(mod => mod.FinalCTA), {
  loading: () => <div className="h-40 w-full animate-pulse bg-gray-100" />,
  ssr: false
});

const spaces = [
  { name: 'Baño', description: 'Orden funcional en líneas limpias.', icon: Bath, category: 'muebles-soportes' },
  { name: 'Sala y estudio', description: 'Muebles auxiliares con presencia.', icon: Sofa, category: 'muebles-soportes' },
  { name: 'Iluminación', description: 'Luz cálida y formas escultóricas.', icon: Lamp, category: 'iluminacion' },
  { name: 'Jardín', description: 'Soluciones resistentes para exterior.', icon: Leaf, category: 'decoracion-exterior' },
];

export default function HomeCollectionPage() {
  return (
    <Layout>
      <section className="bg-irons-warm-white overflow-hidden">
        <div className="container grid min-h-[72vh] items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="z-10">
              <p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">Irons Home</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">Metal que hace hogar.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-irons-metal-medium">Una colección de objetos domésticos pensados para organizar, iluminar y dar carácter a tus espacios cotidianos.</p>
              <a href="#productos" className="mt-8 inline-flex items-center gap-2 rounded-md bg-irons-charcoal px-6 py-3 text-white transition-all hover:bg-stone-800 hover:shadow-lg active:scale-95">
                Ver productos <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <div className="product-shine relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl group">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/productos/Repisa dispensadora mural.png"
                alt="Repisa metálica Irons para un baño contemporáneo"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y bg-white py-14">
        <div className="container grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {spaces.map(({ name, description, icon: Icon, category }, idx) => (
            <Reveal key={name} delay={idx * 0.1}>
              <Link
                href={`/tienda?category=${category}`}
                className="group rounded-xl border p-5 transition-all duration-300 hover:border-irons-warm-gold hover:shadow-md hover:-translate-y-1"
              >
                <Icon className="h-6 w-6 text-irons-warm-gold transition-transform group-hover:scale-110"/>
                <h2 className="mt-4 text-xl font-bold">{name}</h2>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="productos" className="container px-4 py-20">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">Colección doméstica</p>
              <h2 className="mt-3 text-4xl font-bold">Para cada rincón de casa</h2>
            </div>
            <Link href="/tienda" className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-irons-warm-gold">
              Ver catálogo completo <ArrowRight className="h-4 w-4"/>
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => (
            <Reveal key={product.id} delay={(idx % 3) * 0.1}>
              <ProductCard product={product}/>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
