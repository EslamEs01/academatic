# Data Model — Spec 014 Family / Guardian Dashboard

Documentation/build-time shapes only — **no DB, no API, no auth schema**. Every shape is an existing fixture reference or a display-only authored literal in the family block of `src/js/fixtures/portal.js`. No engine-shaped state, no derivations, and **no money-like field is ever surfaced** (the family fixture's `hourRate`/`plan.perHour` exist but are display-suppressed by contract).

## 1. FamilyDashboard
The composed page pair. `personaId: 'fam1'` (existing fixture: guardian nameKey, 5 studentIds, premium category, plan label) · `sections[]` (ordered per research D1, 12 entries) · AR RTL default / EN LTR.

## 2. GuardianHero
Guardian nameKey + authored family-summary line (`prt.fam.heroSummary` — five children, levels range) + reassurance copy + plain-text next-action hint. No date, no notification count, no anchor.

## 3. FamilyChildCard
Existing student fixture refs per child (st1/st6/st11/st12/st13): `nameKey`, `levelKey`, `statusId` → `familyStatusChip`, authored `progress` literal → bar, `accent` → avatar. Deepened with a one-line per-child hint key (`data.prtFamKid*` — authored, e.g. today's subject or a gentle note). **No switcher control** (research D2).

## 4. FamilyTodaySession
Existing `SESSIONS_FULL` rows (the established sara/khalid family proxy) + a **childKey** association rendered on each card (authored mapping in `FAMILY_PREVIEW.todayChildren`: sessionId → studentId). Fields used: time, titleKey, trainer.nameKey, roomKey, statusId → `statusChip`.

## 5. FamilyProgressSignal
The signals band (research D9): (a) authored trio literals `FAMILY_PREVIEW.attendance = { attended: 12, upcoming: 3, followUp: 1 }` (foundation values kept, gentler labels); (b) **real outcome refs** `FAMILY_PREVIEW.signals = [{ outcomeId: 'out15', framingKey }, { outcomeId: 'out12', framingKey }]` resolved against `SESSION_OUTCOMES` (st11 studentAbsent + followUp · st13 cancelled/trial) rendered with the real `outcomeChip`; (c) a reassurance line key.

## 6. FamilyTeacherNote
Existing `FAMILY_PREVIEW.teacherNotes` (n1 st1/sara, n2 st6/khalid) + one NEW authored note (n3, st12 or st13 pairing) — child ref + teacher key + note key + day label. Display-only.

## 7. FamilyHistoryFeedback
`FAMILY_PREVIEW.history[3]` (research D7): `{ outcomeId: 'out1' }` + `{ outcomeId: 'out15' }` (REAL rows — child/course/teacher/outcome/feedback resolved from `SESSION_OUTCOMES`) + 1 authored record `{ childId: 'st6', courseId: 'c6'?, teacherKey: 'data.t.khalid', dayKey, summaryKey, homeworkKey }`. Card shape: **child-first** title + course/teacher + day + summary line + homework-note line + outcome chip where real.

## 8. FamilySubscriptionPreview
Per-child rows: child nameKey + the family plan label (`data.fam.fam1.plan` «الخطة المتقدمة» — amount-free) + per-child `familyStatusChip` (active/trial). **NO amount, NO renewal control, NO `plan.perHour`/`hourRate` reference.**

## 9. FamilyBillingPreview
ONE authored status card: settled chip (authored literal state, tone-completed) + reassurance line. The gate = `.pt-planned` mini-card `billingGate` **backendRequired** («الفواتير والدفع» — viewing/paying requires the billing backend). **ZERO currency figures.**

## 10. FamilyRequestAction
The requests-hub preview cards (research D4/D5/D6/D10), each `{ id, icon, titleKey, bodyKeys[], availability }` with an INLINE `availabilityChip`: `cancelResched` (backendRequired; carries the no-replacement caution note) · `teacherFeedback` (backendRequired) · `meetings` (planned; renders the truthful `.pt-empty`) · `trialRequest` (backendRequired). These are preview cards WITH chips — NOT `.pt-planned` mini-cards (they carry real display content).

## 11. FamilyFeedbackPreview
The rubric dimensions as display-only question-line keys (see/hear clarity · likes · improvements · optional comment — gentle rewordings of the captured fields; no rating-scale visual, no score vocabulary).

## 12. FamilyTrialRequestPreview
Two display-only path tiles: new-child (name/age/language/gender concept line) · existing-child (choose-from-my-children concept line).

## 13. FamilyMaterialPreview
`FAMILY_PREVIEW.materials[3]`: `{ id, titleKey, childId, typeIcon }` display-only + the `matDownload` **backendRequired** mini-card. No links.

## 14. FamilyProfileSlice
Guardian rows from the existing family fixture: name, email (`data.fam.fam1.email`), city, joined, children count — display-only + backendRequired editing note. (Phone/WhatsApp keys exist but are shared placeholders; plan cost fields excluded.)

## 15. FamilyCapabilityClassification
The §8 delivery-notes edits to `legacy-role-capability-coverage.md`: F1/F2/F3(preview)/F5(family slice)/F6(guardian mirror)/F7/F8(preview)/F9(status)/F10/F11(preview)/F12(family slice)/F13(slice)/F16(deepened) → delivered-014 dispositions; F4 upload stays backendRequired; real submissions → planned-016; F14/F15/F17 stay excluded. No row reclassified.

## 16. FamilyAcceptanceFrame
One screenshot-matrix row (page/lang/theme/viewport/area + verdict) — 14+ frames per research D13.

## PORTAL_PLANNED.family (re-registered)
`{ billingGate: backendRequired, matDownload: backendRequired, fullHistory: planned, meetingRequest: planned }` — count 3 → **4**; student/teacher registers untouched (smoke D11 asserts 2 amber + 2 neutral chips).

## Validation rules
- Every `*Key` resolves in BOTH `ar.prt.js` and `en.prt.js` (key-mirrored); zero raw keys in built output.
- Every `outcomeId`/`studentId`/`courseId`/persona ref resolves against existing fixtures at build time.
- **Zero-pay rule**: no shape may carry or render an amount, price, rate, or currency token; the D11 smoke regex polices the built body.
- Shared locale namespaces (`prt.shell/portal/role/hub`), sibling namespaces (`prt.stu.*`, `prt.tch.*`), `data.prtStu*`, and `data.prtNote1/2` are read-only to this spec (`prt.fam.*` updates are family-owned, incl. the D2 kidsHint copy resolution).
