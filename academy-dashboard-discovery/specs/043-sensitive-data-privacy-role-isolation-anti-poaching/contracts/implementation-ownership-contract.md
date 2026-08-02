# Contract 1 — Implementation Ownership & the 17-row 2/12/3 Model (executable)

Reproduces the canonical ownership table from `../owned-row-reconciliation.md` §"Implementation-ownership table"
as the **executable** disposition for the plan. Mechanically parsed this plan phase: **17 rows · 17 unique
capIds · 0 missing · 0 unexpected · 0 duplicate · Class(1)=2 · Class(2)=12 · Class(3)=3 · total 17**.

## The three implementation classes (what 043's own implement phase does per class)

- **Class (1) — direct 043 frontend implementation (2)**: `C12-09`, `C12-13`. → an actual source edit
  (child-view gate removal; parent-contact registry rows) + guard + mutation.
- **Class (2) — already-safe baseline + 043-owned executable guard (12)**: `C01-27, C02-06, C03-13, C04-22,
  C09-19, C12-02, C12-19, C14-09, C15-01, C15-02, C15-03, C15-18`. → the implementation IS the executable guard
  + mutation that freezes the current safe posture.
- **Class (3) — 043 policy registry/preview + FUTURE_BACKEND enforcement (3)**: `C02-04`, `C02-05`, `C12-01`. →
  a structure-only registry/preview on an existing host + guard + mutation; enforcement stays backend.

## Per-row executable disposition (17 rows, each once)

| capId | Class | 043 implement-phase deliverable | Guard | Mutation |
|---|---|---|---|---|
| C12-09 | (1) | remove `passwordChange` (`portal.js:323`), student-profile only | child-view supersession `smoke:1971`/`:2082` | MUT-3 |
| C12-13 | (1) | add 5 parent-contact rows to `PERM_GROUPS` (deny-by-default) | G3+G11 | MUT-2+MUT-6 |
| C12-01 | (3) | the parent-contact registry as a display-only preview; model ratified | G3+G11 | MUT-6 |
| C02-04 | (3) | teacher capability policy preview (academic rows), structure-only | teacher-policy census | MUT-TP |
| C02-05 | (3) | teacher notification policy rows (salary_* excluded), structure-only | teacher-policy census (0 pay) | MUT-TP |
| C01-27 | (2) | no-admin-link + data-absence guards on portal pages | G6 | MUT-9 |
| C02-06 | (2) | no Left/Acquired, no country column on teacher surfaces | G1 | MUT-1 |
| C03-13 | (2) | portal→no-admin-link; teacher bodies bake no admin data | G6 | MUT-9 |
| C04-22 | (2) | no WhatsApp-insights PII/URL; connection-health contract-only | G8 | MUT-4 |
| C09-19 | (2) | display-only RBAC preview + honest not-enforced wording | G14 | MUT-10 |
| C12-02 | (2) | model decision recorded; preview enforces nothing (honest) | G14 | MUT-10 |
| C12-19 | (2) | retained UNKNOWN; no fake impersonation surface | (no-fake) | (covered by no-fake) |
| C14-09 | (2) | DST table has no Affected-Accounts column | DST-column-absent census | (freeze) |
| C15-01 | (2) | retained UNKNOWN; no login UI invented | (no-fake-login) | — |
| C15-02 | (2) | no auth claimed; demo state stated honestly | G14 | MUT-10 |
| C15-03 | (2) | recorded prerequisite; not simulated | (no-fake wording) | MUT-10 |
| C15-18 | (2) | data-absence guarantee; no-admin-link census | G6 | MUT-9 |

`C12-01` shares the parent-contact registry implementation surface with `C12-13` but stays a **Class-(3)** row
(C12-13 is Class (1)); shared implementation never reclassifies/omits/double-counts either.

## Machine check (STOP if it fails)

`node` parser over `../owned-row-reconciliation.md` must yield 17 unique / 0 missing / 0 unexpected / 0 dup /
2-12-3. Any drift = STOP (ownership no longer parses). No MISSING/PARTIAL row is closed by assigning it to a
dependent spec — every row above has a 043 implement-phase deliverable.
