# Contract — Assign Teacher (Spec 028, the M-N handoff)
**MUST**: course/group assign-teacher (and the teacher-profile assign-course/group gates) become display-only single-select candidate-picker drawers whose final Assign is a `backendRequired` gate; the teacher stays read-only otherwise; NO rate/salary figure, NO roster/schedule/relationship mutation.
**Acceptance**
- `course.html`/`group.html` bake `crs-assign-teacher`/`grp-assign-teacher` templates (SEPARATE from the `grp-assign` student drawer); `teacher.html` bakes `trn-assign-course`/`trn-assign-group`; each opens a display-only list → backendRequired final.
- Candidate rows show teacher name + subjects/workload (or course/group name) ONLY — never `teacher_hour_rate`/`t_hour_rate`.
- No fake assignment / roster / timetable / session-reassignment mutation; no persisted selection.
- **Fail** on any fake assign, a surfaced rate figure, or session-level reassignment creep (→026).
