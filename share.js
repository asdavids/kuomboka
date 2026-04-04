const SB_URL = 'https://gintajtpcijppyqkojga.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbnRhanRwY2lqcHB5cWtvamdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM4MjEsImV4cCI6MjA4ODkxOTgyMX0.rxU8EgKQM3RYrcql7CRnnX9jhmc2D1xNXTYjxcG99TM';

export default async function handler(req, res) {
  const slug = req.query.slug;

  if (!slug) {
    res.redirect(302, '/news');
    return;
  }

  try {
    const response = await fetch(
      `${SB_URL}/rest/v1/news_articles?slug=eq.${slug}&published=eq.true&select=title,excerpt,image_url,category`,
      { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } }
    );

    const data = await response.json();
    const article = data[0];

    if (!article) {
      res.redirect(302, '/news');
      return;
    }

    const title = article.title;
    const description = article.excerpt || 'Read this article on Kuomboka.com';
    const image = article.image_url || 'https://gintajtpcijppyqkojga.supabase.co/storage/v1/object/public/gallery/ChatGPT_Image_Apr_4__2026__12_04_19_AM.png';
    const articleUrl = `https://www.kuomboka.com/blog?slug=${slug}`;
    const shareUrl = `https://www.kuomboka.com/api/share?slug=${slug}`;

    const html = `<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Kuomboka.com</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:secure_url" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:url" content="${shareUrl}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Kuomboka.com">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${image}">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:Arial,sans-serif;background:#0a0a0a;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}
    .card{max-width:680px;width:100%;}
    .img{width:100%;aspect-ratio:1200/630;object-fit:cover;display:block;}
    .body{padding:2rem;background:#111;}
    .cat{font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:#A57B0A;margin-bottom:.8rem;}
    h1{font-size:1.4rem;line-height:1.3;margin-bottom:1rem;color:#fff;}
    p{font-size:.95rem;line-height:1.7;color:rgba(255,255,255,.6);margin-bottom:1.5rem;}
    a.btn{display:inline-block;padding:.9rem 2rem;background:#A57B0A;color:#000;font-weight:700;text-decoration:none;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;}
    .site{font-size:.7rem;color:rgba(255,255,255,.25);margin-top:1rem;}
  </style>
</head>
<body>
  <div class="card">
    <img class="img" src="${image}" alt="${title}"/>
    <div class="body">
      <div class="cat">${article.category || 'Kuomboka.com'}</div>
      <h1>${title}</h1>
      <p>${description}</p>
      <a class="btn" href="${articleUrl}">Read Full Article →</a>
      <p class="site">kuomboka.com</p>
    </div>
  </div>
  <script>setTimeout(()=>{window.location.href="${articleUrl}"},1500);</script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).send(html);

  } catch(e) {
    res.redirect(302, '/news');
  }
}
