import { ArrowUpRight, Flag } from 'lucide-react';
import { useI18n } from '../i18n';
import { record } from '../data/record';
import { site } from '../config/site';
import { formatDate } from '../lib/format';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Spotlight from '../components/Spotlight';

export default function Record() {
  const { t, lang } = useI18n();
  return (
    <section id="record" aria-labelledby="record-title" className="section">
      <div className="page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader id="record" kicker={t.record.kicker} title={t.record.title}>{t.record.intro}</SectionHeader>
          <Reveal delay={150} className="shrink-0">
            <a href={site.blog.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">{t.record.all}<ArrowUpRight className="h-4 w-4" aria-hidden /></a>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {record.map((r, i) => (
            <Reveal as="li" key={r.url} delay={(i % 3) * 80}>
              <Spotlight as="article" className="card card-hover group flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-medium"><Flag className="h-4 w-4 text-accent" aria-hidden />{r.org}</span>
                  <time dateTime={r.date} className="text-sm text-muted">{formatDate(r.date, lang, { month: 'short', year: 'numeric' })}</time>
                </div>
                <h3 className="mt-5 text-xl font-semibold" style={{ letterSpacing: '-0.02em' }}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">{r.title}</a>
                </h3>
                <p className="mt-2 text-sm text-muted">{t.record.target}: <span className="text-ink">{r.target[lang]}</span></p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
                  {t.record.readWriteup}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
