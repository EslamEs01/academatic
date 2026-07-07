# Current-vs-Legacy Map — Spec 023 (Full Legacy Coverage Audit 000–022)

- **Title**: Current-vs-Legacy Map — the REVERSE direction of the coverage matrix: one row per
  CURRENT page pair (38 page items + index = 39 rows), each mapped to its legacy grounding.
- **Date**: 2026-07-06 (resolved from `agent-findings/00-main-session-grounding.md`)
- **Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Specs 020/021/022
  committed; **77 public HTML files** in `academy-dashboard-discovery/app/public/`
  (38 page pairs × 2 languages + `index.html`), backed by 38 modules in
  `academy-dashboard-discovery/app/src/js/pages/` and a 38-entry `PAGES` registry in
  `academy-dashboard-discovery/app/scripts/build-html.mjs`.
- **Inputs used** (findings files, exact paths under
  `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/`):
  - `09-drift-extra-pages.md` — the primary reverse-grounding table (rows X-01…X-39)
  - `04-current-app-inventory.md` — the 77-file / 38-module inventory, ROLE_NAV registries, hub shape
  - `05-admin-coverage.md` — admin groundings, renames/splits, zero-pay boundary on admin finance
  - `06-family-child-student-coverage.md` — family + child-view groundings, role-model checks
  - `07-teacher-coverage.md` — teacher groundings, pay-free verification, teacher-performance nuance
  - `00-main-session-grounding.md` — confirmed finding **F-00-1** (leftover «لوحة الطالب — النسخة
    الأولى» noteT/noteD on 6 of 7 child-view pages, exact file:line evidence)
- **Conflict resolution performed by this writer**: Agent 09's rows X-24…X-30 carried no mention of
  the residual pre-021 note wording; F-00-1 (`agent-findings/00-main-session-grounding.md` lines
  71–92) and Agent 06 Risk 1 (`agent-findings/06-family-child-student-coverage.md` lines 173–179)
  both confirm it with exact built-HTML line numbers. I opened the grounding file myself and folded
  F-00-1 into the six affected child-view rows below (student-schedule is the one internal WITHOUT
  the note — grep-confirmed in F-00-1). No other cross-findings conflict was found.

**Path shorthands** (every shorthand expands under repo root
`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/`):
- `pages/` = `app/src/js/pages/` · `PUB/` = `app/public/` · `fixtures/` = `app/src/js/fixtures/`
- `PI` = `output/combined/page-inventory.md` (line no.) · `RPI` = `frontend-planning-deep/08-role-page-inventory-v2.md`
- `shots/` = `output/roles/` · `LEGF/` = `output/roles/family/pages/` · `LEGT/` = `output/roles/teacher/pages/`
- `F05/F06/F07/F09/F00` = the respective findings files under `specs/023-full-legacy-coverage-audit/agent-findings/`

**Relationship vocabulary** (fixed): direct rebuild · improved · merged-from · renamed-from ·
reclassified-from · net-new. **Quality vocabulary** = Agent 09's set (legacy-grounded ·
legacy-grounded-improved · useful-net-new · useful-but-needs-better-grounding).

Binding-law reminder applied to every row: legacy is a CAPABILITY checklist, never a pixel-clone
target; pay/salary exclusions, chart/score-engine exclusions, and the AR/EN-only locale scope are
INTENTIONAL law-driven exclusions, never gaps.

## Reverse map — one row per current page pair (+ index)

### Infrastructure + hub

| Current page | Current evidence | Legacy source(s) | Legacy evidence path | Relationship | Quality classification | Notes |
|---|---|---|---|---|---|---|
| index.html | `PUB/index.html` (3-line meta-refresh → dashboard.html); F09 X-01 | None — legacy root `/main/index.html` was an HTTP 404 | PI L318; RPI L267; F09 X-01 | net-new | useful-net-new | GitHub-Pages hosting infrastructure; honest single redirect. The legacy 404 artifact is intentionally unreproduced. |
| portals(.en).html (hub) | `pages/portals.js` (`ROLES` = exactly 2 role cards, `childViewCard()`); `PUB/portals.html` lines 262–296; smoke pins `app/tests/smoke/run.cjs` lines 1099–1106; F04 hub section; F09 X-21 | No single legacy route — grounded in the FACT of three legacy logins (Admin · Teacher · Family at `/student/*`) with no auth possible in a static build | PI role sections L9/L314/L345; `output/roles/family/role-map.md` lines 78–82 (login/logout skipped); F06 A1 login row; F09 X-21 | net-new | useful-net-new | **MUST STAY** — the honest replacement for three login screens (a fake login would violate the no-fake-actions law). Encodes Spec 021 DEC-001/002/004 exactly: 2 primary role cards (family, teacher) + admin console + 1 demoted child-view preview, machine-pinned. |

### Admin console (20 page pairs)

| Current page | Current evidence | Legacy source(s) | Legacy evidence path | Relationship | Quality classification | Notes |
|---|---|---|---|---|---|---|
| dashboard(.en).html | `pages/dashboard.js`; F09 X-02 | Admin home `/management/home` (KPI wall + Classes-Of-today board, 11 variants) | PI L119; `shots/admin/screenshots/management-home-full.png`; F05 rows 1–3 | improved | legacy-grounded-improved | Status lenses became tiles-as-filters; the legacy «(3.00 Fine)» pay fragment on the home board is a law-driven exclusion (F05 §d). |
| students(.en).html | `pages/students.js`; F09 X-03 | `/management/student` (+6 status variants + softdelete) | PI L220; RPI L180; F05 roster row | direct rebuild | legacy-grounded | Roster ↔ roster; family-relationship chip is additive enrich (legacy lacked it). |
| student(.en).html (ADMIN profile) | `pages/student.js`; F09 X-04 | `/management/student/1` — legacy's richest page (99 buttons, 20+ modals) | PI L221; RPI L181; F05 student-detail row | improved | legacy-grounded-improved | Modal stack → baked tabs + drawers; writes = honest gates. Distinct from `student-portal.html` (F04 naming-collision warning). |
| families(.en).html | `pages/families.js`; F09 X-05 | `/management/families` (+7 status variants) | PI L88; RPI L100; F05 families row | direct rebuild | legacy-grounded | Status variants = facets. The payment-method lens moved to finance (reclassified there — F05 «renamed/reclassified»). |
| family(.en).html (ADMIN profile) | `pages/family.js`; F09 X-06 | `/management/families/1` — family hub (8 tabs) | PI L89; F05 family-hub row | improved | legacy-grounded-improved | Billing tab figure-safe by law; deepens via Spec 030 links. |
| add-family(.en).html | `pages/add-family.js`; F09 X-07 | `/management/families/create` (1 form, 37 fields) | PI L93; RPI L103; F05 create/edit row | improved | legacy-grounded-improved | The 37-field legacy form rebuilt as a stepped wizard — UX improvement over a REAL route, not drift; save gated. |
| teachers(.en).html | `pages/teachers.js`; F09 X-08 | `/management/teachers` (+scope ×5 +sort ×14 ≈ 60 captured pages) | PI L242; RPI L208; F05 teachers-roster row | direct rebuild | legacy-grounded-improved | 60 sort/scope captures fold into ONE roster (variant-folding rule, F05 risk 3); no pay figures by law. |
| teacher(.en).html (ADMIN profile) | `pages/teacher.js` (module header: pay tabs never rendered); F09 X-09 | `/management/teachers/1` (+edit) — teacher hub incl. comp/salary tabs | PI L258; RPI L209; F05 teacher-hub row | improved | legacy-grounded-improved | The legacy compensations sub-tree (PI L259–265) is intentionally excluded (zero-pay law → Spec 030 zero-figure GATE shells); the rest of the capability present as 8 tabs. |
| courses(.en).html | `pages/courses.js`; F09 X-10 | `/management/courses` (+status/type variants, 14 var) | PI L57; RPI L48; F05 courses row | direct rebuild | legacy-grounded | «no-invoices» lens re-homed on finance.html status filters. |
| course(.en).html | `pages/course.js`; F09 X-11 | `/management/courses/1` (13 modals, 85 fields) | PI L71; RPI L49; F05 course-detail row | improved | legacy-grounded-improved | Tabbed profile; Learning-Path deepening owned by 027. |
| groups(.en).html | `pages/groups.js`; F09 X-12 | `/management/group/index` | PI L116; RPI L28; F05 groups row | direct rebuild | legacy-grounded | Create (45 fields) = gated. |
| group(.en).html | `pages/group.js`; F09 X-13 | `/management/courseclasses/{id}` ×6 (session-lifecycle detail, 14 tabs) | PI L50–55; RPI L61; F05 courseclasses row | renamed-from | legacy-grounded-improved | Legacy «courseclasses» renamed into the group profile; the giant lifecycle page's remaining slices split into sessions/attendance (F05 «split differently»). |
| sessions(.en).html | `pages/sessions.js`; F09 X-14 | Admin home classes board + `/management/session-class-room/{enc}/{id}` + courseclasses lifecycle slices | `shots/admin/screenshots/management-home-full.png`; PI L188; F05 courseclasses row | merged-from | legacy-grounded-improved | List+agenda tabs + shared outcome/appointment drawers; the fake live classroom is intentionally excluded (G13, backend engine). |
| schedule(.en).html | `pages/schedule.js`; F09 X-15 | `/management/all/teachers/timetable` + `/management/search-schedule` | PI L32, L187; RPI L198, L228; `shots/admin/screenshots/management-all-teachers-timetable-full.png`; F05 timetable row | merged-from | legacy-grounded-improved | Hand-rolled weekly grid + agenda (no calendar lib by law); the legacy «Active & unpaid» tint is a pay-signal leak, intentionally dropped (F05 risk 5). Also renamed-from the «Teachers Schedule» sidebar item (F05 renamed list). |
| attendance(.en).html | `pages/attendance.js`; F09 X-16 | `/management/accounting/transaction/session?status=attend/student-absent/teacher-absent` (3 lenses) + `/teacher/update-result` outcome taxonomy | PI L17–19, L343; `shots/admin/screenshots/management-accounting-transaction-session-status-attend-full.png`; F05 §b «overbuilt» | merged-from | legacy-grounded-improved | Legacy had NO attendance page (only modals + finance-side lenses) — the outcome board is net-new VALUE over legacy-exact taxonomy; the legacy Profit/EUR columns on that screen are a law-driven exclusion. |
| finance(.en).html | `pages/finance.js`; `fixtures/finance.js` lines 85–124 (9 GATE cards); `PUB/finance.html` (24 authored «ريال» invoice literals — Spec 009 invariant); F09 X-17 | `/management/accounting` + `/management/invoices` + `/management/salaries` (whole Wallet/Finance family) | PI L13, L128, L181; RPI L234–241; `shots/admin/screenshots/management-accounting-full.png`, `management-salaries-full.png`, `management-invoices-full.png`; F05 finance rows + §d | merged-from | legacy-grounded-improved | STATUS-FIRST condensation of the legacy money-KPI wall + 5 charts; salary/payout ledgers = zero-figure GATE shells (030). Sanctioned nuance: authored invoice-amount literals on ADMIN finance are Spec-009-invariant — invoice amounts ≠ pay figures (F05 risk 6). |
| reports(.en).html | `pages/reports.js`; `PUB/reports.html` (5 rep-sections); F09 X-18 | `/management/analysis-student` + `/management/analysis-course` + `/management/sessions_analysis` | PI L36, L33, L189; RPI L177–178; `shots/admin/screenshots/management-analysis-student-full.png`; F05 reports-hub row | merged-from | legacy-grounded-improved | Chart-free, finance-free roll-up (body finance-free FOREVER); the legacy bar/donut/world-map charts are constitution exclusions; deep analytics owned by 029. |
| settings(.en).html | `pages/settings.js`; `fixtures/settings.js` (profile/appearance/notif/account + roles preview); F09 X-19 | `/management/settings/general` + `/management/settings/customisation/personalisation` + `/management/profile/{show,edit}` | PI L192, L191; RPI L167–171; `shots/admin/screenshots/management-settings-general-full.png`; F05 settings + profile rows | merged-from | legacy-grounded | Built-but-thin hub over the legacy 6-area settings tree; deepening owned by 031 (G17). Profile/account slices are implemented; appearance controls already REAL sitewide. |
| gallery(.en).html | `pages/gallery.js` (header: component/style preview); F09 X-20 | NONE — no legacy route in PI or RPI | F09 X-20 (absence verified against both inventories); F05 §b «overbuilt» | net-new | useful-net-new | Design-system proof surface required by the screenshot-based visual-acceptance law; dev infrastructure, not product. 032 must verify it is NOT reachable from any role-facing nav (hide, don't delete — F09 narrative). |
| teacher-performance(.en).html | `pages/teacher-performance.js` (Spec 007 admin board, activeId `teacherKpi`); `PUB/teacher-performance.html` line 235 (`app-shell`); F09 X-39; F07 current-surfaces table | Deliberate MERGE of `/management/teachers_details` + `/management/teacher-feedback` + `/teacher/teacher-history/{id}` | PI L243, L240, L339–340; `shots/teacher/screenshots/teacher-teacher-history-1-full.png`; `shots/admin/screenshots/management-teacher-feedback-full.png`; F07 R1 | merged-from | legacy-grounded-improved | Counts + labeled signals, NO computed «Percentage» (no-score law). It is an ADMIN surface despite the `teacher-*` filename — its admin nav rail carries pay-named items one click from the teacher home's sanctioned anchor (F07 R1: 024 records a contract exemption; 025 repoints the link). 028 must absorb or re-pin this board (F09 risk 3). |

### Role homes (portal layer)

| Current page | Current evidence | Legacy source(s) | Legacy evidence path | Relationship | Quality classification | Notes |
|---|---|---|---|---|---|---|
| family-portal(.en).html | `pages/family-portal.js`; `PUB/family-portal.html` lines 275–420; `app/screenshots/family-portal__ar__light__desktop.png` (viewed by F04/F06); F09 X-22 | Legacy family home `/student/home` (identity hero + Total/Remaining/Taken hours + Today's Classes + Your Teachers + Request Trial) — plus `/management/home` which 302-redirects to it | `LEGF/student-home.md`; `LEGF/management-home.md` (302 chain); `shots/family/screenshots/student-home-full.png`; PI L353; F06 A1 rows 1–2 | improved | legacy-grounded-improved | Living cockpit (idHero/dayRail/story rows) over the legacy hero-band facts; multi-child truth restored (legacy showed one child). Hours trio relocated to family-billing quota tiles. Zero-pay verified (F06 §c, famPay regex green). |
| teacher-portal(.en).html | `pages/teacher-portal.js`; `PUB/teacher-portal.html` lines 275–402; F09 X-23; F07 rows 1–2 + anchor inventory (Scan 4) | `/teacher/home` daily cockpit (hour counters + today's classes table + next-class context) | `LEGT/teacher-home.md`; `shots/teacher/screenshots/teacher-home-full.png`; PI L326; RPI L243–313; F07 coverage row 1 | improved | legacy-grounded-improved | The legacy «Your Salary» band (997.00 EGP + Estimated/Fines/Bonus chips) and the salary/salary-class-report nav (PI L334–335) are the pay-free GLOBAL law's intentional exclusions. PAY-FREE re-verified at all three layers with zero hits (F07 Scans 1–4); ROLE_NAV = 1 implemented + 6 honest «قريبًا» planned buttons. |
| student-portal(.en).html (child-view home) | `pages/student-portal.js` (header: reframed per DEC-002/003/005); `PUB/student-portal.html`; F09 X-24; F06 A2 child-view row | `/student/home` single-child presentation (the family login's persona IS the child) | `LEGF/student-home.md`; `shots/family/screenshots/student-home-full.png`; PI L353; F06 A2 | reclassified-from | legacy-grounded-improved | The historical Student-PRIMARY classification error corrected by Spec 022 at the locale layer («بوابة الطالب»→«عرض الابن»); body byte-preserved by law. **F-00-1 (CONFIRMED)**: leftover «لوحة الطالب — النسخة الأولى» note at `PUB/student-portal.html:393` (`app/src/locales/ar.prt.js:297–298`, `en.prt.js:294`) — Must-fix in 024 with declared hash supersession (`F00` lines 71–92, 120–124). |

### Family internals (7 page pairs + drill-down)

| Current page | Current evidence | Legacy source(s) | Legacy evidence path | Relationship | Quality classification | Notes |
|---|---|---|---|---|---|---|
| family-children(.en).html | `pages/family-children.js`; `PUB/family-children.html` (exactly 5 body anchors → `family-child.html#child=stX`); F09 X-31; F06 A2 | `/student/studentslist` — «All Account Subscriptions» 8-col table + student filter + embedded teacher-feedback form | `LEGF/student-studentslist.md`; `shots/family/screenshots/student-studentslist-full.png`; PI L359; F06 A1 | improved | legacy-grounded-improved | Column-for-capability rebuild as child cards with real drill-downs; legacy table was empty, rebuild renders the real fam1 roster. Carries NO child-view fold link — an INTENTIONAL declared deviation (per-child links rejected as dishonest; preview persona is st1 only — F06 risk 3; 024/032 must not "fix" it). |
| family-child(.en).html (drill-down) | `pages/family-child.js` (5 baked `#child=stX` panels); `PUB/family-child.html` (exactly 6 body anchors incl. the ONE sanctioned fold link «افتح عرض الابن الكامل»); smoke pin `run.cjs:1085`; F09 X-32; F06 §b item 6 | No single legacy route — grounded in the legacy per-child ACCOUNT SWITCHER (top-right of the studentslist screen) + the per-student history select-filter concept | `shots/family/screenshots/student-studentslist-full.png` (switcher); `LEGF/student-student-history-fillter-2.md` (select filter); F09 X-32; F06 A2 | net-new | useful-net-new | **MUST STAY** — the honest static equivalent of account switching (pure-CSS `:target`); the structural anchor of DEC-004 (family owns the child journey). Deleting it would orphan 11 sanctioned anchors (F09 narrative). |
| family-schedule(.en).html | `pages/family-schedule.js` (header: child tags = the legacy Student-Name column reborn); `PUB/family-schedule.html`; F09 X-33 | `/student/timetable` (weekly grid) + `/student/today-sessions` (day table + cancel/reschedule + upload forms) | `LEGF/student-timetable.md`; `LEGF/student-today-sessions.md`; `shots/family/screenshots/student-today-sessions-full.png`; PI L360–361; F06 A1 | merged-from | legacy-grounded-improved | Two legacy schedule surfaces merged into one guardian view across children; hour×day grid replaced by day groups (020 FR-006); mutating actions honestly gated. |
| family-progress(.en).html | `pages/family-progress.js`; `PUB/family-progress.html`; F09 X-34 | `/student/feedbacks` (teacher-signal lines) + `/student/student-history-fillter` (per-student history) | `LEGF/student-feedbacks.md`; `LEGF/student-student-history-fillter-2.md`; PI L352; F06 A1/A2 | improved | legacy-grounded-improved | Per-child feedback/progress; zero charts/rank by law. |
| family-billing(.en).html | `pages/family-billing.js` (header documents the dropped figure column); `PUB/family-billing.html` lines 282–401 (hour-quota tiles ٤٠/١٢/٢٨, amount-free rows); F09 X-35; F06 §c token scan (zero hits) | `/student/billing` — invoice table WITH the Amount column | `LEGF/student-billing.md`; `shots/family/screenshots/student-billing-full.png`; PI L351; F06 A1 | improved | legacy-grounded-improved | Every legacy column kept EXCEPT Amount — the family-zero-pay LAW, not a gap. Smoke `famPay` regex green on all family bodies (`run.cjs:1013/1066/1090`). |
| family-requests(.en).html | `pages/family-requests.js`; `PUB/family-requests.html`; F09 X-36 | `/student/request-trial` (2-step wizard) + `/student/feedbacks` (follow-up meetings) + the today-sessions cancel/reschedule form + the studentslist teacher-feedback form | `LEGF/student-request-trial.md`; `LEGF/student-feedbacks.md`; `LEGF/student-today-sessions.md`; `shots/family/screenshots/student-request-trial-full.png`; PI L357; F06 A1/A2 | merged-from | legacy-grounded-improved | FOUR legacy request-class capabilities in one honest page; trial step-2 fields remain a recorded backendRequired gap (021 map carry-over, F06 risk 4). |
| family-materials(.en).html | `pages/family-materials.js`; `PUB/family-materials.html` (5 per-child sections); F09 X-37 | `/student/library` (marketing hero + search + category filter) | `LEGF/student-library.md`; `shots/family/screenshots/student-library-full.png`; PI L354; F06 A1 | improved | legacy-grounded-improved | Regrouped by child (guardian mental model); marketing hero dropped by design (020 FR-010); download honestly gated. |
| family-profile(.en).html | `pages/family-profile.js`; `PUB/family-profile.html` (exactly 3 backendRequired gates, smoke pin `run.cjs:1096`); F09 X-38 | `/student/profile-edit` (3 POST forms: photo/name-email/password); the legacy VIEW page `/student/profile` was an HTTP 500 | `LEGF/student-profile-edit.md`; `LEGF/student-profile.md` (500 capture); PI L356; RPI L337; F06 A1 | improved | legacy-grounded-improved | Write-surface parity is EXACT (3 gates ↔ 3 legacy forms); the broken legacy view page replaced by a working display card — rebuild exceeds legacy. |

### Child-view internals (6 page pairs — demoted, NOT deleted, per DEC-005)

| Current page | Current evidence | Legacy source(s) | Legacy evidence path | Relationship | Quality classification | Notes |
|---|---|---|---|---|---|---|
| student-schedule(.en).html | `pages/student-schedule.js`; `PUB/student-schedule.html`; F09 X-25; F06 A2 | `/student/timetable` + `/student/today-sessions` | `LEGF/student-timetable.md`; PI L360; RPI L364; F06 A2 | reclassified-from | legacy-grounded | The child's own lens on the family-owned data — sanctioned twin of family-schedule (DEC-005 «demoted not deleted»), NOT a merge candidate (F09 narrative). The ONLY child-view internal WITHOUT the F-00-1 note (grep-confirmed, `F00` line 87). |
| student-homework(.en).html | `pages/student-homework.js`; `PUB/student-homework.html`; F09 X-30; F06 A2 | Weak: no `/student/homework` route exists — derives from homework-note lines in session records + the today-sessions upload form + the teacher outcome flow | `LEGF/student-student-history-fillter-2.md` (PI L358); `LEGF/student-today-sessions.md` (Form 4 upload); `/teacher/update-result` PI L343; F09 X-30 | reclassified-from | useful-but-needs-better-grounding | Keep; 024 records a one-line provenance note (homework state derives from session outcomes) so future audits stop re-flagging it; hwSubmit gate already honest. **F-00-1**: note residue at `PUB/student-homework.html:397` — 024 relabel. |
| student-materials(.en).html | `pages/student-materials.js`; `PUB/student-materials.html`; F09 X-26 | `/student/library` | `LEGF/student-library.md`; PI L354; RPI L325; F06 A2 | reclassified-from | legacy-grounded | Direct route match; marketing hero intentionally dropped. **F-00-1**: note residue at `PUB/student-materials.html:341` — 024 relabel. |
| student-progress(.en).html | `pages/student-progress.js`; `PUB/student-progress.html`; F09 X-29 | Partial: `/student/feedbacks` teacher-signal lines + the hours trio of `/student/home`; the achievements/celebration band is AUTHORED net-new joy-layer content | `LEGF/student-feedbacks.md` (PI L352); `shots/family/screenshots/student-home-full.png`; F09 X-29 | reclassified-from | useful-but-needs-better-grounding | Keep; 024 records the grounding note (feedbacks + hours = legacy; achievements = authored) — fine under the capability-checklist law once documented. **F-00-1**: note residue at `PUB/student-progress.html:409` — 024 relabel. |
| student-history(.en).html | `pages/student-history.js`; `PUB/student-history.html`; F09 X-27 | `/student/student-history-fillter` (per-student session-record list) | `LEGF/student-student-history-fillter-2.md`; PI L358; RPI L357; F06 A2 | reclassified-from | legacy-grounded | Direct route match. **F-00-1**: note residue at `PUB/student-history.html:344` — 024 relabel. |
| student-profile(.en).html | `pages/student-profile.js` (exactly 3 gates = the legacy write surface); `PUB/student-profile.html`; F09 X-28 | `/student/profile-edit` (2 forms, 10 fields); the legacy view `/student/profile` was a 500 | `LEGF/student-profile-edit.md`; PI L356; RPI L349, L337; F06 A2 | reclassified-from | legacy-grounded-improved | Honest gates mirror the write surface; broken legacy view replaced by a working card. **F-00-1**: note residue at `PUB/student-profile.html:361` — 024 relabel. |

## Roll-up

39 rows (38 page pairs + index). Relationship totals: **direct rebuild 5** (students · families ·
teachers · courses · groups); **improved 13** (dashboard · student · family · add-family · teacher ·
course · family-portal · teacher-portal · family-children · family-progress · family-billing ·
family-materials · family-profile); **merged-from 9** (sessions · schedule · attendance · finance ·
reports · settings · teacher-performance · family-schedule · family-requests); **renamed-from 1**
(group); **reclassified-from 7** (student-portal + 6 internals); **net-new 4** (index, gallery,
portals hub, family-child). Sum = 39.
Quality totals match Agent 09's: 21 legacy-grounded-improved · 9 legacy-grounded · 4 useful-net-new ·
2 useful-but-needs-better-grounding · 0 wrong-role-classification / weak-design / duplicate /
random / needs-removal. **Nothing should be removed** (F09 narrative); the only body-copy defect in
this direction is F-00-1 (6 of 7 child-view pages), a Must-fix-in-024 relabel with declared
hash supersession.

Denominator guards respected: the 4 dead-404 legacy teacher routes and the 2 admin routes that only
ever 500'd (`/management/export-course`, plus the broken feedback/monthly-classes/message-builder
variants named in F05 risk 4) do NOT appear as grounding for any current page and must not inflate
"missing" counts in the forward matrix; the legacy admin crawl was budget-capped at 300/365 routes
(variants mostly), so groundings above cite template-level inventories (RPI), not raw capture counts.

## Rows whose grounding SUPERSEDES the Spec-021 current-vs-legacy-map

Reference: `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/specs/021-role-model-student-reclassification/current-vs-legacy-map.md` (opened by this writer to resolve carry-over vs supersession).

**Superseded / refined by this map (021 row → what changed, with evidence):**

1. **`student-portal.html` + 6 student internals** (021 §1 «⚠️ reclassify as the child's own view» and
   §2 ancestor table): the reclassification is now IMPLEMENTED (Spec 022 locale-layer reframe,
   verified in `app/src/locales/ar.prt.js:92–94` and zero «بوابة الطالب» tokens in built HTML —
   F06 §b items 5/8). The 021 verdict «⚠️» is superseded by **reclassified-from, done** — with the
   NEW residue F-00-1 (noteT/noteD wording) that 021 could not have known; owner 024.
   The §2 ancestor rows themselves CARRY OVER unchanged (this map's child-view groundings match them
   route-for-route).
2. **`portals.html` hub** (021 §1 «➕ demo device; needs the DEC-004 rework»): the rework LANDED —
   exactly 2 role cards + admin console + demoted child-view preview, smoke-pinned
   (`run.cjs:1099–1106`; `PUB/portals.html` lines 262–296; F06 §b items 1–3). Supersedes the
   «needs rework» qualifier; now net-new/done.
3. **`family-child.html`** (021 §1 «➕ the fold-point for the student view»): confirmed and
   strengthened — exactly 6 body anchors including the ONE sanctioned fold link, new baseline body
   md5 recorded as a declared supersession of the 020 hash (F06 §b item 6). Additionally, the 022
   spec draft's «family-children fold-point link» was REJECTED at implementation (dishonest for a
   single-persona preview) — family-children carries 5 drill-downs and zero child-view links; this
   declared deviation supersedes any reading of 021/022 that expects two fold points (F06 risk 3).
4. **Teacher planned-nav row** (021 §1 «Teacher chat/schedule/students/library/tasks/
   monthly-reports/profile → 7 planned nav entries ⏳ Spec 025»): SUPERSEDED — the actual registry is
   1 implemented (home) + **6** planned entries (schedule/students/outcomes/tasks/reports/profile,
   `fixtures/portal.js` lines 159–167; F04 ROLE_NAV section). **Chat and library have NO nav gate at
   all** (F07 R4/R5): library survives only as retained TEACHER_PREVIEW fixtures + the matUpload
   gate; teacher-side chat has zero trace (owner routed to 026 admin ops). 024/025 must give both an
   explicit surface or a recorded exclusion.
5. **Cross-cutting «Identity hero band» + «Live day operations» rows** (021 §3, both «⚠️ Spec 022
   restores»): DELIVERED — idHero/dayRail/story primitives verified in built HTML and smoke-pinned
   (F04 living-layer CSS section; F06 A1 rows 1–2). Verdicts flip to ✅.
6. **Cross-cutting «Chat / notifications» row** (021 §3 «🔒 backendRequired futures (023 records
   owners)»): owners now RECORDED — family-header notifications → 024-correction honest-gate/register
   entry (F06 risk 2); teacher notifications + «Add shortcuts» → 024 exclusion register (F07 R7);
   admin chat → 026. Supersedes the open «023 records owners» pointer.
7. **Cross-cutting «Certificates (family visibility)» row** (021 §3 «⏳ resolve in 023»): RESOLVED —
   no legacy FAMILY page shows certificates (13/13 inspected, F06 risk 5); it is NOT a family
   coverage gap; owner = 031 note + future-backend. The teacher-side certificate-request workflow is
   retained in fixtures/locale keys for 025 (F07 certificate row).
8. **Admin row** (021 §1 «Admin /management/home + ~75 templates → dashboard.html + 40 admin pages ✅
   (per-page fidelity re-checked in 023)»): the re-check RAN — the admin reverse groundings above
   (F05, 78-row table; F09 X-02…X-19) confirm the ✅ and add the precise per-page relationships,
   the 57-row 026–031 ownership re-verification, and one NEW unowned capability (the RBAC
   «Locations» group, F05 risk 1 → 024). Refines, does not contradict.
9. **Teacher salary row** (021 §1 «Teacher salary / salary-class-report → deliberately absent 🔒»):
   CARRIES OVER, now with the four pay surfaces individually named and visually confirmed
   (home band · update-result matrix · salary ledger · salary-class-report filter — F07 rows 2, 8–10)
   and the three-layer pay-free verification re-run green (F07 §pay-free). One refinement beyond
   021: the `teacher-performance.html` admin-shell adjacency (F07 R1) needs a written contract
   exemption in 024.

**Carry over unchanged** (grounding identical in both maps): all eight family-internal rows of 021 §1
(`family-portal`, `family-children`, `family-schedule`, `family-progress`, `family-billing`,
`family-requests`, `family-materials`, `family-profile`), the «Family courses view — distributed»
row, the «Multi-child ownership» and «Payments/salaries 🔒 permanent» cross-cutting rows, and the
021 §2 student-page ancestor table (route-for-route identical to this map's child-view groundings).
