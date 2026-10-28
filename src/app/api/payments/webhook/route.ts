import { NextResponse } from 'next/server';
import { EpaycoConfirmation, epaycoPaymentStatus, isValidEpaycoConfirmation } from '@/lib/epayco';

export const runtime = 'nodejs';

function cleanPayload(values: Iterable<[string, string]>): EpaycoConfirmation {
  return Object.fromEntries(Array.from(values, ([key, value]) => [key, value]));
}

async function readPayload(request: Request): Promise<EpaycoConfirmation> {
  if (request.method === 'GET') return cleanPayload(new URL(request.url).searchParams.entries());
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const data = await request.json() as Record<string, unknown>;
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)]));
  }
  return cleanPayload((await request.formData()).entries() as Iterable<[string, string]>);
}

async function confirmation(request: Request) {
  try {
    const payload = await readPayload(request);
    if (!isValidEpaycoConfirmation(payload)) {
      return NextResponse.json({ received: false, error: 'Confirmación no válida' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    }
    // Never trust the response URL for fulfilment. Persistent orders must match
    // reference, amount and currency here before their status can be changed.
    return NextResponse.json({ received: true, verified: true, status: epaycoPaymentStatus(payload) }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ received: false, error: 'Formato de confirmación inválido' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }
}

export const POST = confirmation;
export const GET = confirmation;
