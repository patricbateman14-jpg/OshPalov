/* ==========================================================================
   OSHPALOV — checkout (demo)
   Shows the cart summary, collects contact + delivery details, validates and
   displays a demo confirmation. Nothing is sent to a server and no payment
   is taken. Depends on: data.js, i18n.js, cart.js, main.js
   ========================================================================== */

(function () {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  const layout = document.getElementById('co-layout');
  const emptyEl = document.getElementById('co-empty');
  const successEl = document.getElementById('co-success');
  const summaryErr = document.getElementById('co-summary');
  const linesEl = document.getElementById('co-lines');
  const rowsEl = document.getElementById('co-rows');
  const addressField = document.getElementById('c-address-field');
  const timeField = document.getElementById('c-time-field');
  let submitted = false;
  let lastOrder = null;

  const orderType = () => form.elements.type.value;

  /* ---------- Summary ---------- */

  function row(labelKey, value, cls) {
    return el('div', { class: cls || null }, [el('dt', { text: t(labelKey) }), el('dd', { text: value })]);
  }

  function renderSummary() {
    if (lastOrder) return; // order placed — keep the success view
    const lines = cartLines();
    const empty = lines.length === 0;
    emptyEl.hidden = !empty;
    layout.hidden = empty;
    if (empty) return;

    linesEl.replaceChildren(el('ul', { class: 'cart-lines' }, lines.map(({ item, qty }) => {
      const { primary } = dishNames(item);
      return el('li', { class: 'cart-line' }, [
        media(item.img, primary, 'cart-line__img'),
        el('div', { class: 'cart-line__info' }, [
          el('span', { class: 'cart-line__name', text: primary }),
          el('span', { class: 'cart-line__unit', text: formatPrice(item.price) })
        ]),
        el('div', { class: 'cart-line__side' }, [
          el('span', { class: 'cart-line__total', text: formatPrice(item.price * qty) }),
          cartControl(item, true)
        ])
      ]);
    })));

    const subtotal = cartSubtotal();
    const service = orderType() === 'dine' ? Math.round(subtotal * SERVICE_RATE) : 0;
    const rows = [row('co.subtotal', formatPrice(subtotal))];
    if (orderType() === 'dine') rows.push(row('co.service', formatPrice(service)));
    if (orderType() === 'delivery') rows.push(row('co.delivery', t('co.deliveryTbd')));
    rows.push(row('co.total', formatPrice(subtotal + service), 'summary-total'));
    rowsEl.replaceChildren(...rows);
  }

  function syncConditionalFields() {
    addressField.hidden = orderType() !== 'delivery';
    timeField.hidden = form.elements.when.value !== 'later';
    if (addressField.hidden) setFieldError(form.elements.address, '');
    if (timeField.hidden) setFieldError(form.elements.time, '');
  }

  /* ---------- Validation (mirrors the reservation form) ---------- */

  const validators = {
    name: v => !v.trim() ? 'err.required' : v.trim().replace(/[^\p{L}]/gu, '').length < 2 ? 'err.name' : '',
    phone: v => {
      if (!v.trim()) return 'err.required';
      const digits = v.replace(/\D/g, '');
      return /^\+?[\d\s()\-]+$/.test(v.trim()) && digits.length >= 9 && digits.length <= 12 ? '' : 'err.phone';
    },
    address: v => orderType() === 'delivery' && v.trim().length < 5 ? 'err.address' : '',
    time: v => form.elements.when.value === 'later' && !v ? 'err.time' : ''
  };

  function setFieldError(input, key) {
    const errorEl = document.getElementById(input.id + '-error');
    input.dataset.errorKey = key;
    if (key) { input.setAttribute('aria-invalid', 'true'); errorEl.textContent = t(key); }
    else { input.removeAttribute('aria-invalid'); errorEl.textContent = ''; }
  }

  function validateField(input) {
    const key = validators[input.name](input.value);
    setFieldError(input, key);
    return !key;
  }

  function validateAll() {
    let first = null;
    Object.keys(validators).forEach(name => {
      const input = form.elements[name];
      if (!validateField(input) && !first) first = input;
    });
    return first;
  }

  /* ---------- Events ---------- */

  form.addEventListener('change', e => {
    if (e.target.name === 'type' || e.target.name === 'when') {
      syncConditionalFields();
      renderSummary();
    }
  });

  form.addEventListener('input', e => {
    if (submitted && validators[e.target.name]) {
      validateField(e.target);
      summaryErr.hidden = !form.querySelector('[aria-invalid="true"]');
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitted = true;
    if (!cartLines().length) return renderSummary();
    const first = validateAll();
    summaryErr.hidden = !first;
    if (first) { first.focus(); return; }

    const subtotal = cartSubtotal();
    const service = orderType() === 'dine' ? Math.round(subtotal * SERVICE_RATE) : 0;
    lastOrder = {
      name: form.elements.name.value.trim(),
      number: String(Math.floor(1000 + Math.random() * 9000)), // demo number only
      count: cartCount(),
      total: subtotal + service
    };
    cartClear();
    layout.hidden = true;
    renderSuccess();
    successEl.hidden = false;
    successEl.focus();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  function renderSuccess() {
    if (!lastOrder) return;
    successEl.querySelector('[data-co-success-title]').textContent = t('co.successTitle', { name: lastOrder.name });
    successEl.querySelector('[data-co-number]').textContent = t('co.successNumber', { n: lastOrder.number });
    successEl.querySelector('[data-co-details]').textContent =
      t('co.items', { n: lastOrder.count }) + ' · ' + formatPrice(lastOrder.total);
  }

  document.addEventListener('cartchange', renderSummary);
  document.addEventListener('langchange', () => {
    renderSummary();
    renderSuccess();
    form.querySelectorAll('[data-error-key]').forEach(i => { if (i.dataset.errorKey) setFieldError(i, i.dataset.errorKey); });
  });
  document.addEventListener('DOMContentLoaded', () => {
    syncConditionalFields();
    renderSummary();
  });
})();
