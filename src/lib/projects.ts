import { getCollection, type CollectionEntry } from 'astro:content';
import { resourceTypes, site } from '../config/site';

export type Project = CollectionEntry<'projects'>;
export type Resource = CollectionEntry<'resources'>;

const showDrafts = import.meta.env.DEV;

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', (p) => showDrafts || !p.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

/** Split a resource id ("my-app/privacy-policy") into its parts. */
export function resourceParts(r: Resource) {
  const [project, slug] = r.id.split('/');
  return { project, slug };
}

export function resourceLabel(r: Resource) {
  return resourceTypes[resourceParts(r).slug]?.label ?? r.data.title;
}

export async function getResourcesFor(projectSlug: string): Promise<Resource[]> {
  const all = await getCollection('resources', (r) => resourceParts(r).project === projectSlug);
  const rank = (r: Resource) => resourceTypes[resourceParts(r).slug]?.order ?? 999;
  return all.sort((a, b) => rank(a) - rank(b) || a.data.title.localeCompare(b.data.title));
}

/** The project's override emails, or the site-wide ones. */
export function contactsFor(p: Project): string[] {
  return p.data.contactEmails ?? [...site.contactEmails];
}

/** "a", "a or b", "a, b, or c" */
export function joinOr(items: string[]) {
  if (items.length <= 2) return items.join(' or ');
  return `${items.slice(0, -1).join(', ')}, or ${items.at(-1)}`;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** HTML mailto links joined with "or", e.g. for inline use in documents. */
export function contactLinksHtml(emails: string[]) {
  return joinOr(emails.map((e) => `<a href="mailto:${escapeHtml(e)}">${escapeHtml(e)}</a>`));
}

/**
 * Rendered markdown HTML with `{{contact}}` replaced by the project's contact
 * links. Resolved at render time so overrides apply to every document.
 */
export function renderedHtml(entry: Project | Resource, emails: string[]) {
  return (entry.rendered?.html ?? '').replaceAll('{{contact}}', contactLinksHtml(emails));
}

export const statusLabel: Record<Project['data']['status'], string> = {
  active: 'Active',
  beta: 'Beta',
  maintained: 'Maintained',
  archived: 'Archived',
  concept: 'Concept',
};

export function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
