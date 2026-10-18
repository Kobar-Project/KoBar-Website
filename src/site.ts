// Every outside link and every page's metadata lives here, so a changed URL is fixed in one place.

export const SITE_URL = 'https://kobar.org';

export const links = {
  storeWeb: 'https://apps.microsoft.com/detail/9P2KPFF3G9L9',
  storeApp: 'ms-windows-store://pdp/?productid=9P2KPFF3G9L9',
  releasesLatest: 'https://github.com/Kobar-Project/KoBar/releases/latest',
  releasesApi: 'https://api.github.com/repos/Kobar-Project/KoBar/releases/latest',
  repo: 'https://github.com/Kobar-Project/KoBar',
  security: 'https://github.com/Kobar-Project/KoBar/blob/master/SECURITY.md',
  contributing: 'https://github.com/Kobar-Project/KoBar/blob/master/CONTRIBUTING.md',
  codeOfConduct: 'https://github.com/Kobar-Project/KoBar/blob/master/CODE_OF_CONDUCT.md',
  license: 'https://github.com/Kobar-Project/KoBar/blob/master/LICENSE.md',
  pluginGuide: 'https://github.com/Kobar-Project/KoBar/blob/master/for-agents/kobar-plugin-developer/SKILL.md',
  pluginReadme: 'https://github.com/Kobar-Project/KoBar#plugin-development',
  registry: 'https://github.com/Kobar-Project/kobar-plugins-registry',
  website: 'https://github.com/Kobar-Project/KoBar-Website',
  trailer: 'https://www.youtube.com/watch?v=8xBx2NWgHsE',
  trailerEmbed: 'https://www.youtube-nocookie.com/embed/8xBx2NWgHsE?autoplay=1&rel=0',
  discord: 'https://discord.gg/t93jsgqwax',
  reddit: 'https://www.reddit.com/r/kobarproject/',
  x: 'https://x.com/kobarproject',
  youtube: 'https://www.youtube.com/@KobarProject',
  patreon: 'https://patreon.com/kobarproject',
  openCollective: 'https://opencollective.com/kobar',
  email: 'mailto:hello@kobar.org',
  author: 'https://github.com/eedali',
} as const;

export const CONTACT_EMAIL = 'hello@kobar.org';

export type PageId = 'home' | 'plugins' | 'privacy' | 'license' | 'notFound';

export const pages: Record<PageId, { path: string; title: string; description: string }> = {
  home: {
    path: '/',
    title: 'KoBar: your tools, one click away',
    description:
      'KoBar is a free, open-source sidebar for Windows. It docks to the edge of your screen, keeps your notes close and adds only the plugins you choose.',
  },
  plugins: {
    path: '/plugins/',
    title: 'Plugins | KoBar',
    description:
      'The 13 official KoBar plugins: AI Hub, Clipboard Manager, Screenshot Studio, Color Picker, Snippet Vault, KoBox and more. Install only what you need.',
  },
  privacy: {
    path: '/privacy/',
    title: 'Privacy policy | KoBar',
    description:
      'KoBar has no account, no telemetry and no server of its own. This page lists what is stored on your PC and every outside service the app and plugins can contact.',
  },
  license: {
    path: '/license/',
    title: 'License and open source | KoBar',
    description: 'KoBar is open source under the MIT license. Find the source code of the app, its official plugins and this website.',
  },
  notFound: {
    path: '/404.html',
    title: 'Page not found | KoBar',
    description: 'This page does not exist. Go back to the KoBar home page or browse the plugins.',
  },
};

/** Primary navigation (header). */
export const nav = [
  { label: 'Features', href: '/#features' },
  { label: 'Plugins', href: '/plugins/' },
  { label: 'Privacy', href: '/privacy/' },
] as const;

/** The hero screenshot. Shared with head.ts, whose preload must use the same `sizes` as the <img>. */
export const heroImage = { key: 'ui/note-panel', sizes: '(min-width: 64rem) calc(50vw - 3rem), calc(100vw - 2.5rem)' } as const;
