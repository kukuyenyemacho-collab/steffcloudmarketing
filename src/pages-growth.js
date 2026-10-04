import { site } from './data.js';
import { posts } from './posts.js';
import { industries, tools, graderQuestions, academy } from './growth.js';
import { esc, icon, wa, abs, crumbs, faqList, leadForm, ctaBand, breadcrumb, faqSchema, orgId, postCard } from './lib.js';
import { growthCalculator } from './pages-extra.js';

const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

// ---------- Home page sections ----------
export function storySection() {
  return `<section class="section story" id="story"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">A story we hear every week</p><h2>Every business we help starts in the same place.</h2>
  <p>This is a composite of the Nakuru business owners who walk through our door. You might recognise yourself.</p></div>
  <ol class="chapters">
    <li><span class="ch-n">Chapter 1</span><h3>The silence</h3><p>Achieng runs the best salon in Section 58. Her work is beautiful, but her phone is quiet. She posts when she has time, boosts a post now and then, and wonders why the new place across the road is always full.</p></li>
    <li><span class="ch-n">Chapter 2</span><h3>The plan</h3><p>She books a free audit. We show her what customers see: no Google reviews, an outdated profile, slow replies on WhatsApp. Together we agree on a simple 90-day plan with numbers she can track.</p></li>
    <li class="ch-win"><span class="ch-n">Chapter 3</span><h3>The ping</h3><p>Reviews start to arrive. Her Reels reach women within five kilometres. Every enquiry gets a reply within the hour. Now the sound she hears most is the M-Pesa notification.</p></li>
  </ol>
  <div class="btns"><a class="btn btn-accent" href="/free-audit/">Start your chapter 2 ${icon('arrow')}</a><a class="btn btn-line" href="/industries/">See your industry’s story</a></div>
</div></section>`;
}

export function channelsStrip() {
  const ch = ['Google Search', 'Google Maps', 'ChatGPT & AI Overviews', 'Instagram', 'TikTok', 'Facebook', 'YouTube', 'WhatsApp', 'LinkedIn'];
  return `<section class="channels" aria-label="Channels we run campaigns on"><div class="wrap"><p>Where we put your brand:</p><ul>${ch.map((c) => `<li>${c}</li>`).join('')}</ul></div></section>`;
}

const industryCard = (i) => `<a class="ind-card" href="/industries/${i.slug}/">${icon(i.icon)}<h3>${esc(i.name)}</h3><p>${esc(i.hook)}</p><span class="more">Read the playbook ${icon('arrow')}</span></a>`;

export function industriesTeaser() {
  return `<section class="section" id="industries"><div class="wrap">
  <div class="sec-head row"><div><p class="eyebrow">Industries</p><h2>Playbooks built for how your customers buy.</h2></div><a class="btn btn-line" href="/industries/">All industries ${icon('arrow')}</a></div>
  <div class="ind-grid">${industries.map(industryCard).join('')}</div>
</div></section>`;
}

export function resourcesTeaser() {
  return `<section class="section olive" id="free"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Free for every Kenyan business</p><h2>Learn it yourself, or let us do it. Either way, start here.</h2>
  <p>We believe in teaching what we know. Use our free tools and course, even if you never hire us.</p></div>
  <div class="res-grid">
    <a class="res-card" href="/academy/">${icon('spark')}<h3>Free Academy course</h3><p>${academy.modules.length} modules, ${academy.modules.reduce((a, m) => a + m.lessons.length, 0)} lessons, about ${academy.hours} hours. Learn SEO, social, ads and WhatsApp selling.</p><span class="more">Start learning ${icon('arrow')}</span></a>
    ${tools.map((t) => `<a class="res-card" href="/tools/${t.slug}/">${icon(t.icon)}<h3>${esc(t.name)}</h3><p>${esc(t.hook)}</p><span class="more">Use it free ${icon('arrow')}</span></a>`).join('')}
  </div>
</div></section>`;
}

// ---------- Pages ----------
function industryPages() {
  const list = [];
  list.push({
    path: '/industries/',
    opts: { priority: 0.85 },
    page: {
      path: '/industries/',
      title: 'Digital Marketing by Industry in Kenya | Steff Cloud',
      description: 'Digital marketing playbooks for Kenyan schools, hotels, real estate, clinics, restaurants, retail, agribusiness and professional services.',
      schema: [breadcrumb([['Industries', '/industries/']]), {
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'Industries served by Steff Cloud',
        itemListElement: industries.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.name, url: abs(`/industries/${i.slug}/`) })),
      }],
      body: `<section class="page-hero"><div class="wrap">${crumbs([['Industries', '/industries/']])}
  <p class="eyebrow">Industries</p><h1>Every industry has its own customer story.</h1>
  <p class="lede">A parent choosing a school buys differently from a farmer choosing seed. Pick your industry to see the challenges we solve, the channels that work and a campaign idea you can steal.</p>
</div></section>
<section class="section"><div class="wrap"><h2 class="sr">Industry playbooks</h2><div class="ind-grid">${industries.map(industryCard).join('')}</div></div></section>
${ctaBand({ title: 'Don’t see your industry?', text: 'We work with most businesses that sell to Kenyan customers. Tell us about yours in a free audit.' })}`,
    },
  });
  for (const i of industries) {
    const path = `/industries/${i.slug}/`;
    const others = industries.filter((o) => o.slug !== i.slug).slice(0, 4);
    list.push({
      path,
      opts: { priority: 0.8 },
      page: {
        path,
        title: `Digital Marketing for ${i.name} in Kenya | Steff Cloud`,
        description: `${i.hook} Digital marketing playbook for ${i.name.toLowerCase()} in Nakuru and across Kenya: channels, campaign ideas and KPIs.`.slice(0, 160),
        schema: [
          breadcrumb([['Industries', '/industries/'], [i.name, path]]),
          faqSchema(i.faqs),
          { '@context': 'https://schema.org', '@type': 'Service', name: `Digital marketing for ${i.name}`, serviceType: 'Digital marketing', provider: { '@id': orgId }, url: abs(path), areaServed: { '@type': 'Country', name: 'Kenya' }, audience: { '@type': 'BusinessAudience', name: i.name } },
        ],
        body: `<section class="page-hero"><div class="wrap hero-grid">
  <div>${crumbs([['Industries', '/industries/'], [i.name, path]])}
    <p class="eyebrow">Industry playbook</p>
    <h1>Digital marketing for ${esc(i.name.toLowerCase())}</h1>
    <p class="lede">${esc(i.hook)}</p>
    <p class="prose-p">${esc(i.intro)}</p>
  </div>
  <div class="hero-form">${leadForm({ id: 'ind', compact: true, title: 'Get your free industry audit', source: i.slug })}</div>
</div></section>
<section class="section story"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">The story</p><h2>Picture this.</h2><p class="muted small">An illustrative scenario based on the businesses we work with.</p></div>
  <blockquote class="story-quote"><p>${esc(i.story)}</p></blockquote>
</div></section>
<section class="section tint"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">What gets in the way</p><h2>The challenges we solve</h2></div>
  <ul class="pain">${i.challenges.map((c) => `<li>${icon('x')}<span>${esc(c)}</span></li>`).join('')}</ul>
</div></section>
<section class="section"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">The playbook</p><h2>What we do, channel by channel.</h2></div>
  <ol class="play">${i.playbook.map(([t, d], n) => `<li><span class="play-n">${n + 1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>
</div></section>
<section class="section inv"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">Campaign idea you can steal</p><h2>${esc(i.idea)}</h2></div>
  <div><p class="f-h">What we measure</p><ul class="kpis">${i.kpis.map((k) => `<li>${icon('check')}${esc(k)}</li>`).join('')}</ul>
  <a class="btn btn-accent" href="${wa(`Hi Steff Cloud, I run a business in ${i.name}. Can we talk about a marketing plan?`)}" target="_blank" rel="noopener" data-track="industry">${icon('arrow')}<span>Plan this with us</span></a></div>
</div></section>
<section class="section"><div class="wrap two-col"><div class="sec-head"><p class="eyebrow">FAQ</p><h2>${esc(i.name)} questions</h2></div>${faqList(i.faqs)}</div></section>
<section class="section tint"><div class="wrap"><div class="sec-head"><p class="eyebrow">More playbooks</p><h2>Other industries we help</h2></div><div class="ind-grid">${others.map(industryCard).join('')}</div></div></section>
${ctaBand({ title: `Let’s write your next chapter.` })}`,
      },
    });
  }
  return list;
}

function graderTool() {
  const areas = [...new Set(graderQuestions.map((q) => q[1]))];
  return `<form class="grader" id="grader" novalidate>
  ${areas.map((a) => `<fieldset class="g-area"><legend>${a}</legend>${graderQuestions.filter((q) => q[1] === a).map(([id, , q, w]) => `
    <div class="g-q" data-weight="${w}" data-id="${id}"><p id="gq-${id}">${esc(q)}</p>
    <div class="seg" role="radiogroup" aria-labelledby="gq-${id}">
      <label><input type="radio" name="${id}" value="1"><span>Yes</span></label>
      <label><input type="radio" name="${id}" value="0.5"><span>Partly</span></label>
      <label><input type="radio" name="${id}" value="0"><span>No</span></label>
    </div></div>`).join('')}</fieldset>`).join('')}
</form>`;
}

function graderResult() {
  const tips = Object.fromEntries(graderQuestions.map(([id, , , , tip]) => [id, tip]));
  return `<aside class="g-result" aria-live="polite">
  <p class="f-h">Your score</p>
  <p class="g-score"><span data-g="score">0</span><small>/100</small></p>
  <div class="g-bar"><span data-g="bar"></span></div>
  <p class="g-grade" data-g="grade">Answer the questions to see your grade.</p>
  <p class="g-count" data-g="count">0 of ${graderQuestions.length} answered</p>
  <div class="g-fixes" hidden><p class="f-h">Your top fixes</p><ol data-g="fixes"></ol></div>
  <a class="btn btn-accent btn-block g-cta" href="${wa('Hi Steff Cloud, I used your Digital Marketing Grader. Can you help me improve my score?')}" target="_blank" rel="noopener" data-track="grader">${icon('arrow')}<span>Send my score & get help</span></a>
  <script type="application/json" id="grader-tips">${JSON.stringify(tips).replace(/</g, '\\u003c')}</script>
</aside>`;
}

function toolPages() {
  const list = [];
  const toolSchema = (t, path) => ({
    '@context': 'https://schema.org', '@type': 'WebApplication', name: t.name, url: abs(path), description: t.description,
    applicationCategory: 'BusinessApplication', operatingSystem: 'Any (web browser)', isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'KES' }, provider: { '@id': orgId },
  });
  list.push({
    path: '/tools/',
    opts: { priority: 0.8 },
    page: {
      path: '/tools/',
      title: 'Free Digital Marketing Tools for Kenyan Businesses | Steff Cloud',
      description: 'Free marketing tools for Kenyan businesses: digital marketing grader, WhatsApp link generator and marketing budget calculator. No sign-up needed.',
      schema: [breadcrumb([['Free tools', '/tools/']])],
      body: `<section class="page-hero"><div class="wrap">${crumbs([['Free tools', '/tools/']])}
  <p class="eyebrow">Free tools · no sign-up</p><h1>Free marketing tools that do real work.</h1>
  <p class="lede">Built by our team for Kenyan businesses. Everything runs in your browser and nothing you type is sent to us unless you choose to share it.</p>
</div></section>
<section class="section"><div class="wrap"><h2 class="sr">Tools</h2><div class="res-grid three">${tools.map((t) => `<a class="res-card" href="/tools/${t.slug}/">${icon(t.icon)}<h3>${esc(t.name)}</h3><p>${esc(t.hook)}</p><span class="more">Use it free ${icon('arrow')}</span></a>`).join('')}</div></div></section>
${ctaBand()}`,
    },
  });

  const [grader, walink, budget] = tools;
  list.push({
    path: `/tools/${grader.slug}/`,
    opts: { priority: 0.85 },
    page: {
      path: `/tools/${grader.slug}/`,
      title: grader.title,
      description: grader.description,
      schema: [breadcrumb([['Free tools', '/tools/'], [grader.name, `/tools/${grader.slug}/`]]), toolSchema(grader, `/tools/${grader.slug}/`)],
      body: `<section class="page-hero"><div class="wrap">${crumbs([['Free tools', '/tools/'], [grader.name, `/tools/${grader.slug}/`]])}
  <p class="eyebrow">Free tool · 2 minutes</p><h1>How strong is your digital marketing?</h1>
  <p class="lede">Answer ${graderQuestions.length} quick questions honestly. You will get a score out of 100, a grade and the three fixes that will make the biggest difference first. Your answers stay on your device.</p>
</div></section>
<section class="section"><div class="wrap grader-grid">${graderTool()}${graderResult()}</div></section>
${ctaBand({ title: 'Want us to fix the gaps?', text: 'Send us your score and we will turn your top fixes into a 90-day plan in a free audit.' })}`,
    },
  });

  list.push({
    path: `/tools/${walink.slug}/`,
    opts: { priority: 0.8 },
    page: {
      path: `/tools/${walink.slug}/`,
      title: walink.title,
      description: walink.description,
      schema: [breadcrumb([['Free tools', '/tools/'], [walink.name, `/tools/${walink.slug}/`]]), toolSchema(walink, `/tools/${walink.slug}/`), faqSchema([
        ['What is a WhatsApp click-to-chat link?', 'A link in the form wa.me/2547XXXXXXXX that opens a WhatsApp chat with your number, optionally with a message already typed. Customers do not need to save your number first.'],
        ['Where should I use my WhatsApp link?', 'In your Instagram and TikTok bio, Google Business Profile, Facebook page button, email signature, website, ads and on posters as a QR code.'],
      ])],
      body: `<section class="page-hero"><div class="wrap">${crumbs([['Free tools', '/tools/'], [walink.name, `/tools/${walink.slug}/`]])}
  <p class="eyebrow">Free tool</p><h1>WhatsApp link generator</h1>
  <p class="lede">Turn your number into a click-to-chat link with a ready-typed message. Customers tap once and start talking to you, without saving your number.</p>
</div></section>
<section class="section"><div class="wrap two-col">
  <form class="calc walink" id="walink" novalidate>
    <div class="field"><label for="wl-phone">Your WhatsApp number</label><input id="wl-phone" name="phone" type="tel" inputmode="tel" value="0712 345 678" aria-describedby="wl-hint"><small class="hint-l" id="wl-hint">Kenyan (07…, 01…) or international with country code (+44…).</small></div>
    <div class="field"><label for="wl-msg">Pre-filled message <span class="opt">(optional)</span></label><textarea id="wl-msg" name="message" rows="3" maxlength="500">Hi! I saw your post and would like to know more about your prices.</textarea></div>
    <div class="field"><label for="wl-out">Your link</label><input id="wl-out" readonly value=""></div>
    <p class="wl-error" role="status" aria-live="polite"></p>
    <div class="btns tight"><button class="btn btn-solid" type="button" data-wl="copy">${icon('copy')}<span>Copy link</span></button><a class="btn btn-line" data-wl="test" href="#" target="_blank" rel="noopener">Test it</a></div>
  </form>
  <div class="prose"><h2>Five places to use your link today</h2>
    <ol><li><b>Instagram and TikTok bio:</b> replace “DM for price” with a link that opens a chat.</li><li><b>Google Business Profile:</b> add it as your booking or chat link.</li><li><b>Ads:</b> send Facebook and Instagram ad clicks straight to WhatsApp.</li><li><b>Posters and packaging:</b> turn the link into a QR code with any free QR generator.</li><li><b>Email signature and website:</b> one tap from every message you send.</li></ol>
    <p><b>Pro tip from our team:</b> make a different link for each channel, with a different first message (“Hi, I saw you on TikTok…”). Then you will know which channel sends you buyers. Read our <a href="/blog/whatsapp-business-marketing-kenya/">WhatsApp marketing playbook</a>.</p>
  </div>
</div></section>
${ctaBand()}`,
    },
  });

  list.push({
    path: `/tools/${budget.slug}/`,
    opts: { priority: 0.8 },
    page: {
      path: `/tools/${budget.slug}/`,
      title: budget.title,
      description: budget.description,
      schema: [breadcrumb([['Free tools', '/tools/'], [budget.name, `/tools/${budget.slug}/`]]), toolSchema(budget, `/tools/${budget.slug}/`)],
      body: `<section class="page-hero"><div class="wrap">${crumbs([['Free tools', '/tools/'], [budget.name, `/tools/${budget.slug}/`]])}
  <p class="eyebrow">Free tool</p><h1>Marketing budget calculator</h1>
  <p class="lede">Start from your sales goal and work backwards. The calculator estimates the leads you need, a starting ad budget in Kenya shillings and the plan that fits.</p>
</div></section>
${growthCalculator()}
<section class="section tint"><div class="wrap narrow prose"><h2>How the calculator works</h2><p>Leads needed = new customers you want ÷ the share of enquiries that buy. The ad budget range multiplies those leads by a typical Kenyan cost per lead of KES 150–450. Your real cost depends on your industry, offer, creative and season. Read <a href="/blog/digital-marketing-budget-small-business-kenya/">how to set a digital marketing budget</a> for the full method.</p></div></section>
${ctaBand()}`,
    },
  });
  return list;
}

function academyPage() {
  const lessonsCount = academy.modules.reduce((a, m) => a + m.lessons.length, 0);
  return {
    path: '/academy/',
    opts: { priority: 0.85 },
    page: {
      path: '/academy/',
      title: 'Free Digital Marketing Course for Kenya | Steff Cloud Academy',
      description: `Free self-paced digital marketing course for Kenyan businesses and young marketers: ${academy.modules.length} modules, ${lessonsCount} lessons on SEO, AI search, social media, ads and WhatsApp.`,
      schema: [breadcrumb([['Academy', '/academy/']]), {
        '@context': 'https://schema.org', '@type': 'Course', name: academy.name, description: academy.description,
        provider: { '@id': orgId }, url: abs('/academy/'), inLanguage: 'en-KE', isAccessibleForFree: true, educationalLevel: 'Beginner',
        teaches: ['SEO', 'Local SEO', 'Generative engine optimization', 'Social media marketing', 'Paid advertising', 'WhatsApp marketing'],
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'KES', category: 'Free' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: `PT${academy.hours}H` },
        syllabusSections: academy.modules.map((m) => ({ '@type': 'Syllabus', name: m.title, description: m.outcome })),
      }],
      body: `<section class="page-hero"><div class="wrap hero-grid">
  <div>${crumbs([['Academy', '/academy/']])}
    <p class="eyebrow">Steff Cloud Academy · free</p>
    <h1>Learn digital marketing the Kenyan way. Free.</h1>
    <p class="lede">${esc(academy.description)}</p>
    <ul class="trust"><li>${icon('check')}${academy.modules.length} modules</li><li>${icon('check')}${lessonsCount} lessons</li><li>${icon('check')}About ${academy.hours} hours</li><li>${icon('check')}No sign-up</li></ul>
  </div>
  <div class="ac-progress" aria-live="polite"><p class="f-h">Your progress</p><p class="g-score"><span data-ac="pct">0</span><small>%</small></p><div class="g-bar"><span data-ac="bar"></span></div><p class="muted" data-ac="label">0 of ${lessonsCount} lessons done. Progress is saved on this device.</p></div>
</div></section>
<section class="section"><div class="wrap">
  <ol class="modules">${academy.modules
        .map(
          (m, n) => `<li class="module"><div class="mod-head"><span class="mod-n">Module ${n + 1}</span><h2>${esc(m.title)}</h2><p>${esc(m.outcome)}</p></div>
    <ul class="lessons">${m.lessons
            .map((slug) => {
              const p = postBySlug[slug];
              return `<li><label class="ls-check"><input type="checkbox" data-lesson="${slug}"><span class="sr">Mark “${esc(p.title)}” as done</span></label><a href="/blog/${slug}/"><b>${esc(p.title)}</b><small>${p.minutes} min read</small></a></li>`;
            })
            .join('')}${(m.extra || []).map(([t, h]) => `<li class="ls-extra"><span aria-hidden="true">${icon('plus')}</span><a href="${h}"><b>${esc(t)}</b></a></li>`).join('')}</ul></li>`,
        )
        .join('')}</ol>
</div></section>
<section class="section olive"><div class="wrap two-col">
  <div class="sec-head"><p class="eyebrow">Why we teach for free</p><h2>Nakuru grows when its people know how.</h2></div>
  <div class="prose"><p>Steff Cloud started with a simple belief: world-class digital skills should be available in Nakuru, not only in Nairobi or abroad. Through Nakuru Digital we already train young people to become developers, designers, AI builders and marketers. This Academy is the marketing part of that mission, open to everyone.</p><p>Finish the course, apply it to your business, and if you want a team to run it with you, we are one message away.</p>
  <a class="btn btn-accent" href="/free-audit/">Get a free audit ${icon('arrow')}</a></div>
</div></section>`,
    },
  };
}

function resourcesPage() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return {
    path: '/resources/',
    opts: { priority: 0.75 },
    page: {
      path: '/resources/',
      title: 'Free Digital Marketing Resources for Kenya | Steff Cloud',
      description: 'Free digital marketing resources for Kenyan businesses: Academy course, marketing grader, WhatsApp link generator, budget calculator, blog guides and glossary.',
      schema: [breadcrumb([['Resources', '/resources/']])],
      body: `<section class="page-hero"><div class="wrap">${crumbs([['Resources', '/resources/']])}
  <p class="eyebrow">Resources</p><h1>Everything we know, free to use.</h1>
  <p class="lede">Courses, tools and guides to help you grow, whether you hire us or not.</p>
</div></section>
${resourcesTeaser().replace('<h2>Learn it yourself, or let us do it. Either way, start here.</h2>', '<h2>Start with a course or a tool.</h2>')}
<section class="section"><div class="wrap">
  <div class="sec-head row"><div><p class="eyebrow">Latest guides</p><h2>From the blog</h2></div><a class="btn btn-line" href="/blog/">All articles ${icon('arrow')}</a></div>
  <div class="post-grid">${latest.map(postCard).join('')}</div>
  <p class="more-links"><a href="/learn/digital-marketing-glossary/">Digital marketing glossary</a> · <a href="/blog/feed.xml">RSS feed</a></p>
</div></section>
${ctaBand()}`,
    },
  };
}

export function growthPages() {
  return [...industryPages(), ...toolPages(), academyPage(), resourcesPage()];
}

export { site };
