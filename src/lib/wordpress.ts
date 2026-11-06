import { site } from '../config/site';
import { postsSnapshot } from '../data/posts';
import type { Post } from '../data/types';
import { fetchJson, readCache, writeCache } from './cache';

interface WpPost { ID: number; slug: string; title: string; URL: string; date: string; excerpt: string; featured_image: string }

function toText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}
function clip(s: string, n = 220) {
  if (s.length <= n) return s;
  return s.slice(0, s.lastIndexOf(' ', n)).replace(/[,.;:]$/, '') + '…';
}

const KEY = 'gc-posts-v1';

/** WordPress.com public REST API: CORS-enabled, no key required. */
export async function loadPosts(): Promise<{ posts: Post[]; live: boolean }> {
  const cached = readCache<Post[]>(KEY, 30 * 60 * 1000);
  if (cached) return { posts: cached, live: true };
  try {
    const url = `https://public-api.wordpress.com/rest/v1.1/sites/${site.blog.wpSite}/posts/?number=30&order_by=date&fields=ID,slug,title,URL,date,excerpt,featured_image`;
    const data = await fetchJson<{ posts: WpPost[] }>(url);
    if (!Array.isArray(data.posts)) throw new Error('Unexpected response');
    const posts: Post[] = data.posts.map((p) => ({
      id: String(p.ID), slug: p.slug, title: toText(p.title), url: p.URL,
      date: p.date, excerpt: clip(toText(p.excerpt)), image: p.featured_image || null,
    }));
    writeCache(KEY, posts);
    return { posts, live: true };
  } catch {
    return { posts: postsSnapshot, live: false };
  }
}
