# Contract: Schedule Tabs Widget

**Status**: Binding · The generic, accessible content-tabs widget that switches **List** and **Timetable** panels. Reused by the **Schedule** page **and** the **Sessions** page. Baked panels + JS visibility toggle only — no JS-rendered panel.

## 1. Purpose & reuse

Provide one small, reusable `role="tablist"` widget (a single `tabs.js` behavior) that switches between baked panels on any scheduling surface. It is used by **Schedule** (List | Timetable) and **Sessions** (List/table | Timetable/agenda). It mirrors the nav-rail's roving-tabindex keyboard idiom so the project keeps one a11y pattern. It is NOT a router and NOT an SPA view-switch.

## 2. DOM & ARIA

- A container carries `data-tabs="<group>"` (e.g. `schedule-view`, `sessions-view`).
- Inside it, a `role="tablist"` holds two-or-more `role="tab"` buttons. Each tab MUST carry: `data-tab="<id>"`, `aria-controls="<panelId>"`, `aria-selected` (`true` on the active tab, else `false`), `id` (referenced by its panel's `aria-labelledby`), and a `data-view` hash token (§6).
- Each panel MUST be a `role="tabpanel"` carrying `data-tabpanel="<id>"`, `aria-labelledby="<tabId>"`, and `tabindex="0"`; the inactive panel(s) MUST carry the `hidden` attribute.
- Tab and panel ids MUST be stable and build-baked (Django-reproducible) — **never JS-generated**.

## 3. Baked panels + JS toggle only (hard)

**All** tab panels MUST be **pre-rendered as complete static HTML** at build time (the full List panel AND the full Timetable/agenda panel exist in `public/*.html`). `enhance.js` MUST only **toggle visibility** — set/remove `hidden`, flip `aria-selected`, and move roving `tabindex` — and MUST NOT render, build, or fetch any panel content. This satisfies `../../002-admin-core-operations/contracts/static-html-django-ready-contract.md` (SD1/SD2) and keeps the widget Django-portable (`{% if view %}` / static sections).

## 4. Keyboard (roving tabindex)

- The active tab has `tabindex="0"`; all inactive tabs have `tabindex="-1"` (**roving tabindex**).
- **Arrow Left/Right** (direction-aware in RTL: ArrowStart/ArrowEnd move within the tablist), **Home**, **End** MUST move focus between tabs; **Enter/Space** MUST activate the focused tab. Activation MUST be **explicit** (focus moves on arrow; selection changes on Enter/Space or click) OR follow the established nav-rail model consistently.
- Focus MUST be visible; tab controls MUST have accessible names; targets ≥44px (IP10).

## 5. Default & selection

- **List is the default tab** on both Schedule and Sessions: when no stored value and no URL hash apply, the List tab is selected and its panel shown; the Timetable panel carries `hidden`.
- Activating a tab MUST show exactly **one** panel (the others `hidden`), update `aria-selected`/roving `tabindex`, and change **only** the visible panel — no navigation, no reload, no scroll jump. Filter and selected-teacher state MUST be preserved across the switch (per `timetable-page-contract.md` §4).

## 6. Persistence (localStorage + URL hash, hash wins on load)

- The selected tab MUST persist in `localStorage['academy.schedView.<page>']` (`<page>` = `schedule` | `sessions`) AND be reflected in the **URL hash** `#view=list|timetable` via each tab's `data-view` token, so a deep link opens a specific view.
- **On load resolution order**: the **URL hash wins**, else the stored localStorage value, else the **List default**. Selecting a tab MUST update both the stored value and the hash. Deep links from the dashboard (`schedule.html#view=timetable`) MUST therefore open the Timetable tab.

## 7. JS-off degradation

With JavaScript disabled, **all** baked panels MUST remain visible as anchored sections (the `hidden` default-state and tab chrome degrade so no content is lost); the tablist degrades to in-page anchors. No panel is ever JS-required to exist. This is a hard progressive-enhancement guarantee.

## 8. `data-*` hooks (exact, no invention)

`data-tabs="<group>"` (container), `data-tab="<id>"` (each tab button), `data-tabpanel="<id>"` (each panel), `data-view="list|timetable"` (hash/persistence token on each tab, also usable on deep-link controls to target a view). No other hooks are introduced by this widget; no JS-generated ids/classes.

## 9. Cross-references

Hosts the panels defined in `timetable-page-contract.md` (Schedule) and the Sessions list/agenda; the Timetable panel content is `calendar-view-contract.md` (desktop grid) / its mobile agenda. Binds to Spec 002 `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP8 no-dead-button, IP10 a11y) and `../../002-admin-core-operations/contracts/static-html-django-ready-contract.md` (SD1/SD2/SD6). Django: tabs → static sections / `{% if view %}`; the selected view comes from the hash/context, not server state.
