# Legacy Teachers Coverage (Spec 036)

Legacy capability → evidence → current state → disposition, for the four scoped items and adjacent legacy surfaces.

| Legacy capability | Evidence path | Current frontend state | Disposition | Fix in 036? | Owner | Acceptance check |
|---|---|---|---|---|---|---|
| **Add New Teacher** form (name/email/phone/status/subjects/level/courses/notes/CV) | `management-teachers-create.md:85-141` | `trn-add` drawer on teachers.html | **Fold-anchor** → teachers.html | **Yes** (nav flip) | 036 | anchor→teachers.html; trn-add reachable; Save gated |
| Add-Teacher **Salary information** (currency/fixed_salary/salary_type/hour_rate/fine_per_hour) | `management-teachers-create.md:47,107-112` | OMITTED from trn-add | Excluded FOREVER (pay-free) | No | excluded | 0 pay field/token in teacher bodies |
| Add-Teacher **Payout details** (payout_method/paymob_*/payoneer/payout_email/notes) | `management-teachers-create.md:52,133-141` | OMITTED | Excluded FOREVER (pay-free) | No | excluded | 0 payout token |
| Add-Teacher **password / Zoom credentials** | `management-teachers-create.md` | OMITTED (reset = gate) | Deferred (auth) | No | future-backend | no `type=password`/credential |
| **Teachers Category** list + CRUD (name/description/status + assign members[]) | `management-teacher-categories(.-create/-members).md` | `trn-categories` drawer (list + Create form + assign gate) | **Fold-anchor** → teachers.html | **Yes** (nav flip) | 036 | anchor→teachers.html; drawer reachable; Save/assign gated |
| **Classes KPI** report (teacher + Percentage + session count) | `management-class-feedback.md:122-129` | none | **Fold as display tab** (counts + categorical labels; **NO computed %**) | **Yes** | 036 | `#view=sessions-kpi` opens display board; no computed %/chart |
| **Monthly Performance** report (teacher + Percentage + note; category %) | `management-teacher-feedback.md:170-188` | none | **Fold as display tab** (month + categorical trend/status + notes; **NO computed %**) | **Yes** | 036 | `#view=monthly` opens display board; no computed %/chart |
| Teacher-feedback authoring (add feedback / add-deactivate categories) | `management-teacher-feedback.md:107-138,221-240` | display-only via reports (Spec 029) | Not duplicated; writes = gates | No | Spec 029 (done) | no second feedback engine |
| All-teachers timetable ("Teachers Schedule") | `management-all-teachers-timetable.md` | folded into schedule.html teacher lens | Already covered | No | Spec 028 (done) | not re-built |
| Per-teacher compensations / monthly-classes | `management-teachers-1-compensations-*.md` | not built | Excluded (pay) | No | excluded | no pay surface |

## Critical no-computed-figure finding
Legacy "Classes KPI" and "Monthly Performance" each rendered a **computed `Percentage`** column. Under the standing no-computed-score/rank/chart law, Spec 036 renders **authored counts + categorical labels** instead — it never reproduces the percentage. Neither legacy page had a chart/canvas or any pay figure, so the display-only tabs are faithful minus the forbidden computed metric.

## Disposition summary
- **2 real legacy pages folded to anchors** (addTeacher, teacherCategories → existing teachers.html drawers).
- **2 read-only legacy reports folded as display tabs** (sessionsKpi, monthlyPerf → teacher-performance.html), with the computed `Percentage` deliberately dropped.
- **0** capabilities silently dropped (pay/credential/compensation exclusions + the feedback-engine handoff recorded in `future-owner-register.md`).
