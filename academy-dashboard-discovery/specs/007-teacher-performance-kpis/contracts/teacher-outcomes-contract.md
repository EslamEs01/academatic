# Contract: Teacher Outcomes & Absence Linkage (reuse Spec 005)

**Status**: Binding · The teacher profile **Sessions & Outcomes** tab (and the board's absence counts) reuse the Spec 005 `outcomeRow` + the **canonical** `outcomeTemplate` drawer (the teacher's outcomes resolved by `trainer.id` via the NEW `outcomesOfTeacher(id)`), with **teacherAbsent vs studentAbsent unmistakably distinct** + an `attendance.html` deep-link. **No new outcome builder, no attendance mutation.** References FR-007 / FR-018; SC-009; data-model §11.

---

## 1. Purpose & reuse

Show the teacher's recent session outcomes (completed/attended, **teacher absences**, **student absences under this teacher**, cancelled/rescheduled) inside the profile without rebuilding any outcome surface. The tab renders the Spec 005 **`outcomeRow`** via the Spec 006 **`cohortOutcomesPanel`** + **`cohortTemplates`**, and opens the **same canonical `outcomeTemplate` drawer**. No bespoke drawer.

## 2. Data source (binding) — the NEW resolver

`outcomesOfTeacher(teacherId) = SESSION_OUTCOMES.rows.filter(r => r.trainer.id === teacherId)` — added to `fixtures/attendance.js` beside `outcomesOfStudent`/`outcomesOfFamily` (the only new resolver in Spec 007). The per-teacher **count breakdown** derives from it: `completedCount` (`attended`), `teacherAbsentCount` (`teacherAbsent`), `studentAbsentCount` (`studentAbsent`), `cancelledCount` (`cancelled`+`rescheduled`). Display-only; no fabricated number.

## 3. Anatomy (RTL, top → bottom)

A panel header + a **"View attendance"** deep-link → `attendance.html` (language-aware `attendance.en.html`) + the `outcomeRow` list (resolved from `outcomesOfTeacher(id)`), each row carrying the session date/time · title · the **outcome-status chip** (`outcomeChip(outcomeId)`; icon+text, from `outcome-status.js`, never color-only) · attribution + `data-drawer="<outcomeId>"` (or `data-row-menu`).

## 4. teacherAbsent vs studentAbsent (binding distinction)

Rows whose `outcomeId === 'teacherAbsent'` and rows whose `outcomeId === 'studentAbsent'` MUST render with their **two distinct** Spec 005 chips (distinct tone AND label) and MUST NEVER be conflated into a single "absences" row or count. The same distinction carries into the Overview absence summary (§5 of the profile contract) and the board KPI tiles/comparison counts.

## 5. The canonical outcome drawer (reused unchanged)

Each row opens the **identical** Spec 005 `outcomeTemplate` drawer (`outcome-details.js`) via `data-drawer="<outcomeId>"` over a baked `<template data-preview="<outcomeId>">` (emitted by `cohortTemplates`). The drawer shows the Spec 005 layout — Status chip + Outcome chip + present/capacity (only for occurred outcomes) + attribution (who-absent / who-cancelled) + make-up/credit hint + follow-up + the gated demo-action cluster. **No bespoke teacher drawer is introduced** (SC-009).

## 6. Deep-link (binding)

The "View attendance" link MUST navigate to `attendance.html` — a real `<a href>`, never dead.

## 7. Empty state

A teacher with **zero outcomes** (e.g. `huda`) → a calm "no outcomes yet" hint (the `cohortOutcomesPanel` empty key), with zeroed counts — never a blank region or a misleading metric.

## 8. MUST NOT

No new outcome row/drawer/builder; no attendance/outcome mutation (no mark-attend/absent/cancel/reschedule SAVE, no `absent_by` write); no import of the legacy 11-state numeric lifecycle as an engine; no salary/fine derived from absence; no computed "delivery score".

## 9. `data-*` hooks (reuse only)

Per outcome row `data-row` + `data-outcome`/`data-teacher`/`data-attention` (lowercased by `facetAttrs`); `data-drawer="<outcomeId>"`/`data-preview="<outcomeId>"`/`data-sheet-close`; the gated action cluster hooks (`data-demo-action`/`data-confirm`/`data-disabled-reason`/`data-toast`). The deep-link is a real `<a href>`. No new hook.

## 10. States / responsive / a11y

Rows stack on mobile; the drawer is full-height on mobile; teacherAbsent/studentAbsent chips legible in RTL/LTR + dark (icon+text, never color-only); axe critical = 0; keyboard reaches each row + the drawer.

## 11. Static-HTML-first & Django

The outcome rows + every `<template data-preview>` baked. **Django**: `{% for outcome in teacher.outcomes %}` + the shared `_outcome_details.html` include; `{{ outcome.outcomeId|outcome_chip }}`; the deep-link → `{% url 'attendance' %}`.

## 12. Enforcement & cross-references

- **Smoke**: the teacher Sessions & Outcomes tab contains `.outcome-row` elements + `data-drawer` links + a real `<a href>` to `attendance.html`; **both a teacherAbsent and a studentAbsent row are present and render with distinct chips** (lowercased `data-outcome="teacherabsent"` vs `data-outcome="studentabsent"`); opening a row opens the **canonical** outcome drawer (`.drawer.sheet` with the Outcome section); `outcomesOfTeacher` returns only `trainer.id`-matching rows; **no bespoke drawer, no attendance mutation, no computed score**; zero-outcome teachers show the empty hint.
- **Screenshots**: frame #7 (`teacher__ar__light__desktop__outcomes.png`).
- Binds to `teacher-profile-contract.md` (§9), `teacher-performance-contract.md` (the absence counts), the Spec 005 `../../005-attendance-session-outcomes/contracts/outcome-details-contract.md` + `outcome-status-contract.md` (the canonical drawer + the teacherAbsent/studentAbsent map), and the Spec 006 `cohort-panels` reuse. **MUST NOT** introduce a new outcome builder/drawer, mutate attendance, conflate the two absence types, or derive any finance/score from absence.

**Acceptance (binding):**
1. **Given** the Sessions & Outcomes tab, **When** rendered, **Then** the teacher's outcomes show with labeled chips, **teacherAbsent ≠ studentAbsent**, and a "View attendance" link opens `attendance.html`.
2. **Given** an outcome row, **When** opened, **Then** the SAME canonical Spec 005 outcome drawer opens (Status + Outcome + present/capacity + attribution) — no bespoke drawer.
3. **Given** a zero-outcome teacher, **When** rendered, **Then** a calm "no outcomes yet" hint + zeroed counts appear — never a broken metric.
