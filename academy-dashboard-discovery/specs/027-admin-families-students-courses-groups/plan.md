# Implementation Plan — Spec 027: Admin Families / Students / Courses / Groups Deep Management

**Status**: Plan (no tasks, no implementation, no commit). **Baseline**: Spec 026 committed, HEAD `a0189d0`, 97 public HTML, tests green. **Branch**: `feature/012-role-portal-foundation`.

## 1. Scope & bounding principle

Complete the **deep-management** workflows on the 9 already-honest management pages (families/family/add-family/students/student/courses/course/groups/group). The pages are honest after Spec 026 (0 dead buttons, 0 `href="#"`, 0 fake finals, confirm finals backendRequired) but **shallow**; 027 deepens them. **027 does NOT own** teacher deep-mgmt (028), reports/analytics/feedback (029), finance/billing (030), settings/materials/certs (031), or backend/auth.

**Locked count decision (D3/D4)**: **count stays 97 — ZERO new pages.** Every 027 delta is a modal / drawer / picker / row-kebab / tab-deepening / gate on an existing page. The four planned nav items stay planned gates: `studentResult`/`studentEvaluation` content lives in the existing student.html tabs (deepened, display-only, no score); `familyCategories` surfaces as an assignment-preview modal on family/families; `scheduleSearch` surfaces as an availability-preview gate inside the assign/enroll flow. A standalone page would only be added if a modal/drawer were insufficient — none is.

## 2. Mechanism (reuse the CLOSED Spec-026 `data-*` set — no new hook/storage key)

| Need | Pattern | Note |
|---|---|---|
| Edit family/student/course/group · Add-child · Add-note · create forms | `data-modal-trigger` + `data-modal-title-key` + `data-modal-note-key="common.backendRequiredNote"` → honest titled modal (`openModal`) | upgrade the current `data-demo-action` toasts to this modal |
| Assign-students / Enroll-in-course / Move-student / family-category / schedule-search **pickers** | `data-drawer="<id>"` → `openSheet` clones a baked `<template data-preview>` with a **display-only candidate list** + a `data-disabled-reason` backendRequired final gate | reuses the existing entity-preview drawer; the list is display-only, the "Assign/Enroll" button is a gate |
| Delete/Remove/Suspend/Deactivate/Reactivate | `data-confirm[-danger]` → confirm modal; CTA = backendRequired toast | reuse; no DOM mutation |
| Students-table row kebab (M-I) | `data-row-menu data-row-menu-kind="student"` → a new `studentMenu(id)` builder in `enhance.js` (mirrors `familyMenu`), routed by the EXISTING `data-row-menu` dispatch (add one `=== 'student'` branch) | reuses the `data-row-menu` hook; NOT a new dispatch hook |
| Assign-teacher / message / print/export / billing | `data-disabled-reason` gate | route to owner spec; keep honest |
| Results/Evaluation deepening | existing `data-tab` panels, display-only content (rubric dimension lines) | no computed score/rank/chart |

**No new dispatch hook** (the studentMenu is a variant of the existing `data-row-menu`), **no new storage key**, **no new engine/dependency**. The one small `enhance.js` change = add the `studentMenu` builder + a `'student'` branch in the row-menu dispatch (justified in research.md; it mirrors the existing family branch exactly).

## 3. Per-domain plan

### Family
- **Edit family (M-F)**: `family.js` banner + `familyMenu` (enhance.js) Edit → `data-modal-trigger` honest modal.
- **Add child (M-H)**: `family.js` banner/Students-tab Add-child → `data-modal-trigger` modal (or the wizard child step).
- **Add note (M-F)**: Notes-tab Add → `data-modal-trigger` modal.
- **Family category reclassify (M-K)**: an assignment-preview modal/drawer on family.html + families (display-only member list + backendRequired Save); `familyCategories` nav stays planned.
- Suspend/Stop stay confirm-gates. Billing/plan persistence → **030** (family-portal figure-free; the family.html admin plan hour-rate literal «سعر الساعة ٨٠ ريال/ساعة· عرض فقط» stays a single-value, no-math admin literal). Children/schedule links stay real.

### Student
- **Students row kebab (M-I)**: add `studentMenu(id)` (View real link · Edit modal · Suspend confirm · Remove confirm) in `enhance.js`; wire `data-row-menu data-row-menu-kind="student"` into `students.js` rows.
- **Edit student + Add note (M-G)**: `student.js` banner Edit + Notes Add → `data-modal-trigger` modals.
- **Suspend/deactivate/reactivate (M-J)**: `data-confirm` on student banner + row kebab.
- **Enroll in course (M-B)**: student Courses-tab "Add" (currently disabled+reason) → `data-drawer` course-picker (display-only candidate courses + backendRequired Enroll).
- **Assign to group (M-B/M-A)**: student → `data-drawer` group-picker.
- **Move/transfer between groups (M-C)**: group↔group move = `data-drawer`/`data-modal-trigger` (grounded); **cross-family transfer = honest gate only** (no legacy route — do NOT invent fields).
- **Results/Evaluation (M-R)**: deepen the existing student.html Results/Evaluation **tabs** — display-only rubric dimension lines, **no computed score/rank/chart**.
- **Schedule-search (M-S)**: an availability-preview gate surfaced in the assign/enroll flow; `scheduleSearch` nav stays planned. Message/contact → **026/future**.

### Course
- **Edit course (M-D)**: `course-group-actions.js courseActions` Edit → `data-modal-trigger` modal.
- **Add students / enroll (M-B)**: course "Add students" (disabled+reason) → `data-drawer` student-picker → backendRequired.
- **Create group from course (M-L)**: a `data-modal-trigger`/`data-drawer` prefilled-course create-group flow → backendRequired.
- Copy/status/delete = gates. Assign-teacher → **028** (reference gate). Print/analytics → **029**. Materials → **031**.

### Group
- **Edit group (M-E)**: `course-group-actions.js groupActions` Edit → `data-modal-trigger` modal (grounded fields only; thin group-edit evidence → unconfirmed fields stay a gate).
- **Assign/add students picker (M-A)**: group "Add students" (toast) → `data-drawer` student-picker (display-only + backendRequired Assign).
- Remove-student stays confirm-gate. Assign-teacher → **028**. Capacity display grounds on `suggested_total_hours` (no invented seat field). Schedule/attendance/course/student links stay real.

## 4. Future-owner routing (keep honest gates; not built in 027)
M-N assign-teacher persistence → **028** · M-O message → **026/future-backend** · M-P print/export → **029** · M-Q billing/plan → **030** · M-T feedback/reports → **029** · M-U login-as/reset → **future-backend** · M-V materials/subjects → **031**. Each stays an honest `data-disabled-reason`/`data-coming-soon` gate; smoke asserts non-dead.

## 5. Relationship writes (all backendRequired)
Family→Students · Student↔Courses · Student↔Groups · Course→Groups · Group→Students · Group/Course→Teacher(ref) · →Schedule/Attendance(ref). Reads stay real; **every write ends at a backendRequired final; no fake roster add/remove; teacher & schedule/attendance are references only.**

## 6. Fixtures / locales / CSS
- **Fixtures**: extend authored data for the picker candidate lists (available courses/groups/students to assign) + student results/evaluation dimension lines + category members. Display-only; no computed values; no pay figures.
- **Locales**: AR+EN mirrored keys for the new modal/drawer/kebab copy + reworked gate copy, under existing namespaces (`fam.*`/`stu.*`/`crs.*`/`grp.*`); reuse `common.backendRequiredNote`. No raw keys, no pay tokens on family, no «لوحة الطالب».
- **CSS**: additive only if needed (picker list rows, kebab). No redesign, no new hook/key, no new animation engine.

## 7. Verification plan
- `npm run build` → assert **97** (unchanged). `npm test` / smoke / a11y / screenshots.
- **Smoke rescope** (one sanctioned amendment): assert the students-table row kebab exists + is honest; assert enroll/assign/move open modal/drawer/gate; assert edit family/student/course/group open modals (not bare toasts); assert results/evaluation carry no computed score/chart; keep count=97, `href="#"`=0, no-dead-button, no-fake-final. Keep payHit/famPay/child-view/admin-finance + the 026 action-completion asserts **byte-verbatim**.
- **A11y**: changed pages + wizard + ≥1 create modal + ≥1 edit modal/drawer + ≥1 assignment picker (drawer) + ≥1 confirm; critical=0 serious=0; dark/light; mobile-390.
- **Screenshots**: families/family/students(row-kebab)/student/course/group + wizard final gate + edit modal/drawer + assignment picker + confirm final + a results/scheduleSearch proof + mobile + dark; update REVIEW.md.

## 8. Role-law & impact protection
- Family zero-pay (portal figure-free; admin plan literal single-value/no-math), student child-view (no «لوحة الطالب»; admin student page admin-owned), teacher pay-free (reference only), admin finance Spec-009 invariant — all byte-verbatim green. All Spec-026 protections stay green.
- Only the touched admin management pages/components change; all portal pages + admin ops pages (sessions-analysis/public-holiday/scheduled-actions) + index byte-identical; `package.json` unchanged; no backend/dependency/engine.

## 9. Allowed / forbidden files (narrowed)
**Allowed**: `pages/{families,family,add-family,students,student,courses,course,groups,group}.js`; `components/{family,family-card,student,wizard,course-group-actions,group-row,table}.js`; `enhance.js` (studentMenu builder + `'student'` row-menu branch only — no new hook); `fixtures/*`; `locales/*`; `styles/app.css` (additive); `tests/*`; `screenshots/REVIEW.md`; `README.md`; `CLAUDE.md`; the 027 spec dir; append-only 016/023/026 records.
**Forbidden**: `package.json`, dependencies, backend/API/auth, teacher chat/pay/live-room page, family payment page, student primary-role page, admin finance/reports/settings pages, new CRUD/chart/notification/chat engine, new `data-*` hook or storage key (unless justified), any new standalone page (count stays 97 unless planning re-justifies).

## 10. Decisions index
D1–D41 in `research.md`; 20 contracts in `contracts/`; entities in `data-model.md`; commands in `quickstart.md`.

## 11. Risks / stop conditions
Stop + report if: count ≠ 97 at start or after build; a modal/drawer could serve but a new page is added; any M-row unresolved or action unclassified; any fake save/delete/enroll/assign/remove; cross-family transfer fields invented; computed result/evaluation score/chart appears; family pay figure / teacher pay token / student-primary wording appears; `href="#"`/dead button/raw key appears; `package.json`/backend/dependency/new-engine/new-hook needed without justification; a11y critical/serious; a Spec-026 protection regresses.
