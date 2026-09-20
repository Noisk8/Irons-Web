import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/admin-auth';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { AdminLoginForm } from './login-form';
export const dynamic = 'force-dynamic';
export default async function AdminLoginPage() {
  if (!isSupabaseConfigured()) redirect('/admin/configuracion');
  if (await getAdminUser()) redirect('/admin');
  return (
    <main className="grid min-h-screen place-items-center bg-stone-950 p-6">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8">
        <p className="text-xs uppercase tracking-[.3em] text-amber-700">Irons</p>
        <h1 className="mt-3 text-3xl font-bold">Panel administrativo</h1>
        <p className="mt-2 text-sm text-stone-500">Acceso exclusivo para administradores.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
