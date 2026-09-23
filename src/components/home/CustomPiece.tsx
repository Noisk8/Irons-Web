'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Ruler, Droplet, Palette, Type, Image as ImageIcon, QrCode, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const customOptions = [
  { icon: Ruler, title: 'Medidas exactas', description: 'Adaptamos cada dimensión a tu espacio' },
  { icon: Droplet, title: 'Material', description: 'Acero, inoxidable, aluminio, latón, cobre, acero corten' },
  { icon: Palette, title: 'Acabado y color', description: 'Negro mate, brillo, cepillado, pulido, patina, personalizado' },
  { icon: Type, title: 'Texto para grabar', description: 'Nombres, fechas, frases, coordenadas, seriales' },
  { icon: ImageIcon, title: 'Logo o imagen', description: 'Tu marca, ilustración, foto o diseño vectorial' },
  { icon: ImageIcon, title: 'Foto del espacio', description: 'Nos ayudas a visualizar el contexto de la pieza' },
  { icon: QrCode, title: 'Código QR', description: 'Enlace a web, menú digital, redes sociales o contacto' },
  { icon: Sparkles, title: 'Archivo de referencia', description: 'Plano, boceto, render o imagen de inspiración' },
];

const fabricationExamples = [
  {
    title: 'Repisas y estanterías',
    image: '/productos/repisa-dispensadora-mural.png',
    desc: 'Soportes minimalistas y estantes flotantes con acabados industriales.'
  },
  {
    title: 'Lámparas y Apliques',
    image: '/productos/lampara-mural-geometrica.png',
    desc: 'Iluminación escultórica que transforma la atmósfera de cualquier espacio.'
  },
  {
    title: 'Paneles Decorativos',
    image: '/productos/panel-decorativo-arbol-de-luz.png',
    desc: 'Divisores de ambiente y arte mural cortado en láser con precisión.'
  },
  {
    title: 'Muebles y Soportes',
    image: '/productos/mesa-auxiliar-vinyl-stand.png',
    desc: 'Mobiliario funcional diseñado específicamente para tus necesidades.'
  },
  {
    title: 'Señalética',
    image: '/productos/organizador-mural-jardin.png',
    desc: 'Placas identificativas y branding metálico para comercios y hoteles.'
  },
];

export function CustomPiece() {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const nextSlide = React.useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % fabricationExamples.length);
  }, []);

  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + fabricationExamples.length) % fabricationExamples.length);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section className="py-16 lg:py-24 bg-irons-charcoal text-irons-warm-white relative overflow-hidden" aria-labelledby="custom-title">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center bg-cover opacity-5" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-irons-charcoal via-irons-metal-dark to-irons-charcoal" aria-hidden="true" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-irons-metal-dark/50 border border-irons-warm-gold/30 mb-6">
            <Sparkles className="h-4 w-4 text-irons-warm-gold" aria-hidden="true" />
            <span className="text-sm font-medium text-irons-warm-gold">Servicio a medida</span>
          </div>

          <h2 id="custom-title" className="text-3xl lg:text-4xl font-display font-bold text-irons-warm-white mb-4">
            Personaliza tu pieza
          </h2>

          <p className="text-lg text-irons-stone-gray">
            En Irons transformamos tus ideas en piezas únicas. Tú imaginas, nosotros fabricamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {customOptions.map((option, index) => (
            <div
              key={option.title}
              className="group relative p-6 rounded-xl border border-irons-metal-dark bg-irons-charcoal-light/50 transition-all duration-300 hover:border-irons-warm-gold/50 hover:bg-irons-metal-dark/50"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-irons-warm-gold/10 text-irons-warm-gold mb-4 group-hover:bg-irons-warm-gold/20 transition-colors">
                <option.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-display font-bold text-irons-warm-white mb-2">{option.title}</h3>
              <p className="text-sm text-irons-metal-light">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl lg:text-4xl font-display font-bold text-irons-warm-white">
              ¿Qué podemos fabricar para ti?
            </h3>
            <p className="text-lg text-irons-stone-gray">
              Desde una repisa para tu baño hasta señalética para tu restaurante.
              Cualquier idea en metal que tengas en mente la hacemos realidad.
            </p>
            <div className="flex flex-wrap gap-4">
               <Button variant="irons" size="xl" asChild className="group">
                <Link href="/disena-tu-pieza">
                  <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
                  Solicitar cotización
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="relative group max-w-md mx-auto w-full perspective-1000"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[4/5] w-full">
              {fabricationExamples.map((item, index) => {
                const isCurrent = index === activeSlide;
                const isNext = index === (activeSlide + 1) % fabricationExamples.length;
                const isPrev = index === (activeSlide - 1 + fabricationExamples.length) % fabricationExamples.length;

                return (
                  <div
                    key={item.title}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-in-out rounded-3xl overflow-hidden shadow-2xl border-4 border-irons-metal-dark bg-irons-charcoal",
                      isCurrent 
                        ? "z-30 translate-x-0 translate-y-0 rotate-0 opacity-100 scale-100" 
                        : isNext 
                        ? "z-20 translate-x-8 translate-y-6 rotate-6 opacity-70 scale-90" 
                        : isPrev 
                        ? "z-10 -translate-x-8 translate-y-6 -rotate-6 opacity-50 scale-80" 
                        : "z-0 translate-y-12 opacity-0 scale-75"
                    )}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-irons-charcoal via-irons-charcoal/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h4 className="text-2xl font-display font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-stone-300 mb-4">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-irons-metal-dark text-white border-irons-warm-gold/30 hover:bg-irons-warm-gold hover:text-white transition-colors"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2">
                <span className="text-xs text-irons-metal-light">{fabricationExamples.length} ejemplos</span>
              </div>
              <Button 
                variant="outline"
                size="icon"
                className="rounded-full bg-irons-metal-dark text-white border-irons-warm-gold/30 hover:bg-irons-warm-gold hover:text-white transition-colors"
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
