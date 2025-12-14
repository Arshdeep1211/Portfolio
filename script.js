// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

// Services modal
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(title, body){
  modalTitle.textContent = title || 'Service';
  modalBody.textContent = body || '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.service-tile').forEach(tile => {
  tile.addEventListener('click', () => {
    openModal(tile.getAttribute('data-title'), tile.getAttribute('data-body'));
  });
});

if (modalClose) modalClose.addEventListener('click', closeModal);

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
