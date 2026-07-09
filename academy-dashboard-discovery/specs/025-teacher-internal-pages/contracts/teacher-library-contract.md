# Contract: teacher-library (T15)

**Module**: `teacher-library.js` → `renderTeacherLibrary()`. Nav `library`. Persona sara. (B-05 owner.)

## Must include
- `pageHead` («مكتبتي»/"My Library").
- Resource cards from `TEACHER_PREVIEW.materials` (tm1/tm2/tm3 + static): material name · type chip · status · linked course/group.
- Static filter/search ONLY if it actually filters the rendered cards.

## Gates (backendRequired)
- Upload · download = backendRequired.

## Forbidden
- Fake upload/download/open/delete/cloud-sync; fake filter (a filter that does nothing); any pay token.

## Acceptance
- Resource cards render with status + linked course/group; upload/download backendRequired; any filter works statically; `payHit` false; mobile-390 clean.
