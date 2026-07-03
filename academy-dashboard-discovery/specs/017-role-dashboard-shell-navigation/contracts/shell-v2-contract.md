# Contract: Portal Shell v2 (Spec 017)

**Status**: Binding · References FR-001/003/004/006; research D1/D3/D5/D6.

1. Role pages (student/family/teacher) render: topbar (ALL existing controls kept + nothing engine-like added) · `.pt-layout` = `aside.pt-sidenav` + existing `main#page > .pt-body#page-body` · mobile `details.pt-nav-drawer` · footer. Hub = header-only path, unchanged.
2. ALL nav markup sits OUTSIDE `#page-body`; `bodyHTML` passes through byte-untouched.
3. Aside: identity block (persona avatar/name/role chip) · registry items · hub exit entry. Fixed width; NO collapse (Amendment A2). Active item = self-anchor + `is-active` + `aria-current="page"` (home in 017).
4. Zero admin classes/markup (`.app-shell/.nav-rail/.nav-panel/#shell` never); per-role accents via existing `data-role` tokens (sky/violet/teal).
5. Skip-to-content lands on `#page` past the sidebar.

**Acceptance**: smoke — sidenav on exactly the 3 role pages (never hub/admin), counts 7/8/7, one `aria-current` per page, zero admin markup; axe 0/0.
