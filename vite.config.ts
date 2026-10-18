import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer, defineConfig, type Plugin, type ViteDevServer } from 'vite';

// Every page is an HTML entry. At build time each one is rendered to static HTML (see prerender below), so the site
// is readable without JavaScript and Vercel can serve it as plain files with no rewrites.
const PAGES = {
  'index.html': 'home',
  'plugins/index.html': 'plugins',
  'privacy/index.html': 'privacy',
  'license/index.html': 'license',
  '404.html': 'notFound',
} as const;

type PageId = (typeof PAGES)[keyof typeof PAGES];
type Rendered = { head: string; body: string };
type RenderModule = { renderPage: (page: PageId) => Rendered };

const RENDER_ENTRY = '/src/render.tsx';

function inject(html: string, { head, body }: Rendered): string {
  return html.replace('<!--app-head-->', head).replace('<!--app-html-->', body);
}

function pageFor(root: string, file: string): PageId {
  const rel = path.relative(root, file).split(path.sep).join('/') as keyof typeof PAGES;
  const page = PAGES[rel];
  if (!page) throw new Error(`No page registered for ${rel}`);
  return page;
}

/** Dev server: render each page with SSR on request, so dev and production HTML are the same. */
function prerenderDev(): Plugin {
  let root = '';
  return {
    name: 'kobar-prerender-dev',
    apply: 'serve',
    configResolved(config) {
      root = config.root;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const server = ctx.server as ViteDevServer;
        const mod = (await server.ssrLoadModule(RENDER_ENTRY)) as RenderModule;
        return inject(html, mod.renderPage(pageFor(root, ctx.filename)));
      },
    },
  };
}

/** Build: after the client bundle is written, render every page into its HTML file. */
function prerenderBuild(): Plugin {
  let root = '';
  let outDir = '';
  return {
    name: 'kobar-prerender-build',
    apply: 'build',
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const server = await createServer({
        root,
        configFile: false,
        appType: 'custom',
        logLevel: 'error',
        plugins: [react()],
        server: { middlewareMode: true, hmr: false, ws: false },
      });
      try {
        const mod = (await server.ssrLoadModule(RENDER_ENTRY)) as RenderModule;
        for (const [file, page] of Object.entries(PAGES)) {
          const target = path.join(outDir, file);
          const html = await readFile(target, 'utf8');
          await writeFile(target, inject(html, mod.renderPage(page)));
        }
      } finally {
        await server.close();
      }
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), tailwindcss(), prerenderDev(), prerenderBuild()],
  build: {
    // Not "assets": public/Assets (the old site's image paths, kept for existing links) would share that folder on
    // case-insensitive file systems.
    assetsDir: 'static',
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(PAGES).map(([file, page]) => [page, path.resolve(__dirname, file)]),
      ),
    },
  },
});
