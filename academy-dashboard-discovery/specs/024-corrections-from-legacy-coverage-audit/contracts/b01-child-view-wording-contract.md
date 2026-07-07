# Contract: B-01 — Child-view wording (Must fix)

**Problem**: the child-view note still reads «لوحة الطالب — النسخة الأولى» / "Student dashboard — first version" (F-00-1), contradicting the corrected role model.

## Allowed edits

- `app/src/locales/ar.prt.js:297-298` — `noteT`/`noteD` → child-view/family-owned wording, e.g. `noteT: 'عرض الابن — النسخة الأولى'`, `noteD` guardian-addressed («…معاينة لوحة الابن ضمن حساب العائلة…»).
- `app/src/locales/en.prt.js:294` — `noteT: 'Child view — part of the family account'`, `noteD` guardian-addressed.
- Rebake output: `public/student-{portal,homework,history,profile,progress,materials}.html` (+ `.en`) and `public/assets/locales/*`.
- Declared supersession note appended to `specs/022-…/` for the 5 affected internals' documented extraction hashes (10 of 12; `student-schedule`'s 2 unchanged).

## Forbidden

- Editing the FAMILY note (`ar.prt.js:387-388`) or TEACHER note (`ar.prt.js:446-447`).
- Any «لوحة الطالب» / «بوابة الطالب» / "Student Portal" / "student dashboard" / "standalone student dashboard" in child-view surfaces.
- New locale key; new hook; direct built-HTML edit (must go through the build).
- Reintroducing a student primary role or altering `ROLE_NAV.student`.

## Acceptance (machine-checkable)

```
grep -RIl "لوحة الطالب"  public/student-*.html      == 0
grep -RIl "بوابة الطالب" public/student-*.html      == 0
grep -RIl "student dashboard" public/student-*.en.html == 0
grep -c "لوحة العائلة" src/locales/ar.prt.js         == baseline (unchanged)
grep -c "لوحة المعلم"  src/locales/ar.prt.js         == baseline (unchanged)
```
- New note reads child-view/family-owned wording (ar + en mirrored).
- Structural smoke probes on the 6 pages unchanged (note is a `pt-note`); optional one-line role-model guard added.
- 022 extraction-hash supersession declared (not silent).
- Public HTML count == 77.

**Owner**: 024-correction (Must fix).
