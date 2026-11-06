import { FileSearch, FileText, HardDriveDownload, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';
import { site } from '../config/site';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

const G = site.links.github;
/** Which published tools support each stage (from their READMEs). */
const stageTools: { name: string; repo: string }[][] = [
  [{ name: 'WEBCQUISITION', repo: 'WEBCQUISITION' }, { name: 'ForensicVisionPro', repo: 'ForensicVisionPro' }],
  [{ name: 'WEBCQUISITION', repo: 'WEBCQUISITION' }, { name: 'ForensicVisionPro', repo: 'ForensicVisionPro' }, { name: 'PDFTrace', repo: 'PDFTrace' }],
  [{ name: 'PDFTrace', repo: 'PDFTrace' }, { name: 'ForensicVisionPro', repo: 'ForensicVisionPro' }, { name: 'Query-SQL-WhatsApp-db', repo: 'Query-SQL-WhatsApp-db' }],
  [{ name: 'XT_ExtractDocsMail', repo: 'XT_ExtractDocsMail-' }, { name: 'From-PA-to-a-readable-chat', repo: 'From-PA-to-a-readable-chat' }, { name: 'PDFTrace', repo: 'PDFTrace' }],
];
const icons = [HardDriveDownload, ShieldCheck, FileSearch, FileText];

export default function Method() {
  const { t } = useI18n();
  return (
    <section id="method" aria-labelledby="method-title" className="section overflow-hidden border-y border-line/70 bg-surface/50">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgb(var(--line) / .35) 0 1px, transparent 1px 120px)' }} />
      <div className="page relative">
        <SectionHeader id="method" kicker={t.method.kicker} title={t.method.title}>{t.method.intro}</SectionHeader>

        <Reveal as="ol" variant="fade" className="relative mt-16 grid gap-6 lg:grid-cols-4">
          {/* connector across the four stages (desktop) */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-line lg:block">
            <div className="connector h-full bg-gradient-to-r from-accent via-accent2 to-accent" />
          </div>
          {t.method.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal as="li" key={s.t} delay={i * 140} className="relative flex gap-5 lg:block lg:text-center">
                <div className="relative z-10 flex shrink-0 flex-col items-center lg:mx-auto lg:w-max">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-bg text-accent shadow-card">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  {i < 3 && <span aria-hidden className="mt-2 w-px flex-1 bg-line lg:hidden" />}
                </div>
                <div className="pb-6 lg:mt-6 lg:pb-0">
                  <p className="hash">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.d}</p>
                  <p className="mt-4 text-xs text-muted">{t.method.tools}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5 lg:justify-center">
                    {stageTools[i].map((tool) => (
                      <li key={tool.repo}>
                        <a href={`${G}/${tool.repo}`} target="_blank" rel="noopener noreferrer"
                          className="tag transition-colors hover:border-accent/60 hover:text-accent">{tool.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
