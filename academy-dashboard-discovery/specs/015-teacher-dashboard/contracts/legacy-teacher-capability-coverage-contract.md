# Contract: Legacy Teacher Capability Coverage (Spec 015)

**Status**: Binding · References FR-026, SC-010; the Spec-012 coverage artifact is the single source of truth; edits are a NEW §9 delivery-notes section ONLY.

## 1. §9 Spec-015 delivery notes (the ONLY sanctioned coverage edits)

Append to `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` a §9 mapping every teacher row — classifications, destinations, and §§1–8 text untouched:

| Row | Spec-015 disposition |
|---|---|
| **T1** home dashboard | **Delivered** — deep pay-free hero + today's schedule (student counts) + the follow-up board (the hours strip's calm successor; the pay hero excluded per T2) |
| **T2** salary hero | **UNCHANGED — backendRequired** (pay; never rendered; the hard rule) |
| **T3** end-class recording | **Delivered as display-only preview** — the 5-step workflow (attendance/remark/summary/homework/files); the real write stays gated (`outcomeSave` backendRequired) |
| **T4** mark-absent · **T5** cancel/reschedule | **Delivered as honest framing within the workflow gate** — no separate fake affordances; real writes stay backend |
| **T6** fake live room | **UNCHANGED — intentionally excluded** |
| **T7** real live classroom | **UNCHANGED — backendRequired** (the next-class note says so) |
| **T8** my-students roster | **Delivered** — the grp1 roster preview (display-only cards, group/course association, authored notes) |
| **T9** monthly report rubric | **Delivered as display-only preview** — the 5 dimensions; submit backendRequired |
| **T10** certificate request | **Delivered as display-only preview** — description/date concept; submit backendRequired |
| **T11** monthly learning plans | **Delivered folded** — into the tasks preview (prepare-report task) + the rubric's plan framing; no separate surface |
| **T12** duplicate roster · **T16** empty tickets shell | **UNCHANGED — intentionally excluded** (the honest tasks preview supersedes T16's empty shell) |
| **T13** chat/messaging | **UNCHANGED — backendRequired**; surfaced destination refined to **planned-016** (the Communications shell); never rendered as a control |
| **T14** timetable + availability | **Delivered** — day-grouped agenda + truthful free-days state; slot editing backendRequired (`availabilityEdit`) |
| **T15** materials library | **Delivered** — display-only preview; upload/download backendRequired (`matUpload`) |
| **T17/T18/T19** salary ledger / class report / pay matrix | **UNCHANGED — backendRequired** (pay; never rendered) |
| **T20/T21** session/course history | **Delivered folded** — the follow-up board + workflow preview carry the per-session record concept; a dedicated history surface stays future-role-deep |
| **T22** outcome-workflow preview | **Delivered deepened** — 4 steps → the 5-field capture-verified shape |
| **T23** profile/account edit | **Delivered as the account slice** — display-only rows; editing backendRequired |
| **T24** `/profile` 500 · **T25** Dashboard-1 404s · **T26** admin page via pay link · **T27** dual-badge bug | **UNCHANGED — intentionally excluded** |

**Spec-015 sign-off block**: all 27 rows dispositioned · pay rows (T2/T17/T18/T19) untouched-backendRequired with zero rendering · real writes (end-class/absent/reschedule/certificate/report/availability/profile) all gated · zero silent gaps.

## 2. No silent gaps

Every T-row accounted for; §§1–8 byte-unchanged; no student/family row touched; planned-013/014 items stay under §§7–8.

## Acceptance (binding)

1. **Given** the coverage diff, **Then** it is exactly the appended §9 (+ sign-off); §§1–8 byte-unchanged.
2. **Given** §9, **Then** all 27 T-rows have an explicit disposition and the four pay rows remain backendRequired.
