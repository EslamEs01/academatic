# Spec 028 — Implementation Status: IMPLEMENTED (awaiting watcher commit)

**Baseline**: Spec 027 committed, HEAD `f10cc56`, 97 public HTML. **After 028: 97 public HTML (zero new pages).**
No commit / no push performed — the watcher commits.

## Tasks T001–T056 — all complete

| Phase | Tasks | Result |
|---|---|---|
| 1 Setup/Preflight | T001–T007 | HEAD `f10cc56`, feature.json→028, count 97, baseline build 97 + smoke PASS + a11y green, scope loaded |
| 2 Foundational | T008–T011 | new `fixtures/teacher-management.js` (candidates/categories/availability — display-only, no pay); AR/EN keys in `ar/en.trn.js`; **no CSS needed**; closed hook set preserved |
| 3 US1 Teacher list | T012–T017 | `enhance.js` `teacherMenu` + `'teacher'` dispatch branch; `directory-card.js` optional kebab slot; `teachers.js` emits kebab |
| 4 US2 Assign-teacher | T018–T021 | `course-group-actions.js` assign-teacher → drawer pickers; `course.js`/`group.js` baked `crs-assign-teacher`/`grp-assign-teacher` templates |
| 5 US3 Teacher detail | T022–T026 | `teacher-actions.js` banner (Edit/Note modals, assign drawers, vacation/deactivate/delete confirms, reset/login gates); `teacher.js` baked `trn-assign-course`/`trn-assign-group`/`trn-availability` + timetable-tab trigger |
| 6 US4 Categories | T027–T029 | `teachers.js` Manage-categories drawer (`trn-categories`: list + create modal + assign gate); `nav.config.js teacherCategories` verified planned |
| 7 US5 Performance | T030–T032 | `teacher-performance.js` preserved display-only; no computed score/rank/chart; `rating` unsurfaced |
| 8 US6 Timetable fold | T033–T034 | **verify-only**: `schedule.html` teacher-lens serves the cross-teacher timetable; `schedule.js` byte-unchanged; no page |
| 9 US7 Future-owner/pay-finance | T035–T037 | Compensations/Salary/Accounting/Payouts→030 · Payout-Providers/Login-as/Reset→future-backend · Feedback→029 · session→026 · portal-salary→excluded; no pay figure/fieldset; nothing built |
| 10 US7 Action completion | T038–T041 | every T-row resolved; no fake final/persistence/mutation; `href="#"`=0; no raw keys; no dead buttons |
| 11 US8/US9 QA | T042–T049 | smoke +77 lines (additive; protected asserts byte-verbatim) PASS; a11y matrix +1 row, critical=0 serious=0; 10 Spec-028 capture frames (197 total, 0 errors); REVIEW.md updated |
| 12 Docs/Final | T050–T056 | README + CLAUDE.md + this record updated; clean-code + test guards green; forbidden-file proof; no commit/push |

## T-row resolution
**Fixed in 028**: T-A (card kebab) · T-B (edit modal) · T-D (note modal) · T-E (notify confirm, kept) · T-F/T-G
(assign-teacher pickers on course/group + teacher profile) · T-H (vacation/deactivate confirms) · T-I (delete
confirm) · T-J (availability drawer) · T-K (category modal + assign-members drawer) · T-W (timetable fold).
**Optional/kept**: T-C (add-teacher stays honest modal) · T-L (perf export → 029 gate, not added) · T-M (settings,
deferred) · T-N (status facet filter kept).
**Owner-gated (not built)**: T-O/T-P→030 · T-Q→future-backend · T-R→029 · T-S/T-T→future-backend · T-U→026 ·
T-V→excluded-forever · T-mat→031.

## Verification
- Build: `96 static pages → public/ (+ index)` = **97**; icons 69 ok / 0 missing.
- Smoke: **PASS — 96 loads**; new Spec-028 asserts (kebab honest, assign pickers → backendRequired, edit/note
  modals, status confirms, availability drawer, category drawer, no computed score/chart, no admin-teacher pay
  figure in `#page-body`) all green.
- A11y: **critical=0 serious=0** (adds `teacher #view=timetable`).
- Screenshots: 197 captured, **0 console errors** (10 Spec-028 frames).
- Impact: only `teachers/teacher/course/group` (×2 lang) HTML changed; **16 teacher-portal files + teacher-
  performance + admin-ops + the 9 Spec-027 pages + index byte-identical**; `schedule.html` byte-identical;
  `package.json` 0-diff.
- Role laws: teacher portal pay-free (16 files byte-identical; `teacher-performance.html` sanctioned-exempt, never
  linked from the portal), family zero-pay, student child-view, admin finance Spec-009 invariant — all green.
  Pay-finance excluded (no salary/payroll/compensation/payout figure or fieldset); `rating` field unsurfaced.
  No new hook/storage key/engine/dependency/page.
