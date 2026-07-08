# Data Model — Spec 028 (display-only, no persistence, no pay values)

## Reused entities
- **Teacher** (`fixtures/teachers.js` TEACHERS): id, nameKey, subjectsKeys, primary, bioKey, statusId, avail, workload, followUp, sessions, hours, util (+ **unused `rating` — stays unsurfaced**). Counts via `teacher-links.js teacherCounts()` (courses/groups/students/upcoming/completed/teacherAbsent/studentAbsent/cancelled). **No salary/rate/fine/payout field is surfaced.**
- **Course / Group** (`fixtures/courses.js`/`groups.js`): reused for the teacher↔course/group assign candidate lists (titleKey/nameKey/subjectKey/levelKey only — no rate).
- **Schedule** (`fixtures/schedule.js`): drives the existing `schedule.html` teacher-lens (the all-teachers-timetable fold) — unchanged.

## New entities — `fixtures/teacher-management.js` (new, additive, display-only)
| Export | Shape | Purpose |
|---|---|---|
| `ASSIGN_TEACHERS` | `[{ nameKey, metaKey }]` (slice of TEACHERS; meta = subjects/workload label) | single-teacher candidate list for course/group assign pickers |
| `ASSIGN_COURSES` | `[{ nameKey, metaKey }]` (slice of active COURSES) | candidate courses for the teacher→course picker |
| `ASSIGN_GROUPS` | `[{ nameKey, metaKey }]` (slice of GROUPS) | candidate groups for the teacher→group picker |
| `TEACHER_CATEGORIES` | `[{ id, nameKey, descKey, statusId, count }]` | teacher-category list (Create/Edit modal + facet) |
| `CATEGORY_MEMBERS` | `[{ nameKey, metaKey }]` (slice of TEACHERS) | assign-members drawer candidate list |
| `AVAILABILITY_WINDOWS` | `[{ dayFromKey, dayToKey, timeFrom, timeTo }]` | display-only weekly availability rows (day-pair + time-pair; NO recurrence/exception) |

All derived from existing authored entities; **no computed value, no score/rating, no currency/pay figure, no persisted selection state.**

## New runtime shape — `teacherMenu(id)` (in `enhance.js`)
Popover HTML built at click time (like `familyMenu`/`studentMenu`): View-profile `<a>` · Edit `data-modal-trigger` · On-Vacation `data-confirm` · Deactivate `data-confirm` · Delete `data-confirm-danger`. Reuses the existing `data-row-menu` dispatch (new `'teacher'` branch) — **no new data shape/hook/storage key**.

## Gate metadata (reused)
`{ availability: 'backendRequired' | 'planned' | 'permission-locked', labelKey, reasonKey }` — the closed Spec-026 gate shape; the assign/availability finals are `data-disabled-reason` backendRequired gates.

## Entities/writes that are backendRequired (never persist)
Teacher create/edit/delete · status change (vacation/deactivate/activate) · add-note · teacher↔course/group assign (single) · category create/edit/delete/assign-members · availability add/update/delete.

## Excluded from the model (owner-routed)
Salary/fixed_salary/hour_rate/fine/compensation/payout fields (→030/future-backend) · feedback percentages (→029) · the `rating` field (unsurfaced) · session-level teacher reassignment (→026).
