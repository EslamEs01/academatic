# Mutation Ledger

**Register:** M45-01–M45-16 in `contracts/verification-mutation-contract.md`.  
**Method:** fresh isolated copy, one mutation, exact intended RED, copy removal, primary GREEN, residue zero.

| Mutation | Isolated copy | One byte-level intent | Exact expected guard | Observed RED cause | Copy removed | Verdict |
|---|---|---|---|---|---|---|
| **M45-03** visible pay text | `/tmp/sp045-mut-M45-03-*` | `en.prt.js`: library title → `'My Library — salary 500 SAR'` | pay-free audit | `FAIL pay token on teacher-library.en.html → "salary"` | yes | **RED (causal)** |
| **M45-04** portal performance exposure | `/tmp/sp045-mut-M45-04-*` | `teacher-portal.js`: `perfHref` retargeted to `teacher-performance(.en).html` | portal/admin separation audit | `FAIL portal page teacher-portal.html references teacher-performance` (+ `.en`) | yes | **RED (causal)** |
| **M45-06** absence conflation | `/tmp/sp045-mut-M45-06-*` | `ar.trn.js`: `studentAbsent: 'غياب طلاب'` → `'غياب المعلّم'` | absence-integrity guard | first run **GREEN — guard hole**; after strengthening: `FAIL locale ar.trn.js: teacherAbsent and studentAbsent share the identical label "غياب المعلّم" — the two absence concepts have been conflated (FR-020)` | yes | **RED (causal) after fix** |
| **M45-07** broken deep link | `/tmp/sp045-mut-M45-07-*` | `teacher-portal.js`: quick-tile `href` → `teacher-nonexistent.html` | dead-link audit | `FAIL teacher-portal.html dead link → teacher-nonexistent.html` (+ `.en`) | yes | **RED (causal)** |

**Runner discipline.** `mutate.sh` copies `src` + `scripts` + `tests` + `public` into a throwaway
directory (symlinking `node_modules`, which is not part of the mutation surface), applies exactly one
textual mutation, rebuilds, and runs the exact guard that owns the broken guarantee. It **aborts if
the mutation does not textually apply**, because a no-op edit would otherwise produce a false GREEN;
and it **rejects a build failure as REJECTED rather than RED**, because a build break is not causal
evidence. The copy is removed by an `EXIT` trap. The primary tree is never touched.

**Mutation residue: 0** — `ls -d /tmp/sp045-mut-*` returns nothing after the runs.

### M45-06 — the guard hole this campaign actually found

The first M45-06 run came back **GREEN**, which is a failure of the guard, not a pass of the product.
The original check asserted only that *a* teacher-absence label and *a* student-absence label each
appear somewhere on the page. When `studentAbsent` was rewritten to `teacherAbsent`'s wording, a
sibling block elsewhere on the same page still supplied a matching student-absence phrase, so the
count-based check passed while the two concepts were, in fact, conflated — precisely FR-020's
forbidden state.

Fix: **additive guard G45-1** in `tests/smoke/run.cjs` checks the guarantee where the two values sit
side by side — the locale source. For every locale file it pairs `teacherAbsent` and `studentAbsent`
values in emission order and requires each pair to differ, requires the two keys to be defined an
equal number of times, and requires at least four pairs so the guard cannot pass vacuously. Re-run:
exact causal RED. This is the clearest evidence in the run that the mutation campaign is doing real
work rather than confirming what was already believed.

### Outstanding mutations

M45-01, 02, 05, 08, 09, 10, 11, 12, 13, 14, 15, 16 have **not** been run. They are outstanding work,
not passes.

No mutation has run before implementation. Syntax/load/fixture/unrelated failures will be rejected rather than counted.

---

## Protected-test supersession register (FR-062)

Every change to an existing protected assertion is recorded here with owner, the verbatim superseded text, the rationale, why the replacement is not a weakening, and the mutation that falsifies it. Additive guards are listed separately and need no supersession.

### S45-1 — teacher portal body-anchor pin

| Field | Value |
|---|---|
| Owner | Claude Opus (lead) — the supersession decision is lead-level even though the surrounding batch is Kimi's |
| File | `app/tests/smoke/run.cjs` (teacher-portal branch) |
| Superseded (verbatim) | `ok(prt.bodyAnchors === 1, '… the teacher page body must contribute exactly ONE anchor (the performance link) …')` and `ok(prt.anchorTargets.every((h) => /(^|\/)teacher-reports\.(en\.)?html$/.test(h)), '… Spec 025 repoint …')` |
| Lineage | Spec 022 / Spec 025 sanctioned-anchor registry |
| Why it must change | Those assertions were authored when the seven Teacher internal pages were **not reachable** from the home: `quickTiles()` emitted `is-planned` divs with a "soon" badge, so the body really did contain exactly one anchor. Spec 045 **FR-012** requires every implemented Teacher destination to be a working localized affordance instead of a false planned state. All eight `ROLE_NAV.teacher` entries carry `status: 'implemented'` and all eight pages are built, so the body necessarily contributes 1 + 7 = 8 anchors. Retaining `=== 1` would make the smoke suite **mandate the defect Spec 045 exists to fix**. |
| Replacement | Six assertions: exact `bodyAnchors === 8`; `qtileLinks === 7`; `qtileSoon === 0`; every expected localized target present; no unexpected target emitted; and no `teacher-performance` target ever. |
| Why this is a STRENGTHENING | The old pair constrained **one** destination and left the other seven entirely unconstrained (they were not anchors at all). The replacement pins the **exact localized target of all eight**, requires the quick-tile set to equal the implemented `ROLE_NAV` set exactly in both directions (missing **and** unexpected), and adds a zero-"soon" guard plus an admin-board-exposure guard that did not previously exist. A regression to the pre-045 rendering now fails **three independent assertions** instead of one. Zero assertions were deleted or relaxed. |
| Falsifying mutations | **M45-04** (expose `teacher-performance` in portal navigation → the new no-performance-target assertion goes RED) and **M45-07** (break one required deep link/trigger → the exact-target assertions go RED). |
| Status | Applied; RED→GREEN proof pending the M45 runs. |

