# Legacy Teacher / Performance Coverage — Spec 028

| Legacy capability | Legacy evidence path | Current page/module | Disposition | Owner | Fix in 028? | Notes |
|---|---|---|---|---|---|---|
| Teacher directory list (10 cols) | `output/roles/admin/pages/management-teachers.md` | `pages/teachers.js` (card grid) | deepen | 028 | Yes | Current = card grid (subset of cols); keep grid, add row/card actions. |
| 5 status scopes (active/inactive/unconfirmed/incomplete/deleted) | `management-teachers-scope-*.md` | `teachers.js` status filter | deepen | 028 | Yes | Surface as display-only facet(s); no fake scope mutation. |
| 7 sortable columns (×2 dir) | `management-teachers-sort-by-*.md` | — | reference | 028 | Optional | Sorting is a display nicety; default keep existing fixed order (no sort-by-performance). |
| Add teacher (create form: Main/Location/Zoom/Additional) | `management-teachers-create.md` | `teacher-actions.js addTeacherAction` (honest modal) | deepen | 028 | Yes | Modal already honest; optionally enrich (display-only). **Salary/Payout fieldsets → future-finance.** |
| Row actions: Show/Edit/Delete | `management-teachers.md` | absent on cards (only View-profile + preview drawer) | deepen | 028 | Yes | Add a card kebab: View · Edit modal · status confirm · Delete confirm (mirrors Spec-027 student kebab). |
| Teacher-detail action bar: Edit · Reset-Password · On-Vacation · Login-as · Deactivate · Delete | `management-teachers-1.md` | `teacher-actions.js teacherActions` | deepen (mixed) | 028 / future-backend | Partial | Edit→modal, On-Vacation/Deactivate/Delete→confirm (028); **Reset-Password + Login-as → future-backend**. |
| Status enum Active/Incomplete/Unconfirmed/Deactive | `html/raw/management-teachers-1-edit.html` | `teacher-status.js` (3-value chip) | deepen | 028 | Yes | Status change = confirm gate; no fake flip. |
| Home tab: student rosters (List/Left/Acquired) | `management-teachers-1.md` | `teacher.js` Students/Follow-up tabs | done | 028 | No | Already display-only real links. |
| Monthly Classes tab | `management-teachers-1.md` | `teacher.js` Sessions tab (cohort outcomes) | done | 028 | No | Display-only; no computed score. |
| Schedule tab: session modal + **availability-window editor** | `management-teachers-1.md` | `teacher.js` Timetable tab (read-only) | deepen | 028 | Yes | Add availability editor drawer (day/time rows; Add/Update/Delete = gates). Session modal reuses schedule links. |
| Settings tab: Location / Preferences / Capabilities toggles / Notifications | `management-teachers-1.md` | absent | deepen (thin) | 028 | Optional | Modal/gate if scoped; capabilities toggle stays decoupled from actual chat UI (B-06: no teacher chat page). |
| Activity tab: audit log | `management-teachers-1.md` | absent | reference | 028 | Optional | Display-only audit list if scoped; no metric. |
| **Teacher categories** CRUD + assign-members | `management-teacher-categories*.md`, `-create-members.md` | `nav.teacherCategories` (planned) | deepen-modal/drawer | 028 | Yes | Create/Edit modal + assign-members drawer (reuse Spec-027 family-category flow); nav stays planned, no page. |
| All-teachers-timetable (cross-teacher grid) | `management-all-teachers-timetable.md` | — (not in nav) | **plan decision** | 028 | Yes* | Fold into `schedule.html` "by teacher" view (preferred, 0 new pages) OR legacy-justify a new page. |
| Assign teacher → course | `management-courses-1-create.md` (`teacher_id`) | `course.js` (read-only teachers tab) + `course-group-actions.js off('crs.act.assignTeacher')` | deepen-drawer | 028 | Yes | The **M-N handoff** → single-teacher picker drawer → backendRequired. |
| Assign teacher → group | `management-groups-create.md` (`teacher`) | `group.js` (read-only) + `off('grp.act.assignTeacher')` | deepen-drawer | 028 | Yes | The **M-N handoff** → single-teacher picker drawer (SEPARATE from the existing `grp-assign` student drawer). |
| Teacher-detail Compensations tab | `management-teachers-1-compensations-*.txt` | — | route-030 | 030 | No | Fine/Bonus figures — highest scope-creep risk; NEVER add to the teacher profile in 028. |
| Teacher-detail Salary tab | `management-teachers-1.md` (Table 7) | — | route-030 | 030 | No | Salary ledger — excluded by law. |
| Accounting / Salaries / Staff-Salaries / Salary-Class-Report / Payouts | `management-{accounting*,salaries,staff-salaries,salary-class-report,payouts*}.txt` | — | route-030 | 030 | No | Payroll/finance boards; zero-pay-figure law. |
| Payout Providers (Paymob/Payoneer credentials) | `management-payout-providers*.txt` | — | intentionally-excluded | future-backend | No | Live integration secrets — unbuildable honestly. |
| Teacher Feedback / Class Feedback (%+note) | `management-teacher-feedback*.txt`, `management-class-feedback*.txt` | — | route-029 | 029 | No | Computed-percentage evaluation → 029 (display-only only, no derived %). |
| Session-level teacher reassignment (Edit-Class `teacher_id`) | `management-courseclasses-1.md` | (schedule/attendance) | route-026 | Spec-026 | No | Sessions/attendance-lifecycle territory; do not fold into 028. |
| Teacher-portal own salary + salary-class-report | `output/roles/teacher/text/teacher-salary*.txt` | teacher-portal | intentionally-excluded | forever | No | Teacher pay-free GLOBAL law; never buildable in any spec. |

**Verdict**: the current admin teacher surfaces are honest-but-shallow (Spec-007 depth); legacy proves a rich teacher-management model. 028 deepens the grounded, non-financial parts via modals/drawers/pickers/confirms/gates and routes ALL pay/finance/feedback/auth surfaces out — count default 97 (one plan decision on all-teachers-timetable).
