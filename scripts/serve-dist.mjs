// Serves dist/ roughly the way the production host does: brotli/gzip compression, index.html for folder URLs,
// 404.html for unknown paths and long caching for hashed bundles. Used for local Lighthouse runs (vite preview does not
// compress HTML).
//
//   node scripts/serve-dist.mjs [port]
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { createBrotliCompress, createGzip } from 'node:zlib';

const root = path.join(import.meta.dirname, '..', 'dist');
const port = Number(process.argv[2] ?? 4174);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.svg', '.xml', '.txt']);

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const file = path.normalize(path.join(root, clean));
  if (!file.startsWith(root)) return null;
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = path.join(file, 'index.html');
  if (existsSync(index)) return index;
  return null;
}

createServer((req, res) => {
  let file = resolve(req.url ?? '/');
  let status = 200;
  if (!file) {
    file = path.join(root, '404.html');
    status = 404;
  }
  const ext = path.extname(file);
  const headers = { 'Content-Type': TYPES[ext] ?? 'application/octet-stream', Vary: 'Accept-Encoding' };
  headers['Cache-Control'] = req.url?.startsWith('/static/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate';
  const accept = String(req.headers['accept-encoding'] ?? '');
  let stream = createReadStream(file);
  if (COMPRESSIBLE.has(ext) && /\bbr\b/.test(accept)) {
    headers['Content-Encoding'] = 'br';
    stream = stream.pipe(createBrotliCompress());
  } else if (COMPRESSIBLE.has(ext) && /\bgzip\b/.test(accept)) {
    headers['Content-Encoding'] = 'gzip';
    stream = stream.pipe(createGzip());
  }
  res.writeHead(status, headers);
  stream.pipe(res);
}).listen(port, () => console.log(`dist on http://localhost:${port}`));
