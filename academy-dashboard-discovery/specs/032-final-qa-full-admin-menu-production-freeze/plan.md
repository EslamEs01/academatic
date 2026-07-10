# Implementation Plan: Final QA / Full Admin Menu Coverage / Create-Edit Forms Completion / Production Freeze

**Spec**: 032 (final production-freeze) · **Branch**: `feature/012-role-portal-foundation` · **Baseline**: Spec 031 committed (HEAD `80449be`, public HTML **103**, tree clean)
**Inputs**: `spec.md` + the 13 companion artifacts · **Status**: PLANNED (no tasks, no implementation, no commit)

## Summary

Close the last frontend-completion gap and freeze. `enhance.js` `openModal()` (`:417`) renders title+note+Close only → **40 Add/Create/Edit/Duplicate actions open a field-less "too-early backendRequired gate"**. Convert each into a **form-bearing surface with visible, grounded fields**; the final Save stays a `backendRequired` gate. Plus the full-system freeze audit (menu/route/action coverage, role-law/no-fake registers, locale parity, final a11y/screenshot pack).

**Mechanism decision (D5): Option B — form-bearing drawers.** Each field-less `data-modal-trigger` create/edit gate becomes a `data-drawer` trigger whose baked `<template data-preview="X">` body is a `.wiz-grid` of real `field()` inputs + a `data-disabled-reason` backendRequired final. This reuses the CLOSED `data-drawer`→`openSheet`→`template[data-preview]` clone path verbatim (the Spec-027/028 picker machinery; `openPanel` focus-trap already covers `input`/`select` at `enhance.js:344`). **The fix is literally `modalBtn(labelKey,ic)` → `drawerBtn(labelKey,ic,id)` (`course-group-actions.js:14-15`) + bake the form template.** No new hook, no new storage key, no engine edit, no new CSS (`.wiz-grid`/`.field`/`.input`/`.select-input`/`.sheet-*` all exist). One tiny additive helper `formDrawer()` reuses `previewTemplate()`.

**Count decision (D6): hold 103.** All 40 forms are drawers folded into existing pages → **0 new pages** (D7: no standalone create/edit page needed; the drawer affordance is honest and roomy). `nav.config.js`/`build-html.mjs` PAGES **0-diff**.

## Technical Context

- **Stack**: static HTML-first; native ES modules; per-page pre-rendered `public/*.html` (AR RTL + `.en` LTR); no CDN/framework/TS/SPA/chart lib.
- **Form primitive** (`components/form-field.js`): `field({labelKey,name,type∈{text,number,select,textarea},options,placeholderKey,valueKey,value,full})` — **INERT** (no hook, no persistence, no validation) + `optsFrom(keys,prefix)`. Renders `.field`>`.field-label`+control.
- **Drawer primitive** (`components/preview-drawer.js`): `previewTemplate(id,{titleKey,headIcon,tone,bodyHTML})` bakes `<template data-preview="id">`; `data-drawer="id"` → `openSheet` clones it (`enhance.js:336-381`). `sheetRow(k,v)`.
- **New additive helper** `formDrawer(id,{titleKey,headIcon,fields,ctaKey,reasonKey})` → `previewTemplate(id,{…, bodyHTML:'<div class="wiz-grid">'+fields+'</div>'+<data-disabled-reason final>})`. Placed in `preview-drawer.js` (additive export, ~8 lines) — reuses `previewTemplate`; **no new hook/storage/engine**.
- **Trigger swap**: `modalBtn(labelKey,ic)` (field-less `data-modal-trigger`) → `drawerBtn(labelKey,ic,id)` (`data-drawer`). For kebab menus (family/student/teacher/staff in `enhance.js:107-157`), swap the menu item's `data-modal-trigger` → `data-drawer="X"`; bake the form template on every host page (list + detail).
- **Fixtures/locales**: authored select options + field-label/gate-reason keys go into the EXISTING per-spec fixture + locale modules (`ar/en.fam.js`, `.crs.js`, `.trn.js`, `.rep.js`, `.fin.js`, `.adm.js`, `.extra.js`/`.ops.js` for sessions). Mirrored AR/EN.
- **Persistence/engine**: NONE. Fields inert; final Save = `data-disabled-reason` gate; nothing persists/mutates.

## Constitution Check (standing-law gates — all stay green)

| Gate | 032 compliance |
|---|---|
| Static HTML-first · closed `data-*` set | ✅ reuse `data-drawer`+`template[data-preview]` |
| No new hook/storage key/engine | ✅ `formDrawer` reuses `previewTemplate`; enhance.js drawer path unchanged |
| No `type=password`/`type=file` | ✅ MUST-OMIT/MUST-GATE (`must-omit-fields-contract`, `must-gate-affordances-contract`) |
| No salary/pay figure · no credentials · no computed Total | ✅ MUST-OMIT enforced |
| No `<canvas>`/PDF/`window.open`/`blob:`/`download` | ✅ MUST-GATE enforced |
| No fake persistence/success/mutation | ✅ inert fields + `data-disabled-reason` final; no-mutation snapshot |
| `href="#"`=0 / raw-keys=0 / dead-buttons=0 | ✅ every trigger opens a real drawer |
| Teacher pay-free / family zero-pay / student child-view / finance / settings invariants | ✅ forms add no pay/credential/file/figure token; protected regexes byte-verbatim |
| Count 103 · package.json 0-diff | ✅ no new page/dependency |

**No gate violation.** No `[NEEDS CLARIFICATION]` remains (D1–D50 in `research.md`).

## Form-completion architecture (the 40 FC rows)

**Uniform fix per FC row**: (1) build a `<fixture>` of select options if needed (authored, no pay/credential); (2) compose `fields` = `.wiz-grid` of `field()` calls (grounded, minus MUST-OMIT); (3) bake `formDrawer('X', {titleKey, fields, ctaKey, reasonKey:'common.backendRequiredNote'-style})` in the page render; (4) swap the trigger `modalBtn/data-modal-trigger` → `drawerBtn/data-drawer="X"`; (5) MUST-GATE affordances (file/PDF/canvas) rendered as an inline `data-disabled-reason` gate inside the form (not a control). Final Save = a `data-disabled-reason` button.

**Grouped by owning file** (exact fields in `data-model.md`; MUST-OMIT/GATE in the contracts):
- **Sessions** (FC-01/02/03) — `sessions.js`, `components/table.js`, `components/welcome.js`: one shared `sess-new` form drawer (course/teacher/date/time/duration/status selects).
- **Families/Students** (FC-04…FC-14) — `family.js`/`families.js`/`student.js`/`students.js` + kebab swaps in `enhance.js`: `fam-edit`, `fam-child`, `fam-note`, `stu-edit`, `stu-note`, `stu-add` drawers; FC-05 reuses the existing `fam-cat` picker + a category select; FC-10 appends a real `childRow` in `add-family.js`.
- **Courses/Groups** (FC-15…FC-19) — `course-group-actions.js` + `courses.js`/`groups.js`: `crs-edit`/`crs-add`/`grp-edit`/`grp-add` form drawers (**OMIT teacher_hour_rate/t_hour_rate**); create-group-from-course = prefilled `grp-add`.
- **Teachers** (FC-20…FC-24) — `teacher-actions.js`/`teachers.js` + kebab: `trn-edit`/`trn-add`/`trn-note` drawers (**OMIT password/salary/hour-rate/fine/zoom/payout**; **GATE cv_file**); FC-24 completes the `trn-categories` drawer's Create with a name/status/description form.
- **Reports/Feedback/Forms** (FC-25…FC-28) — `report-feedback.js`/`outcome-details.js`: `fb-add`/`fbcat-create`/`fb-create`/`form-create` drawers (form-builder = repeatable field rows).
- **Finance** (FC-29) — `finance.js`: `bank-add` drawer (name-only; **OMIT credentials**).
- **Staff/Certs/Library/Settings** (FC-30…FC-39) — `staff.js`/`certificates.js`/`library.js`/`settings.js` + kebab: `staff-add`/`staff-edit`/`staff-dup` (**OMIT password/salary**); `cert-tpl` (name + static preview; **GATE background/canvas**); `cert-create` (student/course/template/date/message; **GATE PDF**); `mat-add`/`mat-edit`; `lib-cat`/`lib-item` (**GATE file/thumbnail**); `head-add` (name/status; **OMIT amount**). FC-38/FC-39 (customization save / policy edit) are honest **panel gates** (the settings panels already show fields; Save stays a gate) — no drawer needed.
- **Generic** (FC-40) — `states.js`: empty-state CTA routes to the host page's create form/list.

**Already-complete (re-pin, not rebuild)**: the add-family wizard (CW) + the 14 candidate-list pickers (CP); the 3 hybrid category drawers (`trn-categories`/`rep-fbcat`/`lib-cats`) get their embedded Create/Add completed (FC-24/26/38).

## Project structure (files this feature will touch)

```
app/src/js/components/
  preview-drawer.js        (MODIFY → + formDrawer() additive helper)
  course-group-actions.js  (MODIFY → modalBtn→drawerBtn + bake crs/grp form templates)
  teacher-actions.js       (MODIFY → trn edit/add/note drawers, OMIT pay/zoom/payout)
  report-feedback.js       (MODIFY → fb/fbcat/form-create form drawers)
  outcome-details.js       (MODIFY → add-feedback form drawer)
  table.js · welcome.js    (MODIFY → new-session drawer trigger)
app/src/js/pages/
  sessions.js · family.js · families.js · student.js · students.js · courses.js · course.js ·
  groups.js · group.js · teachers.js · teacher.js · finance.js · staff.js · certificates.js ·
  library.js · settings.js · add-family.js   (MODIFY → bake form templates + swap triggers)
app/src/js/enhance.js      (MODIFY → kebab menu items data-modal-trigger→data-drawer; NO new hook, NO openModal change)
app/src/js/fixtures/*      (MODIFY/NEW → authored select-option fixtures; no pay/credential)
app/src/locales/ar.*.js/en.*.js (MODIFY → mirrored field-label/gate-reason keys)
app/src/styles/app.css     (MODIFY → additive only IF a tiny form-in-sheet tweak is needed)
app/scripts/build-html.mjs (0-diff — no new page)
app/src/js/nav.config.js   (0-diff, OR the 2 stale FUTURE_ROUTES entries cleaned — optional)
app/tests/smoke/run.cjs    (MODIFY → additive form-completion assertion; protected asserts byte-verbatim)
app/tests/a11y/run.cjs     (MODIFY → + open-form/mobile/dark/EN rows)
app/tests/screenshots/capture.cjs (MODIFY → + open-form frames)
app/screenshots/REVIEW.md · README.md · CLAUDE.md   (MODIFY → docs/freeze)
```

**Forbidden**: `package.json`, dependency, backend/API/auth, any new engine (chart/PDF/upload/payment/notification/permission), new hook/storage key, new page (unless the count contract approves), `openModal` generalization (Option A) unless a specific FC row justifies it.

## Complexity & risk

| Risk | Mitigation |
|---|---|
| 40 forms (largest fix) | uniform `formDrawer()` helper + grounded field lists; group by owning file |
| MUST-OMIT leak (pay/credential) | `must-omit-fields-contract` + byte-verbatim role-law asserts + additive smoke figure/secret checks |
| MUST-GATE leak (file/PDF/canvas) | `must-gate-affordances-contract` + smoke `noFile`/`noPdf`/`noCanvas` |
| Template baked on wrong page (kebab list vs detail) | bake each form template on every host page (shared builder called from list + detail) |
| Locale burden (new field labels) | mirror into existing per-spec modules; re-verify 0-divergence |
| Protected-assert drift | smoke change additive only; role-law/026-031 regexes byte-verbatim |
| Count creep | 103 held; 0 new page; `page-count-contract` |

## Phase outputs
- **Phase 0** → `research.md` (D1–D50).
- **Phase 1** → `data-model.md` (per-FC field specs + fixtures), `contracts/` (18), `quickstart.md`, CLAUDE.md pointer (deferred to implement per repo convention).
- **Phase 2 (tasks)** → NOT generated here (`/speckit.tasks` next).

## Progress
- [x] Preflight green (Spec 031 committed, count 103)
- [x] Mechanism decided (Option B) + count decided (103)
- [x] Constitution check (no violation)
- [x] Phase 0 research (D1–D50)
- [x] Phase 1 data-model + contracts + quickstart
- [ ] Phase 2 tasks (next command)
