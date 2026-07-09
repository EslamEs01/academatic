# Contract: teacher-schedule (T14)

**Module**: `teacher-schedule.js` → `renderTeacherSchedule()`. Nav `schedule`. Persona sara.

## Must include
- `pageHead` («جدولي»/"My Schedule") — no full hero.
- Today `dayRail`: time · course/group · room · authored student count · status chip (now/next/done) · prep state.
- Week agenda: day-grouped cards (Sat–Fri), truthful rest-day empty states.
- Next-class card with a "what to prepare" hint.

## Gates (backendRequired)
- Enter/live-room affordance = `gateNote` backendRequired (never a working join).
- Availability edit = backendRequired.

## Forbidden
- 7×24 grid clone; fake start/end-class; fake attendance write; fake live-room/camera/mic; any pay token; «Active & unpaid» tint.

## Acceptance
- Agenda cards render from fixtures; live-room + availability are honest gates; zero `href="#"`; `payHit` false; mobile-390 clean.
