import { useEffect, useState } from 'react';
import type { SymbolName } from '../data/icons';
import { Icon } from './Icon';
import KoBarHead from './KoBarHead';

// The home page's section index, drawn like the KoBar bar docked to the right edge of the screen. It shows on wide
// screens once the hero has scrolled away, and marks the section in view with the app's amber indicator.

export type EdgeItem = { id: string; label: string; icon: SymbolName };

export default function EdgeBar({ items, heroId }: { items: EdgeItem[]; heroId: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);

    const heroObserver = new IntersectionObserver(([entry]) => setDocked(!entry.isIntersecting), { threshold: 0 });
    if (hero) heroObserver.observe(hero);

    // A section is "current" while it crosses the middle band of the viewport.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => sectionObserver.observe(s));

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [items, heroId]);

  return (
    <nav
      aria-label="Sections"
      className={`fixed top-1/2 right-4 z-30 hidden -translate-y-1/2 transition-[opacity,translate] duration-200 xl:block ${
        docked ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-3 opacity-0'
      }`}
      inert={!docked}
    >
      <ul className="flex w-13 flex-col items-center gap-1 rounded-full border border-line bg-ink-2 py-3 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.7)]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="group relative">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex size-10 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-ink-4 hover:text-cream ${
                  isActive ? 'text-cream' : 'text-muted'
                }`}
              >
                <span
                  className={`absolute top-2 bottom-2 -left-1.5 w-[3px] rounded-full bg-accent transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
                <Icon name={item.icon} className="size-[22px]" />
                <span className="pointer-events-none absolute right-full mr-3 rounded-md bg-ink-4 px-2.5 py-1 text-sm whitespace-nowrap text-cream opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
        <li aria-hidden="true" className="my-1 h-px w-6 bg-line" />
        <li className="group relative">
          <a href={`#${heroId}`} className="flex size-10 items-center justify-center rounded-lg text-accent hover:bg-ink-4">
            <KoBarHead className="size-7" />
            <span className="pointer-events-none absolute right-full mr-3 rounded-md bg-ink-4 px-2.5 py-1 text-sm whitespace-nowrap text-cream opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100">
              Back to top
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
