import { ArrowUpRight, BookOpen, Cloud, Database, Fingerprint, Globe, Monitor, Radar, Smartphone, Workflow, Wrench, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n';
import { expertise } from '../data/expertise';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Spotlight from '../components/Spotlight';

const icon: Record<string, LucideIcon> = {
  computer: Monitor, mobile: Smartphone, cloud: Cloud, web: Globe,
  acquisition: Fingerprint, extraction: Database, automation: Workflow, osint: Radar,
};
/** Bento layout: wider tiles for the areas with the most public work. */
const span: Record<string, string> = {
  mobile: 'lg:col-span-2', extraction: 'lg:col-span-2', automation: 'lg:col-span-2', osint: 'lg:col-span-2',
};

export default function Expertise() {
  const { t, lang } = useI18n();
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section">
      <div className="page">
        <SectionHeader id="expertise" kicker={t.expertise.kicker} title={t.expertise.title}>{t.expertise.intro}</SectionHeader>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((area, i) => {
            const Icon = icon[area.id] ?? Wrench;
            const documented = area.evidence.length > 0;
            return (
              <Reveal as="li" key={area.id} delay={(i % 4) * 70} className={span[area.id] ?? ''}>
                <Spotlight className={`card card-hover flex h-full flex-col p-6 ${documented ? '' : 'border-dashed bg-transparent shadow-none'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl ${documented ? 'bg-gradient-to-br from-accent/20 to-accent2/10 text-accent ring-1 ring-accent/25' : 'bg-raised text-muted ring-1 ring-line'}`}>
                      <Icon className="h-[22px] w-[22px]" aria-hidden />
                    </span>
                    {documented && <span className="tag">{area.evidence.length} {area.evidence.length === 1 ? t.expertise.source1 : t.expertise.sources}</span>}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{area.title[lang]}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{area.text[lang]}</p>
                  <div className="mt-auto pt-6">
                    {documented ? (
                      <>
                        <p className="text-xs text-muted">{t.expertise.documented}</p>
                        <ul className="mt-2.5 flex flex-wrap gap-2">
                          {area.evidence.map((e) => (
                            <li key={e.href + e.kind}>
                              <a href={e.href} target="_blank" rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1.5 rounded-lg border border-line bg-bg/60 px-2.5 py-1.5 text-[0.85rem] transition-colors hover:border-accent/60 hover:text-accent">
                                {e.kind === 'tool'
                                  ? <Wrench className="h-3.5 w-3.5 text-accent" aria-label={t.expertise.tool} />
                                  : <BookOpen className="h-3.5 w-3.5 text-accent" aria-label={t.expertise.article} />}
                                {e.label}
                                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" aria-hidden />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-sm italic text-muted">{t.expertise.interest}</p>
                    )}
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
