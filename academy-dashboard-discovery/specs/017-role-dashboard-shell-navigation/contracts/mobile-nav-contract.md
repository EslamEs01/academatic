# Contract: Mobile Navigation (Spec 017 — freeze Amendment A1)

**Status**: Binding · References FR-005/010/011; research D4.

1. <1024px: the aside hides; `details.pt-nav-drawer` renders under the topbar — `summary` = «القائمة/Menu» toggle; panel = the same registry items (same rules: home anchor, planned buttons).
2. Native semantics only: no JS, no new hooks, keyboard Enter/Space via the browser, closed by default, RTL/LTR correct.
3. **Amendment A1 (recorded)**: the design-freeze "off-canvas drawer" wording is amended for role apps — the frozen enhance.js clone-drawer targets `#shell > .sidebar` (admin-only, verified) and enhance.js is untouchable; the native disclosure is the sanctioned role drawer. Bottom tab bars remain FORBIDDEN.
4. 390px: zero horizontal overflow open or closed (probe); the open state is screenshot-captured.

**Acceptance**: disclosure present on the 3 role pages, absent on hub/admin; drawer-open frame recorded; probe green.
