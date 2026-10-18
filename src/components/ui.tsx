import type { ReactNode } from 'react';
import { Icon } from './Icon';

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-page px-4 sm:px-6', className)}>{children}</div>;
}

/** Small mono label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('font-mono text-xs tracking-wide text-muted uppercase', className)}>{children}</p>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
  className?: string;
};

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-[#f7b04a]',
  secondary: 'bg-ink-3 text-cream ring-1 ring-line-strong ring-inset hover:bg-ink-4',
  quiet: 'text-cream hover:bg-ink-3',
};

/** A link that looks like a button. Every action on this site navigates, so there is no <button> variant. */
export function ButtonLink({ href, children, variant = 'primary', className }: ButtonProps) {
  return (
    <a
      href={href}
      className={cx(
        'inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg px-5 py-2.5 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors duration-150',
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Inline text link with an arrow; `external` swaps it for the outward arrow. Links open in the same tab. */
export function ArrowLink({ href, children, external, className }: { href: string; children: ReactNode; external?: boolean; className?: string }) {
  return (
    <a
      href={href}
      className={cx('group inline-flex items-center gap-1.5 font-semibold text-cream underline-offset-4 hover:underline', className)}
    >
      {children}
      <Icon
        name={external ? 'arrow_outward' : 'arrow_forward'}
        className="size-4 text-accent transition-transform duration-150 group-hover:translate-x-0.5"
      />
    </a>
  );
}

export { cx };
