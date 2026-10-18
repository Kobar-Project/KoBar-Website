import { useEffect, useState } from 'react';
import { links } from '../site';

// The latest KoBar release, read from the GitHub API once the page is idle (the version is never written by hand).
// Cached for an hour per tab; on any failure nothing is shown. The space is reserved, so nothing shifts when it appears.

type Release = { tag: string; url: string; at: number };

const KEY = 'kobar:latest-release';
const TTL = 60 * 60 * 1000;
const TAG = /^v?\d+\.\d+\.\d+$/;
const RELEASE_URL = 'https://github.com/Kobar-Project/KoBar/releases/';

function readCache(): Release | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(KEY) ?? 'null') as Release | null;
    return value && Date.now() - value.at < TTL ? value : null;
  } catch {
    return null;
  }
}

export default function LatestVersion({ className }: { className?: string }) {
  const [release, setRelease] = useState<Release | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setRelease(cached);
      return;
    }
    const controller = new AbortController();
    const load = () => {
      fetch(links.releasesApi, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { tag_name?: unknown; html_url?: unknown } | null) => {
          const tag = typeof data?.tag_name === 'string' ? data.tag_name : '';
          const url = typeof data?.html_url === 'string' ? data.html_url : '';
          if (!TAG.test(tag) || !url.startsWith(RELEASE_URL)) return;
          const value = { tag, url, at: Date.now() };
          setRelease(value);
          try {
            sessionStorage.setItem(KEY, JSON.stringify(value));
          } catch {
            // storage can be unavailable (private mode); the version still shows
          }
        })
        .catch(() => {});
    };
    const idle = window.requestIdleCallback?.(load, { timeout: 4000 });
    const timer = idle === undefined ? window.setTimeout(load, 1500) : 0;
    return () => {
      controller.abort();
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <span className={className}>
      {release && (
        <a href={release.url} className="link">
          Latest release {release.tag.startsWith('v') ? release.tag : `v${release.tag}`}
        </a>
      )}
    </span>
  );
}
