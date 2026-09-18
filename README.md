# Irons Web

Primera fase funcional de la tienda de diseño y metalistería Irons. Incluye portada, catálogo filtrable, fichas de producto, carrito persistente, cotizaciones, grabado láser, portafolio, páginas institucionales, SEO y APIs mock de pedidos/pagos.

## Requisitos e instalación

Usa Node.js 20 LTS y PostgreSQL 15+ o Supabase.

```bash
cp .env.example .env
npm install
npx prisma generate
npm run dev
```

Configura `DATABASE_URL` antes de ejecutar `npx prisma db push` y `npm run db:seed`.

## Verificación

```bash
npm test
npx tsc --noEmit
npm run build
```

## Rutas

- `/`, `/tienda`, `/producto/[slug]`, `/carrito`
- `/disena-tu-pieza`, `/grabado-laser`, `/proyectos`
- `/nosotros`, `/contacto`, `/buscar`
- `/admin` (estructura visual; requiere autenticación antes de producción)
- `/api/orders`, `/api/quotes`
- `/api/payments/create`, `/api/payments/confirm`, `/api/payments/webhook`

## Integraciones pendientes de credenciales

Los productos y precios son demostrativos. Los pagos usan `MockEpaycoProvider` y no procesan dinero. El endpoint de pedidos busca los productos y recalcula totales en servidor. La carga de archivos queda desactivada hasta conectar Supabase Storage. El panel debe protegerse con Supabase Auth y roles antes de desplegar.
