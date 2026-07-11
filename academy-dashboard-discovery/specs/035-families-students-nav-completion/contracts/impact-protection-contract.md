# Contract — Impact Protection

Spec 035's footprint is bounded to the four nav resolutions + one new page + tests/docs.

## Byte-identical (must not change)
- **Bodies (`#page-body`)** of `families.html`/`.en`, `family.html`/`.en`, `students.html`/`.en`, `student.html`/`.en` — the fold + deep-links reuse existing surfaces; no page-JS edit expected.
- **All 16 portal pages** (student/family/teacher portals + internals) and **`index.html`**.
- Every other admin page body (finance/reports/settings/staff/library/certificates/control pages/etc.).
- `result-summary.js`, `evaluation-rubric.js`, `schedule.js`, `students.js`, `family.js`, `families.js` **page-JS bodies** (no functional edit — nav route only).
- `package.json` — **0-diff**; `enhance.js` — expected 0-diff.

## Allowed to change
- **Shared admin sidebar** re-renders on all admin pages (4 «قريبًا» buttons → anchors) — the standard nav-flip footprint (expected + proven by diffing to only the sidebar region).
- New files: `pages/schedule-search.js`, `fixtures/schedule-search.js`, `locales/ar.ssr.js`, `locales/en.ssr.js`, `public/schedule-search.html` + `.en`.
- `nav.config.js` (4 flips + FUTURE_ROUTES trim), `build-html.mjs` (+1 import/entry), `i18n.js` (+2/+2), `app.css` (additive `.ss-*` if needed).
- Tests (`smoke`/`a11y`/`capture`), docs (`REVIEW.md`/`README.md`/`CLAUDE.md`/`implementation-status.md`).

## Verification
- `git diff --stat` shows only the allowed set; no `package.json`.
- Extraction-hash / body-diff proof: the four family/student page bodies unchanged; only the shared sidebar differs on admin pages; portals + index byte-identical.

## Acceptance
- Any body change outside the allowed set = STOP and report.
