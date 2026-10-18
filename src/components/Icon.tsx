import { brands, symbols, type BrandName, type SymbolName } from '../data/icons';

type Props = { className?: string; label?: string };

const a11y = (label?: string) =>
  label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const, focusable: 'false' as const };

/** Material Symbols Outlined (the icon family of the KoBar app). Decorative unless `label` is given. */
export function Icon({ name, className = 'size-5', label }: Props & { name: SymbolName }) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className} {...a11y(label)}>
      <path d={symbols[name]} />
    </svg>
  );
}

/** Brand mark from Simple Icons. */
export function BrandIcon({ name, className = 'size-5', label }: Props & { name: BrandName }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...a11y(label)}>
      <path d={brands[name]} />
    </svg>
  );
}

/** The four-square Microsoft logo for the Store button. */
export function MicrosoftLogo({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 23 23" className={className} aria-hidden="true" focusable="false">
      <path fill="#f25022" d="M1 1h10v10H1z" />
      <path fill="#7fba00" d="M12 1h10v10H12z" />
      <path fill="#00a4ef" d="M1 12h10v10H1z" />
      <path fill="#ffb900" d="M12 12h10v10H12z" />
    </svg>
  );
}
