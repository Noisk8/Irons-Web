'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { cn } from '@/lib/utils';

const heroProducts = products.filter((product) => product.featured).slice(0, 6);

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price);
}

export function Hero() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  
  const nextSlide = React.useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroProducts.length);
  }, []);

  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-irons-warm-white" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-irons-warm-white via-irons-stone-gray/20 to-irons-metal-light/10" />
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center bg-cover opacity-5" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8 animate-slide-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-irons-warm-white/80 border border-irons-stone-gray backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-irons-warm-gold" aria-hidden="true" />
              <span className="text-sm font-medium text-irons-charcoal">Fabricación colombiana · Envío nacional · Personalización</span>
            </div>

            <h1
              id="hero-title"
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-irons-charcoal leading-tight tracking-tight"
            >
              Objetos con carácter.<br />
              <span className="text-irons-warm-gold">Diseñados para durar.</span>
            </h1>

            <p className="text-lg lg:text-xl text-irons-metal-medium max-w-xl">
              Metalistería personalizada, grabado láser y decoración en metal para hogares, restaurantes,
              hoteles y proyectos arquitectónicos. Piezas únicas que combinan diseño contemporáneo y precisión.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button variant="irons" size="xl" asChild className="group w-full sm:w-auto">
                <Link href="/tienda">
                  Explorar tienda
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
          </div>

          <div className="relative group max-w-xl mx-auto w-full perspective-1000">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              {heroProducts.map((product, index) => {
                const isCurrent = index === activeSlide;
                const isNext = index === (activeSlide + 1) % heroProducts.length;
                const isPrev = index === (activeSlide - 1 + heroProducts.length) % heroProducts.length;

                return (
                  <div
                    key={product.id}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-in-out rounded-3xl overflow-hidden shadow-2xl border-4 border-white",
                      isCurrent 
                        ? "z-30 translate-x-0 translate-y-0 rotate-0 opacity-100 scale-100" 
                        : isNext 
                        ? "z-20 translate-x-6 translate-y-4 rotate-3 opacity-80 scale-90" 
                        : isPrev 
                        ? "z-10 -translate-x-6 translate-y-4 -rotate-3 opacity-60 scale-80" 
                        : "z-0 translate-y-8 opacity-0 scale-75"
                    )}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transitionDelay: isCurrent ? '0ms' : '100ms'
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-irons-charcoal/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-irons-warm-gold text-[10px] font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold mb-1">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                        <Link 
                          href={`/productos/${product.slug}`}
                          className="px-3 py-1.5 bg-white text-irons-charcoal rounded-full text-xs font-bold hover:bg-irons-warm-gold hover:text-white transition-colors"
                        >
                          Ver más
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white shadow-lg hover:bg-irons-warm-gold hover:text-white transition-colors"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                {heroProducts.map((_, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      index === activeSlide ? "w-8 bg-irons-warm-gold" : "w-2 bg-irons-stone-gray"
                    )}
                  />
                ))}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-white shadow-lg hover:bg-irons-warm-gold hover:text-white transition-colors"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
