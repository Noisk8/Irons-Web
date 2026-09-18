import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Irons | Objetos con carácter. Diseñados para durar.',
    template: '%s | Irons',
  },
  description:
    'Metalistería personalizada, grabado láser y decoración en metal para hogares, restaurantes, hoteles y proyectos arquitectónicos. Fabricación colombiana con estándares internacionales.',
  keywords: [
    'metalistería',
    'grabado láser',
    'decoración metálica',
    'muebles a medida',
    'iluminación decorativa',
    'paneles decorativos',
    'fabricación colombiana',
    'diseño personalizado',
  ],
  authors: [{ name: 'Irons' }],
  creator: 'Irons',
  publisher: 'Irons',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: '/',
    siteName: 'Irons',
    title: 'Irons | Objetos con carácter. Diseñados para durar.',
    description:
      'Metalistería personalizada, grabado láser y decoración en metal para hogares y espacios comerciales.',
    images: [{ url: '/productos/Panel decorativo “Árbol de Luz”.png', alt: 'Irons - Metalistería y decoración personalizada' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irons | Objetos con carácter',
    description: 'Metalistería personalizada y decoración en metal.',
    images: ['/productos/Panel decorativo “Árbol de Luz”.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
