# 16 — Spec 001 Brief (v2)

> Review brief for the **first** spec — unchanged in intent from v1 [11-next-spec-001-brief.md](../frontend-planning/11-next-spec-001-brief.md), reconfirmed and tightened by the exhaustive read. **Nothing built; no spec‑kit run.** Approve/adjust, then we turn it into the `/speckit.specify` input.

## Title
Frontend Foundation, Design System & App Shell

## Goal
Scaffold the project, build an **original** themeable design system (light/dark, Arabic‑first RTL + LTR), and the reusable app‑shell + base component library. **No business pages.**

## Why first
Verified scope downstream: 3 role apps, 178 route templates, 66 distinct modals, 104 table shapes, 109 mutation endpoints. All of it consumes these tokens, primitives, and the shell. Build once, correctly (accessible, RTL, dark, no CDN).

## In scope
1. **Scaffold** — HTML + Tailwind compiled (no CDN) + native‑JS modules; build tooling; a component gallery for review.
2. **Design system (original)** — token layer (color/type/space/radius/shadow/z/breakpoints) as CSS vars + Tailwind theme; **light/dark/system**; **Arabic‑first RTL + LTR** via logical properties + `dir` switching + bidi isolation; the **status‑color map** (11 session statuses + account/invoice/payout — themeable, since legacy exposes recoloring); original palette + Arabic‑capable font.
3. **App‑shell primitives** — AppShell (sidebar+topbar+content+optional drawer; boxed/full; collapsible), Sidebar (data‑driven nav config; grouped; icon‑rail; pinned ShortcutsWidget), Topbar (GlobalSearch, notifications, LanguageSwitcher[10 locales], ThemeSwitcher, profile menu, logout), Breadcrumbs, PageHeader.
4. **Base components** — Button (primary/secondary/ghost/**danger**/icon/link + loading), FormField (+validation/help/required — fix legacy's ~48% unlabeled fields), Select, MultiSelect/TokenInput, Modal, Drawer, Dropdown/Menu, Tabs, Accordion, Toast + ConfirmService, StatusChip/Badge (from the status map), KpiCard, DataTable (base: columns/sort/empty/loading), Pagination, Avatar (with fallback — legacy logo 404s everywhere), and the system states EmptyState/LoadingSkeleton/ErrorState.

## Out of scope
Any business page/module; real data/API/auth (only a guard scaffold interface); charts, calendar, certificate canvas, chat/realtime, file upload, rich‑text (arrive with their owning specs); final product copy.

## Acceptance criteria
- Tailwind builds locally, **no CDN**; native‑JS module structure; gallery runs.
- Tokens centralised; **zero hard‑coded colors/directions** in components.
- Shell + all base components render in **light & dark** and **LTR & RTL** (Arabic verified).
- All interactive components keyboard‑accessible (focus trap, Esc, ARIA, visible focus) at **WCAG AA** contrast.
- Sidebar driven by one nav‑config (proves the 3 role apps each supply their own).
- Status‑color map is the single source for StatusChip and is themeable.
- **No dead buttons** in the gallery; responsive shell (mobile→wide; sidebar→off‑canvas/icon‑rail).
- Design doc records the chosen original palette/type/tokens.

## Dependencies
None (root spec).

## Open questions to resolve first
Default language (Arabic‑first?), brand identity/palette/font, confirm native‑JS/no‑SPA, confirm one‑design‑system/three‑apps, light/dark+themeable — i.e. **A1–A6** in [17](17-open-decisions-v2.md).

## Reviewer action
Approve or adjust. On approval this becomes the Spec 001 `/speckit.specify` input — **no spec‑kit command runs until you say go.**
