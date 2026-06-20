<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **14-design-system-direction-v2.md**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 09 — Design System Direction

> Direction only — **no code, no final tokens**. This guides the original design system we'll build in Spec 001. The legacy design tokens (`output/combined/design-token-summary.md`) are used **only as neutral reference** for what an academy dashboard needs; we will create our **own** palette, type scale, and identity (legal constraint: do not reuse the legacy brand color/font/logo as‑is).

Stack target: **HTML + Tailwind (compiled, no CDN) + native JS, no SPA framework**, Arabic‑first **RTL** with **LTR** support, **light/dark**, themeable.

## 1. Visual style & tone
- **Academy‑friendly: cheerful but professional.** Friendly enough for parents and young learners, credible enough for finance/operations staff. Avoid both "toy" and "cold enterprise."
- **Clean, card‑based, generous whitespace.** Soft rounded corners, light elevation, clear hierarchy. (Legacy already trends this way: ~12px card radius, subtle shadows — a good baseline to *improve*, not copy.)
- **Calm surface, expressive accents.** Neutral backgrounds; one confident brand color + a secondary accent; strong, **semantic status colors** for the 11 session states.
- **Distinct from the legacy identity.** New name, new logo, **new palette** (recommend an original primary in a fresh hue — pick during Spec 001; do not reuse the legacy purple as‑is), new icon set.

## 2. Color system (build as CSS variables / Tailwind theme)
- **Tokens, not raw values:** `--color-bg`, `--surface`, `--surface-muted`, `--border`, `--text`, `--text-muted`, `--primary`, `--primary-contrast`, `--secondary`, `--success`, `--warning`, `--danger`, `--info`, + a **status scale** for sessions.
- **Semantic status map (single source of truth)** for the 11 session statuses (pending, waiting, running, attended, student‑absent, teacher‑absent, student‑cancel, teacher‑cancel, admin‑cancel, reschedule, make‑up) plus account/invoice/payout statuses. Legacy even lets admins recolor these — so make the status map **themeable**.
- **Contrast first:** all text/status combos meet WCAG AA (4.5:1 body, 3:1 large/UI). Don't rely on color alone for status — pair with label/icon.
- **Theming:** brand color configurable (the product already supports "pick from logo" + custom brand/secondary). Expose a small set of brandable variables; everything else derives.

## 3. Light / Dark / System
- Ship **light, dark, and system** from day one (legacy customisation already offers all three — users expect it).
- Implement via a `data-theme` attribute + CSS variables (Tailwind `dark:` driven by class/attribute). Every component must be validated in both themes (no hard‑coded colors).
- Dark mode: true dark surfaces (not pure black), reduced shadow, raised borders; charts and status colors get dark‑adjusted variants.
- Respect `prefers-color-scheme`; persist user choice.

## 4. RTL / LTR (Arabic‑first)
- **Arabic‑first, RTL is the primary direction**; LTR (English + 8 other locales) fully supported. (The legacy crawl was English/LTR only, so RTL is a **fresh design requirement**, not an observation — design it deliberately.)
- Use **logical CSS properties** (`margin-inline-start`, `padding-inline`, `inset-inline`, `text-align: start`) and Tailwind's RTL‑aware utilities; set `dir` on `<html>` from the locale.
- **Mirror** directional UI: sidebar side, drawers, chevrons, breadcrumb separators, table column order, calendar week direction, progress/timeline flow, dropdown alignment.
- **Do not mirror** intrinsically LTR content: numbers, times, currency amounts, code/links, phone numbers, charts' numeric axes, media controls.
- **Typography for Arabic:** choose a font family with excellent Arabic + Latin coverage (e.g. a Noto/IBM‑Plex‑Arabic‑class pairing — decide in Spec 001); ensure correct Arabic shaping, larger line‑height, and tabular numerals for finance tables.
- **Bidi data:** names/categories are often Arabic inside an English UI (and vice‑versa) — wrap mixed content with proper bidi isolation.

## 5. Typography
- **Scale:** a modular type scale (~6 steps) for display/H1–H4/body/caption. Legacy leaned on a 15px body / 14px secondary / 18px section baseline — fine as a starting density, but define our own scale.
- **Weights:** 400/500/600 for UI, a heavier weight for display only. Avoid thin weights for Arabic.
- **Numerals:** tabular/lining figures for all financial and schedule tables.
- **One primary UI font** with full Arabic+Latin coverage; a separate display face is optional. (Original choice — not the legacy Inter‑as‑is.)

## 6. Layout principles
- **App shell:** fixed sidebar (collapsible to icon‑rail) + sticky topbar + scrollable content + optional right drawer. Container offers **boxed/full** (legacy customisation exposes this).
- **Grid & spacing:** 4px base spacing scale; 12‑col responsive content grid; consistent page padding; KPI rows as responsive auto‑fit grids.
- **Density modes:** admin can run a denser table mode; teacher/family default to comfortable.
- **Card system:** standard card (title + actions slot + body), bordered vs shadowed variants (legacy exposes "card style"), consistent radius and elevation tokens.

## 7. Component styling guidance
- **Cards:** rounded (~12px), 1px subtle border *or* soft shadow (themeable), clear header with optional action menu; KPI cards support a value, label, delta, and optional icon/sparkline; some KPI cards are clickable filters (give an affordance).
- **Tables:** the workhorse. Zebra optional, sticky header, **sticky first column + horizontal scroll** for wide finance/salary tables (up to 23 cols), per‑row action **menu** (not a row of buttons), column‑priority hiding on small screens, inline status chips, selectable rows + bulk action bar, skeleton loading, purpose‑built empty states. Server‑driven sort/filter/paginate reflected in the URL.
- **Forms:** **always labeled** (legacy left ~48% of fields unlabeled — fix), with help text, inline validation, required markers, error summaries, and accessible error messaging (aria‑describedby). Group long forms into sections/steps; prefer **drawers or full‑page** for very large forms (24‑field report, family create) over cramped modals. Searchable selects and token multiselects for big option sets. Date/time pickers with explicit timezone context.
- **Modals/dialogs:** accessible (focus trap, Esc, `role="dialog"`, return focus), sized sm/md/lg, **destructive‑confirm** variant with explicit affirmation, lazy content loading, and **bottom‑sheet/full‑screen on mobile**. Reuse one session‑action modal family across admin+teacher.
- **Buttons:** clear intent hierarchy — primary, secondary, ghost/tertiary, **danger**, icon, link. Destructive actions visually distinct and never the default focus. Loading state on submit.
- **Badges/status chips:** one component fed by the status‑color map; icon+label, not color‑only.
- **Calendar/timetable:** custom week grid; session blocks colored by status, sized by duration, showing dual‑TZ on hover; reflows to agenda/day list on mobile and mirrors for RTL.
- **Finance widgets:** currency amounts with base‑equivalent, tabular numerals, P&L expected‑vs‑actual emphasis, charts in both themes.
- **Empty/loading/error states:** designed, not default — every list/table/tab/section has all three.

## 8. Iconography & imagery
- Original icon set (consistent stroke weight); never reuse legacy icons/assets.
- Always provide **avatar/logo fallbacks** (legacy logo 404s on every page) — initials avatar, placeholder thumbnails for library.
- Friendly illustrations for empty/error states (academy tone), originally created.

## 9. Motion
- Subtle, purposeful: 150–250ms ease for menus/modals/drawers; respect `prefers-reduced-motion`. No gratuitous animation in dense data views.

## 10. Accessibility (baseline, not optional)
- **WCAG 2.1 AA** target. Full keyboard operability (menus, tabs, dialogs, calendar, tables). Visible focus rings. Logical tab order.
- Correct ARIA: `tablist/tab/tabpanel`, `dialog`, `menu`, `listbox` for custom selects, live regions for toasts/async updates.
- Labels for all inputs; errors announced; sufficient target sizes (≥44px on touch).
- Color‑independent status (icon+text). Respect reduced‑motion and high‑contrast.
- RTL and screen‑reader tested in Arabic and English.

## 11. Responsive rules (summary)
- **Breakpoints:** mobile / tablet / desktop / wide. Mobile‑first for teacher & family; desktop‑optimised but responsive for admin.
- Sidebar → off‑canvas/icon‑rail on small screens; tables → column‑priority or card view; modals → sheets; filters → drawer; calendar → agenda. (Detail in [06](06-interactions-and-states.md) §9.)

> **Deliverable of Spec 001** will turn this direction into concrete tokens (palette, type scale, spacing, radii, shadows), a Tailwind config (no CDN), and the base component styles + the app shell. No tokens are finalised here.
