/* ==========================================================================
   EstateOS demo — shared console shell, formatters and chart renderers.
   Static demo. No network, no persistence beyond localStorage for the role.
   ========================================================================== */

/* ---------- Role ---------- */
const ROLE_KEY = "estateos-demo-role";
function getRole() { return localStorage.getItem(ROLE_KEY) || "owner"; }
function setRole(r) { localStorage.setItem(ROLE_KEY, r); }
function isAdmin() { return getRole() === "owner" || getRole() === "admin"; }

/** The signed-in person for the current demo role. */
function me() {
  const r = getRole();
  if (r === "owner") return DEMO.people[0];
  if (r === "admin") return DEMO.people[1];
  return DEMO.people.find(p => p.id === "u5");  // Ravi Sharma, Senior Agent
}

/* ---------- Formatters ---------- */
function fmtINR(n, opts = {}) {
  if (n === null || n === undefined) return "—";
  const abs = Math.abs(n);
  if (!opts.exact) {
    if (abs >= 10000000) return "₹" + trim(n / 10000000) + " Cr";
    if (abs >= 100000)   return "₹" + trim(n / 100000) + " L";
  }
  return "₹" + indian(Math.round(n));
}
function trim(v) {
  const s = v.toFixed(2);
  return s.replace(/\.?0+$/, "");
}
function indian(n) {
  const s = String(Math.abs(Math.round(n)));
  if (s.length <= 3) return (n < 0 ? "-" : "") + s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return (n < 0 ? "-" : "") + rest + "," + last3;
}
/** Area quantities may be fractional (2.5 acre, 0.75 guntha) — keep the decimals. */
function areaNum(v) {
  if (v === null || v === undefined) return "—";
  return Number.isInteger(v) ? indian(v) : indian(Math.trunc(v)) + String(v % 1).slice(1, 4);
}
function fmtArea(v, unit) {
  const u = DEMO.areaUnits.find(a => a.code === unit);
  return indian(v) + " " + (u ? u.label.toLowerCase().replace("sq ", "sq ") : unit);
}
function sqft(v, unit) {
  const u = DEMO.areaUnits.find(a => a.code === unit);
  return Math.round(v * (u ? u.f : 1));
}
function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtDateShort(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
function fmtTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}
function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("");
}
function person(id) { return DEMO.people.find(p => p.id === id); }
function avatar(id, cls = "") {
  const p = person(id);
  if (!p) return `<span class="avatar ${cls}" style="background:#8A9793">?</span>`;
  return `<span class="avatar ${cls}" style="background:${p.color}" title="${p.name}">${initials(p.name)}</span>`;
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

/* ---------- Scoping (mirrors what RLS will enforce for real) ---------- */
const DOWNLINE = { u3: ["u3", "u5", "u6"], u4: ["u4", "u7", "u8"] };
function visibleIds() {
  if (isAdmin()) return DEMO.people.map(p => p.id);
  const m = me();
  return DOWNLINE[m.id] || [m.id];
}
function myLeads()  { const v = visibleIds(); return DEMO.leads.filter(l => v.includes(l.owner)); }
function myDeals()  { const v = visibleIds(); return isAdmin() ? DEMO.deals : DEMO.deals.filter(d => d.splits.some(s => s.id && v.includes(s.id))); }
function myConvos() { const v = visibleIds(); return isAdmin() ? DEMO.conversations : DEMO.conversations.filter(c => v.includes(c.assigned)); }

/* ---------- Icons ---------- */
const ICON = {
  dashboard: '<path d="M3 3h7v7H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 14h7v7H3z"/>',
  building:  '<path d="M3 21h18M5 21V4a1 1 0 011-1h7a1 1 0 011 1v17M14 9h4a1 1 0 011 1v11M8 7h2M8 11h2M8 15h2"/>',
  users:     '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  funnel:    '<path d="M3 4h18l-7 8v7l-4 2v-9L3 4z"/>',
  rupee:     '<path d="M6 3h12M6 8h12M16 3c0 5-4 5-10 5 3.5 0 7 0 10 13"/>',
  chat:      '<path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>',
  spark:     '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3zM19 16l.7 2.1 2.1.7-2.1.7L19 22l-.7-2.5-2.1-.7 2.1-.7L19 16z"/>',
  gear:      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2V21a2 2 0 11-4 0v-.1A1.7 1.7 0 007 19.4a1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00-1.2-2.9H1a2 2 0 110-4h.1A1.7 1.7 0 002.6 7a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H7a1.7 1.7 0 001-1.5V1a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V7a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
  globe:     '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z"/>',
  inbox:     '<path d="M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13l3.5 7v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6l3.5-7z"/>',
  bell:      '<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>',
  search:    '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  menu:      '<path d="M3 6h18M3 12h18M3 18h18"/>',
  logout:    '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>',
  plus:      '<path d="M12 5v14M5 12h14"/>'
};
function icon(name, size = 18) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ""}</svg>`;
}

/* ---------- Navigation ---------- */
const NAV = [
  { key: "dashboard",   label: "Dashboard",    icon: "dashboard", href: "dashboard.html",   roles: ["owner", "admin"] },
  { key: "member",      label: "My Workspace", icon: "dashboard", href: "member.html",      roles: ["member"] },
  { key: "properties",  label: "Properties",   icon: "building",  href: "properties.html",  roles: ["owner", "admin", "member"] },
  { key: "leads",       label: "Leads",        icon: "funnel",    href: "leads.html",       roles: ["owner", "admin", "member"] },
  { key: "commissions", label: "Deals & Commission", icon: "rupee", href: "commissions.html", roles: ["owner", "admin", "member"] },
  { key: "whatsapp",    label: "WhatsApp Inbox", icon: "chat",    href: "whatsapp.html",    roles: ["owner", "admin", "member"], badge: "3" },
  { key: "ai",          label: "AI Analyst",   icon: "spark",     href: "ai.html",          roles: ["owner", "admin", "member"] },
  { key: "team",        label: "Team",         icon: "users",     href: "team.html",        roles: ["owner", "admin"], badge: "2" },
  { key: "settings",    label: "Settings",     icon: "gear",      href: "settings.html",    roles: ["owner", "admin"] }
];

function renderShell() {
  const page = document.body.dataset.page;
  const role = getRole();
  const m = me();
  const items = NAV.filter(n => n.roles.includes(role));
  const roleLabel = role === "owner" ? "Owner" : role === "admin" ? "Admin" : (DEMO.levels.find(l => l.id === m.level) || {}).name;

  const nav = items.map(n => `
    <a class="nav-item ${n.key === page ? "active" : ""}" href="${n.href}">
      <span class="nav-ico">${icon(n.icon)}</span>
      <span class="nav-label">${n.label}</span>
      ${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ""}
    </a>`).join("");

  const sidebar = `
  <aside class="sidebar" id="sidebar">
    <div class="brand">
      <div class="brand-mark">SE</div>
      <div class="stack">
        <span class="brand-name">${DEMO.org.name}</span>
        <span class="brand-sub">${DEMO.org.tagline}</span>
      </div>
    </div>
    <nav class="nav">${nav}</nav>
    <div class="sidebar-foot">
      <a class="nav-item" href="../index.html" target="_blank">
        <span class="nav-ico">${icon("globe")}</span><span class="nav-label">View public site</span>
      </a>
      <div class="whoami">
        <span class="avatar" style="background:${m.color}">${initials(m.name)}</span>
        <div class="stack grow">
          <span class="whoami-name">${m.name}</span>
          <span class="whoami-role">${roleLabel}</span>
        </div>
        <a class="btn-ghost icon-btn" href="../login.html" title="Switch role / sign out">${icon("logout", 16)}</a>
      </div>
    </div>
  </aside>`;

  const topbar = `
  <header class="topbar">
    <button class="icon-btn only-mobile" id="menuBtn" aria-label="Menu">${icon("menu", 20)}</button>
    <div class="searchbox">
      ${icon("search", 16)}
      <input class="searchinput" placeholder="Search properties, leads, people…" aria-label="Search">
      <span class="kbd only-desk">⌘K</span>
    </div>
    <div class="topbar-right">
      <span class="scope-badge" title="What this account can see">
        ${isAdmin() ? "Viewing: whole organisation" : "Viewing: your data only"}
      </span>
      <button class="icon-btn" aria-label="Notifications">${icon("bell", 18)}<span class="dot-badge"></span></button>
      <a class="btn btn-primary btn-sm only-desk" href="property-new.html">${icon("plus", 15)} Add Property</a>
    </div>
  </header>`;

  document.body.insertAdjacentHTML("afterbegin", sidebar + `<div class="scrim" id="scrim"></div>`);
  const main = document.querySelector(".main");
  if (main) main.insertAdjacentHTML("afterbegin", topbar);

  const btn = document.getElementById("menuBtn");
  const sb = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");
  if (btn) btn.onclick = () => { sb.classList.toggle("open"); scrim.classList.toggle("show"); };
  if (scrim) scrim.onclick = () => { sb.classList.remove("open"); scrim.classList.remove("show"); };
}

/* ---------- Demo banner ---------- */
function demoBanner(text) {
  return `<div class="demo-note">🎬 <strong>Demo</strong> — ${text}</div>`;
}

/* ==========================================================================
   Charts — inline SVG, hover tooltips, direct value labels.
   Series colours are the validated categorical slots from the design system.
   ========================================================================== */

let _tip;
function tip() {
  if (!_tip) {
    _tip = document.createElement("div");
    _tip.className = "viz-tip";
    document.body.appendChild(_tip);
  }
  return _tip;
}
function showTip(evt, html) {
  const t = tip();
  t.innerHTML = html;
  t.style.display = "block";
  const r = t.getBoundingClientRect();
  let x = evt.clientX + 14, y = evt.clientY - r.height - 10;
  if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - 14;
  if (y < 8) y = evt.clientY + 18;
  t.style.left = x + "px"; t.style.top = y + "px";
}
function hideTip() { if (_tip) _tip.style.display = "none"; }

function attachTips(root) {
  root.querySelectorAll("[data-tip]").forEach(el => {
    el.addEventListener("mousemove", e => showTip(e, el.dataset.tip));
    el.addEventListener("mouseleave", hideTip);
    el.addEventListener("focus", e => showTip({ clientX: el.getBoundingClientRect().left + 20, clientY: el.getBoundingClientRect().top }, el.dataset.tip));
    el.addEventListener("blur", hideTip);
  });
}

/** Vertical bars, single series, direct labels. */
function barChart(el, rows, { valueFmt = v => v, height = 190, color = "var(--brand-600)" } = {}) {
  const W = 620, H = height, padL = 8, padR = 8, padT = 26, padB = 26;
  const max = Math.max(...rows.map(r => r.v)) * 1.12 || 1;
  const bw = (W - padL - padR) / rows.length;
  const barW = Math.min(46, bw * 0.52);
  const plotH = H - padT - padB;

  const grid = [0.5, 1].map(f => {
    const y = padT + plotH - plotH * f;
    return `<line class="grid-line" x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"/>`;
  }).join("");

  const bars = rows.map((r, i) => {
    const h = Math.max(3, (r.v / max) * plotH);
    const x = padL + i * bw + (bw - barW) / 2;
    const y = padT + plotH - h;
    return `<g tabindex="0" data-tip="<b>${esc(r.k)}</b><br>${valueFmt(r.v)}" class="bar-g">
      <rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${color}"/>
      <text class="val-label" x="${x + barW / 2}" y="${y - 7}" text-anchor="middle" font-size="11">${valueFmt(r.v)}</text>
      <text x="${x + barW / 2}" y="${H - 8}" text-anchor="middle" font-size="11">${esc(r.k)}</text>
    </g>`;
  }).join("");

  el.innerHTML = `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img">
    ${grid}<line class="axis-line" x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}"/>${bars}
  </svg>`;
  attachTips(el);
}

/** Two-series line chart with legend + crosshair-style hover dots. */
function lineChart(el, labels, series, { height = 200, valueFmt = v => v } = {}) {
  const W = 620, H = height, padL = 34, padR = 14, padT = 18, padB = 26;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const max = Math.max(...series.flatMap(s => s.values)) * 1.15 || 1;
  const x = i => padL + (labels.length === 1 ? plotW / 2 : (i * plotW) / (labels.length - 1));
  const y = v => padT + plotH - (v / max) * plotH;

  const grid = [0, 0.5, 1].map(f => `<line class="grid-line" x1="${padL}" y1="${padT + plotH - plotH * f}" x2="${W - padR}" y2="${padT + plotH - plotH * f}"/>`).join("");
  const xlab = labels.map((l, i) => `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11">${esc(l)}</text>`).join("");

  const paths = series.map(s => {
    const d = s.values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join("");

  const dots = series.map(s => s.values.map((v, i) => `
    <circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="${s.color}" stroke="var(--surface-1)" stroke-width="2"
      tabindex="0" data-tip="<b>${esc(labels[i])}</b><br><span style='color:${s.color}'>●</span> ${esc(s.name)}: ${valueFmt(v)}"/>`).join("")).join("");

  const legend = series.map(s => `<span><i class="swatch" style="background:${s.color}"></i>${esc(s.name)}</span>`).join("");

  el.innerHTML = `
    <div class="legend" style="margin-bottom:8px">${legend}</div>
    <svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img">
      ${grid}${xlab}${paths}${dots}
    </svg>`;
  attachTips(el);
}

/** Horizontal funnel — sequential single-hue ramp, magnitude by length. */
function funnelChart(el, rows) {
  const top = rows[0].n || 1;
  const seq = ["--seq-6", "--seq-5", "--seq-4", "--seq-3", "--seq-2", "--seq-1", "--seq-1"];
  el.innerHTML = rows.map((r, i) => {
    const pct = (r.n / top) * 100;
    const drop = i ? Math.round(((rows[i - 1].n - r.n) / rows[i - 1].n) * 100) : 0;
    const dark = i < 3;
    return `<div class="fn-row" tabindex="0" data-tip="<b>${esc(r.stage)}</b><br>${r.n} leads · ${Math.round(pct)}% of top${i ? `<br>−${drop}% from previous` : ""}">
      <span class="fn-label">${esc(r.stage)}</span>
      <span class="fn-track">
        <span class="fn-fill" style="width:${Math.max(pct, 7)}%;background:var(${seq[i]})">
          <span class="fn-val" style="color:${dark ? "#fff" : "var(--text-primary)"}">${r.n}</span>
        </span>
      </span>
      <span class="fn-pct num">${Math.round(pct)}%</span>
    </div>`;
  }).join("");
  attachTips(el);
}

/** Horizontal bar leaderboard. */
function hbarChart(el, rows, { valueFmt = v => v, color = "var(--brand-600)" } = {}) {
  const max = Math.max(...rows.map(r => r.v)) || 1;
  el.innerHTML = rows.map(r => `
    <div class="hb-row" tabindex="0" data-tip="<b>${esc(r.k)}</b><br>${valueFmt(r.v)}${r.sub ? "<br>" + esc(r.sub) : ""}">
      <span class="hb-label">${r.avatar || ""}<span class="hb-name">${esc(r.k)}</span></span>
      <span class="hb-track"><span class="hb-fill" style="width:${Math.max((r.v / max) * 100, 2)}%;background:${color}"></span></span>
      <span class="hb-val num">${valueFmt(r.v)}</span>
    </div>`).join("");
  attachTips(el);
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("console")) renderShell();
});
