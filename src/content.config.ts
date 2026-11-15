import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const BASE = './src/content/projects';

/** One `project.md` per folder: src/content/projects/<slug>/project.md */
const projects = defineCollection({
  loader: glob({
    base: BASE,
    pattern: '*/project.md',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    /** "owner/repo" — public repos get live stats from the GitHub API at build time */
    repo: z.string().regex(/^[\w.-]+\/[\w.-]+$/).optional(),
    status: z.enum(['active', 'beta', 'maintained', 'archived', 'concept']).default('active'),
    platforms: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    /** Lower comes first */
    order: z.number().default(100),
    /** Accent color for the project card / page */
    accent: z.string().optional(),
    /** Overrides the site-wide contactEmails for this project — a single email or a list */
    contactEmails: z
      .union([z.email(), z.array(z.email()).min(1)])
      .transform((v) => (Array.isArray(v) ? v : [v]))
      .optional(),
    links: z
      .object({
        website: z.url().optional(),
        appStore: z.url().optional(),
        playStore: z.url().optional(),
      })
      .default({}),
    /** Drafts are visible in `npm run dev` but excluded from production builds */
    draft: z.boolean().default(false),
  }),
});

/** Every other markdown file in a project folder is a public resource. */
const resources = defineCollection({
  loader: glob({
    base: BASE,
    pattern: ['*/*.md', '!*/project.md'],
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    effectiveDate: z.coerce.date(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

export const collections = { projects, resources };
