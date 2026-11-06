/** Infinite, pausable strip. Content is duplicated once; the copy is hidden from assistive tech. */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it} className="flex items-center gap-10 whitespace-nowrap text-lg font-medium text-muted sm:text-xl">
          <span>{it}</span><span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent/60" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee-wrap relative overflow-hidden" role="region" aria-label={label}
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div className="marquee flex w-max">{row(false)}{row(true)}</div>
    </div>
  );
}
