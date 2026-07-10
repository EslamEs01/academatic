# Contract: Admin Menu Freeze

**Purpose**: Full admin menu coverage stays complete at freeze.

**MUST**:
- All 50 nav items classified (20 IMPL · 11 FOLD · 6 PLAN-029 · 6 FB · 7 DIS); **0 unclassified**.
- Build guard (`nav.config.js:148-154`) green; every IMPL has a route+page; every non-IMPL has no route; every DIS has a reasonKey.
- Spec-010/029 nav block green: 6 rail categories · link-integrity (deadHash/badTarget=0) · planned-truthfulness (non-implemented = non-navigating `data-coming-soon` button).
- No stale coming-soon without an owner; the 2 stale `FUTURE_ROUTES` doc-entries (`sessionsAnalysis`, `teacherCategories`) recorded (+ optional cleanup, no page effect).
- The forms fix does NOT flip any nav item (folded items stay planned/folded; `nav.config.js` route rules 0-diff).

**Verify**: smoke nav block + build guard green; `full-admin-menu-coverage-inventory.md` 0 unclassified.

**Status**: Binding (green today).
