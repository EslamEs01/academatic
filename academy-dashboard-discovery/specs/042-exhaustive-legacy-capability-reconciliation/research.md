# Phase 0 Research: Spec 042 — Exhaustive Legacy Capability & Page Reconciliation (Orchestration Layer)

**Input**: `plan.md` (decisions D1–D14, binding) · the completed specify-phase corpus (cited by path + stable
ID per D1, never restated). **Scope**: the eight planning questions plan.md enumerates. No new evidence was
required; no screenshot or raw record was reopened for this document (reopening is a page-group obligation
under contract 1, not a Phase-0 one). All eight resolutions are documentation decisions — zero `app/**` bytes.

---

## R1 — Dependency ordering for Specs 043–057

**Decision**: Adopt the wave graph of plan.md D5 verbatim — Wave 0: 043 ∥ 044 (foundations) · Wave 1:
045–050 in parallel · Wave 2: 051, 052, 053, 054 · Wave 3: 055 · Wave 4: 056 (final census) · Wave 5: 057 —
with D5's three formalizations: **(a)** the THREE DEPENDENCY GATES *(corrected 2026-07-16)* — **Gate 1**
specify/plan on ratified foundation contracts (diagnosis ungated, starts immediately); **Gate 2** isolated
branch/worktree implementation on frozen interfaces + known file boundaries + single-writer discipline;
**Gate 3** merge/completion ONLY when the applicable foundation implementation and its tests are available and
green — contract ratification alone never passes Gate 3 (a ratified privacy rule does not prove the rendered
page obeys it; a frozen modal API does not prove the shared implementation exists); **(b)** 056 ownership vs
execution split — 056 is the accountable
auditor of its 82 field-set rows, but the safe field sets for a group's owned surfaces are delivered inside
that group's review and verified by 056's final census; **(c)** 052 carries no incoming legacy-debt edge yet
remains chartered (→ R4). Full edge list with per-edge rationale lives in
`contracts/future-spec-dependency-contract.md`.

**Rationale**: Grounded in `future-spec-allocation-register.md` §19 (per-spec row totals 17·24·8·4·8·7·7·7·2·
0·17·5·33·82·6 = 227; FUTURE_BACKEND column 9/0/0/1/0/6/0/2/0/0/8/1/7/6/0 = 40) and its secondary-dependency
columns, plus `cross-role-propagation-map.md` §8 (owner roll-up). The data forces this shape:
- 043 rows radiate privacy rules every group consumes (e.g. C02-04 with secondary dep 055; cross-role §8
  assigns P-20/P-21 authz law to 043) — a page group merging before those rules are ratified AND implemented
  on its surfaces can bake a PII leak. 044 hosts the interaction system the groups re-host forms into
  (register §5; §3 rule 4 keeps 044 secondary on the C01-03/04 ↔ C06-01/02 reconciliations). Hence Wave 0
  first: ratification opens dependent *start* (Gates 1–2), while *merge* (Gate 3) additionally waits for the
  applicable foundation implementation + green tests — parallelism is preserved by starting early in
  isolation, and safety by merging late.
- 045–050 are a proven partition (`page-review-ownership-map.md` §2; 11+12+12+8+7+7 = 57 + index) with
  disjoint file ownership, so Wave 1 parallelism is safe under the single-writer rule (R7).
- 055 (33 rows, the cross-role map's primary owner per §8) consumes surfaces the page groups and 053/054
  produce — its register rows carry 045–050/053/056 secondary deps throughout §16 — so it must follow them.
- 056's 82 rows list page groups as secondary deps (register §17), and its census is only meaningful over
  finished surfaces → Wave 4. 057 (§18: the 5 HONEST_LOCK rows = the one `classSalaryReport` lock + C14-27
  404 proposal) is the freeze and must be last.
- Acyclicity: every edge points wave-N → wave-<N; verified in the dependency contract.

**Alternatives considered**:
- *Ratification-only merge gate (the ORIGINAL D5(a) wording)*: **rejected in the 2026-07-16 correction pass as
  unsafe** — a ratified privacy rule does not prove the rendered page obeys it, a frozen modal API does not
  prove the shared modal/drawer implementation exists, and a provider contract does not prove an operational
  Zoom/Meet integration exists. Replaced by the three-gate model (specify/plan start · implementation start ·
  merge/completion), which keeps the parallelism ratification-only gating was meant to buy while making merge
  wait for implemented + verified foundations.
- *Strict serial order 043→044→045→…→057*: rejected — Wave-1 groups own disjoint page sets (partition proof,
  ownership map §2) and share no files; serializing six independent reviews multiplies calendar time with zero
  added safety beyond what the three gates of formalization (a) already provide.
- *Fully parallel (no waves)*: rejected — page groups would merge redesigns before 043's audience-scoping and
  044's overlay/host rules exist (a family page could re-host the broken nested drawer or surface guardian
  contact data to a teacher view); 055/056 would audit surfaces that do not exist yet, producing a census that
  is immediately stale.
- *056 before 055*: rejected — 055 changes cross-role surfaces (33 rows, the largest propagation footprint per
  cross-role §8), which would invalidate a completed field census; the register's secondary-dep columns point
  056→(045–050, 055) as producers, never the reverse. 056 stays the FINAL census (Wave 4) with formalization
  (b) keeping mid-graph field work unblocked.

## R2 — Evidence reuse without re-crawl

**Decision**: Adopt the **targeted-grounding protocol** of
`contracts/evidence-reuse-and-targeted-grounding-contract.md`: each future spec (i) consumes the
`cluster-evidence-paths/Cnn-paths.md` files for the clusters whose rows it owns; (ii) reopens ONLY the
screenshots/raw records for its owned pages and rows (never the full 1,113-screenshot / 1,723-record corpus);
(iii) when a summary and a raw capture disagree, the raw record wins (extends plan.md D2 precedence to the
evidence layer); (iv) reports an honest reopen count (screenshots + records actually reopened) in its own
implementation status — a spec claiming grounding with a zero reopen count on owned visual work fails review.

**Rationale**: The corpus is already adversarially verified 20/20 (`checklists/requirements.md`) and every
capability row carries its evidence paths; re-deriving them re-does completed, verified work. The Spec-040
lesson (recorded in CLAUDE.md: raw HTML corrected three summary errors — 15-column import, 21 integration
fields, XPay methods) is why raw-beats-summary is a rule, not a preference. Honest reopen counts make
grounding falsifiable — the same discipline that exposed the "142/142" mutation-count misreport in 041.

**Alternatives considered**:
- *Full 26-agent re-crawl per future spec*: rejected — wasteful (15 specs × a corpus already verified 20/20),
  slow, and risk-adding: a re-crawl against a drifted or dead legacy host would produce *conflicting* evidence
  that then needs its own reconciliation. The crawl is done; 042's whole purpose is that it never needs
  repeating.
- *No reopening at all (trust the ledgers blindly)*: rejected implicitly — visual redesign (R6) requires
  looking at pixels; ledger prose is not a pixel. Targeted reopening is the minimal sufficient middle.

## R3 — 57-base vs 58-review-unit semantics

**Decision**: Adopt plan.md D4 verbatim. **57 = the bilingual `PAGES` bases** (×2 = 114 files); **`index.html`
is the one additional single-file review unit** (57×2+1 = 115 files). Visual/review documents may say
"58 review units"; count documents keep 57/115. Nothing is renamed. Encoded in
`contracts/count-route-freeze-contract.md`; the review-unit partition (58 = 11+12+12+8+7+7 pages + index→050)
in `contracts/page-review-partition-contract.md`.

**Rationale**: Two true numbers describe two different things: the build contract counts bilingual bases
(`build-html.mjs` PAGES = 57 → 115 files, protected by the Spec-041 suite), while the review workload counts
reviewable surfaces (index has no EN mirror yet must be reviewed, so 58). Keeping both, each in its own
register, removes the only observed ambiguity (the plan.md D2 conflict — visual audit §10's superseded draft
partition vs the canonical ownership map) without touching any frozen arithmetic.

**Alternatives considered**:
- *Rename to "58 PAGES bases"*: rejected — factually wrong (index is not a `PAGES` base and has no `.en`
  mirror), and it breaks the count contract arithmetic every protected test pins: 115 = 57×2+1, ROUTES_50's
  50-item register, and the 24/25/1 route split all derive from 57. A cosmetic rename would force a cascade of
  declared supersessions across protected tests for zero information gain.
- *Ignore index (57 units only)*: rejected — index is a real user surface owned by group 050
  (ownership map §2); an unreviewed hub is an orphaned surface.

## R4 — Zero-debt Spec 052 as a valid greenfield charter

**Decision**: Adopt plan.md D6. Spec 052 keeps its charter with **0 allocated reconciliation rows** —
correctly zero, per `future-spec-allocation-register.md` §13. It enters via its own future scoping: privacy-safe
recognition designed from fresh evidence + privacy law, with a **real backend requirement for any computed
standing** (no client-side ranking, ever). Its 042 inheritance is *context, not debt*: the visual audit's
recognition findings (V-F1 sibling league-table layout; D-4 celebration-language gap — both name 052 as the
principle owner), the cross-role map §8 rule for guardian-facing recognition surfaces (lifecycles P-09/P-11:
"privacy-safe, never a ranking"), and 043's audience-scoping foundation (its Wave-2 dependency edge).

**Rationale**: The only legacy "recognition" evidence — computed Percentage / Top Performer ranking, row
C08-09 (`cluster-audits/C08-audit.md`) — is **REJECTED_NO_FAKE**, elaborated in the RJ register as RJ-39
("rankings stay banned (052 owns privacy-safe recognition)"). Under D3, a REJECTED_* verdict is a negative
requirement, never backlog: seeding 052 from it would launder a refusal into a roadmap. Yet the *need* is
independently evidenced by the current product (V-F1: the authored sibling progress bars already read as a
league table; D-4: the child view's وسام warmth exists nowhere else) — so cancelling 052 would leave a real,
already-diagnosed product-dignity question ownerless. Zero rows + a standing charter is the only disposition
consistent with both facts.

**Alternatives considered**:
- *Cancel 052 (no rows ⇒ no spec)*: rejected — orphans V-F1/D-4 and the P-09/P-11 audience-scoping rule;
  the next spec to touch recognition would improvise without an owner of the never-a-ranking principle.
- *Seed 052 from the rejected legacy ranking (treat C08-09 as its backlog)*: rejected — direct D3 violation
  (REJECTED_* reinterpreted as backlog) and a REJECTED_NO_FAKE re-entry: a client-side "leaderboard" over
  authored fixtures is exactly the faked computed standing the law bans.

## R5 — How current-product improvements become protected requirements

**Decision**: The 63 preservation findings of `current-product-better-than-legacy-register.md` (B-x.y IDs) plus
the 57 INTENTIONALLY_IMPROVED capability rows (register §2 census) are **MUST-PRESERVE review assertions**,
binding on every future spec, via `contracts/current-product-improvement-preservation-contract.md`. Each future
spec's review re-checks the preservation rows that touch its owned surfaces; a regression against any cited
B-x.y or INTENTIONALLY_IMPROVED row is a **review failure**, not a style note. Where a future spec must
legitimately change a preserved behavior, the only path is a declared supersession (R8) — never silent drift.

**Rationale**: The register exists because the rebuild deliberately *refused* legacy defects (the allocation
register §2 explicitly routes the 57 rows as "preservation list — any regression fails review"; CLAUDE.md's
Spec-040 record of refused legacy defects — PayPal-Live default, no-confirm DB backup — shows how easily
"reconciliation" can be misread as "copy legacy back"). D3 already classifies INTENTIONALLY_IMPROVED as
preservation law; this resolution just makes the enforcement mechanism concrete: assertions in review, IDs in
citations, supersession as the sole escape hatch.

**Alternatives considered**:
- *Advisory nice-to-have list*: rejected — advisory lists lose to deadline pressure; a page group "completing"
  a legacy form could faithfully reintroduce the legacy defect the improvement replaced, and nothing would
  fail. The whole value of the B register is that regression is *detectable and blocking*; without teeth it is
  a museum plaque.
- *Freeze improvements as untouchable forever (no supersession path)*: rejected — over-freezing forces future
  specs to either violate the contract or fork the register; the declared-supersession path (R8) keeps change
  possible and auditable.

## R6 — How page redesign specs PROVE visual improvement

**Decision**: Specs 045–050 prove improvement only through the **mandatory browser/screenshot loop** of
plan.md D8 (`contracts/academic-visual-redesign-handoff-contract.md` +
`contracts/code-model-routing-and-visual-validation-contract.md`): per owned base, (i) reopen the legacy
screenshots and the current baseline screenshots (targeted per R2); (ii) implement; (iii) **render and capture
after implementation** — before/after frame pairs per owned base are a deliverable; (iv) run the 8-surface test
matrix — AR/EN × desktop/mobile × light/dark — plus interactive states (open drawers/tabs/empty states),
keyboard navigation, the R-3 console-error hard gate, and the R-2 serious-a11y hard gate; (v) an independent
visual critique (a reviewer that did not write the code — R7) judges the after-frames against the D8 NOT/IS
objective lists. **Source-reading is never visual acceptance.**

**Rationale**: The visual audit's verdict frames the work ("the identity is already won — completion +
de-ERPing, not a repaint", plan.md D8), and its findings are pixel-level (V-F1 is a *layout* judgement no grep
can see). The project's own history proves source-truth ≠ screen-truth: 041's honest finding was that two
"verified" gates (serious-a11y, console errors) were never enforced until made machine gates, and the user's
standing memory rule is screenshot-based visual acceptance. Before/after pairs make "improved" falsifiable;
the 8-surface matrix is the existing verified capture discipline (375 screenshots, 0 console errors at 041)
extended, not invented.

**Alternatives considered**:
- *Code-review-only acceptance*: rejected — cannot detect the class of defect these specs exist to fix
  (ERP-clone density, dead-feeling states, RTL/dark-mode breakage, a league-table layout over lawful markup).
  A page can be source-perfect and visually worse; D8 says a design is not complete because the source looks
  correct.
- *Screenshot capture without independent critique*: rejected — the author judging their own after-frames
  repeats the self-certification failure mode 042's adversarial review exists to prevent; the critic role is
  already staffed by R7's routing.

## R7 — Safe Codex Sol High / Sol Medium routing

**Decision**: Adopt plan.md D12 verbatim, encoded in
`contracts/code-model-routing-and-visual-validation-contract.md`: **Sol High** for visual direction, IA,
dashboard redesign, complex CSS/layout, screenshot interpretation, high-risk pages, final visual critique;
**Sol Medium** for mechanical page updates, responsive adaptations, locale parity, test additions,
screenshot-matrix expansion, deterministic guards. **Claude Opus**, when used, acts as the independent
contract/visual critic and never edits a file concurrently with Codex. **Single-writer-per-file** at any point
in time; the Wave-1 partition (R1/R3) gives each group disjoint page files so parallel groups never share a
writer surface. The screenshot loop (R6) is mandatory regardless of which model implemented.

**Rationale**: The routing matches task risk to model strength: judgment-heavy visual work (exactly the
failures the visual audit found) goes to the stronger tier; deterministic mechanical work (locale mirroring,
matrix rows) is proven safe at the cheaper tier by this repo's history of scripted rewordings and additive test
blocks. An independent critic model closes the R6 self-review gap. Single-writer-per-file is the only known-safe
concurrency rule in a repo whose protected suite pins byte-verbatim assertions — a merge artifact inside a
protected test is indistinguishable from silent weakening (D11).

**Alternatives considered**:
- *One model doing everything*: rejected — either everything runs at Sol High (wasteful on the 60+ mechanical
  locale/test tasks per group) or everything at Sol Medium (under-powered for redesign judgement and screenshot
  interpretation, the highest-stakes work), and in both cases author-as-critic returns.
- *Concurrent same-file edits (multiple writers)*: rejected — byte-level protected assertions plus merge
  conflicts create silent-weakening risk that D11 categorically forbids; the partition makes this concurrency
  unnecessary anyway.

## R8 — How later specs declare explicit supersessions

**Decision**: Adopt the **declared-supersession protocol** (plan.md D11 + contracts 3/12/13). Any future change
to a protected guarantee is classified as *additive coverage* / *strengthening* / *declared supersession*; a
declared supersession MUST record: **old value/code · new value/code · evidence · reason · neighboring
assertions kept byte-verbatim · and, where a test changes, a falsifying mutation proof** (the mutated tree goes
RED — the T061/G-1 lesson made law). Two special cases carry extra obligations:
- **Ownership-map supersession** (a page moving groups, contract 3): additionally requires the arithmetic
  re-proof (the six group counts still sum to 57 + index) and a zero-overlap / zero-orphan proof over the full
  partition.
- **Count supersession** (contract 12): any change to the frozen counts (115 · 57 · 50 · 24/25/1 · 49/0/1 ·
  `FUTURE_ROUTES {}` · orphan pair · lock 1) is **declared by the future spec that causes it, never
  pre-applied by 042** — e.g. 057's C14-27 404-page row stays a recorded proposal until 057 itself declares
  the count change with the full protocol.

**Rationale**: This is the mechanism the repo already trusts: every sanctioned amendment since Spec 026 was a
declared supersession with byte-verbatim neighbors, and 041's honest finding showed what happens without
mutation proof (T061 marked done, never written; M-2 passing an entire suite). The two extra obligations
target the two registers where a silent edit is most catastrophic: the partition (a page silently moving
creates double-owners or orphans, which the ownership map's invariant forbids) and the counts (every protected
test derives from them). Keeping 042 count-neutral preserves its documentation-only guarantee.

**Alternatives considered**:
- *Free-form edits with commit-message justification*: rejected — commit messages are not review artifacts; no
  neighbor-verbatim proof means silent weakening is undetectable, which D11 forbids.
- *No supersession path (everything frozen forever)*: rejected — 057 demonstrably needs one (the 404 proposal
  cannot land otherwise), and R5's preservation law needs a lawful escape hatch to stay credible.
- *042 pre-applying foreseeable supersessions (e.g. pre-counting the 404 page as 116)*: rejected — invents a
  future before its owning spec exists and breaks 042's zero-diff/count-freeze constitution gate.

---

## Resolution status

All eight questions resolved; **no NEEDS CLARIFICATION remains**. Every decision above defers to plan.md
D1–D14 where they overlap; no specify-phase ledger required an edit; no evidence was invented; no count moved.
