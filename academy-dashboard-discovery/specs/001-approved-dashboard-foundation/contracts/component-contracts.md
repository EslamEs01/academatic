# Contract: Base Components

**Status**: Binding · Each component is a native ES-module render function consuming tokens + fixtures. All are proven in the gallery in both directions and all themes. Universal rules apply to every component:

- **Tokens only** (no hard-coded color/shadow/radius); correct in light/dark/system; mirrors correctly RTL/LTR.
- **No dead buttons** (act or disabled-with-reason); **no raw i18n keys** (all text via `data-i18n`).
- Keyboard operable, visible focus, accessible name/role; touch target ≥44px; status never color-only.

---

## Button
- Variants: `primary` (violet fill), `secondary` (tinted/`--c-surface-2`), `ghost`, `danger`; sizes sm/md; optional leading icon; `disabled` state with reason via tooltip/aria.
- Pill or `--r-sm` radius per context; primary uses `--c-primary` with the approved soft lift shadow on hover.

## Card / Section
- Surface `--c-surface`, radius `--r-lg`/`--r-md`, shadow `--sh-sm`, optional header (title + optional action link). Section header = title + optional "see all ←" navigable link.

## KPI / Stat Card (`kpi-card`)
- Slots: icon medallion, trend pill (`up`/`down`/`flat` + %), large tabular value, label, mini visual (`line`/`bar`/`progress`/`ring`). Accent drives medallion + spark color. Mini visual is inline SVG/CSS — **no chart lib**. Optional clickable (acts as filter) — if clickable it navigates/filters, never dead.

## Status Chip (`status-chip`)
- Input: `statusId`. Renders soft-tinted chip = accent dot/icon + label, resolved from the **status map**. Sizes sm/md. Used in the table and anywhere status appears.

## Status Tile (`status-tile`)
- Input: `statusId` + `count`. Tinted surface (accent-weak), large count, status icon, label. Never a gray flat pill.

## Icon Medallion (`medallion`)
- Rounded-square (`--r-md`) tile with a two-stop accent gradient (T4) holding a `currentColor`/white SVG icon. Sizes sm/md/lg. Decorative medallions are `aria-hidden`; meaningful ones get labels.

## Badge / Pill
- Small count/label pill (e.g. sidebar Sessions `24`, trend %, "permission required"). Tinted by accent; `--r-pill`.

## Avatar
- Circular; image when present, else **initials fallback** on an accent background (FR-024). Sizes for topbar, table rows, brand.

## Form Field (`field`)
- Always a visible **label** (FR-023) bound to the control; supports help text + error text; states: default/focus/disabled/error. Wraps input/select/search/date/time.
- Inputs: text, **search** (with icon), **select** (custom, token-styled, keyboard-navigable, not native-ugly), **date** & **time** controls (native or lightweight custom — no heavy legacy widget like flatpickr/select2). All focus-visible.

## Data Table (`table`)
- Sticky header; comfortable row padding; hover; status chip column; **row-action menu** (kebab) — never a row of pill buttons; numeric columns tabular; column order mirrors by direction.
- Built-in **empty / loading (skeleton) / error** row states; **pagination** + "showing X of N" summary. Horizontal scroll or stack on small screens. Reuses `field`/search for in-table filtering.

## Modal & Drawer
- Centered modal + edge drawer (drawer also serves the mobile sidebar). Focus trap, Esc to close, return focus, scrim, ARIA dialog semantics; bottom-sheet behavior acceptable on mobile. Original structure — **not** Bootstrap `modal-header/body/footer`.

## Dropdown / Menu
- For profile, notifications, row actions, language. Keyboard arrow navigation, Esc, outside-click close, roving focus; anchored and direction-aware.

## Tabs
- Token-styled tab list + panels; keyboard (arrows/Home/End); used in the gallery; available for future detail pages (none built now).

## Toast / Notification
- Transient, non-blocking, accessible (`role="status"`/`aria-live`), token-colored by type (success/info/warning/danger). Used to make otherwise-inert actions give feedback (helps satisfy no-dead-buttons).

## Report Card (`report-card`)
- Medallion + title + description + nav chevron; **disabled** variant shows a reason badge and is non-clickable (demonstrated by the trainers report). Looks like a real product area.

## State Components
- **EmptyState**: medallion + title + message + CTA. **LoadingSkeleton**: shimmer placeholders honoring `prefers-reduced-motion`. **ErrorState**: coral medallion + cause + retry action. Warm, human, Arabic-first microcopy.

## Layout / Section Header
- Consistent section title + spacing + optional action link; provides the vertical rhythm of the dashboard.

---

### Component → spec traceability
KPI-card→FR-016 · table/status-chip→FR-018/FR-006 · status-tile→FR-019 · report-card→FR-020 · state components→FR-021 · field→FR-023 · avatar→FR-024 · all→FR-022. Gallery renders every one of the above → FR-026.
