# Data Model — Spec 015 Teacher Dashboard

Documentation/build-time shapes only — **no DB, no API, no auth schema**. Every shape is an existing fixture reference (via the `teacher-links.js` graph) or a display-only authored literal in a NEW teacher block of `src/js/fixtures/portal.js`. No engine-shaped state, no derivations, **no pay/finance field, no computed score/rating** (the teacher fixture's numeric `rating`/`util` are display-suppressed by contract — labeled signals only).

## 1. TeacherDashboard
The composed page pair. `personaId: 'sara'` (existing fixture: math, active, balanced workload, strong-delivery signal — no pay field) · `sections[]` (ordered per research D1 + amendment A1, 14 entries) · AR RTL default / EN LTR.

## 2. TeacherHero
Teacher nameKey + authored today-summary line (`prt.tch.heroSummary` — classes today + follow-up count in words) + next-action hint. Pay-free by construction; no date, no notification count.

## 3. TeacherTodayClass
Existing `SESSIONS_FULL` sara rows (s2, s3): time, titleKey, roomKey, statusId → `statusChip`, **present/capacity** (existing authored fixture literals) rendered as an authored student count via `num()`.

## 4. TeacherNextClass
The later sara row + `prt.tch.nextPrep` (authored prepare hint) + the existing backendRequired live note (`prt.tch.nextNote` wording kept — "real joining requires the session integration").

## 5. TeacherFollowUpSignal
REAL outcome refs `TEACHER_PREVIEW.followUps = [{ outcomeId: 'out15', framingKey }, { outcomeId: 'out4', framingKey }]` resolved against `SESSION_OUTCOMES` (st11 studentAbsent+followUp w/ `data.att.fb.support` · st7 teacherAbsent+followUp/make-up), rendered with the real `outcomeChip` + gentle framing + a reassurance close key. No computed risk.

## 6. TeacherStudentCard
`studentsOfTeacher('sara')` roster (st1/st6/st11/st13): avatar/nameKey/levelKey refs + the group/course label + `familyStatusChip(statusId)` + an authored learning note (`data.prtTchStu*`). Display-only, no links.

## 7. TeacherOutcomeStep
The 5 ordered display-only steps (attendance · remark · summary · homework note · files note — the capture-verified `classes-end` field order), each `{ n, titleKey, descKey }` rendered as the existing flowStep card pattern. The write boundary = the `outcomeSave` mini-card.

## 7b. TeacherHistoryCard (amendment A1 — T20/T21 explicit)
`TEACHER_PREVIEW.history = [{ outcomeId: 'out1', homeworkKey }, { outcomeId: 'out11', summaryKey, homeworkKey }]` — exactly 2 REAL sara outcome refs resolved against `SESSION_OUTCOMES`, rendered child-first with the real `outcomeChip`, the existing `dateKey` day label, the real `feedbackKey` line where the fixture carries one, and authored summary/homework-note lines (`data.prtTchHist*`). Display-only; no route, no modal, no anchor. Amendment A2 rides alongside: the two gated T4/T5 notes (`prt.tch.absentGate` in the workflow section · `prt.tch.cancelGate` in requests & performance) — non-anchor `.pt-note`s with the labeled backendRequired chip.

## 8. TeacherTaskPreview
`TEACHER_PREVIEW.tasks[3]`: `{ id, titleKey, subKey (course/child association), dueKey (authored label) }` — display-only cards (prepare worksheet · review homework · prepare monthly report).

## 9. TeacherMaterialPreview
`TEACHER_PREVIEW.materials[3]`: `{ id, titleKey, courseId, typeIcon (file-text|play|materials) }` — display-only cards; upload/download = the `matUpload` backendRequired mini-card.

## 10. TeacherAvailabilityPreview
`scheduleOfTeacher('sara')` day-grouped blocks (SAT b14 · MON b4 · TUE b6): start–end, titleKey, roomKey, statusId chips — agenda cards (013 `.pt-day` pattern) + the merged truthful free-days `.pt-empty` (WED/THU) + the `availabilityEdit` backendRequired mini-card.

## 11. TeacherReportRubricPreview
The five rubric dimension keys (achievements · learning progress · focus · homework completion · punctuality) as display-only question-lines (the 014 `.pt-lines` pattern) + an inline backendRequired chip. NO answer scales, NO rating visual.

## 12. TeacherRequestPreview
The certificate-request concept (`prt.tch.cert*`: routed-to-management framing + description/date concept lines) display-only + inline backendRequired chip. Shares the "Requests & performance" section with the sanctioned performance link card.

## 13. TeacherProfileSlice
Display-only rows from the teacher fixture: name · subject (`subjectsKeys[0]`) · labeled teacher-status chip · labeled availability chip (`TEACHER_AVAIL`) + the backendRequired editing note. The `rating`/`util`/`hours`/`sessions` numerics are NOT rendered.

## 14. TeacherCapabilityClassification
The §9 delivery-notes edits to `legacy-role-capability-coverage.md`: T1 (minus pay hero)/T3-preview/T4-preview/T5-preview/T8/T9-preview/T10-preview/T11-folded/T14/T15/T20-21-slice/T22/T23-slice → delivered-015 dispositions; **T2/T17/T18/T19 stay backendRequired (pay — never rendered)**; T7 backendRequired; T13 chat → backendRequired/planned-016; T6/T12/T16/T24/T25/T26/T27 stay excluded. No row reclassified.

## 15. TeacherAcceptanceFrame
One screenshot-matrix row (page/lang/theme/viewport/area + verdict) — 14+ frames per research D15.

## PORTAL_PLANNED.teacher (re-registered)
`{ outcomeSave: backendRequired, matUpload: backendRequired, availabilityEdit: backendRequired, taskManage: planned }` — count 2 → **4** (smoke D13 asserts 3 amber + 1 neutral); student/family registers untouched.

## Validation rules
- Every `*Key` resolves in BOTH `ar.prt.js` and `en.prt.js` (key-mirrored); zero raw keys in built output.
- Every `outcomeId`/`studentId`/`courseId`/schedule-block/persona ref resolves against existing fixtures at build time.
- **The pay hard rule**: no shape may carry or render a pay/currency/compensation token or figure — copy AND comments (the standing word-bounded EN+AR grep over sources + built files); no route to any pay surface.
- **No computed score**: `rating`/`util` never rendered; signals are labeled chips from real rows or authored flags.
- Shared locale namespaces (`prt.shell/portal/role/hub`), sibling namespaces (`prt.stu.*`, `prt.fam.*`), and `data.prtStu*`/`data.prtFam*`/`data.prtNote1/2` are read-only to this spec.
- The page body contributes EXACTLY ONE anchor: the labeled teacher-performance admin link (exact-target smoke assert).
