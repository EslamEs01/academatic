# Data Model — Spec 026

All data is **static authored fixtures** — no backend, no computed values, no persistence, no pay/salary figures. New fixtures extend the existing admin fixture set; nothing is derived at runtime.

## New page fixtures

### 1. Sessions Analysis (`fixtures/sessions-analysis.js` or fold into an existing ops fixture)
Grounded in `management-sessions-analysis.md`. Display-only counts (authored small integers), never computed.
- **OutcomeStat**: `{ key, labelKey, count, durationLabel }` for regular classes (Total · Student-cancel · Teacher-cancel · Admin-cancel · Attended · Student-absent · Teacher-absent · Pending · Rescheduled · Make-up · Returned-today) and a parallel trial set. `count`/`durationLabel` are authored strings/ints. **No score/rank/percentile/chart.**
- **HelperTile**: `{ key, labelKey, value }` (Last session · Current hour · Waiting · Running).
- **AnalysisFilter** (optional, only if wired static): `{ facet, options[] }` for date/teacher/type via `data-filter`.

### 2. Public Holiday (`fixtures/public-holiday.js`)
Grounded in `management-public-holiday.md`.
- **HolidayWindow**: `{ id, fromLabel, toLabel, scopeLabel, categoriesLabel, teachersLabel, statusKey }` — authored windows (display-only).
- Gate metadata: `setHoliday`/`bulkAbsence` = `{ availability:'backendRequired', reasonKey }`.

### 3. Scheduled Actions (`fixtures/scheduled-actions.js`)
Grounded in `management-scheduled-actions.md`(+create).
- **ScheduledAction**: `{ id, typeKey (stopFamily|stopStudent|cancelClasses|activateFamily|activateStudent), targetLabel, scheduledDateLabel, returnedAtLabel, noteKey, statusKey }` — authored rows.
- Gate metadata: `createAction`/automation = `{ availability:'backendRequired'|'future-backend', reasonKey }`.

### 4. Folds (extend existing fixtures)
- **QueueItem** (into sessions ops band): `{ id, levelKey (urgent|medium|normal), textKey, classRef, statusKey, addedByLabel, createdAtLabel }` — authored. Add-queue = gate.
- **ScheduleRequest** (into schedule inbox band): `{ id, studentLabel, parentLabel, courseLabel, dateLabel, timeLabel, durationLabel, statusKey }` — authored. Accept/Reject = gate (no invented form fields).

## Create/Edit modal field templates (baked `<template>`)
For reclassified Create/Edit primaries — display-only field scaffolds rendered inside `openModal()`; **never** submit/persist.
- **CreateFieldSet**: `{ entity (session|student|teacher|course|group|family-child), fields: [{ labelKey, type (text|select|date|time), optionsKey? }], finalGate: { availability:'backendRequired', reasonKey } }`.
- Fields are display-only (no validation, no persistence) — the modal shows the create UI honestly; the final Save is a gate.

## Gate metadata (reused shape)
- **Gate**: `{ availability: 'backendRequired' | 'planned' | 'future-backend' | 'permission-locked', labelKey, reasonKey }` — mirrors the existing `data-disabled-reason`/`data-coming-soon`/portal gate metadata. No new shape, no new hook.

## Locale keys (AR + EN mirrored)
- Titles: `nav.sessionsAnalysis`, `nav.publicHoliday`, `nav.scheduledActions` (exist) + page `*.title/*.sub`.
- Page bodies: `sa.*` (sessions-analysis), `ph.*` (public-holiday), `sca.*` (scheduled-actions), plus fold keys `sess.queue.*`, `sched.req.*`.
- Reworded action copy: create/edit modal labels + `*.gate.*` backendRequired reasons; reworded confirm `*.confirm.*` (backend-required wording, no "saved/done").
- Constraints: no raw keys; **no pay tokens** in any teacher/family key; **no student-primary** wording; admin finance keys stay Spec-009-invariant (no salary/payroll).

## Explicitly NOT modeled (excluded-by-law / future-backend)
- No live-room/session-room state; no attendance-write/outcome-write state; no real queue/request mutation; no scheduler engine state; no chat messages; no notification counts; no pay/salary/invoice-payment figures; no computed average/score/chart. All are honest gates only.
