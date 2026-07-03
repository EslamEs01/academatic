# Contract: Scope Guard (Spec 017)

**Status**: Binding · The change-surface law.

## G1 — Allowed (exhaustive)
`src/js/components/portal-shell.js` · `src/js/fixtures/portal.js` (ROLE_NAV only) · `src/js/pages/portals.js` (copy keys only, if at all) · the three role page modules (wrapper-arg-only, if at all) · `src/locales/ar.prt.js`/`en.prt.js` (`prt.nav.*` + the 4 hub keys) · `src/styles/app.css` (additive) · `tests/smoke/run.cjs` (ONE amendment) · `tests/a11y/run.cjs`/`tests/screenshots/capture.cjs` (additive) · `screenshots/REVIEW.md` · `README.md` · `CLAUDE.md` · the 016 matrix delivery annotation · this spec folder · built: the four portal pairs + mirrored assets.

## G2 — Forbidden (hard)
`enhance.js` · `build-html.mjs` · `nav.config.js` · `package.json` · ALL admin sources/pages/fixtures · sibling content keys/registers (see sibling contract) · new pages of any kind (Option B) · new `data-*` hooks · new storage keys · internal-page content (018–020) · engines/API/CDN/TS/auth/CRUD · bottom tab bars · pay vocabulary anywhere near teacher surfaces · commit · push · hooks.

## G3 — Audit (all must pass)
1. Change-surface = G1 only. 2. **41/49** hash-identical (40 admin + index); only the four portal pairs differ. 3. Pay-free three layers (extended set) zero-hit; payHit byte-verbatim green. 4. Sanctioned-anchor registries green; zero `href="#"`/dead/raw sitewide. 5. Home-integrity both proof layers recorded. 6. Sibling/locale diffs confined per the sibling contract. 7. G2 diffs empty. 8. Prior guards 008–016 re-run green; the smoke amendment reviewed as ONE diff.
