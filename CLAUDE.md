<!-- SPECKIT START -->
Active feature: **Spec 013 — Student Dashboard**
(branch `feature/012-role-portal-foundation`; Spec 012 = commit `5bcf490`, 49 built pages).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/013-student-dashboard/plan.md`
(see also `research.md` (D1–D12), `data-model.md`, `quickstart.md`, and `contracts/` — 14 contracts).

Spec 013 upgrades the Spec-012 student foundation (`student-portal(.en).html`, persona **st1**) into the full
ONE-PAGE student learning home — NO new pages, NO new source files by default. **Composition (13 sections,
research D1, binding)**: upgraded hero (no date/notification count; plain-text next-action hint) · today's
learning · next-session (join note = backendRequired vocabulary, NEVER join-styled) · **week-at-a-glance**
(delivers coverage row F5: SAT-first stacked day groups from `SCHEDULE_WEEK` sara-filtered; «اليوم» marker;
**Friday renders the `.pt-empty` rest-day state** — the truthful empty-state demo, D5) · my courses
(display-only, ZERO links — D7: no admin page is student-appropriate) · **homework** + **materials** sections
(planned cards GRADUATE to 3+3 authored display-only items; submit/download become in-section backendRequired
mini-cards — D2) · progress (gauge 78 + per-course bars + authored trio attended ٩ · upcoming ٢ · **streak ٥**
— D8: streak replaces follow-up, motivational register) · achievements (net-new framing kept) · **«نجوم
مجموعتي» celebration** (the leaderboard resolution — D3: unordered, authored/demo-labeled, group wins, zero
ranks/points/peer comparisons) · **recent-sessions feedback** (delivers F6: 3 cards = real `out1` outcome row
(st1·math·sara·attended·`data.att.fb.good`) + 2 authored; summary + homework-note lines; display-only
attachment; «السجل الكامل» planned mini-card) · profile slice (backendRequired editing note) · closing note
(Spec-016 pointer). **Change surface (scope-guard G1, exhaustive)**: `pages/student-portal.js` ·
`fixtures/portal.js` (STUDENT_PREVIEW + PORTAL_PLANNED.student ONLY — re-registered to
{hwSubmit:backendRequired, matDownload:backendRequired, fullHistory:planned}, count stays 3) · `ar/en.prt.js`
(`prt.stu.*`/`data.prtStu*` ONLY — **shared prt.shell/portal/role/hub + prt.fam.* + prt.tch.* keys FROZEN**) ·
namespaced CSS additions (`.pt-empty`, `.pt-day`, …) · tests (smoke student-branch re-scope D9: planned
semantics, `.pt-empty`≥1, `.pt-section`≥10, gaugeCount≥2, 390px scrollWidth probe; admin/family/teacher/hub
asserts BYTE-VERBATIM) · a11y/capture additive (4 element-scoped area frames) · docs + coverage delivery
notes (F5/F6/F12 + §4 items ONLY). **Acceptance ceiling: 47/49 built files hash-identical to HEAD** (40 admin
+ family/teacher/hub pairs + index) — only the student pair changes. 12+ screenshot frames (4 experience + 4
area + 4 unchanged proofs). MVP = fixtures/locales → Band A (hero/today/next/week + empty state) → smoke
re-scope green (D12).

Spec 012 (commit `5bcf490`) shipped the role-portal layer: shared warm portal shell (`portal-shell.js`,
rail-less header, role accents via `data-role`, existing theme/lang hooks) · demo hub `portals.html` (3 role
cards + labeled admin return — the ONLY documented entry) · three foundation pages bound to existing-fixture
personas (st1 / fam1 5-children / sara) · `ar.prt.js`/`en.prt.js` overlay merged last · `.portal-shell` CSS
namespace · `legacy-role-capability-coverage.md` (ALL 39 legacy portal pages, SEVEN-way scheme, itemized
013/014/015 boundaries; pay surfaces backendRequired NEVER previewed; legacy had NO student login and NO
gamification — the split + achievements are recorded improvements) · two sanctioned reconciliations
(FUTURE_ROLE wording; smoke portal-absence re-scoped to the 20 admin bases + PORTAL_PAGES block). All 40
admin files rebuilt byte-identical. Spec 011 (`e7ee011`): zero `href="#"` sitewide STANDING (smoke
`deadHash===0`) + localized sessions badge. Spec 010 (`0ee1965`): coverage matrix, nav IA corrections,
filter-visibility fix, chip-tone guard. Prior plans: `…/012-role-portal-foundation/plan.md`,
`…/011-final-qa-demo-readiness/plan.md`, `…/010-capability-coverage-ia-polish/plan.md`,
`…/009-finance-billing-payments/plan.md`, `…/008-academic-reports-analytics/plan.md`,
`…/007-teacher-performance-kpis/plan.md`, `…/006-courses-groups-learning-paths/plan.md`,
`…/005-attendance-session-outcomes/plan.md`, `…/004-family-student-profiles/plan.md`,
`…/003-timetable-scheduling/plan.md`, `…/002-admin-core-operations/plan.md`,
`…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Specs 001–012, all carried + binding): the ADMIN console continues the approved design
(Spec 001 visual target; six-category rail); **static HTML-first** — complete pre-rendered `public/*.html`
per language, NO whole-page `#app`, all content baked at build (runtime JS builds no page DOM), enhancement
only via the CLOSED `data-*` hook set — NO new hook; relative paths; GitHub-Pages compatible;
Django-template-ready; Arabic RTL first + English LTR; Light/Dark/System; ALL status/signal chips labeled
icon+text; native JS; no CDN/TypeScript/SPA/chart/table/form/calendar libs; fixtures only — no real
API/auth/permissions/CRUD/persistence; NO engine of any kind (attendance/scheduling/enrollment/grading/
teacher-scoring/notification/chat/tasks/requests/scheduled-actions/holidays/time-zone/reporting/BI/export/
invoice/payment/accounting/payroll/gateway); NO computed score/rank/leaderboard/percentile/chart; ALL
salary/payroll/compensation/payout math OUT of scope — zero pay figures anywhere; reports body finance-free
FOREVER; finance body Spec 009-invariant; zero `href="#"` sitewide; no copied legacy assets/classes/palette/
wording/status codes; screenshot-based visual acceptance. **Portal rules (Spec 012, standing)**: role portals
are a SEPARATE surface — portal items FOREVER absent from the admin console (nav + bodies; admin-scoped smoke
assertion); the portal layer never looks like the admin console or the legacy portals; personas = existing
fixtures; every portal number authored; every action one of the four honest classes (real link · demo toast ·
labeled disabled/planned · display-only); planned cards labeled, figure-free, never anchors; the demo hub is
the only entry. **Spec 013 adds**: the student page is the ONLY portal surface that may change; sibling
portals + hub + admin = byte-identical acceptance; shared locale keys frozen; celebration ≠ ranking (unordered,
authored); deep family/teacher dashboards stay Specs 014/015; communications shell = Spec 016; final portals
QA = Spec 017.
<!-- SPECKIT END -->
