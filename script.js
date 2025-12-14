// ---------------------------
// Mobile nav toggle
// ---------------------------
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", siteNav.classList.contains("open") ? "true" : "false");
  });
}

// Close mobile nav after click
if (siteNav) {
  siteNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => siteNav.classList.remove("open"));
  });
}

// ---------------------------
// Active link highlight
// ---------------------------
(function setActiveNav(){
  const page = document.body.getAttribute("data-page");
  if (!page) return;
  document.querySelectorAll(`[data-nav="${page}"]`).forEach(el => el.classList.add("active"));
})();

// ---------------------------
// Services modal
// ---------------------------
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openModal(title, html) {
  if (!modalOverlay) return;
  modalTitle.textContent = title || "Details";
  modalBody.innerHTML = html || "";
  modalOverlay.style.display = "flex";
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.style.display = "none";
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Bind tiles
document.querySelectorAll("[data-service]").forEach(tile => {
  tile.addEventListener("click", () => {
    const title = tile.getAttribute("data-title") || "Service";
    const body = tile.getAttribute("data-body") || "";
    openModal(title, body);
  });
});
