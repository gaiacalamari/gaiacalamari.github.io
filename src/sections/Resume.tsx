import { Clock, Download } from 'lucide-react';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import { LinkedinIcon } from '../components/BrandIcons';
import Reveal from '../components/Reveal';

/** Stylised document, no real content: signals the PDF that will live here. */
function DocArt({ ready }: { ready: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto h-56 w-44 sm:h-64 sm:w-52">
      <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-6 rounded-2xl border border-line bg-raised" />
      <div className="absolute inset-0 rounded-2xl border border-line bg-surface p-5 shadow-float">
        <div className="h-3 w-2/3 rounded bg-ink/80" />
        <div className="mt-2 h-2 w-1/2 rounded bg-accent/70" />
        <div className="mt-6 space-y-2">{[90, 75, 85, 60].map((w) => <div key={w} className="h-1.5 rounded bg-line" style={{ width: `${w}%` }} />)}</div>
        <div className="mt-5 space-y-2">{[80, 70, 88].map((w) => <div key={w} className="h-1.5 rounded bg-line" style={{ width: `${w}%` }} />)}</div>
        <span className={`absolute bottom-4 right-4 rounded-md px-2 py-1 font-mono text-[0.7rem] ${ready ? 'bg-accent text-on-accent' : 'border border-dashed border-line text-muted'}`}>PDF</span>
      </div>
    </div>
  );
}

export default function Resume() {
  const { t } = useI18n();
  const file = site.cv.file;
  return (
    <section id="cv" aria-labelledby="cv-title" className="section pt-8 sm:pt-12">
      <div className="page">
        <Reveal variant="scale" className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(50% 80% at 100% 50%, var(--glow-a), transparent 70%)' }} />
          <div className="relative grid grid-cols-1 items-center gap-10 p-7 sm:p-12 md:grid-cols-[1fr_auto] [&>*]:min-w-0">
            <div>
              <p className="kicker">{t.cv.kicker}</p>
              <h2 id="cv-title" className="h2 mt-4">{t.cv.title}</h2>
              <p className="lede">{t.cv.text}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {file ? (
                  <a href={file} download className="btn-primary"><Download className="h-[18px] w-[18px]" aria-hidden />{t.cv.download}</a>
                ) : (
                  <>
                    <span className="btn-disabled" aria-disabled="true"><Clock className="h-[18px] w-[18px]" aria-hidden />{t.cv.soon}</span>
                    <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost"><LinkedinIcon className="h-[18px] w-[18px]" />{t.cv.linkedin}</a>
                  </>
                )}
              </div>
              {!file && <p className="mt-4 text-sm text-muted">{t.cv.meanwhile}</p>}
            </div>
            <DocArt ready={Boolean(file)} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
