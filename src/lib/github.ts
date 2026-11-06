import { site } from '../config/site';
import { curated, otherCategory, projectsSnapshot } from '../data/projects';
import type { Project } from '../data/types';
import { fetchJson, readCache, writeCache } from './cache';

interface ApiRepo {
  name: string; description: string | null; language: string | null; topics?: string[];
  html_url: string; homepage: string | null; pushed_at: string | null; archived: boolean;
  fork: boolean; stargazers_count: number;
}

type Base = Pick<Project, 'name' | 'description' | 'language' | 'topics' | 'updatedAt'> &
  Partial<Pick<Project, 'url' | 'homepage' | 'archived' | 'stars'>>;

function enrich(r: Base): Project {
  const c = curated[r.name];
  return {
    name: r.name,
    displayName: c?.displayName ?? r.name.replace(/[-_]+$/, ''),
    description: r.description ?? '',
    summary: c?.summary,
    note: c?.note,
    capabilities: c?.capabilities,
    language: r.language ?? c?.language ?? null,
    category: c?.category ?? otherCategory,
    topics: r.topics ?? [],
    url: r.url ?? `${site.links.github}/${r.name}`,
    homepage: r.homepage || null,
    updatedAt: r.updatedAt,
    archived: r.archived ?? false,
    stars: r.stars ?? 0,
    article: c?.article,
    image: c?.image,
  };
}

const KEY = 'gc-repos-v1';

export async function loadRepos(): Promise<{ projects: Project[]; live: boolean }> {
  const cached = readCache<Project[]>(KEY, 30 * 60 * 1000);
  if (cached) return { projects: cached, live: true };
  try {
    const data = await fetchJson<ApiRepo[]>(
      `https://api.github.com/users/${site.github.user}/repos?per_page=100&sort=pushed&type=owner`,
    );
    if (!Array.isArray(data)) throw new Error('Unexpected response');
    const projects = data
      .filter((r) => !site.github.hidden.includes(r.name) && (site.github.showForks || !r.fork))
      .map((r) => enrich({
        name: r.name, description: r.description ?? '', language: r.language, topics: r.topics ?? [],
        updatedAt: r.pushed_at, url: r.html_url, homepage: r.homepage, archived: r.archived, stars: r.stargazers_count,
      }));
    writeCache(KEY, projects);
    return { projects, live: true };
  } catch {
    return { projects: snapshotProjects(), live: false };
  }
}

export const snapshotProjects = () => projectsSnapshot.map(enrich);
