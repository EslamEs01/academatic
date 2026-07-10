---
description: "Executable task list — Spec 032 Final QA / Full Admin Menu Coverage / Create-Edit Forms Completion / Production Freeze"
---

# Tasks: Final QA / Create-Edit Forms Completion / Production Freeze

**Spec**: 032 (final freeze) · **Branch**: `feature/012-role-portal-foundation` · **Baseline**: Spec 031 committed (HEAD `80449be`, public HTML **103**)
**Target**: **103** (HELD — all 40 forms are drawers folded into existing pages; 0 new pages). **No implementation runs from this document until `/speckit.implement`.**

**Paths**: repo root `/media/mekky/work/backend/dashboard-intelligence-crawler`; app root `academy-dashboard-discovery/app` (abbrev `app/`).

**Core law**: every Add/Create/New/Edit/Duplicate/Manage/Assign action opens a **real form/picker with visible grounded fields**; the final Save/Submit is a `data-disabled-reason` backendRequired gate. **No fake persistence.**

**Mechanism (Option B)**: field-less `data-modal-trigger` → `data-drawer="X"` trigger (`modalBtn`→`drawerBtn`) + a baked `<template data-preview="X">` of `.wiz-grid` `field()` inputs + a `data-disabled-reason` final, via a new additive `formDrawer()` helper wrapping `previewTemplate`. **No new hook/storage key/engine/CSS/page.** Kebab menus swap `data-modal-trigger`→`data-drawer` in `enhance.js` (no new hook, no `openModal` change).

**MUST-OMIT** (never rendered): password · salary/hour-rate/fine/pay-period · gateway/payout/SMTP/zoom credentials · 2FA-otp · computed Total. **MUST-GATE** (stay `data-disabled-reason`, no control): `type=file` uploads · certificate canvas/PDF · WhatsApp pairing · Record-Payment. **Protected asserts byte-verbatim** (payHit/tchPay/famPay/payFigure/child-view/finance-forbidden/no-mutation/FAKE + 026-031); smoke change additive only.

---

## Phase 1 — Setup / Preflight

- [x] T001 Verify baseline: `git rev-parse --short HEAD` (expect `80449be`+), `git branch --show-current` (`feature/012-role-portal-foundation`), `cat .specify/feature.json` (points to `specs/032-…`). **Gate**: if Spec 031 not committed, STOP.
- [x] T002 Verify count + clean tree: `find app/public -maxdepth 1 -name '*.html' | wc -l` = **103**; working tree clean apart from `specs/032-*` + `feature.json`. **Gate**: if ≠103, STOP.
- [x] T003 Run the green baseline in `app/`: `npm run build` (103), `npm run test:smoke` (PASS), `npm run test:a11y` (0/0). Record numbers. **Gate**: any failure → STOP.
- [x] T004 Confirm no 032 app source exists yet: `git status --short app/` shows no app changes; `preview-drawer.js` has no `formDrawer` yet.
- [x] T005 Load the binding contracts: `specs/032-…/contracts/{scope-guard,form-completion,modal-drawer-strategy,must-omit-fields,must-gate-affordances,no-fake-final-submit,smoke-form-completion,impact-protection,role-law-regression}.md` + `data-model.md` (the 24 form-drawer field specs). Internalize the MUST-OMIT/MUST-GATE token sets before any edit.
- [x] T006 Confirm the reused primitives exist: `components/form-field.js` `field()`/`optsFrom()`; `components/preview-drawer.js` `previewTemplate()`/`sheetRow()`; `components/course-group-actions.js` `drawerBtn()`; CSS `.wiz-grid`/`.field`/`.input`/`.select-input`/`.sheet-*` in `app/src/styles/app.css`. **Verify**: no new hook/component/CSS is required.

## Phase 2 — Foundational (blocks all form work)

- [x] T007 Add the `formDrawer(id,{titleKey,headIcon,tone,fields,ctaKey,reasonKey})` additive helper to `app/src/js/components/preview-drawer.js` — returns `previewTemplate(id,{titleKey,headIcon,tone,bodyHTML:'<div class="wiz-grid">'+fields+'</div>'+<final data-disabled-reason button ctaKey/reasonKey>})`. **Verify**: reuses `previewTemplate`; no new hook/storage key; the final is a clickable `data-disabled-reason` gate (not `button({disabled})`).
- [x] T008 Swap the kebab-menu create/edit triggers in `app/src/js/enhance.js` (familyMenu/studentMenu/teacherMenu/staffMenu, `:107-157`): Edit/Duplicate/Add-note items `data-modal-trigger data-modal-title-key=…` → `data-drawer="X"` (fam-edit/stu-edit/trn-edit/staff-edit/staff-dup/*-note). **Verify**: only menu markup changes; **no new dispatch hook, no `openModal` change**; `git diff enhance.js` = trigger swaps only.
- [x] T009 [P] Add authored select-option fixtures (no pay/credential/PII) for the forms in `app/src/js/fixtures/` (extend existing or a small `form-options.js`): statuses, genders, languages, levels, roles, schedule days/durations, feedback types/remarks/categories, form-field types, media types, book/head statuses. **Verify**: all values fixture-derived; no salary/amount/credential field.
- [x] T010 Rebuild + confirm wiring: `npm run build` still 103; `formDrawer` importable; no missing-key/chip-tone error. **Verify**: build green (forms added incrementally next).

## Phase 3 — US2: Real form before the gate (the 40 create/edit surfaces) [Priority P1]

**Goal**: every Add/Create/Edit/Duplicate opens a drawer with visible grounded fields; Save = gate. **Independent test**: each trigger's baked template body has ≥1 `input`/`select`/`textarea` + one `data-disabled-reason` final; no MUST-OMIT field; no field-less create/edit modal.

- [x] T011 [US2] Sessions (FC-01/02/03): bake a shared `sess-new` `formDrawer` (course/teacher/date/time/duration/from-credit/status selects) in `app/src/js/pages/sessions.js`; point the New-session triggers in `app/src/js/components/table.js` + `app/src/js/components/welcome.js` to `data-drawer="sess-new"`. **Verify**: sessions/dashboard New-session opens fields; Save=gate.
- [x] T012 [US2] Family forms (FC-04/06/07/08/09): bake `fam-edit` (firstName/lastName/±ar/email/phone/status/category/notes — **OMIT password**), `fam-child` (name/name_ar/language/gender/birth/teacher+admin note), `fam-note` (notes) in `app/src/js/pages/family.js`; add the same templates on `app/src/js/pages/families.js` (kebab host). **Verify**: fields visible; no password; Save=gate.
- [x] T013 [US2] Family reclassify (FC-05): add a category `field(select)` to the existing `fam-cat` picker drawer in `app/src/js/pages/family.js`; assign=gate. **Verify**: picker + select; no fake reclassify.
- [x] T014 [US2] Add-family wizard child-row (FC-10): make the in-step "Add child" in `app/src/js/pages/add-family.js` append a real `childRow(n)` (fields already exist) instead of the field-less modal. **Verify**: appends a field row; final Save still gate.
- [x] T015 [US2] Student forms (FC-11/12/13/14): bake `stu-edit` (name/name_ar/language/gender/birth/teacher+admin note/family), `stu-note`, `stu-add` (+trial fields) in `app/src/js/pages/student.js` + `app/src/js/pages/students.js` (kebab host). **Verify**: fields visible; Save=gate.
- [x] T016 [US2] Course forms (FC-15/16): bake `crs-add`/`crs-edit` (material/teacher/start-date/schedule rows — **OMIT teacher_hour_rate**) in `app/src/js/components/course-group-actions.js` (swap `modalBtn('crs.act.edit'/'crs.act.createGroup')`→`drawerBtn`) + `app/src/js/pages/courses.js` + `app/src/js/pages/course.js`. **Verify**: no teacher-rate field; Save=gate.
- [x] T017 [US2] Group forms (FC-17/18/19): bake `grp-add`/`grp-edit` (name/start-date/course-select[prefilled for create-from-course]/students-picker/schedule — **OMIT t_hour_rate**) in `course-group-actions.js` + `app/src/js/pages/groups.js` + `app/src/js/pages/group.js`. **Verify**: no t-rate; create-group-from-course prefills course; Save=gate.
- [x] T018 [US2] Teacher forms (FC-20/21/22/23): bake `trn-add`/`trn-edit` (name/±ar/email/phone/status/subjects/level/courses/notes — **OMIT password/fixed_salary/salary_type/hour_rate/fine/zoom_*/payout_***; **GATE cv_file**) + `trn-note` in `app/src/js/components/teacher-actions.js` + `app/src/js/pages/teachers.js` + `app/src/js/pages/teacher.js`. **Verify**: NO pay/zoom/payout field; cv upload is a gate; Save=gate.
- [x] T019 [US2] Finance Add-bank (FC-29): convert `fin.bank.addTitle` modal to a `bank-add` `formDrawer` (name-only — **OMIT credentials**) in `app/src/js/pages/finance.js`. **Verify**: name field; no credentials; Save=gate; finance no-fake-money asserts still green.
- [x] T020 [US2] Staff forms (FC-30/31/32): bake `staff-add`/`staff-edit` (name/username/email/phone/role/status — **OMIT password/salary/currency/otp**) + `staff-dup` (prefilled) in `app/src/js/pages/staff.js` (+ kebab host). **Verify**: NO password/salary; Save=gate.
- [x] T021 [US2] Certificate forms (FC-33/34/35): bake `cert-tpl` (name + static designer preview — **GATE background/canvas**) + `cert-create` (student/course/template/date/message — **GATE PDF**) in `app/src/js/pages/certificates.js`. **Verify**: no `type=file`/`<canvas>`/`.pdf`; Save/Issue=gate.
- [x] T022 [US2] Library forms (FC-36/37/38): bake `mat-add`/`mat-edit` (name/name_ar) + `lib-cat` (name) + `lib-item` (name/type/category — **GATE file/thumbnail**) in `app/src/js/pages/library.js`. **Verify**: no `type=file`; Save=gate.
- [x] T023 [US2] Settings expense-head + panel gates (FC-39 + customization/policy): bake `head-add` (name/status — **OMIT amount**) in `app/src/js/pages/settings.js`; keep Customization-save + Policy-edit as `data-disabled-reason` panel gates (panels already show fields). **Verify**: head form has no amount; panel gates honest.
- [x] T024 [US2] Reports/feedback forms (FC-25/27/28): bake `fb-add` (category/remark/note) in `app/src/js/components/outcome-details.js`; `fb-create` (type/subject/category/remark/note) + `form-create` (form_name/day + repeatable field-builder rows) in `app/src/js/components/report-feedback.js`. **Verify**: fields visible; no computed score; Save=gate.
- [x] T025 [US2] Generic empty-state CTA (FC-40): make `state.empty.cta` in `app/src/js/components/states.js` route to the host page's create form/list (real link or the host's create drawer) — not a field-less modal. **Verify**: no field-less modal from empty states.
- [x] T026 [US2] Add mirrored locale keys for ALL new form field-labels/placeholders/gate-reasons/option-labels into the owning module pairs: `app/src/locales/ar.fam.js`+`en.fam.js` (family/student), `ar.crs.js`+`en.crs.js` (course/group), `ar.trn.js`+`en.trn.js` (teacher), `ar.rep.js`+`en.rep.js` (feedback/forms), `ar.fin.js`+`en.fin.js` (bank), `ar.adm.js`+`en.adm.js` (staff/library/certificates/settings), `ar.extra.js`/`ar.ops.js`(+en) (sessions). **Verify**: every new key mirrored AR/EN; 0 divergence; 0 raw keys after build.
- [x] T027 [US2] Rebuild + form-render check: `npm run build` (103); grep the built create/edit bodies — each opens a template with ≥1 `input`/`select`/`textarea` + a `data-disabled-reason` final; 0 `⟦` raw keys. **Verify**: forms render; count held.

## Phase 4 — US3: Real picker before Assign/Enroll/Move [Priority P1]

- [x] T028 [US3] Complete the 3 hybrid category-create drawers (FC-24/26/38): add a real name/status/description Create form inside `trn-categories` (`app/src/js/pages/teacher.js`/`teachers.js`), `rep-fbcat` (`app/src/js/components/report-feedback.js`), `lib-cats` (`app/src/js/pages/library.js`). **Verify**: each category drawer's Create opens fields; Save=gate.
- [x] T029 [US3] Re-pin the 14 candidate-list pickers (stu-enroll/assign/move · crs-enroll/assign-teacher · grp-assign/assign-teacher · trn-assign-course/group/availability · fam-cat · rep-fbcat · lib-cats · staff st-*): confirm each still renders a list + an honest `data-disabled-reason` final (no fake assign/mutation). **Verify**: pickers intact; smoke re-asserts.

## Phase 5 — US4: Honest gates on Upload/Generate/PDF [Priority P2]

- [x] T030 [US4] Verify every MUST-GATE affordance is a `data-disabled-reason` gate (not a control) across `app/src/js/pages/{certificates,library,settings}.js` + `app/src/js/components/teacher-actions.js`: cv_file/logo/library-file/thumbnail/certificate-background = gates (no `type=file`); certificate canvas = static preview (no `<canvas>`); certificate PDF preview/download = gates (no `.pdf`/`window.open`); WhatsApp pairing = gate; Record-Payment = full gate. **Verify (`must-gate-affordances-contract`)**: 0 real `type=file`, 0 `<canvas>`, 0 `.pdf`/`blob:`/`window.open`/`download=` on any form body.

## Phase 6 — US1: Admin menu / route coverage freeze [Priority P1]

- [x] T031 [US1] Verify admin menu coverage unchanged by the forms fix: `nav.config.js` route rules 0-diff; 50 items 0-unclassified; build guard + Spec-010/029 nav block green. **Verify (`admin-menu-freeze-contract`)**: no nav flip; folded items stay planned.
- [x] T032 [US1] (optional) Clean the 2 stale `FUTURE_ROUTES` doc-entries (`sessionsAnalysis`, `teacherCategories`) in `app/src/js/nav.config.js` — documentation-only, no build/route effect. **Verify**: build guard still green; count 103.
- [x] T033 [US1] Verify route/page coverage: 103 pages, every base has `.html`+`.en.html` with a `PAGES` owner; 0 orphan/missing-mirror; `build-html.mjs` PAGES 0-diff. **Verify (`route-page-freeze-contract`)**.

## Phase 7 — US8: Future-backend / excluded register [Priority P2]

- [x] T034 [US8] Confirm `future-backend-or-excluded-form-register.md` matches the built gates: every MUST-OMIT field omitted + MUST-GATE affordance gated + future-backend action (reset/invite/gateway/payout/SMTP/backup/message-builder/nav-FB) still an honest gate with an owner. **Verify**: register accurate; append-only edits if needed.

## Phase 8 — US5: Smoke form-completion + dead-UI proof [Priority P1]

- [x] T035 [US5] Add the additive **form-completion** smoke block to `app/tests/smoke/run.cjs`: for each create/edit trigger, its baked `<template data-preview>` body has ≥1 `input`/`select`/`textarea` + one `data-disabled-reason`/`data-confirm` final → `fieldlessCreateEdit===0`; 14 pickers still list+gate; 3 hybrid drawers have a Create form. **Verify**: assertion added; smoke PASS.
- [x] T036 [US5] Add the MUST-OMIT/MUST-GATE smoke greps over the form bodies in `app/tests/smoke/run.cjs`: 0 `input[type="password"]`; 0 salary/pay/hour-rate/fine/amount/computed-Total token; 0 credential-named input (name/id ~ pass|secret|api|key|token|webhook|otp); 0 `input[type="file"]` (DOM-scoped — NOT a raw `type="file"` regex, `library.html` has a legit `data-type="file"` facet); 0 `<canvas>`; 0 `.pdf`/`blob:`/`createObjectURL`/`window.open`/`download=`. **Verify**: all greps clean.
- [x] T037 [US5] Confirm sitewide dead-UI + coverage asserts: `href="#"`=0, raw-keys=0, dead-buttons=0, count=103, menu 50/0-unclassified, route 103/0-orphan. **Verify**: smoke green.

## Phase 9 — US6: Role-law regression proof [Priority P1]

- [x] T038 [US6] Verify all 9 role-laws byte-verbatim in `app/tests/smoke/run.cjs` (payHit/tchPay/famPay/payFigure/child-view/finance-forbidden+no-mutation/settings-block/admin-finance-invariant/zero-href): the new teacher/staff forms render no pay/salary field; no form renders `type=password`/`type=file`/credential/`<canvas>`/`.pdf`; teacher-portal ×16 + family + student bodies byte-identical. **Verify (`role-law-regression-contract`)**: `git diff run.cjs` shows protected regexes unchanged; role-law block green.
- [x] T039 [US6] Verify no-fake behavior: `FAKE` guard=0; no-mutation snapshot on a representative Save/confirm (chips/rows byte-identical); no entity localStorage write; export/print clusters 0 `data-demo-action`. **Verify (`no-fake-behavior-contract`)**.

## Phase 10 — US7: A11y / mobile / dark / screenshots / locale parity [Priority P2]

- [x] T040 [US7] Add a11y rows to `app/tests/a11y/run.cjs`: open-form interaction rows (staff-add/fam-edit/trn-add/crs-add/grp-add/cert-tpl/bank-add/fb-create/mat-add) + mobile-390 rows for key surfaces + dark-per-family + missing-EN rows. **Verify**: critical=0 serious=0; open forms focus-trap/aria-modal/labelled clean.
- [x] T041 [US7] Add open-form screenshot frames to `app/tests/screenshots/capture.cjs`: one frame per rebuilt surface (desktop AR + select EN + dark + mobile 390) + a picker-drawer proof. **Verify**: 0 console errors.
- [x] T042 [US7] Verify locale parity: re-run the flattened-key diff on all 11 pairs → 0 divergence; new form keys mirrored; 0 raw keys. **Verify (`locale-parity-contract`)**.
- [x] T043 [US7] Verify mobile 390 no-overflow on every open form (`.wiz-grid` → 1-col); update `app/screenshots/REVIEW.md` with the Spec-032 section. **Verify**: no horizontal overflow; REVIEW updated.
- [x] T044 [US7] Run the full gate in `app/`: `npm run build` (103), `npm run test:smoke` (PASS + form-completion), `npm run test:a11y` (0/0), `node tests/screenshots/capture.cjs` (0 errors). **Verify**: all green.

## Phase 11 — Polish / docs / final audit

- [x] T045 Update `app/README.md` with a Spec-032 section (form-completion: real fields before the backendRequired final; Django form mapping). **Verify**: section appended.
- [x] T046 Update the `CLAUDE.md` active-feature pointer → "Spec 032 … IMPLEMENTED" **at implementation time only** (per repo convention). **Verify**: history preserved; Spec 031 demoted to History.
- [x] T047 Create `specs/032-…/implementation-status.md` (FC-01…FC-40 resolution, count 103, verification results, impact proof, freeze verdict). **Verify**: mirrors prior implementation-status format.
- [x] T048 Clean-code guard: grep the changed source (incl. comments) for forbidden tokens (`type="file"`, `type="password"`, `<canvas`, `.pdf"`, `window.open`, `blob:`, `salary|pay|hour_rate|fine|amount|total`, api-key/secret/webhook/otp, `.reduce(`/`+=` on money). **Verify**: 0 real hits; reword any disclaimer comment that trips a grep.
- [x] T049 Test-guard + impact/diff review: smoke diff = insertions + the form-completion block only (protected regexes not in the diff); `git diff --stat package.json` empty; `build-html.mjs` PAGES 0-diff; `nav.config.js` route rules 0-diff; teacher-portal ×16 + all portal + index byte-identical; count 103. **Verify (`impact-protection-contract`)**: all hold.
- [x] T050 Update `specs/032-…/production-freeze-checklist.md` to all-green and deliver the final freeze report; **stop — no commit, no push** (the watcher commits). **Verify**: HEAD unchanged; working tree holds the 032 changes uncommitted.

---

## Dependencies & execution order
- **Phase 1** (T001–T006) gates all. **Phase 2** (T007–T010) — `formDrawer` helper + kebab swaps + option fixtures block every form task.
- **Phase 3** (US2 forms, T011–T027) is the bulk; T026 (locales) + T027 (build check) come after the form tasks. **Phase 4** (US3, T028–T029) depends on the category drawers existing (T018/T022/T024). **Phase 5** (US4 gates) verifies T021/T022/T018/T023.
- **Phases 6–7** (coverage/future-owner) are verification. **Phases 8–9** (smoke/role-law) after all forms exist. **Phase 10** (a11y/screenshots/locale) after smoke green. **Phase 11** polish/docs/final.

## Parallel execution guidance
- **Safe [P]**: T009 (option fixtures, independent file). Form tasks touching **different page files + different locale modules + not enhance.js** could run concurrently, but they SHARE the locale modules (T026 batches locale keys) and several share components — treat US2 form tasks as **sequential** to avoid shared-file races.
- **Never [P]**: `preview-drawer.js` (T007), `enhance.js` (T008), the locale modules (T026), `nav.config.js` (T032), `run.cjs` (T035–T039), `a11y`/`capture.cjs` (T040–T041), final audits (T048–T050).

## MVP / safest path
MVP = **Phase 1 → Phase 2 → the first US2 form group (T011 Sessions + T012 Family)** — proves the Option-B `formDrawer` pattern end-to-end (real fields → gate, MUST-OMIT clean, smoke form-completion passes) before rolling it across the remaining domains. Then the rest of US2 → pickers → gates → coverage/role-law/a11y/freeze.

## FC-row → task map
| FC | Task | | FC | Task |
|---|---|---|---|---|
| FC-01/02/03 | T011 | | FC-24 | T028 |
| FC-04/05/06/07/08/09 | T012/T013 | | FC-25/27/28 | T024 |
| FC-10 | T014 | | FC-26 | T028 |
| FC-11/12/13/14 | T015 | | FC-29 | T019 |
| FC-15/16 | T016 | | FC-30/31/32 | T020 |
| FC-17/18/19 | T017 | | FC-33/34/35 | T021 |
| FC-20/21/22/23 | T018 | | FC-36/37/38 | T022/T028 |
| (locales) | T026 | | FC-39(+panels) | T023 |
| | | | FC-40 | T025 |

**Total tasks: 50** · Phases: 11 · [P]: 1 · Count target: **103 (HELD)** · New pages: **0**.
