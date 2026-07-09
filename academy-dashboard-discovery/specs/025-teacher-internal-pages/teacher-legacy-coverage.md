# Teacher Legacy Coverage — Spec 025

**Date**: 2026-07-07. Maps the legacy teacher capability set (Spec 015 T1–T27, capture-verified from `output/roles/teacher/`) to the seven Spec 025 pages, or to an explicit exclusion/gate. No silent gaps.

## Coverage table

| T# | Legacy capability | Legacy evidence | 025 disposition | Owner page | Gate |
|---|---|---|---|---|---|
| T1 | home dashboard (minus pay hero) | `teacher-home.md` | delivered-022 (living cockpit) | teacher-portal (exists) | — |
| T14 | timetable + availability (from/to day+time) | `teacher-timetable.md`; `teacher-timetable-full.png` | **implemented-025** (agenda cards, not grid) | **teacher-schedule** | availability edit = backendRequired |
| T8 | my-students roster (group/course assoc.) | `teacher-studentslist.md` | **implemented-025** (display-only cards) | **teacher-students** | contact = backendRequired |
| T22/T3 | outcome workflow (attendance·remark·summary·homework·files) | `teacher-home.md` forms 4–5 | **implemented-025** (flowStrip + checklist display-only) | **teacher-outcomes** | save/submit = backendRequired |
| T4/T5 | mark-absent · request cancel/reschedule | `teacher-home.md` form 3 | display-only preview | teacher-outcomes / teacher-schedule | backendRequired |
| T11 | monthly learning plans | `teacher-monthly-plans.md` | **implemented-025** (folded into tasks) | **teacher-tasks** | — |
| T16 | tasks/tickets board (empty legacy shell) | `teacher-tickets.md` | **implemented-025** (concept kept, shell not cloned) | **teacher-tasks** | complete = backendRequired |
| T9 | monthly report rubric (5+3 dims) | `teacher-students.md`/`teacher-monthly-plans.md` | **implemented-025** (dimension lines, no scales) | **teacher-reports** | — |
| T20/T21 | session/course history | `teacher-course-history-1.md`; `teacher-teacher-history-1.md` | **implemented-025** (recent-sessions slice) | **teacher-reports** / teacher-outcomes | — |
| T15 | materials library | `teacher-library.md`; `teacher-library-full.png` | **implemented-025** (resource cards) | **teacher-library** | upload/download = backendRequired |
| T23 | profile/account edit | `teacher-profile-edit.md` | **implemented-025** (display-only + 3 gates) | **teacher-profile** | photo/save/password = backendRequired |
| T10 | certificate request | `teacher-studentslist.md` modal 4 | display-only preview | teacher-students / teacher-tasks | submit = backendRequired |
| **T2** | **home salary hero (997.00 EGP…)** | `teacher-home.md` 47–48/60; `teacher-home-full.png` | **intentionally-excluded-by-law** | — | never rendered |
| **T17** | **/teacher/salary ledger** | `teacher-salary.md`; `teacher-salary-full.png` | **intentionally-excluded-by-law** | admin-finance-only (Spec 030) if ever | never rendered |
| **T18** | **/teacher/salary-class-report** | `teacher-salary-class-report.md` | **intentionally-excluded-by-law** | admin-finance-only if ever | never rendered |
| **T19** | **/teacher/update-result pay matrix** | `teacher-update-result-…md` | **intentionally-excluded-by-law** (outcome kept, pay columns out) | — | never rendered |
| T7 | live class room | `teacher-session-class-room-mq-2.md` | **future-backend** (B-04) | teacher-schedule (gate) | backendRequired |
| T13 | chat/messaging | `teacher-chat.md` | **future/backendRequired** (B-06); no teacher page/nav | Spec 026 admin preview | — |
| T6 | fake "live room" (re-rendered home) | Spec 015 §exclusions | intentionally-excluded | — | — |
| T12 | thin duplicate roster | `teacher-students.md` dup | intentionally-excluded (merged into T8) | teacher-students | — |
| T24 | /teacher/profile (500) | `teacher-profile.md` | intentionally-excluded (broken) | — | — |
| T25 | Dashboard-1 404s | `*main-index-html.md` | intentionally-excluded (dead) | — | — |
| T26 | admin student page via pay link | Spec 015 §exclusions | intentionally-excluded (admin surface) | — | — |
| T27 | dual-badge bug | Spec 015 §exclusions | intentionally-excluded (legacy bug) | — | — |
| tickets chart | pie + computed "Average" | `teacher-tickets-full.png` | intentionally-excluded (no chart/score engine) | — | — |

## Roll-up

- **Implemented in 025** (7 pages): T14→schedule · T8→students · T22/T3→outcomes · T11/T16→tasks · T9/T20/T21→reports · T23→profile · T15→library (+ T4/T5/T10 as display-only previews with backendRequired submit).
- **Excluded-by-law** (pay): T2/T17/T18/T19 + tickets chart.
- **Future-backend / honest gate**: T7 live-room (B-04), T13 chat (B-06 → 026).
- **Intentionally-excluded** (broken/dup/bug): T6/T12/T24/T25/T26/T27.

No teacher capability is silently dropped; every T# carries a 025 disposition + evidence path.
