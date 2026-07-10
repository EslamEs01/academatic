# Page-Count Envelope — Spec 033

Rules: current count after Spec 032 = **103** (51 bases × 2 langs + index). A standalone page = an AR + EN pair = **+2**. A deep-link or a fold = **0**. Deep-links reuse existing `#view=` tab surfaces; folds reuse existing drawers/tabs.

## Baseline
- **Current: 103** (frozen by Spec 032).

## Count impact per proposed spec
| Spec | New standalone pages | Deep-links / folds (0) | Count impact | Running total (recommended) |
|---|---|---|---|---|
| 034 Control | 5 pairs (messages, leads, tasks, announcements, timeConverter) | — | **+10** | 113 |
| 035 Families/Students | 1 pair (scheduleSearch) [studentResult/Eval deep-link; familyCategories anchor] | 3 | **+2** | 115 |
| 036 Teachers | 0 (addTeacher/teacherCategories anchor; sessionsKpi/monthlyPerf fold) | 4 | **0** | 115 |
| 037 Reports/Analytics | 0 (monthlyReports/dataAnalysis fold) | 2 | **0** | 115 |
| 038 Finance | 2 pairs (invoices, payments) [salaries/banks deep-link; rest fold] | 5 | **+4** | 119 |
| 039 Admin content | 0 (materials/certificateRequests deep-link) | 2 | **0** | 119 |
| 040 Settings | 0 (6 tabs deep-link) | 6 | **0** | 119 |
| 041 Final re-freeze | 0 | — | **0** | 119 |

## Envelope
- **Minimum (max deep-link/fold): +14 → 117.** Only Control (5 pairs = +10) + core finance invoices+payments (+4); scheduleSearch folds into schedule.html; everything else deep-link/fold.
- **Recommended: +16 → 119.** Control (+10) + scheduleSearch page (+2) + invoices/payments (+4). All boards deep-linked/folded.
- **Maximum (max standalone): ~+36 → ~139.** If every optional display board becomes standalone: + scheduleSearch (+2) + studentResult/Eval (+4) + sessionsKpi/monthlyPerf (+4) + monthlyReports/dataAnalysis (+4) + monthlyInvoices/staffSalaries/classSalaryReport (+6) + addTeacher mirror (+2) beyond the recommended set.

## AR/EN and deep-link accounting
- **Standalone pages (recommended set, 8 pairs = +16):** messages, leads, tasks, announcements, time-converter, schedule-search, invoices, payments — each `X.html` + `X.en.html`, each registered in `build-html.mjs` PAGES.
- **Deep-link items (0 count, 10):** salaries, banks (finance tabs); materials, certificateRequests (library/certificates tabs); 6× settings tabs — reuse existing `#view=` surfaces.
- **Fold-anchor / fold-tab items (0 count, 12):** familyCategories, addTeacher, teacherCategories (drawer anchors); studentResult, studentEvaluation (student tabs); sessionsKpi, monthlyPerf (perf tabs); monthlyReports, dataAnalysis (reports tabs); monthlyInvoices, staffSalaries, classSalaryReport (finance/reports tabs).

## Final expected range
**117 ≤ final ≤ ~139; recommended target 119.** The exact number is fixed by the follow-up implementation specs (each build-verifies its count); 041 locks the final count and re-freezes. This envelope is advisory strategy, not an implemented count.
