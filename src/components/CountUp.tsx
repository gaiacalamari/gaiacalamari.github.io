import { useEffect, useRef, useState } from 'react';

/** Counts up to `value` the first time it becomes visible. */
export default function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = () => {
      if (reduced) { setShown(value); return; }
      const t0 = performance.now(); const dur = 1100;
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (started.current) { run(); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { started.current = true; run(); io.disconnect(); }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref} aria-label={`${value}${suffix}`}><span aria-hidden>{shown}{suffix}</span></span>;
}
