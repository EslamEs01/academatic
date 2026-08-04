# Impact Ledger — Spec 044

**Baseline:** `7d2397b110f8d3311402d02f93719395b7d46e68` read through Git; no
current-tree snapshot is described as historical evidence.

## Exact impact

- HTML files: `115` total; `48` changed; `0` added; `0` removed.
- Extractable `#page-body` records: `114` total; `48` changed; `66` unchanged.
- Authored application files changed: `12`.
- Generated files changed: `60` (`12` assets plus `48` localized HTML pages).
- Interaction consumers migrated: all `468` generated target instances (`234` per locale), plus
  `320` confirmation instances, `810` menus, and `64` mobile-sidebar openers.
- New product routes/dedicated pages: `0`; the existing add-family wizard remains the only
  dedicated large-form page.
- Unrelated page-body drift: `0`.
- Test matrix: smoke `114→114`, a11y `293→300`, screenshots `389→402`, focused interaction `0→22`.

Changed page bodies (24 logical pages × AR/EN):

`attendance`, `certificates`, `course`, `courses`, `dashboard`, `families`, `family`, `finance`,
`group`, `groups`, `leads`, `library`, `messages`, `reports`, `schedule-search`, `schedule`,
`sessions`, `settings`, `staff`, `student`, `students`, `tasks`, `teacher`, `teachers`.

The page-body changes are generated interaction markup migrations. Unlisted pages remain
byte-equivalent at `#page-body`; the shared generated assets provide the global behavior without
manufacturing product-page content changes.

## Changed authored application files

- `app/src/js/components/{confirm-modal,dropdown,interaction-system,outcome-details,preview-drawer,report-feedback}.js`
- `app/src/js/enhance.js`
- `app/src/js/pages/{family,library}.js`
- `app/src/locales/{ar.extra,en.extra}.js`
- `app/src/styles/app.css`

The strict impact extractor rejects missing/duplicate `#page-body`, unexpected HTML paths, parser
errors, and whole-file fallback. `index.html` is the expected redirect and has no page body.

## Final acceptance recount

The impact extractor was rerun after the final 390px RTL containment correction and reproduced the
same totals and exact path set: `48` changed bodies, `66` unchanged bodies, `0` added pages, `0`
removed pages, and `0` unrelated body drift. The correction changed shared CSS/test bytes only; it
did not manufacture or reclassify a page body. Final broad matrices are smoke `114/114`, a11y `300`
scenarios with critical/serious `0/0`, screenshots `402` with `0` console errors, and interaction
guards `22/22`.
