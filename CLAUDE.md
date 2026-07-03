<!-- SPECKIT START -->
Active feature: **Spec 015 — Teacher Dashboard**
(branch `feature/012-role-portal-foundation`; Spec 014 = commit `0d144aa`, 49 built pages).

For technologies, project structure, shell commands, design decisions, contracts,
and acceptance, read the current plan and its artifacts:
`academy-dashboard-discovery/specs/015-teacher-dashboard/plan.md`
(see also `research.md` (D1–D16), `data-model.md`, `quickstart.md`, and `contracts/` — 17 contracts).

Spec 015 upgrades the Spec-012 teacher foundation (`teacher-portal(.en).html`, persona **sara** — math/grp1)
into the full ONE-PAGE teacher daily cockpit — NO new pages, NO new source files by default. **THE HARD
RULE: pay-free by construction** — the legacy salary hero (`Your Salary`/EGP/Estimated/Fines/Bonus) and all
pay pages (T2/T17/T18/T19) stay backendRequired, NEVER rendered; zero pay vocabulary in copy OR comments
(word-bounded EN salary|salaries|pay|payouts?|earnings?|compensation|bonus|fines? + AR
راتب|رواتب|أجر|مستحقات|غرامة|مكافأة) + zero currency tokens (EGP/SAR/USD/ريال/ر.س/جنيه/$€£); the Spec-012
smoke payHit assert stays BYTE-VERBATIM and must pass on the deepened body; sara's numeric `rating`/`util`
are display-suppressed (labeled signals only — NO computed score). **Composition (14 sections, research D1 +
pre-implementation amendments A1/A2, binding — DELIVERED)**: pay-free hero (today summary + plain-text hint) · today's schedule (sara's SESSIONS_FULL rows +
authored student counts from `present` via num()) · next class (prepare hint + backendRequired live note,
never join-styled) · **follow-up board** (D3: REAL outcome refs — out15 st11 studentAbsent+followUp w/
`data.att.fb.support` · out4 st7 teacherAbsent/make-up — real outcomeChips + gentle framing + reassurance) ·
my students (grp1 roster st1/st6/st11/st13 via `studentsOfTeacher`, display-only, NO links, NO percentages) ·
**outcome workflow** (D5: 5 display-only flowSteps — attendance·remark·summary·homework·files, the
capture-verified `classes-end` order — + «حفظ نتيجة الجلسة» backendRequired gate + the A2 mark-absent gated
note «تسجيل الغياب يحتاج تفعيل الخادم.»; NO form controls) · **recent sessions** (A1 — the T20/T21 slice:
2 cards, REAL out1 + out11 refs, real outcomeChips + homework-note lines, no route/modal) · tasks
(3 authored cards + «إدارة المهام» planned gate) · materials (3 authored cards + «رفع وتنزيل الملفات»
backendRequired gate) · **timetable/availability** (D8: `scheduleOfTeacher` SAT/MON/TUE day-grouped agenda +
the TRUTHFUL free-days `.pt-empty` «الأربعاء والخميس — بلا حصص» D12 + «تعديل التوفّر» backendRequired gate) ·
monthly rubric (5 dimensions as display-only `.pt-lines`, NO answer scales/rating visual, inline
backendRequired chip) · requests & performance (certificate preview + inline backendRequired chip + the A2
cancel/reschedule gated note «طلب إلغاء أو تعويض الحصة يحتاج تفعيل الخادم.» + **the
ONE sanctioned page-body link** D11: «فتح لوحة الأداء» → `teacher-performance(.en).html`, smoke pins
bodyAnchors===1 with exact target) · account slice (name/subject/status/avail chips + backendRequired edit
note) · closing note (Spec-016 pointer). **Change surface (scope-guard G1)**: `pages/teacher-portal.js` ·
`fixtures/portal.js` (NEW TEACHER_PREVIEW + PORTAL_PLANNED.teacher re-registered to {outcomeSave/matUpload/
availabilityEdit: backendRequired, taskManage: planned}, count 2→4, smoke asserts 3 amber + 1 neutral) ·
`ar/en.prt.js` (`prt.tch.*`/`data.prtTch*` ONLY — shared prt.shell/portal/role/hub + sibling
prt.stu.*/prt.fam.* + data.prtStu*/prtFam*/prtNote* FROZEN) · tiny namespaced CSS (013/014 primitives
.pt-empty/.pt-day/.pt-lines/.pt-tag/.pt-stat/.pt-prof-row/.pt-card-chip REUSED read-only) · tests (smoke
TEACHER-branch re-scope D13: sections≥10, empty≥1, bodyAnchors===1+exact-target, formControls===0, planned
3+1 tones, tables 0 + 390px probe generalized; **student/family branches + admin/hub asserts + the payHit
assert BYTE-VERBATIM**) · a11y/capture additive (NEW teacher ar/dark base frame + element-scoped area
frames) · docs + coverage **§9 delivery notes ONLY** (all 27 T-rows; pay rows stay backendRequired).
**Acceptance ceiling: 47/49 built files hash-identical to HEAD** — only the teacher pair changes. 14+
frames (4 experience + area close-ups + 4 unchanged proofs). MVP = fixtures/locales → Band A
(hero/today/next/follow-up) → teacher smoke re-scope green (D16).

Spec 014 (`0d144aa`) delivered the FAMILY dashboard: 12 sections (hero/5-children inline no-switcher/today
child-associated/signals band w/ real out15+out12/notes/history mirror/subscriptions label-only/billing
STATUS zero-figures + backendRequired gate/requests hub (4 preview cards, no-replacement caution, rubric
lines, truthful meetings `.pt-empty`, trial tiles — NO form controls)/materials/account/note);
PORTAL_PLANNED.family = {billingGate/matDownload: backendRequired, fullHistory/meetingRequest: planned};
smoke family branch: 5 progress bars, zero-pay regex (ريال|ر.س|SAR|USD|جنيه|EGP|$€£|ادفع|سداد|pay
now|payment|amount|price|مبلغ|سعر|رسوم), bodyAnchors===0, formControls===0; coverage §8. Spec 013
(`86729a9`) delivered the STUDENT dashboard: 13 sections (week agenda F5 + Friday `.pt-empty`, homework/
materials graduated w/ backendRequired gates, ٧٨٪ gauge+trio, celebration unordered, F6 history w/ real
out1); PORTAL_PLANNED.student = {hwSubmit/matDownload: backendRequired, fullHistory: planned}; smoke student
branch: gauges≥2, sections≥10, empty≥1, bodyAnchors===0, 2 amber+1 neutral; coverage §7. Spec 012
(`5bcf490`): the portal layer — shell/hub/three foundations/`ar,en.prt.js` overlay/`.portal-shell` CSS/
`legacy-role-capability-coverage.md` (39 legacy pages, seven-way scheme; pay surfaces backendRequired NEVER
previewed)/smoke portal-absence re-scoped to the 20 admin bases + PORTAL_PAGES block; 40 admin files
byte-identical. Spec 011 (`e7ee011`): zero `href="#"` STANDING. Spec 010 (`0ee1965`): coverage matrix/nav
IA/filter-visibility/chip-tone guard. Prior plans: `…/014-family-guardian-dashboard/plan.md`,
`…/013-student-dashboard/plan.md`, `…/012-role-portal-foundation/plan.md`,
`…/011-final-qa-demo-readiness/plan.md`, `…/010-capability-coverage-ia-polish/plan.md`,
`…/009-finance-billing-payments/plan.md`, `…/008-academic-reports-analytics/plan.md`,
`…/007-teacher-performance-kpis/plan.md`, `…/006-courses-groups-learning-paths/plan.md`,
`…/005-attendance-session-outcomes/plan.md`, `…/004-family-student-profiles/plan.md`,
`…/003-timetable-scheduling/plan.md`, `…/002-admin-core-operations/plan.md`,
`…/001-approved-dashboard-foundation/plan.md`.

Hard constraints (Specs 001–014, all carried + binding): the ADMIN console continues the approved design
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
wording/status codes; screenshot-based visual acceptance. **Portal rules (Specs 012–014, standing)**: role
portals are a SEPARATE surface — portal items FOREVER absent from the admin console; the portal layer never
looks like the admin console or the legacy portals; personas = existing fixtures; every portal number
authored; every action one of the four honest classes; planned cards labeled, figure-free, never anchors;
portal page bodies contribute ZERO anchors (student/family) with the teacher-performance link as the ONE
sanctioned teacher exception; the family page carries ZERO currency/pay figures (machine-asserted); the demo
hub is the only entry. **Spec 015 adds**: the teacher page is the ONLY portal surface that may change;
sibling portals + hub + admin = byte-identical acceptance; shared + sibling locale keys frozen; the teacher
page is PAY-FREE in copy AND comments (three-layer enforcement: source grep + built grep + the verbatim
smoke assert) with zero form controls and exactly one sanctioned body link; no computed rating/score ever;
operations/communications shell = Spec 016; admin missing modules = Spec 017; final full-product QA = Spec 018.
<!-- SPECKIT END -->
