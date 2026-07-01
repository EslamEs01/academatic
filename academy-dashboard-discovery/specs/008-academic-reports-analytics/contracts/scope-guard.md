# Contract: Scope Guard (Spec 008 — Academic Reports & Operations Analytics Shell)

**Status**: Binding · The boundary contract. Spec 008 is an **admin-facing, frontend-only, fixture-only** enrichment of the existing `reports.html` into a calm reports/operations **shell** that organizes + summarizes + links existing surfaces. It **explicitly forbids** any analytics/BI/reporting/export engine, any computed score/rank/chart, and **all finance**. References FR-009/FR-010/FR-013/FR-016; SC-002/SC-004/SC-009; data-model §1–§13.

---

## G1. Forbidden — product scope (no engines, no finance, no fake BI)

Do NOT build or wire as real, for the reports domain:

- a **backend API** · a **database** · real **auth** · real **permission enforcement** · real **CRUD persistence**.
- **THE CENTRAL FORBIDDEN LINE — a real reporting / analytics / aggregation / BI engine.** NO computed analytic, NO statistics service, NO query/aggregation at runtime beyond plain display of **existing fixture counts**. Every number on the shell is a roll-up of an existing fixture summary (`OUTCOME_SUMMARY`/`STATUS_SUMMARY`/`SESSIONS.total`/`GROUP_SUMMARY`/active-courses/`TEACHERS_NEEDING_FOLLOWUP`/family-student attention).
- a real **export engine** — NO real PDF generation, NO CSV generation, NO file download, NO email/share send, NO scheduled-report job. Print/Export/Share/Schedule are **demo toast / confirm→demo-toast / disabled-with-reason** only.
- a **chart / graph / sparkline / canvas** — NONE. Counts + labeled chips only.
- a **computed score / ranking / leaderboard / percentile / trend / prediction / "health %"** — NONE. `report-signal` (healthy/needsFollowUp/attentionRisk) is an **authored display flag**, not a computed grade.
- a real **finance / salary / payroll / invoice / payment / accounting / revenue** report, figure, card, chip, or widget — NONE. The existing `revenue` placeholder reportCard is **removed**; the disabled finance **nav** items stay as-is and are **not** surfaced as reports. Where the legacy showed money, the shell shows **only academic counts** or omits it.
- a real **teacher-performance scoring / student ranking** — NONE (the teacher/student sections reuse the Spec 007/004 display signals + links only).
- a real **attendance / scheduling / course / group / enrollment** mutation or engine — the sections **link** to those pages; they never mutate.
- a real **notification backend** · real WhatsApp/Zoom integration.

Do NOT build any **dashboards** or **portals**: teacher/student/family dashboard or portal. The Reports shell is an **admin** view that links to admin pages; no "my reports"/login/role-switcher framing.

The legacy report/export action family is reused as a **concept only** — each maps to honest feedback, never a real workflow:

| Legacy report action | Spec 008 treatment (allowed) | Forbidden as |
|---|---|---|
| Print report | `data-demo-action` → toast | a real print pipeline |
| Export CSV / Export PDF | **disabled-with-reason** (`rep.reason.export`) | a real file generation |
| Share report | **disabled-with-reason** (`rep.reason.share`) | a real send |
| Schedule report | **disabled-with-reason** (`rep.reason.schedule`) | a real backend job |
| Open report area (attendance/sessions/courses/groups/teachers/students/families) | **real `<a>`** → the implemented source page | a fake detail report |
| Monthly reports / Data analysis | **planned/backendRequired** card (no route) | a faked working report |
| Revenue / Salary / Accounting report | **NOT reproduced** (omit; finance out of scope) | a real finance report |

## G2. Forbidden — technology

No chart library · no table library · no form library · no calendar library · no analytics library · no SPA framework · no CDN · no TypeScript · no new runtime dependency. Native ES modules + existing components only. **No charts/graphs/canvas for "reports."**

## G3. Forbidden — architecture regressions

No whole-page `<div id="app">` mount; no runtime page-DOM construction (category cards/sections/chips/modals MUST be baked at build); no new `data-*` hook (reuse the closed allowlist); no absolute/external asset path; no new public page (enrich `reports.html` in place); no `nav.config.js`/`build-html.mjs`/`dashboard.js` change.

## G4. Forbidden — legacy reuse

No copied legacy assets/classes/logo/palette/icons/private wording; no legacy numeric statuses; no copied legacy report column sets / table dumps. The legacy is **product/UX reference only**.

## G5. Allowed in Spec 008

Rewrite `pages/reports.js` + `fixtures/reports.js` (a `report-summary` roll-up + honest `REPORT_CATEGORIES`, finance removed); lightly extend `report-card.js` (availability chip + summary slot); add `report-status.js` (report-signal + report-availability maps) + `report-actions.js` (`reportActions()`); add `ar.rep.js`/`en.rep.js`; minor `app.css`. Reuse: `pageHeader`/`summaryCards`/`cardGrid`/`filterBar`/`states`/`button`/`confirmAction`/`chip`/`medallion`/`sectionHeader`, the `outcome-status`/`status-map`/`group-status`/`teacher-signals` chips, and the existing fixture summaries.

## G6. Future report surfaces stay out

`monthlyReports`/`dataAnalysis`/`sessionsAnalysis` stay **planned** (surfaced as honest planned/backendRequired cards, no route); a real export/PDF/CSV/scheduled-report spec, a real analytics spec, and a finance-reporting spec are all **future**, never faked here.

## G6b. Spec 008 IS the approved spec

This Spec 008 is the Academic Reports shell; it deliberately excludes BI/analytics/export engines and all finance — those belong to future specs.

## G7. Admin-frontend-only

Every surface is the admin's view; links go to admin pages only. No role-switching, no portal chrome.

## G8. Grep-able anti-patterns

No `id="app"` on `reports.html`; no `http(s)://`/CDN in `public/reports.html`; no `chart`/`canvas`/`graph` token; no `salary`/`payroll`/`payout`/`invoice`/`revenue`/`accounting`/`currency` token in the new reports src; no `score`/`rank`/`leaderboard`/`percentile` computation; no `⟦` raw-key leak.

### G8a. Concrete grep AUDIT (each MUST print nothing)

```bash
cd academy-dashboard-discovery/app
grep -RnE 'id="app"' public/reports.html public/reports.en.html && echo FAIL || echo ok
grep -RniE 'salary|payroll|payout|invoice|revenue|accounting|compensation|currency|hour_?rate' src/js/pages/reports.js src/js/fixtures/reports.js src/js/components/report-*.js src/locales/*.rep.js && echo FAIL || echo ok
grep -RniE 'chart|canvas|graph|leaderboard|percentile' src/js/pages/reports.js src/js/components/report-*.js && echo FAIL || echo ok
grep -RnE 'https?://|cdn\.' public/reports.html public/reports.en.html && echo FAIL || echo ok
grep -RnE '⟦' public/reports.html public/reports.en.html && echo FAIL || echo ok
# no dead in-shell links (every report-card <a> resolves to a real baked page; planned cards are NOT <a>)
```

(A no-fabricated-metric audit is structural: the reviewer confirms every number on `reports.html` equals an existing fixture export — e.g. matches the dashboard chip counts — never a runtime aggregation.)

### G8b. One-line reviewer tests

- "Is there a single number on Reports that is not an existing fixture summary count?" → MUST be **no**.
- "Does Reports show a chart, score, rank, leaderboard, or percentile?" → MUST be **no**.
- "Does Reports show a salary/revenue/invoice/finance figure or card?" → MUST be **no**.
- "Does any export/print/share/schedule action generate a real file, send, or schedule a job?" → MUST be **no**.
- "Do teacherAbsent and studentAbsent show as two distinct labeled facts?" → MUST be **yes**.
- "Does every available category card link to a real implemented page, with planned reports labeled (not dead)?" → MUST be **yes**.

## G9. Enforcement

Smoke (`tests/smoke/run.cjs`) asserts: no `id="app"`; no external request; no raw i18n key; baked category cards/sections; real `<a>` drill-down links to implemented pages; planned cards carry a disabled-reason (not a dead `<a>`); the G8a greps clean; teacherAbsent ≠ studentAbsent present; no dead control. Axe critical = 0. The screenshot matrix (`screenshot-acceptance.md`) treats a chart / fake score-rank / finance widget as a hard FAIL. **Binds to** `screenshot-acceptance.md`, `static-html-django-ready-contract.md`, `reports-page-contract.md`, `report-actions-contract.md`, and the Spec 007 `../../007-teacher-performance-kpis/contracts/scope-guard.md`.

**Acceptance (binding):**
1. **Given** Reports, **When** audited, **Then** every number equals an existing fixture summary — zero fabricated metrics, zero charts/scores/ranks.
2. **Given** Reports, **When** audited, **Then** zero finance figures/cards/widgets appear and no finance field exists in the reports fixture.
3. **Given** any report action, **When** triggered, **Then** it produces a demo toast / confirm→toast / disabled-with-reason — nothing exports/sends/schedules/persists.
4. **Given** the G8a audit, **When** run, **Then** every command prints nothing (no FAIL).
