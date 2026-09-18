'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, Truck, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

const footerLinks = {
  tienda: [
    { name: 'Colección Hogar', href: '/home' },
    { name: 'Paneles', href: '/tienda?category=paneles' },
    { name: 'Decoración interior', href: '/tienda?category=decoracion-interior' },
    { name: 'Decoración exterior', href: '/tienda?category=decoracion-exterior' },
    { name: 'Iluminación', href: '/tienda?category=iluminacion' },
    { name: 'Muebles y soportes', href: '/tienda?category=muebles-soportes' },
    { name: 'Accesorios', href: '/tienda?category=accesorios' },
    { name: 'Regalos personalizados', href: '/tienda?category=regalos-personalizados' },
  ],
  servicios: [
    { name: 'Todos los servicios', href: '/servicios' },
    { name: 'Diseña tu pieza', href: '/disena-tu-pieza' },
    { name: 'Grabado láser', href: '/grabado-laser' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Metalistería a medida', href: '/disena-tu-pieza?type=metalisteria' },
  ],
  empresa: [
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Preguntas frecuentes', href: '/faq' },
  ],
  soporte: [
    { name: 'Envíos y entregas', href: '/envios' },
    { name: 'Devoluciones', href: '/devoluciones' },
    { name: 'Garantía', href: '/garantia' },
    { name: 'Términos y condiciones', href: '/terminos' },
    { name: 'Política de privacidad', href: '/privacidad' },
  ],
};

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-irons-charcoal text-irons-stone-gray" role="contentinfo">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-7 lg:gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block" aria-label="Irons - Inicio">
              <span className="text-3xl font-display font-bold text-irons-warm-white tracking-tight">
                Irons
              </span>
            </Link>
            <p className="text-irons-metal-light text-sm leading-relaxed max-w-xs">
              Objetos con carácter. Diseñados para durar. Metalistería personalizada, grabado láser y decoración
              para hogares y espacios comerciales.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-irons-metal-light hover:text-irons-warm-gold transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Tienda">
            <h3 className="text-irons-warm-white font-medium mb-4">Tienda</h3>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-irons-metal-light hover:text-irons-warm-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Servicios">
            <h3 className="text-irons-warm-white font-medium mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-irons-metal-light hover:text-irons-warm-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Empresa">
            <h3 className="text-irons-warm-white font-medium mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-irons-metal-light hover:text-irons-warm-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Soporte">
            <h3 className="text-irons-warm-white font-medium mb-4">Soporte</h3>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-irons-metal-light hover:text-irons-warm-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <h3 className="text-irons-warm-white font-medium">Contacto</h3>
            <address className="not-italic space-y-3 text-sm">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-irons-metal-light hover:text-irons-warm-gold transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center space-x-2 text-irons-metal-light">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href="mailto:hola@irons.com" className="hover:text-irons-warm-gold transition-colors">
                  hola@irons.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-irons-metal-light">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Medellín, Colombia</span>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-irons-metal-dark">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3 text-sm text-irons-metal-light">
              <Truck className="h-5 w-5 text-irons-warm-gold" aria-hidden="true" />
              <div>
                <p className="font-medium text-irons-warm-white">Envío nacional</p>
                <p>Cobertura en principales ciudades</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-irons-metal-light">
              <Shield className="h-5 w-5 text-irons-warm-gold" aria-hidden="true" />
              <div>
                <p className="font-medium text-irons-warm-white">Garantía de calidad</p>
                <p>Piezas revisadas antes de enviar</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-irons-metal-light">
              <Sparkles className="h-5 w-5 text-irons-warm-gold" aria-hidden="true" />
              <div>
                <p className="font-medium text-irons-warm-white">Hecho en Colombia</p>
                <p>Fabricación local con estándares internacionales</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-irons-metal-dark flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-irons-metal-light">
              © {new Date().getFullYear()} Irons. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4 text-sm text-irons-metal-light">
              <a href="/terminos" className="hover:text-irons-warm-gold transition-colors">
                Términos y condiciones
              </a>
              <a href="/privacidad" className="hover:text-irons-warm-gold transition-colors">
                Política de privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
