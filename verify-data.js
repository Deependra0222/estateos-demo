/* ==========================================================================
   Checks that the demo dataset still agrees with itself.
   Run after editing assets/js/data.js:   node demo/verify-data.js
   The demo's credibility depends on the dashboard, the leaderboard, the
   regions table and the AI's canned answers all deriving from the same deals.
   ========================================================================== */

const path = require("path");
global.window = {};
require(path.join(__dirname, "assets", "js", "data.js"));
const D = global.window.DEMO;

const L = n => "₹" + (n / 100000).toFixed(2) + " L";
const Cr = n => "₹" + (n / 10000000).toFixed(2) + " Cr";

let failures = 0;
function check(label, actual, expected, fmt = String) {
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`${ok ? "  ok  " : "  FAIL"} ${label}: ${fmt(actual)}${ok ? "" : `  (expected ${fmt(expected)})`}`);
}

const splits = D.deals.flatMap(d => d.splits);
const byStatus = st => splits.filter(s => s.status === st).reduce((a, s) => a + s.amt, 0);
const sep = D.deals.filter(d => d.closedOn >= "2026-09-01");
const aug = D.deals.filter(d => d.closedOn < "2026-09-01");
const month = m => D.monthly.find(x => x.m === m);

console.log("\nDeal records");
check("deals", D.deals.length, 6);
check("total brokerage", D.deals.reduce((a, d) => a + d.brokerage, 0), 6309000, L);
check("expected", byStatus("expected"), 2451250, L);
check("approved", byStatus("approved"), 1803750, L);
check("received", byStatus("received"), 970000, L);
check("paid", byStatus("paid"), 1084000, L);
check("outstanding (not paid)",
  byStatus("expected") + byStatus("approved") + byStatus("received"), 5225000, L);

console.log("\nSeptember and August tie to the monthly series");
check("Sept deals", sep.length, month("Sep").closed);
check("Sept brokerage", sep.reduce((a, d) => a + d.brokerage, 0), month("Sep").brokerage, L);
check("Sept transaction value", sep.reduce((a, d) => a + d.value, 0), 317500000, Cr);
check("Aug deals", aug.length, month("Aug").closed);
check("Aug brokerage", aug.reduce((a, d) => a + d.brokerage, 0), month("Aug").brokerage, L);

console.log("\nFunnel ends at the deals actually closed");
check("funnel top = Sept leads", D.funnel[0].n, month("Sep").leads);
check("funnel won = Sept closed", D.funnel[D.funnel.length - 1].n, month("Sep").closed);

console.log("\nLeaderboard matches each person's splits");
D.leaderboard.forEach(p => {
  const theirs = D.deals.filter(d => d.splits.some(s => s.id === p.id));
  const earned = splits.filter(s => s.id === p.id).reduce((a, s) => a + s.amt, 0);
  check(`${p.name} — earned`, p.earned, earned, L);
  check(`${p.name} — deals`, p.deals, theirs.length);
  check(`${p.name} — value`, p.value, theirs.reduce((a, d) => a + d.value, 0), Cr);
});

console.log("\nRegions match the deals");
D.regionPerf.forEach(r => {
  const rd = D.deals.filter(d => d.region === r.region);
  check(`${r.region} — deals`, r.deals, rd.length);
  check(`${r.region} — brokerage`, r.brokerage, rd.reduce((a, d) => a + d.brokerage, 0), L);
  check(`${r.region} — value`, r.value, rd.reduce((a, d) => a + d.value, 0), Cr);
});
check("region brokerage sums to total",
  D.regionPerf.reduce((a, r) => a + r.brokerage, 0),
  D.deals.reduce((a, d) => a + d.brokerage, 0), L);
check("region leads sum to Sept leads",
  D.regionPerf.reduce((a, r) => a + r.leads, 0), month("Sep").leads);

console.log("\nInternal consistency");
D.deals.forEach(d => {
  check(`${d.id} splits total 100%`, Math.round(d.splits.reduce((a, s) => a + s.pct, 0)), 100);
  check(`${d.id} split amounts = brokerage`,
    Math.round(d.splits.reduce((a, s) => a + s.amt, 0)), d.brokerage, L);
  if (d.brokerageType === "flat") {
    console.log(`  ok   ${d.id} flat fee (${d.brokerageNote}): ${L(d.brokerage)}`);
  } else {
    check(`${d.id} brokerage = value x pct`,
      Math.round(d.brokerage), Math.round(d.value * d.brokeragePct / 100), L);
  }
});
D.properties.forEach(p => {
  const f = D.areaUnits.find(u => u.code === p.priceUnit).f;
  const au = D.areaUnits.find(u => u.code === p.unit).f;
  const unitsOfPrice = (p.area * au) / f;
  const implied = p.perUnit * unitsOfPrice;
  const driftPct = Math.abs(implied - p.price) / p.price * 100;
  if (driftPct > 1.5) {
    failures++;
    console.log(`  FAIL ${p.id} price/unit inconsistent: ${p.perUnit} x ${unitsOfPrice.toFixed(2)} = ${Math.round(implied)}, listed ${p.price}`);
  }
});
check("leads", D.leads.length, 16);
check("open leads", D.leads.filter(l => !l.stage.startsWith("closed")).length, 14);
check("properties", D.properties.length, 12);
D.leads.forEach(l => {
  if (!D.stages.some(s => s.key === l.stage)) { failures++; console.log(`  FAIL ${l.id} unknown stage "${l.stage}"`); }
  if (!D.people.some(p => p.id === l.owner)) { failures++; console.log(`  FAIL ${l.id} unknown owner "${l.owner}"`); }
});
D.properties.forEach(p => {
  if (!D.types.some(t => t.key === p.type)) { failures++; console.log(`  FAIL ${p.id} unknown type "${p.type}"`); }
  if (!D.people.some(x => x.id === p.postedBy)) { failures++; console.log(`  FAIL ${p.id} unknown poster "${p.postedBy}"`); }
  if (!D.areaUnits.some(u => u.code === p.unit)) { failures++; console.log(`  FAIL ${p.id} unknown unit "${p.unit}"`); }
});

console.log(
  failures === 0
    ? "\nAll invariants hold. Remember the AI answers in `aiAnswers` quote these figures in prose — re-read them if you changed any.\n"
    : `\n${failures} check(s) failed. Fix data.js, then re-check the AI answers in \`aiAnswers\`.\n`
);
process.exit(failures === 0 ? 0 : 1);
