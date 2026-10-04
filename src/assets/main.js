(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  let cfg = {};
  try { cfg = JSON.parse($('#sc-config')?.textContent || '{}'); } catch {}
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const waUrl = (text) => `https://wa.me/${cfg.wa}?text=${encodeURIComponent(text)}`;
  const fmtKES = (n) => 'KES ' + Math.round(n).toLocaleString('en-KE');

  // ---------- Mobile menu ----------
  const menuBtn = $('.menu-btn');
  const mnav = $('#mobile-nav');
  const setMenu = (open) => {
    if (!menuBtn || !mnav) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mnav.hidden = !open;
  };
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); } });
  mnav?.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  // ---------- Theme ----------
  const root = document.documentElement;
  const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  const themeBtn = $('.theme-btn');
  const syncThemeBtn = () => themeBtn?.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  syncThemeBtn();
  themeBtn?.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('sc-theme', next);
    syncThemeBtn();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', syncThemeBtn);

  // ---------- Consent, analytics & pixels ----------
  const CONSENT_KEY = 'sc-consent';
  const CONSENT_VERSION = 1;
  const readConsent = () => {
    try {
      const c = JSON.parse(store.get(CONSENT_KEY) || 'null');
      if (!c || c.v !== CONSENT_VERSION || Date.now() - c.ts > 365 * 864e5) return null;
      return c;
    } catch { return null; }
  };
  let consent = readConsent();
  const gpc = navigator.globalPrivacyControl === true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });

  const loadScript = (src) => { const s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); };
  let gaLoaded = false, pixelLoaded = false;
  const applyConsent = (c) => {
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied',
    });
    if (cfg.ga4 && c.analytics && !gaLoaded) {
      gaLoaded = true;
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.ga4)}`);
      gtag('js', new Date());
      gtag('config', cfg.ga4, { anonymize_ip: true });
    }
    if (cfg.metaPixel && c.marketing && !pixelLoaded) {
      pixelLoaded = true;
      const f = (window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); });
      if (!window._fbq) window._fbq = f;
      f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
      loadScript('https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', cfg.metaPixel);
      fbq('track', 'PageView');
    }
  };
  const banner = $('#cookie-banner');
  const dlg = $('#cookie-dialog');
  // "Accept all" respects a Global Privacy Control signal; an explicit tick in the dialog is the visitor's own choice.
  const saveConsent = (analytics, marketing) => {
    consent = { v: CONSENT_VERSION, ts: Date.now(), analytics: !!analytics, marketing: !!marketing };
    store.set(CONSENT_KEY, JSON.stringify(consent));
    if (banner) banner.hidden = true;
    applyConsent(consent);
  };
  const openPrefs = () => {
    if (!dlg) return;
    $('#ck-analytics', dlg).checked = consent ? consent.analytics : false;
    $('#ck-marketing', dlg).checked = consent ? consent.marketing : false;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  };
  if (consent) applyConsent(consent);
  else if (banner) banner.hidden = false;
  banner?.addEventListener('click', (e) => {
    const v = e.target.closest('[data-consent]')?.dataset.consent;
    if (v === 'all') saveConsent(true, !gpc);
    else if (v === 'none') saveConsent(false, false);
    else if (v === 'customize') openPrefs();
  });
  dlg?.addEventListener('close', () => {
    if (dlg.returnValue === 'all') saveConsent(true, !gpc);
    else if (dlg.returnValue === 'save') saveConsent($('#ck-analytics', dlg).checked, $('#ck-marketing', dlg).checked);
  });
  document.addEventListener('click', (e) => { if (e.target.closest('[data-open-cookies]')) openPrefs(); });

  const track = (name, params = {}) => {
    if (gaLoaded) gtag('event', name, params);
    if (pixelLoaded && name === 'generate_lead') fbq('track', 'Lead');
    if (pixelLoaded && name === 'contact_click') fbq('track', 'Contact');
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-track]');
    if (a) track('contact_click', { method: a.dataset.track, page: location.pathname });
  });

  // ---------- Lead forms ----------
  // Accepts Kenyan numbers (07…, 01…, 2547…, +2547…) and international numbers with a country code.
  const normPhone = (raw) => (raw || '').replace(/[\s().-]/g, '');
  const validPhone = (p) => /^(?:(?:\+?254|0)[17]\d{8}|\+[1-9]\d{7,14})$/.test(p);
  $$('.lead-form').forEach((form) => {
    const box = form.closest('.lead-box');
    const done = $('.form-done', box);
    const status = $('.form-status', form);
    let startedAt = 0;
    form.addEventListener('focusin', () => { if (!startedAt) startedAt = Date.now(); }, { once: true });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const phone = normPhone(d.phone);
      const name = (d.name || '').trim();
      const errs = [];
      const mark = (n, bad) => form.querySelector(`[name="${n}"]`)?.setAttribute('aria-invalid', bad ? 'true' : 'false');
      mark('name', !name); if (!name) errs.push('your name');
      mark('phone', !validPhone(phone)); if (!validPhone(phone)) errs.push('a valid phone number (e.g. 0712 345 678, or +44… if outside Kenya)');
      if (!d.consent) errs.push('your consent to be contacted');
      if (errs.length) {
        status.className = 'form-status err';
        status.textContent = 'Please add ' + errs.join(', ') + '.';
        form.querySelector('[aria-invalid=true]')?.focus();
        return;
      }
      const isBot = !!d.website || (startedAt && Date.now() - startedAt < 1500);
      const lines = [
        'Hi Steff Cloud! I would like a free growth audit.',
        `Name: ${name}`,
        `Phone: ${phone}`,
        d.business ? `Business: ${d.business.trim()}` : '',
        d.service ? `Interested in: ${d.service}` : '',
        d.budget ? `Budget: ${d.budget}` : '',
        d.message ? `Goal: ${d.message.trim()}` : '',
        `(via ${form.dataset.source})`,
      ].filter(Boolean);
      const url = waUrl(lines.join('\n'));
      if (!isBot) {
        if (cfg.formEndpoint) {
          fetch(cfg.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name, phone, business: d.business, service: d.service, budget: d.budget, message: d.message, source: form.dataset.source, page: location.href }),
          }).catch(() => {});
        }
        track('generate_lead', { source: form.dataset.source, service: d.service });
      }
      const link = $('.done-wa', done);
      link.href = url;
      let opened = null;
      if (!isBot) { try { opened = window.open(url, '_blank'); if (opened) opened.opener = null; } catch {} }
      $('p:not(.form-title):not(.done-alt)', done).textContent = !opened
        ? 'Tap the button to send your details to us on WhatsApp.'
        : 'WhatsApp should have opened in a new tab. If it did not, tap the button below.';
      form.hidden = true;
      done.hidden = false;
      done.focus();
      status.textContent = '';
      form.reset();
    });
    $('.done-reset', done)?.addEventListener('click', () => { done.hidden = true; form.hidden = false; form.querySelector('input')?.focus(); });
  });

  // ---------- Currency ----------
  const curs = cfg.currencies || {};
  const guessCurrency = () => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Africa/')) return 'KES';
    if (tz === 'Europe/London') return 'GBP';
    if (tz.startsWith('Europe/')) return 'EUR';
    return 'USD';
  };
  const setCurrency = (code) => {
    if (!curs[code]) code = 'KES';
    $$('.money[data-kes]').forEach((el) => {
      const kes = +el.dataset.kes;
      if (code === 'KES') { el.textContent = fmtKES(kes); return; }
      const v = kes / curs[code].rate;
      el.textContent = '≈ ' + curs[code].symbol + Math.round(v).toLocaleString('en-US');
    });
    $$('.cur-select').forEach((s) => { s.value = code; });
    $$('.cur-note').forEach((n) => { n.hidden = code === 'KES'; });
  };
  setCurrency(store.get('sc-currency') || guessCurrency());
  document.addEventListener('change', (e) => {
    if (e.target.matches('.cur-select')) { store.set('sc-currency', e.target.value); setCurrency(e.target.value); }
  });

  // ---------- Growth calculator ----------
  const calc = $('#calc');
  if (calc) {
    const out = (k) => $(`[data-out="${k}"]`, calc);
    const cta = $('.calc-cta', calc);
    const run = () => {
      const value = Math.max(0, +calc.value.value || 0);
      const customers = Math.max(0, Math.round(+calc.customers.value || 0));
      const close = +calc.close.value || 0.25;
      const leads = Math.ceil(customers / close);
      const lo = Math.round((leads * 150) / 1000) * 1000;
      const hi = Math.round((leads * 450) / 1000) * 1000;
      const plan = leads <= 30 ? 'Spark' : leads <= 120 ? 'Grow' : 'Dominate';
      out('leads').textContent = `${leads.toLocaleString('en-KE')} / month`;
      out('ads').textContent = `${fmtKES(lo)} – ${hi.toLocaleString('en-KE')}`;
      out('revenue').textContent = `${fmtKES(customers * value)} / month`;
      out('plan').textContent = plan;
      cta.href = waUrl(`Hi Steff Cloud, I used your growth calculator.\nAverage sale: ${fmtKES(value)}\nTarget: ${customers} new customers/month (~${leads} leads)\nSuggested plan: ${plan}\nCan we talk?`);
    };
    calc.addEventListener('input', run);
    calc.addEventListener('submit', (e) => e.preventDefault());
    run();
  }

  // ---------- Blog filter ----------
  const grid = $('#post-grid');
  $$('.chip-btn[data-filter]').forEach((b) => {
    b.addEventListener('click', () => {
      $$('.chip-btn[data-filter]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      $$('.post-card', grid || document).forEach((c) => { c.hidden = b.dataset.filter !== 'all' && c.dataset.cat !== b.dataset.filter; });
    });
  });

  // ---------- Glossary search ----------
  const gq = $('#gq');
  if (gq) {
    const empty = $('#glossary-empty');
    gq.addEventListener('input', () => {
      const q = gq.value.trim().toLowerCase();
      let shown = 0;
      $$('#glossary > div').forEach((d) => { const hit = !q || d.textContent.toLowerCase().includes(q); d.hidden = !hit; shown += hit; });
      if (empty) empty.hidden = shown > 0;
    });
  }

  // ---------- Map: load Google only on request ----------
  $$('.map[data-map-src]').forEach((m) => {
    $('.map-load', m)?.addEventListener('click', () => {
      const f = document.createElement('iframe');
      f.src = m.dataset.mapSrc;
      f.title = 'Map showing Steff Cloud on Nakuru–Solai Road';
      f.loading = 'lazy';
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      m.replaceChildren(f);
    });
  });

  // ---------- Copy buttons ----------
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const label = $('span', b);
    const prev = label.textContent;
    try { await navigator.clipboard.writeText(b.dataset.copy); label.textContent = 'Copied'; }
    catch { label.textContent = b.dataset.copy; }
    setTimeout(() => { label.textContent = prev; }, 2200);
  });

  // ---------- Open now (Nakuru time) ----------
  const statusEls = $$('[data-open-status]');
  if (statusEls.length) {
    const update = () => {
      const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: cfg.tz || 'Africa/Nairobi', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((p) => [p.type, p.value]));
      const h = +parts.hour;
      const open = parts.weekday !== 'Sun' && h >= 8 && h < 18;
      statusEls.forEach((el) => {
        el.classList.toggle('is-open', open);
        $('.os-text', el).textContent = open
          ? `Open now · ${parts.hour}:${parts.minute} in Nakuru`
          : 'Closed now · opens 8am EAT · WhatsApp us anytime';
      });
    };
    update();
    setInterval(update, 60000);
  }

  // ---------- Reading progress ----------
  const bar = $('.progress span');
  if (bar) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
        ticking = false;
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Entrance motion for below-the-fold items ----------
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('reveal'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px 12% 0px' });
    $$('.svc-card, .steps li, .plan, .post-card, .promises li, .deliv li').forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight * 1.15) io.observe(el);
    });
  }
})();
