const SUPABASE_URL = 'https://gintajtpcijppyqkojga.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpbnRhanRwY2lqcHB5cWtvamdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDM4MjEsImV4cCI6MjA4ODkxOTgyMX0.rxU8EgKQM3RYrcql7CRnnX9jhmc2D1xNXTYjxcG99TM';

async function supabaseInsert(table, data) {
  try {
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
    console.log('Supabase response:', res.status);
    return res;
  } catch (err) {
    console.error('Supabase error:', err);
    throw err;
  }
}

async function handleSubscribe(form) {
  const input = form.querySelector('.nl-input');
  const btn = form.querySelector('.btn');
  const email = input ? input.value.trim() : '';

  if (!email || !email.includes('@')) {
    if (input) {
      input.style.borderColor = 'red';
      setTimeout(() => input.style.borderColor = '', 2000);
    }
    return;
  }

  btn.textContent = 'Subscribing...';
  btn.disabled = true;

  try {
    const res = await supabaseInsert('subscribers', { email });
    if (res.status === 201 || res.status === 200) {
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#2a7a2a';
      input.value = '';
    } else if (res.status === 409) {
      btn.textContent = '✓ Already subscribed!';
      btn.style.background = '#2a5a7a';
      input.value = '';
    } else {
      btn.textContent = 'Error - try again';
      btn.style.background = '#9B1C2E';
    }
  } catch (err) {
    btn.textContent = 'Error - try again';
    btn.style.background = '#9B1C2E';
  }

  btn.disabled = false;
  setTimeout(() => {
    btn.textContent = 'Subscribe ✦';
    btn.style.background = '';
  }, 4000);
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
    btn.textContent = '⚠ Fill in all required fields';
    btn.style.background = '#9B1C2E';
    setTimeout(() => { btn.textContent = 'Send Message ✦'; btn.style.background = ''; }, 3000);
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await supabaseInsert('contact_messages', {
      name, organisation: org, email, phone, enquiry_type, message, source
    });
    if (res.status === 201 || res.status === 200) {
      btn.textContent = '✓ Sent! We\'ll be in touch.';
      btn.style.background = '#2a7a2a';
      form.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
    } else {
      btn.textContent = 'Error - try again';
      btn.style.background = '#9B1C2E';
    }
  } catch (err) {
    btn.textContent = 'Error - try again';
    btn.style.background = '#9B1C2E';
  }

  btn.disabled = false;
  setTimeout(() => { btn.textContent = 'Send Message ✦'; btn.style.background = ''; }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nl-form').forEach(form => {
    const btn = form.querySelector('.btn');
    if (btn) btn.addEventListener('click', () => handleSubscribe(form));
    form.addEventListener('submit', e => { e.preventDefault(); handleSubscribe(form); });
  });

  const contactBtn = document.querySelector('.contact-submit-btn');
  if (contactBtn) contactBtn.addEventListener('click', () => handleContactForm(contactBtn));
});
