# Legacy Families / Students Coverage (Spec 035)

Legacy capability → evidence → current frontend state → disposition, for the four scoped items and their adjacent legacy surfaces.

| Legacy capability | Evidence path | Current frontend state | Disposition | Fix in 035? | Owner | Acceptance check |
|---|---|---|---|---|---|---|
| **Families Category** list (CRUD): #/Name/Description/Status/Count/Settings | `output/roles/admin/pages/management-categories-families.md:39,152,159` | `families.html` has a category **filter** (families.js:32) + category chips | **Fold-anchor** → families.html (browse-by-category) | **Yes** (nav flip) | 035 | nav `familyCategories` → anchor families.html; 0 «قريبًا» |
| Family category **create** (name/status/description) | `management-categories-families-create.md:38,79-81` | Not built | Deferred (needs persistence) | No | future-backend | recorded in future-owner-register |
| Family category **assign families** (`member_id[]`) | `management-categories-families-2-assign.md:39,72,80` | `fam-cat` reclassify drawer previews assignment, Save gated (family.js:149-165) | Display-only preview stays; assign gated | Partial (reachable via fold) | future-backend | `fam-cat` Save = backendRequired, INERT select |
| **Search Schedule** (availability finder): time-window + category + availability/courses toggles → available teachers | `management-search-schedule.md:39,72-91,123` | No surface (schedule.html = browse only) | **New standalone page** `schedule-search.html`(+.en) | **Yes** | 035 | page loads AR/EN; search form + results + empty; Book/Assign gated |
| "Teachers Schedule" (timetable browse) | `management-search-schedule.md:177` | Exists as `schedule.html` (List/Timetable) | Already covered — **not** scheduleSearch | No | (done) | distinct from schedule-search |
| **Student results** (qualitative "Total Report", narrative; approve/view) | `management-student-1.md:794`; `management-forms-students.md:209`; 016 inventory:37; 027 coverage:35, M-R | `student.html` **Results tab** (`resultSummary`, fixture-only, no score) | **Deep-link** → student.html#view=results | **Yes** (nav flip) | 035 | nav anchors to Results tab; no computed score/chart |
| "Request Result" (trial-scheduling response inbox) | `management-schedule-trials-response.md:99,104,142,147` | Not academic results (do not conflate) | Out of scope | No | future-backend/ops | not mapped to studentResult |
| **Student evaluation** (qualitative: meeting log + narrative report + "Class Remark" categorical) | `management-families-feedback.md:38`; `management-student-1.md:698,901`; 016 inventory:38; 027 M-R | `student.html` **Evaluation tab** (`evaluationRubric`, fixture-only rubric, no score) | **Deep-link** → student.html#view=evaluation | **Yes** (nav flip) | 035 | nav anchors to Evaluation tab; no computed score/total |
| Student "Send Report" / feedback authoring workflow | `management-forms-students.md`; `management-families-feedback.md` | Display-only via reports/evaluation surfaces (Spec 029) | Already display-only | No | Spec 029 (done) | no new report engine |

## Critical no-computed-score finding
A crawl-wide grep for `grade|gpa|score|exam|assessment|rubric|percentage|outcomes` across `output/roles/admin/text/` + `output/combined/*.md` returned **zero** academic-scoring hits. Legacy results/evaluation were **purely qualitative** (narrative reports + an Excellent→Needs-Improvement remark dropdown). Reproducing any computed score/GPA/rank/percentage/chart for students would be **inventing data** — forbidden. This is why studentResult/studentEvaluation resolve to display-only deep-links, never aggregate boards.

## Disposition summary
- **2 real legacy pages** faithfully honored: familyCategories (fold to existing surface) + scheduleSearch (new standalone page).
- **2 no-legacy-page items** resolved conservatively: studentResult/studentEvaluation → deep-links to existing display-only student tabs.
- **0** capabilities silently dropped (deferrals recorded in `future-owner-register.md`).
