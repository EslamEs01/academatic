# Teacher Pay-Free Register (Spec 036)

The GLOBAL teacher pay-free law is binding on every surface this spec touches (the two teachers.html fold anchors + the two new teacher-performance.html tabs). **No pay/compensation vocabulary or figure may appear.**

## Forbidden tokens (must be 0 in any new/folded teacher surface — copy AND rendered output)
`salary` · `fixed_salary` · `salary_type` · `hour_rate` · `teacher_hour_rate` · `t_hour_rate` · `rate` · `fine` · `fine_per_hour` · `payout` · `payroll` · `payment` · `compensation` · any currency symbol/figure · any money amount · any computed pay total · any teacher-payment figure.

## Allowed (display-only, non-pay)
- Teacher names, subject/course/group labels, status chips.
- **Session/attendance COUNTS as authored literals** (completed / teacher-absent / student-absent / cancelled / upcoming) — these are raw counts, explicitly NOT salary/pay.
- Categorical workload/signal/KPI labels (light/medium/high; follow-up), performance notes.
- `backendRequired` final Save/Assign/Approve gates.

## Surface-by-surface pay-free proof
| Surface | Pay-free basis |
|---|---|
| `trn-add` / `trn-edit` (Add/Edit teacher) | The excluded legacy pay fieldset is OMITTED (teacher-actions.js:36); fields = names/email/phone/status/subjects/level/courses/city/country/notes + CV gate. 0 pay field. |
| `trn-categories` (teacher categories) | name/status/description only; member-count label; 0 pay field. |
| **sessionsKpi tab** (new) | authored session COUNTS + attendance/quality LABELS only; no rate/salary/fine/payout figure, no `%`-of-pay. |
| **monthlyPerf tab** (new) | authored month + categorical trend/status + notes; no pay figure, no computed pay total. |

## Boundary note (existing, not introduced by 036)
- `teacher-performance.html` today shows raw session COUNT tiles (completed/absent/cancelled) and a workload utilization `%` (teachers.html summary) — these are pre-existing Spec-007 workload metrics, **not pay**. Spec 036's new tabs follow the same count-and-label pattern and add **no** pay figure and **no** computed score/rank.
- The admin `teacher-performance` board is the sanctioned admin exempt surface (Spec 024 B-07) — display-only, never linked from the teacher PORTAL; the teacher portal stays pay-free and byte-identical.

## Enforcement
- Smoke: a teacher-pay grep (the standing `payHit`/pay-token guards) runs on the teacher surfaces and stays byte-verbatim; the new tabs add no pay token. Any pay token in a new/folded teacher body = STOP.
