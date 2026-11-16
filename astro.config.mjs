// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploying to https://miprotick-work.github.io (user site → no `base` needed).
// If you ever deploy from a non-`<user>.github.io` repo, set `base: '/<repo>'`.
// For a custom domain: change `site`, and add public/CNAME containing the domain.
export default defineConfig({
  site: 'https://miprotick-work.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
