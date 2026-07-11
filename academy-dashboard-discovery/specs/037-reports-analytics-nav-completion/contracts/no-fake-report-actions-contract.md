# Contract — No-Fake Report Actions

Binding on the two NEW `reports.html` tabs — `#view=monthly` (monthlyReports) and `#view=analysis`
(dataAnalysis) — plus the carried-over `overview` tab (unchanged Spec 008/029 content) now hosted
alongside them via the same `tabs({ group: 'reports' })` widget. Reuses the **existing** reports
Print/CSV/Share/Export `data-disabled-reason` gate pattern (Spec 026/029) — no new gate mechanism.
(Binding plan mirror of `../no-fake-report-actions-register.md`.)

| # | Action | Surface | Honest treatment | Forbidden alternative | Acceptance check |
|---|---|---|---|---|---|
| RA-01 | Monthly report generation | `#view=monthly` | **MUST-GATE:** Generate/Refresh = `data-disabled-reason` (`backendRequired`) final; board renders authored `MONTHLY_REPORTS` rows only (month/area/count/status chip) | run an engine, add/flip a row on click | smoke: control `aria-disabled`; 0 row delta pre/post-click; toast = "available once the server is connected" |
| RA-02 | Data-analysis calculation | `#view=analysis` | **MUST-GATE:** display-only board — authored `DATA_INSIGHTS` cards + categorical trend/status chips + client-side filter only | compute a metric/percentage/prediction/forecast from fixture rows | grep: 0 new `%`/computed-average/prediction token in the analysis tab body; smoke: filter narrows same rows, never recalculates |
| RA-03 | Export / PDF / download | monthly, analysis, carried-over overview | **MUST-GATE:** every Export/PDF/CSV/Download control = `data-disabled-reason` gate | `window.open`, `blob:`/`.pdf` URL, any file download | grep: 0 `window.open`/`blob:`/`.pdf` in `reports.html`/`.en`; smoke: export controls `aria-disabled` |
| RA-04 | Send / email / share | monthly (distribution), analysis (insight sharing) | **MUST-GATE:** Send/Email/Share = `data-disabled-reason` gate | fake "sent" confirmation, simulated delivery status | smoke: Send control gated; 0 "sent/delivered" success toast anywhere in reports body |
| RA-05 | Chart / computed trend | monthly, analysis | **MUST-GATE-equivalent (design law):** trend/status chips are authored categorical LABELS (`healthy`/`needsFollowUp`, `improving`/`steady`/`declining`) baked into fixtures — never rendered from arithmetic | `<canvas>`, sparkline, bar-from-arithmetic, chip text implying calculation ("+12%", "avg", "rank #") | grep: 0 `<canvas>` in `reports.html`/`.en`; grep: 0 `%`/`avg`/`rank` token attached to a trend chip in the two new tabs' fixtures |
| RA-06 | Backend / API / network | monthly, analysis + the `tabs()`/`#view=` mechanism | **MUST NOT:** all data authored at build time; tab switching = pure client-side hash routing | `fetch`/`XHR`/`WebSocket`, new dependency, `package.json`/`build-html.mjs` change beyond the 2 tab wiring entries | smoke: 0 external request on load + tab-switch of `#view=monthly`/`#view=analysis`; `package.json` 0-diff |
| RA-07 | Row / status mutation | monthly, analysis | **MUST NOT:** no control changes a row's status/count/order in the DOM after interaction | simulate "generated"/"approved"/"sent" state changes on click | smoke: DOM snapshot of board rows before/after clicking every gated control is unchanged |

## Hard forbiddens
- Fake generation/calculation/export/send persistence; fake success wording («تم/حُفظ/(تجريبي)» /
  "saved/sent/done"); row/status mutation.
- Computed metric/percentage/prediction/forecast/average-as-derived-value; `<canvas>`/chart/plotting.
- Backend/API/websocket/network of any kind; new hook/storage key/dependency.
- `href="#"`; raw locale keys; dead buttons.

## Honest wording
- All gates use the standing Spec-026 phrasing («يُتاح بعد ربط الخادم» / "available once the server
  is connected") via `enhance.js`'s existing `acknowledge()` — never invented copy.

## Acceptance
- Smoke `FAKE`/no-fake-success guard runs on `reports.html#view=monthly`/`#view=analysis` (AR+EN)
  with 0 hits; post-click board state unchanged; 0 external request; both tabs are display-only over
  authored fixtures; all existing reports/payHit/finance/child-view/Spec 026-036 asserts stay
  byte-verbatim.
