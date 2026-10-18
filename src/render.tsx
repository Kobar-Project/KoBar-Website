// Server entry used at build time (and by the dev server) to turn each page into static HTML.
import { renderToString } from 'react-dom/server';
import { renderHead } from './head';
import { pageComponents } from './pages';
import type { PageId } from './site';

export function renderPage(page: PageId): { head: string; body: string } {
  const Page = pageComponents[page];
  return { head: renderHead(page), body: renderToString(<Page />) };
}
