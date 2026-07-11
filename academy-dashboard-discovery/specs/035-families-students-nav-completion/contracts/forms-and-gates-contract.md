# Contract — Forms & Gates

Reuse ONLY existing primitives and the CLOSED `data-*` hook set. No new hook, storage key, or engine.

## Primitives (reuse as-is)
- `pageHeader` / `summaryCards` — schedule-search header + KPIs.
- `filterBar({ targetId, searchKey, selects })` + `facetAttrs({...})` — schedule-search client-side filtering.
- `previewTemplate(id,{...})` + `sheetRow` — optional schedule-search slot detail; the `fam-cat` drawer (unchanged).
- `field()` / `optsFrom()` — any inert form controls (schedule-search criteria are filter controls, not a persisted form; a search "form" is the filterBar itself).
- `gate` pattern — `data-disabled-reason data-reason-key="…" aria-disabled="true"` (as in leads.js:39-40).
- `noResults()` — empty state.
- `tabs` `#view=` hash — student deep-links (no code change).

## Hooks (closed set — do not extend)
`data-filter`/`data-filter-form`/`data-target`/`data-filter-apply`/`data-filter-reset`, `data-row` + `data-<facet>`, `data-drawer`→`template[data-preview]`, `data-disabled-reason`/`data-reason-key`, `#view=`, `data-confirm`.

## Gates
- schedule-search Book/Assign, and any schedule-search form submit → `data-disabled-reason` (`ssr.reason.backend`).
- fam-cat Save → existing `fam.cat.reclassReason` (unchanged).
- evaluation Approve → existing `common.backendRequiredNote` (unchanged).
- Every gate is clickable-but-aria-disabled, shows a reason, mutates nothing.

## Acceptance
- No new `data-*` attribute name appears in enhance.js or any page; `enhance.js` ideally 0-diff (schedule-search reuses existing wiring). If a page-scoped init is unavoidable it must follow the guarded-IIFE precedent — but the plan expects **no** enhance.js change.
