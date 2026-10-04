# Test report

Run on 4 October 2026 against the production build (v3: 51 pages), served locally with the production security headers.

## End-to-end stress test — `npm test`
**51 pages × 3 screen sizes (phone 360px dark, tablet 768px light, desktop 1440px light) · 1,923 checks · 0 failures · 0 warnings**

Every page, at every size:
- HTTP 200, one `<h1>`, title, meta description, canonical, `lang`, valid JSON-LD
- No JavaScript errors, no failed requests, **no Content-Security-Policy violations**
- No horizontal scrolling and nothing wider than the screen
- Brand fonts load; all images have alt text
- **axe-core accessibility scan (WCAG 2.0/2.1/2.2 A & AA + best practices) in light and dark themes: 0 issues**
- Page weight under budget (350 KB)

Site-wide: every internal link resolves; custom 404 returns HTTP 404; security headers present; robots.txt, sitemap.xml, llms.txt, security.txt, RSS, manifest, `_headers` and `.htaccess` served.

Features exercised in a real browser:
- Cookie banner shows on first visit; Reject all / Customise / Cookie settings work and persist; analytics stays off without consent
- Lead form: empty-form errors, Kenyan and international phone formats (valid and invalid), WhatsApp opens with the enquiry, success panel with fallback link
- Spam honeypot blocks bot submissions
- Theme toggle switches and is remembered
- Currency switch converts prices and back
- Growth calculator recalculates leads, revenue and plan
- Map loads only after a click
- Mobile menu opens and closes with Escape; sticky mobile call bar present
- Blog topic filter and glossary search (including no-results message)
- Keyboard: first Tab reaches “Skip to content”
- Copy-to-clipboard and open-now status
- Digital Marketing Grader: scoring, partial answers, top-fix ordering and WhatsApp hand-off with the score
- WhatsApp link generator: Kenyan and international numbers, invalid input
- Academy: lesson progress percentage, saved across reloads
- Footer: Japanese name ステフクラウド loads in its font with `lang="ja"`; company name on one line

Issues the first run caught and that were fixed: hidden table labels and the rotated marquee made pages scroll sideways on phones; two colour-contrast failures; scrollable tables not keyboard-focusable; heading-order gaps; empty table headers; six over-long meta descriptions.

## Load test — `npm run test:load`
Single Node.js process on a small cloud container (a CDN in production will be much faster):

| Metric | Result |
|---|---|
| Concurrent connections | 200 for 20 s, all 55 URLs |
| Requests served | 153,371 (≈ 7,660 per second) |
| Errors / non-2xx | 0 / 0 |
| Latency p50 / p99 | 25 ms / 100 ms |
| Spike: 2,000 simultaneous requests | all completed in 249 ms |

## Lighthouse 13 (mobile, simulated slow 4G)
| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | Weight |
|---|---|---|---|---|---|---|---|
| Home | 98 | 100 | 100 | 100 | 2.1 s | 0 | 187 KB |
| Marketing grader | 99 | 100 | 100 | 100 | 2.0 s | 0 | 181 KB |
| Industry: real estate | 100 | 100 | 100 | 100 | 1.7 s | 0 | 181 KB |
| Academy | 99 | 100 | 100 | 100 | 2.0 s | 0 | 180 KB |
| Pricing (v2) | 100 | 100 | 100 | 100 | 1.7 s | 0.001 | 178 KB |

## Dependencies
`npm audit`: 0 vulnerabilities. Dev-only tools: esbuild, axe-core, Playwright. Nothing third-party ships to visitors.
