# Implementation Status — Spec 036 (Teachers Nav Completion)

**Status: IMPLEMENTED** (awaiting the watcher commit). Branch `feature/012-role-portal-foundation`. **Baseline: the uncommitted-but-green Spec 035 working tree** (HEAD `1eb4d9a` = Spec 034; the watcher had not yet committed Spec 035, and the user explicitly approved continuing on the green tree). **No commit / no push** performed.

## Verdict
The four Teachers-category «قريبًا» items are closed honestly: **2 fold-anchors** (addTeacher + teacherCategories → `teachers.html`, reusing the existing `trn-add` / `trn-categories` drawers) + **2 display-only tabs** folded into `teacher-performance.html` (Sessions KPI · Monthly performance). Count held 115. Safe to review and commit — ideally as a commit separate from Spec 035.

## Counts / invariants
- Public HTML **115 → 115** (delta 0; 0 new page bases, 0 new files). Verified `find public -name '*.html' | wc -l` = 115.
- Nav: exactly **4** items `planned → implemented` + route; teachers category now has **0 «قريبًا»**; admin-menu **50 items** unchanged; `FUTURE_ROUTES.teacherCategories` dropped.
- `package.json` **0-diff**; `enhance.js` **0-diff**; `build-html.mjs` **0-diff** (teacher-performance already registered; no new page); `i18n.js` **0-diff** (extended the existing `ar/en.trn.js` pair — no new locale module). *(The build-html/i18n changes visible vs HEAD are the pre-existing Spec 035 baseline, not Spec 036.)*
- No dependency; no backend/API/websocket/engine; no new component/CSS framework; no new `data-*` hook/storage key.

## Files changed (Spec 036)
- **New:** `src/js/fixtures/teacher-performance.js` (authored Sessions-KPI labels + Monthly rows + vocab; no PII/pay/computed).
- **Modified:** `src/js/pages/teacher-performance.js` (wrapped the existing board as the **overview** tab + added **sessions-kpi** + **monthly** display tabs via the shared `tabs()` widget), `src/js/nav.config.js` (4 flips + FUTURE_ROUTES trim), `src/locales/ar.trn.js` + `en.trn.js` (new `trn.board.tab.*` + `trn.sessKpi.*` + `trn.monthly.*`), tests (smoke/a11y/screenshots — additive), docs.
- **Unchanged:** `teachers.js`, `teacher.js`, `teacher-actions.js`, `fixtures/teachers.js`, `fixtures/teacher-links.js` (fold anchors reuse them as-is).

## Surfaces
| Item | Disposition | Route | Writes |
|---|---|---|---|
| addTeacher | fold-anchor → existing `trn-add` drawer | `teachers.html` | Save = existing backendRequired gate; no pay/password field; CV = gate |
| teacherCategories | fold-anchor → existing `trn-categories` drawer | `teachers.html` | Save/assign = existing backendRequired gates |
| sessionsKpi | display-only tab | `teacher-performance.html#view=sessions-kpi` | none (display-only) |
| monthlyPerf | display-only tab | `teacher-performance.html#view=monthly` | none (display-only) |

## Teacher pay-free / no-computed proof
- **0** salary/rate/hour_rate/fine/payout/payroll/currency token in the teacher-performance body (both langs) — the "Salaries" tokens elsewhere are only the shared, Spec-009-sanctioned finance sidebar labels.
- **0** computed score/rank/**percentage**/rating/chart/`<canvas>` — the two tabs render authored session COUNTS (`teacherCounts`) + categorical chips only; the legacy "Classes KPI"/"Monthly Performance" computed `Percentage` is deliberately NOT reproduced.
- Every write final = honest `backendRequired` gate; 0 fake teacher/category creation-save, 0 mutation, 0 fake success wording.
- `trn.kpi` collision fixed (renamed the new block to `trn.sessKpi`) — `teacher.html`/`teacher.js` body **byte-identical** (0 raw keys).

## Verification
- `npm run build` → **115 pages**, 0 raw keys, `ar/en.trn.js` parity (197/197, 0 divergence).
- `npm run test:smoke` → **PASS** + additive Teachers block (4 nav-flip anchors + teachers 0-planned + admin-menu 50; teacher-performance 3-tab widget + no computed/pay; `#view=sessions-kpi`/`#view=monthly` deep-links open the right tab on fresh load; `trn-add`/`trn-categories` reachable). Protected role-law + teacher-pay + Spec-032 + 026–035 asserts byte-verbatim. Sanctioned amendment: the dashboard planned-item probe repointed `teachers → admin` (teachers now has 0 planned; route-freeze stays 115).
- `npm run test:a11y` → **critical=0 serious=0** (+teacher-performance `#view=sessions-kpi`/`#view=monthly` AR/EN light/dark + mobile-390 rows).
- `node tests/screenshots/capture.cjs` → **0 console errors** (+9 sp036 frames: Add-Teacher + Teacher-Categories drawers + the two tabs AR/EN/dark/mobile).

## Impact protection
- `teachers.html`/`teacher.html` `#page-body` **byte-identical** (fold anchors = nav-only; proven by stash-rebuild diff). Only `teacher-performance.html`/`.en` bodies change (tabs added) — the ONE sanctioned body change. All 16 portal pages + index byte-identical; only the shared admin sidebar changed on other admin pages (4 «قريبًا» → anchors). `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` 0-diff.

## Next
Watcher commit (ideally Spec 035 first, then Spec 036 as a separate commit). The teachers category is complete; remaining planned items (reports/admin/settings categories) per the Spec-033 roadmap.
