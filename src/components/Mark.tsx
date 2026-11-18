/** Personal mark: a fingerprint, the same shape as the favicon. */
export default function Mark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" className="fill-surface stroke-line" strokeWidth="2" />
      <g fill="none" className="stroke-accent" strokeWidth="3" strokeLinecap="round">
        <path d="M16 30C18 18 28 13 38 15C46 17 50 24 50 32" />
        <path d="M20 44C16 36 18 23 32 21C42 20 47 28 46 38" />
        <path d="M25 47C22 40 22 29 32 28C40 28 41 35 40 42" />
        <path d="M32 48C30 42 29 37 32 35C35 34 35 38 34 44" />
      </g>
    </svg>
  );
}
