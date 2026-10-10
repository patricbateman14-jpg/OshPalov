/* ==========================================================================
   OSHPALOV — cart (demo ordering)
   State: { [itemId]: qty } kept in localStorage so the cart survives page
   changes; falls back to memory when storage is unavailable.
   UI: add/stepper controls (rendered inside dish cards), a slide-in cart
   drawer, a sticky bottom cart bar and a small toast.
   Depends on: data.js, i18n.js. Uses el()/icon() from main.js at runtime.
   ========================================================================== */

const CART_KEY = 'oshpalov-cart';
const SERVICE_RATE = 0.15; // "Обслуживание 15%" from the printed menu — dine-in only
let cartState = loadCart();

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
    const clean = {};
    Object.entries(raw).forEach(([id, qty]) => {
      const n = Math.floor(Number(qty));
      if (MENU_ITEMS.some(i => i.id === id && i.price != null) && n > 0) clean[id] = Math.min(n, 99);
    });
    return clean;
  } catch (e) { return {}; }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cartState)); } catch (e) { /* storage unavailable */ }
  document.dispatchEvent(new CustomEvent('cartchange'));
}

const itemById = id => MENU_ITEMS.find(i => i.id === id);
const cartQty = id => cartState[id] || 0;

function cartSetQty(id, qty) {
  const item = itemById(id);
  if (!item || item.price == null) return;
  const n = Math.max(0, Math.min(99, Math.floor(qty)));
  if (n === 0) delete cartState[id]; else cartState[id] = n;
  saveCart();
}

function cartClear() { cartState = {}; saveCart(); }

function cartLines() {
  return Object.entries(cartState)
    .map(([id, qty]) => ({ item: itemById(id), qty }))
    .filter(l => l.item);
}

function cartCount() { return cartLines().reduce((s, l) => s + l.qty, 0); }
function cartSubtotal() { return cartLines().reduce((s, l) => s + l.qty * l.item.price, 0); }

/* ---------- Add / stepper control (used by dish cards and list rows) ---------- */

function cartControl(item, compact = false) {
  if (item.price == null) return null;
  const box = el('div', { class: 'cart-ctl' + (compact ? ' cart-ctl--compact' : ''), dataset: { cartId: item.id } });
  renderCartControl(box);
  return box;
}

function renderCartControl(box) {
  const id = box.dataset.cartId;
  const qty = cartQty(id);
  const compact = box.classList.contains('cart-ctl--compact');
  const name = dishNames(itemById(id)).primary;
  if (!qty) {
    box.replaceChildren(el('button', {
      type: 'button',
      class: 'btn-add',
      'data-cart-add': id,
      'aria-label': t('cart.addTo', { name })
    }, [icon('plus'), compact ? null : el('span', { text: t('cart.add') })]));
  } else {
    box.replaceChildren(el('div', { class: 'stepper', role: 'group', 'aria-label': name }, [
      el('button', { type: 'button', 'data-cart-dec': id, 'aria-label': t('cart.dec') }, icon(qty === 1 ? 'trash' : 'minus')),
      el('span', { class: 'stepper__qty', 'aria-live': 'polite', text: String(qty) }),
      el('button', { type: 'button', 'data-cart-inc': id, 'aria-label': t('cart.inc') }, icon('plus'))
    ]));
  }
}

function refreshCartControls(id) {
  const sel = id ? '.cart-ctl[data-cart-id="' + id + '"]' : '.cart-ctl';
  document.querySelectorAll(sel).forEach(renderCartControl);
}

/* ---------- Drawer ---------- */

let drawer, drawerList, drawerFoot, lastFocus;

function buildDrawer() {
  drawerList = el('div', { class: 'drawer__body' });
  drawerFoot = el('div', { class: 'drawer__foot' });
  drawer = el('aside', {
    class: 'drawer',
    id: 'cart-drawer',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'cart-title',
    'aria-hidden': 'true'
  }, [
    el('header', { class: 'drawer__head' }, [
      el('h2', { id: 'cart-title', 'data-i18n': 'cart.title' }),
      el('button', { type: 'button', class: 'drawer__close', 'data-cart-close': '', 'data-i18n-aria': 'gal.close' }, icon('close'))
    ]),
    drawerList,
    drawerFoot
  ]);
  document.body.append(
    el('div', { class: 'drawer-backdrop', 'data-cart-close': '', 'aria-hidden': 'true' }),
    drawer
  );
}

function renderDrawer() {
  if (!drawer) return;
  const lines = cartLines();
  if (!lines.length) {
    drawerList.replaceChildren(el('div', { class: 'cart-empty' }, [
      el('div', { class: 'cart-empty__icon' }, icon('bag')),
      el('h3', { text: t('cart.emptyTitle') }),
      el('p', { text: t('cart.emptyText') }),
      el('a', { class: 'btn btn--primary', href: 'menu.html', text: t('cart.toMenu') })
    ]));
    drawerFoot.hidden = true;
    return;
  }
  drawerList.replaceChildren(el('ul', { class: 'cart-lines' }, lines.map(({ item, qty }) => {
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
  drawerFoot.hidden = false;
  drawerFoot.replaceChildren(
    el('div', { class: 'cart-sum' }, [
      el('span', { text: t('cart.subtotal') }),
      el('strong', { text: formatPrice(cartSubtotal()) })
    ]),
    el('p', { class: 'cart-note', text: t('cart.note') }),
    el('a', { class: 'btn btn--gold drawer__checkout', href: 'checkout.html' }, [el('span', { text: t('cart.checkout') }), icon('arrow')]),
    el('button', { type: 'button', class: 'drawer__clear', 'data-cart-clear': '', text: t('cart.clear') })
  );
}

function openDrawer() {
  if (!drawer) return;
  lastFocus = document.activeElement;
  toastEl?.classList.remove('is-visible');
  renderDrawer();
  document.body.classList.add('cart-open');
  drawer.setAttribute('aria-hidden', 'false');
  drawer.querySelector('.drawer__close').focus({ preventScroll: true });
}

function closeDrawer() {
  if (!document.body.classList.contains('cart-open')) return;
  document.body.classList.remove('cart-open');
  drawer.setAttribute('aria-hidden', 'true');
  lastFocus?.focus?.({ preventScroll: true });
}

/* ---------- Header badge & bottom bar ---------- */

let cartBar;

function buildCartBar() {
  cartBar = el('button', { type: 'button', class: 'cart-bar', 'data-cart-open': '', hidden: true });
  document.body.append(cartBar);
}

function renderCartChrome() {
  const count = cartCount();
  document.querySelectorAll('[data-cart-badge]').forEach(b => {
    b.textContent = String(count);
    b.hidden = count === 0;
  });
  document.querySelectorAll('[data-cart-open].cart-btn').forEach(btn =>
    btn.setAttribute('aria-label', t('cart.open', { n: count })));
  if (cartBar) {
    const show = count > 0 && document.body.dataset.page !== 'checkout';
    cartBar.hidden = !show;
    document.body.classList.toggle('has-cart-bar', show);
    if (show) {
      cartBar.replaceChildren(
        el('span', { class: 'cart-bar__count' }, [icon('bag'), el('span', { text: String(count) })]),
        el('span', { class: 'cart-bar__label', text: t('cart.title') }),
        el('span', { class: 'cart-bar__sum', text: formatPrice(cartSubtotal()) }),
        icon('arrow')
      );
    }
  }
}

/* ---------- Toast ---------- */

let toastEl, toastTimer;

function toast(message) {
  if (!toastEl) {
    toastEl = el('div', { class: 'toast', role: 'status', 'aria-live': 'polite' });
    document.body.append(toastEl);
  }
  toastEl.replaceChildren(icon('check'), el('span', { text: message }));
  toastEl.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
}

/* ---------- Events ---------- */

document.addEventListener('click', e => {
  const add = e.target.closest('[data-cart-add]');
  const inc = e.target.closest('[data-cart-inc]');
  const dec = e.target.closest('[data-cart-dec]');
  if (add) {
    const id = add.dataset.cartAdd;
    cartSetQty(id, cartQty(id) + 1);
    toast(t('cart.added', { name: dishNames(itemById(id)).primary }));
    // keep keyboard focus on the control that replaced the button
    document.querySelector('.cart-ctl[data-cart-id="' + id + '"] [data-cart-inc]')?.focus({ preventScroll: true });
  } else if (inc) {
    cartSetQty(inc.dataset.cartInc, cartQty(inc.dataset.cartInc) + 1);
  } else if (dec) {
    cartSetQty(dec.dataset.cartDec, cartQty(dec.dataset.cartDec) - 1);
  } else if (e.target.closest('[data-cart-open]')) {
    openDrawer();
  } else if (e.target.closest('[data-cart-close]')) {
    closeDrawer();
  } else if (e.target.closest('[data-cart-clear]')) {
    cartClear();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

document.addEventListener('cartchange', () => {
  refreshCartControls();
  renderCartChrome();
  if (document.body.classList.contains('cart-open')) renderDrawer();
});

document.addEventListener('langchange', () => {
  refreshCartControls();
  renderCartChrome();
  renderDrawer();
});

// Another tab changed the cart
window.addEventListener('storage', e => {
  if (e.key === CART_KEY) { cartState = loadCart(); document.dispatchEvent(new CustomEvent('cartchange')); }
});

function initCart() {
  buildDrawer();
  buildCartBar();
  applyTranslations(drawer);
  renderCartChrome();
}
