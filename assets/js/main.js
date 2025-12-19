document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MOBILE NAV
     ========================= */
  const toggle =
    document.getElementById("navToggle") || document.querySelector(".hamburger");
  const nav =
    document.getElementById("siteNav") || document.querySelector("nav.nav");

  if (toggle && nav) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu after clicking a link (mobile)
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 560) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* =========================
     SERVICES MODAL (Home)
     Works with:
       .tile[data-service] + data-title + data-body
     And modal markup:
       #serviceModal .modal-title .modal-body .modal-close
     ========================= */
  const serviceModal = document.getElementById("serviceModal");
  const serviceTitle = serviceModal ? serviceModal.querySelector(".modal-title") : null;
  const serviceBody = serviceModal ? serviceModal.querySelector(".modal-body") : null;
  const serviceClose = serviceModal ? serviceModal.querySelector(".modal-close") : null;

  const openServiceModal = (title, bodyHtml) => {
    if (!serviceModal || !serviceTitle || !serviceBody) return;
    serviceTitle.textContent = title || "Service details";
    serviceBody.innerHTML = bodyHtml || "";
    serviceModal.style.display = "flex";
  };

  const closeServiceModal = () => {
    if (!serviceModal) return;
    serviceModal.style.display = "none";
  };

  // Click tiles -> open modal
  document.querySelectorAll("[data-service]").forEach((tile) => {
    tile.addEventListener("click", () => {
      const title = tile.getAttribute("data-title") || tile.querySelector("h3")?.textContent;
      const body = tile.getAttribute("data-body") || "";
      openServiceModal(title, body);
    });
  });

  // Close handlers
  if (serviceClose) serviceClose.addEventListener("click", closeServiceModal);
  if (serviceModal) {
    serviceModal.addEventListener("click", (e) => {
      if (e.target === serviceModal) closeServiceModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeServiceModal();
  });

  /* =========================
     ACCORDION STYLE A
     Works with:
       .item
         button.item-btn
         .item-content
         .item-icon
     ========================= */
  const itemsA = Array.from(document.querySelectorAll(".item"));
  itemsA.forEach((item) => {
    const btn = item.querySelector(".item-btn");
    const content = item.querySelector(".item-content");
    const icon = item.querySelector(".item-icon");
    if (!btn || !content) return;

    content.classList.remove("open");
    if (icon) icon.textContent = "+";

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // close others
      itemsA.forEach((other) => {
        if (other === item) return;
        const c = other.querySelector(".item-content");
        const i = other.querySelector(".item-icon");
        if (c) c.classList.remove("open");
        if (i) i.textContent = "+";
      });

      const isOpen = content.classList.toggle("open");
      if (icon) icon.textContent = isOpen ? "−" : "+";
    });
  });

  /* =========================
     ACCORDION STYLE B (Projects page old layout)
     Works with:
       .project-item
         button.project-toggle
         .project-content
         .project-toggle-icon
     ========================= */
  const itemsB = Array.from(document.querySelectorAll(".project-item"));
  itemsB.forEach((item) => {
    const btn = item.querySelector(".project-toggle");
    const content = item.querySelector(".project-content");
    const icon = item.querySelector(".project-toggle-icon");
    if (!btn || !content) return;

    content.classList.remove("open");
    if (icon) icon.textContent = "+";

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // close others
      itemsB.forEach((other) => {
        if (other === item) return;
        const c = other.querySelector(".project-content");
        const i = other.querySelector(".project-toggle-icon");
        if (c) c.classList.remove("open");
        if (i) i.textContent = "+";
      });

      const isOpen = content.classList.toggle("open");
      if (icon) icon.textContent = isOpen ? "−" : "+";
    });
  });
});
