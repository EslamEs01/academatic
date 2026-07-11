# Quickstart — Spec 035 (verify after implementation)

> Planning artifact. No implementation yet. This is the verification recipe the implement phase must satisfy.

## Build
```bash
cd academy-dashboard-discovery/app
npm run build          # expect: 114 static pages → public/ (+ index) → find public -name '*.html' | wc -l = 115
```
- Expect **115** HTML files (113 + `schedule-search.html` + `schedule-search.en.html`).
- 0 raw locale keys; 13 mirrored locale pairs, 0 divergence.

## Smoke
```bash
npm run test:smoke     # expect: PASS
```
Must assert (additive Families/Students block; protected regexes byte-verbatim):
- route-freeze **115**; `schedule-search.html` + `.en` load.
- nav: `familyCategories`→`families.html`, `scheduleSearch`→`schedule-search.html`, `studentResult`→`student.html#view=results`, `studentEvaluation`→`student.html#view=evaluation`; **0 «قريبًا»** among the four; admin-menu **50** items; families category 0 planned.
- schedule-search: search form + results container + empty state; Book/Assign = `data-disabled-reason`/`aria-disabled`; facet narrows visible rows; **0 external request**; no pay/`type=file`/`type=password`/`<canvas>` token; `FAKE` guard clean.
- student deep-links: `student.html#view=results` opens Results tab; `#view=evaluation` opens Evaluation tab; no new computed score/rank/chart.
- hash-route link integrity: `student.html#view=…` resolves to an existing file (not a dead link).

## A11y
```bash
npm run test:a11y      # expect: critical=0 serious=0
```
- New rows: schedule-search AR/EN light/dark + mobile-390 + open-drawer.

## Screenshots
```bash
node tests/screenshots/capture.cjs   # expect: 0 console errors
```
- New frames: schedule-search (form/results/empty) + families fold proof + `student.html#view=results` + `student.html#view=evaluation`; AR/EN, dark, mobile-390.

## Impact-protection checks
```bash
# only the shared admin sidebar should differ on existing admin pages; these bodies byte-identical:
#   families.html/.en, family.html/.en, students.html/.en, student.html/.en (#page-body), all 16 portal pages, index
git diff --stat            # expect: nav.config.js, build-html.mjs, i18n.js, app.css, 3 tests, docs, + new fixture/locale/page — NO package.json
```
- `package.json` **0-diff**; no new dependency; no new `data-*` hook / storage key.

## Manual visual acceptance
- Open `schedule-search.html` (AR) + `.en`: search form renders, results list renders, apply a facet → rows narrow, Book/Assign shows a reason and does nothing else.
- Click **Family Categories** in the sidebar → lands on families.html; category filter present; open a family's Reclassify drawer → Save is disabled-with-reason.
- Click **Student Results** → `student.html#view=results` (Results tab active). Click **Student Evaluation** → `#view=evaluation` (Evaluation tab active). No score/rank/chart.
