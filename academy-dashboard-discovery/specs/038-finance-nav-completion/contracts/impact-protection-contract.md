# Contract — Impact Protection

Spec 038's footprint = 6 finance-category nav-lock removals (status flips + routes) + a 3→6 tab
restructure of `finance.html` (move invoiceSection→invoices, paymentsSection→payments; add a new
monthly-invoices board; salaries/banks untouched) + tests/docs. `classSalaryReport` stays a locked
nav item, untouched in body.

## Byte-identical (must not change)
- **Every other admin page body** — teachers/teacher/teacher-performance/settings/staff/library/
  certificates/messages/leads/tasks/announcements/time-converter/schedule-search/courses/groups/
  attendance/sessions/schedule/dashboard/families/family/students/student/reports/gallery/public-
  holiday/scheduled-actions/sessions-analysis, etc. — untouched by 038 (finance work is confined to
  `finance.html`/`.en` + `nav.config.js`).
- **All 16 portal pages** (student/family/teacher portals + internals) and **`index.html`**.
- Existing `fixtures/finance.js` entries backing overview/salaries/banks content — 038 only adds a
  derived-view render path over `INVOICES.rows`, never new rows/fields (target: 0-diff).
- `package.json` · `enhance.js` · `build-html.mjs` · `i18n.js` — **0-diff** (the `tabs()`/`#view=`
  mechanism already exists per the Spec 030/035/036/037 precedent; no new page, no new hook).
- **Within `finance.html`/`.en` itself:** the `salaries` and `banks` tab panels' rendered markup
  (`salariesSection()`/`banksSection()` output) must be byte-identical to the pre-038 Spec-030/032
  output — 038 changes their nav *reachability* (a real `<a>` instead of a disabled control), not
  their content. The 9 baked `inv-<id>` `template[data-preview]` drawers, the 9 `PLANNED_FINANCE`
  cards, and `financeActions()`'s 4 gates must render with identical markup, only relocated to a
  different tab (overview) than before (previously co-located with the invoice/payment lists).

## Allowed to change
- **`finance.html`/`.en` bodies** — 3 tabs (`overview`/`salaries`/`banks`) become 6
  (`overview`/`invoices`/`payments`/`monthly-invoices`/`salaries`/`banks`): the invoice tiles +
  `#invoice-list` filterBar MOVE from overview into the new `invoices` tab; `paymentsSection()`
  MOVEs into the new `payments` tab; a NEW `monthlyInvoicesSection()` renders the month-grouped
  view; `overview` keeps `financeActions()` + the 9 planned cards + the 9 baked invoice drawers;
  `salaries`/`banks` panels are unchanged content, just now nav-reachable.
- **Shared admin sidebar** re-renders on all admin pages (6 finance items flip from disabled-lock
  to real anchors; `classSalaryReport` stays a lock) — the standard nav-flip footprint, same class
  of change as every prior Specs-035/036/037 fold-anchor unlock.
- Modified: `pages/finance.js` (tab restructure + new `monthlyInvoicesSection()`), `nav.config.js`
  (6 status/route flips), `src/locales/ar.fin.js`/`en.fin.js` (new `fin.tab.*`/`fin.monthly.*`
  keys), `app.css` (additive `.finm-*` classes only), tests (`run.cjs`, `a11y/run.cjs`,
  `screenshots/capture.cjs`), docs (README/CLAUDE/REVIEW/implementation-status).

## Verification protocol (at implement time)
1. `git stash` the Spec 038 source changes (leave the Spec 037-committed baseline / green working
   tree intact underneath — `git rev-parse --short HEAD` must show the Spec-037-inclusive commit).
2. Rebuild (`node scripts/build-html.mjs`) and capture `md5sum` of the `#page-body` slice
   (extracted the same way the existing extraction-hash tooling does, per the Specs 018–022
   precedent) for **every page** in the byte-identical set above.
3. Additionally capture `md5sum` of JUST the `salaries`/`banks` `[data-tabpanel]` inner-HTML slices
   inside `finance.html`/`.en` (the sub-body-identical claim from the "Byte-identical" section
   above) — this is a finer-grained check than the whole-page `#page-body` hash, since the whole
   `finance.html` body IS expected to change.
4. `git stash pop`, rebuild again, re-capture the same `md5sum` set (whole-page + the two
   sub-panel slices).
5. Compare: every whole-page hash in the byte-identical set must match exactly; the two
   `salaries`/`banks` sub-panel slices inside `finance.html`/`.en` must also match exactly; only
   `finance.html`/`.en` whole-page hashes (+ the shared sidebar snippet on every admin page) may
   differ.
6. `git diff --stat` must show only the allowed file set above — no `package.json`/`enhance.js`/
   `build-html.mjs`/`i18n.js` line; `fixtures/finance.js` line count = 0 (target) or additive-only.

## Acceptance
- Any body-hash mismatch outside the allowed set (esp. `reports.html`/`families.html`/
  `students.html` — Spec 037 territory, `teacher-performance.html` — Spec 036 territory, any
  portal file) = STOP and report.
- The `salariesSection()`/`banksSection()` sub-panel slices inside `finance.html`/`.en` are
  byte-identical pre/post-038 (proves the tab restructure relocates, never rewrites, that content).
- `find public -maxdepth 1 -name '*.html' | wc -l` = 115 before and after (0 new pages).
- Teacher-pay / family-pay / child-view greps on all out-of-scope bodies = 0 (unaffected surfaces,
  re-verified anyway per standing law).
