import { initCharts } from "./charts.js";

const NAV_SECTIONS = [
  { id: "overview", label: "專題概述" },
  { id: "background", label: "研究背景" },
  { id: "comparison", label: "WMS 比較" },
  { id: "objectives", label: "研究目的" },
  { id: "wms-modules", label: "WMS 功能與流程" },
  { id: "inventory-optimization", label: "庫存最佳化" },
  { id: "ecommerce", label: "電商應用" },
  { id: "literature", label: "文獻探討" },
  { id: "methodology", label: "研究方法" },
  { id: "architecture", label: "系統架構" },
  { id: "results", label: "研究成果" },
  { id: "analytics", label: "數據趨勢" },
  { id: "discussion", label: "討論分析" },
  { id: "conclusion", label: "結論" },
  { id: "future", label: "未來展望" },
  { id: "references", label: "參考文獻" },
];

async function loadProjectData() {
  const res = await fetch("./data/project.json");
  if (!res.ok) throw new Error("Failed to load project.json");
  return res.json();
}

function renderNav() {
  const nav = document.getElementById("sidebarNav");
  if (!nav) return;

  const groups = [
    { title: "簡報", ids: ["overview"] },
    {
      title: "WMS 理論",
      ids: [
        "background",
        "comparison",
        "objectives",
        "wms-modules",
        "inventory-optimization",
        "ecommerce",
        "literature",
      ],
    },
    { title: "研究實作", ids: ["methodology", "architecture", "results", "analytics"] },
    { title: "總結", ids: ["discussion", "conclusion", "future", "references"] },
  ];

  nav.innerHTML = groups
    .map((g) => {
      const links = g.ids
        .map((id) => {
          const item = NAV_SECTIONS.find((s) => s.id === id);
          const idx = NAV_SECTIONS.findIndex((s) => s.id === id) + 1;
          return `<a href="#${id}" class="nav-link" data-section="${id}">
            <span class="nav-link__num">${String(idx).padStart(2, "0")}</span>
            ${item?.label ?? id}
          </a>`;
        })
        .join("");
      return `<div class="sidebar__group">${g.title}</div>${links}`;
    })
    .join("");
}

function applyMeta(data) {
  const { meta, kpis, timeline } = data;

  document.title = `${meta.title} · 專題報告`;

  setText("sidebarTitle", meta.title);
  setText("sidebarMeta", `${meta.author} · ${meta.year}`);
  setText("heroTitle", meta.title);
  setText("heroSubtitle", meta.subtitle);
  setText("heroAuthor", meta.author);
  setText("heroAdvisor", meta.advisor);
  setText("heroDept", meta.department);
  setText("heroYear", meta.year);
  setText("footerVersion", `v${meta.version}`);

  const kpiGrid = document.getElementById("kpiGrid");
  if (kpiGrid && kpis) {
    kpiGrid.innerHTML = kpis
      .map((k) => {
        const deltaClass =
          k.trend === "up" || k.trend === "down-good"
            ? `kpi__delta--${k.trend}`
            : "";
        return `
      <div class="card kpi">
        <div class="kpi__label">${k.label}</div>
        <div class="kpi__value">${k.value}</div>
        <div class="kpi__delta ${deltaClass}">${k.delta}</div>
      </div>`;
      })
      .join("");
  }

  const timelineEl = document.getElementById("timeline");
  if (timelineEl && timeline) {
    const statusLabel = { done: "完成", active: "進行中", pending: "待辦" };
    timelineEl.innerHTML = timeline
      .map(
        (t) => `
      <div class="timeline__item">
        <div>
          <div class="timeline__phase">${t.phase}</div>
          <div class="timeline__period">${t.period}</div>
        </div>
        <span class="timeline__status timeline__status--${t.status}">${statusLabel[t.status] ?? t.status}</span>
      </div>`
      )
      .join("");
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const menuBtn = document.getElementById("menuBtn");

  function close() {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("visible");
    document.body.style.overflow = "";
  }

  menuBtn?.addEventListener("click", () => {
    const open = !sidebar?.classList.contains("open");
    sidebar?.classList.toggle("open", open);
    overlay?.classList.toggle("visible", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  overlay?.addEventListener("click", close);

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) close();
    });
  });
}

function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link");
  const topbarSection = document.getElementById("topbarSection");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((l) => l.classList.toggle("active", l.dataset.section === id));
        const label = NAV_SECTIONS.find((s) => s.id === id)?.label;
        if (topbarSection && label) {
          topbarSection.innerHTML = `目前章節 · <strong>${label}</strong>`;
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  NAV_SECTIONS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

async function main() {
  renderNav();
  initSidebar();

  try {
    const data = await loadProjectData();
    applyMeta(data);
    initCharts(data);
  } catch (err) {
    console.warn(err);
  }

  initScrollSpy();
  document.getElementById("printBtn")?.addEventListener("click", () => window.print());
}

main();
