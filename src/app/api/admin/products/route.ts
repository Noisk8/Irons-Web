import { NextResponse } from 'next/server';
import { ProductStatus } from '@prisma/client';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdminApi } from '@/lib/admin-api';

const productInput = z.object({
  name: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(10),
  shortDescription: z.string().trim().optional().nullable(),
  price: z.coerce.number().min(0),
  compareAtPrice: z.coerce.number().min(0).optional().nullable(),
  categoryId: z.string().min(1),
  material: z.string().optional().nullable(),
  finish: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  dimensions: z.string().optional().nullable(),
  usage: z.string().optional().nullable(),
  productionTime: z.string().optional().nullable(),
  stock: z.coerce.number().int().min(0),
  isCustomizable: z.boolean().default(false),
  requiresQuote: z.boolean().default(false),
  featured: z.boolean().default(false),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.DRAFT),
  imageUrl: z.string().trim().optional().nullable(),
});

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const products = await prisma.product.findMany({
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json(products);
}
export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const data = productInput.parse(await request.json());
    const { imageUrl, ...product } = data;
    const created = await prisma.product.create({
      data: {
        ...product,
        shortDescription: product.shortDescription || null,
        compareAtPrice: product.compareAtPrice || null,
        images: imageUrl
          ? { create: { url: imageUrl, alt: product.name, isPrimary: true } }
          : undefined,
      },
      include: { category: true, images: true },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: 'Revisa los campos del producto.', details: error.flatten() },
        { status: 400 }
      );
    if (error instanceof Error && error.message.includes('Unique constraint'))
      return NextResponse.json({ error: 'Ya existe un producto con ese slug.' }, { status: 409 });
    return NextResponse.json({ error: 'No fue posible crear el producto.' }, { status: 500 });
  }
}
