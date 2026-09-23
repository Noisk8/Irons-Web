'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Eye, Tag, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useToast } from '@/hooks/use-toast';

const demoProducts = [
  {
    id: '1',
    slug: 'repisa-metallica-bano-negra',
    name: 'Repisa metálica negra para baño',
    shortDescription: 'Soporte elegante para dispensadores y accesorios',
    price: 185000,
    compareAtPrice: 220000,
    category: 'Muebles y soportes',
    image: '/productos/repisa-dispensadora-mural.png',
    images: ['/productos/repisa-dispensadora-mural.png'],
    tags: ['Nuevo', 'Más vendido'],
    status: 'ACTIVE',
    isCustomizable: true,
    requiresQuote: false,
    stock: 15,
  },
  {
    id: '2',
    slug: 'panel-decorativo-arbol-retroiluminado',
    name: 'Panel decorativo árbol con retroiluminación',
    shortDescription: 'Silueta de árbol con luz cálida integrada',
    price: 420000,
    compareAtPrice: null,
    category: 'Decoración interior',
    image: '/productos/panel-decorativo-arbol-de-luz.png',
    images: ['/productos/panel-decorativo-arbol-de-luz.png'],
    tags: ['Hecho bajo pedido'],
    status: 'MADE_TO_ORDER',
    isCustomizable: true,
    requiresQuote: true,
    stock: 0,
  },
  {
    id: '3',
    slug: 'lampara-mural-geometrica',
    name: 'Lámpara mural geométrica',
    shortDescription: 'Formas escultóricas que juegan con la luz',
    price: 350000,
    compareAtPrice: 390000,
    category: 'Iluminación',
    image: '/productos/lampara-mural-geometrica.png',
    images: ['/productos/lampara-mural-geometrica.png'],
    tags: ['Nuevo'],
    status: 'ACTIVE',
    isCustomizable: false,
    requiresQuote: false,
    stock: 8,
  },
  {
    id: '4',
    slug: 'soporte-dispensadores-metalico',
    name: 'Soporte metálico para dispensadores',
    shortDescription: 'Diseño minimalista para baño u oficina',
    price: 125000,
    compareAtPrice: null,
    category: 'Accesorios',
    image: '/productos/soporte-mural-toallas.png',
    images: ['/productos/soporte-mural-toallas.png'],
    tags: ['Más vendido'],
    status: 'ACTIVE',
    isCustomizable: false,
    requiresQuote: false,
    stock: 25,
  },
  {
    id: '5',
    slug: 'placa-personalizada-grabada',
    name: 'Placa personalizada grabada láser',
    shortDescription: 'Señalética elegante para interior o exterior',
    price: 85000,
    compareAtPrice: null,
    category: 'Regalos personalizados',
    image: '/productos/organizador-mural-jardin.png',
    images: ['/productos/organizador-mural-jardin.png'],
    tags: ['Personalizable'],
    status: 'ACTIVE',
    isCustomizable: true,
    requiresQuote: false,
    stock: 50,
  },
  {
    id: '6',
    slug: 'repisa-flotante-metal-negro',
    name: 'Repisa flotante metal negro',
    shortDescription: 'Línea limpia para exhibición decorativa',
    price: 165000,
    compareAtPrice: 195000,
    category: 'Muebles y soportes',
    image: '/productos/mesa-auxiliar-vinyl-stand.png',
    images: ['/productos/mesa-auxiliar-vinyl-stand.png'],
    tags: ['Nuevo'],
    status: 'ACTIVE',
    isCustomizable: true,
    requiresQuote: false,
    stock: 12,
  },
  {
    id: '7',
    slug: 'panel-metalico-interior-texturizado',
    name: 'Panel metálico texturizado para interior',
    shortDescription: 'Acabado artesanal con relieve sutil',
    price: 280000,
    compareAtPrice: null,
    category: 'Decoración interior',
    image: '/productos/panel-decorativo-arbol-de-luz.png',
    images: ['/productos/panel-decorativo-arbol-de-luz.png'],
    tags: ['Hecho bajo pedido'],
    status: 'MADE_TO_ORDER',
    isCustomizable: true,
    requiresQuote: true,
    stock: 0,
  },
  {
    id: '8',
    slug: 'lampara-decorativa-restaurante',
    name: 'Lámpara decorativa para restaurante',
    shortDescription: 'Iluminación ambiental con presencia escultórica',
    price: 580000,
    compareAtPrice: null,
    category: 'Iluminación',
    image: '/productos/lampara-mural-geometrica.png',
    images: ['/productos/lampara-mural-geometrica.png'],
    tags: ['Hecho bajo pedido'],
    status: 'REQUIRES_QUOTE',
    isCustomizable: true,
    requiresQuote: true,
    stock: 0,
  },
];

interface ProductCardProps {
  product: typeof demoProducts[0];
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.requiresQuote || product.status === 'REQUIRES_QUOTE') {
      toast({
        title: 'Requiere cotización',
        description: 'Este producto necesita una cotización personalizada. Te redirigimos al formulario.',
        variant: 'default',
      });
      setTimeout(() => {
        router.push(`/disena-tu-pieza?product=${product.slug}`);
      }, 1500);
      return;
    }

    if (product.status === 'OUT_OF_STOCK' || product.stock <= 0) {
      toast({
        title: 'Producto agotado',
        description: 'Este producto no tiene stock disponible actualmente.',
        variant: 'destructive',
      });
      return;
    }

    setIsAdding(true);
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      slug: product.slug,
      isCustomizable: product.isCustomizable,
      requiresQuote: product.requiresQuote,
    });
    setIsAdding(false);

    toast({
      title: 'Agregado al carrito',
      description: `${product.name} se ha agregado a tu carrito`,
      variant: 'success',
    });
  };

  const getStatusBadge = () => {
    switch (product.status) {
      case 'MADE_TO_ORDER':
        return <Badge variant="warning">Hecho bajo pedido</Badge>;
      case 'REQUIRES_QUOTE':
        return <Badge variant="irons-gold">Requiere cotización</Badge>;
      case 'OUT_OF_STOCK':
        return <Badge variant="destructive">Agotado</Badge>;
      default:
        return null;
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-xl border border-irons-stone-gray bg-irons-warm-white transition-all duration-500 hover:shadow-xl">
      <Link
        href={`/producto/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-irons-warm-gold focus-visible:ring-offset-2"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-irons-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant={tag === 'Nuevo' ? 'success' : tag === 'Más vendido' ? 'info' : tag === 'Personalizable' ? 'irons-gold' : 'warning'} className="text-xs">
                  {tag}
                </Badge>
              ))}
              {getStatusBadge()}
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="p-2 rounded-full bg-irons-warm-white/90 backdrop-blur-sm text-irons-charcoal shadow-lg hover:bg-irons-warm-white transition-colors"
                aria-label="Añadir a favoritos"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                className="p-2 rounded-full bg-irons-warm-white/90 backdrop-blur-sm text-irons-charcoal shadow-lg hover:bg-irons-warm-white transition-colors"
                aria-label="Vista rápida"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-irons-warm-gold uppercase tracking-wide">
              {product.category}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-irons-metal-light line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <h3 className="text-lg font-display font-bold text-irons-charcoal group-hover:text-irons-warm-gold transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-irons-metal-medium line-clamp-2">{product.shortDescription}</p>

          <div className="flex items-center justify-between pt-2 border-t border-irons-stone-gray">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-display font-bold text-irons-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-irons-metal-light line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <Button
              variant={product.requiresQuote || product.status === 'REQUIRES_QUOTE' ? 'irons-outline' : 'irons'}
              size="sm"
              className="h-9 px-3"
              disabled={product.status === 'OUT_OF_STOCK' || product.stock <= 0}
              onClick={handleAddToCart}
              aria-label={product.requiresQuote ? `Solicitar cotización para ${product.name}` : `Agregar ${product.name} al carrito`}
            >
              {isAdding ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
              ) : product.requiresQuote || product.status === 'REQUIRES_QUOTE' ? (
                <>
                  <Tag className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                  Cotizar
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                  Agregar
                </>
              )}
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-irons-stone-gray/30" aria-labelledby="featured-title">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 id="featured-title" className="text-3xl lg:text-4xl font-display font-bold text-irons-charcoal mb-2">
              Productos destacados
            </h2>
            <p className="text-lg text-irons-metal-medium">Nuestra selección de piezas más solicitadas</p>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center space-x-2 text-sm font-medium text-irons-charcoal hover:text-irons-warm-gold transition-colors self-end"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
