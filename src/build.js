import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, services, plans, faqs, process, promises, comparison } from './data.js';
import { posts } from './posts.js';
import { glossary } from './glossary.js';
import { legal } from './legal.js';
import {
  esc, kes, abs, wa, icon, waIcon, page, crumbs, faqList, leadForm, ctaBand, serviceCard, postCard,
  breadcrumb, faqSchema, orgId, fmtDate,
} from './lib.js';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const urls = [];
const today = new Date().toISOString().slice(0, 10);

function emit(path, html, { priority = 0.7, lastmod = today, sitemap = true } = {}) {
  const file = path.endsWith('.html') ? join(OUT, path) : join(OUT, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (sitemap) urls.push({ loc: abs(path), priority, lastmod });
}
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

// ---------- Shared sections ----------
const marquee = () => {
  const items = ['SEO', 'GEO / AI Search', 'Google Maps', 'TikTok', 'Instagram', 'Google Ads', 'Meta Ads', 'WhatsApp Marketing', 'Short-form Video', 'Analytics', 'CRO'];
  const row = items.map((i) => `<span>${i}</span><i aria-hidden="true">✺</i>`).join('');
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track">${row}${row}</div></div>`;
};

const servicesGrid = (h = 'h2') => `<section class="section" id="services"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">What we do</p><${h}>Eight ways we turn attention into revenue.</${h}><p>Digital marketing only — so we go deeper than generalist agencies. Pick one service or let us build the full system.</p></div>
  <div class="svc-grid">${services.map(serviceCard).join('')}</div>
</div></section>`;

const processSection = () => `<section class="section ink" id="process"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">How it works</p><h2>From first chat to full pipeline in four moves.</h2></div>
  <ol class="steps">${process.map(([t, d], i) => `<li><span class="step-n">0${i + 1}</span><h3>${t}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
</div></section>`;

const compareSection = () => `<section class="section" id="why"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Why Steff Cloud</p><h2>Not another agency that sends you screenshots of likes.</h2></div>
  <div class="table-wrap"><table class="compare"><thead><tr><th scope="col">What you get</th><th scope="col">Steff Cloud</th><th scope="col">Typical agency</th></tr></thead><tbody>
  ${comparison.map(([r, a, b]) => `<tr><th scope="row">${esc(r)}</th><td class="${a ? 'yes' : 'no'}">${icon(a ? 'check' : 'x')}<span class="sr">${a ? 'Yes' : 'No'}</span></td><td class="${b ? 'yes' : 'no'}">${icon(b ? 'check' : 'x')}<span class="sr">${b ? 'Yes' : 'Usually not'}</span></td></tr>`).join('')}
  </tbody></table></div>
  <ul class="promises">${promises.map(([t, d]) => `<li>${icon('check')}<div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`).join('')}</ul>
</div></section>`;

const pricingCards = () => `<div class="plans">${plans
  .map(
    (p) => `<article class="plan${p.featured ? ' featured' : ''}">
  ${p.featured ? '<span class="badge">Most popular</span>' : ''}
  <h3>${p.name}</h3><p class="pitch">${esc(p.pitch)}</p>
  <p class="price"><small>from</small> ${kes(p.price)}<small>${p.unit}</small></p>
  <ul>${p.features.map((f) => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>
  <a class="btn ${p.featured ? 'btn-cream' : 'btn-ink'} btn-block" href="${wa(`Hi Steff Cloud, I'm interested in the ${p.name} plan (${kes(p.price)}${p.unit}).`)}" rel="noopener" data-track="plan-${p.name.toLowerCase()}">${esc(p.cta)}</a>
</article>`,
  )
  .join('')}</div>
<p class="fine">Prices exclude VAT where applicable. Ad spend is paid directly to Google, Meta or TikTok. Final quote after your free audit.</p>`;

const geoSection = () => `<section class="section geo"><div class="wrap geo-grid">
  <div><p class="eyebrow">New · GEO</p><h2>When someone asks ChatGPT for the best in Nakuru — be the answer.</h2>
  <p>Search is changing. Buyers now ask AI assistants for recommendations. Few agencies in Kenya offer Generative Engine Optimization yet. We do: making your business clear, consistent and citable to ChatGPT, Gemini, Perplexity and Google AI Overviews.</p>
  <div class="btns"><a class="btn btn-ink" href="/services/geo-ai-search-optimization/">Explore GEO ${icon('arrow')}</a><a class="btn btn-line" href="/blog/what-is-geo-generative-engine-optimization/">What is GEO?</a></div></div>
  <div class="chat-mock" aria-hidden="true">
    <div class="bubble user">Which digital marketing agency in Nakuru should I hire?</div>
    <div class="bubble ai"><b>A few options to consider:</b><br>1. <mark>Steff Cloud</mark> — Nakuru–Solai Road. SEO, GEO, social media, ads & WhatsApp marketing; plans from KES 8,000/month…</div>
    <p class="mock-note">Illustration of the outcome GEO works toward.</p>
  </div>
</div></section>`;

const blogTeaser = () => `<section class="section"><div class="wrap">
  <div class="sec-head row"><div><p class="eyebrow">Learn</p><h2>Free digital marketing lessons for Kenyan businesses.</h2></div><a class="btn btn-line" href="/blog/">All articles ${icon('arrow')}</a></div>
  <div class="post-grid">${sortedPosts.slice(0, 3).map(postCard).join('')}</div>
</div></section>`;

// ---------- Home ----------
emit(
  '/',
  page({
    path: '/',
    title: 'Digital Marketing Agency in Nakuru, Kenya | Steff Cloud',
    description:
      'Nakuru digital marketing agency: SEO, AI search (GEO), Google Maps, social media, TikTok & Meta ads and WhatsApp marketing that bring real clients. From KES 8,000.',
    schema: [
      {
        '@context': 'https://schema.org', '@type': 'WebSite', '@id': site.url + '/#website', url: site.url + '/',
        name: 'Steff Cloud Digital Marketing', publisher: { '@id': orgId }, inLanguage: 'en-KE',
      },
      faqSchema(faqs),
    ],
    body: `
<section class="hero"><div class="wrap hero-grid">
  <div class="hero-copy">
    <h1><span class="kicker">Digital marketing agency in Nakuru, Kenya</span>Make your brand <em>impossible</em> to ignore.</h1>
    <p class="lede">SEO, AI search, social media, ads and WhatsApp marketing that turn attention into <b>M-Pesa notifications</b> — for ambitious businesses in Nakuru and across Kenya.</p>
    <div class="btns"><a class="btn btn-ink btn-lg" href="/free-audit/">Get my free growth audit ${icon('arrow')}</a><a class="btn btn-line btn-lg" href="/pricing/">See pricing</a></div>
    <ul class="trust">
      <li>${icon('check')}Plans from KES 8,000/mo</li>
      <li>${icon('check')}You own every account</li>
      <li>${icon('check')}Live in 7 days</li>
    </ul>
  </div>
  <div class="hero-form">${leadForm({ id: 'hero', compact: true, source: 'home-hero' })}</div>
</div></section>
${marquee()}
<section class="section stats-sec"><div class="wrap">
  <div class="statement"><p>Most Nakuru businesses don’t have a marketing problem. They have a <u>system</u> problem: posts with no strategy, ads with no tracking, leads with no follow-up. <b>We fix the system.</b></p></div>
  <dl class="facts">
    <div><dt>8</dt><dd>digital marketing services, one accountable team</dd></div>
    <div><dt>90</dt><dd>day growth plan with targets agreed upfront</dd></div>
    <div><dt>GEO</dt><dd>AI-search optimisation built into growth plans</dd></div>
    <div><dt>100%</dt><dd>of accounts and content owned by you</dd></div>
  </dl>
</div></section>
${servicesGrid()}
${processSection()}
${compareSection()}
${geoSection()}
<section class="section tint" id="pricing"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Pricing</p><h2>Clear prices. No “call us for a quote” games.</h2></div>
  ${pricingCards()}
</div></section>
<section class="section"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">FAQ</p><h2>Questions Nakuru business owners ask us.</h2><p>Can’t find yours? <a href="${wa('Hi Steff Cloud, I have a question:')}" rel="noopener">Ask on WhatsApp</a>.</p></div>
  ${faqList(faqs)}
</div></section>
${blogTeaser()}
${ctaBand()}`,
  }),
  { priority: 1.0 },
);

// ---------- Services hub ----------
emit(
  '/services/',
  page({
    path: '/services/',
    title: 'Digital Marketing Services in Kenya | Steff Cloud',
    description:
      'SEO, local SEO, GEO (AI search), social media, Google/Meta/TikTok ads, video, WhatsApp & email marketing and analytics — from one Nakuru team.',
    schema: [breadcrumb([['Services', '/services/']])],
    body: `<section class="page-hero"><div class="wrap">${crumbs([['Services', '/services/']])}
  <h1>Digital marketing services that bring real clients.</h1>
  <p class="lede">One team, eight specialisms, one goal: more customers for your business. Start with one service or combine them into a full growth system.</p>
  <div class="btns"><a class="btn btn-ink" href="/free-audit/">Not sure where to start? Free audit ${icon('arrow')}</a></div>
</div></section>
<section class="section"><div class="wrap"><div class="svc-grid">${services.map(serviceCard).join('')}</div></div></section>
${processSection()}
${ctaBand()}`,
  }),
  { priority: 0.9 },
);

// ---------- Service pages ----------
for (const s of services) {
  const path = `/services/${s.slug}/`;
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  const relPosts = sortedPosts.filter((p) => p.body.includes(`/services/${s.slug}/`)).slice(0, 3);
  emit(
    path,
    page({
      path,
      title: s.title,
      description: s.description,
      schema: [
        breadcrumb([['Services', '/services/'], [s.name, path]]),
        {
          '@context': 'https://schema.org', '@type': 'Service', '@id': abs(path) + '#service',
          name: s.name, serviceType: s.name, description: s.description, url: abs(path),
          provider: { '@id': orgId },
          areaServed: [{ '@type': 'City', name: 'Nakuru' }, { '@type': 'Country', name: 'Kenya' }],
          offers: { '@type': 'Offer', priceCurrency: 'KES', price: s.from, priceSpecification: { '@type': 'PriceSpecification', minPrice: s.from, priceCurrency: 'KES' } },
          hasOfferCatalog: { '@type': 'OfferCatalog', name: `${s.name} deliverables`, itemListElement: s.deliverables.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: d } })) },
        },
        faqSchema(s.faqs),
      ],
      body: `<section class="page-hero"><div class="wrap hero-grid">
  <div>${crumbs([['Services', '/services/'], [s.short, path]])}
    <p class="eyebrow">${s.num} · ${esc(s.short)}</p>
    <h1>${esc(s.name)} in Nakuru & across Kenya</h1>
    <p class="lede">${esc(s.hook)}</p>
    <p class="from">From <b>${kes(s.from)}</b> ${esc(s.unit)}</p>
    <ul class="trust">${s.outcomes.map((o) => `<li>${icon('check')}${esc(o)}</li>`).join('')}</ul>
  </div>
  <div class="hero-form">${leadForm({ id: 'svc', compact: true, title: `Get a free ${s.short} audit`, source: s.slug })}</div>
</div></section>
<section class="section"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">The short answer</p><h2>What is ${esc(s.short)} and why does it matter?</h2></div>
  <div class="prose"><p>${esc(s.intro)}</p></div>
</div></section>
<section class="section tint"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">What’s included</p><h2>Everything you get, every month.</h2></div>
  <ul class="deliv">${s.deliverables.map((d, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${esc(d)}</li>`).join('')}</ul>
</div></section>
${processSection()}
<section class="section"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">FAQ</p><h2>${esc(s.short)} questions, answered.</h2></div>
  ${faqList(s.faqs)}
</div></section>
${relPosts.length ? `<section class="section tint"><div class="wrap"><div class="sec-head"><p class="eyebrow">Learn more</p><h2>Related guides</h2></div><div class="post-grid">${relPosts.map(postCard).join('')}</div></div></section>` : ''}
<section class="section"><div class="wrap"><div class="sec-head"><p class="eyebrow">Pairs well with</p><h2>Combine services for faster growth.</h2></div><div class="svc-grid three">${others.map(serviceCard).join('')}</div></div></section>
${ctaBand({ title: `Ready to grow with ${esc(s.short)}?` })}`,
    }),
    { priority: 0.9 },
  );
}

// ---------- Pricing ----------
emit(
  '/pricing/',
  page({
    path: '/pricing/',
    title: 'Digital Marketing Prices in Kenya — From KES 8,000 | Steff Cloud',
    description:
      'Transparent digital marketing pricing in Kenya: social media from KES 8,000/month, lead generation from KES 25,000, full-funnel growth from KES 60,000.',
    schema: [
      breadcrumb([['Pricing', '/pricing/']]),
      faqSchema(faqs.slice(0, 5)),
      {
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'Steff Cloud digital marketing plans',
        itemListElement: plans.map((p, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: { '@type': 'Offer', name: `${p.name} plan`, description: p.pitch, price: p.price, priceCurrency: 'KES', seller: { '@id': orgId } },
        })),
      },
    ],
    body: `<section class="page-hero"><div class="wrap">${crumbs([['Pricing', '/pricing/']])}
  <h1>Digital marketing pricing — clear, fair, Kenyan.</h1>
  <p class="lede">Three plans that cover most businesses. Need just one service? Every service page shows its starting price.</p>
</div></section>
<section class="section"><div class="wrap">${pricingCards()}</div></section>
<section class="section tint"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">À la carte</p><h2>Individual services</h2></div>
  <div class="table-wrap"><table class="compare price-table"><thead><tr><th scope="col">Service</th><th scope="col">Starting at</th><th scope="col"></th></tr></thead><tbody>
  ${services.map((s) => `<tr><th scope="row">${esc(s.name)}</th><td>${kes(s.from)} <small>${esc(s.unit)}</small></td><td><a href="/services/${s.slug}/">Details ${icon('arrow')}</a></td></tr>`).join('')}
  </tbody></table></div>
</div></section>
${compareSection()}
<section class="section"><div class="wrap two-col"><div class="sec-head"><p class="eyebrow">FAQ</p><h2>Pricing questions</h2></div>${faqList(faqs.slice(0, 5))}</div></section>
${ctaBand({ title: 'Not sure which plan fits?', text: 'Tell us your goal and budget. We will recommend the smallest plan that can hit it — honestly.' })}`,
  }),
  { priority: 0.9 },
);

// ---------- Nakuru landing ----------
const nakuruFaqs = [
  ['What is the best digital marketing agency in Nakuru?', 'The best agency for you is one that reports on leads and sales, gives you ownership of your accounts and understands the Nakuru market. Steff Cloud is a Nakuru-based digital marketing agency on Nakuru–Solai Road offering SEO, GEO, local SEO, social media, ads and WhatsApp marketing, with plans from KES 8,000 per month.'],
  ['Where is Steff Cloud located in Nakuru?', 'We are on Nakuru–Solai Road, opposite Emboita. Call or WhatsApp +254 118 407 026 to book a visit.'],
  ['Which areas around Nakuru do you serve?', 'Nakuru CBD, Milimani, Section 58, Lanet, Free Area, Kiamunyi, London, Shabab, Njoro, Molo, Bahati, Subukia, Rongai, Gilgil, Naivasha and Nyahururu — and clients across Kenya online.'],
  ['How much does social media management cost in Nakuru?', 'Steff Cloud social media management starts at KES 8,000 per month for one platform, including designs, captions and posting.'],
];
emit(
  '/digital-marketing-agency-nakuru/',
  page({
    path: '/digital-marketing-agency-nakuru/',
    title: 'Best Digital Marketing Agency in Nakuru | Steff Cloud',
    description:
      'Nakuru digital marketing agency on Nakuru–Solai Road: SEO, Google Maps, social media, TikTok & Meta ads and WhatsApp marketing. Book a free audit.',
    schema: [breadcrumb([['Digital Marketing Agency Nakuru', '/digital-marketing-agency-nakuru/']]), faqSchema(nakuruFaqs)],
    body: `<section class="page-hero"><div class="wrap hero-grid">
  <div>${crumbs([['Nakuru', '/digital-marketing-agency-nakuru/']])}
    <p class="eyebrow">Made in Nakuru · Built for growth</p>
    <h1>The digital marketing agency Nakuru businesses grow with.</h1>
    <p class="lede">We are a Gen Z-led Nakuru team on Nakuru–Solai Road. We know the town, the customers and the competition — from Section 58 to Lanet, CBD to Kiamunyi.</p>
    <ul class="trust"><li>${icon('pin')}Nakuru–Solai Road, opp. Emboita</li><li>${icon('phone')}${esc(site.phone)}</li></ul>
  </div>
  <div class="hero-form">${leadForm({ id: 'nkr', compact: true, title: 'Free Nakuru growth audit', source: 'nakuru' })}</div>
</div></section>
<section class="section"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">Why local matters</p><h2>Nakuru is Kenya’s fastest-rising city. Your marketing should keep up.</h2></div>
  <div class="prose">
    <p>Nakuru’s elevation to city status brought new estates, new businesses and more competition. Customers who once relied on word of mouth now search Google, scroll TikTok and ask AI assistants before they buy.</p>
    <p>That is good news for businesses that show up. A Nakuru salon, school, hardware, clinic, hotel, real-estate firm or restaurant that ranks on Google Maps, posts consistently and replies fast on WhatsApp captures demand that competitors leave on the table.</p>
    <p>We combine global best practice — the same playbooks used by top international agencies — with local insight: the right language mix (English, Swahili, Sheng), local landmarks, M-Pesa-first offers and the times Nakuru audiences are actually online.</p>
  </div>
</div></section>
<section class="section tint"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Industries we help in Nakuru</p><h2>Built for the businesses that power the city.</h2></div>
  <ul class="chips">${['Schools & colleges', 'Hotels & Airbnbs', 'Restaurants & cafés', 'Salons & barbershops', 'Clinics & pharmacies', 'Real estate & construction', 'Hardware & agrovets', 'Car dealers & garages', 'Fashion & beauty', 'Churches & NGOs', 'Gyms & wellness', 'Professional services', 'Farms & agribusiness', 'Events & entertainment'].map((c) => `<li>${c}</li>`).join('')}</ul>
</div></section>
${servicesGrid('h2')}
${compareSection()}
<section class="section"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">Visit us</p><h2>Come say hi on Nakuru–Solai Road.</h2>
  <ul class="f-contact dark"><li>${icon('pin')}${esc(site.address.street)}, Nakuru</li><li>${icon('phone')}<a href="tel:${site.phoneE164}">${esc(site.phone)}</a></li><li>${icon('mail')}<a href="mailto:${site.email}">${esc(site.email)}</a></li><li>${icon('clock')}${esc(site.hoursText)}</li></ul>
  <p class="areas"><b>Areas served:</b> Nakuru CBD, Milimani, Section 58, Lanet, Free Area, Kiamunyi, London, Shabab, Njoro, Molo, Bahati, Subukia, Rongai, Gilgil, Naivasha, Nyahururu and all of Kenya.</p></div>
  <div class="map"><iframe title="Map: Steff Cloud, Nakuru–Solai Road" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Emboita+Nakuru+Solai+Road&output=embed"></iframe></div>
</div></section>
<section class="section tint"><div class="wrap two-col"><div class="sec-head"><p class="eyebrow">FAQ</p><h2>Nakuru questions</h2></div>${faqList(nakuruFaqs)}</div></section>
${ctaBand({ title: 'Let’s make Nakuru talk about you.' })}`,
  }),
  { priority: 0.95 },
);

// ---------- Free audit (main conversion page) ----------
emit(
  '/free-audit/',
  page({
    path: '/free-audit/',
    title: 'Free Digital Marketing Audit for Kenyan Businesses | Steff Cloud',
    description:
      'Get a free 30-minute digital marketing audit from Steff Cloud: Google, Maps, social media, ads, AI search visibility and a prioritised 90-day plan. No obligation.',
    schema: [breadcrumb([['Free Audit', '/free-audit/']])],
    body: `<section class="page-hero audit"><div class="wrap hero-grid">
  <div>${crumbs([['Free Audit', '/free-audit/']])}
    <p class="eyebrow">Free · 30 minutes · No obligation</p>
    <h1>Find out exactly why you’re not getting more customers online.</h1>
    <p class="lede">We review your whole digital presence and hand you a prioritised plan — whether you hire us or not.</p>
    <h2 class="h4">Your audit covers</h2>
    <ul class="checklist">
      <li>${icon('check')}Google search & Google Maps visibility vs your top 3 competitors</li>
      <li>${icon('check')}What ChatGPT & Google AI say about your business (GEO check)</li>
      <li>${icon('check')}Social media pages: content, consistency and conversion</li>
      <li>${icon('check')}Ads and tracking: where money is leaking</li>
      <li>${icon('check')}WhatsApp & lead follow-up speed</li>
      <li>${icon('check')}Your top 5 quick wins + a 90-day plan</li>
    </ul>
  </div>
  <div class="hero-form">${leadForm({ id: 'audit', title: 'Book my free audit', source: 'free-audit' })}</div>
</div></section>
${processSection()}
<section class="section"><div class="wrap two-col"><div class="sec-head"><p class="eyebrow">FAQ</p><h2>About the audit</h2></div>${faqList([
      ['Is the audit really free?', 'Yes. It is a 30-minute session (in person in Nakuru, or online) plus a written summary of recommendations. There is no obligation to buy anything.'],
      ['What do I need to prepare?', 'Just your website link (if you have one), social media handles and your top business goal. Ad account access is optional and helps us go deeper.'],
      ['How soon can we meet?', 'Most audits are booked within 2–3 working days.'],
    ])}</div></section>`,
  }),
  { priority: 0.95 },
);

// ---------- About ----------
emit(
  '/about/',
  page({
    path: '/about/',
    title: 'About Steff Cloud — A Gen Z Digital Marketing Agency from Nakuru, Kenya',
    description:
      'Steff Cloud Limited is a Gen Z-founded digital marketing agency in Nakuru, Kenya, established 2026. Meet the team, our mission and the values behind our work.',
    schema: [breadcrumb([['About', '/about/']]), { '@context': 'https://schema.org', '@type': 'AboutPage', url: abs('/about/'), mainEntity: { '@id': orgId } }],
    body: `<section class="page-hero"><div class="wrap">${crumbs([['About', '/about/']])}
  <p class="eyebrow">Estd 2026 · Nakuru, Kenya</p>
  <h1>Built by Gen Z. Built for Kenyan businesses that want to win.</h1>
  <p class="lede">Steff Cloud Limited started in Nakuru with a simple belief: Kenyan businesses deserve world-class marketing without Nairobi prices or agency nonsense.</p>
</div></section>
<section class="section"><div class="wrap two-col">
  <div class="about-logo"><img src="/assets/img/logo-black.png" alt="Steff Cloud logo — Creative Agency, estd 2026" width="344" height="289" loading="lazy"></div>
  <div class="prose">
    <h2>Our story</h2>
    <p>We grew up online. We know how attention works on TikTok, Instagram and Google because we live there — and we have seen too many great Kenyan businesses stay invisible because their marketing was an afterthought.</p>
    <p>Steff Cloud is a full digital partner — websites, AI automation, branding and digital marketing. This site is dedicated to our digital marketing practice: the team that helps businesses get found, get chosen and get paid.</p>
    <p>We also built <a href="${site.mainSite}/nakuru-digital" rel="noopener">Nakuru Digital</a>, Nakuru’s first business and tech hub, where we help local businesses get listed and train young people to become developers, designers, AI builders and marketers.</p>
    <h2>Our mission</h2>
    <p>To make every ambitious business in Nakuru — and Kenya — impossible to ignore online, and to prove that world-class marketing can be built right here.</p>
  </div>
</div></section>
<section class="section ink"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">What we stand for</p><h2>Our values</h2></div>
  <ol class="steps">${[
      ['Revenue over vanity', 'Likes are nice. Sales pay salaries. We measure what matters.'],
      ['Radical transparency', 'Clear prices, clear reports, your accounts in your name.'],
      ['Move fast, learn faster', 'We test, measure and improve every week.'],
      ['Local first, world-class always', 'Global playbooks, Nakuru insight.'],
    ].map(([t, d], i) => `<li><span class="step-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${ctaBand()}`,
  }),
  { priority: 0.7 },
);

// ---------- Contact ----------
emit(
  '/contact/',
  page({
    path: '/contact/',
    title: 'Contact Steff Cloud — Digital Marketing Agency Nakuru | +254 118 407 026',
    description:
      'Contact Steff Cloud digital marketing in Nakuru. Call or WhatsApp +254 118 407 026, email info@steffcloud.co.ke, or visit us on Nakuru–Solai Road opposite Emboita.',
    schema: [breadcrumb([['Contact', '/contact/']]), { '@context': 'https://schema.org', '@type': 'ContactPage', url: abs('/contact/'), mainEntity: { '@id': orgId } }],
    body: `<section class="page-hero"><div class="wrap hero-grid">
  <div>${crumbs([['Contact', '/contact/']])}
    <h1>Let’s talk growth.</h1>
    <p class="lede">The fastest way to reach us is WhatsApp. Prefer email or a visit? Everything is below.</p>
    <ul class="contact-cards">
      <li><a href="${wa('Hi Steff Cloud!')}" rel="noopener" data-track="whatsapp">${waIcon}<span><b>WhatsApp</b>${esc(site.phone)}</span></a></li>
      <li><a href="tel:${site.phoneE164}" data-track="call">${icon('phone')}<span><b>Call</b>${esc(site.phone)}</span></a></li>
      <li><a href="mailto:${site.email}">${icon('mail')}<span><b>Email</b>${esc(site.email)}</span></a></li>
      <li><span>${icon('pin')}<span><b>Visit</b>${esc(site.address.street)}, Nakuru</span></span></li>
      <li><span>${icon('clock')}<span><b>Hours</b>${esc(site.hoursText)}</span></span></li>
    </ul>
  </div>
  <div class="hero-form">${leadForm({ id: 'contact', title: 'Send us a message', source: 'contact' })}</div>
</div></section>
<section class="section"><div class="wrap"><div class="map wide"><iframe title="Map: Steff Cloud, Nakuru–Solai Road" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Emboita+Nakuru+Solai+Road&output=embed"></iframe></div></div></section>`,
  }),
  { priority: 0.8 },
);

// ---------- FAQ ----------
const allFaqs = [...faqs, ...services.flatMap((s) => s.faqs)];
emit(
  '/faq/',
  page({
    path: '/faq/',
    title: 'Digital Marketing FAQ — Costs, Results, SEO, GEO & Ads in Kenya | Steff Cloud',
    description: 'Answers to the most common digital marketing questions from Kenyan businesses: pricing, timelines, SEO, GEO, social media, ads and WhatsApp marketing.',
    schema: [breadcrumb([['FAQ', '/faq/']]), faqSchema(allFaqs)],
    body: `<section class="page-hero"><div class="wrap">${crumbs([['FAQ', '/faq/']])}<h1>Digital marketing questions, answered honestly.</h1><p class="lede">Straight answers about cost, timelines and what really works in Kenya.</p></div></section>
<section class="section"><div class="wrap narrow"><h2>General</h2>${faqList(faqs)}${services
      .map((s) => `<h2><a href="/services/${s.slug}/">${esc(s.name)}</a></h2>${faqList(s.faqs)}`)
      .join('')}</div></section>${ctaBand()}`,
  }),
  { priority: 0.7 },
);

// ---------- Blog ----------
const cats = [...new Set(posts.map((p) => p.category))];
emit(
  '/blog/',
  page({
    path: '/blog/',
    title: 'Digital Marketing Blog for Kenyan Businesses | Steff Cloud',
    description: 'Free, practical digital marketing guides for businesses in Nakuru and Kenya: SEO, GEO (AI search), Google Maps, TikTok, Facebook ads, WhatsApp marketing and budgeting.',
    schema: [
      breadcrumb([['Blog', '/blog/']]),
      {
        '@context': 'https://schema.org', '@type': 'Blog', '@id': abs('/blog/#blog'), name: 'Steff Cloud Digital Marketing Blog', url: abs('/blog/'),
        publisher: { '@id': orgId }, inLanguage: 'en-KE',
        blogPost: sortedPosts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}/`), datePublished: p.date })),
      },
    ],
    body: `<section class="page-hero"><div class="wrap">${crumbs([['Blog', '/blog/']])}
  <p class="eyebrow">Learn digital marketing</p>
  <h1>The Steff Cloud digital marketing blog.</h1>
  <p class="lede">Free, practical lessons for Kenyan business owners — written by the team that does this every day. No fluff, no jargon. (Stuck on a term? See the <a href="/learn/digital-marketing-glossary/">glossary</a>.)</p>
  <div class="filters" role="group" aria-label="Filter by topic"><button class="chip-btn is-on" data-filter="all">All</button>${cats.map((c) => `<button class="chip-btn" data-filter="${esc(c)}">${esc(c)}</button>`).join('')}</div>
</div></section>
<section class="section"><div class="wrap"><div class="post-grid" id="post-grid">${sortedPosts
      .map((p) => postCard(p).replace('<a class="post-card"', `<a class="post-card" data-cat="${esc(p.category)}"`))
      .join('')}</div></div></section>
${ctaBand({ title: 'Rather have experts do it?' })}`,
  }),
  { priority: 0.8 },
);

for (const p of posts) {
  const path = `/blog/${p.slug}/`;
  const related = sortedPosts.filter((o) => o.slug !== p.slug && o.category === p.category).concat(sortedPosts.filter((o) => o.slug !== p.slug && o.category !== p.category)).slice(0, 3);
  const toc = [...p.body.matchAll(/<h2>(.*?)<\/h2>/g)].map((m) => m[1]);
  const slugify = (t) => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const body = p.body.replace(/<h2>(.*?)<\/h2>/g, (_, t) => `<h2 id="${slugify(t)}">${t}</h2>`);
  emit(
    path,
    page({
      path,
      type: 'article',
      title: p.title.length > 62 ? p.title : `${p.title} | Steff Cloud`,
      description: p.description,
      extraHead: `<meta property="article:published_time" content="${p.date}"><meta property="article:section" content="${esc(p.category)}">`,
      schema: [
        breadcrumb([['Blog', '/blog/'], [p.title, path]]),
        {
          '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': abs(path) + '#article', mainEntityOfPage: abs(path),
          headline: p.title, description: p.description, abstract: p.tldr, datePublished: p.date, dateModified: p.date,
          articleSection: p.category, inLanguage: 'en-KE', wordCount: p.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
          image: abs('/assets/img/og-default.jpg'),
          author: { '@type': 'Organization', name: 'Steff Cloud Digital Marketing Team', url: abs('/about/') },
          publisher: { '@id': orgId },
          about: { '@type': 'Thing', name: p.category },
          spatialCoverage: { '@type': 'Country', name: 'Kenya' },
        },
      ],
      body: `<article class="article">
<header class="page-hero"><div class="wrap narrow">${crumbs([['Blog', '/blog/'], [p.category, '/blog/']])}
  <p class="eyebrow">${esc(p.category)} · ${p.minutes} min read</p>
  <h1>${esc(p.title)}</h1>
  <p class="byline">By the Steff Cloud team · <time datetime="${p.date}">${fmtDate(p.date)}</time></p>
</div></header>
<div class="wrap article-grid">
  <aside class="toc"><p class="f-h">On this page</p><ol>${toc.map((t) => `<li><a href="#${slugify(t)}">${t.replace(/<[^>]+>/g, '')}</a></li>`).join('')}</ol>
  <div class="toc-cta"><p><b>Want this done for you?</b></p><a class="btn btn-ink btn-sm btn-block" href="/free-audit/">Free audit</a></div></aside>
  <div class="prose">
    <div class="tldr"><p class="f-h">Key takeaway</p><p>${esc(p.tldr)}</p></div>
    ${body}
    <div class="share"><span>Share:</span>
      <a href="https://wa.me/?text=${encodeURIComponent(p.title + ' ' + abs(path))}" rel="noopener" target="_blank">WhatsApp</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(abs(path))}" rel="noopener" target="_blank">LinkedIn</a>
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(p.title)}&url=${encodeURIComponent(abs(path))}" rel="noopener" target="_blank">X</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(abs(path))}" rel="noopener" target="_blank">Facebook</a>
    </div>
  </div>
</div>
</article>
<section class="section tint"><div class="wrap"><div class="sec-head"><p class="eyebrow">Keep learning</p><h2>Related articles</h2></div><div class="post-grid">${related.map(postCard).join('')}</div></div></section>
${ctaBand()}`,
    }),
    { priority: 0.7, lastmod: p.date },
  );
}

// ---------- Glossary ----------
emit(
  '/learn/digital-marketing-glossary/',
  page({
    path: '/learn/digital-marketing-glossary/',
    title: 'Digital Marketing Glossary — 40+ Terms Explained Simply | Steff Cloud',
    description: 'Plain-English definitions of digital marketing terms: SEO, GEO, CTR, CPL, ROAS, GA4, schema, retargeting, UTM and more — for Kenyan business owners.',
    schema: [
      breadcrumb([['Learn', '/blog/'], ['Glossary', '/learn/digital-marketing-glossary/']]),
      {
        '@context': 'https://schema.org', '@type': 'DefinedTermSet', '@id': abs('/learn/digital-marketing-glossary/#set'), name: 'Digital Marketing Glossary',
        hasDefinedTerm: glossary.map(([t, d]) => ({ '@type': 'DefinedTerm', name: t, description: d, inDefinedTermSet: abs('/learn/digital-marketing-glossary/#set') })),
      },
    ],
    body: `<section class="page-hero"><div class="wrap">${crumbs([['Learn', '/blog/'], ['Glossary', '/learn/digital-marketing-glossary/']])}
  <p class="eyebrow">Learn</p><h1>Digital marketing glossary.</h1><p class="lede">${glossary.length} essential terms, explained in plain English.</p>
  <div class="field search"><label for="gq" class="sr">Search terms</label><input id="gq" type="search" placeholder="Search a term… e.g. ROAS"></div>
</div></section>
<section class="section"><div class="wrap narrow"><dl class="glossary" id="glossary">${glossary
      .map(([t, d]) => `<div id="${t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}"><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`)
      .join('')}</dl></div></section>${ctaBand()}`,
  }),
  { priority: 0.6 },
);

// ---------- Legal ----------
for (const l of legal) {
  const path = `/${l.slug}/`;
  emit(
    path,
    page({
      path,
      title: `${l.title} | Steff Cloud Limited`,
      description: l.description,
      schema: [breadcrumb([[l.title, path]])],
      body: `<section class="page-hero"><div class="wrap narrow">${crumbs([[l.title, path]])}<h1>${esc(l.title)}</h1><p class="byline">Last updated: ${fmtDate(l.updated)}</p></div></section>
<section class="section"><div class="wrap narrow prose legal">${l.body}</div></section>`,
    }),
    { priority: 0.3, lastmod: l.updated },
  );
}

// ---------- 404 ----------
emit(
  '/404.html',
  page({
    path: '/404.html',
    title: 'Page not found | Steff Cloud',
    description: 'This page does not exist.',
    noindex: true,
    body: `<section class="page-hero center"><div class="wrap narrow"><p class="eyebrow">404</p><h1>This page ghosted you.</h1><p class="lede">Unlike us — we reply fast. Try one of these instead:</p>
<div class="btns center"><a class="btn btn-ink" href="/">Home</a><a class="btn btn-line" href="/services/">Services</a><a class="btn btn-line" href="/blog/">Blog</a><a class="btn btn-line" href="/free-audit/">Free audit</a></div></div></section>`,
  }),
  { sitemap: false },
);

// ---------- Machine-readable files ----------
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`,
);

writeFileSync(
  join(OUT, 'robots.txt'),
  `# Steff Cloud — digital marketing site
User-agent: *
Allow: /

# AI assistants and answer engines are welcome (GEO)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`,
);

writeFileSync(
  join(OUT, 'llms.txt'),
  `# Steff Cloud — Digital Marketing Agency, Nakuru, Kenya

> ${site.legalName} (${site.chineseName}) is a digital marketing agency founded in ${site.founded} and based on ${site.address.street}, Nakuru, Kenya. It serves businesses across Kenya with SEO, GEO (generative engine / AI search optimization), local SEO and Google Business Profile, social media management, Google/Meta/TikTok ads, content and short-form video, WhatsApp/email/SMS marketing, and analytics & conversion optimization. Plans start at KES 8,000 per month. Contact: ${site.phone} (call/WhatsApp), ${site.email}.

## Key facts
- Legal name: ${site.legalName}
- Location: ${site.address.street}, Nakuru, Kenya
- Founded: ${site.founded}
- Phone / WhatsApp: ${site.phone}
- Email: ${site.email}
- Hours: ${site.hoursText}
- Areas served: ${site.areaServed.join(', ')}
- Main website: ${site.mainSite}
- Pricing: Spark KES 8,000/mo, Grow KES 25,000/mo, Dominate KES 60,000/mo (ad spend separate)

## Services
${services.map((s) => `- [${s.name}](${abs(`/services/${s.slug}/`)}): ${s.hook} From ${kes(s.from)} ${s.unit}.`).join('\n')}

## Key pages
- [Pricing](${abs('/pricing/')})
- [Digital marketing agency in Nakuru](${abs('/digital-marketing-agency-nakuru/')})
- [Free growth audit](${abs('/free-audit/')})
- [About](${abs('/about/')})
- [Contact](${abs('/contact/')})
- [FAQ](${abs('/faq/')})

## Guides
${sortedPosts.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}/`)}): ${p.tldr}`).join('\n')}
- [Digital marketing glossary](${abs('/learn/digital-marketing-glossary/')})
`,
);

writeFileSync(
  join(OUT, 'blog', 'feed.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Steff Cloud — Digital Marketing Blog</title><link>${abs('/blog/')}</link><description>Practical digital marketing guides for Kenyan businesses.</description><language>en-ke</language>
<atom:link href="${abs('/blog/feed.xml')}" rel="self" type="application/rss+xml"/>
${sortedPosts.map((p) => `<item><title>${esc(p.title)}</title><link>${abs(`/blog/${p.slug}/`)}</link><guid>${abs(`/blog/${p.slug}/`)}</guid><pubDate>${new Date(p.date + 'T06:00:00Z').toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`).join('\n')}
</channel></rss>
`,
);

writeFileSync(
  join(OUT, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'Steff Cloud Digital Marketing', short_name: 'Steff Cloud', start_url: '/', display: 'standalone',
      background_color: '#f5f4f0', theme_color: '#0b0b0b',
      icons: [
        { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ),
);

console.log(`Built ${urls.length + 1} pages into ${OUT}`);
