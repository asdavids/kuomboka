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
