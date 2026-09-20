import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from './config';
export function createSupabaseAdmin() {
  const { url } = getSupabaseConfig();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
