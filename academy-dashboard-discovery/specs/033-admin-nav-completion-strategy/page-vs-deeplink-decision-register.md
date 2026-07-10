# Page vs Deep-Link Decision Register — Spec 033

For every currently planned/folded/locked item (30), the decision: **standalone page** vs **deep-link** vs **folded owner** vs **future-backend (action only)** — with reason, evidence, expected route, count impact, and owner. Standalone AR+EN pair = **+2**; deep-link/fold = **0**.

## Decisions
| Item | Decision | Reason | Evidence | Expected route/deep-link | Count | Owner |
|---|---|---|---|---|---|---|
| messages | **Standalone page** | no existing surface; a real inbox/thread/compose belongs on its own page | legacy admin messages; combined page-inventory | messages.html (+.en) | +2 | 034 |
| leads | **Standalone page** | no surface; new-requests inbox is its own workflow | legacy new-requests | leads.html (+.en) | +2 | 034 |
| tasks | **Standalone page** | no surface; task board is its own workflow | legacy tasks | tasks.html (+.en) | +2 | 034 |
| announcements | **Standalone page** | no surface; announcement composer + list | legacy announcements | announcements.html (+.en) | +2 | 034 |
| timeConverter | **Standalone page** | pure client tool; fully frontend, no backend | legacy tool | time-converter.html (+.en) | +2 | 034 |
| familyCategories | **Folded owner (anchor)** | drawer surface already exists; not hash-addressable | fam-cat drawer, Spec 027 | families.html (anchor) | 0 | 035 |
| scheduleSearch | **Standalone page** (recommended) or fold | availability search + results; can also be a schedule tab | availability evidence | schedule-search.html (+.en) OR schedule.html#view=search | +2 (or 0) | 035 |
| studentResult | **Deep-link** (recommended) or page | per-student results tab exists; an admin board is optional | student.html results tab, Spec 027 | student.html#view=results OR student-results.html | 0 (or +2) | 035 |
| studentEvaluation | **Deep-link** (recommended) or page | per-student evaluation tab exists | student.html evaluation tab | student.html#view=evaluation OR student-evaluation.html | 0 (or +2) | 035 |
| addTeacher | **Folded owner (anchor)** (recommended) or page | trn-add drawer exists; mirror-add-family page optional | trn-add drawer, Spec 032 | teachers.html (anchor) OR add-teacher.html | 0 (or +2) | 036 |
| teacherCategories | **Folded owner (anchor)** | trn-categories drawer exists; not hash-addressable | trn-categories drawer, Spec 028 | teachers.html (anchor) | 0 | 036 |
| sessionsKpi | **Fold (tab)** (recommended) or page | display-only KPI board fits teacher-performance | perf evidence | teacher-performance.html#view=sessions-kpi | 0 (or +2) | 036 |
| monthlyPerf | **Fold (tab)** (recommended) or page | display-only board fits teacher-performance | perf evidence | teacher-performance.html#view=monthly | 0 (or +2) | 036 |
| monthlyReports | **Fold (tab)** (recommended) or page | display-only board fits reports.html | reports evidence | reports.html#view=monthly | 0 (or +2) | 037 |
| dataAnalysis | **Fold (tab)** display-only, or future-backend | legacy was a chart page; no-fake forbids computed charts → authored board only, else stays gated | analytics evidence + no-fake law | reports.html#view=analysis | 0 (or +2) | 037 |
| invoices | **Standalone page** (recommended) or fold | core invoice ledger; Spec-009 amount literals, no arithmetic | invoice ledger; Spec-009 | invoices.html (+.en) OR finance.html#view=invoices | +2 (or 0) | 038 |
| monthlyInvoices | **Fold (tab)** (recommended) or page | monthly board fits finance/reports | invoice evidence | finance.html#view=monthly-invoices | 0 (or +2) | 038 |
| salaries | **Deep-link** | Salaries tab already exists (Spec 030) | finance Salaries tab | finance.html#view=salaries | 0 | 038 |
| staffSalaries | **Fold (tab)** (recommended) or page | staff-salary board fits finance salaries | Spec 030 salaries | finance salaries sub-board | 0 (or +2) | 038 |
| payments | **Standalone page** (recommended) or fold | payments ledger; Record-payment gated | payments ledger | payments.html (+.en) OR finance.html#view=payments | +2 (or 0) | 038 |
| classSalaryReport | **Fold (tab)** (recommended) or page | figure-free class-salary board fits finance/reports | class-salary evidence | finance/reports tab | 0 (or +2) | 038 |
| banks | **Deep-link** | Banks tab already exists (Spec 030) | finance Banks tab | finance.html#view=banks | 0 | 038 |
| materials | **Deep-link** | Materials tab already exists (Spec 031) | library Materials tab | library.html#view=materials | 0 | 039 |
| certificateRequests | **Deep-link** | Requests tab already exists (Spec 031) | certificates Requests tab | certificates.html#view=requests | 0 | 039 |
| settingsGeneral | **Deep-link** | General tab already exists (Spec 031) | settings General tab | settings.html#view=general | 0 | 040 |
| settingsIntegrations | **Deep-link** | Integrations tab exists | settings Integrations tab | settings.html#view=integrations | 0 | 040 |
| settingsCustomization | **Deep-link** | Customization tab exists | settings Customization tab | settings.html#view=customization | 0 | 040 |
| settingsNotifications | **Deep-link** | Notifications tab exists | settings Notifications tab | settings.html#view=notifications | 0 | 040 |
| settingsSecurity | **Deep-link** | Security tab exists | settings Security tab | settings.html#view=security | 0 | 040 |
| settingsUsers | **Deep-link** | Users tab exists (→ staff, B-16) | settings Users tab | settings.html#view=users (or staff.html) | 0 | 040 |

## Count-impact summary
- **Firm +2 pages (5 items, Control):** messages, leads, tasks, announcements, timeConverter → **+10**.
- **Recommended +2 pages (2 items, core finance):** invoices, payments → **+4**. (Foldable to 0 if the finance hub is preferred.)
- **Recommended +2 pages (1 item, Families):** scheduleSearch → **+2**. (Foldable to 0.)
- **Deep-link / fold (0 count): 22 items** — salaries, banks, materials, certificateRequests, 6× settings (10 firm deep-links) + familyCategories, addTeacher, teacherCategories (3 fold-anchors) + studentResult, studentEvaluation, sessionsKpi, monthlyPerf, monthlyReports, dataAnalysis, monthlyInvoices, staffSalaries, classSalaryReport (9 recommended folds/deep-links).
- **Recommended net new pages: 16 (+16 → 119).** Minimum: **+14 (→117)** if scheduleSearch folds. Maximum: **~+36 (→139)** if every optional board becomes standalone.
