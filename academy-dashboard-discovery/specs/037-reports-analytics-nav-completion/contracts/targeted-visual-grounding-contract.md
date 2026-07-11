# Contract — Targeted Visual Grounding

**Obligation:** implementation MUST trace to first-hand evidence, not memory or summary.

## Definition of done
- A grounding note exists **per surface group** (reports·families·students) citing exact paths/lines, re-confirmed at implement time if any citation is stale.
- Every decision cites current-app source + legacy evidence + a prior-spec register row.
- No decision invents pay, salary, computed score/rank/GPA/percentage/rubric-total, chart/`<canvas>`, or backend/API behavior.

## Evidence ledger (must stay accurate)

| Surface group | Current app | Legacy | Prior spec |
|---|---|---|---|
| monthlyReports / dataAnalysis | `pages/reports.js:258` (`renderReports`, single long display-only body, no `tabs()`); `fixtures/reports.js`; `locales/ar.rep.js`+`en.rep.js`; `public/reports.html` (`#view=` hits are shared-sidebar links only) | `output/combined/page-inventory.md` (monthly roll-ups: `teachers/N/monthly-classes`, `teacher/monthly-plans`); `output/roles/admin/pages/management-analysis-course.md` + `management-analysis-student.md` (finance-free analysis; `analysis-expenses`/`analysis-invoices`/`monthly-invoices` excluded — owner 038) | 033 roadmap (reports/analytics→037); 036 `teacher-performance` tabs precedent; 037 `visual-grounding.md` |
| familyCategories | `pages/families.js:16` (`renderFamilies`; category filter + `fam-cat` kebab reclassify drawer only, no labeled Categories board); `fixtures/families.js`; `locales/ar.fam.js`+`en.fam.js` | legacy family-category management pages (`output/combined/page-inventory.md`) | 035 (`familyCategories` fold-anchor → `families.html`); 037 `flagged-035-items-audit.md` |
| studentResult / studentEvaluation | `pages/student.js:227` (`tabs()` group with `results`/`evaluation` panels wired to `components/result-summary.js`/`components/evaluation-rubric.js`, ONE student st1); `pages/students.js:87` (`renderStudents`, single table, no `tabs()`, no results/evaluation board) | legacy per-student result/evaluation templates (`output/combined/page-inventory.md`; `output/roles/admin/pages/management-analysis-student.md`) | 035 (deep-links to `student.html#view=results/evaluation`); 037 `flagged-035-items-audit.md` (single-student weakness vs. plural nav label) |
| full Admin sidebar audit | `nav.config.js` (all 50 items/statuses/routes/`FUTURE_ROUTES`, build-time dead-link guard at the file tail) | n/a (audit is over current app only) | 033 roadmap; 037 `admin-missing-pages-audit.md` (50 items, 0 truly-missing, 0 ownerless) |

## Mechanism grounding (shared)
- `components/tabs.js:16` — `tabs({group, items, panels, ariaKey})`: first item is default/active; others hidden until `#view=` selects them.
- `enhance.js` — reuse-only, syncs `#view=` and persists `academy.schedView.<group>`; **0-diff**, no new hook.
- `tests/smoke/run.cjs` — existing protected asserts: admin-menu-50, reports 7-card/2-planned, finance 9-planned, families 0-planned, teachers 0-planned (exact citations recorded in `visual-grounding.md`).

## Acceptance
- A reviewer can open every cited path and see the claimed surface/behavior as described.
- If any citation is stale at implement time (file moved/renamed/refactored), grounding MUST be re-run and this ledger updated before writing code.
- No row in this ledger may be used to justify a computed metric, a chart, a finance figure, or a backend call.
