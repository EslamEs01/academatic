# Spec 029 — Visual Grounding (Targeted Visual Grounding Gate)

**Method**: read-only multi-agent audit (3 focused passes covering the recommended 10-agent split), each
citing exact evidence paths. No app files were modified. Baseline verified: HEAD `4be3e87` (Spec 028
committed), branch `feature/012-role-portal-foundation`, working tree clean, public HTML = 97.

**Rule honored**: not from memory; legacy = capability/workflow coverage, not a pixel/behavior clone; no
invented pages; no fake charts.

---

## 1. Exact legacy report / analytics pages & screenshots opened

Textual inventories (authoritative):
- `output/combined/page-inventory.md` (rows 33–36, 47–49, 87, 94–115, 153–162, 173–174, 182, 189, 240, 335)
- `output/combined/table-inventory.md` (81–89 finance analytics; 106–109 class-feedback; 586–599 forms/feedback-categories; 1271–1279 teacher-feedback; 1006–1009 pdf/cert)
- `output/combined/form-inventory.md` (6640–6714 families-feedback; 7550–7607 family-feedback-categories; 7627–7642 forms builder; 7688–7725 forms-students progress form; 12571–12580 salary-class-report; 12987–13031 sessions-analysis; 15687–15750 teacher-feedback)
- `output/combined/interaction-inventory.md`, `modal-inventory.md` (1391 family "Feedback about your teacher"), `route-graph.md` (424–425 export endpoints), `skipped-actions.md` (20 export-course 500; 59–60 export links; 591/594 download-report)
- `frontend-planning-deep/02-all-pages-expanded-inventory.md` (143–151 sessions-analysis; 1148–1160 export-course/families-feedback 500; 1479–1580 families-feedback; 1797–1819 analysis-invoices/downlaod; 2321–2328 new-requests stats; 2652–2668 analysis-course/analysis-student; 3130–3145 teacher-feedback; 3984–3992 analysis-expenses)
- `frontend-planning-deep/05-distinct-interaction-catalog.md` (85 family teacher-feedback modal), `06-complete-data-surface.md` (495 class-remark enum), `08-role-page-inventory-v2.md`, `19-spec-coverage-map.md`
- `output/roles/admin/role-map.md`

Raw HTML dumps confirming chart engines:
- `output/roles/admin/html/raw/management-analysis-course.html` — canvases `allTeacherStudentChart`/`courseChart`/`languageStudentChart` + literal `chart.js`
- `output/roles/admin/html/raw/management-analysis-student.html` — `apexcharts`/`ApexCharts` + amCharts5 `<canvas class="am5-layer-0/30">` geo-map
- `output/roles/admin/html/raw/management-analysis-expenses.html` — canvases `actualMonthlyChart`/`currentMonthChart`/`expectedMonthlyChart` + `chart.js`
- `output/roles/admin/html/raw/management-analysis-invoices.html` — canvases `cumulativeChart`/`monthlyChart` + `chart.js`
- `management-class-feedback.html`, `management-teacher-feedback.html`, `management-teacher-feedback-feedback-teacher-id-1-year-2026.html` — load `apexcharts.min.js`
- `output/roles/admin/html/sanitized/management-class-feedback.html` — Percentage column rendered `0`

Screenshots opened (filenames): `management-analysis-course-{001,002,full}.png`, `management-analysis-student-{001,full}.png`, `management-analysis-expenses-{001,full}.png`, `management-analysis-invoices-{001,002,full}.png`, `management-sessions-analysis-{001,full}.png`.

## 2. Exact legacy feedback / forms pages & screenshots opened

- `management-teacher-feedback-{001..004,full}.png`, `management-teacher-feedback-feedback-teacher-id-1-year-2026-{001,002,full}.png`
- `management-class-feedback-{001,002,full}.png`, `management-class-feedback-feedback-{003,004,full}.png`, `management-class-feedback-feedback-teacher-id-1-date-range-2026-06-01-to-2026-06-{001,002,004}.png`
- `management-families-feedback-{001,002,full}.png`, `management-families-feedback-family-{1,2}-*.png` (family-1 = 500), `management-families-feedback-students-status-{active,incomplete,suspended,inactive,trial}-*.png`
- `management-family-feedback-categories-{full,create-full,create-001}.png`
- `management-forms-{001,full}.png`, `management-forms-create-{001,full}.png`, `management-forms-students-{001,full}.png`
- Family-side counterparts: `output/roles/family/text/student-feedbacks.txt`; `output/combined/table-inventory.md:1710-1713`

## 3. Exact legacy export / print evidence opened

- `management-export-course-full.png` (+ `frontend-planning-deep/02-…:1148-1153` HTTP 500; `skipped-actions.md:20`)
- `output/combined/route-graph.md:424-425` (`/management/invoicesexportdata`, `/management/courseClasses/export-class/1`)
- `output/combined/skipped-actions.md:59-60` (export links), `:591,594` (trial "Download Report")
- `management-salary-class-report-{full,002}.png` (+ `form-inventory.md:12571-12580`)
- `frontend-planning-deep/02-…:1808-1819` (`/management/downlaod` invoice accounting, AED)

## 4. Exact current pages / modules opened

Pages: `app/src/js/pages/{reports,teacher-performance,sessions-analysis,dashboard,student,course,group,family,attendance,sessions}.js`
Components: `app/src/js/components/{report-actions,report-card,result-summary,evaluation-rubric,outcome-details,course-group-actions,teacher-actions,finance-actions,preview-drawer,ui,sparkline,filter-bar,data-table,table,card-grid,directory-card,states,tabs,confirm-modal,dropdown}.js`
Core: `app/src/js/enhance.js`, `app/src/js/nav.config.js`, `app/src/js/pages/finance.js`
Locales: `app/src/locales/{ar,en}.{trn,extra,fin}.js`
Tests: `app/tests/smoke/run.cjs`, `app/tests/a11y/run.cjs`
Public (built, for count/identity): `app/public/*.html` (count = 97)

## 5. Exact admin menu / nav files opened

- `app/src/js/nav.config.js` (all six categories, sub-sections, `FUTURE_ROUTES`, `FUTURE_ROLE`, build-time guard) — full classification in `admin-menu-coverage-inventory.md`.
- The shell/rail consumes `NAV_CATEGORIES` via the portal/admin shell; no separate `sidebar.js`/`nav.js` component exists (nav is data-driven from `nav.config.js`).

## 6. Evidence gaps

- **`export-course` and `families-feedback/family/1`** returned HTTP 500 in the crawl → no rendered UI; represent as an honest gate only, do not invent fields.
- **`invoicesexportdata` / `export-class/1`** are link-only (never crawled) → existence known, detail unknown; finance-tinted → 030.
- **Feedback numeric inputs**: no client-side numeric rating field was observed; the legacy `Percentage` columns are server-side aggregations of categorical inputs → cannot be honestly reproduced as a computed value.
- **Forms "Responses" count**: legacy shows aggregated counts; the app has no aggregation engine → authored literal only.
- **`sessions-analysis`**: no chart library detected on that specific page (unlike analysis-course/student); it is a filter board — already implemented in the app as `sessions-analysis.html` (Spec 026).

## 7. What must be fixed / handled in 029 (grounded)

1. **Feedback review layer (the real gap)** — no admin feedback surface exists today. Add honest display-only
   feedback review (teacher/class/family/student) with read-only detail drawers, categorical remarks (NO %),
   and backendRequired create/edit/approve/delete gates. Grounded in `teacher-feedback`/`class-feedback`/
   `families-feedback`/`forms-students`.
2. **Feedback categories** — Create/Edit category modal + assign gate (mirror the existing `trn-categories`/
   `fam-cat` drawer precedents); nav item stays planned/folded. Grounded in `family-feedback-categories`.
3. **Forms/surveys** — display-only list + backendRequired Create-form / Submit-progress-form gates; counts
   authored literals. Grounded in `forms`/`forms-create`/`forms-students`.
4. **Analytics summaries** — if surfaced, authored display-only counts/rows only; NO charts, NO computed %.
   Grounded in `analysis-course`/`analysis-student` (reproduced numberless).
5. **Export/print honesty pass** — make every Export/Print/PDF/CSV/Excel control an honest gate; reclassify
   the `reports.js` Print toast and review the native-disabled `sessions-analysis` export for consistency.
   Grounded in Specs 027 M-P / 028 T-L/T-print routing.
6. **Admin Menu Coverage Gate** — classify every nav item; 029-owned planned items = `monthlyReports`,
   `dataAnalysis`, `sessionsKpi`, `monthlyPerf`, `studentResult`, `studentEvaluation`; route finance
   sub-section → 030, admin/settings categories → 031, control planned items → future-backend.
7. **Finance exclusion** — keep all finance-tinted legacy reports out of 029; register to 030; finance
   Spec-009 invariant stays byte-identical.
