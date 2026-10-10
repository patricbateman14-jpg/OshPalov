/* ==========================================================================
   OSHPALOV — contacts page: contact cards + demo reservation form
   Nothing is sent anywhere: the form is validated in the browser and a demo
   confirmation is shown. User input is only ever written with textContent.
   Depends on: data.js, i18n.js, main.js
   ========================================================================== */

(function () {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  const success = document.getElementById('reservation-success');
  const summary = document.getElementById('form-summary');
  let submitted = false;

  /* ---------- Contact cards ---------- */

  function renderContacts() {
    const box = document.getElementById('contact-cards');
    if (!box) return;
    const card = (iconName, titleKey, content) =>
      el('div', { class: 'contact-card' }, [
        el('span', { class: 'contact-card__icon' }, icon(iconName)),
        el('div', {}, [el('h3', { text: t(titleKey) })].concat(content))
      ]);

    box.replaceChildren(
      card('phone', 'con.phone', el('a', { href: CONTACTS.phoneHref, text: CONTACTS.phone })),
      card('pin', 'con.address', el('p', { text: loc(CONTACTS.address) })),
      card('clock', 'con.hours', el('p', { text: loc(CONTACTS.hours) })),
      card('mail', 'con.email', el('a', { href: 'mailto:' + CONTACTS.email, text: CONTACTS.email })),
      card('people', 'con.social', el('div', { class: 'socials' }, CONTACTS.social.map(s =>
        el('a', { class: 'social-link', href: s.href, 'aria-label': s.name }, icon(s.name.toLowerCase())))))
    );
  }

  /* ---------- Validation ---------- */

  const todayISO = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  };

  const validators = {
    name: v => !v.trim() ? 'err.required' : v.trim().replace(/[^\p{L}]/gu, '').length < 2 ? 'err.name' : '',
    phone: v => {
      if (!v.trim()) return 'err.required';
      const digits = v.replace(/\D/g, '');
      const allowedChars = /^\+?[\d\s()\-]+$/.test(v.trim());
      return allowedChars && digits.length >= 9 && digits.length <= 12 ? '' : 'err.phone';
    },
    date: v => !v ? 'err.required' : v < todayISO() ? 'err.datePast' : '',
    time: v => !v ? 'err.required' : '',
    guests: v => {
      if (!v) return 'err.required';
      const n = Number(v);
      return Number.isInteger(n) && n >= 1 && n <= 50 ? '' : 'err.guests';
    }
  };

  function setFieldError(input, key) {
    const errorEl = document.getElementById(input.id + '-error');
    input.dataset.errorKey = key;
    if (key) {
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = t(key);
    } else {
      input.removeAttribute('aria-invalid');
      errorEl.textContent = '';
    }
  }

  function validateField(input) {
    const fn = validators[input.name];
    if (!fn) return true;
    const key = fn(input.value);
    setFieldError(input, key);
    return !key;
  }

  function validateAll() {
    let firstInvalid = null;
    Object.keys(validators).forEach(name => {
      const input = form.elements[name];
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    return firstInvalid;
  }

  form.addEventListener('input', e => {
    if (submitted && validators[e.target.name]) {
      validateField(e.target);
      summary.hidden = !form.querySelector('[aria-invalid="true"]');
    }
  });

  form.addEventListener('focusout', e => {
    // Validate on blur only once the user has typed something, to avoid nagging
    if (validators[e.target.name] && (submitted || e.target.value)) validateField(e.target);
  });

  /* ---------- Submit (demo only) ---------- */

  let lastBooking = null;

  function renderSuccess() {
    if (!lastBooking) return;
    success.querySelector('[data-success-title]').textContent = t('form.successTitle', { name: lastBooking.name });
    success.querySelector('[data-success-details]').textContent = t('form.successDetails', lastBooking);
  }

  function formatDate(iso) {
    const [y, m, d] = iso.split('-');
    return d + '.' + m + '.' + y;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitted = true;
    const firstInvalid = validateAll();
    summary.hidden = !firstInvalid;
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    lastBooking = {
      name: String(data.get('name')).trim(),
      date: formatDate(data.get('date')),
      time: data.get('time'),
      guests: data.get('guests')
    };
    renderSuccess();

    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  document.getElementById('reservation-again').addEventListener('click', () => {
    form.reset();
    submitted = false;
    form.querySelectorAll('[aria-invalid]').forEach(i => setFieldError(i, ''));
    summary.hidden = true;
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });

  /* ---------- Language ---------- */

  function refreshErrors() {
    form.querySelectorAll('[data-error-key]').forEach(input => {
      if (input.dataset.errorKey) setFieldError(input, input.dataset.errorKey);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    form.elements.date.min = todayISO();
    renderContacts();
  });
  document.addEventListener('langchange', () => {
    renderContacts();
    refreshErrors();
    renderSuccess();
  });
})();
