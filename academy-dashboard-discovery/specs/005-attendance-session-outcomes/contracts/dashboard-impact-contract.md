# Contract: Dashboard Impact (Spec 005)

**Status**: Binding · The dashboard's attendance/outcome impact is MINIMAL and FIXTURE-BACKED — at most two small wiring changes, each backed by `SESSION_OUTCOMES` AND linked to an in-scope page. The dashboard stays calm: **no new stat wall, no new KPI row/tile, no chart, no fake/unbacked attendance-rate widget, no finance/credit widget, no real attendance metrics.** Touches ONLY `dashboard.js` / `dashboard.html`. Extends the Spec 003/004 dashboard-impact pattern (`../../004-family-student-profiles/contracts/dashboard-impact-contract.md`). Anything beyond this is a defect, regardless of passing tests.

## 1. Scope of impact

- Spec 005 touches **only** `public/dashboard.html` (+ `.en`), produced by `app/src/js/pages/dashboard.js`; it adds **no new dashboard page, route, KPI row, stat tile, chart, or finance widget**.
- The dashboard already carries strong session signals (the **Today's Sessions** module `sessionsModule(SESSIONS)`, the `upNext()` strip, the Spec 004 `peopleSignal()` card, the welcome-hero counts, the `STATUS_SUMMARY` tiles). Spec 005 **connects** these to the new Attendance surface and lets the existing rows carry one outcome chip — it does NOT replace or multiply them.
- All changes are baked static HTML enhanced via the established `data-*` hooks; no runtime-built DOM, no external/CDN requests.
- The outcome chip resolves through the labeled OUTCOME map (`outcome-status-contract.md`) as **icon + label, never color-only**; the scheduling status keeps the Spec 001 session map.

## 2. ALLOWED change A — ONE "needs follow-up today" count chip folded into the people-signal card

- The dashboard MAY add **exactly one** small **"needs follow-up today"** count chip (icon + label) **folded into the EXISTING Spec 004 `peopleSignal()` card** (`dashboard.js`) — NO new card, tile, or row. It sits in that card's existing `flex flex-wrap items-center gap-2.5 ms-auto` action area, beside the existing `dash.studentsAttention` chip and the `dash.viewFamilies` link.
- The count MUST be **derived from `SESSION_OUTCOMES`** — the `followUp` / absence flags already in the fixture (data-model *DashboardOutcomeSignal.needsFollowUp* `{ count, labelKey }`, *OutcomeFollowUp*) — with **no second source of truth** and **no engine**.
- The chip MUST be a **real `<a href>`** linking to the **filtered** Attendance surface — `./attendance.html` (`./attendance.en.html` on the English dashboard, via the existing `getLang()` pattern, like `schedHref()` in `dashboard.js`) — opening with the follow-up/attention facet active (the `data-filter-set`/hash the Attendance page reads client-side; landing MUST NOT require JS).
- It MUST read as demo/fixture data (icon + label, **never color-only** — FR-018) and imply **no** real attendance-rate, at-risk detection, or alerting engine.

## 3. ALLOWED change B — Today's Sessions rows may carry an outcome chip + open the canonical drawer

- The existing **Today's Sessions** rows (`sessionsModule(SESSIONS)`) MAY carry a small **secondary outcome chip** (`outcomeChip`) — ONLY when a recorded outcome exists (the R34 rule; never on plain upcoming/live rows) — and MAY open the **canonical outcome drawer** (`outcomeTemplate`, `outcome-details-contract.md`) instead of the plain appointment drawer. Concretely, the baked templates line in `renderDashboard()` (`SESSIONS.rows.map((s) => appointmentTemplate({ ...s, students: s.present }))`) is upgraded to bake `outcomeTemplate` for rows with a recorded outcome, degrading to the appointment view otherwise.
- This is **reuse, not a new module** — the same shared drawer engine + the same canonical drawer Attendance/Sessions open; no bespoke dashboard drawer, no new field fork.
- Drawer actions stay **status-gated, demo / confirm→demo / disabled-with-reason** (`outcome-actions-contract.md`); opening or acting from a dashboard row MUST NOT save, mutate status, persist, notify, reschedule, or touch credit.

## 4. The hard rule — no new stat wall, no fake/unbacked widget (FORBIDDEN)

- Every added dashboard element MUST be **backed by `SESSION_OUTCOMES`** AND **link to an in-scope page** (`attendance.html` or the in-page canonical drawer). A widget with no fixture backing, or pointing at an unbuilt page, is forbidden.
- The dashboard MUST stay calm — these are **forbidden** (hard rule): a **new stat wall**; a **new KPI row or stat tile**; a **chart**; a **fake/unbacked attendance-rate widget**; a **real attendance metric**; **any finance / payment / credit / billing / salary widget**; a second outcome card/module. The impact is the one chip (A) folded into the existing card + the existing rows' reuse (B) — **≤ 1 new outcome chip** of net new chrome.
- "Absences today" / "cancelled-or-rescheduled today" are folded into the **same single** follow-up chip (one signal), never a separate widget — to avoid a stat wall.
- The Spec 004 `dash.studentsAttention` chip already in `peopleSignal()` is a **people** signal (suspended/stopped/attention students) and stays as-is; the new "needs follow-up today" chip is the **outcome** signal. They coexist in the same card; the "≤ 1 new outcome chip" budget counts only the net-new outcome chip (the people chip is not new and not doubled).

## 5. What does NOT change on the dashboard

- The welcome-hero counts, the `kpiRow(KPIS)` overview, the `upNext()` schedule strip + its attention chip + its `schedule.html#view=timetable` deep-links, the Spec 004 `peopleSignal()` families wiring, the `STATUS_SUMMARY` tiles, the reports grid, the states demo region, and the overall layout/density all stay as Spec 001/002/003/004 shipped them.
- The shell (category rail + topbar), theme/language behavior, and all existing fixtures are **unchanged**; no existing dashboard control is removed or repurposed beyond folding in the one follow-up chip and (optionally) upgrading the Today's Sessions rows to the canonical outcome drawer.

## 6. Deferred / Out (until backend modules exist)

- Real **attendance rates**, real **at-risk / churn detection**, real **finance / payment / credit / salary** signals, **Sessions-Analysis** count+hours roll-ups, and any **notification feed** are **deferred / out** — no fake or unbacked version of any of these on the dashboard.
- No **student / family / teacher portal or role dashboard** is surfaced (future-role, never rendered).
- No real action from the shared drawer (demo / confirm→demo / disabled-with-reason only). The follow-up count is **display-only** — no alerting engine.

## 7. Edge cases & states (binding)

- **Zero to follow up**: if `needsFollowUp.count` is 0, the chip MAY render a calm "all caught up today" (or be omitted) — never an alarming red "0", never color-only; it still deep-links to `attendance.html`.
- **No recorded outcomes today**: the Today's Sessions rows show their scheduling status only (no secondary outcome chip) and open the degraded appointment view — the dashboard adds no new state.
- **Mixed-state day**: the follow-up count and the per-row outcome chips render legibly together with the existing status chips; no color collision, no pill wall.
- **Long content / mobile**: the folded chip wraps within the `peopleSignal()` card's `flex flex-wrap` row; no horizontal overflow; the drawer is full-height on mobile.

## 8. `data-*` hooks (exact, no invention)

The follow-up chip is a relative **`<a href>`** to `attendance.html` carrying a `data-attention` chip class (reusing the `peopleSignal()` chip pattern) + the optional filter hash the Attendance page reads. The Today's Sessions rows reuse the existing **`data-drawer="<id>"`** trigger + the baked **`<template data-preview="<id>">`** (now built by `outcomeTemplate`) + `data-sheet-close`; drawer actions reuse `data-demo-action`/`data-confirm`/`data-disabled-reason`/`data-toast`. The new Spec 005 `data-filter-set` hook lives on the Attendance page, **not** here. **No new hook; no JS-generated ids/classes.**

## 9. Django mapping

- The follow-up chip → a single context integer (`needs_follow_up_count`, derived from the `follow_up` flags in `SESSION_OUTCOMES` view context) rendered inside the existing people-signal card, linking `{% url 'admin:attendance' %}` (+ a query/hash facet; the facet is client-only state). No new endpoint.
- The Today's Sessions row drawer `<template data-preview>` → the **same** shared `{% include "admin/_outcome_details.html" %}` partial used by Attendance/Sessions (not a dashboard-specific template), fed the row's outcome from view context.
- Fixtures → view context; behavior keys stay stable `data-*` attributes (no JS-generated ids/classes). No whole-page `#app` mount; relative `./assets/` paths; zero external requests.

## 10. Enforcement

- `no-dead-button` smoke (R43): the follow-up chip navigates to `attendance.html` (real `<a href>`, no `href="#"`); the Today's Sessions rows open the **canonical** `<template data-preview>` / `outcomeTemplate` drawer (the same partial Attendance uses, not a bespoke one) — none is inert.
- **≤ 1 new outcome chip** check: the smoke harness asserts the dashboard added **at most one** net-new outcome chip (folded into `peopleSignal()`), **no new stat tile / KPI row / chart / finance widget / second outcome module**, and that every added element is backed by `SESSION_OUTCOMES` and links to an in-scope page; the outcome chip is icon + label (never color-only).
- `no-external-request` + relative-path checks: the deep link resolves relatively; zero CDN/chart requests (also guarantees no chart/table/form library).
- Screenshot frame: **Dashboard outcome impact, AR-RTL light desktop** (`screenshot-acceptance.md`, Visual Acceptance #9) confirms the calm, fixture-backed wiring; a new stat wall, a finance/unbacked/attendance-rate widget, or color-only outcome = fail.

## 11. Reused / cross-references

Reuses Spec 001/002/003/004 `welcomeZone`, `kpiRow`, `sessionsModule`, `upNext()`, `peopleSignal()`, `statusTile`, `statusChip`, `appointmentTemplate`, and the drawer/confirm/toast engines — all from `dashboard.js`, unchanged except the two additions above. New shared pieces consumed (not defined) here: `outcomeChip` (`outcome-status-contract.md`) and `outcomeTemplate` (`outcome-details-contract.md`). Binds to: `attendance-page-contract.md` (the chip's deep-link target), `outcome-details-contract.md` (the canonical drawer), `outcome-status-contract.md` (the chip vocabulary), `outcome-actions-contract.md` (the drawer's status-gated demo/confirm/disabled actions), `navigation-impact-contract.md` (no dead links), `static-html-django-ready-contract.md` (SSG/Django rules), `scope-guard.md` (no stat wall / engine / finance / credit), `screenshot-acceptance.md`.
