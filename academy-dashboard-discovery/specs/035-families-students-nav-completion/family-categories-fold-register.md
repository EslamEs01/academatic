# Family Categories — Fold Register (Spec 035)

**Item:** `familyCategories` / فئات العائلات
**Decision:** **FOLD-ANCHOR to `families.html`** — the family-category surface already exists there; no new page. **Count impact = 0.** The only change is flipping the misleading «قريبًا» button into a real anchor.

## Existing drawer / form owner
- **`fam-cat` drawer** — a display-only category-reassignment PREVIEW: an INERT category `<select>` over the category list with the family's current tier marked + member counts, and a **`data-disabled-reason` "Save category" gate** (`fam.cat.reclassReason`).
  - Rendered by `previewTemplate('fam-cat', …)` at `family.js:149-165`.
  - Triggered by `data-drawer="fam-cat"` from the "Reclassify category" button (`family.js:68`).
  - Baked on **families.html** as well (families.js:39 — "the shared fam-edit form drawer + fam-cat picker drawer are baked here").
  - Provenance: Spec 027 **M-K** (reclassify family category, display-only + backendRequired Save); Spec 032 **FC-05** (re-pinned the `fam-cat` drawer + select).
- **Family category filter** — `families.html` filterBar carries a `category` facet over `FAMILY_CATEGORIES` (families.js:32), so an admin can already browse families by category.
- **Category chip** — each family's tier is shown as a labeled chip on family.html (family.js:67) and in the families list meta (family.js:220).

## Host page
- **`families.html`** (and its `.en` twin). The list + category filter + the `fam-cat` reclassify drawer all live here already. `family.html` (the detail page) also carries the drawer, reached from families.html.

## Nav anchor decision
- `nav.config.js`: `familyCategories` `status:'planned'` → `status:'implemented'`, `route:'families.html'`. The «قريبًا» `<button>` becomes a real `<a href="families.html">` (`.en` resolves to `families.en.html` via the existing lang-aware nav rendering). No new `FUTURE_ROUTES` entry needed (it was never listed there).

## How the drawer remains reachable
- From the families list the admin filters by category (existing facet) and opens **any family's** "Reclassify category" action → the `fam-cat` drawer. No behavior change; Spec 035 only makes the nav item point at this page instead of showing a dead «قريبًا».

## Why no standalone page is needed
- A dedicated "family categories" CRUD page would need create/rename/delete-category persistence — all forbidden (no backend). The honest surface (browse-by-category + display-only reclassify preview with a gated Save) already exists on `families.html`. A standalone page would add fake affordances or an empty shell. Matches Spec 033 CS-06 / page-vs-deeplink "Folded owner (anchor)".

## Final Save gate
- The `fam-cat` "Save category" final stays a `data-disabled-reason` gate (`fam.cat.reclassReason`) — **backendRequired, byte-identical**. Spec 035 does not touch the drawer body.

## No-fake mutation proof
- The category `<select>` is **INERT** (no listener persists a choice); the member-count list is authored; the Save button is `aria-disabled="true"` with a reason. No family's `categoryId` mutates, no row re-tiers, no toast claims success. Smoke re-affirms the `fam-cat` gate is present and unchanged.
