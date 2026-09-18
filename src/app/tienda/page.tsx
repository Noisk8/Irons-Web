import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { ShopCatalog } from '@/components/shop/ShopCatalog';

export const metadata: Metadata = { title:'Tienda', description:'Objetos de diseño en metal, iluminación, mobiliario y accesorios fabricados en Colombia.' };
export default function ShopPage({ searchParams }: { searchParams: { category?: string } }) { return <Layout><section className="bg-irons-charcoal px-4 py-20 text-white"><div className="container"><p className="mb-3 text-xs uppercase tracking-[.3em] text-irons-warm-gold">Colección Irons</p><h1 className="text-4xl font-bold md:text-6xl">Objetos que habitan el espacio</h1><p className="mt-5 max-w-2xl text-stone-300">Piezas funcionales y decorativas, fabricadas localmente en series cortas.</p></div></section><section className="container px-4 py-14"><ShopCatalog initialCategory={searchParams.category}/></section></Layout>; }
