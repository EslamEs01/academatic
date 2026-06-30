# Contract: Outcome Details Drawer

**Status**: Binding · the ONE canonical session-outcome drawer — `components/outcome-details.js` → `outcomeTemplate(item)`. A **superset** of the Spec 003 `appointmentTemplate` (`appointment-details.js`): the SAME baked session field-rows **plus** an outcome section **plus** a status-gated action cluster. Opened by the **existing** `data-drawer="<id>"` → `openSheet(id)` engine (`enhance.js`) over a baked `<template data-preview="<id>">` (`preview-drawer.js`). Fixtures only — no persistence, no real join, no mutation. Used by `attendance.html` + `sessions.html`; the action rules live in `outcome-actions-contract.md`.

## 1. Purpose & single-canonical-surface rule (D3/R35)

- This contract defines the ONE outcome-details surface for Spec 005. A single builder (`outcomeTemplate(item)`) SHALL produce the content for **every** recorded-outcome item.
- The **Attendance** list rows and the **Sessions** rows MUST open the SAME drawer with the SAME field layout, the SAME outcome section, and the SAME action set (data-model *OutcomeDetails*, R35).
- It realizes the reference's one-session-action-family idea as ONE drawer (no per-page modal duplication) and REPLACES any bespoke per-page outcome modal.
- It MUST NOT introduce a new drawer engine and MUST NOT introduce a per-surface bespoke drawer (the legacy 20×-duplication weakness is forbidden).
- Every user-facing string MUST be an i18n key resolved at build time.
- The scheduling status resolves through the Spec 001/003 session map via `statusChip(statusId)`; the review outcome resolves through the NEW labeled OUTCOME map via `outcomeChip(outcomeId)` (`outcome-status-contract.md`) — both **icon + label, never numeric or color-only**.

## 2. Reuse the existing drawer engine ONLY (binding — no new engine)

- The drawer MUST be opened via the established path: a trigger carrying `data-drawer="<id>"` → the delegated click branch in `enhance.js` calls `openSheet(id, trigger)`.
- `openSheet` clones the matching `<template data-preview="<id>">` into the transient `.drawer.sheet` and provides scrim, focus-trap, **Esc**, scrim-click, `data-sheet-close`, and return-focus. Spec 005 adds **no** new opening mechanism, **no** new sheet, **no** new keyboard handler.
- Each item's content MUST be a BAKED hidden `<template data-preview="<id>">` pre-rendered into the static page at build time — one per outcome row.
- Runtime JS builds NO page DOM; it only clones the baked template. With JS off, the trigger and the baked content still exist (graceful degradation).
- `outcomeTemplate(item)` MUST return through `previewTemplate(i.id, { title, headIcon, tone, bodyHTML })` (`preview-drawer.js`) — the SAME sheet shell `appointmentTemplate` uses — with `title = t(i.titleKey)`, a calm `headIcon` (e.g. `schedule`/`clipboard-check`), `tone:'primary'`.
- It MUST build its field-rows with the shared `sheetRow(label, value)` helper. No bespoke sheet chrome, no second sheet card.

## 3. Superset of `appointmentTemplate` via a shared `appointmentRows(item)` helper (R35)

- To avoid duplicating the appointment field-rows, the shared session rows currently inlined in `appointmentTemplate(item)` MUST be factored into a small reusable **`appointmentRows(item)`** helper (string-returning, Node-safe, every field guarded), **imported by BOTH** `appointment-details.js` and `outcome-details.js`.
- After the refactor: `appointmentTemplate` = `previewTemplate(id, { …, bodyHTML: appointmentRows(item) + appointmentActions(item) })`; `outcomeTemplate` = `previewTemplate(id, { …, bodyHTML: appointmentRows(item) + outcomeSection(item) + gatedActions(item) })`.
- `appointmentRows(item)` MUST render exactly the existing rows in the existing order (Status chip → date → time → duration → teacher → students(present/capacity) → family → subject → room → notes → optional attention) so the Schedule/Timetable drawer is byte-for-byte unchanged.
- The ONLY backward-compatible change permitted in the shared helper: the **family** row renders a real `<a href>` when `item.familyHref` is present, else the existing plain `t(item.familyKey)` text. Schedule passes no `familyHref`; the outcome fixture sets it (§6).
- `outcomeTemplate` MUST NOT re-implement any shared row; it MUST compose `appointmentRows(item)` then append the outcome section + actions. No row is duplicated between the two builders.

## 4. Anatomy & exact field order (RTL, top → bottom, binding)

The outcome drawer body MUST render, in this order:

**A. Shared session field-rows** — `appointmentRows(item)`:
1. **Status** chip (scheduling) — `statusChip(i.statusId)` at the top (the Spec 001/003 map), the scheduling **Status** (§5).
2. **Date** — `sheetRow(t('appt.date'), t(i.dateKey))`.
3. **Time** — `sheetRow(t('appt.time'), <span class="tabular">…)` (`start–end` or `time`).
4. **Duration** — `sheetRow(t('appt.duration'), t('sessions.duration', { n }))`.
5. **Teacher** — `sheetRow(t('appt.teacher'), t(i.trainer.nameKey))`.
6. **Students** — `sheetRow(t('appt.students'), present / capacity)` (the attendance count summary, tabular).
7. **Family** context row — `sheetRow(t('appt.family'), <a href>)` (§6).
8. **Subject** — `sheetRow(t('appt.subject'), …)`; **Room** — `sheetRow(t('appt.room'), …)`.
9. **Notes** — `sheetRow(t('appt.notes'), …)`; optional **attention** — `sheetRow('', attentionFlag(i.attention))`.

**B. Outcome section** — `outcomeSection(item)` (§7), only when a recorded outcome exists (§9):
10. **Outcome** chip (review) — `outcomeChip(i.outcomeId)` under an emphasized **Outcome** sub-label (§5).
11. **Attribution** line — who-absent / who-cancelled (§7).
12. **Attendance summary** recap — present/capacity restated as the outcome attendance.
13. **Student** row — `sheetRow(t('att.student'), <a href>)` (§6, the named student profile link).
14. **Make-up / credit** display hint (§7) and **follow-up** hint (§7).
15. **Feedback** note — `sheetRow(t('att.feedback'), t(i.feedbackKey))` when present.

**C. Action cluster** — `gatedActions(item)` (§8, ruled by `outcome-actions-contract.md`).

- Section A MUST always render; each row of B renders only when its fixture field is present (absent fields produce no empty row).
- Long titles, teacher/student/family names, and room labels MUST truncate/wrap gracefully in AR-RTL and EN-LTR; the layout mirrors via logical properties; numbers/times use tabular numerals and are never mirrored.

## 5. Status vs Outcome — both labeled, no double-encoding (R34, binding)

- The drawer MUST show BOTH a scheduling **Status** (row 1, `statusChip`) and a review **Outcome** (row 10, `outcomeChip`), each carrying its own visible text label, with the **Outcome emphasized** (the page is about outcomes).
- It MUST NOT merge them into one code and MUST NOT show two unlabeled chips that re-encode the same fact (the legacy 11-state confusion R34 forbids).
- The outcome vocabulary is the THIRD map (`upcoming/live/attended/studentAbsent/teacherAbsent/cancelled/rescheduled` + the `makeUpSuggested`/`needsFollowUp` flags), distinct from the session status map (`live/upcoming/completed/cancelled`) and the Spec 004 lifecycle map.
- Neither chip is ever numeric or color-only; both are AA-contrast, AR/EN.

## 6. Student / family rows as real `<a href>` (language-aware, binding)

- The **family** context row (row 7) MUST be a real `<a href="family.html">` (`family.en.html` on EN) resolved from `item.familyId` → the Spec 004 `Family`, when `item.familyHref` is set.
- The **student** row (row 13) MUST be a real `<a href="student.html">` (`student.en.html` on EN) resolved from `item.studentId` → the Spec 004 `Student`.
- Both hrefs are baked at build time (language-aware); they are NOT runtime-generated; there is NO `href="#"` and NO dead link (FR-009).
- The teacher remains a label (an optional teachers-directory link is out of scope). These links keep the family↔student↔outcome spine intact so follow-up lands on the correct profiles.

## 7. The outcome section fields (binding)

- **Outcome chip** — `outcomeChip(i.outcomeId)`, the primary, emphasized signal of the section.
- **Attribution line** — from `item.attribution` (data-model *OutcomeAttribution*): `absentBy` (student/teacher) drives the `studentAbsent` vs `teacherAbsent` distinction; `cancelBy` (teacher/student/admin) renders the human attribution line ("Student absent" / "Cancelled by the teacher").
- The legacy three cancel reasons collapse to ONE `cancelled` status + this drawer attribute (R33/R34); the two absent parties stay distinct statuses. Rendered icon + label; never color-only.
- **Make-up / credit hint** — from `item.makeup` (data-model *MakeupCreditHint*: `none/auto/reschedule/credit`), a calm **display-only** line ("make-up suggested" / "added to credit (demo)").
- The hint is display ONLY — the real add-to-credit control is **disabled-with-reason** in the action cluster (R37, `outcome-actions-contract.md`). No balance, no finance math, never implies a real balance.
- **Follow-up hint** — from `item.followUp` (data-model *OutcomeFollowUp*), the needs-attention reason (icon + label), consistent with the row's attention facet and the `needsFollowUp` flag.
- **Feedback note** — `item.feedbackKey` as a calm read-only line; absent → no row.
- New i18n keys live in the `att.*` / `outcome.*` namespace (e.g. `att.student`, `att.outcome`, `att.attribution`, `att.makeup`, `att.followUp`, `att.feedback`) — resolved per language at build time; **no raw key** ever renders.

## 8. Action cluster (deferred — binding boundary)

- The drawer appends a **status-gated, demo-only action cluster** (`gatedActions(item)`) whose exact action set, `kind` (demo / confirm→demo / disabled-with-reason), per-`outcomeId` gating, hooks, and no-real-mutation rules are defined by **`outcome-actions-contract.md`** and are NOT restated here.
- This contract binds only that the cluster (a) is rendered inside this drawer (and mirrored by the row `data-row-menu`), (b) reuses the existing four action hooks, and (c) writes no state.

## 9. Degradation to the plain appointment view (binding)

- When `item.outcomeId` is absent, or resolves to a not-yet-held state (`upcoming`/`live`) with **no** recorded attribution / makeup / followUp / feedback, the outcome section (B) MUST be omitted.
- In that case the drawer degrades to the plain appointment view — `appointmentRows(item)` + the state-appropriate gated actions — still produced by the SAME `outcomeTemplate` builder (one canonical surface, never a fork).
- This guarantees a session with no recorded outcome opens identically to the Schedule appointment drawer, satisfying "one consistent drawer pattern, no bespoke per-page drawers."

### 9.1 No real persistence / no real join (binding)

- The drawer is fixtures-only. NO field is editable; NO row reflects a live value; the `present`/`capacity` summary, the chips, and the hints are baked display data.
- NO action in the cluster writes state, sends a real notification, or reaches a real Zoom/live/finance integration (the action rules are in `outcome-actions-contract.md`; this contract only hosts them).
- The student/family/"view in schedule" links navigate to real in-scope pages; they MUST NOT navigate to a real backend resource or an API.

### 9.2 Reused atoms (no new component beyond `outcome-details.js` + the shared helper)

- Reuses `previewTemplate` / `sheetRow` (`preview-drawer.js`), `statusChip` (`status-chip.js`), `attentionFlag` (`attention-flag.js`), `icon` (`icons.js`), `t` / `num` (`i18n.js`), and the `confirmAction` / toast / disabled-with-reason behaviors.
- The ONLY new shared pieces are `outcome-details.js` (`outcomeTemplate` + `outcomeSection` + `gatedActions`), the extracted `appointmentRows(item)` helper, and `outcomeChip` (`outcome-status-contract.md`). No chart/table/form/calendar library; no second drawer engine.

## 10. Where it is used (binding placement)

- **Attendance page** (`attendance.html`) — every outcome row opens `outcomeTemplate` (PRIMARY surface).
- **Sessions page** (`sessions.html`) — rows with a recorded outcome open `outcomeTemplate` (the secondary outcome chip + this drawer, per `sessions-integration-contract.md` / R34).
- **Schedule / Timetable** (`schedule.html`) — KEEPS `appointmentTemplate` (pure scheduling); it MUST NOT switch to the outcome drawer.
- **Profiles** (`student.html` / `family.html`) — DEEP-LINK to Attendance/Schedule (no bespoke profile outcome drawer, R41).

## 11. `data-*` hooks (exact, reuse only — no invention)

- `data-drawer="<id>"` — the trigger on the row / the `data-row-menu` "view" item; opens the sheet for `<id>`.
- `data-preview="<id>"` — the baked `<template>` holding that item's outcome drawer content.
- `data-sheet-close` — the close control inside the sheet.
- The action cluster reuses `data-demo-action` / `data-confirm` (+ `-title|-msg|-cta|-toast|-danger`) / `data-disabled-reason` / `data-reason-key` / `data-toast` (ruled by `outcome-actions-contract.md`); `data-attention` marks the attention note.
- The student / family / "view in schedule" links are real `<a href>` (not hooks).
- **No JS-generated ids/classes; no hook beyond these; Spec 005 introduces NO new drawer hook.**

## 12. States, responsive, a11y

- The sheet MUST be focus-trapped while open; **Esc**, scrim-click, and `data-sheet-close` all close it and **return focus** to the originating row/menu (the existing `openSheet`/`closePanel` behavior).
- The sheet is labelled by its title heading and announced; icon-only controls have accessible names; ≥44px targets; visible focus throughout.
- **Responsive**: the drawer is full-height on mobile; the field-rows and the outcome section stack; the student/family links and chips wrap without horizontal overflow.
- Status and outcome chips, attribution, and make-up/follow-up hints are ALL icon + label (never color-only); Light/Dark/System via tokens; WCAG AA; axe critical = 0.
- **Edge cases**: a group session shows ONE outcome + the present/capacity summary (no per-student roster); an upcoming/live session shows the degraded view (no attribution); long Arabic/English content wraps in both directions.
- **Mixed-state day**: opening different rows of the same day yields the same drawer shape with different chips/attribution — no color collision, every chip labeled.
- **Theme/direction switch**: Light↔Dark re-themes instantly; the chips, times, and dates never mirror incorrectly; the family/student links resolve to the active language's `*.html` / `*.en.html`.

## 13. Static-HTML-first & Django mapping

- Every outcome drawer MUST be a complete baked `<template data-preview="<id>">` in the static `public/*.html` (Attendance + Sessions, ar + en) — real markup, relative `./assets/` paths, **no `<div id="app">`**, no JS-built drawer DOM, zero external/CDN requests, no chart/table/form/calendar library.
- **Django**: ONE partial — `templates/admin/_outcome_details.html` — renders Section A (the shared appointment rows, itself reusing the Spec 003 `_appointment_details.html` row block) + the outcome section + the gated actions from one context object.
- It is `{% include %}`'d once per outcome row to bake the `<template data-preview>` blocks; the session status map → the existing status template tag; the OUTCOME map → the new `outcome-status` template tag; `outcome.student` / `outcome.family` → real profile URLs; actions → the same `data-*` attributes server-side.
- No surface forks the partial; no whole-page `#app` mount.

## 14. Enforcement & cross-references

- **Smoke** (R43): asserts the outcome drawer opens from BOTH the Attendance page AND the Sessions page; it is the SAME builder (one `<template data-preview="<id>">` shape, `outcomeTemplate`).
- The drawer carries the outcome section — a labeled **Outcome** chip (icon + text, never numeric/color-only) distinct from the scheduling **Status** chip (R34), the who-absent/who-cancelled attribution, and the action cluster.
- The student link targets `student.html` and the family link targets `family.html` (real `<a href>`, language-aware); a no-outcome session degrades to the plain appointment view from the same builder; no `id="app"`; relative assets; no external request; no raw i18n key; axe critical = 0.
- **Screenshots** (screenshot-acceptance): Outcome details **drawer** — AR-RTL light desktop (matrix #4) and **mobile** outcome drawer — AR-RTL light (matrix #11) — appended to `app/screenshots/REVIEW.md`.
- Binds to `outcome-status-contract.md` (the `outcomeChip` map), `outcome-actions-contract.md` (the gated cluster), `attendance-page-contract.md` + `sessions-integration-contract.md` (the two entry surfaces), the Spec 003 `appointment-details-contract.md` (the shared `appointmentRows` rows + the `openSheet`/`<template data-preview>` engine, IP5), `student-family-impact-contract.md` (the profile deep-links instead of a bespoke drawer), `static-html-django-ready-contract.md`, and the Spec 002 `interaction-patterns-contract.md` (IP5/IP8). The scope-guard's no-persistence / no-engine / no-finance rules remain in force.
