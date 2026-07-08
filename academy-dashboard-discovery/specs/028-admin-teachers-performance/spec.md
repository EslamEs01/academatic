# Spec 028 — Admin Teachers / Performance Deep Management

**Status**: SPECIFIED (specify-only — no plan/tasks/implementation/commit). **Baseline**: Spec 027 committed (HEAD `f10cc56`), 97 public HTML, tests green. **Branch**: `feature/012-role-portal-foundation`.

## Why this spec exists

Spec 027 (Admin Families / Students / Courses / Groups Deep Management) deepened the 9 admin management pages into honest usable screens and **explicitly routed teacher deep-management to Spec 028** (`missing-action-register.md` M-N: "Assign-teacher persistence → 028"; `future-owner-register.md`: "028 — Admin teachers/performance — teacher CRUD, teacher performance edits"). Spec 028 completes that handoff: the **admin** teacher-management + teacher-performance surfaces (`teachers.html`, `teacher.html`, `teacher-performance.html`) and the course/group **assign-teacher** references — deepened from shallow-but-honest toasts/gates into real modals / drawer-pickers / confirms / gates, exactly the way Spec 027 deepened family/student/course/group.

**This is ADMIN teacher management — NOT the teacher portal, NOT teacher finance/payroll, NOT teacher chat/live-room.** The teacher **portal** (16 files) stays byte-identical and pay-free.

## Standing laws carried in (binding)

- **Action-completion law (Spec 026/027)**: no page feels like a dead static mockup — every action opens a real page / modal / drawer / static tab-filter / honest `backendRequired`·`planned`·`permission` gate, or is removed/reworded.
- **No fake** CRUD/save/delete/assign/status-change/schedule-mutation/performance-score/payroll/upload/export/print/message/live-join. No backend/API/auth/database. No real persistence.
- **Closed `data-*` hook set only** (Spec-026): `data-modal-trigger`(+`data-modal-title-key`/`data-modal-note-key`), `data-confirm[-danger]`, `data-drawer`(baked `<template data-preview>`), `data-disabled-reason`(+`data-reason-key`), `data-tab`, `data-filter`/`data-filter-set`, `data-row-menu`(+`-kind`). **No new dispatch hook, no new storage key, no new engine.**
- **Teacher pay-free GLOBAL** (Spec 016/025, three-layer enforced): the entire `teacher-*` portal family carries zero pay tokens forever. `teacher-performance.html` is the Spec-024 B-07 **sanctioned admin exempt board** (admin-console-only, never linked from the portal) — it is NOT part of the pay-free portal set.
- **No computed score/rank/leaderboard/percentile/chart.** Teacher-performance stays display-only (raw fixture counts + labeled signals). No teacher pay/salary/payroll/compensation/payout **figures** anywhere; admin finance Spec-009 invariant preserved; no new finance module in 028.
- **Family zero-pay · student child-view** unchanged.

## Baseline (verified)

97 public HTML (Spec 027 committed, HEAD `f10cc56`). Current teacher surfaces are **already honest** after Spec 026 (0 dead buttons, 0 `href="#"`, 0 fake finals) but **shallow** on deep management — the same starting condition Spec 027 found on the family/student/course/group pages.

## Grounding (targeted visual-grounding gate — see visual-grounding.md)

A 6-agent read-only audit over the legacy admin teacher captures (`output/roles/admin/{pages,text}/`), the current teacher source, and the Spec-027 handoff. Findings (full detail in the supporting artifacts):

- **Current app** (`teachers.js`, `teacher.js`, `teacher-performance.js`, `teacher-actions.js`): add-teacher = already an honest `data-modal-trigger` modal; teacher-detail edit/message/note = honest demo toasts, notify = confirm, **assign-course/assign-group = the M-N `off()` disabled+reason handoff gates**, print = 029 gate; 9 display-only tabs; teachers list has filters + view-profile links + a card preview drawer but **no card kebab and no status lifecycle**. Performance board = display-only counts + labeled workload/follow-up signals + facet filters + profile links (no score/rank/chart, no pay). A dead unused `rating` fixture field exists (never rendered).
- **Legacy (rich, 028-eligible)**: teacher directory (5 status scopes active/inactive/unconfirmed/incomplete/deleted + 7 sortable columns), teacher-detail action bar (Edit · Send-Reset-Password · On-Vacation · Login-as · Deactivate · Delete), status enum (Active/Incomplete/Unconfirmed/Deactive), Home/Monthly-Classes/Schedule/Settings/Activity tabs, an **availability-window editor** (day/time rows, Add/Update/Delete), **teacher-categories** (CRUD + assign-members picker — structurally identical to the Spec-027 family-category flow; `teacherCategories` is already a `planned` nav item with a FUTURE_ROUTE), and an **all-teachers-timetable** (a real cross-teacher weekly grid **absent from nav.config.js**).
- **Legacy pay/finance/feedback (out of 028)**: teacher-detail Compensations + Salary tabs, create/edit Salary+Payout fieldsets, Accounting/Salaries/Staff-Salaries/Salary-Class-Report/Payouts boards, Payout-Providers credentials, Teacher-Feedback + Class-Feedback, and the teacher-portal's own salary pages. See `pay-finance-exclusion-register.md`.

## Layer A — Admin teacher management scope (deepen, default count 97)

Deepen the existing admin teacher surfaces via modals/drawers/pickers/confirms/gates (mirroring Spec 027). No new standalone page unless legacy IA proves one necessary (the only candidate is all-teachers-timetable — a plan decision, see below).

## Layer B — Action completion for teacher/admin surfaces

Every visible action on `teachers.html`, `teacher.html`, `teacher-performance.html`, and the course/group assign-teacher surfaces is classified in `current-teacher-action-inventory.md`; every missing/misleading/out-of-scope action is resolved in `missing-action-register.md`.

## User Scenarios & Testing

### US1 — Admin manages teachers without dead or fake actions (P1) 🎯 MVP
Admin opens `teachers.html`, uses a per-card kebab (View profile · Edit · On-Vacation/Deactivate · Delete), opens `teacher.html`, edits via an honest modal, adds a note via a modal, changes status via a confirm — every final is a `backendRequired` gate; no fake save/status-change; no pay figure.
**Independent test**: teachers/teacher load; kebab + edit/note modals + status confirms open and end backendRequired; teacher pay-free grep green; no dead/fake action.

### US2 — Admin assigns teachers to courses/groups honestly (P1)
On `course.html` and `group.html` the assign-teacher gate becomes a **display-only single-teacher candidate picker** (drawer) whose final Assign is a `backendRequired` gate; no roster/schedule/relationship mutation.
**Independent test**: assign-teacher opens a picker drawer → backendRequired; course/group teacher stays read-only otherwise; no fake assignment.

### US3 — Admin views teacher performance without payroll/finance leakage (P2)
`teacher-performance.html` stays a display-only counts + labeled-signals + follow-up board; any export/print is a `backendRequired`/029 gate; **no computed score/rank/chart, no pay figure** is added.
**Independent test**: performance board carries no score/rank/chart and no pay token; export = gate.

### US4 — Admin manages teacher categories where grounded (P2)
Create/Edit teacher category = honest modal; assign-teachers-to-category = display-only candidate-list drawer → backendRequired; `teacherCategories` nav stays a planned gate (no standalone page) — mirroring Spec-027 family-categories.
**Independent test**: category create/edit modal + assign-members drawer open → backendRequired; nav item stays planned.

### US5 — Admin edits teacher availability where grounded (P2)
Teacher availability windows (day/time rows) render display-only with Add/Update/Delete as `backendRequired` gates (no invented recurrence/exception rules); the coarse On-Vacation toggle is a `data-confirm`.
**Independent test**: availability editor opens; Add/Update/Delete = gates; no fake schedule mutation.

### US6 — Product owner verifies every teacher/admin action has an outcome (P2)
Every action in the inventory is classified; every missing-action row resolved (028-owned or owner-routed).

### US7 — Developer sees which teacher actions belong to future specs (P3)
`future-owner-register.md` + `pay-finance-exclusion-register.md` map every out-of-scope action to 029/030/031/future-backend/intentionally-excluded, kept as honest gates.

### US8 — QA runs smoke/a11y/screenshots and finds zero dead/fake teacher actions (P2)
Smoke asserts count, loads, honest gates, no fake final, no pay figure, no portal regression; a11y critical=0 serious=0; screenshots capture the deep-management surfaces.

### US9 — Existing role laws from 021–027 stay green (P1)
Teacher portal pay-free (16 files byte-identical), family zero-pay, student child-view, admin finance Spec-009 invariant — all byte-verbatim green; all Spec-026/027 protections preserved.

## Functional Requirements

- **FR-001 Legacy grounding**: every 028 surface traces to exact legacy/current evidence (visual-grounding.md · legacy-teacher-performance-coverage.md); no invented teacher CRM page.
- **FR-002 Action inventory**: `current-teacher-action-inventory.md` classifies every action on teachers/teacher/teacher-performance + course/group assign-teacher + shared components.
- **FR-003 Missing-action register**: `missing-action-register.md` (T-A…) resolves every missing/dead/misleading/out-of-scope action; no row unresolved.
- **FR-004 Teacher entity scope**: `teacher-entity-scope.md` defines teacher / category / assignment-ref / availability-ref / timetable-ref / performance-signal fields + which writes are backendRequired.
- **FR-005 Performance-metric scope**: `performance-metric-scope.md` — allowed authored display-only signals; forbidden score/rank/chart/payroll; export→029; finance→030.
- **FR-006 Pay-finance exclusion**: `pay-finance-exclusion-register.md` lists every legacy teacher pay/finance/feedback surface + disposition + smoke grep strategy.
- **FR-007 Teacher list management**: Add-teacher honest modal; a per-card kebab (view/edit/status/delete); status filters/scopes as display-only facets.
- **FR-008 Teacher detail management**: Edit/Add-note → modals; Notify → confirm; On-Vacation/Deactivate/Activate/Delete → confirms; Message → 026/future gate; Send-Reset-Password/Login-as → future-backend gates; tabs stay display-only.
- **FR-009 Assign-teacher workflow**: course/group assign-teacher → display-only single-teacher candidate-picker drawer → backendRequired; teacher stays read-only otherwise; no roster/schedule/relationship mutation.
- **FR-010 Teacher category workflow**: Create/Edit category → modal; assign-members → drawer picker → backendRequired; nav stays planned (no page).
- **FR-011 Availability**: display-only day/time windows; Add/Update/Delete → backendRequired gates; no invented recurrence.
- **FR-012 Create/Edit/Status modal behavior**: prefilled honest modal (title + backendRequired note, no fake fields/save); status = confirm → backendRequired; no DOM row removal, no status flip.
- **FR-013 Assign picker behavior**: display-only candidate list inside a baked `<template data-preview>`; final Assign = `data-disabled-reason` backendRequired gate; no persisted selection.
- **FR-014 View/detail behavior**: real profile/detail links stay real; read-only drawers where grounded.
- **FR-015 Message/contact** → `backendRequired`/future gate; no fake composer, no teacher chat page.
- **FR-016 Live/join/start** → future-backend gate; no fake live room; no teacher live-room page.
- **FR-017 Upload/export/print** → `backendRequired`/planned/029 gate; no fake file.
- **FR-018 Future-owner mapping**: `future-owner-register.md` assigns every out-of-scope action to 029/030/031/future-backend/intentionally-excluded.
- **FR-019 Count policy**: default **97**; a new page (only candidate = all-teachers-timetable) requires a build-verified plan justification, else fold into `schedule.html` (Spec-026 fold precedent) or keep planned.
- **FR-020 Smoke/a11y/screenshots**: scope defined below.
- **FR-021 Role-law preservation**: teacher portal pay-free (16 files byte-identical; payHit/tchPay byte-verbatim), family zero-pay, student child-view, admin finance Spec-009 invariant — all green.
- **FR-022 Impact protection**: only teacher/course/group management surfaces + shared additive assets change; portal + admin-ops (sessions-analysis/public-holiday/scheduled-actions) + the 9 Spec-027 pages + index byte-identical; `package.json` 0-diff.
- **FR-023 No backend / no fake actions**: reaffirmed across all surfaces.

## Key Entities

- **Teacher** (reused `TEACHERS`): id, nameKey, subjectsKeys, primary, statusId, avail, workload, followUp, sessions, hours, util, bioKey (+ unused `rating` — stays unused, never surfaced).
- **TeacherCategory** (new, grounded): id, nameKey, descKey, statusId, members[] (display-only).
- **Teacher↔Course / Teacher↔Group assignment reference**: single-teacher, display-only; write = backendRequired.
- **Teacher availability reference**: day-pair + time-pair windows (display-only); write = backendRequired.
- **Teacher timetable reference**: existing schedule/attendance links (read-only).
- **Teacher performance signal**: authored counts + labeled workload/follow-up/status chips (display-only, never computed score/rank).

## Count expectations

Default **97 — zero new pages** (deepen via modals/drawers/pickers/confirms/gates on `teachers`/`teacher`/`teacher-performance`/`course`/`group`; `teacherCategories` stays a planned nav gate + in-flow modal). **The one open decision** (resolved in `/speckit.plan`): **all-teachers-timetable** — fold into the implemented `schedule.html` as a "by teacher" view/tab (preferred, ZERO new pages, Spec-026 fold precedent) OR legacy-justify one new AR+EN page (+2 → 99) with a build-verified count. No accidental removals, no unrelated additions.

## Smoke / A11y / Screenshots scope

- **Smoke** (additive; protected asserts byte-verbatim): count = 97 (or the plan-justified figure); teachers/teacher/teacher-performance load; teacher card kebab honest; course/group assign-teacher opens a picker → backendRequired; edit/note modals + status confirms open; **no teacher pay/salary/payroll figure on the admin teacher surfaces**; **no computed score/rank/chart** on the board; teacher-portal 16 files byte-identical + `payHit`/`tchPay` byte-verbatim green; Spec-026 admin-ops + Spec-027 management pages green; family zero-pay, student child-view, admin finance invariant green; `href="#"`=0; no dead/fake; mobile-390 clean.
- **A11y**: changed teacher/admin pages + ≥1 create/edit modal + ≥1 assignment picker drawer + ≥1 confirm; keyboard/focus safe; gate aria labels; dark/light; mobile-390; critical=0 serious=0.
- **Screenshots**: teachers · teacher detail · teacher-performance · assign-teacher picker · create/edit teacher modal · status confirm final · teacher-category surface (if scoped) · availability editor · mobile-390 · dark. Update `screenshots/REVIEW.md`.

## Out of scope (owner-routed — see future-owner-register.md + pay-finance-exclusion-register.md)

Compensations/Salary tabs · Salary/Payout create-form fieldsets · Accounting/Salaries/Staff-Salaries/Salary-Class-Report/Payouts boards → **030**; Payout-Providers credentials · Login-as impersonation · Send-Reset-Password (auth) → **future-backend**; Teacher-Feedback / Class-Feedback → **029**; session-level teacher reassignment (Edit-Class) → **Spec-026 sessions territory**; teacher-portal salary pages → **intentionally-excluded forever** (teacher pay-free global law); materials/certificates/settings-app → **031**.

## Assumptions

- Default count 97 holds (all-teachers-timetable folds into schedule.html unless the plan legacy-justifies a new page).
- Teacher categories are grounded enough to build as modal + assign-members drawer (create+assign-members captured), reusing the Spec-027 family-category mechanism; the nav item stays planned.
- The admin teacher-detail single-value "Hour Rate" literal is a Spec-004/009-sanctioned admin-only literal (like the family plan literal) — display-only, no math; **omitted by default** unless the plan re-confirms it sits outside the `teacher-*` pay-free grep.
- No new `data-*` hook/storage key/engine/dependency; reuse the closed Spec-026 set + the Spec-027 drawer-picker/kebab precedents.

## Dependencies

Spec 027 committed baseline (drawer-picker + row-kebab + reclassify-drawer patterns to reuse); Spec 026 closed hook set + admin-ops pages; Spec 025/016 teacher pay-free global; Spec 009/024 finance boundary.
