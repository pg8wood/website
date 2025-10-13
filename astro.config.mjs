import { defineConfig } from "astro/config";

import icon from "astro-icon";

export default defineConfig({
  site: "https://patrickgatewood.com",
  outDir: "./dist",
  integrations: [icon()],
});