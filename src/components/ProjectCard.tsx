import { Archive, ArrowUpRight, BookOpen, Star } from 'lucide-react';
import { useI18n } from '../i18n';
import { formatDate } from '../lib/format';
import type { Project } from '../data/types';
import Spotlight from './Spotlight';

const langColor: Record<string, string> = {
  Python: '#3572A5', Pascal: '#C9B600', HTML: '#E34C26', SQL: '#E38C00', JavaScript: '#D4B830', TypeScript: '#3178C6', PowerShell: '#2A6DB0',
};

export function LangTag({ language }: { language: string | null }) {
  if (!language) return null;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: langColor[language] ?? 'rgb(var(--muted))' }} />
      {language}
    </span>
  );
}

export default function ProjectCard({ p }: { p: Project }) {
  const { t, lang } = useI18n();
  const text = p.summary?.[lang] ?? (p.description || t.projects.noDescription);
  return (
    <Spotlight as="article" className="card card-hover group flex h-full flex-col p-6" aria-labelledby={`repo-${p.name}`}>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-accent">{p.category[lang]}</span>
        {p.archived && (
          <span className="tag gap-1"><Archive className="h-3 w-3" aria-hidden />{t.projects.archived}</span>
        )}
      </div>
      <h4 id={`repo-${p.name}`} className="mt-3 break-words text-lg font-semibold tracking-tight">
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
          {p.displayName}
        </a>
      </h4>
      <p className="mt-2.5 line-clamp-4 text-[0.95rem] leading-relaxed text-muted">{text}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <LangTag language={p.language} />
          {p.updatedAt && <span>{formatDate(p.updatedAt, lang, { month: 'short', year: 'numeric' })}</span>}
          {p.stars > 0 && <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" aria-hidden />{p.stars}<span className="sr-only"> {t.projects.stars}</span></span>}
        </p>
        <span className="relative z-10 flex items-center gap-1.5">
          {p.article && (
            <a href={p.article} target="_blank" rel="noopener noreferrer" aria-label={`${t.projects.article}: ${p.displayName}`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent">
              <BookOpen className="h-4 w-4" aria-hidden />
            </a>
          )}
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-all group-hover:border-accent/60 group-hover:bg-accent group-hover:text-on-accent">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </span>
      </div>
    </Spotlight>
  );
}
