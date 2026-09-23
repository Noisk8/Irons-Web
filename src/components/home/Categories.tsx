'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, TreePine, Lamp, Sofa, Box, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    name: 'Decoración interior',
    slug: 'decoracion-interior',
    description: 'Piezas que transforman tus espacios',
    icon: Home,
    image: '/productos/Panel decorativo “Árbol de Luz”.png',
    count: 24,
  },
  {
    name: 'Decoración exterior',
    slug: 'decoracion-exterior',
    description: 'Resistentes a la intemperie',
    icon: TreePine,
    image: '/productos/Organizador mural para herramientas de jardín.png',
    count: 18,
  },
  {
    name: 'Iluminación',
    slug: 'iluminacion',
    description: 'Luz con carácter propio',
    icon: Lamp,
    image: '/productos/Lámpara mural geométrica.png',
    count: 15,
  },
  {
    name: 'Muebles y soportes',
    slug: 'muebles-soportes',
    description: 'Funcionalidad y diseño',
    icon: Sofa,
    image: '/productos/Mesa auxiliar - “Vinyl Stand”.png',
    count: 22,
  },
  {
    name: 'Accesorios',
    slug: 'accesorios',
    description: 'Detalles que marcan la diferencia',
    icon: Box,
    image: '/productos/Soporte mural para toallas.png',
    count: 30,
  },
  {
    name: 'Regalos personalizados',
    slug: 'regalos-personalizados',
    description: 'Únicos para cada ocasión',
    icon: Gift,
    image: '/productos/Repisa dispensadora mural.png',
    count: 12,
  },
];

interface CategoryCardProps {
  category: typeof categories[0];
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-irons-stone-gray bg-irons-warm-white transition-all duration-500 hover:shadow-xl">
      <Link
        href={`/tienda?category=${category.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-irons-warm-gold focus-visible:ring-offset-2"
        aria-label={`Ver ${category.name} - ${category.count} productos`}
      >
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-irons-charcoal/10 via-transparent to-irons-warm-gold/10" aria-hidden="true" />
          <Image
            src={category.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-irons-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        </div>

        <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-irons-warm-white/90 backdrop-blur-sm text-irons-charcoal shadow-lg">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-display font-bold text-irons-charcoal group-hover:text-irons-warm-gold transition-colors">
                {category.name}
              </h3>
              <p className="mt-1 text-sm text-irons-metal-dark font-medium">{category.description}</p>
            </div>
            <span className="text-xs text-irons-metal-light whitespace-nowrap">{category.count} productos</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-irons-metal-dark group-hover:text-irons-warm-gold transition-colors">
              Ver colección
            </span>
            <ArrowRight className="h-5 w-5 text-irons-metal-light group-hover:text-irons-warm-gold transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function Categories() {
  return (
    <section className="py-16 lg:py-24 bg-irons-warm-white" aria-labelledby="categories-title">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <h2 id="categories-title" className="text-3xl lg:text-4xl font-display font-bold text-irons-charcoal mb-4">
            Categorías principales
          </h2>
          <p className="text-lg text-irons-metal-dark font-medium">
            Explora nuestras colecciones diseñadas para cada espacio y necesidad
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.slug} category={category} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/tienda" className="inline-flex items-center space-x-2 text-sm font-medium text-irons-charcoal hover:text-irons-warm-gold transition-colors">
            <span>Ver todas las categorías</span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
