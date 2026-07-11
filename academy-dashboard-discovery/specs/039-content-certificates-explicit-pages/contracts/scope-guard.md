# Contract — Scope Guard (Spec 039)

## Allowed implementation files (narrow allowlist)
**Application source:** `src/js/nav.config.js` **only**.
**Tests/docs:** `tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`,
`screenshots/REVIEW.md`, `README.md`, `CLAUDE.md`, the Spec 039 directory, and regenerated `public/*.html`
(shared-sidebar anchors only).

## Forbidden to change (zero-diff)
`src/js/pages/library.js`, `src/js/pages/certificates.js`, `src/js/fixtures/content-library.js`,
`src/js/fixtures/certificates.js`, `src/locales/ar.adm.js`, `src/locales/en.adm.js`, `src/js/enhance.js`,
`src/js/components/tabs.js`, `src/js/components/sidebar.js`, `src/js/i18n.js`, `src/styles/app.css`,
`scripts/build-html.mjs`, `package.json`. Any teacher/family/portal page. Any unrelated admin page body. Any other
spec (append-only status notes excepted if strictly needed).

Do not widen the allowlist silently. If a verified current path differs from those above, record the exact path.

## STOP conditions (halt and report)
- page count ≠ 115 · admin menu ≠ 50 · a standalone page becomes required
- Materials or Certificate Requests tab does not exist · hash deep-link fails on fresh load · EN hash routing unsupported
- `library.js`/`certificates.js`/fixtures/locales/`build-html.mjs`/`enhance.js`/`package.json` must change
- real upload/PDF/approval/delivery required · any fake success/mutation required
- teacher/family portal file must change · unrelated page body must change
- a protected assertion must be weakened beyond the two declared amendments
- current source contradicts the spec · unrelated user changes overlap the scope

## Process guards
No `tasks.md`; no implementation started in this planning step; no commit/push; no branch cut; no per-spec git
feature hook; no destructive git (stash/reset/checkout-discard/clean).
