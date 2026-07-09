# Visual Grounding — Spec 027

Targeted grounding via three read-only audit passes, each citing exact evidence. Legacy = capability/workflow coverage, not a pixel clone.

## Legacy evidence opened (families / students / courses / groups + relationships)

**Family**: `output/roles/admin/pages/management-families.md` (roster + `-status-{active,inactive,incomplete,trial,suspended,stopped,deleted}.md`), `management-families-create.md` (37-field create), `management-families-1-edit.md`, `management-families-1.md` (8-tab hub, 19 forms/11 modals: suspend/stop/schedule-stop/activate/delete/location/preferences/capabilities/notifications/add-child), `management-categories-families.md` (+`-create`/`-2-assign` `member_id[]`/`-2-edit`), `management-families-feedback.md`, `management-families-feedback-family-1.md` (HTTP 500). Screenshots: `management-families-*-full.png`, `-003…-011-page-interaction`.

**Student**: `management-student.md` (roster + `-status-*`), `management-student-1-create.md` (`/student/{familyId}/store`), `management-student-1-edit.md`, `management-student-1.md` (27 forms/23 modals hub: add-trial/course/free-course/search-teacher/edit/suspend/stop/schedule/add-sibling), `management-student-1-trial-create.md`. Screenshots `-full`, `-003…-005`.

**Course**: `management-courses.md` (filter_form + status KPIs + `-status-0-{0..5}.md` + `-type-no-invoices*`), `management-courses-1-create.md` (`courses/{id}/store` enroll = material+teacher+schedule+rates), `-create-free.md`, `management-courses-1-edit.md` (`update` + apply-scope), `management-courses-create-new-copy-1.md`, `management-courseclasses-default-member-course-details-1.md` (enrollment detail), `management-analysis-course.md`, `management-export-course.md` (HTTP 500).

**Group**: `management-group-index.md` (list, 0 rows captured), `management-groups-create.md` (45-field create: teacher + `students[]` + `course_id` + total-hours + schedule + rates). Teacher-side: `management-teacher-categories.md` (→028).

**Binding decisions**: `specs/023-.../coverage-matrix.md` (rows L85–L129), `specs/023-.../missing-capabilities-register.md`, `specs/016-.../admin-sidebar-page-inventory.md` (rows 33–38, 47, 77), `specs/026-.../current-action-inventory.md` + `dead-ui-register.md` (the family/student/course/group baseline).

## Current evidence opened
- Built: `public/{families,family,add-family,students,student,courses,course,groups,group}.html` (+`.en`).
- Source: `src/js/pages/{…}.js`, `src/js/components/{family,family-card,student,wizard,course-group-actions,group-row,table,appointment-details,outcome-details}.js`, `src/js/enhance.js` (dispatch), `src/js/fixtures/*`, `src/locales/*`.

## Sampling / grouping method
The action surface splits into: (1) the shared dispatch legend (classified once — real-modal / backendRequired-gate / confirm-gate / real-drawer / real-static-tab/-filter / display-only), and (2) per-page management actions enumerated for all 9 pages. Every page is covered; shared components (family kebab, course-group-actions, wizard, appointment/outcome drawers) are classified once and referenced. Full tables in `current-management-action-inventory.md`; legacy map in `legacy-family-student-course-group-coverage.md`; gaps in `missing-action-register.md`.

## Exact gaps (what Spec 027 must address)
The 9 pages are **already honest** (Spec 026 complete: 0 dead buttons, 0 `href="#"`, 0 fake finals, confirm finals backendRequired) but **shallow on deep management**. The grounded 027 deltas:

**Layer A — deepen existing pages (M-A…M-M)**: upgrade Edit family/student/course/group + Add-child + Add-note from a shallow toast/modal to a richer modal/drawer; add the enroll-in-course + assign-students-to-group + move-student pickers; add the students-table row kebab (absent — families has 16, students has 0); add suspend-student; family-category reclassify; create-group-from-course. Each write ends at a backendRequired final; reuse the closed `data-*` set.

**Layer A — grounded net-new thin surfaces (M-R, M-S)**: `studentResult`/`studentEvaluation` thin **display-only** views (no legacy route → no computed score/rank/chart) and `scheduleSearch` availability-matcher preview (async = gate). `familyCategories` (M-K) is grounded by the captured assign-family form.

**Layer B — action completion**: every action classified; every missing/shallow row resolved (027 or owner); route assign-teacher→028, message→026/future, print/export→029, billing→030, feedback/analytics→029, materials→031, impersonation→future-backend.

## What Spec 027 must fix (summary)
1. Deepen the shallow Edit/Add/Enroll/Assign gates into honest modals/drawers/pickers (backendRequired finals).
2. Add the missing management ops (students row kebab, suspend-student, move/transfer where grounded, create-group-from-course, category reclassify).
3. Add the grounded thin surfaces (student results/evaluation display-only; schedule-search preview) — **no computed score/chart**.
4. Keep every write non-persisting + backendRequired; keep the admin plan literal single-value/no-math; route out-of-scope actions to owner specs behind honest gates.
5. Preserve all Spec-026 protections + role laws (family zero-pay portal line, student child-view, teacher pay-free, admin finance invariant). Default count **97**; any new page legacy-justified + build-verified in planning.
