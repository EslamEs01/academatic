# Contract: teacher-students (T8)

**Module**: `teacher-students.js` → `renderTeacherStudents()`. Nav `students`. Persona sara.

## Must include
- `pageHead` («طلابي»/"My Students").
- Roster cards for sara's students (st1/st6/st11/st13): name · course/group label · calm learning signal (from real outcomes out15/out4) · next-session/latest-outcome context.
- A follow-up `storyRow` for students needing attention.

## Gates
- Contact/message (only if surfaced) = backendRequired gate. Student detail = display-only.

## Forbidden
- Data table; messaging composer; fake contact/edit/save; private guardian contact; computed risk score; any pay token.

## Acceptance
- Roster cards view-only from fixtures; zero form controls; no fake composer; `payHit` false; mobile-390 clean.
