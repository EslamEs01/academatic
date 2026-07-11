# No-Fake Report Actions Register (Spec 037)

Covers the two folded Reports/Analytics tabs — `reports.html#view=monthly` (monthlyReports) and
`reports.html#view=analysis` (dataAnalysis) — plus the pre-existing `overview` tab (unchanged Spec 008/029
content) now hosted alongside them. Reuses the **existing** reports Print/CSV/Share/Export
`data-disabled-reason` gate pattern (Spec 026/029) rather than inventing a new one; every gate's toast is
`enhance.js`'s `acknowledge()` — "يُتاح بعد ربط الخادم" / "available once the server is connected" — never
«تم/حُفظ/(تجريبي)» / "saved/sent/done". No arithmetic, no chart, no network, no mutation on any of the three tabs.

| # | Action | Surface | Honest treatment | Forbidden alternative | Acceptance check |
|---|---|---|---|---|---|
| RA-01 | Monthly report generation | `reports.html#view=monthly` | **MUST-GATE:** "Generate"/"Refresh" is a `data-disabled-reason` (`backendRequired`) final; the board renders only authored fixture rows (month, area/category, status chip, count literal) | **MUST NOT** run any report engine, add a new row, or flip a row's status on click | smoke: Generate control is `aria-disabled`/`data-disabled-reason`; click produces 0 new/changed board rows; toast = "available once the server is connected" |
| RA-02 | Data-analysis calculation | `reports.html#view=analysis` | **MUST-GATE:** the board is display-only — authored insight cards + categorical trend/status chips + a read-only list, filtered client-side only | **MUST NOT** compute any metric, percentage, prediction, or aggregate from the fixture rows; no derived "score" | grep: 0 new `%`/computed-average/prediction token in the analysis tab body; smoke: filter narrows the same authored rows, never recalculates a value |
| RA-03 | Export / PDF / download | Monthly tab, Analysis tab, and the carried-over overview tab | **MUST-GATE:** every Export/PDF/CSV/Download control is a `data-disabled-reason` gate | **MUST NOT** call `window.open`, generate a `blob:`/`.pdf` URL, or trigger a file download of any kind | grep: 0 `window.open`/`blob:`/`.pdf` in `reports.html`/`.en`; smoke: export controls are `aria-disabled` |
| RA-04 | Send / email | Monthly tab (report distribution), Analysis tab (insight sharing) | **MUST-GATE:** "Send"/"Email"/"Share" is a `data-disabled-reason` gate | **MUST NOT** show a fake "sent" confirmation or simulate delivery status | smoke: Send control gated; 0 "sent/delivered" success toast anywhere in reports body |
| RA-05 | Chart / computed trend | Both new tabs | **MUST-GATE-equivalent (design law):** trend/status chips are authored categorical LABELS (e.g. "up"/"steady"/"down", "on-track"/"watch") baked into the fixture, never a rendered visual computed from numbers | **MUST NOT** render `<canvas>`, sparkline, bar-from-arithmetic, or any chip whose text implies a calculation ("+12%", "avg", "rank #") | grep: 0 `<canvas>` in `reports.html`/`.en`; grep: 0 `%`/`avg`/`rank` token attached to a trend chip in the two new tab fixtures |
| RA-06 | Backend / API / network | Both new tabs + the `tabs()`/`#view=` mechanism | **MUST NOT:** all data is authored fixtures loaded at build time; tab switching is pure client-side hash routing (existing `tabs()` widget, Spec 036 precedent) | **MUST NOT** add `fetch`/`XHR`/`WebSocket`, a new dependency, or any call to `package.json`/`build-html.mjs` beyond the two tab entries | smoke: 0 external request on `reports.html#view=monthly`/`#view=analysis` load + tab-switch; `package.json` 0-diff |
| RA-07 | Row / status mutation | Both new tabs | **MUST NOT:** no control on either tab changes a row's status, count, or ordering in the DOM after interaction | **MUST NOT** simulate "mark as generated", "approved", or "sent" state changes on click | smoke: DOM snapshot of board rows before/after clicking every gated control is unchanged |

## Standing pattern reuse (no new hook / storage key / engine)
- Tabs = the existing `tabs()` widget + `#view=` hash routing (Spec 036 `teacher-performance` precedent) wrapping the pre-existing `reports.js` content as the `overview` tab.
- Gates = the existing `data-disabled-reason` / `aria-disabled` mechanism already used by reports Print/CSV/Share/Export.
- Wording = the Spec 026 `acknowledge()` copy, byte-identical — "available once the server is connected" / «يُتاح بعد ربط الخادم».
- Filtering (if present on either tab) = the existing `filterBar`/`data-facet` client-side narrowing over authored fixtures — never a query.
- The reports smoke asserts (7 category cards / finance-free / 2-planned) apply unchanged inside `overview`; the two new tabs are additive only.
