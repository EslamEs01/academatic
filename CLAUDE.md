<!-- SPECKIT START -->
Active feature: **Spec 037 — Reports / Analytics Nav Completion + Missing-Pages Correctives is IMPLEMENTED**
(awaiting the watcher commit; artifacts + `plan.md` (D1–D38) + `tasks.md` (54 tasks) + 20 contracts +
`implementation-status.md` at `academy-dashboard-discovery/specs/037-reports-analytics-nav-completion/`). **FOURTH
Spec-033-roadmap follow-up.** **Count HELD 115 → 115 (0 new pages; admin-menu 50).** The two Reports «قريبًا» items
flipped `planned → implemented` (reports category now 0 «قريبًا»; `FUTURE_ROUTES.monthlyReports`/`dataAnalysis`
dropped): **monthlyReports** → display-only tab `reports.html#view=monthly` (authored month-grouped rows + summary
cards + status chips), **dataAnalysis** → display-only tab `reports.html#view=analysis` (authored insight cards +
AUTHORED categorical trend labels). A **full Admin missing-pages audit** (all 50 items; 0 truly-missing, 0 ownerless)
also **strengthened the 3 maintainer-flagged Spec-035 items**: **familyCategories** → labeled Categories board
`families.html#view=categories` (authored `FAMILY_CATEGORIES.count` + reclassify drawer + Create gate),
**studentResult** → cross-student Results board `students.html#view=results`, **studentEvaluation** → cross-student
Evaluation board `students.html#view=evaluation` (both with per-student deep-links to the UNCHANGED single-student
`student.html#view=results`/`evaluation` tabs). Mechanism = existing `tabs()`+`#view=` fold ONLY: each page's existing
body became the first/default tab verbatim (reports→overview [7 `.report-card` preserved], families→directory,
students→directory); the new tabs are **pure display boards** (no filterBar — honoring enhance.js's single global
`[data-no-results]`). **NO computed score/rank/GPA/percentage/rubric-total/trend-math, NO `<canvas>`/chart; reports
body finance-free** (finance analysis → 038). Every write final (Export/Generate/Run/Create/Reclassify) =
`backendRequired` gate. **`package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` 0-diff** (extended the existing
`ar/en.rep.js` + `ar/en.fam.js`). **Verified**: build 115; smoke PASS (nav037 anchors + reports 0-planned +
reports/families/students tab widgets + overview 7-card preserved + no computed/canvas/money + per-student deep-links
+ the 5 `#view=` deep-links open on fresh load AR/EN; the nav035 route asserts updated to the refined routes —
sanctioned amendment); a11y critical=0 serious=0 (+16 rows); 321 screenshots 0 console errors (+19 sp037). Locale
parity `rep` 251/251 · `fam` 393/393 (0 divergence). `student.html`/`family.html` + `result-summary`/
`evaluation-rubric` byte-identical; only reports/families/students bodies + the shared sidebar changed. Baseline: the
uncommitted-but-green Spec 035 + 036 working tree (maintainer-approved green-tree implement). **No commit / no push**
— watcher commits (recommend 035 → 036 → 037 as three separate commits). Next per the Spec-033 roadmap: 038 finance ·
039 content deep-links · 040 settings deep-links · 041 final re-freeze.
**History: Spec 036 — Teachers Nav Completion (Add Teacher / Teacher Categories / Sessions KPI / Monthly
Performance) is IMPLEMENTED** (awaiting the watcher commit; artifacts + `tasks.md` (46 tasks) + 17 contracts +
`implementation-status.md` at `academy-dashboard-discovery/specs/036-teachers-nav-completion/`). **THIRD Spec-033-
roadmap follow-up.** **Count HELD 115 → 115 (0 new pages).** The four Teachers-category «قريبًا» items flipped
`planned → implemented` (0 «قريبًا» left in teachers; admin-menu still 50; `FUTURE_ROUTES.teacherCategories`
dropped). **addTeacher** + **teacherCategories** = fold-anchors → `teachers.html` (reuse the existing `trn-add` /
`trn-categories` drawers; addTeacher stays pay-free + password-free, CV=gate; Save/assign = backendRequired; bodies
byte-identical). **sessionsKpi** + **monthlyPerf** = two display-only TABS folded into `teacher-performance.html`
(the existing board became the **overview** tab via the shared `tabs()` widget; `#view=sessions-kpi` /
`#view=monthly`): authored session COUNTS (`teacherCounts`) + categorical quality/trend chips; the legacy "Classes
KPI"/"Monthly Performance" computed `Percentage` is deliberately NOT reproduced (NO computed score/rank/percentage/
chart/`<canvas>`). Mechanism = existing primitives only (`tabs()`+`#view=` · `cardGrid`/`statMini`/`chip` · the
`trn-add`/`trn-categories` drawers) + new authored `fixtures/teacher-performance.js` + new keys in the existing
mirrored `ar/en.trn.js` (`trn.board.tab.*`/`trn.sessKpi.*`/`trn.monthly.*`; the `trn.kpi` profile block untouched —
a naming collision was caught + fixed by renaming to `trn.sessKpi`, keeping `teacher.html` body byte-identical). The
two new tabs are static display boards (no filterBar) to honor enhance.js's single global `[data-no-results]`
contract. **Teacher pay-free GLOBAL** upheld: 0 salary/rate/hour_rate/fine/payout/currency token on any teacher
surface; the legacy Add-Teacher Salary/Payout/Zoom/password sections stay excluded FOREVER; teacher-portal ×16
byte-identical; `teacher-performance.html` is the sanctioned admin exempt board. **No `package.json`/dependency/
backend/API/websocket/engine; `enhance.js` 0-diff; `build-html.mjs` 0-diff (no new page); `i18n.js` 0-diff (extended
the existing trn pair).** **Verified**: build 115; smoke PASS (additive Teachers block — 4 nav-flip anchors +
teachers 0-planned + admin-menu 50 + teacher-performance 3-tab widget with no computed/pay + `#view=sessions-kpi`/
`#view=monthly` deep-links open the right tab on fresh load + `trn-add`/`trn-categories` reachable+gated;
**payHit/pay-guards/famPay/payFigure/child-view/finance/settings/Spec-032/026–035 asserts BYTE-VERBATIM**; the ONE
sanctioned amendment = the dashboard planned-item probe repointed teachers→admin, route-freeze stays 115); a11y
critical=0 serious=0 (+teacher-performance `#view=sessions-kpi`/`#view=monthly` light/dark/mobile-390 rows);
screenshots 0 console errors (+9 sp036 frames). `teachers.html`/`teacher.html` `#page-body` BYTE-IDENTICAL (fold
anchors = nav-only, stash-rebuild proven); only `teacher-performance.html`/`.en` bodies change (tabs) + the shared
sidebar; all portal pages ×16 + index byte-identical. Baseline note: implemented on the uncommitted-but-green Spec
035 working tree (user-approved); recommend the watcher commit Spec 035 first, then Spec 036 as a separate commit.
**No commit / no push** — watcher commits. Next: the remaining reports/admin/settings nav items per the Spec-033
roadmap.
**History: Spec 035 — Families & Students Nav Completion (Family Categories / Schedule Search / Student
Results / Student Evaluation) is IMPLEMENTED** (awaiting the watcher commit; artifacts + `tasks.md` (50 tasks) + 16
contracts + `implementation-status.md` at `academy-dashboard-discovery/specs/035-families-students-nav-completion/`).
**SECOND Spec-033-roadmap follow-up.** **Count 113 → 115 (+2)** — one new page base (`schedule-search`, +2 files);
the four Families-category «قريبًا» items flipped `planned → implemented` (0 «قريبًا» left in families; admin-menu
still 50; `FUTURE_ROUTES` trimmed of studentResult/studentEvaluation). **familyCategories** = fold-anchor →
`families.html` (existing category filter + display-only `fam-cat` reclassify drawer, gated Save; body byte-identical).
**scheduleSearch** = a NEW standalone display-only availability finder (grounded in legacy `management/search-schedule`):
filterBar (teacher/subject/day/time-window/availability) + authored results board + per-slot read-only drawers +
empty state; client-side facet over authored fixtures (NO engine/network/pay); Book/Assign = `backendRequired` gates
(no fake booking/mutation). **studentResult** = deep-link `student.html#view=results`; **studentEvaluation** =
deep-link `student.html#view=evaluation` — the existing display-only Results/Evaluation tabs (NO computed score/rank/
chart; `result-summary.js`/`evaluation-rubric.js` BYTE-IDENTICAL). Mechanism = existing primitives only (pageHeader/
summaryCards/filterBar/facetAttrs/previewTemplate/chip/noResults) + the CLOSED `data-*` set; new
`fixtures/schedule-search.js` + mirrored `ar/en.ssr.js` (registered in `i18n.js`; 13 pairs, 0 divergence); `sidebar.js`
`langRoute()` made HASH-AWARE (backward-compatible — routes without a hash byte-identical) so EN deep-links resolve to
`student.en.html#view=…`. **No `package.json`/dependency/backend/API/websocket/engine; `enhance.js` 0-diff; no
`app.css` change.** **Verified**: build 115; smoke PASS (114 loads; additive Families/Students block — route-freeze
115 + 4 nav-flip anchors + families 0-planned + admin-menu 50 + schedule-search form/results/gates/empty/facet-narrow
+ 0 external request + no pay/file/password/canvas + student `#view=results`/`#view=evaluation` deep-links open the
right tab; **payHit/famPay/payFigure/child-view/finance/settings/Spec-032/026–034 asserts BYTE-VERBATIM**; the TWO
sanctioned amendments = route-freeze 113→115 (+ `schedule-search` PAGES entry) + the dashboard planned-item probe
repointed families→teachers since families now has 0 planned); a11y critical=0 serious=0 (+schedule-search light/dark/
mobile-390/open-drawer rows; student `#view=results`/`#view=evaluation` rows already present); screenshots 0 console
errors (+11 sp035 frames). Only the 52 admin pages' SHARED SIDEBAR changed (4 «قريبًا» → anchors — PROVEN
`#page-body`-onward BYTE-IDENTICAL for families/family/students/student ×2 lang); all portal pages ×16 + index
byte-identical; `nav.config.js` = 4 flips + FUTURE_ROUTES trim, `build-html.mjs` = +1 import/entry, `i18n.js` = +2/+2,
`sidebar.js` = hash-aware langRoute. Role laws green: teacher pay-free, family zero-pay, student child-view (portal
untouched; the deep-links target the ADMIN `student.html` profile tabs, not the portal), finance/settings invariants.
**No commit / no push** — watcher commits. Next: the remaining teachers/reports/admin/settings nav items per the
Spec-033 roadmap.
**History: Spec 034 — Control Center Pages Completion (Messages / Leads / Tasks / Announcements / Time
Converter) is IMPLEMENTED** (awaiting the watcher commit; artifacts + `tasks.md` (58 tasks) + 17 contracts +
`implementation-status.md` at `academy-dashboard-discovery/specs/034-control-center-pages/`). **FIRST Spec-033-
roadmap follow-up.** **Count 103 → 113 (+10)** — 5 standalone page pairs (`messages`/`leads`/`tasks`/
`announcements`/`time-converter`), the 5 Control «قريبًا» nav items flipped `planned → implemented` (0 «قريبًا»
left in Control; admin-menu still 50 items; `FUTURE_ROUTES` trimmed of the 4 promoted routes). Four pages are
honest SHELLS (real list/board/detail/compose UI; every backend-write final — Send/Reply/Convert/Assign/Save/
Move/Publish — is a `backendRequired` gate; NO fake persistence/mutation/success); the fifth, **`time-converter`,
is a GENUINELY WORKING client tool** (native `Intl.DateTimeFormat({timeZone})` via a page-scoped
`initTimeConverter()` IIFE in `enhance.js` mirroring `initTabs`/`initWizard` — guarded → inert on every other
page; NO new global `data-*` hook/storage key/dependency/network; NO gate on the conversion; Cairo 3PM→NY 8AM
verified). **messages**: inbox+thread+compose (Send/attach gated) + read-only thread sheets + Create-Group/
Add-Member drawers (image = GATE, no `type=file`). **leads**: authored KPI cards + list (date/parent/email/phone)
+ 9-status filters + detail drawer (notes log + Add-Notes + Change-Status forms) + Create-Request form (~19
grounded fields, **no money field**). **tasks**: KPI strip + display-only board (no drag) + per-staff table
(Average = authored literal) + Create/Edit + Add-Section drawers. **announcements**: list + compose (channels/
audience/expire) + preview + recipients; Publish/Send/WhatsApp/media = GATES; does NOT duplicate the settings
Notifications form. Mechanism = existing primitives only (pageHeader/summaryCards/cardGrid/filterBar/tabs/
previewTemplate+formDrawer/field/confirmAction/chip) + the CLOSED `data-*` set; new `fixtures/control-center.js`
(authored, no PII/pay/secret) + new mirrored pair `ar/en.ctrl.js` (registered in i18n.js; 12 locale pairs, 0
divergence) + additive `.cc-*` CSS. **No `package.json`/dependency/backend/API/websocket/engine.** **Verified**:
build 113; smoke PASS (112 loads; additive Control block — per-page shell + gated finals + `time-converter`
output-updates-on-input + 0 external request; **payHit/tchPay/famPay/payFigure/child-view/finance/settings/FAKE/
Spec-032-form-completion + 026-031 asserts BYTE-VERBATIM**; the ONE sanctioned amendment: route-freeze 103→113 +
the dashboard planned-item feedback probe now reveals the families category since Control has no planned item);
a11y critical=0 serious=0 (+5 pages light/dark/mobile-390 + open-form rows; fixed one tasks scrollable-region a11y
warning); 282 screenshots 0 console errors (24 sp034 frames). Only the 52 admin pages' SHARED SIDEBAR changed
(5 «قريبًا» → anchors); every admin `#page-body` + all portal pages ×16 + index BYTE-IDENTICAL; `enhance.js` =
+1 guarded IIFE, `build-html.mjs` = +5, `i18n.js` = +2/+2, `nav.config.js` = 5 flips + FUTURE_ROUTES trim.
Role laws green: teacher pay-free, family zero-pay, student child-view, finance/settings invariants (Control pages
are non-finance, carry no pay/credential/file/canvas/money token). **No commit/no push** — watcher commits. Next:
Spec 035 (Families & Students nav completion) per the Spec-033 roadmap.
**History: Spec 032 — Final QA / Full Admin Menu Coverage / Create-Edit Forms Completion / Production
Freeze is IMPLEMENTED** (committed baseline HEAD `a438ac2`; artifacts + `tasks.md` (50 tasks) + 18 contracts +
`implementation-status.md` at
`academy-dashboard-discovery/specs/032-final-qa-full-admin-menu-production-freeze/`). **THE FINAL FRONTEND
PRODUCTION-FREEZE SPEC.** **Count HELD 103 → 103 — ZERO new pages** (`package.json`/`build-html.mjs` PAGES
0-diff). The one rule: **every Add/Create/New/Edit/Duplicate opens a REAL form UI with visible grounded fields
FIRST; only the final Save/Submit/Issue is a `backendRequired` gate** — the 40 field-less "too-early gate"
create/edit actions (FC-01…FC-40; `openModal` used to render title+note+Close only) became **24 form-bearing
drawers** (+ wizard child-row + picker-reuse + a real link). **Mechanism = Option B**: one additive helper
`formDrawer(id,{titleKey,headIcon,fields,ctaKey,reasonKey})` in `components/preview-drawer.js` wrapping the
existing `previewTemplate()` — renders `field()` controls in a `.wiz-grid` + exactly ONE clickable
`data-disabled-reason` final; each field-less `data-modal-trigger` → `data-drawer="X"` opening a baked
`<template data-preview="X">`, reusing the CLOSED `data-drawer`→`openSheet`→`template[data-preview]` clone path.
Kebab items in `enhance.js` carry `data-drawer` (dispatched FIRST — the drawer always wins); the legacy
`data-modal-trigger`/`-title-key` attrs are kept INERT as anchors so the 027–031 presence-asserts stay
byte-verbatim. **NO new hook/storage key/engine/CSS-class/page/dependency.** Forms by owner: **sessions**
`sess-new` (course/teacher/date/time/duration/credit/status); **family/student** `fam-edit`/`fam-child`/
`fam-note`/`fam-cat`+select/`stu-edit`/`stu-note`/`stu-add` + the add-family wizard "Add child" native
`<details>` child-row (FC-10); **courses/groups** `crs-add`/`crs-edit`/`grp-add`(prefilled=create-from-course)/
`grp-edit`; **teachers** `trn-add`/`trn-edit`/`trn-note`/`trn-categories` create-form + a CV-upload GATE;
**reports** `fb-add`(nested in the outcome sheet)/`fb-create`/`form-create`(repeatable field-builder rows)/
`rep-fbcat` create-form; **finance** `bank-add` (name only); **staff** `staff-add`/`staff-edit`/`staff-dup`;
**certificates** `cert-tpl` (name + STATIC designer preview + background-upload GATE, no `<canvas>`/drag/PDF) +
`cert-create` (+ PDF-preview GATE); **library/settings** `mat-add`/`mat-edit`/`lib-item`(+file/thumbnail GATE)/
`lib-cats` create-form/`head-add` (name/status). FC-40 empty-state CTA → real link to `sessions.html`.
Customization-save + Policy-edit stay honest panel gates. **MUST-OMIT (0 rendered anywhere)**: password ·
salary/hour-rate/fine/pay-period · currency-with-salary · gateway/payout/SMTP/zoom credentials · 2FA-otp ·
computed Total. **MUST-GATE (stay `data-disabled-reason`)**: every `type=file` upload · certificate canvas/PDF ·
WhatsApp pairing · Record-Payment. Fields INERT — no persistence/mutation. **14 candidate-list pickers**
re-pinned (list+gate); **3 hybrid category drawers** (`trn-categories`/`rep-fbcat`/`lib-cats`) gained real create
forms. New fixture `fixtures/form-options.js` + mirrored `fopt.*` (extra) + per-domain `*.form.*` keys in the
existing 11 locale pairs (0 divergence). Admin menu **50 items 0-unclassified**; route/page **103/0-orphan/
0-missing-mirror**; 2 stale `FUTURE_ROUTES` doc-entries cleaned (`sessionsAnalysis` removed, `teacherCategories`
→ `teachers.html`). **Verified**: build 103; smoke PASS (102 loads; additive form-completion block —
`fieldlessCreateEdit===0`, per-page MUST-OMIT/GATE greps, 14 pickers + 3 hybrids + nested fb-add + admin-menu-50 +
route-freeze-103; **payHit/tchPay/famPay/payFigure/child-view/finance-forbidden/no-mutation/FAKE + 026-031 asserts
BYTE-VERBATIM**, the ONE amendment = finance invoice-drawer count scoped to `inv*`, still 9); a11y critical=0
serious=0 (+open-form focus-trap/dialog/mobile-390/dark/EN rows); 258 screenshots 0 errors (39 `sp032-*`
open-form frames). Only the **21 form-host bases** (×2 = 42 HTML) changed; teacher-portal ×16 + family + student +
all portal internals + index BYTE-IDENTICAL; `package.json`/`build-html.mjs`/finance-source 0-diff. Role laws
green: teacher pay-free (portal byte-identical; admin teacher/staff form-drawer templates carry NO pay field),
family zero-pay, student child-view, finance no-fake-money, settings no-fake-settings. **No commit/no push** —
watcher commits. **This is the production freeze; no further frontend spec.**
**History: Spec 031 — Admin Management / Content / Certificates / Settings / Materials Deep Management is
IMPLEMENTED** (committed baseline HEAD `80449be`; artifacts + `tasks.md` (74 tasks) + 24 contracts at
`academy-dashboard-discovery/specs/031-admin-management-content-certificates-settings-materials/`). **Count 97 →
103** (+6). Settings-category items **fold into `settings.html`** as a 6-tab hub (General·Notifications·
Customization·Security·Users·Integrations — the finance.html/Spec-030 precedent, 0-delta; theme/lang stay REAL);
the `admin`-category surfaces became **3 focused pages**: **`staff.html`** (display-only directory + `staffMenu`
kebab on the EXISTING `data-row-menu` — View drawer/Edit-Duplicate modal **no password+no salary**/display-only
RBAC matrix drawer+Save gate/Category+Activity drawers/Deactivate-Delete confirms no-mutation/Reset-Invite gates;
the ONE staff home, resolves settingsUsers dup), **`library.html`** (Materials subject catalog + Books media
catalog tabs; count-literal views/downloads; category drawer; Add/Upload/Download/Publish/Delete gates — **no
`type=file`**; `materials` folded), **`certificates.html`** (Templates + a **STATIC designer preview** [CSS-
positioned spans, NO `<canvas>`/drag/upload/render-commands] + Requests tabs; Approve/Reject/Generate/Preview/
Download/Send/Create/Upload gates — no PDF/window.open/mutation; `certificateRequests` folded). Settings General
omits pay-rate/salary (non-numeric "managed in Finance" pointer) + folds Locations slice + figure-free
**expense-heads** lookup (name/status, NO amount); Notifications = figure-free event×channel matrix; Integrations
= **locked-placeholder** provider cards (name+status only) — payment-gateway/payout/WhatsApp/Email/backup/import/
message-builder → future-backend gates, **NEVER `type=password`/API-key/secret/webhook**. New fixtures
`staff-management`/`content-library`/`certificates`/`settings-management` (authored, no PII/pay/secret/file) +
`ar/en.adm.js` (mirrored, **391 keys each, 0 divergence**); reused tabs/directory-card/filter-bar/preview-drawer/
confirm-modal/settings-section — **no new hook/storage key/engine/CSS-framework** (only additive `.cert-stage`).
`nav.config.js` = exactly **3 flips** (`staff`/`books`/`certificates` planned→implemented+route); `materials`/
`certificateRequests`/six `settings*` stay `planned` (folded). **Verified**: build 103; smoke PASS (102 loads;
additive Spec-031 honesty block: per-page no-`type=password`/`type=file`/canvas/drag/pdf/credential-input +
figure-free + gates + tabs-render-and-switch + staff-kebab+RBAC-drawer + library-tabs + cert-static-designer +
settings-6-tabs+real-theme; **payHit/tchPay/famPay/payFigure/child-view + 026/027/028/029/030 asserts
BYTE-VERBATIM**); a11y critical=0 serious=0 (+12 rows); 219 screenshots 0 errors (11 sp031 frames). **Only
`settings.html`/`.en` changed among existing bodies**; the 3 nav flips changed the shared sidebar (staff/books/
certificates→anchors — PROVEN the only delta; every protected `#page-body` byte-identical); teacher-portal ×16 +
all portal pages + index + finance/reports/teacher/family/student/dashboard **bodies** byte-identical;
`package.json` 0-diff; no new dependency/engine/hook. Role laws green: teacher pay-free (portal byte-identical;
admin staff omits salary), family zero-pay, student child-view, finance Spec-030 invariant. No salary/payout/
compensation FIGURE, no computed metric, no chart/canvas, no credential/secret/`type=file`/`type=password`. Next:
watcher commit.
**History: Spec 030 — Admin Finance / Invoices / Payroll / Banks Deep Management is IMPLEMENTED**
(committed HEAD `7c5ab7b`; artifacts + `tasks.md` (55 tasks) + 24 contracts at
`academy-dashboard-discovery/specs/030-admin-finance-invoices-payroll-banks/`). **Count HELD 97 → 97 — ZERO
new pages; `nav.config.js` 0-diff.** `finance.html` became a **tabbed hub** (Overview·Salaries·Banks via the
existing `data-tab`) — the FIRST sanctioned modification of finance.html, via a **declared Spec-009
supersession** (lifted the finance-source freeze + `finance.html` body-byte + the `demoInCluster>=1` assertion
for F-J; KEPT byte-verbatim every permanent guarantee: no money arithmetic, no status-mutation-on-confirm, no
receipt/`type=file`, no chart/`<canvas>`, `FINANCE_SUMMARY` row-count-only, invoice/payment amount literals
only, salary/payout figures never shown, the finance `forbidden` regex, six-wallet-locked nav + membership).
**Salaries tab** = teacher+staff STATUS-FIRST **FIGURE-FREE** boards (name+status+period, NO amount) +
Generate/Approve/Mark-paid/Export `data-disabled-reason` gates. **Banks tab** = name/status list + Add-bank
backendRequired modal (name only) + Import/Reconcile gates (no credentials). **F-J** finance Print
`data-demo-action`→disabled-with-reason gate; payments gained Add/Reconcile gates. The 9 figure-free planned
cards STAY (plannedN===9 byte-verbatim) as honest future-backend gates for the real engine, covering monthly-
invoices/class-salary-report/payouts/accounting/analysis/expense (F-B/F-F/F-H/F-I/F-M/F-N/F-O). New fixtures
`SALARIES`/`BANKS` (authored, FIGURE-FREE, no amount) + `fin.tab`/`fin.sal`/`fin.bank`/`fin.pay2` in `ar/en.fin.js`
(mirrored, 144 keys each, 0 divergence); reused `.card`/`data-tab`/chips — **no new hook/storage key/engine/page/
CSS**. Payout-providers (Paymob/Payoneer creds/webhooks) + payment-gateway credentials → future-backend/031
(NEVER mocked; no secret/API-key/`type=password` rendered); teacher-portal salary twin + family payment →
excluded. **Verified**: build 97; smoke PASS (96 loads; additive Spec-030 block + F-J re-pin; 4-tiles/9-invoices/
6-payments/9-planned/9-drawers/forbidden/no-mutation/no-receipt + 026/027/028/029 + payHit/tchPay/famPay/payFigure/
child-view BYTE-VERBATIM); a11y critical=0 serious=0 (+finance salaries/banks tab rows); 5 Spec-030 screenshots
0 errors. **ONLY `finance.html`/`.en` changed**; `package.json`/`nav.config.js`/`enhance.js`/`finance-status.js`
0-diff; teacher-portal ×16 + teacher-performance + family + student + reports + index byte-identical. Role laws
green: teacher pay-free (portal byte-identical; admin salary boards figure-free), family zero-pay, student
child-view. No pay/salary/payout AMOUNT figure anywhere; no computed aggregate/P&L; no chart; no credential/
secret/file-upload. Next: watcher commit.
**History: Spec 029 — Admin Reports / Analytics / Feedback / Forms Deep Management + Admin Menu
Coverage Gate is IMPLEMENTED** (committed HEAD `7dfafda`; artifacts + `tasks.md` (54 tasks) + 24 contracts
at `academy-dashboard-discovery/specs/029-admin-reports-analytics-feedback-forms/`). **Count HELD 97 → 97 —
ZERO new pages**: Feedback-review + Forms/surveys FOLDED into `reports.html` (new `components/report-feedback.js`
+ `fixtures/report-feedback.js` + `rep.fb.*`/`rep.fbcat.*`/`rep.form.*` in `ar/en.rep.js`, mirrored). Feedback
rows (teacher/class/family/student) = authored CATEGORICAL remark pills + status chips + a real type/status
`filterBar` + read-only detail drawers (Approve/Delete = backendRequired confirms) + Create-feedback modal +
Manage-categories drawer (create modal + assign `data-disabled-reason` gate; nav stays planned/folded like
`teacherCategories`). Forms = display-only list (authored question/response LITERALS — no aggregation) +
Create-form modal + a real deep-link to the EXISTING student Evaluation tab (no duplicate engine). **Export/print
honesty**: **R-G** reports Print `data-demo-action`→disabled-with-reason gate (consistent with CSV/PDF/Share);
native disabled-reason gates KEPT (R-H sessions-analysis, R-I course/group/student/teacher — already honest);
`teacher-performance` stays export-free/display-only (R-M). **Write honesty**: **R-E** outcome "Add feedback"→
backendRequired modal in the ONE canonical `outcome-details.js` drawer (propagates to attendance/sessions/course/
group/teacher — byte-clean single-line delta each); **R-F** student "Approve"→backendRequired confirm
(`evaluation-rubric.js`). **NO chart/canvas/computed-%/score/rank** anywhere; **NO finance figure in any 029
body**; NO new hook/storage key/engine/page. `nav.config.js` / finance source / `package.json` **0-diff**;
admin-menu coverage (43 items, 0 unclassified) enforced by the existing Spec-010 nav block (6 rail cats · exact
finance sub-section · banks placement · link-integrity deadHash/badTarget=0 · planned-truthfulness) + the
`admin-menu-coverage-inventory.md` artifact. **Verified**: build 97; smoke PASS (96 loads; additive Spec-029
asserts + R-G re-pin + ONE sanctioned facet-scoped filter-correctness refinement for the now-two-facet reports
page — still fails a broken area filter; payHit/tchPay/famPay/payFigure/child-view/admin-finance + 026/027/028
asserts BYTE-VERBATIM); a11y critical=0 serious=0 (+`reports` EN-dark row); 6 Spec-029 screenshots 0 errors.
**14 HTML changed** (reports/attendance/sessions/course/group/teacher/student ×2); **teacher-performance + 16
teacher-portal + family + finance + index + dashboard byte-identical**. Role laws green: teacher pay-free (portal
16 files byte-identical), family zero-pay, student child-view, admin finance Spec-009 invariant. Owner handoff:
finance analytics (analysis-expenses/invoices, salary-class-report)→030 · certs/materials/settings→031 ·
messages/leads/announcements/scheduleSearch→future-backend · stale-map/final sweep→032. Next: watcher commit.
**History: Spec 028 — Admin Teachers / Performance Deep Management is IMPLEMENTED**
(awaiting the watcher commit; artifacts + `tasks.md` (56 tasks) + 21 contracts at
`academy-dashboard-discovery/specs/028-admin-teachers-performance/`). **Count HELD 97 → 97 — ZERO new pages**:
every delta a modal/drawer/picker/row-kebab/confirm/gate on an existing page; **all-teachers-timetable FOLDED
into the existing `schedule.html` teacher-lens** (`schedule.js` byte-unchanged). Teachers list gained a per-card
**row kebab** (View real · Edit modal · On-Vacation/Deactivate confirm · Delete confirm) via a new `teacherMenu`
on the EXISTING `data-row-menu` dispatch (one `'teacher'` branch + an optional `menuId`/`menuKind` slot on
`directory-card.js` — non-teacher callers byte-identical) + a **Manage-categories** drawer (`trn-categories` list +
Create modal + assign-members gate; `teacherCategories` nav stays planned). Teacher detail: Edit/Add-note → modals,
Notify → confirm, **assign-course/group** → `trn-assign-course`/`trn-assign-group` display-only picker drawers,
On-Vacation/Deactivate/Delete → confirms, **availability editor** (`trn-availability` day/time rows + gates, no
invented recurrence), Reset-password/Login-as → future-backend gates. Course/group **assign-teacher** (the M-N
handoff) → `crs-assign-teacher`/`grp-assign-teacher` single-teacher picker drawers → backendRequired (separate from
the `grp-assign` student drawer). Teacher-performance kept display-only (**no computed score/rank/chart**; unused
`rating` field unsurfaced). New display-only fixture `fixtures/teacher-management.js`; AR+EN keys in `ar/en.trn.js`;
reuse `common.backendRequiredNote`; **no new CSS/hook/storage key/engine/page**. **Pay/finance EXCLUDED** (no
Salary/Payout fieldset, pickers show name/subjects only, no compensations tab, no rate figure): Compensations/
Salary/Accounting/Salaries/Payouts→030 · Payout-Providers/Login-as/Reset-password→future-backend · Teacher/Class-
Feedback→029 · session-reassign→026 · teacher-portal salary→excluded FOREVER. **Verified**: build 97; smoke PASS
(96 loads; +77-line additive amendment — payHit/tchPay/famPay/payFigure/child-view/admin-finance + 026/027 asserts
byte-verbatim); a11y critical=0 serious=0; 197 screenshots 0 errors. Only teachers/teacher/course/group HTML changed
(×2 lang); the 16 teacher-portal files + teacher-performance + admin-ops + the 9 Spec-027 pages + index
byte-identical; `package.json` 0-diff. Role laws green: teacher portal pay-free (`teacher-performance.html` is the
sanctioned admin exempt board, never linked from the portal), family zero-pay, student child-view, admin finance
Spec-009 invariant. Next: watcher commit.
**History: Spec 028 SPECIFIED/PLANNED** — plan artifacts: `plan.md · research.md (D1-D41) · data-model.md ·
quickstart.md · contracts/` (21). Count decision: STAYS 97 — ZERO new pages; every delta is a
modal/drawer/picker/row-kebab/confirm/gate on an existing page. **all-teachers-timetable FOLDS into the existing
`schedule.html` teacher-lens** (a `teacher` filter over List+Timetable already exists — `schedule.js:49-56`; no new
page, no new schedule.js code). Mechanism = reuse the CLOSED Spec-026 `data-*` set + Spec-027 precedents: Edit
teacher/Add-note/Create-Edit-category = `data-modal-trigger` honest modal; assign-teacher→course/group +
course/group←teacher + category-members + availability = `data-drawer` display-only picker + backendRequired final;
status/vacation/deactivate/activate/delete = `data-confirm`; **teachers card kebab** = a new `teacherMenu` builder
in `enhance.js` routed by the EXISTING `data-row-menu` dispatch (one `'teacher'` branch mirroring familyMenu/
studentMenu — NOT a new hook) via an optional `menuId`/`menuKind` slot on `directory-card.js`. New display-only
fixture `fixtures/teacher-management.js` (candidates + categories + availability windows — derived from existing
entities, NO computed/pay values); AR+EN keys in `ar/en.trn.js`; reuse `common.backendRequiredNote`; no new CSS
expected. **Pay/finance EXCLUDED** (omit Salary/Payout fieldsets; pickers show name/subjects/workload only; no
compensations tab; `rating` field stays unsurfaced): Compensations/Salary/Accounting/Salaries/Payouts→030 ·
Payout-Providers/Login-as/Reset-password→future-backend · Teacher/Class-Feedback→029 · session-reassign→026 ·
teacher-portal salary→excluded FOREVER. Teacher-performance stays display-only (NO computed score/rank/chart).
Role laws binding: teacher portal pay-free (16 files byte-identical since `e4ee3cd`; `teacher-performance.html` is
the sanctioned admin exempt board — NOT grepped to 0, never linked from the portal) · family zero-pay · student
child-view · admin finance Spec-009 invariant · all Spec-026/027 protections. Baseline re-verified green (build 97).
Next: `/speckit-tasks`.
**History: Spec 028 SPECIFIED** — Artifacts at
`academy-dashboard-discovery/specs/028-admin-teachers-performance/` (spec · visual-grounding ·
legacy-teacher-performance-coverage · current-teacher-action-inventory · missing-action-register (T-A…T-W) ·
teacher-entity-scope · performance-metric-scope · modal-and-page-scope · future-owner-register ·
pay-finance-exclusion-register · checklists/requirements). **Spec 027 is the committed baseline (HEAD `f10cc56`;
97 public HTML; working tree clean).** Grounded via a 6-agent read-only audit (current teacher source · legacy
directory/details · categories/timetable · pay-finance · teacher-portal protection · 027 M-N handoff). **Key
finding**: the admin teacher surfaces (`teachers`/`teacher`/`teacher-performance`) are ALREADY honest after Spec
026 but SHALLOW — the same starting condition Spec 027 found. **028 = deepen + complete the M-N handoff**: teacher
card kebab (absent — mirror the 027 studentMenu via the EXISTING `data-row-menu` hook) · Edit/Add-note modals ·
status lifecycle confirms (On-Vacation/Deactivate/Activate/Delete) · **course/group assign-teacher → single-teacher
display-only picker drawer → backendRequired** (replaces the inert `off()` gates) · teacher-category Create/Edit
modal + assign-members drawer (GROUNDED; nav stays planned like familyCategories) · availability-window editor
drawer (day/time rows, no invented recurrence). Every write ends backendRequired; reuse the CLOSED Spec-026 `data-*`
set (+ 027 drawer-picker/kebab precedents) — NO new hook/storage key/engine/page. **Count default 97**; the ONE
open decision (in `/speckit.plan`) = all-teachers-timetable → fold into `schedule.html` "by teacher" view (0 pages,
Spec-026 fold precedent) vs a legacy-justified new page. **Pay/finance EXCLUDED**: Compensations/Salary tabs ·
Salary/Payout create-form fieldsets · Accounting/Salaries/Payouts boards → 030; Payout-Providers/Login-as/
Reset-Password → future-backend; Teacher/Class-Feedback → 029; teacher-portal salary → excluded FOREVER (teacher
pay-free GLOBAL); session-reassign → 026. Teacher-performance stays display-only (NO computed score/rank/chart).
Role laws binding: teacher portal pay-free (16 files byte-identical since `e4ee3cd`; teacher-performance.html is the
sanctioned admin exempt board) · family zero-pay · student child-view · admin finance Spec-009 invariant · all
Spec-026/027 protections. Next: `/speckit.plan`.
**History: Spec 027 — Admin Families / Students / Courses / Groups Deep Management is IMPLEMENTED and COMMITTED**
(HEAD `f10cc56`; artifacts + `tasks.md` (57 tasks) + 20 contracts at
`academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/`). **Count HELD 97 → 97 — ZERO new
pages**: every delta a modal/drawer/picker/row-kebab/tab/gate on the existing 9 management pages. Resolved
M-A…M-M + M-R/M-S: Edit family/student/course/group + Add-child + Add-note + family-category reclassify = honest
`data-modal-trigger` backendRequired modals; enroll-in-course / assign-to-group / move-between-groups /
add-students(course·group) = display-only candidate-list `data-drawer` pickers (`stu-enroll`/`stu-assign`/
`stu-move`/`crs-enroll`/`grp-assign` + the `fam-cat` reclassify preview) baked as `<template data-preview>` with a
clickable `data-disabled-reason` backendRequired final (NO persisted selection, NO roster mutation);
create-group-from-course = modal; **students-table row kebab (M-I, was 0)** = a new `studentMenu` builder in
`enhance.js` routed by the EXISTING `data-row-menu` dispatch (one `'student'` branch mirroring `familyMenu` — NOT
a new hook) → View real · Edit modal · Suspend/Remove confirm; suspend-student = `data-confirm`; cross-family
transfer + schedule-search = honest gates (no invented fields); Results/Evaluation kept display-only (**no computed
score/rank/chart** added). New display-only fixture `fixtures/management.js` (picker candidates derived from
existing entities — no computed/pay values); AR+EN keys under `ar/en.fam.js` (fam/stu/res/eval) + `ar/en.crs.js`
(crs/grp), reusing `common.backendRequiredNote`; **no new CSS** (pickers reuse `sheet-*`, kebab reuses `icon-btn`).
Route-out kept as honest gates: assign-teacher→028, message→026/future, print/export→029, billing/plan→030 (family
plan literal stays single-value/no-math), materials→031, login-as/reset→future-backend. **Verified**: build 97;
smoke PASS (96 loads; +83-line additive amendment — payHit/famPay/payFigure/child-view/admin-finance + the 026
action-completion asserts byte-verbatim); a11y critical=0 serious=0; 187 screenshots 0 console errors. Only the 10
detail/list HTML changed (course/family/group/student/students ×2); families/add-family/courses/groups + all portal
+ admin-ops (sessions-analysis/public-holiday/scheduled-actions) + index byte-identical; `package.json` 0-diff; no
new hook/storage key/engine/dependency/page. Role laws green: family zero-pay, student child-view (no «لوحة
الطالب»), teacher pay-free (reference only), admin finance Spec-009 invariant. Next: watcher commit.
**History: Spec 027 SPECIFIED/PLANNED** — Spec 026 was the committed baseline (HEAD `a0189d0`; 97 public
HTML; working tree clean). Artifacts at `academy-dashboard-discovery/specs/027-admin-families-students-courses-groups/`
(spec · visual-grounding · legacy-family-student-course-group-coverage · current-management-action-inventory ·
missing-action-register (M-A…M-V) · entity-relationship-scope · modal-and-page-scope · future-owner-register ·
checklists/requirements). Grounded via a 3-agent read-only audit (legacy families/students · legacy
courses/groups/relations · current 9-page inventory). **Key finding**: the 9 management pages
(families/family/add-family/students/student/courses/course/groups/group) are ALREADY honest after Spec 026
(0 dead buttons, 0 `href="#"`, 0 fake finals, confirm finals backendRequired) but **SHALLOW on deep
management**. Spec 027 = deepen + complete: **M-A…M-M** (upgrade Edit family/student/course/group + Add-child
+ Add-note from shallow toast/modal → richer modal/drawer; add enroll-in-course + assign-students-to-group +
move-student pickers; add the students-table row kebab [absent — families has 16, students 0]; suspend-student;
family-category reclassify; create-group-from-course) + grounded thin surfaces **M-R/M-S** (studentResult/
studentEvaluation display-only, NO computed score/chart; scheduleSearch availability preview = gate). Every
027 write ends at a backendRequired final; reuse the CLOSED `data-*` set (Spec-026 `data-modal-trigger`+
`data-modal-title-key`/`data-modal-note-key`, `data-confirm`, `data-drawer`, `data-disabled-reason`, `data-tab`,
`data-filter`) — NO new hook/storage key, NO fake persistence. **Route out**: assign-teacher persistence→028,
message→026/future, print/export→029, billing/plan persistence→030 (family-portal stays figure-free; the
family.html admin **plan hour-rate literal** «سعر الساعة ٨٠ ريال/ساعة· عرض فقط» is a Spec-004/009-sanctioned
admin-only single-value literal, distinct from the family-PORTAL zero-pay line — keep single-value/no-math),
feedback/analytics→029, materials/subjects→031, impersonation→future-backend. Teacher = reference only (deep
mgmt=028). Count default **97** (deepen via existing pages/modals/drawers; a new page must be legacy-justified
+ build-verified in planning). Role laws binding (family zero-pay portal · student child-view · teacher pay-free ·
admin finance Spec-009 invariant · all Spec-026 action-completion protections). Next: `/speckit-plan`.
**History: Spec 026 — Admin Control / Sessions / Operations + Global Action Completion Pass is IMPLEMENTED** (awaiting the watcher commit; artifacts + tasks + 20 contracts at
`academy-dashboard-discovery/specs/026-admin-control-sessions-operations/`). **91→97 HTML.** **Layer A**:
built 3 admin ops pages (sessions-analysis · public-holiday · scheduled-actions, AR+EN; new `pages/*.js` +
`fixtures/*.js` authored via a parallel workflow; new `ar.ops.js`/`en.ops.js` locale module registered in
i18n.js) — display-only authored boards/lists, every write an honest `backendRequired` gate, no
score/chart; folded total-queues→sessions + schedule-requests→schedule (new `ops-bands.js` +
`fixtures/ops-bands.js`, 0 new pages); flipped 3 nav items planned→implemented (`nav.config.js`; other 5
stay planned gates); registered 3 pages in build-html. **Layer B (global action completion)**: the core
honesty change is `enhance.js` — `acknowledge()` now says «يُتاح بعد ربط الخادم»/"available once the server
is connected" (killed «إجراء تجريبي»/"preview action" globally) + `openModal()` generalized to read
`data-modal-title-key`/`data-modal-note-key` (reuses the EXISTING `data-modal-trigger` — NO new dispatch
hook, NO new storage key). Create/Add primaries (New-session ×2, Add student/teacher/course/group, wizard
Save, add-child) → honest backendRequired modal; **78 toast rewordings + 12 confirm-body rewordings** →
"available once the server is connected" (deterministic Node script; never «تم…»/"saved/done/(demo)");
**DU-20** dashboard fake Apply/Clear/select-btn filter removed (Option B) → New-session modal + real "view
all sessions" link. **Verified**: smoke PASS (96 loads); a11y 0/0; `href="#"`=0; 0 fake-success toast in
any built page; teacher pay-free (portal 0 tokens; teacher-performance=B-07 admin board), family zero-pay,
student child-view, admin finance Spec-009-invariant (finance «رواتب» nav byte-identical to HEAD) all green;
portal 49 files + index byte-identical; package.json 0-diff; no new dependency/engine. One sanctioned smoke
amendment (3 pages + action-completion asserts; DU-20/DU-07 assertions updated to the new honest behavior). Spec 025 is the committed baseline (HEAD `e4ee3cd`;
91 public HTML, working tree clean). Artifacts at
`academy-dashboard-discovery/specs/026-admin-control-sessions-operations/` (spec · visual-grounding ·
legacy-admin-ops-coverage · current-action-inventory · dead-ui-register · admin-ops-page-scope ·
modal-and-gate-scope · future-owner-register · checklists/requirements). **Two layers**: **Layer A** =
admin ops (sessions·timetable·attendance·outcomes·cancellation/reschedule·daily-ops·cross-links),
grounded ONLY in legacy evidence — the eight planned nav items (`nav.config.js:27-34`: sessionsAnalysis·
messages·leads·tasks·announcements·timeConverter·publicHoliday·scheduledActions) + two folds
(total-queues, schedule-requests inbox); done pages dashboard/sessions/schedule/attendance deepen
session-lifecycle modals; core new-page candidates = sessions-analysis·public-holiday·scheduled-actions
(display-only/list, writes gated). **Layer B** = Global Action Completion audit over ALL 91 pages. Grounded
finding via a 3-agent read-only audit: **ZERO truly-dead controls** (0 `href="#"` sitewide; catch-all
`toast(acknowledge)`; planned nav = honest `data-coming-soon`; portal 49 files fully action-complete &
honest, role laws re-swept green). The real work = **reclassify admin «preview action» `data-demo-action`
toasts on persistence-implying actions → honest `backendRequired` finals** (Tiers 1–4: ~9 Create/Add
primaries + ~8 shared components [appointment/outcome drawers, row/family kebab, teacher/course-group/
finance actions, settings, wizard] + confirm→success writes reworded + the dashboard "Today's Sessions"
apply/clear-filter widget wired-or-reworded), reusing the CLOSED `data-*` hook set (NO new hook/key).
Cross-page honesty inconsistency is the argument: finance Create-invoice/Export + student Add-course are
honest `data-disabled-reason` gates while Add student/teacher/course/group + New-session + Print are
`data-demo-action` preview toasts. Excluded-by-law: fake live room/direct-links (G13), pay-signal «Fine»/
«unpaid» tint (M-14), computed «Average» (M-13), fake chat (M-02). Count policy: 91 now; +6 if the 3 core
ops pages build (→97); EXACT count fixed in plan + build-verified. Role laws binding (teacher pay-free ·
family zero-pay · student child-view · admin finance Spec-009-invariant, zero salary/payroll figures).
Next: `/speckit-plan`. **History: Spec 023 — Full Legacy Coverage Audit 000–022 is DELIVERED** (audit-only; awaiting
the watcher commit). Renamed from "000–020" to **000–022** because the audit baseline is the full
delivered set incl. Spec 021 (role-model correction) + Spec 022 (living rework). **Specs 020/021/022
are the committed baseline** (HEAD `837b0c1`); the audit made NO app changes. Twelve evidence-based
artifacts under `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/` (spec ·
visual-grounding (25-area) · legacy-inventory · current-app-inventory · **coverage-matrix** (admin 44
caps folding 300 captures + family 13 + teacher 17 + hub/shell) · current-vs-legacy-map ·
missing-capabilities-register (M-01…M-16: **0 P0**, 6 P1, 2 P2, 1 P3, 7 excluded-by-law) ·
extra-or-drift-register (X-01…X-49: **0 remove**, drift verdict NO) · design-quality-register
(D-01…D-15) · role-model-consistency-audit (**9/9 PASS** + F-00-1) · **correction-backlog-for-024**
(B-01…B-18) · agent-findings/00–10). VERDICT: the rebuild is traceable to legacy and NOT drifting;
family strongly covered (020/022), student-as-child-view correct (021), teacher home improved +
internals planned for 025, admin complete-and-sequenced (43 future items re-verify the 016 57-row
inventory EXACTLY). **Confirmed defect F-00-1** = leftover «لوحة الطالب — النسخة الأولى» noteT/noteD
on 6/7 child-view pages (`ar.prt.js:297-298`/`en.prt.js:294`) → **B-01 Must fix in 024** with declared
hash supersession. **Spec 024 — Corrections From Legacy Coverage Audit is IMPLEMENTED** (awaiting the
watcher commit; artifacts + `tasks.md` + `correction-status.md` at
`academy-dashboard-discovery/specs/024-corrections-from-legacy-coverage-audit/`). Closed B-01…B-11 of
the Spec 023 backlog (correction/alignment only — NO new pages/backend/fake behavior; **77 HTML held**;
no new hook/storage key). **B-01** reframed the child-view note «لوحة الطالب»→«عرض الابن» (ar
`prt.stu.noteT/D`, en) + rebake of 6 child-view pairs + a DECLARED 022 extraction-hash supersession
(10/12 internal-body hashes; student-schedule untouched) + a smoke guard (child-view body ≠
«لوحة الطالب|بوابة الطالب|student dashboard»); family/teacher role notes byte-unchanged. **B-03** added
an honest role-shell notifications bell reusing `data-action="notifications"` (no dot/count, no new
hook, admin gate untouched). **B-05** added one planned teacher `library` «مكتبتي/Library» nav item
(non-anchor; smoke teacher nav 7→8; `plannedNavAnchors===0` held). **B-11** pure-CSS density: D-06
dark role-tinted idHero (theme-aware), D-08 hub 2-up, D-13 mobile topbar de-wrap (D-04/D-05/D-09
deferred — pinned bodies). Records: **B-02** Locations→031, **B-04** live-room→future-backend, **B-06**
teacher chat→future (owner 025, no nav item), **B-07** pay-free exemption for the pre-existing Spec 007
admin teacher-performance board (grep NOT weakened; 025 repoints the anchor), **B-08/B-09** exclusion +
finance-boundary provenance in README/CLAUDE, **B-10** rail verified MOVED-not-deleted (prep-hint →
flowStrip «التحضير»), family-children no-fold-link recorded intentional. **Finance boundary (B-09,
binding)**: authored admin invoice-amount literals are Spec-009-sanctioned (zero aggregate/math,
admin-only); salary/payroll/compensation/payout FIGURES never allowed anywhere; family/teacher stay
figure-free. **Spec 025 — Teacher Internal Pages is IMPLEMENTED** (awaiting the watcher commit; artifacts
+ tasks + 18 contracts at `academy-dashboard-discovery/specs/025-teacher-internal-pages/`). Built the 7
teacher internal pages (schedule·students·outcomes·tasks·reports·profile·library, each AR+EN → **77→91
HTML**) from the existing living primitives + retained TEACHER_PREVIEW fixtures (7 new `teacher-*.js`
modules, authored via a parallel workflow; all new copy under `prt.tch.pg.<page>.*`, mirrored ar/en).
Flipped the 7 planned ROLE_NAV.teacher items→implemented (**navListAnchors 1→8**, plannedNavAnchors===0,
shell-anchor multiset 5→19 — teacher is now a full role app like family); build-html registers the 7
pages ONLY. **Repointed the teacher-home performance anchor `teacher-performance`→`teacher-reports`**
(`teacher-portal.js:70`), closing the Spec-024 B-07 admin-shell adjacency; smoke anchor assert re-pinned.
Pay-free GLOBAL verified 3-layer (source incl. comments + built + smoke `payHit` byte-verbatim; reports
is academic-only — authored counts + rubric dimension lines, NO chart/score); live-room + availability +
save/submit + export + upload/download + the 3 profile write gates are honest backendRequired gates;
**no teacher chat page/nav** (B-06→026). Smoke PASS (90 loads); admin+index+family+student byte-identical
(only teacher-portal pair changed); package.json/enhance.js/topbar.js/portal-shell.js/nav.config.js
0-diff. Smoke rescope added a TEACHER_INTERNAL set + the teacher nav/body asserts (one sanctioned
amendment; payHit/famPay/admin asserts byte-verbatim). **Spec 022 —
Living Dashboards Experience Rework is IMPLEMENTED** (awaiting the watcher commit): the hub + the
three role homes became LIVING cockpits and the corrected role model landed. Five shared living
primitives added to `portal-page.js` (**idHero · dayRail · storyRow · flowStrip · guidePanel** —
append-only; the six pre-existing exports byte-identical) over an additive `app.css` living layer
(`.pt-idhero/.pt-rail/.pt-story/.pt-flow/.pt-guide`; ALL motion — `lv-fill/lv-fadeup/lv-pulse` —
quarantined in ONE `prefers-reduced-motion: no-preference` block, smoke-audited; `.pt-hero` stays the
hub's). **Corrected role model** (Spec 021 DEC-001/002/004): hub = 2 primary role cards [family,
teacher] + admin console + **1 demoted child-view preview** (→ student-portal); the student shell
reframed «بوابة الطالب»→«عرض الابن» / «طالب»→«ابن العائلة» PURELY at the locale layer
(`prt.portal.student`/`prt.role.student`/`prt.title.student`), so the **six student internal MODULES
got ZERO touches and their `#page-body` stayed BYTE-EQUAL** (12 extraction-hash proofs). `family-child`
gained the ONE sanctioned fold-point link (body anchors 5→6; new baseline body md5 recorded — declared
supersession of the 020 hash). **family-children NOT touched** (per-child child-view links REJECTED as
dishonest — the preview persona is st1/سلمان only; byte-identical). Identity **55/77** (22 rebakes:
hub·family-portal·teacher-portal ×2 + student ×14 + family-child ×2); 40 admin + index + the other 6
family internals byte-identical; portal-shell/enhance/nav.config/build-html/package.json 0-diff.
ONE smoke amendment (kpiCards 4→0 + idHero/railStops/flowSteps/storyRows probes + hub 2-card re-pin +
childView probe + family-child +1-anchor re-pin + reduced-motion CSS audit); **payHit + both
payFigure/famPay regex lines + ALL admin asserts + FAMILY_INTERNAL/STUDENT_INTERNAL branches
BYTE-VERBATIM**; smoke 76 loads green · teacher pay-free three layers green · family zero-pay green on
all 18 bodies. Artifacts: `academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/`
(spec · plan · research D1–D24 · data-model · quickstart · 16 contracts).

History: **Spec 022 mission** — transform hub + role homes from static card galleries into living
educational cockpits AND land the corrected role model, under ALL standing laws. **The Living
Design System (6 shared primitives)**: `pt-hero` role identity band (gradient wash + avatar +
2–3 contextual counters; NEVER pay data) · `pt-rail` living day timeline (now pulses/next
emphasized/done dims; child/room tags) · `pt-story` status story rows (number + narrative + real
link — replaces KPI tiles) · `pt-flow` teacher prepare→attend→record→review strip · `pt-guide`
guided gate panels (still non-interactive) · joy/motion layer (C10's proven وسام/celebration
language scaled up; pure CSS; `prefers-reduced-motion` honored; NO JS animation engine). Surfaces:
portals hub (3 primary cards + admin + DEMOTED child-view entry) · family-portal (violet guardian
cockpit) · teacher-portal (teal teaching cockpit, PAY-FREE extended set) · student pages =
**Option B+** (all 7 reframed «بوابة الطالب»→«عرض الابن»; home also adopts hero/rail/story; six
internals copy-reframe ONLY; Option C rejected) · family-child + family-children fold-point links
(«افتح عرض الابن الكامل») — the ONLY family-internal body change. Protections: 40 admin + index
BYTE-IDENTICAL · payHit + zero-pay regex lines + admin asserts BYTE-VERBATIM · ONE sanctioned smoke
amendment · ceilings re-pinned ±10% tunable · closed hook set (NO new hooks/keys) · zero deletion
(ROLE_NAV.student structurally untouched). Artifacts:
`academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/` (spec.md ·
visual-grounding.md (16 frames incl. L9/L10 legacy day surfaces + C8/C9/C10 mobile/dark/progress) ·
dashboard-diagnosis.md (10 answers) · role-reclassification-scope.md · checklists/).

History: **Spec 021 — Role Model Audit** (audit-only, delivered): legacy = THREE logins (Admin ·
Teacher · Family/Guardian at `/student/*`; NO student role — folder/inventory/pixel-proven; persona
Salman IS fam1's child st1). DEC-001…009 binding: student demoted (no deletion) · 019 pages
preserved as child-view · family owns the child journey · sequence 022 living rework → 023 coverage
audit → 024 corrections → **025 Teacher Internal Pages** → 026–031 admin groups → 032 final QA.
Artifacts: `specs/021-role-model-student-reclassification/` (visual-grounding L1–L8/C1–C7 ·
role-model-decision · current-vs-legacy-map).

History: **Spec 020 — Family / Guardian Internal Pages is IMPLEMENTED** (awaiting the watcher commit):
seven new page pairs `family-{children,schedule,progress,billing,requests,materials,profile}(.en).html`
(63→**77** built; **59/77 hash-identical**) · seven `ROLE_NAV.family` flips · the home quick-tiles
honesty fix (home body anchors 5→**12**) · **family-child preserved as the drill-down** (`#page-body`
extraction hash BYTE-EQUAL both languages) · billing STATUS-FIRST under the zero-pay hard line
(hour-quota 40/12/28 · amount-free invoice rows · the verbatim payFigure regex green on ALL 18 family
bodies) · build touch = 7 imports + 7 entries (purely additive, zero drift on the 63 pre-existing
files — proven) · smoke **76 loads** green · student/teacher/hub/admin branches + payHit + the
original zero-pay lines held BYTE-VERBATIM. Plan and 17 contracts:
`academy-dashboard-discovery/specs/020-family-guardian-internal-pages/plan.md`
(see also `research.md` (D1–D20), `data-model.md`, `quickstart.md`, `visual-grounding.md` (27/27), and `contracts/`).

History: **Spec 019** (commit `8d3d561`) delivered the six student internal pages (51→63; 49/63 identity;
nav flip + quick-tiles honesty fix + `portal-page.js` + the build `activeId` pass-through; ceiling
[500,2200] on internals).

History: **Spec 018** (commit `fe47f68`) delivered the COMPACT admin-like role homes (5 bands each,
≈1,428/1,753/1,486px @1366×768, down from ≈3,600/4,200/4,390; ceiling smoke-pinned) + the NEW
`family-child(.en).html` drill-down (five baked fam1 panels st1/st6/st11/st12/st13, pure-CSS `#child=stX`
`:target` switching, family home bodyAnchors===5); identity 43/51; displaced 013/014/015 fixtures/keys
RETAINED for 019–021. Spec 017 = `0edafe1` (Shell v2) · Spec 016 = `2b8bb84` (law).

**Spec 018 (the user's binding verdict)**: the three role HOMES are too long/portal-like → rework into
COMPACT admin-like dashboards inside the untouched Shell v2 — the 7-band recipe (compact header · 4-KPI
row (`num()` fixture literals) · now band (today ≤3 + next) · role-core (student homework snapshot ·
family CHILDREN CARDS w/ real drill-down links · teacher follow-up board) · ONE preview band · quick-link
tiles · one-line note), HARD CEILINGS smoke-asserted (sections 4–7 · scrollHeight ≤2,200px @1366×768,
±10% tunable-recorded) — the endless page can never return. **NEW `family-child(.en).html`** (the ONE
sanctioned build-html.mjs touch = 2 lines: import + PAGES entry): five BAKED child panels for the REAL
fam1 roster **st1/st6/st11/st12/st13**, existing data-tab/hash machinery, default st1, deep links
`#child=stX`; family home bodyAnchors 0→**5** exact child targets; the child page: shell registry
{family-portal, portals}×5, body 0, zero-pay regex applies. **Displacement map is law** — zero capability
deletion; displaced fixtures/keys RETAINED (grep-audited) for Specs 019–021. ONE sanctioned smoke
amendment re-scopes the 013/014/015 long-home branches (KPI===4 + window + ceiling; family anchors===5;
teacher anchors===1 KEPT) + adds the family-child branch (50 loads) — **payHit + family zero-pay regex +
ALL Shell-v2/hub/admin asserts BYTE-VERBATIM**. Identity target **43/51** (40 admin + index + hub pair;
built = 51 files). Teacher pay-free EXTENDED set re-runs all three layers. Sequence renumbered
(user-directed, append-only amendment to the 016 sequence artifact): **019 Student pages · 020 Family
pages · 021 Teacher pages · 022–027 admin groups · 028 Final QA**.

**Spec 016 is BINDING LAW for all Specs 017–027** (committed docs at
`…/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/`): the role-dashboard IA
(the three portals are Role Dashboard HOMES — kept filenames; full apps = mini-apps with role
sidebars), the design freeze (+ forbidden-pattern register + change control), the honesty/
backendRequired contract (four action classes, four gate patterns, the no-fake register), the
**teacher pay-free GLOBAL contract** (the entire `teacher-*` family forever), the legacy coverage
matrix (178 templates, zero uncategorized), the admin sidebar inventory (57 rows → Specs 021–026),
and the sequence 017–027 with Spec-027's eight machine-checkable no-missing rules.

History: Spec 017 (`0edafe1`) delivered **Portal Shell v2** — role topbar + desktop `aside.pt-sidenav`
(identity block · ROLE_NAV items · hub exit) + native mobile `details.pt-nav-drawer` (freeze amendments
A1 native-disclosure + A2 no-collapse) on the three role pages; ROLE_NAV registries (7/8/7, home=real
self-link `aria-current`, futures=planned «قريبًا» BUTTONS, zero new hooks/pages); all nav OUTSIDE
`#page-body` (home content proven byte-equal); sanctioned-anchor registries smoke-pinned (shell
{self,hub} multiset 5); 41/49 identity held. Spec 015 (`20dc089`) delivered the TEACHER home — 14 sections (real out15/out4 follow-ups,
5-step workflow + A2 gate notes «تسجيل الغياب…»/«طلب إلغاء أو تعويض…», recent-sessions slice out1/out11,
SAT/MON/TUE day-groups + truthful free-days empty, rubric lines, ONE sanctioned body anchor →
`teacher-performance(.en).html`), planned register {outcomeSave/matUpload/availabilityEdit:
backendRequired, taskManage: planned}, three-layer pay-free enforcement; coverage §9 (27 T-rows).
Spec 014 (`0d144aa`): FAMILY home — 12 sections, zero-pay regex, PORTAL_PLANNED.family 2+2;
coverage §8. Spec 013 (`86729a9`): STUDENT home — 13 sections, gauges, PORTAL_PLANNED.student 2+1;
coverage §7. Spec 012 (`5bcf490`): portal layer + hub + `ar,en.prt.js` overlay + payHit assert +
the 39-page legacy coverage artifact. Spec 011 (`e7ee011`): zero `href="#"` STANDING. Spec 010
(`0ee1965`): coverage matrix/nav IA/chip-tone guard. Prior plans under `…/specs/0NN-*/plan.md`.

Hard constraints (Specs 001–016, all carried + binding): the ADMIN console continues the approved
design (six-category rail); **static HTML-first** — complete pre-rendered `public/*.html` per
language, NO whole-page `#app`, all content baked at build, enhancement only via the CLOSED
`data-*` hook set — NO new hook, NO new storage key; relative paths; GitHub-Pages compatible;
Django-template-ready; Arabic RTL first + English LTR; Light/Dark/System; ALL status/signal chips
labeled icon+text; native JS; no CDN/TypeScript/SPA/chart/table/form/calendar libs; fixtures only —
no real API/auth/permissions/CRUD/persistence; NO engine of any kind; NO computed
score/rank/leaderboard/percentile/chart; ALL salary/payroll/compensation/payout math OUT of scope —
zero pay figures anywhere; reports body finance-free FOREVER; finance body Spec 009-invariant; zero
`href="#"` sitewide; no copied legacy assets/classes/palette/wording/status codes; screenshot-based
visual acceptance. **Portal rules (Specs 012–017, standing)**: role apps are a SEPARATE surface —
never the admin shell, never in admin nav; personas = st1/fam1/sara until real auth
(backendRequired); every number authored; every action one of the four honest classes; planned nav
items are labeled non-links, never anchors; the sanctioned-anchor registry pins every portal page's
link inventory; the family app carries ZERO currency/pay figures; **the teacher app is PAY-FREE
GLOBALLY** (extended token set incl. أتعاب/فلوس/دولار/money/currency, copy AND comments, no route to
any pay surface — three-layer enforced). Future: 018 student pages · 019 family pages · 020 teacher
pages · 021–026 admin families per the 016 sidebar inventory · 027 final no-missing QA.
<!-- SPECKIT END -->
