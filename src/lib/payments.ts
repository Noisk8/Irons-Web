import { z } from 'zod';

const config = z.object({
  EPAYCO_PUBLIC_KEY: z.string().min(1), EPAYCO_PRIVATE_KEY: z.string().min(1),
  EPAYCO_P_CUST_ID_CLIENTE: z.string().min(1), EPAYCO_P_KEY: z.string().min(1),
  EPAYCO_TEST_MODE: z.enum(['true', 'false']),
  EPAYCO_RESPONSE_URL: z.string().url(), EPAYCO_CONFIRMATION_URL: z.string().url(),
});

export function paymentConfig() {
  return config.parse(process.env);
}

export async function createEpaycoSession(invoice: string, amount: number, currency: string) {
  const settings = paymentConfig();
  const login = await fetch('https://apify.epayco.co/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Basic ${Buffer.from(`${settings.EPAYCO_PUBLIC_KEY}:${settings.EPAYCO_PRIVATE_KEY}`).toString('base64')}` },
    signal: AbortSignal.timeout(15000), cache: 'no-store',
  });
  if (!login.ok) throw new Error('Error de autenticación con ePayco');
  const auth = z.object({ token: z.string().min(1) }).parse(await login.json());
  const response = await fetch('https://apify.epayco.co/payment/session/create', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
    body: JSON.stringify({ checkout_version: '2', name: 'Irons', description: `Pedido ${invoice}`, currency, amount, Invoice: invoice, country: 'CO', lang: 'ES', response: settings.EPAYCO_RESPONSE_URL, confirmation: settings.EPAYCO_CONFIRMATION_URL, method: 'GET' }),
    signal: AbortSignal.timeout(15000), cache: 'no-store',
  });
  if (!response.ok) throw new Error('No se pudo crear la sesión de ePayco');
  const session = z.object({ success: z.literal(true), data: z.object({ sessionId: z.string().min(1) }) }).parse(await response.json());
  return { sessionId: session.data.sessionId, test: settings.EPAYCO_TEST_MODE === 'true' };
}

export async function lookupEpayco(reference: string) {
  if (!/^[a-zA-Z0-9-]{1,100}$/.test(reference)) throw new Error('Referencia inválida');
  const response = await fetch(`https://secure.epayco.co/validation/v1/reference/${encodeURIComponent(reference)}`, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('No se pudo consultar ePayco');
  const body = z.object({ success: z.literal(true), data: z.record(z.unknown()) }).parse(await response.json());
  return Object.fromEntries(Object.entries(body.data).map(([key, value]) => [key, String(value ?? '')]));
}
