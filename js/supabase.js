const SUPABASE_URL = 'https://gintajtpcijppyqkojga.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbnRhanRwY2lqcHB5cWtvamdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM4MjEsImV4cCI6MjA4ODkxOTgyMX0.rxU8EgKQM3RYrcql7CRnnX9jhmc2D1xNXTYjxcG99TM';
const EMAIL_ALERT_URL = `${SUPABASE_URL}/functions/v1/send-email-alert`;

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

async function sendEmailAlert(type, data) {
  try {
    await fetch(EMAIL_ALERT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data })
    });
  } catch(e) {
    console.log('Email alert failed silently:', e.message);
  }
}

async function handleSubscribe(form) {
  const input = form.querySelector('.nl-input') || form.querySelector('input[type="email"]');
  const btn = form.querySelector('.btn, button');
  const email = input ? input.value.trim() : '';

  if (!email || !email.includes('@')) {
    if (input) { input.style.borderColor = 'red'; setTimeout(() => input.style.borderColor = '', 2000); }
    return;
  }

  const originalText = btn.textContent;
  btn.textContent = 'Subscribing...';
  btn.disabled = true;

  const data = { email, interest: 'All Updates' };

  try {
    const res = await supabaseInsert('subscribers', data);
    if (res.status === 201 || res.status === 200) {
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2a7a2a';
      if (input) input.value = '';
      await sendEmailAlert('subscriber', data);
    } else if (res.status === 409) {
      btn.textContent = '✓ Already subscribed!';
      btn.style.background = '#2a5a7a';
    } else {
      btn.textContent = 'Error — try again';
      btn.style.background = 'var(--crimson, #9B1C2E)';
    }
  } catch(e) {
    btn.textContent = 'Error — try again';
    btn.style.background = 'var(--crimson, #9B1C2E)';
  }

  btn.disabled = false;
  setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; }, 4000);
}

async function handleContactForm(btn) {
  const form = btn.closest('.contact-form');
  const inputs = form.querySelectorAll('input[type="text"]');
  const name = inputs[0]?.value.trim();
  const org = inputs[1]?.value.trim();
  const email = form.querySelector('input[type="email"]')?.value.trim();
  const phone = form.querySelector('input[type="tel"]')?.value.trim();
  const selects = form.querySelectorAll('select');
  const enquiry_type = selects[0]?.value;
  const source = selects[1]?.value;
  const message = form.querySelector('textarea')?.value.trim();

  if (!name || !email || !message) {
    btn.textContent = '⚠ Fill in required fields';
    btn.style.background = '#9B1C2E';
    setTimeout(() => { btn.textContent = 'Send Message ✦'; btn.style.background = ''; }, 3000);
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = { name, organisation: org, email, phone, enquiry_type, message, source };

  try {
    const res = await supabaseInsert('contact_messages', data);
    if (res.status === 201 || res.status === 200) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#2a7a2a';
      form.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
      await sendEmailAlert('contact', data);
    } else {
      btn.textContent = 'Error — try again';
      btn.style.background = '#9B1C2E';
    }
  } catch(e) {
    btn.textContent = 'Error — try again';
    btn.style.background = '#9B1C2E';
  }

  btn.disabled = false;
  setTimeout(() => { btn.textContent = 'Send Message ✦'; btn.style.background = ''; }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Newsletter forms
  document.querySelectorAll('.nl-form, form.nl-form').forEach(form => {
    const btn = form.querySelector('.btn, button');
    if (btn) btn.addEventListener('click', () => handleSubscribe(form));
    form.addEventListener('submit', e => { e.preventDefault(); handleSubscribe(form); });
  });

  // Contact form
  const contactBtn = document.querySelector('.contact-submit-btn');
  if (contactBtn) contactBtn.addEventListener('click', () => handleContactForm(contactBtn));
});
