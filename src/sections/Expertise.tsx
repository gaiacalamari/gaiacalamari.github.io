import { ArrowUpRight, BookOpen, Cloud, HardDrive, Mail, Database, Fingerprint, Globe, Monitor, Radar, Smartphone, Workflow, Wrench, type LucideIcon } from 'lucide-react';
import { useI18n } from '../i18n';
import { expertise, toolkit } from '../data/expertise';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Spotlight from '../components/Spotlight';

const icon: Record<string, LucideIcon> = {
  computer: Monitor, mobile: Smartphone, cloud: Cloud, web: Globe,
  acquisition: Fingerprint, extraction: Database, automation: Workflow, osint: Radar,
  ediscovery: Mail, recovery: HardDrive,
};
/** Bento layout: wider tiles for the areas with the most public work. */
const span: Record<string, string> = {
  mobile: 'lg:col-span-2', extraction: 'lg:col-span-2', automation: 'lg:col-span-2', osint: 'lg:col-span-2',
  ediscovery: 'lg:col-span-2', recovery: 'lg:col-span-2',
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
            const solid = documented || area.casework;
            return (
              <Reveal as="li" key={area.id} delay={(i % 4) * 70} className={span[area.id] ?? ''}>
                <Spotlight className={`card card-hover flex h-full flex-col p-6 ${solid ? '' : 'border-dashed bg-transparent shadow-none'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl ${solid ? 'bg-gradient-to-br from-accent/20 to-accent2/10 text-accent ring-1 ring-accent/25' : 'bg-raised text-muted ring-1 ring-line'}`}>
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
                    ) : area.casework ? (
                      <p className="text-sm text-muted">{t.expertise.casework}</p>
                    ) : (
                      <p className="text-sm italic text-muted">{t.expertise.interest}</p>
                    )}
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-20">
          <Reveal><h3 className="text-xl font-semibold">{t.expertise.toolkitTitle}</h3></Reveal>
          <Reveal delay={60}><p className="mt-2 max-w-prose text-muted">{t.expertise.toolkitIntro}</p></Reveal>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {toolkit.map((g, i) => (
              <Reveal key={g.title.en} delay={(i % 3) * 70} className="border-t border-line pt-4">
                <dt className="font-semibold">{g.title[lang]}</dt>
                <dd>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.tools.map((tool) => (
                      <li key={tool} className="rounded-lg border border-line bg-raised/60 px-2.5 py-1 text-[0.9rem]">{tool}</li>
                    ))}
                  </ul>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
