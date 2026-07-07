# Modal & Gate Scope — Spec 026

Every completion in Spec 026 reuses an **existing, proven** pattern from the current codebase. No new interaction engine, no new hook, no new storage key is assumed. The patterns below are the vocabulary the action inventory maps every action onto.

Evidence anchors: `academy-dashboard-discovery/app/src/js/enhance.js` (delegated click dispatch, confirm modal, drawer sheet, filter engine), `academy-dashboard-discovery/app/src/js/components/portal-page.js` (`gateNote`/`plannedCard`/`guidePanel`).

## 1. Standard modal pattern (admin shell) — `data-modal-trigger` / `openModal()`
- A trigger with `data-modal-trigger` opens the shared modal (`enhance.js` `openModal()` reads an inline `<template>`), or `data-action="open-modal"`.
- Focus trap + `Escape` close + scrim click close already implemented.
- **Use for**: admin Create/Edit forms (read-only or field-bearing), read-only View/Details when a drawer is not preferred.
- **Honesty rule**: the modal's **final** Save/Submit/Create button is a `backendRequired` gate (see §4), never a fake "saved" toast.

## 2. Confirmation modal pattern — `data-confirm` + `data-confirm-*`
- Attributes: `data-confirm-title`, `data-confirm-msg`, `data-confirm-cta`, `data-confirm-toast`, optional `data-confirm-danger`.
- `enhance.js` `openConfirm()` builds the dialog; on confirm it closes and shows the toast. Currently the confirm toast is a plain acknowledgement.
- **Use for**: Delete / Cancel / Stop / Suspend / Reschedule confirmation.
- **Honesty upgrade for 026**: the confirm CTA's outcome must read as `backendRequired` (the toast/message states the change needs the server), so a "Cancel session" confirm does **not** imply the session was actually cancelled. No DOM row is faked-removed.

## 3. Entity-preview drawer pattern — `data-drawer` / `openSheet()`
- A trigger with `data-drawer="<id>"` opens a side sheet (`data-sheet-close` / scrim / `Escape` to close).
- **Use for**: read-only View/Details (session details, student/teacher references, daily-ops item detail).
- **Honesty rule**: display-only; any write control inside is a `backendRequired` gate.

## 4. `backendRequired` gate pattern (the honest "final step")
- **Portal surface** (preferred where it fits): `gateNote(key)` / `plannedCard({icon,titleKey,descKey,availability:'backendRequired'})` / `guidePanel(...)` from `portal-page.js` — a **non-interactive labeled note** that says the action becomes available once the server is connected. Already smoke-audited across the role pages.
- **Admin shell**: the final button inside a modal/confirm resolves to an honest `backendRequired` message (reuse `data-confirm-*` / a labeled disabled control with `data-disabled-reason`), not a bare «preview action» toast.
- **Never**: persists data, mutates the DOM as if saved, or claims success.

## 5. Planned / future gate pattern — `data-coming-soon` / planned nav
- `data-coming-soon` + `data-soon-key` → «قريبًا» toast (nav-level), or a portal `plannedCard` with `availability:'planned'` (non-anchor).
- **Use for**: an action whose owner is a future spec (see `future-owner-register.md`); keep it visible but honest, never an anchor to a non-existent page.

## 6. Disabled-with-reason pattern — `data-disabled-reason` / `data-reason-key`
- A disabled control that, when clicked, toasts its honest reason.
- **Use for**: permission-locked or not-yet-available controls that should stay visible.

## 7. Static tab / filter / switcher patterns — `data-tab` / `data-filter` / `:target`
- `data-tab` (+ `data-tabs` wrap) — static tab engine (`selectTab`), keyboard-accessible.
- `data-filter` / `data-filter-form` / `data-filter-apply` / `data-filter-reset` / `data-filter-set` — static client-side filter (no server).
- `:target` / hash switchers (e.g. `family-child#child=stX`) — pure-CSS panel switching.
- **Use for**: view switches, timetable/agenda toggles, roster/status filters — these are **already honest** and stay as-is (no server needed to view/filter/switch).

## 8. Upload / Export / Print / Download gate
- No real file I/O. An upload/export/print/download action opens a `backendRequired` gate (portal note or modal final step). Never fabricates a file, a download, or an upload-complete state.

---

### Decision rule (applied per action in the inventory)
1. Does it navigate to an existing page? → `real-page-link`.
2. Is it a view switch / filter / tab? → `real-static-tab` / `real-static-filter` (keep as-is).
3. Is it a read-only detail? → `real-drawer` / `real-modal` (read-only).
4. Does it imply persistence (Create/Edit/Delete/Save/Export/Upload/Join)? → open the right modal/drawer/confirm whose **final** step is a **`backendRequired` gate** (§4/§8). Reclassify any current «preview action» toast here.
5. Is its owner a future spec? → `planned-future-gate` / `missing-owner-future-spec` (§5) + `future-owner-register.md`.
6. Is it a non-action that looks clickable? → `display-only-not-action` (strip misleading affordance) or give it a grounded drill-down.
7. Is it random/unsupported? → `remove-or-reword`.
