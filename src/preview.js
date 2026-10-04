// Builds /preview: a copy of /public with relative links, for hosting in a sub-folder
// (shareable previews, GitHub Pages project sites). Production deploys use /public.
import { cpSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'public');
const OUT = join(ROOT, 'preview');
rmSync(OUT, { recursive: true, force: true });
cpSync(SRC, OUT, { recursive: true, filter: (p) => !/[\\/](\.well-known|\.htaccess|_headers)$/.test(p) });

const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
const entry = process.argv.includes('--fragment-entry');
for (const file of walk(OUT).filter((f) => f.endsWith('.html'))) {
  const rel = relative(OUT, file).split(sep).join('/');
  const depth = rel.split('/').length - 1;
  const up = depth ? '../'.repeat(depth) : './';
  let html = readFileSync(file, 'utf8').replace(/(href|src)="\/(?!\/)([^"#?]*)([?#][^"]*)?"/g, (_, attr, p, rest = '') => {
    const target = p === '' || p.endsWith('/') ? p + 'index.html' : p;
    return `${attr}="${up}${target}${rest}"`;
  });
  // The hosted preview wraps its entry page in its own document, so the entry ships as a fragment.
  if (entry && rel === 'index.html') {
    html = html
      .replace(/<!doctype html>\s*/i, '')
      .replace(/<\/?html[^>]*>\s*/gi, '')
      .replace(/<\/?head>\s*/gi, '')
      .replace(/<\/?body>\s*/gi, '')
      .replace(/<title>[^<]*<\/title>/, '<title>Steff Cloud Marketing</title>');
  }
  writeFileSync(file, html);
}
console.log(`Preview written to ${OUT}`);
