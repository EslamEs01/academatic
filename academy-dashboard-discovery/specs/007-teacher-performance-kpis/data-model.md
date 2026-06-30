# Data Model — Spec 007: Teacher Performance and Academic KPIs

**Fixture-only.** No DB schema, no API schema, no persistence. Every shape below maps 1:1 to a Django template-context object; status/workload/follow-up values are **labels** rendered as **icon+text chips** (never numeric/color-only) and are **authored fixture flags**, never computed scores/ranks/aggregates. **No salary/payroll/compensation/payout field exists anywhere in this model** (finance is a future spec).

**Reuses** the existing fixtures unchanged — `TEACHERS` (Spec 002), `COURSES` (Spec 006, `teacherIds`), `GROUPS` (Spec 006, `groupsOfTeacher`), `SCHEDULE_WEEK` (Spec 003, block `trainer.id`), `SESSION_OUTCOMES` (Spec 005, row `trainer.id` + the `outcome-status` map), `STUDENTS`/`FAMILIES` (Spec 004) — plus the labeled maps (`status-map`, `outcome-status`, `course-status`, `group-status`, `enrollment-status`, `family-status`) which stay untouched. The only new resolver is `outcomesOfTeacher(id)`.

> Icons named below are drawn from the existing vendored lucide sprite + app icon registry; the build throws on an unknown icon id, so exact ids are finalized in implementation (as in Spec 006 T004). Every value is icon **+** text; none is numeric- or color-only.

---

## 1. Teacher (academic)  *(EXTENDED — `TEACHERS.rows`, via `tr()`)*

The existing row gains authored academic-signal fields; **no finance fields**. Resolved counts come from the resolvers (§6–§11), single-sourced — the row stores only authored values.

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'sara'…'huda'` (8 teachers) — unchanged |
| `nameKey` | i18n key | `data.t.<id>` — unchanged |
| `accent` | string | medallion/avatar tone — unchanged |
| `subjects[]` / `subjectsKeys[]` / `primary` | string[] / keys / string | unchanged (`tr()` derives `subjectsKeys`/`primary`) |
| `avail` | enum → TeacherAvailability | `available\|busy\|off` — **reused** (`TEACHER_AVAIL`), unchanged |
| `util` / `sessions` / `rating` / `hours` | number | existing display facts (unchanged) — display-only, never a score |
| `bioKey` | i18n key | unchanged |
| **`statusId`** | enum → TeacherStatus | **NEW** `active\|paused\|inactive` (authored) |
| **`workload`** | enum → TeacherWorkloadSignal | **NEW** `light\|balanced\|high` (authored fixture flag, never computed) |
| **`followUp`** | enum → TeacherFollowUpSignal | **NEW** `strongDelivery\|stable\|needsFollowUp\|attentionRisk` (authored flag) |
| **`notesKey`** | i18n key | **NEW** teacher notes (display-only) |

**Authored signal seed** (implementation may refine; zero-data still renders cleanly): `sara` active/balanced/strongDelivery · `mohammed` active/high/stable · `layan` active/balanced/stable · `abdullah` paused/light/attentionRisk (no group, draft course) · `reem` active/balanced/strongDelivery · `nora` active/high/stable · `khalid` active/light/stable · `huda` inactive/light/needsFollowUp (zero schedule/outcomes).

**Relationships.** `Teacher 1—* Group` (`groupsOfTeacher`), `Teacher *—* Course` (`COURSES.teacherIds`), `Teacher 1—* Block` (`SCHEDULE_WEEK.trainer.id`), `Teacher 1—* SessionOutcome` (`outcomesOfTeacher`), `Teacher *—* Student/Family` (via the teacher's groups' rosters). **Django**: `{% for teacher in teachers %}` → `teacher/<id>`.

---

## 2. TeacherStatus  *(NEW labeled map — `teacher-status.js`)*

`{ id, tone, icon, labelKey }`: `active`(`completed`,`check-circle`,`trn.status.active`) · `paused`(`amber`,`pause-circle`,`trn.status.paused`) · `inactive`(`neutral`,`user-x`,`trn.status.inactive`). Collapses the legacy active/inactive/incomplete/unconfirmed/deleted into three calm labels. Exported `TEACHER_STATUS`, `TEACHER_STATUS_ORDER = ['active','paused','inactive']`, `teacherStatusOf(id)` (fallback `active`), `teacherStatusChip(id)`. A **seventh** vocabulary, distinct from the session/lifecycle/outcome/course/group/enrollment maps. **Django**: `{{ teacher.statusId|teacher_status_chip }}`.

## 3. TeacherAvailability  *(REUSED unchanged — `TEACHER_AVAIL` in `fixtures/teachers.js`)*

`{ tone, labelKey }`: `available`(`completed`,`trn.avail.available`) · `busy`(`amber`,`trn.avail.busy`) · `off`(`neutral`,`trn.avail.off`). Used as the **schedule-availability** chip on the profile banner + the Teachers filter facet. Not re-defined. **Django**: `{{ teacher.avail|teacher_avail_chip }}`.

## 4. TeacherWorkloadSignal  *(NEW labeled map — `teacher-signals.js`)*

`{ id, tone, icon, labelKey }`: `light`(`sky`,`trending-down`,`trn.workload.light`) · `balanced`(`teal`,`activity`,`trn.workload.balanced`) · `high`(`amber`,`trending-up`,`trn.workload.high`). A **display-only authored fixture flag** backed by the teacher's session/hour counts — **never** a computed workload metric. Exported `TEACHER_WORKLOAD`, `WORKLOAD_ORDER = ['light','balanced','high']`, `workloadOf(id)`, `workloadChip(id)`. **Django**: `{{ teacher.workload|workload_chip }}`.

## 5. TeacherFollowUpSignal  *(NEW labeled map — `teacher-signals.js`)*

`{ id, tone, icon, labelKey }`: `strongDelivery`(`completed`,`award`,`trn.signal.strongDelivery`) · `stable`(`teal`,`check-circle`,`trn.signal.stable`) · `needsFollowUp`(`amber`,`alert-triangle`,`trn.signal.needsFollowUp`) · `attentionRisk`(`coral`,`flag`,`trn.signal.attentionRisk`). A **display-only authored flag** — NOT a score, rank, percentile, or predicted risk. Exported `TEACHER_SIGNAL`, `SIGNAL_ORDER = ['strongDelivery','stable','needsFollowUp','attentionRisk']`, `signalOf(id)`, `signalChip(id)`. The `needsFollowUp` id coincides with the `outcome-status` follow-up **flag** but lives in a separate map/namespace (`trn.signal.*`) and renders only in teacher contexts (see §16). **Django**: `{{ teacher.followUp|teacher_signal_chip }}`.

## 6. TeacherCourseLink  *(resolved — display-only)*

`COURSES.rows.filter(c => c.teacherIds.includes(teacherId))` → calm course rows for the profile **Courses** tab + the `coursesCount` banner KPI. Each row carries the course `titleKey`, `subjectKey`, `levelKey`, labeled `course-status` chip, and a **"View course"** real `<a href="./course.html">`. No assignment engine. **Django**: `{% for course in teacher.courses %}`.

## 7. TeacherGroupLink  *(resolved — `groupsOfTeacher(id)`)*

`groupsOfTeacher(teacherId)` → the teacher's cohort(s) for the **Groups** tab + the `groupsCount` KPI. Each group card shows name + level + `group-status` chip + schedule summary + `enrolledCount/capacity` + a **"View group"** real `<a href="./group.html">`. In the current fixture each teacher maps to ≤1 group (`abdullah` → **none** → "no groups yet"). No cohort engine. **Django**: `{% for group in teacher.groups %}`.

## 8. TeacherStudentLink  *(resolved — display-only)*

The union of `group.studentIds[]` across the teacher's groups → `STUDENT_BY_ID` → calm student rows for the **Students** tab + the `studentsCount` KPI. Each row: avatar + name + level mini + a **"View student"** real `<a href="./student.html">`. **Django**: `{% for student in teacher.students %}`.

## 9. TeacherFamilyLink  *(resolved — display-only)*

For each linked student, `familyOf(student.familyId)` → a **family chip-link** (`<a href="./family.html">`) on the student row / Follow-up item. No portal. **Django**: `{{ student.family|family_chip_link }}`.

## 10. TeacherScheduleSignal  *(resolved — `SCHEDULE_WEEK` blocks where `trainer.id === id`)*

The teacher's weekly blocks → the **Timetable** tab via the reused `scheduleAgenda` (+ `cohortTimetablePanel`/`cohortTemplates`) + a `schedule.html#view=timetable` deep-link; `upcomingCount` is the count of upcoming blocks. Zero blocks (e.g. `huda`) → "no recent sessions". No scheduling engine. **Django**: `{% for block in teacher.schedule %}` + the shared `_appointment_details.html` include.

## 11. TeacherOutcomeSignal  *(resolved — NEW `outcomesOfTeacher(id)`)*

**NEW** `outcomesOfTeacher(teacherId) = SESSION_OUTCOMES.rows.filter(r => r.trainer.id === teacherId)` (in `fixtures/attendance.js`, beside `outcomesOfStudent`/`outcomesOfFamily`). Feeds the **Sessions & Outcomes** tab via the reused `outcomeRow` + the **canonical** `outcomeTemplate` drawer (+ `cohortOutcomesPanel`/`cohortTemplates`) + an `attendance.html` deep-link, and the per-teacher **count breakdown**: `completedCount` (`attended`), `teacherAbsentCount` (`teacherAbsent`), `studentAbsentCount` (`studentAbsent`), `cancelledCount` (`cancelled`+`rescheduled`). **teacherAbsent and studentAbsent stay two distinct labeled chips** (Spec 005 `outcome-status`), never conflated. Zero outcomes → "no outcomes yet". No outcome/attendance engine. **Django**: `{% for outcome in teacher.outcomes %}` + the shared `_outcome_details.html` include.

## 12. TeacherProfile  *(view-model — baked tabbed template, `pages/teacher.js`)*

A baked profile template (one representative teacher, **`sara`**), composed of `profileBanner` (medallion + name + `teacher-status` chip + meta [subjects · availability · workload] + ≤4 `statMini` KPIs [courses · groups · students · upcoming] + demo actions) over the shared `tabs` widget with **8 baked panels**: `overview · courses · groups · timetable · sessions-outcomes · students · follow-up · notes` — exactly one visible at load (Overview). Reuses `cohortTimetablePanel`/`cohortOutcomesPanel`/`cohortTemplates`. `activeId:'teachers'`, NOT a nav item; Django → `teacher/<id>`. **Django**: `templates/admin/teacher.html`, tabs → `{% if view == '…' %}`.

## 13. TeacherPerformanceSummary  *(view-model — `pages/teacher-performance.js`)*

The board's two display-only structures: (a) **KPI tiles** — academy-wide fixture **counts**: active teachers · completed sessions · teacher absences · student absences in teacher sessions · cancelled/rescheduled · groups needing attention · teachers needing follow-up (`followUp ∈ {needsFollowUp, attentionRisk}`), rendered via `summaryCards`/`kpiCard`/`status-tile`; (b) a **per-teacher comparison list** — each teacher's identity + `workload` chip + `followUp` chip + raw counts (completed/teacherAbsent/studentAbsent/groups) + a **"View profile"** real `<a href="./teacher.html">`, rendered via `directoryCard`/`statMini`. **Counts only — no score, rank, percentile, chart, or salary.** Sorted/filtered only via the existing client-side facet mechanism. **Django**: `{% for row in teacher_perf %}`.

## 14. TeacherFollowUpItem  *(view-model — the board's follow-up queue + the profile Follow-up tab)*

A calm fixture follow-up entry: a teacher's needs-follow-up outcome / group-needing-attention, with `titleKey` + context (group/student/family) + labeled chip + deep-links (`teacher.html`/`group.html`/`student.html`/`family.html`/`attendance.html`) + an honest action (§15). No follow-up engine, no persistence. Empty → "nothing needs follow-up". **Django**: `{% for item in follow_up_queue %}`.

## 15. TeacherAction  *(action — honest, `components/teacher-actions.js` `teacherActions()`)*

`{ key, kind, hook(s)/target, labelKey }`; `kind ∈ { demo, confirm→demo, disabled-with-reason, real-link }`. Catalogue: **add/edit teacher**, **message teacher**, **add follow-up note** → `data-demo-action` → toast; **notify family** → `data-demo-action` → toast (or confirm→toast); **assign course / assign group / print-export summary** → `data-disabled-reason` (+ `data-reason-key`, "requires the backend, out of scope"); **open timetable** → real `<a href="./schedule.html#view=timetable">`; **view attendance** → real `<a href="./attendance.html">`. **No action mutates data; no salary/finance action exists.** Reuses the existing `data-demo-action`/`data-confirm`/`data-disabled-reason`/`data-toast` hooks — no new hook. **Django**: action markup is static; behavior is `enhance.js`.

## 16. DashboardTeacherSignal  *(minimal — one chip, `pages/dashboard.js`)*

ONE fixture-backed chip — "teachers needing follow-up" count (`followUp ∈ {needsFollowUp, attentionRisk}`) — folded into the **existing** people/attention signal card (beside the Spec 004 students-attention + Spec 005/006 chips), deep-linking to `teacher-performance.html`. No new stat wall, no ranking, no salary widget, no chart. **Django**: `{{ signals.teachers_followup }}` in the existing card.

---

## Map reconciliation (which labeled vocabulary renders WHERE — no shadowing)

| Vocabulary | Renders on | Never on |
|---|---|---|
| **TeacherStatus** (active/paused/inactive) | teacher card + profile banner | session/course/group rows |
| **TeacherAvailability** (available/busy/off) — reused | profile banner meta + Teachers filter | as a status (it is availability) |
| **TeacherWorkloadSignal** (light/balanced/high) | teacher card + banner + perf comparison row | as a session/outcome chip |
| **TeacherFollowUpSignal** (strongDelivery/stable/needsFollowUp/attentionRisk) | teacher card flag + perf comparison row + follow-up queue | as a per-session outcome chip |
| **outcome-status** (attended/teacherAbsent/studentAbsent/…) — reused | Sessions & Outcomes rows + drawer | the teacher card/banner |

The four teacher chips (status · availability · workload · follow-up) are orthogonal and the card shows **status + workload + one follow-up flag only when needed** (no chip clutter); the banner shows status + workload + availability; the performance board carries the follow-up signal. `needsFollowUp` (teacher signal) and the `outcome-status` follow-up flag share a label concept but render in different surfaces and carry distinct map namespaces.

## Fixture coherence rules (verified at build + by smoke)

- `outcomesOfTeacher(id)` returns only rows whose `trainer.id === id`; the per-teacher `completed/teacherAbsent/studentAbsent/cancelled` counts equal the resolved outcome breakdown (no fabricated number).
- Every teacher's `groupsCount/coursesCount/studentsCount/upcomingCount` equals the resolved `groupsOfTeacher` / `COURSES.teacherIds` / group-roster / schedule-block counts — display matches resolution.
- A teacher with **no group** (`abdullah`) renders "no groups yet" (no dead `group.html` link); a teacher with **zero schedule/outcomes** (`huda`) renders calm empty Timetable/Outcomes states with zeroed counts — never a broken/misleading metric.
- `teacherAbsent` and `studentAbsent` always render as the two **distinct** Spec 005 outcome chips; they are never summed into a single "absences" number.
- The dashboard "teachers needing follow-up" chip count equals `TEACHERS.rows.filter(r => r.followUp==='needsFollowUp' || r.followUp==='attentionRisk').length`.
- **No salary/finance field, figure, or widget appears in any shape, count, tile, row, drawer, or action.** No numeric-only or color-only status anywhere; every status/workload/signal renders via its labeled map; **no computed score/rank/percentile is produced at build or runtime.**
