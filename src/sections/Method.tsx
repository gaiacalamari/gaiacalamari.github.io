import { ClipboardList, FileSearch, FileText, GraduationCap, HardDriveDownload, MessagesSquare, ScanText, Scale, Server, Users } from 'lucide-react';
import { useI18n } from '../i18n';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

const stepIcons = [ClipboardList, HardDriveDownload, Server, FileSearch, ScanText, FileText];
const teamIcons = [Users, MessagesSquare, GraduationCap];

export default function Method() {
  const { t } = useI18n();
  const m = t.method;
  return (
    <section id="method" aria-labelledby="method-title" className="section overflow-hidden border-y border-line/70 bg-surface/50">
      <div className="page relative">
        <SectionHeader id="method" kicker={m.kicker} title={m.title}>{m.intro}</SectionHeader>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
          {/* The stages are a real sequence, so they are numbered */}
          <div>
            <Reveal><h3 className="text-xl font-semibold">{m.stepsTitle}</h3></Reveal>
            <ol className="mt-6 border-l border-line pl-6">
              {m.steps.map((s, i) => {
                const Icon = stepIcons[i];
                return (
                  <Reveal as="li" key={s.t} delay={i * 80} className="relative pb-8 last:pb-0">
                    <span aria-hidden className="absolute -left-[2.6rem] top-0 grid h-9 w-9 place-items-center rounded-xl border border-line bg-bg text-accent shadow-card">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="hash">0{i + 1}</p>
                    <h4 className="mt-0.5 text-lg font-semibold">{s.t}</h4>
                    <p className="mt-1.5 max-w-prose text-[0.95rem] leading-relaxed text-muted">{s.d}</p>
                  </Reveal>
                );
              })}
            </ol>
          </div>

          <div className="space-y-12">
            <div>
              <Reveal><h3 className="text-xl font-semibold">{m.teamTitle}</h3></Reveal>
              <ul className="mt-6 space-y-4">
                {m.team.map((s, i) => {
                  const Icon = teamIcons[i];
                  return (
                    <Reveal as="li" key={s.t} delay={i * 80} className="flex gap-4">
                      <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-semibold">{s.t}</p>
                        <p className="text-[0.95rem] text-muted">{s.d}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            <Reveal className="card p-6">
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5 text-accent" aria-hidden />
                <h3 className="text-lg font-semibold">{m.rolesTitle}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {m.roles.map((r) => <li key={r} className="tag text-sm text-ink">{r}</li>)}
              </ul>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{m.rolesText}</p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <h3 className="text-xl font-semibold">{m.casesTitle}</h3>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {m.cases.map((c) => (
              <li key={c} className="rounded-lg border border-line bg-bg/60 px-3 py-1.5 text-[0.95rem]">{c}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
