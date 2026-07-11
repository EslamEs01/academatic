# Future-Owner Register (Spec 036)

Capabilities legacy showed that Spec 036 will NOT build (they need a backend, carry pay, or belong to another owner). Recorded so nothing is silently dropped.

| Capability | Legacy evidence | Why deferred | Honest treatment in 036 | Owner |
|---|---|---|---|---|
| **Teacher Salary/Payout fieldset** (currency/fixed_salary/salary_type/hour_rate/fine_per_hour/payout_method/paymob_*/payoneer/payout_email) on Add-Teacher | `management-teachers-create.md:47-52,107-141` | Teacher pay-free law — FORBIDDEN FOREVER on any teacher surface | OMITTED from `trn-add` (already omitted) | **excluded forever** (never built) |
| **Add-Teacher password / username / Zoom credentials** | `management-teachers-create.md` (password, zoom_*) | No credential/secret law | password/reset = disabled-with-reason gate; no zoom fields | **future-backend** (auth) |
| **Teacher-category persistence** (create/rename/delete/assign-members) | `management-teacher-categories(.-create/-members).md` | Requires category-write backend | `trn-categories` shows the list + Create form + assign, all `backendRequired` gates | **future-backend** |
| **Add-Teacher persistence** | `management-teachers` POST | Requires teacher-write backend | `trn-add` Save = backendRequired gate | **future-backend** |
| **Computed sessions-KPI `Percentage`** | `management-class-feedback.md:122-129` (Percentage column) | No-computed-score/rank/chart law | rendered as authored counts + categorical labels only (NO %) | **excluded** (never computed) |
| **Computed monthly `Percentage`** (per teacher + per category) | `management-teacher-feedback.md:170-188` | Same | rendered as authored month + categorical trend/status + notes (NO %) | **excluded** (never computed) |
| **Teacher-feedback workflow** (Add feedback: date/teacher/note; Add/Deactivate feedback categories) | `management-teacher-feedback.md:107-138,221-240` | A feedback authoring engine already folded into `reports.html` | not duplicated here; any surfaced write = gate | **Spec 029 (reports/feedback) — already display-only** |
| **All-teachers timetable** ("Teachers Schedule") | `management-all-teachers-timetable.md` | Already folded into `schedule.html` teacher lens (Spec 028) | not in scope | **done (Spec 028 / schedule.html)** |
| **Per-teacher compensations / monthly-classes** | `management-teachers-1-compensations-*.md`, `-monthly-classes.md` | Pay data | excluded (pay-free) | **excluded forever** |
| **Standalone add-teacher.html (mirror add-family)** | — | Single flat form folds cleanly into the drawer | not built | **future-optional** (Spec 033 fallback, +2) |

## Naming-collision notes (must not conflate)
- Legacy **"Classes KPI"** (`class-feedback`) = the sessionsKpi board; **"Monthly Performance"** (`teacher-feedback`) = monthlyPerf. Both are read-only reports with a computed `Percentage` we do NOT reproduce.
- `teacher_hour_rate` fields in `form-inventory.md` belong to **course/session** forms, NOT the add-teacher form — do not surface them.
