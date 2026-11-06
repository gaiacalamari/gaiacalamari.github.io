import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '../i18n';
import { site } from '../config/site';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';

export default function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const items = [...t.faq.items.slice(0, 5), { q: t.faq.cvQ, a: site.cv.file ? t.faq.cvYes : t.faq.cvNo }, ...t.faq.items.slice(5)];
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="page grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] [&>*]:min-w-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader id="faq" kicker={t.faq.kicker} title={t.faq.title} />
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={it.q} delay={i * 50}>
                <h3>
                  <button type="button" id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors hover:text-accent">
                    {it.q}
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-accent bg-accent text-on-accent' : 'border-line text-muted group-hover:border-accent/60'}`}>
                      <Plus className="h-4 w-4" aria-hidden />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="acc" data-open={isOpen} aria-hidden={!isOpen}>
                  <div><p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{it.a}</p></div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
