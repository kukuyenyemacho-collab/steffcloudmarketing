// Load / stress test: hammers the built site through the local production-like server.
// Usage: npm run test:load  (env: CONNECTIONS=200 DURATION=20)
import http from 'node:http';
import { performance } from 'node:perf_hooks';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { start } from './server.mjs';

const CONNECTIONS = Number(process.env.CONNECTIONS) || 200;
const DURATION = Number(process.env.DURATION) || 20;
const server = await start(0);
const port = server.address().port;
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const assets = ['/assets/css/styles.css', '/assets/js/main.js', '/assets/fonts/unbounded-latin.woff2', '/assets/img/wordmark-mask.webp'];
const targets = [...paths, ...assets];
const agent = new http.Agent({ keepAlive: true, maxSockets: CONNECTIONS });

const lat = [];
let ok = 0, non2xx = 0, errors = 0, bytes = 0;
const get = (path) => new Promise((resolve) => {
  const t0 = performance.now();
  const req = http.get({ host: '127.0.0.1', port, path, agent, headers: { 'Accept-Encoding': 'gzip' } }, (res) => {
    res.on('data', (c) => { bytes += c.length; });
    res.on('end', () => { lat.push(performance.now() - t0); res.statusCode < 300 ? ok++ : non2xx++; resolve(); });
  });
  req.on('error', () => { errors++; resolve(); });
});

const end = Date.now() + DURATION * 1000;
let i = 0;
const worker = async () => { while (Date.now() < end) await get(targets[i++ % targets.length]); };
console.log(`Load test: ${CONNECTIONS} concurrent connections for ${DURATION}s across ${targets.length} URLs…`);
const t0 = Date.now();
await Promise.all(Array.from({ length: CONNECTIONS }, worker));
const secs = (Date.now() - t0) / 1000;

// Burst: 2,000 simultaneous requests at once (traffic spike from a viral post).
const burstLat0 = lat.length;
const b0 = performance.now();
await Promise.all(Array.from({ length: 2000 }, (_, k) => get(targets[k % targets.length])));
const burstMs = performance.now() - b0;

lat.sort((a, b) => a - b);
const pct = (p) => lat[Math.min(lat.length - 1, Math.floor((p / 100) * lat.length))].toFixed(1);
const result = {
  connections: CONNECTIONS, durationSeconds: DURATION, urls: targets.length,
  requests: ok + non2xx + errors, requestsPerSecond: Math.round((ok + non2xx) / secs),
  latencyMs: { p50: +pct(50), p90: +pct(90), p99: +pct(99), max: +lat.at(-1).toFixed(1) },
  ok, non2xx, errors, megabytesServed: +(bytes / 1048576).toFixed(1),
  burst: { requests: 2000, totalMs: Math.round(burstMs), completed: lat.length - burstLat0 },
};
console.log(JSON.stringify(result, null, 2));
mkdirSync(new URL('./results/', import.meta.url), { recursive: true });
writeFileSync(new URL('./results/load.json', import.meta.url), JSON.stringify(result, null, 2));
agent.destroy();
server.close();
if (errors || non2xx) { console.error('FAIL: errors or non-2xx responses under load'); process.exit(1); }
console.log('PASS: no errors under load');
