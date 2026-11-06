import { useEffect, useState } from 'react';
import { loadRepos, snapshotProjects } from '../lib/github';
import { loadPosts } from '../lib/wordpress';
import { postsSnapshot } from '../data/posts';
import type { Post, Project } from '../data/types';

export type Status = 'loading' | 'live' | 'snapshot';

/** Content renders immediately from the snapshot; live data replaces it when it arrives. */
export function useRepos() {
  const [state, setState] = useState<{ projects: Project[]; status: Status }>({ projects: snapshotProjects(), status: 'loading' });
  useEffect(() => {
    let alive = true;
    loadRepos().then(({ projects, live }) => alive && setState({ projects, status: live ? 'live' : 'snapshot' }));
    return () => { alive = false; };
  }, []);
  return state;
}

export function usePosts() {
  const [state, setState] = useState<{ posts: Post[]; status: Status }>({ posts: postsSnapshot, status: 'loading' });
  useEffect(() => {
    let alive = true;
    loadPosts().then(({ posts, live }) => alive && setState({ posts, status: live ? 'live' : 'snapshot' }));
    return () => { alive = false; };
  }, []);
  return state;
}
