// Static server for local preview and tests. Sends the same security headers as production
// (from src/deploy.js), so CSP mistakes show up locally.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { securityHeaders } from '../src/deploy.js';

const ROOT = fileURLToPath(new URL('../public/', import.meta.url));
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };
const SEC = securityHeaders();
delete SEC['Strict-Transport-Security'];
SEC['Content-Security-Policy'] = SEC['Content-Security-Policy'].replace('; upgrade-insecure-requests', '');
const cache = new Map();

async function resolve(url) {
  let p = decodeURIComponent(new URL(url, 'http://x').pathname);
  p = normalize(p).replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, p);
  if (!file.startsWith(ROOT)) return null;
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); await stat(file); return file; } catch { return null; }
}

export function start(port = Number(process.env.PORT) || 4173) {
  const server = createServer(async (req, res) => {
    const file = await resolve(req.url);
    const status = file ? 200 : 404;
    const path = file || join(ROOT, '404.html');
    let body = cache.get(path);
    if (!body) { body = await readFile(path); cache.set(path, body); }
    const type = TYPES[extname(path)] || 'application/octet-stream';
    const headers = { 'Content-Type': type, ...SEC, 'Cache-Control': path.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache' };
    if (/gzip/.test(req.headers['accept-encoding'] || '') && /text|json|xml|javascript/.test(type)) {
      const gz = cache.get(path + '.gz') || gzipSync(body);
      cache.set(path + '.gz', gz);
      res.writeHead(status, { ...headers, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
      return res.end(gz);
    }
    res.writeHead(status, headers);
    res.end(body);
  });
  return new Promise((r) => server.listen(port, () => r(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const s = await start();
  console.log(`Serving public/ on http://localhost:${s.address().port}`);
}
