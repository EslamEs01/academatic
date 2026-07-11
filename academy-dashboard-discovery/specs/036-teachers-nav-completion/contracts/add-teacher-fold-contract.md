# Contract — addTeacher Fold

**Decision:** fold-anchor to `teachers.html`. Count 0. No body edit.

## Must
- `nav.config.js`: `addTeacher` → `implemented`, `route:'teachers.html'` (real anchor; «قريبًا» gone).
- The existing **`trn-add`** form drawer (teacher-actions.js:71; `addTeacherAction()` primary button teachers.js:105/112) stays reachable and unchanged.
- Final **Save** stays a `data-disabled-reason` backendRequired gate (`formDrawer` `common.add`).

## Must NOT
- No new standalone add-teacher page.
- No fake teacher creation; fields stay INERT; no directory mutation.
- **No password** / `type=password` (reset-password stays a disabled-with-reason gate).
- **No salary / fixed_salary / salary_type / hour_rate / rate / fine / fine_per_hour / payout / payroll / payment / compensation / currency** field (the excluded legacy pay fieldset stays OMITTED).
- No `type=file` (CV = gate).
- No edit to the `teachers.html`/`teacher.html` `#page-body`.

## Acceptance
- Smoke: `addTeacher` anchor → teachers.html; `trn-add` drawer + Save gate present; 0 pay/password/`type=file` token in the form body.
- Diff proof: `teachers.html` body byte-identical HEAD→working (only the shared sidebar differs).
