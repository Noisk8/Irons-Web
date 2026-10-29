const configuredSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let configuredSupabaseOrigin = '';
let configuredSupabaseWebSocketOrigin = '';
let configuredSupabaseHostname = '';

if (configuredSupabaseUrl) {
  try {
    const supabaseUrl = new URL(configuredSupabaseUrl);
    configuredSupabaseOrigin = supabaseUrl.origin;
    configuredSupabaseWebSocketOrigin = supabaseUrl.origin.replace(/^http/, 'ws');
    configuredSupabaseHostname = supabaseUrl.hostname;
  } catch {
    // La validación de Supabase mostrará un error claro si la URL no es válida.
  }
}

const supabaseCspSources = [
  'https://*.supabase.co',
  'wss://*.supabase.co',
  configuredSupabaseOrigin,
  configuredSupabaseWebSocketOrigin,
]
  .filter(Boolean)
  .join(' ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      ...(configuredSupabaseHostname
        ? [{ protocol: 'https', hostname: configuredSupabaseHostname }]
        : []),
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    if (process.env.NODE_ENV !== 'production') return [];
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; img-src 'self' data: blob: ${supabaseCspSources} https://images.unsplash.com https://via.placeholder.com; script-src 'self' 'unsafe-inline' https://checkout.epayco.co https://*.epayco.co; style-src 'self' 'unsafe-inline'; connect-src 'self' ${supabaseCspSources} https://*.epayco.co; frame-src 'self' https://checkout.epayco.co https://*.epayco.co; upgrade-insecure-requests` },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }];
  },
};

module.exports = nextConfig;
