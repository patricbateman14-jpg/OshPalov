/* ==========================================================================
   OSHPALOV — gallery grid, filters and lightbox
   Depends on: data.js, i18n.js, main.js
   ========================================================================== */

(function () {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  const filterBox = document.getElementById('gallery-filters');
  const dialog = document.getElementById('lightbox');
  const lbImg = dialog.querySelector('.lightbox__img');
  const lbCaption = dialog.querySelector('.lightbox__text');
  const lbCounter = dialog.querySelector('.lightbox__counter');

  const GROUPS = ['all', 'plov', 'dishes', 'salads', 'grill', 'atmosphere'];
  let activeGroup = 'all';
  let current = 0;       // index within the visible list
  let opener = null;     // element to return focus to

  const visibleItems = () => GALLERY.filter(g => activeGroup === 'all' || g.group === activeGroup);

  function renderFilters() {
    filterBox.replaceChildren(...GROUPS.map(group => el('button', {
      type: 'button',
      class: 'chip',
      'data-group': group,
      'aria-pressed': String(group === activeGroup),
      text: t('gal.' + group)
    })));
  }

  function renderGrid() {
    grid.replaceChildren(...GALLERY.map((item, index) => {
      const caption = loc(item);
      return el('button', {
        type: 'button',
        class: 'gallery-item reveal is-visible',
        'data-index': index,
        'data-group': item.group,
        'aria-label': t('gal.open', { name: caption }),
        hidden: activeGroup !== 'all' && item.group !== activeGroup
      }, [
        media(item.src, caption),
        el('span', { class: 'gallery-item__caption', 'aria-hidden': 'true', text: caption }),
        el('span', { class: 'gallery-item__zoom', 'aria-hidden': 'true' }, icon('zoom'))
      ]);
    }));
  }

  function setGroup(group) {
    activeGroup = group;
    filterBox.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.group === group)));
    grid.querySelectorAll('.gallery-item').forEach(btn => {
      btn.hidden = group !== 'all' && btn.dataset.group !== group;
    });
  }

  /* ---------- Lightbox ---------- */

  function show(index) {
    const items = visibleItems();
    current = (index + items.length) % items.length;
    const item = items[current];
    lbImg.classList.remove('is-broken');
    lbImg.src = item.src;
    lbImg.alt = loc(item);
    lbCaption.textContent = loc(item);
    lbCounter.textContent = (current + 1) + ' / ' + items.length;
  }

  function open(galleryIndex, trigger) {
    opener = trigger;
    show(visibleItems().indexOf(GALLERY[galleryIndex]));
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    opener?.focus();
  });

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.gallery-item');
    if (btn) open(Number(btn.dataset.index), btn);
  });

  filterBox.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) setGroup(chip.dataset.group);
  });

  dialog.querySelector('.lb-close').addEventListener('click', close);
  dialog.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.lb-next').addEventListener('click', () => show(current + 1));

  // Click on the dark backdrop (outside the figure and buttons) closes
  dialog.addEventListener('click', e => {
    if (e.target === dialog) close();
  });

  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    if (e.key === 'Escape' && !dialog.open) close(); // fallback when <dialog> is unsupported
  });

  // Basic swipe support on touch screens
  let touchX = null;
  dialog.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', e => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  function renderAll() {
    renderFilters();
    renderGrid();
    if (dialog.open) show(current);
  }

  document.addEventListener('DOMContentLoaded', renderAll);
  document.addEventListener('langchange', renderAll);
})();
