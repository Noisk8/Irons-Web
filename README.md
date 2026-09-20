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
- `/admin` (panel protegido con Supabase Auth; CRUD de productos y categorías)

## Panel administrativo y Supabase

1. Crea el servicio Supabase y configura las variables de `.env.example`.
2. Ejecuta `npx prisma migrate deploy` (o `npm run db:push` durante la primera preparación).
3. Crea el usuario administrador desde Supabase Studio → Authentication → Users.
4. Añade su correo a `ADMIN_EMAILS` y vuelve a desplegar.
5. Entra en `/admin/login`.

Las imágenes se guardan en el bucket público indicado por `SUPABASE_PRODUCT_BUCKET`. La llave `SUPABASE_SERVICE_ROLE_KEY` nunca debe exponerse al navegador.

- `/api/orders`, `/api/quotes`
- `/api/payments/create`, `/api/payments/confirm`, `/api/payments/webhook`

## Integraciones pendientes de credenciales

Los productos y precios son demostrativos. Los pagos usan `MockEpaycoProvider` y no procesan dinero. El endpoint de pedidos busca los productos y recalcula totales en servidor. La carga de archivos queda desactivada hasta conectar Supabase Storage. El panel debe protegerse con Supabase Auth y roles antes de desplegar.
