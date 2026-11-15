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

export function contactFor(p: Project) {
  return p.data.contactEmail ?? site.contactEmail;
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
