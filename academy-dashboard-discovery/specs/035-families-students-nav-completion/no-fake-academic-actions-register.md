# No-Fake Academic Actions Register (Spec 035)

Every write in the four scoped surfaces ends at an honest gate; no academic value is ever computed or persisted. This register is the binding contract for the plan/tasks phase.

| # | Forbidden behavior | Where it could sneak in | Required honest treatment | Acceptance check |
|---|---|---|---|---|
| NF-01 | **Fake booking** | schedule-search "Book / Add-to-schedule" final | `data-disabled-reason` gate (`backendRequired`); no slot marked booked, no row added | smoke: schedule-search final is `data-disabled-reason` / `aria-disabled`; 0 fake-success toast |
| NF-02 | **Fake schedule assignment** | schedule-search "Assign teacher/room" final | same gate; no assignment persists | smoke: no assign toast claims "assigned/done/saved" |
| NF-03 | **Fake category save** | `fam-cat` "Save category" on families.html | keep existing `fam.cat.reclassReason` gate byte-identical; INERT select | smoke: `fam-cat` gate present + unchanged; category select has no persist listener |
| NF-04 | **Fake result calculation** | student.html Results tab (deep-link target) | display authored `Student.results` literals only; no arithmetic | smoke/grep: no computed score/%/GPA newly introduced; `result-summary.js` byte-identical |
| NF-05 | **Fake evaluation calculation** | student.html Evaluation tab (deep-link target) | display authored categorical ratings; no total/average | smoke/grep: no rubric total/number; `evaluation-rubric.js` byte-identical |
| NF-06 | **Fake publish / export / PDF** | Results Export/Print; any schedule-search export | Export stays `disabled` gate; Print stays honest "available once server connected" toast; **no** `window.open`/`blob:`/`.pdf` | smoke g-guard: 0 `.pdf`/`window.open`/`blob:` in new bodies |
| NF-07 | **Computed score / rank / percentile / GPA / percentage** | any of the four surfaces | authored literals only; hand-rolled `progressBar` from a literal is display, never derived | smoke/grep: no new ranking/aggregation token; no `<canvas>`/chart |
| NF-08 | **Chart / canvas** | schedule-search results, results/evaluation | none — labeled chips + lists + hand-rolled bars only | smoke: 0 `<canvas>` in all new/changed bodies |
| NF-09 | **Row / status mutation** | schedule-search results after "book"; fam-cat after "save" | no DOM mutation implying persistence on any final | smoke: post-click, result rows/category unchanged |
| NF-10 | **Backend / API / websocket / dependency** | schedule-search "search" action | client-side filtering of authored fixtures only (existing `filterBar` `data-facet` pattern); **no** network call; `package.json` 0-diff | smoke: 0 external request on schedule-search load + interaction; `package.json` unchanged |
| NF-11 | **Fake success wording** | every final across all four surfaces | Spec-026 wording — «يُتاح بعد ربط الخادم» / "available once the server is connected"; never «تم/حُفظ/(تجريبي)» / "saved/sent/done" | smoke `FAKE` guard byte-verbatim, runs on schedule-search |
| NF-12 | **type=file / type=password / credential / secret** | schedule-search form; any drawer | none rendered | smoke g-guard: 0 `type=file`/`type=password`/credential input in new bodies |

## Standing pattern reuse (no new hook / storage key / engine)
- Search = the existing `filterBar` `targetId` + `data-facet` client-side narrowing already used on schedule/students/families (display filtering of authored rows is an established, honest pattern — NOT a backend query).
- Gates = existing `data-disabled-reason` / `data-reason-key` + `aria-disabled` mechanism.
- Deep-links = existing `#view=` tab hash (tabs.js / enhance.js).
- Fold = existing `fam-cat` drawer + families category filter.
