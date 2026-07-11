# Contract — Fixtures & Locale

## Fixtures
- **New, `src/js/fixtures/reports.js`:**
  - `MONTHLY_REPORTS` — authored rows `{ id, monthKey, areaKey, count, statusId, noteKey }`; 3
    authored months × up to the existing 5 report areas (attendance/sessions/coursesGroups/
    teachers/studentsFamilies). `count` is an authored literal, never derived.
  - `DATA_INSIGHTS` — authored rows `{ id, areaKey, count, trendId, statusId, noteKey }`; `trendId`
    ∈ `improving`/`steady`/`declining` — a hand-assigned categorical LABEL, never computed math.
  - **No PII, no pay/salary/money token, no computed value, no invented entity** beyond what the
    legacy `analysis-course`/`analysis-student` templates ground.
- **Reused unchanged:**
  - `fixtures/families.js` → `FAMILY_CATEGORIES` (`id`, `nameKey`, `descKey`, `statusId`, authored
    `count` — already 2/4/1/1 in source).
  - `fixtures/students.js` → per-row `results` (`levelKey`, `overallProgress`, `courses`,
    `certificates`) and `evaluation` (`monthKey`, `criteria[].ratingId`, `approved`) — read as-is by
    the new boards.
- **Optional additive fields** (categorical only, if clearer than reusing `statusId`/`approved`):
  `resultStatusId` ∈ `onTrack`/`watch`/`atRisk`, `evalStatusId` ∈ `approved`/`pending` on
  `fixtures/students.js` rows — authored literals, never a new computed expression.

## Locale
- **Reports** — extend the EXISTING pair `src/locales/ar.rep.js` + `en.rep.js`: new keys under
  `rep.tab.{overview,monthly,analysis}`, `rep.monthly.*` (incl. `rep.monthly.m.*` month labels),
  `rep.analysis.*`.
- **Families/Students** — extend the EXISTING pair `src/locales/ar.fam.js` + `en.fam.js`: new keys
  under `fam.tab.{directory,categories}`, `fam.cat.board.*`, `stu.tab.{directory,results,
  evaluation}`, `stu.results.*`, `stu.eval.*`.
- **No new locale pair.** `i18n.js` already registers `arF`/`enF` (families) and `arR`/`enR`
  (reports) — **`i18n.js` 0-diff**.

## Rules
- AR ↔ EN **0 divergence** — identical key trees in both `rep.*` and `fam.*`/`stu.*` extensions;
  values translated, keys mirrored 1:1.
- **0 raw keys** in any built page (`t()` returns `⟦key⟧` on a miss — smoke catches this).
- No pay/PII/credential/money string in any new fixture or locale value.
- CSS: additive only (no class renamed/removed); no new `data-*` hook, no new storage key, no new
  dependency, no `package.json`/`build-html.mjs` change beyond wiring the fold-in tabs (0 new pages).

## Acceptance
- Build reports + families/students locale pairs at **0-divergence** (identical AR/EN key sets for
  the new `rep.monthly.*`/`rep.analysis.*`/`fam.cat.board.*`/`stu.results.*`/`stu.eval.*` subtrees).
- Grep for `⟦` in `public/` = 0 (no raw-key leak) on all rebuilt pages.
- Grep for pay/salary/rate/hour_rate/fine/payout/currency/password/secret tokens in the two new
  fixture blocks (`MONTHLY_REPORTS`, `DATA_INSIGHTS`) and the reused `FAMILY_CATEGORIES`/
  `results`/`evaluation` reads = 0.
- `i18n.js` diff = 0 lines; `package.json` diff = 0 lines.
