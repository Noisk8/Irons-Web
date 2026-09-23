'use client';

import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({ 
  phoneNumber = '573000000000', // Default value, should be updated
  message = 'Hola Irons, me gustaría recibir más información sobre sus servicios.',
  className 
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 group',
        className
      )}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 lg:w-8 lg:h-8" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1 rounded bg-irons-charcoal text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ¡Escríbenos!
      </span>
    </a>
  );
}
