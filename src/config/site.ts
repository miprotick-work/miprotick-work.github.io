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
  /** Primary GitHub account: hosts this site and is linked in the header and hero. */
  githubUser: 'miprotick-work',
  /** All GitHub accounts shown on the site (About section, footer). */
  githubAccounts: ['miprotick', 'miprotick-work'],
  /** Default contact(s) for all projects. A project can override with `contactEmails` in its project.md. */
  contactEmails: ['miprotick.work@gmail.com', 'developer.protick@gmail.com'],
  /** Public URL of the deployed site (no trailing slash). */
  url: 'https://miprotick-work.github.io',
  /** Repo holding this site — used for "revision history" links on legal pages. */
  sourceRepo: 'miprotick-work/miprotick-work.github.io',
  sourceBranch: 'main',
  /** Other profiles (GitHub accounts are added automatically from githubAccounts). */
  socials: [
    // { label: 'LinkedIn', href: 'https://www.linkedin.com/in/…' },
  ] as { label: string; href: string }[],
} as const;

/**
 * Navigation order of known resource files. Labels come from each document's
 * `title`. Any other `*.md` file in a project folder still works and sorts last.
 */
export const resourceTypes: Record<string, { order: number }> = {
  'privacy-policy': { order: 1 },
  terms: { order: 2 },
  support: { order: 3 },
  'delete-account': { order: 4 },
};
