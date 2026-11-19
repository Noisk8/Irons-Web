import { NextResponse } from 'next/server';
import { ProductStatus } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdminApi } from '@/lib/admin-api';
import { isTrustedAppRequest } from '@/lib/request-security';
const updateInput = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(10).max(5000),
  shortDescription: z.string().trim().max(500).optional().nullable(),
  price: z.coerce.number().min(0),
  compareAtPrice: z.coerce.number().min(0).optional().nullable(),
  categoryId: z.string().max(50),
  material: z.string().trim().max(100).optional().nullable(),
  finish: z.string().trim().max(100).optional().nullable(),
  color: z.string().trim().max(100).optional().nullable(),
  dimensions: z.string().trim().max(200).optional().nullable(),
  usage: z.string().trim().max(100).optional().nullable(),
  productionTime: z.string().trim().max(100).optional().nullable(),
  stock: z.coerce.number().int().min(0),
  isCustomizable: z.boolean(),
  requiresQuote: z.boolean(),
  featured: z.boolean(),
  status: z.nativeEnum(ProductStatus),
  imageUrl: z.string().trim().max(1000).optional().nullable(),
  imageUrls: z.array(z.string().trim().min(1).max(1000)).max(10).optional(),
});
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const { id } = await params;
    const data = updateInput.parse(await request.json());
    const { imageUrl, imageUrls = [], ...product } = data;
    const imageList = [...new Set([imageUrl, ...imageUrls].filter((url): url is string => Boolean(url)))];
    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { id },
        data: {
          ...product,
          shortDescription: product.shortDescription || null,
          compareAtPrice: product.compareAtPrice || null,
        },
      });
      await tx.productImage.deleteMany({ where: { productId: id } });
      if (imageList.length) await tx.productImage.createMany({
        data: imageList.map((url, index) => ({ productId: id, url, alt: product.name, isPrimary: index === 0, sortOrder: index })),
      });
      return updated;
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'No fue posible actualizar el producto.' }, { status: 400 });
  }
}
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  if (!isTrustedAppRequest(request)) return NextResponse.json({ error: 'Origen no autorizado' }, { status: 403 });
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({ where: { id }, include: { category: true } });
    if (!product) return NextResponse.json({ error: 'Producto no encontrado.' }, { status: 404 });
    if (product.status !== 'DRAFT') return NextResponse.json({ error: 'El producto ya no está en borrador. Actualiza la página.' }, { status: 409 });
    if (!product.category.isActive) return NextResponse.json({ error: 'Activa la categoría antes de publicar el producto.' }, { status: 400 });
    if (!product.requiresQuote && product.stock > 0 && product.price.lte(0)) return NextResponse.json({ error: 'Ingresa un precio mayor que cero antes de publicar.' }, { status: 400 });
    const status = product.requiresQuote ? ProductStatus.REQUIRES_QUOTE : product.stock > 0 ? ProductStatus.ACTIVE : ProductStatus.OUT_OF_STOCK;
    const result = await prisma.product.updateMany({ where: { id, status: 'DRAFT', stock: product.stock, requiresQuote: product.requiresQuote, price: product.price, categoryId: product.categoryId, category: { isActive: true } }, data: { status } });
    if (!result.count) return NextResponse.json({ error: 'El producto cambió. Actualiza la página y vuelve a intentarlo.' }, { status: 409 });
    return NextResponse.json({ status });
  } catch {
    return NextResponse.json({ error: 'No fue posible publicar el producto.' }, { status: 500 });
  }
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          'No se puede eliminar: puede estar asociado a pedidos o cotizaciones. Puedes archivarlo.',
      },
      { status: 409 }
    );
  }
}
