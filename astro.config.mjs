import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";


const me = "furuuwu";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  site: `https://${me}.github.io`,
  base: '/',
});