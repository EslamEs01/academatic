# Contract — familyCategories Fold

**Decision:** fold-anchor to `families.html`. Count 0. No body edit.

## Must
- `nav.config.js`: `familyCategories` → `implemented`, `route:'families.html'` (real anchor; «قريبًا» gone).
- The existing **category filter** (families.js:32) stays visible on families.html.
- The existing **`fam-cat` reclassify drawer** (family.js:149-165; reachable via family.js:68; baked per families.js:39) stays reachable and unchanged.
- The final **"Save category"** stays a `data-disabled-reason` gate (`fam.cat.reclassReason`) — byte-identical.

## Must NOT
- No new standalone family-categories page.
- No fake category create / rename / delete / assign persistence.
- No mutation of any family's `categoryId`; the reclassify `<select>` stays INERT.
- No edit to the families.html / family.html `#page-body` (nav flip only re-renders the shared sidebar).

## Acceptance
- Smoke: `familyCategories` is an anchor to families.html; families.html/.en load; category filter present; `fam-cat` drawer + gated Save present; no fake mutation.
- Diff proof: `families.html`/`family.html` bodies byte-identical HEAD→working (only the shared sidebar differs).
