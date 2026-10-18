import EdgeBar, { type EdgeItem } from '../components/EdgeBar';
import Layout from '../components/Layout';
import Trailer from '../components/Trailer';
import { Container, Eyebrow } from '../components/ui';
import Download from './home/Download';
import Features from './home/Features';
import Hero from './home/Hero';
import OpenSource from './home/OpenSource';
import PluginShowcase from './home/PluginShowcase';
import PrivacySummary from './home/PrivacySummary';

const sections: EdgeItem[] = [
  { id: 'trailer', label: 'Trailer', icon: 'play_arrow' },
  { id: 'features', label: 'Features', icon: 'dock_to_right' },
  { id: 'plugins', label: 'Plugins', icon: 'extension' },
  { id: 'privacy', label: 'Privacy', icon: 'shield' },
  { id: 'open-source', label: 'Open source', icon: 'code' },
  { id: 'download', label: 'Download', icon: 'download' },
];

export default function Home() {
  return (
    <Layout>
      <Hero />
      <section id="trailer" aria-labelledby="trailer-title" className="border-y border-line bg-ink-2 py-20 lg:py-24">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Trailer</Eyebrow>
              <h2 id="trailer-title" className="mt-3 text-[1.75rem] sm:text-[2rem]">
                See KoBar in action
              </h2>
            </div>
            <p className="text-sm text-muted">The video loads from YouTube when you press play.</p>
          </div>
          <Trailer />
        </Container>
      </section>
      <Features />
      <PluginShowcase />
      <PrivacySummary />
      <OpenSource />
      <Download />
      <EdgeBar items={sections} heroId="hero" />
    </Layout>
  );
}
