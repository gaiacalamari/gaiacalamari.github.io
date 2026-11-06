import { useMemo, useState } from 'react';
import { Info, Loader2, Search, X } from 'lucide-react';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import type { Project } from '../data/types';
import type { Status } from '../hooks/useRemote';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import ProjectShowcase from '../components/ProjectShowcase';
import Reveal from '../components/Reveal';
import { GithubIcon } from '../components/BrandIcons';

function Filter({ label, values, value, onChange, allLabel }:
  { label: string; values: string[]; value: string; onChange: (v: string) => void; allLabel: string }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2.5 text-sm text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {['', ...values].map((v) => (
          <button key={v || 'all'} type="button" className="chip" aria-pressed={value === v} onClick={() => onChange(v)}>{v || allLabel}</button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Projects({ projects, status }: { projects: Project[]; status: Status }) {
  const { t, lang } = useI18n();
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [q, setQ] = useState('');

  const featured = site.github.featured.map((n) => projects.find((p) => p.name === n)).filter((p): p is Project => Boolean(p));
  const categories = useMemo(() => [...new Set(projects.map((p) => p.category[lang]))].sort(), [projects, lang]);
  const languages = useMemo(() => [...new Set(projects.map((p) => p.language).filter(Boolean) as string[])].sort(), [projects]);

  const needle = q.trim().toLowerCase();
  const filtered = projects.filter((p) =>
    (!category || p.category[lang] === category) && (!language || p.language === language) &&
    (!needle || [p.displayName, p.description, p.summary?.[lang] ?? '', ...p.topics].join(' ').toLowerCase().includes(needle)));
  const sorted = [...filtered].sort((a, b) => Number(a.archived) - Number(b.archived) || (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''));
  const clear = () => { setCategory(''); setLanguage(''); setQ(''); };

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[40rem]" style={{ background: 'radial-gradient(50% 50% at 20% 0%, var(--glow-b), transparent 70%)' }} />
      <div className="page relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="projects" kicker={t.projects.kicker} title={t.projects.title}>{t.projects.intro}</SectionHeader>
          <Reveal delay={150} className="shrink-0">
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"><GithubIcon className="h-[18px] w-[18px]" />{t.projects.viewGithub}</a>
          </Reveal>
        </div>

        <div aria-live="polite" className="mt-6 min-h-[1.5rem] text-sm text-muted">
          {status === 'loading' && <p className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden />{t.projects.loading}</p>}
          {status === 'snapshot' && <p className="inline-flex items-start gap-2"><Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />{t.projects.fallback}</p>}
        </div>

        {featured.length > 0 && (
          <Reveal className="mt-6">
            <h3 className="sr-only">{t.projects.featured}</h3>
            <ProjectShowcase items={featured} />
          </Reveal>
        )}

        <Reveal className="mt-24 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-2xl font-semibold" style={{ letterSpacing: '-0.02em' }}>{t.projects.all}</h3>
          <p className="text-sm text-muted tabular-nums">{sorted.length} / {projects.length} {t.projects.count}</p>
        </Reveal>

        <Reveal className="mt-6 card p-5 sm:p-6">
          <label className="relative block">
            <span className="sr-only">{t.projects.search}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" aria-hidden />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.projects.searchPh}
              className="h-12 w-full rounded-xl border border-line bg-bg pl-11 pr-11 text-[0.98rem] text-ink placeholder:text-muted/80 transition-colors focus:border-accent/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent" />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label={t.projects.clear}
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-ink"><X className="h-4 w-4" aria-hidden /></button>
            )}
          </label>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Filter label={t.projects.filterCategory} values={categories} value={category} onChange={setCategory} allLabel={t.projects.allFilter} />
            <Filter label={t.projects.filterLanguage} values={languages} value={language} onChange={setLanguage} allLabel={t.projects.allFilter} />
          </div>
        </Reveal>

        {sorted.length ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => <li key={p.name} className="panel-in"><ProjectCard p={p} /></li>)}
          </ul>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="text-muted">{t.projects.empty}</p>
            <button type="button" className="btn-ghost mt-5" onClick={clear}>{t.projects.clear}</button>
          </div>
        )}
      </div>
    </section>
  );
}
