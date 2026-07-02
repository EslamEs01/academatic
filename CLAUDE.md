<!-- SPECKIT START -->
Active feature: **Spec 009 — Finance, Billing & Payments Shell**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/009-finance-billing-payments/plan.md`
(see also `research.md`, `data-model.md`, `quickstart.md`, and `contracts/`).

Spec 009 ADDS the academy's first admin **Finance, Billing & Payments Shell** to the implemented Spec
001–008 app (`academy-dashboard-discovery/app/`): ONE new fixture-only page pair **`finance.html`/
`finance.en.html`** that ORGANIZES the legacy system's sprawling finance module (56 pages/20 templates:
accounting dashboard w/ 10 money KPIs + 16-currency FX · invoices · monthly invoices · create-parent-invoice ·
transactions ledger · expenses+heads · teacher/staff salaries · salary-class-report · payouts+providers ·
P&L analyses · banks — the legacy planning's #1 IA complaint: "scattered across ~10 sidebar entries") into
fixture-authored **family invoices** + **recent payments** + count-only tiles-as-filters + a baked invoice
drawer + honest actions + real source links + NINE figure-free planned/backendRequired cards. **Grounding
spine**: Spec 009 IS the "future finance spec" every prior scope-guard deferred to — the nav already carries
six `disabled` wallet items (`invoices`/`monthlyInvoices`/`salaries`/`staffSalaries`/`payments`/
`classSalaryReport`) + `banks`, all `nav.reason.finance`-locked with NO reserved routes, and every existing
billing touchpoint (Spec 001 `revenue` KPI · Spec 004 family `plan`/`hourRate` stub + disabled Manage-billing +
`fam5` `fam.attn.payment` flag · Spec 005 disabled add-to-credit · settings `billingAlerts`) is already
display-only/disabled-with-reason. Nav: add exactly ONE born-and-promoted item **`finance`** (المالية/Finance,
route `finance.html`, activeId `finance`, reports category, the Spec 005 `attendance` precedent + a
`FUTURE_ROUTES` line); the six locked items + `banks` STAY locked (base `nav.reason.finance` copy updated ONE
line to stay truthful: real billing backend still required, the shell is a fixture preview). **Every number is
fixture-authored** (`fixtures/finance.js`: ~9 invoices + ~6 payments + `FINANCE_SUMMARY` as ROW COUNTS only +
`PLANNED_FINANCE` 9 cards + a THROWING build-time coherence guard: fam5 must have an overdue invoice, trial
fams `fam3`/`fam8` have none, the one cancelled invoice is `fam7`'s with no payments, payments reference only
existing non-cancelled invoices) — **NO runtime money arithmetic anywhere** (no sum/FX/total/balance/
overdue-by-date/hourRate-derivation). TWO new labeled maps (`finance-status.js`, sets distinct from all ten
existing): **invoice-status** `paid/unpaid/overdue/cancelled` (legacy-backed; NO partial/draft — verified
absent from the reference) + **payment-status** `recorded/pending/returned` (NO gateway lifecycle);
availability REUSES Spec 008 `REPORT_AVAILABILITY`/`availabilityChip` (never duplicated); chip tones only from
the styled set (`completed/amber/cancelled/neutral/upcoming/live`). Actions (`finance-actions.js`): View=drawer ·
Print=demo-toast · Record-payment/Mark-paid + Send-reminder=confirm→demo-toast (chips NEVER change; gated
disabled-with-reason on the cancelled invoice) · Export-CSV/PDF + Send-invoice + Create-invoice=
disabled-with-reason · **Upload-receipt ABSENT entirely** (the reference had no receipt concept). **Integration
honesty (body-scoped, NOT byte-identical)**: `pages/dashboard.js`/`pages/reports.js`/reports fixtures+
components/academic modules UNTOUCHED; built `dashboard.html`/`reports.html` `#page-body` regions gain ZERO
finance chrome; the shared sidebar on EVERY built page legitimately gains the one finance item (whole-file
identity impossible by construction — smoke asserts body-scoped + exactly one `a[href$="finance.html"]` + six
items still locked). Scope-guard is PATH-AWARE (two-direction grep audit): finance vocabulary ONLY in the new
finance files + 3 registration touch-points (`nav.config.js`/`build-html.mjs`/`i18n.js`) + the 1-line reason
copy; Spec 001–008 guards stay green verbatim. New overlay `ar.fin.js`/`en.fin.js` (`fin.*`, merged last;
carries `nav.finance` + `topbar.title/crumb.finance`). **REUSE, never duplicate**: `pageHeader`/`summaryCards`,
Spec 005 tiles-as-filters (`data-filter-set`, ONE filter form → invoices list only; payments = short
unfiltered recent list), `filterBar`/`noResults`, Spec 008 `reportCard`+availability chips for the 9 planned
cards, `previewTemplate`/`sheetRow` drawer, `confirmAction`/`toast`, `chip`/`button`/`medallion`. Prior plans:
`…/008-academic-reports-analytics/plan.md`, `…/007-teacher-performance-kpis/plan.md`,
`…/006-courses-groups-learning-paths/plan.md`, `…/005-attendance-session-outcomes/plan.md`,
`…/004-family-student-profiles/plan.md`, `…/003-timetable-scheduling/plan.md`,
`…/002-admin-core-operations/plan.md`, `…/001-approved-dashboard-foundation/plan.md`.

Spec 008 ENRICHES the implemented Spec 001–007 app (`academy-dashboard-discovery/app/`) by turning the
existing implemented (but placeholder) **`reports.html`** into a calm, fixture-only **Academic Reports &
Operations Shell** — one page that ORGANIZES + SUMMARIZES + LINKS the academy's existing operations
(attendance/outcomes · sessions/timetable · courses/groups · teachers · students/families) into
report-category cards + a fixture-backed operations overview + per-area summary sections + honest demo
export actions + real drill-down links. **Grounding spine** (legacy + current-app passes): `reports.html`
is ALREADY implemented (a real `reports` nav item, `activeId:'reports'`, registered in `build-html.mjs`,
rendered by `pages/reports.js`) but shows only 4 placeholder `reportCard`s with dead `route:'#'` —
including a FINANCE `revenue` card; and the legacy reports were scattered/weak/finance-mixed with NO
computed score/rank/percentile (only raw counts + a single feedback %) and thin/broken export. So Spec 008
**ENRICHES the existing page in place** (the Spec 006/007 enrich pattern) — **NO new page, NO nav
promotion, NO dashboard change** — replacing the placeholders, and **REMOVING all finance**. **Every report
number is a display-only ROLL-UP of an existing fixture summary** — `OUTCOME_SUMMARY` (Spec 005),
`STATUS_SUMMARY`/`SESSIONS.total` (Spec 001/003), `GROUP_SUMMARY` + active-courses (Spec 006),
`TEACHERS_NEEDING_FOLLOWUP` + `OUTCOME_SUMMARY` absences (Spec 007), and the Spec 004 family/student
attention computation (reused verbatim from `dashboard.js` `peopleSignal()`) — **NO fabricated metric, NO
computed score/rank/percentile/chart/BI, NO finance figure**. Surfaces: rewrite `pages/reports.js` (the
shell) + `fixtures/reports.js` (a `report-summary` roll-up resolver + honest `REPORT_CATEGORIES`, finance
removed); lightly EXTEND `components/report-card.js` (+availability chip +summary slot, backward-compatible);
add `report-status.js` (TWO new labeled maps: **report-signal** healthy/needsFollowUp/attentionRisk +
**report-availability** available/demoOnly/planned/backendRequired — distinct from existing maps, never
numeric/color-only) + `report-actions.js` (`reportActions()`: Print=demo-toast · Export-CSV/PDF/Share=
disabled-with-reason · Schedule=confirm→demo-toast — NO real export/send/schedule/persist); new overlay
`ar.rep.js`/`en.rep.js` (`rep.*`). **REUSE, never duplicate**: Spec 005 `outcome-status` chips (teacherAbsent
vs studentAbsent stay two DISTINCT labeled facts), Spec 001/003 session status-map, Spec 006 `group-status`,
Spec 007 teacher signals; `pageHeader`/`summaryCards`/`cardGrid`/`filterBar`/`states`/`confirmAction`.
Advanced reports (`monthlyReports`/`dataAnalysis`/`sessionsAnalysis`) stay PLANNED, surfaced as honest
planned/backendRequired cards (no dead links). NO `build-html.mjs`/`nav.config.js`/`dashboard.js` change.
Prior plans: `…/007-teacher-performance-kpis/plan.md`, `…/006-courses-groups-learning-paths/plan.md`,
`…/005-attendance-session-outcomes/plan.md`, `…/004-family-student-profiles/plan.md`,
`…/003-timetable-scheduling/plan.md`, `…/002-admin-core-operations/plan.md`,
`…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Spec 001 + 002 + 003 + 004 + 005 + 006 + 007 + 008 + 009): continue the approved design (Spec 001 is
the visual target); **static HTML-first** — pages pre-rendered to complete `public/*.html`, NO whole-page
`<div id="app">` mount, **all teacher cards + KPI tiles + comparison rows + profile tabs +
`<template data-preview>` drawers are baked at build time** (runtime JS builds no page DOM), runtime JS
enhances existing markup only via `data-*` hooks (switch profile tabs, filter pre-rendered cards/rows,
open drawer/confirm, toasts/disabled-reason, fake-submit demo — NO new hook); per-language pre-rendered
pages; relative asset paths; GitHub-Pages compatible; Django-template-ready (`{% for teacher %}`, tabs →
`{% if %}`, canonical drawer → ONE partial, status/signal maps → template tags); Arabic RTL first +
English LTR; Light/Dark/System; labeled teacher-status/workload/follow-up status chips (never
numeric/color-only); native JS; no CDN/TypeScript/SPA/chart libs/table libs/form libs/calendar libs;
fixtures only — no real API/auth/permissions/CRUD/persistence, **no teacher-management/assignment/
workload-calc/performance-scoring/ranking/salary-payroll/attendance/scheduling/notification engine**, no
real status mutation; **NO computed teacher score/rank/leaderboard/percentile/chart anywhere; ALL
salary/payroll/compensation/payout math OUT of scope**; **no student/family/teacher dashboards or
portals** (future-role, never rendered; `teacher.html` is an ADMIN profile, not a portal); the Teacher
Performance board is now built (fixture-only) but addTeacher/teacherCategories/sessionsKpi/monthlyPerf
stay planned; no copied legacy assets/classes/logo/palette/wording, no legacy numeric statuses;
screenshot-based visual acceptance. **Spec 008 adds:** the enriched `reports.html` shell is fixtures-only —
**no reporting/analytics/aggregation/export/PDF/CSV/scheduled-report/BI engine, no chart/graph/canvas, no
computed report score/rank/leaderboard/percentile/trend, no finance/salary/payroll/invoice/accounting/
revenue report (the legacy `revenue` card is removed)**; every report number is a display-only ROLL-UP of an
existing fixture summary (matches the dashboard chips); report actions are demo/confirm/disabled-with-reason
only (NO real export/send/schedule/persist); reports drill-down only to implemented pages (advanced reports
stay planned/backendRequired, never dead links); NEW labeled report-signal + report-availability maps (never
numeric/color-only); reuse Spec 005 outcome-status (teacherAbsent≠studentAbsent), Spec 003 session map,
Spec 006 group-status, Spec 007 teacher signals; NO new page/nav/dashboard change — **the reports body stays
finance-free FOREVER (Spec 009's shell is a separate page)**. **Spec 009 adds:** the `finance.html` shell is
fixtures-only — **no real invoice/payment/accounting/payroll engine, no payment gateway, no real PDF/CSV
export, no receipt upload (absent entirely), no send/reminder job, no mark-paid mutation (chips never change),
no persistence, no runtime money arithmetic (no sum/FX/total/balance/overdue-by-date), no chart, no revenue
analytics/cashflow, no teacher/staff pay figure anywhere**; every invoice/payment number is a fixture-authored
literal, summary tiles are ROW COUNTS only, coherence is guard-enforced at build; NEW labeled invoice-status
(`paid/unpaid/overdue/cancelled` — NO partial/draft) + payment-status (`recorded/pending/returned` — NO
gateway states) maps; availability REUSED from Spec 008 (never duplicated); exactly ONE new nav item
(`finance`) — the six disabled wallet items + `banks` stay locked with truthful reason copy; payroll/
accounting/expenses/banks/FX appear ONLY as figure-free planned/backendRequired cards; dashboard/reports page
modules untouched and their built BODIES finance-free (body-scoped invariant — the shared sidebar's single
new finance item is the only permitted built-file diff); finance vocabulary contained path-aware to the new
finance files + 3 registration touch-points; Spec 001–008 scope-guards stay green.
<!-- SPECKIT END -->
