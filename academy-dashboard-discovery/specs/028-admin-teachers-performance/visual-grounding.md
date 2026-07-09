# Visual Grounding — Spec 028 (Admin Teachers / Performance)

Grounded via a **6-agent read-only audit** (no app changes). Every claim cites an exact repo path.

## Legacy admin teacher evidence opened
- **Directory + scopes + sorts**: `output/roles/admin/pages/management-teachers.md` (10-col table, row actions Show/Edit/Delete), `management-teachers-scope-{active,inactive,unconfirmed,incomplete,deleted}.md` (5 KPI-count status scopes), `management-teachers-sort-by-*.md` (7 sortable columns × 2 directions; + a 5×7 scoped sort matrix).
- **Create / edit**: `management-teachers-create.md`, `management-teachers-1-edit.md` (+ `html/raw/management-teachers-1-edit.html` for the literal status enum Active/Incomplete/Unconfirmed/Deactive). Fieldsets: Main / Location / Zoom / Additional info = 028; **Salary-information + Payout-details fieldsets = future-finance**.
- **Teacher detail (7 tabs, 17 forms)**: `management-teachers-1.md` — action bar (Edit · Send-Reset-Password · On-Vacation · Login-as · Deactivate · Delete); Home (3 student-roster tables), Monthly-Classes, Schedule (session modal + **availability-window editor**: day/time rows Add/Update/Delete), **Compensations**, **Salary**, Settings (Location / Preferences / Capabilities toggles / Notifications), Activity (audit log). Single-value "Hour Rate: 120 EGP" admin literal.
- **Teacher details overview board**: `management-teachers-details.md` (Cancel/Absent/Attend attendance stats + an extra "Send Teacher Login" row action).
- **Teacher categories**: `management-teacher-categories.md`, `management-teacher-categories-create.md`, `management-teacher-categories-1-edit.md`, `management-teacher-categories-1-create-members.md` (Name/Status/Description CRUD + `member_id[]` assign-members picker — structurally identical to the Spec-027 family-category flow).
- **All-teachers-timetable**: `management-all-teachers-timetable.md` (7-day×24h cross-teacher grid + per-teacher filter + block popovers + course-status legend). **Not in current nav.config.js.**
- **Assign-teacher origin**: `management-courses-1-create.md` (`teacher_id` field on course-create), `management-groups-create.md` / `management-group-index.md` (`teacher` field on group-create). No standalone assign-teacher page exists in legacy.
- **Pay/finance/feedback (excluded)**: `management-teachers-1-compensations-*.txt`, `management-accounting*.txt`, `management-salaries.txt`, `management-staff-salaries.txt`, `management-salary-class-report.txt`, `management-payouts*.txt`, `management-payout-providers*.txt`, `management-teacher-feedback*.txt`, `management-class-feedback*.txt`; teacher-portal `output/roles/teacher/text/teacher-salary*.txt`.

## Current app pages/modules opened
- `app/src/js/pages/teachers.js` · `teacher.js` · `teacher-performance.js`; `components/teacher-actions.js` · `teacher-signals.js` · `teacher-status.js`; `fixtures/teachers.js` · `teacher-links.js`; `locales/ar.trn.js` · `en.trn.js`; `enhance.js` (dispatch); `nav.config.js` (`addTeacher`/`teacherCategories` planned; `teacherKpi`→teacher-performance.html implemented); `components/course-group-actions.js` (assign-teacher `off()` gates).
- Built: `public/teacher{s,,-performance}.html(.en)`, `course.html`, `group.html`.

## Teacher-portal protection sampling (protection only)
`public/teacher-{portal,schedule,students,outcomes,tasks,reports,profile,library}.html(.en)` (16 files) — **0 pay tokens**; last modified `e4ee3cd` (Spec 025), byte-identical across Specs 026/027. `teacher-performance.html` = the **sanctioned Spec-024-B-07 admin exempt board** (may carry pay-adjacent tokens; never linked from the portal — teacher-portal body anchors===0). Smoke `payHit`/`tchPay` regexes at `tests/smoke/run.cjs` must stay byte-verbatim.

## Evidence gaps
- The standalone `/teachers/1/monthly-classes` route capture errored ("Something went wrong") — Monthly-Classes evidence comes from the embedded tab on `management-teachers-1.md` instead.
- Only 1 seed teacher-category (thin sample data), but the CRUD + assign-members **shape** is structurally complete.
- Teacher-detail availability is a day-pair/time-pair window list only — no recurrence/exception rules captured (028 must not invent richer scheduling; per-date exceptions live on the shipped `public-holiday.html`).

## What must be fixed / decided in 028
Deepen: teacher-list card kebab (absent) · teacher-detail Edit/Note modals · status lifecycle confirms (On-Vacation/Deactivate/Activate/Delete) · **course/group assign-teacher → single-teacher picker drawer (the M-N handoff)** · teacher-category Create/Edit modal + assign-members drawer · availability-window editor drawer. Route out: pay/finance→030, feedback→029, impersonation/reset-password→future-backend, teacher-portal salary→excluded-forever, session-reassign→Spec-026. **Plan decision**: all-teachers-timetable (fold into schedule.html vs new page) — controls the final count.
