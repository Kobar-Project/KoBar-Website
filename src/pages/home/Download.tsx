import type { ReactNode } from 'react';
import { BrandIcon, Icon, MicrosoftLogo } from '../../components/Icon';
import LatestVersion from '../../components/LatestVersion';
import { ButtonLink, Container, Eyebrow } from '../../components/ui';
import { links } from '../../site';

const faq: { q: string; a: ReactNode }[] = [
  {
    q: 'Is KoBar free?',
    a: 'Yes. KoBar and its official plugins are free, with no ads and no account. The app’s source code is MIT licensed.',
  },
  {
    q: 'Microsoft Store or GitHub: which should I pick?',
    a: 'The Microsoft Store, if you can. It installs KoBar in one click and keeps it up to date. The GitHub installer is for PCs without the Store; that version checks GitHub for updates when it starts and asks before installing one.',
  },
  {
    q: 'Does KoBar collect my data?',
    a: (
      <>
        No. There is no account, no analytics and no KoBar server. Some plugins talk to outside services when you use
        them, for example AI Hub with the AI provider you choose. The{' '}
        <a href="/privacy/" className="link">
          privacy policy
        </a>{' '}
        lists every one.
      </>
    ),
  },
  {
    q: 'Are plugins safe?',
    a: 'The 13 official plugins come from the KoBar project on GitHub. KoBar asks before every install and warns you when a plugin comes from outside the official registry. Plugins run with full access to the app, so install only plugins you trust.',
  },
  {
    q: 'Can I move my setup to another PC?',
    a: 'Yes. Settings › Backup exports your notes, settings, workspaces and plugin data into one file that you can restore on the other PC. API keys are left out unless you choose to include them.',
  },
];

export default function Download() {
  return (
    <section id="download" aria-labelledby="download-title" className="glow py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Download</Eyebrow>
          <h2 id="download-title" className="mt-3 text-[2.25rem] sm:text-[2.75rem]">
            Get KoBar
          </h2>
          <p className="mt-5 text-lg text-fg">Free for Windows 10 and 11.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl bg-ink-2 p-7 ring-1 ring-accent/40 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl">Microsoft Store</h3>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">Recommended</span>
            </div>
            <p className="mt-3 flex-1 text-fg">One-click install. The Store keeps KoBar up to date for you.</p>
            <div className="mt-7 flex flex-col items-start gap-4">
              <ButtonLink href={links.storeWeb}>
                <MicrosoftLogo />
                Get it from Microsoft Store
              </ButtonLink>
              <a href={links.storeApp} className="link text-sm">
                On Windows? Open it in the Store app
              </a>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-ink-2 p-7 ring-1 ring-line sm:p-8">
            <h3 className="text-2xl">GitHub Releases</h3>
            <p className="mt-3 flex-1 text-fg">
              A standard Windows installer (.exe). It checks GitHub for new versions when KoBar starts and asks before
              installing one.
            </p>
            <div className="mt-7 flex flex-col items-start gap-4">
              <ButtonLink href={links.releasesLatest} variant="secondary">
                <BrandIcon name="github" className="size-[18px]" />
                Download from GitHub
              </ButtonLink>
              <LatestVersion className="block min-h-5 text-sm" />
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h3 className="text-[1.75rem] sm:text-[2rem]">Questions</h3>
          <div className="divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold text-cream [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Icon name="expand_more" className="size-6 shrink-0 text-muted transition-transform duration-150 group-open:rotate-180" />
                </summary>
                <p className="pb-6 text-fg">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
