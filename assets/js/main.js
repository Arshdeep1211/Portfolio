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
     Supports BOTH markup versions:
     - .modal-header OR .modal-head
     - #serviceModal (overlay)
     ========================= */
  const overlay =
    document.getElementById("serviceModal") ||
    document.querySelector(".modal-overlay#serviceModal");

  const titleEl =
    overlay?.querySelector(".modal-title") ||
    overlay?.querySelector("[data-modal-title]");

  const bodyEl =
    overlay?.querySelector(".modal-body") ||
    overlay?.querySelector("[data-modal-body]");

  const closeBtn =
    overlay?.querySelector(".modal-close") ||
    overlay?.querySelector("[data-modal-close]");

  const openModal = (title, bodyHtml) => {
    if (!overlay) return;

    if (titleEl) titleEl.textContent = title || "Service details";
    if (bodyEl) bodyEl.innerHTML = bodyHtml || "";

    // make visible (works with either CSS approach)
    overlay.style.display = "flex";
    overlay.classList.add("open");
    document.body.style.overflow = "hidden"; // prevent background scroll
  };

  const closeModal = () => {
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.style.display = "none";
    document.body.style.overflow = "";
  };

  // Bind tiles
  document.querySelectorAll(".tile[data-service], [data-service]").forEach((tile) => {
    tile.addEventListener("click", (e) => {
      e.preventDefault();
      const title =
        tile.getAttribute("data-title") ||
        tile.querySelector("h3")?.textContent ||
        "Service details";
      const body = tile.getAttribute("data-body") || "";
      openModal(title, body);
    });
  });

  // Close modal actions
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      // click outside the modal box closes
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* =========================
     ACCORDION STYLE A
     .item + .item-btn + .item-content + .item-icon
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

      itemsA.forEach((other) => {
        if (other === item) return;
        other.querySelector(".item-content")?.classList.remove("open");
        const i = other.querySelector(".item-icon");
        if (i) i.textContent = "+";
      });

      const isOpen = content.classList.toggle("open");
      if (icon) icon.textContent = isOpen ? "−" : "+";
    });
  });

  /* =========================
     ACCORDION STYLE B
     .project-item + .project-toggle + .project-content + .project-toggle-icon
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

      itemsB.forEach((other) => {
        if (other === item) return;
        other.querySelector(".project-content")?.classList.remove("open");
        const i = other.querySelector(".project-toggle-icon");
        if (i) i.textContent = "+";
      });

      const isOpen = content.classList.toggle("open");
      if (icon) icon.textContent = isOpen ? "−" : "+";
    });
  });
});
/* =========================
   LIGHTBOX for screenshot images
   Click any .img-card img to open
   ========================= */
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lbImg = lightbox.querySelector(".lightbox__img");
  const lbCap = lightbox.querySelector(".lightbox__cap");
  const lbClose = lightbox.querySelector(".lightbox__close");

  function openLightbox(src, caption, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "Screenshot";
    lbCap.textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lb-lock");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lb-lock");

    // avoid showing old image during next open
    lbImg.src = "";
    lbImg.alt = "";
    lbCap.textContent = "";
  }

  // Open when clicking a screenshot
  document.querySelectorAll(".img-card img").forEach((img) => {
    img.addEventListener("click", () => {
      const card = img.closest(".img-card");
      const capEl = card ? card.querySelector(".img-cap") : null;
      const caption = capEl ? capEl.textContent.trim() : "";
      openLightbox(img.src, caption, img.alt);
    });
  });

  // Close button
  lbClose.addEventListener("click", closeLightbox);

  // Click outside image closes
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}
