# gaiacalamari.github.io

Personal website of **Gaia Calamari**, Digital Forensic Analyst.
React 18 · TypeScript · Vite · Tailwind CSS · Lucide. Static build, deployed to GitHub Pages by GitHub Actions.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build in dist/
```

## Deploy

1. Create the repository `gaiacalamari/gaiacalamari.github.io` and push this project to `main`.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and publishes the site (`.github/workflows/deploy.yml`).

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

### Add the CV
1. Copy the PDF to `public/documents/cv.pdf`.
2. In `src/config/site.ts` set `cv: { file: 'documents/cv.pdf' }`.

Until then every CV button shows "Coming soon" and no link is rendered.

### Add a language
Create `src/i18n/xx.ts` typed as `Dict`, register it in `src/i18n/index.tsx`, and add the `xx` key to each `Localized` value in `src/data/`.

## Page structure

Hero → tool strip → About (live stats, principles) → Method (acquire, preserve, analyse, report) → Expertise (bento grid) → Projects (featured showcase + searchable list) → Stranger Forensics → Challenge write-ups → CV → FAQ → Contact → Footer.

## Design system

- Two themes designed separately: dark uses hairline borders and soft glows, light uses white surfaces and layered shadows. The choice follows the system setting on first visit and is then saved in `localStorage`.
- The theme switch uses a circular reveal (View Transitions API) where supported, and a plain switch elsewhere.
- Motion: one load sequence in the hero, scroll reveals (`<Reveal>`), cursor spotlight on cards (`<Spotlight>`), count-up stats. Everything is disabled under `prefers-reduced-motion`.
- No animation library: IntersectionObserver and CSS only.

## Live data and fallbacks

- **GitHub**: public REST API, unauthenticated (60 requests/hour per visitor IP), cached in `sessionStorage` for 30 minutes. New repositories appear automatically; forks and anything in `github.hidden` are skipped; archived repos are labelled and sorted last.
- **Blog**: WordPress.com public REST API (CORS-enabled, no key), cached the same way. Highlighted posts are chosen by slug in `site.ts`; everything else appears under "More from the blog". Only titles, short excerpts and links are shown; every article opens on the original WordPress page.
- If either API fails, the page renders from the snapshots in `src/data/` and says so. The page never waits for the APIs to render.

No tokens or secrets are used anywhere.
