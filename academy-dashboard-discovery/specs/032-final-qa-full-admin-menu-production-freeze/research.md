# Research & Decisions — Spec 032 (D1–D50)

Format: **Decision · Rationale**. Grounded in the 6-agent specify audit + current-source reads (`form-field.js`, `preview-drawer.js`, `course-group-actions.js`, `add-family.js`, `enhance.js`).

## Gate & baseline
- **D1 — Spec 031 committed?** **Yes**, HEAD `80449be`. Tree clean.
- **D2 — count = 103?** **Yes** (verified).
- **D3 — admin menu coverage complete?** **Yes** — 50 items, 0 unclassified (`full-admin-menu-coverage-inventory.md`); 2 stale `FUTURE_ROUTES` doc-entries flagged.
- **D4 — route/page coverage complete?** **Yes** — 103 pages, 0 orphan/missing-mirror (`full-route-page-coverage-inventory.md`).

## Mechanism & count
- **D5 — fix mechanism?** **Option B (form-bearing drawers).** Each field-less `data-modal-trigger` → `data-drawer` trigger + a baked `<template data-preview="X">` of `.wiz-grid` `field()` inputs + a `data-disabled-reason` final. Rationale: reuses the CLOSED `data-drawer`→`openSheet`→`template[data-preview]` path verbatim (Spec-027/028 picker machinery; focus-trap covers input/select at `enhance.js:344`); the fix is `modalBtn→drawerBtn` (`course-group-actions.js:14-15`) + bake the template. **Zero new hook/storage/engine/CSS.** Option A (generalize openModal to clone `<template data-modal-form>`) rejected as default (touches the engine; 440px modal lacks the sheet's field focus-trap) — reserved only if a specific FC needs a centered modal (none identified).
- **D6 — count?** **Hold 103.** All 40 forms are drawers folded into existing pages → 0 new pages.
- **D7 — standalone create/edit page?** **No.** The drawer affordance is honest and roomy (the wizard/pickers prove it); no legacy IA forces a standalone create/edit page in the rebuild.

## FC-row plans (D8–D34) — each = grounded `field()` set in a `formDrawer`, Save = gate. Full field lists in `data-model.md`; OMIT/GATE in the contracts.
- **D8 — FC-01/02/03 New session** (`sessions.js`, `table.js`, `welcome.js`): ONE shared `sess-new` drawer — course(select)·teacher(select)·date·time·duration(select)·from-credit(select)·status(select). Save=gate.
- **D9 — FC-04/06 Edit family** (`family.js` + `enhance.js` kebab): `fam-edit` — firstName/lastName(+_ar)·email·phone·status(select)·category(select)·notes(textarea). **OMIT password.**
- **D10 — FC-05 Reclassify family**: reuse the existing `fam-cat` picker drawer + add a category `field(select)`; assign=gate.
- **D11 — FC-07/08 Add child** (`family.js` + `families.js`): `fam-child` — name/name_ar·language(select)·gender(select)·birth_date·teacher_note·admin_note(textarea).
- **D12 — FC-09 Add note (family)**: `fam-note` — notes(textarea) (reuse the family notes label).
- **D13 — FC-10 wizard child-row**: in `add-family.js`, the in-step "Add child" appends a real `childRow(n)` (fields already exist) instead of the field-less modal.
- **D14 — FC-11/12 Edit student** (`student.js` + kebab): `stu-edit` — name/name_ar·language·gender·birth_date·teacher_note·admin_note·family(select). (edit drops trial block.)
- **D15 — FC-13 Add note (student)**: `stu-note` — admin_note/teacher_note(textarea).
- **D16 — FC-14 Add student** (`students.js`): `stu-add` — name/name_ar·language·gender·birth_date·family(select) + trial fields.
- **D17 — FC-15/16 Course add/edit** (`course-group-actions.js`, `courses.js`): `crs-add`/`crs-edit` — material(select)·teacher(select)·start_date·schedule rows(value/time/duration). **OMIT teacher_hour_rate.**
- **D18 — FC-17/18/19 Group** (`course-group-actions.js`, `groups.js`): `grp-add`/`grp-edit` — name·start_date·course(select, prefilled for create-from-course)·students(picker)·schedule. **OMIT t_hour_rate.**
- **D19 — FC-20/21/22 Teacher add/edit** (`teacher-actions.js`, `teachers.js` + kebab): `trn-add`/`trn-edit` — firstName/lastName(+_ar)·email·phone·status·subjects/courses(multi/select)·level(multi)·notes. **OMIT password·fixed_salary·salary_type·hour_rate·fine_per_hour·zoom_*·payout_*.** **GATE cv_file/cv_certificates** (inline `data-disabled-reason`).
- **D20 — FC-23 Add note (teacher)**: `trn-note` — notes(textarea).
- **D21 — FC-24 Teacher category create**: complete the `trn-categories` drawer's Create with name·status(select)·description(textarea).
- **D22 — FC-25 Add feedback** (`outcome-details.js`): `fb-add` — category(select)·remark(select)·note(textarea).
- **D23 — FC-26 Feedback category create** (`report-feedback.js`): complete `rep-fbcat` Create with name·status·description.
- **D24 — FC-27 Create feedback**: `fb-create` — type(select)·subject(select)·category(select)·remark(select)·note(textarea).
- **D25 — FC-28 Create form/survey**: `form-create` — form_name·day(select) + repeatable field-builder rows(label·type(select)·options·required(checkbox)).
- **D26 — FC-29 Add bank** (`finance.js`): `bank-add` — name (name-only). **OMIT gateway/payout credentials.**
- **D27 — FC-30/31/32 Staff add/edit/duplicate** (`staff.js` + kebab): `staff-add`/`staff-edit` — name·username·email·phone·role(select)·status(select). **OMIT password·salary·currency·2FA-otp.** Duplicate = prefilled `staff-add`.
- **D28 — FC-33/34 Certificate template** (`certificates.js`): `cert-tpl` — name + the existing static designer preview. **GATE background upload + canvas designer** (no `type=file`, no canvas). Also `cert-create` (FC-35): student(select)·course(select)·template(select)·date·message(textarea); **GATE PDF preview/download.**
- **D29 — FC-36/37 Material add/edit** (`library.js`): `mat-add`/`mat-edit` — name·name_ar.
- **D30 — FC-38 Library category / item** (`library.js`): `lib-cat` — name; the item form (`lib-item`) — name·type(select)·category(select). **GATE file/thumbnail.**
- **D31 — FC-39 Expense head** (`settings.js`): `head-add` — name·status(select). **OMIT amount.**
- **D32 — FC-38(settings customization) save**: the Customization panel already shows fields → Save stays a `data-disabled-reason` panel gate (no drawer). (Note: numbering per spec; the customization/policy items are panel-gates, not the 40 create/edit drawers.)
- **D33 — FC-39(settings policy) edit**: policy documents are display-only text → Edit stays a panel gate (`data-disabled-reason`); no editable rich-text (law).
- **D34 — FC-40 Generic empty-state CTA** (`states.js`): route to the host page's create form/list (or keep as a real link) — no field-less modal.

## Cross-cutting (D35–D50)
- **D35 — 14 picker drawers re-pin**: `stu-enroll`/`stu-assign`/`stu-move`/`crs-enroll`/`crs-assign-teacher`/`grp-assign`/`grp-assign-teacher`/`trn-assign-course`/`trn-assign-group`/`trn-availability`/`fam-cat`/`rep-fbcat`/`lib-cats`/staff-`st-*` stay complete; smoke re-asserts they render a list + honest final.
- **D36 — 3 hybrid category-create drawers**: `trn-categories`/`rep-fbcat`/`lib-cats` gain a real name/status/description Create form (FC-24/26/38) inside the drawer.
- **D37 — MUST-OMIT enforcement**: `must-omit-fields-contract` + fixtures carry no pay/credential/2FA field; smoke asserts 0 `type=password`, 0 salary/pay figure, 0 credential-named input on all form bodies.
- **D38 — MUST-GATE enforcement**: `must-gate-affordances-contract`; file/PDF/canvas/pairing/Record-Payment stay `data-disabled-reason` gates; smoke `noFile`/`noPdf`/`noCanvas`.
- **D39 — locale**: new field-label/gate-reason keys go into the EXISTING per-spec modules (`ar/en.fam.js` for family/student, `.crs.js` course/group, `.trn.js` teacher, `.rep.js` feedback/forms, `.fin.js` bank, `.adm.js` staff/library/certificates/settings, `.extra.js`/`.ops.js` sessions); mirrored AR/EN; re-verify 0-divergence + 0 raw keys.
- **D40 — smoke form-completion assertion** (`smoke-form-completion-contract`): additive block — for each create/edit trigger, the opened surface (drawer template body) contains ≥1 `input`/`select`/`textarea` AND a `data-disabled-reason` final; 0 field-less create/edit modal; MUST-OMIT/GATE greps clean. Protected asserts byte-verbatim.
- **D41 — a11y open-form rows**: add interaction-state axe rows opening `staff-add`/`fam-edit`/`trn-add`/`crs-add`/`grp-add`/`cert-tpl`/`bank-add`/`fb-create`/`mat-add` + mobile-390 rows + dark-per-family + missing-EN rows → critical=0 serious=0.
- **D42 — screenshot freeze pack**: one open-form frame per rebuilt surface (desktop AR + select EN + dark + mobile) + a picker-drawer proof; update `REVIEW.md`.
- **D43 — mobile 390 no-overflow**: `.wiz-grid` collapses `sm:grid-cols-2`→1-col (`app.css:647`); verify no horizontal overflow on any open form.
- **D44 — role-law regression**: `role-law-regression-contract` — all 9 laws byte-verbatim; the new forms add no pay/credential/file/figure token; teacher-portal ×16 + family + student byte-identical.
- **D45 — no-fake behavior**: `no-fake-behavior-contract` — inert fields + `data-disabled-reason` finals; no persistence/mutation/success-wording; no-mutation snapshot holds.
- **D46 — menu/route coverage proof**: `admin-menu-freeze-contract` + `route-page-freeze-contract` — 50/0 unclassified, 103/0 orphan, build guard green; optional stale-`FUTURE_ROUTES` cleanup.
- **D47 — impact protection**: `impact-protection-contract` — package.json 0-diff; no new page/dep/hook/engine; only the touched pages/components change; protected `#page-body` unaffected where not touched.
- **D48 — docs/freeze**: README + CLAUDE (implement-time) + `implementation-status.md` + `production-freeze-checklist.md` green + REVIEW.md.
- **D49 — allowed/forbidden files**: per `plan.md` project-structure + `scope-guard.md`.
- **D50 — stop conditions**: per `scope-guard.md` (any new engine/hook/dep · MUST-OMIT rendered · MUST-GATE working · `type=file`/`type=password` · PDF/window.open/blob/download · pay/credential field · weakened role-law/no-fake assert · count not justified ⇒ STOP).

## Consolidated technology decisions
- **Form drawer** = `formDrawer()` (new additive helper in `preview-drawer.js`, reuses `previewTemplate`) + `field()`/`optsFrom()` (existing) + `.wiz-grid`/`.field`/`.sheet-*` CSS (existing). **Trigger** = `drawerBtn`/`data-drawer` (existing). **Final** = `data-disabled-reason` gate (existing). **No new hook, no new storage key, no engine edit, no new dependency, no new page.**
