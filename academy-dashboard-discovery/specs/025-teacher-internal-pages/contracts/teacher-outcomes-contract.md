# Contract: teacher-outcomes (T22/T3)

**Module**: `teacher-outcomes.js` → `renderTeacherOutcomes()`. Nav `outcomes`. Persona sara.

## Must include
- `pageHead` («نتائج الحصص»/"Session Outcomes").
- `flowStrip` prepare→attend→record→review (4 steps).
- The five-field outcome checklist display-only: attendance · remark · summary · homework note · files note (the legacy `classes-end` fields).
- Example outcome states + honest review status (recent sessions out1/out11).

## Gates (backendRequired)
- Record/save/submit = `guidePanel` backendRequired.

## Forbidden
- Editable form / form controls; fake save/submit/attendance-write; the 23-col pay matrix / any price/paid/total column; any pay token.

## Acceptance
- flowStrip 4 steps + 5-field checklist display-only; save/submit backendRequired; zero form controls; `payHit` false.
