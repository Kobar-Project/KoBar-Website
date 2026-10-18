import { BrandIcon } from '../../components/Icon';
import { ButtonLink, Container, Eyebrow } from '../../components/ui';
import type { BrandName } from '../../data/icons';
import { links } from '../../site';

const community: { name: BrandName; label: string; href: string }[] = [
  { name: 'discord', label: 'Discord', href: links.discord },
  { name: 'reddit', label: 'Reddit', href: links.reddit },
  { name: 'x', label: 'X', href: links.x },
  { name: 'youtube', label: 'YouTube', href: links.youtube },
];

export default function OpenSource() {
  return (
    <section id="open-source" aria-labelledby="open-source-title" className="border-y border-line bg-ink-2 py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Open source</Eyebrow>
          <h2 id="open-source-title" className="mt-3 text-[2.25rem] sm:text-[2.75rem]">
            Free, and built in the open
          </h2>
          <p className="mt-5 text-lg text-fg">
            KoBar is MIT licensed and developed on GitHub. Report a bug, suggest a feature or write a plugin of your
            own.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <div className="flex flex-col rounded-2xl bg-ink p-7 ring-1 ring-line">
            <h3 className="text-xl">Source code</h3>
            <p className="mt-3 flex-1 text-[0.9375rem] text-muted">
              Read the code, open an issue or send a pull request. The official plugins have their own repositories.
            </p>
            <div className="mt-6">
              <ButtonLink href={links.repo} variant="secondary">
                <BrandIcon name="github" className="size-[18px]" />
                KoBar on GitHub
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl bg-ink p-7 ring-1 ring-line">
            <h3 className="text-xl">Community</h3>
            <p className="mt-3 flex-1 text-[0.9375rem] text-muted">Ask questions, share your setup and hear about new releases.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {community.map((c) => (
                <li key={c.name}>
                  <ButtonLink href={c.href} variant="secondary" className="px-4">
                    <BrandIcon name={c.name} className="size-[18px]" />
                    {c.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-2xl bg-ink p-7 ring-1 ring-line">
            <h3 className="text-xl">Support KoBar</h3>
            <p className="mt-3 flex-1 text-[0.9375rem] text-muted">
              KoBar is free. If it helps you every day, you can help keep it going.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              <li>
                <ButtonLink href={links.patreon} variant="secondary" className="px-4">
                  <BrandIcon name="patreon" className="size-[18px]" />
                  Patreon
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href={links.openCollective} variant="secondary" className="px-4">
                  <BrandIcon name="opencollective" className="size-[18px]" />
                  Open Collective
                </ButtonLink>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
