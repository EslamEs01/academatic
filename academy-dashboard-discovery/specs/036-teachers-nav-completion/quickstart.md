# Quickstart — Spec 036 (verify after implementation)

> Planning artifact. No implementation yet. The verification recipe the implement phase must satisfy.

## Build
```bash
cd academy-dashboard-discovery/app
npm run build          # expect: 114 static pages → public/ → find public -name '*.html' | wc -l = 115 (UNCHANGED)
```
- Expect **115** HTML files (no new page).
- 0 raw locale keys; locale pairs 0-divergence (trn pair extended in place; no new pair).

## Smoke
```bash
npm run test:smoke     # expect: PASS
```
Must assert (additive Teachers block; protected + teacher-pay + nav010 asserts byte-verbatim):
- count **115**; admin-menu **50**; **exactly 4** nav status changes; **teachers category 0 «قريبًا»**.
- nav: `addTeacher`→`teachers.html`, `teacherCategories`→`teachers.html`, `sessionsKpi`→`teacher-performance.html#view=sessions-kpi`, `monthlyPerf`→`teacher-performance.html#view=monthly`; each a real anchor (not «قريبًا»).
- teachers.html/.en: `trn-add` drawer reachable + Save gate + **no** salary/rate/fine/payout/password/`type=file`; `trn-categories` drawer reachable + Save/assign gates + no fake mutation.
- teacher-performance.html/.en: `#view=sessions-kpi` opens the sessions-KPI tab; `#view=monthly` opens the monthly tab (fresh load, `#view=` honored); both display-only.
- **no computed** score/rank/percentage/rating; **0** `<canvas>`/chart in the new tabs.
- **0** pay token (salary/rate/hour_rate/fine/payout/payroll/currency) in any teacher body (pay grep byte-verbatim).
- `href="#"`=0; raw-keys=0; dead-buttons=0; no `type=file`/`type=password`; 0 external request.

## A11y
```bash
npm run test:a11y      # expect: critical=0 serious=0
```
- New rows: teacher-performance `#view=sessions-kpi` + `#view=monthly` AR/EN light/dark + mobile-390 + open-drawer.

## Screenshots
```bash
node tests/screenshots/capture.cjs   # expect: 0 console errors
```
- New frames: teachers Add-Teacher drawer + Teacher-Categories drawer + teacher-performance `#view=sessions-kpi` + `#view=monthly`; AR/EN, dark, mobile-390.

## Impact-protection checks
```bash
git diff --stat            # expect: nav.config.js, teacher-performance.js, fixtures/teacher-performance.js (new),
                           # ar/en.trn.js, app.css(if used), 3 tests, docs, + regenerated public/ — NO package.json/enhance.js/build-html.mjs/i18n.js
```
- `teachers.html`/`teacher.html` `#page-body` **byte-identical** (nav-flip only).
- `teacher-performance.html`/`.en` bodies change (tabs added) — the ONE sanctioned body change.
- all 16 portal pages + index byte-identical; `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` **0-diff**.
- **Teacher pay-free:** grep the teacher bodies → 0 salary/rate/hour_rate/fine/payout/payroll/currency token.

## Manual visual acceptance
- Click **Add Teacher** → teachers.html; open the Add-teacher drawer → inert fields, Save disabled-with-reason, no pay/password field.
- Click **Teacher Categories** → teachers.html; open "Manage categories" → list + Create form + Save/assign gates.
- Click **Sessions KPI** → `teacher-performance.html#view=sessions-kpi` (KPI tab active; counts + categorical chips, no %/chart).
- Click **Monthly Performance** → `#view=monthly` (monthly tab active; month + trend/status + notes, no %/chart).
