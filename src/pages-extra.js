import { site, plans } from './data.js';
import { esc, icon, wa, crumbs, faqList, leadForm, ctaBand, breadcrumb, faqSchema, orgId, abs } from './lib.js';

// Interactive budget planner for the pricing page. Opens with example numbers so it shows
// what it does before anyone types; main.js recalculates on input.
export function growthCalculator() {
  return `<section class="section" id="calculator"><div class="wrap calc-grid">
  <div class="sec-head"><p class="eyebrow">Growth calculator</p><h2>Work out your marketing budget in 20 seconds.</h2>
  <p>Enter what a customer is worth and how many new customers you want each month. We will estimate the leads you need, a starting ad budget and the plan that fits. The example numbers are a typical Nakuru retail business.</p></div>
  <form class="calc" id="calc" novalidate>
    <div class="calc-in">
      <div class="field"><label for="calc-value">Average sale value (KES)</label><input id="calc-value" name="value" type="number" inputmode="numeric" min="100" step="100" value="5000"></div>
      <div class="field"><label for="calc-customers">New customers wanted per month</label><input id="calc-customers" name="customers" type="number" inputmode="numeric" min="1" step="1" value="20"></div>
      <div class="field"><label for="calc-close">How many enquiries become customers?</label><select id="calc-close" name="close"><option value="0.1">About 1 in 10</option><option value="0.2">About 1 in 5</option><option value="0.25" selected>About 1 in 4</option><option value="0.33">About 1 in 3</option><option value="0.5">About 1 in 2</option></select></div>
    </div>
    <dl class="calc-out" aria-live="polite">
      <div><dt>Leads you need</dt><dd data-out="leads">80 / month</dd></div>
      <div><dt>Starting ad budget (estimate)</dt><dd data-out="ads">KES 12,000 – 36,000</dd></div>
      <div><dt>New revenue at target</dt><dd data-out="revenue">KES 100,000 / month</dd></div>
      <div class="calc-plan"><dt>Recommended plan</dt><dd data-out="plan">Grow</dd></div>
    </dl>
    <a class="btn btn-solid btn-block calc-cta" href="${wa('Hi Steff Cloud, I used your growth calculator and want to talk about a plan.')}" target="_blank" rel="noopener" data-track="calculator">${icon('arrow')}<span>Get this plan on WhatsApp</span></a>
    <p class="calc-note">Estimates assume a cost per lead of KES 150–450, which varies by industry, offer and season. We confirm real numbers in your free audit.</p>
  </form>
</div></section>`;
}

export function globalTeaser() {
  return `<section class="section global"><div class="wrap global-grid">
  <div><p class="eyebrow">Global clients</p><h2>Entering Kenya? We are your team on the ground.</h2>
  <p>International brands, NGOs and diaspora founders use Steff Cloud to reach Kenyan and East African customers: local language, local creators, M-Pesa-first offers and campaigns that respect Kenya’s data-protection law. We work in your time zone overlap, invoice in USD or KES, and report in English.</p>
  <div class="btns"><a class="btn btn-solid" href="/international/">Work with us from abroad ${icon('arrow')}</a></div></div>
  <ul class="global-list">
    <li><b>${esc(site.timezoneLabel)}</b><span>Overlaps with Europe all day and the US East Coast every morning</span></li>
    <li><b>USD or KES</b><span>Invoices by bank transfer, card or M-Pesa</span></li>
    <li><b>English &amp; Swahili</b><span>Copy, captions and voice-overs that sound local</span></li>
    <li><b>DPA 2019 &amp; GDPR aware</b><span>Consent-based data handling for Kenyan and EU audiences</span></li>
  </ul>
</div></section>`;
}

const intlFaqs = [
  ['Can you work with companies outside Kenya?', 'Yes. We work remotely with brands, NGOs and founders in Europe, North America, the Middle East and across Africa who want to reach Kenyan or East African customers. Strategy calls run on Google Meet or Zoom, and day-to-day work happens on WhatsApp, Slack or email.'],
  ['Which currency do you invoice in?', 'International clients can pay in US dollars or Kenya shillings by bank transfer or card. Kenyan clients usually pay in KES via M-Pesa or bank transfer.'],
  ['What time zone are you in?', `We are in ${site.timezoneLabel}. That gives a full working-day overlap with the UK and Europe, a morning overlap with the US East Coast, and an afternoon overlap with the Gulf and India.`],
  ['Do you sign NDAs and data-processing agreements?', 'Yes. We regularly sign NDAs, and we provide a data-processing agreement when we handle personal data on your behalf, covering both the Kenya Data Protection Act 2019 and, where it applies, the EU or UK GDPR.'],
  ['Why market in Kenya now?', 'Kenya combines high mobile and internet adoption, a young population, widespread mobile money and a growing middle class, and Nairobi is a regional hub for East Africa. Brands that build trust early, in local language and on local platforms, gain an advantage that is hard to copy later.'],
];

export function extraPages() {
  return [
    {
      path: '/international/',
      opts: { priority: 0.85 },
      page: {
        path: '/international/',
        title: 'Kenya Market Entry Marketing for International Brands | Steff Cloud',
        description:
          'Reach Kenyan and East African customers with a local digital marketing team: market research, localisation, social, ads, creators and SEO. USD invoicing.',
        schema: [
          breadcrumb([['International', '/international/']]),
          faqSchema(intlFaqs),
          {
            '@context': 'https://schema.org', '@type': 'Service', name: 'Kenya and East Africa market-entry digital marketing',
            serviceType: 'Market entry marketing', provider: { '@id': orgId }, url: abs('/international/'),
            areaServed: [{ '@type': 'Country', name: 'Kenya' }, { '@type': 'Place', name: 'East Africa' }],
            audience: { '@type': 'BusinessAudience', name: 'International brands, NGOs and diaspora founders' },
          },
        ],
        body: `<section class="page-hero"><div class="wrap hero-grid">
  <div>${crumbs([['International', '/international/']])}
    <p class="eyebrow">For international brands · NGOs · diaspora founders</p>
    <h1>Your Kenya marketing team, on the ground in the Rift Valley.</h1>
    <p class="lede">Launch or grow in Kenya and East Africa with a local team that knows the platforms, the language and the payment habits, and reports to you in clear English on your schedule.</p>
    <ul class="trust"><li>${icon('globe')}Remote-first, worldwide</li><li>${icon('clock')}${esc(site.timezoneLabel)}</li><li>${icon('shield')}NDA &amp; DPA ready</li></ul>
  </div>
  <div class="hero-form">${leadForm({ id: 'intl', compact: true, title: 'Plan your Kenya launch', source: 'international' })}</div>
</div></section>
<section class="section"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">Why a local team</p><h2>What global playbooks miss in Kenya.</h2></div>
  <div class="prose">
    <p>Kenyan buyers discover brands on TikTok, Instagram, Facebook and Google, ask questions on WhatsApp and pay with M-Pesa. Campaigns that work in London or Lagos often fall flat here because of tone, language, pricing or the checkout step.</p>
    <ul>
      <li><b>Language and tone.</b> We write in English, Swahili and Sheng, and know when each one fits.</li>
      <li><b>Local platforms and creators.</b> We brief and manage Kenyan creators and track the results.</li>
      <li><b>Payments and trust.</b> We design offers around M-Pesa, delivery expectations and social proof.</li>
      <li><b>Compliance.</b> We handle consent and direct marketing under the Kenya Data Protection Act 2019.</li>
    </ul>
  </div>
</div></section>
<section class="section tint"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">How we work with you</p><h2>A launch plan in four steps.</h2></div>
  <ol class="steps light">
    <li><span class="step-n">01</span><h3>Market scan</h3><p>Competitors, search demand, pricing and audience insights for your category in Kenya.</p></li>
    <li><span class="step-n">02</span><h3>Localise</h3><p>Messaging, creative and landing pages adapted for Kenyan buyers, in English and Swahili.</p></li>
    <li><span class="step-n">03</span><h3>Launch</h3><p>Google Business Profile, social, paid ads and creators, with tracking set up from day one.</p></li>
    <li><span class="step-n">04</span><h3>Report &amp; scale</h3><p>Weekly updates and a monthly dashboard in USD or KES. We scale the channels that pay back.</p></li>
  </ol>
</div></section>
<section class="section"><div class="wrap two-col"><div class="sec-head"><p class="eyebrow">FAQ</p><h2>Working with us from abroad</h2></div>${faqList(intlFaqs)}</div></section>
${ctaBand({ title: 'Let’s plan your Kenya launch.', text: 'Book a free 30-minute call. We will share what is working in your category in Kenya right now.' })}`,
      },
    },
  ];
}

export { plans };
