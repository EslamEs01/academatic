# Data Model — Spec 027

All static authored fixtures — no backend, no computed values, no persistence, no pay/salary figures. Extends the existing families/students/courses/groups fixtures with the picker candidate lists + results/evaluation dimension lines + category members needed for the deep-management modals/drawers. Every relationship write is a `backendRequired` gate (no fake mutation).

## Reused existing entities (display fields only)
- **Family** `{ id, nameKey, contactKey, categoryKey, statusId, children[], notesKey }` — no pay figure.
- **Student** `{ id, nameKey, level, statusId, courses[], groups[], familyId, scheduleRef, notesKey }`.
- **Course** `{ id, nameKey, subjectKey, levelId, statusId, groups[], rosterCount, teacherRef }`.
- **Group** `{ id, nameKey, statusId, courseRef, teacherRef, students[], totalHours }` — capacity display = totalHours (no seat field).

## New authored fixtures (display-only) for the deep-management surfaces

### Picker candidate lists (for assign/enroll drawers — reused by `openSheet` baked `<template>`)
- **CourseCandidate** (enroll-in-course): `{ id, nameKey, subjectKey, teacherRef, scheduleLabel }` — a short authored list of courses a student could enroll in.
- **GroupCandidate** (assign-to-group): `{ id, nameKey, courseRef, teacherRef, seatLabel (from totalHours) }`.
- **StudentCandidate** (add-students-to-course/group): `{ id, nameKey, familyRef, levelId }`.
- Each picker: `{ titleKey, candidates: [...], finalGate: { availability:'backendRequired', reasonKey } }`. The list is **display-only**; the "Assign/Enroll" control is a `backendRequired` gate. No selection persists.

### Results / Evaluation dimension lines (M-R — deepen existing student tabs)
- **ResultDimension**: `{ key, labelKey }` (e.g. attendance · homework · participation · progress) — display-only **named dimensions only**, NO answer scale, NO score/rank/percentile/chart. Mirrors the teacher-reports rubric-line pattern (Spec 025).

### Family category members (M-K — assignment preview)
- **CategoryMember**: `{ id, nameKey, statusId }` — a display-only list of families in a category; the Save/assign is a `backendRequired` gate.

### Row-kebab metadata (M-I — students table)
- Reuse the `data-row-menu` pattern; `studentMenu(id)` renders: View (real `href` to student.html) · Edit (`data-modal-trigger`) · Suspend (`data-confirm`) · Remove (`data-confirm-danger`). No new data shape.

## Gate metadata (reused shape)
`{ availability: 'backendRequired' | 'planned' | 'permission-locked', labelKey, reasonKey }` — mirrors the existing `data-disabled-reason`/`data-modal-note-key` metadata. No new shape, no new hook.

## Locale keys (AR + EN mirrored)
- Modal titles/notes: `fam.act.edit`/`fam.act.addChild`/`fam.act.note`, `stu.act.edit`/`stu.act.note`/`stu.act.suspend`, `crs.act.edit`, `grp.act.edit`, + `common.backendRequiredNote` (exists).
- Picker copy: `*.assign.title`/`*.assign.candidates`/`*.assign.gate`/`*.enroll.*` under `stu`/`crs`/`grp`.
- Kebab labels: reuse `sessions.action.view`/`common.edit` + `stu.act.suspend`/`stu.act.remove`.
- Results/Evaluation: `stu.result.dim.*` (display-only dimension labels).
- Category: `fam.cat.assign.*`.
- Constraints: no raw keys; **no pay tokens** in any family/student key; **no «لوحة الطالب»**; admin plan literal stays single-value/no-math.

## Explicitly NOT modeled (excluded-by-law / future-backend)
No pay/billing figure on family/student; no salary/payroll; no computed score/rank/percentile/chart; no seat-capacity field (use totalHours); no cross-family transfer fields; no teacher CRUD (reference only); no real roster/enroll/assign mutation; no message/chat state; no export/file state. All are honest gates only.
