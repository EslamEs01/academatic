# Contract: Impact Protection — Spec 034

**Binding.** Bounded blast radius.

**Changed (allowed):** 5 new page modules + `fixtures/control-center.js` + `ar/en.ctrl.js` + `nav.config.js` (5 flips) + `scripts/build-html.mjs` (+5 imports/entries) + `i18n.js` (+2 imports/deepMerge) + `enhance.js` (+1 guarded `initTimeConverter` IIFE) + `app.css` (additive) + tests/docs.

**0-diff / byte-identical:**
- `package.json` (`git diff --stat package.json` = 0); no dependency.
- Every existing page's `#page-body` byte-identical (the 103 pages' bodies unchanged).
- The shared sidebar changes on all pages (5 planned buttons → anchors) — the SAME pattern as Spec 025/031 nav flips; this is the only cross-page delta and is expected.
- `enhance.js`: the added IIFE is guarded by `[data-time-converter]` → **0 behavior change on the other 108 pages**; no new global `data-*` dispatch; no storage key.
- teacher-portal ×16 + family + student + all portal internals + index: bodies byte-identical.

**Verify:** `git diff --stat package.json` empty; `build-html.mjs` diff = 5 imports + 5 entries; `nav.config.js` diff = 5 flips + FUTURE_ROUTES trim; `enhance.js` diff = 1 IIFE; `i18n.js` diff = 2 imports + 2 deepMerge; count 113; existing `#page-body` regions unchanged.
