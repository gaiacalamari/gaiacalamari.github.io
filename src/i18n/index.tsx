import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import en, { type Dict } from './en';
import it from './it';
import { site } from '../config/site';
import type { Lang } from '../data/types';

/** To add a language: create a dictionary typed as Dict and register it here. */
const dictionaries: Record<Lang, Dict> = { en, it };
const KEY = 'gc-lang';

function initialLang(): Lang {
  try {
    const hash = location.hash.slice(1);
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'it') return saved;
    if (hash === 'it') return 'it';
  } catch { /* storage unavailable */ }
  return site.defaultLanguage;
}

interface Ctx { lang: Lang; t: Dict; setLang: (l: Lang) => void }
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
