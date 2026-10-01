/* ==========================================================================
   EstateOS demo — public buyer-facing site behaviour
   ========================================================================== */

const UNIT_SHORT = { sqft: "sq ft", sqm: "sq m", sqyd: "gaj", acre: "acre", guntha: "guntha", bigha: "bigha", hectare: "hectare" };
const TYPE_LABEL = Object.fromEntries(DEMO.types.map(t => [t.key, t.label]));
const STATUS_LABEL = { available: "Available", reserved: "Reserved", under_offer: "Under offer", sold: "Sold" };

function photoEl(src, cls = "") {
  return `<div class="photo ${cls}"><img src="${src}" alt="" loading="lazy" onerror="this.remove()"></div>`;
}

function priceLine(p) {
  if (p.listing === "rent" || p.listing === "lease") return fmtINR(p.price, { exact: true }) + "<span class='listing-per'> /month</span>";
  return fmtINR(p.price);
}
function perUnitLine(p) {
  const u = UNIT_SHORT[p.priceUnit] || p.priceUnit;
  if (p.listing === "rent" || p.listing === "lease") return `₹${indian(p.perUnit)} per ${u} / month`;
  return `₹${indian(p.perUnit)} per ${u}`;
}

function listingCard(p) {
  const by = person(p.postedBy);
  return `<a class="listing" href="property.html?id=${p.id}">
    <div style="position:relative">
      ${photoEl(p.photos[0])}
      <div class="photo-tags">
        <span class="badge">${TYPE_LABEL[p.type]}</span>
        ${p.listing !== "sale" ? `<span class="badge">For ${p.listing}</span>` : ""}
        ${p.status !== "available" ? `<span class="badge">${STATUS_LABEL[p.status]}</span>` : ""}
        ${p.featured ? `<span class="badge" style="background:rgba(201,151,63,.92);color:#241906">Featured</span>` : ""}
      </div>
    </div>
    <div class="listing-body">
      <div>
        <div class="listing-price">${priceLine(p)}</div>
        <div class="listing-per">${perUnitLine(p)}</div>
      </div>
      <div class="listing-title">${esc(p.title)}</div>
      <div class="listing-loc">📍 ${esc(p.locality)}, ${esc(p.city)}</div>
      <div class="spec-row">
        <span><b>${areaNum(p.area)}</b> ${UNIT_SHORT[p.unit]}</span>
        ${p.beds ? `<span><b>${p.beds}</b> bed</span>` : ""}
        ${p.baths ? `<span><b>${p.baths}</b> bath</span>` : ""}
        ${p.parking ? `<span><b>${p.parking}</b> parking</span>` : ""}
      </div>
      <div class="posted">${avatar(p.postedBy, "avatar-sm")} Posted by ${esc(by.name)} · ${fmtDate(p.postedOn)}</div>
    </div>
  </a>`;
}

/* ---------- Filtering ---------- */
const BUDGETS = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under ₹1 Cr", min: 0, max: 10000000 },
  { label: "₹1 – 3 Cr", min: 10000000, max: 30000000 },
  { label: "₹3 – 10 Cr", min: 30000000, max: 100000000 },
  { label: "Above ₹10 Cr", min: 100000000, max: Infinity }
];

function readFilters() {
  const g = id => (document.getElementById(id) || {}).value || "";
  return {
    q: g("f-q").trim().toLowerCase(),
    type: g("f-type"),
    listing: g("f-listing"),
    city: g("f-city"),
    budget: parseInt(g("f-budget") || "0", 10),
    sort: g("f-sort") || "new",
    minArea: parseFloat(g("f-minarea")) || 0,
    unit: g("f-unit") || "sqft"
  };
}

function applyFilters() {
  const f = readFilters();
  const b = BUDGETS[f.budget] || BUDGETS[0];
  const minSqft = f.minArea * ((DEMO.areaUnits.find(u => u.code === f.unit) || { f: 1 }).f);

  let rows = DEMO.properties.filter(p => {
    if (f.q && !(p.title + " " + p.locality + " " + p.city + " " + p.id + " " + p.desc).toLowerCase().includes(f.q)) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.listing && p.listing !== f.listing) return false;
    if (f.city && p.city !== f.city) return false;
    if (p.listing === "sale" && (p.price < b.min || p.price > b.max)) return false;
    if (minSqft && sqft(p.area, p.unit) < minSqft) return false;
    return true;
  });

  const cmp = {
    new:      (a, c) => c.postedOn.localeCompare(a.postedOn),
    priceAsc: (a, c) => a.price - c.price,
    priceDesc:(a, c) => c.price - a.price,
    areaDesc: (a, c) => sqft(c.area, c.unit) - sqft(a.area, a.unit)
  }[f.sort];
  rows.sort(cmp);

  const grid = document.getElementById("listgrid");
  const count = document.getElementById("resultcount");
  if (count) count.textContent = rows.length + (rows.length === 1 ? " property" : " properties");
  grid.innerHTML = rows.length
    ? rows.map(listingCard).join("")
    : `<div class="empty" style="grid-column:1/-1">
         <p style="font-size:1.05rem;font-weight:600;color:var(--text-primary)">No properties match those filters</p>
         <p>Try widening the budget or clearing the locality.</p>
       </div>`;
}

function resetFilters() {
  ["f-q", "f-type", "f-listing", "f-city", "f-minarea"].forEach(id => { const e = document.getElementById(id); if (e) e.value = ""; });
  const b = document.getElementById("f-budget"); if (b) b.value = "0";
  applyFilters();
}

function initSearchPanel() {
  const typeSel = document.getElementById("f-type");
  if (typeSel) typeSel.innerHTML = `<option value="">Any type</option>` + DEMO.types.map(t => `<option value="${t.key}">${t.label}</option>`).join("");
  const citySel = document.getElementById("f-city");
  if (citySel) {
    const cities = [...new Set(DEMO.properties.map(p => p.city))].sort();
    citySel.innerHTML = `<option value="">Any city</option>` + cities.map(c => `<option>${c}</option>`).join("");
  }
  const bSel = document.getElementById("f-budget");
  if (bSel) bSel.innerHTML = BUDGETS.map((b, i) => `<option value="${i}">${b.label}</option>`).join("");
  const uSel = document.getElementById("f-unit");
  if (uSel) uSel.innerHTML = DEMO.areaUnits.map(u => `<option value="${u.code}">${u.label}</option>`).join("");

  ["f-q", "f-type", "f-listing", "f-city", "f-budget", "f-sort", "f-minarea", "f-unit"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(el.tagName === "SELECT" ? "change" : "input", applyFilters);
  });
  applyFilters();
}

/* ---------- Property detail ---------- */
function initDetail() {
  const id = new URLSearchParams(location.search).get("id") || "PRP-1042";
  const p = DEMO.properties.find(x => x.id === id) || DEMO.properties[0];
  const by = person(p.postedBy);
  document.title = p.title + " · " + DEMO.org.name;

  const photos = p.photos.length >= 3 ? p.photos.slice(0, 3) : [...p.photos, ...p.photos].slice(0, 3);
  document.getElementById("gallery").innerHTML = photos.map(s => photoEl(s)).join("");

  document.getElementById("detail").innerHTML = `
    <div class="row wrap" style="gap:8px;margin-bottom:10px">
      <span class="badge badge-brand">${TYPE_LABEL[p.type]}</span>
      <span class="badge badge-outline">For ${p.listing}</span>
      <span class="badge ${p.status === "available" ? "badge-good" : "badge-warn"}">${STATUS_LABEL[p.status]}</span>
      <span class="badge badge-outline">${p.id}</span>
    </div>
    <h1>${esc(p.title)}</h1>
    <p class="sec" style="font-size:.95rem;margin-top:6px">📍 ${esc(p.locality)}, ${esc(p.city)} · ${esc(p.region)}</p>

    <div class="row wrap" style="gap:22px;margin:18px 0 22px;align-items:flex-end">
      <div>
        <div style="font-size:1.9rem;font-weight:740;letter-spacing:-.03em">${priceLine(p)}</div>
        <div class="sec small">${perUnitLine(p)}</div>
      </div>
      <div style="border-left:1px solid var(--border);padding-left:22px">
        <div style="font-size:1.25rem;font-weight:700">${areaNum(p.area)} <span style="font-size:.85rem;font-weight:550">${UNIT_SHORT[p.unit]}</span></div>
        <div class="sec small">${indian(sqft(p.area, p.unit))} sq ft equivalent</div>
      </div>
    </div>

    <h3 style="margin-bottom:10px">Property details</h3>
    <div class="speclist" style="margin-bottom:26px">
      ${spec("Configuration", p.beds ? p.beds + " BHK" : "—")}
      ${spec("Bathrooms", p.baths || "—")}
      ${spec("Parking", p.parking || "—")}
      ${spec("Floor", p.floor)}
      ${spec("Furnishing", p.furnishing)}
      ${spec("Facing", p.facing)}
      ${spec("Age", p.age ? p.age + " years" : "New")}
      ${spec("Possession", p.possession)}
      ${Object.entries(p.extra || {}).map(([k, v]) => spec(k, v)).join("")}
    </div>

    <h3 style="margin-bottom:10px">About this property</h3>
    <p class="sec" style="font-size:.93rem;line-height:1.7">${esc(p.desc)}</p>

    <h3 style="margin:22px 0 10px">Amenities &amp; highlights</h3>
    <div class="amenities">${p.amenities.map(a => `<span class="amenity">✓ ${esc(a)}</span>`).join("")}</div>

    <div class="card card-pad" style="margin-top:26px;display:flex;gap:13px;align-items:center">
      ${avatar(p.postedBy, "avatar-lg")}
      <div class="grow">
        <div class="bold">Posted by ${esc(by.name)}</div>
        <div class="sec small">${by.role === "owner" ? "Owner" : (DEMO.levels.find(l => l.id === by.level) || {}).name} · ${esc(by.region)} · Listed ${fmtDate(p.postedOn)}</div>
      </div>
      <span class="badge badge-outline">${p.views} views</span>
    </div>`;

  document.getElementById("enqTitle").textContent = p.title;
  document.getElementById("enqProp").textContent = p.id;

  const similar = DEMO.properties.filter(x => x.id !== p.id && (x.type === p.type || x.city === p.city)).slice(0, 3);
  document.getElementById("similar").innerHTML = similar.map(listingCard).join("");
}
function spec(l, v) { return `<div class="spec"><div class="l">${esc(l)}</div><div class="v">${esc(v)}</div></div>`; }

/* ---------- Enquiry form (demo only) ---------- */
function submitEnquiry(e) {
  e.preventDefault();
  const name = document.getElementById("eq-name").value.trim() || "there";
  document.getElementById("enqForm").classList.add("hide");
  document.getElementById("enqDone").classList.remove("hide");
  document.getElementById("enqDoneName").textContent = name;
  return false;
}
