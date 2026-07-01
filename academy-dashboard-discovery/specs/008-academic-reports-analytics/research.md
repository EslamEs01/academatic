# Research: Academic Reports and Operations Analytics Shell (Spec 008)

Phase 0 decisions. Each is **Decision / Rationale / Alternatives considered**. Two grounding passes fed these: the analyzed legacy academy system (`output/combined/*-inventory.md`, `frontend-planning-deep/*`) and the current implemented app (`academy-dashboard-discovery/app/`, re-read file-by-file in this plan run). No `NEEDS CLARIFICATION` remained after `/speckit.specify`.

---

## D1 — Reports is a DISPLAY / ORGANIZE / LINK shell, never an analytics/BI/score/chart system

**Decision**: The Reports surface **organizes existing academic operations into report-category cards + a fixture-backed operations overview + per-area summary sections + honest demo actions + real drill-down links**. Every number is a **baked fixture count / resolved list length**. There is **no chart/graph/sparkline/canvas**, **no computed score/rank/leaderboard/percentile/trend/prediction/"health %"**, and **no analytics/aggregation/report/export engine**.

**Rationale**: The legacy "reports" were scattered, weak, raw-count pages (Sessions Analysis KPI cards, Teacher/Class Feedback %, Teachers-Details Cancel/Absent/Attend) with no computed score/ranking ever; the v2 IA explicitly recommends "**Reports centralised under Overview**." A fixture-only static site cannot honestly back a BI/analytics engine, and faking one is a hard screenshot-failure condition. A calm shell that *organizes + links + summarizes existing counts* is the honest realization of the v2 recommendation.

**Alternatives considered**: (a) A chart-rich analytics dashboard — rejected: no chart library allowed, fixtures can't honestly back trends, reads as fake BI. (b) A computed "academy health score" — rejected: fabricated metric, no reference backing, forbidden. (c) Big data tables of every record — rejected: a "data dump"; the source pages (attendance/sessions/etc.) already own the rows — Reports summarizes + links to them.

---

## D2 — ENRICH the existing implemented `reports.html` (no new page, no nav promotion, no dashboard chrome)

**Decision**: Rewrite the existing `pages/reports.js` + `fixtures/reports.js` in place to become the shell; keep the `reports` nav item / `activeId:'reports'` / `build-html.mjs` registration / topbar breadcrumb unchanged. **No new public page, no nav promotion, no dashboard change.**

**Rationale**: `reports.html` is **already implemented** — a real `reports` nav item (`route:'reports.html'`, `nav.config.js:70`), registered in `build-html.mjs:50`, rendered by `reports.js`. The dashboard already links to it (`dashboard.js:111` `section.reports` header → `reports.html`). So the cleanest, lowest-risk move is the proven enrich-an-existing-page pattern (Spec 006 enriched `courses.html`, Spec 007 enriched `teachers.html`). Adding a page or promoting a planned item would be redundant and create dead-link risk.

**Alternatives considered**: (a) Add `academic-reports.html` + promote a planned item — rejected: `reports.html` already exists and is the natural home; a second page splits the shell and needs a nav change. (b) Promote `monthlyReports`/`dataAnalysis` — rejected: those genuinely need a backend; they stay **planned**, surfaced honestly as `planned`/`backendRequired` cards (no dead link).

---

## D3 — Finance is entirely out of scope (remove the `revenue` placeholder)

**Decision**: Remove the existing finance `revenue` reportCard (`fixtures/reports.js`, `icon:'wallet'`). **No** salary/payroll/invoice/payment/accounting/revenue report card, figure, chip, or widget anywhere. If a finance affordance is unavoidable, it is a single disabled "finance reporting — out of current scope" card with no route (mirroring the existing disabled finance **nav** items, which stay as-is and are not surfaced as reports).

**Rationale**: The legacy reports module was half finance (Salaries/Staff-Salaries/Salary-Class-Report/Accounting/Invoices/Payments), and the v2 IA isolates finance into its own group. Spec 007 already ruled finance out; Spec 008 is academic reports only. A future finance spec owns reporting on money.

**Alternatives considered**: (a) Keep a disabled "revenue (soon)" card — rejected: even disabled it implies finance is a reports concern here; cleaner to omit. (b) A read-only "revenue (demo)" figure — rejected: fabricated finance number, forbidden.

---

## D4 — Every report number is a ROLL-UP of an existing fixture summary (no fabrication)

**Decision**: A thin `report-summary` resolver (in the rewritten `fixtures/reports.js`) rolls up **existing** exports only — no new metric:

| Report area | Rolled-up source (existing export) |
|---|---|
| Attendance & Outcomes | `OUTCOME_SUMMARY` (`attendance.js`): `total/attended/studentAbsent/teacherAbsent/cancelledOrRescheduled/needsFollowUp` |
| Sessions & Timetable | `STATUS_SUMMARY` (`status-summary.js`: cancelled/upcoming/live/completed) + `SESSIONS.total` (`sessions.js` = 24) |
| Courses & Groups | `GROUP_SUMMARY` (`groups.js`: total/active/trial/full/needsAttention) + active-courses = `COURSES.rows.filter(c=>c.statusId==='active').length` |
| Teachers | `TEACHERS_NEEDING_FOLLOWUP` (`teachers.js` = 2) + `OUTCOME_SUMMARY.teacherAbsent` / `OUTCOME_SUMMARY.studentAbsent` |
| Students & Families | families with attention = `FAMILIES.rows.filter(f=>f.attention).length` (=2) + students needing follow-up = the **exact** `dashboard.js` computation (`statusId∈{suspended,stopped}` OR family has `attention`) |

**Rationale**: SC-009 mandates every number trace to a fixture roll-up. These exports already exist and already drive the dashboard chips — reusing them keeps the shell honest, single-sourced, and consistent with the dashboard (the same counts appear). No new aggregation is computed beyond plain addition of existing counts.

**Alternatives considered**: (a) Recompute fresh metrics in `reports.js` — rejected: duplicates the existing summaries, risks drift. (b) Invent academy-wide KPIs (retention, growth) — rejected: not fixture-backed, fabricated.

---

## D5 — Two NEW labeled maps (report-signal + report-availability) + reuse the existing status chips

**Decision**: Add `report-status.js` — a **report-signal** map (`healthy / needsFollowUp / attentionRisk`) and a **report-availability** map (`available / demoOnly / planned / backendRequired`), both icon+text labeled (never numeric/color-only), AR/EN, distinct from the existing maps. **Reuse** the Spec 005 `outcome-status` chips (attendance/teacher sections), the Spec 001/003 session-status chips, the Spec 006 `group-status` chips, and the Spec 007 teacher signals for the per-area summaries.

**Rationale**: FR-009 requires labeled report vocabularies; the project's hard constraint is "labeled chips, never numeric/color-only." `report-signal` summarizes an area's health as a calm authored flag (not a computed grade); `report-availability` honestly labels each category card (available now vs demo-only vs needs-backend). Reusing the existing status chips for the per-area facts keeps teacherAbsent ≠ studentAbsent and the session/group vocabularies consistent.

**Alternatives considered**: (a) A numeric "health 0–100" per area — rejected: a computed score, forbidden. (b) Color-only severity dots — rejected: violates the labeled-chip rule. (c) Reuse an existing map for the report signal — rejected: report-area health is a distinct concept; conflating muddies the vocabulary.

---

## D6 — Honest report actions (print / export-CSV / export-PDF / share / schedule)

**Decision**: A `reportActions()` cluster (`report-actions.js`) renders Print / Export CSV / Export PDF / Share / Schedule as one of: **demo toast**, **confirm modal → demo toast**, or **disabled-with-reason** ("requires the backend export module — out of current scope") — reusing the existing `data-demo-action`/`data-confirm`/`data-disabled-reason`/`data-toast` hooks. **No real file generation, export, send, scheduled job, or persistence.**

**Rationale**: FR-010 + the legacy had export/print buttons Spec 008 must not fake. Mirrors the Spec 006/007 honest-action model exactly (no new hook). Export CSV/PDF and Share/Schedule genuinely need a backend → disabled-with-reason; Print → a demo toast.

**Alternatives considered**: (a) A real `window.print()` — rejected: while technically client-side, it implies a real report-print pipeline the fixtures can't honestly back; kept as a demo toast for consistency (the plan MAY allow a genuine `window.print()` only if it prints the baked page cleanly — deferred as a minor open question). (b) A fake CSV blob download — rejected: fabricates a real export, forbidden.

---

## D7 — Layout: calm STACKED baked sections (not tabs, not a BI grid)

**Decision**: `reports.js` renders, top→bottom: a **page header** + a **report action cluster** + an **Academic Operations overview** (a `summaryCards`-style band of the rolled-up counts + labeled report-signal chips) + **report-category cards** (a `cardGrid` of enriched `reportCard`s, each → a real source page + an availability chip + a fixture summary) + the **per-area summary sections** (attendance/sessions/courses-groups/teacher/student-family — each a calm card with labeled chips + source links) + a **planned/backendRequired** cards row + a **filter bar** over the category cards. Stacked baked sections, no tabs.

**Rationale**: Stacked cards are the calmest, most scannable layout and reuse the existing `report-card`/`grid-reports`/`summaryCards`/`card` CSS with near-zero new styling; a tabbed BI layout would over-engineer and risk the "fake BI dashboard" failure. The current `reports.js` already uses `grid-reports` — we extend that.

**Alternatives considered**: (a) A tabbed shell (one tab per area) — rejected: adds the tabs engine for little gain and reads more "dashboard-y"; stacked sections are calmer. (b) A single giant KPI wall — rejected: an "overloaded KPI wall" is a failure condition.

---

## D8 — Dashboard impact: NONE

**Decision**: No dashboard change. The dashboard already links to `reports.html` (the `section.reports` header) and already carries the Spec 004–007 attention chips. Spec 008 adds **no new dashboard card/chip/stat-wall**.

**Rationale**: FR-017 + the spec's default. The dashboard is already at its chip budget (outcome-follow-up + groups-attention + teachers-follow-up + students-attention). The existing Reports section header link is the entry point; adding more would inflate the dashboard.

**Alternatives considered**: (a) Add a "reports" quick-link chip — rejected: the `section.reports` header already links there; redundant. (b) A dashboard reports stat-wall — rejected: explicitly forbidden.

---

## D9 — Navigation: NONE (reports already implemented; advanced reports stay planned, shown honestly)

**Decision**: No `nav.config.js` change. `reports` stays implemented (`activeId:'reports'`); `monthlyReports`/`dataAnalysis` (planned, in the reports category) and `sessionsAnalysis` (planned, in control) stay planned; the 6 disabled finance nav items stay disabled. The **shell surfaces** `monthlyReports`/`dataAnalysis` as labeled `planned`/`backendRequired` report cards (no dead link, no route) so the page is honest about what needs a backend.

**Rationale**: `reports.html` is already a real nav link; nothing to promote. Advanced reports genuinely need a backend → honest `planned`/`backendRequired` cards, not faked working reports and not dead links.

**Alternatives considered**: (a) Promote `dataAnalysis`/`monthlyReports` to real pages — rejected: they need a real backend; faking them violates honesty. (b) Add a new reports sub-item — rejected: unnecessary; the shell is one page.

---

## D10 — i18n overlay (`ar.rep.js`/`en.rep.js`); `report-card` lightly extended; reuse components

**Decision**: Add `src/locales/ar.rep.js` + `en.rep.js` (the `rep.*` namespace), registered in `i18n.js` alongside the existing `.crs`/`.trn` overlays. Lightly extend `report-card.js` to accept an **availability chip** + a **fixture summary slot** (backward-compatible; the existing disabled-with-reason variant kept). Reuse `pageHeader`/`summaryCards`/`cardGrid`/`filterBar`/`states`/`button`/`confirmAction`/`chip`/`medallion`/`sectionHeader` + the status chips; reuse the existing `.report-card`/`.grid-reports` CSS with only minor additions.

**Rationale**: The overlay pattern keeps Spec 008 strings isolated/merge-safe; missing keys render `⟦key⟧` (smoke catches). Extending `report-card` (not replacing) preserves the dashboard's reuse of the same component. Static-first + Django-ready is a hard inherited constraint.

**Alternatives considered**: (a) A brand-new report-shell component set — rejected: over-engineered; the existing `report-card`/`grid-reports` + `summaryCards` cover it. (b) Append strings into `ar.js`/`en.js` — rejected: breaks per-spec overlay isolation.

---

## Summary of new/edited artifacts (informs data-model + tasks)

- **New components**: `report-status.js` (report-signal + report-availability maps), `report-actions.js` (`reportActions()` honest cluster).
- **Rewritten**: `pages/reports.js` (the shell), `fixtures/reports.js` (`REPORT_CATEGORIES` + the `report-summary` roll-up resolver; **finance removed**).
- **Lightly extended**: `components/report-card.js` (+availability chip +summary slot, backward-compatible).
- **New locales**: `ar.rep.js`, `en.rep.js`.
- **Edited**: `i18n.js` (register overlay), `styles/app.css` (minor report-summary/section styling), `tests/{smoke,a11y,screenshots}`.
- **Reused unchanged**: `OUTCOME_SUMMARY`, `STATUS_SUMMARY`, `SESSIONS`, `GROUP_SUMMARY`, `COURSES`, `TEACHERS_NEEDING_FOLLOWUP`, the families/students attention computation; `outcome-status`/`status-map`/`group-status`/`teacher-signals` chips; `pageHeader`/`summaryCards`/`cardGrid`/`filterBar`/`states`/`confirmAction`; `build-html.mjs`, `nav.config.js`, `dashboard.js` (**no change**).
