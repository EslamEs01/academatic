# Implementation Plan: Corrections From Legacy Coverage Audit

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `academy-dashboard-discovery/specs/024-corrections-from-legacy-coverage-audit/spec.md`
**Companions**: [evidence-review.md](./evidence-review.md) · [correction-scope.md](./correction-scope.md) · [research.md](./research.md) · [data-model.md](./data-model.md) · [quickstart.md](./quickstart.md) · [contracts/](./contracts/)

## Summary

Spec 024 implements the Spec 023 correction backlog (B-01…B-11, Must + Should fix) so the rebuilt academy dashboard is cleanly aligned with the legacy system before Spec 025 Teacher Internal Pages. It is a **correction/alignment** spec: it reframes the leftover Student-primary child-view note (B-01, the only visible page-content change), records ownership/gate/exclusion decisions (B-02/B-04/B-06/B-07/B-08/B-09), adds honest gates reusing existing patterns where chosen (B-03/B-05), verifies no living-rework deletion (B-10), and runs one small pure-CSS visual-density pass (B-11). **No new pages, no backend, no fake behavior; public HTML count stays 77.** Technical approach: locale-key edits (ar/en) + a rebake of 6 child-view pages with a **declared supersession of the Spec 022 documented extraction-hash baseline** (smoke uses structural probes, so counts are unchanged); optional single non-anchor planned nav items (B-05/B-06) reusing the `is-planned` pattern; an honest role-shell notifications gate reusing the existing `data-action="notifications"` action (B-03, no new hook); additive living-layer CSS for B-11; and documentation records for the decision/provenance items.

## Technical Context

**Language/Version**: Native ES modules (browser JS); Node for build/test scripts; no framework.
**Primary Dependencies**: none added — static HTML-first build (`build-html.mjs`), closed `data-*` hook set, `enhance.js`/`portal-shell.js`/`portal-page.js`, `ar/en.prt.js` overlays, `app.css` additive living layer. NO CDN/SPA/chart/animation library.
**Storage**: none (fixtures only; zero storage keys added).
**Testing**: `tests/smoke/run.cjs` (structural DOM probes + pay/finance token scans + anchor/plannedNav registries), `tests/a11y/run.cjs` (axe critical/serious = 0), `tests/screenshots/capture.cjs`.
**Target Platform**: GitHub-Pages-compatible static site; Django-template-ready; Arabic RTL default + English LTR; Light/Dark/System; mobile 390.
**Project Type**: Static multi-page web app (role portals + admin console).
**Performance Goals**: n/a (static). **Constraints**: 77 public HTML exactly; teacher pay-free GLOBAL; family zero-pay; no fake actions; no `href="#"`; no new hook/storage key; student demoted-not-deleted; admin/family/teacher primary; all motion inside one `prefers-reduced-motion: no-preference` block.
**Scale/Scope**: 11 correction items over ~6 source files + a rebake of 6 child-view page pairs + documentation. No new modules.

## Constitution Check

*`.specify/memory/constitution.md` is an unfilled placeholder; the binding "constitution" is the CLAUDE.md hard-constraints block + the Spec 016 design freeze + the Spec 022 contracts. Gates evaluated against those:*

| Gate | Status | Note |
|---|---|---|
| Static HTML-first, no SPA/CDN/chart/animation lib | PASS | 024 adds only locale/CSS/doc edits + optional nav items |
| Closed `data-*` hook set, no new hook/storage key | PASS | B-03 reuses existing `data-action="notifications"`; B-05/B-06 reuse the `is-planned` button pattern |
| Teacher pay-free GLOBAL | PASS | B-07 records an exemption for the pre-existing admin board; no teacher pay wording added; token scan stays zero-hit |
| Family zero-pay | PASS | no family payment tokens; `famPay` stays green |
| No fake actions; honest gates; zero `href="#"` | PASS | notifications/library/chat = honest gates or records only |
| Student demoted-not-deleted; family owns child journey; roles primary | PASS | B-01 aligns wording to the corrected model; no role change |
| 77 public HTML; no new page | PASS | rebake only; count unchanged |
| Byte-freeze respected via declared supersession | PASS | B-01/B-11 pinned-body changes ship a declared 022-hash supersession + smoke re-pin |
| Reduced-motion honored | PASS | B-11 motion stays inside the single quarantine block |

**Result**: no gate violations; no unjustified complexity. Proceed.

## Project Structure

### Documentation (this feature)

```text
academy-dashboard-discovery/specs/024-corrections-from-legacy-coverage-audit/
├── spec.md                  # WHAT + WHY (done)
├── evidence-review.md       # Targeted Evidence Gate record (done)
├── correction-scope.md      # per-item scope table (done)
├── plan.md                  # this file (Phase 0/1 output)
├── research.md              # D1–D22 decisions (Phase 0)
├── data-model.md            # correction entities (Phase 1)
├── quickstart.md            # build/verify runbook (Phase 1)
├── contracts/               # 16 per-item + safety contracts (Phase 1)
└── checklists/requirements.md  # spec-quality + correction gates (done)
# tasks.md — NOT created here (Phase 2, /speckit-tasks)
```

### Source Code — files the later implementation MAY touch

```text
academy-dashboard-discovery/app/
├── src/
│   ├── locales/ar.prt.js, en.prt.js      # B-01 note reframe; B-05/B-06 planned labels; B-03 gate copy; B-11 empty-state copy
│   ├── js/fixtures/portal.js             # B-05/B-06 optional planned nav items (ROLE_NAV.teacher)
│   ├── js/components/portal-shell.js     # B-03 Option A only: role-shell notifications gate (reuse existing action)
│   └── styles/app.css                    # B-11 additive living-layer density fixes
├── public/
│   ├── student-*.html + .en pairs        # B-01 rebake output (6 pages × 2 langs)
│   └── assets/locales/*, assets/*        # rebake output of shared locale/CSS
├── tests/smoke/run.cjs                   # B-01/B-11 structural re-pin; gate assertions
├── tests/a11y/run.cjs                    # B-03/B-11 a11y coverage if UI added
├── tests/screenshots/capture.cjs         # B-01/B-11 visual proofs
├── screenshots/REVIEW.md                 # visual-acceptance notes
└── README.md                             # B-08/B-09 provenance
CLAUDE.md                                 # B-08/B-09 provenance + plan pointer
academy-dashboard-discovery/specs/016-…/contracts/teacher-pay-free-global-contract.md  # B-07 exemption
academy-dashboard-discovery/specs/023-…/                                               # append-only status/coverage notes (B-02/B-04/B-08/B-10)
```

**Forbidden files**: `build-html.mjs`, `package.json`, `nav.config.js` (unless B-02 chooses a proven-safe documentation-only note), `enhance.js` (unless a B-03 hard blocker proves it necessary), `topbar.js`, any admin/teacher-internal page source, any new page module, any backend/API/auth, any external dependency.

## Phase 0: Research

See [research.md](./research.md) — resolves D1–D22 (evidence-gate sufficiency, per-item strategy, hash-supersession method, chosen options for B-03/B-05/B-06, protection strategies, guards, risks/stop-conditions). All decisions recorded with rationale; zero NEEDS CLARIFICATION remain.

## Phase 1: Design & Contracts

- **[data-model.md](./data-model.md)** — correction entities (correction item, child-view note, honest gate, provenance record, hash supersession, planned nav item) with fields, validation rules, and the explicit "no fake data model" boundary.
- **[contracts/](./contracts/)** — 16 contracts: `evidence-gate-contract.md`, `b01`…`b11` per-item, plus safety contracts `pay-zero-safety-contract.md`, `smoke-rescope-contract.md`, `mobile-a11y-screenshot-contract.md`, `impact-protection-contract.md`, `scope-guard.md`. Each states allowed/forbidden edits + machine-checkable acceptance.
- **[quickstart.md](./quickstart.md)** — build/verify runbook (build → smoke → a11y → screenshots) with the exact grep/count/scan gates.
- **Agent context**: CLAUDE.md SPECKIT block gets a plan pointer (this file); narrative preserved.

### Post-design Constitution re-check

All Phase-1 artifacts hold the gates above: no new hook/page/engine introduced by any contract; every pinned-body change carries a declared supersession; pay-free/zero-pay contracts are strengthened, never weakened. **PASS.**

## Complexity Tracking

No constitution violations to justify. The only non-trivial mechanic is the B-01/B-11 hash supersession, which follows the established Spec 022 family-child precedent (documented baseline change + structural smoke re-pin), not a new pattern.

## Stop conditions (carried into implementation)

Stop and report if: public HTML count ≠ 77 · a new page/hook/storage key is needed · a teacher or family pay token appears · student-primary wording remains after B-01 · the family/teacher role notes change accidentally · a role-shell notifications gate would need a new engine · the live-room cannot be recorded honestly · B-11 grows into a redesign · a smoke hash change cannot be explained · the admin/family/teacher role model regresses.

## Phase 2

NOT started. `/speckit-tasks` will generate `tasks.md` from this plan on request. No tasks, no implementation, no commit in this step.
