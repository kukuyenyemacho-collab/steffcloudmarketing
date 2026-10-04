// End-to-end quality gate for the built site.
// Visits every page at phone, tablet and desktop sizes in a real browser served with the
// production security headers, and checks errors, layout, SEO basics, accessibility (axe-core),
// performance budgets and every interactive feature. Usage: npm test
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
import { start } from './server.mjs';

const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const exe = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find(existsSync);

const server = await start(0);
const BASE = `http://localhost:${server.address().port}`;
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const PATHS = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
const VIEWPORTS = [
  { name: 'phone', width: 360, height: 740, theme: 'dark' },
  { name: 'tablet', width: 768, height: 1024, theme: 'light' },
  { name: 'desktop', width: 1440, height: 900, theme: 'light' },
];
const BUDGET_KB = 350; // max transferred per page on first load

const failures = [];
const warnings = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
const pageStats = [];
let checks = 0;
const ok = (cond, where, msg) => { checks++; if (!cond) fail(where, msg); };

const browser = await chromium.launch({ executablePath: exe });
const linkSet = new Set();

async function newPage(vp, { consent = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, colorScheme: vp.theme, reducedMotion: 'reduce' });
  if (consent) await ctx.addInitScript(() => { try { localStorage.setItem('sc-consent', JSON.stringify({ v: 1, ts: Date.now(), analytics: false, marketing: false })); } catch {} });
  await ctx.addInitScript(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  page.on('requestfailed', (r) => { if (r.url().startsWith(BASE)) errs.push('requestfailed: ' + r.url()); });
  let bytes = 0;
  page.on('response', async (r) => { try { if (r.url().startsWith(BASE)) bytes += Number(r.headers()['content-length']) || (await r.body()).length; } catch {} });
  return { ctx, page, errs, bytes: () => bytes };
}

// ---------- 1. Every page × every viewport ----------
for (const vp of VIEWPORTS) {
  const { ctx, page, errs, bytes } = await newPage(vp);
  for (const path of PATHS) {
    const where = `${vp.name} ${path}`;
    errs.length = 0;
    const before = bytes();
    const t0 = Date.now();
    const res = await page.goto(BASE + path, { waitUntil: 'load' });
    const loadMs = Date.now() - t0;
    ok(res.status() === 200, where, `HTTP ${res.status()}`);
    const info = await page.evaluate(() => {
      const se = document.scrollingElement;
      window.scrollTo({ left: 400, top: 0, behavior: 'instant' });
      const scrolledX = window.scrollX;
      window.scrollTo({ left: 0, top: 0, behavior: 'instant' });
      return {
        title: document.title,
        desc: document.querySelector('meta[name=description]')?.content || '',
        canonical: document.querySelector('link[rel=canonical]')?.href || '',
        h1: document.querySelectorAll('h1').length,
        lang: document.documentElement.lang,
        imgsNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
        scrolledX,
        overflowEls: [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 1 && !e.closest('.table-wrap,.marquee-clip,.prose > table,.mega,.hp'); }).slice(0, 3).map((e) => e.tagName + '.' + e.className),
        links: [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0]),
        ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return true; } catch { return false; } }),
        csp: window.__csp,
        fontsOk: document.fonts.check('900 20px Unbounded') && document.fonts.check('400 16px Inter'),
      };
    });
    info.links.forEach((l) => linkSet.add(l));
    ok(info.title.length > 10, where, 'missing <title>');
    ok(info.desc.length >= 50, where, 'meta description too short');
    ok(info.canonical.endsWith(path), where, `canonical mismatch ${info.canonical}`);
    ok(info.h1 === 1, where, `expected 1 <h1>, found ${info.h1}`);
    ok(info.lang === 'en-KE', where, 'html lang missing');
    ok(info.imgsNoAlt === 0, where, `${info.imgsNoAlt} images without alt`);
    ok(info.scrolledX === 0 && info.overflowEls.length === 0, where, `page wider than screen (${info.overflowEls.join(', ')})`);
    ok(info.ld.every(Boolean) && info.ld.length >= 1, where, 'invalid JSON-LD');
    ok(info.csp.length === 0, where, 'CSP violations: ' + info.csp.join(' | '));
    ok(errs.length === 0, where, errs.join(' | '));
    if (vp.name === 'desktop') ok(info.fontsOk, where, 'brand fonts did not load');
    if (info.desc.length > 165) warnings.push(`${path}: description ${info.desc.length} chars (may be truncated in Google)`);

    // Accessibility: axe on phone (dark) and desktop (light) — every page, both themes.
    if (vp.name !== 'tablet') {
      await page.evaluate(AXE);
      const axe = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }, rules: { region: { enabled: false } } });
        return r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes[0]?.target.join(' ') }));
      });
      for (const v of axe) {
        if (v.impact === 'serious' || v.impact === 'critical') fail(where, `a11y ${v.impact} ${v.id} ×${v.n} (${v.sample})`);
        else warnings.push(`${where}: a11y ${v.impact} ${v.id} ×${v.n} (${v.sample})`);
        checks++;
      }
    }
    if (vp.name === 'phone') pageStats.push({ path, kb: Math.round((bytes() - before) / 1024), loadMs });
  }
  await ctx.close();
}

// ---------- 2. Links & HTTP behaviour ----------
for (const l of linkSet) {
  const r = await fetch(BASE + l);
  ok(r.status === 200, 'link', `${l} → ${r.status}`);
}
{
  const r = await fetch(BASE + '/this-page-does-not-exist/');
  ok(r.status === 404, '404', `missing page returned ${r.status}`);
  ok((await r.text()).includes('This page ghosted you'), '404', 'custom 404 page not served');
  for (const h of ['content-security-policy', 'x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy']) ok(r.headers.get(h), 'headers', `${h} missing`);
  for (const f of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/.well-known/security.txt', '/blog/feed.xml', '/site.webmanifest', '/_headers', '/.htaccess']) ok((await fetch(BASE + f)).status === 200, 'files', `${f} missing`);
}

// ---------- 3. Performance budget ----------
for (const s of pageStats) ok(s.kb <= BUDGET_KB, `budget ${s.path}`, `${s.kb} KB > ${BUDGET_KB} KB`);

// ---------- 4. Interactive features ----------
const desk = VIEWPORTS[2], phone = VIEWPORTS[0];
async function feature(name, vp, fn, opts) {
  const { ctx, page, errs } = await newPage(vp, opts);
  try { await fn(page); ok(errs.length === 0, `feature ${name}`, errs.join(' | ')); }
  catch (e) { fail(`feature ${name}`, e.message.split('\n')[0]); }
  finally { await ctx.close(); }
}
const expect = (cond, msg) => { checks++; if (!cond) throw new Error(msg); };

await feature('cookie banner', desk, async (p) => {
  await p.goto(BASE + '/');
  expect(await p.isVisible('#cookie-banner'), 'banner not shown on first visit');
  await p.click('[data-consent="none"]');
  expect(!(await p.isVisible('#cookie-banner')), 'banner did not close after Reject all');
  const saved = await p.evaluate(() => JSON.parse(localStorage.getItem('sc-consent')));
  expect(saved.analytics === false && saved.marketing === false, 'reject not saved');
  await p.reload();
  expect(!(await p.isVisible('#cookie-banner')), 'banner reappeared after choice');
  await p.click('footer [data-open-cookies]');
  expect(await p.isVisible('#cookie-dialog'), 'cookie settings dialog did not open');
  await p.check('#ck-analytics');
  await p.click('#cookie-dialog button[value="save"]');
  const s2 = await p.evaluate(() => JSON.parse(localStorage.getItem('sc-consent')));
  expect(s2.analytics === true && s2.marketing === false, 'custom choice not saved');
  const gaRequested = await p.evaluate(() => [...document.scripts].some((s) => s.src.includes('googletagmanager')));
  expect(!gaRequested, 'analytics loaded although no GA ID is configured');
}, { consent: false });

await feature('lead form', desk, async (p) => {
  await p.goto(BASE + '/');
  await p.click('#hero button[type=submit]');
  expect((await p.textContent('#hero-status')).includes('Please add'), 'no validation message on empty submit');
  expect((await p.getAttribute('#hero-name', 'aria-invalid')) === 'true', 'name not flagged invalid');
  for (const [num, valid] of [['0712 345 678', true], ['+254 112 345 678', true], ['254712345678', true], ['+44 7700 900123', true], ['+1 (415) 555-0100', true], ['12345', false], ['0812345678', false]]) {
    await p.fill('#hero-phone', num);
    const v = await p.evaluate((n) => /^(?:(?:\+?254|0)[17]\d{8}|\+[1-9]\d{7,14})$/.test(n.replace(/[\s().-]/g, '')), num);
    expect(v === valid, `phone ${num} validity should be ${valid}`);
  }
  await p.fill('#hero-name', 'Achieng Otieno');
  await p.fill('#hero-phone', '+44 7700 900123');
  await p.check('#hero-consent');
  await p.waitForTimeout(1600);
  await p.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return {}; }; });
  await p.click('#hero button[type=submit]');
  const opened = await p.evaluate(() => window.__opened);
  expect(opened.length === 1 && decodeURIComponent(opened[0]).includes('Achieng Otieno'), 'WhatsApp did not open with the enquiry');
  expect(await p.isVisible('#hero-box .form-done'), 'success panel not shown');
  const href = await p.getAttribute('#hero-box .done-wa', 'href');
  expect(href.startsWith('https://wa.me/254118407026') && decodeURIComponent(href).includes('+447700900123'), 'fallback WhatsApp link wrong');
}, undefined);

await feature('spam honeypot', desk, async (p) => {
  await p.goto(BASE + '/contact/');
  await p.fill('#contact-name', 'Bot');
  await p.fill('#contact-phone', '0712345678');
  await p.check('#contact-consent');
  await p.evaluate(() => { document.querySelector('#contact-web').value = 'http://spam.example'; window.__opened = []; window.open = (u) => { window.__opened.push(u); return {}; }; });
  await p.waitForTimeout(1600);
  await p.click('#contact button[type=submit]');
  expect((await p.evaluate(() => window.__opened.length)) === 0, 'honeypot submission still opened WhatsApp');
});

await feature('theme toggle', desk, async (p) => {
  await p.goto(BASE + '/');
  await p.click('.theme-btn');
  expect((await p.getAttribute('html', 'data-theme')) === 'dark', 'theme did not switch to dark');
  await p.reload();
  expect((await p.getAttribute('html', 'data-theme')) === 'dark', 'theme not remembered');
  const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg === 'rgb(14, 14, 13)', `dark background not applied (${bg})`);
});

await feature('currency switch', desk, async (p) => {
  await p.goto(BASE + '/pricing/');
  await p.selectOption('.fine .cur-select', 'USD');
  const t = await p.textContent('.plan .money');
  expect(t.startsWith('≈ US$'), `price did not convert (${t})`);
  expect(await p.isVisible('.cur-note'), 'approximate-price note hidden');
  await p.selectOption('.fine .cur-select', 'KES');
  expect((await p.textContent('.plan .money')) === 'KES 8,000', 'did not convert back to KES');
});

await feature('growth calculator', desk, async (p) => {
  await p.goto(BASE + '/pricing/');
  expect((await p.textContent('[data-out="leads"]')).startsWith('80'), 'calculator default wrong');
  await p.fill('#calc-value', '20000');
  await p.fill('#calc-customers', '50');
  await p.selectOption('#calc-close', '0.5');
  expect((await p.textContent('[data-out="leads"]')).startsWith('100'), 'leads not recalculated');
  expect((await p.textContent('[data-out="revenue"]')).includes('1,000,000'), 'revenue not recalculated');
  expect((await p.textContent('[data-out="plan"]')) === 'Grow', 'plan recommendation wrong');
});

await feature('map click-to-load', desk, async (p) => {
  await p.goto(BASE + '/contact/');
  expect((await p.$$('iframe')).length === 0, 'map loaded before consent click');
  await p.click('.map-load');
  expect((await p.$$('.map iframe')).length === 1, 'map did not load on click');
});

await feature('mobile menu', phone, async (p) => {
  await p.goto(BASE + '/');
  await p.click('.menu-btn');
  expect(await p.isVisible('#mobile-nav'), 'menu did not open');
  await p.keyboard.press('Escape');
  expect(!(await p.isVisible('#mobile-nav')), 'Escape did not close menu');
  expect(await p.isVisible('.m-bar'), 'sticky mobile call bar missing');
});

await feature('blog filter & glossary', desk, async (p) => {
  await p.goto(BASE + '/blog/');
  await p.click('.chip-btn[data-filter="SEO"]');
  const visible = await p.$$eval('.post-card', (cs) => cs.filter((c) => !c.hidden).map((c) => c.dataset.cat));
  expect(visible.length > 0 && visible.every((c) => c === 'SEO'), 'blog filter failed');
  await p.goto(BASE + '/learn/digital-marketing-glossary/');
  await p.fill('#gq', 'roas');
  expect((await p.$$eval('#glossary > div', (d) => d.filter((x) => !x.hidden).length)) === 1, 'glossary search failed');
  await p.fill('#gq', 'zzzz');
  expect(await p.isVisible('#glossary-empty'), 'no-results message missing');
});

await feature('marketing grader', desk, async (p) => {
  await p.goto(BASE + '/tools/marketing-grader/');
  expect((await p.textContent('[data-g="score"]')) === '0', 'grader should start at 0');
  const ids = await p.$$eval('.g-q', (qs) => qs.map((q) => q.dataset.id));
  for (const id of ids) await p.check(`input[name="${id}"][value="1"]`);
  expect((await p.textContent('[data-g="score"]')) === '100', 'all-yes should score 100');
  await p.check('input[name="reply"][value="0"]');
  await p.check('input[name="gbp"][value="0.5"]');
  expect((await p.textContent('[data-g="score"]')) === '85', 'score should drop to 85');
  const fixes = await p.$$eval('[data-g="fixes"] li', (l) => l.map((x) => x.textContent));
  expect(fixes.length === 2 && fixes[0].includes('WhatsApp'), 'top fix should be the biggest gap (reply speed)');
  expect(decodeURIComponent(await p.getAttribute('.g-cta', 'href')).includes('85/100'), 'WhatsApp CTA should carry the score');
});

await feature('whatsapp link generator', desk, async (p) => {
  await p.goto(BASE + '/tools/whatsapp-link-generator/');
  expect((await p.inputValue('#wl-out')).startsWith('https://wa.me/254712345678?text='), 'default link wrong');
  await p.fill('#wl-phone', '+44 7700 900123');
  await p.fill('#wl-msg', '');
  expect((await p.inputValue('#wl-out')) === 'https://wa.me/447700900123', 'international link wrong');
  await p.fill('#wl-phone', '12345');
  expect((await p.inputValue('#wl-out')) === '' && (await p.textContent('.wl-error')).length > 10, 'invalid number not rejected');
});

await feature('academy progress', desk, async (p) => {
  await p.goto(BASE + '/academy/');
  const boxes = await p.$$('input[data-lesson]');
  await boxes[0].check();
  await boxes[1].check();
  const pct = await p.textContent('[data-ac="pct"]');
  expect(pct === String(Math.round((2 / boxes.length) * 100)), `progress wrong (${pct})`);
  await p.reload();
  expect((await p.$$eval('input[data-lesson]:checked', (b) => b.length)) === 2, 'progress not remembered');
});

await feature('japanese footer', desk, async (p) => {
  await p.goto(BASE + '/');
  expect((await p.textContent('.f-jp')) === 'ステフクラウド', 'Japanese name missing');
  expect((await p.getAttribute('.f-jp', 'lang')) === 'ja', 'Japanese lang attribute missing');
  expect(await p.evaluate(() => document.fonts.check('40px "Dela Gothic One"', 'ステフクラウド')), 'Japanese font not loaded');
  expect((await p.$$eval('.f-name text', (t) => t.length)) === 1, 'name should be on one line');
});

await feature('keyboard', desk, async (p) => {
  await p.goto(BASE + '/');
  await p.keyboard.press('Tab');
  expect((await p.evaluate(() => document.activeElement.className)) === 'skip', 'first Tab should reach Skip to content');
});

await feature('copy & open status', desk, async (p) => {
  await p.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await p.goto(BASE + '/contact/');
  await p.click('[data-copy="+254 118 407 026"]');
  expect((await p.evaluate(() => navigator.clipboard.readText())) === '+254 118 407 026', 'phone not copied');
  const s = await p.textContent('.open-status.big .os-text');
  expect(/(Open|Closed) now/.test(s), 'open-now status not computed');
});

await browser.close();
server.close();

// ---------- Report ----------
pageStats.sort((a, b) => b.kb - a.kb);
const summary = {
  date: new Date().toISOString(),
  pages: PATHS.length,
  viewports: VIEWPORTS.map((v) => `${v.name} ${v.width}px (${v.theme})`),
  checks,
  failures,
  warnings: [...new Set(warnings)],
  heaviestPages: pageStats.slice(0, 5),
  averagePageKB: Math.round(pageStats.reduce((a, s) => a + s.kb, 0) / pageStats.length),
};
mkdirSync(new URL('./results/', import.meta.url), { recursive: true });
writeFileSync(new URL('./results/site.json', import.meta.url), JSON.stringify(summary, null, 2));
console.log(`\n${PATHS.length} pages × ${VIEWPORTS.length} viewports · ${checks} checks · ${failures.length} failures · ${summary.warnings.length} warnings`);
console.log('Heaviest pages (phone, first load):', pageStats.slice(0, 3).map((s) => `${s.path} ${s.kb}KB`).join(', '));
if (summary.warnings.length) console.log('\nWarnings:\n- ' + summary.warnings.slice(0, 25).join('\n- '));
if (failures.length) { console.log('\nFAILURES:\n- ' + failures.join('\n- ')); process.exit(1); }
console.log('\nALL CHECKS PASSED');
