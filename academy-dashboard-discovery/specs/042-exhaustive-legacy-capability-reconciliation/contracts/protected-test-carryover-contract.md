# Contract 13 — Protected-Test Carryover

**Canonical sources**: `protected-test-carryover.md` (the register this contract operationalizes) · `plan.md`
D11 · baseline `de8d552` (Spec 041; 16/16 mutations executed RED, residue 0).

**Bound parties**: every future spec 043–057 that touches, adds to, or is verified by the test suites.

## 1. The inherited gate list, by site (all must stay green, unmodified unless classified per §2)

| Gate | Site | Enforces |
|---|---|---|
| Build | `app/scripts/build-html.mjs` | exactly **115** HTML from **57** bases |
| Smoke | `app/tests/smoke/run.cjs` | 114 loads · no raw keys · no external requests · no dead buttons · no unexplained disabled controls |
| A11y **R-2** | `app/tests/a11y/run.cjs:393` | `critical > 0 \|\| serious > 0` ⇒ exit 1 (a machine gate since 041 — before that, "serious=0" was reported but UNENFORCED for ten specs) |
| Screenshots **R-3** | `app/tests/screenshots/capture.cjs:556` | any captured console error ⇒ exit 1 (before 041 the runner always exited 0) |
| **`ROUTES_50`** (T-03) | `app/tests/smoke/run.cjs` | every nav id pinned to its exact route string; falsified by M-2 (real-but-wrong page) — the G-1 closure |
| Route matrix · repeated-destination census · 24 seeded deep-links (48 exec) · orphan-set guard · menu 50 · pages 115 · planned/coming-soon 0 · sole honest lock · hash-aware `langRoute()` · topbar fragment (D-3) · role isolation · D-1 direct-surface (13 fields/1 Save/0 drawers) | `app/tests/smoke/run.cjs` | each mutation-backed (M-1…M-14 per `protected-test-carryover.md` §3) |

**R-2 and R-3 may never be relaxed, thresholded, allow-listed or suppressed.** The §4 product-law asserts
(teacher pay-free `PAY28` · family zero-pay · child-view · no-fake-money · no-secret · no-fake · no computed
score/chart · zero `href="#"`) are protected in the same way.

## 2. The three-way change classification (every future test change is exactly one)

1. **Additive coverage** — new asserts/rows/frames that cannot weaken an existing guarantee. No declaration
   needed beyond normal review; existing assert text stays byte-verbatim.
2. **Strengthening** — an existing gate made harder to pass (e.g. a warn → a hard exit). Declared as such;
   never renumbered as a supersession.
3. **Declared supersession** — an existing protected assert changes meaning. MUST carry all six fields:
   **old code · new code · evidence · reason · neighbors** (the byte-verbatim asserts around it, proving nothing
   else moved) **· mutation proof** (a mutation that fails the NEW assert).

**The no-silent-weakening law**: deleting, rescoping, loosening, skipping, or `catch()`-swallowing a protected
assert without a declared supersession is a review failure regardless of intent. A missing selector must FAIL a
test that opens it — the Spec-041 lesson where 8 rows silently audited the wrong surface is not repeatable.

## 3. The T061/G-1 lesson (law)

> A test that cannot fail is not a test, and a task that was never run is not done.

Spec 041 marked task T061 `[X]` claiming "Done: 50/50 match" for a test block that had **never been written**;
mutation M-2 (`staff` → `library.html`, a real but wrong page) passed the entire suite with exit 0. Therefore:
**any spec 043–057 that claims a guarantee MUST ship the falsifying mutation that makes its guarding assertion
fail** — run one-per-fresh-isolated-copy, never on the primary tree, restored to residue 0.

## 4. The PAY28 word-boundary warning

`PAY28` (teacher pay-free GLOBAL) is **word-boundaried by design**: a naive `/SAR/i` matches the persona name
**"Sara"**. Do NOT "improve", simplify, or re-anchor this regex while adding coverage — a broadened token list
must be additive and word-boundaried, with the existing expression retained byte-verbatim.
`teacher-performance.html` remains the single sanctioned admin exempt board.

## 5. The owned carry-forward defect

The **30 pre-existing `f-fbAdd-*` duplicate ids** (3 id names × 10 page files, Spec-032 nested drawer lineage;
counting bases reconciled in `protected-test-carryover.md` §5) are **owned by Spec 044**, scheduled, and must not
be silently "discovered" again — nor silently fixed by a non-owner. The honest claim stays "0 introduced, 0 on
the D-1 surface", never "0 sitewide". When 044 repairs them, the fix ships with its falsifying mutation (per §3)
and a new duplicate-id gate classified as **additive**.
