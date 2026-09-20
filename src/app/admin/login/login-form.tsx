'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const { error } = await createClient().auth.signInWithPassword({
      email: String(form.get('email')),
      password: String(form.get('password')),
    });
    if (error) {
      setError('Correo o contraseña incorrectos.');
      setLoading(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  }
  return (
    <form onSubmit={submit} className="mt-7 space-y-4">
      <label className="block text-sm font-medium">
        Correo
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border px-3 py-3"
        />
      </label>
      <label className="block text-sm font-medium">
        Contraseña
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border px-3 py-3"
        />
      </label>
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button
        disabled={loading}
        className="w-full rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? 'Ingresando…' : 'Ingresar'}
      </button>
    </form>
  );
}
