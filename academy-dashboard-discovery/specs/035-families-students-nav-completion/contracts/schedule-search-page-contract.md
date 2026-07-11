# Contract — schedule-search Page

**New standalone pair:** `schedule-search.html` + `schedule-search.en.html`. Mechanism mirrors `leads.js` (Spec 034).

## Structure (must render)
- `pageHeader({ titleKey:'ssr.title', subKey:'ssr.sub', summaryHTML: summaryCards(SS_KPIS) })` — KPIs are authored literals.
- `filterBar({ targetId:'ss-results', searchKey:'ssr.searchPh', selects:[teacher, category, day, timeWindow, availability] })`.
- Results container `<div id="ss-results">` of authored candidate rows (`facetAttrs({search,teacher,category,day,slot,availability})`), each showing teacher name + subject/category + day + start–end + availability chip (icon+label) + a Book/Assign gate.
- `noResults()` empty state + an initial "enter criteria" hint.
- Optional read-only slot detail `previewTemplate('ss-<id>', …)`.

## Allowed
- Authored fixture rows (`fixtures/schedule-search.js`).
- Client-side filtering of those rows via the existing `data-filter`/facet mechanism.
- Display-only availability chips (authored labels).

## Forbidden
- Real availability engine / matching computation; backend/API/websocket; external request.
- Fake booking / fake assignment / row mutation after the gate.
- Pay/price/rate figure on any row; `type=file`/`type=password`; `<canvas>`/chart; computed metric.
- New `data-*` hook or storage key.

## Final actions
- Book / Assign / Add-to-schedule = `data-disabled-reason` (`ssr.reason.backend`), clickable `aria-disabled`, reason-only. No success, no mutation.

## Acceptance (smoke)
- Both pages load; form + `#ss-results` + empty state present; a facet select narrows visible rows; **0 external request** on load + interaction; finals are gates; no pay/file/password/canvas token; `FAKE` guard clean; nav active pill = `scheduleSearch`.
