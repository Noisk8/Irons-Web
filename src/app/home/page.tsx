import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bath, Lamp, Leaf, Sofa } from 'lucide-react';
import { Layout } from '@/components/layout';
import { ProductCard } from '@/components/shop/ProductCard';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Hogar',
  description: 'Objetos metálicos para baños, salas, jardines e iluminación del hogar.',
};

const spaces = [
  { name: 'Baño', description: 'Orden funcional en líneas limpias.', icon: Bath, category: 'muebles-soportes' },
  { name: 'Sala y estudio', description: 'Muebles auxiliares con presencia.', icon: Sofa, category: 'muebles-soportes' },
  { name: 'Iluminación', description: 'Luz cálida y formas escultóricas.', icon: Lamp, category: 'iluminacion' },
  { name: 'Jardín', description: 'Soluciones resistentes para exterior.', icon: Leaf, category: 'decoracion-exterior' },
];

export default function HomeCollectionPage() {
  return (
    <Layout>
      <section className="bg-irons-warm-white">
        <div className="container grid min-h-[72vh] items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">Irons Home</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">Metal que hace hogar.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-irons-metal-medium">Una colección de objetos domésticos pensados para organizar, iluminar y dar carácter a tus espacios cotidianos.</p>
            <a href="#productos" className="mt-8 inline-flex items-center gap-2 rounded-md bg-irons-charcoal px-6 py-3 text-white">Ver productos <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="product-shine relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <Image src="/productos/Repisa dispensadora mural.png" alt="Repisa metálica Irons para un baño contemporáneo" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y bg-white py-14">
        <div className="container grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {spaces.map(({ name, description, icon: Icon, category }) => <Link key={name} href={`/tienda?category=${category}`} className="group rounded-xl border p-5 hover:border-irons-warm-gold"><Icon className="h-6 w-6 text-irons-warm-gold"/><h2 className="mt-4 text-xl font-bold">{name}</h2><p className="mt-2 text-sm text-gray-500">{description}</p></Link>)}
        </div>
      </section>

      <section id="productos" className="container px-4 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">Colección doméstica</p><h2 className="mt-3 text-4xl font-bold">Para cada rincón de casa</h2></div><Link href="/tienda" className="inline-flex items-center gap-2 text-sm font-medium">Ver catálogo completo <ArrowRight className="h-4 w-4"/></Link></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{products.map(product => <ProductCard key={product.id} product={product}/>)}</div>
      </section>
    </Layout>
  );
}
