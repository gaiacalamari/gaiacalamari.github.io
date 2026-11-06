import { Moon, Sun } from 'lucide-react';
import { useI18n } from '../i18n';
import type { Theme } from '../hooks/useTheme';

export default function ThemeToggle({ theme, toggle }: { theme: Theme; toggle: (o?: { x: number; y: number }) => void }) {
  const { t } = useI18n();
  const dark = theme === 'dark';
  return (
    <button type="button" aria-label={dark ? t.nav.themeLight : t.nav.themeDark} aria-pressed={!dark}
      onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 }); }}
      className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-line bg-surface/70 text-muted transition-colors hover:border-accent/60 hover:text-accent">
      <Sun aria-hidden className={`absolute h-[18px] w-[18px] transition-all duration-500 ease-out ${dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`} />
      <Moon aria-hidden className={`absolute h-[18px] w-[18px] transition-all duration-500 ease-out ${dark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
    </button>
  );
}
