'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Ruler, Droplet, Palette, Type, Image as ImageIcon, QrCode, ArrowRight, Check } from 'lucide-react';
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

export function CustomPiece() {
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
            En Irons transformamos tus ideas en piezas únicas. Desde una repisa para tu baño hasta
            señalética para tu restaurante, pasando por paneles decorativos, lámparas escultóricas
            o muebles a medida. Tú imaginas, nosotros fabricamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {customOptions.map((option, index) => (
            <div
              key={option.title}
              className="group relative p-6 rounded-xl border border-irons-metal-dark bg-irons-charcoal-light/50 transition-all duration-300 hover:border-irons-warm-gold/50 hover:bg-irons-metal-dark/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-irons-warm-gold/10 text-irons-warm-gold mb-4 group-hover:bg-irons-warm-gold/20 transition-colors">
                <option.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-display font-bold text-irons-warm-white mb-2">{option.title}</h3>
              <p className="text-sm text-irons-metal-light">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-irons-warm-white">
              ¿Qué podemos fabricar para ti?
            </h3>
            <ul className="space-y-4" role="list">
              {[
                'Repisas y estanterías flotantes',
                'Lámparas y apliques murales',
                'Paneles decorativos y divisores',
                'Muebles auxiliares y soportes',
                'Señalética y placas identificativas',
                'Regalos corporativos y personales',
                'Piezas arquitectónicas y estructurales',
                'Cualquier idea en metal que tengas en mente',
              ].map((item, index) => (
                <li key={item} className="flex items-start gap-3 group">
                  <Check className="h-5 w-5 text-irons-warm-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-irons-stone-gray group-hover:text-irons-warm-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-irons-metal-dark">
            <Image
              src="/productos/Organizador mural para herramientas de jardín.png"
              alt="Proceso de fabricación personalizada: diseño, corte láser, doblado, acabado"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-irons-charcoal/60 via-transparent to-irons-warm-gold/20" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 right-6">
              <Button variant="irons-outline" size="xl" asChild className="w-full">
                <Link href="/disena-tu-pieza">
                  <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
                  Solicitar cotización
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
