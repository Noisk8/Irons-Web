import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Las confirmaciones se procesan mediante ePayco.' }, { status: 410 });
}
