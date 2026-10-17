# Colectivo Siete50

Base de producción para un sitio de alto rendimiento: **Astro 7 + TypeScript estricto**, islas **React 19**, **Tailwind CSS v4**, **shadcn/ui**, **Lucide** y **Framer Motion**. La landing se prerenderiza; los endpoints viven en Node (`@astrojs/node`) para conectar correo, base de datos o pasarelas sin rehacer el esqueleto.

## Arquitectura

```
src/
  layouts/Layout.astro          # Shell HTML, SEO y estilos globales
  pages/
    index.astro                 # Composición de la landing
    api/contact.ts              # POST JSON validado en servidor
  components/
    astro/                      # Estructura y multimedia estática
    react/                      # Islas interactivas (Navbar → Footer)
    ui/                         # Primitivos shadcn
  types/                        # Contratos de dominio y API
  lib/                          # cn(), Zod, WhatsApp, motion, env
  services/                     # Negocio desacoplado (mail + contacto)
  data/site.ts                  # Contenido editable de la marca
  styles/global.css             # Design tokens Tailwind v4 + shadcn
```

**Por qué este corte**

- Astro entrega HTML estático en la landing; React solo hidrata lo interactivo (`client:load` / `client:visible`).
- El formulario valida dos veces: Zod + React Hook Form en el cliente, el mismo schema en `src/pages/api/contact.ts`.
- `src/services/` aísla correo y WhatsApp. Cambiar Resend, Nodemailer o una BD no toca los componentes.
- Framer Motion usa `viewport={{ once: true }}` para no penalizar el scroll.

## Requisitos previos

- Node.js 22.12 o superior
- npm 11+

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

El servidor de desarrollo queda en `http://localhost:4321`.

## Variables de entorno

| Clave | Uso |
| --- | --- |
| `PUBLIC_SITE_URL` | URL canónica (SEO y OG) |
| `PUBLIC_WHATSAPP_NUMBER` | Número internacional sin `+` (ej. `5215512345678`) |
| `PUBLIC_CONTACT_EMAIL` | Correo público |
| `MAIL_PROVIDER` | `console` (simulado), `resend` o `nodemailer` |
| `RESEND_API_KEY` / `SMTP_*` | Credenciales cuando dejes de simular el correo |

Las claves `PUBLIC_*` se exponen al navegador. El resto solo existe en el servidor.

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Entorno local con HMR |
| `npm run build` | Build de producción (Node standalone) |
| `npm run preview` | Sirve el build |
| `npm run check` | TypeScript + Astro check |

El adapter Node genera un servidor en `dist/server/entry.mjs` listo para Docker, un VPS o un process manager.

## Rutas y extensión

- Páginas: un archivo en `src/pages/` = una URL. Ejemplo: `src/pages/estudio.astro` → `/estudio`.
- API: `src/pages/api/nombre.ts` exporta `GET`/`POST` (`APIRoute`). Siempre `export const prerender = false`.
- Nueva sección: componente en `src/components/react/`, datos en `src/data/site.ts`, montaje en `index.astro` con `client:visible`.
- shadcn: `npx shadcn@latest add dialog`.

### Flujo de contacto

1. El cliente envía JSON a `POST /api/contact`.
2. Zod valida el cuerpo.
3. `mail.service` simula o encola el correo según `MAIL_PROVIDER`.
4. La respuesta incluye `whatsapp.url` con el mensaje preformateado. Si el usuario eligió WhatsApp, el cliente abre esa URL.

Para activar Resend o SMTP, implementa el cuerpo marcado en `src/services/mail.service.ts` e instala el SDK (`resend` o `nodemailer`).

## Multimedia

Coloca reels en `public/media/` (MP4 H.264 + poster). Los componentes usan `preload="none"`, `muted`, `loop` y `playsInline`. Las imágenes remotas de Unsplash están permitidas en `astro.config.mjs`; añade tu CDN en `image.domains`.

## Diseño

Tema oscuro por defecto (`<html class="dark">`). Tokens en `src/styles/global.css`. Copia y casos se editan en `src/data/site.ts` sin tocar la UI.
