# Implementation Status — Spec 035 (Families & Students Nav Completion)

**Status: IMPLEMENTED** (awaiting the watcher commit). Branch `feature/012-role-portal-foundation`; baseline Spec 034 committed at HEAD `1eb4d9a`. **No commit / no push** performed.

## Verdict
The four Families/Students «قريبًا» items are closed honestly: 1 fold-anchor (familyCategories→families.html), 1 new standalone page (schedule-search, display-only availability finder with gated Book/Assign), and 2 deep-links to existing display-only tabs (studentResult→`student.html#view=results`, studentEvaluation→`student.html#view=evaluation`). Safe to review and commit.

## Counts / invariants
- Public HTML **113 → 115** (+2; 1 new base `schedule-search` × 2 langs). Verified `find public -name '*.html' | wc -l` = 115.
- Nav: exactly **4** items `planned → implemented` + route; families category now has **0 «قريبًا»**; admin-menu **50 items** unchanged; `FUTURE_ROUTES` trimmed of studentResult/studentEvaluation.
- `package.json` 0-diff; no dependency; no backend/API/websocket/engine; no new component/CSS framework; **`enhance.js` 0-diff**.
- `sidebar.js` `langRoute()` made hash-aware (backward-compatible) so EN deep-links resolve to `student.en.html#view=results` / `#view=evaluation`; routes without a hash produce byte-identical output.
- Locale: new mirrored pair `ar/en.ssr.js`; **13 pairs, 0 divergence** (51 keys each); 0 raw keys.

## Files changed
- **New:** `src/js/pages/schedule-search.js`, `src/js/fixtures/schedule-search.js`, `src/locales/ar.ssr.js`, `src/locales/en.ssr.js`, `public/schedule-search.html` + `.en` (build output).
- **Modified:** `src/js/nav.config.js` (4 flips + FUTURE_ROUTES trim), `scripts/build-html.mjs` (+1 import/entry), `src/js/i18n.js` (+2 imports/+2 deepMerge), `src/js/components/sidebar.js` (hash-aware langRoute), `tests/smoke/run.cjs` + `tests/a11y/run.cjs` + `tests/screenshots/capture.cjs` (additive), docs. **No `app.css` change needed** (page reuses existing primitives).

## Surfaces
| Item | Disposition | Route | Writes |
|---|---|---|---|
| familyCategories | fold-anchor to existing surface | `families.html` | existing `fam-cat` Save gate (byte-identical) |
| scheduleSearch | new standalone page | `schedule-search.html` (+`.en`) | Book/Assign = `data-disabled-reason` gates (no fake) |
| studentResult | deep-link to existing tab | `student.html#view=results` | none (display-only) |
| studentEvaluation | deep-link to existing tab | `student.html#view=evaluation` | Approve = existing backendRequired gate |

## No-fake / role-law proof
- schedule-search: authored fixtures only; client-side `data-filter`/facet narrowing (no engine, no network, **0 external request**); availability is an authored label; Book/Assign are `aria-disabled` gates — **0 fake booking/assignment/mutation**, 0 fake-success wording.
- **0** `input[type=file]`/`input[type=password]`/`<canvas>`/pay-figure in the schedule-search `#page-body` (only the shared finance sidebar carries the Spec-009-sanctioned "Salaries" nav labels).
- studentResult/studentEvaluation: `result-summary.js` / `evaluation-rubric.js` **byte-identical**; no computed score/rank/GPA/%/chart introduced.
- familyCategories: `families.html`/`family.html` `#page-body` **byte-identical** (only the shared sidebar flipped 4 buttons→anchors); `fam-cat` reclassify Save stays a gate; no mutation.
- Role laws green: teacher pay-free (teacher-* byte-identical), family zero-pay, student child-view (portal untouched; deep-links target the admin `student.html` profile, not the portal), finance Spec-009 invariant.

## Verification
- `npm run build` → **115 pages**, 0 raw keys, 13 locale pairs 0-divergence.
- `npm run test:smoke` → **PASS** + additive Families/Students block (route-freeze 115; 4 nav-flip anchors + families 0-planned + admin-menu 50; schedule-search form/results/gates/empty-state/facet-narrow + 0 external request + no pay/file/password/canvas; student `#view=results`/`#view=evaluation` deep-links open the right tab). Protected role-law + Spec-032 + 026–034 asserts byte-verbatim. Sanctioned amendments: route-freeze 113→115 (+ `schedule-search` PAGES entry) and the dashboard planned-item probe repointed families→teachers (families now has 0 planned).
- `npm run test:a11y` → **critical=0 serious=0** (+schedule-search AR/EN light/dark/mobile-390/open-drawer rows; student `#view=results`/`#view=evaluation` rows already present).
- `node tests/screenshots/capture.cjs` → **0 console errors** (+11 sp035 frames: schedule-search form/results/detail/empty/mobile/dark/EN + families fold + fam-cat drawer + student results/evaluation deep-links).

## Impact protection
Only the 52 admin pages' shared sidebar changed (4 «قريبًا» → anchors — the standard nav-flip pattern; PROVEN by diff: `#page-body`-onward byte-identical for families/family/students/student ×2 lang). All portal pages ×16 + index byte-identical; `package.json`/`enhance.js` 0-diff.

## Next
Watcher commit. The Families/Students sidebar group is complete; remaining planned items (teachers/reports/admin/settings categories) per the Spec-033 roadmap.
