# Tasks: Spec 042 — Exhaustive Legacy Capability & Page Reconciliation (Orchestration Layer)

**Input**: `plan.md` (D1–D14, three-gate D5a) · `research.md` (R1–R8) · `data-model.md` (E1–E17) ·
`quickstart.md` · `contracts/` (15) · the committed specify-phase corpus (cited by path + stable ID)
**Branch**: `feature/012-role-portal-foundation` · **Baseline**: HEAD `a908fc6` (specify + plan + gate
correction committed; reviews 20/20 · 15/15 · 10/10 PASS)

**SCOPE LAW**: Spec 042 is **documentation-only**. Every task below is either **READ-ONLY verification**
(marked `RO`) or a **documentation write** (marked `DOC`) inside
`specs/042-exhaustive-legacy-capability-reconciliation/**` (+ the CLAUDE.md SpecKit marker, T053). **No task
touches `app/src/**`, `app/tests/**`, `app/public/**`, `app/scripts/**`, `package*.json`, previous specs,
navigation, routes, pages, components, locales or styles.** Page redesign, privacy/RBAC, modals/forms,
community, leaderboards, integrations and rooms belong to Specs 043–057 — generating their tasks here is
forbidden. Verification tasks are NOT checked off at generation time; each is completed only with its named
evidence. **No commit · no push · no merge · no rebase · no pull · no branch/stash/reset/checkout/clean** —
the watcher commits.

**Labels**: `[GATE]` three-gate law · `[PART]` partition · `[VIS]` visual handoff · `[HO-043/044/055/056]`
handoff verification · `[LAW]` preservation/rejection/unknown · `[FS]` future-spec readiness · `[PT]`
protected tests/counts. `SPEC` below = `academy-dashboard-discovery/specs/042-exhaustive-legacy-capability-reconciliation`.

---

## Phase 1 — Preflight & Frozen Baseline (all RO)

- [x] T001 Verify clean-ish tree + expected baseline lineage: `git status --porcelain` empty EXCEPT entries under `SPEC/**` and `CLAUDE.md` (this tasks file and later DOC outputs are expected dirt until the watcher commits); `git merge-base --is-ancestor a908fc6 HEAD` succeeds (the reviewed baseline is in the history — HEAD itself may have advanced by watcher doc commits); branch `feature/012-role-portal-foundation`. Governing: `contracts/scope-and-zero-diff-contract.md`. Done: both outputs captured verbatim into the T050 evidence block. (RO)
- [x] T002 [P] Verify 115 public HTML and 57+index bases: `ls academy-dashboard-discovery/app/public/*.html | wc -l` = 115; unique bases after stripping `.en` = 58 (57 mirrored + `index.html` single). Governing: `contracts/count-route-freeze-contract.md` §D4. Done: both numbers reproduced and recorded. (RO)
- [x] T003 [P] Verify nav freeze from `academy-dashboard-discovery/app/src/js/nav.config.js`: `item({` count = 50; deep (`#`) routes = 24; plain = 25; `status: 'disabled'` = 1 (`classSalaryReport`, `nav.reason.finance`, route-less); `status: 'planned'` = 0; `FUTURE_ROUTES` = `{}`. Governing: `contracts/count-route-freeze-contract.md`. Done: 24/25/1 + 49/0/1 + 50 reproduced. (RO)
- [x] T004 [P] Verify orphan set is exactly `{gallery.html, gallery.en.html}`: grep all 115 files for inbound `gallery` hrefs (expect 0) and confirm no other public file lacks an inbound link per the Spec-041 derivation. Governing: `contracts/count-route-freeze-contract.md`; `../041-route-sidebar-production-freeze/` orphan guard. Done: pair confirmed, no third orphan. (RO)
- [x] T005 [P] Verify application zero-diff across the whole 042 lineage: `git diff --stat de8d552..HEAD -- academy-dashboard-discovery/app` empty AND `git status --porcelain academy-dashboard-discovery/app` empty. Governing: `contracts/scope-and-zero-diff-contract.md`. Done: both empty, captured. (RO)

**Checkpoint 1**: any Phase-1 mismatch = STOP (count-and-impact-contract §4 — a changed count is a stop condition, never a task).

## Phase 2 — Canonical Artifact & Stable-ID Integrity (all RO)

- [x] T006 Verify exactly 15 cluster audits (`SPEC/cluster-audits/C01..C15-audit.md`) and 15 path registers (`SPEC/cluster-evidence-paths/C01..C15-paths.md`), each exactly once; no stray `clusters/` dir. Done: `ls | wc -l` = 15 + 15; stray-dir check negative. (RO)
- [x] T007 [P] Recount the master ledger: script-parse `SPEC/legacy-current-capability-ledger.md` → 380 rows; per-cluster counts C01:27 C02:34 C03:23 C04:26 C05:18 C06:29 C07:33 C08:17 C09:26 C10:27 C11:34 C12:21 C13:16 C14:29 C15:20; per-disposition totals match the 15×12 matrix; every capId unique. Governing: `contracts/capability-disposition-and-ownership-contract.md`. Done: script output = the ledger's own reconciliation section. (RO)
- [x] T008 [P] Recount the allocation register `SPEC/future-spec-allocation-register.md`: 227 rows; per-spec totals 043:17 · 044:24 · 045:8 · 046:4 · 047:8 · 048:7 · 049:7 · 050:7 · 051:2 · 052:0 · 053:17 · 054:5 · 055:33 · 056:82 · 057:6; disposition split 96 PARTIAL + 58 MISSING + 28 UNKNOWN_EVIDENCE + 40 FUTURE_BACKEND + 5 HONEST_LOCK. Done: all sums reproduced. (RO)
- [x] T009 [P] Recount registers: `SPEC/rejected-legacy-behaviour-register.md` RJ rows = 52; `SPEC/unknown-and-conflicting-evidence-register.md` UK rows = 47; `SPEC/current-product-better-than-legacy-register.md` B rows = 63. Done: three counts reproduced. (RO)
- [x] T010 [P] Verify 26 cross-role lifecycles P-01…P-26 in `SPEC/cross-role-propagation-map.md` §2 + the §4 scoreboard rows (26 mapped · 6 consumer-no-producer · 5 producer-no-consumer · 4 broken-both-ends · 11 field-less producers · 6 UNKNOWN legs · 7 refused legs). Done: IDs enumerated, scoreboard reproduced. (RO)
- [x] T011 [P] Validate stable-ID formats and the thin-layer law: regex-check `Cnn-mm`/`RJ-nn`/`UK-nn`/`P-nn`/`B-x.y` usage in the four plan artifacts + 15 contracts; confirm NO plan-phase artifact reproduces a canonical ledger table (spot-grep for >5-row verbatim table copies). Governing: plan.md D1. Done: 0 malformed IDs, 0 duplicated tables. (RO)
- [x] T012 Verify artifact precedence D2 is recorded: `contracts/page-review-partition-contract.md` names `page-review-ownership-map.md` §2 canonical and `visual-quality-and-academic-design-audit.md` §10 a superseded draft; the specify-phase visual audit itself is UNEDITED. Done: precedence text present; `git log -1 --format=%H -- SPEC/visual-quality-and-academic-design-audit.md` shows no post-`2c35d36` change. (RO)

## Phase 3 — Three-Gate Dependency Law (all RO)

- [x] T013 [GATE] Verify the three gates are defined with consistent semantics in ALL NINE sites: `SPEC/plan.md` (D5a), `SPEC/research.md` (R1), `SPEC/quickstart.md` (step 7), `SPEC/data-model.md` (E10), `SPEC/contracts/future-spec-dependency-contract.md` (§4a + §6), `SPEC/contracts/academic-visual-redesign-handoff-contract.md` (§5 merge gate), `SPEC/contracts/code-model-routing-and-visual-validation-contract.md` (§3 integration gate), `SPEC/checklists/requirements.md` (correction review), `CLAUDE.md` (marker block). Done: per-file Gate-1/2/3 presence matrix, 9/9. (RO)
- [x] T014 [GATE] Verify "ratification alone never satisfies Gate 3" is stated (not implied) in plan D5a, contract 4 §4a, contract 5 §5, contract 14 §3 and data-model E10 — and that NO artifact anywhere states the pre-correction rule outside an explicit rejection/supersession note (corpus-wide grep for ratification-sufficiency phrasing). Done: 5 affirmative sites + 0 unsafe residuals. (RO)
- [x] T015 [GATE] Verify E10 gate typing + monotonicity in `SPEC/data-model.md`: gate enum {gate-1, gate-2, gate-3, verification}; "a gate-3 record never opens before its matching gate-1/gate-2". Done: both present verbatim. (RO)
- [x] T016 [GATE] Re-derive acyclicity from `contracts/future-spec-dependency-contract.md` §2: extract every edge, map to (wave, spec-number), confirm every edge strictly decreases, incl. the intra-wave 054→053 resolution (§3). Done: edge table with pairs; 0 violations. (RO)
- [x] T017 [GATE] Verify the 045–050 gate rules in contract 4 §6.1: protected-data pages merge only on implemented+verified 043 frontend protection; overlay pages merge only on available+verified 044 shared implementation; explicit non-applicability proof required; local duplication of pending 044 components forbidden. Done: all four rules present, binding language ("may not"). (RO)
- [x] T018 [GATE] [HO-043] Verify the 043 rules in contract 4 §6.2 + contract 6: server-side enforcement stays FUTURE_BACKEND; fixtures/rendered surfaces already obey the visibility law (protected data not rendered · secrets not rendered · direct-link claims honestly gated · no wording claims backend authorization exists). Done: all four sub-rules present in both files. (RO)
- [x] T019 [GATE] [HO-044] Verify the 044 merge-test list in contract 4 §6.3 (and echoed in contract 5 §5): focus · keyboard · backdrop · scroll · mobile · RTL/LTR · duplicate-id · required-selector · a11y — all nine named as green-test preconditions for dependent merge. Done: 9/9 in both sites. (RO)
- [x] T020 [GATE] Verify the tail-of-graph rules: 053→054 provider-seam requirement (contract 4 §3 + §6.6/§6.7 — no operational-room claim from a contract alone; join surfaces claim nothing without a real propagated room/link) · 055 verifies REAL propagation legs, not contracts (§6.8) · 056 = final field census after page/workflow implementations (§6.9) · 057 last, requires ALL merge gates satisfied (§6.10) · 051 §6.4 (no unsafe audiences/fake moderation/duplicated hosts) · 052 §6.5 (backend-required ranking; authored preview never claims computed standing). Done: six rules verified verbatim. (RO)

## Phase 4 — Page-Review Partition (all RO)

- [x] T021 [PART] Set-equality re-proof: extract the six group base-lists from `SPEC/page-review-ownership-map.md` §2 AND `SPEC/contracts/page-review-partition-contract.md`; union = exactly the 57 bases derived from `app/public/` (strip `.en`, exclude `index`); zero duplicates; zero orphans; `index` explicitly in 050 marked outside the 57-base contract; the two documents agree list-for-list. Done: scripted set-diff = ∅ in all directions. (RO)
- [x] T022 [P] [PART] Verify group arithmetic 045:11 · 046:12 · 047:12 · 048:8 · 049:7 · 050:7(+index), sum 57, stated identically in map §2 and contract 3. Done: counts reproduced from the extracted lists (not read from prose). (RO)
- [x] T023 [P] [PART] Verify the priority law: Teacher portal ×8 + teacher admin = 045 and Family portal ×8 + family core = 046 — the EARLIEST groups — stated in map §1, contract 3, and contract 5 (Priority 1). Done: 3 sites confirmed. (RO)
- [x] T024 [PART] Verify the page-move supersession protocol in contract 3: evidence + dependency justification + arithmetic re-proof + zero overlap + zero orphan + explicit map supersession — all six conditions present and required conjunctively. Done: six conditions verified. (RO)

## Phase 5 — Academic Visual Redesign Handoff (all RO)

- [x] T025 [VIS] Verify the NOT list (no legacy cloning · no random gradients · no colour-without-hierarchy · no oversized-card-everything · no AI-looking dashboard · no generic corporate ERP · no mechanical one-template) AND the IS list (cheerful academy identity · comfortable lively colours · educational warmth without childishness · clear hierarchy · useful density · friendly informative states · human-designed composition · role-appropriate dashboards · consistent-not-monotonous · excellent AR RTL + EN LTR · mobile-first · accessible contrast/focus · strong light + deliberate dark · meaningful micro-interactions · cross-role continuity) are each present in `SPEC/contracts/academic-visual-redesign-handoff-contract.md`. Done: item-by-item checklist, 0 missing. (RO)
- [x] T026 [P] [VIS] Verify the 11-step per-page loop (incl. step 1 reopen EXACT legacy screenshots per owned page · step 2 open current screenshots · step 9 render+inspect AFTER implementation · step 10 iterate) + the 8-surface matrix (AR/EN · desktop/mobile · light/dark · empty/loading/error · overlays · keyboard/focus · console-error R-3 · a11y R-2) + before/after frame comparison + browser-based acceptance in contracts 5 §4–5 and 14 §4. Done: all steps/surfaces enumerated and found. (RO)
- [x] T027 [P] [VIS] Verify preservation is wired into the loop: P-1…P-9 named in contract 5/9; "preserve improvements" is loop step 5; regression = review failure. Done: three references confirmed. (RO)
- [x] T028 [P] [VIS] Verify per-group evidence-reopen lists exist (ownership map §4–§9 name the exact `cluster-evidence-paths/` registers per group) and contract 1 defines the reopen triggers + honest-count reporting. Done: 6 groups × reopen lists + trigger list confirmed. (RO)
- [x] T029 [VIS] Verify the Codex routing handoff in contract 14: Sol High owns visual direction/IA/dashboard redesign/complex CSS/screenshot interpretation/high-risk pages/final critique; Sol Medium owns mechanical/responsive/locale-parity/test-additions/screenshot-matrix/deterministic guards; High-list tasks never delegated down; Claude Opus = independent critic, never co-editing; single-writer-per-file; "a design is NOT complete because the source looks correct". Done: each clause located. (RO)
- [x] T030 [VIS] Verify the five fix-first items are pre-seeded with owners 045 · 047 · 044 · 044 · **048** (the corrected owner for the finance-strings item — never 049) in contract 5 §6, with the supersession note explaining the visual-audit §11 tag. Done: 5 owners confirmed, correction note present. (RO)

## Phase 6 — Privacy, Modal, Form & Propagation Handoffs (all RO)

- [x] T031 [HO-043] Verify contract 6 maps the privacy findings by ID (S-01…S-08 · P-01…P-09 · G-01…G-03 · U-01…U-03 · I-01…I-06 · A-01/A-02) to 043 requirement classes, and states: teacher never sees guardian/student contacts (anti-poaching) · child-view never receives adult/admin data · unrelated families isolated · hiding a link is NOT authorization · meeting links role/session/time-scoped (054) · community/leaderboard visibility audience-scoped (051/052). Done: ID map + six rules verified. (RO)
- [x] T032 [P] [HO-043] Verify the frontend-enforceable-now facts still hold on the FROZEN build (documented claims re-checked, not new work): grep `academy-dashboard-discovery/app/public/*.html` → 0 `type="password"`, 0 **INPUT-scoped** `<input type="file"` (NOT a naive `type="file"` token grep — that matches 4 benign `data-type="file"` facet attributes at `library.html:574,639` + `.en` mirror; the protected suite DOM-scopes this exact collision at `app/tests/smoke/run.cjs:1404-1408` — the PAY28/"Sara" anchoring lesson applies), 0 real corpus PII tokens sampled from privacy findings §1 (the named phones/emails/invite URL). Done: three zero-counts reproduced with the input-scoped pattern. (RO)
- [x] T033 [P] [HO-044] Verify the 044 assignment set in contract 7: the 30 `f-fbAdd-*` duplicate ids (with the §5 counting-basis note from `SPEC/protected-test-carryover.md`) · missing-selector silent test passes forbidden · overlay focus/escape/backdrop/scroll/mobile/RTL test obligations. Done: all three rule groups present; the 30-id provenance (baseline `21502af`, Spec-032 lineage) cited. (RO)
- [x] T034 [P] [HO-056] Verify the forms handoff in contract 7 vs `SPEC/forms-completeness-ledger.md` §0: 48 audited · 26 PARTIAL · 13 MISSING · 9 field-less gates · ~0 validation systemic gap; rules: no decorative subsets · all evidenced-safe fields · sensitive/pay/secret fields excluded or structure-only · explicit required/optional/conditional · validation/help/error states specified. Done: counts + five rules verified. (RO)
- [x] T035 [P] [HO-055] Verify contract 8 preserves the 26 P-IDs as ownership pointers (never restated content), the §4 scoreboard, the rule that every future producer/consumer implementation names its P-ID and updates its leg status, and the NEVER-PROPAGATE register (§5) as binding refusals. Done: four elements verified. (RO)
- [x] T036 [HO-056] Verify the D5(b) ownership-vs-execution split is stated consistently in plan D5(b), contract 4 §4b/§6.9, contract 7, and quickstart example 5 (page groups deliver page-local field sets; 056 runs the FINAL census and remains the accountable auditor). Done: 4 consistent sites. (RO)

## Phase 7 — Preservation, Rejection & Unknown-Evidence Laws (all RO)

- [x] T037 [LAW] Verify contract 9: the 63 B findings + 57 INTENTIONALLY_IMPROVED ledger rows are MUST-PRESERVE; every future spec must list + assert the preservation rows touching its surfaces; regression = review failure. Done: three clauses verified; the 57-row count cross-checked against the T007 disposition matrix. (RO)
- [x] T038 [P] [LAW] Verify contract 10: the 52 RJ entries are negative requirements (MUST-NOT-EXIST assertions per consuming spec); the contract's 10 headline bullets verified against `contracts/rejected-legacy-behaviour-contract.md` §2 (RJ-27 PayPal-Live · RJ-29 no-confirm backup · RJ-26 plaintext secrets · RJ-11 WhatsApp PII+invite · RJ-39 computed Percentage/Top-Performer · RJ-01/02 teacher salary figures · RJ-30 shared OTP · RJ-10 import columns · RJ-13 operator PII · RJ-38 fake-success toasts); the is_enabled-on-unconfigured defect verified as register row **RJ-28** (`SPEC/rejected-legacy-behaviour-register.md`) — a register-level negative requirement even though not a contract headline bullet; AND corpus-grep the four plan artifacts + 15 contracts to confirm no RJ behavior is proposed anywhere (0 re-proposals). Done: 10 contract bullets + RJ-28-in-register verified + clean grep. (RO)
- [x] T039 [P] [LAW] Verify contract 11: the 47 UK entries resolve ONLY by new evidence (fresh capture / backend answer / explicit user decision), never inference; implementing "around" a UK row = build only what IS evidenced + honest gates; AND grep the plan artifacts for unevidenced claims about UK subjects (504 pages, empty tables, uncaptured login UI) — expect 0. Done: rules + clean grep. (RO)
- [x] T040 [P] [LAW] Verify the disposition-interpretation rules (contract 2 + plan D3): REJECTED_* never backlog · INTENTIONALLY_IMPROVED never copied back · UNKNOWN_EVIDENCE never permission to invent · FUTURE_BACKEND never permission to fake · HONEST_LOCK 5 rows = ONE physical `classSalaryReport` lock (physical/navigation lock count = 1) · closed 12-word set with zero variants across all plan-phase artifacts. Done: six rules verified + closed-set grep clean. (RO)
- [x] T041 [LAW] Verify the explicit-supersession protocol exists and is uniform (research R8 + contracts 3/12/13): old value/code · new value/code · evidence · reason · neighbors · mutation proof where a test changes; ownership-map moves additionally need arithmetic re-proof; count changes are declared by the future spec, never pre-applied by 042. Done: protocol elements verified in all three contracts. (RO)

## Phase 8 — Future-Spec Readiness 043–057

- [x] T042 [FS] (DOC) Author `SPEC/final-handoff-verification-register.md`: one section per Spec 043–057 with — exact scope (charter, contract 4 §5) · primary-owned rows (register §4–§18 section + count) · dependencies with gate types (contract 4 §2/§6) · input artifacts (the quickstart consumption list for that spec) · entry gate (Gate 1 conditions) · merge gate (Gate 3 conditions) · required proof (screenshot loop / preservation asserts / RJ-absence asserts / mutation-backed tests / propagation leg updates, as applicable) · stop conditions. THIN: cite by path+ID, never restate rows. Done: 15 sections, each with all 8 fields; totals line 227. (DOC)
- [x] T043 [P] [FS] Verify Spec 052 remains chartered: register §13 explicit zero-allocation note · contract 4 §4c + §6.5 (greenfield; privacy-safe recognition; REAL backend required for computed standing; authored preview never claims computed standing; cannot merge with public-exposure rules unresolved) · quickstart example 3. Done: all three sites verified. (RO)
- [x] T044 [FS] Cross-check ownership completeness: every one of the 227 allocated rows appears in exactly one §4–§18 section (recount per T008) and no PARTIAL/MISSING/UNKNOWN_EVIDENCE/FUTURE_BACKEND/HONEST_LOCK ledger row is absent from the register (join the T007 ledger parse against the T008 register parse by capId — expect 227 = 227, 0 missing, 0 double-owned). Done: scripted join output clean. (RO)
- [x] T045 [FS] Verify secondary dependencies are informational-only everywhere (register §1 invariant + contract 2): grep the register's secondary-dep column and the 15 contracts for any co-ownership phrasing — a gap with two owners is a defect. Done: 0 co-ownership instances. (RO)

## Phase 9 — Protected Tests & Count Freeze (all RO)

- [x] T046 [PT] Verify the inheritance enumeration in `SPEC/contracts/protected-test-carryover-contract.md` + `SPEC/protected-test-carryover.md`: ROUTES_50 (`app/tests/smoke/run.cjs:~2608`) · 115/57 build gate · 24/25/1 · planned 0 · sole lock · orphan pair · R-2 serious-a11y exit-1 (`app/tests/a11y/run.cjs`) · R-3 console-error exit-1 (`app/tests/screenshots/capture.cjs`) · role laws (teacher pay-free GLOBAL, family zero-pay, child-view) · no-fake laws · the PAY28 word-boundary warning (naive `/SAR/i` matches persona "Sara"). Done: every gate named with its site in the contract; sites spot-verified to exist in the frozen test files (read-only). (RO)
- [x] T047 [P] [PT] Verify the three-way test-change classification (additive coverage / strengthening / declared supersession with old·new·evidence·reason·neighbors·mutation proof) + the no-silent-weakening law + the T061/G-1 lesson (every claimed guarantee ships with its falsifying mutation) in contract 13. Done: all elements present. (RO)
- [x] T048 [P] [PT] Verify `SPEC/contracts/count-route-freeze-contract.md`: the nine frozen invariants with verification sites · the 57-vs-58 semantics (D4 — never "58 PAGES bases") · future count changes declared by the owning future spec (e.g. 057's C14-27 404 proposal), never pre-applied. Done: all three groups verified. (RO)
- [x] T049 [PT] Verify test-file immutability across the 042 lineage: `git diff --stat de8d552..HEAD -- academy-dashboard-discovery/app/tests` empty (zero test edits by 042 — the suites remain green by construction; running them is optional sanity, not required evidence). Done: empty diff captured. (RO)

## Phase 10 — Documentation Implementation & Final Guards

- [x] T050 (DOC) Author `SPEC/implementation-status.md` recording each phase's results WITH embedded command outputs (git states, counts, set-diffs, grep results) — every claim carries its reproduced evidence; **a result may never be written before its task's command has actually run** (the T061 lesson: a task marked done with a fabricated result is the failure class this spec exists to prevent). Done: file exists; every T001–T049 verdict has verbatim evidence; any FAIL is recorded as FAIL. (DOC)
- [x] T051 (DOC) Final cross-artifact consistency sweep: re-grep all Spec-042 artifacts (specify + plan + tasks + the two new DOC files) for stale remaining-work claims, TBD/TODO markers, or wording contradicting the final state; `RESUME-CHECKPOINT.md` stays a closed historical record. Done: 0 stale claims (or each fixed inside `SPEC/**` and re-verified). (DOC)
- [x] T052 Contradiction guard: confirm no specify-phase evidence ledger required editing during T001–T051. If ANY task surfaced a factual contradiction in a specify-phase artifact: **STOP — report to the user before any edit** (`contracts/scope-and-zero-diff-contract.md`). Done: explicit "0 contradictions" statement in implementation-status.md, or a STOP report. (RO)
- [x] T053 (DOC) Update the `CLAUDE.md` `<!-- SPECKIT -->` marker block per the standard workflow: Spec 042 status → TASKED/IMPLEMENTED (documentation orchestration layer), citing tasks.md + implementation-status.md + the handoff register; nothing outside the marker block changes. Done: marker updated; `git diff CLAUDE.md` confined to the block. (DOC)
- [x] T054 Final guard re-run: repeat T001 + T005 (clean-ish tree = only `SPEC/**` + CLAUDE.md dirty; app zero-diff; counts unchanged) and record in implementation-status.md. **No commit/push — the watcher commits.** Done: final git evidence captured. (RO)

---

## Dependencies & sequencing

- **Phase 1 blocks everything** (a broken baseline = STOP). Within it, T002–T005 are `[P]` after T001.
- **Phase 2** requires Phase 1. T007–T011 `[P]` after T006; T012 independent after T006.
- **Phases 3–9** are read-only verifications over disjoint artifacts and may interleave after Phase 2;
  `[P]` markers hold within each phase (distinct files read, no shared state, isolated outputs).
- **T042 (handoff register)** needs T007/T008 numbers confirmed. **T044** needs T007+T008 outputs.
- **Phase 10 is last**: T050 consumes all evidence; T051 after T050; T052 after T051; T053 after T052;
  T054 final. T050–T054 are strictly sequential (same evidence chain; T050/T051/T053 write files).
- Parallel-run example: after Phase 2, three lanes — lane A: T013–T020 (gate law) · lane B: T021–T030
  (partition + visual) · lane C: T031–T041 (handoffs + laws) — all read-only, no shared writes.

## Implementation strategy

Execute phases in order; inside a phase run `[P]` tasks concurrently (read-only, isolated evidence
capture). The only files WRITTEN in the whole run: `SPEC/tasks.md` (this file, already written),
`SPEC/final-handoff-verification-register.md` (T042), `SPEC/implementation-status.md` (T050, updated
through T054), any T051 stale-claim fixes inside `SPEC/**`, and the `CLAUDE.md` marker (T053). Task count:
**54** (within the 45–75 discipline; grouped verifications — never one task per capability row, legacy
page, screenshot or allocation).
