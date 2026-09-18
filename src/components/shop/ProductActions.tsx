'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { DemoProduct } from '@/data/products';
import { useCartStore } from '@/store/cart';

export function ProductActions({ product }: { product: DemoProduct }) { const [quantity,setQuantity]=useState(1); const add=useCartStore(s=>s.addItem); if(product.requiresQuote) return <Link href={`/disena-tu-pieza?product=${product.slug}`} className="inline-flex h-12 items-center rounded-md bg-irons-warm-gold px-7 font-medium">Solicitar cotización</Link>; return <div className="flex flex-wrap gap-3"><label className="sr-only" htmlFor="quantity">Cantidad</label><input id="quantity" type="number" min={1} max={product.stock} value={quantity} onChange={e=>setQuantity(Math.max(1, Number(e.target.value)))} className="h-12 w-20 rounded-md border px-3"/><button onClick={()=>add({productId:product.id,name:product.name,price:product.price,quantity,image:product.image,slug:product.slug,isCustomizable:product.customizable,requiresQuote:false})} className="inline-flex h-12 items-center gap-2 rounded-md bg-irons-charcoal px-7 text-white"><ShoppingBag className="h-5 w-5"/>Agregar al carrito</button><Link href="/carrito" className="inline-flex h-12 items-center rounded-md border-2 border-irons-charcoal px-7 font-medium">Comprar ahora</Link></div>; }
