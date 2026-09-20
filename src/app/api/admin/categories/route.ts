import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdminApi } from '@/lib/admin-api';
const input = z.object({
  name: z.string().trim().min(2),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});
export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json(
    await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    })
  );
}
export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    return NextResponse.json(
      await prisma.category.create({ data: input.parse(await req.json()) }),
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Datos inválidos o slug duplicado.' }, { status: 400 });
  }
}
