# Spec 027 — Implementation Status: IMPLEMENTED (awaiting watcher commit)

**Baseline**: Spec 026 committed, HEAD `a0189d0`, 97 public HTML. **After 027: 97 public HTML (zero new pages).**
No commit / no push performed — the watcher commits.

## Tasks T001–T057 — all complete

| Phase | Tasks | Result |
|---|---|---|
| 1 Setup/Preflight | T001–T007 | HEAD `a0189d0`, feature.json→027, count 97, baseline build/smoke/a11y green, scope loaded |
| 2 Foundational | T008–T012 | `fixtures/management.js` (display-only picker candidates); AR/EN keys in `ar/en.fam.js` + `ar/en.crs.js`; **no CSS needed** (reused `sheet-*`/`icon-btn`); closed hook set preserved |
| 3 US1 Family | T013–T018 | `enhance.js` familyMenu Edit→modal + reclassify; `family.js` Edit/Add-child/Add-note modals + `fam-cat` reclassify drawer; zero-pay green |
| 4 US2 Student | T019–T026 | `enhance.js` `studentMenu` + `'student'` dispatch branch; `students.js` row kebab; `student.js` Edit/Add-note modals, suspend confirm, `stu-enroll`/`stu-assign`/`stu-move` pickers, cross-family + schedule gates, results/eval display-only |
| 5 US3a Course | T027–T029 | `course-group-actions.js` courseActions (edit modal, `crs-enroll` picker, create-group modal); `course.js` baked picker |
| 6 US3b Group | T030–T032 | `course-group-actions.js` groupActions (edit modal, `grp-assign` picker, move gate); `group.js` baked picker; capacity ungrounded field NOT invented |
| 7 Future-owner gates | T033–T035 | assign-teacher→028, message→026/future, print→029, billing→030, materials→031, login-as→future-backend — all honest gates; no 028–032 page built |
| 8 Action completion | T036–T042 | every M-row resolved; every action opens page/modal/drawer/tab/gate; no fake final/DOM mutation; `href="#"`=0; no raw keys; relationship writes all backendRequired |
| 9 Smoke/A11y/Screenshots | T043–T050 | smoke +83 lines (additive; protected asserts byte-verbatim) PASS; a11y matrix +1 row, critical=0 serious=0; 10 Spec-027 capture frames (187 total, 0 errors); REVIEW.md updated |
| 10 Docs/Final audit | T051–T057 | README + CLAUDE.md + this record updated; clean-code + test guards green; forbidden-file proof clean; no commit/push |

## M-row resolution
**Fixed in 027**: M-A (assign/add students) · M-B (enroll) · M-C (move + cross-family gate) · M-D (edit course) ·
M-E (edit group) · M-F (edit family) · M-G (edit student + note) · M-H (add child) · M-I (students row kebab) ·
M-J (suspend student) · M-K (reclassify family category) · M-L (create group from course) · M-M (richer create
via honest modals) · M-R (results/evaluation display-only, no score) · M-S (schedule-search gate).
**Owner-gated (not built)**: M-N→028 · M-O→026/future · M-P→029 · M-Q→030 · M-T→029 · M-U→future-backend · M-V→031.

## Verification
- Build: `96 static pages → public/ (+ index)` = **97**; icons 69 ok / 0 missing.
- Smoke: **PASS — 96 page loads**; new Spec-027 asserts (kebab honest, pickers open display-only drawers with
  backendRequired gates, edit modals, create-group, reclassify, no computed score) all green.
- A11y: **critical=0 serious=0** (adds `student #view=courses`).
- Screenshots: 187 captured, **0 console errors** (10 Spec-027 frames).
- Impact: only `course/family/group/student/students` (×2 lang) HTML changed; families/add-family/courses/groups +
  portal + admin-ops + index byte-identical; `package.json` 0-diff.
- Role laws: family zero-pay, student child-view (no «لوحة الطالب»), teacher pay-free (reference only), admin
  finance Spec-009 invariant — all green. No new hook/storage key/engine/dependency/page.
