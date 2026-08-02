# Implementation Plan: Spec 042 — Exhaustive Legacy Capability & Page Reconciliation (Orchestration Layer)

**Branch**: `feature/012-role-portal-foundation` | **Date**: 2026-07-16 | **Spec**: `spec.md` (this directory)
**Input**: the COMPLETED, adversarially-verified (20/20 PASS) Spec-042 reconciliation corpus — 15 cluster
audits · 380-row capability ledger · 227-row allocation register · 57(+1)-base partition · 6 cross-cutting
ledgers · 3 registers · `checklists/requirements.md`.

---

## Summary

Spec 042's specify phase produced the evidence. **This plan converts that evidence into a thin, executable
orchestration layer for Specs 043–057** — binding contracts, a dependency graph, an evidence-reuse protocol,
and verification obligations — **without duplicating a single ledger and without changing a single application
byte**. Spec 042 itself remains documentation-only; its "implementation" (the `/speckit.tasks` phase, when
invoked) consists of ratifying contracts and seeding the 043–057 charters, never of touching `app/**`.

The plan answers, with binding decisions D1–D14: which findings are binding vs preservation laws; who owns
each category; which specs depend on which; which page groups may run in parallel; which counts and tests stay
frozen; how later specs consume the evidence without re-crawling; how the redesign improves the product
without becoming a generic corporate ERP; and how every future implementation proves it did not reintroduce
rejected legacy behavior.

## Technical Context

**Language/Version**: N/A — documentation-domain planning (Markdown artifacts only). The *subject* product is
the frozen static app (native JS, no build deps) at `academy-dashboard-discovery/app/`, baseline `de8d552`.
**Primary Dependencies**: none added. Consumers: the SpecKit workflow (`.specify/`), the Spec-041 protected
test suite (inherited read-only), the Codex execution notes (D12 — tool routing, not a dependency).
**Storage**: files under `specs/042-exhaustive-legacy-capability-reconciliation/` only.
**Testing**: no new tests (Spec 042 adds zero). Verification = the documentation-domain obligations in
`data-model.md` (VerificationObligation) + the inherited Spec-041 gates, which stay green by construction.
**Target Platform**: repository documentation; GitHub-renderable Markdown.
**Project Type**: specification/orchestration (docs-only).
**Performance Goals**: N/A.
**Constraints**: zero-diff on `app/**`; count/route freeze (115 · 57 · 50 · 24/25/1 · 49/0/1 · `{}` ·
orphan pair); closed 12-word disposition set; no invention beyond evidence; watcher owns commits.
**Scale/Scope**: 15 future specs (043–057) · 227 allocated gap rows · 380 capability rows · 58 review units.

**NEEDS CLARIFICATION**: none. Every open planning question is enumerated and resolved in `research.md`
(R1–R8); no question requires new evidence beyond the completed corpus.

## Constitution Check

`.specify/memory/constitution.md` is an unfilled template (no project constitution was ever ratified). The
**de-facto constitution** for this repository is the standing law set carried in `CLAUDE.md` (Specs 001–041
hard constraints) plus this spec's own `count-and-impact-contract.md` and `protected-test-carryover.md`.
Gates evaluated against that de-facto constitution:

| Gate | Verdict |
|---|---|
| Documentation-only: zero `app/src`/`tests`/`public`/`scripts`/`package*` bytes change | **PASS** — plan writes only `specs/042/**` (+ the SpecKit CLAUDE.md marker refresh, D14) |
| Count/route freeze (115 · 57 · 50 · 24/25/1 · 49/0/1 · `FUTURE_ROUTES {}` · orphan pair · lock 1) | **PASS** — frozen, re-derived at plan time |
| Closed disposition set; no reinterpretation (D3) | **PASS** |
| No invention: UNKNOWN_EVIDENCE stays unknown with its owner | **PASS** |
| Protected tests: no edit, no weakening; future changes classified (D11) | **PASS** |
| No new hook / storage key / dependency / page / route / nav item | **PASS** — nothing that runs is created |

**Post-Phase-1 re-check** (after contracts/data-model/quickstart were generated): all six gates still PASS —
every generated artifact is referential documentation.

## Project Structure

### Documentation (this feature)

```text
specs/042-exhaustive-legacy-capability-reconciliation/
├── spec.md                                   # specify phase (complete, committed)
├── [19 specify-phase ledgers/registers]      # complete, committed — NEVER duplicated here
├── cluster-audits/C01..C15-audit.md          # complete, committed
├── cluster-evidence-paths/C01..C15-paths.md  # complete, committed
├── checklists/requirements.md                # adversarial 20/20 PASS (specify phase)
├── plan.md                                   # THIS FILE (/speckit.plan)
├── research.md                               # Phase 0 — planning questions R1–R8 resolved
├── data-model.md                             # Phase 1 — documentation-domain model (17 entities)
├── quickstart.md                             # Phase 1 — how a future spec consumes 042 (5 worked examples)
└── contracts/                                # Phase 1 — 15 binding handoff contracts (see D13)
```

### Source Code (repository root)

```text
academy-dashboard-discovery/app/   # FROZEN. Read-only subject of the audit. Zero-diff boundary.
```

**Structure Decision**: docs-only feature; no source structure is created. The application tree appears above
solely to state its frozen status.

---

## The plan: binding decisions D1–D14

### D1 — Thin referential layer; canonical artifacts; stable IDs

The plan and its contracts **reference** the specify-phase corpus by path + stable ID; they never restate it.
Stable ID namespaces (defined in `data-model.md`): `Cnn-mm` capability rows (audits + ledger) · `RJ-nn`
rejected behaviors · `UK-nn` unknown evidence · `P-nn` cross-role lifecycles (cross-role map) and privacy rows
(privacy findings — namespaced by document) · `B-x.y` preservation findings · `S-nn`/`G-nn`/`U-nn`/`I-nn`/
`A-nn` privacy sub-registers · group IDs `045…050`. A contract that needs a fact cites the row, never copies
the table. **Anything not citable by path+ID is not a planning input.**

### D2 — Artifact precedence (resolves the one discovered conflict)

Precedence for any disagreement among 042 artifacts:
**cluster audits (normalized tables) → consolidation ledgers/registers → prose sections → pre-consolidation
proposals.** Applied to the ONE conflict found during planning: `visual-quality-and-academic-design-audit.md`
§10 carries an older *proposed* 58-page partition that differs from `page-review-ownership-map.md` §2. The
**ownership map is canonical and binding** (it is what the adversarial review verified as check 15); visual
§10 is a historical draft input, already labeled "proposed", and is NOT edited (042 ledgers stay untouched —
no contradiction of *fact* exists, only a superseded draft). Encoded in
`contracts/page-review-partition-contract.md`.

### D3 — Dispositions are verdicts, not backlog

The closed 12-word set stands. Binding interpretation rules:
- **REJECTED_\*** (63 ledger rows → 52 RJ register entries) = *negative requirements*. Never backlog. Every
  future spec inherits them as MUST-NOT-EXIST assertions (`contracts/rejected-legacy-behaviour-contract.md`).
- **INTENTIONALLY_IMPROVED** (57 rows) + the 63 B-register findings = *preservation laws*. Regression = review
  failure (`contracts/current-product-improvement-preservation-contract.md`).
- **UNKNOWN_EVIDENCE** (28 rows / 47 UK entries) = *no-invention holds*. Only new evidence (a fresh capture, a
  backend answer, a user decision) may resolve one — never inference
  (`contracts/unknown-evidence-no-invention-contract.md`).
- **FUTURE_BACKEND** (40 rows) = honest-gate holds. The owning spec builds the honest surface; the *execution*
  waits for a real backend. Faking it is a REJECTED_NO_FAKE violation.
- **HONEST_LOCK** (5 rows) = **one** physical lock (`classSalaryReport`) seen from five cluster records
  (C03-14 · C06-13 · C07-23 · C08-08 · C09-23). The physical/navigation lock count is exactly **1**; 057
  verifies its persistence. No document may re-read this as "five locks."

### D4 — 57 vs 58 semantics (frozen)

**57 = the bilingual `PAGES` bases** (AR/EN pairs, 114 files). **`index.html` is the one additional
single-file review unit** (57×2+1 = 115). Visual review may speak of **58 review units**; nothing may rename
this "58 PAGES bases," and no count contract changes. (`contracts/count-route-freeze-contract.md`.)

### D5 — Future-spec dependency graph (the recommended law, evaluated)

The recommended graph was evaluated against the allocation register and the cross-role map. It survives with
**three formalizations** (a–c below). Result (full edge list + rationale per edge in
`contracts/future-spec-dependency-contract.md`):

```text
Wave 0 (foundations, parallel):    043 ∥ 044
Wave 1 (page groups, parallel):    045 · 046 · 047 · 048 · 049 · 050   [three-gate — see (a): specify/diagnose
                                   on ratified contracts · implement isolated on frozen interfaces · MERGE only
                                   on green applicable 043/044 implementations]
Wave 2 (feature charters):         051 (043,044) · 052 (043 + own integrity contract) · 053 (043,044) · 054 (043,044,053)
Wave 3 (reconciliation):           055 (after 045–050 land; 053/054 for channel-dependent legs)
Wave 4 (census):                   056 final field-level census (after 045–050 and 055)
Wave 5 (freeze):                   057 (after all; owns lock verification, 404 proposal, final re-freeze)
```

- **(a) THE THREE DEPENDENCY GATES** *(corrected 2026-07-16 — the original "contracts ratified = merge-ready"
  rule was rejected as unsafe: a ratified privacy rule does not prove the rendered page obeys it; a frozen
  modal API does not prove the shared implementation exists; a provider contract does not prove an operational
  room exists)*:
  - **Gate 1 — SPECIFY/PLAN START.** A dependent spec may be specified and planned once the relevant
    foundation **contracts are ratified**. Diagnosis and targeted visual grounding are **ungated** — they may
    begin immediately.
  - **Gate 2 — IMPLEMENTATION START.** Implementation may begin **in an isolated branch/worktree** once (i)
    the applicable interfaces/contracts are **frozen**, (ii) the owned file boundaries are known (the
    partition), and (iii) single-writer conflicts are prevented (contract 14 §3). Parallel work is expected —
    but it may **not claim integrated completion**.
  - **Gate 3 — MERGE/COMPLETION.** A dependent implementation may **not be declared complete or merged** until
    the applicable foundation **implementation and its tests are available and green**. Contract ratification
    alone is NEVER sufficient for this gate. Concretely for 045–050: a page handling protected data merges
    only after the applicable **043 frontend protection is implemented and verified**; a page using the shared
    modal/drawer/long-form system merges only after the applicable **044 shared implementation** and its
    focus/keyboard/backdrop/scroll/mobile/RTL-LTR/duplicate-id/required-selector/a11y tests are **green**.
    A page that does not exercise a given 043/044 capability may proceed only with an **explicit
    non-applicability proof** in its own plan/tasks; **no page may duplicate a pending 044 component locally**
    to dodge the dependency. 043 itself: server-side enforcement stays FUTURE_BACKEND, but fixtures and
    rendered surfaces must already obey the ratified visibility law (protected data not rendered · secrets
    not rendered · cross-role direct-link claims honestly gated · no wording claiming backend authorization
    exists). 054: the 053 provider **contract** opens Gates 1–2 only; claiming or merging an **operational**
    Zoom/Meet room lifecycle requires the 053 provider **seam implemented and verified** — otherwise the
    feature stays explicitly gated and join surfaces claim nothing. Full per-spec gate rules:
    `contracts/future-spec-dependency-contract.md` §6.
- **(b) 056 ownership vs execution split.** 056 owns 82 field-set rows as the *accountable auditor*; the safe
  field sets for a page group's owned surfaces are *delivered inside that group's review* (guided by
  `forms-completeness-ledger.md` + the 044 host system), then **verified by 056's final census**. The
  allocation register already models this (page groups appear as secondary deps on 056 rows). This keeps 055's
  producers real without making 056 a bottleneck mid-graph.
- **(c) 052 has no incoming legacy-debt edge — and remains chartered** (D6).
The graph is **acyclic** (verified in the dependency contract by wave numbering; every edge points to a lower
wave).

### D6 — Spec 052 is a greenfield charter, not a cancelled spec

052 has **0 allocated reconciliation rows** — correctly: the only legacy "recognition" evidence (computed
Percentage / Top Performer, C08-09) is REJECTED_NO_FAKE. 052 enters via its **own future scoping**: privacy-safe
recognition designed from fresh evidence + privacy law, with a **real backend requirement for any computed
standing** (no client-side ranking, ever). Known 042 inputs it inherits as *context, not debt*: the visual
audit's recognition rows (V-F1, D-4), the privacy map's audience-scoping rules (P-09/P-11: guardian-facing,
never a ranking), and 043's audience-scoping foundation. (`contracts/future-spec-dependency-contract.md` §052.)

### D7 — Page-review partition is binding and immutable during planning

The `page-review-ownership-map.md` §2 partition (045:11 teacher · 046:12 family · 047:12 child-view+session
lifecycle · 048:8 back-office+scheduling ops · 049:7 reports/courses/content · 050:7+`index`) is preserved
verbatim — arithmetic 11+12+12+8+7+7 = **57** ✓ + index→050. A page may move only by **explicit supersession
of the ownership map** with evidence, dependency justification, arithmetic proof, zero overlap, zero orphan.
This plan moves **none**. (`contracts/page-review-partition-contract.md`.)

### D8 — Visual redesign handoff (Priority 1: Teacher, Family)

`contracts/academic-visual-redesign-handoff-contract.md` binds Specs 045–050 to: the NOT/IS objective lists
(no ERP clone, no AI-slop dashboard, no mechanical template; yes cheerful academy identity, hierarchy, useful
density, friendly states, RTL/LTR, mobile-first, a11y, deliberate dark mode); the 11-step per-page loop
(reopen legacy screenshots → open current screenshots → inspect source → diagnose → preserve improvements →
fix owned gaps → complete page-level forms/states → improve overlays under 044 → **render + inspect after
implementation** → iterate until academy-alive → the 8-surface test matrix). The visual audit's verdict frames
the work: **the identity is already won — this is completion + de-ERPing, not a repaint**; the five
fix-first items (§11) are pre-seeded to their owners (045 quick-tiles lie · 047 UI-states band · 044 pager ·
044 mobile drawer · 048 stale finance strings — `finance` ∈ 048 per the D7 partition; the visual audit's §11
«049» tag follows its SUPERSEDED §10 draft partition (D2) and is corrected here). A design is **not complete
because the source looks correct** — the browser/screenshot loop is mandatory.

### D9 — Privacy / role-law handoff

`contracts/privacy-role-isolation-handoff-contract.md` binds 043 (and transitively every spec) to: teacher
never sees guardian/student contact data (anti-poaching); student/child-view never receives adult/admin data;
unrelated families are isolated; **hiding a link is not authorization** (direct fetch must be deniable —
FUTURE_BACKEND, honest about it until then); integration secrets never render (structure-only rows stand);
meeting links are role-, session- and time-scoped (054 consumes); community/leaderboard visibility is
audience-scoped (051/052 consume); the S-01…S-08 / P-01…P-09 / G-01…G-03 findings map to 043 requirements by
ID. RBAC itself = FUTURE_BACKEND — 043 ratifies the *rules*; enforcement needs the real backend.

### D10 — Modal / drawer / form handoff

`contracts/modal-drawer-form-handoff-contract.md` binds 044 + 056: the 30 `f-fbAdd-*` duplicate ids are 044's
(fix = uniquify the nested drawer, a 10-page body change with its falsifying mutation); missing-selector
silent test passes become forbidden (a drawer a test opens must fail the test if absent); no decorative
subset may stand in for an evidenced long form; every evidenced-safe field ships, sensitive/pay/secret fields
stay omitted or structure-only; required/optional/conditional is explicit; validation/help/error states are
specified (the ledger's "~0 validation" systemic gap is 044-system + 056-census work); overlay focus/Esc/
backdrop/scroll/mobile/RTL are test obligations; 056 runs the final census after the page groups.

### D11 — Protected-test inheritance

`contracts/protected-test-carryover-contract.md` operationalizes `protected-test-carryover.md`: every future
test change is classified **additive coverage** / **strengthening** / **declared supersession** (old code ·
new code · evidence · reason · neighbors · **mutation proof**). No silent weakening or deletion. The inherited
gate list (ROUTES_50 · 115/57 build · 24/25/1 · planned 0 · sole lock · orphan pair · R-2 serious-a11y hard
gate · R-3 console-error hard gate · role-law/no-fake asserts incl. word-boundaried PAY28) is enumerated by
site. New guarantees ship with their falsifying mutation — the T061/G-1 lesson is law.

### D12 — Codex execution routing (planning note, not a dependency)

Specs 045–050 are expected to execute with **Codex**: **Sol High** for visual direction, IA, dashboard
redesign, complex CSS/layout, screenshot interpretation, high-risk pages, final visual critique; **Sol
Medium** for mechanical page updates, responsive adaptations, locale parity, test additions, screenshot-matrix
expansion, deterministic guards. **Claude Opus**, when used, acts as the independent contract/visual critic —
never editing the same file concurrently with Codex. The implementation workflow MUST include a real
browser/screenshot loop; source-reading is never visual acceptance.
(`contracts/code-model-routing-and-visual-validation-contract.md`.) This is tool routing guidance — it adds
no application dependency.

### D13 — Contract set (15, consolidated where lawful)

The 15 recommended contracts are created as 15 files — each carries a distinct law domain; no two share a law,
so no consolidation is warranted (and none was invented to pad the count):
1 `evidence-reuse-and-targeted-grounding-contract.md` · 2 `capability-disposition-and-ownership-contract.md` ·
3 `page-review-partition-contract.md` · 4 `future-spec-dependency-contract.md` ·
5 `academic-visual-redesign-handoff-contract.md` · 6 `privacy-role-isolation-handoff-contract.md` ·
7 `modal-drawer-form-handoff-contract.md` · 8 `cross-role-propagation-handoff-contract.md` ·
9 `current-product-improvement-preservation-contract.md` · 10 `rejected-legacy-behaviour-contract.md` ·
11 `unknown-evidence-no-invention-contract.md` · 12 `count-route-freeze-contract.md` ·
13 `protected-test-carryover-contract.md` · 14 `code-model-routing-and-visual-validation-contract.md` ·
15 `scope-and-zero-diff-contract.md`.

### D14 — Impact boundary of this plan phase

Writes: `plan.md` · `research.md` · `data-model.md` · `quickstart.md` · `contracts/**` (all inside this spec
directory) + the CLAUDE.md `<!-- SPECKIT -->` marker-block refresh the standard workflow requires (reported
separately). **Nothing else.** Specify-phase ledgers are not edited (the one conflict is handled by precedence,
D2). `app/**` stays byte-identical. If a real contradiction in a specify-phase ledger is ever discovered:
STOP and report before editing — never silently rewrite the audit.

---

## Phase 0 — Research (output: `research.md`)

Questions resolved (no NEEDS CLARIFICATION remain): **R1** dependency ordering 043–057 (→ D5) · **R2**
evidence reuse without re-crawl (→ contract 1) · **R3** 57-base vs 58-review-unit semantics (→ D4) · **R4**
zero-debt 052 as a valid greenfield charter (→ D6) · **R5** improvements as protected requirements (→ D3,
contract 9) · **R6** how redesign specs PROVE visual improvement (→ D8, contract 14) · **R7** safe Codex
Sol High/Sol Medium routing (→ D12) · **R8** how later specs declare explicit supersessions (→ D11,
contracts 3/12/13).

## Phase 1 — Design (outputs: `data-model.md`, `contracts/`, `quickstart.md`)

- `data-model.md`: the documentation-domain model — 17 entities (EvidenceSource, ScreenshotEvidence,
  RawRecordEvidence, CapabilityRecord, CapabilityDisposition, PageReviewUnit, PageReviewGroup, GapOwnership,
  FutureSpec, DependencyEdge, PreservationRule, RejectedBehavior, UnknownEvidence, CrossRoleLifecycle,
  FormAuditRecord, OverlayAuditRecord, VerificationObligation) with identifiers, required fields, invariants,
  relationships. No migrations, no backend models.
- `contracts/`: the 15 contracts of D13 — thin, referential, ID-addressed.
- `quickstart.md`: the 10-step consumption protocol + 5 worked examples (043 privacy · 045 teacher redesign ·
  052 greenfield leaderboard · 054 meeting lifecycle · 056 complete-form audit).

## Verification obligations (for the later `/speckit.tasks` phase — NOT run now)

1. Zero-diff proof on `app/**` (git). 2. Count/route re-derivation (nine invariants). 3. Partition arithmetic
re-proof. 4. Ledger-total spot re-count (380/227/52/47/63). 5. Adversarial plan review 15/15 (already run at
plan time — see `checklists/requirements.md` addendum). 6. No tasks.md / no implementation in this phase.

## Stop conditions

A count changes · a specify-phase ledger needs a factual edit (STOP + report first) · an `app/**` diff appears ·
a page moves groups without a declared supersession · a disposition is used outside the closed set · evidence
is invented for an UNKNOWN_EVIDENCE row. **No commit · no push · no merge · no rebase · no pull · no branch ·
no stash · no reset · no checkout · no clean — the watcher commits.**

## Complexity Tracking

No constitution-gate violations to justify — the plan introduces zero projects, zero dependencies, zero
patterns beyond referential Markdown.
