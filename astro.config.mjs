import { defineConfig } from "astro/config";

import icon from "astro-icon";

export default defineConfig({
  site: "https://patrickgatewood.com",
  outDir: "./dist",
  publicDir: "./public_html",
  integrations: [icon()],
});
