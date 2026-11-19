/** Import the former static catalog as drafts. Existing products are never changed. */
import { PrismaClient } from '@prisma/client';
import { products } from '../src/data/products';

process.loadEnvFile('.env');
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    for (const product of products) {
      const existing = await tx.product.findUnique({ where: { slug: product.slug }, select: { id: true } });
      if (existing) {
        console.log(`Ya existe: ${product.slug}`);
        continue;
      }
      const category = await tx.category.upsert({
        where: { slug: product.categorySlug },
        update: {},
        create: { name: product.category, slug: product.categorySlug, isActive: true },
      });
      await tx.product.create({
        data: {
          slug: product.slug, name: product.name, description: product.description,
          price: product.price, compareAtPrice: product.compareAtPrice, categoryId: category.id,
          material: product.material, finish: product.finish, color: product.color,
          dimensions: product.dimensions, usage: product.usage, productionTime: product.productionTime,
          stock: product.stock, isCustomizable: product.customizable, requiresQuote: product.requiresQuote,
          featured: product.featured ?? false, status: 'DRAFT',
          images: { create: [...new Set([product.image, ...(product.galleryImages ?? [])])].map((url, index) => ({ url, alt: product.name, sortOrder: index, isPrimary: index === 0 })) },
        },
      });
      console.log(`Borrador creado: ${product.slug}`);
    }
  }, { timeout: 30000 });
}

main().catch((error) => { console.error('No se pudieron importar los borradores; no se guardaron cambios.', error.code || error.name); process.exitCode = 1; }).finally(() => prisma.$disconnect());
