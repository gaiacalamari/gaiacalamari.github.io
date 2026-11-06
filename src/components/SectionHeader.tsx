import type { ReactNode } from 'react';
import Reveal from './Reveal';

export default function SectionHeader({ id, kicker, title, children, align = 'left' }:
  { id: string; kicker?: string; title: string; children?: ReactNode; align?: 'left' | 'center' }) {
  const center = align === 'center';
  return (
    <header className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {kicker && <Reveal><p className="kicker">{kicker}</p></Reveal>}
      <Reveal delay={60}><h2 id={`${id}-title`} className="h2 mt-4">{title}</h2></Reveal>
      {children && <Reveal delay={120}><div className={`lede ${center ? 'mx-auto' : ''}`}>{children}</div></Reveal>}
    </header>
  );
}
