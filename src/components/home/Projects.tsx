'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, MapPin, Calendar, Hammer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const demoProjects = [
  {
    id: '1',
    slug: 'restaurante-moderno-medellin',
    title: 'Restaurante Moderno - Medellín',
    category: 'Restaurantes',
    shortDesc: 'Iluminación decorativa y paneles divisores para comedor principal',
    image: '/productos/Repisa dispensadora mural.png',
    materials: ['Acero negro mate', 'Acero inoxidable cepillado'],
    city: 'Medellín',
    year: 2024,
    services: ['Iluminación', 'Paneles metálicos', 'Diseño personalizado'],
    featured: true,
  },
  {
    id: '2',
    slug: 'hotel-boutique-cartagena',
    title: 'Hotel Boutique - Cartagena',
    category: 'Hoteles',
    shortDesc: 'Señalética exterior, lámparas de habitaciones y paneles de recepción',
    image: '/productos/Lámpara mural geométrica.png',
    materials: ['Acero corten', 'Latón pulido', 'Aluminio anodizado'],
    city: 'Cartagena',
    year: 2024,
    services: ['Señalética', 'Iluminación', 'Decoración interior'],
    featured: true,
  },
  {
    id: '3',
    slug: 'oficinas-corporativas-bogota',
    title: 'Oficinas Corporativas - Bogotá',
    category: 'Oficinas',
    shortDesc: 'Divisores de espacios, mobiliario a medida y branding metálico',
    image: '/productos/Panel decorativo “Árbol de Luz”.png',
    materials: ['Acero negro mate', 'Vidrio', 'Madera'],
    city: 'Bogotá',
    year: 2023,
    services: ['Mobiliario', 'Paneles metálicos', 'Branding'],
    featured: false,
  },
  {
    id: '4',
    slug: 'residencia-moderna-envigado',
    title: 'Residencia Moderna - Envigado',
    category: 'Decoración',
    shortDesc: 'Repisas baños, panel decorativo sala, lámpara comedor',
    image: '/productos/Mesa auxiliar - “Vinyl Stand”.png',
    materials: ['Acero negro mate', 'Acero inoxidable'],
    city: 'Envigado',
    year: 2024,
    services: ['Decoración interior', 'Iluminación', 'Baños'],
    featured: true,
  },
  {
    id: '5',
    slug: 'fachada-comercial-laureles',
    title: 'Fachada Comercial - Laureles',
    category: 'Arquitectura',
    shortDesc: 'Revestimiento metálico perforado con iluminación integrada',
    image: '/productos/Organizador mural para herramientas de jardín.png',
    materials: ['Aluminio perforado', 'Acero inoxidable', 'LED RGB'],
    city: 'Medellín',
    year: 2023,
    services: ['Fachadas', 'Iluminación', 'Arquitectura'],
    featured: true,
  },
  {
    id: '6',
    slug: 'banio-espa-lujo',
    title: 'Baño Spa de Lujo',
    category: 'Baños',
    shortDesc: 'Repisas, soportes, panel decorativo y lámpara espejo a medida',
    image: '/productos/Soporte mural para toallas.png',
    materials: ['Acero inoxidable cepillado', 'Negro mate'],
    city: 'Medellín',
    year: 2024,
    services: ['Baños', 'Decoración interior', 'Iluminación'],
    featured: false,
  },
];

const categories = [
  'Todos',
  'Decoración',
  'Iluminación',
  'Baños',
  'Mobiliario',
  'Exterior',
  'Restaurantes',
  'Hoteles',
  'Oficinas',
  'Arquitectura',
];

export function Projects() {
  return (
    <section className="py-16 lg:py-24 bg-irons-warm-white" aria-labelledby="projects-title">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 id="projects-title" className="text-3xl lg:text-4xl font-display font-bold text-irons-charcoal mb-2">
              Proyectos destacados
            </h2>
            <p className="text-lg text-irons-metal-medium">Espacios transformados con nuestra metalistería</p>
          </div>
          <Link
            href="/proyectos"
            className="inline-flex items-center space-x-2 text-sm font-medium text-irons-charcoal hover:text-irons-warm-gold transition-colors self-end"
          >
            <span>Ver portafolio completo</span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar proyectos por categoría">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                cat === 'Todos'
                  ? 'bg-irons-charcoal text-irons-warm-white'
                  : 'bg-irons-stone-gray text-irons-metal-dark hover:bg-irons-metal-medium hover:text-irons-warm-white'
              )}
              aria-pressed={cat === 'Todos'}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoProjects.map((project, index) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-irons-stone-gray bg-irons-warm-white transition-all duration-500 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/proyectos/${project.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-irons-warm-gold focus-visible:ring-offset-2"
                aria-label={`Ver proyecto: ${project.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-irons-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge variant={project.featured ? 'irons-gold' : 'outline'} className="text-xs">
                      {project.featured ? 'Destacado' : project.category}
                    </Badge>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-irons-warm-white/90 backdrop-blur-sm text-irons-charcoal shadow-lg hover:bg-irons-warm-white transition-colors" aria-label="Compartir proyecto">
                        <Star className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-irons-warm-gold uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="text-xs text-irons-metal-light">{project.year}</span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-irons-charcoal group-hover:text-irons-warm-gold transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-sm text-irons-metal-medium line-clamp-2">{project.shortDesc}</p>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-irons-metal-light">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {project.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {project.year}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-irons-stone-gray flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.services.slice(0, 3).map((service) => (
                        <Badge key={service} variant="outline" className="text-xs px-2 py-0.5">
                          {service}
                        </Badge>
                      ))}
                      {project.services.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 text-irons-metal-light">
                          +{project.services.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="irons-outline" size="lg" asChild>
            <Link href="/proyectos">
              Ver todos los proyectos
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
