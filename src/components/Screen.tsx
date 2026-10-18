import type { ReactNode } from 'react';
import { cx } from './ui';

/** A dark slice of a desktop, with the navy glow of the Store artwork, for screenshots to sit on. */
export default function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('relative overflow-hidden rounded-2xl bg-[#131316] ring-1 ring-line', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_100%,rgb(22_45_92/0.6),transparent_75%)]"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
