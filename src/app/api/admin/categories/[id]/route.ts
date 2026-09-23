import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdminApi } from '@/lib/admin-api';
const input = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(2000).optional().nullable(),
  parentId: z.string().max(50).optional().nullable(),
  isActive: z.boolean(),
});
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const { id } = await params;
    const data = input.parse(await req.json());
    if (data.parentId === id) data.parentId = null;
    return NextResponse.json(await prisma.category.update({ where: { id }, data }));
  } catch {
    return NextResponse.json({ error: 'No fue posible actualizar la categoría.' }, { status: 400 });
  }
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'La categoría tiene productos o subcategorías y no puede eliminarse.' },
      { status: 409 }
    );
  }
}
