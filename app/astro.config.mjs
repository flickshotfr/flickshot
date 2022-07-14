import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import turbolinks from "@astrojs/turbolinks";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3030,
  },
  integrations: [vue(), tailwind(), turbolinks(), partytown(), sitemap()],
});
