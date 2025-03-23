import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: vercel(),

  vite: {
    plugins: [react(), tailwindcss()],
  },

  integrations: [react()],
});