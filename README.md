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

El endpoint de pedidos busca los productos, recalcula totales en servidor y reserva el inventario al crear el pedido. El inventario se libera si el pago es rechazado, fallido, reversado o si el pedido expira sin pagarse. La carga de archivos queda desactivada hasta conectar Supabase Storage. El panel debe protegerse con Supabase Auth y roles antes de desplegar.

## Preparación segura para ePayco

La tienda está preparada para delegar la captura de tarjetas al checkout alojado/tokenizado de ePayco: Irons no debe recibir, registrar ni almacenar números de tarjeta, CVV o fechas de vencimiento.

Antes de activar pagos reales:

1. Configura en el gestor de secretos del hosting (nunca en Git) `EPAYCO_PUBLIC_KEY`, `EPAYCO_PRIVATE_KEY`, `EPAYCO_P_CUST_ID_CLIENTE` y `EPAYCO_P_KEY`.
2. Configura la URL de confirmación HTTPS como `https://irons.company/api/payments/webhook` y la de respuesta como `https://irons.company/pago/resultado`.
3. Mantén `EPAYCO_TEST_MODE=true` hasta completar pruebas con las credenciales de pruebas. Cambia a producción solo con las credenciales productivas de ePayco.
4. El servidor recupera el pedido y su total desde la base de datos; nunca acepta el total enviado por el navegador.

`EPAYCO_TEST_MODE` solo controla el flag `test` del checkout: `true` usa el sandbox de ePayco y `false` cobra dinero real. El webhook valida la firma SHA-256 de ePayco y no confirma pagos desde la URL de retorno. Además, el sitio publica HSTS, CSP, protección contra clickjacking, `nosniff`, política de referencia restrictiva y bloqueo de solicitudes cross-site para los endpoints de pedido/pago en producción.
