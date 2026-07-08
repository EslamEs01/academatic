# Implementation Plan — Spec 028: Admin Teachers / Performance Deep Management

**Status**: Plan (no tasks, no implementation, no commit). **Baseline**: Spec 027 committed, HEAD `f10cc56`, 97 public HTML, build/smoke/a11y green at the committed baseline. **Branch**: `feature/012-role-portal-foundation`.

## 1. Scope & bounding principle

Complete the **teacher deep-management** that Spec 027 deferred (M-N assign-teacher → 028), on the already-honest-but-shallow admin teacher surfaces (`teachers.html`, `teacher.html`, `teacher-performance.html`) + the course/group assign-teacher references — exactly the way Spec 027 deepened family/student/course/group. **028 does NOT own** teacher pay/finance/payroll (→030/future-backend), feedback/analytics (→029), materials/settings-app (→031), session reassignment (→026), or the teacher **portal** (byte-identical, pay-free).

**Locked count decision (D3/D4/D5)**: **count stays 97 — ZERO new pages.** Every delta is a modal / drawer-picker / row-kebab / confirm / gate on an existing page. **all-teachers-timetable FOLDS into the existing `schedule.html` teacher-lens** (already present: a `teacher` filter over the List + Timetable views — `schedule.js:49-56`, header comment "an admin teacher lens lives in the teacher filter"). No new schedule.js code required; the existing `teacher.html` → `schedule.html#view=timetable` deep link is the honest cross-teacher-timetable route. `teacherCategories` nav stays a **planned** gate (like Spec-027 `familyCategories`); category Create/Edit surfaces as an in-flow modal from `teachers.html`.

## 2. Mechanism (reuse the CLOSED Spec-026 `data-*` set + Spec-027 precedents — no new hook/storage key)

| Need | Pattern | Note |
|---|---|---|
| Edit teacher · Add-note · Create/Edit teacher-category · (optional) settings | `data-modal-trigger` + `data-modal-title-key` + `data-modal-note-key="common.backendRequiredNote"` → honest titled modal | upgrade the current `data-demo-action` toasts |
| Assign teacher→course/group · assign course/group←teacher · category assign-members | `data-drawer="<id>"` → baked `<template data-preview>` **single/multi display-only candidate list** + `data-disabled-reason` backendRequired final | mirrors the Spec-027 enroll/add-students pickers; single-select for teacher, multi for category members |
| Availability windows editor | `data-drawer="trn-availability"` → baked day/time window rows (display-only) + Add/Update/Delete `data-disabled-reason` gates | no invented recurrence/exceptions |
| Suspend/On-Vacation/Deactivate/Activate/Delete teacher | `data-confirm[-danger]` → confirm modal; CTA = backendRequired | reuse; no status flip/DOM removal |
| Teachers-card row kebab (T-A) | `data-row-menu data-row-menu-kind="teacher"` → a new `teacherMenu(id)` builder in `enhance.js` (mirrors `familyMenu`/`studentMenu`), routed by the EXISTING `data-row-menu` dispatch (add one `=== 'teacher'` branch) | reuses the `data-row-menu` hook; NOT a new dispatch hook |
| Message · Reset-password · Login-as · Print/export | `data-disabled-reason` gate | route to owner (026/future-backend/029); keep honest |
| Performance board · tabs · status scopes/sorts | existing `data-tab`/`data-filter` | display-only; no computed score/rank/chart |

**No new dispatch hook** (`teacherMenu` is a variant of the existing `data-row-menu`), **no new storage key/engine/dependency**. The one small `enhance.js` change = add the `teacherMenu` builder + a `'teacher'` branch in the row-menu dispatch (mirrors the family/student branches exactly).

## 3. Per-area plan

### Teacher list (`teachers.js`, `components/directory-card.js`, `teacher-actions.js`)
- **Card kebab (T-A)**: add an optional `menuId`/`menuKind` slot to `directoryCard()` (renders a kebab ONLY when passed — `directoryCard()` is called only by `teachers.js`, so every other consumer stays byte-identical); `teachers.js card()` passes `menuId: tr.id, menuKind: 'teacher'`. `teacherMenu(id)` = View-profile real link · Edit modal · On-Vacation/Deactivate confirm · Delete confirm.
- **Add teacher (T-C)**: already an honest `data-modal-trigger` modal — keep; optional display-only field scaffold (Main/Location/Zoom/Additional ONLY — **no Salary/Payout fieldset**).
- **Manage categories (T-K)**: a header "Manage categories" action → Create/Edit category modal; assign-members drawer. `teacherCategories` nav stays planned.
- **Status scopes/sorts (T-N)**: optional — reuse the existing status facet filter; no sort-by-performance (no computed ordering).

### Teacher detail (`teacher.js`, `teacher-actions.js`)
- **Edit (T-B) / Add-note (T-D)**: `teacher-actions.js` `demo('trn.act.edit'|'trn.act.note')` → `data-modal-trigger` modals.
- **Notify (T-E)**: stays `confirmAction` (already honest).
- **Assign course (T-F) / Assign group (T-G, from teacher)**: `off('trn.act.assignCourse'|'trn.act.assignGroup')` → `data-drawer` course/group candidate pickers (`trn-assign-course`/`trn-assign-group`) baked on `teacher.js` → backendRequired.
- **Status lifecycle (T-H) / Delete (T-I)**: add `confirmAction`s (On-Vacation/Deactivate/Activate + Delete-danger) to the banner + kebab.
- **Availability editor (T-J)**: a `trn-availability` drawer baked on `teacher.js` (day/time windows from a new fixture; Add/Update/Delete = gates).
- **Reset-password (T-T) / Login-as (T-S)**: honest `data-disabled-reason` gates → future-backend.
- **Message (T-E-msg)**: stays honest gate → 026/future. **Print (T-print)**: stays gate → 029.
- **Settings (T-M)**: optional — a Location/Preferences/Capabilities/Notifications modal or gate; capabilities toggle stays decoupled from any chat UI (B-06). Default: keep minimal (gate or defer).
- Tabs + course/group/student/family links stay real/display-only.

### Course / Group assign-teacher (`components/course-group-actions.js`, `course.js`, `group.js`)
- **T-F/T-G (the M-N handoff)**: replace `off('crs.act.assignTeacher','crs.reason.assign')` / `off('grp.act.assignTeacher','grp.reason.assign')` with `drawerBtn('...','user-check','crs-assign-teacher'|'grp-assign-teacher')`; bake single-teacher candidate `<template>`s on `course.js`/`group.js` (SEPARATE from the existing `grp-assign` student drawer) → backendRequired. **No `teacher_hour_rate`/`t_hour_rate` figure surfaced.**

### Teacher performance (`teacher-performance.js`)
- **Preserve** the display-only board (T-23/T-25): counts + labeled signals + facet filters + profile links; **add no computed score/rank/chart**; the unused `rating` fixture field stays unsurfaced. **Optional** export gate → 029 (T-L).

### Teacher categories (new)
- Create/Edit = `data-modal-trigger` modal; assign-members = `data-drawer` display-only member picker → backendRequired (reuse the Spec-027 family-category flow). Nav planned; **no page**.

## 4. Future-owner routing (honest gates; not built in 028)
T-O Compensations/Salary → **030** · T-P Accounting/Salaries/Payouts → **030** · T-Q Payout-Providers → **future-backend** · T-R Teacher/Class-Feedback → **029** · T-S Login-as → **future-backend** · T-T Reset-password → **future-backend** · T-U session-reassign → **026** · T-V teacher-portal salary → **excluded forever** · T-mat materials/settings-app → **031** · T-L/print export → **029**. Each stays an honest `data-disabled-reason`/`data-coming-soon` gate; smoke asserts non-dead + figure-free.

## 5. Relationship writes (all backendRequired)
Teacher create/edit/delete · status change · add-note · Teacher↔Course/Group assign (single) · Category create/edit/delete/assign-members · Availability add/update/delete. Reads stay real; **every write ends backendRequired; no fake status flip, no roster/schedule mutation, no fake assignment, no pay figure.**

## 6. Fixtures / locales / CSS
- **Fixtures**: one new additive `src/js/fixtures/teacher-management.js` (display-only, derived from existing entities): `ASSIGN_TEACHERS` (single-teacher candidates), `ASSIGN_COURSES`/`ASSIGN_GROUPS` (candidates for teacher→course/group), `TEACHER_CATEGORIES` (+ members), `AVAILABILITY_WINDOWS` (day/time rows). **No computed/pay values.**
- **Locales**: extend `ar.trn.js`/`en.trn.js` (the `trn.*` namespace, mirrored AR+EN) for ALL new teacher copy — kebab menu, edit/note modal titles, status/delete confirm keys, availability keys, category keys, assign-picker titles/hints/CTAs, reset/login gate reasons; reuse `common.backendRequiredNote`. No raw keys, no pay tokens, no `«لوحة الطالب»`.
- **CSS**: additive only if needed (kebab, availability rows) — pickers reuse `sheet-*`/`icon-btn`/`btn`; **expected 0 CSS** (like Spec 027).

## 7. Verification plan
- `npm run build` → assert **97** (unchanged). `npm test` / smoke / a11y / screenshots.
- **Smoke rescope** (one sanctioned amendment): assert the teachers card kebab exists + is honest; assert course/group (and teacher-detail) assign-teacher opens a picker → backendRequired; edit/note modals + status/delete confirms open; availability drawer opens; category modal/drawer opens; **teacher-performance carries no computed score/rank/chart**; **admin teacher surfaces carry no pay figure** (new assert, excluding the sanctioned `teacher-performance.html`); count=97, `href="#"`=0, no-dead-button, no-fake-final. Keep `payHit`/`tchPay`/`famPay`/`payFigure`/child-view/admin-finance + the 026/027 asserts **byte-verbatim**.
- **A11y**: changed teacher pages + ≥1 edit modal + ≥1 assign picker (drawer) + ≥1 availability drawer + ≥1 confirm + category drawer; critical=0 serious=0; dark/light; mobile-390.
- **Screenshots**: teachers(kebab)/teacher/teacher-performance + edit modal + assign picker + availability drawer + category surface + status confirm + mobile + dark; update REVIEW.md.

## 8. Role-law & impact protection
- **Teacher portal pay-free**: 16 `teacher-*` portal HTML byte-identical (last touched `e4ee3cd`); `payHit`/`tchPay` byte-verbatim; `teacher-performance.html` = the Spec-024-B-07 sanctioned admin exempt board (NOT grepped to 0; never linked from the portal). Family zero-pay, student child-view, admin finance Spec-009 invariant — byte-verbatim green. All Spec-026/027 protections stay green.
- Only the touched teacher/course/group management surfaces + shared additive assets change; all portal pages + admin-ops (sessions-analysis/public-holiday/scheduled-actions) + the 9 Spec-027 management pages + index byte-identical; `package.json` unchanged; no backend/dependency/engine.

## 9. Allowed / forbidden files (narrowed)
**Allowed**: `pages/{teachers,teacher,teacher-performance,course,group}.js`; `components/{teacher-actions,teacher-signals,teacher-status,course-group-actions,directory-card,table,data-table}.js`; `enhance.js` (`teacherMenu` builder + `'teacher'` row-menu branch only — no new hook); `fixtures/{teacher-management(new),teachers,teacher-links}.js`; `locales/{ar,en}.trn.js`; `styles/app.css` (additive); `tests/*`; `screenshots/REVIEW.md`; `README.md`; `CLAUDE.md`; the 028 spec dir; append-only 016/023/025/026/027 records. `schedule.js` is **read-only reference** (the teacher-lens already exists — no change needed; touch only if a plan-justified deep-link enhancement is added).
**Forbidden**: `package.json`, dependencies, backend/API/auth, teacher-portal chat/pay/live-room page, family payment page, student primary-role page, admin finance/reports(non-teacher-perf)/settings pages, new CRUD/chart/notification/chat/salary-payroll engine, new `data-*` hook or storage key, **any new standalone page** (count stays 97 — all-teachers-timetable folds into schedule.html), building any 029–032 / future-backend domain, any salary/payroll/compensation/payout figure or fieldset, surfacing the `rating` field.

## 10. Decisions index
D1–D41 in `research.md`; 21 contracts in `contracts/`; entities in `data-model.md`; commands in `quickstart.md`.

## 11. Risks / stop conditions
Stop + report if: count ≠ 97 at start or after build; a new page is added (all-teachers-timetable must fold into schedule.html); any T-row unresolved or action unclassified; any fake save/delete/assign/status-change/schedule-mutation; a computed score/rank/chart appears; the `rating` field is surfaced; any teacher salary/payroll/pay figure or a Salary/Payout fieldset enters a create/edit modal; a teacher-portal file changes (byte-diff) or a `teacher-*` pay token appears; family pay figure / student-primary wording; `href="#"`/dead button/raw key; `package.json`/backend/dependency/new-engine/new-hook needed; a Spec-026/027 protection regresses; a11y critical/serious.
