# Contract — Targeted Visual Grounding

**Obligation:** implementation MUST trace to first-hand evidence, not memory.

## Definition of done
- The plan grounding note (`plan.md`) is filled for all four items with exact paths → DONE.
- Each decision cites current-app source line(s) + legacy evidence path + prior-spec register row.
- No decision invents pay, salary, rank, score, percentage, or chart behavior.

## Evidence ledger (must stay accurate)
| Item | Current app | Legacy | Prior spec |
|---|---|---|---|
| addTeacher | teachers.js:105/112, teacher-actions.js:28-30/45-63 (`trn-add`, pay omitted :36) | management-teachers-create.md (Salary/Payout/Zoom/password) | 033 CS-10 · 032 FC-22 |
| teacherCategories | teachers.js:70-84/105/110 (`trn-categories`) | management-teacher-categories(.-create/-members).md | 033 CS-11 · 028 T-K · 032 FC-24 |
| sessionsKpi | teacher-performance.js (flat board, no tabs); tabs.js | management-class-feedback.md (Percentage + session count) | 033 CS-12 · 028 performance-metric-scope |
| monthlyPerf | teacher-performance.js; tabs.js | management-teacher-feedback.md (Percentage + note) | 033 CS-13 |

## Acceptance
- A reviewer can open each cited path and see the claimed surface/behavior. Re-ground if any citation is stale at implement time.
