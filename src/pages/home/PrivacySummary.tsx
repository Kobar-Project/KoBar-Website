import { Icon } from '../../components/Icon';
import { ArrowLink, Container, Eyebrow } from '../../components/ui';
import type { SymbolName } from '../../data/icons';

// Code-verified (redesign/PLAN.md §5a). Do not claim more than this: AI Hub keys are not encrypted at rest, and some
// plugins contact outside services; the privacy policy lists them.
const points: { icon: SymbolName; title: string; text: string }[] = [
  {
    icon: 'folder_open',
    title: 'Kept on your PC',
    text: 'Notes, clipboard slots, screenshots and settings stay on your computer.',
  },
  {
    icon: 'key',
    title: 'Your AI, your keys',
    text: 'AI Hub sends your chats only to the provider you pick, with your own key. With a local model, nothing leaves your machine.',
  },
  {
    icon: 'verified_user',
    title: 'Plugins ask first',
    text: 'Every plugin install needs your OK. Plugins from outside the official registry are marked as unverified.',
  },
  {
    icon: 'code',
    title: 'Open to inspection',
    text: 'KoBar is open source, so anyone can check what it does.',
  },
];

export default function PrivacySummary() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Eyebrow>Privacy</Eyebrow>
          <h2 id="privacy-title" className="mt-3 text-[2.25rem] sm:text-[2.75rem]">
            No account.
            <br />
            No telemetry.
            <br />
            No KoBar server.
          </h2>
          <p className="mt-5 text-lg text-fg">
            KoBar does not collect usage data, and there is no KoBar server to send anything to.
          </p>
          <ArrowLink href="/privacy/" className="mt-8">
            Read the privacy policy
          </ArrowLink>
          <p className="mt-2 text-sm text-muted">It also lists the outside services some plugins use.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <li key={p.title} className="rounded-xl bg-ink-2 p-6 ring-1 ring-line">
              <Icon name={p.icon} className="size-6 text-accent" />
              <h3 className="mt-4 font-sans text-base font-semibold tracking-normal text-cream">{p.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
