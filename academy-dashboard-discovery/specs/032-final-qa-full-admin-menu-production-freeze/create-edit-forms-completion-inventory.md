# Create / Edit Forms Completion Inventory — Spec 032 (THE core artifact)

Every Add/Create/New/Edit/Update/Duplicate/Manage/Assign/Enroll/Move/Upload/Generate/Approve action reviewed and classified. **Prefix `FC-`.**

**Central fact**: `enhance.js:417-435` `openModal()` renders title + note + Close only (no fields). So every `data-modal-trigger` create/edit is a **too-early-backend-gate** (field-less). **40 such actions** (39 `openModal` + 1 bare `disabled-reason`), each with a grounded, fixture-backed form → each must render its fields with the final Save = gate.

Classification ∈ {complete-form-ui · complete-readonly-drawer · complete-confirm-gate · missing-form-ui · too-early-backend-gate · future-backend-only-with-evidence · intentionally-excluded · owned-by-previous-spec-and-green}. **Forbidden unresolved**: dead-button · href-hash · button-only-toast · coming-soon-without-owner · backendRequired-too-early · add/edit/create-without-form · upload-without-gate-or-form · duplicate-without-form · assign-without-picker.

---

## Fix strategy (grounded — reuse existing primitives, NO new hook)

**Recommended = Option B**: convert each field-less `data-modal-trigger` gate into a `data-drawer` picker whose baked `<template data-preview="X">` body is real `field()` form markup (`.wiz-grid` of `field({...})` from `components/form-field.js`, exactly as `add-family.js` composes) + a `data-disabled-reason` backendRequired final. This reuses the CLOSED `data-drawer`→`openSheet`→`<template data-preview>` clone path verbatim (the Spec-027/028 picker machinery); the `openPanel` focus-trap already covers `input`/`select` (`enhance.js:344`). **Zero new hook, zero new storage key, zero new CSS, zero engine edit** — only page/component files change (`sheetRow`→`field()`, `modalBtn(...)`→`drawerBtn(...)`).

**Fallback = Option A** (only where a centered modal is genuinely required over a side sheet): generalize `openModal` to optionally clone a baked `<template data-modal-form="X">` into the `.modal` body — a ~5-line additive change routed by the EXISTING `data-modal-trigger` hook (no new dispatch hook/storage key). Inferior (touches the engine + the 440px modal lacks the sheet's field focus-trap); reserve for narrow cases.

**Reference implementations already in the app**: the **add-family wizard** (`add-family.js` — 5 steps of real `field()` inputs, final Save = gate) and the **14 candidate-list drawers** (below) — both prove "real UI → honest final gate".

**Field primitives (all exist, no new component)**: `field({labelKey,name,type,options,placeholderKey,full})` (`form-field.js:14-30`; types text/number/select/textarea) · `optsFrom()` · `wizard()` · `previewTemplate()`/`sheetRow()` · CSS `.wiz-grid`/`.field`/`.input`/`.select-input`/`.child-row`/`.sheet-*` (`app.css:155-164,380-387,506-512,614-647`). For the honest final, hand-author the `data-disabled-reason` gate (NOT `button({disabled})`, which emits a native-disabled non-clickable button).

---

## A. Too-early-backend-gates → become form-UI (FC-01…FC-40). All class = **too-early-backend-gate** → fix = render grounded fields, Save = gate.

Grounded fields cite `output/combined/form-inventory.md` (see `visual-grounding.md`); **[OMIT]** = MUST-OMIT field (never rendered); **[GATE]** = MUST-GATE affordance (stays a gate, no control).

### Sessions / Dashboard (Spec 026)
| FC | Action | Site | Grounded fields (minus OMIT/GATE) | Acceptance |
|---|---|---|---|---|
| FC-01 | New session | `pages/sessions.js:82` | course(select)·teacher(select)·date·time·duration(select)·from-credit(select)·status(select) (`:3357`) | session form control visible; Save=gate |
| FC-02 | New session (dashboard) | `components/table.js:17` | same | same |
| FC-03 | New session (hero) | `components/welcome.js:32` | same | same |

### Families / Students / Courses / Groups (Spec 027)
| FC | Action | Site | Grounded fields (minus OMIT/GATE) | Acceptance |
|---|---|---|---|---|
| FC-04 | Edit family (kebab) | `enhance.js:107` | firstName/lastName(+_ar)·email·phone·status(select)·category(select)·notes(textarea); **[OMIT password]** (`:5628`) | fields visible; Save=gate |
| FC-05 | Reclassify family (kebab) | `enhance.js:108` | category(select) — reuse the `fam-cat` drawer list (`:1412`) | picker+select; assign=gate |
| FC-06 | Edit family (detail) | `family.js:180` | same as FC-04 | same |
| FC-07 | Add child (detail) | `family.js:181` | name/name_ar·language(select)·gender(select)·birth_date·teacher_note·admin_note (`:14320`) | fields visible; Save=gate |
| FC-08 | Add child (children panel) | `family.js:102` | same as FC-07 | same |
| FC-09 | Add note (family) | `family.js:143` | notes(textarea) — reuse the family `notes` field | textarea visible; Save=gate |
| FC-10 | Add child (wizard step) | `add-family.js:46` | append a real `childRow()` (fields already exist in the wizard) | appends field row |
| FC-11 | Edit student (kebab) | `enhance.js:121` | name/name_ar·language·gender·birth_date·teacher_note·admin_note·family(select); **[OMIT trial-schedule on edit]** (`:14371`) | fields visible; Save=gate |
| FC-12 | Edit student (detail) | `student.js:196` | same as FC-11 | same |
| FC-13 | Add note (student) | `student.js:159` | admin_note/teacher_note(textarea) | textarea visible; Save=gate |
| FC-14 | Add student | `students.js:86` | name/name_ar·language·gender·birth_date·family(select) + trial block (`:14320`) | fields visible; Save=gate |
| FC-15 | Add course | `courses.js:56` | material(select)·teacher(select)·start_date·schedule rows(value/time/duration); **[OMIT teacher_hour_rate]** (`:2955`) | fields visible; Save=gate |
| FC-16 | Edit course | `components/course-group-actions.js:24` | same as FC-15 (+delete_old_sessions) | same |
| FC-17 | Create group (from course) | `course-group-actions.js:27` | name·start_date·course(select, prefilled)·students(picker)·schedule; **[OMIT t_hour_rate]** (`:7820`) | fields visible; Save=gate |
| FC-18 | Add group | `groups.js:69` | same as FC-17 | same |
| FC-19 | Edit group | `course-group-actions.js:42` | same as FC-17 (reuse create field set; no legacy edit route) | same |

### Teachers (Spec 028)
| FC | Action | Site | Grounded fields (minus OMIT/GATE) | Acceptance |
|---|---|---|---|---|
| FC-20 | Edit teacher (kebab) | `enhance.js:135` | firstName/lastName(+_ar)·email·phone·status·subjects/courses(multi)·level(multi)·notes; **[OMIT password·fixed_salary·salary_type·hour_rate·fine_per_hour·zoom_*·payout_*]** · **[GATE cv_file/cv_certificates]** (`:16019`) | fields visible, NO pay/credential; Save=gate |
| FC-21 | Edit teacher (detail) | `components/teacher-actions.js:33` | same as FC-20 | same |
| FC-22 | Add teacher | `teacher-actions.js:22` | same as FC-20 (+geo create fields) | same |
| FC-23 | Add note (teacher) | `teacher-actions.js:36` | notes(textarea) | textarea visible; Save=gate |
| FC-24 | Create teacher category | `teachers.js:71` | name·status(select)·description(textarea) (`:15572`) — completes the `trn-categories` drawer | fields visible; Save=gate |

### Reports / Feedback / Forms (Spec 029)
| FC | Action | Site | Grounded fields (minus OMIT/GATE) | Acceptance |
|---|---|---|---|---|
| FC-25 | Add feedback (outcome) | `components/outcome-details.js:62` | category(select)·remark(select)·note(textarea) | fields visible; Save=gate |
| FC-26 | Create feedback category | `components/report-feedback.js:89` | name·status·description (`:7559`) — completes the `rep-fbcat` drawer | fields visible; Save=gate |
| FC-27 | Create feedback | `report-feedback.js:110` | type(select)·subject(select)·category(select)·remark(select)·note(textarea) | fields visible; Save=gate |
| FC-28 | Create form/survey | `report-feedback.js:159` | form_name·day(select)·repeatable field rows(label/type/options/required) (`:7627`) | field-builder rows visible; Save=gate |

### Finance (Spec 030)
| FC | Action | Site | Grounded fields (minus OMIT/GATE) | Acceptance |
|---|---|---|---|---|
| FC-29 | Add bank | `finance.js:251` | name (name-only; `:1346`) — **[OMIT gateway/payout credentials]** | name field visible; Save=gate |

### Staff / Certificates / Library / Settings (Spec 031)
| FC | Action | Site | Grounded fields (minus OMIT/GATE) | Acceptance |
|---|---|---|---|---|
| FC-30 | Add staff | `staff.js:81` | name·username·email·phone·role(select)·status(select); **[OMIT password·salary·currency·2FA-otp]** (`:569`) | fields visible, NO pw/salary; Save=gate |
| FC-31 | Edit staff (kebab) | `enhance.js:149` | same as FC-30 | same |
| FC-32 | Duplicate staff (kebab) | `enhance.js:153` | pre-filled staff fields (same set) | fields visible; Save=gate |
| FC-33 | Create cert template | `certificates.js:53` | name·(static template layout preview) — **[GATE background upload · canvas designer]** (`:12071`) | name field + static preview; Save=gate |
| FC-34 | Edit cert template | `certificates.js:36` | same as FC-33 | same |
| FC-35 | Create certificate (bare gate) | `certificates.js:96` | student(select)·course(select)·template(select)·date·message(textarea); **[GATE PDF preview/download]** (approve modal) | fields visible; Issue=gate |
| FC-36 | Add material (subject) | `library.js:40` | name·name_ar (`:11005`) | fields visible; Save=gate |
| FC-37 | Edit material | `library.js:34` | same as FC-36 | same |
| FC-38 | Add book category | `library.js:67` | name (+ the library ITEM form: name·type(select)·category(select) **[GATE file/thumbnail]**) (`:10910/:10922`) | fields visible; Save=gate |
| FC-39 | Add expense head | `settings.js:63` | name·status(select) — **[OMIT amount]** | fields visible; Save=gate |

### Generic
| FC | Action | Site | Fix |
|---|---|---|---|
| FC-40 | Empty-state create CTA | `components/states.js:55` | route to the host page's create form (per entity) or keep as a link to the list's Add action |

**Count of too-early-gates: 40** (39 field-less `openModal` + FC-35 bare gate). By module: 026=3 · 027=16 · 028=5 · 029=4 · 030=1 · 031=10 · generic=1.

---

## B. Already-complete UI (NOT targets — re-pinned green at freeze)

### complete-form-wizard (CW)
- **add-family** (`add-family.js`) — 5 steps of real `field()` inputs (identity/contact/children/billing/review), final Save = gate. Only gap: the in-step "Add child" (FC-10) opens the field-less modal → append a real `childRow`.

### complete-picker drawers (CP) — 14, class = **complete-readonly-drawer**
`stu-enroll`·`stu-assign`·`stu-move` (`student.js:226-228`) · `crs-enroll`·`crs-assign-teacher` (`course.js:85-102`) · `grp-assign`·`grp-assign-teacher` (`group.js:86-103`) · `trn-assign-course`·`trn-assign-group`·`trn-availability`·`trn-categories` (`teacher.js:121-136`, `teachers.js:101`) · `fam-cat` (`family.js:150-160`) · `rep-fbcat` (`report-feedback.js:82-93`) · `lib-cats` (`library.js:65-69`) · staff `st-perm`/`st-cat`/`st-activity`/`st-view-*` (`staff.js:26-62`). Each shows a candidate/read-only list + an honest `data-disabled-reason` final. **Hybrid note**: `trn-categories`/`rep-fbcat`/`lib-cats` show a list but their embedded Create/Add button = FC-24/FC-26/FC-38 (fix those).

### complete-confirm-gates (CC) — legit, no form needed
Delete/Deactivate/Suspend/Stop/Activate/Approve/Reject confirms via `openConfirm()` (`enhance.js:384`): family suspend/stop, student suspend/remove, teacher vacation/deactivate/delete, staff deactivate/delete, group remove-student, cert tpl-del/reject, library del, session lifecycle, evaluation Approve, feedback Approve/Delete.

### honest-gates (HG) — no form possible → stay gates (see `future-backend-or-excluded-form-register.md`)
Upload/Download/Generate/Export/Import/Reconcile/Print/Reset/Save-settings/Login-as: certificate generate/preview/download/send/uploadCert, library download/publish/add-material(book), finance salaries generate/approve/markPaid/exportRoster + banks import/reconcile, settings logo/save, staff perm-save/cat-assign/reset, teacher print/export/reset-password/login-as, course/group print, report export, finance export/print, integrations connect/test/configure, backup/import, message-builder.

## Verification
Every create/edit/duplicate/add action (FC-01…FC-40) becomes a form-bearing surface with a visible control + a backendRequired final; the 14 pickers + wizard stay green; the CC/HG gates stay honest. **0 forbidden-unresolved state.** After the fix: **0 field-less create/edit modal** anywhere (the new freeze smoke assertion).
