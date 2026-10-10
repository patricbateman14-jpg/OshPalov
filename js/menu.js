/* ==========================================================================
   OSHPALOV — menu page
   Category filter + search work together:
     visible item = (category === 'all' || item.cat === category) && matches(query)
   Depends on: data.js, i18n.js, main.js
   ========================================================================== */

(function () {
  const root = document.getElementById('menu-root');
  if (!root) return;

  const chipBox = document.getElementById('menu-chips');
  const searchInput = document.getElementById('menu-search');
  const clearBtn = document.getElementById('menu-search-clear');
  const countEl = document.getElementById('menu-count');
  const emptyEl = document.getElementById('menu-empty');
  const resetBtn = document.getElementById('menu-reset');
  const signatureEl = document.getElementById('menu-signature');
  const anchorEl = document.getElementById('menu-anchor');

  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat') || location.hash.replace('#cat-', '');
  const state = {
    cat: categoryById(initialCat) ? initialCat : 'all',
    query: ''
  };

  /* Lowercase, drop diacritics/apostrophe variants so "oʻsh", "o'sh" and "osh" all match */
  function normalize(str) {
    return String(str)
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[ʻʼ'‘’`´]/g, '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* Searchable text: both names + both category names (so "самса" finds "С мясом") */
  const searchIndex = new Map(MENU_ITEMS.map(item => {
    const cat = categoryById(item.cat);
    return [item.id, normalize([item.ru, item.uz, cat.ru, cat.uz, item.desc?.ru, item.desc?.uz].join(' '))];
  }));

  function matches(item) {
    if (state.cat !== 'all' && item.cat !== state.cat) return false;
    if (!state.query) return true;
    const haystack = searchIndex.get(item.id);
    return normalize(state.query).split(' ').every(word => haystack.includes(word));
  }

  /* ---------- Rendering ---------- */

  function renderChips() {
    const chips = [{ id: 'all', label: t('menu.all') }]
      .concat(MENU_CATEGORIES.map(c => ({ id: c.id, label: loc(c) })));
    chipBox.replaceChildren(...chips.map(c => el('button', {
      type: 'button',
      class: 'chip',
      'data-cat': c.id,
      'aria-pressed': String(state.cat === c.id),
      text: c.label
    })));
  }

  function listRow(item) {
    const { primary, secondary } = dishNames(item);
    return el('li', { dataset: { id: item.id } }, [
      el('span', { class: 'menu-list__name' }, [
        el('strong', { text: primary }),
        secondary ? el('small', { lang: 'ru', text: secondary }) : null
      ]),
      priceNode(item),
      cartControl(item, true)
    ]);
  }

  function renderSection(cat) {
    const items = MENU_ITEMS.filter(i => i.cat === cat.id);
    const main = items.filter(i => !i.group);
    const withPhoto = main.filter(i => i.img);
    const plain = main.filter(i => !i.img);
    const altName = getLang() === 'uz' ? cat.ru : cat.uz;

    const section = el('section', {
      class: 'menu-section',
      id: 'cat-' + cat.id,
      'aria-labelledby': 'h-' + cat.id,
      dataset: { cat: cat.id }
    }, [
      el('header', { class: 'menu-section__head' }, [
        el('h2', { id: 'h-' + cat.id }, [
          loc(cat),
          el('span', { class: 'menu-section__alt', lang: getLang() === 'uz' ? 'ru' : 'uz-Latn', text: altName })
        ]),
        el('p', { class: 'service-note' }, [icon('info'), t('service.note')])
      ]),
      withPhoto.length ? el('div', { class: 'dish-grid' }, withPhoto.map(i => dishCard(i, { showBadge: true }))) : null,
      plain.length ? el('ul', { class: 'menu-list' }, plain.map(listRow)) : null
    ]);

    // Grouped sub-lists (e.g. "Добавки к плову")
    const groups = [...new Set(items.filter(i => i.group).map(i => i.group))];
    groups.forEach(group => {
      section.append(
        el('h3', { class: 'menu-subhead', dataset: { group }, text: t('menu.' + group) }),
        el('ul', { class: 'menu-list', dataset: { group } }, items.filter(i => i.group === group).map(listRow))
      );
    });
    return section;
  }

  function renderSignature() {
    const featured = MENU_ITEMS.filter(i => i.featured);
    signatureEl.replaceChildren(
      el('div', { class: 'signature-strip__head' }, [
        el('h2', { text: t('menu.sigTitle') }),
        el('span', { text: t('menu.sigLead') })
      ]),
      el('div', { class: 'dish-grid' }, featured.map(i => dishCard(i, { showCategory: true })))
    );
  }

  function renderAll() {
    renderChips();
    renderSignature();
    root.replaceChildren(...MENU_CATEGORIES.map(renderSection));
    applyFilters();
  }

  /* ---------- Filtering ---------- */

  function applyFilters() {
    let total = 0;

    root.querySelectorAll('.menu-section').forEach(section => {
      let sectionCount = 0;
      section.querySelectorAll('[data-id]').forEach(node => {
        const item = MENU_ITEMS.find(i => i.id === node.dataset.id);
        const show = matches(item);
        node.hidden = !show;
        if (show) sectionCount++;
      });
      // Hide empty grids/lists and orphaned subheadings
      section.querySelectorAll('.dish-grid, .menu-list').forEach(box => {
        box.hidden = !box.querySelector('[data-id]:not([hidden])');
      });
      section.querySelectorAll('.menu-subhead').forEach(h => {
        const list = section.querySelector('.menu-list[data-group="' + h.dataset.group + '"]');
        h.hidden = !list || list.hidden;
      });
      section.hidden = sectionCount === 0;
      total += sectionCount;
    });

    signatureEl.hidden = state.cat !== 'all' || state.query !== '';
    emptyEl.hidden = total > 0;
    countEl.textContent = t('menu.results', { n: total });
    clearBtn.hidden = state.query === '';

    chipBox.querySelectorAll('.chip').forEach(chip => {
      chip.setAttribute('aria-pressed', String(chip.dataset.cat === state.cat));
    });
  }

  function syncUrl() {
    const url = new URL(location.href);
    if (state.cat === 'all') url.searchParams.delete('cat');
    else url.searchParams.set('cat', state.cat);
    url.hash = '';
    history.replaceState(null, '', url);
  }

  function scrollToMenuTop() {
    const top = anchorEl.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight;
    if (window.scrollY > top) window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  /* ---------- Events ---------- */

  chipBox.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.cat = chip.dataset.cat;
    applyFilters();
    syncUrl();
    chip.scrollIntoView({ block: 'nearest', inline: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    scrollToMenuTop();
  });

  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = searchInput.value.trim();
      applyFilters();
    }, 120);
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape' && searchInput.value) {
      e.stopPropagation();
      clearSearch();
    }
  });

  function clearSearch() {
    searchInput.value = '';
    state.query = '';
    applyFilters();
    searchInput.focus();
  }

  clearBtn.addEventListener('click', clearSearch);

  resetBtn.addEventListener('click', () => {
    state.cat = 'all';
    syncUrl();
    clearSearch();
  });

  document.getElementById('menu-back')?.addEventListener('click', () => {
    scrollToMenuTop();
    searchInput.focus({ preventScroll: true });
  });

  document.addEventListener('langchange', renderAll);

  document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    if (state.cat !== 'all') {
      // Arriving from a category tile: bring the filtered list into view
      requestAnimationFrame(() => {
        anchorEl.scrollIntoView({ block: 'start' });
        const chip = chipBox.querySelector('.chip[aria-pressed="true"]');
        if (chip) chipBox.scrollLeft = chip.offsetLeft - (chipBox.clientWidth - chip.offsetWidth) / 2;
      });
    }
  });
})();
