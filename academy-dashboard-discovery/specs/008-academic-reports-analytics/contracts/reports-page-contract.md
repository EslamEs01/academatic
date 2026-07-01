# Contract: Reports Page (enriched shell)

**Status**: Binding · `public/reports.html` (+ `.en`). An **ENRICHMENT** of the existing implemented Reports page into the Academic Reports & Operations shell — not a new page. Header + action cluster + academic-operations overview + report-category cards + per-area summary sections + planned/backendRequired cards + a filter bar, reusing `pageHeader`/`reportCard`/`cardGrid`/`summaryCards`/`filterBar`/`states`. References FR-001 / FR-002 / FR-003 / FR-011 / FR-012 / FR-014; data-model §1 / §2 / §3 / §6 / §13.

---

## 1. Purpose & reuse

Turn the scattered placeholder Reports page into a calm, premium, fixture-only hub that **organizes + summarizes + links** the implemented Spec 001–007 academic operations. It MUST read as **academy academic-operations reports**, NOT a generic BI dashboard / statistics wall / chart suite. It composes **existing** components only — `pageHeader`, `summaryCards`, `cardGrid`, the (extended) `reportCard`, `filterBar`, `states`, `button`, `confirmAction`, `chip`, `medallion`, `sectionHeader` + the reused status chips. No new table/chart/analytics library.

## 2. ENRICHMENT — rewrite in place, no new page

The current `renderReports()` (a `pageHeader` + a `grid-reports` of 4 placeholder `reportCard`s with dead `route:'#'`, incl. a finance `revenue` card) is **rewritten in place**; `pages/reports.js` + `fixtures/reports.js` are replaced. The page stays registered (`build-html.mjs` `reports` entry, `activeId:'reports'`) — **no `build-html.mjs`/`nav.config.js` change**. The finance `revenue` card is **removed**.

## 3. Layout (RTL, top → bottom)

`pageHeader` («التقارير» + a calm academic-operations subtitle) → a **report action cluster** (`reportActions()`) → an **Academic Operations overview** (a `summaryCards`-style band, §academic-operations-contract) → **report-category cards** (a `cardGrid` of enriched `reportCard`s) → the **per-area summary sections** (attendance / sessions / courses-groups / teacher / student-family) → a **planned/backendRequired** cards row → `noResults` (for the filtered category cards). A `filterBar` filters the category cards.

## 4. Report-category cards (the enriched `reportCard`)

Each category card (root carries `facetAttrs({ area, availability, signal, search })`) shows: a medallion (area icon/accent) + title + one-line description + a labeled **availability** chip (`availabilityChip`) + a fixture **summary** (1–2 counts/chips) + a **drill-down**:

- **`available`** categories → a real `<a href>` to the implemented source page (Attendance → `attendance.html`; Sessions → `sessions.html`; Courses & Groups → `courses.html`; Teachers → `teacher-performance.html`; Students & Families → `students.html`).
- **`planned`/`backendRequired`** categories (monthly reports, data analysis) → the **disabled-with-reason** `reportCard` variant (a non-`<a>` `aria-disabled` block with a reason) — **never** a dead `<a href="#">`.

No finance category. No fabricated metric.

## 5. Filter bar (client-side over the category cards)

A `filterBar` (`targetId:'reports-grid'`) with facets: **search** + **area** + **availability** (and optionally **signal**), filtering the baked category cards with a visible result count + a no-results/reset state. No analytics query, no new filter engine.

## 6. Per-area summary sections

Below the cards, a stacked set of calm summary sections (each a `card`/`info-card`) — Attendance & Outcomes · Sessions & Timetable · Courses & Groups · Teachers · Students & Families — each owned by its own contract (`attendance-outcomes-report-contract.md`, etc.), showing fixture counts + the reused status chips + a labeled report-signal + real source links.

## 7. Responsive

Category cards reflow (`grid-reports`: 1 → 2 → 4 cols); the operations overview tiles wrap; the sections stack to single column on mobile; the action cluster wraps; no horizontal overflow in RTL or LTR.

## 8. States

- **No-results** (filter empties the category cards): the `noResults` panel + reset — distinct from a **zero-signal** (all-clear `healthy`) section.
- **Loading / error**: reuse the Spec 001 `states` patterns if surfaced.

## 9. Actions & no-dead-button

The action cluster (Print/Export-CSV/Export-PDF/Share/Schedule) is honest per `report-actions-contract.md`; every category card is a real link or a disabled-with-reason card. No dead control; no real export.

## 10. `data-*` hooks (reuse only)

`data-filter-form`/`data-filter`/`data-filter-reset`/`data-filter-apply`/`data-filter-count`/`data-no-results`; per card `facetAttrs` → `data-row data-area data-availability data-signal data-search`; action hooks per `report-actions-contract.md`; source links + breadcrumb are real `<a href>`. No new hook.

## 11. Static-HTML-first & Django

All cards + overview + sections baked; JS filters + opens action confirms/reasons only. **Django**: `{% for category in report_categories %}` + `{% for section in report_sections %}` + `{% for r in planned_reports %}`; signal/availability via template tags. No `#app`.

## 12. Enforcement

- **Smoke**: the Reports page has baked **category cards** (each `available` one a real `<a>` to an implemented page; planned ones disabled-with-reason, not dead `#`) + the **operations overview** + the **per-area sections** + the action cluster; the area/availability filter narrows the cards with a count + a no-results/reset; **teacherAbsent ≠ studentAbsent** present in the attendance/teacher sections; **no chart/score/rank/finance token**; no `id="app"`; relative assets; axe critical = 0.
- **Screenshots**: frames #1–6 (AR light/dark, EN, action, filter, mobile).

**Binds to** `academic-operations-contract.md`, `attendance-outcomes-report-contract.md`, `sessions-report-contract.md`, `course-group-report-contract.md`, `teacher-report-contract.md`, `student-family-report-contract.md`, `report-actions-contract.md`, `report-status-contract.md`, `static-html-django-ready-contract.md`, and the Spec 006 `../../006-courses-groups-learning-paths/contracts/courses-page-contract.md` (the enrichment precedent). **MUST NOT** become a BI dashboard, show a chart/score/rank, surface a finance card, or add a dead link.

**Acceptance (binding):**
1. **Given** the Reports page, **When** loaded, **Then** it shows category cards (availability chip + summary + real drill-down or disabled-with-reason), an operations overview, and per-area sections — no chart, no finance, no dead link.
2. **Given** the area/availability filter, **When** applied, **Then** the category cards narrow with a result count + a no-results/reset state.
3. **Given** the page, **When** audited, **Then** every number is a fixture count and teacherAbsent ≠ studentAbsent.
