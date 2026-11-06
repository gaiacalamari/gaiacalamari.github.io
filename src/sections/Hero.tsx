import { useEffect, useState } from 'react';
import { BookOpen, Download, FolderGit2, ShieldCheck } from 'lucide-react';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import { hashChain } from '../lib/hash';
import type { Post, Project } from '../data/types';
import type { Status } from '../hooks/useRemote';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';

interface Props {
  repos: { projects: Project[]; status: Status };
  posts: { posts: Post[]; status: Status };
}

const short = (h: string | null | undefined) => (h ? `${h.slice(0, 10)}…${h.slice(-6)}` : '················');

/** Decorative traces: thin paths with a travelling pulse, like data moving between sources. */
function Traces() {
  const paths = [
    'M-20 520 C 220 520, 260 380, 520 380 S 840 240, 1500 240',
    'M-20 640 C 300 640, 420 560, 700 560 S 1100 470, 1500 470',
    'M-20 300 C 180 300, 300 180, 560 180 S 980 120, 1500 90',
  ];
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none">
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="rgb(var(--line))" strokeWidth="1" opacity=".7" />
          <path d={d} className="trace" stroke="rgb(var(--accent))" strokeOpacity=".55" strokeWidth="1.25" strokeLinecap="round" style={{ animationDelay: `${i * -3}s`, animationDuration: `${8 + i * 2}s` }} />
        </g>
      ))}
    </svg>
  );
}

export default function Hero({ repos, posts }: Props) {
  const { t } = useI18n();
  const L = t.hero.log;
  const [hashes, setHashes] = useState<(string | null)[]>([]);

  const sources = [
    { host: 'github.com/gaiacalamari', count: `${repos.projects.length} ${L.repos}`, status: repos.status, payload: repos.projects.map((p) => p.name).join('\n') },
    { host: 'strangerforensics.wordpress.com', count: `${posts.posts.length}${posts.posts.length >= 30 ? '+' : ''} ${L.posts}`, status: posts.status, payload: posts.posts.map((p) => p.url).join('\n') },
    { host: 'linkedin.com/in/gaia-calamari…', count: L.profile, status: 'live' as Status, payload: site.links.linkedin },
  ];
  const key = sources.map((s) => s.payload).join('|');
  useEffect(() => {
    let alive = true;
    hashChain(sources.map((s) => s.payload)).then((h) => alive && setHashes(h));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const done = repos.status !== 'loading' && posts.status !== 'loading';

  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:min-h-[100svh] lg:pb-24">
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 55% at 78% 22%, var(--glow-a), transparent 70%), radial-gradient(45% 45% at 12% 85%, var(--glow-b), transparent 70%)' }} />
        <div className="absolute inset-0 opacity-60" style={{
          backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 60% 30%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 60% 30%, black 20%, transparent 75%)' }} />
        <Traces />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="page grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
        <div>
          <p className="log-line inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2 pr-4 text-sm text-muted shadow-card backdrop-blur" style={{ animationDelay: '0ms' }}>
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-accent/15">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/30 motion-reduce:animate-none" />
            </span>
            {t.hero.badge}
          </p>
          <h1 id="home-title" className="log-line mt-7 text-[clamp(2.4rem,5.5vw,4rem)] font-semibold leading-[1.05]"
            style={{ letterSpacing: '-0.035em', animationDelay: '80ms' }}>
            {site.role}
          </h1>
          <p className="log-line mt-6 max-w-prose text-[1.12rem] leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>{t.hero.intro}</p>

          <div className="log-line mt-9 flex flex-wrap gap-3" style={{ animationDelay: '320ms' }}>
            <a href="#projects" className="btn-primary"><FolderGit2 className="h-[18px] w-[18px]" aria-hidden />{t.hero.ctaProjects}</a>
            <a href="#blog" className="btn-ghost"><BookOpen className="h-[18px] w-[18px]" aria-hidden />{t.hero.ctaArticles}</a>
          </div>
          <div className="log-line mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.95rem]" style={{ animationDelay: '400ms' }}>
            <a href="#contact" className="link">{t.hero.ctaContact}</a>
            {site.cv.file
              ? <a href={site.cv.file} download className="inline-flex items-center gap-1.5 link"><Download className="h-4 w-4" aria-hidden />{t.hero.ctaCv}</a>
              : <span className="inline-flex items-center gap-1.5 text-muted" aria-disabled="true"><Download className="h-4 w-4" aria-hidden />{t.hero.cvSoon}</span>}
            <span aria-hidden className="hidden h-4 w-px bg-line sm:block" />
            <span className="flex gap-2">
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/60 text-muted transition-colors hover:border-accent/60 hover:text-accent"><LinkedinIcon className="h-[18px] w-[18px]" /></a>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/60 text-muted transition-colors hover:border-accent/60 hover:text-accent"><GithubIcon className="h-[18px] w-[18px]" /></a>
            </span>
          </div>
        </div>

        {/* Acquisition log */}
        <div className="log-line relative" style={{ animationDelay: '300ms' }}>
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] opacity-80 blur-2xl" style={{ background: 'radial-gradient(closest-side, var(--glow-a), transparent)' }} />
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-float backdrop-blur-xl">
            <figcaption className="flex items-center gap-3 border-b border-line bg-raised/50 px-4 py-3">
              <span aria-hidden className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-line" /><span className="h-3 w-3 rounded-full bg-line" /><span className="h-3 w-3 rounded-full bg-line" /></span>
              <span className="text-sm font-medium">{L.title}</span>
              <span className="hash ml-auto hidden sm:inline">case: gc-portfolio</span>
            </figcaption>
            <div className="overflow-x-auto px-5 py-5 font-mono text-[0.8rem] leading-relaxed sm:text-[0.84rem]">
              <p className="log-line whitespace-nowrap" style={{ animationDelay: '500ms' }}>
                <span className="text-accent">$</span> acquire --{L.subject} <span className="text-ink">"{site.name}"</span>
              </p>
              {sources.map((s, i) => (
                <div key={s.host} className="log-line mt-4" style={{ animationDelay: `${750 + i * 300}ms` }}>
                  <p className="whitespace-nowrap"><span className="text-muted">[{L.source}]</span> <span className="text-ink">{s.host}</span></p>
                  <p className="flex flex-wrap items-baseline justify-between gap-x-3 pl-4 text-muted">
                    <span>{s.count}</span>
                    <span className={s.status === 'live' ? 'text-ok' : s.status === 'snapshot' ? 'text-accent' : ''}>
                      {s.status === 'loading' ? '…' : s.status === 'live' ? `✓ ${L.verified}` : `◇ ${L.snapshot}`}
                    </span>
                  </p>
                  <p className="whitespace-nowrap pl-4 text-muted/80">sha256 {short(hashes[i])}</p>
                </div>
              ))}
              <div className="log-line mt-5 border-t border-line pt-4" style={{ animationDelay: '1700ms' }}>
                <div className="flex items-center justify-between text-muted"><span>{L.hashing}</span><span>{done ? '100%' : '…'}</span></div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-raised"><div className="log-bar h-full rounded-full bg-gradient-to-r from-accent to-accent2" style={{ animationDelay: '1.8s' }} /></div>
                <p className="mt-3 flex items-center gap-2 text-ink"><ShieldCheck className={`h-4 w-4 ${done ? 'text-ok' : 'text-muted'}`} aria-hidden />{L.chain}</p>
              </div>
            </div>
            <p className="border-t border-line px-5 py-3 text-xs text-muted">{L.note}</p>
          </figure>
        </div>
      </div>

      <a href="#about" className="mx-auto mt-16 hidden w-max flex-col items-center gap-2 text-xs text-muted transition-colors hover:text-ink lg:flex">
        <span className="flex h-9 w-6 justify-center rounded-full border border-line pt-2"><span className="cue-dot h-1.5 w-1 rounded-full bg-accent" /></span>
        {t.hero.scroll}
      </a>
    </section>
  );
}
