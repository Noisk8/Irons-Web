import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/admin-auth';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductsManager } from './products-manager';
export const dynamic = 'force-dynamic';
export default async function ProductsPage() {
  if (!isSupabaseConfigured()) redirect('/admin/configuracion');
  if (!(await getAdminUser())) redirect('/admin/login');
  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <AdminHeader title="Productos" />
        <ProductsManager />
      </div>
    </main>
  );
}
