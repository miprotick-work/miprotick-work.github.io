/**
 * Global site configuration — edit this file to rebrand the workspace.
 */
export const site = {
  /** Brand shown in the header & titles */
  brand: 'MIProtick',
  /** Legal / display name used as the "developer" in policies */
  author: 'Mezbaul Islam Protick',
  tagline: 'Software, apps & experiments — built in the open.',
  intro:
    'I design and build software products end to end. This is the home of my work: every project, and every public document that goes with it.',
  githubUser: 'protick-dev',
  /** Default contact(s) for all projects. A project can override with `contactEmails` in its project.md. */
  contactEmails: ['miprotick.work@gmail.com', 'developer.protick@gmail.com'],
  /** Public URL of the deployed site (no trailing slash). */
  url: 'https://protick-dev.github.io',
  /** Repo holding this site — used for "revision history" links on legal pages. */
  sourceRepo: 'protick-dev/protick-dev.github.io',
  sourceBranch: 'main',
  socials: [
    { label: 'GitHub', href: 'https://github.com/protick-dev' },
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/…' },
  ],
} as const;

/**
 * Known resource types: display label + order in navigation.
 * Any other `*.md` file in a project folder still works — it just sorts last
 * and uses its own `title`.
 */
export const resourceTypes: Record<string, { label: string; order: number }> = {
  'privacy-policy': { label: 'Privacy Policy', order: 1 },
  terms: { label: 'Terms & Conditions', order: 2 },
  support: { label: 'Support', order: 3 },
  'delete-account': { label: 'Account & Data Deletion', order: 4 },
};
