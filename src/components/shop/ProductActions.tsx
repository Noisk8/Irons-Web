'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { DemoProduct } from '@/data/products';
import { useCartStore } from '@/store/cart';

export function ProductActions({ product }: { product: DemoProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  if (product.requiresQuote) {
    return <Link href={`/disena-tu-pieza?product=${product.slug}`} className="inline-flex h-12 items-center rounded-md bg-irons-warm-gold px-7 font-medium">Solicitar cotización</Link>;
  }

  function addToCart() {
    addItem({ productId: product.id, name: product.name, price: product.price, quantity, image: product.image, slug: product.slug, isCustomizable: product.customizable, requiresQuote: false });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2500);
  }

  function buyNow() {
    addToCart();
    router.push('/checkout');
  }

  return <div><div className="flex flex-wrap gap-3"><label className="sr-only" htmlFor="quantity">Cantidad</label><input id="quantity" type="number" min={1} max={product.stock} value={quantity} onChange={(event) => setQuantity(Math.min(product.stock, Math.max(1, Number(event.target.value) || 1)))} className="h-12 w-20 rounded-md border px-3"/><button type="button" onClick={addToCart} className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-md bg-irons-charcoal px-7 text-white"><ShoppingBag className="h-5 w-5" aria-hidden="true"/>{added ? 'Agregado al carrito' : 'Agregar al carrito'}</button><button type="button" onClick={buyNow} className="inline-flex h-12 cursor-pointer items-center rounded-md border-2 border-irons-charcoal px-7 font-medium">Comprar ahora</button></div>{added && <p className="mt-3 text-sm text-green-700" role="status">Producto agregado. Puedes seguir explorando o ir al carrito cuando quieras.</p>}</div>;
}
