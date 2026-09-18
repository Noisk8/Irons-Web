/** Configuración preparada para conectar Supabase cuando existan credenciales. */
export function getSupabaseConfig() {
  return { url: process.env.NEXT_PUBLIC_SUPABASE_URL || '', anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '' };
}
