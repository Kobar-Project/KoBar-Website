import type { BrandName } from '../data/icons';
import { CONTACT_EMAIL, links } from '../site';
import { BrandIcon } from './Icon';

const columns = [
  {
    title: 'Product',
    items: [
      { label: 'Features', href: '/#features' },
      { label: 'Plugins', href: '/plugins/' },
      { label: 'Download', href: '/#download' },
      { label: 'Release notes', href: links.releasesLatest },
    ],
  },
  {
    title: 'Project',
    items: [
      { label: 'Source code', href: links.repo },
      { label: 'License', href: '/license/' },
      { label: 'Privacy policy', href: '/privacy/' },
      { label: 'Security policy', href: links.security },
    ],
  },
  {
    title: 'Support KoBar',
    items: [
      { label: 'Patreon', href: links.patreon },
      { label: 'Open Collective', href: links.openCollective },
      { label: 'Contribute', href: links.contributing },
      { label: CONTACT_EMAIL, href: links.email },
    ],
  },
];

const social: { name: BrandName; label: string; href: string }[] = [
  { name: 'discord', label: 'Discord', href: links.discord },
  { name: 'reddit', label: 'Reddit', href: links.reddit },
  { name: 'x', label: 'X', href: links.x },
  { name: 'youtube', label: 'YouTube', href: links.youtube },
  { name: 'github', label: 'GitHub', href: links.repo },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid w-full max-w-page gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="/" className="inline-block rounded-md" aria-label="KoBar home">
            <img src="/brand/kobar-lockup-on-dark.svg" alt="" width="120" height="32" className="h-8 w-auto" loading="lazy" />
          </a>
          <p className="mt-4 max-w-64 text-sm text-muted">A sidebar for everything. Free and open source, for Windows 10 and 11.</p>
          <ul className="mt-6 flex gap-1" aria-label="KoBar on social media">
            {social.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-ink-3 hover:text-cream"
                >
                  <BrandIcon name={s.name} className="size-5" label={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-sans text-sm font-semibold tracking-normal text-cream">{col.title}</h2>
            <ul className="mt-3 space-y-1">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="inline-block py-1.5 text-sm text-muted transition-colors duration-150 hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-page flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 KoBar Project. KoBar is MIT licensed.</p>
          <p>
            Made by{' '}
            <a href={links.author} className="link">
              Ekrem EDALI
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
