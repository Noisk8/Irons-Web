'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const heroProducts = products.filter((product) => product.featured).slice(-4);

export function Hero() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const currentProduct = heroProducts[activeSlide];

  const goToSlide = React.useCallback((index: number) => {
    setActiveSlide((index + heroProducts.length) % heroProducts.length);
  }, []);

  React.useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroProducts.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-irons-warm-white via-irons-stone-gray/50 to-irons-metal-light/20" />
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-5" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-irons-charcoal/10 via-transparent to-irons-warm-gold/10"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-irons-warm-white/80 border border-irons-stone-gray mb-8 animate-slide-up">
            <Sparkles className="h-4 w-4 text-irons-warm-gold" aria-hidden="true" />
            <span className="text-sm font-medium text-irons-charcoal">Fabricación colombiana · Envío nacional · Personalización</span>
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-irons-charcoal leading-tight tracking-tight mb-6 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Objetos con carácter.<br />
            <span className="text-irons-warm-gold">Diseñados para durar.</span>
          </h1>

          <p className="text-lg lg:text-xl text-irons-metal-medium max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
            Metalistería personalizada, grabado láser y decoración en metal para hogares, restaurantes,
            hoteles y proyectos arquitectónicos. Piezas únicas que combinan diseño contemporáneo,
            precisión tecnológica y trabajo artesanal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Button variant="irons" size="xl" asChild className="group w-full sm:w-auto">
              <Link href="/home">
                Explorar hogar
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="irons-outline" size="xl" asChild className="w-full sm:w-auto">
              <Link href="/servicios">
                <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
                Conocer servicios
              </Link>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-irons-metal-medium animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-irons-warm-gold" aria-hidden="true" />
              <span>Hecho en Colombia</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-irons-warm-gold" aria-hidden="true" />
              <span>Metal negro y acabados sobrios</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-irons-warm-gold" aria-hidden="true" />
              <span>Diseño y fabricación a medida</span>
            </div>
          </div>
        </div>

        <div
          className="mt-20 relative animate-slide-up"
          style={{ animationDelay: '500ms' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
          }}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Productos destacados"
        >
          <div className="product-shine relative min-h-[520px] overflow-hidden rounded-2xl border border-irons-stone-gray shadow-2xl sm:min-h-0 sm:aspect-[4/3] lg:aspect-[16/8]">
            <Image
              key={currentProduct.id}
              src={currentProduct.image}
              alt={currentProduct.name}
              fill
              priority
              className="hero-slide-image object-cover"
              sizes="(max-width: 1024px) 100vw, 1400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-irons-charcoal/90 via-irons-charcoal/5 to-transparent" aria-hidden="true" />

            <div key={`copy-${currentProduct.id}`} className="hero-slide-copy absolute inset-x-0 bottom-0 z-[5] p-6 text-left text-white md:p-10">
              <p className="text-xs uppercase tracking-[.25em] text-irons-warm-gold">{currentProduct.category}</p>
              <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">{currentProduct.name}</h2>
                  <p className="mt-2 hidden max-w-2xl text-sm text-stone-200 sm:block md:text-base">{currentProduct.description}</p>
                </div>
                <Link href={`/producto/${currentProduct.slug}`} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-irons-charcoal transition hover:bg-irons-warm-gold">
                  Ver producto <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <button type="button" onClick={() => goToSlide(activeSlide - 1)} className="absolute left-3 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/60 sm:left-4 sm:top-1/2 sm:-translate-y-1/2" aria-label="Producto anterior"><ChevronLeft className="h-5 w-5"/></button>
            <button type="button" onClick={() => goToSlide(activeSlide + 1)} className="absolute right-3 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/60 sm:right-4 sm:top-1/2 sm:-translate-y-1/2" aria-label="Siguiente producto"><ChevronRight className="h-5 w-5"/></button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Seleccionar producto destacado">
            {heroProducts.map((product, index) => (
              <button key={product.id} type="button" role="tab" aria-selected={index === activeSlide} aria-label={`Mostrar ${product.name}`} onClick={() => goToSlide(index)} className={`h-2.5 rounded-full transition-all duration-500 ${index === activeSlide ? 'w-10 bg-irons-warm-gold' : 'w-2.5 bg-irons-metal-light/50 hover:bg-irons-metal-light'}`} />
            ))}
            <span className="ml-3 text-xs text-irons-metal-medium">{isPaused ? 'Pausado' : 'Cambio automático'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
