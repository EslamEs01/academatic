# Contract: Admin Impact (Spec 018)

**Status**: Binding.

1. **43/51** hash-identical after the rework: 40 admin + index.html + the portals hub pair untouched; changed = the three role pairs; NEW = the family-child pair.
2. git diff EMPTY on: enhance.js, nav.config.js, package.json, portal-shell.js, all admin sources/fixtures, portals.js, ROLE_NAV (fixture section diff confined to the NEW slices).
3. build-html.mjs diff = EXACTLY the 2 registration lines (import + PAGES entry) — shown verbatim in the G-audit.
4. Shell-v2 smoke asserts (sidenav counts, drawer, shell-anchor multisets) stay green UNCHANGED for the three homes; hub asserts byte-verbatim.

**Acceptance**: hash-compare + guarded diffs + the 2-line diff display.
