# Corrective Surfaces Register — Spec 037

Records every missing/weak surface found by the audit and its correction. Verdict: the two Reports/Analytics items are «قريبًا» (needs surface); the three flagged-035 items are UX-weak (needs stronger surface). **All correctives are count-0 folds.** No other admin item needs a corrective within Spec 037 scope (materials/certificateRequests→039, settings×6→040, finance×7→038 are owner-assigned and honest).

## Corrective 1 — monthlyReports

| Field | Value |
|---|---|
| Item | monthlyReports / التقارير الشهرية |
| Problem | `planned` «قريبًا» — no surface at all |
| Correction type | fold as display-only tab |
| Target route | `reports.html#view=monthly` |
| New page needed? | No |
| Count impact | 0 |
| Owner | Spec 037 |
| Acceptance check | deep-link opens Monthly tab (AR/EN); authored month board; exports gated; no computed/canvas/finance |

## Corrective 2 — dataAnalysis

| Field | Value |
|---|---|
| Item | dataAnalysis / تحليل البيانات |
| Problem | `planned` «قريبًا» — no surface |
| Correction type | fold as display-only tab |
| Target route | `reports.html#view=analysis` |
| New page needed? | No |
| Count impact | 0 |
| Owner | Spec 037 |
| Acceptance check | deep-link opens Analysis tab (AR/EN); authored insight board; no canvas/computed metric/finance; exports gated |

## Corrective 3 — familyCategories (flagged-035)

| Field | Value |
|---|---|
| Item | familyCategories / فئات العائلات |
| Problem | routes to families.html but category is only a filter dropdown + kebab reclassify drawer; no labeled Categories surface — admin can't tell the feature exists |
| Correction type | strengthen folded surface (labeled Categories board / tab) |
| Target route | `families.html#view=categories` |
| New page needed? | No (introduce `tabs()` on families.html: Directory + Categories) |
| Count impact | 0 |
| Owner | Spec 037 (recommended) or a follow-up spec if deferred |
| Acceptance check | labeled Categories surface lists categories + authored counts; reclassify drawer reachable; Create = gate; 0 mutation |

## Corrective 4 — studentResult (flagged-035)

| Field | Value |
|---|---|
| Item | studentResult / نتائج الطلاب |
| Problem | plural nav label lands on ONE student's Results tab; admin expects a cross-student board |
| Correction type | folded cross-student Results board + per-student deep-link |
| Target route | `students.html#view=results` |
| New page needed? | No (introduce `tabs()` on students.html: Directory + Results + Evaluation) |
| Count impact | 0 |
| Owner | Spec 037 (recommended) or follow-up if deferred |
| Acceptance check | board lists students + authored result chips + per-student deep-links to student.html#view=results; **no computed score/GPA/rank/percentage**; no canvas |

## Corrective 5 — studentEvaluation (flagged-035)

| Field | Value |
|---|---|
| Item | studentEvaluation / تقييم الطلاب |
| Problem | plural label lands on ONE student's Evaluation tab |
| Correction type | folded cross-student Evaluation board + per-student deep-link |
| Target route | `students.html#view=evaluation` |
| New page needed? | No (shares the students.html tabs()) |
| Count impact | 0 |
| Owner | Spec 037 (recommended) or follow-up if deferred |
| Acceptance check | board lists students + authored evaluation chips + per-student deep-links; **no computed rubric total/score/rank**; no canvas |

## Items explicitly NOT needing a Spec-037 corrective (and why)

| Item(s) | Why no 037 corrective |
|---|---|
| invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks | honest visible lock (`disabled`+reason), figure-free; owner Spec 038 |
| materials, certificateRequests | folded into library.html / certificates.html; nav «قريبًا» flip is owner Spec 039 (out of 037 scope) |
| settingsGeneral/Integrations/Customization/Notifications/Security/Users | folded into settings.html tabs; deep-link flips owner Spec 040 |
| all 26 real pages + scheduleSearch + addTeacher/teacherCategories + sessionsKpi/monthlyPerf | already clear/implemented |
