// This serverless function intercepts /blog requests from social bots
// and serves proper OG tags, while passing humans through to blog.html

const SB_URL = 'https://gintajtpcijppyqkojga.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbnRhanRwY2lqcHB5cWtvamdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM4MjEsImV4cCI6MjA4ODkxOTgyMX0.rxU8EgKQM3RYrcql7CRnnX9jhmc2D1xNXTYjxcG99TM';
const DEFAULT_IMAGE = 'https://gintajtpcijppyqkojga.supabase.co/storage/v1/object/public/gallery/ChatGPT_Image_Apr_4__2026__12_04_19_AM.png';

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  const { slug } = req.query;
  const ua = req.headers['user-agent'] || '';
  const isBot = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|Googlebot|bot|crawler|spider/i.test(ua);

  // Humans get the normal blog page
  if (!isBot) {
    // Serve blog.html content
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'blog.html');
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(html);
    } catch(e) {
      res.redirect(302, '/news');
    }
    return;
  }

  // Bots get proper OG tags
  if (!slug) { res.redirect(302, 'https://www.kuomboka.com/news'); return; }

  try {
    const r = await fetch(
      `${SB_URL}/rest/v1/news_articles?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=title,excerpt,image_url,category,author`,
      { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } }
    );
    const data = await r.json();
    const a = data[0];
    if (!a) { res.redirect(302, 'https://www.kuomboka.com/news'); return; }

    const title = escapeHtml(a.title);
    const desc  = escapeHtml(a.excerpt || 'Read this article on Kuomboka.com');
    const img   = a.image_url || DEFAULT_IMAGE;
    const url   = `https://www.kuomboka.com/blog?slug=${encodeURIComponent(slug)}`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300');
    res.status(200).send(`<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" lang="en">
<head>
<meta charset="UTF-8">
<title>${title} | Kuomboka.com</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Kuomboka.com">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${img}">
<link rel="canonical" href="${url}">
</head>
<body><p>${title}</p></body>
</html>`);
  } catch(e) {
    res.redirect(302, 'https://www.kuomboka.com/news');
  }
}
