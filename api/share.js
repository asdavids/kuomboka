const SB_URL = 'https://gintajtpcijppyqkojga.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbnRhanRwY2lqcHB5cWtvamdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM4MjEsImV4cCI6MjA4ODkxOTgyMX0.rxU8EgKQM3RYrcql7CRnnX9jhmc2D1xNXTYjxcG99TM';

export default async function handler(req, res) {
  const { slug } = req.query;
  if (!slug) { res.redirect(302, '/news'); return; }

  try {
    const r = await fetch(
      `${SB_URL}/rest/v1/news_articles?slug=eq.${slug}&published=eq.true&select=title,excerpt,image_url,category`,
      { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } }
    );
    const data = await r.json();
    const a = data[0];
    if (!a) { res.redirect(302, '/news'); return; }

    const title = a.title;
    const desc = a.excerpt || 'Read this article on Kuomboka.com';
    const img = a.image_url || 'https://gintajtpcijppyqkojga.supabase.co/storage/v1/object/public/gallery/ChatGPT_Image_Apr_4__2026__12_04_19_AM.png';
    const articleUrl = `https://www.kuomboka.com/blog?slug=${slug}`;
    const shareUrl = `https://www.kuomboka.com/api/share?slug=${slug}`;

    const ua = req.headers['user-agent'] || '';
    const isBot = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|bot|crawler/i.test(ua);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).send(`<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" lang="en">
<head>
<meta charset="UTF-8">
<title>${title} | Kuomboka.com</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${shareUrl}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Kuomboka.com">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${img}">
${!isBot ? `<script>window.location.href="${articleUrl}"</script>` : ''}
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem}.card{max-width:680px;width:100%}img{width:100%;display:block}.body{padding:2rem;background:#111}.cat{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:#A57B0A;margin-bottom:.8rem}h1{font-size:1.4rem;line-height:1.3;margin-bottom:1rem}p{font-size:.95rem;line-height:1.7;color:rgba(255,255,255,.6);margin-bottom:1.5rem}a{display:inline-block;padding:.9rem 2rem;background:#A57B0A;color:#000;font-weight:700;text-decoration:none;font-size:.85rem;text-transform:uppercase}</style>
</head>
<body>
<div class="card">
<img src="${img}" alt="${title}" width="1200" height="630">
<div class="body">
<div class="cat">${a.category || 'Kuomboka.com'}</div>
<h1>${title}</h1>
<p>${desc}</p>
<a href="${articleUrl}">Read Full Article</a>
</div>
</div>
</body>
</html>`);
  } catch(e) {
    res.redirect(302, '/news');
  }
}
