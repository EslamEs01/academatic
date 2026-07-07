# Contract: Smoke Rescope

**Purpose**: keep the smoke suite the correction's safety net — amendments are additive, declared, and never loosen the pay/role guards.

## Sanctioned amendments (each ONE change, documented)

- **B-01**: no new assert required (the `pt-note` reframe changes no counted structure). Optional ONE-line role-model guard: child-view `#page-body` bodyText does NOT match `/لوحة الطالب|بوابة الطالب|student dashboard/i`.
- **B-03 Option A**: the new notifications control is a non-anchor `is-soon` button → `plannedNavAnchors` and anchor counts unaffected; confirm the shell-anchor multiset still holds.
- **B-05 Option A**: bump the `ROLE_NAV.teacher` planned-count expectation 6 → 7; `plannedNavAnchors===0` still holds.
- **B-11**: re-pin any structural probe whose count changes (e.g., a new stat-tile wrapper) with a stated reason.

## Byte-verbatim (MUST NOT change)

- `payHit` regex + assertion.
- `famPay` / `payFigure` regex lines.
- ALL admin asserts.
- The role-model pins (`hubRoleTargets`, `hubAdminLink`, `childViewLinks`, family-child `bodyAnchors===6`).

## Declared 022-hash supersession

- The Spec 022 documented extraction-hash baseline for the 5 affected child-view internals (B-01) and any pinned body B-11 touches is declared superseded in an append-only `specs/022-…/` note — never silent.

## Acceptance

- `npm test` green; load count == pinned value; 77 HTML; every amendment documented; the byte-verbatim set unchanged.

**Stop condition**: a smoke hash change that cannot be explained → STOP and report.
