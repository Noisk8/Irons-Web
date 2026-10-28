'use client';

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
      <svg viewBox="0 0 448 512" className="h-8 w-8 fill-current lg:h-9 lg:w-9" aria-hidden="true">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.5-186.6 184.5zm101.7-138.2c-5.6-2.8-33.2-16.4-38.4-18.2-5.2-1.9-9-2.8-12.8 2.8s-14.7 18.2-18 22-6.5 4.2-12.1 1.4c-33.2-16.6-55-29.7-76.9-67.5-5.8-10 5.8-9.3 16.6-31 1.9-3.8.9-7.1-.5-9.9-1.4-2.8-12.8-30.9-17.5-42.3-4.6-11.1-9.3-9.6-12.8-9.8-3.3-.2-7.1-.2-10.9-.2-3.8 0-9.9 1.4-15.1 7.1-5.2 5.6-19.8 19.3-19.8 47.1s20.3 54.7 23.1 58.5c2.8 3.8 40 61.1 96.9 85.7 13.5 5.8 24.1 9.3 32.3 11.9 13.6 4.3 26 3.7 35.8 2.2 10.9-1.6 33.2-13.6 37.9-26.7 4.7-13.1 4.7-24.3 3.3-26.7-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1 rounded bg-irons-charcoal text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ¡Escríbenos!
      </span>
    </a>
  );
}
