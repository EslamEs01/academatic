# Contract: App Shell — Sidebar & Topbar

**Status**: Binding · Reused by every page in Spec 001 and by future role apps.

The shell = **right sidebar (RTL)** + **topbar** + **content region**. It must read as a real SaaS product shell, never a weak template.

## S1. Sidebar — structure (top → bottom)

1. **Brand block**: academy mark (gradient graduation-cap medallion) + name + a plan/context badge (e.g. "الخطة المتقدمة"). Original mark only — no legacy logo.
2. **Grouped navigation**, data-driven from `nav.config.js`:
   - Group `general` (عام): Home (active), Sessions (badge `24`), Schedule.
   - Group `academic` (الأكاديمية): Students, Trainers, Curricula.
   - Group `administration` (الإدارة): Reports, Settings.
   - Each group shows a small muted uppercase-style heading; items show icon + label, comfortable vertical rhythm.
3. **Help/support card** pinned at the bottom (e.g. "مركز المساعدة · دعم ٢٤ ساعة") with an icon and subtle raised surface.

## S2. Sidebar — visual rules

- Surface uses `--c-sidebar` (`#1F1B38` light / `#0E0C18` dark); text `--c-sb-ink` / `--c-sb-ink-2`; dividers `--c-sb-line`.
- **Active item** = a strong, filled, rounded **violet pill** (radius `--r-md`+, fill from `--c-sb-active` over a violet wash) with higher-contrast label/icon. Exactly one active item at a time, derived from the current page id.
- Hover/focus = a subtle raised wash (not the full active fill); focus is always visible (keyboard).
- Icons come from the local SVG set, inherit color, optical size ~20px. Labels are readable (≥13px), never clipped in either direction.
- It is on the **right** in RTL and mirrors to the **left** in LTR via logical properties — not a hard-coded side.

## S3. Sidebar — responsive & collapse

- **Expanded** (default, desktop): brand + grouped labels + help card.
- **Slim icon rail** (collapsed, per `sidebar-reference.png`): icons only, brand reduces to the mark, active state still legible, labels appear on hover/tooltip; toggling expanded↔rail causes **no layout break**.
- **Mobile/tablet**: sidebar becomes an off-canvas **drawer** opened from the topbar, with a scrim and focus trap; closes on Esc/scrim/selection.
- Collapsed/expanded preference persists (`UIPreference.sidebarCollapsed`).

## S4. Topbar — structure

Organized, grouped — **never a row of random tiny buttons**.

- **Lead (inline-start)**: page title + breadcrumb (e.g. "الرئيسية · لوحة التحكم"); a drawer/hamburger toggle appears on small screens.
- **Center**: global search field with placeholder ("ابحث عن طالب، جلسة، مدرب…") and a keyboard hint; non-functional search is a focusable input, not a dead button (it may open an empty results popover).
- **Trailing (inline-end)**: a tidy utility cluster — notifications (bell with dot), theme switcher (light/dark/system), language switcher (ع/EN), and a profile control (avatar + name + role) that opens a menu.

## S5. Topbar — behavior

- Sticky/visible while content scrolls; sits across the top of the content region beside the sidebar.
- Theme and language switchers visibly re-theme / re-mirror the whole shell on use and persist the choice.
- Every control either acts or is disabled-with-reason — **no dead buttons** (FR-027). Profile/notifications open real (fixture) menus/panels.

## S6. Content region

- Fills the remaining inline space; uses `--c-canvas`; max content width with comfortable gutters; vertical scroll independent of the fixed shell.
- Hosts the page body (dashboard / reports / gallery) and inherits direction + theme from `<html>`.

## S7. Accessibility

- Sidebar is a `<nav>` with an accessible name; nav is a list; active item exposes `aria-current="page"`.
- Drawer uses proper dialog semantics (focus trap, Esc, return focus).
- Full keyboard operability and visible focus throughout; touch targets ≥44px; icon-only controls have accessible labels (no raw i18n keys).
