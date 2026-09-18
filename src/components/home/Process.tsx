'use client';

import { MessageSquare, PenTool, Factory, Truck, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Cuéntanos tu idea',
    description:
      'Nos compartes tu visión, necesideces, medidas, referencias y presupuesto. Podemos reunirnos presencialmente o virtualmente para entender tu proyecto a fondo.',
    details: [
      'Reunión inicial sin compromiso',
      'Levantamiento de medidas si es necesario',
      'Revisión de referencias e inspiración',
      'Definición de alcance y presupuesto estimado',
    ],
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Diseñamos la propuesta',
    description:
      'Nuestro equipo de diseño crea propuestas técnicas y visuales: renders 3D, planos técnicos, selección de materiales y acabados. Iteramos hasta que estés 100% conforme.',
    details: [
      'Modelado 3D y renders fotorrealistas',
      'Planos técnicos con cotas',
      'Muestra de materiales y acabados',
      'Revisión y ajustes ilimitados',
    ],
  },
  {
    number: '03',
    icon: Factory,
    title: 'Fabricamos la pieza',
    description:
      'En nuestro taller combinamos tecnología de corte láser, CNC, doblado de precisión y soldadura TIG/MIG con acabados artesanales. Cada pieza pasa control de calidad riguroso.',
    details: [
      'Corte láser de precisión (0.1mm)',
      'Doblado CNC y conformado',
      'Soldadura TIG/MIG certificada',
      'Acabados: pintura electrostática, patinas, pulidos',
      'Control de calidad en cada etapa',
    ],
  },
  {
    number: '04',
    icon: Truck,
    title: 'Entregamos o instalamos',
    description:
      'Coordinamos la logística según el proyecto: envío embalado a nivel nacional o instalación profesional en sitio. Incluimos garantía y manual de cuidado.',
    details: [
      'Embalaje profesional anti-golpes',
      'Envío nacional con seguro',
      'Instalación en sitio por nuestro equipo',
      'Garantía de 2 años en estructura',
      'Manual de cuidado y mantenimiento',
    ],
  },
];

export function Process() {
  return (
    <section className="py-16 lg:py-24 bg-irons-stone-gray/30" aria-labelledby="process-title">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h2 id="process-title" className="text-3xl lg:text-4xl font-display font-bold text-irons-charcoal mb-4">
            Nuestro proceso de trabajo
          </h2>
          <p className="text-lg text-irons-metal-medium">
            De la idea a la pieza final en cuatro pasos claros y transparentes
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-irons-stone-gray via-irons-warm-gold/50 to-irons-stone-gray -translate-x-1/2" aria-hidden="true" />

          <div className="space-y-16 lg:space-y-20">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  'relative flex gap-8',
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'relative lg:w-1/2 flex-shrink-0',
                    index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'
                  )}
                >
                  <div className="relative">
                    <div
                      className={cn(
                        'absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-irons-stone-gray bg-irons-warm-white flex items-center justify-center z-10 lg:w-20 lg:h-20',
                        index % 2 === 0 ? 'lg:right-[-48px]' : 'lg:left-[-48px]'
                      )}
                      aria-hidden="true"
                    >
                      <span className="text-2xl lg:text-3xl font-display font-bold text-irons-charcoal">
                        {step.number}
                      </span>
                    </div>
                    <div className="relative z-20">
                      <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-irons-warm-gold/10 text-irons-warm-gold mb-4">
                        <step.icon className="h-7 w-7 lg:h-8 lg:w-8" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-display font-bold text-irons-charcoal mb-3">
                        {step.title}
                      </h3>
                      <p className="text-irons-metal-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                <div className={cn('lg:w-1/2 pt-4', index % 2 === 0 ? '' : '')}>
                  <div className="bg-irons-warm-white rounded-xl border border-irons-stone-gray p-6 h-full shadow-sm">
                    <h4 className="font-medium text-irons-charcoal mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-irons-warm-gold" aria-hidden="true" />
                      Incluye
                    </h4>
                    <ul className="space-y-2" role="list">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm text-irons-metal-dark">
                          <CheckCircle className="h-4 w-4 text-irons-warm-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
