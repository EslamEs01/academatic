# Visual Grounding — Spec 033

Targeted Visual Grounding skill run before authoring any Spec-033 artifact. Evidence inspected directly (not from memory/summaries).

## Current nav / sidebar source inspected
- `academy-dashboard-discovery/app/src/js/nav.config.js` — **authoritative** 50-item admin nav (6 categories; per-item `status` = implemented/planned/disabled, `route`, `reasonKey`, `badge`; `FUTURE_ROUTES` intended-route map; `FUTURE_ROLE` portals; build-time dead-link guard). Read in full.
- `academy-dashboard-discovery/app/src/build-html.mjs` — PAGES registry (51 bases × 2 langs + index = 103) — confirmed the route/page count contract (via Spec-032 route inventory).
- `academy-dashboard-discovery/app/public/*.html` — the built sidebar renders the nav.config statuses: implemented → `<a>` active link; planned → `<button data-coming-soon>` «قريبًا»; disabled → `<button aria-disabled data-reason-key>` 🔒 lock (cross-validated against the screenshot below).
- `academy-dashboard-discovery/app/tests/smoke/run.cjs` — the Spec-010/029 nav block (6 rail categories · finance sub-section membership · `deadHash`/`badTarget`=0 · planned-truthfulness `plannedNavAnchors===0` · locked-finance `lockedOk`) + the Spec-032 admin-menu-50 freeze assert.

## Screenshot evidence inspected
- `app/screenshots/dashboard__ar__dark__desktop__finance-group__cat-reports.png` — **viewed directly**. Confirms the Reports/Finance category panel: التقارير (active), التقارير الشهرية «قريبًا», تحليل البيانات «قريبًا», المالية (active link) then 🔒 on الفواتير / الفواتير الشهرية / الرواتب / رواتب الموظفين / المدفوعات / تقرير رواتب الفصول / البنوك — i.e. 2 «قريبًا» + 7 locks, matching nav.config.js exactly.
- Confirmed the per-category sidebar frames exist in the 285-frame pack: `dashboard__ar__light__desktop.png` (default = control panel), `…cat-families.png`, `…cat-teachers.png`, `…cat-reports.png`, `…cat-admin.png`, `…cat-settings.png` (+ `…en…cat-families`, `…rail.png` collapsed, `…mobile__drawer.png`). Each category's item states are fully determined by nav.config.js and were cross-checked against it.

## Legacy / reference evidence inspected (capability coverage, not pixel clone)
- `academy-dashboard-discovery/output/roles/admin/` — present: `pages/`, `html/`, `screenshots/`, `text/`, `network/`, `role-map.md`, `role-map.json` (legacy admin capability source for messages/leads/tasks/announcements/timeConverter/scheduleSearch/results/evaluation/finance/etc.).
- `academy-dashboard-discovery/output/combined/` — present: `page-inventory.md`, `form-inventory.md`, `modal-inventory.md`, `button-coverage.md`, `interaction-inventory.md`, `table-inventory.md`, `route-graph.md`, `component-inventory.md`, `role-permission-matrix.md`, `academy-system-map.md`, `missing-coverage.md` — the capability checklist behind each nav item's fields/actions.
- `academy-dashboard-discovery/frontend-planning/` + `frontend-planning-deep/` — present (planning IA references).

## Prior specs inspected
- `specs/032-…/full-admin-menu-coverage-inventory.md` + `full-route-page-coverage-inventory.md` — the authoritative starting classification (20 IMPL · 11 FOLD · 6 PLAN-029 · 6 FB · 7 DIS = 50) and the 103-page route map.
- `specs/032-…/implementation-status.md` + `production-freeze-checklist.md` — the current frozen state, form-drawer owners, and the FUTURE_ROUTES stale-map cleanup.
- `specs/030-…/no-fake-money-register.md` + `finance-menu-coverage-inventory.md` — the finance no-fake-money boundary + salaries/banks folded-tab owners.
- `specs/031-…/admin-management-menu-coverage-inventory.md` — the settings 6-tab fold + materials/certificateRequests tab owners.
- `specs/023-…` (full legacy coverage audit), `specs/024-…` (corrections), `specs/026-029` (admin group specs) — the folded/planned lineage per item.

## Current Admin menu state (50 items, from nav.config.js, cross-validated with the screenshot)
- **Implemented (real route): 20** — home, sessions, schedule, attendance, sessionsAnalysis, publicHoliday, scheduledActions (control 7); families, addFamily, students, courses, groups (families 5); teachers, teacherKpi (teachers 2); reports, finance (reports 2); staff, books, certificates (admin 3); settings (settings 1).
- **Planned («قريبًا» button): 23** — messages, leads, tasks, announcements, timeConverter (control 5); familyCategories, scheduleSearch, studentResult, studentEvaluation (families 4); addTeacher, teacherCategories, sessionsKpi, monthlyPerf (teachers 4); monthlyReports, dataAnalysis (reports 2); materials, certificateRequests (admin 2); settingsGeneral, settingsIntegrations, settingsCustomization, settingsNotifications, settingsSecurity, settingsUsers (settings 6).
- **Disabled (🔒 lock, `nav.reason.finance`): 7** — invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks (reports/finance sub-section).

Of the 23 planned, **11 already have a frontend surface** (folded — the Spec-032 FOLD set: familyCategories drawer, addTeacher drawer, teacherCategories drawer, materials tab, certificateRequests tab, 6× settings tabs) but the nav item still shows «قريبًا» → misleading. The other 12 planned have **no surface yet**. Of the 7 locks, **2 already have a surface** (salaries + banks folded finance tabs, Spec 030) → misleading locks.

## Evidence gaps
- No standalone gap that blocks classification. Legacy detail depth for `timeConverter` (a pure client tool) and `dataAnalysis` (a charting page in legacy) was inferred from the combined inventories + the no-fake law rather than re-opening each raw legacy HTML file; both are classified conservatively (timeConverter = fully-frontend tool; dataAnalysis = display-only board or future-backend if no honest display). Follow-up specs will open the raw `output/roles/admin/pages/` evidence for the exact fields before building.

## Final grounding verdict
**PROCEED.** All 50 items are grounded against the authoritative nav source + a viewed sidebar screenshot + the Spec-032 coverage baseline + confirmed legacy evidence. The classification and strategy below rest on inspected evidence, not memory.
