import { site, services, nav } from './data.js';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const kes = (n) => 'KES ' + Number(n).toLocaleString('en-KE');
export const abs = (p) => site.url + p;
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
  play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};
export const icon = (name, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

export const waIcon = `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"/></svg>`;

// ---------- JSON-LD ----------
export const orgId = site.url + '/#org';

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.legalName, site.chineseName, 'Steff Cloud Digital Marketing'],
    description:
      'Steff Cloud Limited is a digital marketing agency in Nakuru, Kenya offering SEO, GEO (AI search optimization), local SEO, social media management, Google, Meta & TikTok ads, content and video, WhatsApp/email marketing and analytics.',
    slogan: site.tagline,
    url: site.url + '/',
    logo: abs('/assets/img/logo-black.png'),
    image: abs('/assets/img/og-default.jpg'),
    telephone: site.phoneE164,
    email: site.email,
    foundingDate: site.founded,
    priceRange: 'KES 8,000 – KES 60,000+ per month',
    currenciesAccepted: 'KES',
    paymentAccepted: 'M-Pesa, Bank transfer, Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: site.hours,
    areaServed: site.areaServed.map((n) => ({ '@type': n === 'Kenya' ? 'Country' : 'City', name: n })),
    knowsAbout: [
      'Digital marketing', 'Search engine optimization', 'Generative engine optimization', 'Local SEO',
      'Google Business Profile', 'Social media marketing', 'Google Ads', 'Meta Ads', 'TikTok Ads',
      'Content marketing', 'Video marketing', 'WhatsApp marketing', 'Email marketing', 'Conversion rate optimization',
    ],
    parentOrganization: { '@type': 'Organization', name: site.legalName, url: site.mainSite },
    sameAs: [site.mainSite, ...site.socials.map((s) => s.url)],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneE164,
      email: site.email,
      contactType: 'sales',
      areaServed: 'KE',
      availableLanguage: ['English', 'Swahili'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital marketing services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}/`) },
        priceSpecification: { '@type': 'PriceSpecification', price: s.from, priceCurrency: 'KES', minPrice: s.from },
      })),
    },
  };
}

export const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...items].map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: abs(path),
  })),
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

// ---------- Components ----------
export function crumbs(items) {
  const all = [['Home', '/'], ...items];
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${all
    .map(([n, p], i) => (i === all.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${p}">${esc(n)}</a></li>`))
    .join('')}</ol></nav>`;
}

export function faqList(faqs) {
  return `<div class="faq">${faqs
    .map(
      ([q, a]) =>
        `<details><summary><span>${esc(q)}</span>${icon('plus')}</summary><div class="faq-a"><p>${esc(a)}</p></div></details>`,
    )
    .join('')}</div>`;
}

export function leadForm({ id = 'lead', title = 'Get your free growth audit', compact = false, source = 'website' } = {}) {
  const opts = services.map((s) => `<option>${esc(s.short)}</option>`).join('');
  return `<form class="lead-form${compact ? ' compact' : ''}" id="${id}" data-source="${esc(source)}" novalidate>
  <p class="form-title">${esc(title)}</p>
  <p class="form-sub">Reply within 1 business hour. No spam, ever.</p>
  <div class="field"><label for="${id}-name">Your name</label><input id="${id}-name" name="name" autocomplete="name" required placeholder="e.g. Wanjiru Kamau"></div>
  <div class="field"><label for="${id}-phone">WhatsApp / phone</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" required placeholder="07xx xxx xxx" pattern="^(\\+?254|0)?[17]\\d{8}$"></div>
  <div class="field"><label for="${id}-biz">Business name</label><input id="${id}-biz" name="business" autocomplete="organization" placeholder="e.g. Lanet Hardware"></div>
  <div class="row2">
    <div class="field"><label for="${id}-svc">I need help with</label><select id="${id}-svc" name="service"><option>Not sure yet — advise me</option>${opts}</select></div>
    <div class="field"><label for="${id}-bud">Monthly budget</label><select id="${id}-bud" name="budget"><option>Under KES 10,000</option><option selected>KES 10,000 – 30,000</option><option>KES 30,000 – 60,000</option><option>KES 60,000 – 150,000</option><option>KES 150,000+</option></select></div>
  </div>
  ${compact ? '' : `<div class="field"><label for="${id}-msg">Your biggest marketing goal</label><textarea id="${id}-msg" name="message" rows="3" placeholder="e.g. More walk-ins to our Nakuru shop"></textarea></div>`}
  <label class="consent"><input type="checkbox" name="consent" required><span>I agree to be contacted about my enquiry, per the <a href="/privacy-policy/">Privacy Policy</a>.</span></label>
  <button class="btn btn-ink btn-block" type="submit">${waIcon}<span>Send & chat on WhatsApp</span></button>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>`;
}

export function ctaBand({ title = 'Ready to be impossible to ignore?', text = 'Book a free 30-minute growth audit. Walk away with a clear plan — whether you hire us or not.' } = {}) {
  return `<section class="cta-band"><div class="wrap">
  <h2>${title}</h2><p>${esc(text)}</p>
  <div class="btns"><a class="btn btn-cream" href="/free-audit/">Get my free audit ${icon('arrow')}</a>
  <a class="btn btn-ghost-cream" href="${wa('Hi Steff Cloud, I would like to grow my business with digital marketing.')}" rel="noopener" data-track="whatsapp">${waIcon}<span>WhatsApp us</span></a></div>
</div></section>`;
}

export function serviceCard(s) {
  return `<a class="svc-card" href="/services/${s.slug}/">
  <span class="svc-num">${s.num}</span>${icon(s.icon, 'svc-ic')}
  <h3>${esc(s.name)}</h3><p>${esc(s.hook)}</p>
  <span class="svc-foot"><span>From ${kes(s.from)}<small>${esc(s.unit)}</small></span>${icon('arrow')}</span>
</a>`;
}

export function postCard(p) {
  return `<a class="post-card" href="/blog/${p.slug}/">
  <span class="tag">${esc(p.category)}</span>
  <h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
  <span class="meta">${fmtDate(p.date)} · ${p.minutes} min read</span>
</a>`;
}

export const fmtDate = (d) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// ---------- Layout ----------
function header(current) {
  const svcLinks = services
    .map((s) => `<li><a href="/services/${s.slug}/">${icon(s.icon)}<span><b>${esc(s.short)}</b><small>${esc(s.hook)}</small></span></a></li>`)
    .join('');
  const links = nav
    .map((n) => {
      const active = current && current.startsWith(n.href) ? ' aria-current="page"' : '';
      if (n.children)
        return `<li class="has-mega"><a href="${n.href}"${active}>${n.label}</a><div class="mega"><ul>${svcLinks}</ul></div></li>`;
      return `<li><a href="${n.href}"${active}>${n.label}</a></li>`;
    })
    .join('');
  return `<div class="topbar"><div class="wrap"><span class="dot" aria-hidden="true"></span><span class="tb-long">${esc(site.topbar.text)}</span><span class="tb-short">Free growth audit 🔥</span><a href="${site.topbar.href}">${esc(site.topbar.cta)} ${icon('arrow')}</a><a class="tb-phone" href="tel:${site.phoneE164}">${icon('phone')}${esc(site.phone)}</a></div></div>
<header class="site-header"><div class="wrap">
  <a class="brand" href="/" aria-label="Steff Cloud — home"><img src="/assets/img/wordmark-black.png" alt="Steff Cloud" width="86" height="58"><span class="brand-tag">digital<br>marketing</span></a>
  <nav class="main-nav" aria-label="Main"><ul>${links}</ul></nav>
  <div class="hdr-cta"><a class="btn btn-ink btn-sm" href="/free-audit/">Free audit ${icon('arrow')}</a>
  <button class="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button></div>
</div>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile" hidden><ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}${services
    .map((s) => `<li class="sub"><a href="/services/${s.slug}/">${esc(s.short)}</a></li>`)
    .join('')}</ul><a class="btn btn-ink btn-block" href="/free-audit/">Get my free audit</a></nav>
</header>`;
}

function footer() {
  const col = (title, items) =>
    `<div class="f-col"><p class="f-h">${title}</p><ul>${items.map(([n, h]) => `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ul></div>`;
  const socials = site.socials.length
    ? `<ul class="socials">${site.socials.map((s) => `<li><a href="${s.url}" rel="noopener me" target="_blank">${esc(s.label)}</a></li>`).join('')}</ul>`
    : '';
  return `<footer class="site-footer">
<div class="wrap">
  <div class="f-top">
    <div class="f-brand">
      <img src="/assets/img/logo-cream.png" alt="Steff Cloud — Creative Agency, estd 2026" width="172" height="145">
      <p>Digital marketing that brings real clients, not just likes. Based in Nakuru, serving all of Kenya.</p>
      <ul class="f-contact">
        <li><a href="tel:${site.phoneE164}">${icon('phone')}${esc(site.phone)}</a></li>
        <li><a href="mailto:${site.email}">${icon('mail')}${esc(site.email)}</a></li>
        <li><span>${icon('pin')}${esc(site.address.street)}, ${esc(site.address.locality)}</span></li>
        <li><span>${icon('clock')}${esc(site.hoursText)}</span></li>
      </ul>${socials}
    </div>
    ${col('Services', services.map((s) => [s.short, `/services/${s.slug}/`]))}
    ${col('Company', [['About', '/about/'], ['Pricing', '/pricing/'], ['Digital marketing Nakuru', '/digital-marketing-agency-nakuru/'], ['Free audit', '/free-audit/'], ['Contact', '/contact/'], ['FAQ', '/faq/'], ['Main site', site.mainSite]])}
    ${col('Learn', [['Blog', '/blog/'], ['Glossary', '/learn/digital-marketing-glossary/'], ['What is GEO?', '/blog/what-is-geo-generative-engine-optimization/'], ['Marketing in Kenya', '/blog/digital-marketing-in-kenya-guide/'], ['Rank on Google Maps', '/blog/google-business-profile-nakuru-guide/']])}
    ${col('Legal', [['Privacy Policy', '/privacy-policy/'], ['Terms of Service', '/terms/'], ['Cookie Policy', '/cookie-policy/'], ['Refund Policy', '/refund-policy/']])}
  </div>
  <div class="f-mark">
    <svg class="f-name" viewBox="0 0 1000 300" role="img" aria-label="${esc(site.legalName.toUpperCase())}">
      <text x="0" y="138" textLength="1000" lengthAdjust="spacingAndGlyphs">STEFF CLOUD</text>
      <text x="0" y="292" textLength="1000" lengthAdjust="spacing">LIMITED</text>
    </svg>
    <p class="f-cn" lang="zh-Hans" aria-label="Steff Cloud in Chinese">${site.chineseName}</p>
  </div>
  <div class="f-bottom"><p>© ${new Date().getFullYear()} ${esc(site.legalName)}. All rights reserved. Registered in Kenya.</p><p>Made with intent in Nakuru 🇰🇪</p></div>
</div>
</footer>
<div class="m-bar"><a href="${wa('Hi Steff Cloud, I want more customers. Can we talk?')}" rel="noopener" data-track="whatsapp">${waIcon}WhatsApp</a><a href="tel:${site.phoneE164}" data-track="call">${icon('phone')}Call</a><a class="hl" href="/free-audit/">Free audit</a></div>
<a class="wa-float" href="${wa('Hi Steff Cloud, I want more customers. Can we talk?')}" rel="noopener" aria-label="Chat with Steff Cloud on WhatsApp" data-track="whatsapp">${waIcon}</a>`;
}

export function page({ path, title, description, body, schema = [], type = 'website', image = '/assets/img/og-default.jpg', noindex = false, extraHead = '' }) {
  const canonical = abs(path);
  const ld = [orgSchema(), ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  const ga = site.ga4 ? `<meta name="ga4" content="${esc(site.ga4)}">` : '';
  return `<!doctype html>
<html lang="en-KE"${site.formEndpoint ? ` data-form-endpoint="${esc(site.formEndpoint)}"` : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<link rel="alternate" hreflang="en-KE" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<meta name="geo.region" content="KE-31">
<meta name="geo.placename" content="Nakuru">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">
<meta name="author" content="${esc(site.legalName)}">
<meta name="theme-color" content="#0b0b0b">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en_KE">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(image)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(image)}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Steff Cloud — Digital Marketing Blog" href="/blog/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;900&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@900&display=swap&text=${encodeURIComponent(site.chineseName)}">
<link rel="stylesheet" href="/assets/css/styles.css">
${ga}${extraHead}
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}
