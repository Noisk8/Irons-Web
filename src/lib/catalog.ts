import type { DemoProduct } from '@/data/products';
import { products as fallbackProducts } from '@/data/products';
import prisma from '@/lib/prisma';

export async function getCatalogProducts(): Promise<DemoProduct[]> {
  try {
    const rows = await prisma.product.findMany({
      where: {
        status: { in: ['ACTIVE', 'MADE_TO_ORDER', 'REQUIRES_QUOTE', 'OUT_OF_STOCK'] },
        category: { isActive: true },
      },
      include: {
        category: true,
        images: { orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }] },
      },
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    const databaseProducts: DemoProduct[] = rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category.name,
      categorySlug: p.category.slug,
      description: p.description,
      price: Number(p.price),
      compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : undefined,
      image: p.images[0]?.url || '/productos/Panel decorativo “Árbol de Luz”.png',
      material: p.material || 'Por definir',
      finish: p.finish || 'Por definir',
      color: p.color || 'Por definir',
      dimensions: p.dimensions || 'A medida',
      usage: p.usage || 'Interior',
      productionTime: p.productionTime || 'Bajo pedido',
      stock: p.stock,
      customizable: p.isCustomizable,
      requiresQuote: p.requiresQuote,
      featured: p.featured,
    }));
    const databaseSlugs = new Set(databaseProducts.map((p) => p.slug));
    return [...databaseProducts, ...fallbackProducts.filter((p) => !databaseSlugs.has(p.slug))];
  } catch {
    return fallbackProducts;
  }
}

export async function getCatalogProduct(slug: string) {
  return (await getCatalogProducts()).find((product) => product.slug === slug);
}
