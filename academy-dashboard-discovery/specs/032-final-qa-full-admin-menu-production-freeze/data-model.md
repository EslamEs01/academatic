# Data Model — Spec 032 (form-drawer field specs)

Each rebuilt create/edit surface is a `formDrawer(id, {titleKey, headIcon, fields, ctaKey, reasonKey})` whose `fields` is a `.wiz-grid` of `field({labelKey,name,type,options,...})` calls (INERT — no hook/persistence) + a `data-disabled-reason` Save final. Options come from authored fixtures (no pay/credential). **[OMIT]** = never rendered; **[GATE]** = inline `data-disabled-reason` gate, not a control.

## Form drawers (id · fields · flags)
| Drawer id | Fields (type) | OMIT | GATE | Source |
|---|---|---|---|---|
| `sess-new` | course(select)·teacher(select)·date(text)·time(text)·duration(select)·fromCredit(select)·status(select) | — | — | form-inventory :3357 |
| `fam-edit` | firstName·lastName·firstName_ar·lastName_ar·email·phone·status(select)·category(select)·notes(textarea) | password | — | :5628 |
| `fam-child` | name·name_ar·language(select)·gender(select)·birthDate·teacherNote(textarea)·adminNote(textarea) | — | — | :14320 |
| `fam-note` | note(textarea) | — | — | family notes field |
| `stu-edit` | name·name_ar·language(select)·gender(select)·birthDate·teacherNote·adminNote·family(select) | — | — | :14371 |
| `stu-note` | note(textarea) | — | — | :14320 |
| `stu-add` | name·name_ar·language(select)·gender(select)·birthDate·family(select)·[trial: material(select)·teacher(select)·duration] | — | — | :14320 |
| `crs-add`/`crs-edit` | material(select)·teacher(select)·startDate·schedule rows(value(select)/time/duration(select)) | teacher_hour_rate | — | :2955 |
| `grp-add`/`grp-edit` | name·startDate·course(select, prefilled)·students(picker)·schedule rows·suggestedTotalHours | t_hour_rate | — | :7820 |
| `trn-add`/`trn-edit` | firstName·lastName·firstName_ar·lastName_ar·email·phone·status(select)·subjects(select)·level(select)·courses(select)·notes(textarea) | password·fixed_salary·salary_type·hour_rate·fine_per_hour·zoom_*·payout_* | cv_file·cv_certificates | :16019 |
| `trn-note` | note(textarea) | — | — | :16019 |
| `trn-cat-create` (in `trn-categories`) | name·status(select)·description(textarea) | — | — | :15572 |
| `fb-add` | category(select)·remark(select)·note(textarea) | — | — | 029 rep.fb |
| `fbcat-create` (in `rep-fbcat`) | name·status(select)·description(textarea) | — | — | :7559 |
| `fb-create` | type(select)·subject(select)·category(select)·remark(select)·note(textarea) | — | — | 029 rep.fb |
| `form-create` | formName·day(select) + repeatable rows(label·type(select)·options·required(checkbox)) | — | — | :7627 |
| `bank-add` | name | gateway/payout credentials | — | :1346 |
| `staff-add`/`staff-edit` | name·username·email·phone·role(select)·status(select) | password·salary·currency·2FA-otp | — | :569 |
| `cert-tpl` | name + static designer preview | — | background-upload·canvas-designer | :12071 |
| `cert-create` | student(select)·course(select)·template(select)·date·message(textarea) | — | PDF preview/download | certApproveModal |
| `mat-add`/`mat-edit` | name·name_ar | — | — | :11005 |
| `lib-cat` | name | — | — | :10910 |
| `lib-item` | name·type(select)·category(select) | — | file·thumbnail | :10922 |
| `head-add` | name·status(select) | amount | — | 031 heads |

## Panel gates (not drawers — the panel already shows fields)
- **Customization save** (`settings.js`) — brand/color rows already visible → Save = `data-disabled-reason` panel gate.
- **Policy edit** (`settings.js`) — policy text display-only → Edit = `data-disabled-reason` panel gate (no rich-text editor, law).
- **Empty-state CTA** (`states.js`) — routes to the host create form/list (no field-less modal).

## Authored option fixtures (new/extended — no pay/credential/PII)
Extend existing fixtures or add small option lists (labels via locale keys):
- statuses (active/trial/suspended/stopped/inactive), genders, languages, levels, roles (manager/accountant/supervisor/support), course-schedule days/durations, feedback types/remarks/categories, form-field types, library media types, book categories, head statuses. Select options use `optsFrom(keys, prefix)` or authored `{value,labelKey}` arrays — all fixture-derived, none computed.

## Invariants (enforced by smoke)
- Every `formDrawer` body has ≥1 `input`/`select`/`textarea` + exactly one `data-disabled-reason` Save final.
- No form field is named/typed `password`/`salary`/`pay`/`hour_rate`/`fine`/`amount`/`total`/`key`/`secret`/`webhook`/`token`/`otp`; 0 `type="password"`, 0 real `type="file"`, 0 `<canvas>`.
- Fields are INERT: no `data-*` behavior hook on inputs; no persistence; Save mutates nothing (no row add, no chip flip).
- All field labels + option labels are mirrored AR/EN locale keys (0 raw keys).
