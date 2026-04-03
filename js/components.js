/* ═══════════════════════════════════════════════
   KUOMBOKA.COM — Shared Components
   Nav, Footer, Newsletter injected via JS
   ═══════════════════════════════════════════════ */

const NAV_HTML = `
<nav class="nav">
  <div class="nav-stripe"></div>
  <div class="nav-body">
    <a href="index.html" class="nav-brand" style="display:flex;align-items:center;">
      <img src="https://gintajtpcijppyqkojga.supabase.co/storage/v1/object/public/gallery/ChatGPT_Image_Apr_4__2026__12_04_19_AM.png" alt="Kuomboka" style="height:50px;width:auto;object-fit:contain;"/>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" data-page="home">Home</a></li>
      <li><a href="history.html" data-page="history">History</a></li>
      <li><a href="lozi.html" data-page="lozi">Lozi People</a></li>
      <li><a href="attire.html" data-page="attire">Attire</a></li>
      <li><a href="travel.html" data-page="travel">Travel</a></li>
      <li><a href="news.html" data-page="news">News</a></li>
      <li><a href="contact.html" data-page="contact" class="nav-cta">Plan Visit</a></li>
    </ul>
    <div class="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>
<nav class="nav-mobile">
  <a href="index.html" data-page="home">Home</a>
  <a href="history.html" data-page="history">History</a>
  <a href="lozi.html" data-page="lozi">Lozi People</a>
  <a href="attire.html" data-page="attire">Traditional Attire</a>
  <a href="travel.html" data-page="travel">Travel Guide</a>
  <a href="news.html" data-page="news">News & Updates</a>
  <a href="contact.html" data-page="contact">Plan Your Visit</a>
</nav>`;

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
          <a class="ft-social-link" href="#">Facebook</a>
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
        <div class="ft-col-h">Partners</div>
        <ul class="ft-links">
          <li><a href="contact.html">Tourism Boards</a></li>
          <li><a href="contact.html">Media Enquiries</a></li>
          <li><a href="contact.html">Sponsorships</a></li>
          <li><a href="contact.html">Cultural Orgs</a></li>
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
  // Nav
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = NAV_HTML;

  // Footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
});
