import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import sharp from 'sharp';
import { requireAdminApi } from '@/lib/admin-api';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
export async function POST(request: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File) || !allowed.has(file.type) || file.size > 8 * 1024 * 1024)
      return NextResponse.json(
        { error: 'Usa JPG, PNG, WebP o AVIF de máximo 8 MB.' },
        { status: 400 }
      );
    const optimized = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer();
    const supabase = createSupabaseAdmin();
    const bucket = process.env.SUPABASE_PRODUCT_BUCKET || 'product-images';
    await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 8 * 1024 * 1024,
      allowedMimeTypes: [...allowed],
    });
    const path = `products/${Date.now()}-${randomUUID()}.webp`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, optimized, { contentType: 'image/webp', upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No fue posible subir la imagen.' },
      { status: 500 }
    );
  }
}
