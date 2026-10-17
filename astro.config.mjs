// @ts-check
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

/**
 * Landing prerenderizada + endpoints SSR (`src/pages/api/*`).
 * El adapter Node permite APIs, formularios y futuras conexiones a BD/pasarelas.
 */
export default defineConfig({
  site: "https://colectivosiete50.com",
  adapter: vercel(),
  integrations: [react()],
  image: {
    domains: ["images.unsplash.com"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});