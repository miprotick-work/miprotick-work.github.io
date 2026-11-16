// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed from https://github.com/miprotick-work/miprotick-work.github.io
// to https://miprotick-work.github.io/ (a GitHub Pages user site, served from the domain root).
// Keep `site` in sync with `url` in src/config/site.ts.
export default defineConfig({
  site: 'https://miprotick-work.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
