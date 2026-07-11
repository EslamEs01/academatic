# Contract — Impact Protection

Spec 036's footprint = 4 nav resolutions + 2 teacher-performance tabs + tests/docs.

## Byte-identical (must not change)
- **Bodies (`#page-body`)** of `teachers.html`/`.en` and `teacher.html`/`.en` — the fold anchors are nav-only; no page-JS edit.
- **All 16 portal pages** (student/family/teacher portals + internals) and **`index.html`**.
- Every other admin page body (finance/reports/settings/staff/library/certificates/control/families/students/schedule-search/etc.).
- `fixtures/teachers.js`, `fixtures/teacher-links.js`, `teacher-actions.js`, `teachers.js` **page-JS bodies** (fold anchors reuse them unchanged).
- `package.json` · `enhance.js` · `build-html.mjs` · `i18n.js` — **0-diff**.

## Allowed to change
- **`teacher-performance.html`/`.en` bodies** — the ONE sanctioned body change (tabs added; existing board → overview tab).
- **Shared admin sidebar** re-renders on all admin pages (4 «قريبًا» → anchors) — the standard nav-flip footprint.
- New file: `fixtures/teacher-performance.js`.
- Modified: `pages/teacher-performance.js` (tabs + 2 boards), `nav.config.js` (4 flips + FUTURE_ROUTES trim), `locales/ar.trn.js`+`en.trn.js` (new `trn.*` keys), `app.css` (additive `.tp-*` if needed), tests, docs.

## Verification
- `git diff --stat` shows only the allowed set; no `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js`.
- Body-diff proof: `teachers.html`/`teacher.html` `#page-body` byte-identical HEAD→working; only `teacher-performance.html` body + the shared sidebar differ on admin pages; portals + index byte-identical.
- Teacher-pay grep on teacher bodies = 0.

## Acceptance
- Any body change outside the allowed set (esp. teachers.html/teacher.html body, or any portal/finance/family/student body) = STOP and report.
