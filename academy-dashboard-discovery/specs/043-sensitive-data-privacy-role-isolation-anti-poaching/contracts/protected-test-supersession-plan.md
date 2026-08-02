# Contract 6 — Protected-Test Supersession Plan (the ONE declared change) — executable

Spec 043 makes exactly **one** protected-assert meaning-change: the child-view gate count. Everything else is
additive or strengthening. This is the full six-field declaration
(`../../042-exhaustive-legacy-capability-reconciliation/contracts/protected-test-carryover-contract.md` §2.3).

## The change (2 lines, `tests/smoke/run.cjs`, re-grounded exact)

| # | Site | OLD | NEW |
|---|---|---|---|
| 1 | `:1971` | `if (page === 'student-profile') ok(prt.plannedBackend === 3, `…photo/save/password…`)` | `=== 2`, comment `photo/save` |
| 2 | `:2082` | `expPlanned` entry `'student-profile': 3` | `'student-profile': 2` |

## Six declaration fields

- **old code**: the two `3`s above.
- **new code**: the two `2`s above.
- **evidence**: G-03 (`../../.../privacy-and-sensitive-data-findings.md` §8); `portal.js:323`; the child-view
  screenshot (3 gates → 2 after removal).
- **reason**: the child has no login; a password-change gate implies a non-existent account. Removing it makes
  the count 2. The child-view is «عرض الابن», not an adult account.
- **neighbours (byte-verbatim, MUST NOT move)**: family-profile assert `:2007` + map `:2083` (`'family-profile': 3`);
  teacher-profile assert `:2020` + map `:2084` (`'teacher-profile': 3`). The guardian and teacher are real
  account holders — a shared regex or an all-three edit would silently weaken them = review failure. **Only
  `student-profile` changes.**
- **mutation proof**: MUT-3 (re-add the child password gate → `student-profile plannedBackend === 2` RED).

## Classification of every 043 test change

- **Declared supersession (1)**: the two lines above.
- **Strengthening (2 sites)**: G7/G8 — broaden the settings-scoped real-PII regex (`:1287`) to a sitewide
  per-page census (a warn→hard/narrow→wide tightening; the existing settings assert stays as a subset).
- **Additive (all others)**: G1, G2, G3, G4, G6, G11, G12, G13, G14 asserts + the teacher-policy census + the
  a11y/screenshot MATRIX rows + the REVIEW.md entry — none can weaken an existing guarantee; existing assert text
  stays byte-verbatim.

## The no-silent-weakening law

Deleting, rescoping, loosening, skipping, or `catch()`-swallowing any protected assert (PAY28, famPay, M-8,
ROUTES_50, R-2, R-3, g32, planned===0, orphan, honest-lock, D-1, and the family/teacher neighbour asserts)
without a declared supersession = review failure. A missing selector must FAIL loudly. R-2 (`a11y:393`) and R-3
(`capture:555`) may never be relaxed/thresholded/allow-listed.
