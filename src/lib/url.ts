/**
 * Internal links go through these helpers so they always respect Astro's `base`
 * setting. The site is served from the domain root (https://miprotick-work.github.io/),
 * so today they return paths unchanged.
 */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Build an internal link, e.g. url('/hidayah/terms/'). */
export function url(path: string) {
  return path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path;
}

/** Apply the same rule to links inside rendered markdown. */
export function withBase(html: string) {
  return BASE ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : html;
}
