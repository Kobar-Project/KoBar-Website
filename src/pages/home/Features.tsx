import type { ReactNode } from 'react';
import { Icon } from '../../components/Icon';
import KoBarHead from '../../components/KoBarHead';
import Picture from '../../components/Picture';
import Screen from '../../components/Screen';
import { Container, cx, Eyebrow } from '../../components/ui';
import type { SymbolName } from '../../data/icons';

// Every statement here is backed by KoBar/remaster/store/listing-facts.md or the 1.4.x CHANGELOG.

function Row({
  id,
  eyebrow,
  title,
  children,
  media,
  flip = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  media: ReactNode;
  flip?: boolean;
}) {
  return (
    <article id={id} aria-labelledby={`${id}-title`} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={cx(flip && 'lg:order-2')}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 id={`${id}-title`} className="mt-3 text-[1.75rem] sm:text-[2rem]">
          {title}
        </h3>
        <div className="mt-4 space-y-4 text-fg">{children}</div>
      </div>
      <div className={cx(flip && 'lg:order-1')}>{media}</div>
    </article>
  );
}

function Facts({ items }: { items: { icon: SymbolName; text: ReactNode }[] }) {
  return (
    <ul className="space-y-3 pt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <Icon name={item.icon} className="mt-0.5 size-5 shrink-0 text-accent" />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="rounded border border-line-strong bg-ink-3 px-1.5 py-0.5 font-mono text-[0.8125rem] text-cream">{children}</kbd>
);

const noteTiles: { icon: SymbolName; title: string; text: ReactNode }[] = [
  { icon: 'folder_open', title: 'Import .txt and .md', text: 'Pick files or drop them on the panel. Each file becomes a note.' },
  {
    icon: 'download',
    title: 'Save as .txt',
    text: (
      <>
        Press <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> to save the open note as a text file.
      </>
    ),
  },
  {
    icon: 'arrow_outward',
    title: 'Open with KoBar',
    text: 'Open a .txt file from Explorer as a new note. The original file is never changed.',
  },
  { icon: 'sticky_note_2', title: 'Rich text', text: 'Bold, italic, underline, bulleted and numbered lists, and images.' },
];

const extras: { icon: SymbolName; title: string; text: string }[] = [
  {
    icon: 'settings_backup_restore',
    title: 'Backup and restore',
    text: 'Export notes, settings, workspaces and plugin data to one file. KoBar backs up on its own before a restore.',
  },
  {
    icon: 'translate',
    title: '10 languages',
    text: 'English, Turkish, German, Spanish, French, Japanese, Russian, Arabic, Hindi and Chinese.',
  },
  {
    icon: 'keyboard',
    title: 'Keyboard friendly',
    text: 'Move through the bar and its menus with the keyboard. Focus is always visible.',
  },
  {
    icon: 'desktop_windows',
    title: 'Multiple displays',
    text: 'The bar follows the active display and fits itself again when your screens change.',
  },
];

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>The bar</Eyebrow>
          <h2 id="features-title" className="mt-3 text-[2.25rem] sm:text-[2.75rem]">
            A sidebar that stays out of your way
          </h2>
          <p className="mt-5 text-lg text-fg">
            KoBar is a slim bar on the edge of your screen. Open a note or a plugin with one click, then get back to
            work.
          </p>
        </div>

        <div className="mt-20 space-y-24 lg:mt-24 lg:space-y-32">
          <Row
            id="edges"
            eyebrow="Placement"
            title="Docks to any edge"
            media={
              <Screen className="aspect-[16/10]">
                <div className="absolute inset-x-0 top-0 flex justify-center px-6">
                  <Picture
                    image="ui/bar-horizontal"
                    alt="The KoBar bar laid out horizontally along the top edge of the screen."
                    sizes="(min-width: 64rem) 29rem, 80vw"
                    className="h-auto w-[88%]"
                  />
                </div>
                <div className="absolute top-[56%] right-0 h-[76%] -translate-y-1/2">
                  <Picture
                    image="ui/bar-vertical"
                    alt="The KoBar bar standing vertically on the right edge of the screen."
                    sizes="(min-width: 64rem) 4rem, 12vw"
                    className="h-full w-auto"
                  />
                </div>
              </Screen>
            }
          >
            <p>
              Put the bar on the left, right, top or bottom of your screen, standing up or lying flat. It stays above
              your other windows, so your tools are always one click away.
            </p>
            <Facts
              items={[
                { icon: 'layers', text: 'Always on top, without covering your work.' },
                { icon: 'tune', text: 'Three sizes: compact, normal and comfortable.' },
                { icon: 'dock_to_right', text: 'Drag the bar by its header. Click the header for the bar menu.' },
              ]}
            />
          </Row>

          <Row
            id="mini-mode"
            eyebrow="Mini mode"
            title="A cat that follows your cursor"
            flip
            media={
              <Screen className="aspect-[4/3]">
                <div className="flex h-full flex-col items-center justify-center gap-6">
                  <div className="flex size-36 items-center justify-center rounded-full border-[5px] border-accent bg-ink-2 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)] sm:size-44">
                    <KoBarHead
                      track
                      blink
                      reach={420}
                      color="#F4F1EA"
                      className="size-24 sm:size-28"
                      label="The KoBar mini mode head"
                    />
                  </div>
                  <p className="px-6 text-center text-sm text-muted">
                    <span className="hidden motion-safe:pointer-fine:inline">Move your pointer. It is watching.</span>
                    <span className="hidden motion-safe:pointer-coarse:inline">Tap the head to make it blink.</span>
                    <span className="hidden motion-reduce:inline">The head stays still because your system asks for reduced motion.</span>
                  </p>
                </div>
              </Screen>
            }
          >
            <p>
              Need the whole screen? Mini mode shrinks KoBar to a small head that floats out of the way. Drag it
              anywhere, and click it to bring the bar back.
            </p>
            <Facts
              items={[
                { icon: 'visibility', text: 'Its eyes can follow your cursor. Turn it off if you prefer a calm head.' },
                { icon: 'notifications', text: 'It blinks once when a notification arrives.' },
                { icon: 'check', text: 'Nothing moves while it is idle, hidden or set to reduced motion.' },
              ]}
            />
          </Row>

          <Row
            id="notes"
            eyebrow="Notes"
            title="Notes, built in"
            media={
              <ul className="grid gap-3 sm:grid-cols-2">
                {noteTiles.map((tile) => (
                  <li key={tile.title} className="rounded-xl bg-ink-2 p-5 ring-1 ring-line">
                    <Icon name={tile.icon} className="size-6 text-accent" />
                    <h4 className="mt-3 font-semibold text-cream">{tile.title}</h4>
                    <p className="mt-1.5 text-[0.9375rem] text-muted">{tile.text}</p>
                  </li>
                ))}
              </ul>
            }
          >
            <p>
              Notes come with KoBar, no plugin needed. A note list sits on the left, a rich-text editor on the right, and
              everything is kept on your PC.
            </p>
            <p>Drag the divider to give the list more room. KoBar remembers the width.</p>
          </Row>

          <Row
            id="workspaces"
            eyebrow="Workspaces"
            title="One bar, many setups"
            flip
            media={
              <Screen>
                {/* Zoomed on the right part of the shot, where the bar and its Workspaces menu are. */}
                <div className="flex justify-end overflow-hidden pt-8 pb-6">
                  <Picture
                    image="ui/notes-workspaces"
                    alt="The bar menu open on the Workspaces list, with Default, Work and Personal, next to the note panel."
                    sizes="(min-width: 64rem) 56rem, 165vw"
                    className="h-auto w-[165%] max-w-none shrink-0"
                  />
                </div>
              </Screen>
            }
          >
            <p>
              Save a layout with its theme, sizes and plugins as a workspace, and switch between workspaces from the bar
              menu. A workspace can also keep its own notes and plugin data.
            </p>
          </Row>

          <Row
            id="customize"
            eyebrow="Appearance"
            title="Make it yours"
            media={
              <Picture
                image="ui/settings-appearance"
                alt="The Appearance page of KoBar's Settings window, with color scheme, accent color and transparency options."
                sizes="(min-width: 64rem) 34rem, calc(100vw - 2rem)"
                className="h-auto w-full rounded-xl ring-1 ring-line"
              />
            }
          >
            <p>
              Choose a light, dark or system color scheme, one of eight accent colors or your own, and a solid or
              translucent bar. Everything lives in a separate Settings window.
            </p>
          </Row>
        </div>

        <ul className="mt-24 grid gap-x-8 gap-y-10 border-t border-line pt-14 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
          {extras.map((item) => (
            <li key={item.title}>
              <Icon name={item.icon} className="size-6 text-accent" />
              <h3 className="mt-3 font-sans text-base font-semibold tracking-normal text-cream">{item.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
