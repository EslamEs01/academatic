# Contract — Fixtures & Locale

## Fixtures
- **New:** `src/js/fixtures/schedule-search.js` — authored, display-only: `SS_KPIS` (literals), `SS_CANDIDATES` (rows: teacherKey/subject/categoryId/dayId/slotId/start/end/availabilityId/room), `SS_TEACHERS`/`SS_CATEGORIES`/`SS_DAYS`/`SS_SLOTS`/`SS_AVAILABILITY` (facet vocab). **No PII, no pay/rate, no computed value.**
- **Unchanged:** `fixtures/families.js`, `fixtures/students.js`, `fixtures/schedule.js` (no edit — deep-links/fold reuse existing surfaces).

## Locale
- **New mirrored pair:** `src/locales/ar.ssr.js` + `src/locales/en.ssr.js` under namespace `ssr.*` (title/sub/searchPh, filter labels, result/chip labels, empty-state, gate reasons, KPI labels).
- **Register in `i18n.js`:** +2 imports (`arSsr`/`enSsr`) + 2 `deepMerge(ar,arSsr)`/`deepMerge(en,enSsr)` → **13 mirrored pairs**.
- **No new keys** for familyCategories / studentResult / studentEvaluation — nav labels (`nav.*`) and surfaces already exist.

## Rules
- AR ↔ EN **0 divergence** (identical key trees); values translated, keys mirrored.
- **0 raw keys** in any built page (`t()` returns `⟦key⟧` on miss → smoke catches).
- No secret/PII/pay/credential string anywhere.

## Acceptance
- Build reports 13 locale pairs, 0 divergence; grep for `⟦` in `public/` = 0; `en.ssr.js`/`ar.ssr.js` key sets equal.
