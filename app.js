const products = [
  {
    code: "APX-101",
    name: "SS316 High-Pressure Hydraulic Adapter",
    category: "hydraulic",
    material: "Stainless Steel 316",
    tolerance: "±0.01 mm",
    moq: "200 pcs"
  },
  {
    code: "APX-104",
    name: "Hardened Drive & Spline Shaft",
    category: "automotive",
    material: "EN19 Alloy Steel",
    tolerance: "±0.005 mm",
    moq: "100 pcs"
  },
  {
    code: "APX-208",
    name: "CNC Machined Pneumatic Valve Manifold",
    category: "valves",
    material: "Aluminium 6061-T6",
    tolerance: "±0.01 mm",
    moq: "50 pcs"
  },
  {
    code: "APX-112",
    name: "Brass Swivel Hose Ferrule & Nut",
    category: "hydraulic",
    material: "Free-Cutting Brass IS 319",
    tolerance: "±0.015 mm",
    moq: "500 pcs"
  },
  {
    code: "APX-305",
    name: "Precision Sensor Housing & Bush",
    category: "automotive",
    material: "SS304",
    tolerance: "±0.008 mm",
    moq: "250 pcs"
  },
  {
    code: "APX-219",
    name: "Industrial Ball Valve Stem & Seat",
    category: "valves",
    material: "SS316L",
    tolerance: "±0.005 mm",
    moq: "150 pcs"
  }
];

let activeCategory = "all";

function renderProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const grid = document.getElementById("productGrid");

  const filtered = products.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.material.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="text-slate-500 text-sm col-span-full">No matching components found. Try another keyword.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (p) => `
      <div class="border border-slate-200 rounded-lg p-5 flex flex-col justify-between bg-slate-50 hover:shadow-md transition">
        <div>
          <span class="text-xs font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">${p.code}</span>
          <h3 class="font-bold text-slate-900 mt-2">${p.name}</h3>
          <ul class="text-xs text-slate-600 space-y-1 mt-3">
            <li><strong>Material:</strong> ${p.material}</li>
            <li><strong>Tolerance:</strong> ${p.tolerance}</li>
            <li><strong>Min Batch:</strong> ${p.moq}</li>
          </ul>
        </div>
        <button
          onclick="prefillQuote('${p.code} - ${p.name} (${p.material})')"
          class="mt-5 w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-semibold py-2 rounded transition">
          Request Quote for Part
        </button>
      </div>
    `
    )
    .join("");
}

function prefillQuote(partText) {
  const input = document.getElementById("partMaterial");
  input.value = partText;
  document.getElementById("rfq").scrollIntoView({ behavior: "smooth" });
  input.focus();
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("bg-slate-900", "text-white");
      b.classList.add("bg-slate-100", "text-slate-700");
    });
    btn.classList.remove("bg-slate-100", "text-slate-700");
    btn.classList.add("bg-slate-900", "text-white");
    renderProducts();
  });
});

document.getElementById("searchInput").addEventListener("input", renderProducts);

document.getElementById("rfqForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("clientName").value;
  const company = document.getElementById("companyName").value;
  const part = document.getElementById("partMaterial").value || "Custom Component";

  const banner = document.getElementById("rfqSuccess");
  banner.textContent = `Thank you, ${name} (${company}). Your RFQ for "${part}" has been logged with Reference #RFQ-${Math.floor(1000 + Math.random() * 9000)}. Our team will reply within 24 hours.`;
  banner.classList.remove("hidden");
  e.target.reset();
});

renderProducts();