# Contract: Appointment / Session Details Drawer

**Status**: Binding · ONE shared progressive-disclosure drawer reused by Schedule time-blocks, Sessions rows + agenda, and dashboard session rows — fixtures only, no real persistence, no real join. Extends the Spec 002 session preview drawer (`sessions-page-contract.md`) and the drawer engine (`interaction-patterns-contract.md` IP5).

## 1. Purpose & single-source rule

- This contract defines the ONE appointment-details surface for Spec 003. A single builder (`appointment-details.js`, research R15) SHALL produce the content for **every** schedule/session item; the Schedule blocks, Sessions rows, Sessions agenda, and dashboard session rows MUST all open the SAME drawer with the SAME field layout and action set (data-model `AppointmentDetails`, spec D4).
- It REPLACES the legacy long detail page with a calm, focused, progressive-disclosure drawer. It MUST NOT introduce a per-surface bespoke drawer.
- Every user-facing string MUST be an i18n key resolved at build time. Status MUST resolve through the single Spec 001 status map (`live→teal`, `upcoming→sky`, `completed→success`, `cancelled→coral`) as **icon + label, never color-only**.

## 2. Progressive-disclosure groups (exact fields)

The drawer body MUST present, top→bottom, these five groups (data-model `AppointmentDetails`):

1. **Summary** — `statusId` chip (icon+label), `dateKey`, `start`–`end` (or `time` + `durationMin`), teacher avatar + `teacher.nameKey` (with `accent`).
2. **People** — `students?` (count or short list) and `familyKey?` (optional).
3. **Logistics** — `subjectKey`, `roomKey`, optional `roomLinkKey?` (online Join/Open — see §3), and a STATIC `tzHintKey` line ("times shown in academy timezone") — a display nod to the legacy dual-timezone with **NO real conversion**.
4. **More** — `notesKey?`, `materialsKey?`, and the `attention?` note (conflict/delayed) rendered icon+label when the item is flagged (`data-attention`).
5. **Actions** — the actions row (§3).

Summary MUST always render; People / the Logistics link / More items render only when their fixture field is present (absent fields produce no empty row). Long titles, teacher names, and room labels MUST truncate/wrap gracefully in AR-RTL and EN-LTR.

## 3. Actions row (each behavior is binding)

The actions row MUST expose exactly these affordances, each honest under the no-dead-button rule (IP8):

- **View** — the open affordance on the block/row (`data-drawer="<id>"`) that opens this drawer; it MUST NOT navigate to a real detail resource.
- **Edit / Reschedule** — `data-demo-action` → clearly-labeled demo toast. NO real reschedule, NO persistence.
- **Notify** — `data-demo-action` → demo toast. NO real notification backend.
- **Cancel** — destructive; MUST use the approved confirmation modal (`data-confirm` + `data-confirm-title`/`-msg`/`-cta`/`-toast`/`-danger`) → on confirm, a demo toast. NO real cancellation, NO persistence.
- **Join / Open link** — `data-disabled-reason` / `data-reason-key`; disabled with a visible reason. NO real Zoom / live integration.

No action writes state; every action is demo-with-toast, open-overlay, confirm→demo, or disabled-with-reason.

## 4. Baked template + openSheet mechanism

- Each item's drawer content MUST be a BAKED hidden `<template data-preview="<id>">` pre-rendered into the static page at build time (one per fixture item). Runtime JS builds NO page DOM; it only clones the template into the transient sheet overlay.
- The trigger (block/row) carries `data-drawer="<id>"` matching the template's `data-preview="<id>"`. Activation calls the existing engine `openSheet(id)` → renders `.drawer.sheet` + scrim, moves focus in, and wires `data-sheet-close`.
- This is enhancement-only: with JS off the trigger and the baked content still exist; no drawer is JS-rendered as page content.

## 5. Accessibility

- The sheet MUST be focus-trapped while open; **Esc**, scrim click, and the `data-sheet-close` button all close it and **return focus** to the originating block/row.
- The sheet MUST be labelled (e.g. `aria-labelledby` the summary heading) and announced; icon-only controls have accessible names; ≥44px targets; visible focus throughout.
- Status and attention MUST be icon+label (never color-only). Meets WCAG AA; axe critical = 0.

## 6. No real persistence / no real join (binding)

- The drawer is fixtures-only. No action writes state; no Join/Open reaches a real Zoom/live/integration; no reschedule/cancel/notify hits a backend.
- The tz hint is a static display string — NO timezone math. `view` and links MUST NOT navigate to a real resource.

## 7. The four entry points (one builder, one partial)

The identical drawer MUST be reachable from:

1. **Schedule** — Timetable time-blocks and List rows (`schedule.html`).
2. **Sessions** — table rows (`sessions.html`).
3. **Sessions** — today's-agenda blocks.
4. **Dashboard** — Today's Sessions module rows (`dashboard.html`).

All four reference the same `<template data-preview="<id>">` shape and the same builder; opening from any entry point yields the same fields and actions (US3 / US6 / US7, FR-011 / FR-012).

## 8. data-* hooks (enumerated — no hooks beyond these)

| hook | role in the drawer |
|---|---|
| `data-drawer="<id>"` | trigger on the block/row; opens the sheet for `<id>` |
| `data-preview="<id>"` | the baked `<template>` holding that item's drawer content |
| `data-sheet-close` | close control inside the sheet |
| `data-row` | a table/agenda row entry that also carries the drawer trigger |
| `data-row-menu="<id>"` | kebab menu whose "view details" opens the drawer |
| `data-demo-action` | Edit/Reschedule + Notify → demo toast |
| `data-modal-trigger` / `data-confirm` (+ `data-confirm-title`/`-msg`/`-cta`/`-toast`/`-danger`) | Cancel → confirmation modal → demo toast |
| `data-disabled-reason` / `data-reason-key` | Join/Open → disabled with a visible reason |
| `data-toast` | demo-action feedback message key |
| `data-attention` | marks the attention/conflict note (icon+label) |

No JS-generated ids/classes; all hooks are stable and Django-reproducible.

## 9. Django-partial mapping

- ONE partial — e.g. `templates/admin/_appointment_details.html` — renders the five groups from one context object; every surface includes the same partial via `{% include %}`, looped per item to bake the `<template data-preview>` blocks.
- Fixtures → view context; the status map → a template tag/filter; actions → the same `data-*` attributes server-side. No surface forks the partial.
