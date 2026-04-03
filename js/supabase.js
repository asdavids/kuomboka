/* ═══════════════════════════════════════════════
   KUOMBOKA.COM — Supabase Integration
   Handles: Newsletter, Contact Form, News, Gallery
   ═══════════════════════════════════════════════ */

const SUPABASE_URL = 'https://gintajtpcijppyqkojga.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbnRhanRwY2lqcHB5cWtvamdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM4MjEsImV4cCI6MjA4ODkxOTgyMX0.rxU8EgKQM3RYrcql7CRnnX9jhmc2D1xNXTYjxcG99TM';

/* ── SUPABASE API HELPER ── */
async function supabaseInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  return res;
}

async function supabaseFetch(table, filter = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  return res.json();
}

/* ── NEWSLETTER SUBSCRIBE ── */
async function handleSubscribe(form) {
  const input = form.querySelector('.nl-input');
  const btn = form.querySelector('.btn');
  const email = input.value.trim();

  if (!email || !email.includes('@')) {
    input.style.borderColor = 'var(--crimson)';
    input.placeholder = 'Please enter a valid email';
    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = 'Your email address';
    }, 2000);
    return;
  }

  // Loading state
  btn.textContent = 'Subscribing...';
  btn.disabled = true;

  try {
    const res = await supabaseInsert('subscribers', { email });

    if (res.status === 201 || res.status === 200) {
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2a7a2a';
      input.value = '';
    } else if (res.status === 409) {
      // Already subscribed
      btn.textContent = '✓ Already subscribed!';
      btn.style.background = '#2a5a7a';
      input.value = '';
    } else {
      throw new Error('Failed');
    }
  } catch (err) {
    btn.textContent = 'Try again';
    btn.style.background = 'var(--crimson)';
  }

  btn.disabled = false;
  setTimeout(() => {
    btn.textContent = 'Subscribe ✦';
    btn.style.background = '';
  }, 4000);
}

/* ── NEWS SUBSCRIBE (with name + interest) ── */
async function handleNewsSubscribe(form) {
  const name = form.querySelector('input[type="text"]')?.value.trim();
  const email = form.querySelector('input[type="email"]')?.value.trim();
  const interest = form.querySelector('select')?.value;
  const btn = form.querySelector('.btn');

  if (!email || !email.includes('@')) return;

  btn.textContent = 'Subscribing...';
  btn.disabled = true;

  try {
    const res = await supabaseInsert('subscribers', { name, email, interest });

    if (res.status === 201 || res.status === 200) {
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2a7a2a';
      form.reset();
    } else if (res.status === 409) {
      btn.textContent = '✓ Already subscribed!';
      btn.style.background = '#2a5a7a';
    } else {
      throw new Error('Failed');
    }
  } catch (err) {
    btn.textContent = 'Try again';
    btn.style.background = 'var(--crimson)';
  }

  btn.disabled = false;
  setTimeout(() => {
    btn.textContent = 'Subscribe ✦';
    btn.style.background = '';
  }, 4000);
}

/* ── CONTACT FORM ── */
async function handleContactForm(btn) {
  const form = btn.closest('.contact-form');

  const name = form.querySelector('input[type="text"]')?.value.trim();
  const org = form.querySelectorAll('input[type="text"]')[1]?.value.trim();
  const email = form.querySelector('input[type="email"]')?.value.trim();
  const phone = form.querySelector('input[type="tel"]')?.value.trim();
  const selects = form.querySelectorAll('select');
  const enquiry_type = selects[0]?.value;
  const source = selects[1]?.value;
  const message = form.querySelector('textarea')?.value.trim();

  if (!name || !email || !message) {
    btn.textContent = '⚠ Please fill in all required fields';
    btn.style.background = 'var(--crimson)';
    setTimeout(() => {
      btn.textContent = 'Send Message ✦';
      btn.style.background = '';
    }, 3000);
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await supabaseInsert('contact_messages', {
      name, organisation: org, email, phone,
      enquiry_type, message, source
    });

    if (res.status === 201 || res.status === 200) {
      btn.textContent = '✓ Message Sent! We\'ll be in touch soon.';
      btn.style.background = '#2a7a2a';
      form.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
    } else {
      throw new Error('Failed');
    }
  } catch (err) {
    btn.textContent = 'Something went wrong — please try again';
    btn.style.background = 'var(--crimson)';
  }

  btn.disabled = false;
  setTimeout(() => {
    btn.textContent = 'Send Message ✦';
    btn.style.background = '';
  }, 5000);
}

/* ── LOAD NEWS FROM SUPABASE ── */
async function loadNews() {
  const grid = document.querySelector('.news-grid');
  if (!grid) return;

  try {
    const articles = await supabaseFetch(
      'news_articles',
      'published=eq.true&order=created_at.desc&limit=9'
    );

    if (!articles || articles.length === 0) return; // Keep static content

    // Clear grid and insert real articles
    grid.innerHTML = '';
    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.dataset.cat = article.category?.toLowerCase().replace(' ', '') || 'culture';
      card.innerHTML = `
        <div class="nc-img" style="background:linear-gradient(135deg,#0a1628,#1a3a6e);">
          <span style="font-size:3rem;">${getCategoryIcon(article.category)}</span>
          <span class="nc-cat" style="background:${getCategoryColor(article.category)};color:#fff;">${article.category}</span>
        </div>
        <div class="nc-body">
          <div class="nc-date">${formatDate(article.created_at)}</div>
          <div class="nc-title">${article.title}</div>
          <p>${article.excerpt || ''}</p>
          <a href="#" class="nc-more">Read More →</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    // Silently fail — static content remains
  }
}

/* ── LOAD GALLERY FROM SUPABASE ── */
async function loadGallery() {
  const mosaic = document.querySelector('.gal-mosaic');
  if (!mosaic) return;

  try {
    const photos = await supabaseFetch(
      'gallery_photos',
      'published=eq.true&order=created_at.desc&limit=10'
    );

    if (!photos || photos.length === 0) return; // Keep placeholder content

    // Replace placeholder cells with real photos
    const cells = mosaic.querySelectorAll('.gal-cell');
    photos.forEach((photo, i) => {
      if (!cells[i]) return;
      const bg = cells[i].querySelector('.gal-bg');
      if (bg && photo.image_url) {
        bg.style.backgroundImage = `url('${photo.image_url}')`;
        bg.style.backgroundSize = 'cover';
        bg.style.backgroundPosition = 'center';
        bg.innerHTML = ''; // Remove placeholder emoji
      }
      const label = cells[i].querySelector('.gal-label');
      if (label) label.textContent = photo.title;
      const sublabel = cells[i].querySelector('.gal-sublabel');
      if (sublabel) sublabel.textContent = photo.caption || '';
    });
  } catch (err) {
    // Silently fail — placeholders remain
  }
}

/* ── HELPERS ── */
function getCategoryIcon(cat) {
  const icons = {
    'Ceremony': '🥁', 'Travel': '✈️', 'Culture': '📖',
    'Heritage': '🐘', 'Music': '🎶', 'Flood Update': '🌊'
  };
  return icons[cat] || '📰';
}

function getCategoryColor(cat) {
  const colors = {
    'Ceremony': '#9B1C2E', 'Travel': '#7A5C38',
    'Culture': '#A57B0A', 'Heritage': '#A57B0A',
    'Music': '#7A5C38', 'Flood Update': '#1E4A8C'
  };
  return colors[cat] || '#9B1C2E';
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'long'
  });
}

/* ── WIRE UP ALL FORMS ON PAGE LOAD ── */
document.addEventListener('DOMContentLoaded', () => {

  // Newsletter forms (simple email only)
  document.querySelectorAll('.nl-form').forEach(form => {
    const btn = form.querySelector('.btn');
    if (btn) {
      btn.addEventListener('click', () => handleSubscribe(form));
    }
    form.addEventListener('submit', e => {
      e.preventDefault();
      handleSubscribe(form);
    });
  });

  // News page subscribe form (name + email + interest)
  const newsForm = document.querySelector('.news-subscribe-form');
  if (newsForm) {
    const btn = newsForm.querySelector('.btn');
    if (btn) btn.addEventListener('click', () => handleNewsSubscribe(newsForm));
  }

  // Contact form button
  const contactBtn = document.querySelector('.contact-submit-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => handleContactForm(contactBtn));
  }

  // Load dynamic content
  loadNews();
  loadGallery();
});
