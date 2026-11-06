# DFE web site

Personal website.

React 18 · TypeScript · Vite · Tailwind CSS · Lucide. Static build, deployed to GitHub Pages by GitHub Actions.

## Where to change things

| What | File |
|---|---|
| Name, email, LinkedIn, GitHub, blog URL, CV path, featured repos, highlighted posts | `src/config/site.ts` |
| All interface text (EN / IT) | `src/i18n/en.ts`, `src/i18n/it.ts` |
| Curated project summaries and categories | `src/data/projects.ts` |
| Expertise areas and the public work that documents them | `src/data/expertise.ts` |
| Professional path, education, certifications (hidden while empty) | `src/data/profile.ts` |
| Article summaries for highlighted posts | `src/data/posts.ts` |
| CTF write-ups shown in "Challenges solved" | `src/data/record.ts` |
| Capabilities listed in the featured-tool showcase | `capabilities` in `src/data/projects.ts` |
| FAQ questions and answers | `faq.items` in `src/i18n/en.ts` / `it.ts` |
| Colours, shadows and effects for both themes | `src/styles/index.css` (tokens at the top) |
| SEO meta, Open Graph, JSON-LD | `index.html` |

## Live data and fallbacks

- **GitHub**: public REST API, unauthenticated (60 requests/hour per visitor IP), cached in `sessionStorage` for 30 minutes. New repositories appear automatically; forks and anything in `github.hidden` are skipped; archived repos are labelled and sorted last.
- **Blog**: WordPress.com public REST API (CORS-enabled, no key), cached the same way. Highlighted posts are chosen by slug in `site.ts`; everything else appears under "More from the blog". Only titles, short excerpts and links are shown; every article opens on the original WordPress page.
- If either API fails, the page renders from the snapshots in `src/data/` and says so. The page never waits for the APIs to render.

No tokens or secrets are used anywhere.
