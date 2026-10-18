import { BrandIcon, Icon } from '../components/Icon';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Picture from '../components/Picture';
import Screen from '../components/Screen';
import { ArrowLink, Container, Eyebrow } from '../components/ui';
import { plugins, type Plugin } from '../data/plugins';
import { links } from '../site';

// Install steps and safety notes use the app's own wording (KoBar en.json) and are backed by
// KoBar/remaster/store/listing-facts.md §3 and the 1.4.0 CHANGELOG.

const steps = [
  <>
    Open <strong className="font-semibold text-cream">Settings › Plugins</strong> from the bar menu.
  </>,
  <>
    Go to <strong className="font-semibold text-cream">Discover</strong> and pick a plugin.
  </>,
  <>
    Press <strong className="font-semibold text-cream">Install</strong> and confirm. The plugin shows up on your bar.
  </>,
];

function PluginEntry({ plugin }: { plugin: Plugin }) {
  return (
    <article
      id={plugin.slug}
      aria-labelledby={`${plugin.slug}-title`}
      className="grid scroll-mt-24 gap-10 border-t border-line py-16 first:border-t-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:py-20"
    >
      <div>
        <div className="flex size-12 items-center justify-center rounded-xl bg-ink-3 ring-1 ring-line">
          <Icon name={plugin.icon} className="size-7 text-accent" />
        </div>
        <h2 id={`${plugin.slug}-title`} className="mt-5 text-[1.75rem] sm:text-[2rem]">
          {plugin.name}
        </h2>
        <p className="mt-1 font-mono text-xs tracking-wide text-muted uppercase">{plugin.categories.join(' · ')}</p>
        <p className="mt-5 text-lg text-fg">{plugin.lead}</p>
        <ul className="mt-5 space-y-2.5">
          {plugin.points.map((point) => (
            <li key={point} className="flex gap-3 text-fg">
              <Icon name="check" className="mt-1 size-5 shrink-0 text-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <a href={plugin.repoUrl} className="inline-flex items-center gap-2 font-semibold text-cream hover:underline">
            <BrandIcon name="github" className="size-4" />
            Source on GitHub
            <span className="sr-only">: {plugin.name}</span>
          </a>
          <span>{plugin.license ? `${plugin.license} license` : 'License: see the repository'}</span>
        </p>
      </div>

      <div>
        {plugin.shot ? (
          <Screen>
            <div className="flex h-full max-h-[34rem] justify-center px-6 pt-8 pb-6 sm:px-10">
              <Picture
                image={plugin.shot}
                alt={plugin.shotAlt!}
                sizes="(min-width: 64rem) 36rem, calc(100vw - 2rem)"
                className="h-auto max-h-[30rem] w-auto max-w-full object-contain"
              />
            </div>
          </Screen>
        ) : (
          <Screen className="flex aspect-[4/3] items-center justify-center">
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex size-20 items-center justify-center rounded-2xl bg-ink-2 ring-1 ring-line">
                <Icon name={plugin.icon} className="size-10 text-cream" />
              </div>
              <p className="max-w-56 text-sm text-muted">{plugin.name} works from a single button on your bar.</p>
            </div>
          </Screen>
        )}
      </div>
    </article>
  );
}

export default function Plugins() {
  return (
    <Layout current="/plugins/">
      <PageHeader eyebrow="Plugins" title="13 official plugins. Install only what you need.">
        <p>
          Notes come with KoBar. Everything else is a plugin, so your bar holds only the tools you use. All official
          plugins are free and their source code is on GitHub.
        </p>
      </PageHeader>

      <section aria-labelledby="install-title" className="border-b border-line bg-ink-2">
        <Container className="grid gap-8 py-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start lg:gap-16">
          <h2 id="install-title" className="text-2xl">
            How to install a plugin
          </h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={i} className="rounded-xl bg-ink p-5 ring-1 ring-line">
                <span className="font-mono text-sm text-accent">{i + 1}</span>
                <p className="mt-2 text-[0.9375rem] text-fg">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container>
        <nav aria-label="Plugins on this page" className="py-12">
          <ul className="flex flex-wrap gap-2.5">
            {plugins.map((p) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-ink-2 px-4 py-2 text-[0.9375rem] text-cream ring-1 ring-line transition-colors duration-150 hover:bg-ink-3 hover:ring-line-strong"
                >
                  <Icon name={p.icon} className="size-5 text-muted" />
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line">
          {plugins.map((p) => (
            <PluginEntry key={p.slug} plugin={p} />
          ))}
        </div>
      </Container>

      <section id="safety" aria-labelledby="safety-title" className="border-t border-line bg-ink-2 py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Safety</Eyebrow>
            <h2 id="safety-title" className="mt-3 text-[2rem] sm:text-[2.5rem]">
              KoBar asks before it installs
            </h2>
            <p className="mt-5 text-lg text-fg">
              Plugins are code that runs inside KoBar with full access to the app. They are not sandboxed, so install
              only plugins you trust.
            </p>
          </div>
          <ul className="space-y-5 text-fg">
            {[
              'Installing, updating and removing a plugin always asks for your confirmation.',
              'A plugin installed from a file or a GitHub link outside the official registry is marked as unverified before you confirm.',
              'Replacing an installed plugin with a ZIP asks a second time, and installing an older version is refused.',
              'A plugin that needs a newer KoBar is refused before anything is written.',
            ].map((text) => (
              <li key={text} className="flex gap-3">
                <Icon name="verified_user" className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="build" aria-labelledby="build-title" className="glow py-20 lg:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>For developers</Eyebrow>
            <h2 id="build-title" className="mt-3 text-[2rem] sm:text-[2.5rem]">
              Build your own plugin
            </h2>
            <p className="mt-5 text-lg text-fg">
              Plugins are plain JavaScript. KoBar gives them React, the app’s state, a bridge to the main process and a
              way to add buttons, panels and settings.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <ArrowLink href={links.pluginGuide} external>
                Read the plugin developer guide
              </ArrowLink>
              <ArrowLink href={links.registry} external>
                Open the plugin registry
              </ArrowLink>
            </div>
          </div>
          <div>
            <h3 className="font-sans text-base font-semibold tracking-normal text-cream">List your plugin in Discover</h3>
            <ol className="mt-4 space-y-4 text-fg">
              {[
                <>
                  Add a <code className="font-mono text-[0.9375rem] text-cream">manifest.json</code> to the root of your
                  repository.
                </>,
                <>
                  Publish a GitHub Release with the plugin’s <code className="font-mono text-[0.9375rem] text-cream">.zip</code>.
                </>,
                <>
                  Open a pull request that adds <code className="font-mono text-[0.9375rem] text-cream">Username/RepositoryName</code>{' '}
                  to <code className="font-mono text-[0.9375rem] text-cream">plugins.json</code> in the registry.
                </>,
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink-3 font-mono text-sm text-accent ring-1 ring-line">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">
              Being listed in the registry is not a security review.
            </p>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
