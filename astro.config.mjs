// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server", // <-- ESTA ES LA LÍNEA QUE FALTABA
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
