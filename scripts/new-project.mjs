#!/usr/bin/env node
/**
 * Scaffold a new project with all standard public resources.
 *
 *   npm run new-project -- <slug> "<Display Name>"
 *   npm run new-project -- habit-tracker "Habit Tracker"
 */
import { mkdir, readdir, readFile, writeFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [slug, ...nameParts] = process.argv.slice(2);
const RESERVED = new Set(['404', 'robots.txt', 'sitemap-index.xml', 'favicon.svg', '_astro']);

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || RESERVED.has(slug)) {
  console.error('Usage: npm run new-project -- <kebab-case-slug> "<Display Name>"');
  process.exit(1);
}

// Pull values from src/config/site.ts so the templates stay in sync with the config.
const config = await readFile(join(root, 'src/config/site.ts'), 'utf8');
const pick = (key) => config.match(new RegExp(`${key}:\\s*'([^']+)'`))?.[1] ?? '';

const name = nameParts.join(' ') || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const vars = {
  name,
  slug,
  author: pick('author'),
  githubUser: pick('githubUser'),
  siteUrl: pick('url'),
  date: new Date().toISOString().slice(0, 10),
};
// {{contact}} is intentionally left in the files: it is resolved when the page renders,
// from the project's `contactEmails` override or the site-wide `contactEmails`.

const dest = join(root, 'src/content/projects', slug);
try {
  await access(dest);
  console.error(`✗ ${dest} already exists`);
  process.exit(1);
} catch {}

await mkdir(dest, { recursive: true });
const tplDir = join(root, 'templates/project');
for (const file of await readdir(tplDir)) {
  const tpl = await readFile(join(tplDir, file), 'utf8');
  await writeFile(join(dest, file), tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => vars[k] ?? m));
}

console.log(`✓ Created src/content/projects/${slug}/`);
console.log(`  It is a draft (draft: true). Review the TODO comments, then set draft: false.`);
console.log(`  Pages: /${slug}/  /${slug}/privacy-policy/  /${slug}/terms/  /${slug}/support/  /${slug}/delete-account/`);
