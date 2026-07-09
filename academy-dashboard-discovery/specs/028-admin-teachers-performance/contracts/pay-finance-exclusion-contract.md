# Contract — Pay-Finance Exclusion (Spec 028)
**MUST**: 028 introduces ZERO salary/payroll/compensation/payout figures or calculations. Omit Salary/Payout fieldsets from create/edit modals; assign-teacher pickers show name/subjects/workload only; no Compensations/Salary tab/drawer/modal on teacher.html; the `rating` field stays unsurfaced.
**Acceptance**
- Admin teacher `#page-body` (`teachers.html`/`teacher.html`) carries no `راتب|رواتب|salary|payroll|payout|compensation|أتعاب|جنيه|ريال|EGP|AED|EUR` (currency `$/€/£` in `${}` is source-only).
- No Salary/Payout fieldset in any teacher create/edit modal; no `teacher_hour_rate`/`t_hour_rate` in a picker.
- The single-value admin "Hour Rate" literal is OMITTED by default (only re-added if the plan proves it sits outside the `teacher-*` pay-free grep — it is on admin teacher.html, not a portal page).
- `teacher-performance.html` is the sanctioned exempt admin board — NOT asserted to 0, never linked from the portal.
- **STOP** on any teacher pay figure, a Salary/Payout fieldset, or a compensations surface on teacher.html.
