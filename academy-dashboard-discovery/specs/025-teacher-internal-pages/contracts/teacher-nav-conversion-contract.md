# Contract: Teacher Nav Conversion

**Purpose**: flip the 7 planned teacher nav items to implemented, honestly.

## Allowed edit

- `fixtures/portal.js` `ROLE_NAV.teacher` (lines 161–166): `schedule/students/outcomes/tasks/reports/library/profile` `status: 'planned'` → `'implemented'` (page ids already correct). Home stays implemented.

## Rules

- 8 implemented teacher nav links total (home + 7); each a real `<a>` self-link with `aria-current` on its own page.
- `plannedNavAnchors === 0`; `navListAnchors === 8`; `navAside === 8 && navDrawer === 8`.
- NO teacher chat nav item; NO teacher finance/salary/pay nav item.
- `activeId` correct per page (schedule/students/outcomes/tasks/reports/library/profile).

## Acceptance

- Smoke teacher block updated: `navListAnchors===8` (was 1), `plannedNavAnchors===0`; every internal page shows `aria-current` self once per nav instance.

**Stop**: any planned nav anchor, chat/finance nav item, or wrong activeId → STOP.
