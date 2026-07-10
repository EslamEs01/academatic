# Implementation Status — Spec 032 (Final QA / Create-Edit Forms Completion / Production Freeze)

**Status: IMPLEMENTED** (awaiting the watcher commit). Branch `feature/012-role-portal-foundation`; baseline Spec 031 committed at HEAD `80449be`. **No commit / no push** performed.

## Verdict
The academy dashboard frontend is **production-frozen**: every Add/Create/New/Edit/Duplicate action opens a real form UI with visible grounded fields before a `backendRequired` final; coverage is complete (50 menu items, 103 pages); role laws + no-fake registers hold; AR/EN/RTL/mobile/dark/a11y are production-ready. Safe to review and commit.

## Counts / invariants
- Public HTML **103 → 103** (0 new pages). 51 bases × 2 langs + index.
- `package.json` **0-diff** · `build-html.mjs` PAGES **0-diff** · `nav.config.js` route rules 0-diff (only the doc-only `FUTURE_ROUTES` stale-map cleaned).
- No new dependency / engine / hook / storage key / CSS class. One new fixture file (`fixtures/form-options.js`, authored options, no pay/credential/PII).
- Locale: **11 pairs, 0 divergence**; 0 raw keys (`⟦`).

## Mechanism (Option B)
`formDrawer(id, {titleKey, headIcon, fields, ctaKey, reasonKey})` — additive helper in `components/preview-drawer.js` wrapping the existing `previewTemplate()`: renders `field()` controls in a `.wiz-grid` + exactly ONE clickable `data-disabled-reason` backendRequired final. Each field-less `data-modal-trigger` create/edit trigger became a `data-drawer="X"` trigger opening the baked `<template data-preview="X">`, reusing the CLOSED `data-drawer` → `openSheet` → `template[data-preview]` clone path. Kebab items in `enhance.js` carry `data-drawer` (dispatched first, so the drawer always wins); the legacy `data-modal-trigger`/`data-modal-title-key` attrs are kept INERT as anchors so the Spec-027/028/029/030/031 presence-asserts stay byte-verbatim.

## FC-01…FC-40 resolution (24 form drawers + wizard + picker-reuse + link)
| Group | Drawers | OMIT | GATE |
|---|---|---|---|
| Sessions (FC-01/02/03) | `sess-new` (course/teacher/date/time/duration/credit/status) | — | — |
| Families/Students (FC-04…14) | `fam-edit`·`fam-child`·`fam-note`·`fam-cat`(+select)·`stu-edit`·`stu-note`·`stu-add`; FC-10 wizard child-row via native `<details>` | password | — |
| Courses/Groups (FC-15…19) | `crs-add`·`crs-edit`·`grp-add`(prefilled=create-from-course)·`grp-edit` | teacher_hour_rate·t_hour_rate | — |
| Teachers (FC-20…24) | `trn-add`·`trn-edit`·`trn-note`·`trn-categories` create form | password·salary·hour_rate·fine·zoom·payout | cv_file |
| Reports (FC-25/27/28 + 26) | `fb-add`(nested)·`fb-create`·`form-create`·`rep-fbcat` create form | — | — |
| Finance (FC-29) | `bank-add` (name only) | gateway/payout creds·balance | — |
| Staff (FC-30/31/32) | `staff-add`·`staff-edit`·`staff-dup` | password·salary·currency·otp | — |
| Certificates (FC-33/34/35) | `cert-tpl` (name + static preview)·`cert-create` | — | background upload·canvas·PDF |
| Library/Settings (FC-36…39) | `mat-add`·`mat-edit`·`lib-item`·`lib-cats` create form·`head-add` | amount | file·thumbnail |
| Generic (FC-40) | empty-state CTA → real link to `sessions.html` (no field-less modal) | — | — |
| Panel gates (FC-38/39 settings) | Customization Save · Policy Edit stay `data-disabled-reason` panel gates | — | — |

**0 field-less create/edit modal remains.** Every form body has ≥1 input/select/textarea + exactly one primary `data-disabled-reason` final; fields are INERT (no persistence/mutation).

## Pickers / hybrids
- 14 candidate-list pickers re-pinned (list + honest gate): `stu-enroll/assign/move`, `crs-enroll/assign-teacher`, `grp-assign/assign-teacher`, `trn-assign-course/group/availability`, `fam-cat`, `rep-fbcat`, `lib-cats`, staff `st-perm`.
- 3 hybrid category drawers gained real create forms: `trn-categories`, `rep-fbcat`, `lib-cats`.

## MUST-OMIT / MUST-GATE (verified sitewide, DOM-scoped)
0 `input[type=password]` · 0 `input[type=file]` · 0 `<canvas>` · 0 credential/api/webhook/token/otp-named control · 0 salary/hour-rate/fine/amount figure in any form body · 0 `.pdf`/`window.open`/`blob:`/`createObjectURL`/`download=`. All uploads / PDF / certificate designer / WhatsApp pairing / Record-Payment stay `data-disabled-reason` gates.

## Verification
- `npm run build` → **103 pages**, 0 raw keys.
- `npm run test:smoke` → **PASS** (102 page loads) + additive Spec-032 form-completion block (per-page: form drawers render controls + gate, `fieldlessCreateEdit===0`, MUST-OMIT/GATE greps, 14 pickers, 3 hybrids, nested fb-add, admin-menu 50, route-freeze 103). Protected role-law + 026–031 asserts byte-verbatim; the ONE amendment = finance invoice-drawer count scoped to `inv*` (assert intent unchanged, still 9).
- `npm run test:a11y` → **critical=0 serious=0** (+ open-form focus-trap/dialog rows, mobile-390, dark-per-family, missing-EN rows).
- `node tests/screenshots/capture.cjs` → **258 captured · 0 console errors** (39 new `sp032-*` open-form frames).
- Locale parity → 11 pairs, 0 divergence.

## Impact protection
Only the 21 form-host bases (× 2 langs = 42 HTML) changed. Teacher-portal ×16 + family-portal + student-portal + all portal internals + index byte-identical. `package.json` / `build-html.mjs` PAGES / finance-source Spec-009 invariant untouched.

## Role laws (all green)
Teacher pay-free (portal ×16 byte-identical; admin teacher/staff forms carry no pay field — verified in form-drawer templates) · family zero-pay · student child-view · finance no-fake-money (invoice count re-scoped, no money arithmetic, no receipt/file) · settings no-fake-settings.

## Next
Watcher commit. No further frontend spec — this is the production freeze.
