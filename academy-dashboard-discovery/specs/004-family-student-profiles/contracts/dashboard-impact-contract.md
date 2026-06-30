# Contract: Dashboard Impact (Spec 004)

**Status**: Binding · The dashboard's families/students impact is MINIMAL and FIXTURE-BACKED — at most three small wiring changes, each backed by an existing fixture AND linked to an in-scope page. The dashboard stays calm: no new stat wall, no fake/unbacked widget. Extends the Spec 003 dashboard-impact pattern (`../../003-timetable-scheduling/contracts/dashboard-impact-contract.md`). Anything beyond this is a defect, regardless of passing tests.

## 1. Scope of impact

- Spec 004 touches **only** `public/dashboard.html` (+ `.en`); it adds **no new dashboard page, route, KPI row, stat tile, chart, or finance widget**.
- The dashboard already carries strong session/student signals (the **Today's Sessions** module, the welcome-hero counts, the existing tiles/KPIs from Spec 001/002/003). Spec 004 **connects** these to the new Families/Students surfaces and lets the existing shared session drawer carry family context — it does NOT replace or multiply them.
- All changes are baked static HTML enhanced via the established `data-*` hooks; no runtime-built DOM, no external/CDN requests.
- Family/student lifecycle status (where shown) resolves through the new family-status map (research R25) as **icon + label, never color-only**; session status keeps the Spec 001 session map.

## 2. Active change A — Deep-link from an existing affordance to `families.html`

- An **existing** dashboard affordance (e.g. a "Students"/"Families" quick-link in the apps-grid or an existing students/people module header) MUST deep-link to **`./families.html`** (relative; `./families.en.html` on the English dashboard) — reusing an affordance rather than adding a new card.
- **Fixture backing**: the link target is the real, in-scope `families.html` built this spec; no new dashboard data is invented.
- **In-scope link target**: `./families.html` (language-aware).
- **Hooks**: a relative `<a href>` (or an existing `data-action` resolving to it); no dead control.

## 3. Active change B — Shared session drawer already carries family context

- The Today's Sessions rows MUST keep opening the **SHARED appointment-details drawer** (`../../003-timetable-scheduling/contracts/appointment-details-contract.md`) — which **already renders a `familyKey` row** (its People group). Spec 004 changes **nothing** here: no bespoke dashboard drawer, no new field, no per-surface fork.
- **Fixture backing**: the row's `AppointmentDetails` shape already carries `familyKey` in `SESSIONS_FULL`; Spec 004 ensures that key resolves to a real `Family` in the fixtures (D1) so the drawer's family context is consistent — a data alignment, not a UI change.
- **In-scope link target**: the in-page transient drawer (scrim / focus-trap / Esc / return-focus); drawer actions stay demo-with-toast or disabled-with-reason.
- **Hooks**: the existing `data-drawer="<id>"` trigger + the shared `<template data-preview="<id>">`. No new hook.

## 4. Active change C — ONE fixture-backed "students needing attention" count chip

- The dashboard MAY add **exactly one** small **"students needing attention"** count chip (icon + label), the count **derived** from the existing `attention` fixture flags on `STUDENTS` / `FAMILIES` — sitting on an existing module header (e.g. the students/sessions card), never as a new stat tile.
- It MUST read as demo/fixture data (icon + label, **never color-only** — FR-019) and imply **no** real at-risk detection or alerting engine.
- **Fixture backing**: `DashboardFamilyStudentSignal.attentionCount`, derived from the `attention` flags already on the fixtures (data-model) — no second source of truth.
- **In-scope link target**: the chip links to the **filtered** Students/Families surface — `./students.html` (or `./families.html`) opening with the attention facet active.
- **Hooks**: a `data-attention` chip + the relative deep-link href. No dead control.

## 5. The hard rule — no new stat wall, no fake/unbacked widget

- Every added dashboard element MUST be **backed by an existing fixture** AND **link to an in-scope page**. A widget with no fixture, or pointing at an unbuilt page, is forbidden.
- The dashboard MUST stay calm: **no new stat tiles, no new KPI row, no chart, no families/students count wall, and no finance/payment/billing/credits widget** (those are unbacked and out of scope). The impact is wiring (A + B) + at most the one attention chip (C).
- "New families this week" or similar is **optional** and allowed ONLY under the same minimal treatment (one small count chip, fixture-backed, linked) — never a stat row.

## 6. What does NOT change on the dashboard

- The welcome-hero counts, the Today's Sessions module, the existing KPIs/sparklines, the status-summary tiles, and the overall layout/density all stay as Spec 001/002/003 shipped them.
- The shell (category rail + topbar), theme/language behavior, and all existing fixtures are **unchanged**; no existing dashboard control is removed or repurposed beyond pointing one affordance at `families.html` and (optionally) adding the one attention chip.

## 7. Deferred / Out (until backend modules exist)

- Real **attendance** rollups, real **finance / payment / invoice / credits** signals, real **at-risk / churn detection**, real **enrollment** counts, and any **notification feed** are **deferred / out** — no fake or unbacked version of any of these on the dashboard.
- No **student / family / teacher portal or role dashboard** is surfaced from the dashboard (future-role, never rendered).
- No real action from the shared drawer (demo-with-toast or disabled-with-reason only). The attention count is **display-only** — no alerting engine.

## 8. Django mapping

- The deep-link affordance → a plain anchor (`{% url 'families' %}`, language via `LocaleMiddleware`); the attention chip's target → `{% url 'students' %}` (+ a query/hash facet). The hash/facet is client-only state.
- The shared session drawer `<template data-preview>` → the **same** reused Django partial as Schedule/Sessions (`{% include "admin/_appointment_details.html" %}`), fed `familyKey` from view context — not a dashboard-specific template.
- The attention chip → a single context integer (`attention_count`) derived from the `attention` flags in view context; no new endpoint.
- Fixtures → view context; behavior keys stay stable `data-*` attributes (no JS-generated ids/classes).

## 9. Enforcement

- `no-dead-button` smoke: each added control (the families deep-link, the attention chip) navigates / links / opens the shared drawer — none is inert.
- `no-external-request` + relative-path checks: the deep links resolve relatively; zero CDN/chart requests.
- Single-source check: the dashboard session drawer is the **shared** `data-preview` template (not a bespoke one) and renders the `familyKey` row.
- Screenshot frame (Dashboard family/student impact, AR-RTL light desktop — Visual Acceptance #11) confirms the calm, fixture-backed wiring; a new stat wall, a finance/unbacked widget, or color-only attention = fail.
