# Implementation Plan — Spec 026: Admin Control / Sessions / Operations + Global Action Completion Pass

**Status**: Plan (no tasks, no implementation, no commit). **Baseline**: Spec 025 committed, HEAD `e4ee3cd`, 91 public HTML, working tree clean (spec-026 docs + feature.json + CLAUDE.md pending). **Branch**: `feature/012-role-portal-foundation`.

## 1. Scope & bounding principle

Two layers, both bounded:

- **Layer A — Admin ops**: build/deepen ONLY the sessions/timetable/attendance/outcomes/daily-ops surface, grounded strictly in legacy evidence. **Build 3 new pages** (`sessions-analysis`, `public-holiday`, `scheduled-actions`); **fold** total-queues + schedule-requests into existing ops pages; **keep honest planned gates** for leads/tasks/messages/announcements/time-convertor (owner-recorded, not built).
- **Layer B — Action completion**: classify + make honest every action across all 91 pages. Reclassify the misleading admin «preview action» toasts (Tiers 1–4 of `dead-ui-register.md`) into honest `backendRequired` finals, reusing the CLOSED `data-*` hook set. Portal surface (49 files) is already honest → untouched.

**Not allowed**: build any 027–032 page, any teacher chat/pay/live-room page, family payment page, student primary-role page, backend/API/auth, real CRUD/upload/download/export, new chart/chat/live-room/notification engine, new `data-*` hook or storage key (unless proven unavoidable + justified), `package.json` change.

## 2. Page set & count (D2–D9)

- **Current** = **91** (verified).
- **New pages (×2 langs)**: `sessions-analysis`, `public-holiday`, `scheduled-actions` → **+6**.
- **Folds (0 pages)**: `total-queues` → ops queue/notes band inside **sessions** (+ surfaced on attendance where relevant); `schedule-requests` inbox → preview band inside **schedule**. No standalone pages (avoids inventing uncaptured content; keeps scope bounded).
- **Honest planned gates (0 pages)**: leads, tasks, messages, announcements, time-convertor stay `data-coming-soon` planned nav → owner specs (`future-owner-register.md`).
- **Target public HTML count = 97.** No removals. Build-verified; drift = STOP.

Nav: flip 3 planned admin nav items (`sessionsAnalysis`, `publicHoliday`, `scheduledActions` in `nav.config.js:27,33,34`) from `planned`→`implemented` (real `<a>` to the new pages). The other 5 stay `planned`.

## 3. Layer A — new page architecture

All three pages are admin-shell pages (`shell:'app'`, six-category rail), AR+EN, static authored fixtures, display-only bodies, every write a `backendRequired` gate. Grounded 1:1 in legacy (`legacy-admin-ops-coverage.md`).

| Page | Module | Legacy | Body (display-only) | Gates (`backendRequired`) |
|---|---|---|---|---|
| `sessions-analysis` | `pages/sessions-analysis.js` | `management-sessions-analysis.md` | Outcome KPI board: regular + trial rows (authored count + duration), helper tiles; static filters (date/teacher/type) if wired to `data-filter` | Export = gate. **No computed score/rank/chart** — authored counts only |
| `public-holiday` | `pages/public-holiday.js` | `management-public-holiday.md` | Holiday windows list + category/teacher scope (authored) | Set-holiday / bulk-absence = gate. No fake bulk cancel |
| `scheduled-actions` | `pages/scheduled-actions.js` | `management-scheduled-actions.md`(+create) | Queued lifecycle-actions list (suspend/activate/cancel-classes) + auto-return dates | Create/automation = gate (engine future-backend). No fake scheduler |

Reuse existing admin primitives (page head, KPI/summary cards, tables/cards, `data-filter`, `data-disabled-reason` gates). Register in `build-html.mjs` (3 imports + 3 PAGES entries, `shell:'app'`, correct `activeId`, `titleKey`). Folds: total-queues band + schedule-requests inbox preview added inside `sessions.js`/`schedule.js` bodies with `backendRequired` add/accept/reject gates.

## 4. Layer B — action completion strategy (per DU tier)

**Guiding rule**: preserve the affordance (keep the button active/visible so nothing reads dead), but make the OUTCOME honest. Reuse closed hooks — change attribute values/wiring, not new hooks.

### Tier 1 — Create/Add primaries (DU-01…DU-08)
Strategy: the primary opens a **create/review modal or drawer** (reuse `data-modal-trigger`/`openModal()` with a baked `<template>` of the relevant fields, or `data-drawer`) whose **final** Save/Create is a `backendRequired` gate (a `gateNote`-style line + a disabled-with-reason Save). Where a create modal is disproportionate, align to the **existing sanctioned gate** (finance Create-invoice pattern: `data-disabled-reason` backendRequired). Never a «preview action» toast, never fake persistence.
- Applies: sessions New-session (shared w/ dashboard New/Add-session), students Add-student, teachers Add-teacher, courses Add-course, groups Add-group, add-family final Save + Add-another-child.

### Tier 2 — Shared-component verbs (DU-09…DU-18) — fix once, propagate to ~8 pages each
Strategy: in the shared components, reclassify the persistence-implying `data-demo-action` verbs:
- **Edit** → open prefilled/read-only modal (or `data-drawer`) → final Save = `backendRequired`.
- **Notify / Message / Send / Attend / Feedback / Reverse / Add-note / Print** → `backendRequired` gate (reuse `data-disabled-reason`/an honest confirm), no form needed.
- View/Details stay `real-drawer`/`real-page-link`; filters/tabs stay real; existing `data-disabled-reason` stay honest.
- Components: `appointment-details.js`, `outcome-details.js`, `enhance.js` (rowMenu/familyMenu), `teacher-actions.js`, `course-group-actions.js`, `finance-actions.js`, `settings-section.js`, `wizard.js`. Also `family.js`/`student.js` page verbs.
- **Print** on reports + finance → `backendRequired` gate (align with the Export CSV/PDF gate beside it). Finance stays Spec-009-invariant (no pay math).

### Tier 3 — Confirm→success wording (DU-19)
Strategy: keep the `data-confirm` modal (real, accessible); change the confirm CTA/message + `data-confirm-toast` so it states the change **needs the server** (`backendRequired`), never "saved/deleted/cancelled/done"; never mutate the DOM row. Applies to Cancel/Reschedule/Suspend/Stop/Remove/Notify/Reset/Schedule-report/Record-payment/Mark-paid/Send-reminder.

### Tier 4 — Dashboard "Today's Sessions" Apply/Clear widget (DU-20)
Strategy: **Option A (preferred)** — wire `apply-filter`/`clear-filter` to the real `data-filter` engine (`data-filter-form`/`data-filter-apply`/`data-filter-reset`) IF the widget's selects can reuse it with closed hooks. **Option B (fallback)** — if honest wiring needs a new hook/engine, reword/remove so it is not presented as a working filter (a static "عرض اليوم / Showing today" label, no fake Apply/Clear). Decision made at implementation after inspecting the widget markup; both are honest, neither fakes.

### Tier 5 — Missing planned pages (DU-21, DU-22)
DU-21: build sessions-analysis/public-holiday/scheduled-actions; fold total-queues/schedule-requests (§3). DU-22: leads/tasks/messages/announcements/time-convertor stay honest planned gates, owner-recorded — not built.

### Tier 6 — Excluded-by-law
Carry guards into contracts: no fake live room/direct-links (G13), no pay-signal «Fine»/«unpaid» tint (M-14), no computed «Average»/score (M-13), no fake chat (M-02).

## 5. Modal / gate reuse (D10–D17, D23)
Only existing patterns: `data-modal-trigger`/`openModal()`, `data-confirm`/`openConfirm()` (+`data-confirm-*`), `data-drawer`/`openSheet()`, `data-coming-soon`, `data-disabled-reason`, `data-tab`, `data-filter*`. Portal gates (`gateNote`/`plannedCard`/`guidePanel`) are portal-only; admin uses the admin gate patterns. **No new hook or storage key** — the whole pass changes attribute values/wiring + adds baked modal `<template>`s. If a create modal genuinely needs a new hook, prefer a gate/reword instead; only introduce a hook if unavoidable and justified in `research.md`.

## 6. Fixtures / locales / CSS
- **Fixtures**: extend static authored data for the 3 new pages (session-analysis counts, holiday windows, scheduled-actions rows) + create-modal field templates + gate metadata. No computed values, no pay figures.
- **Locales**: AR+EN mirrored keys for the 3 pages, the create/edit modal copy, and the reworded confirm/gate copy. No raw keys, no pay tokens (teacher/family), no student-primary wording.
- **CSS**: additive only if needed (ops board/list, modal field rows). No redesign, no new animation engine, no new hook/key.

## 7. Verification plan (D25–D27)
- `npm run build` → **97** HTML (assert). `npm test` / `npm run test:smoke` / `npm run test:a11y` / `node tests/screenshots/capture.cjs`.
- **Smoke rescope**: add the 3 new pages (load, no raw keys, ops gates), flip the 3 nav asserts planned→implemented, add action-completion asserts (every reclassified action opens modal/drawer/gate; no «preview action» toast on Create/Edit/Delete/Save/Print; confirm finals say backendRequired; dashboard Apply/Clear honest), keep count assert = 97, keep `href="#"`=0, keep payHit/famPay/child-view/admin-finance asserts **byte-verbatim**.
- **A11y**: 3 new pages + ≥1 modal + ≥1 drawer, keyboard/focus, gate aria, dark/light, mobile-390, critical=0 serious=0.
- **Screenshots**: 3 new pages, key modals/drawers, one action-gate, dashboard filter proof (if wired), mobile-390, dark; update `REVIEW.md`.

## 8. Role-law & impact protection (D28, D29)
- Teacher pay-free / family zero-pay / student child-view / admin finance Spec-009 asserts stay green + byte-verbatim. No forbidden page. Shared-component reclassification affects admin pages that bake those components — re-verify each touched admin page; portal pages don't use these admin components, so portal output stays byte-identical. `package.json` unchanged; no backend/dependency/engine.

## 9. Allowed / forbidden files (D30) — narrowed
**Allowed (implementation)**: `pages/{dashboard,sessions,schedule,attendance,sessions-analysis,public-holiday,scheduled-actions}.js`; `components/{appointment-details,outcome-details,teacher-actions,course-group-actions,finance-actions,settings-section,wizard,family,student}.js`; `enhance.js` (only if a value/wiring change needs it — no new hook); `nav.config.js` (3 flips); `fixtures/*`; `locales/*`; `styles/app.css`; `scripts/build-html.mjs` (3 registers); `tests/*`; `screenshots/REVIEW.md`; `README.md`; `CLAUDE.md`; the 026 spec dir; append-only 016/023 records.
**Forbidden**: `package.json`, dependencies, backend/API/auth, teacher chat/pay/live-room page, family payment page, student primary page, new CRUD/chart/notification/chat/live-room engine, new hook/storage key (unless justified).

## 10. Decisions index
D1–D31 resolved in `research.md`. Contracts in `contracts/` (20). Data in `data-model.md`. Commands in `quickstart.md`.

## 11. Risks / stop conditions (D31)
Stop + report if: count ≠ 91 at start or ≠ target after build; a new page isn't legacy-grounded; an out-of-scope page tries to build; any action unclassified or any DU row unresolved; any fake save/delete/upload/export/persistence appears; dashboard filter can't be wired honestly (→ take Option B, not a fake); any role-law scan fails (teacher/family/student/admin-finance); `href="#"` appears; a11y critical/serious; `package.json` changes; backend/dependency/engine/new-hook needed without justification.
