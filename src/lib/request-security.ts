const developmentOrigins = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

/**
 * Blocks cross-site browser requests to endpoints that create an order or
 * initiate a payment. Webhooks must not use this check: they are verified
 * with ePayco's cryptographic signature instead.
 */
export function isTrustedAppRequest(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
    : null;

  return origin === configuredOrigin ||
    (process.env.NODE_ENV !== 'production' && developmentOrigins.has(origin));
}

export function privateApiHeaders() {
  return {
    'Cache-Control': 'no-store, max-age=0',
    'X-Content-Type-Options': 'nosniff',
  };
}
