# Contract: Interaction Patterns

**Status**: Binding · Shared interactive behaviors, reused across all pages. All behavior is attached by `enhance.js` to **existing static markup** via `data-*` hooks — JS creates no page DOM (transient overlays excepted: drawer/modal/popover/toast are JS-created, as in Spec 001).

## IP1. `data-*` hook vocabulary (stable, Django-reproducible)

| hook | purpose |
|---|---|
| `data-filter-form` | a filter/search bar; enhance filters pre-rendered rows |
| `data-filter="<facet>"` | a control feeding a facet (status/subject/trainer/availability/level/search) |
| `data-table` | a table region (sortable/filterable rows) |
| `data-row` + `data-<facet>` | a row/card carrying facet values for client-side filtering |
| `data-row-menu="<id>"` | opens the row action menu (popover) |
| `data-drawer="<id>"` | opens a preview drawer for an entity |
| `data-modal-trigger="<id>"` | opens a modal |
| `data-confirm` | opens a confirmation modal before a (demo) action |
| `data-demo-action` | performs a visible local demo (toast), no persistence |
| `data-disabled-reason="<text key>"` | control is disabled with a visible reason |
| `data-toast` | shows a toast with a given message key |
| (existing Spec 001) | `data-action` theme/lang/profile/notifications/drawer/rail, `data-set-theme`, `data-set-lang`, `data-nav`, `data-shell` |

## IP2. Filter bar

- Search input + relevant selects + **apply** + **reset**; the active selection shows as **active-filter chips**.
- On apply: `enhance.js` shows/hides pre-rendered rows whose `data-*` facets match; updates the result count; if none match, shows the **"no results"** state with a reset action.
- On reset: all rows restored, chips cleared. Filters give visible feedback always — **never dead** (weak/dead filters are a screenshot failure condition).
- Degrades gracefully: with JS off, all rows render.

## IP3. Table

- Reuses the Spec 001 table look (sticky header, comfortable rows, hover, status-chip column, kebab `data-row-menu`, pagination + "showing X of N"). Rows carry facet attributes. Responsive: horizontal scroll or stack to cards on mobile. Not spreadsheet-like.

## IP4. Card grid

- Responsive grid of cards (directory/curricula) using Spec 001 card/medallion/chip tokens; cards carry facet attributes; each card has a clear primary affordance (open preview / navigate / disabled-with-reason).

## IP5. Drawer (entity preview)

- Right-side drawer (RTL) reusing Spec 001 `drawer.js`: scrim, focus trap, Esc, return-focus. Content built by `preview-drawer.js` from the entity's `details` fixture. Used for session/student/trainer/course previews instead of detail pages.

## IP6. Modal & confirmation modal

- Centered modal (focus trap, Esc, scrim, return-focus). `confirm-modal.js` provides a confirmation variant with title/message + confirm/cancel; confirming runs a **demo** action (toast) — **no real persistence**. Original structure (not Bootstrap).

## IP7. Toast

- Transient, accessible (`role="status"`/`aria-live`), token-typed. Provides visible feedback for demo actions so inert controls aren't dead.

## IP8. No-dead-button (binding)

Every button/link/control MUST: (1) perform a visible local demo action, (2) navigate to an in-scope static page, (3) open a drawer/modal/dropdown/toast, (4) apply/reset fixture filters, or (5) be disabled with a clear visible reason (`data-disabled-reason`). No decorative dead controls. Enforced by the smoke test.

## IP9. Disabled-with-reason

Not-yet-implemented actions (create/edit/save/delete/export real ops) render disabled with a visible reason (tooltip/inline), or perform a clearly-labeled demo with toast. Never silently inert.

## IP10. Accessibility

All interactive patterns are keyboard operable with visible focus; menus/drawers/modals manage focus (trap + return); icon-only controls have accessible names; ≥44px targets; status never color-only.
