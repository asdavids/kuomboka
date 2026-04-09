/* ═══════════════════════════════════════════════
   KUOMBOKA.COM — Shared Components
   Nav, Footer, Newsletter, Language Switcher
   ═══════════════════════════════════════════════ */

const NAV_HTML = `
<nav class="nav">
  <div class="nav-stripe"></div>
  <div class="nav-body">
    <a href="index.html" class="nav-brand" style="display:flex;align-items:center;flex-shrink:0;">
      <img src="https://gintajtpcijppyqkojga.supabase.co/storage/v1/object/public/gallery/ChatGPT_Image_Apr_4__2026__12_04_19_AM.png" alt="Kuomboka" style="height:50px;width:auto;object-fit:contain;"/>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" data-page="home">Home</a></li>
      <li><a href="history.html" data-page="history">History</a></li>
      <li><a href="lozi.html" data-page="lozi">Lozi People</a></li>
      <li><a href="attire.html" data-page="attire">Attire</a></li>
      <li><a href="travel.html" data-page="travel">Travel</a></li>
      <li><a href="news.html" data-page="news">News</a></li>
      <li><a href="gallery.html" data-page="gallery">Gallery</a></li>
      <li><a href="shop.html" data-page="shop">Shop</a></li>
      <li><a href="directory.html" data-page="directory">Stay &amp; Travel</a></li>
      <li><a href="contact.html" data-page="contact" class="nav-cta">Plan Visit</a></li>
    </ul>
    <div style="display:flex;align-items:center;gap:.4rem;flex-shrink:0;">
      <div class="lang-picker" id="langPicker">
        <button class="lang-globe" onclick="toggleLangMenu()" aria-label="Translate">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span id="currentLangLabel">EN</span>
        </button>
        <div class="lang-menu" id="langMenu">
          <div class="lang-menu-header">Translate Page</div>
          <button class="lang-option active" onclick="translatePage('en','English','EN',this)">🇬🇧 English</button>
          <button class="lang-option" onclick="translatePage('fr','French','FR',this)">🇫🇷 Français</button>
          <button class="lang-option" onclick="translatePage('es','Spanish','ES',this)">🇪🇸 Español</button>
          <button class="lang-option" onclick="translatePage('pt','Portuguese','PT',this)">🇧🇷 Português</button>
          <button class="lang-option" onclick="translatePage('de','German','DE',this)">🇩🇪 Deutsch</button>
          <button class="lang-option" onclick="translatePage('zh','Chinese','中文',this)">🇨🇳 中文</button>
          <button class="lang-option" onclick="translatePage('ar','Arabic','AR',this)">🇸🇦 العربية</button>
          <button class="lang-option" onclick="translatePage('hi','Hindi','HI',this)">🇮🇳 हिन्दी</button>
          <button class="lang-option" onclick="translatePage('sw','Swahili','SW',this)">🌍 Kiswahili</button>
        </div>
      </div>
      <div class="nav-hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</nav>
<nav class="nav-mobile" id="mobileNav">
  <a href="index.html" data-page="home">Home</a>
  <a href="history.html" data-page="history">History</a>
  <a href="lozi.html" data-page="lozi">Lozi People</a>
  <a href="attire.html" data-page="attire">Traditional Attire</a>
  <a href="travel.html" data-page="travel">Travel Guide</a>
  <a href="news.html" data-page="news">News & Updates</a>
  <a href="gallery.html" data-page="gallery">Gallery</a>
  <a href="shop.html" data-page="shop">Shop</a>
  <a href="directory.html" data-page="directory">Stay & Travel</a>
  <a href="contact.html" data-page="contact">Plan Your Visit</a>
</nav>
<div class="translate-overlay" id="translateOverlay">
  <div class="translate-spinner"></div>
  <div class="translate-msg" id="translateMsg">Translating...</div>
</div>`;

const FOOTER_HTML = `
<section class="nl-section">
  <div class="nl-inner">
    <span class="section-label gold center">Stay Connected</span>
    <h2 class="nl-h">Be the First to Hear the Maoma Drums</h2>
    <p class="nl-sub">Ceremony dates, flood alerts, cultural stories &amp; travel updates — direct to you.</p>
    <div class="nl-form">
      <input class="nl-input" type="email" placeholder="Your email address"/>
      <button class="btn btn-gold">Subscribe ✦</button>
    </div>
    <p class="nl-note">No spam. Only the sound of the drums when it matters.</p>
  </div>
</section>
<div class="s-bw-sm"></div>
<footer class="site-footer">
  <div class="ft-inner">
    <div class="ft-top">
      <div>
        <div class="ft-brand">KUOMBOKA</div>
        <p class="ft-tagline">The official digital home of the Kuomboka ceremony and the Lozi people of Barotseland, Western Province, Zambia.</p>
        <div class="ft-socials">
          <a class="ft-social-link" href="https://www.facebook.com/profile.php?id=61573359297429" target="_blank">Facebook</a>
          <a class="ft-social-link" href="#">YouTube</a>
          <a class="ft-social-link" href="#">TikTok</a>
          <a class="ft-social-link" href="#">Instagram</a>
        </div>
      </div>
      <div>
        <div class="ft-col-h">Explore</div>
        <ul class="ft-links">
          <li><a href="history.html">History of Kuomboka</a></li>
          <li><a href="lozi.html">The Lozi People</a></li>
          <li><a href="attire.html">Traditional Attire</a></li>
          <li><a href="gallery.html">Photo Gallery</a></li>
          <li><a href="news.html">News Archive</a></li>
        </ul>
      </div>
      <div>
        <div class="ft-col-h">Visit</div>
        <ul class="ft-links">
          <li><a href="travel.html">Travel Guide</a></li>
          <li><a href="travel.html#getting-there">Getting to Mongu</a></li>
          <li><a href="travel.html#stay">Where to Stay</a></li>
          <li><a href="news.html">Ceremony Dates</a></li>
          <li><a href="live.html">Live Stream</a></li>
        </ul>
      </div>
      <div>
        <div class="ft-col-h">Marketplace</div>
        <ul class="ft-links">
          <li><a href="shop.html">Lozi Attire &amp; Crafts</a></li>
          <li><a href="shop.html#list-your-item">Sell Your Products</a></li>
          <li><a href="directory.html">Business Directory</a></li>
          <li><a href="directory.html#advertise">Advertise With Us</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div class="s-bw-sm" style="margin: 0 -2rem; width: calc(100% + 4rem);"></div>
    <div class="ft-bottom">
      <p class="ft-copy">© 2026 Kuomboka.com · Western Province, Zambia · All Rights Reserved</p>
      <p class="ft-silozi">Setu Ni Setu — Lozi Heritage Lives</p>
    </div>
  </div>
</footer>`;

// Inject nav and footer
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = NAV_HTML;

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // Highlight active nav link
  const page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.nav-links [data-page], .nav-mobile [data-page]').forEach(a => {
      if (a.getAttribute('data-page') === page) a.style.color = 'var(--gold2, #D4B030)';
    });
  }

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // Close lang menu on outside click
  document.addEventListener('click', e => {
    const picker = document.getElementById('langPicker');
    const menu = document.getElementById('langMenu');
    if (picker && menu && !picker.contains(e.target)) menu.classList.remove('open');
  });

  // Newsletter
  document.querySelectorAll('.nl-form').forEach(form => {
    const btn = form.querySelector('button');
    if (btn) btn.addEventListener('click', () => {
      if (typeof handleSubscribe === 'function') handleSubscribe(form);
    });
  });
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

function getTranslatableTexts() {
  const selectors = [
    'h1','h2','h3','.hero-sub','.hero-trans','.section-body-3d',
    '.card-body-3d','.card-link-3d','.sym-sub','.tl-desc',
    '.at-body p','.at-list li','.royal-q p','.nl-sub',
    '.ft-tagline','.gal-credit','.badge-text','.tl-title',
    '.card-title-3d','.sym-title','.nl-h','.ft-col-h',
    '.section-h-3d','.hero-badge .badge-text','.sticky-cta-text',
    '.tl-time','.at-head h3','.royal-q cite','.gal-title'
  ];
  const elements = [];
  const seen = new Set();
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!seen.has(el) && el.children.length === 0 && el.textContent.trim().length > 1) {
        elements.push(el);
        seen.add(el);
      }
    });
  });
  return elements;
}

async function translatePage(lang, langName, label, btn) {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.remove('open');
  if (lang === currentLang) return;

  // Restore English
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
