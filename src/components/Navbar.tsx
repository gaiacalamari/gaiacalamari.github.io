import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { useTheme } from '../hooks/useTheme';
import { site } from '../config/site';
import Mark from './Mark';
import ThemeToggle from './ThemeToggle';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const links = ['about', 'method', 'expertise', 'projects', 'blog', 'record', 'faq'] as const;
const observed = ['home', ...links, 'cv', 'contact'];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        const max = document.documentElement.scrollHeight - innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    observed.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); } };
    const onResize = () => { if (innerWidth >= 1280) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); document.body.style.overflow = ''; };
  }, [open]);

  const other = lang === 'en' ? 'it' : 'en';
  const LangBtn = (
    <button type="button" onClick={() => setLang(other)} lang={other} aria-label={t.meta.switchTo}
      className="flex h-10 items-center gap-1 rounded-xl border border-line bg-surface/70 px-3 text-sm font-medium text-muted transition-colors hover:border-accent/60 hover:text-ink">
      <span className={lang === 'en' ? 'text-ink' : ''}>EN</span>
      <span aria-hidden className="text-line">/</span>
      <span className={lang === 'it' ? 'text-ink' : ''}>IT</span>
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className={`mx-auto transition-all duration-500 ease-out ${scrolled || open ? 'mt-2 max-w-[calc(76rem+1rem)] px-2 sm:mt-3 sm:px-4' : 'mt-0 max-w-[100rem] px-0'}`}>
        <nav aria-label={t.nav.main}
          className={`relative flex h-16 items-center justify-between gap-4 overflow-hidden px-4 transition-all duration-500 ease-out sm:px-6 ${
            scrolled || open ? 'rounded-2xl border border-line/80 bg-surface/75 shadow-float backdrop-blur-xl' : 'border border-transparent bg-transparent'}`}>
          <a href="#home" className="flex shrink-0 items-center gap-3 font-semibold tracking-tight" onClick={() => setOpen(false)}>
            <Mark className="h-9 w-9" />
            <span className="text-[1.05rem]">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {links.map((id) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}
                  className={`block rounded-lg px-3 py-2 text-[0.93rem] transition-colors duration-200 ${
                    active === id ? 'bg-accent/10 text-ink' : 'text-muted hover:bg-raised/70 hover:text-ink'}`}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 xl:flex">
            {LangBtn}
            <ThemeToggle theme={theme} toggle={toggle} />
            <a href="#contact" className="btn-primary btn-sm ml-1">{t.nav.cta}</a>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle theme={theme} toggle={toggle} />
            <button ref={btnRef} type="button" aria-expanded={open} aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/70 text-ink">
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>

          {/* scroll progress */}
          <div aria-hidden className={`absolute inset-x-0 bottom-0 h-[2px] transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
            <div ref={bar} className="h-full origin-left bg-gradient-to-r from-accent to-accent2" style={{ transform: 'scaleX(0)' }} />
          </div>
        </nav>

        {open && (
          <div id="mobile-menu" className="panel-in mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-line/80 bg-surface/95 p-3 shadow-float backdrop-blur-xl xl:hidden">
            <ul>
              {[...links, 'cv' as const, 'contact' as const].map((id, i) => (
                <li key={id} className="log-line" style={{ animationDelay: `${i * 35}ms` }}>
                  <a ref={i === 0 ? firstLink : undefined} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined}
                    className={`flex min-h-[52px] items-center justify-between rounded-xl px-4 text-lg transition-colors ${
                      active === id ? 'bg-accent/10 text-accent' : 'text-ink hover:bg-raised'}`}>
                    {t.nav[id]}
                    <ArrowUpRight className="h-4 w-4 opacity-40" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-line px-2 pt-4 pb-1">
              {LangBtn}
              <div className="flex gap-2">
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted hover:text-accent"><LinkedinIcon className="h-[18px] w-[18px]" /></a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted hover:text-accent"><GithubIcon className="h-[18px] w-[18px]" /></a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
