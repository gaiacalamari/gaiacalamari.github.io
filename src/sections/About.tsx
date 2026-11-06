import { FileLock2, ListChecks, Trophy, Workflow } from 'lucide-react';
import { useI18n } from '../i18n';
import { certifications, education, experience, type TimelineItem } from '../data/profile';
import { record } from '../data/record';
import type { Post, Project } from '../data/types';
import Reveal from '../components/Reveal';
import Spotlight from '../components/Spotlight';
import CountUp from '../components/CountUp';

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  const { lang } = useI18n();
  if (!items.length) return null; // nothing unverified is ever rendered
  return (
    <Reveal className="card p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ol className="mt-5 space-y-5 border-l border-line pl-5">
        {items.map((it) => (
          <li key={it.period + it.title.en} className="relative">
            <span aria-hidden className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg" />
            <p className="hash">{it.period}</p>
            <p className="font-medium">{it.title[lang]}{it.org && <span className="text-muted">, {it.org}</span>}</p>
            {it.text && <p className="text-muted">{it.text[lang]}</p>}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

const icons = [FileLock2, ListChecks, Workflow, Trophy];

export default function About({ projects, posts }: { projects: Project[]; posts: Post[] }) {
  const { t } = useI18n();
  const langs = new Set(projects.map((p) => p.language).filter(Boolean)).size;
  const stats = [
    { n: projects.length, label: t.about.stats.repos },
    { n: posts.length, label: t.about.stats.posts, suffix: posts.length >= 30 ? '+' : '' },
    { n: record.length, label: t.about.stats.ctf },
    { n: langs, label: t.about.stats.langs },
  ];
  const hasPath = experience.length + education.length + certifications.length > 0;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="page">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.25fr_1fr] [&>*]:min-w-0">
          <div>
            <Reveal><h2 id="about-title" className="h2">{t.about.title}</h2></Reveal>
            <Reveal delay={120} className="mt-8 max-w-prose space-y-5 text-lg leading-relaxed">
              <p>{t.about.p1}</p>
              <p className="text-muted">{t.about.p2}</p>
            </Reveal>
          </div>

          <div className="lg:pt-12">
            <ul className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <Reveal as="li" key={s.label} delay={i * 80} variant="scale" className="card p-5 sm:p-6">
                  <p className="text-4xl font-semibold tabular-nums sm:text-5xl" style={{ letterSpacing: '-0.04em' }}>
                    <CountUp value={s.n} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
                </Reveal>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">{t.about.statsNote}</p>
          </div>
        </div>

        <Reveal className="mt-24"><h3 className="text-xl font-semibold">{t.about.approachTitle}</h3></Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.approach.map((a, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={a.t} delay={i * 90}>
                <Spotlight className="card card-hover h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent"><Icon className="h-5 w-5" aria-hidden /></span>
                  <p className="mt-5 font-semibold">{a.t}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{a.d}</p>
                </Spotlight>
              </Reveal>
            );
          })}
        </ul>

        {hasPath && (
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <Timeline title={t.about.pathTitle} items={experience} />
            <Timeline title={t.about.eduTitle} items={education} />
            <Timeline title={t.about.certTitle} items={certifications} />
          </div>
        )}
      </div>
    </section>
  );
}
