import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://aholicg.github.io",
  base: "/APT-Research",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
