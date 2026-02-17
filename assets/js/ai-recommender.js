document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector("[data-open-ai]");
  const modal = document.getElementById("aiModal");
  const closeBtn = modal?.querySelector("[data-ai-close]");
  const stepWrap = modal?.querySelector("[data-ai-step]");
  const backBtn = modal?.querySelector("[data-ai-back]");
  const nextBtn = modal?.querySelector("[data-ai-next]");
  const progress = modal?.querySelector("[data-ai-progress]");
  const resultWrap = modal?.querySelector("[data-ai-result]");

  if (!openBtn || !modal || !stepWrap || !nextBtn || !progress || !resultWrap) return;

  const state = {
    goal: null,   // "leads" | "presence" | "market" | "profit" | "unsure"
    stage: null,  // "solo" | "startup" | "sme" | "corporate"
    timeline: null // "asap" | "weeks" | "flex"
  };

  const steps = [
    {
      key: "goal",
      title: "What are you trying to achieve?",
      options: [
        { id: "leads", label: "Get more leads / sales" },
        { id: "presence", label: "Improve online presence" },
        { id: "market", label: "Understand market / competitors" },
        { id: "profit", label: "Pricing / profitability / business case" },
        { id: "unsure", label: "Not sure yet" }
      ]
    },
    {
      key: "stage",
      title: "What best describes your stage?",
      options: [
        { id: "solo", label: "Solo / personal brand" },
        { id: "startup", label: "Startup (0–20 people)" },
        { id: "sme", label: "SME (20–250 people)" },
        { id: "corporate", label: "Corporate / enterprise" }
      ]
    },
    {
      key: "timeline",
      title: "How soon do you want results?",
      options: [
        { id: "asap", label: "ASAP (days)" },
        { id: "weeks", label: "2–6 weeks" },
        { id: "flex", label: "Flexible / strategic" }
      ]
    }
  ];

  const serviceMap = {
    BI: {
      title: "Business Intelligence & Market Strategy",
      bullets: [
        "Market/competitor mapping + segmentation",
        "Opportunity sizing + prioritisation",
        "Decision-ready insights in slides"
      ]
    },
    FIN: {
      title: "Financial Modelling & Business Case",
      bullets: [
        "Excel model (assumptions → outputs)",
        "Scenario analysis + pricing logic",
        "KPIs like ROI, payback, margin"
      ]
    },
    GROWTH: {
      title: "Growth Strategy & Sales Channels",
      bullets: [
        "ICP + messaging for conversion",
        "Channel design (inbound/outbound/partners)",
        "Funnel KPIs + execution plan"
      ]
    },
    DIGITAL: {
      title: "Digital Marketing & Web Optimization",
      bullets: [
        "SEO basics + site improvements",
        "Content system across channels",
        "Performance tracking + iteration"
      ]
    }
  };

  const explain = (serviceKey) => {
    const g = state.goal;
    const s = state.stage;
    const t = state.timeline;

    let why = [];
    if (g === "leads") why.push("You selected **more leads/sales**, so we focus on channels + funnel conversion.");
    if (g === "presence") why.push("You selected **online presence**, so SEO/content + website optimisation is highest leverage.");
    if (g === "market") why.push("You selected **market understanding**, so research + BI structure comes first.");
    if (g === "profit") why.push("You selected **pricing/profitability**, so a business case model is the best starting point.");
    if (g === "unsure") why.push("You selected **not sure**, so we start with clarity (fast diagnostic) and then execute.");

    if (s === "startup") why.push("For startups, speed + focus matters: one clear channel + proof points.");
    if (s === "corporate") why.push("For corporates, decision-grade structure and KPIs matter most.");
    if (t === "asap") why.push("Because you want results ASAP, we recommend a short sprint with clear deliverables.");

    return why.join(" ");
  };

  const recommend = () => {
    // Base mapping from goal
    let pick = "BI";
    if (state.goal === "leads") pick = "GROWTH";
    if (state.goal === "presence") pick = "DIGITAL";
    if (state.goal === "market") pick = "BI";
    if (state.goal === "profit") pick = "FIN";
    if (state.goal === "unsure") pick = "GROWTH";

    // Stage adjustment
    if (state.stage === "corporate" && (state.goal === "leads" || state.goal === "unsure")) pick = "BI";
    if (state.stage === "solo" && state.goal === "leads") pick = "DIGITAL";

    // Timeline adjustment (asap → more execution)
    if (state.timeline === "asap" && state.goal === "market") pick = "BI";
    if (state.timeline === "asap" && state.goal === "presence") pick = "DIGITAL";

    return pick;
  };

  let idx = 0;

  const renderStep = () => {
    const step = steps[idx];
    progress.textContent = `Step ${idx + 1} / ${steps.length}`;
    resultWrap.style.display = "none";
    stepWrap.style.display = "block";

    stepWrap.innerHTML = `
      <div class="ai-title">${step.title}</div>
      <div class="ai-options">
        ${step.options.map(o => `
          <button class="ai-option" type="button" data-ai-choice="${o.id}">
            ${o.label}
          </button>
        `).join("")}
      </div>
    `;

    backBtn.style.display = idx === 0 ? "none" : "inline-flex";
    nextBtn.textContent = idx === steps.length - 1 ? "See recommendation" : "Next";
    nextBtn.disabled = !state[step.key];

    stepWrap.querySelectorAll("[data-ai-choice]").forEach(btn => {
      btn.addEventListener("click", () => {
        state[step.key] = btn.getAttribute("data-ai-choice");

        // UI highlight
        stepWrap.querySelectorAll(".ai-option").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");

        nextBtn.disabled = false;
      });
    });

    // if already selected, highlight it
    if (state[step.key]) {
      const selected = stepWrap.querySelector(`[data-ai-choice="${state[step.key]}"]`);
      if (selected) selected.classList.add("selected");
    }
  };

  const renderResult = () => {
    const key = recommend();
    const svc = serviceMap[key];

    stepWrap.style.display = "none";
    resultWrap.style.display = "block";
    progress.textContent = "Recommendation";

    resultWrap.innerHTML = `
      <div class="ai-title">Best starting point: <span class="ai-accent">${svc.title}</span></div>
      <div class="ai-why">${explain(key)}</div>

      <div class="ai-card">
        <div class="ai-card-title">What you get</div>
        <ul class="ai-bullets">
          ${svc.bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
      </div>

      <div class="ai-actions">
        <a class="btn btn-primary" href="https://calendly.com/app/personal/link" target="_blank" rel="noopener">
          Book free 15-min call
        </a>
        <a class="btn" href="mailto:arshdeep.engg@gmail.com">Email brief</a>
      </div>
    `;

    nextBtn.textContent = "Restart";
    nextBtn.disabled = false;
  };

  const open = () => {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    idx = 0;
    state.goal = state.stage = state.timeline = null;
    nextBtn.textContent = "Next";
    renderStep();
  };

  const close = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  };

  openBtn.addEventListener("click", (e) => { e.preventDefault(); open(); });
  closeBtn?.addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  backBtn.addEventListener("click", () => {
    if (idx > 0) idx -= 1;
    renderStep();
  });

  nextBtn.addEventListener("click", () => {
    if (resultWrap.style.display === "block") {
      // restart
      idx = 0;
      state.goal = state.stage = state.timeline = null;
      nextBtn.textContent = "Next";
      renderStep();
      return;
    }

    if (idx < steps.length - 1) {
      idx += 1;
      renderStep();
    } else {
      renderResult();
    }
  });
});
