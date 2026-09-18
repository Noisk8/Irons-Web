'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: '1',
    name: 'María Fernanda Gómez',
    role: 'Arquitecta',
    company: 'Gómez & Asociados',
    content:
      'Trabajar con Irons fue una experiencia excepcional. Entendieron perfectamente la visión del proyecto y la ejecutaron con una precisión impecable. Los paneles divisores para el restaurante no solo cumplen su función, sino que se convirtieron en el elemento protagonista del espacio.',
    rating: 5,
    image: '/productos/Repisa dispensadora mural.png',
    project: 'Restaurante Moderno - Medellín',
  },
  {
    id: '2',
    name: 'Carlos Andrés Restrepo',
    role: 'Gerente General',
    company: 'Hotel Boutique La Casa',
    content:
      'La señalética y la iluminación personalizada transformaron completamente la experiencia de nuestros huéspedes. El equipo de Irons aportó soluciones técnicas que no habíamos considerado y el resultado superó nuestras expectativas. Profesionalismo y calidad en cada detalle.',
    rating: 5,
    image: '/productos/Panel decorativo “Árbol de Luz”.png',
    project: 'Hotel Boutique - Cartagena',
  },
  {
    id: '3',
    name: 'Laura Patricia Vélez',
    role: 'Diseñadora de Interiores',
    company: 'Estudio Vélez',
    content:
      'He recomendado a Irons a varios clientes y siempre entregan. La capacidad de personalizar acabados, dimensiones y detalles hace que cada pieza encaje perfectamente en el diseño. Además, los tiempos de entrega son realistas y se cumplen.',
    rating: 5,
    image: '/productos/Lámpara mural geométrica.png',
    project: 'Residencia Moderna - Envigado',
  },
  {
    id: '4',
    name: 'Jorge Alberto Montoya',
    role: 'Propietario',
    company: 'Café Cultura',
    content:
      'Queríamos algo único para nuestro café y el equipo de Irons diseñó una lámpara escultórica que es el centro de todas las miradas. El proceso fue transparente, nos mostraron renders antes de fabricar y el resultado final es exactamente lo que imaginábamos.',
    rating: 5,
    image: '/productos/Mesa auxiliar - “Vinyl Stand”.png',
    project: 'Iluminación decorativa - Café Cultura',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  React.useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-irons-charcoal text-irons-warm-white relative overflow-hidden" aria-labelledby="testimonials-title">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center bg-cover opacity-5" aria-hidden="true" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h2 id="testimonials-title" className="text-3xl lg:text-4xl font-display font-bold text-irons-warm-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-irons-stone-gray">
            Contenido demostrativo listo para testimonios verificados
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="bg-irons-charcoal-light/50 border border-irons-metal-dark rounded-2xl p-8 lg:p-12 relative overflow-hidden">
              <Quote className="absolute top-6 left-6 h-16 w-16 text-irons-warm-gold/20" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6" aria-label={`Calificación: ${current.rating} de 5 estrellas`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-5 w-5',
                        i < current.rating ? 'fill-current text-irons-warm-gold' : 'text-irons-metal-dark'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl text-irons-stone-gray leading-relaxed mb-8 italic">
                  &ldquo;{current.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-irons-metal-dark/50 border border-irons-warm-gold/30 overflow-hidden flex-shrink-0">
                    <Image
                      src={current.image}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display font-bold text-irons-warm-white">{current.name}</p>
                    <p className="text-sm text-irons-warm-gold">{current.role} · {current.company}</p>
                    <p className="text-xs text-irons-metal-light mt-1">{current.project}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-irons-warm-white/10 border border-irons-metal-dark text-irons-stone-gray hover:bg-irons-warm-white/20 hover:text-irons-warm-white"
                onClick={prev}
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </Button>

              <div className="flex gap-2" role="tablist" aria-label="Navegación de testimonios">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Ir al testimonio ${index + 1}`}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-all',
                      index === currentIndex
                        ? 'bg-irons-warm-gold w-8'
                        : 'bg-irons-metal-dark/50 hover:bg-irons-warm-gold/50'
                    )}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-irons-warm-white/10 border border-irons-metal-dark text-irons-stone-gray hover:bg-irons-warm-white/20 hover:text-irons-warm-white"
                onClick={next}
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
