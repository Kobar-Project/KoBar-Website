import { BrandIcon, Icon } from '../components/Icon';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { ArrowLink, Container } from '../components/ui';
import { plugins } from '../data/plugins';
import { links } from '../site';

// The license text is KoBar/LICENSE.md, verbatim. Repository licenses were read from each repository's LICENSE file
// (2026-10-18); "See the repository" means the repository has no license file yet.

const MIT_TEXT = `MIT License

Copyright (c) 2026 eedali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const plain = [
  { icon: 'check', text: 'Use KoBar for anything, at home or at work, for free.' },
  { icon: 'check', text: 'Read, change and share the code, or build on it.' },
  { icon: 'check', text: 'Keep the copyright and license notice with any copy you share.' },
  { icon: 'close', text: 'There is no warranty: KoBar is provided as it is.' },
] as const;

const repositories = [
  { name: 'KoBar (the app)', url: links.repo, license: 'MIT' },
  ...plugins.map((p) => ({ name: p.name, url: p.repoUrl, license: p.license })),
  { name: 'Plugin registry', url: links.registry, license: null },
  { name: 'This website', url: links.website, license: null },
];

const thirdParty = [
  { name: 'Outfit typeface', license: 'SIL Open Font License 1.1', url: 'https://github.com/Outfitio/Outfit-Fonts' },
  { name: 'Material Symbols icons', license: 'Apache License 2.0', url: 'https://github.com/google/material-design-icons' },
  { name: 'Simple Icons brand marks', license: 'CC0 1.0', url: 'https://github.com/simple-icons/simple-icons' },
  { name: 'React', license: 'MIT', url: 'https://github.com/facebook/react' },
  { name: 'Vercel Web Analytics', license: 'MIT', url: 'https://github.com/vercel/analytics' },
];

export default function License() {
  return (
    <Layout current="/license/">
      <PageHeader eyebrow="License" title="Free and open source, under the MIT license">
        <p>
          KoBar’s source code is public on GitHub. You may use it, change it and share it, as long as the license notice
          stays with it.
        </p>
      </PageHeader>

      <Container className="grid gap-14 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <section aria-labelledby="plain-title">
          <h2 id="plain-title" className="text-[1.625rem] sm:text-[1.875rem]">
            In plain words
          </h2>
          <ul className="mt-6 space-y-3.5 text-fg">
            {plain.map((item) => (
              <li key={item.text} className="flex gap-3">
                <Icon name={item.icon} className={`mt-0.5 size-5 shrink-0 ${item.icon === 'check' ? 'text-accent' : 'text-muted'}`} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">This summary is not legal advice. The license text is what counts.</p>

          <h2 id="contribute" className="mt-14 text-[1.625rem] sm:text-[1.875rem]">
            Contribute
          </h2>
          <p className="mt-4 text-fg">
            Bug reports, ideas and pull requests are welcome. Please read the guides first.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <ArrowLink href={links.contributing} external>
              Contributing guide
            </ArrowLink>
            <ArrowLink href={links.codeOfConduct} external>
              Code of conduct
            </ArrowLink>
            <ArrowLink href={links.security} external>
              Security policy
            </ArrowLink>
          </div>
        </section>

        <section aria-labelledby="text-title">
          <h2 id="text-title" className="text-[1.625rem] sm:text-[1.875rem]">
            License text
          </h2>
          {/* The file is hard-wrapped at 80 columns; its paragraphs are re-flowed here, the words are unchanged. */}
          <div className="mt-6 space-y-4 rounded-xl bg-ink-2 p-6 text-[0.9375rem] text-fg ring-1 ring-line">
            {MIT_TEXT.split('\n\n').map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph.replace(/\n/g, ' ')}</p>
            ))}
          </div>
          <p className="mt-3 text-sm">
            <a href={links.license} className="link">
              LICENSE.md on GitHub
            </a>
          </p>
        </section>
      </Container>

      <section aria-labelledby="repos-title" className="border-t border-line bg-ink-2 py-16 lg:py-20">
        <Container>
          <h2 id="repos-title" className="text-[1.625rem] sm:text-[1.875rem]">
            Source code
          </h2>
          <p className="mt-4 max-w-2xl text-fg">The app, each official plugin, the plugin registry and this website have their own repositories.</p>
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {repositories.map((r) => (
              <li key={r.url} className="border-b border-line">
                <a href={r.url} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                  <span className="flex items-center gap-3 text-cream group-hover:underline">
                    <BrandIcon name="github" className="size-4 shrink-0 text-muted" />
                    {r.name}
                  </span>
                  <span className="shrink-0 text-sm text-muted">{r.license ?? 'See the repository'}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="third-title" className="py-16 lg:py-20">
        <Container>
          <h2 id="third-title" className="text-[1.625rem] sm:text-[1.875rem]">
            Used on this website
          </h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {thirdParty.map((t) => (
              <li key={t.name} className="border-b border-line">
                <a href={t.url} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                  <span className="text-cream group-hover:underline">{t.name}</span>
                  <span className="shrink-0 text-sm text-muted">{t.license}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </Layout>
  );
}
