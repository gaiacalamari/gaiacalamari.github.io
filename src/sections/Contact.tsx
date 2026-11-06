import { useState } from 'react';
import { ArrowUpRight, BookOpen, Check, Copy, Mail } from 'lucide-react';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import { GithubIcon, LinkedinIcon, MediumIcon } from '../components/BrandIcons';
import Reveal from '../components/Reveal';
import Spotlight from '../components/Spotlight';

export default function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* clipboard unavailable */ }
  };
  const channels = [
    { label: 'LinkedIn', handle: 'gaia-calamari-0a80a7238', href: site.links.linkedin, icon: <LinkedinIcon className="h-5 w-5" /> },
    { label: 'GitHub', handle: '@gaiacalamari', href: site.links.github, icon: <GithubIcon className="h-5 w-5" /> },
    { label: site.blog.shortName, handle: site.blog.wpSite, href: site.links.blog, icon: <BookOpen className="h-5 w-5" aria-hidden /> },
    { label: 'Medium', handle: '@forensicgaia', href: site.links.medium, icon: <MediumIcon className="h-5 w-5" /> },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="section pt-8 sm:pt-12">
      <div className="page">
        <Reveal variant="scale" className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-7 shadow-float sm:p-14">
          {/* backdrop */}
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(55% 70% at 0% 0%, var(--glow-a), transparent 70%), radial-gradient(50% 60% at 100% 100%, var(--glow-b), transparent 70%)' }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40"
            style={{ backgroundImage: 'radial-gradient(rgb(var(--line)) 1px, transparent 1px)', backgroundSize: '24px 24px',
              maskImage: 'linear-gradient(120deg, transparent 30%, black)', WebkitMaskImage: 'linear-gradient(120deg, transparent 30%, black)' }} />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end [&>*]:min-w-0">
            <div>
              <p className="kicker">{t.contact.kicker}</p>
              <h2 id="contact-title" className="mt-4 text-[2.5rem] font-semibold leading-[1] sm:text-[4rem]" style={{ letterSpacing: '-0.04em' }}>{t.contact.title}</h2>
              <p className="lede">{t.contact.text}</p>
              {site.email && (
                <>
                  <a href={`mailto:${site.email}`}
                    className="group mt-9 inline-flex max-w-full items-center gap-3 break-all text-2xl font-semibold tracking-tight sm:text-3xl">
                    <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">{site.email}</span>
                    <ArrowUpRight className="h-6 w-6 shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                  </a>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href={`mailto:${site.email}`} className="btn-primary"><Mail className="h-[18px] w-[18px]" aria-hidden />{t.contact.email}</a>
                    <button type="button" onClick={copy} className="btn-ghost">
                      {copied ? <Check className="h-[18px] w-[18px] text-ok" aria-hidden /> : <Copy className="h-[18px] w-[18px]" aria-hidden />}
                      <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {channels.map((c) => (
                <li key={c.label}>
                  <Spotlight as="a" href={c.href} target="_blank" rel="noopener noreferrer"
                    className="group flex min-h-[88px] items-center gap-4 rounded-2xl border border-line bg-bg/70 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lift">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-raised text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">{c.icon}</span>
                    <span className="min-w-0">
                      <span className="block font-semibold">{c.label}</span>
                      <span className="block truncate text-sm text-muted">{c.handle}</span>
                    </span>
                  </Spotlight>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
