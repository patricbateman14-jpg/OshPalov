/* ==========================================================================
   OSHPALOV — shared behaviour
   Renders the shared header/footer, handles navigation, language switching,
   reveal animations, image fallbacks, back-to-top and the home page blocks.
   Depends on: data.js, i18n.js
   ========================================================================== */

/* ---------- Small DOM helpers ---------- */

/* el('a', { class: 'x', href: '#', text: 'Hi' }, [children]) — never uses innerHTML */
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null || value === false) return;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else node.setAttribute(key, value === true ? '' : value);
  });
  [].concat(children).forEach(child => {
    if (child == null) return;
    node.append(child instanceof Node ? child : document.createTextNode(child));
  });
  return node;
}

/* Static, developer-authored SVG icons (no user input involved) */
const ICONS = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  left: '<path d="M15 6l-6 6 6 6"/>',
  right: '<path d="M9 6l6 6-6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  tea: '<path d="M4 9h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V9zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3c0 1.5 1.5 1.5 1.5 3M12 3c0 1.5 1.5 1.5 1.5 3"/>',
  dish: '<path d="M3 15h18M5 15a7 7 0 0 1 14 0M12 6V4M2 18h20"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 4.5a3 3 0 0 1 0 6M18 20a6 6 0 0 0-2.5-4.9"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  telegram: '<path d="M21 4L3 11l6 2 2 6 3-4 5 4 2-15zM9 13l8-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
  bag: '<path d="M5 8h14l-1.2 12H6.2L5 8zM9 8V6a3 3 0 0 1 6 0v2"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
  store: '<path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9M10 20v-5h4v5"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  facebook: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H7v3.5h2V21h3.5v-8.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15V3z"/>'
};

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.6');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.innerHTML = ICONS[name] || '';
  return svg;
}

/* Image inside a .media wrapper (wrapper shows a designed fallback on error) */
function media(src, alt, className = '', loading = 'lazy') {
  if (!src) {
    // No photo for this item: show the designed logo/ornament placeholder
    return el('div', { class: ('media is-broken ' + className).trim(), role: 'img', 'aria-label': alt || '' });
  }
  return el('div', { class: ('media ' + className).trim() }, [
    el('img', { src, alt: alt || '', loading, decoding: 'async' })
  ]);
}

/* Replace the children of a container that may contain [data-icon] slots */
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(node => {
    if (node.querySelector('svg')) return;
    node.prepend(icon(node.dataset.icon));
  });
}

/* ---------- Shared header & footer ---------- */

const NAV_ITEMS = [
  { id: 'home', href: 'index.html', key: 'nav.home' },
  { id: 'menu', href: 'menu.html', key: 'nav.menu' },
  { id: 'about', href: 'about.html', key: 'nav.about' },
  { id: 'gallery', href: 'gallery.html', key: 'nav.gallery' },
  { id: 'contacts', href: 'contacts.html', key: 'nav.contacts' }
];

const RESERVE_HREF = 'contacts.html#reservation';

function renderHeader() {
  const mount = document.getElementById('site-header');
  if (!mount) return;
  const page = document.body.dataset.page;

  const navList = el('ul', { class: 'nav-list' }, NAV_ITEMS.map(item =>
    el('li', {}, el('a', {
      class: 'nav-link',
      href: item.href,
      'data-i18n': item.key,
      'aria-current': item.id === page ? 'page' : null
    }))
  ));

  const langSwitch = el('div', { class: 'lang-switch', role: 'group', 'data-i18n-aria': 'lang.label' },
    SUPPORTED_LANGS.map(code => el('button', {
      type: 'button',
      class: 'lang-btn',
      lang: code === 'uz' ? 'uz-Latn' : 'ru',
      'data-lang-btn': code,
      'aria-pressed': 'false',
      text: code.toUpperCase()
    }))
  );

  const header = el('header', { class: 'site-header' }, el('div', { class: 'container header-inner' }, [
    el('a', { class: 'brand', href: 'index.html' }, [
      el('img', { src: 'assets/logo.png', alt: '', width: 52, height: 52, 'data-i18n-alt': 'logo.alt' }),
      el('span', { class: 'brand-name', text: 'OSHPALOV' })
    ]),
    el('nav', { class: 'main-nav', id: 'main-nav', 'data-i18n-aria': 'nav.main' }, [
      navList,
      el('div', { class: 'nav-mobile-extra' },
        el('a', { class: 'btn btn--primary', href: RESERVE_HREF, 'data-i18n': 'nav.reserve' }))
    ]),
    el('div', { class: 'header-actions' }, [
      langSwitch,
      el('button', { type: 'button', class: 'cart-btn', 'data-cart-open': '', 'aria-controls': 'cart-drawer' }, [
        icon('bag'),
        el('span', { class: 'cart-btn__label', 'data-i18n': 'cart.title' }),
        el('span', { class: 'cart-btn__badge', 'data-cart-badge': '', hidden: true, text: '0' })
      ]),
      el('button', {
        type: 'button',
        class: 'burger',
        'aria-controls': 'main-nav',
        'aria-expanded': 'false',
        'data-i18n-aria': 'nav.open'
      }, el('span'))
    ])
  ]));

  mount.replaceWith(
    el('a', { class: 'skip-link', href: '#main', 'data-i18n': 'skip' }),
    header,
    el('div', { class: 'nav-backdrop', 'aria-hidden': 'true' })
  );
}

function renderFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;

  const socials = el('div', { class: 'socials' }, CONTACTS.social.map(s =>
    el('a', { class: 'social-link', href: s.href, 'aria-label': s.name }, icon(s.name.toLowerCase()))
  ));

  const footer = el('footer', { class: 'site-footer' }, el('div', { class: 'container' }, [
    el('div', { class: 'footer-grid' }, [
      el('div', { class: 'footer-brand' }, [
        el('a', { class: 'brand', href: 'index.html' }, [
          el('img', { src: 'assets/logo.png', alt: '', width: 52, height: 52, loading: 'lazy' }),
          el('span', { class: 'brand-name', text: 'OSHPALOV' })
        ]),
        el('p', { 'data-i18n': 'footer.tagline' }),
        el('p', { class: 'footer-service', 'data-i18n': 'service.note' })
      ]),
      el('div', {}, [
        el('h3', { 'data-i18n': 'footer.nav' }),
        el('ul', { class: 'footer-links' }, NAV_ITEMS.map(item =>
          el('li', {}, el('a', { href: item.href, 'data-i18n': item.key }))))
      ]),
      el('div', {}, [
        el('h3', { 'data-i18n': 'footer.contacts' }),
        el('ul', { class: 'footer-links' }, [
          el('li', {}, el('a', { href: CONTACTS.phoneHref, text: CONTACTS.phone })),
          el('li', {}, el('a', { href: 'mailto:' + CONTACTS.email, text: CONTACTS.email })),
          el('li', { 'data-loc': 'address' }),
          el('li', { 'data-loc': 'hours' })
        ])
      ]),
      el('div', {}, [
        el('h3', { 'data-i18n': 'footer.follow' }),
        socials
      ])
    ]),
    el('div', { class: 'footer-bottom' }, [
      el('span', {}, ['© ' + new Date().getFullYear() + ' OSHPALOV. ', el('span', { 'data-i18n': 'footer.rights' })]),
      el('span', { 'data-i18n': 'footer.demo' })
    ])
  ]));

  mount.replaceWith(footer);

  const toTop = el('button', { type: 'button', class: 'to-top', 'data-i18n-aria': 'toTop' }, icon('up'));
  document.body.append(toTop);
}

/* Elements whose text comes from localized data objects (CONTACTS etc.) */
function applyDataTranslations() {
  document.querySelectorAll('[data-loc]').forEach(node => {
    const value = CONTACTS[node.dataset.loc];
    if (value) node.textContent = loc(value);
  });
}

/* ---------- Navigation ---------- */

function initNav() {
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('main-nav');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!burger || !nav) return;

  const setOpen = open => {
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.dataset.i18nAria = open ? 'nav.close' : 'nav.open';
    burger.setAttribute('aria-label', t(burger.dataset.i18nAria));
    if (open) nav.querySelector('a')?.focus({ preventScroll: true });
  };

  burger.addEventListener('click', () => setOpen(!document.body.classList.contains('nav-open')));
  backdrop?.addEventListener('click', () => setOpen(false));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setOpen(false);
      burger.focus();
    }
  });
  window.matchMedia('(min-width: 1141px)').addEventListener('change', e => { if (e.matches) setOpen(false); });

  document.querySelectorAll('[data-lang-btn]').forEach(btn =>
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn)));
}

function initScrollState() {
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 40);
    toTop?.classList.toggle('is-visible', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  });
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ---------- Reveal on scroll ---------- */

let revealObserver = null;

function observeReveals(root = document) {
  const items = root.querySelectorAll('.reveal:not(.is-visible)');
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach(node => node.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  items.forEach(node => revealObserver.observe(node));
}

/* ---------- Image fallback ---------- */

function initImageFallback() {
  const markBroken = img => {
    const wrapper = img.closest('.media');
    if (wrapper) wrapper.classList.add('is-broken');
    else img.classList.add('is-broken');
    img.alt = img.alt || t('img.fallback');
  };
  // Error events do not bubble, so listen in the capture phase.
  document.addEventListener('error', e => {
    if (e.target instanceof HTMLImageElement) markBroken(e.target);
  }, true);
  // Images that failed before this script ran
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) markBroken(img);
  });
}

/* ---------- Dish card (shared with menu.js) ---------- */

function categoryById(id) {
  return MENU_CATEGORIES.find(c => c.id === id);
}

/* Russian is the source language; in Uzbek mode the original Russian name is
   shown underneath so dish names stay recognizable. */
function dishNames(item) {
  const lang = getLang();
  const primary = lang === 'uz' ? (item.uz || item.ru) : item.ru;
  const secondary = lang === 'uz' && item.uz && item.uz !== item.ru ? item.ru : '';
  return { primary, secondary };
}

function priceNode(item) {
  return el('span', {
    class: 'price' + (item.price == null ? ' price--pending' : ''),
    text: formatPrice(item.price)
  });
}

function dishCard(item, { showCategory = false, showBadge = false } = {}) {
  const { primary, secondary } = dishNames(item);
  const cat = categoryById(item.cat);
  return el('article', { class: 'dish-card', dataset: { id: item.id } }, [
    showBadge && item.featured ? el('span', { class: 'dish-card__badge', text: t('menu.signature') }) : null,
    media(item.img, primary),
    el('div', { class: 'dish-card__body' }, [
      showCategory && cat ? el('span', { class: 'dish-card__cat', text: loc(cat) }) : null,
      el('h3', { class: 'dish-card__name', text: primary }),
      secondary ? el('span', { class: 'dish-card__alt', lang: 'ru', text: secondary }) : null,
      item.desc ? el('p', { class: 'dish-card__desc', text: loc(item.desc) }) : null,
      el('div', { class: 'dish-card__foot' }, [priceNode(item), cartControl(item)])
    ])
  ]);
}

/* ---------- Home page blocks ---------- */

const HOME_SIGNATURE_IDS = ['plov-set', 'main-kazan', 'uy-lagman', 'soup-kuza', 'kebab-beef', 'samsa-meat'];
const HOME_CATEGORY_IDS = ['plov', 'first', 'uyghur', 'second', 'shashlik', 'samsa', 'salads', 'tea'];

function renderHome(instant = false) {
  const sig = document.getElementById('signature-grid');
  if (sig) {
    sig.replaceChildren(...HOME_SIGNATURE_IDS
      .map(id => MENU_ITEMS.find(i => i.id === id))
      .filter(Boolean)
      .map((item, i) => {
        const card = dishCard(item, { showCategory: true });
        card.classList.add('reveal', 'reveal-d' + (i % 3));
        if (instant) card.classList.add('is-visible');
        return card;
      }));
  }

  const cats = document.getElementById('category-grid');
  if (cats) {
    cats.replaceChildren(...HOME_CATEGORY_IDS.map((id, i) => {
      const cat = categoryById(id);
      const count = MENU_ITEMS.filter(item => item.cat === id).length;
      return el('a', { class: 'cat-tile reveal reveal-d' + (i % 4) + (instant ? ' is-visible' : ''), href: 'menu.html?cat=' + id }, [
        media(cat.img, ''),
        el('div', { class: 'cat-tile__body' }, [
          el('span', { class: 'cat-tile__count', text: count + ' ' + t('home.catCount') }),
          el('h3', { text: loc(cat) })
        ])
      ]);
    }));
  }
  observeReveals();
}

/* ---------- Boot ---------- */

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initCart();
  hydrateIcons();
  initImageFallback();
  renderHome();
  applyTranslations();
  applyDataTranslations();
  initNav();
  initScrollState();
  observeReveals();
});

document.addEventListener('langchange', () => {
  applyDataTranslations();
  renderHome(true);
});
