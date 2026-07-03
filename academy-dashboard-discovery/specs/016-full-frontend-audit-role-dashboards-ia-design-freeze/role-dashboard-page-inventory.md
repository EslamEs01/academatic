# Role Dashboard Page Inventory (Spec 016 — binding; folds the three per-role page plans)

Every internal page: sections · data sources (fixtures only) · honest gates · legacy rows covered. All pages: AR+EN pairs, portal shell v2, card-first, zero tables, zero form controls (display-only previews + gates), zero pay vocabulary (teacher: hard-rule scope = the whole `teacher-*` family; family: zero figures).

## Student app — home + 6 internal pages (Spec 018)

| Page | Sections | Sources | Gates | Covers |
|---|---|---|---|---|
| `student-portal.html` (HOME, kept) | current 13 sections; homework/materials/history/progress become summary slices + sanctioned links | as today | as today | S-overview |
| `student-schedule.html` | today band · next session · full week agenda (Friday empty) · month-glance strip (authored) | SESSIONS_FULL, SCHEDULE_WEEK | live join = backendRequired note | legacy timetable + today-sessions |
| `student-homework.html` | open homework (full list) · in-progress · done (authored states) · per-item detail cards | STUDENT_PREVIEW.homework (extended) | hwSubmit backendRequired | class-summary/homework records |
| `student-materials.html` | course-grouped library · type filters (baked chips) | STUDENT_PREVIEW.materials (extended) | matDownload backendRequired | `/student/library` slice |
| `student-progress.html` | overall gauge · per-course progress · attendance trio · achievements wall · celebration | STUDENT_PREVIEW + students.js | — (display-only; no leaderboard/rank ever) | hours-gauge + net-new |
| `student-history.html` | full recent-sessions list (real outcome refs + authored) · per-session summary/homework/feedback | SESSION_OUTCOMES via refs | fullHistory gate RESOLVES here (planned card graduates to this page) | classes-summary/history |
| `student-profile.html` | account rows · family link context · preferences (display) | students/families fixtures | profile edit backendRequired | profile-edit concept (500 profile never cloned) |

## Family app — home + 7 internal pages (Spec 019)

| Page | Sections | Sources | Gates | Covers |
|---|---|---|---|---|
| `family-portal.html` (HOME, kept) | current 12 sections; slices + sanctioned links | as today | as today | F1/F2 overview |
| `family-children.html` | per-child full cards (progress, status, signals, notes, group/course) | students/groups fixtures + FAMILY_PREVIEW | — | F2 multi-child |
| `family-schedule.html` | today across children · week agenda child-tagged | SESSIONS_FULL + todayChildren + SCHEDULE_WEEK | cancel/reschedule request = backendRequired preview (no-replacement caution kept) | F3/F5 |
| `family-progress.html` | attendance trio · signals (real outcomes) · teacher notes (full list) · session history mirror | FAMILY_PREVIEW + SESSION_OUTCOMES | fullHistory gate resolves here | F6/F16 |
| `family-billing.html` | subscription rows per child (labels) · billing STATUS band (settled chip + reassurance) · plan label | families fixture (money fields SUPPRESSED) | billingGate backendRequired; **ZERO figures/currency — machine-asserted on every family page** | F7/F9 |
| `family-requests.html` | cancel/reschedule preview · teacher-feedback rubric lines · trial/add-child tiles · meetings (truthful empty) | 014 requests-hub content deepened | every submit backendRequired; meetingRequest planned-016→resolves here as preview + gate | F3/F8/F10/F11 |
| `family-materials.html` | child-grouped materials | FAMILY_PREVIEW.materials extended | matDownload backendRequired; voice/file upload = backendRequired note (F4 visible gate) | F12/F4 |
| `family-profile.html` | guardian account rows · children count · contact | families fixture | edit backendRequired | F13 |

## Teacher app — home + 6 internal pages (Spec 020) — PAY-FREE FOREVER

| Page | Sections | Sources | Gates | Covers |
|---|---|---|---|---|
| `teacher-portal.html` (HOME, kept) | current 14 sections; slices + sanctioned links | as today | as today | T1/T22 |
| `teacher-schedule.html` | full week day-groups · free-days truth · availability blocks preview | scheduleOfTeacher/SCHEDULE_WEEK | availabilityEdit backendRequired; live = backendRequired | T14 |
| `teacher-students.html` | full roster cards · per-student follow-up detail (real outcomes) · monthly-report status per student | studentsOfTeacher + outcomesOfTeacher | report send backendRequired | T8 + follow-up |
| `teacher-outcomes.html` | 5-step workflow (reference) · full recent-sessions history (real refs) · per-outcome detail cards | SESSION_OUTCOMES | outcomeSave + mark-absent + cancel/reschedule gates (T3/T4/T5) | T3/T4/T5/T20/T21/T22 |
| `teacher-tasks.html` | tasks full list · materials library course-grouped | TEACHER_PREVIEW extended | taskManage planned→resolves here as page + ops gate; matUpload backendRequired | T11/T15/T16-concept |
| `teacher-reports.html` | monthly rubric (5 dimensions, display-only) · per-student report-history preview · certificate request preview · the ONE performance link (kept sanctioned) | TEACHER_PREVIEW + students evaluation shapes | submits backendRequired | T9/T10/T11 |
| `teacher-profile.html` | account rows (status/availability chips; numerics NEVER) | teachers fixture | edit backendRequired | T23 (T24 500 never cloned) |
| — | **Excluded from this app forever**: T2/T17/T18/T19 pay surfaces, T6 fake live room, T12/T25/T26/T27 | — | — | stay admin-finance/backendRequired/excluded |

## Cross-app rules

Communications (chat/messages/notifications) are **not** role pages in 018–020: they remain backendRequired concepts with visible gates; the operations/communications shell idea (old "Spec 016" pointer in closing notes) is superseded by this roadmap — closing-note copy updates ride with each role-app spec. Every page above must appear in that spec's smoke branch (sections floor, gates tones, sanctioned-anchor registry, zero form controls, zero tables, 390px probe, pay/currency asserts per role).
