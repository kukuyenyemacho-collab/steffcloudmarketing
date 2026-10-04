import { createHash } from 'node:crypto';
import { site, services, nav } from './data.js';
import { industries, tools } from './growth.js';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const kes = (n) => 'KES ' + Number(n).toLocaleString('en-KE');
// Price that the currency switcher can convert in the browser. Falls back to KES text.
export const money = (n) => `<span class="money" data-kes="${n}">${kes(n)}</span>`;
export const abs = (p) => site.url + p;
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const mapsLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Emboita, Nakuru–Solai Road, Nakuru, Kenya');

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
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  cookie: '<path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3-3 3 3 0 0 1-3-3 3 3 0 0 1-3-3z"/><circle cx="8.5" cy="10.5" r=".8"/><circle cx="14" cy="15" r=".8"/><circle cx="9" cy="15.5" r=".8"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h2M12 18h4"/>',
};
export const icon = (name, cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

export const waIcon = `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"/></svg>`;

// The only inline script on the site: applies a saved theme before first paint.
// Its hash is added to the Content-Security-Policy so no 'unsafe-inline' is needed.
export const themeBoot = "try{var t=localStorage.getItem('sc-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}";
export const themeBootHash = 'sha256-' + createHash('sha256').update(themeBoot).digest('base64');

// Set by build.js after minifying, so HTML references cache-busted assets.
export const assetVersion = { css: '1', js: '1' };

// ---------- JSON-LD ----------
export const orgId = site.url + '/#org';

export function orgSchema() {
  const ids = site.legalIds || {};
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': orgId,
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.legalName, site.japaneseName, 'Steff Cloud Digital Marketing'],
    description:
      'Steff Cloud Limited is a digital marketing agency in Nakuru, Kenya serving clients across Kenya, East Africa and internationally. Services: SEO, GEO (AI search optimization), local SEO, social media management, Google, Meta & TikTok ads, content and video, WhatsApp/email marketing and analytics.',
    slogan: site.tagline,
    url: site.url + '/',
    logo: abs('/assets/img/logo-black.png'),
    image: abs('/assets/img/og-default.jpg'),
    telephone: site.phoneE164,
    email: site.email,
    foundingDate: site.founded,
    ...(ids.registrationNo ? { identifier: ids.registrationNo } : {}),
    ...(ids.vatNo ? { vatID: ids.vatNo } : {}),
    ...(ids.kraPin ? { taxID: ids.kraPin } : {}),
    priceRange: 'KES 8,000 – KES 60,000+ per month',
    currenciesAccepted: 'KES, USD',
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
    areaServed: site.areaServed.map((n) =>
      n === 'Kenya' ? { '@type': 'Country', name: n } : n === 'Worldwide' || n === 'East Africa' ? { '@type': 'Place', name: n } : { '@type': 'City', name: n },
    ),
    knowsLanguage: ['en', 'sw'],
    knowsAbout: [
      'Digital marketing', 'Search engine optimization', 'Generative engine optimization', 'Local SEO',
      'Google Business Profile', 'Social media marketing', 'Google Ads', 'Meta Ads', 'TikTok Ads',
      'Content marketing', 'Video marketing', 'WhatsApp marketing', 'Email marketing', 'Conversion rate optimization',
      'Market entry marketing for Kenya and East Africa',
    ],
    parentOrganization: { '@type': 'Organization', name: site.legalName, url: site.mainSite },
    sameAs: [site.mainSite, ...site.socials.map((s) => s.url)],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneE164,
      email: site.email,
      contactType: 'sales',
      areaServed: ['KE', 'Worldwide'],
      availableLanguage: site.languages,
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
  return `<div class="lead-box" id="${id}-box">
<form class="lead-form" id="${id}" data-source="${esc(source)}" novalidate>
  <p class="form-title">${esc(title)}</p>
  <p class="form-sub">We reply on WhatsApp during business hours. No spam, ever.</p>
  <div class="field"><label for="${id}-name">Your name</label><input id="${id}-name" name="name" autocomplete="name" required maxlength="80" placeholder="e.g. Wanjiru Kamau" aria-describedby="${id}-status"></div>
  <div class="field"><label for="${id}-phone">WhatsApp / phone</label><input id="${id}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="20" placeholder="0712 345 678 or +44 7700 900123" aria-describedby="${id}-phone-hint ${id}-status"><small class="hint" id="${id}-phone-hint">Kenyan or international number, with country code if outside Kenya.</small></div>
  <div class="field"><label for="${id}-biz">Business name <span class="opt">(optional)</span></label><input id="${id}-biz" name="business" autocomplete="organization" maxlength="100" placeholder="e.g. Lanet Hardware"></div>
  <div class="row2">
    <div class="field"><label for="${id}-svc">I need help with</label><select id="${id}-svc" name="service"><option>Not sure yet — advise me</option>${opts}</select></div>
    <div class="field"><label for="${id}-bud">Monthly budget</label><select id="${id}-bud" name="budget"><option>Under KES 10,000</option><option selected>KES 10,000 – 30,000</option><option>KES 30,000 – 60,000</option><option>KES 60,000 – 150,000</option><option>KES 150,000+ / international</option></select></div>
  </div>
  ${compact ? '' : `<div class="field"><label for="${id}-msg">Your biggest marketing goal <span class="opt">(optional)</span></label><textarea id="${id}-msg" name="message" rows="3" maxlength="600" placeholder="e.g. More walk-ins to our Nakuru shop"></textarea></div>`}
  <div class="hp" aria-hidden="true"><label for="${id}-web">Leave this empty</label><input id="${id}-web" name="website" tabindex="-1" autocomplete="off"></div>
  <label class="consent" for="${id}-consent"><input type="checkbox" id="${id}-consent" name="consent" required><span>I agree to be contacted about my enquiry, per the <a href="/privacy-policy/">Privacy Policy</a>.</span></label>
  <button class="btn btn-solid btn-block" type="submit">${waIcon}<span>Send & chat on WhatsApp</span></button>
  <p class="form-status" id="${id}-status" role="status" aria-live="polite"></p>
</form>
<div class="form-done" hidden tabindex="-1">
  <p class="form-title">${icon('check')} Almost done</p>
  <p>Tap the button to send your details to us on WhatsApp. We reply during business hours, ${esc(site.hoursText.split(' (')[0])} ${esc(site.timezoneLabel)}.</p>
  <a class="btn btn-solid btn-block done-wa" href="${wa('Hi Steff Cloud!')}" target="_blank" rel="noopener" data-track="whatsapp">${waIcon}<span>Open WhatsApp</span></a>
  <p class="done-alt">No WhatsApp? Call or text <b class="sel">${esc(site.phone)}</b> or email <b class="sel">${esc(site.email)}</b>.</p>
  <button class="link-btn done-reset" type="button">Send another enquiry</button>
</div>
</div>`;
}

export function mapEmbed(wide = false) {
  return `<div class="map${wide ? ' wide' : ''}" data-map-src="https://www.google.com/maps?q=Emboita+Nakuru+Solai+Road&amp;output=embed">
  <div class="map-ph">${icon('pin')}<p><b>${esc(site.address.street)}</b><br>Nakuru, Kenya</p>
  <div class="map-actions"><button class="btn btn-solid btn-sm map-load" type="button">Show map</button><a class="btn btn-line btn-sm" href="${mapsLink}" target="_blank" rel="noopener">Open in Google Maps</a></div>
  <small>The map is provided by Google, which may set cookies when you load it.</small></div>
</div>`;
}

export function ctaBand({ title = 'Ready to be impossible to ignore?', text = 'Book a free 30-minute growth audit. Walk away with a clear plan, whether you hire us or not.' } = {}) {
  return `<section class="cta-band"><div class="wrap">
  <h2>${title}</h2><p>${esc(text)}</p>
  <div class="btns"><a class="btn btn-accent" href="/free-audit/">Get my free audit ${icon('arrow')}</a>
  <a class="btn btn-inv-line" href="${wa('Hi Steff Cloud, I would like to grow my business with digital marketing.')}" target="_blank" rel="noopener" data-track="whatsapp">${waIcon}<span>WhatsApp us</span></a></div>
</div></section>`;
}

export function serviceCard(s) {
  return `<a class="svc-card" href="/services/${s.slug}/">
  <span class="svc-num" aria-hidden="true">${s.num}</span>${icon(s.icon, 'svc-ic')}
  <h3>${esc(s.name)}</h3><p>${esc(s.hook)}</p>
  <span class="svc-foot"><span>From ${money(s.from)}<small>${esc(s.unit)}</small></span>${icon('arrow')}</span>
</a>`;
}

export function postCard(p) {
  return `<a class="post-card" href="/blog/${p.slug}/" data-cat="${esc(p.category)}">
  <span class="tag">${esc(p.category)}</span>
  <h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
  <span class="meta">${fmtDate(p.date)} · ${p.minutes} min read</span>
</a>`;
}

export const fmtDate = (d) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export function currencySelect(id) {
  return `<label class="cur" for="${id}">${icon('globe')}<span class="sr">Currency</span><select id="${id}" class="cur-select">${Object.keys(site.currencies)
    .map((c) => `<option value="${c}">${c}</option>`)
    .join('')}</select></label>`;
}

// ---------- Layout ----------
const brandMark = (cls = '') => `<span class="brand-mark ${cls}" role="img" aria-label="Steff Cloud"></span>`;

function header(current) {
  const item = (href, ic, title, sub) => `<li><a href="${href}">${icon(ic)}<span><b>${esc(title)}</b><small>${esc(sub)}</small></span></a></li>`;
  const megas = {
    services: services.map((s) => item(`/services/${s.slug}/`, s.icon, s.short, s.hook)).join(''),
    industries: industries.map((i) => item(`/industries/${i.slug}/`, i.icon, i.name, i.hook)).join(''),
    resources: [
      item('/academy/', 'spark', 'Free Academy course', 'Learn digital marketing in 5 modules, free'),
      item('/blog/', 'chat', 'Blog & guides', 'Practical lessons for Kenyan businesses'),
      ...tools.map((t) => item(`/tools/${t.slug}/`, t.icon, t.name, t.hook)),
      item('/learn/digital-marketing-glossary/', 'search', 'Glossary', '44 marketing terms explained simply'),
      item('/digital-marketing-agency-nakuru/', 'pin', 'Nakuru agency', 'Why Nakuru businesses grow with us'),
    ].join(''),
  };
  const links = nav
    .map((n) => {
      const active = current && current !== '/' && current.startsWith(n.href) ? ' aria-current="page"' : '';
      if (n.mega)
        return `<li class="has-mega"><a href="${n.href}"${active}>${n.label}</a><div class="mega"><ul>${megas[n.mega]}</ul></div></li>`;
      return `<li><a href="${n.href}"${active}>${n.label}</a></li>`;
    })
    .join('');
  return `<div class="topbar"><div class="wrap"><span class="dot" aria-hidden="true"></span><span class="tb-long">${esc(site.topbar.text)}</span><span class="tb-short">Free growth audit</span><a href="${site.topbar.href}">${esc(site.topbar.cta)} ${icon('arrow')}</a><span class="tb-phone">${icon('phone')}<a href="tel:${site.phoneE164}">${esc(site.phone)}</a></span></div></div>
<header class="site-header"><div class="wrap">
  <a class="brand" href="/" aria-label="Steff Cloud digital marketing, home">${brandMark()}<span class="brand-tag" aria-hidden="true">digital<br>marketing</span></a>
  <nav class="main-nav" aria-label="Main"><ul>${links}</ul></nav>
  <div class="hdr-cta">
    <button class="icon-btn theme-btn" type="button" aria-label="Switch to dark theme">${icon('moon', 'i-moon')}${icon('sun', 'i-sun')}</button>
    <a class="btn btn-accent btn-sm hdr-audit" href="/free-audit/">Free audit ${icon('arrow')}</a>
    <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">${icon('menu')}</button>
  </div>
</div>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile" hidden><ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}<li><a href="/academy/">Free Academy</a></li><li><a href="/tools/">Free tools</a></li>${services
    .map((s) => `<li class="sub"><a href="/services/${s.slug}/">${esc(s.short)}</a></li>`)
    .join('')}</ul><a class="btn btn-accent btn-block" href="/free-audit/">Get my free audit</a></nav>
</header>`;
}

function cookieUi() {
  return `<div class="cookie" id="cookie-banner" role="region" aria-label="Cookie consent" hidden>
  <p class="cookie-h">${icon('cookie')} Your privacy, your choice</p>
  <p>We use essential storage to run this site. With your permission we also use analytics and marketing cookies to improve it and measure our ads. Read the <a href="/cookie-policy/">Cookie Policy</a>.</p>
  <div class="cookie-btns"><button class="btn btn-inv btn-sm" type="button" data-consent="all">Accept all</button><button class="btn btn-inv-line btn-sm" type="button" data-consent="none">Reject all</button><button class="link-btn inv" type="button" data-consent="customize">Customise</button></div>
</div>
<dialog class="cookie-dlg" id="cookie-dialog" aria-labelledby="cookie-dlg-title">
  <form method="dialog" class="cookie-form">
    <p class="form-title" id="cookie-dlg-title">Cookie preferences</p>
    <p class="muted">Choose which optional cookies we may use. You can change this any time from “Cookie settings” in the footer.</p>
    <div class="ck-row"><div><b>Strictly necessary</b><span>Remembers your cookie, theme and currency choices. Always on.</span></div><input type="checkbox" checked disabled aria-label="Strictly necessary, always on"></div>
    <div class="ck-row"><div><label for="ck-analytics"><b>Analytics</b></label><span>Google Analytics 4 tells us which pages help visitors most. IP addresses are anonymised.</span></div><input type="checkbox" id="ck-analytics" name="analytics"></div>
    <div class="ck-row"><div><label for="ck-marketing"><b>Marketing</b></label><span>Lets Meta and Google measure our ads and show you relevant offers.</span></div><input type="checkbox" id="ck-marketing" name="marketing"></div>
    <div class="cookie-btns"><button class="btn btn-solid btn-sm" value="save" type="submit">Save choices</button><button class="btn btn-line btn-sm" value="all" type="submit">Accept all</button></div>
  </form>
</dialog>`;
}

// One-line footer name, sized so the text fills the width with the logo's full stop in orange.
const FNAME_H = 54, FNAME_Y = 51, FNAME_DOT = 8, FNAME_W = 1000 - FNAME_DOT * 2 - 8;

function footer() {
  const col = (title, items) =>
    `<div class="f-col"><p class="f-h">${title}</p><ul>${items.map(([n, h]) => `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ul></div>`;
  const socials = site.socials.length
    ? `<ul class="socials">${site.socials.map((s) => `<li><a href="${s.url}" rel="noopener me" target="_blank">${esc(s.label)}</a></li>`).join('')}</ul>`
    : '';
  return `<footer class="site-footer">
<div class="wrap">
  <div class="f-top">
    <div class="f-grid">
    <div class="f-brand">
      <span class="logo-mark" role="img" aria-label="Steff Cloud, Creative Agency, established 2026"></span>
      <p>Digital marketing that brings real clients, not just likes. Based in Nakuru, serving Kenya and the world.</p>
      <p class="open-status" data-open-status><span class="dot" aria-hidden="true"></span><span class="os-text">Mon–Sat, 8am–6pm ${esc(site.timezoneLabel)}</span></p>
      <ul class="f-contact">
        <li>${icon('phone')}<a href="tel:${site.phoneE164}">${esc(site.phone)}</a></li>
        <li>${icon('mail')}<a href="mailto:${site.email}">${esc(site.email)}</a></li>
        <li>${icon('pin')}<span>${esc(site.address.street)}, ${esc(site.address.locality)}, Kenya</span></li>
        <li>${icon('clock')}<span>${esc(site.hoursText)}</span></li>
      </ul>${socials}
    </div>
    ${col('Services', services.map((s) => [s.short, `/services/${s.slug}/`]))}
    ${col('Industries', industries.map((i) => [i.name, `/industries/${i.slug}/`]))}
    ${col('Company', [['About', '/about/'], ['Pricing', '/pricing/'], ['Nakuru agency', '/digital-marketing-agency-nakuru/'], ['International clients', '/international/'], ['Free audit', '/free-audit/'], ['Contact', '/contact/'], ['FAQ', '/faq/'], ['Steff Cloud main site', site.mainSite]])}
    ${col('Resources', [['Free Academy', '/academy/'], ['Free tools', '/tools/'], ['Marketing grader', '/tools/marketing-grader/'], ['WhatsApp link generator', '/tools/whatsapp-link-generator/'], ['Blog', '/blog/'], ['Glossary', '/learn/digital-marketing-glossary/']])}
    <div class="f-col"><p class="f-h">Legal</p><ul>${[['Privacy Policy', '/privacy-policy/'], ['Terms of Service', '/terms/'], ['Cookie Policy', '/cookie-policy/'], ['Refund Policy', '/refund-policy/'], ['Disclaimer', '/disclaimer/'], ['Accessibility', '/accessibility/'], ['Legal Notice', '/legal-notice/']]
      .map(([n, h]) => `<li><a href="${h}">${n}</a></li>`)
      .join('')}<li><button class="link-btn inv" type="button" data-open-cookies>Cookie settings</button></li></ul></div>
    </div>
    <p class="f-jp" lang="ja" aria-label="${esc(site.japaneseName)}: Steff Cloud in Japanese">${site.japaneseName}</p>
  </div>
  <svg class="f-name" viewBox="0 0 1000 ${FNAME_H}" role="img" aria-label="${esc(site.legalName.toUpperCase())}">
    <text x="0" y="${FNAME_Y}" textLength="${FNAME_W}" lengthAdjust="spacingAndGlyphs">STEFF CLOUD LIMITED</text><circle class="f-dot" cx="${1000 - FNAME_DOT}" cy="${FNAME_Y - FNAME_DOT}" r="${FNAME_DOT}"/>
  </svg>
  <div class="f-bottom"><p>© ${new Date().getFullYear()} ${esc(site.legalName)}. All rights reserved.</p>${currencySelect('cur-footer')}<p>Made with intent in Nakuru, Kenya</p></div>
</div>
</footer>
<div class="m-bar"><a href="${wa('Hi Steff Cloud, I want more customers. Can we talk?')}" target="_blank" rel="noopener" data-track="whatsapp">${waIcon}WhatsApp</a><a href="tel:${site.phoneE164}" data-track="call">${icon('phone')}Call</a><a class="hl" href="/free-audit/">Free audit</a></div>
<a class="wa-float" href="${wa('Hi Steff Cloud, I want more customers. Can we talk?')}" target="_blank" rel="noopener" aria-label="Chat with Steff Cloud on WhatsApp" data-track="whatsapp">${waIcon}</a>
${cookieUi()}`;
}

function clientConfig() {
  return {
    wa: site.whatsapp,
    phone: site.phone,
    ga4: site.ga4,
    metaPixel: site.metaPixel,
    formEndpoint: site.formEndpoint,
    tz: site.timezone,
    currencies: site.currencies,
  };
}

export function page({ path, title, description, body, schema = [], type = 'website', image = '/assets/img/og-default.jpg', noindex = false, extraHead = '' }) {
  const canonical = abs(path);
  const ld = [orgSchema(), ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`).join('\n');
  return `<!doctype html>
<html lang="en-KE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<script>${themeBoot}</script>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}">
<link rel="alternate" hreflang="en-KE" href="${canonical}">
<link rel="alternate" hreflang="en" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<meta name="geo.region" content="KE-31">
<meta name="geo.placename" content="Nakuru">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">
<meta name="author" content="${esc(site.legalName)}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="format-detection" content="telephone=no">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f5f4f0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0e0e0d" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en_KE">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(image)}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Steff Cloud logo with the line: Digital marketing that sells.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(image)}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="Steff Cloud Digital Marketing Blog" href="/blog/feed.xml">
<link rel="preload" href="/assets/fonts/unbounded-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css?v=${assetVersion.css}">
${extraHead}
${ld}
<script type="application/json" id="sc-config">${JSON.stringify(clientConfig()).replace(/</g, '\\u003c')}</script>
<script src="/assets/js/main.js?v=${assetVersion.js}" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
}
