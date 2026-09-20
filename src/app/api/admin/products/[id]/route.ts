import { NextResponse } from 'next/server';
import { ProductStatus } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdminApi } from '@/lib/admin-api';
const updateInput = z.object({
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(10),
  shortDescription: z.string().optional().nullable(),
  price: z.coerce.number().min(0),
  compareAtPrice: z.coerce.number().min(0).optional().nullable(),
  categoryId: z.string(),
  material: z.string().optional().nullable(),
  finish: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  usage: z.string().optional().nullable(),
  productionTime: z.string().optional().nullable(),
  stock: z.coerce.number().int().min(0),
  isCustomizable: z.boolean(),
  requiresQuote: z.boolean(),
  featured: z.boolean(),
  status: z.nativeEnum(ProductStatus),
  imageUrl: z.string().optional().nullable(),
});
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const { id } = await params;
    const data = updateInput.parse(await request.json());
    const { imageUrl, ...product } = data;
    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { id },
        data: {
          ...product,
          shortDescription: product.shortDescription || null,
          compareAtPrice: product.compareAtPrice || null,
        },
      });
      if (imageUrl) {
        await tx.productImage.updateMany({ where: { productId: id }, data: { isPrimary: false } });
        await tx.productImage.upsert({
          where: {
            id:
              (await tx.productImage.findFirst({ where: { productId: id, url: imageUrl } }))?.id ??
              'new-image',
          },
          update: { isPrimary: true, alt: product.name },
          create: { productId: id, url: imageUrl, alt: product.name, isPrimary: true },
        });
      }
      return updated;
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'No fue posible actualizar el producto.' }, { status: 400 });
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
