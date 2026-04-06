const SB_URL = 'https://gintajtpcijppyqkojga.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbnRhanRwY2lqcHB5cWtvamdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM4MjEsImV4cCI6MjA4ODkxOTgyMX0.rxU8EgKQM3RYrcql7CRnnX9jhmc2D1xNXTYjxcG99TM';

const DEFAULT_IMAGE = 'https://gintajtpcijppyqkojga.supabase.co/storage/v1/object/public/gallery/ChatGPT_Image_Apr_4__2026__12_04_19_AM.png';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  const { slug } = req.query;
  if (!slug) { res.redirect(302, 'https://www.kuomboka.com/news'); return; }

  try {
    const r = await fetch(
      `${SB_URL}/rest/v1/news_articles?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,image_url,category,author,read_time`,
      { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } }
    );
    const data = await r.json();
    const a = data[0];
    if (!a) { res.redirect(302, 'https://www.kuomboka.com/news'); return; }

    const title    = escapeHtml(a.title);
    const desc     = escapeHtml(a.excerpt || 'Read this article on Kuomboka.com — celebrating the Kuomboka ceremony and the Lozi people of Barotseland, Zambia.');
    const img      = a.image_url || DEFAULT_IMAGE;
    const category = escapeHtml(a.category || 'Culture');
    const author   = escapeHtml(a.author || 'Kuomboka Editorial');
    const readTime = a.read_time || 5;
    const articleUrl = `https://www.kuomboka.com/blog?slug=${encodeURIComponent(slug)}`;
    const shareUrl   = `https://www.kuomboka.com/api/share?slug=${encodeURIComponent(slug)}`;

    const ua = req.headers['user-agent'] || '';
    const isBot = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|Googlebot|bot|crawler|spider/i.test(ua);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).send(`<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article#" lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title} | Kuomboka.com</title>
<meta name="description" content="${desc}">

<!-- Open Graph — Facebook, WhatsApp, LinkedIn -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="Kuomboka.com">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${title}">
<meta property="og:url" content="${shareUrl}">
<meta property="article:section" content="${category}">
<meta property="article:author" content="${author}">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@kuomboka">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${img}">
<meta name="twitter:image:alt" content="${title}">

<!-- Canonical -->
<link rel="canonical" href="${articleUrl}">

${!isBot ? `<script>window.location.replace("${articleUrl}");</script>` : ''}

<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Georgia',serif;background:#0a0a0a;color:#fff;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem;padding:2rem;}
.scene{display:flex;flex-direction:column;align-items:center;gap:1.5rem;}
.drums{display:flex;gap:2rem;align-items:flex-end;}
.drum{display:flex;flex-direction:column;align-items:center;animation:drumBeat 0.6s ease-in-out infinite;}
.drum:nth-child(2){animation-delay:0.2s;}
.drum:nth-child(3){animation-delay:0.4s;}
@keyframes drumBeat{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
.drum-body{width:60px;height:90px;background:linear-gradient(135deg,#5c2e00,#8B4513,#5c2e00);border-radius:8px 8px 12px 12px;border:3px solid #A57B0A;position:relative;box-shadow:0 8px 20px rgba(0,0,0,0.6),inset 0 2px 4px rgba(165,123,10,0.3);}
.drum-body::before{content:'';position:absolute;top:0;left:0;right:0;height:14px;background:linear-gradient(135deg,#c8a876,#A57B0A,#c8a876);border-radius:5px 5px 0 0;border-bottom:2px solid #7a5c0a;}
.drum-body::after{content:'';position:absolute;bottom:0;left:0;right:0;height:14px;background:linear-gradient(135deg,#c8a876,#A57B0A,#c8a876);border-radius:0 0 9px 9px;border-top:2px solid #7a5c0a;}
.drum-stripe{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:80%;height:3px;background:rgba(165,123,10,0.5);box-shadow:0 8px 0 rgba(165,123,10,0.3),0 -8px 0 rgba(165,123,10,0.3);}
.sticks{display:flex;gap:10px;margin-bottom:4px;}
.stick{width:5px;height:40px;background:linear-gradient(to bottom,#d4a96a,#8B6914);border-radius:3px 3px 2px 2px;transform-origin:bottom center;}
.stick-l{animation:stickL 0.6s ease-in-out infinite;}
.stick-r{animation:stickR 0.6s ease-in-out infinite;}
.drum:nth-child(2) .stick-l,.drum:nth-child(2) .stick-r{animation-delay:0.2s;}
.drum:nth-child(3) .stick-l,.drum:nth-child(3) .stick-r{animation-delay:0.4s;}
@keyframes stickL{0%,100%{transform:rotate(-20deg);}50%{transform:rotate(-45deg);}}
@keyframes stickR{0%,100%{transform:rotate(20deg);}50%{transform:rotate(45deg);}}
.waves{position:relative;height:30px;width:120px;}
.wave{position:absolute;left:50%;top:50%;border:2px solid rgba(165,123,10,0.6);border-radius:50%;transform:translate(-50%,-50%);animation:ripple 1.2s ease-out infinite;}
.wave:nth-child(2){animation-delay:0.4s;}
.wave:nth-child(3){animation-delay:0.8s;}
@keyframes ripple{0%{width:10px;height:10px;opacity:1;}100%{width:80px;height:80px;opacity:0;}}
.label{font-size:.6rem;letter-spacing:.4em;text-transform:uppercase;color:#A57B0A;margin-top:.5rem;}
.sub{font-size:.7rem;letter-spacing:.1em;color:rgba(255,255,255,.3);font-style:italic;}
</style>
</head>
<body>
<div class="scene">
  <div class="drums">
    <div class="drum">
      <div class="sticks"><div class="stick stick-l"></div><div class="stick stick-r"></div></div>
      <div class="drum-body"><div class="drum-stripe"></div></div>
    </div>
    <div class="drum">
      <div class="sticks"><div class="stick stick-l"></div><div class="stick stick-r"></div></div>
      <div class="drum-body" style="width:80px;height:110px;"><div class="drum-stripe"></div></div>
    </div>
    <div class="drum">
      <div class="sticks"><div class="stick stick-l"></div><div class="stick stick-r"></div></div>
      <div class="drum-body"></div>
    </div>
  </div>
  <div class="waves"><div class="wave"></div><div class="wave"></div><div class="wave"></div></div>
  <div class="label">The Maoma Drums Call</div>
  <div class="sub">Loading article — kuomboka.com</div>
</div>
</body>
</html>`);
  } catch(e) {
    res.redirect(302, 'https://www.kuomboka.com/news');
  }
}
