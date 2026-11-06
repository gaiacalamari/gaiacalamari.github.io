import { useRef, useState, type KeyboardEvent } from 'react';
import { Check, FileText, BookOpen, ExternalLink, FileSearch, Globe, Images, FolderTree, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n';
import { formatDate } from '../lib/format';
import type { Project } from '../data/types';
import { GithubIcon } from './BrandIcons';
import { LangTag } from './ProjectCard';

const icons: Record<string, LucideIcon> = { WEBCQUISITION: Globe, PDFTrace: FileSearch, ForensicVisionPro: Images, 'XT_ExtractDocsMail-': FolderTree };

/** Accessible tabbed showcase for the featured tools. */
export default function ProjectShowcase({ items }: { items: Project[] }) {
  const { t, lang } = useI18n();
  const [idx, setIdx] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = items[Math.min(idx, items.length - 1)];
  if (!p) return null;

  const onKey = (e: KeyboardEvent) => {
    const k = e.key;
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(k)) return;
    e.preventDefault();
    const n = items.length;
    const next = k === 'Home' ? 0 : k === 'End' ? n - 1 : (idx + (k === 'ArrowDown' || k === 'ArrowRight' ? 1 : -1) + n) % n;
    setIdx(next); tabs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[19rem_1fr] [&>*]:min-w-0">
      <div role="tablist" aria-label={t.projects.featured} aria-orientation="vertical" onKeyDown={onKey}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible">
        {items.map((it, i) => {
          const Icon = icons[it.name] ?? FileText;
          const sel = i === idx;
          return (
            <button key={it.name} ref={(el) => { tabs.current[i] = el; }} role="tab" type="button" id={`tab-${it.name}`}
              aria-selected={sel} aria-controls={`panel-${it.name}`} tabIndex={sel ? 0 : -1} onClick={() => setIdx(i)}
              className={`group relative flex min-w-[16.5rem] items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 lg:min-w-0 ${
                sel ? 'border-accent/50 bg-surface shadow-lift' : 'border-line bg-surface/40 hover:border-muted/60 hover:bg-surface'}`}>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${sel ? 'bg-accent text-on-accent' : 'bg-raised text-muted group-hover:text-ink'}`}>
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 lg:pr-4">
                <span className="block truncate font-semibold">{it.displayName}</span>
                <span className="block truncate text-sm text-muted">{it.category[lang]}</span>
              </span>
              <span aria-hidden className={`absolute right-4 hidden h-1.5 w-1.5 rounded-full bg-accent transition-opacity lg:block ${sel ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          );
        })}
      </div>

      <div key={p.name} role="tabpanel" id={`panel-${p.name}`} aria-labelledby={`tab-${p.name}`} tabIndex={0}
        className="panel-in relative overflow-hidden rounded-2xl border border-line bg-surface shadow-float">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(closest-side, var(--glow-a), transparent)' }} />
        <div className="flex items-center justify-between gap-3 border-b border-line bg-raised/40 px-6 py-3">
          <span className="hash truncate">github.com/gaiacalamari/{p.name}</span>
          <span className="flex shrink-0 items-center gap-4 text-sm text-muted">
            <LangTag language={p.language} />
            {p.updatedAt && <span className="hidden sm:inline">{t.projects.updated} {formatDate(p.updatedAt, lang)}</span>}
          </span>
        </div>
        <div className="relative p-6 sm:p-9">
          <p className="text-sm text-accent">{p.category[lang]}</p>
          <h4 className="mt-2 break-words text-3xl font-semibold sm:text-4xl" style={{ letterSpacing: '-0.03em' }}>{p.displayName}</h4>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-muted">{p.summary?.[lang] ?? (p.description || t.projects.noDescription)}</p>
          {p.note && <p className="mt-3 text-sm italic text-muted">{p.note[lang]}</p>}

          {p.capabilities && (
            <>
              <p className="mt-8 text-sm font-medium">{t.projects.capabilities}</p>
              <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {p.capabilities.map((c, i) => (
                  <li key={c.en} className="log-line flex gap-3 text-[0.95rem]" style={{ animationDelay: `${120 + i * 50}ms` }}>
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok/15 text-ok"><Check className="h-3 w-3" aria-hidden /></span>
                    {c[lang]}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-9 flex flex-wrap gap-2.5">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm"><GithubIcon className="h-4 w-4" />{t.projects.repo}</a>
            <a href={`${p.url}#readme`} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm"><FileText className="h-4 w-4" aria-hidden />{t.projects.docs}</a>
            {p.article && <a href={p.article} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm"><BookOpen className="h-4 w-4" aria-hidden />{t.projects.article}</a>}
            {p.homepage && <a href={p.homepage} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm"><ExternalLink className="h-4 w-4" aria-hidden />{t.projects.site}</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
