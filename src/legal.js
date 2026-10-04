import { site } from './data.js';

const UPDATED = '2026-10-04';
const ids = site.legalIds || {};
const contact = `<p><b>${site.legalName}</b><br>${site.address.street}, ${site.address.locality}, ${site.address.region}, Kenya<br>Phone/WhatsApp: <a href="tel:${site.phoneE164}">${site.phone}</a><br>Email: <a href="mailto:${site.email}">${site.email}</a></p>`;

export const legal = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    updated: UPDATED,
    description: 'How Steff Cloud Limited collects, uses and protects personal data under the Kenya Data Protection Act 2019 and, for international visitors, the EU/UK GDPR.',
    body: `
<p>${site.legalName} (“Steff Cloud”, “we”, “us”) respects your privacy. This policy explains how we collect, use, share and protect personal data when you use this website or our digital marketing services. It is written to comply with the <b>Kenya Data Protection Act, 2019</b> and the Data Protection (General) Regulations, 2021, and, where they apply to visitors and clients in the European Economic Area or the United Kingdom, the <b>EU GDPR</b> and <b>UK GDPR</b>.</p>

<h2 id="controller">1. Who we are</h2>
<p>${site.legalName} is the data controller for personal data collected through this website. For any privacy question or request, contact us at:</p>${contact}

<h2 id="data">2. Data we collect</h2>
<ul>
  <li><b>Information you give us:</b> name, phone/WhatsApp number, email, business name, service interest, budget range and any message you send through our forms, WhatsApp, phone or email.</li>
  <li><b>Client account data:</b> when you become a client, access details and data you share so we can deliver services (for example analytics, ad accounts or customer lists).</li>
  <li><b>Technical data:</b> IP address, browser type, device, pages visited and referring source. Optional analytics and marketing cookies collect this only after you consent (see our <a href="/cookie-policy/">Cookie Policy</a>).</li>
  <li><b>Preferences stored on your device:</b> your cookie choice, theme (light/dark) and currency. These stay in your browser and are not sent to us.</li>
</ul>
<p>We do not knowingly collect sensitive personal data (such as health, religion or biometric data) and ask you not to send it to us.</p>

<h2 id="use">3. How we use your data and our lawful basis</h2>
<ul>
  <li>To respond to your enquiry and provide a quote or audit: <i>steps prior to entering a contract, or your consent</i>.</li>
  <li>To deliver, manage and bill our services: <i>performance of a contract</i>.</li>
  <li>To send marketing about our services: <i>your consent</i>, which you can withdraw at any time by replying “STOP” or contacting us.</li>
  <li>To measure and improve our website and campaigns: <i>your consent</i> (cookies) and our <i>legitimate interests</i>.</li>
  <li>To keep the website secure and prevent spam or fraud (for example, hidden form fields that catch bots): <i>legitimate interests</i>.</li>
  <li>To comply with tax, accounting and other legal obligations: <i>legal obligation</i>.</li>
</ul>
<p>We do not make decisions about you based solely on automated processing that produce legal or similarly significant effects.</p>

<h2 id="whatsapp">4. Enquiries sent through WhatsApp</h2>
<p>When you submit a form on this site, your details are placed in a WhatsApp message that you choose to send. WhatsApp is operated by Meta and its own privacy policy applies to that message. If we have configured a form service, a copy of your enquiry is also sent to that service so we do not miss it.</p>

<h2 id="sharing">5. Sharing your data</h2>
<p>We do not sell or rent personal data. We share it only with service providers who help us operate, such as WhatsApp/Meta, Google Workspace, our hosting provider, form-processing and analytics providers, under confidentiality and data-protection terms, or where the law requires it.</p>

<h2 id="transfers">6. International transfers</h2>
<p>Some providers store or process data outside Kenya (for example in the EU or the USA). Where this happens we rely on the safeguards allowed by section 48 of the Data Protection Act, 2019, such as appropriate contractual safeguards or your consent, and for EEA/UK data on adequacy decisions or standard contractual clauses.</p>

<h2 id="retention">7. How long we keep data</h2>
<p>Enquiry data is kept for up to 24 months after our last contact unless you become a client. Client records are kept for the duration of the engagement and up to 7 years afterwards for legal and tax purposes. Data is then deleted or anonymised.</p>

<h2 id="rights">8. Your rights</h2>
<p>Under the Data Protection Act, 2019 you have the right to be informed of how your data is used, to access your data, to object to processing (including direct marketing), to correct false or misleading data, to have false, misleading or unlawfully processed data deleted, and to data portability. If you are in the EEA or UK you also have the rights to restrict processing and to withdraw consent at any time.</p>
<p>To exercise any right, contact us using the details above. We may ask you to confirm your identity. We respond within the time limits set by law and free of charge, unless a request is manifestly unfounded or excessive.</p>
<p>You may complain to the <b>Office of the Data Protection Commissioner (ODPC)</b> in Kenya at <a href="https://www.odpc.go.ke" target="_blank" rel="noopener">www.odpc.go.ke</a>, or to your local supervisory authority if you are in the EEA or UK.</p>

<h2 id="gpc">9. Do Not Track and Global Privacy Control</h2>
<p>If your browser sends a Global Privacy Control (GPC) signal, we treat it as a refusal of marketing cookies. Analytics remains off unless you choose to turn it on.</p>

<h2 id="security">10. Security</h2>
<p>We protect personal data with technical and organisational measures, including HTTPS everywhere, a strict Content-Security-Policy, access controls, least-privilege access to client accounts and two-factor authentication on our business accounts. No method of transmission over the internet is completely secure; if a breach affects your data we will notify you and the ODPC as the law requires.</p>

<h2 id="children">11. Children</h2>
<p>This website and our services are intended for businesses and adults. We do not knowingly collect data from children under 18.</p>

<h2 id="processor">12. Client data we process for you</h2>
<p>When we run campaigns using your customer data (for example email or WhatsApp lists), you remain the data controller and we act as your data processor under a written agreement. You confirm you have a lawful basis, including consent for direct marketing, to share that data with us.</p>

<h2 id="changes">13. Changes</h2>
<p>We may update this policy. The “last updated” date shows when it last changed, and we will highlight significant changes on this page.</p>`,
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    updated: UPDATED,
    description: 'Which cookies and similar technologies the Steff Cloud website uses, why, and how to change your choices.',
    body: `
<p>This Cookie Policy explains how ${site.legalName} uses cookies and similar technologies (such as browser local storage) on this website, and how you can control them.</p>

<h2>What are cookies?</h2>
<p>Cookies are small files stored on your device that help websites work and understand how they are used. Local storage works in a similar way but the data stays on your device.</p>

<h2>Your choices</h2>
<p>When you first visit, a banner lets you <b>accept all</b>, <b>reject all</b> or <b>customise</b> optional cookies. Optional cookies never load before you agree. Rejecting is as easy as accepting. You can change your mind at any time:</p>
<p><button class="btn btn-solid btn-sm" type="button" data-open-cookies>Open cookie settings</button></p>

<h2>What we use</h2>
<div class="table-wrap" tabindex="0" role="region" aria-label="Cookies used on this site"><table class="compare legal-table">
<thead><tr><th scope="col">Name</th><th scope="col">Category</th><th scope="col">Purpose</th><th scope="col">Duration</th></tr></thead>
<tbody>
<tr><th scope="row"><code>sc-consent</code> (local storage)</th><td>Strictly necessary</td><td>Remembers your cookie choices</td><td>12 months</td></tr>
<tr><th scope="row"><code>sc-theme</code> (local storage)</th><td>Strictly necessary</td><td>Remembers light or dark theme</td><td>Until cleared</td></tr>
<tr><th scope="row"><code>sc-currency</code> (local storage)</th><td>Strictly necessary</td><td>Remembers your price currency</td><td>Until cleared</td></tr>
<tr><th scope="row"><code>_ga</code>, <code>_ga_*</code></th><td>Analytics (optional)</td><td>Google Analytics 4: counts visits and shows which pages are useful. IP addresses are anonymised.</td><td>Up to 2 years</td></tr>
<tr><th scope="row"><code>_fbp</code></th><td>Marketing (optional)</td><td>Meta Pixel: measures the results of our Facebook and Instagram ads</td><td>3 months</td></tr>
<tr><th scope="row">Google Maps</th><td>Third-party content</td><td>Loads only when you click “Show map”; Google may set its own cookies</td><td>Set by Google</td></tr>
</tbody></table></div>
<p>Analytics and marketing tools are only active if we have switched them on for this site. We use Google Consent Mode, so Google tags respect your choice.</p>

<h2>Browser controls</h2>
<p>You can also block or delete cookies in your browser settings. Blocking strictly necessary storage may mean the banner appears on every visit.</p>

<h2>Contact</h2>${contact}`,
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    updated: UPDATED,
    description: 'The terms that govern use of this website and digital marketing services provided by Steff Cloud Limited to clients in Kenya and internationally.',
    body: `
<p>These Terms of Service govern your use of this website and any digital marketing services provided by ${site.legalName} (“Steff Cloud”). By using the website or engaging our services, you agree to these terms. A signed proposal or service agreement takes precedence where it conflicts with these terms.</p>

<h2>1. Services</h2>
<p>We provide digital marketing services including SEO, GEO, local SEO, social media management, paid advertising management, content and video, WhatsApp/email/SMS marketing, analytics and market-entry marketing for Kenya and East Africa. The scope, deliverables and fees for each client are set out in a written proposal or invoice.</p>

<h2>2. Fees and payment</h2>
<ul>
  <li>Monthly fees are payable in advance. Kenyan clients are invoiced in Kenya shillings; international clients may be invoiced in US dollars.</li>
  <li>We accept M-Pesa, bank transfer and card. Bank and transfer charges are paid by the sender.</li>
  <li>Prices on this website are starting prices and may exclude VAT where applicable. Converted prices shown in other currencies are approximate.</li>
  <li>Advertising spend is separate from our management fee and is paid directly to the ad platform or reimbursed as agreed.</li>
  <li>Work may be paused if an invoice is more than 7 days overdue.</li>
</ul>

<h2>3. Term and cancellation</h2>
<p>Unless otherwise agreed, retainers have an initial 3-month growth period and then continue month to month. Either party may cancel after the initial period with 14 days’ written notice (WhatsApp or email is fine). See our <a href="/refund-policy/">Refund Policy</a>.</p>

<h2>4. Your responsibilities</h2>
<ul>
  <li>Provide timely access, approvals, brand assets and accurate information.</li>
  <li>Ensure that products, offers and claims you ask us to promote are lawful and truthful, including under Kenya’s Consumer Protection Act, 2012 and the advertising rules of each platform.</li>
  <li>Have a lawful basis, including consent, for any customer data you share for marketing.</li>
</ul>

<h2>5. Results</h2>
<p>We commit to doing the agreed work professionally and transparently. Search engines, AI assistants and ad platforms are controlled by third parties, so we cannot guarantee specific rankings, mentions, reach or sales. Any targets or calculator results we share are good-faith estimates.</p>

<h2>6. Intellectual property</h2>
<p>Once paid for, final content and creative produced for you belongs to you. Ad accounts, pages and analytics properties are owned by you. We keep ownership of our internal templates, tools and know-how, and may show non-confidential work in our portfolio unless you ask us not to. The content, design and the Steff Cloud name and logo on this website belong to ${site.legalName}; do not copy them without permission.</p>

<h2>7. Confidentiality</h2>
<p>Each party keeps the other’s confidential information private and uses it only to perform the engagement. We are happy to sign a separate NDA.</p>

<h2>8. Acceptable use of this website</h2>
<p>Do not misuse the website, including by attempting to break its security, overload it, scrape it in bulk or send spam through its forms. To report a security issue see our <a href="/legal-notice/#security">security contact</a>.</p>

<h2>9. Third-party platforms</h2>
<p>Use of Google, Meta, TikTok, WhatsApp and other platforms is subject to their own terms. We are not responsible for their outages, policy changes, account restrictions or algorithm changes, though we will help you resolve them.</p>

<h2>10. Limitation of liability</h2>
<p>To the extent permitted by law, our total liability for any claim is limited to the fees you paid us in the 3 months before the claim. We are not liable for indirect or consequential losses, including lost profits. Nothing in these terms limits liability that cannot be limited by law.</p>

<h2>11. Electronic communication</h2>
<p>You agree that proposals, approvals and notices may be given electronically, including by email and WhatsApp, as recognised by the Kenya Information and Communications Act.</p>

<h2>12. Governing law</h2>
<p>These terms are governed by the laws of Kenya. Disputes will first be addressed in good-faith discussion, then by mediation, and failing that by the courts of Kenya. Consumers outside Kenya keep any mandatory rights their local law gives them.</p>

<h2>13. Contact</h2>${contact}`,
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    updated: UPDATED,
    description: 'Refund and cancellation terms for Steff Cloud Limited digital marketing services.',
    body: `
<p>We want you to be happy with our work. This policy explains how refunds work for ${site.legalName} digital marketing services.</p>
<h2>Monthly retainers</h2>
<ul>
  <li>If you cancel before work for a paid month has started, we refund that month in full.</li>
  <li>Once work for a month has started, fees for that month are non-refundable, but you keep all work delivered.</li>
  <li>If we fail to deliver agreed deliverables for a month, we will either complete them promptly or refund the undelivered portion pro rata.</li>
</ul>
<h2>Once-off projects</h2>
<p>Deposits secure your slot and cover initial strategy work. If you cancel a project, we refund any amount paid beyond the value of work completed to date.</p>
<h2>Ad spend</h2>
<p>Ad spend paid to Google, Meta, TikTok or other platforms is governed by those platforms and cannot be refunded by us. Unspent ad budget held by us on your behalf is refunded in full.</p>
<h2>How to request a refund</h2>
<p>Email or WhatsApp us with your invoice number. We respond within 3 working days, and approved refunds are paid within 14 days through the original payment method where possible. International refunds are paid in the invoice currency; transfer fees may apply.</p>
<h2>Contact</h2>${contact}`,
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    updated: UPDATED,
    description: 'Disclaimer for information, estimates and third-party links on the Steff Cloud website.',
    body: `
<h2>General information</h2>
<p>Articles, guides, glossary entries, calculators and other content on this website are for general information about digital marketing. They are not legal, financial or tax advice for your situation. Platform features, prices and rules change often, so check current details before acting.</p>
<h2>Estimates and examples</h2>
<p>Prices marked “from”, converted currency amounts, calculator outputs and illustrations (such as the example AI assistant answer on our home page) are estimates or examples, not offers or guarantees. Your quote is confirmed in writing after a free audit.</p>
<h2>No guaranteed results</h2>
<p>Search engines, AI assistants and ad platforms are run by third parties. We do not guarantee rankings, mentions, reach, leads or sales.</p>
<h2>Third-party links and trademarks</h2>
<p>We link to other websites for convenience and are not responsible for their content or privacy practices. Google, YouTube, Meta, Facebook, Instagram, WhatsApp, TikTok, ChatGPT, Gemini, Perplexity, Copilot, Claude and M-Pesa are trademarks of their respective owners. Mentioning them does not imply endorsement or partnership.</p>
<h2>Contact</h2>${contact}`,
  },
  {
    slug: 'accessibility',
    title: 'Accessibility Statement',
    updated: UPDATED,
    description: 'Steff Cloud’s commitment to an accessible website, the standard we follow and how to report a barrier.',
    body: `
<p>${site.legalName} wants everyone, including people with disabilities, to be able to use this website. We aim to meet the <b>Web Content Accessibility Guidelines (WCAG) 2.2, level AA</b>, in line with Kenya’s disability-rights laws and international good practice.</p>
<h2>What we have done</h2>
<ul>
  <li>Semantic HTML, one heading structure per page and a “Skip to content” link.</li>
  <li>Full keyboard navigation with visible focus outlines.</li>
  <li>Text and controls that meet colour-contrast requirements in both light and dark themes.</li>
  <li>Labels on every form field, clear error messages and status updates announced to screen readers.</li>
  <li>Respect for “reduce motion” settings: animations switch off automatically.</li>
  <li>Automated accessibility testing (axe-core) on every page at phone, tablet and desktop sizes before each release.</li>
</ul>
<h2>Known limitations</h2>
<p>The optional Google Maps embed is provided by Google and may not be fully accessible; the address is always available as text and through an “Open in Google Maps” link.</p>
<h2>Report a barrier</h2>
<p>If something on this site is hard to use, tell us and we will fix it or provide the information another way, usually within 5 working days.</p>${contact}`,
  },
  {
    slug: 'legal-notice',
    title: 'Legal Notice',
    updated: UPDATED,
    description: 'Company information, registered office and contact details for Steff Cloud Limited.',
    body: `
<h2>Company information</h2>
<p><b>${site.legalName}</b> (${site.japaneseName}), a private limited company incorporated in Kenya under the Companies Act, 2015. Established ${site.founded}.</p>
<ul>
  <li><b>Registered office:</b> ${site.address.street}, ${site.address.locality}, ${site.address.region}, Kenya</li>
  ${ids.registrationNo ? `<li><b>Company registration number:</b> ${ids.registrationNo}</li>` : ''}
  ${ids.kraPin ? `<li><b>KRA PIN:</b> ${ids.kraPin}</li>` : ''}
  ${ids.vatNo ? `<li><b>VAT number:</b> ${ids.vatNo}</li>` : ''}
  ${ids.odpcRegNo ? `<li><b>ODPC registration:</b> ${ids.odpcRegNo}</li>` : ''}
  <li><b>Phone/WhatsApp:</b> <a href="tel:${site.phoneE164}">${site.phone}</a></li>
  <li><b>Email:</b> <a href="mailto:${site.email}">${site.email}</a></li>
  <li><b>Main website:</b> <a href="${site.mainSite}" target="_blank" rel="noopener">${site.mainSite.replace('https://', '')}</a></li>
</ul>
<h2>Responsible for content</h2>
<p>The directors of ${site.legalName}, at the address above.</p>
<h2 id="security">Security</h2>
<p>If you find a security vulnerability on this website, please email <a href="mailto:${site.email}">${site.email}</a> with the subject “Security”. Give us reasonable time to fix it before disclosing it publicly. Our machine-readable contact is at <a href="/.well-known/security.txt">/.well-known/security.txt</a>.</p>
<h2>Related policies</h2>
<p><a href="/privacy-policy/">Privacy Policy</a> · <a href="/terms/">Terms of Service</a> · <a href="/cookie-policy/">Cookie Policy</a> · <a href="/refund-policy/">Refund Policy</a> · <a href="/disclaimer/">Disclaimer</a> · <a href="/accessibility/">Accessibility</a></p>`,
  },
];
