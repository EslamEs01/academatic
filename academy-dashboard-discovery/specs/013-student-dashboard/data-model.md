# Data Model — Spec 013 Student Dashboard

Documentation/build-time shapes only — **no DB, no API, no auth schema**. Everything below is either an existing fixture reference or a display-only authored literal living in the student block of `src/js/fixtures/portal.js`. No engine-shaped state, no derivations (the one derived-looking value — the celebration section — is authored prose, not computation).

## 1. StudentDashboard
The composed page pair. Fields: `personaId: 'st1'` (existing student fixture: nameKey, levelKey, progress 78, familyId fam1, groupIds [grp1], subject math) · `sections[]` (ordered per research D1, 13 entries) · language pair (AR default RTL / EN LTR). Persona binding is frozen — continuity with Spec 012.

## 2. StudentTodaySession
Existing `SESSIONS_FULL` rows filtered by the established grp1 proxy (`trainer.id === 'sara'`). Used fields: `time`, `titleKey`, `levelKey`, `trainer.nameKey`, `roomKey`, `statusId` (labeled chip via existing status maps). No new fields.

## 3. StudentNextAction
The hero hint + next-session affordance. Shape: `{ hintKey, joinNote: { textKey, availability: 'backendRequired' } }` — the join affordance is a note/mini-card, never a button-styled control (honesty contract §2).

## 4. StudentCourseCard
Existing `STUDENT_PREVIEW.courses` entries (`courseId → COURSE_BY_ID` ref, titleKey, subjectIcon, authored `pct`, levelKey) **extended** with `nextStepKey` (authored one-line "what's next" microcopy). Display-only; **no href** (research D7).

## 5. StudentHomeworkPreview
NEW authored register `STUDENT_PREVIEW.homework[3]`: `{ id, titleKey, courseId, dueKey (authored label — never a computed date), stateKey (display-only, e.g. "new"/"in progress") }`. Rendered as cards; the submit affordance is NOT on items — it is the section's backendRequired mini-card.

## 6. StudentMaterialPreview
NEW authored register `STUDENT_PREVIEW.materials[3]`: `{ id, titleKey, courseId, typeIcon ('file-text'|'play'|'materials') }`. Display-only cards; download = the section's backendRequired mini-card.

## 7. StudentProgressMetric
Authored literals only: `overallProgress: 78` (existing) · per-course `pct` (existing 78/41) · NEW `STUDENT_PREVIEW.attendance = { attended: 9, upcoming: 2, streakDays: 5 }` (the motivational trio, research D8). All rendered with `num()` (Arabic-Indic on AR).

## 8. StudentAchievement
Existing `STUDENT_PREVIEW.achievements[3]` (icon/titleKey/descKey) kept, presented in the deepened band with the net-new framing key. No points economy, no history fabrication.

## 9. StudentLeaderboardPreview → celebration register
NEW `STUDENT_PREVIEW.celebration[3]`: `{ id, icon, titleKey, descKey }` — **unordered group wins** («نجوم مجموعتي»), authored prose about st1's group month; carries the section-level authored/demo label. No rank, no points, no per-peer standings (research D3).

## 10. StudentHistoryFeedback
NEW `STUDENT_PREVIEW.history[3]`: first entry is a **reference** `{ outcomeId: 'out1' }` resolved against the real `SESSION_OUTCOMES` row (st1 · math · sara · attended · `data.att.fb.good`); two authored entries `{ id, courseId, teacherKey, dayKey, summaryKey, homeworkKey, hasAttachment? }` — the capture-verified F6 field pair (Class Summary · Homework Note). Attachment = display-only annotation, no link.

## 11. StudentDashboardAction
Every interactive element classed exactly one of: `real-link` (shell hub switch only) · `demo-toast` (none planned) · `disabled-planned` (the three `.pt-planned` mini-cards: submit-hw backendRequired · download-mat backendRequired · full-history planned — re-registered `PORTAL_PLANNED.student`) · `display-only` (everything else). The classing is asserted by smoke (planned count/labels) and the honesty contract.

## 12. StudentCapabilityClassification
The delivery-note edits to `legacy-role-capability-coverage.md`: F5 → "delivered by Spec 013 (week-at-a-glance agenda)" · F6 → "delivered by Spec 013 (recent-sessions feedback cards; full history remains planned)" · F12 → "delivered by Spec 013 (materials display-only preview; download backendRequired)" · §4 leaderboard item → "delivered as celebration recognition (unordered, authored)". Scheme unchanged; no other row touched.

## 13. StudentAcceptanceFrame
One row of the Spec-013 screenshot matrix: `{ page, lang, theme, viewport, area? (element-scoped), verdict }` — 12+ frames per research D11, verdicts recorded in `screenshots/REVIEW.md`.

## Empty-state pattern (supporting shape)
`.pt-empty` block: `{ icon, titleKey, subKey? }` — used truthfully by the Friday rest-day entry in the week view (research D5); reusable by any future truthfully-empty list.

## Validation rules (bind the shapes)
- Every `*Key` resolves in BOTH `ar.prt.js` and `en.prt.js` (key-mirrored); zero raw keys in built output.
- Every `courseId`/`outcomeId`/persona ref resolves against existing fixtures at build time.
- No shape may carry pay-adjacent, price, or notification-count fields.
- Shared locale namespaces (`prt.shell/portal/role/hub`, `prt.fam.*`, `prt.tch.*`, `data.prtNote*`) are read-only to this spec.
