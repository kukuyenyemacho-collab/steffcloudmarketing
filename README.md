# Steff Cloud — Digital Marketing Website

Public marketing site for **STEFF CLOUD LIMITED**'s digital marketing practice (Nakuru, Kenya).
Static HTML, no framework, built for speed, SEO and GEO (AI search).

## What's inside
- **Home** with top CTA bar, hero lead form, services, process, comparison, GEO section, pricing, FAQ, blog teaser
- **8 service pages** (`/services/...`): SEO, Local SEO, GEO, Social Media, Paid Ads, Content & Video, WhatsApp/Email/SMS, Analytics & CRO
- **Nakuru landing page**, **Pricing**, **Free Audit** (main conversion page), **About**, **Contact**, **FAQ**
- **Learn hub**: 10 blog guides + 44-term glossary + RSS feed
- **Legal**: Privacy Policy (Kenya Data Protection Act 2019), Terms, Cookie Policy, Refund Policy
- **SEO/GEO**: per-page titles, descriptions, canonicals, Open Graph, JSON-LD (ProfessionalService, Service, FAQPage, BlogPosting, BreadcrumbList, DefinedTermSet), `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt`
- **Lead capture**: every form opens a pre-filled WhatsApp chat to +254 118 407 026 (optionally also POSTs to a form backend)

## Edit content
All content lives in `src/`:
| File | What |
|---|---|
| `src/data.js` | Contact details, domain, prices, services, plans, FAQs, socials, GA4 ID, form endpoint |
| `src/posts.js` | Blog posts |
| `src/glossary.js` | Glossary terms |
| `src/legal.js` | Legal pages |
| `public/assets/css/styles.css` | Design (brand tokens at the top) |

Then rebuild:
```bash
npm run build      # regenerates /public
npm run serve      # preview at http://localhost:4173
```

## Before going live
1. Set `site.url` in `src/data.js` to the real domain (default `https://marketing.steffcloud.co.ke`).
2. Add social profile URLs to `site.socials`.
3. Optional: add a GA4 ID (`site.ga4`) — a consent banner appears automatically.
4. Optional: add a Formspree/Web3Forms endpoint (`site.formEndpoint`) to also receive leads by email.
5. Confirm prices and promises (reply time, month-to-month terms) match how you operate.
6. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Deploy
Works on any static host. `netlify.toml` and `vercel.json` are included (build: `node src/build.js`, output: `public`). For cPanel, upload the contents of `public/`.
