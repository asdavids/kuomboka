/* WebP image helper: maps Supabase gallery images to local WebP copies and asks Cloudinary for WebP. Safe no-op for any other URL. */
window.KB_WEBP = {"12CAFD72-9873-4B60-9824-D9D13C795301.PNG":"12CAFD72-9873-4B60-9824-D9D13C795301.webp","ChatGPT Image Apr 3, 2026, 10_48_07 PM.png":"ChatGPT_Image_Apr_3_2026_10_48_07_PM.webp","ChatGPT Image Apr 3, 2026, 10_49_32 PM.png":"ChatGPT_Image_Apr_3_2026_10_49_32_PM.webp","ChatGPT Image Apr 3, 2026, 10_55_22 PM.png":"ChatGPT_Image_Apr_3_2026_10_55_22_PM.webp","ChatGPT Image Apr 5, 2026, 10_27_02 PM.png":"ChatGPT_Image_Apr_5_2026_10_27_02_PM.webp","ChatGPT Image Apr 5, 2026, 10_30_19 PM.png":"ChatGPT_Image_Apr_5_2026_10_30_19_PM.webp","ChatGPT Image Apr 5, 2026, 10_51_05 PM.png":"ChatGPT_Image_Apr_5_2026_10_51_05_PM.webp","ChatGPT Image Apr 5, 2026, 10_52_59 PM.png":"ChatGPT_Image_Apr_5_2026_10_52_59_PM.webp","ChatGPT Image Apr 5, 2026, 10_54_56 PM.png":"ChatGPT_Image_Apr_5_2026_10_54_56_PM.webp","ChatGPT Image Apr 5, 2026, 10_56_01 PM.png":"ChatGPT_Image_Apr_5_2026_10_56_01_PM.webp","ChatGPT Image Apr 5, 2026, 10_57_30 PM.png":"ChatGPT_Image_Apr_5_2026_10_57_30_PM.webp","ChatGPT Image Apr 6, 2026, 07_54_40 AM.jpg":"ChatGPT_Image_Apr_6_2026_07_54_40_AM.webp","ChatGPT_Image_Apr_3__2026__11_50_55_PM.png.png":"ChatGPT_Image_Apr_3__2026__11_50_55_PM.png.webp","ChatGPT_Image_Apr_4__2026__01_09_55_AM.png":"ChatGPT_Image_Apr_4__2026__01_09_55_AM.webp","ChatGPT_Image_Apr_4__2026__01_13_06_AM.png":"ChatGPT_Image_Apr_4__2026__01_13_06_AM.webp","ChatGPT_Image_Apr_4__2026__12_04_19_AM.png":"ChatGPT_Image_Apr_4__2026__12_04_19_AM.webp","ChatGPT_Image_Apr_4__2026__12_11_47_AM.png":"ChatGPT_Image_Apr_4__2026__12_11_47_AM.webp","IMG_0210.JPG":"IMG_0210.webp","IMG_0211.JPG":"IMG_0211.webp","IMG_0212.JPG":"IMG_0212.webp","IMG_0213.JPG":"IMG_0213.webp","IMG_0214.JPG":"IMG_0214.webp","IMG_0215.JPG":"IMG_0215.webp","IMG_0216.JPG":"IMG_0216.webp","IMG_0217.JPG":"IMG_0217.webp","IMG_0218.JPG":"IMG_0218.webp","IMG_0219.JPG":"IMG_0219.webp","IMG_0220.JPG":"IMG_0220.webp","IMG_0221.JPG":"IMG_0221.webp","IMG_0222.JPG":"IMG_0222.webp","imgi_98_659088819_1499564994871625_7244460029827478859_n.jpg":"imgi_98_659088819_1499564994871625_7244460029827478859_n.webp","imgi_99_660193786_1499564998204958_4254521191347126465_n.jpg":"imgi_99_660193786_1499564998204958_4254521191347126465_n.webp"};
window.kbImg = function (u) {
  try {
    if (!u || typeof u !== 'string') return u;
    var s = u.match(/^https:\/\/gintajtpcijppyqkojga\.supabase\.co\/storage\/v1\/object\/public\/gallery\/([^?#]+)/);
    if (s) { var n = decodeURIComponent(s[1]); return window.KB_WEBP[n] ? '/img/' + window.KB_WEBP[n] : u; }
    if (/^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(u) && u.indexOf('f_webp') === -1) {
      return u.replace('/image/upload/', '/image/upload/f_webp,q_80,w_1200/');
    }
  } catch (e) {}
  return u;
};

/* ═══════════════════════════════════════════════
   KUOMBOKA.COM — Shared Components
   Nav, Footer, Newsletter injected via JS
   ═══════════════════════════════════════════════ */

const NAV_HTML = `
<nav class="nav">
  <div class="nav-stripe"></div>
  <div class="nav-body">
    <a href="index.html" class="nav-brand" style="display:flex;align-items:center;">
      <img src="/img/ChatGPT_Image_Apr_4__2026__12_04_19_AM.webp" alt="Kuomboka" style="height:50px;width:auto;object-fit:contain;"/>
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
  <a href="gallery.html" data-page="gallery">Gallery</a>
  <a href="shop.html" data-page="shop">Shop</a>
  <a href="directory.html" data-page="directory">Stay & Travel</a>
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
  // Nav
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = NAV_HTML;

  // Footer
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;
});
