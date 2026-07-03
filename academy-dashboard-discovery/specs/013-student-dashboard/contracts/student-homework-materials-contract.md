# Contract: Student Homework & Materials (Spec 013)

**Status**: Binding · References FR-005/FR-006; research D2; coverage rows F4 (uploads backendRequired) + F12 (materials, planned-013).

## 1. Homework & tasks section

- Exactly 3 authored display-only items (`STUDENT_PREVIEW.homework`): title, course ref (resolving in `COURSE_BY_ID`), authored due label (e.g. «غدًا», «الخميس») — never a computed date — and a display-only state chip.
- Section closes with the `.pt-planned` mini-card **«تسليم الواجبات»** classed **backendRequired** — the ONLY submit/upload representation.
- Items carry NO buttons, NO checkboxes, NO links.

## 2. Materials section (delivers F12)

- Exactly 3 authored display-only items (`STUDENT_PREVIEW.materials`): title, type icon (`file-text`/`play`/`materials`), course ref.
- Section closes with the `.pt-planned` mini-card **«تحميل الملفات»** classed **backendRequired** — the ONLY download representation.
- No fake file sizes, no fake dates, no search/filter shell (the legacy library's search graduates with a real materials surface later, not as a dead control now).

## 3. Register discipline

`PORTAL_PLANNED.student` is re-registered to exactly: `{ hwSubmit: backendRequired, matDownload: backendRequired, fullHistory: planned }` (the third lives in the history section — see history contract). The family and teacher registers are UNTOUCHED.

## Acceptance (binding)

1. **Given** the student page, **Then** planned-card count = 3 with the new ids/availabilities, each a labeled non-anchor div (smoke re-scope, research D9).
2. **Given** both sections, **Then** 3 + 3 display-only items render with resolving course refs and zero interactive controls.
3. **Given** the AR body, **Then** the backendRequired label «يتطلب الخادم» appears on both gates.
