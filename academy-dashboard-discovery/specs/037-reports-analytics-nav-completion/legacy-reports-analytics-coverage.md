# Legacy Reports/Analytics Coverage — Spec 037 (Reports/Analytics Nav Completion)

Grounding audit for the two remaining «قريبًا» Reports-category nav items —
`monthlyReports` (التقارير الشهرية) and `dataAnalysis` (تحليل البيانات) — against the legacy
`academatic.online` capture. Sources read: `academy-dashboard-discovery/output/combined/page-inventory.md`
(grep: analysis, monthly, report, forms, requests) and the per-page captures under
`academy-dashboard-discovery/output/roles/admin/pages/` for `management-analysis-course.md`,
`management-analysis-student.md`, `management-analysis-expenses.md`, `management-analysis-invoices.md`,
`management-monthly-invoices.md`, `management-teachers-1-monthly-classes.md`,
`management-salary-class-report.md`, `management-sessions-analysis.md`.

**Current app state (verified, no source edited)**: `academy-dashboard-discovery/app/src/js/nav.config.js:73-74`
carries `monthlyReports`/`dataAnalysis` as `status:'planned'` with `FUTURE_ROUTES` (line 145) pointing at
placeholder `analytics.html`/`monthly-reports.html` — no such pages exist or should be built (count impact 0).
`academy-dashboard-discovery/app/src/js/pages/reports.js` is a single long DISPLAY-ONLY page (Spec 008 shell +
Spec 029 feedback/forms fold) with **no `tabs()`/`#view=` of its own yet** — mirrors the pre-Spec-036
`teacher-performance.html` starting condition exactly. **Recommended disposition**: fold both items into
`reports.html` as new display-only tabs — `reports.html#view=monthly` (monthlyReports) and
`reports.html#view=analysis` (dataAnalysis) — wrapping the existing content as an "overview" tab, the same
`tabs()`+`#view=` mechanism Spec 036 used for `teacher-performance.html`. Count impact: **0** (no new page).

## Legacy capability mapping

| Legacy capability | Evidence path | Reports/Analytics? | Current frontend state | Disposition (Spec 037) | Finance? (excluded if yes) | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|
| Analysis Course — course-level student/teacher-count statistics (course selector, "Number of Students per Course", "Number of Students & Teachers per Course/Student-Language") | `output/roles/admin/pages/management-analysis-course.md` (Modules: Students, Courses; sidebar dropdown "Data Analysis" parent) | Yes | Not built (0 pages); `dataAnalysis` nav item is `planned` | Fold into `reports.html#view=analysis` as authored categorical/count cards (course-scoped slice) — NO chart, NO computed %, honest counts only | No (0 currency/salary token in the capture) | Spec 037 | `reports.html#view=analysis` tab renders on load; shows course-level authored count cards; 0 `<canvas>`/chart lib token; 0 computed percentage/rank |
| Analysis Student — student-level statistics ("Students with Courses/Trial", "Stopped Students", "Students without Courses", Students Per Month/Age-Group/Language/Status/Gender/Country incl. a country map) | `output/roles/admin/pages/management-analysis-student.md` (Modules: Students; ApexCharts legend CSS present in raw capture — charts existed in legacy) | Yes | Not built (0 pages); `dataAnalysis` nav item is `planned` | Fold into `reports.html#view=analysis` as authored categorical/count cards (student-scoped slice: e.g. counts by status/language/gender as chip rows) — the legacy ApexCharts breakdowns are NOT reproduced as charts/canvas per law | No | Spec 037 | Same tab; student-count cards present; grep for `apexcharts`/`<canvas>`/chart token = 0 in the built page |
| Data Analysis sidebar parent (`javascript:void(0)` dropdown grouping Analysis Course/Student/Invoices/Expenses under one "Data Analysis" nav label) | `output/roles/admin/pages/management-analysis-course.md:276`, `management-analysis-student.md:286` ("Data Analysis" `(external)` i.e. `javascript:void(0)` dropdown trigger) | Yes (nav grouping evidence) | `dataAnalysis` is a single flat nav item (`nav.config.js:74`), not a dropdown | Keep as ONE flat nav item → anchor to `reports.html#view=analysis`; the legacy sub-grouping (course/student vs. invoices/expenses) is preserved as the finance/non-finance split below, not as a nav submenu | Split (see rows below) | Spec 037 | `dataAnalysis` nav item flips `planned` → anchor pointing at `reports.html#view=analysis`; 0 new nav dropdown/hook |
| Analysis Expenses ("Profits & Losses") — Expected/Actual Net Profit, Expected/Actual Revenue, Teachers/Staff Salaries, Expenses, monthly financial data table (EUR figures) | `output/roles/admin/pages/management-analysis-expenses.md` (Modules: Wallet / Finance; KPI cards carry `EUR 540.00`/`EUR 9,333.00` etc.; 12-row monthly financial table) | Reports/Analytics-labeled in legacy nav, but content is 100% money | Not built; not referenced by current `dataAnalysis` scope | **EXCLUDED from Spec 037** — carries salary/revenue/profit FIGURES; would break "reports body finance-free FOREVER" | **Yes — excluded** | Spec 038 | Spec 037 build: 0 `EUR`/profit/revenue/salary figure token anywhere in `reports.html` |
| Analysis Invoices ("Invoices & Accounts") — Total Before/After Discount, Discount, Paid/UnPaid/Overdue amounts, invoice-by-month chart, per-family paid/due/overdue table | `output/roles/admin/pages/management-analysis-invoices.md` (Modules: Payments / Invoices; KPI cards carry `0.00 AED` amounts; per-family Paid/Due/Overdue table) | Reports/Analytics-labeled in legacy nav, but content is 100% money | Not built; not referenced by current `dataAnalysis` scope | **EXCLUDED from Spec 037** — invoice AMOUNT figures + per-family financial breakdown | **Yes — excluded** | Spec 038 | Same grep as above; 0 `AED`/invoice-amount figure in `reports.html` |
| Monthly Invoices ("List of Monthly Invoices") — per-parent monthly invoice status list | `output/roles/admin/pages/management-monthly-invoices.md` (Modules: Payments / Invoices; table columns `#, Parent, Status`) | No — billing/invoicing, not analytics (legacy nav places it under Payments/Invoices, not Reports/Analytics) | Not built; not referenced by current `monthlyReports` scope | **EXCLUDED from Spec 037** — invoice/billing surface, not a reports roll-up | **Yes — excluded** | Spec 038 (finance/invoices track) | 0 reference to `monthly-invoices`/parent-invoice-status inside `reports.html` |
| Salary Class Report — per-teacher/per-student class-count report grouped for salary computation (teacher/student selectors, date-range, "Group By") | `output/roles/admin/pages/management-salary-class-report.md` (Modules: Classes / Live Sessions, Wallet / Finance, Reports / Analytics) | Nominally Reports/Analytics-tagged, but purpose is a salary input report | Not built; excluded from current scope | **EXCLUDED from Spec 037** — feeds salary computation (Wallet/Finance module co-tagged) | **Yes — excluded** | Spec 038 (finance track; teacher pay-free law also applies) | `reports.html` carries 0 `salary`/`class-report-for-pay` token |
| Teachers/N Monthly Classes (`management/teachers/1/monthly-classes`) — per-teacher monthly class-count roll-up (legacy capture is a broken/error page: "Something went wrong, try again later") | `output/roles/admin/pages/management-teachers-1-monthly-classes.md` (H4: "Something went wrong, try again later"; 1 link, 1 button) | Yes (operational monthly roll-up, grouped near "Monthly Performance"/teacher-feedback in the same sidebar) | Not built; `monthlyReports` nav item is `planned` | Fold into `reports.html#view=monthly` as an authored per-teacher monthly session-count roll-up (counts only, no error-state reproduction, no computed score) | No (no currency token observed; page itself errored so no figures to carry over) | Spec 037 | `reports.html#view=monthly` renders a per-teacher monthly count slice; 0 `<canvas>`/computed score |
| Teacher Monthly Plans (`teacher/monthly-plans`, `teacher/monthly-plans/mq==/show`) — monthly session/plan roll-up scoped to teacher role | `output/combined/page-inventory.md:329,331` (Modules: Teachers, Students) | Yes (monthly operations roll-up) | Not built as admin reports surface (teacher-side legacy route); no current admin analog | Fold into `reports.html#view=monthly` as an authored monthly-plan/session-count card set (admin-side summary, teacher-pay-free) | No | Spec 037 | Monthly tab shows authored monthly-plan count cards; 0 pay/rate token (teacher pay-free law) |
| "monthly reports" sidebar link → routes to `management/forms` (Forms module, Reports / Analytics) | `output/combined/page-inventory.md:113` (`Forms`, Modules: Reports / Analytics); sidebar text "monthly reports" observed verbatim in `management-analysis-course.md:204/275` etc. | Yes (legacy literally labels the Forms nav entry "monthly reports") | `forms` capability already folded into `reports.html` under Spec 029 (`report-feedback.js`, `rep.form.*` keys) — display-only list + Create-form modal + deep-link to student Evaluation tab | Already implemented (Spec 029); Spec 037 does not touch it — cited here only to record that legacy's own "monthly reports" label maps to a capability already covered, distinct from the NEW `monthlyReports` nav item being resolved in this spec | No | Spec 029 (done) | No new acceptance check — regression-only: Spec 029 forms fold stays byte-identical |
| Sessions Analysis — regular/trial class outcome counts (Attended/Cancelled/Absent/Pending/Rescheduled/Make-up), teacher/student/type filters | `output/roles/admin/pages/management-sessions-analysis.md` (Modules: Classes / Live Sessions) | Adjacent but distinct — session-outcome analytics, not the Reports/Analytics category | Already implemented as its own admin-ops page (`sessions-analysis.html`, Spec 026) | Not in scope — already an implemented page; cited only to confirm no overlap/duplication with the new `monthly`/`analysis` tabs | No | Spec 026 (done) | Regression-only: `sessions-analysis.html` stays untouched by Spec 037 |

## Finance-flavoured analysis explicitly excluded → Spec 038

Four legacy capabilities live under the same "Data Analysis" / "Reports" sidebar neighborhood as
`analysis-course` and `analysis-student` but carry money end-to-end, and are therefore **out of scope for
Spec 037** and recorded as **Spec 038** owner territory (finance/invoices/salary track):

- `management/analysis-expenses` ("Profits & Losses") — Expected/Actual Net Profit, Expected/Actual Revenue,
  Teachers/Staff Salaries, Expenses, 12-row monthly EUR table (`management-analysis-expenses.md`).
- `management/analysis-invoices` ("Invoices & Accounts") — Total Before/After Discount, Paid/UnPaid/Overdue
  AED amounts, per-family invoice-status table (`management-analysis-invoices.md`).
- `management/monthly-invoices` ("List of Monthly Invoices") — per-parent monthly invoice status list
  (`management-monthly-invoices.md`).
- `management/salary-class-report` ("Salary Class Report") — per-teacher/student class-count report scoped
  to salary computation, co-tagged Wallet/Finance (`management-salary-class-report.md`).

Keeping these out of `reports.html` upholds the standing law that the **reports body stays finance-free
FOREVER** (carried since Spec 029) and the **teacher pay-free GLOBAL** contract (salary-class-report never
surfaces a rate/figure on any teacher-adjacent surface). Spec 037's `dataAnalysis`/`monthlyReports` tabs use
only the non-finance slices: `analysis-course`, `analysis-student`, the teacher/student monthly roll-ups
(`teachers/N/monthly-classes`, `teacher/monthly-plans`).

## Binding laws re-affirmed for Spec 037

- No chart / `<canvas>` / computed analytics / computed metric / percentage / rank on either new tab —
  legacy's ApexCharts breakdowns (student-per-month, by-age-group, by-language, by-country map, invoices-by-month)
  are represented as authored categorical/count cards only, never re-implemented as charts.
- `reports.html` body stays finance-free FOREVER — 0 currency/salary/revenue/profit/invoice-amount token in
  either new tab.
- Display-only authored fixtures only — no backend/API/engine; every export/PDF/send action stays a
  `backendRequired` gate (consistent with the existing Spec 029 Print/CSV/PDF gates on `reports.html`).
- Mechanism = existing primitives only: the `tabs()`+`#view=` widget already proven by Spec 036's
  `teacher-performance.html` (overview + 2 new tabs), wrapping the current single-page body as the
  "overview" tab and adding `monthly`/`analysis` as sibling display-only tabs — no new hook/storage key/engine.
- Count impact: **0** — both items resolve as fold-anchors into the existing `reports.html`, matching the
  `addTeacher`/`teacherCategories` (Spec 036) and `familyCategories` (Spec 035) fold-anchor precedent.
