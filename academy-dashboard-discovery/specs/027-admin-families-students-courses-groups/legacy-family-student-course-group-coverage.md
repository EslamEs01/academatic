# Legacy Coverage — Families / Students / Courses / Groups (Spec 027)

Grounded read-only audit of the legacy admin deep-management surface for the four entities + their relationships. Paths relative to `academy-dashboard-discovery/`. Legacy captures: `output/roles/admin/pages/*.md` (abbrev. `LA/`) + `output/roles/admin/screenshots/*`. Cross-checked vs `specs/023-.../coverage-matrix.md` + `specs/016-.../admin-sidebar-page-inventory.md`.

**Core model fact**: a legacy "course" = ONE student's private **enrollment** (student + material/subject + teacher + weekly schedule + rates); the subject **catalog** = `material_id` at `/management/materials` (→ Spec 031). A "group" = one teacher + many students + a linked `course_id` + schedule. `courseclasses/{id}` = the per-session lifecycle (→ sessions/026, not course management).

## Family

| Capability | Evidence | Admin could DO | Current module | Disposition | Owner |
|---|---|---|---|---|---|
| Create/register family | `LA/management-families-create.md` Form 2 (37 fields) | create family (identity/location/contacts/status; +billing subfields) | `add-family.html`/`add-family.js` | covered | done — write gated |
| Edit family | `LA/management-families-1-edit.md` Form 2 | edit family | `add-family`/`family.html` | covered | done |
| Family hub (8 tabs) | `LA/management-families-1.md` (19 forms/11 modals) | children·billing·credits·activity·feedback·settings | `family.html`/`family.js` | covered | done |
| Suspend/Stop/Schedule-stop/Activate/Deactivate/Delete | `LA/management-families-1.md` Forms 14/16/15/17/2/3 | lifecycle writes (+note/date/auto-return) | `family.html` | partial (status-first) | done — writes = backendRequired gate |
| Add child (from family) | `LA/management-families-1.md` "Add New Child" → `/student/{familyId}/create` | add a student under this family | `family.html` Children + `student.html` | covered | done |
| Location / preferences / capabilities / notifications | `LA/management-families-1.md` Forms 10–13 | update location, prefs (`can_chat`/`can_see_library`), 14 notif channels | `family.html` Settings | partial (display) | done — writes gated; notif bell = 024 |
| Family roster + status facets | `LA/management-families.md` Table 1 + `-status-*.md` | browse/filter families; Show/Edit/Delete | `families.html`/`families.js` | covered | done |
| **Family categories (create/edit/ASSIGN family)** | `LA/management-categories-families.md` (+`-create`,`-2-assign` `member_id[]`,`-2-edit`) | create/rename category; assign families (multi-select) | chips only in `families.js`; planned nav `familyCategories` | **partial (no manage page)** | **027** (labels + assignment preview; save = gate) |
| Family notes / feedback (meetings + 4-field report) | `LA/management-families-feedback.md` (notesForm/reportForm) | log meetings, add/delete report | none | missing | **029** (reports/feedback) |
| Login-as family / send reset password | `LA/management-families-1.md` buttons | impersonate / trigger reset | none (no auth) | missing | **future-backend** (gate only) |
| Family billing/pay subfields (hour_rate/fees/invoice/currency/credits/transactions) | `LA/management-families-create.md`, `-1.md` billing tab | set billing plan + amounts | reclassified to `finance.js` | excluded-from-family | **030** — **never a figure on family** |

## Student

| Capability | Evidence | Admin could DO | Current module | Disposition | Owner |
|---|---|---|---|---|---|
| Create student / add child | `LA/management-student-1-create.md` Form 2 (`/student/{familyId}/store`) | create student (+ inline first course + trial) | `student.html`/`student.js` | covered | done |
| Edit student profile | `LA/management-student-1-edit.md` Form 2 | edit name/lang/gender/dob/notes | `student.html` | covered | done |
| Student detail hub (courses/trials/siblings/monthly-plan) | `LA/management-student-1.md` (27 forms/23 modals) | Add trial/course/free-course · Search Teacher · Edit · Suspend/Stop/Schedule | `student.html` | covered (improved) | done |
| Suspend/Stop/Schedule-stop/Delete student | `LA/management-student-1.md` Forms 13–16 | lifecycle writes | `student.html` | partial | done — gated |
| Create trial | `LA/management-student-1-trial-create.md` | trial w/ age-band, material, teacher, slot | `student.html` Trials | covered | done — gated |
| **Enroll student in course** | `LA/management-student-1.md` addClass_form → `courseClasses/add-classes` | add course/classes w/ schedule/teacher | `course.html`/`course.js` | covered (base) / partial (deepen) | **027** (Learning-Path deepen; write gated) |
| Add sibling (family↔student) | `LA/management-student-1.md` "Add Sibling" | link a child to same family | `student.html` Siblings | partial | done — relationship shown, write gated |
| Student roster + status facets | `LA/management-student.md` Table 1 + `-status-*` | browse/filter; Show/Add-Courses/Edit/Suspend/Delete | `students.html`/`students.js` | covered (improved) | done |
| **Student results / evaluation** | NO legacy route (`sidebar-inventory` rows 37–38 explicit); content in student tabs | (no dedicated legacy route) | planned nav `studentResult`/`studentEvaluation` | **missing (thin)** | **027** — display-only thin view, **NO computed score/rank** |
| **Schedule-search / availability matcher** | coverage-matrix L99 (`/search-schedule`) | availability match for assignment | planned nav `scheduleSearch` | missing | **027** (async = gate) |
| Move/transfer student to another family | **no legacy route** (family set only at create + Add-Sibling) | — | none | **thin/absent** | gate only — **do NOT invent** |
| Per-student feedback/reports list | `LA/management-families-feedback-students.md` | student feedback roster | none | missing | **029** |

## Course

| Capability | Evidence | Admin could DO | Current module | Disposition | Owner |
|---|---|---|---|---|---|
| Courses list + filters + status KPIs | `LA/management-courses.md` filter_form + Table 1 + `-status-*`/`-type-*` (14 var) | filter by type/teacher/date/invoice/status | `courses.html`/`courses.js` | covered | done — 027 may deepen filters |
| **Create course = enroll (subject+teacher+schedule+rates)** | `LA/management-courses-1-create.md` `students_form`→`courses/{id}/store` (+`-create-free` `/store_free`) | enroll: material_id, teacher_id, first date, weekly slots, duration, cancel limits (+rates→030) | `course.html`/`course.js` | partial (gated) | **027** (Learning-Path deepen + gate) |
| **Edit course** (subject/teacher/schedule + apply-scope) | `LA/management-courses-1-edit.md` `courses/{id}/update` (+`update_current`/`update_default`/`delete_old_sessions`) | edit course; choose current-vs-default; delete pre-date sessions | `course.html` | partial (gated) | **027** |
| Duplicate/copy course | `LA/management-courses-create-new-copy-1.md`; "Copy Course Data" row-action | clone a course config | not distinct | missing/partial | **027** (gated action) |
| Change course status | `LA/management-courses.md` Form 8 statusForm → `courses/{id}/update_status` | Active&unpaid/paid/Completed/Stop | status chips; write gated | partial | **027** (gate) |
| Delete course | `LA/management-courses.md` Forms 3/5 → `courses/{id}/delete` | delete enrollment | `course.html` Delete | partial | **027** (gated) |
| Enrollment detail (student↔teacher↔subject) | `LA/management-courseclasses-default-member-course-details-1.md` | view/edit one enrollment record | folded into `course.html` | covered (folded) | done — 027 deepen |
| Add classes/sessions · session lifecycle | `LA/management-courses.md` addClass_form; `LA/management-courseclasses-1.md` | append sessions; run lifecycle | `sessions.html`/`attendance.html` | covered (improved) | done/**026** — not 027 |
| Assign course to invoice / hour-rates / price | `LA/management-courses.md` assigninvoiceForm; rate fields | attach course to invoice; set rates | — | finance boundary | **030** — keep course/group **compensation-figure-free** |
| Course analytics | `LA/management-analysis-course.md` | course/enrollment stats | planned nav `dataAnalysis` | planned-future | **029** (stat cards, no charts) |
| Materials = subjects catalog (`material_id` source) | `/management/materials` | manage subject catalog | planned nav `materials` | planned-future | **031** |

## Group

| Capability | Evidence | Admin could DO | Current module | Disposition | Owner |
|---|---|---|---|---|---|
| Groups list | `LA/management-group-index.md` Table 1 (teacher/rate/schedule/status/Options) | list groups; Create; per-row Options (0 rows captured) | `groups.html`/`groups.js` | covered | done |
| **Create group** (teacher + many students + course link + total-hours + schedule) | `LA/management-groups-create.md` `students_form`→`groups` (45 fields; `students[]` multi, `course_id`, `teacher`, `suggested_total_hours`, 7×schedule) | create group; assign teacher; multi-add students; link course; set hours/schedule (+rates→030) | `group.html`/`group.js` | partial (create gated) | **027** (deepen + gate) |
| Add students to group | `LA/management-groups-create.md` `students[]` + search | multi-add students at create | `group.html` roster | partial | **027** |
| Course↔group link | `LA/management-groups-create.md` `course_id` | link group to course | `group.html` (course ref) | covered | done/027 |
| Remove student from group | **no legacy evidence** | — | none | **thin/absent** | **027** — gate only, do NOT invent |
| Group edit / status change | **no legacy evidence** (group-index 0 rows; Options unseen) | — | status chips | **thin/absent** | **027** — gate; note legacy form unconfirmed |
| Group capacity | **no seat field** (nearest = `suggested_total_hours`) | set total hours only | — | missing-as-conceived | **027** — ground on total-hours, no invented cap |
| Assign teacher (course/group) | `teacher_id`/`teacher` selects | pick existing teacher (reference) | teacher dropdowns/labels | covered as reference | reference→**027**; deep teacher mgmt → **028** |
| Teacher categories ("Assign Teachers") | `LA/management-teacher-categories.md` | create category, assign teachers | planned nav `teacherCategories` | planned-future | **028** |

## Thin / absent evidence (honest gates — do NOT invent)
1. **Move/transfer student to another family** — no legacy route (binding set at create + Add-Sibling only). Gate only.
2. **Group edit / remove-student / status-change / capacity** — never crawled (group-index 0 rows). Gate only; capacity grounds on total-hours, not a seat field.
3. **Per-family feedback deep page** (`LA/management-families-feedback-family-1.md`) — HTTP 500, 0 forms → `intentionally-excluded`.
4. **Login-as / reset-password sends** — auth/side-effect → `future-backend` gate.
5. **Student results/evaluation** — no legacy route → thin **display-only** view, no computed score/rank.
6. **Export course** (`LA/management-export-course.md`) — HTTP 500 → future-backend gate.

## Net for Spec 027
- **Already built (re-verify, do not rebuild)**: family create/edit/hub/roster · student create/edit/hub/roster/trial · courses/course · groups/group · enrollment detail (folded).
- **Net-new 027 deltas (grounded, honest/gated)**: **familyCategories** (create/edit/assign-family) · **studentResult** + **studentEvaluation** (thin display-only, no score) · **scheduleSearch** (async gate) · **course Learning-Path deepening** · course create/edit/copy/status/delete gates · group create/edit/add-students/remove/status gates.
- **NOT 027**: feedback/reports + course analytics → **029** · all pay/billing figures + assign-to-invoice + hour-rates → **030** (family/course/group stay figure-free) · materials/subjects catalog → **031** · teacher-categories + deep teacher mgmt → **028** · family notifications bell → **024** · impersonation/reset/export → **future-backend**.
