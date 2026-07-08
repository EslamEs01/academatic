# Missing-Action Register — Spec 028 (T-A … T-W)

Every missing / shallow / misleading / out-of-scope teacher action, with a resolution. **No row unresolved.**

Fields: ID · Page · Action · Problem · Evidence · Resolution · Fix now? · Owner · Acceptance.

## 028-owned (fix now)
| ID | Page | Action | Problem | Evidence | Resolution | Fix now? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|---|
| **T-A** | teachers.html | Per-card row kebab (View/Edit/status/Delete) | absent (0 kebab; cards have only View-profile + preview drawer) | `management-teachers.md` row actions Show/Edit/Delete | new `teacherMenu` via the EXISTING `data-row-menu` dispatch (`data-row-menu-kind="teacher"`, mirrors Spec-027 `studentMenu`) → View link · Edit modal · On-Vacation/Deactivate confirm · Delete confirm | Yes | 028 | cards carry an honest kebab; each entry honest |
| **T-B** | teacher.html | Edit teacher | shallow honest toast | `teacher-actions.js:24`; `management-teachers-1-edit.md` | → `data-modal-trigger` modal (`trn.act.edit`+backendRequiredNote) | Yes | 028 | Edit opens modal → backendRequired |
| **T-C** | teachers.html | Add teacher (richer create) | honest modal (title+note, no fields) | `teacher-actions.js:18`; `management-teachers-create.md` | keep honest modal; optionally enrich display-only scaffold (Main/Location/Zoom/Additional only) | opt | 028 | create modal stays backendRequired final |
| **T-D** | teacher.html | Add follow-up note | shallow honest toast | `teacher-actions.js:27` | → `data-modal-trigger` modal | Yes | 028 | note opens modal → backendRequired |
| **T-E** | teacher.html | Notify family | already confirm→honest toast | `teacher-actions.js:26` | keep as `data-confirm` → backendRequired | no(held) | 028 | confirm → backendRequired |
| **T-F** | course.html | Assign teacher to course | inert disabled+reason gate (the M-N handoff) | `course-group-actions.js:25`; `management-courses-1-create.md` `teacher_id` | → `data-drawer` single-teacher candidate picker (`crs-assign-teacher`) baked in course.js → backendRequired | Yes | 028 | picker → backendRequired; no assignment mutation |
| **T-G** | group.html | Assign teacher to group | inert disabled+reason gate (M-N) | `course-group-actions.js:46`; `management-groups-create.md` `teacher` | → `data-drawer` single-teacher picker (`grp-assign-teacher`, SEPARATE from `grp-assign` students) → backendRequired | Yes | 028 | picker → backendRequired |
| **T-H** | teacher.html / teachers kebab | Suspend / On-Vacation / Deactivate / Activate | absent | `management-teachers-1.md` action bar; status enum | `data-confirm` gates → backendRequired; no status flip/DOM change | Yes | 028 | confirm → backendRequired |
| **T-I** | teacher.html / teachers kebab | Delete teacher | absent | `management-teachers.md` Delete form | `data-confirm-danger` → backendRequired; no DOM row removal | Yes | 028 | confirm → backendRequired |
| **T-J** | teacher.html | Availability windows editor | absent (only a 3-value avail chip) | `management-teachers-1.md` Schedule tab availability rows | `data-drawer` day/time window list; Add/Update/Delete = backendRequired gates; NO invented recurrence | Yes | 028 | editor opens; writes = gates; no fake schedule |
| **T-K** | teachers.html (categories) | Teacher category Create/Edit + assign-members | nav planned; no in-flow surface | `management-teacher-categories*.md`, `-create-members.md` | Create/Edit = `data-modal-trigger` modal; assign-members = `data-drawer` display-only picker → backendRequired; nav stays planned (no page) | Yes | 028 | modal + drawer → backendRequired; nav planned |
| **T-L** | teacher-performance.html | Export/print board | absent | perf board (no export today) | optional `data-disabled-reason` gate → 029; **add no computed score/chart** | opt | 029 | gate honest; board figure-free |
| **T-M** | teacher.html | Settings (Location/Preferences/Capabilities/Notifications) | absent (thin) | `management-teachers-1.md` Settings forms | modal/gate if scoped in plan; capabilities toggle stays decoupled from chat UI (B-06) | opt | 028 | modal/gate → backendRequired |
| **T-N** | teachers.html | Status scopes / sortable columns | list has a status filter; no scope tabs/sort | `management-teachers-scope-*.md`, `-sort-by-*.md` | display-only facet filters (reuse existing); no sort-by-performance | opt | 028 | filters honest; no computed ordering |
| **T-W** | (all-teachers-timetable) | Cross-teacher weekly timetable | real legacy surface, absent from nav | `management-all-teachers-timetable.md` | **PLAN DECISION**: fold into `schedule.html` "by teacher" view (preferred, 0 pages) OR legacy-justify a new AR+EN page (+2) — record in `/speckit.plan` | Yes* | 028 | plan records the count decision; build-verified |

## Owner-routed (not built in 028 — kept honest gates)
| ID | Page | Action | Problem | Evidence | Resolution | Fix now? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|---|
| **T-O** | teacher.html | Compensations tab / Salary tab | pay figures on the teacher profile | `management-teachers-1-compensations-*.txt` | route to **030**; NEVER add to the teacher profile in 028; figure-free | no | 030 | not built; no pay figure on teacher.html |
| **T-P** | (accounting) | Accounting / Salaries / Staff-Salaries / Salary-Class-Report / Payouts | payroll boards | `management-{accounting*,salaries,staff-salaries,salary-class-report,payouts*}.txt` | route to **030** (status-first, no math if ever built) | no | 030 | not built |
| **T-Q** | (payout providers) | Paymob/Payoneer credentials + webhooks | live integration secrets | `management-payout-providers*.txt` | **intentionally-excluded → future-backend**; not even a mock | no | future-backend | not built |
| **T-R** | (teacher/class feedback) | Teacher Feedback / Class Feedback (%+note) | computed-percentage evaluation | `management-teacher-feedback*.txt`, `management-class-feedback*.txt` | route to **029** (display-only only, no derived %) | no | 029 | not built in 028 |
| **T-S** | teacher.html | Login as teacher (impersonation) | needs real session | `management-teachers-1.md` | honest gate → **future-backend** | no | future-backend | gate honest; no session |
| **T-T** | teacher.html / kebab | Send Reset Password | needs auth | `management-teachers-1.md` | honest gate → **future-backend** | no | future-backend | gate honest; no auth |
| **T-U** | (session) | Session-level teacher reassignment (Edit-Class `teacher_id`) | belongs to sessions-ops | `management-courseclasses-1.md` | route to **Spec-026** sessions/attendance territory; NOT folded into 028 | no | 026 | not invented in 028 |
| **T-V** | teacher-portal | Teacher's own salary + salary-class-report | teacher pay-free global law | `output/roles/teacher/text/teacher-salary*.txt` | **intentionally-excluded FOREVER**; unbuildable in any spec | no | forever | teacher-* pay grep stays 0 |

\* T-W is 028-owned but pending the plan's fold-vs-page count decision.
