import { NextResponse } from 'next/server';
import { getAdminUser } from './admin-auth';
export async function requireAdminApi() {
  const user = await getAdminUser();
  return user ? null : NextResponse.json({ error: 'No autorizado' }, { status: 401 });
}
