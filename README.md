# EstateOS — Clickable Demo

**This is a mock-up, not the product.** Static HTML, CSS and JavaScript with hardcoded fictional data. Nothing saves, nothing connects to a server, no database exists yet. It exists so the client can see and approve the shape of the product *before* the backend is built — changes are free at this stage and expensive later.

## How to open it

Double-click `index.html`, or serve the folder:

```bash
cd demo
python -m http.server 5173
# then open http://localhost:5173
```

A server is slightly better (clean URLs, no file:// quirks). Photos are pulled from Unsplash, so with no internet the cards fall back to a green gradient — layout and numbers still work.

## Suggested walkthrough (about 5 minutes)

| # | Where | What to look at |
|---|---|---|
| 1 | `index.html` | The public site a buyer sees. Filter by type, budget, city — and by **size in any unit**: type `2` and pick *Guntha*, or `250` and pick *Sq Yard (Gaj)*. Every listing is matched on a normalised sq ft value, so the unit you search in doesn't matter. |
| 2 | Any property card | Detail page. Note "Posted by *name* on *date*", the ₹/sq ft ↔ ₹/gaj ↔ ₹/acre line, and the type-specific fields (the Karjat land shows water source and soil; the BKC floor shows frontage and fit-out). |
| 3 | **I'm Interested** | The buyer-facing enquiry. Submitting it explains what happens behind the scenes: a lead is created, assigned, tagged `source = website`, and WhatsApp messages go out to both sides. |
| 4 | `login.html` → **Owner** | The full console. |
| 5 | Dashboard | KPIs, AI insight cards, brokerage by month, the lead funnel, the team leaderboard. Hover any chart element. |
| 6 | **Properties** → Add property | The unit-and-price engine is live arithmetic — change the area or the unit and watch every conversion update. Also note the approval queue at the top, which only an owner sees. |
| 7 | **Leads** | Drag a card between stages. The eight columns are database rows, not code — the panel at the bottom explains what the owner can change. |
| 8 | **Deals & Commission** | DL-318 is the exact worked example from the brief: ₹2 Cr × 2% = ₹4 L, split ₹2 L / ₹2 L. The four dots track Expected → Approved → Received → Paid. Check the **Commission rules** tab — owner-only. |
| 9 | **WhatsApp Inbox** | Open the *Ravi Sharma (AG07)* thread to see a team member texting a lead straight into the CRM in `#LEAD` format. The **Message formats** and **Automation log** tabs show the rest. |
| 10 | **AI Analyst** | Click any suggested question. Answers come back with the figures they were built from and a chart. |
| 11 | `login.html` → **Team Member** | **The important one.** Same data, much smaller slice. Shorter sidebar, "Viewing: your data only", his own leads and his own commission line — the deal's total brokerage and the other participants are not shown at all. |
| 12 | `login.html` → Create an account → *I'm joining a team* | The invite-key and approval flow, including the "waiting for approval" state. |

## What is real vs. mocked

**Real arithmetic (you can check it against your own numbers):**
- Area conversion across sq ft / sq m / gaj / acre / guntha / bigha / hectare
- Price total ↔ price per unit, both directions
- Commission splits, totals, and the ledger by person and by status
- All filtering, sorting and searching
- Role scoping — the Team Member view genuinely computes from a restricted slice

**Mocked:** every name, property, lead, deal and message. Saving, uploading, sending, approving. The AI answers are written out in advance, though the numbers in them match the dataset.

## Files

```
demo/
├─ index.html            Public site — listings + filters
├─ property.html         Public property detail + enquiry form
├─ login.html            Sign in / sign up / join with key / pending approval / platform key
├─ app/
│  ├─ dashboard.html     Owner & admin overview
│  ├─ member.html        Team Member workspace (the restricted view)
│  ├─ properties.html    Inventory, filters, approval queue
│  ├─ property-new.html  Add-property wizard with the live unit engine
│  ├─ leads.html         Kanban pipeline + list view
│  ├─ commissions.html   Deals, splits, ledger, ageing, rules
│  ├─ team.html          Members, hierarchy, invite keys, levels, audit
│  ├─ whatsapp.html      Inbox, message formats, automation log
│  ├─ ai.html            AI analyst chat
│  └─ settings.html      Branding, pipeline, types, custom fields, automation, AI
└─ assets/
   ├─ css/theme.css      Design tokens and shared components
   ├─ css/site.css       Public site
   ├─ css/app.css        Console
   ├─ js/data.js         All the fictional data, in one file
   ├─ js/app.js          Shell, formatters, chart renderers
   └─ js/site.js         Public site behaviour
```

To change the demo's story — different city, different price points, your own branch names — edit `assets/js/data.js`. Nothing else needs to change.

## What to decide before Phase 1

The point of this demo is to settle these while they are still cheap:

- [ ] Which area and price units you actually quote in, per property type
- [ ] Your real pipeline stage names
- [ ] Your real commission structure: employee levels, their percentages, and who gets an override
- [ ] Whether team members may create properties, and whether that needs approval
- [ ] Exactly what a team member must *not* see
- [ ] Which fields belong on the public listing and which stay internal
- [ ] Whether you have a Meta Business account for the WhatsApp number

The full build plan — database schema, permission model, AI agent design, WhatsApp automation and the nine delivery phases — lives in the main project repository, not here. This repository is only the demo.

---

## Deploying this

It's a plain static site: no build step, no dependencies. On Vercel, import the repository and accept the defaults — framework preset **Other**, no build command, output directory the repository root.

`vercel.json` sets `X-Robots-Tag: noindex` and `robots.txt` disallows crawling, because "Shree Estates" is a fictional company and shouldn't turn up in search results. Remove both if you ever point this at a real brand.
