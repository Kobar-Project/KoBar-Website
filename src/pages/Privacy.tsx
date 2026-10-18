import type { ReactNode } from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { Container } from '../components/ui';
import { CONTACT_EMAIL, links } from '../site';

// Every statement on this page was checked against the code of KoBar 1.4.3 and the 13 official plugins on 2026-10-18
// (redesign/PLAN.md §5a lists the files and lines). Re-check the code before changing a claim.

const UPDATED = '18 October 2026';

type Service = { name: string; when: string; sent: string };

const services: Service[] = [
  {
    name: 'GitHub (github.com, api.github.com, raw.githubusercontent.com)',
    when: 'When you open Settings › Plugins › Discover, install or update a plugin, or pick a starter pack on first run.',
    sent: 'Your IP address and standard request headers, and the name of the plugin repository.',
  },
  {
    name: 'GitHub Releases',
    when: 'Only the version installed from GitHub: when KoBar starts, it checks for a newer version.',
    sent: 'Your IP address and standard request headers. Nothing is downloaded until you agree.',
  },
  {
    name: 'OpenAI, Google Gemini or Anthropic',
    when: 'When you send a message in AI Hub with one of these providers.',
    sent: 'Your messages, the chat history and any attached images, with your API key for that provider.',
  },
  {
    name: 'ipapi.co',
    when: 'Calculator: the first time you open it in a session.',
    sent: 'Your IP address, used to guess your local currency.',
  },
  {
    name: 'open.er-api.com',
    when: 'Calculator: when you use the currency converter. Rates are kept for 12 hours.',
    sent: 'Your IP address and standard request headers.',
  },
  {
    name: 'Google favicon service (t3.gstatic.com)',
    when: 'Shortcuts: when a shortcut points to a web address.',
    sent: 'That web address, to fetch its icon.',
  },
  {
    name: 'YouTube (youtube.com, i.ytimg.com)',
    when: 'koPlayer: when it lists YouTube videos open in your browser, and when you play one in a picture-in-picture window.',
    sent: 'The video’s address. The YouTube player can set its own cookies inside that window.',
  },
  {
    name: 'jsDelivr (cdn.jsdelivr.net)',
    when: 'Notes: when you open the emoji picker.',
    sent: 'Your IP address and which emoji images are loaded.',
  },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line py-12 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="text-[1.625rem] sm:text-[1.875rem]">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-fg [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-5 [&_ul]:marker:text-muted">
        {children}
      </div>
    </section>
  );
}

const toc = [
  ['summary', 'In short'],
  ['app', 'The KoBar app'],
  ['services', 'When KoBar goes online'],
  ['plugins', 'Plugins'],
  ['website', 'This website'],
  ['choices', 'Your choices'],
  ['changes', 'Changes and contact'],
] as const;

export default function Privacy() {
  return (
    <Layout current="/privacy/">
      <PageHeader eyebrow="Privacy policy" title="What KoBar keeps, and what it sends">
        <p>
          This policy covers the KoBar app, its 13 official plugins and this website. Last updated on{' '}
          <time dateTime="2026-10-18">{UPDATED}</time>.
        </p>
      </PageHeader>

      <Container className="grid gap-12 py-16 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16 lg:py-20">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-xs tracking-wide text-muted uppercase">On this page</p>
          <ul className="mt-3 space-y-1 text-[0.9375rem]">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-block py-1 text-muted hover:text-cream">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl">
          <Section id="summary" title="In short">
            <ul>
              <li>KoBar has no account, collects no usage data and sends no crash reports.</li>
              <li>There is no KoBar server. Nothing you do in the app is sent to the KoBar project.</li>
              <li>Your notes, settings, workspaces and plugin data are stored on your PC.</li>
              <li>
                Some features contact outside services when you use them, for example AI Hub with the AI provider you pick.
                Every one is listed <a href="#services" className="link">below</a>.
              </li>
            </ul>
          </Section>

          <Section id="app" title="The KoBar app">
            <p>KoBar stores its data in its own folder in your Windows user profile. That includes:</p>
            <ul>
              <li>your notes, settings, workspaces and the data of your plugins;</li>
              <li>
                AI Hub chats and your AI Hub API keys. KoBar does not encrypt these keys itself, so they are only as safe
                as your Windows account. A key is sent only to the provider it belongs to;
              </li>
              <li>files you drop into KoBox. They are moved there, and later go to the Recycle Bin;</li>
              <li>automatic backups KoBar makes before a data upgrade, a restore or deleting a workspace.</li>
            </ul>
            <p>
              <strong className="font-semibold text-cream">Clipboard.</strong> Clipboard Manager reads your clipboard only
              while its copy mode is on. Content that a password manager marks as private is skipped. Clipboard content is
              never sent anywhere.
            </p>
            <p>
              <strong className="font-semibold text-cream">Screenshots</strong> are saved only where you choose, or copied
              to your clipboard.
            </p>
            <p>
              <strong className="font-semibold text-cream">Microphone and camera.</strong> KoBar has no voice or camera
              features and denies these permissions.
            </p>
            <p>
              <strong className="font-semibold text-cream">Snippet Vault passwords</strong> hide a snippet’s content inside
              the app, but the password is stored next to the snippet on your PC. Do not rely on it to protect secrets.
            </p>
            <p>
              <strong className="font-semibold text-cream">Media.</strong> While koPlayer is on, KoBar reads what is
              playing through the Windows media controls (title, artist, cover art). When a browser is playing, it also
              looks for YouTube links in your open browser windows so it can offer picture-in-picture. This happens on
              your PC.
            </p>
            <p>
              <strong className="font-semibold text-cream">Updates.</strong> The Microsoft Store version is updated by the
              Store, under Microsoft’s privacy statement. The version from GitHub checks GitHub Releases for updates.
            </p>
          </Section>

          <Section id="services" title="When KoBar goes online">
            <p>
              These are all the outside services the app and its official plugins can contact. Each one receives your IP
              address, like any website you visit, and is governed by its own privacy policy. A local AI model in AI Hub
              (Ollama or LM Studio) is reached only on your own machine.
            </p>
            <dl className="divide-y divide-line overflow-hidden rounded-xl ring-1 ring-line">
              {services.map((s) => (
                <div key={s.name} className="grid gap-2 bg-ink-2 p-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
                  <dt className="font-semibold text-cream">{s.name}</dt>
                  <dd className="space-y-1.5 text-[0.9375rem]">
                    <p>
                      <span className="text-muted">When: </span>
                      {s.when}
                    </p>
                    <p>
                      <span className="text-muted">What is sent: </span>
                      {s.sent}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
            <p>
              Web links you click in KoBar, such as this website, GitHub or Patreon, open in your browser. KoBar asks
              before it opens other kinds of links, and blocks the ones that could run code on your PC.
            </p>
          </Section>

          <Section id="plugins" title="Plugins">
            <p>
              This policy covers the 13 official plugins. Plugins from other authors run with full access to KoBar and are
              not covered here. KoBar warns you before installing a plugin from outside the official registry; install
              only plugins you trust.
            </p>
          </Section>

          <Section id="website" title="This website">
            <ul>
              <li>
                kobar.org is hosted by Vercel. Like any web host, Vercel processes your IP address and request details to
                deliver the pages.
              </li>
              <li>
                We count page views with Vercel Web Analytics, which does not use cookies.
              </li>
              <li>
                The page asks the GitHub API for the latest KoBar version and keeps the answer in your browser’s session
                storage for an hour. GitHub receives your IP address.
              </li>
              <li>
                The trailer loads from youtube-nocookie.com only when you press play. Until then, YouTube receives
                nothing.
              </li>
              <li>This site sets no cookies and loads its fonts from kobar.org itself.</li>
            </ul>
          </Section>

          <Section id="choices" title="Your choices">
            <ul>
              <li>Remove a plugin, and it stops contacting the services listed for it.</li>
              <li>
                Settings › Backup exports your data into one file. API keys and passwords are left out unless you choose to
                include them; if you do, the file holds them in plain text, so keep it private.
              </li>
              <li>To remove everything KoBar stored on your PC, delete its data folder after uninstalling it.</li>
            </ul>
          </Section>

          <Section id="changes" title="Changes and contact">
            <p>
              When this policy changes, we update this page and the date at the top. The source of KoBar is public, so you
              can check every statement here in the code on{' '}
              <a href={links.repo} className="link">
                GitHub
              </a>
              .
            </p>
            <p>
              Questions? Write to{' '}
              <a href={links.email} className="link">
                {CONTACT_EMAIL}
              </a>
              . To report a security issue, follow the{' '}
              <a href={links.security} className="link">
                security policy
              </a>
              .
            </p>
          </Section>
        </div>
      </Container>
    </Layout>
  );
}
