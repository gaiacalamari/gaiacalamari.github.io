import { useState } from 'react';
import { ArrowUpRight, Info, Loader2 } from 'lucide-react';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import { formatDate } from '../lib/format';
import { postSummaries } from '../data/posts';
import type { Post } from '../data/types';
import type { Status } from '../hooks/useRemote';
import Reveal from '../components/Reveal';
import Spotlight from '../components/Spotlight';

function Cover({ post, className = '', compact = false }: { post: Post; className?: string; compact?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (post.image && !failed) {
    return <img src={post.image} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div aria-hidden className={`relative flex h-full w-full items-end overflow-hidden bg-raised p-6 ${className}`}
      style={{ backgroundImage: 'radial-gradient(60% 80% at 80% 10%, var(--glow-a), transparent 70%), repeating-linear-gradient(135deg, rgb(var(--line) / .5) 0 1px, transparent 1px 16px)' }}>
      {!compact && <span className="min-w-0 break-all font-mono text-sm text-muted">{site.blog.wpSite}/{post.slug}</span>}
    </div>
  );
}

function BlogLogo() {
  const [failed, setFailed] = useState(false);
  if (failed) return <div aria-hidden className="grid h-20 w-20 place-items-center rounded-2xl border border-line bg-raised font-serif text-3xl italic text-accent">SF</div>;
  return <img src={site.blog.logo} alt={`${site.blog.name} logo`} width={80} height={80} loading="lazy" onError={() => setFailed(true)}
    className="h-20 w-20 rounded-2xl border border-line object-cover shadow-card" />;
}

export default function Blog({ posts, status }: { posts: Post[]; status: Status }) {
  const { t, lang } = useI18n();
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const highlighted = site.blog.highlights.map((s) => bySlug.get(s)).filter((p): p is Post => Boolean(p));
  const [lead, ...rest] = highlighted.length ? highlighted : posts.slice(0, 5);
  const used = new Set([lead, ...rest].filter(Boolean).map((p) => p.slug));
  const more = posts.filter((p) => !used.has(p.slug)).slice(0, 6);
  const summary = (p: Post) => postSummaries[p.slug]?.[lang] ?? p.excerpt;
  const aria = (p: Post) => `${p.title}, ${t.blog.opensNew}`;

  return (
    <section id="blog" aria-labelledby="blog-title" className="section border-y border-line/70 bg-surface/50">
      <div className="page">
        {/* Masthead */}
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-bg p-7 shadow-card sm:p-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full" style={{ background: 'radial-gradient(closest-side, var(--glow-a), transparent)' }} />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end [&>*]:min-w-0">
            <div>
              <div className="flex items-center gap-4">
                <BlogLogo />
                <div>
                  <p className="kicker">{t.blog.kicker}</p>
                  <p className="mt-1 text-sm text-muted">{t.blog.publication}</p>
                </div>
              </div>
              <h2 id="blog-title" className="mt-8 font-serif text-[3.2rem] leading-[0.95] sm:text-[5.5rem]" style={{ letterSpacing: '-0.02em' }}>{t.blog.title}</h2>
              <p className="mt-4 font-serif text-2xl italic text-accent sm:text-3xl">{site.blog.tagline}</p>
              <p className="lede">{t.blog.intro}</p>
            </div>
            <a href={site.blog.url} target="_blank" rel="noopener noreferrer" className="btn-primary self-start lg:self-end">
              {t.blog.visit}<ArrowUpRight className="h-[18px] w-[18px]" aria-hidden />
            </a>
          </div>
        </Reveal>

        <div aria-live="polite" className="mt-5 min-h-[1.5rem] text-sm text-muted">
          {status === 'loading' && <p className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden />{t.blog.loading}</p>}
          {status === 'snapshot' && <p className="inline-flex items-start gap-2"><Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />{t.blog.fallback}</p>}
        </div>

        {lead && (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] [&>*]:min-w-0">
            <Reveal as="article" className="group card card-hover relative overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden">
                <Cover post={lead} className="transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-sm text-muted">
                  <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent">{t.blog.lead}</span>
                  <time dateTime={lead.date} className="ml-3">{formatDate(lead.date, lang, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </p>
                <h3 className="mt-4 text-3xl font-semibold sm:text-4xl" style={{ letterSpacing: '-0.03em' }}>
                  <a href={lead.url} target="_blank" rel="noopener noreferrer" aria-label={aria(lead)} className="after:absolute after:inset-0 after:content-['']">{lead.title}</a>
                </h3>
                {summary(lead) && <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">{summary(lead)}</p>}
                <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-accent">
                  {t.blog.read}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Reveal>

            <div>
              <Reveal><h3 className="text-sm text-muted">{t.blog.highlights}</h3></Reveal>
              <ul className="mt-3 grid gap-3">
                {rest.map((p, i) => (
                  <Reveal as="li" key={p.slug} delay={i * 80}>
                    <Spotlight as="article" className="card card-hover group grid grid-cols-[1fr_auto] gap-4 p-5">
                      <div className="min-w-0">
                        <time dateTime={p.date} className="text-sm text-muted">{formatDate(p.date, lang)}</time>
                        <h4 className="mt-1 text-lg font-semibold leading-snug">
                          <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={aria(p)} className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-accent">{p.title}</a>
                        </h4>
                        {summary(p) && <p className="mt-1.5 line-clamp-2 text-[0.93rem] text-muted">{summary(p)}</p>}
                      </div>
                      {p.image ? (
                        <div className="hidden h-20 w-24 overflow-hidden rounded-xl border border-line sm:block"><Cover post={p} compact /></div>
                      ) : <ArrowUpRight className="h-5 w-5 text-muted transition-colors group-hover:text-accent" aria-hidden />}
                    </Spotlight>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        )}

        {more.length > 0 && (
          <Reveal className="mt-16">
            <h3 className="text-sm text-muted">{t.blog.more}</h3>
            <ul className="mt-3 grid gap-x-10 border-t border-line sm:grid-cols-2">
              {more.map((p) => (
                <li key={p.slug} className="border-b border-line">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={aria(p)}
                    className="group flex min-h-[60px] items-center justify-between gap-4 py-3.5">
                    <span className="font-medium transition-colors group-hover:text-accent">{p.title}</span>
                    <span className="flex shrink-0 items-center gap-3 text-sm text-muted">
                      <time dateTime={p.date}>{formatDate(p.date, lang, { month: 'short', year: 'numeric' })}</time>
                      <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
