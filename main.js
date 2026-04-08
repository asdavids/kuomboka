/* ═══════════════════════════════════════════════
   KUOMBOKA.COM — Main JavaScript
   ═══════════════════════════════════════════════ */

'use strict';

/* ── COUNTDOWN TIMER ── */
function initCountdown() {
  const target = new Date('2026-04-10T06:00:00');
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs'),
  };
  if (!els.d) return;

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) return;
    const pad = n => String(Math.floor(n)).padStart(2, '0');
    els.d.textContent = pad(diff / 86400000);
    els.h.textContent = pad((diff % 86400000) / 3600000);
    els.m.textContent = pad((diff % 3600000) / 60000);
    els.s.textContent = pad((diff % 60000) / 1000);
  }
  tick();
  setInterval(tick, 1000);
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.rev:not(.in)');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in'), i * 65);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

/* ── MOBILE NAV ── */
function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

/* ── ACTIVE NAV LINK ── */
function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}

/* ── NEWSLETTER FORM ── */
function initNewsletterForms() {
  document.querySelectorAll('.nl-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('.nl-input');
      if (!input.value) return;
      const btn = form.querySelector('.btn');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2a7a2a';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe ✦';
        btn.style.background = '';
      }, 3000);
    });
    // Allow clicking the button to submit
    const btn = form.querySelector('.btn');
    if (btn) btn.addEventListener('click', () => form.dispatchEvent(new Event('submit')));
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.querySelector('.contact-form-el');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#2a7a2a';
    setTimeout(() => {
      btn.textContent = 'Send Message ✦';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initReveal();
  initMobileNav();
  setActiveNav();
  initNewsletterForms();
  initContactForm();

  // Re-run reveal on scroll
  window.addEventListener('scroll', initReveal, { passive: true });
});


/* ════════════════════════════════════
   LANGUAGE SWITCHER — Google Translate
════════════════════════════════════ */
let currentLang = 'en';
let originalTexts = null;

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.toggle('open');
}

document.addEventListener('click', e => {
  const picker = document.getElementById('langPicker');
  const menu = document.getElementById('langMenu');
  if (picker && menu && !picker.contains(e.target)) {
    menu.classList.remove('open');
  }
});

function getTranslatableTexts() {
  const selectors = [
    'h1','h2','h3','.hero-sub','.hero-trans','.section-body-3d',
    '.card-body-3d','.card-link-3d','.sym-sub','.tl-desc',
    '.at-body p','.at-list li','.royal-q p','.nl-sub',
    '.ft-tagline','.gal-credit','.badge-text','.tl-title',
    '.card-title-3d','.sym-title','.nl-h','.ft-col-h'
  ];
  const elements = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (el.children.length === 0 && el.textContent.trim().length > 1) {
        elements.push(el);
      }
    });
  });
  return elements;
}

async function translatePage(lang, langName, label, btn) {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.remove('open');
  if (lang === currentLang) return;

  if (lang === 'en' && originalTexts) {
    originalTexts.forEach(({el, text}) => { el.textContent = text; });
    currentLang = 'en';
    const lbl = document.getElementById('currentLangLabel');
    if (lbl) lbl.textContent = 'EN';
    document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
    const first = document.querySelector('.lang-option');
    if (first) first.classList.add('active');
    document.body.style.direction = 'ltr';
    return;
  }

  const elements = getTranslatableTexts();
  if (!originalTexts) {
    originalTexts = elements.map(el => ({ el, text: el.textContent }));
  }

  // Show overlay
  let overlay = document.getElementById('translateOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'translateOverlay';
    overlay.className = 'translate-overlay';
    overlay.innerHTML = '<div class="translate-spinner"></div><div class="translate-msg" id="translateMsg">Translating...</div>';
    document.body.appendChild(overlay);
  }
  const msg = document.getElementById('translateMsg');
  overlay.classList.add('active');
  if (msg) msg.textContent = 'Translating to ' + langName + '...';

  const texts = [...new Set(elements.map(el => el.textContent.trim()).filter(t => t.length > 1))];

  try {
    const response = await fetch(
      'https://gintajtpcijppyqkojga.supabase.co/functions/v1/translate',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts, language: langName })
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    elements.forEach(el => {
      const orig = el.textContent.trim();
      if (data.translations[orig]) el.textContent = data.translations[orig];
    });

    document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
    currentLang = lang;
    const lbl = document.getElementById('currentLangLabel');
    if (lbl) lbl.textContent = label;
    document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

  } catch(e) {
    if (msg) msg.textContent = 'Translation failed: ' + e.message;
    setTimeout(() => overlay.classList.remove('active'), 3000);
    return;
  }

  overlay.classList.remove('active');
}
