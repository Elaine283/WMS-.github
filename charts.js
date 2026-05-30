const CHART_COLORS = {
  primary: "#2dd4bf",
  primaryDim: "rgba(45, 212, 191, 0.75)",
  secondary: "#5eead4",
  muted: "#71717a",
  grid: "rgba(255, 255, 255, 0.06)",
  text: "#a1a1aa",
};

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: CHART_COLORS.text,
        font: { family: "'IBM Plex Sans', 'Noto Sans TC', sans-serif", size: 11 },
        boxWidth: 10,
        padding: 14,
      },
    },
    tooltip: {
      backgroundColor: "#18181b",
      borderColor: "rgba(45, 212, 191, 0.25)",
      borderWidth: 1,
      titleColor: "#f4f4f5",
      bodyColor: "#a1a1aa",
      padding: 10,
    },
  },
};

function scaleOptions() {
  return {
    x: {
      grid: { color: CHART_COLORS.grid, drawBorder: false },
      ticks: { color: CHART_COLORS.text, font: { size: 11 } },
    },
    y: {
      grid: { color: CHART_COLORS.grid, drawBorder: false },
      ticks: { color: CHART_COLORS.text, font: { size: 11 } },
    },
  };
}

export function initCharts(data) {
  const {
    turnoverTrend,
    inboundOutbound,
    inventoryComparison,
    abcDistribution,
    warehouseUtilization,
    wmsImpact,
  } = data.charts;

  const lineCtx = document.getElementById("chartTurnover");
  if (lineCtx && turnoverTrend) {
    new Chart(lineCtx, {
      type: "line",
      data: {
        labels: turnoverTrend.labels,
        datasets: turnoverTrend.datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          borderColor: i === 0 ? CHART_COLORS.primary : CHART_COLORS.muted,
          backgroundColor: i === 0 ? "rgba(45, 212, 191, 0.1)" : "transparent",
          borderWidth: i === 0 ? 2 : 1.5,
          borderDash: i === 0 ? [] : [5, 5],
          pointRadius: 4,
          pointBackgroundColor: i === 0 ? CHART_COLORS.primary : CHART_COLORS.muted,
          tension: 0.35,
          fill: i === 0,
        })),
      },
      options: {
        ...chartDefaults,
        scales: scaleOptions(),
        interaction: { mode: "index", intersect: false },
      },
    });
  }

  const ioCtx = document.getElementById("chartInboundOutbound");
  if (ioCtx && inboundOutbound) {
    new Chart(ioCtx, {
      type: "line",
      data: {
        labels: inboundOutbound.labels,
        datasets: inboundOutbound.datasets.map((ds, i) => ({
          label: ds.label,
          data: ds.data,
          borderColor: i === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary,
          backgroundColor: "transparent",
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
        })),
      },
      options: {
        ...chartDefaults,
        scales: scaleOptions(),
      },
    });
  }

  const barCtx = document.getElementById("chartInventory");
  if (barCtx && inventoryComparison) {
    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: inventoryComparison.labels,
        datasets: [
          {
            label: "件數",
            data: inventoryComparison.data,
            backgroundColor: [
              CHART_COLORS.primaryDim,
              "rgba(45, 212, 191, 0.45)",
              "rgba(251, 191, 36, 0.55)",
              "rgba(113, 113, 122, 0.45)",
              "rgba(94, 234, 212, 0.35)",
            ],
            borderRadius: 4,
          },
        ],
      },
      options: {
        ...chartDefaults,
        plugins: { ...chartDefaults.plugins, legend: { display: false } },
        scales: scaleOptions(),
      },
    });
  }

  const donutCtx = document.getElementById("chartAbc");
  if (donutCtx && abcDistribution) {
    new Chart(donutCtx, {
      type: "doughnut",
      data: {
        labels: abcDistribution.labels,
        datasets: [
          {
            data: abcDistribution.data,
            backgroundColor: [
              CHART_COLORS.primary,
              "rgba(45, 212, 191, 0.5)",
              CHART_COLORS.muted,
            ],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: { ...chartDefaults, cutout: "62%" },
    });
  }

  const impactCtx = document.getElementById("chartWmsImpact");
  if (impactCtx && wmsImpact) {
    new Chart(impactCtx, {
      type: "bar",
      data: {
        labels: wmsImpact.labels,
        datasets: [
          {
            label: "導入 WMS 前",
            data: wmsImpact.before,
            backgroundColor: "rgba(113, 113, 122, 0.55)",
            borderRadius: 4,
          },
          {
            label: "導入 WMS 後",
            data: wmsImpact.after,
            backgroundColor: CHART_COLORS.primaryDim,
            borderRadius: 4,
          },
        ],
      },
      options: {
        ...chartDefaults,
        scales: {
          ...scaleOptions(),
          y: {
            ...scaleOptions().y,
            title: {
              display: true,
              text: "指標值（% 或相對指數）",
              color: CHART_COLORS.text,
              font: { size: 10 },
            },
          },
        },
      },
    });
  }

  const utilCtx = document.getElementById("chartWarehouse");
  if (utilCtx && warehouseUtilization) {
    new Chart(utilCtx, {
      type: "bar",
      data: {
        labels: warehouseUtilization.labels,
        datasets: [
          {
            label: "利用率 %",
            data: warehouseUtilization.data,
            backgroundColor: warehouseUtilization.data.map((v) =>
              v >= 85
                ? CHART_COLORS.primary
                : v >= 70
                  ? CHART_COLORS.primaryDim
                  : "rgba(113, 113, 122, 0.5)"
            ),
            borderRadius: 4,
          },
        ],
      },
      options: {
        ...chartDefaults,
        plugins: { ...chartDefaults.plugins, legend: { display: false } },
        scales: {
          ...scaleOptions(),
          y: { ...scaleOptions().y, max: 100 },
        },
      },
    });
  }
}
