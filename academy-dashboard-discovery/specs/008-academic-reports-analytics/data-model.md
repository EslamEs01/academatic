# Data Model — Spec 008: Academic Reports and Operations Analytics Shell

**Fixture-only.** No DB schema, no API schema, no persistence. Every shape below maps 1:1 to a Django template-context object; signal/availability values are **labels** rendered as **icon+text chips** (never numeric/color-only). **Every number is a roll-up of an existing fixture summary — no metric is fabricated, no computed score/rank/percentile/chart, and no finance figure exists anywhere.**

**Reuses** the existing summaries unchanged — `OUTCOME_SUMMARY` (Spec 005), `STATUS_SUMMARY` + `SESSIONS` (Spec 001/003), `GROUP_SUMMARY` + `COURSES` (Spec 006), `TEACHERS_NEEDING_FOLLOWUP` (Spec 007), and the Spec 004 family/student attention computation — plus the labeled chips (`outcome-status`, `status-map`, `group-status`, `teacher-signals`). The only new resolver is the `report-summary` roll-up.

> Icons named below are drawn from the existing vendored sprite; the build throws on an unknown icon id, so exact ids are finalized in implementation. Every value is icon **+** text; none is numeric- or color-only. Chip tones are the 6 valid `.chip.tone-*` classes only (`completed/amber/neutral/upcoming/live/cancelled`).

---

## 1. ReportSummary  *(NEW roll-up resolver — `fixtures/reports.js`)*

The single display-only roll-up object; every field is an existing fixture count (no new metric):

| Field | Source (existing export) | Value |
|---|---|---|
| `sessions.total` | `SESSIONS.total` | 24 |
| `sessions.byStatus[]` | `STATUS_SUMMARY` | `[{cancelled:1},{upcoming:6},{live:3},{completed:14}]` |
| `outcomes.completed/studentAbsent/teacherAbsent/cancelledOrRescheduled/needsFollowUp/total` | `OUTCOME_SUMMARY` | attended/15… |
| `courses.active` | `COURSES.rows.filter(c=>c.statusId==='active').length` | 4 |
| `groups.total/active/needsAttention` | `GROUP_SUMMARY` | total 7 · needsAttention 2 |
| `teachers.needFollowUp` | `TEACHERS_NEEDING_FOLLOWUP` | 2 |
| `teachers.teacherAbsent / studentAbsentInTeacherSessions` | `OUTCOME_SUMMARY.teacherAbsent` / `OUTCOME_SUMMARY.studentAbsent` | — |
| `families.attention` | `FAMILIES.rows.filter(f=>f.attention).length` | 2 |
| `students.needFollowUp` | the `dashboard.js` computation (`statusId∈{suspended,stopped}` OR family `attention`) | — |

**Django**: a fixture context dict `report_summary`; no computation server-side beyond the same roll-ups.

## 2. ReportCategory  *(NEW — `REPORT_CATEGORIES` in `fixtures/reports.js`)*

`{ id, titleKey, descKey, icon, accent, availability (→ReportAvailability), route, summaryKeys[] }` — one per area (attendance · sessions · courses-groups · teachers · students-families) + the planned advanced reports. `route` is a real implemented page for `available` categories; **absent** (disabled-with-reason) for `planned`/`backendRequired`. Rendered via the extended `reportCard`. **The finance `revenue` placeholder is removed.** **Django**: `{% for category in report_categories %}` → `_report_card.html`.

## 3. ReportSection  *(view-model — a per-area summary block on `reports.js`)*

`{ titleKey, summaryHTML (labeled chips + counts), signal (→ReportSignal), links[] }` — one per area; renders the rolled-up counts (reusing the area's existing status chips) + a labeled report-signal + the source deep-links. Display-only. **Django**: a `{% for section in report_sections %}` of `{% include %}` blocks.

## 4. ReportSignal  *(NEW labeled map — `report-status.js`)*

`{ id, tone, icon, labelKey }`: `healthy`(`completed`,`check-circle`,`rep.signal.healthy`) · `needsFollowUp`(`amber`,`alert-triangle`,`rep.signal.needsFollowUp`) · `attentionRisk`(`cancelled`,`x-circle`,`rep.signal.attentionRisk`). An **authored display flag** summarizing an area's state — NOT a computed score/grade. Exported `REPORT_SIGNAL`, `SIGNAL_ORDER`, `reportSignalOf(id)`, `reportSignalChip(id)`. **Django**: `{{ section.signal|report_signal_chip }}`.

## 5. ReportAvailability  *(NEW labeled map — `report-status.js`)*

`{ id, tone, icon, labelKey }`: `available`(`live`,`check`,`rep.avail.available`) · `demoOnly`(`upcoming`,`sparkles`,`rep.avail.demoOnly`) · `planned`(`neutral`,`clock`,`rep.avail.planned`) · `backendRequired`(`amber`,`lock`,`rep.avail.backendRequired`). Labels each category card honestly. Exported `REPORT_AVAILABILITY`, `AVAILABILITY_ORDER`, `availabilityOf(id)`, `availabilityChip(id)`. **Django**: `{{ category.availability|report_availability_chip }}`.

## 6. AcademicOperationsSummary  *(view-model — the overview band)*

A `summaryCards`-style band of the headline rolled-up counts (e.g. completed sessions · teacher absences · student absences · groups needing attention · teachers needing follow-up · students/families needing follow-up) — each icon+label+count, display-only, each in its area's tone. **No score/health-%/chart.** **Django**: `{% for tile in academic_ops %}`.

## 7. AttendanceOutcomeReport  *(resolved — reuses Spec 005)*

From `OUTCOME_SUMMARY`: completed (`attended`), **teacherAbsent**, **studentAbsent** (two DISTINCT labeled `outcome-status` chips), cancelledOrRescheduled, needsFollowUp — + a `attendance.html` deep-link. No attendance engine/mutation. **Django**: `{{ outcome_summary }}` + `{% url 'attendance' %}`.

## 8. SessionsTimetableReport  *(resolved — reuses Spec 001/003)*

From `STATUS_SUMMARY` (live/upcoming/completed/cancelled via the session `status-map` chips) + `SESSIONS.total` + an upcoming hint — + `sessions.html` and `schedule.html#view=timetable` deep-links. No scheduling engine. **Django**: `{% for s in status_summary %}` + `{% url 'sessions' %}` / `{% url 'schedule' %}#view=timetable`.

## 9. CourseGroupReport  *(resolved — reuses Spec 006)*

Active-courses count + `GROUP_SUMMARY` (total/active + **needsAttention** via the `group-status` vocabulary) — + `courses.html`/`groups.html` deep-links. No course/group engine. **Django**: `{{ group_summary }}` + `{% url 'courses' %}` / `{% url 'groups' %}`.

## 10. TeacherReport  *(resolved — reuses Spec 007)*

`TEACHERS_NEEDING_FOLLOWUP` + teacher absences (`OUTCOME_SUMMARY.teacherAbsent`) + **student absences in teacher sessions** (`OUTCOME_SUMMARY.studentAbsent`) — labeled, distinct — + `teacher-performance.html`/`teacher.html` deep-links. **NO score/rank/leaderboard.** **Django**: `{% url 'teacher-performance' %}` / `{% url 'teacher' id %}`.

## 11. StudentFamilyReport  *(resolved — reuses Spec 004)*

Students needing follow-up (the `dashboard.js` computation) + families with attention (`FAMILIES.rows.filter(f=>f.attention)`) — + `students.html`/`student.html`/`families.html`/`family.html` deep-links. No portal/enrollment engine. **Django**: `{% url 'students' %}` / `{% url 'families' %}`.

## 12. ReportAction  *(action — `report-actions.js` `reportActions()`)*

`{ key, kind, hook(s), labelKey }`; `kind ∈ { demo, confirm→demo, disabled-with-reason }`. Catalogue: **Print report** → `data-demo-action`→toast; **Export CSV / Export PDF / Share report / Schedule report** → `data-disabled-reason` (+`data-reason-key` "requires the backend export module — out of current scope") OR `data-confirm`→demo-toast where a confirm reads better. **No real file/export/send/scheduled job/persistence.** Reuses existing hooks — no new hook. **Django**: static markup; behavior is `enhance.js`.

## 13. PlannedReport  *(view-model — advanced reports honestly labeled)*

`{ id, titleKey, descKey, availability (planned|backendRequired), reasonKey }` — e.g. monthly reports, data analysis — rendered as labeled `reportCard`s with a disabled-with-reason and **no route** (no dead link). Maps to the still-planned `monthlyReports`/`dataAnalysis`/`sessionsAnalysis` nav items (which stay planned in `nav.config.js`). **Django**: `{% for r in planned_reports %}`.

---

## Map reconciliation (which labeled vocabulary renders WHERE — no shadowing)

| Vocabulary | Renders on | Never on |
|---|---|---|
| **ReportAvailability** (available/demoOnly/planned/backendRequired) | category cards | the operations overview tiles |
| **ReportSignal** (healthy/needsFollowUp/attentionRisk) | the operations overview + per-area sections | a category card's availability slot |
| **outcome-status** (attended/teacherAbsent/studentAbsent/…) — reused | the Attendance & Teacher sections | category cards |
| **session status-map** (live/upcoming/completed/cancelled) — reused | the Sessions section | category cards |
| **group-status** (active/trial/full/…) — reused | the Courses & Groups section | category cards |

`report-signal` and `report-availability` are two distinct new vocabularies (`rep.signal.*` / `rep.avail.*`), separate from the six existing maps and from each other.

## Fixture coherence rules (verified at build + by smoke)

- Every report number equals its source fixture export (e.g. the Teachers section's "teacher absences" === `OUTCOME_SUMMARY.teacherAbsent`; "groups needing attention" === `GROUP_SUMMARY.needsAttention`; "students needing follow-up" === the `dashboard.js` count) — **the Reports shell and the dashboard chips show the same numbers**.
- **teacherAbsent and studentAbsent always render as the two DISTINCT Spec 005 chips** in the Attendance and Teacher sections — never summed into one "absences".
- Every `available` category card has a **real route** to an implemented page; every `planned`/`backendRequired` card has **no route** (disabled-with-reason) — zero dead links.
- **No finance/salary/revenue field, figure, card, or widget appears in any shape, summary, tile, section, or action.** No numeric-only or color-only signal anywhere; **no computed score/rank/percentile/chart is produced at build or runtime.**
