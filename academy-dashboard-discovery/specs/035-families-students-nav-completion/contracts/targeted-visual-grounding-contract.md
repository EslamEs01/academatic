# Contract — Targeted Visual Grounding

**Obligation:** implementation MUST be traceable to first-hand evidence, not memory.

## Definition of done
- The plan grounding note (`plan.md`) is filled for all four items with exact paths → **DONE**.
- Each of the four decisions cites: (a) current-app source line(s), (b) legacy evidence path (or an audited "no legacy page" finding), (c) the prior-spec register row.
- No decision invents an aggregate board, computed academic figure, or availability engine.

## Evidence ledger (must remain accurate)
| Item | Current app | Legacy | Prior spec |
|---|---|---|---|
| familyCategories | families.js:32, family.js:68/149-165, families.js:39 | management-categories-families(.-create/-assign).md | 027 M-K · 032 FC-05 · 033 CS-06 |
| scheduleSearch | schedule.js:45-77 (browse), leads.js (precedent) | management-search-schedule.md | 027 M-S · 033 CS-07 |
| studentResult | student.js:233/242, result-summary.js | *no page* — management-student-1/forms-students | 016:37 · 027 M-R · 029 R-L · 033 CS-08 |
| studentEvaluation | student.js:234/243, evaluation-rubric.js | *no page* — management-families-feedback | 016:38 · 027 M-R · 029 R-F/US3 · 033 CS-09 |

## Acceptance
- Any reviewer can open each cited path and see the claimed surface/behavior. If a citation is stale at implement time, re-ground before coding.
