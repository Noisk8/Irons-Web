'use client';

import Link from 'next/link';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/utils';

export function FinalCTA() {
  return (
    <section className="py-16 lg:py-24 bg-irons-warm-white relative overflow-hidden" aria-labelledby="cta-title">
      <div className="absolute inset-0 bg-gradient-to-br from-irons-stone-gray/50 via-transparent to-irons-warm-gold/10" aria-hidden="true" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-irons-charcoal/10 border border-irons-stone-gray mb-6">
            <Sparkles className="h-4 w-4 text-irons-warm-gold" aria-hidden="true" />
            <span className="text-sm font-medium text-irons-charcoal">¿Listo para empezar?</span>
          </div>

          <h2 id="cta-title" className="text-3xl lg:text-5xl font-display font-bold text-irons-charcoal mb-6">
            ¿Tienes una idea?<br />
            <span className="text-irons-warm-gold">Convirtámosla en una pieza.</span>
          </h2>

          <p className="text-lg text-irons-metal-medium mb-10 max-w-2xl mx-auto">
            No importa si es un boceto en una servilleta o un render profesional.
            Cuéntanos qué necesitas y te enviaremos una propuesta sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="irons" size="xl" asChild className="group w-full sm:w-auto">
              <Link href="/disena-tu-pieza">
                <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
                Solicitar cotización
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="irons-outline" size="xl" asChild className="w-full sm:w-auto">
              <a
                href={getWhatsAppUrl('Hola Irons, tengo una idea para una pieza personalizada y me gustaría cotizarla.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-irons-metal-medium">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-irons-warm-gold" aria-hidden="true" />
              <span>Respuesta en menos de 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-irons-warm-gold" aria-hidden="true" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-irons-warm-gold" aria-hidden="true" />
              <span>Asesoría experta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}