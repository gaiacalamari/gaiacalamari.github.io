export type Lang = 'en' | 'it';
export type Localized = Record<Lang, string>;

export interface Project {
  name: string;
  displayName: string;
  description: string; // raw GitHub description (fallback)
  summary?: Localized; // curated summary
  note?: Localized;
  capabilities?: Localized[];
  language: string | null;
  category: Localized;
  topics: string[];
  url: string;
  homepage: string | null;
  updatedAt: string | null;
  archived: boolean;
  stars: number;
  article?: string;
  image?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  url: string;
  date: string;
  excerpt: string;
  image: string | null;
}
