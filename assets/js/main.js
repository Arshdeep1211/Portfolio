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
     ACCORDION (Projects/Experience/Education)
     Works if you use:
     .item, button.item-btn, .item-content, .item-icon
     ========================= */
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    const btn = item.querySelector(".item-btn");
    const content = item.querySelector(".item-content");
    const icon = item.querySelector(".item-icon");

    if (!btn || !content) return;

    // start closed
    content.classList.remove("open");
    if (icon) icon.textContent = "+";

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // close others (accordion behavior)
      items.forEach((other) => {
        const c = other.querySelector(".item-content");
        const i = other.querySelector(".item-icon");
        if (c && c !== content) c.classList.remove("open");
        if (i && other !== item) i.textContent = "+";
      });

      // toggle current
      const isOpen = content.classList.toggle("open");
      if (icon) icon.textContent = isOpen ? "−" : "+";
    });
  });
});
