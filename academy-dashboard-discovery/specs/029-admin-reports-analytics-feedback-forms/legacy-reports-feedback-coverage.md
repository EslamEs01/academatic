# Spec 029 — Legacy Reports / Feedback / Forms Coverage Map

Maps each LEGACY admin reporting/analytics/feedback/forms/export capability → current page/module →
disposition → owner → fix-in-029? Evidence paths under `academy-dashboard-discovery/`.

Disposition legend: **deepen-029** · **fold-029** (into existing page/modal/drawer) · **new-page-candidate-029**
(planning decides) · **→030 finance** · **→031 mgmt/content** · **future-backend** · **excluded** · **separate-domain**.

| # | Legacy capability | Legacy route | Evidence path | Current page/module | Disposition | Owner | Fix in 029? | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Reports overview | `/management/reports` (analogue) | `app/src/js/pages/reports.js` | `reports.html` (implemented) | deepen-029 | 029 | Yes | Export/print honesty pass; filters already real |
| 2 | Analysis — Course statistics | `/management/analysis-course` | `page-inventory.md:33`; raw HTML Chart.js canvases; `02-…:2652-2659` | none (charts) | new-page-candidate-029 / fold | 029 | Planning | Reproduce **numberless/chartless**: authored counts + table only |
| 3 | Analysis — Student statistics + geo-map | `/management/analysis-student` | `page-inventory.md:36`; ApexCharts+amCharts5; `02-…:2661-2668` | none | new-page-candidate-029 / fold | 029 | Planning | NO chart, NO map, NO computed %; authored counts only |
| 4 | Sessions analysis (regular/trial filter board) | `/management/sessions_analysis` | `page-inventory.md:189`; `form-inventory.md:12987-13031` | `sessions-analysis.html` (implemented, Spec 026) | deepen-029 | 029 | Yes | Export gate honesty (currently native-disabled) |
| 5 | Teacher feedback (categories + note + **%**) | `/management/teacher-feedback` | `page-inventory.md:240`; `table-inventory.md:1271-1279`; `form-inventory.md:15687-15750` | none | fold-029 / new-page-candidate | 029 | Yes | Display-only rows + categorical note; **NO computed %**; create-category = modal gate |
| 6 | Class feedback (per-teacher **%** + session count) | `/management/class-feedback` (+`/feedback`) | `page-inventory.md:47-49`; `table-inventory.md:106-109` | none | fold-029 / new-page-candidate | 029 | Yes | Display-only; drill-down = read-only drawer; NO computed % |
| 7 | Families feedback (guardian meeting log + progress report) | `/management/families/feedback` (+`/family/{id}`,`/students`) | `page-inventory.md:94-102`; `form-inventory.md:6640-6714`; `02-…:1479-1580` | none | fold-029 / new-page-candidate | 029 | Yes | Free-text report display-only; `/family/1` was 500 → gate only; completion-rate KPI = authored literal, NOT derived |
| 8 | Family feedback categories (CRUD) | `/management/family/feedback-categories` (+`/create`) | `page-inventory.md:111-112`; `table-inventory.md:586-589`; `form-inventory.md:7550-7607` | none (pattern: `trn-categories`/`fam-cat` drawers) | fold-029 | 029 | Yes | Create/Edit category = modal gate; assign = display-only; nav item stays planned/folded |
| 9 | Forms / survey builder | `/management/forms` (+`/create`) | `page-inventory.md:113-114`; `table-inventory.md:596-599`; `form-inventory.md:7627-7642` | none | new-page-candidate-029 / fold | 029 | Planning | Display-only list; Create-form = backendRequired modal; NO real form engine; counts authored |
| 10 | Forms — student monthly progress form | `/management/forms/students` | `page-inventory.md:115`; `form-inventory.md:7688-7725` | student.html Evaluation tab (`evaluation-rubric.js`) partial | deepen-029 | 029 | Yes | Categorical radios display-only; Save/Submit = gate; source of studentEvaluation |
| 11 | Export course | `/management/export-course` | `page-inventory.md:87`; `02-…:1148-1153` (500) | reports/course/group/student export gates | deepen-029 | 029 | Yes | Honest export gate only (legacy 500 — no fields) |
| 12 | Export links (invoices/class) | `/management/invoicesexportdata`, `/courseClasses/export-class/1` | `route-graph.md:424-425`; `skipped-actions.md:59-60` | none | →030 (invoices) / gate (class) | 030/029 | Partial | Invoice export → 030; class export → honest gate |
| 13 | Student result (single) | `/management/…result…` | student.html Results tab (`result-summary.js`) | `student.html` (implemented) | deepen-029 | 029 | Yes | Display-only; export gate; the standalone `studentResult` nav → 029 candidate |
| 14 | Student evaluation (single) | forms-students analogue | student.html Evaluation tab (`evaluation-rubric.js`) | `student.html` (implemented) | deepen-029 | 029 | Yes | Display-only; approve = gate; standalone `studentEvaluation` nav → 029 candidate |
| 15 | Teacher performance board | `/management/teacher-performance` (analogue) | `app/src/js/pages/teacher-performance.js` | `teacher-performance.html` (implemented) | deepen-029 | 029 | Yes | Export/print gate only; STAYS display-only, no score/rank/chart/payroll |
| — | **Finance analytics (see finance-exclusion-register.md)** | | | | | | | |
| 16 | Analysis — Expenses (P&L/salaries) | `/management/analysis-expenses` | `table-inventory.md:81-84`; `02-…:3984-3992` | none | →030 finance | 030 | No | Revenue/profit/salaries/EUR — finance |
| 17 | Analysis — Invoices (paid/due/overdue) | `/management/analysis-invoices` | `table-inventory.md:86-89`; `02-…:1797-1806` | none | →030 finance | 030 | No | AED amounts/discount — finance |
| 18 | Salary class report | `/management/salary-class-report` | `page-inventory.md:182,335`; `form-inventory.md:12571-12580` | none | →030 finance / excluded (teacher-side) | 030 | No | Teacher-side twin excluded FOREVER (pay-free law) |
| 19 | Invoice download / accounting | `/management/downlaod` | `02-…:1808-1819` | none | →030 finance | 030 | No | AED totals + payment gateway |
| — | **Separate domains (NOT 029)** | | | | | | | |
| 20 | Certificate PDF designer | `/management/pdf` (+`/create`) | `page-inventory.md:173-174`; `table-inventory.md:1006-1009` | none | →031 certificates | 031 | No | Cert designer, distinct capability |
| 21 | New requests / leads stats | `/management/new-requests` (+filters) | `page-inventory.md:153-162`; `02-…:2321-2328` | none (nav `leads` planned) | future-backend / own spec | future-backend | No | Leads/CRM domain, not reporting |
| 22 | Settings ▸ data backup | `/management/settings/security/data/backup/send` | `page-inventory.md:217` | none (nav `settings*` planned) | →031 settings | 031 | No | Backup + email integration |
| 23 | Settings ▸ WhatsApp insights | `/management/settings/integrations/whatsapp/*/insights` | `page-inventory.md:205-206` | none | →031 settings/integrations | 031 | No | Connectivity list, not analytics |
| 24 | Family-side "Student feedback" (read) | `/student/feedbacks` | `table-inventory.md:1710-1713` | family portal (separate closed surface) | separate-domain | (family portal) | No | Family portal is its own closed surface; not admin 029 |

## Consolidated: what 029 owns

**Deepen (existing pages)**: reports, sessions-analysis, teacher-performance, student (Results/Evaluation),
course/group/student/teacher export-print gates.
**Feedback layer (new, honest, display-only)**: teacher/class/family/student feedback review + read-only
detail drawers + feedback-category create/edit modal gates.
**Forms/surveys**: display-only list + backendRequired create/submit gates.
**Analytics summaries**: authored counts/rows reproduced numberless/chartless (planning decides page vs fold).
**Admin menu 029 planned items**: `monthlyReports`, `dataAnalysis`, `sessionsKpi`, `monthlyPerf`,
`studentResult`, `studentEvaluation`.

## Routed OUT of 029

Finance analytics (16–19) → **030**; cert designer (20) → **031**; leads (21) → **future-backend/own spec**;
settings/backup/whatsapp (22–23) → **031**; family-portal feedback (24) → separate closed surface.
