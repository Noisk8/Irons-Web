import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma';

function configuredAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isAdmin(user: User) {
  // 1. Verificación rápida por app_metadata de Supabase (Rápido)
  if (user.app_metadata?.role === 'admin') return true;

  // 2. Verificación por base de datos propia (Seguro y Dinámico)
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email?.toLowerCase() },
      select: { role: true },
    });
    if (dbUser?.role === 'admin') return true;
  } catch (e) {
    console.error('Error checking admin role in DB:', e);
  }

  // 3. Respaldo por ADMIN_EMAILS en .env (Compatibilidad)
  const emailAllowed = user.email
    ? configuredAdminEmails().includes(user.email.toLowerCase())
    : false;
  
  return emailAllowed;
}

export async function getAdminUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  const adminStatus = await isAdmin(data.user);
  if (!adminStatus) return null;

  return data.user;
}
