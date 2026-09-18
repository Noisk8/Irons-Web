'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { DemoProduct } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';

export function ProductCard({ product }: { product: DemoProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  return <article className="product-card-motion group overflow-hidden rounded-2xl border border-irons-stone-gray bg-white">
    <Link href={`/producto/${product.slug}`} className="product-shine block relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-stone-100">
      <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">{product.requiresQuote ? 'Bajo cotización' : product.stock > 0 ? 'Disponible' : 'Agotado'}</span>
    </Link>
    <div className="p-5"><p className="text-xs uppercase tracking-widest text-irons-metal-light">{product.category}</p><Link href={`/producto/${product.slug}`}><h2 className="mt-2 text-xl font-bold hover:text-irons-warm-gold">{product.name}</h2></Link><p className="mt-2 line-clamp-2 text-sm text-irons-metal-medium">{product.description}</p>
      <div className="mt-5 flex items-center justify-between"><strong>{product.requiresQuote ? 'Precio según proyecto' : formatPrice(product.price)}</strong>{!product.requiresQuote && product.stock > 0 && <button onClick={() => addItem({ productId:product.id, name:product.name, price:product.price, quantity:1, image:product.image, slug:product.slug, isCustomizable:product.customizable, requiresQuote:false })} className="rounded-full bg-irons-charcoal p-3 text-white" aria-label={`Agregar ${product.name} al carrito`}><ShoppingBag className="h-4 w-4" /></button>}</div>
    </div>
  </article>;
}
