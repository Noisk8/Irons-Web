'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProductGallery({ image, images = [], alt, orientation = 'landscape' }: { image: string; images?: string[]; alt: string; orientation?: 'portrait' | 'landscape' }) {
  const gallery = useMemo(() => Array.from(new Set([image, ...images].filter(Boolean))), [image, images]);
  const [selected, setSelected] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const selectedImage = gallery[selected] || image;
  const aspect = orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]';

  function updateZoomOrigin(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  }

  return <>
    <div className="lg:sticky lg:top-24">
      <div onMouseEnter={() => setIsZoomed(true)} onMouseMove={updateZoomOrigin} onMouseLeave={() => setIsZoomed(false)} className={cn('group relative overflow-hidden rounded-2xl border bg-stone-100 shadow-sm lg:cursor-zoom-in', aspect)}>
        <Image src={selectedImage} alt={alt} fill priority className="object-contain p-2 transition-transform duration-150 ease-out sm:p-3" style={{ transform: isZoomed ? 'scale(1.8)' : 'scale(1)', transformOrigin: zoomOrigin }} sizes="(max-width: 1024px) 100vw, 50vw" />
        <span className="pointer-events-none absolute bottom-4 right-4 hidden items-center gap-2 rounded-full bg-irons-charcoal/90 px-4 py-2 text-xs font-medium text-white shadow-lg lg:inline-flex"><Search className="h-4 w-4" aria-hidden="true" />Pasa el cursor para ampliar</span>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1" aria-label="Galería de imágenes del producto">
        {gallery.map((galleryImage, index) => <button key={galleryImage} type="button" onClick={() => setSelected(index)} className={cn('relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-stone-100 transition-colors', index === selected ? 'border-irons-warm-gold' : 'border-transparent hover:border-irons-metal-light')} aria-label={`Ver imagen ${index + 1} de ${gallery.length}`} aria-pressed={index === selected}><Image src={galleryImage} alt="" fill sizes="80px" className="object-cover" /></button>)}
      </div>
      <p className="mt-2 text-xs text-irons-metal-light">{gallery.length === 1 ? 'Vista principal del producto' : `${gallery.length} imágenes disponibles`}</p>
    </div>
  </>;
}
