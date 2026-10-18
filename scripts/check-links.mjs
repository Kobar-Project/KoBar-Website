// Broken link check over the built site: every href/src/srcset in dist/**/*.html.
// Internal links must resolve to a file in dist (and #anchors to an id on the target page); external links are
// requested once each.
//
//   npm run build && node scripts/check-links.mjs [--offline]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(import.meta.dirname, '..', 'dist');
const offline = process.argv.includes('--offline');

const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith('.html')) htmlFiles.push(full);
  }
})(dist);

const pageUrl = (file) => '/' + path.relative(dist, file).split(path.sep).join('/').replace(/index\.html$/, '');
const ids = new Map(htmlFiles.map((f) => [pageUrl(f), new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

function resolveInternal(url) {
  const clean = url.split('#')[0].split('?')[0];
  const file = path.join(dist, decodeURIComponent(clean));
  if (existsSync(file) && statSync(file).isFile()) return clean;
  if (existsSync(path.join(file, 'index.html'))) return clean.endsWith('/') ? clean : clean + '/';
  return null;
}

const problems = [];
const external = new Map();
let internalCount = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const from = pageUrl(file);
  const urls = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
  ].map((u) => u.replace(/&amp;/g, '&'));

  for (let url of urls) {
    if (/^(mailto|ms-windows-store|tel):/.test(url)) continue;
    // Links to our own domain (canonical, og:url) must exist in this build, not on the live site.
    if (url.startsWith('https://kobar.org/')) url = url.slice('https://kobar.org'.length);
    if (/^https?:\/\//.test(url)) {
      if (!external.has(url)) external.set(url, new Set());
      external.get(url).add(from);
      continue;
    }
    internalCount++;
    const target = url.startsWith('#') ? from : resolveInternal(url);
    if (!target) {
      problems.push(`${from}: missing ${url}`);
      continue;
    }
    const hash = url.includes('#') ? url.slice(url.indexOf('#') + 1) : '';
    if (hash && !ids.get(target)?.has(hash)) problems.push(`${from}: no #${hash} on ${target}`);
  }
}

console.log(`${htmlFiles.length} pages, ${internalCount} internal links, ${external.size} external URLs`);

if (!offline) {
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';
  // Sites that refuse scripted requests; a 403/429 from them is not a broken link.
  const BOT_WALLED = /(reddit\.com|x\.com|patreon\.com|apps\.microsoft\.com)/;
  const check = async (url) => {
    for (const method of ['HEAD', 'GET']) {
      try {
        const res = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(15000) });
        if (res.ok) return { status: res.status };
        if (method === 'GET') return { status: res.status };
      } catch (e) {
        if (method === 'GET') return { status: 0, error: e.cause?.code ?? e.name };
      }
    }
  };
  const list = [...external.keys()];
  const results = await Promise.all(list.map(async (url) => [url, await check(url)]));
  for (const [url, r] of results) {
    const ok = r.status >= 200 && r.status < 400;
    const walled = !ok && BOT_WALLED.test(url) && [401, 403, 429].includes(r.status);
    const mark = ok ? 'ok ' : walled ? 'bot' : 'BAD';
    console.log(`${mark} ${String(r.status).padStart(3)} ${url}${r.error ? ` (${r.error})` : ''}`);
    if (!ok && !walled) problems.push(`external ${r.status} ${url} (on ${[...external.get(url)].join(', ')})`);
  }
}

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log('  ' + p);
  process.exitCode = 1;
} else {
  console.log('\nNo broken links.');
}
