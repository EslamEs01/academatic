# Contract — Forms & Gates

Reuse ONLY existing primitives and the CLOSED `data-*` hook set. No new hook, storage key, or engine.

## Primitives (reuse as-is)
- `tabs({group,items,panels})` + `#view=` hash — the teacher-performance tabs (enhance.js persists in the EXISTING `academy.schedView.<group>` key; not a new key).
- `formDrawer` / `previewTemplate` + `field()` — the `trn-add` / `trn-categories` drawers (unchanged).
- `filterBar({targetId,searchKey,selects})` + `facetAttrs({...})` — client-side narrowing on the two tab boards.
- `cardGrid` / `statMini` / `chip` / `summaryCards` — board rows/tiles/labels.
- `data-disabled-reason data-reason-key aria-disabled="true"` — every final gate.
- `noResults()` — empty state for the tab filters.

## Hooks (closed set — do not extend)
`data-tab`/`data-tabs`/`data-tabpanel` (+ `#view=`), `data-drawer`→`template[data-preview]`, `data-disabled-reason`/`data-reason-key`, `data-filter`/`data-facet`, `data-confirm`.

## Gates
- trn-add Save, trn-categories Save/assign → existing gates (unchanged).
- Any tab action (export/approve if surfaced) → `data-disabled-reason` backendRequired.
- Every gate is clickable-but-aria-disabled, shows a reason, mutates nothing.

## Acceptance
- No new `data-*` attribute name in enhance.js or any page; **`enhance.js` 0-diff** (tabs + drawers + filters are all pre-wired). If a page-scoped init were unavoidable it would follow the guarded-IIFE precedent — but the plan expects **no** enhance.js change.
