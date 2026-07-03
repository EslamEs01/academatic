<!-- SPECKIT START -->
Active feature: **Spec 014 — Family / Guardian Dashboard**
(branch `feature/012-role-portal-foundation`; Spec 013 = commit `86729a9`, 49 built pages).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/014-family-guardian-dashboard/plan.md`
(see also `research.md` (D1–D14), `data-model.md`, `quickstart.md`, and `contracts/` — 16 contracts).

Spec 014 upgrades the Spec-012 family foundation (`family-portal(.en).html`, persona **fam1** — guardian +
5 children st1/st6/st11/st12/st13) into the full ONE-PAGE guardian control center — NO new pages, NO new
source files by default. **Composition (12 sections, research D1, binding)**: calm hero (no date/notification
count; plain-text hint) · **my children** (ALL FIVE inline — D2: NO switcher of any kind; legacy had none;
kidsHint copy resolves to post-014 truth) · today's sessions (child-associated via authored sessionId→child
mapping; no join/cancel) · **signals band** (D9: authored trio ١٢/٣/١ + REAL outcome refs — out15 st11
studentAbsent+followUp · out12 st13 trial-cancel — as gentle labeled chips + reassurance line) · teacher
notes (3, child-associated) · **recent sessions** (guardian F6 mirror — D7: child-first cards, REAL out1 +
REAL out15 + 1 authored; summary+homework lines; «السجل الكامل» planned) · **plans & subscriptions** (per-child
plan labels «الخطة المتقدمة» + status chips — ZERO amounts) · **billing status** (D3: ONE settled-status card,
ZERO currency figures, NO pay-now; «الفواتير والدفع» backendRequired gate) · **requests hub** (ONE section,
four preview cards with INLINE availability chips — cancel/reschedule + honest no-replacement caution
(backendRequired) · feedback-about-teacher rubric question-lines, no rating visual (backendRequired) ·
meetings = the truthful `.pt-empty` demo site D10 (planned request chip) · request-trial new-vs-existing
child tiles (backendRequired) — NO form controls anywhere) · family materials (3 display-only + «تحميل
الملفات» backendRequired) · account slice (contact/joined/children + backendRequired edit note) · closing
note (Spec-016 pointer). **THE ZERO-PAY HARD LINE**: `hourRate`/`fam.plan.perHour` («ريال/ساعة») NEVER
referenced; smoke asserts currency/pay regex (`ريال|ر.س|SAR|USD|$€£|pay now|ادفع|سداد`) = 0 on the built
family body. **Change surface (scope-guard G1)**: `pages/family-portal.js` · `fixtures/portal.js`
(FAMILY_PREVIEW + PORTAL_PLANNED.family ONLY — re-registered to {billingGate:backendRequired,
matDownload:backendRequired, fullHistory:planned, meetingRequest:planned}, count 3→4, smoke asserts 2 amber +
2 neutral chips) · `ar/en.prt.js` (`prt.fam.*`/`data.prtFam*` ONLY — shared prt.shell/portal/role/hub +
sibling prt.stu.*/prt.tch.* + data.prtStu*/prtNote* FROZEN) · small namespaced CSS (013 primitives .pt-empty/
.pt-tag/.pt-stat/.pt-prof-row REUSED read-only) · tests (smoke FAMILY-branch re-scope D11: 5-children assert,
zero-pay regex, .pt-empty≥1, .pt-section≥10, bodyAnchors===0, 390px probe; **student branch + admin/teacher/
hub asserts BYTE-VERBATIM**) · a11y/capture additive (6 element-scoped area frames via the existing s.area
mechanism) · docs + coverage **§8 delivery notes ONLY** (F1–F17 dispositions; real submissions → planned-016).
**Acceptance ceiling: 47/49 built files hash-identical to HEAD** — only the family pair changes. 14+ frames
(4 experience + 6 area + 4 unchanged proofs). MVP = fixtures/locales → Band A (hero/children/today/signals) →
family smoke re-scope green (D14).

Spec 013 (commit `86729a9`) delivered the STUDENT dashboard: 13 sections (hero/today/next/week agenda
(F5, SAT-first + Friday `.pt-empty` rest-day) /courses/homework/materials (graduated planned cards →
backendRequired gates) /progress+trio/achievements/«نجوم مجموعتي» celebration (unordered, no ranking)/
recent-sessions (F6: real out1 anchor)/profile/closing note); zero tables, zero body anchors;
PORTAL_PLANNED.student = {hwSubmit/matDownload backendRequired, fullHistory planned}; smoke student branch
asserts gaugeCount≥2 · sections≥10 · .pt-empty≥1 · bodyAnchors===0 · chip-tone graduation (2 amber + 1
neutral) · 390px probe; coverage §7 delivery notes. Spec 012 (`5bcf490`): the portal layer — shell
(`portal-shell.js`, rail-less, data-role accents) · hub `portals.html` (only documented entry) · three
foundation pages · `ar/en.prt.js` overlay merged last · `.portal-shell` CSS namespace ·
`legacy-role-capability-coverage.md` (39 legacy pages, seven-way scheme; pay surfaces backendRequired NEVER
previewed; no legacy student login/gamification — split + achievements are recorded improvements) · smoke
portal-absence re-scoped to the 20 admin bases + PORTAL_PAGES block; 40 admin files byte-identical. Spec 011
(`e7ee011`): zero `href="#"` STANDING + localized badge. Spec 010 (`0ee1965`): coverage matrix, nav IA,
filter-visibility fix, chip-tone guard. Prior plans: `…/013-student-dashboard/plan.md`,
`…/012-role-portal-foundation/plan.md`, `…/011-final-qa-demo-readiness/plan.md`,
`…/010-capability-coverage-ia-polish/plan.md`, `…/009-finance-billing-payments/plan.md`,
`…/008-academic-reports-analytics/plan.md`, `…/007-teacher-performance-kpis/plan.md`,
`…/006-courses-groups-learning-paths/plan.md`, `…/005-attendance-session-outcomes/plan.md`,
`…/004-family-student-profiles/plan.md`, `…/003-timetable-scheduling/plan.md`,
`…/002-admin-core-operations/plan.md`, `…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Specs 001–013, all carried + binding): the ADMIN console continues the approved design
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
wording/status codes; screenshot-based visual acceptance. **Portal rules (Specs 012/013, standing)**: role
portals are a SEPARATE surface — portal items FOREVER absent from the admin console; the portal layer never
looks like the admin console or the legacy portals; personas = existing fixtures; every portal number
authored; every action one of the four honest classes (real link · demo toast · labeled disabled/planned ·
display-only); planned cards labeled, figure-free, never anchors; portal page bodies contribute ZERO anchors;
the demo hub is the only entry. **Spec 014 adds**: the family page is the ONLY portal surface that may
change; sibling portals + hub + admin = byte-identical acceptance; shared + sibling locale keys frozen;
the family page carries ZERO currency/pay figures (machine-asserted) and ZERO form controls; requests are
previews with gated submits; deep teacher dashboard = Spec 015; operations/communications shell = Spec 016;
admin missing modules = Spec 017; final full-product QA = Spec 018.
<!-- SPECKIT END -->
