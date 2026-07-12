# Contract — Non-Destructive Impact Protection (Spec 039)

## Method (non-destructive — no stash/reset/checkout-discard/branch-switch/file-overwrite)
1. **Preflight (before any source edit):** build at baseline, then for each `public/*.html` extract the
   `#page-body`, normalize, and md5 → `scratchpad/baseline-md5.txt`. (Alternatively build the baseline from a
   detached temporary git worktree at HEAD `4cbcb31`.)
2. Apply the `nav.config.js` edit + test edits; `npm run build`.
3. Re-extract normalized `#page-body` md5 per page; diff vs the baseline snapshot.
4. Remove only the temporary worktree if one was used. Never discard user work.

## Required result
- `library.html` #page-body **byte-identical**
- `library.en.html` #page-body **byte-identical**
- `certificates.html` #page-body **byte-identical**
- `certificates.en.html` #page-body **byte-identical**
- every other admin #page-body **byte-identical**
- all 16 portal page bodies **byte-identical**
- `index.html` **byte-identical**
- ONLY the shared admin sidebar markup changes (2 «قريبًا» buttons → anchors + `books` href gains `#view=books`)
- generated HTML count stays **115**

## Source diff surface
- `git diff --stat -- src/` = only `src/js/nav.config.js`.
- `git diff -- package.json` = empty.
- `git diff -- src/js/pages/library.js src/js/pages/certificates.js src/js/fixtures/*content* src/js/fixtures/*cert* src/locales/*.adm.js src/js/enhance.js src/js/components/tabs.js src/js/components/sidebar.js src/js/i18n.js src/styles/app.css scripts/build-html.mjs` = empty.

## Acceptance
All byte-identical requirements above hold; count 115; only the shared sidebar differs across pages.
