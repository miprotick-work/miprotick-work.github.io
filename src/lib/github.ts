export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  description: string | null;
  pushedAt: string;
  url: string;
  license: string | null;
}

const cache = new Map<string, Promise<RepoStats | null>>();

/**
 * Fetch public repo stats at build time. Never fails the build: private,
 * missing, or rate-limited repos simply return null. Set GITHUB_TOKEN to
 * raise the rate limit (the deploy workflow does this automatically).
 */
export function getRepoStats(repo: string): Promise<RepoStats | null> {
  if (!cache.has(repo)) cache.set(repo, load(repo));
  return cache.get(repo)!;
}

async function load(repo: string): Promise<RepoStats | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-site-build',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      stars: d.stargazers_count,
      forks: d.forks_count,
      language: d.language,
      description: d.description,
      pushedAt: d.pushed_at,
      url: d.html_url,
      license: d.license?.spdx_id && d.license.spdx_id !== 'NOASSERTION' ? d.license.spdx_id : null,
    };
  } catch {
    return null;
  }
}
