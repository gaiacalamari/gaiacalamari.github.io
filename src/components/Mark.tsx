/** Personal mark: a magnifier over a crosshair, the same shape as the favicon. */
export default function Mark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-surface stroke-line" strokeWidth="2" />
      <circle cx="28" cy="28" r="13" fill="none" className="stroke-accent" strokeWidth="5" />
      <path d="M37.5 37.5 50 50" className="stroke-accent" strokeWidth="6" strokeLinecap="round" />
      <path d="M22 28h12M28 22v12" className="stroke-ink" strokeWidth="3" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}
