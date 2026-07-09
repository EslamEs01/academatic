# Research & Decisions — Spec 028 (D1–D41)

| # | Decision |
|---|---|
| **D1** | Evidence gate sufficient — 6-agent read-only audit produced exact-path artifacts (current inventory, legacy directory/details/categories/timetable, pay-finance exclusion, portal protection, 027 handoff); every T-row enumerated + owned. |
| **D2** | Current public HTML count = **97** (verified via build: 96 static + index). |
| **D3** | Target count after 028 = **97 — zero new pages**. |
| **D4** | No standalone page needed; every delta is a modal/drawer/picker/kebab/confirm/tab/gate on an existing page. |
| **D5** | **all-teachers-timetable → FOLD** into the EXISTING `schedule.html` teacher-lens (a `teacher` filter over List+Timetable already exists, `schedule.js:49-56`). No new page, no new schedule.js code; the existing `teacher.html`→`schedule.html#view=timetable` link is the honest route. (Spec-026 fold precedent.) |
| **D6** | Teacher card kebab = an optional `menuId`/`menuKind` slot on `directory-card.js` `directoryCard()` (renders only when passed; `directoryCard()` is called ONLY by `teachers.js` → other consumers byte-identical); `teachers.js card()` passes `menuId: tr.id, menuKind:'teacher'`. |
| **D7** | New `teacherMenu(id)` builder in `enhance.js` (View real link · Edit modal · On-Vacation/Deactivate confirm · Delete confirm), routed by the EXISTING `data-row-menu` dispatch via a `=== 'teacher'` branch mirroring `familyMenu`/`studentMenu` — NOT a new hook. |
| **D8** | Edit teacher: `teacher-actions.js` `demo('trn.act.edit','trn.act.editToast')` → `data-modal-trigger data-modal-title-key="trn.act.edit" data-modal-note-key="common.backendRequiredNote"`. |
| **D9** | Add teacher already an honest `data-modal-trigger` modal — keep; optional display-only field scaffold (Main/Location/Zoom/Additional; **NO Salary/Payout fieldset**). |
| **D10** | Add-note: `demo('trn.act.note',...)` → `data-modal-trigger` modal (`trn.act.note` title). |
| **D11** | Status lifecycle (On-Vacation/Deactivate/Activate) = `confirmAction` (`data-confirm`) gates → backendRequired; no status flip. |
| **D12** | Delete teacher = `confirmAction`(`data-confirm-danger`) → backendRequired; no DOM row removal. |
| **D13** | Reset-password + Login-as = honest `data-disabled-reason` gates → **future-backend** (auth/impersonation); no fake send/session. |
| **D14** | Availability windows editor = a baked `<template data-preview="trn-availability">` drawer on `teacher.js` (day-pair/time-pair rows from a fixture, display-only) + Add/Update/Delete `data-disabled-reason` backendRequired gates; **no invented recurrence/exceptions**. |
| **D15** | Settings/Capabilities/Notifications = OPTIONAL; if scoped, a modal or gate; capabilities stay decoupled from any chat UI (B-06 no teacher chat page). Default: minimal (gate or defer). |
| **D16** | Teacher category Create/Edit = `data-modal-trigger` modal reachable from a `teachers.html` header "Manage categories" action. |
| **D17** | Assign-teachers-to-category = `data-drawer` display-only member picker (multi-candidate list) → backendRequired; reuse the Spec-027 family-category mechanism. |
| **D18** | `teacherCategories` nav item stays **planned** (like `familyCategories`); no standalone page. |
| **D19** | Assign teacher→course: `course-group-actions.js` `off('crs.act.assignTeacher')` → `drawerBtn('crs.act.assignTeacher','user-check','crs-assign-teacher')`; bake a single-teacher candidate `<template>` on `course.js` → backendRequired. |
| **D20** | Assign teacher→group: `off('grp.act.assignTeacher')` → `drawerBtn(...,'grp-assign-teacher')`; bake a single-teacher `<template>` on `group.js` — **SEPARATE** from the existing `grp-assign` student drawer. |
| **D21** | From teacher profile: `off('trn.act.assignCourse')`/`off('trn.act.assignGroup')` → `data-drawer` course/group candidate pickers (`trn-assign-course`/`trn-assign-group`) baked on `teacher.js` → backendRequired. |
| **D22** | Candidate data = a new additive `fixtures/teacher-management.js` (display-only slices of existing `TEACHERS`/`COURSES`/`GROUPS`): `ASSIGN_TEACHERS`, `ASSIGN_COURSES`, `ASSIGN_GROUPS`, `TEACHER_CATEGORIES`(+members), `AVAILABILITY_WINDOWS`. No computed/pay values, no persisted selection. |
| **D23** | Teacher-performance board preserved as display-only (counts + labeled signals + facet filters + profile links); no structural change beyond an optional export gate. |
| **D24** | Performance export/print = OPTIONAL `data-disabled-reason` gate → **029**; no fake file. |
| **D25** | **No score/rank/percentile/leaderboard/chart/canvas** added anywhere; teachers keep fixed fixture order (no sort-by-performance); the unused `rating` field stays unsurfaced. |
| **D26** | No payroll/salary/pay/finance figure: omit Salary/Payout fieldsets from create/edit modals; assign-teacher pickers show name/subjects/workload only (no rate); no compensations/salary tab/drawer/modal on teacher.html. |
| **D27** | Pay-finance grep: keep the portal `payHit`/`tchPay` byte-verbatim; ADD an admin-teacher pay-leak assert over `teachers.html`/`teacher.html` `#page-body` (`راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|EGP|AED|EUR`), **excluding** the sanctioned `teacher-performance.html`. |
| **D28** | Teacher-portal protection: 16 `teacher-*` portal HTML byte-identical; after any shared-asset (`enhance.js`/`app.css`) edit, re-diff the 16 files + re-run the portal grep. `teacher-performance.html` is exempt (never grepped to 0; never linked from the portal). |
| **D29** | Every current action stays classified (see `current-teacher-action-inventory.md`); 0 forbidden classes today; deltas only deepen. |
| **D30** | T-A…T-W resolved per `missing-action-register.md`: core 028-owned (T-A/B/D/F/G/H/I/J/K + preserve E) + optional (C/L/M/N) + owner-routed (O–V). |
| **D31** | Future-owner rows kept honest gates (see `future-owner-register.md`); none built in 028. |
| **D32** | Fixtures: one new `fixtures/teacher-management.js` (display-only); `teachers.js`/`teacher-links.js` touched only if a candidate needs a field already present (no new pay field). |
| **D33** | Locales: extend `ar.trn.js`/`en.trn.js` (`trn.*`) mirrored AR+EN for all new copy incl. the course/group assign-teacher picker (referenced from course/group pages — all locales merge into one dict); reuse `common.backendRequiredNote`. No raw keys, no pay tokens. |
| **D34** | CSS additive only if needed (kebab, availability rows) — pickers reuse `sheet-*`/`icon-btn`/`btn`; expected **0 CSS** (Spec-027 precedent). |
| **D35** | Smoke additive (one sanctioned amendment): kebab honest, assign pickers → backendRequired, edit/note modals, status/delete confirms, availability drawer, category modal/drawer, no-score/chart on board, no-pay on admin teacher surfaces, count=97, `href=#`=0, no dead/fake. Keep `payHit`/`tchPay`/`famPay`/`payFigure`/child-view/admin-finance + 026/027 asserts byte-verbatim. |
| **D36** | A11y: add teachers/teacher/teacher-performance + edit modal + assign drawer + availability drawer + confirm + category drawer; dark/light; mobile-390; critical=0 serious=0. |
| **D37** | Screenshots: teachers(kebab)/teacher/teacher-performance + edit modal + assign picker + availability drawer + category surface + status confirm + mobile + dark; REVIEW.md updated. |
| **D38** | Role laws: teacher portal pay-free (16 byte-identical; payHit/tchPay byte-verbatim; teacher-performance exempt), family zero-pay, student child-view, admin finance Spec-009 invariant — all green. |
| **D39** | Impact: only teacher/course/group management surfaces + shared additive assets change; portal + admin-ops + 027 pages + index byte-identical; package.json 0-diff; no new backend/engine/hook/page. |
| **D40** | Allowed/forbidden per plan.md §9. Forbidden: package.json, deps, backend/auth, forbidden pages, new engines/hooks/keys, any new standalone page, any pay figure/fieldset, surfacing `rating`. |
| **D41** | Key risks/stops per plan.md §11 + `contracts/scope-guard.md`: shared-file edits (`enhance.js` teacherMenu, `course-group-actions.js`, `directory-card.js`) need per-page byte-diff review (esp. the 16 teacher-portal files); pickers must stay display-only single-select; `teacherMenu` must mirror `familyMenu` with no new hook; the pay-finance boundary is the #1 scope-creep risk (Compensations tab lives on teacher.html) — none blocking. |
