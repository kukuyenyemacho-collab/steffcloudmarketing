import { site } from './data.js';

const contact = `<p><b>${site.legalName}</b><br>${site.address.street}, ${site.address.locality}, Kenya<br>Phone/WhatsApp: <a href="tel:${site.phoneE164}">${site.phone}</a><br>Email: <a href="mailto:${site.email}">${site.email}</a></p>`;

export const legal = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    updated: '2026-10-04',
    description: 'How Steff Cloud Limited collects, uses and protects personal data under the Kenya Data Protection Act, 2019.',
    body: `
<p>${site.legalName} (“Steff Cloud”, “we”, “us”) respects your privacy. This policy explains how we collect, use, share and protect personal data when you use this website or our digital marketing services, in line with the <b>Kenya Data Protection Act, 2019</b> and its regulations.</p>

<h2>1. Who we are</h2>
<p>${site.legalName} is the data controller for personal data collected through this website. Contact us about privacy at:</p>${contact}

<h2>2. Data we collect</h2>
<ul>
  <li><b>Information you give us:</b> name, phone/WhatsApp number, email, business name, service interest, budget range and any message you send through our forms, WhatsApp, phone or email.</li>
  <li><b>Client account data:</b> when you become a client, access details and data you share for the purpose of delivering services (e.g. analytics, ad accounts, customer lists).</li>
  <li><b>Technical data:</b> IP address, browser type, device, pages visited and referring source, collected through cookies and analytics tools only where you consent (see our <a href="/cookie-policy/">Cookie Policy</a>).</li>
</ul>

<h2>3. How we use your data and our lawful basis</h2>
<ul>
  <li>To respond to your enquiry and provide a quote or audit — <i>steps prior to entering a contract / your consent</i>.</li>
  <li>To deliver, manage and bill our services — <i>performance of a contract</i>.</li>
  <li>To send marketing about our services — <i>your consent</i>, which you can withdraw at any time.</li>
  <li>To improve our website and measure campaign performance — <i>consent (cookies) and legitimate interests</i>.</li>
  <li>To comply with tax, accounting and other legal obligations — <i>legal obligation</i>.</li>
</ul>

<h2>4. Sharing your data</h2>
<p>We do not sell personal data. We share it only with service providers who help us operate — such as WhatsApp/Meta, Google Workspace, hosting, form-processing and analytics providers — under appropriate confidentiality and data-protection terms, or where required by law.</p>

<h2>5. International transfers</h2>
<p>Some providers process data outside Kenya. Where this happens we rely on safeguards permitted under the Data Protection Act, such as adequate protection, contractual safeguards or your consent.</p>

<h2>6. How long we keep data</h2>
<p>Enquiry data is kept for up to 24 months after our last contact unless you become a client. Client records are kept for the duration of the engagement and up to 7 years afterwards for legal and tax purposes. Data is then deleted or anonymised.</p>

<h2>7. Your rights</h2>
<p>Under the Data Protection Act, 2019 you have the right to: be informed of how your data is used; access your data; object to processing, including direct marketing; correct false or misleading data; delete false, misleading or unlawfully processed data; and data portability. To exercise these rights, contact us using the details above. We will respond within the timelines set by law. You may also lodge a complaint with the <b>Office of the Data Protection Commissioner (ODPC)</b> at <a href="https://www.odpc.go.ke" rel="noopener">www.odpc.go.ke</a>.</p>

<h2>8. Security</h2>
<p>We use reasonable technical and organisational measures — including access controls, encrypted connections and least-privilege access to client accounts — to protect personal data. No method of transmission over the internet is 100% secure.</p>

<h2>9. Children</h2>
<p>This website and our services are intended for businesses and adults. We do not knowingly collect data from children under 18.</p>

<h2>10. Client data we process for you</h2>
<p>When we run campaigns using your customer data (e.g. email or WhatsApp lists), you remain the data controller and we act as your data processor. You confirm you have a lawful basis, including consent for direct marketing, to share that data with us.</p>

<h2>11. Changes</h2>
<p>We may update this policy. The “last updated” date shows when it last changed.</p>`,
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    updated: '2026-10-04',
    description: 'The terms that govern use of this website and digital marketing services provided by Steff Cloud Limited.',
    body: `
<p>These Terms of Service govern your use of this website and any digital marketing services provided by ${site.legalName} (“Steff Cloud”). By using the website or engaging our services, you agree to these terms. A signed proposal or service agreement takes precedence where it conflicts with these terms.</p>

<h2>1. Services</h2>
<p>We provide digital marketing services including SEO, GEO, local SEO, social media management, paid advertising management, content and video, WhatsApp/email/SMS marketing, and analytics. The scope, deliverables and fees for each client are set out in a written proposal or invoice.</p>

<h2>2. Fees and payment</h2>
<ul>
  <li>Monthly fees are payable in advance, in Kenya Shillings, via M-Pesa, bank transfer or card.</li>
  <li>Prices on this website are starting prices and may exclude VAT where applicable.</li>
  <li>Advertising spend is separate from our management fee and is paid directly to the ad platform or reimbursed as agreed.</li>
  <li>Work may be paused if an invoice is more than 7 days overdue.</li>
</ul>

<h2>3. Term and cancellation</h2>
<p>Unless otherwise agreed, retainers have an initial 3-month growth period, then continue month to month. Either party may cancel after the initial period with 14 days’ written notice (WhatsApp or email is fine).</p>

<h2>4. Your responsibilities</h2>
<ul>
  <li>Provide timely access, approvals, brand assets and accurate information.</li>
  <li>Ensure that products, offers and claims you ask us to promote are lawful and truthful.</li>
  <li>Have a lawful basis, including consent, for any customer data you share for marketing.</li>
</ul>

<h2>5. Results</h2>
<p>We commit to doing the agreed work professionally and transparently. Because search engines, AI assistants and ad platforms are controlled by third parties, we cannot guarantee specific rankings, mentions, reach or sales. Any targets we share are good-faith estimates.</p>

<h2>6. Ownership</h2>
<p>Once paid for, final content and creative produced for you belongs to you. Ad accounts, pages and analytics properties are owned by you. We retain ownership of our internal templates, tools and know-how, and may show non-confidential work in our portfolio unless you ask us not to.</p>

<h2>7. Third-party platforms</h2>
<p>Use of Google, Meta, TikTok, WhatsApp and other platforms is subject to their own terms. We are not responsible for platform outages, policy changes, account restrictions or algorithm changes, though we will help you resolve them.</p>

<h2>8. Limitation of liability</h2>
<p>To the extent permitted by law, our total liability for any claim is limited to the fees you paid us in the 3 months before the claim. We are not liable for indirect or consequential losses, including lost profits.</p>

<h2>9. Website use</h2>
<p>Content on this website is for general information and does not constitute professional advice for your specific situation. Do not copy our content without permission.</p>

<h2>10. Governing law</h2>
<p>These terms are governed by the laws of Kenya. Disputes will first be addressed in good-faith discussion and, failing that, by the courts of Kenya.</p>

<h2>11. Contact</h2>${contact}`,
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    updated: '2026-10-04',
    description: 'How the Steff Cloud website uses cookies and how you can control them.',
    body: `
<p>This Cookie Policy explains how ${site.legalName} uses cookies and similar technologies on this website.</p>
<h2>What are cookies?</h2>
<p>Cookies are small text files stored on your device that help websites work and understand how they are used.</p>
<h2>Cookies we use</h2>
<ul>
  <li><b>Strictly necessary:</b> remember your cookie choice. These do not require consent.</li>
  <li><b>Analytics (optional):</b> if enabled and you accept, Google Analytics 4 helps us understand which pages are useful and which channels bring visitors. Analytics loads only after you click “Accept”.</li>
  <li><b>Embedded content:</b> the Google Maps embed on some pages may set cookies controlled by Google.</li>
</ul>
<h2>Managing cookies</h2>
<p>You can change your choice at any time by clearing this site’s data in your browser, which will show the banner again. You can also block cookies in your browser settings.</p>
<h2>Contact</h2>${contact}`,
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    updated: '2026-10-04',
    description: 'Refund and cancellation terms for Steff Cloud Limited digital marketing services.',
    body: `
<p>We want you to be happy with our work. This policy explains how refunds work for ${site.legalName} digital marketing services.</p>
<h2>Monthly retainers</h2>
<ul>
  <li>If you cancel before work for a paid month has started, we refund that month in full.</li>
  <li>Once work for a month has started, fees for that month are non-refundable, but you keep all work delivered.</li>
  <li>If we fail to deliver agreed deliverables for a month, we will either complete them promptly or refund the undelivered portion on a pro-rata basis.</li>
</ul>
<h2>Once-off projects</h2>
<p>Deposits secure your slot and cover initial strategy work. If you cancel a project, we refund any amount paid beyond the value of work completed to date.</p>
<h2>Ad spend</h2>
<p>Ad spend paid to Google, Meta, TikTok or other platforms is governed by those platforms and cannot be refunded by us. Unspent ad budget held by us on your behalf is refunded in full.</p>
<h2>How to request a refund</h2>
<p>Email or WhatsApp us with your invoice number. We respond within 3 working days, and approved refunds are paid within 14 days via the original payment method where possible.</p>
<h2>Contact</h2>${contact}`,
  },
];
