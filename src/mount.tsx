import { inject } from '@vercel/analytics';
import type { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

/** Client entry: take over the prerendered page. */
export function mount(page: ReactNode) {
  const root = document.getElementById('root');
  if (!root) return;
  if (root.hasChildNodes()) hydrateRoot(root, page);
  else createRoot(root).render(page);

  // Vercel Web Analytics (cookieless page views). Only on the deployed site, so local previews make no requests.
  const host = location.hostname;
  if (host === 'kobar.org' || host === 'www.kobar.org' || host.endsWith('.vercel.app')) inject();
}
