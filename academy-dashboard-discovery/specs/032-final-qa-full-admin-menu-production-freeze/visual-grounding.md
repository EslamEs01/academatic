# Visual Grounding — Spec 032 (Final QA / Forms Completion / Production Freeze)

Targeted Visual Grounding Gate: a **6-agent read-only full-system audit** inspected exact legacy form evidence + the current app source/built output + Specs 021–031 status. No memory, no invention. This file records what was opened; the registers carry the per-row citations.

## Central grounded finding
`src/js/enhance.js:417-435` — `openModal(trigger)` reads only `data-modal-title-key` + `data-modal-note-key` and renders a medallion + `<h3>` title + one `<p>` note (`common.backendRequiredNote`) + a single **Close** button. **No `<input>`/`<select>`/`<textarea>`/`<form>`/Save is ever produced.** Dispatched at `enhance.js:577`. → every `data-modal-trigger` Add/Edit/Create/Duplicate is a **field-less gate**. The ONLY real baked form fields in the app are `components/form-field.js` `field()` used by the add-family wizard (`pages/add-family.js`).

## Current source inspected
- `src/js/enhance.js` (openModal :417, openSheet/openPanel :336-381, dispatch :505-577, menu builders :94-157), `src/js/nav.config.js` (50 items, build guard :148-154, FUTURE_ROUTES :139-145), `scripts/build-html.mjs` (PAGES :85-143, htmlDoc dir :161-166), `src/js/i18n.js` (11 locale pairs :1-66).
- Pages: `add-family.js` (the one real wizard, :14-79), `family.js`/`student.js`/`course.js`/`group.js`/`teacher.js` (detail + pickers), `courses.js`/`groups.js`/`students.js`/`teachers.js` (lists + create modals), `finance.js` (:251 add-bank), `staff.js`/`library.js`/`certificates.js`/`settings.js` (Spec-031 modals).
- Components: `form-field.js` (`field()`/`optsFrom()` :14-33), `wizard.js` (:18-49), `preview-drawer.js` (`previewTemplate`/`sheetRow` :9-26), `course-group-actions.js`, `teacher-actions.js`, `report-feedback.js`, `outcome-details.js`, `table.js`, `welcome.js`, `states.js`, `ui.js` (`button` :6-13).
- Styles: `src/styles/app.css` field/wizard/sheet/modal primitives (`.field`/`.input`/`.select-input`/`.wiz-grid`/`.sheet-*`/`.modal` :155-164, 350-351, 380-387, 506-512, 614-647).
- Tests: `tests/smoke/run.cjs` (role-law + no-fake asserts, exact lines in the registers), `tests/a11y/run.cjs` (138 rows), `tests/screenshots/capture.cjs` (219 rows), `screenshots/REVIEW.md`.

## Legacy form evidence inspected
`output/combined/form-inventory.md` (per-form field lists — every create/edit form, with exact line refs in `create-edit-forms-completion-inventory.md`) · `output/roles/admin/pages/*.md` + `*.json` (modal field dumps: certApproveModal, editUser transaction, status-change note modals) · `frontend-planning/07-data-and-api-surface.md:16-70` (entity model). Forms grounded: family (:6238/:5628), student/child (:14320/:14371), family-category (:1572/:1451/:1412), course (:2955/:3008), group (:7820), teacher (:16296/:16019), teacher-category (:15572/:15531/:15492), staff (:569/:299), invoice (:9733), record-payment (:9853), bank (:1346) + gateway (:13814) + payout (integrations 8/9), certificate template (:12071) + approve modal, material (:11005), library item+category (:10910/:10922), feedback-category (:7559), form-builder (:7627), new-session (:3357), public-holiday (:12287), scheduled-action (:12666), settings general/notifications/integrations/accessibility (:13115/:13689/integrations-*).

## Prior-spec status inspected
`specs/024/correction-status.md`, `specs/025..031/implementation-status.md` + coverage/future-owner registers — synthesized in `role-law-regression-register.md` §(d).

## Grounding verdict
The system is coverage-complete (50 nav items 0-unclassified; 103 pages 0-orphan) and role-law/no-fake GREEN, but **operationally incomplete on create/edit** — 40 Add/Edit/Create actions open a field-less gate. Every one has a grounded field list (minus MUST-OMIT/MUST-GATE) and a proven fix pattern (the add-family wizard + the 14 candidate-list drawers). Spec 032 = close that gap + freeze.

## Evidence gaps (recorded, not invented)
- **Add-Note**: no standalone legacy form → reuse the entity's own `notes`/`admin_note`/`teacher_note` field.
- **create-group-from-course**: no distinct endpoint → prefilled group form.
- **teacher-side feedback category**: create form not separately crawled → reuse the family-category 3-field shape by structural analogy (flagged inferred).
- **group edit**: no `groups/*/edit` route crawled → edit reuses the create field set.
