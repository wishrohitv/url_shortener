const form = document.querySelector("form");
const submitButton = form.querySelector("button[type='submit']");
const charts = new Map();
const chartColors = ["#22d3ee", "#a78bfa", "#fbbf24", "#fb7185", "#34d399"];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const urlId = getUrlId(document.querySelector("#url").value);
  if (!urlId) {
    showMessage(
      "Enter a valid shortened URL, such as https://example.com/tde43.",
    );
    return;
  }

  setLoading(true);
  try {
    await Promise.all([lineChart(urlId), donutChart(urlId), barChart(urlId)]);
  } catch (error) {
    console.error("Unable to load analytics", error);
    showMessage("We could not load analytics for that link. Please try again.");
  } finally {
    setLoading(false);
  }
});

function getUrlId(value) {
  try {
    const url = new URL(value.trim());
    const parts = url.pathname.split("/").filter(Boolean);
    const isHttpUrl = url.protocol === "http:" || url.protocol === "https:";
    return isHttpUrl && parts.length ? parts.at(-1) : null;
  } catch {
    return null;
  }
}

async function fetchStats(urlId, type = "line") {
  const response = await fetch(
    `/api/url/${encodeURIComponent(urlId)}/stats?type=${type}`,
  );
  if (!response.ok) throw new Error(`Stats request failed: ${response.status}`);
  const { data = [] } = await response.json();
  return data;
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? "Loading..." : "View analytics";
}

function showMessage(message) {
  let messageElement = document.querySelector("#stats-message");
  if (!messageElement) return;
  messageElement.textContent = message;
  messageElement.classList.remove("hidden");
}

function hideMessage() {
  document.querySelector("#stats-message")?.classList.add("hidden");
}

async function renderChart(id, options, emptyMessage) {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  hideMessage();

  charts.get(id)?.destroy();
  if (
    !options.series?.length ||
    options.series.every((series) => !series.data?.length)
  ) {
    element.innerHTML = `<p class="grid min-h-72 place-items-center px-6 text-center text-sm text-slate-500">${emptyMessage}</p>`;
    return;
  }

  element.replaceChildren();
  const chart = new window.ApexCharts(element, {
    ...options,
    colors: chartColors,
    foreColor: "#94a3b8",
    grid: { borderColor: "#1e293b", strokeDashArray: 4 },
    tooltip: { theme: "dark" },
    chart: {
      ...options.chart,
      background: "transparent",
      fontFamily: "inherit",
      toolbar: { show: false },
    },
  });
  charts.set(id, chart);
  await chart.render();
}

async function lineChart(urlId) {
  const data = await fetchStats(urlId);
  await renderChart(
    "line-chart",
    {
      chart: { type: "area", height: 330 },
      series: [{ name: "Clicks", data: data.map(({ y }) => y) }],
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.35, opacityTo: 0.03 },
      },
      dataLabels: { enabled: false },
      xaxis: { categories: data.map(({ x }) => x), labels: { rotate: -35 } },
      yaxis: { min: 0, forceNiceScale: true },
      reversed: true
    },
    "No clicks recorded yet.",
  );
}

async function donutChart(urlId) {
  const data = await fetchStats(urlId, "os");
  console.log(data)
  await renderChart(
    "donut-chart",
    {
      chart: { type: "donut", height: 330 },
      series: data.map(({ count }) => count),
      labels: data.map(({ os }) => os || "Unknown"),
      legend: { position: "bottom" },
      dataLabels: { enabled: true },
      plotOptions: {
        pie: {
          donut: {
            size: "68%",
            labels: { show: true, total: { show: true, label: "Visitors" } },
          },
        },
      },
    },
    "No device data recorded yet.",
  );
}

async function barChart(urlId) {
  const data = await fetchStats(urlId, "country");
  await renderChart(
    "bar-chart",
    {
      chart: { type: "bar", height: Math.max(300, data.length * 42) },
      series: [{ name: "Visitors", data: data.map(({ count }) => count) }],
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: "end",
          horizontal: true,
          barHeight: "55%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: data.map(({ country }) => country || "Unknown"),
        min: 0,
      },
    },
    "No country data recorded yet.",
  );
}
