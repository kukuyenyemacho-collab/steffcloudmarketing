// Single source of truth for the Steff Cloud digital marketing site.
// Edit values here, then run `npm run build` to regenerate /public.

export const site = {
  name: 'Steff Cloud',
  legalName: 'Steff Cloud Limited',
  chineseName: '斯蒂夫云',
  // Canonical origin of THIS marketing site. Change if you deploy to a different domain.
  url: 'https://marketing.steffcloud.co.ke',
  mainSite: 'https://steffcloud.co.ke',
  founded: '2026',
  tagline: 'Digital marketing that brings real clients, not just likes.',
  phone: '+254 118 407 026',
  phoneE164: '+254118407026',
  whatsapp: '254118407026',
  email: 'info@steffcloud.co.ke',
  address: {
    street: 'Nakuru–Solai Road, opposite Emboita',
    locality: 'Nakuru',
    region: 'Nakuru County',
    postalCode: '20100',
    country: 'KE',
  },
  geo: { lat: -0.3031, lng: 36.08 },
  hours: 'Mo-Sa 08:00-18:00',
  hoursText: 'Mon – Sat, 8:00am – 6:00pm (WhatsApp replies 7 days)',
  areaServed: ['Nakuru', 'Naivasha', 'Nyahururu', 'Molo', 'Njoro', 'Gilgil', 'Eldoret', 'Kericho', 'Nairobi', 'Kenya'],
  // Add your profile URLs here; they power the footer icons and schema "sameAs".
  socials: [
    // { label: 'Instagram', url: 'https://instagram.com/...' },
  ],
  // Optional: a Formspree/Getform/Web3Forms endpoint. Empty = leads go straight to WhatsApp.
  formEndpoint: '',
  // Optional: Google Analytics 4 measurement ID, e.g. 'G-XXXXXXX'. Empty = no analytics loaded.
  ga4: '',
  topbar: {
    text: 'Free 30-minute growth audit for Kenyan businesses this month',
    cta: 'Claim yours',
    href: '/free-audit/',
  },
};

export const services = [
  {
    slug: 'seo',
    num: '01',
    name: 'Search Engine Optimization',
    short: 'SEO',
    icon: 'search',
    from: 15000,
    unit: '/month',
    hook: 'Rank on page one of Google for the searches that make you money.',
    title: 'SEO Services in Nakuru & Kenya — Rank #1 on Google | Steff Cloud',
    description:
      'Results-driven SEO in Nakuru and across Kenya. Technical SEO, content and link building that grows organic traffic, calls and sales. Free SEO audit.',
    intro:
      'Most buyers in Kenya start on Google. If you are not on page one, your competitor gets the call. Our SEO programme fixes what is holding your site back, publishes the content your customers are searching for, and earns the links that build authority — then reports every win in plain English.',
    deliverables: [
      'Full technical audit: speed, Core Web Vitals, indexing, mobile, schema',
      'Keyword research mapped to buying intent (not vanity traffic)',
      'On-page optimisation of titles, headings, internal links and copy',
      'Monthly SEO articles and service pages written for Kenyan searchers',
      'White-hat link building from Kenyan media, directories and partners',
      'Rank, traffic and lead tracking with a monthly video report',
    ],
    outcomes: ['More organic calls & WhatsApp chats', 'Lower cost per lead over time', 'An asset you own — not rented traffic'],
    faqs: [
      ['How long does SEO take to work in Kenya?', 'Low-competition local terms often move within 4–8 weeks. Competitive national keywords usually take 3–6 months. We show leading indicators (impressions, rankings, clicks) from month one so you are never guessing.'],
      ['Do you guarantee #1 rankings?', 'No honest agency can guarantee a position because Google controls the results. We guarantee the work: a documented plan, monthly deliverables and transparent reporting. Most clients see measurable ranking gains within 90 days.'],
      ['Do I need a new website for SEO?', 'Usually not. We optimise what you have. If your site is too slow or broken to rank, we will tell you honestly during the free audit.'],
    ],
  },
  {
    slug: 'local-seo',
    num: '02',
    name: 'Local SEO & Google Business Profile',
    short: 'Local SEO',
    icon: 'pin',
    from: 10000,
    unit: '/month',
    hook: 'Own the Google Map pack when people search “near me” in Nakuru.',
    title: 'Local SEO Nakuru — Google Maps & Google Business Profile Experts | Steff Cloud',
    description:
      'Get found on Google Maps in Nakuru. Google Business Profile optimisation, reviews strategy, local citations and “near me” SEO that drives calls and walk-ins.',
    intro:
      'When someone in Nakuru searches “salon near me”, “hardware Nakuru” or “best school in Nakuru”, Google shows three businesses on a map. Those three get most of the calls. Local SEO is how you become one of them — and stay there.',
    deliverables: [
      'Google Business Profile setup, verification and full optimisation',
      'Weekly Google posts, photos and product/service listings',
      'Review generation system (QR codes + WhatsApp scripts) and reply management',
      'Consistent NAP citations across Kenyan directories',
      'Location pages for every town you serve',
      'Call, direction-request and website-click tracking',
    ],
    outcomes: ['More calls & direction requests', 'More 5-star reviews', 'Top-3 map pack visibility'],
    faqs: [
      ['My business has no physical shop. Can I still rank on Maps?', 'Yes. Service-area businesses (plumbers, caterers, consultants) can hide their address and set a service area. We set this up correctly so you comply with Google’s guidelines.'],
      ['How do I get more Google reviews?', 'We give you a simple system: a QR code at your till, a WhatsApp message template after every sale, and fast, friendly replies. Consistency beats bursts.'],
    ],
  },
  {
    slug: 'geo-ai-search-optimization',
    num: '03',
    name: 'GEO — AI Search Optimization',
    short: 'GEO / AI Search',
    icon: 'spark',
    from: 20000,
    unit: '/month',
    hook: 'Be the business ChatGPT, Gemini and Google AI Overviews recommend.',
    title: 'GEO Agency Kenya — Get Recommended by ChatGPT | Steff Cloud',
    description:
      'Generative Engine Optimization (GEO) in Kenya. Get your business cited by ChatGPT, Google AI Overviews, Gemini, Perplexity and Copilot. GEO strategy built for Kenyan businesses.',
    intro:
      'Your customers now ask AI: “Which is the best digital marketing agency in Nakuru?” or “Where can I buy solar panels in Nakuru?” AI assistants answer with a few names. Generative Engine Optimization (GEO) is the discipline of making sure one of those names is yours — through structured data, citable content, brand mentions and entity building.',
    deliverables: [
      'AI visibility audit: what ChatGPT, Gemini, Perplexity & AI Overviews say about you today',
      'Entity building: consistent brand facts across the web, Wikidata-ready data, schema.org markup',
      'Answer-first content designed to be quoted by AI (FAQs, comparisons, how-tos, stats)',
      'llms.txt and AI-crawler-friendly site configuration',
      'Digital PR and mentions on sources AI models trust',
      'Monthly prompt tracking report across major AI assistants',
    ],
    outcomes: ['Mentioned in AI answers', 'Future-proof visibility as search changes', 'Stronger brand authority'],
    faqs: [
      ['What is the difference between SEO and GEO?', 'SEO helps you rank in a list of blue links. GEO helps you get named inside an AI-generated answer. They share foundations (good content, technical health, authority) but GEO puts extra weight on clear facts, structured data, citations and brand mentions across the web.'],
      ['Can you guarantee ChatGPT will recommend me?', 'No one controls AI models. What we can do — and measure monthly — is increase how often and how accurately AI assistants mention your business across a fixed set of buyer prompts.'],
    ],
  },
  {
    slug: 'social-media-marketing',
    num: '04',
    name: 'Social Media Management',
    short: 'Social Media',
    icon: 'heart',
    from: 8000,
    unit: '/month',
    hook: 'Consistent content and community growth — without you lifting a finger.',
    title: 'Social Media Management Nakuru — From KES 8,000 | Steff Cloud',
    description:
      'Social media management in Nakuru from KES 8,000/month. Content planning, design, short video, captions, posting and community management on Instagram, TikTok, Facebook & LinkedIn.',
    intro:
      'Posting “when we have time” does not build a brand. We plan, design, shoot, write, post and reply — every week — so your pages look like the leader in your category and turn followers into DMs, calls and orders.',
    deliverables: [
      'Monthly content calendar aligned to your sales goals',
      'Branded designs, carousels and short-form Reels/TikToks',
      'Scroll-stopping captions in English, Swahili or Sheng',
      'Scheduling and posting at peak Kenyan engagement times',
      'Comment and DM management with lead hand-off to your team',
      'Monthly growth report: reach, engagement, followers, enquiries',
    ],
    outcomes: ['A page that looks like the market leader', 'More DMs and enquiries', 'Hours saved every week'],
    faqs: [
      ['Which platforms should my business be on?', 'Wherever your buyers are. For most Kenyan consumer brands that is TikTok, Instagram and Facebook; for B2B it is LinkedIn and WhatsApp. We recommend the smallest set that reaches your market — doing two platforms well beats five badly.'],
      ['Do you shoot content or do I send photos?', 'Both work. Nakuru clients can book on-site shoot days; clients elsewhere send raw clips and we edit them into polished content.'],
    ],
  },
  {
    slug: 'paid-ads',
    num: '05',
    name: 'Google, Meta & TikTok Ads',
    short: 'Paid Ads',
    icon: 'target',
    from: 12000,
    unit: '/month + ad spend',
    hook: 'Ads that bring paying customers — tracked to the last shilling.',
    title: 'Google Ads, Facebook & TikTok Ads Agency Kenya — PPC Management | Steff Cloud',
    description:
      'Paid ads management in Kenya: Google Search, Performance Max, YouTube, Facebook, Instagram and TikTok ads. Conversion tracking, creative testing and weekly optimisation.',
    intro:
      'Boosting posts is not a strategy. We build full-funnel campaigns on Google, Meta and TikTok with proper conversion tracking, tested creatives and landing pages built to convert — then optimise weekly so every shilling works harder.',
    deliverables: [
      'Account setup or audit, with clean conversion & WhatsApp-click tracking',
      'Audience and keyword strategy for each stage of the funnel',
      'Ad creatives: static, carousel, UGC-style and short video',
      'Retargeting for website visitors, video viewers and engagers',
      'A/B testing of offers, hooks and landing pages',
      'Weekly optimisation and a monthly cost-per-lead / ROAS report',
    ],
    outcomes: ['Predictable lead flow', 'Lower cost per lead', 'Clear return on ad spend'],
    faqs: [
      ['How much should I spend on ads in Kenya?', 'Many local businesses start with KES 15,000–50,000 per month in ad spend. We size the budget to your goal and average order value, then scale only what is profitable.'],
      ['Who owns the ad account?', 'You do. We work inside accounts in your name, so your data and history stay with you forever.'],
    ],
  },
  {
    slug: 'content-video-marketing',
    num: '06',
    name: 'Content & Short-form Video',
    short: 'Content & Video',
    icon: 'play',
    from: 15000,
    unit: '/month',
    hook: 'Video, ads and campaigns that make people stop scrolling and start buying.',
    title: 'Video & Content Marketing Agency Nakuru — Reels, TikToks, Campaigns | Steff Cloud',
    description:
      'Content marketing and short-form video production in Nakuru. Reels, TikToks, YouTube Shorts, product videos, blogs and campaign creative that sell.',
    intro:
      'Attention is the new currency, and short video is how Kenyans spend it. We script, shoot and edit content with hooks in the first second, clear offers and calls to action — and repurpose each shoot across every platform.',
    deliverables: [
      'Campaign concepts and scripts built on proven hook formulas',
      'On-location shoots in Nakuru and the Rift Valley',
      'Editing, captions, motion graphics and trending audio',
      'UGC-style ad creatives for Meta and TikTok',
      'Blog articles, guides and lead magnets for SEO & GEO',
      'Repurposing one shoot into 10+ assets',
    ],
    outcomes: ['Content that converts', 'A library of reusable assets', 'A brand people remember'],
    faqs: [
      ['How many videos do I get per month?', 'Packages start at 4 short videos per month and scale to daily content. The right number depends on your platforms and ad budget.'],
    ],
  },
  {
    slug: 'whatsapp-email-sms-marketing',
    num: '07',
    name: 'WhatsApp, Email & SMS Marketing',
    short: 'WhatsApp & Email',
    icon: 'chat',
    from: 10000,
    unit: '/month',
    hook: 'Turn one-time buyers into repeat customers on the channels Kenyans read.',
    title: 'WhatsApp Marketing, Email & Bulk SMS Kenya — Retention Marketing | Steff Cloud',
    description:
      'WhatsApp Business marketing, email newsletters and bulk SMS in Kenya. Catalogues, broadcast lists, automations and follow-ups that turn leads into repeat customers.',
    intro:
      'Getting a new customer costs far more than keeping one. We set up WhatsApp Business, email and SMS so every lead gets followed up, every buyer comes back, and your offers land where Kenyans actually read.',
    deliverables: [
      'WhatsApp Business setup: catalogue, quick replies, labels, greeting & away messages',
      'Broadcast lists and opt-in growth (compliant with the Data Protection Act)',
      'Email newsletters and automated welcome / abandoned-enquiry flows',
      'Bulk SMS campaigns for promotions and reminders',
      'Lead follow-up scripts for your sales team',
      'Monthly retention and repeat-purchase report',
    ],
    outcomes: ['Fewer lost leads', 'More repeat purchases', 'Higher lifetime value'],
    faqs: [
      ['Is bulk WhatsApp messaging legal in Kenya?', 'Messaging people who have opted in is fine; spamming people who have not is a breach of the Data Protection Act 2019 and of WhatsApp’s policies. We build consent-based lists only.'],
    ],
  },
  {
    slug: 'analytics-conversion-optimization',
    num: '08',
    name: 'Analytics & Conversion Optimization',
    short: 'Analytics & CRO',
    icon: 'chart',
    from: 12000,
    unit: 'once-off',
    hook: 'Know exactly where your sales come from — then double what works.',
    title: 'Marketing Analytics & CRO in Kenya — GA4 & Tracking | Steff Cloud',
    description:
      'GA4, Google Tag Manager, Meta Pixel and WhatsApp-click tracking set up properly, plus landing page and conversion rate optimisation for Kenyan businesses.',
    intro:
      'If you cannot measure it, you cannot grow it. We install clean tracking across your website, ads and WhatsApp, build a simple dashboard, and run experiments on your pages and offers to turn more visitors into paying customers.',
    deliverables: [
      'GA4 + Google Tag Manager setup and audit',
      'Meta Pixel / Conversions API and TikTok Pixel',
      'Call, form and WhatsApp-click conversion tracking',
      'Looker Studio dashboard your whole team understands',
      'Landing page audits and A/B tests',
      'Heatmaps and session recordings to find friction',
    ],
    outcomes: ['Decisions based on data', 'Higher conversion rates', 'Lower acquisition cost'],
    faqs: [
      ['What is a good conversion rate?', 'It varies by industry and traffic source, but many service-business landing pages convert 2–5% of visitors into enquiries. Small changes to headlines, offers and forms often move that number significantly.'],
    ],
  },
];

export const plans = [
  {
    name: 'Spark',
    price: 8000,
    unit: '/month',
    pitch: 'For new businesses that need to look professional online.',
    features: [
      '1 social platform managed',
      '12 branded posts per month',
      'Captions & hashtags',
      'Google Business Profile optimisation',
      'Monthly performance summary',
    ],
    cta: 'Start with Spark',
  },
  {
    name: 'Grow',
    price: 25000,
    unit: '/month',
    featured: true,
    pitch: 'For businesses ready to generate consistent leads every month.',
    features: [
      '2 social platforms managed',
      '16 posts + 4 short videos per month',
      'Local SEO + 2 SEO articles per month',
      'Meta or Google ads management (spend separate)',
      'WhatsApp Business setup & lead follow-up scripts',
      'Monthly strategy call + video report',
    ],
    cta: 'Grow my business',
  },
  {
    name: 'Dominate',
    price: 60000,
    unit: '/month',
    pitch: 'For brands that want to lead their category in Nakuru and beyond.',
    features: [
      '3+ platforms, daily content',
      '8 short videos + monthly shoot day',
      'Full SEO + GEO (AI search) programme',
      'Google, Meta & TikTok ads (spend separate)',
      'Email / SMS / WhatsApp automations',
      'Analytics dashboard + CRO testing',
      'Dedicated strategist, weekly check-ins',
    ],
    cta: 'Dominate my market',
  },
];

export const faqs = [
  ['How much does digital marketing cost in Kenya?', 'Our plans start at KES 8,000 per month for social media management, KES 25,000 for a full lead-generation package, and KES 60,000 for multi-channel growth. Ad spend is paid directly to Google, Meta or TikTok, so you see exactly where it goes.'],
  ['Why choose Steff Cloud over other digital marketing agencies in Nakuru?', 'We focus on revenue, not likes. Every plan includes conversion tracking, a plain-English monthly report and a clear next step. You own every account and asset, there are no long lock-in contracts, and we offer GEO — optimisation for ChatGPT and Google AI Overviews — which few agencies in Kenya do yet.'],
  ['Do you only work with businesses in Nakuru?', 'No. We are based on Nakuru–Solai Road and serve clients across Kenya — Nairobi, Naivasha, Eldoret, Kericho, Nyahururu and beyond. Most work happens online, and Nakuru clients can book in-person shoots and strategy sessions.'],
  ['How quickly will I see results?', 'Paid ads can produce leads within days of launch. Social media and local SEO typically show traction in 4–8 weeks, while SEO and GEO compound over 3–6 months. We agree on targets upfront and report progress monthly.'],
  ['Do I have to sign a long contract?', 'No. Plans run month to month after an initial 3-month growth period, which is the minimum time needed to test, learn and optimise properly.'],
  ['What do you need from me to get started?', 'A 30-minute call, access to your existing accounts (or we create them in your name), your logo and brand assets, and a clear idea of your best-selling products or services. We handle the rest.'],
  ['Can you help if I do not have a website yet?', 'Yes. Our parent team at Steff Cloud builds fast, SEO-ready websites. For marketing-only clients we can also start with social, WhatsApp and Google Business Profile while your site is built.'],
];

export const process = [
  ['Audit', 'A free 30-minute deep-dive into your website, Google presence, social pages, ads and competitors — with honest, prioritised recommendations.'],
  ['Strategy', 'A 90-day growth plan: who to target, which channels, what to say, monthly budget and the numbers we will be judged on.'],
  ['Launch', 'We set up tracking, content, campaigns and profiles fast — most clients go live within 7 days of approval.'],
  ['Scale', 'Weekly optimisation, monthly reports, and we double down on what brings sales. Then repeat.'],
];

export const promises = [
  ['You own everything', 'Ad accounts, pages, content and data are in your name. Always.'],
  ['No vanity metrics', 'We report leads, sales and cost per lead — not just likes.'],
  ['Month-to-month', 'After the first 90 days, stay because it works, not because of a contract.'],
  ['Real people in Nakuru', 'Meet us on Nakuru–Solai Road or chat on WhatsApp.'],
];

export const comparison = [
  ['Reports on leads & sales, not just likes', true, false],
  ['You own all accounts and content', true, false],
  ['GEO: optimisation for ChatGPT & AI Overviews', true, false],
  ['Conversion tracking on every campaign', true, false],
  ['Short-form video included in growth plans', true, false],
  ['Month-to-month after 90 days', true, false],
  ['Plain-English monthly video report', true, false],
];

export const nav = [
  { label: 'Services', href: '/services/', children: true },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Nakuru', href: '/digital-marketing-agency-nakuru/' },
  { label: 'Learn', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];
