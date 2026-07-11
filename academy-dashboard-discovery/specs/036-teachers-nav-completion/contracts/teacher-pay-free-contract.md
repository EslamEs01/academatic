# Contract — Teacher Pay-Free (GLOBAL)

Binding on every surface Spec 036 touches (the two teachers.html fold anchors + the two new teacher-performance tabs). (Plan mirror of `../teacher-pay-free-register.md`.)

## Forbidden tokens (0 in any new/folded teacher body — copy AND rendered output)
`salary` · `fixed_salary` · `salary_type` · `hour_rate` · `teacher_hour_rate` · `t_hour_rate` · `rate` · `fine` · `fine_per_hour` · `payout` · `payroll` · `payment` · `compensation` · any currency symbol/figure · any money amount · any computed pay total · any teacher-payment figure.

## Allowed (non-pay)
- Teacher names, subject/course/group labels, status chips.
- Session/attendance COUNTS as authored literals (completed/teacher-absent/student-absent/cancelled) — counts, NOT pay.
- Categorical workload/quality/trend labels; performance notes.
- `backendRequired` final gates.

## Surface proof
- `trn-add`/`trn-edit`: legacy Salary + Payout fieldsets OMITTED (teacher-actions.js:36). 0 pay field.
- `trn-categories`: name/status/description only. 0 pay field.
- sessionsKpi tab: counts + categorical quality labels. 0 pay figure, no `%`-of-pay.
- monthlyPerf tab: month + categorical trend/status + notes. 0 pay figure.

## Enforcement
- The standing teacher-pay smoke grep (`payHit`/pay guards) runs on the teacher surfaces and stays byte-verbatim; the new tabs + folds add 0 pay token. The 16 teacher-PORTAL files stay byte-identical. `teacher-performance.html` is the sanctioned admin exempt board (Spec 024 B-07), never linked from the portal.
- Any pay token in a touched teacher body = STOP.
