(() => {
  const WA = '254118407026';
  // Optional form backend (Formspree/Getform/Web3Forms). Kept in sync with src/data.js formEndpoint.
  const FORM_ENDPOINT = document.documentElement.dataset.formEndpoint || '';

  // ---------- Mobile menu ----------
  const btn = document.querySelector('.menu-btn');
  const mnav = document.getElementById('mobile-nav');
  if (btn && mnav) {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      mnav.hidden = open;
    });
  }

  // ---------- Analytics (only after consent) ----------
  const gaId = document.querySelector('meta[name="ga4"]')?.content;
  const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
  const loadGA = () => {
    if (!gaId || window.gtag) return;
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', gaId, { anonymize_ip: true });
  };
  const track = (name, params = {}) => { if (window.gtag) gtag('event', name, params); };
  if (gaId) {
    const choice = read('sc-consent');
    if (choice === 'yes') loadGA();
    else if (!choice) {
      const c = document.createElement('div');
      c.className = 'cookie'; c.setAttribute('role', 'dialog'); c.setAttribute('aria-label', 'Cookie consent');
      c.innerHTML = '<p>We use analytics cookies to see which pages help Kenyan businesses most. See our <a href="/cookie-policy/">Cookie Policy</a>.</p><div class="btns"><button class="btn btn-cream btn-sm" data-c="yes">Accept</button><button class="btn btn-ghost-cream btn-sm" data-c="no">Decline</button></div>';
      document.body.appendChild(c);
      c.addEventListener('click', (e) => {
        const v = e.target.closest('[data-c]')?.dataset.c; if (!v) return;
        write('sc-consent', v); c.remove(); if (v === 'yes') loadGA();
      });
    }
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-track]');
    if (a) track('contact_click', { method: a.dataset.track, page: location.pathname });
  });

  // ---------- Lead forms → WhatsApp (+ optional backend) ----------
  const phoneRe = /^(\+?254|0)?[17]\d{8}$/;
  document.querySelectorAll('.lead-form').forEach((form) => {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      const errs = [];
      const mark = (name, bad) => form.querySelector(`[name="${name}"]`)?.setAttribute('aria-invalid', bad ? 'true' : 'false');
      const phone = (d.phone || '').replace(/[\s-]/g, '');
      mark('name', !d.name?.trim()); if (!d.name?.trim()) errs.push('your name');
      mark('phone', !phoneRe.test(phone)); if (!phoneRe.test(phone)) errs.push('a valid Kenyan phone number');
      if (!d.consent) errs.push('consent to be contacted');
      if (errs.length) { status.className = 'form-status err'; status.textContent = 'Please add ' + errs.join(', ') + '.'; return; }

      const lines = [
        'Hi Steff Cloud! I would like a free growth audit.',
        `Name: ${d.name.trim()}`,
        `Phone: ${phone}`,
        d.business ? `Business: ${d.business}` : '',
        d.service ? `Interested in: ${d.service}` : '',
        d.budget ? `Budget: ${d.budget}` : '',
        d.message ? `Goal: ${d.message}` : '',
        `(via ${form.dataset.source})`,
      ].filter(Boolean);
      const url = `https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n'))}`;
      status.className = 'form-status'; status.textContent = 'Opening WhatsApp…';
      // Open synchronously so pop-up blockers allow it, then post to the backend in the background.
      const win = window.open(url, '_blank');
      if (win) win.opener = null;
      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, phone, page: location.href }) }).catch(() => {});
      }
      track('generate_lead', { source: form.dataset.source, service: d.service, budget: d.budget });
      if (!win) location.href = url;
      status.textContent = 'Thanks! Send the WhatsApp message and we’ll reply shortly. Prefer a call? ' + '+254 118 407 026';
      form.reset();
    });
  });

  // ---------- Blog filter ----------
  const grid = document.getElementById('post-grid');
  document.querySelectorAll('.chip-btn[data-filter]').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.chip-btn[data-filter]').forEach((x) => x.classList.toggle('is-on', x === b));
      grid?.querySelectorAll('.post-card').forEach((c) => { c.hidden = b.dataset.filter !== 'all' && c.dataset.cat !== b.dataset.filter; });
    });
  });

  // ---------- Glossary search ----------
  const gq = document.getElementById('gq');
  if (gq) gq.addEventListener('input', () => {
    const q = gq.value.trim().toLowerCase();
    document.querySelectorAll('#glossary > div').forEach((d) => { d.hidden = q && !d.textContent.toLowerCase().includes(q); });
  });

  // ---------- Reveal on scroll ----------
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const els = document.querySelectorAll('.sec-head, .svc-card, .steps li, .plan, .post-card, .facts div, .promises li, .deliv li');
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('reveal'); io.observe(el); } });
  }
})();
