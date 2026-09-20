import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';

function configuredAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdmin(user: User) {
  // app_metadata solo puede modificarla un servidor con service_role.
  const role = user.app_metadata?.role;
  const emailAllowed = user.email
    ? configuredAdminEmails().includes(user.email.toLowerCase())
    : false;
  return role === 'admin' || emailAllowed;
}

export async function getAdminUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user || !isAdmin(data.user)) return null;
  return data.user;
}
