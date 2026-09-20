import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
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
    const supabase = createSupabaseAdmin();
    const bucket = process.env.SUPABASE_PRODUCT_BUCKET || 'product-images';
    await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 8 * 1024 * 1024,
      allowedMimeTypes: [...allowed],
    });
    const ext = file.name.split('.').pop()?.toLowerCase() || 'webp';
    const path = `products/${Date.now()}-${randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: file.type, upsert: false });
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
