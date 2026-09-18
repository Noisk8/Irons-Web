'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Search, Phone, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet-new';
import { useCartStore } from '@/store/cart';
import { getWhatsAppUrl } from '@/lib/utils';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Hogar', href: '/home' },
  {
    name: 'Tienda',
    href: '/tienda',
    children: [
      { name: 'Decoración interior', href: '/tienda?category=decoracion-interior' },
      { name: 'Paneles', href: '/tienda?category=paneles' },
      { name: 'Decoración exterior', href: '/tienda?category=decoracion-exterior' },
      { name: 'Iluminación', href: '/tienda?category=iluminacion' },
      { name: 'Muebles y soportes', href: '/tienda?category=muebles-soportes' },
      { name: 'Accesorios', href: '/tienda?category=accesorios' },
      { name: 'Regalos personalizados', href: '/tienda?category=regalos-personalizados' },
    ],
  },
  {
    name: 'Servicios',
    href: '/servicios',
    children: [
      { name: 'Todos los servicios', href: '/servicios' },
      { name: 'Diseña tu pieza', href: '/disena-tu-pieza' },
      { name: 'Grabado láser', href: '/grabado-laser' },
    ],
  },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { items, openCart, getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-irons-warm-white/95 backdrop-blur-sm shadow-sm border-b border-irons-stone-gray'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2" aria-label="Irons - Inicio">
            <span className="text-2xl font-display font-bold text-irons-charcoal tracking-tight">
              Irons
            </span>
            <span className="hidden xl:block text-xs text-irons-metal-medium uppercase tracking-widest">
              Objetos con carácter
            </span>
          </Link>

          <div className="hidden xl:flex xl:items-center xl:space-x-6">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>

          <div className="hidden xl:flex xl:items-center xl:space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/buscar">
                <Search className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Buscar</span>
              </Link>
            </Button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1 text-sm text-irons-metal-medium hover:text-irons-charcoal transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <Button variant="ghost" size="sm" asChild onClick={openCart}>
              <Link href="/carrito">
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Carrito</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-irons-charcoal text-xs text-irons-warm-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="irons" size="sm" asChild className="hidden sm:inline-flex">
              <Link href="/disena-tu-pieza">
                <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                Diseña tu pieza
              </Link>
            </Button>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Abrir menú">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                  <span className="font-display font-bold text-xl text-irons-charcoal">Irons</span>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" aria-label="Cerrar menú">
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-4">
                  {navigation.map((item) => (
                    <MobileNavItem key={item.name} item={item} onNavigate={() => setMobileMenuOpen(false)} />
                  ))}
                  <div className="border-t my-4 pt-4 space-y-3">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-sm text-irons-metal-medium hover:text-irons-charcoal"
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                    <Button variant="irons" className="w-full justify-center" asChild>
                      <Link href="/disena-tu-pieza" onClick={() => setMobileMenuOpen(false)}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Diseña tu pieza
                      </Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function NavItem({ item }: { item: typeof navigation[0] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="text-sm font-medium text-irons-metal-dark hover:text-irons-charcoal transition-colors"
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center space-x-1 text-sm font-medium text-irons-metal-dark hover:text-irons-charcoal transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {item.name}
        <span className="text-irons-metal-light" aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 min-w-[220px] pt-2">
          <div className="animate-slide-down rounded-md border border-irons-stone-gray bg-irons-warm-white py-2 shadow-lg">
            {item.children!.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm text-irons-metal-dark hover:bg-irons-stone-gray hover:text-irons-charcoal focus:bg-irons-stone-gray focus:outline-none"
              >
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item, onNavigate }: { item: typeof navigation[0]; onNavigate: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block py-2 text-sm font-medium text-irons-metal-dark hover:text-irons-charcoal"
        onClick={onNavigate}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-sm font-medium text-irons-metal-dark"
        aria-expanded={isOpen}
      >
        {item.name}
        <span className={cn('transition-transform', isOpen && 'rotate-180')}>▾</span>
      </button>
      {isOpen && (
        <div className="pl-4 py-2 space-y-1 border-l border-irons-stone-gray">
          {item.children!.map((child) => (
            <Link
              key={child.name}
              href={child.href}
              className="block py-1 text-sm text-irons-metal-medium hover:text-irons-charcoal"
              onClick={onNavigate}
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
