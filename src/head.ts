// The <head> of every page, rendered at build time (see vite.config.ts).
import { srcSet } from './components/Picture';
import { heroImage, links, pages, SITE_URL, type PageId } from './site';

const OG_IMAGE = `${SITE_URL}/og-image.png`;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Images the page shows above the fold; preloaded so they are not discovered late. */
const PRELOAD_IMAGES: Partial<Record<PageId, { key: string; sizes: string }>> = {
  home: heroImage,
};

function jsonLd(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'KoBar',
    description: pages.home.description,
    url: SITE_URL,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Windows 10, Windows 11',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    license: 'https://opensource.org/license/mit',
    downloadUrl: links.storeWeb,
    image: OG_IMAGE,
    sameAs: [links.repo, links.x, links.youtube, links.reddit],
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export function renderHead(page: PageId): string {
  const meta = pages[page];
  const url = SITE_URL + meta.path;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    page === 'notFound' ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    '<meta name="theme-color" content="#18181B" />',
    '<meta name="color-scheme" content="dark" />',
    '<link rel="icon" href="/favicon.ico" sizes="48x48" />',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    '<link rel="preload" href="/fonts/outfit-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="KoBar" />',
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="The KoBar logo: a cream cat head next to the word KoBar on a dark background." />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:site" content="@kobarproject" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  const preload = PRELOAD_IMAGES[page];
  if (preload) {
    tags.push(
      `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcSet(preload.key, 'avif')}" imagesizes="${preload.sizes}" fetchpriority="high" />`,
    );
  }
  if (page === 'home') tags.push(jsonLd());
  return tags.join('\n    ');
}
