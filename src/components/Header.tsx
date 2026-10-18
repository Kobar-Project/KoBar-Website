import { useEffect, useRef, useState } from 'react';
import { links, nav } from '../site';
import { BrandIcon, Icon } from './Icon';
import { ButtonLink } from './ui';

export default function Header({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu with Escape and give focus back to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const navLinkClass = (href: string) =>
    `rounded-md px-3 py-2 text-[0.9375rem] transition-colors duration-150 hover:text-cream ${
      current === href ? 'text-cream' : 'text-muted'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95">
      <a
        href="#main"
        className="sr-only rounded-md bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-page items-center gap-6 px-4 sm:px-6">
        <a href="/" className="-m-1 shrink-0 rounded-md p-1" aria-label="KoBar home">
          <img src="/brand/kobar-lockup-on-dark.svg" alt="" width="105" height="28" className="h-7 w-auto" />
        </a>

        <nav aria-label="Main" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={navLinkClass(item.href)} aria-current={current === item.href ? 'page' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={links.repo} className={`${navLinkClass('')} inline-flex items-center gap-2`}>
                <BrandIcon name="github" className="size-4" />
                GitHub
              </a>
            </li>
          </ul>
        </nav>

        <ButtonLink href="/#download" className="ml-auto min-h-10 px-4 py-2 md:ml-2">
          <Icon name="download" className="size-5" />
          Download
        </ButtonLink>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-cream hover:bg-ink-3 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className="size-6" />
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Main" hidden={!open} className="border-t border-line md:hidden">
        <ul className="mx-auto flex max-w-page flex-col px-2 py-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-md px-3 text-cream hover:bg-ink-3"
                aria-current={current === item.href ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href={links.repo} className="flex min-h-12 items-center gap-2 rounded-md px-3 text-cream hover:bg-ink-3">
              <BrandIcon name="github" className="size-4" />
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
