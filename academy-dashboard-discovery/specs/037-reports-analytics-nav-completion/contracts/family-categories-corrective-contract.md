# Contract — familyCategories Corrective (families.html#view=categories)

**Decision:** strengthen the existing fold-anchor with a labeled Categories tab on `families.html`
(flagged post-035 as UX-weak — categories were buried in a filter dropdown). Count 0. No new page.

## Mechanism
- Add `tabs({ group:'families', items:[{id:'directory',…},{id:'categories',…}], panels:{…} })` to
  `renderFamilies()` (`src/js/pages/families.js`) — the Spec 036 `teacher-performance`/`teachers` fold
  precedent.
- The **current body** (summary cards + status/category `filterBar` + `cardGrid` of `familyCard` +
  `famEditDrawer`/`famCatDrawer`) becomes the **directory** panel (first → default), unchanged.
- The **categories** panel is new (this contract). `#view=categories` opens it on fresh load
  (enhance.js's existing hash-open path, proven by Specs 035/036 — no new hook).
- `nav.config.js`: `familyCategories` route refined `'families.html'` → `'families.html#view=categories'`
  (stays `implemented`; no `FUTURE_ROUTES` entry exists for this item to remove).

## Must render (Categories tab, display-only)
- One row/card per `FAMILY_CATEGORIES` entry (`fixtures/families.js`): `nameKey`, `descKey`, the
  existing authored `count` field rendered as a literal member-count, and a status chip (`statusId`).
- The existing `famCatDrawer` reclassify drawer stays reachable and unchanged (same trigger, same body).
- A **Create category** control → `data-disabled-reason` `backendRequired` gate.

## Must NOT
- Compute a member count, percentage, or ranking of categories — `count` is the pre-existing authored
  fixture literal only, never derived from `FAMILIES.rows`.
- Persist a new category, rename a category, or move a family between categories on any confirm.
- Show any money/plan/hour-rate figure on the Categories tab (the families zero-pay boundary carries
  over unchanged).
- Render `<canvas>`/chart; fake export/PDF/print success; call backend/API/network.
- Change the **directory** panel's content — the pre-existing card grid/filter/drawer body must render
  byte-identical inside it.

## Acceptance (smoke)
- `families.html#view=categories` (+ `.en`) opens the Categories tab on fresh load, AR and EN.
- Each `FAMILY_CATEGORIES` row renders name + authored count + status chip; row count ===
  `FAMILY_CATEGORIES.length`.
- `famCatDrawer` reachable from the tab; Create-category is `aria-disabled` with a `data-reason-key`.
- DOM snapshot of category rows unchanged before/after clicking every gate on the tab.
- 0 computed-statistic token (grep); families-directory smoke asserts (summary cards / card grid /
  filters / famPay zero-pay regex) re-pin unchanged inside the directory panel.
- Nav: `familyCategories` is an anchor (not `data-coming-soon`) resolving to the new hash route;
  admin-menu-50 freeze byte-verbatim.
