# Contract — Fixtures & Locale

## Fixtures
- **New:** `src/js/fixtures/teacher-performance.js` — authored, display-only: `SESSIONS_KPI_LABELS` (per-teacher categorical quality label), `MONTHLY_ROWS` (teacher/month/trend/note), and vocab (`KPI_QUALITY`, `PERF_TRENDS`, `PERF_MONTHS`). **No PII, no pay/rate, no computed value.**
- **Reused unchanged:** `fixtures/teachers.js`, `fixtures/teacher-links.js` (`teacherCounts`) — authored session counts for the KPI board.

## Locale
- **Extend the EXISTING pair** `src/locales/ar.trn.js` + `en.trn.js` — new keys under `trn.tab.*` (overview/sessions-kpi/monthly tab labels), `trn.kpi.*` (KPI board + quality labels), `trn.monthly.*` (monthly board + trend/status/month labels + note prefixes).
- **No new locale pair; `i18n.js` 0-diff.**
- **No new keys** for addTeacher / teacherCategories (nav labels + drawers already exist).

## Rules
- AR ↔ EN **0 divergence** (identical key trees); values translated, keys mirrored.
- **0 raw keys** in any built page.
- No pay/PII/credential string anywhere.

## Acceptance
- Build reports locale pairs 0-divergence; grep for `⟦` in `public/` = 0; the new `trn.*` subtrees match ar↔en.
