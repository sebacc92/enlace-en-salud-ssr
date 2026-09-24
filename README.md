# Enlace en Salud

Sitio institucional construido con Qwik y desplegado en Cloudflare Workers + Workers Static Assets.

## Desarrollo

```shell
pnpm install
pnpm dev
```

Las credenciales locales de Workers van en `.dev.vars` (no se versiona). La clave pública de Turnstile se carga desde `.env.local` como `PUBLIC_TURNSTILE_SITE_KEY`.

## Build y deploy

```shell
pnpm build
pnpm deploy:cloudflare
```

La configuración de producción está en [`wrangler.jsonc`](wrangler.jsonc). El Worker usa:

- D1 (`enlace-en-salud-db`) para el contenido y la configuración.
- R2 (`enlace-en-salud-media`) para las imágenes del panel de administración.
- Workers Static Assets para los archivos generados del frontend.

## Migraciones D1

Para aplicar migraciones localmente:

```shell
pnpm exec wrangler d1 migrations apply enlace-en-salud-db --local
```

Para aplicar migraciones en producción:

```shell
pnpm exec wrangler d1 migrations apply enlace-en-salud-db --remote
```

El panel de administración está disponible en `/admin/` y requiere los secretos `ADMIN_USERNAME`, `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET`, además de `RESEND_API_KEY` y `TURNSTILE_SECRET_KEY`.
