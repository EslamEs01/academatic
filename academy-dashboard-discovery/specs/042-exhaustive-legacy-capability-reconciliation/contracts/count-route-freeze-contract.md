# Contract 12 — Count & Route Freeze

**Canonical sources**: `count-and-impact-contract.md` §2 (the frozen invariants, verified at baseline `de8d552`)
· `plan.md` D4 (57-vs-58 semantics) · `protected-test-carryover.md` §3 (test-side pins) ·
`page-and-route-reconciliation.md` (route census) · `spec.md` §6 (scope of change: NONE).

**Bound parties**: Spec 042's own phases (which change nothing) and every future spec 043–057 (which may change
a count only by declaring it).

## 1. The nine frozen invariants and where each is verified

| # | Invariant | Value | Verification site |
|---|---|---|---|
| 1 | Public HTML files | **115** | `ls app/public/*.html` · smoke page-freeze assert |
| 2 | Page bases (`PAGES`) | **57** | `app/scripts/build-html.mjs` (build gate: exactly 115 from 57) |
| 3 | Admin menu items | **50** | `app/src/js/nav.config.js` · smoke menu-freeze (4 independent sites) |
| 4 | Route split deep / plain / route-less | **24 / 25 / 1** | `nav.config.js` · smoke derived route matrix + `ROUTES_50` |
| 5 | implemented / planned / disabled | **49 / 0 / 1** | `nav.config.js` · smoke planned-0 census |
| 6 | `FUTURE_ROUTES` | **`{}`** | `nav.config.js` (source audit in smoke) |
| 7 | Honest locks | **1** — `classSalaryReport` (route-less, `nav.reason.finance`) | `nav.config.js` · smoke lock assert (M-4-backed) |
| 8 | Orphan set | exactly `{gallery.html, gallery.en.html}` | derived over all 115 files · smoke orphan guard (M-11/M-12-backed) |
| 9 | `[data-coming-soon]` | **0** | built output (`app/public/**`) · smoke coming-soon census |

The smoke **`ROUTES_50` register** (`app/tests/smoke/run.cjs`, Spec 041 T-03) pins every nav id to its exact
route string, cross-checked 50/50 against the checked-in route inventory — the test cannot redefine its own
expectation. It is the closing of gap G-1 and is protected (see `protected-test-carryover-contract.md`).

## 2. 57 vs 58 semantics (plan.md D4 — frozen)

**57 = the bilingual `PAGES` bases** (AR/EN pairs → 114 files). **`index.html` is the ONE additional single-file
review unit**: 57×2+1 = 115. Visual/page review may speak of **58 review units**; no document may rename this
"58 `PAGES` bases", and no count contract changes because of the review-unit phrasing. The sanctioned repeated
destination remains exactly one (`salaries` + `staffSalaries` → `finance.html#view=salaries`).

## 3. Future count changes are declared by the future spec — 042 pre-applies none

- Spec 042 (specify, plan, and tasks phases alike) changes **no** invariant. A count that changes during 042 is
  a **STOP** (`count-and-impact-contract.md` §4, `spec.md` §10).
- A future spec that genuinely needs a count change **declares it in its own spec** with the proposal fields of
  `count-and-impact-contract.md` §4 (capability · evidence path · count impact · menu impact · owning spec ·
  why-not-now), plus the test-change classification of `protected-test-carryover-contract.md` for every frozen
  assert it must re-pin.
- Worked example, pre-authorized as a *proposal path only*: **057 may propose +1 base for the C14-27 branded 404
  page** (`future-spec-allocation-register.md` §18). If accepted there, 115 → 117 (a base is always ×2
  languages) with every affected invariant re-pinned by 057 — **nothing is pre-applied by 042**, and no other
  spec inherits this example as permission.
- A count change without a declaration — including one produced accidentally by a rebuild — fails the zero-diff
  proof (`scope-and-zero-diff-contract.md`) and is treated as an unreviewed change, not a delivery.
