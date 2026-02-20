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
/* =========================
   AI SECTION: loading + transition
   ========================= */
const aiSelect = document.getElementById("aiSelect");
const aiBtn = document.getElementById("aiBtn");
const aiResult = document.getElementById("aiResult");

if (aiSelect && aiBtn && aiResult) {
  const responses = {
    bi: `
      <div class="block-title">Business Intelligence</div>
      <ul class="bullets">
        <li>Define KPI hierarchy (north-star → supporting metrics).</li>
        <li>Build a dashboard + automated weekly insights summary.</li>
        <li>Track conversion, retention, CAC/LTV where relevant.</li>
      </ul>
      <div class="small">Next: tell me your data sources (Sheets/CRM/DB) + key decisions.</div>
    `,
    seo: `
      <div class="block-title">SEO & Website Optimization</div>
      <ul class="bullets">
        <li>Technical SEO: titles, headings, speed, mobile, schema basics.</li>
        <li>Create 5–10 service pages around intent keywords.</li>
        <li>Set tracking + monthly iterations (Search Console + Analytics).</li>
      </ul>
      <div class="small">Next: I can run a quick audit and give a priority checklist.</div>
    `,
    social: `
      <div class="block-title">Social Media Marketing</div>
      <ul class="bullets">
        <li>Content pillars + 4-week calendar + post templates.</li>
        <li>Multi-channel plan (LinkedIn / IG / X) based on audience.</li>
        <li>Light analytics loop: what worked → improve weekly.</li>
      </ul>
      <div class="small">Next: pick channels + frequency (2–5 posts/week).</div>
    `,
    sales: `
      <div class="block-title">Sales Channel Development</div>
      <ul class="bullets">
        <li>Define ICP + offer + pricing anchor.</li>
        <li>Outreach funnel: list → message → call → proposal → follow-up.</li>
        <li>Set targets: leads/week, conversion %, cycle time.</li>
      </ul>
      <div class="small">Next: I’ll draft scripts + a simple CRM pipeline.</div>
    `,
    gtm: `
      <div class="block-title">Go-to-Market Strategy</div>
      <ul class="bullets">
        <li>Choose one beachhead segment and early adopter profile.</li>
        <li>Positioning + messaging tied to buying triggers.</li>
        <li>90-day rollout plan with milestones and KPIs.</li>
      </ul>
      <div class="small">Next: we align on the 1 decision you need in 2–4 weeks.</div>
    `
  };

  const setResultHTML = (html) => {
    const inner = aiResult.querySelector(".ai-result-inner");
    if (inner) inner.innerHTML = html;
    else aiResult.innerHTML = `<div class="ai-result-inner">${html}</div>`;
  };

  aiBtn.addEventListener("click", async () => {
    const key = aiSelect.value;

    // show loading
    aiBtn.classList.add("is-loading");
    aiBtn.setAttribute("aria-busy", "true");
    aiResult.classList.add("is-loading");
    aiResult.classList.add("fade-out");

    // polished delay (feels interactive)
    await new Promise((r) => setTimeout(r, 650));

    setResultHTML(responses[key] || "Select an option to see a recommendation.");

    // reveal result
    aiResult.classList.remove("fade-out");
    aiResult.classList.remove("is-loading");
    aiBtn.classList.remove("is-loading");
    aiBtn.setAttribute("aria-busy", "false");

    // optional: auto-scroll on mobile so user sees output
    if (window.innerWidth <= 560) {
      aiResult.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// =========================
// // AI CALL (Cloudflare Worker)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("ai-btn");
  const modeEl = document.getElementById("ai-mode");
  const promptEl = document.getElementById("ai-prompt");
  const resultEl = document.getElementById("ai-result");
  const statusEl = document.getElementById("ai-status");

  if (!btn || !modeEl || !promptEl || !resultEl || !statusEl) return;

  const API_URL = "https://arshdeep-assistant.arshdeep-engg.workers.dev/api/ai";

  // ---- helpers ----
  const escapeHtml = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  // very small "markdown-ish" formatter (enough for your output)
  const formatAiTextToHtml = (raw) => {
    let text = escapeHtml(raw || "").trim();
    if (!text) return "<p>No response.</p>";

    // Headings like: **Title** or ## Title
    text = text.replace(/^##\s*(.+)$/gm, "<h4>$1</h4>");
    text = text.replace(/^\*\*(.+?)\*\*\s*$/gm, "<h4>$1</h4>");

    // Bold inline
    text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Numbered lists: "1. item"
    text = text.replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>");
    text = text.replace(/(<li>.*<\/li>\s*)+/g, (m) => `<ol>${m}</ol>`);

    // Bullet lists: "- item" or "* item"
    text = text.replace(/^[\-\*]\s+(.+)$/gm, "<li>$1</li>");
    text = text.replace(/(<li>.*<\/li>\s*)+/g, (m) => {
      // if it's already inside <ol>, don't wrap again
      if (m.includes("<ol>") || m.includes("</ol>")) return m;
      return `<ul>${m}</ul>`;
    });

    // Paragraphs: split by blank lines
    const blocks = text
      .split(/\n\s*\n/g)
      .map((b) => b.trim())
      .filter(Boolean)
      .map((b) => {
        // keep lists/headings as-is
        if (b.startsWith("<ul>") || b.startsWith("<ol>") || b.startsWith("<h4>")) return b;
        // line breaks inside paragraph
        return `<p>${b.replace(/\n/g, "<br>")}</p>`;
      });

    return blocks.join("\n");
  };

  // (Optional) detect language later if you add a toggle
  const getLang = () => "en"; // change to "de" if you add a language switch

  btn.addEventListener("click", async () => {
    const mode = modeEl.value;
    const prompt = (promptEl.value || "").trim();

    if (!prompt) {
      resultEl.innerHTML = "<p>Please write a prompt first.</p>";
      resultEl.classList.add("show");
      return;
    }

    // UI: loading
    btn.disabled = true;
    statusEl.style.display = "block";
    statusEl.textContent = "Thinking…";
    resultEl.classList.remove("show");
    resultEl.innerHTML = "";

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode, lang: getLang() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      statusEl.textContent = "Done ✅";

      // ✅ formatted output instead of raw <pre>
      resultEl.innerHTML = formatAiTextToHtml(data.text);
      resultEl.classList.add("show");

      setTimeout(() => {
        statusEl.style.display = "none";
      }, 900);

    } catch (err) {
      statusEl.textContent = "Error ❌";
      resultEl.innerHTML = `<p>${escapeHtml(err.message || "Something went wrong.")}</p>`;
      resultEl.classList.add("show");
    } finally {
      btn.disabled = false;
    }
  });
});
