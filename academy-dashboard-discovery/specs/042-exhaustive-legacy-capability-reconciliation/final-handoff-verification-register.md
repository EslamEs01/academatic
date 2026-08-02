# Spec 042 — Final Handoff Verification Register (Specs 043–057)

**Written by**: task **T042** of `tasks.md` (documentation write; Spec 042 implements nothing that runs).
**Sources (thin — cited by path + stable ID, never restated)**: `contracts/future-spec-dependency-contract.md`
(§2 edges · §4a three gates · §5 charters · §6 per-spec gate rules) · `future-spec-allocation-register.md`
(§4–§18 rows, §19 totals) · `page-review-ownership-map.md` §2/§4–§9 · `quickstart.md` (consumption protocol +
worked examples) · the three law registers (preservation / rejected / unknown) · `protected-test-carryover.md`.
**Gate legend** (contract 4 §4a): **G1** specify/plan start (ratified contracts; diagnosis ungated) ·
**G2** implementation start (frozen interfaces · isolated branch/worktree · single-writer) ·
**G3** merge/completion (applicable foundation implementation + tests available and GREEN — ratification alone
NEVER suffices).
**Universal stop conditions** (every spec): an `app/**` edit outside the spec's declared scope · an undeclared
count/route change (`contracts/count-route-freeze-contract.md` §3) · a disposition outside the closed 12-word
set · re-proposing any RJ row · resolving a UK row by inference · regressing a preservation row · a test change
without additive/strengthening/declared-supersession classification + mutation proof
(`contracts/protected-test-carryover-contract.md`) · fake persistence/success of any kind.

| Spec | Rows | G1 entry | G3 merge/completion core |
|---|---|---|---|
| 043 | 17 | 042 contracts ratified (this register) | frontend visibility law implemented+verified on all rendered surfaces; backend enforcement stays FUTURE_BACKEND |
| 044 | 24 (+30 dup ids) | 042 contracts ratified | shared components implemented; nine test classes green; f-fbAdd uniquified with mutation proof |
| 045–050 | 8 · 4 · 8 · 7 · 7 · 7 | applicable 043/044 contracts ratified | per-page: applicable 043 protections + 044 components implemented+verified; 8-surface matrix + R-2/R-3 green |
| 051 | 2 | 043 + 044 contracts ratified | no unsafe audience/fake moderation/duplicated host; transport may stay gated |
| 052 | 0 (greenfield) | 043 rules + own integrity contract | no computed standing without real backend; exposure rules resolved |
| 053 | 17 | 043 + 044 contracts ratified | Configure surfaces on implemented 044 hosts; secrets structure-only; connections stay gated |
| 054 | 5 | 053 provider contract ratified | operational room lifecycle ONLY on implemented+verified 053 seam; join surfaces claim nothing without a real propagated room/link |
| 055 | 33 | producer/consumer pages exist (045–050; 053/054 for channel legs) | every touched lifecycle leg verified by OBSERVED propagation, not contracts |
| 056 | 82 | 045–050 + 055 landed | final field-level census vs `forms[].fields[]` raw records; field-less/decorative forms = FAIL |
| 057 | 6 | all prior specs merged | all G3 gates satisfied; counts/routes/lock/orphans re-frozen; final adversarial review |

---

## Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching
- **Scope**: contract 4 §5.1 — ratify per-role visibility rules (guardian/student contact data, PII classes),
  anti-poaching, no-secret; ship the honest gates; real RBAC enforcement = FUTURE_BACKEND.
- **Primary rows**: **17** (`future-spec-allocation-register.md` §4; 9 backend-prereq).
- **Inputs**: `privacy-and-sensitive-data-findings.md` (S-01…S-08 · P-01…P-09 · G-01…G-03 · U-01…U-03 ·
  I-01…I-06 · A-01/A-02) · `contracts/privacy-role-isolation-handoff-contract.md` · C12/C15 audits ·
  `quickstart.md` example 1.
- **G1**: this register + contract 6 ratified. **G2**: n/a beyond isolation discipline (043 is itself a
  foundation). **G3 (as a foundation for others)**: its frontend protections must be IMPLEMENTED AND VERIFIED
  before any dependent protected-data page merges (contract 4 §6.1–6.2).
- **Required proof**: rendered-surface audit (protected data not rendered · secrets not rendered · honest
  gates · zero backend-authorization claims) + mutation-backed assertions for each new guarantee.
- **Stop**: any wording implying backend authorization exists; any rendered guardian/teacher contact reachable
  by an unauthorized role surface; universal stops.

## Spec 044 — Modal, Drawer & Long-Form Interaction System
- **Scope**: §5.2 — the interaction-system implementation: long-form hosts, sticky action footers, gated
  affordances, nested-drawer uniquification, overlay a11y patterns.
- **Primary rows**: **24** (§5) **+ the 30 pre-existing `f-fbAdd-*` duplicate ids** (register §5 preamble;
  counting basis in `protected-test-carryover.md` §5).
- **Inputs**: `modal-drawer-interaction-ledger.md` · `contracts/modal-drawer-form-handoff-contract.md` ·
  `forms-completeness-ledger.md` §0 (the ~0-validation systemic gap).
- **G1**: contracts ratified. **G2** (for dependents): its component API frozen. **G3 (as a foundation)**: the
  applicable shared component implemented with **focus · keyboard(Esc) · backdrop · scroll · mobile · RTL/LTR ·
  duplicate-id · required-selector · a11y** tests green (contract 4 §6.3) before any dependent overlay page merges.
- **Required proof**: the nine test classes + the f-fbAdd fix's falsifying mutation + missing-selector
  hard-fail demonstrated.
- **Stop**: a dependent page duplicating a pending 044 component locally (§6.1); universal stops.

## Specs 045–050 — Bounded Page Review + Academic Visual Redesign
Common law (all six): `page-review-ownership-map.md` §2 partition is immutable without the six-condition
supersession (contract 3); the 11-step loop + 8-surface matrix + browser/screenshot acceptance are binding
(contracts 5/14); preservation rows asserted post-change (contract 9); RJ-absence asserted (contract 10);
Codex Sol High/Medium routing + single-writer (contract 14). **G1**: applicable 043/044 contracts ratified
(diagnosis ungated). **G2**: frozen interfaces + owned-file isolation. **G3**: applicable 043 frontend
protections + 044 shared implementations verified; matrix + R-2/R-3 green; non-applicability requires explicit
proof in the group's plan/tasks.

- **045 Teacher portal + teacher admin (11 bases, PRIORITY 1)** — rows **8** (§6); first work = the
  C01-16/C02-16/C15-14 quick-tiles fix (contract 5 §6.1). Teacher pay-free GLOBAL absolute. Stop: any pay
  token on a teacher surface.
- **046 Family portal + family admin core (12 bases, PRIORITY 1)** — rows **4** (§7). Family zero-pay;
  STATUS-FIRST billing; no corpus PII. Stop: any pay figure/PII on a family surface.
- **047 Student child-view + session lifecycle (12 bases)** — rows **8** (§8). Child-view law («عرض الابن»);
  no computed score/rank/chart. First work: the dashboard UI-states band (contract 5 §6.2).
- **048 Admin back-office + scheduling ops (8 bases)** — rows **7** (§9; 6 backend-prereq). Finance
  no-fake-money; settings no-secret; `classSalaryReport` lock untouched (057 verifies). First work: the stale
  finance strings (contract 5 §6.5 — owner corrected 049→048).
- **049 Reports, courses & groups, content (7 bases)** — rows **7** (§10). Reports finance-free forever; no
  chart/canvas/computed %; static certificate designer stands.
- **050 Control center, utilities, hub & shell (7 bases + index)** — rows **7** (§11; 2 backend-prereq).
  Gallery stays the frozen orphan pair; the hub keeps its honest notes.

## Spec 051 — Community, Moderation & Safe Social Interactions
- **Scope**: §5.9 — teacher chat surfaces under 043's `can_chat` grant model; moderation honest.
- **Primary rows**: **2** (§12). **Inputs**: C02/C11 audits (C02-15 · C11-11) · contract 4 §6.4 · contract 6.
- **G1**: 043 + 044 contracts ratified. **G2**: isolated. **G3**: no unsafe audiences, no fake moderation, no
  duplicated unimplemented interaction host; transport may remain honestly gated (053).
- **Proof**: audience-scoping assertions + gate honesty. **Stop**: a rendered cross-role contact leak; universal stops.

## Spec 052 — Recognition, Achievements & Privacy-Safe Leaderboards (GREENFIELD)
- **Scope**: §4c/§6.5 — **0 reconciliation rows by design** (register §13: the only legacy recognition
  evidence, C08-09 computed Percentage/Top-Performer, is REJECTED_NO_FAKE). A user-directed greenfield charter.
- **Inputs as context, never debt**: visual audit V-F1/D-4 · privacy P-09/P-11 (guardian-facing, never a
  ranking) · 043 audience-scoping · `quickstart.md` example 3.
- **G1**: 043 privacy rules + its OWN integrity contract. **G2**: isolated. **G3**: any computed standing
  requires a REAL backend; an authored recognition preview may exist only if it never claims computed
  standing; cannot merge with public-exposure rules unresolved.
- **Proof**: no-fake-ranking assertions + audience-scope tests. **Stop**: any client-side rank/percentile;
  universal stops.

## Spec 053 — Integrations Command Center
- **Scope**: §5.11 — every channel (WhatsApp/email/in-app/payment/payout providers) + the provider seam 054
  consumes. **Primary rows**: **17** (§14; 8 backend-prereq).
- **Inputs**: C09/C07/C11 audits · contract 6 (no-secret) · contract 7 (Configure drawer hosts) · RJ-26/27/28.
- **G1**: 043 + 044 contracts ratified. **G2**: isolated. **G3**: Configure surfaces only on implemented 044
  hosts; secrets stay structure-only (never a rendered value); real connection/payment behavior stays gated
  without a backend. Its **provider seam** must be implemented+verified before 054's G3 opens.
- **Proof**: structure-only census (0 value slots, 0 `type=password`) + gate honesty. **Stop**: an authored
  secret; a "Connected" claim without a backend; universal stops.

## Spec 054 — Embedded Virtual Classroom & Meeting Lifecycle
- **Scope**: §5.12 — cross-role lifecycle P-22 in full (rooms, presence, join surfaces).
- **Primary rows**: **5** (§15; 1 backend-prereq). **Inputs**: cross-role map P-22 · C01-15/C02-31/C03-08 ·
  contract 6 (role/session/time-scoped links) · `quickstart.md` example 4.
- **G1**: the 053 provisioning/provider CONTRACT ratified. **G2**: honest room/link STRUCTURE in isolation.
  **G3**: an operational Zoom/Meet lifecycle may be claimed/merged ONLY when the 053 provider seam is
  implemented and verified; without it the feature stays explicitly gated and student/family join surfaces
  claim no availability (contract 4 §3 + §6.7).
- **Proof**: a real propagated room/link observed end-to-end before any availability claim. **Stop**: a join
  control that implies a room exists when none does; universal stops.

## Spec 055 — Cross-Role Propagation & Workflow Consistency
- **Scope**: §5.13 — primary owner of the 26-lifecycle map; producers for consumer-only surfaces.
- **Primary rows**: **33** (§16; 7 backend-prereq). **Inputs**: `cross-role-propagation-map.md` (P-01…P-26,
  §4 scoreboard, §5 NEVER-PROPAGATE) · contract 8.
- **G1**: after 045–050 land (+ 053/054 for channel/room legs). **G2**: isolated. **G3**: every touched leg
  closed by an **OBSERVED propagation** (origin → transit → consumer), never by a ratified intention
  (contract 4 §6.8); each implementation names its P-ID and updates the leg status.
- **Proof**: per-leg propagation demonstrations. **Stop**: closing a leg from a contract; violating a
  NEVER-PROPAGATE refusal; universal stops.

## Spec 056 — Complete Forms & Data Capture Audit
- **Scope**: §5.14 — the accountable field-level auditor (D5b split: page groups DELIVER page-local field
  sets; 056 AUDITS the complete product).
- **Primary rows**: **82** (§17; 6 backend-prereq). **Inputs**: `forms-completeness-ledger.md` (48 audited ·
  26 PARTIAL · 13 MISSING · 9 field-less gates · ~0 validation) · contract 7 · `quickstart.md` example 5.
- **G1**: after 045–050 and 055. **G2**: isolated. **G3**: the census is complete only when every evidenced
  form is compared **field-by-field against `output/roles/*/pages/*.json → forms[].fields[]`**; a decorative
  subset or field-less gate standing in for an evidenced workflow = FAIL; sensitive/pay/secret fields stay
  omitted or structure-only.
- **Proof**: the full census table + per-form field-level comparisons. **Stop**: declaring a form complete
  without the field-level comparison; universal stops.

## Spec 057 — Final Production Freeze
- **Scope**: §5.15 — last, after ALL G3 gates are satisfied (contract 4 §6.10).
- **Primary rows**: **6** (§18) — the 5 HONEST_LOCK records (= the ONE physical `classSalaryReport` lock,
  verified persisted: `disabled` + `nav.reason.finance` + route-less) + C14-27 (the branded-404 **proposal**;
  any count impact is DECLARED there per contract 12 §3, never pre-applied).
- **G1**: all prior specs merged. **G3**: counts/routes/lock/orphan pair re-frozen; standing refusals + UK
  legs recorded as frozen decisions; a final adversarial review with mutation-backed guarantees.
- **Proof**: the re-frozen invariant table + the lock-persistence assertion. **Stop**: any unsatisfied
  prior-spec merge gate; universal stops.

---

**Totals cross-check**: 17+24+(8+4+8+7+7+7)+2+0+17+5+33+82+6 = **227** — equals `future-spec-allocation-register.md`
§19 and the ledger's non-complete row count (re-derived by tasks T007/T008/T044). One primary owner per row;
secondary dependencies stay informational (register §1).
