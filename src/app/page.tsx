import { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CustomPiece } from '@/components/home/CustomPiece';
import { Projects } from '@/components/home/Projects';
import { Process } from '@/components/home/Process';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';
import { WhatsAppFloat } from '@/components/home/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Objetos con carácter. Diseñados para durar.',
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
  openGraph: {
    title: 'Irons | Objetos con carácter. Diseñados para durar.',
    description:
      'Metalistería personalizada, grabado láser y decoración en metal para hogares y espacios comerciales.',
    images: [
      {
        url: '/productos/Panel decorativo “Árbol de Luz”.png',
        alt: 'Irons - Metalistería y decoración personalizada',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CustomPiece />
      <Projects />
      <Process />
      <Testimonials />
      <FinalCTA />
      <WhatsAppFloat />
    </Layout>
  );
}
