'use client';

import * as React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = React.useState(false);

  const quickMessages = [
    { text: 'Cotizar pieza personalizada', message: 'Hola Irons, quiero cotizar una pieza personalizada.' },
    { text: 'Información sobre productos', message: 'Hola Irons, necesito información sobre sus productos.' },
    { text: 'Consultar pedido existente', message: 'Hola Irons, quiero consultar el estado de mi pedido.' },
    { text: 'Servicio de grabado láser', message: 'Hola Irons, me interesa el servicio de grabado láser.' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-irons-charcoal text-irons-warm-white shadow-xl',
          'flex items-center justify-center transition-all duration-300',
          'hover:bg-irons-charcoal-light hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-irons-warm-gold focus-visible:ring-offset-2',
          isOpen && 'rotate-45 bg-irons-warm-gold text-irons-charcoal'
        )}
        aria-label={isOpen ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-7 w-7" aria-hidden="true" /> : <MessageCircle className="h-7 w-7" aria-hidden="true" />}
      </button>

      <div
        className={cn(
          'fixed bottom-24 left-4 right-4 z-40 bg-irons-warm-white rounded-xl border border-irons-stone-gray shadow-2xl overflow-hidden animate-slide-up sm:left-auto sm:right-6 sm:w-72',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
        role="region"
        aria-label="Opciones rápidas de WhatsApp"
      >
        <div className="p-4 bg-irons-charcoal text-irons-warm-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-irons-warm-gold flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-irons-charcoal" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium">Irons</p>
              <p className="text-xs text-irons-stone-gray">Generalmente responde en minutos</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
          {quickMessages.map((msg, index) => (
            <a
              key={index}
              href={getWhatsAppUrl(msg.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg border border-irons-stone-gray hover:border-irons-warm-gold hover:bg-irons-warm-gold/5 transition-colors text-sm text-irons-charcoal"
            >
              {msg.text}
            </a>
          ))}
        </div>

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-3 bg-irons-charcoal text-irons-warm-white text-center text-sm font-medium hover:bg-irons-charcoal-light transition-colors border-t border-irons-metal-dark"
        >
          Escribir mensaje personalizado
        </a>
      </div>
    </>
  );
}
