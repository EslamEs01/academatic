# Contract — Smoke Coverage

All additions are **additive**; every protected regex/assert (role-law, no-fake, 026–034) stays **byte-verbatim**. One sanctioned amendment only: the route-freeze count 113→115.

## Must assert (new Families/Students block)
1. **Count/route-freeze** = 115; `schedule-search.html` + `.en` load (added to smoke PAGES).
2. **Nav flips** — `familyCategories`→`families.html`, `scheduleSearch`→`schedule-search.html`, `studentResult`→`student.html#view=results`, `studentEvaluation`→`student.html#view=evaluation`; each is a real anchor (not `data-coming-soon`/«قريبًا»); `plannedNavAnchors===0`; exactly 4 status changes; **families category 0 planned**; admin-menu **50** items.
3. **Hash-route link integrity** — the nav/link check strips `#…` and confirms the target file exists (`student.html`), so the deep-links are not dead links; optionally assert `#view=results`/`#view=evaluation` tab ids exist in student.html.
4. **schedule-search** — search form + `#ss-results` + empty state render; a facet select narrows visible rows (client-side); Book/Assign = `data-disabled-reason`/`aria-disabled`; **0 external request** on load + interaction; **no** pay/`type=file`/`type=password`/`<canvas>` token; `FAKE` guard clean.
5. **student deep-links** — `student.html#view=results` shows the Results tab; `#view=evaluation` shows the Evaluation tab; **no new** computed score/rank/GPA/%/chart token; `result-summary.js`/`evaluation-rubric.js` byte-identical.
6. **familyCategories fold** — families.html/.en load; category filter present; `fam-cat` drawer + gated Save present; no fake mutation.
7. **Global honesty** — `href="#"`=0; raw-keys=0; dead-buttons=0 (existing base checks extend to the new page).
8. **Role-law carryover** — `payHit`/`payFigure`/`famPay`/child-view + all 026–034 asserts pass byte-verbatim.

## Sanctioned amendments (record in the smoke diff header)
- route-freeze 113→115 + the `schedule-search` base added to the smoke PAGES list.
- If any existing families-panel «قريبًا» probe relied on a planned item in that panel, repoint it to a category that still has one (families now has 0 planned) — additive, honesty-preserving.

## Forbidden
- Rewriting/relaxing any protected regex; removing any existing assert; making a fake behavior pass.
