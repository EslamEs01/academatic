# Contract — Fixtures & Locale Zero-Diff (Spec 039)

## Zero-diff (MUST NOT change)
- `src/js/pages/library.js`
- `src/js/pages/certificates.js`
- `src/js/fixtures/content-library.js`
- `src/js/fixtures/certificates.js`
- `src/locales/ar.adm.js`
- `src/locales/en.adm.js`
- `src/js/enhance.js`
- `src/js/components/tabs.js`
- `src/js/components/sidebar.js`
- `src/js/i18n.js`
- `src/styles/app.css`
- `scripts/build-html.mjs`
- `package.json`

## Rationale
The Materials/Books/Templates/Requests surfaces already exist and are hash-reachable; `nav.materials` /
`nav.certificateRequests` labels already exist in the locale (rendered on the current «قريبًا» buttons). A nav
route flip needs no fixture, locale key, component, CSS class, hook, storage key, build entry, or dependency.

## No new
page module · route registry (PAGES) entry · public HTML file · fixture · locale key · component · CSS class ·
`data-*` hook · storage key · dependency.

## Reuse counts (must remain exact)
SUBJECTS 6 · BOOKS 6 · BOOK_TYPES 5 · BOOK_STATUS 3 · BOOK_CATEGORIES 6 · CERT_TEMPLATES 4 · CERT_DESIGNER.fields 4
· CERT_STATUS 3 · CERT_REQUESTS 5 · CERT_ISSUED 2.

## Acceptance
`git diff` over each zero-diff path = empty; locale parity `adm` AR≡EN (0 divergence); 0 raw keys in build.
