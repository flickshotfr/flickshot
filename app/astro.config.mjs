import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3030,
  },
  integrations: [tailwind(), sitemap()],
});
