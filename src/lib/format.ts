import type { Lang } from '../data/types';
export function formatDate(iso: string | null, lang: Lang, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', opts).format(d);
}
