import { ArrowUp, BookOpen, Mail } from 'lucide-react';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import { GithubIcon, LinkedinIcon, MediumIcon } from './BrandIcons';
import Mark from './Mark';

export default function Footer() {
  const { t } = useI18n();
  const navigate = ['about', 'method', 'expertise', 'faq'] as const;
  const work = ['projects', 'blog', 'record', 'cv'] as const;
  const social = [
    { href: site.links.linkedin, label: 'LinkedIn', icon: <LinkedinIcon className="h-4 w-4" /> },
    { href: site.links.github, label: 'GitHub', icon: <GithubIcon className="h-4 w-4" /> },
    { href: site.links.blog, label: site.blog.shortName, icon: <BookOpen className="h-4 w-4" aria-hidden /> },
    { href: site.links.medium, label: 'Medium', icon: <MediumIcon className="h-4 w-4" /> },
  ];
  const col = 'text-muted transition-colors hover:text-ink';
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/60">
      <div className="page grid gap-12 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#home" className="inline-flex items-center gap-3 font-semibold"><Mark className="h-9 w-9" />{site.name}</a>
          <p className="mt-4 max-w-xs text-muted">{site.role}.</p>
        </div>
        <nav aria-label={t.footer.navigate}>
          <p className="text-sm font-medium">{t.footer.navigate}</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">{navigate.map((id) => <li key={id}><a className={col} href={`#${id}`}>{t.nav[id]}</a></li>)}</ul>
        </nav>
        <nav aria-label={t.footer.work}>
          <p className="text-sm font-medium">{t.footer.work}</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">{work.map((id) => <li key={id}><a className={col} href={`#${id}`}>{t.nav[id]}</a></li>)}</ul>
        </nav>
        <div>
          <p className="text-sm font-medium">{t.footer.connect}</p>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {social.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${col}`}>{s.icon}{s.label}</a></li>
            ))}
            {site.email && <li><a href={`mailto:${site.email}`} className={`inline-flex items-center gap-2.5 break-all ${col}`}><Mail className="h-4 w-4 shrink-0" aria-hidden />{site.email}</a></li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="page flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {t.footer.rights} {t.footer.built}</p>
          <a href="#home" className="group inline-flex items-center gap-2 hover:text-ink">
            {t.footer.top}
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line transition-transform group-hover:-translate-y-0.5"><ArrowUp className="h-4 w-4" aria-hidden /></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
