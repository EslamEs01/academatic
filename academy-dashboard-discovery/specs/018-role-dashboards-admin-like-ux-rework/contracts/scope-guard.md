# Contract: Scope Guard (Spec 018)

**Status**: Binding · The change-surface law.

## G1 — Allowed (exhaustive)
`src/js/pages/{student,family,teacher}-portal.js` (home rewrites) · `src/js/pages/family-child.js` (NEW) · `scripts/build-html.mjs` (EXACTLY the 2 registration lines) · `src/js/fixtures/portal.js` (NEW COMPACT_HOME + CHILD_PROFILE slices ONLY; ROLE_NAV/PERSONAS/PREVIEWS/PLANNED untouched except gate re-pins declared in the smoke contract) · `src/locales/ar.prt.js`/`en.prt.js` (new prt.kpi/band/child + prt.title.familyChild additions; displaced keys RETAINED) · `src/styles/app.css` (additive) · `tests/smoke/run.cjs` (the ONE amendment) · `tests/a11y/run.cjs`/`tests/screenshots/capture.cjs` (additive) · REVIEW.md · README.md · CLAUDE.md · 016 sequence amendment + matrix annotation (append-only) · this spec folder · built: the three role pairs + the NEW family-child pair.

## G2 — Forbidden (hard)
portal-shell.js · ROLE_NAV · portals.js/hub pair · enhance.js · nav.config.js · package.json · ALL admin files · deleting displaced fixtures/keys · full internal-page implementations (019–021) · long pages (the ceiling) · fake anything · new hooks/storage · engines/API/CDN/TS/auth · teacher pay vocabulary (extended set) · commit · push · hooks.

## G3 — Audit
1. Change-surface = G1. 2. **43/51** identity; build-html diff = the 2 lines verbatim. 3. Ceiling/window/KPI probes green ×3 homes ×2 langs. 4. Child drill-down: bodyAnchors===5 exact + the family-child branch green. 5. Pay: three layers extended-set zero + payHit & zero-pay regex byte-verbatim. 6. Displaced-keys retention grep green. 7. G2 diffs empty. 8. Prior guards (008–017 incl. Shell-v2 asserts) green; the amendment reviewed as ONE diff. 9. Heights table recorded.
