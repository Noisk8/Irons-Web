import type { MetadataRoute } from 'next';
import { getCatalogProducts } from '@/lib/catalog';

export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://irons.company';
  const routes = ['', '/home', '/tienda', '/servicios', '/disena-tu-pieza', '/grabado-laser', '/proyectos', '/nosotros', '/contacto'];
  const products = await getCatalogProducts();
  return [...routes.map((url) => ({ url: `${base}${url}`, lastModified: new Date() })), ...products.map((product) => ({ url: `${base}/producto/${product.slug}`, lastModified: new Date() }))];
}
