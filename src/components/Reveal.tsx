import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';

interface Props {
  as?: ElementType;
  delay?: number;
  variant?: 'up' | 'fade' | 'scale';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}

/** Fades content in once when it enters the viewport. Respects reduced motion via CSS. */
export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className, style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.setAttribute('data-in', ''); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.setAttribute('data-in', ''); io.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal={variant === 'up' ? '' : variant} className={className}
      style={{ ...style, ['--d' as string]: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}
