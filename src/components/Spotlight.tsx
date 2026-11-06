import type { AnchorHTMLAttributes, ElementType, HTMLAttributes, PointerEvent, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLElement> & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> & { as?: ElementType; children?: ReactNode };

/** Card wrapper with a cursor-following highlight (pure CSS variables, no re-render). */
export default function Spotlight({ as: Tag = 'div', className = '', children, ...rest }: Props) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return <Tag className={`spot ${className}`} onPointerMove={onMove} {...rest}>{children}</Tag>;
}
