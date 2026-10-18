# KoBar Website

# [KoBar.org](https://kobar.org/)

The website of the [KoBar Project](https://github.com/Kobar-Project/KoBar): a free, open-source sidebar for Windows.

## Technologies

- **React 19** and **TypeScript**, rendered to static HTML at build time
- **Vite** (multi-page build with a small prerender plugin in `vite.config.ts`)
- **Tailwind CSS v4**

## Setup

```bash
npm install
npm run dev      # http://localhost:3000, pages are server-rendered like in production
npm run build    # writes dist/: one prerendered HTML file per page, bundles in dist/static/
npm run preview  # serves dist/ on http://localhost:4173
npm run lint     # type check
```

## Pages

| URL | Source |
| --- | --- |
| `/` | `src/pages/Home.tsx` and `src/pages/home/*` |
| `/plugins/` | `src/pages/Plugins.tsx` |
| `/privacy/` | `src/pages/Privacy.tsx` |
| `/license/` | `src/pages/License.tsx` |
| `/404.html` | `src/pages/NotFound.tsx` |

Each page has an HTML template (`index.html`, `plugins/index.html`, ...) and a client entry in `src/entries/`.
Page titles and descriptions live in `src/site.ts`, together with every outside link.

## Content sources

- Plugin names, descriptions, icons and repositories: `src/data/plugins.json`, generated from the official plugin
  manifests with `node scripts/sync-plugins.mjs "<KoBar Plugins folder>"`. The site copy for each plugin is in
  `src/data/plugins.ts`.
- Screenshots: `scripts/images.py` turns the dark UI captures from the KoBar repository into AVIF/WebP in `public/img/`
  and describes them in `src/data/images.json`.
- Icons: `scripts/gen-icons.mjs` writes the Material Symbols and brand icon paths to `src/data/icons.ts`.
- The latest version number is read from the GitHub API in the browser; it is never written by hand.

Only claims checked against the KoBar code belong on the site. The privacy policy in particular lists what the app
and its plugins send; re-check the code before changing it.

## Checks

```bash
npm run build
node scripts/serve-dist.mjs 4174          # compressed static server for audits
node scripts/check-a11y.mjs http://localhost:4174
node scripts/check-links.mjs
node scripts/shots.mjs http://localhost:4174
```
