<!-- SPECKIT START -->
Active feature: **Spec 010 — Full Academy Capability Coverage, Navigation IA & Admin Experience Polish**
(branch `feature/001-approved-dashboard-design`).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/010-capability-coverage-ia-polish/plan.md`
(see also `research.md` (D1–D12), `data-model.md`, `quickstart.md`, and `contracts/` — 14 contracts).

Spec 010 is the BROWNFIELD coverage/IA/polish pass over the fully implemented Spec 001–009 app
(`academy-dashboard-discovery/app/`, 20 page pairs + index, nav = 6 rail categories / 41 items:
14 implemented · 20 planned · 7 disabled-finance). **ZERO new pages, zero new source files, zero new
hooks/libraries/fixtures.** Deliverables: (1) **`legacy-capability-coverage.md`** — the coverage matrix
classifying every legacy capability (339 pages → 178 templates → 19 modules → 66 modals) under the NINE-way
scheme (implementedNow/betterName/moved/merged/planned/backendRequired/futureRole/intentionallyExcluded/
missingLogged) with mandatory explicit rows for the five audit-found gaps (forms builder · family
feedback-meetings · request-schedule workflow · per-session class feedback · Zoom surfaces) + ten more named
capabilities + broken/thin legacy items, ending in a product-owner sign-off checklist; (2) **nav IA
corrections** (`nav.config.js` + base locales ONLY): reports category gains a `sections:[{titleKey:
'cat.finance', items:[finance first, then invoices/monthlyInvoices/salaries/staffSalaries/payments/
classSalaryReport/banks]}]` sub-section (the EXISTING Spec 007 `cat.teachersPerf` mechanism — `catItems()`/
`categoryOf()` already traverse sections; NO new nav mechanics, NO 7th rail category), `banks` MOVES from
admin (leaving its 5 planned items) — move never duplicate (locked-finance count stays exactly 7, sidewide
finance links stay exactly 1), `cat.families` relabels to «العائلات والطلاب»/"Families & Students",
`FUTURE_ROUTES` drops its four stale implemented entries (attendance/groups/teacherKpi/finance), the sessions
badge literal `24` becomes `badge: SESSIONS.total` (authored fixture total — the number was never false, just
duplicated); (3) the **app-wide `[hidden]` filter-visibility fix**: ONE late rule `[data-row][hidden]
{display:none !important}` in `app.css` (scoped to the closed filter hook; the only sanctioned !important;
existing narrow rules stay) + smoke computed-visibility assertions for EVERY page with `data-filter-form`/
`data-filter-set` (attendance/sessions/schedule/students/teachers/courses/groups/families/teacher-performance/
finance) — attendance is the confirmed-broken proof case (10 attr-hidden/15 visible pre-fix); (4) exactly
**ONE new cross-page link**: family `billingPanel()` → `finance.html` (key `fam.bill.viewInvoices` in the fam
overlay, honest "fixture preview" wording) — the ONLY guarded-file edit, sanctioned by an ADDITIVE ATTRIBUTED
amendment to Spec 009's scope-guard G8a exclusion list + G8b#5 (never widen patterns, never unlist files);
(5) a **chip-tone build guard** in `build-html.mjs` (post-render scan: every `chip tone-X` ∈
live/upcoming/completed/cancelled/amber/neutral, else THROW — closes the Spec 008 `coral` unstyled-pill
fragility); (6) **`page-coverage-audit.md`** — 20 pages × 10 dimensions with fix-now items (copy/empty-state/
token-level ONLY — no new sections/tabs/layout) executed in-spec; (7) link-integrity crawl (zero `href="#"`,
zero dead targets) + planned/disabled truthfulness sweep; (8) 13 screenshot frames incl. all six categories
expanded, the finance sub-section AR dark + EN, mobile drawer, family Plan&Billing link, and the attendance
filter-narrowing PROOF frame. **Untouchable guarded sets (git diff MUST be empty)**: `pages/dashboard.js` +
dashboard fixtures (revenue KPI stays exactly as-is — approved-design artifact, matrix-documented),
`pages/reports.js` + reports fixtures/components, ALL six Spec 009 finance files, `enhance.js`,
`package.json`, all other fixtures (`sessions.js` is read, not modified). Dashboard/reports/finance BODIES
content-identical (sidebar-only ripple across all 40 rebuilt pages — Spec 009 body-scoped precedent); Spec
008+009 guards re-run green as the acceptance floor. MVP = matrix + truthful IA (phases 1–4 of research D12).

Spec 009 (implemented, commit `7a2ee50`) ADDED the fixture-only **Finance, Billing & Payments Shell**
`finance.html`/`finance.en.html`: ~9 authored invoices + ~6 payments, `FINANCE_SUMMARY` ROW COUNTS only +
throwing coherence guard (fam5 overdue · trial fams none · fam7's single cancelled invoice unpaid), labeled
maps invoice-status `paid/unpaid/overdue/cancelled` + payment-status `recorded/pending/returned` (NO
partial/draft/gateway states), availability chips REUSED from Spec 008, count-only tiles-as-filters, baked
drawer (NO total line), honest actions (View=drawer · Print=demo · Record-payment/Mark-paid/Send-reminder=
confirm→demo, chips NEVER mutate, gated on the cancelled invoice · Create/CSV/PDF/Send=disabled-with-reason ·
receipt upload ABSENT), NINE figure-free planned/backendRequired cards 1:1 with the locked nav items, ONE
born-and-promoted nav item `finance` (reports category) while six wallet items + `banks` stay
`nav.reason.finance`-locked, body-scoped dashboard/reports invariant + path-aware two-direction G8a
vocabulary audit. Its plan: `…/009-finance-billing-payments/plan.md`. Prior plans:
`…/008-academic-reports-analytics/plan.md`, `…/007-teacher-performance-kpis/plan.md`,
`…/006-courses-groups-learning-paths/plan.md`, `…/005-attendance-session-outcomes/plan.md`,
`…/004-family-student-profiles/plan.md`, `…/003-timetable-scheduling/plan.md`,
`…/002-admin-core-operations/plan.md`, `…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Specs 001–009, all carried + binding): continue the approved design (Spec 001 is the visual
target; the six-category rail is part of it); **static HTML-first** — pages pre-rendered to complete
`public/*.html`, NO whole-page `<div id="app">` mount, all cards/tiles/rows/tabs/drawers baked at build time
(runtime JS builds no page DOM), runtime JS enhances existing markup only via the CLOSED `data-*` hook set —
NO new hook; per-language pre-rendered pages; relative asset paths; GitHub-Pages compatible;
Django-template-ready; Arabic RTL first + English LTR; Light/Dark/System; ALL status/signal chips labeled
icon+text (never numeric/color-only); native JS; no CDN/TypeScript/SPA/chart/table/form/calendar libs;
fixtures only — no real API/auth/permissions/CRUD/persistence; NO engine of any kind (attendance, scheduling,
enrollment, grading, teacher-scoring/ranking, notification, chat, tasks, requests, scheduled-actions,
holidays, time-zone, reporting/analytics/BI/export, invoice/payment/accounting/payroll/gateway); NO computed
score/rank/leaderboard/percentile/chart anywhere; ALL salary/payroll/compensation/payout math OUT of scope;
no student/family/teacher dashboards or portals (future-role, never rendered); reports body finance-free
FOREVER; finance body: no money arithmetic, no receipt concept, no pay figures, chips never mutate; no copied
legacy assets/classes/logo/palette/wording, no legacy numeric statuses; screenshot-based visual acceptance.
**Spec 010 adds:** audit-and-polish ONLY — zero new pages/files/hooks/tones/tokens/fixture entities; the
coverage matrix + page audit are spec-folder DOCUMENTATION (never rendered app pages); nav changes limited to
the finance sub-section grouping, the banks move, two label keys, FUTURE_ROUTES cleanup, and the derived
badge; the `[data-row][hidden]` rule is the only new CSS behavior and the only `!important`; exactly ONE new
link app-wide (family→finance, honest fixture-preview label); prior scope-guards are amended ONLY additively
with attribution (exact tokens, never widened patterns) and re-run green; dashboard/reports/finance bodies
stay content-identical; comment discipline — no guarded tokens (score/rank/chart/invoice/receipt/…) in
comments of files other specs audit.
<!-- SPECKIT END -->
