/* ============================
   Shared JS for all pages
   - Mobile nav
   - Accordions
   - Services modal
   - Optional hero background rotator
   ============================ */

(function () {
  // ---------- Mobile nav ----------
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // ---------- Active nav link ----------
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });

  // ---------- Accordions ----------
  document.querySelectorAll('[data-accordion]').forEach(list => {
    const items = list.querySelectorAll('[data-acc-item]');
    items.forEach(item => {
      const btn = item.querySelector('[data-acc-btn]');
      const content = item.querySelector('[data-acc-content]');
      const icon = item.querySelector('[data-acc-icon]');
      if (!btn || !content) return;

      btn.addEventListener('click', () => {
        const isOpen = content.classList.contains('open');
        // close all
        items.forEach(i => {
          const c = i.querySelector('[data-acc-content]');
          const ic = i.querySelector('[data-acc-icon]');
          c && c.classList.remove('open');
          if (ic) ic.textContent = '+';
        });
        // open current
        if (!isOpen) {
          content.classList.add('open');
          if (icon) icon.textContent = '−';
        }
      });
    });
  });

  // ---------- Services Modal ----------
  const modalOverlay = document.querySelector('[data-modal-overlay]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalBody = document.querySelector('[data-modal-body]');
  const modalClose = document.querySelector('[data-modal-close]');

  const openModal = (title, html) => {
    if (!modalOverlay) return;
    if (modalTitle) modalTitle.textContent = title || 'Details';
    if (modalBody) modalBody.innerHTML = html || '';
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-service]').forEach(tile => {
    tile.addEventListener('click', () => {
      const title = tile.getAttribute('data-title') || 'Service';
      const body = tile.getAttribute('data-body') || '';
      openModal(title, body);
    });
  });

  modalClose && modalClose.addEventListener('click', closeModal);
  modalOverlay && modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ---------- Optional Hero background rotator ----------
  const heroBg = document.querySelector('[data-hero-bg]');
  if (heroBg) {
    const imagesAttr = heroBg.getAttribute('data-images');
    const images = imagesAttr ? imagesAttr.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (images.length) {
      let idx = 0;
      heroBg.style.backgroundImage = `url('${images[0]}')`;
      setInterval(() => {
        idx = (idx + 1) % images.length;
        heroBg.style.opacity = '0.10';
        setTimeout(() => {
          heroBg.style.backgroundImage = `url('${images[idx]}')`;
          heroBg.style.opacity = '0.22';
        }, 350);
      }, 60000);
    }
  }
})();
