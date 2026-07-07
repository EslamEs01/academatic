# Contract: teacher-profile (T23)

**Module**: `teacher-profile.js` → `renderTeacherProfile()`. Nav `profile`. Persona sara.

## Must include
- `pageHead` (or a light `idHero`) («ملفي»/"My Profile").
- Identity summary · subjects/specializations · availability windows (from/to day+time, display-only) · teaching preferences (language/theme/contact).

## Gates (backendRequired) — exactly three
- Photo change · profile save · password change (mirrors the family/student profile pattern).

## Forbidden
- Financial/pay information / comp/salary tab; fake save; editable fields; the /profile 500.

## Acceptance
- Identity/subjects/availability/prefs display-only; exactly 3 backendRequired write gates; `payHit` false; mobile-390 clean.
