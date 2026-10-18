import KoBarHead from '../components/KoBarHead';
import Layout from '../components/Layout';
import { ArrowLink, ButtonLink, Container } from '../components/ui';

export default function NotFound() {
  return (
    <Layout>
      <section aria-labelledby="nf-title" className="glow">
        <Container className="flex flex-col items-start gap-8 py-24 sm:py-32">
          <div className="flex size-24 items-center justify-center rounded-full border-4 border-accent bg-ink-2">
            <KoBarHead blink color="#F4F1EA" className="size-16" />
          </div>
          <div>
            <p className="font-mono text-sm text-muted">404</p>
            <h1 id="nf-title" className="mt-2 text-[2.5rem] sm:text-[3.25rem]">
              Page not found
            </h1>
            <p className="mt-4 max-w-xl text-lg text-fg">This page does not exist, or it has moved.</p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/">Go to the home page</ButtonLink>
            <ArrowLink href="/plugins/">Browse the plugins</ArrowLink>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
