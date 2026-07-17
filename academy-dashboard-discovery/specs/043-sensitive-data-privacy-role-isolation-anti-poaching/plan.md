# Implementation Plan: Sensitive Data Privacy, Role Isolation & Anti-Poaching (Spec 043)

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-17 | **Spec**: [spec.md](./spec.md)
**Baseline HEAD**: `cd56aa0` (re-measured, not copied) | **Wave**: 0 (foundation; 044 parallel)
**Ponytail**: lite (subordinate to spec/contracts/evidence/protected-tests/Targeted-Visual-Grounding; never simplifies away a privacy/a11y/test/mutation requirement)

## Summary

Spec 043 is an **independently implementable Wave-0 frontend privacy foundation**. Its own
`/speckit.implement` phase delivers **five outcomes** (child-view account correction · parent-contact
deny-by-default registry · teacher capability/notification policy preview · global privacy guards G1–G14 ·
existing-safe executable freeze) — all green **before** any dependent spec (045–056) reaches Gate 3. Real
authorization/authentication/enforcement stay `FUTURE_BACKEND` and are never faked.

The technical approach is the **smallest honest existing-host solution**, grounded field-by-field against the
current source (see `research.md` for the evidence trace):
- **Child-view (C12-09)**: delete ONE fixture line — `passwordChange` from `STUDENT_PAGES.profile.gates`
  (`fixtures/portal.js:323`). `student-profile.js` renders the array generically, so it drops 3→2 gates with
  **no page-renderer change**. Family (`portal.js:380`) and teacher (`teacher-profile.js:83-85`, inline, no
  fixture) gates are **untouched**.
- **Parent-contact registry (C12-13/C12-01/G-01)**: add ONE group of 5 deny-by-default rows to `PERM_GROUPS`
  (`fixtures/staff-management.js:34-45`) + 6 `adm.staff.perm.*` locale keys. `permDrawer()`
  (`staff.js:42-52`) maps `PERM_GROUPS` generically, so it renders them with **no `staff.js` change** —
  already dispatched via the existing `data-drawer="st-perm"` kebab (`enhance.js:156`).
- **Teacher capability/notification policy (C02-04/C02-05)**: a structure-only `capabilityPolicyDrawer('trn-policy')`
  on the existing teacher admin host (`teacher.js`) mirroring the shipped `availabilityDrawer()` precedent
  (`teacher.js:131-137`), fed by a new structure-only `TEACHER_CAPABILITY_POLICY` registry in
  `fixtures/teacher-management.js` + a `trn.policy.*` locale block; the legacy `salary_*` notification row is
  **excluded** (pay-free). No new component, no new page, no new hook.
- **Guards G1–G14 + the freeze**: additive smoke assertions + the ONE declared child-view supersession
  (`smoke:1971`/`:2082`), each paired with a Spec-043-owned falsifying mutation.

**Impact: exactly 6 changed page bodies** (`staff`, `teacher`, `student-profile` × AR/EN); every other body
byte-identical; **0 new page bases**; counts frozen 115/57/50/24-25-1/49-0-1; `FUTURE_ROUTES {}`.

## Technical Context

**Language/Version**: ES2020 vanilla JS (no framework); static HTML-first build (`build-html.mjs` bakes
`public/*.html` per language). **Primary Dependencies**: none added (Playwright is the existing test-only dep).
**Storage**: none — fixtures only; theme+language are the only real writes (unchanged). **Testing**: Node
smoke (`tests/smoke/run.cjs`, Playwright), a11y (`tests/a11y/run.cjs`, axe), screenshots
(`tests/screenshots/capture.cjs`). **Target Platform**: static site (GitHub-Pages compatible, RTL-first
AR + LTR EN, light/dark). **Project Type**: static frontend web app. **Constraints**: no new
dependency/hook/storage-key/page/route; 0 `type=password`/`type=file`/`<canvas>`; no real PII; no fake
authorization; the closed `data-*` hook set; counts frozen. **Scale/Scope**: 115 built pages; this spec
changes 6 bodies + 4 locale files + 3 fixtures + 1 page renderer + 3 test files.

## Constitution Check

*GATE: must pass before Phase 0 research; re-checked after Phase 1 design.*

`.specify/memory/constitution.md` is the **unfilled Spec-Kit template** (placeholders only). The binding
constraints for THIS project are the **CLAUDE.md SPECKIT marker** + the **Spec-042 contracts** + the Spec-043
specify artifacts, which this plan treats as the constitution. Gates evaluated against them:

| Gate | Status |
|---|---|
| Frontend-only; no backend/engine; no new dependency | ✅ PASS — no dep/engine/backend introduced |
| No new page/route/nav-item; counts frozen 115/57/50/24-25-1/49-0-1; `FUTURE_ROUTES {}` | ✅ PASS — 0 new bases, folds into existing hosts |
| Closed `data-*` hook set; no new hook/storage key | ✅ PASS — reuses `data-drawer`/`data-disabled-reason`; enhance.js 0-diff |
| No-secret (0 `type=password`/`type=file`/`<canvas>`/PAN/value slot) | ✅ PASS — structure-only rows |
| Teacher pay-free GLOBAL (PAY28); family zero-pay; child-view law | ✅ PASS — `salary_*` excluded; child-view password gate removed |
| No-fake authorization/backend honesty | ✅ PASS — display-only previews; honest gates; FUTURE_BACKEND wording |
| Protected-test carryover (no weakening beyond the ONE declared supersession) | ✅ PASS — additive + 1 declared 2-line supersession, mutation-backed |
| Ponytail subordinate to privacy/a11y/tests/mutations/Targeted-Visual-Grounding | ✅ PASS — smallest honest solution; nothing simplified away |

**No violations.** Complexity Tracking table below is empty (no deviations).

## Project Structure

### Documentation (this feature)

```text
specs/043-sensitive-data-privacy-role-isolation-anti-poaching/
├── plan.md              # this file
├── research.md          # Phase 0 — grounded decisions + evidence trace
├── data-model.md        # Phase 1 — the doc-domain entities (registries, guards, gates)
├── quickstart.md        # Phase 1 — the exact implement recipe (edit list + verify loop)
├── contracts/           # Phase 1 — 15 execution contracts (below)
└── (spec.md + the 21 specify artifacts, already committed)
```

### Source Code (the exact allowlist this plan authorizes — evidence-derived, `contracts/allowed-forbidden-files-and-stops.md`)

```text
academy-dashboard-discovery/app/
  src/js/fixtures/portal.js            # DELETE 1 line: passwordChange @ STUDENT_PAGES.profile.gates:323
  src/js/fixtures/staff-management.js  # ADD 1 group (5 deny-by-default rows) to PERM_GROUPS:34-45
  src/js/fixtures/teacher-management.js# ADD TEACHER_CAPABILITY_POLICY structure-only registry
  src/js/pages/teacher.js              # ADD capabilityPolicyDrawer('trn-policy') + a tab-panel trigger
  src/locales/ar.adm.js, en.adm.js     # ADD parent-contact keys (adm.staff.perm.g.parents + i.*)
  src/locales/ar.trn.js, en.trn.js     # ADD trn.policy.* block
  tests/smoke/run.cjs                  # child-view supersession (2 lines) + G1–G14 additive asserts
  tests/a11y/run.cjs                   # additive MATRIX rows (changed surfaces)
  tests/screenshots/capture.cjs        # additive MATRIX rows (changed surfaces)
  screenshots/REVIEW.md                # additive Spec-043 review entry
```

**0-diff (confirmed, must not change — `staff.js`/`student-profile.js`/`family-profile.js`/`teacher-profile.js`
render from fixtures/locales generically)**: `nav.config.js` · `enhance.js` · `components/sidebar.js` · `i18n.js`
· `scripts/build-html.mjs` · `package.json` · `pages/staff.js` · `pages/student-profile.js` ·
`pages/family-profile.js` · `pages/teacher-profile.js` · all `components/*` · `app.css` (styles) · every
unrelated fixture/page/locale.

**Structure Decision**: single static-frontend project; the change surface is a minimal fixture+locale+one-page
edit set that folds every outcome into existing hosts — no new directories, no new modules.

## The five Spec-043-owned Wave-0 outcomes (executable architecture)

| # | Outcome | Owned rows | Files | Guard | Mutation | Contract |
|---|---|---|---|---|---|---|
| A | Child-view account correction (remove child password gate, student-profile only) | C12-09 | `portal.js` (−1 line); tests | child-view supersession `smoke:1971`/`:2082` (3→2) | **MUT-3** | `child-view-account-boundary-plan.md` |
| B | Parent-contact deny-by-default registry (5 rows on the staff RBAC host) | C12-13, C12-01 | `staff-management.js` (+1 group); `ar/en.adm.js`; tests | G3 (teacher-unreachable) + G11 (deny-by-default) source+DOM census | **MUT-2 + MUT-6** | `parent-contact-registry-plan.md` |
| C | Teacher capability/notification policy preview (structure-only) | C02-04, C02-05 | `teacher-management.js` (+registry); `teacher.js` (+drawer+trigger); `ar/en.trn.js`; tests | teacher-policy census (0 value slot / 0 enforcement / 0 pay / 0 contact) | **MUT-TP** (teacher-policy) | `teacher-capability-policy-plan.md` |
| D | Global privacy guards G1–G14 | C01-27, C02-06, C04-22, C09-19, C12-02, C12-19, C14-09, C15-* + B/C rows | `tests/smoke/run.cjs` (additive) | G1–G14 | **MUT-1,4,5,7,8,9,10,11** | `global-privacy-guards-plan.md` |
| E | Existing-safe executable freeze | the 12 Class-(2) rows | `tests/smoke/run.cjs` (additive) | freeze asserts | the same G-mutations | `global-privacy-guards-plan.md` §freeze |

Ownership tally reproduced + parsed 2/12/3 (17 rows, 0 missing/unexpected/dup): see
`contracts/implementation-ownership-contract.md`.

## Phase 0 — baseline result (Outline & Research)

- Branch/HEAD from git: `feature/012-role-portal-foundation` / `cd56aa0` (tally-correction commit present).
- Working tree clean; only the untracked `plan.md` template (this run) + the planning artifacts this run writes.
- Spec 042 committed; three-gate dependency law present. Spec 043 specify + both correction passes committed.
- No pre-existing `tasks.md`/`implementation-status.md`.
- Re-measured counts: **115 HTML · 57 PAGES · menu 50 · 24/25/1 · 49/0/1 · `FUTURE_ROUTES {}` · sole lock
  `classSalaryReport` · gallery pair** — all held.
- **Build**: byte-identical rebuild (0 changed public files) — committed output matches source.
- **Smoke**: PASS (114 loads, no raw keys / external requests / dead buttons / unexplained disabled).
- **a11y**: baseline run (critical=0 serious=0 expected; result recorded in the final report).
- **Impact baseline**: a non-destructive per-page `#page-body` md5 snapshot (115 rows) captured against HEAD in
  the scratchpad (never `stash`/`reset`/`checkout`) — the before/after basis (`contracts/impact-protection-plan.md`).

Research decisions are consolidated in `research.md`.

## Phase 1 — Design & Contracts

- `data-model.md` — the doc-domain entities (the 5 parent-contact permissions, the teacher capability/notification
  policy rows, the 14 guards, the 2 removed/kept gates).
- `contracts/` — 15 execution contracts (topics below).
- Agent context: the CLAUDE.md SPECKIT marker's "Active feature" line is refreshed to point to this plan (inside
  the marker only).

### The 15 planning contracts (all under `contracts/`)

1. `implementation-ownership-contract.md` — the 17-row 2/12/3 model, executable per-row disposition.
2. `child-view-account-boundary-plan.md` — outcome A (exact edit + supersession + MUT-3).
3. `parent-contact-registry-plan.md` — outcome B (exact PERM_GROUPS group + locale keys + MUT-2/MUT-6).
4. `teacher-capability-policy-plan.md` — outcome C (registry + drawer + trigger + MUT-TP).
5. `global-privacy-guards-plan.md` — G1–G14 exact test file, insertion point, scope, tokens, mutation, RED message.
6. `protected-test-supersession-plan.md` — the ONE declared 2-line supersession (six fields).
7. `mutation-protocol-plan.md` — MUT-1…MUT-10 + MUT-TP isolated-copy protocol.
8. `backend-honesty-contract.md` — no-fake authorization / FUTURE_BACKEND boundary.
9. `privacy-antipoaching-role-law.md` — the anti-poaching/role-visibility law binding the implementation.
10. `fixtures-and-locales-contract.md` — exact fixture shapes + bilingual locale keys.
11. `a11y-screenshots-plan.md` — the focused a11y/screenshot matrix for the 6 changed surfaces.
12. `count-route-freeze-plan.md` — the frozen counts + 0-new-page proof.
13. `impact-protection-plan.md` — the non-destructive before/after method + predicted 6 bodies.
14. `downstream-preservation-handoff.md` — 044–056 preserve/extend duties.
15. `allowed-forbidden-files-and-stops.md` — the exact allowlist, the 0-diff list, and the stop conditions.

## Complexity Tracking

*No constitution violations — no deviations to justify.*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | — | — |

## Stop conditions (binding for `/speckit.tasks` + `/speckit.implement`)

STOP and report if: baseline not clean; ownership no longer parses 17-unique/2-12-3; a standalone page/new route
is required; an existing host cannot render the policy rows without a new shared component; child removal would
alter family/teacher account behaviour; any teacher contact/pay/locality field is required; any frontend claim
needs real backend enforcement; a sensitive value/input is required; a protected assertion must be weakened
beyond the declared 2-line child-view supersession; count/menu/route/lock/orphan invariants cannot hold; a
`package.json`/`build`/`i18n.js`/`nav.config.js`/`sidebar.js`/`enhance.js` change becomes necessary; an unrelated
body must change; or evidence is missing/contradictory and would require guessing. (`contracts/allowed-forbidden-files-and-stops.md`.)

## Next

`/speckit.tasks` (NOT run here). No implementation, no commit, no push during planning.
