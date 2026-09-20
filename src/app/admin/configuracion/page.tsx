import Link from 'next/link';
import { isSupabaseConfigured } from '@/lib/supabase/config';
export default function AdminConfigurationPage() {
  const ready = isSupabaseConfigured();
  return (
    <main className="grid min-h-screen place-items-center bg-stone-950 p-6 text-white">
      <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-xs uppercase tracking-[.3em] text-amber-400">Irons Admin</p>
        <h1 className="mt-4 text-3xl font-bold">Conectar Supabase</h1>
        <p className="mt-4 text-stone-300">
          {ready
            ? 'Las credenciales públicas están configuradas.'
            : 'El código ya está preparado. Añade estas variables en Coolify y vuelve a desplegar:'}
        </p>
        <pre className="mt-6 overflow-x-auto rounded-xl bg-black/40 p-4 text-xs text-stone-300">{`DATABASE_URL=postgresql://...\nNEXT_PUBLIC_SUPABASE_URL=https://...\nNEXT_PUBLIC_SUPABASE_ANON_KEY=...\nSUPABASE_SERVICE_ROLE_KEY=...\nADMIN_EMAILS=tu@email.com`}</pre>
        {ready && (
          <Link
            href="/admin/login"
            className="mt-6 inline-block rounded-lg bg-amber-500 px-5 py-3 font-semibold text-black"
          >
            Ir al acceso
          </Link>
        )}
      </section>
    </main>
  );
}
