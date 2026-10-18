import { Icon } from '../../components/Icon';
import Picture from '../../components/Picture';
import { ArrowLink, Container, Eyebrow } from '../../components/ui';
import { plugins } from '../../data/plugins';

const FEATURED = ['ai-hub', 'clipboard-manager', 'screenshot-studio'];

export default function PluginShowcase() {
  const featured = FEATURED.map((slug) => plugins.find((p) => p.slug === slug)!);

  return (
    <section id="plugins" aria-labelledby="plugins-title" className="glow-left border-y border-line bg-ink-2 py-24 lg:py-32">
      {/* Kept for links to the old site's "workflow" section. */}
      <span id="workflow" aria-hidden="true" />
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Plugins</Eyebrow>
          <h2 id="plugins-title" className="mt-3 text-[2.25rem] sm:text-[2.75rem]">
            Install only what you need
          </h2>
          <p className="mt-5 text-lg text-fg">
            Everything beyond notes is a plugin. Pick from 13 official ones in Settings, one click each. KoBar asks
            before every install.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug} className="flex flex-col overflow-hidden rounded-2xl bg-ink ring-1 ring-line">
              <div className="relative flex h-72 items-end justify-center overflow-hidden bg-[#131316] px-6 pt-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_100%,rgb(22_45_92/0.6),transparent_75%)]"
                />
                <Picture
                  image={p.shot!}
                  alt={p.shotAlt!}
                  sizes="(min-width: 64rem) 22rem, 90vw"
                  className="relative h-full w-full object-contain object-bottom"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-center gap-2.5 text-xl">
                  <Icon name={p.icon} className="size-6 text-accent" />
                  {p.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] text-muted">{p.lead}</p>
                <ArrowLink href={`/plugins/#${p.slug}`} className="mt-5 text-[0.9375rem]">
                  More about {p.name}
                </ArrowLink>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-16 font-sans text-base font-semibold tracking-normal text-cream">All official plugins</h3>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {plugins.map((p) => (
            <li key={p.slug}>
              <a
                href={`/plugins/#${p.slug}`}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-ink px-4 py-2 text-[0.9375rem] text-cream ring-1 ring-line transition-colors duration-150 hover:bg-ink-3 hover:ring-line-strong"
              >
                <Icon name={p.icon} className="size-5 text-muted" />
                {p.name}
              </a>
            </li>
          ))}
        </ul>
        <ArrowLink href="/plugins/" className="mt-10">
          See what each plugin does
        </ArrowLink>
      </Container>
    </section>
  );
}
