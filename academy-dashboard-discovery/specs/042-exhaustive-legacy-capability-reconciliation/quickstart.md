# Quickstart: Consuming Spec 042 (for the owners of Specs 043–057)

**Audience**: the author of any future spec 043–057. **Purpose**: how to consume the completed Spec-042
reconciliation corpus without re-crawling, without duplicating a ledger, and without violating a binding
decision. **Authority**: `plan.md` D1–D14 governs; where this document and `plan.md` could diverge, `plan.md`
wins. Every fact below is a citation (path + stable ID), never a restatement (D1).

**The corpus you consume** (all in this directory, committed): 15 cluster audits
(`cluster-audits/C01..C15-audit.md`) · 15 evidence-path indexes (`cluster-evidence-paths/C01..C15-paths.md`) ·
`legacy-current-capability-ledger.md` (380 rows) · `future-spec-allocation-register.md` (227 allocated rows) ·
`page-review-ownership-map.md` (57 bases + `index` = 58 review units) · the three registers
(`current-product-better-than-legacy-register.md` 63 B-rows · `rejected-legacy-behaviour-register.md` 52 RJ ·
`unknown-and-conflicting-evidence-register.md` 47 UK) · the cross-cutting ledgers (forms · modal/drawer ·
states · privacy · cross-role · visual) · the 15 binding contracts in `contracts/` (D13).

---

## A. The 10-step consumption protocol

Run these steps in order when you open your spec. Skipping step 4 (images) or step 10 (verification) is the
named failure mode of past specs (`plan.md` D8, D11 — "a design is not complete because the source looks
correct"; the T061/G-1 lesson).

1. **Identify what you own.** Open `future-spec-allocation-register.md` and read YOUR section (§4–§18; one
   per spec, totals in §19) — that is your complete capability-row inventory (`Cnn-mm` IDs with disposition
   and secondary deps). If you are a page group (045–050), also open `page-review-ownership-map.md` §4–§9 for
   your owned bases and §3 for the nine review dimensions every group must run. Ownership is exclusive: a row
   or base has ONE primary owner (`contracts/capability-disposition-and-ownership-contract.md`,
   `contracts/page-review-partition-contract.md`).

2. **Open the matching cluster audit(s).** Each of your `Cnn-mm` rows names its cluster; read the normalized
   table row in `cluster-audits/Cnn-audit.md` for the full finding (legacy behavior, current state, evidence
   anchor). Audits are the top of the precedence order (D2) — if a prose section disagrees with an audit
   table, the audit table wins.

3. **Open the exact evidence paths.** `cluster-evidence-paths/Cnn-paths.md` lists, per cluster, the precise
   legacy screenshots, raw crawl records and current-product files that ground each row. Never re-crawl;
   never grep blindly across `output/` — the paths files exist so your grounding is targeted
   (`contracts/evidence-reuse-and-targeted-grounding-contract.md`).

4. **Reopen scoped screenshots AS IMAGES.** Every screenshot your rows cite must be opened and looked at —
   both the legacy frame (`output/roles/<role>/screenshots/*.png`) and the current frame
   (`app/screenshots/*.png`). A filename, an md5, or extracted text is NOT visual inspection
   (`page-review-ownership-map.md` §3, closing note). The visual audit's U-4 finding (a "captured" RBAC
   drawer that was byte-identical to the non-drawer frame) is the standing proof of why.

5. **Inspect raw records for any field/action/permission/workflow decision.** For any decision about a form
   field set, an action's parameters, a permission name, or a workflow step, the raw crawl record is the
   authority: `output/roles/<role>/pages/<slug>.json` (`forms[].fields[]`, actions, tables) and
   `output/roles/<role>/html/raw/<slug>.html` for modal bodies the JSON collapsed
   (`forms-completeness-ledger.md`, Method). Summaries and audits cite these; when in doubt, the raw record
   beats every summary.

6. **Load the three registers, filtered to your surfaces.**
   - `current-product-better-than-legacy-register.md` (B-x.y): preservation LAWS — regressing one fails your
     review (D3; `contracts/current-product-improvement-preservation-contract.md`).
   - `rejected-legacy-behaviour-register.md` (RJ-nn): negative requirements — MUST-NOT-EXIST assertions you
     inherit, never backlog (D3; `contracts/rejected-legacy-behaviour-contract.md`).
   - `unknown-and-conflicting-evidence-register.md` (UK-nn): no-invention holds — only new evidence resolves
     one, never inference (D3; `contracts/unknown-evidence-no-invention-contract.md`).
   Privacy-sensitive specs also load `privacy-and-sensitive-data-findings.md` (S/P/G/U/I/A rows) and
   cross-role specs load `cross-role-propagation-map.md` (P-nn lifecycles — note the P namespace is
   per-document, D1).

7. **Identify primary vs secondary owners — never co-own.** Your register section's "Secondary deps" column
   names the specs whose contracts you consume (e.g. a 054 row depending on 044 for its drawer host). The
   secondary spec's contract binds you; you do not edit its surfaces, and it does not edit yours
   (`contracts/future-spec-dependency-contract.md`; wave order in `plan.md` D5). The THREE GATES apply (D5a,
   corrected): diagnosis starts any time; specify/plan starts on RATIFIED foundation contracts; isolated
   implementation starts on FROZEN interfaces; but a redesigned page MERGES only when the applicable 043
   frontend protection / 044 shared implementation is **implemented, tested and green** — ratification alone
   never authorizes a merge. Non-applicability requires explicit proof in your own plan/tasks; never duplicate
   a pending 044 component locally (dependency contract §6).

8. **Declare scope + count impact.** State which files/pages/routes you touch and prove the frozen counts
   hold: 115 files · 57 bases (+`index` = 58 review units, D4) · 50 menu · 24/25/1 · planned 0 · ONE physical
   lock · orphan pair `{gallery.html, gallery.en.html}` (`contracts/count-route-freeze-contract.md`). Any
   count change, page move, or protected-test change requires the explicit supersession protocol: old
   value/code · new value/code · evidence · reason · neighbors · mutation proof (D7, D11;
   `contracts/protected-test-carryover-contract.md`).

9. **Implement ONLY owned capabilities.** Work your rows; leave every other row to its owner. FUTURE_BACKEND
   rows get the honest surface + gate — the execution waits for a real backend; faking it is a
   REJECTED_NO_FAKE violation (D3). UNKNOWN_EVIDENCE rows stay unknown. REJECTED_* rows are never built.

10. **Run verification.** (a) The real browser/screenshot loop on every changed surface — render, capture,
    OPEN the images, iterate (D8, D12; `contracts/code-model-routing-and-visual-validation-contract.md`);
    (b) role laws (teacher pay-free GLOBAL · family zero-pay · student = child-view); (c) privacy asserts
    from 043's ratified rules; (d) the a11y hard gates (critical=0 serious=0, Spec 041 R-2) and the
    console-error hard gate (R-3); (e) update the propagation legs you touched in the terms of
    `contracts/cross-role-propagation-handoff-contract.md`; (f) classify every test change as additive /
    strengthening / declared supersession — with mutation proof for new guarantees (D11).

---

## B. Five worked examples

### B1. Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching (foundation, Wave 0)

- **Step 1**: `future-spec-allocation-register.md` §4 — 17 rows (C01-27, C02-04/05/06, C03-13, C04-22,
  C09-19, C12-01/02/09/13/19, C14-09, C15-01/02/03/18). Plus the full privacy findings document:
  `privacy-and-sensitive-data-findings.md` — S-01…S-08 (rejected security), P-01…P-09 (rejected privacy),
  G-01…G-03 (our own policy gaps), and its §10 handoff section addressed to 043 by name.
- **Example trace, C12-13** (PII-visibility grants — legacy `Show Parent Phone` / `Show Parent Email`, no
  successor concept): register §4 row → `cluster-audits/C12-audit.md` (finding row C12-13; context in the
  §-cited prose) → `cluster-evidence-paths/C12-paths.md` for the exact permission-list capture → the raw
  record it names under `output/roles/admin/pages/` (step 5: the permission NAMES come from the raw record,
  never from memory). Related gap: G-01 — our `src/js/fixtures/staff-management.js` PERM_GROUPS has no
  parent-contact row at all.
- **Deliverable**: the RATIFIED role-visibility rule-set — who may see guardian contact data, PII classes per
  role, "hiding a link is not authorization" (privacy findings §6) — as binding rules that 045–050 consume
  (D5a Gate 1), **plus the frontend protections implemented and verified** (fixtures/rendered surfaces obeying
  the visibility law: protected data not rendered, secrets not rendered, honest gates, no
  backend-authorization claims) — the artifact dependent pages need to pass their merge gate (D5a Gate 3).
- **Enforcement**: FUTURE_BACKEND. 043 ratifies rules and ships honest gates; real RBAC enforcement needs the
  backend (C12-02, C09-19, G-02). Faking enforcement client-side would be REJECTED_NO_FAKE.

### B2. Spec 045 — Teacher redesign (page group, Wave 1, HIGH PRIORITY)

- **Step 1**: `page-review-ownership-map.md` §4 — 11 owned bases (`teacher-portal` + 7 portal internals +
  admin `teachers` / `teacher` / `teacher-performance`) — plus register §6 (8 allocated rows).
- **Fix-first item**: the quick-tiles lie — 7 implemented pages falsely badged «قريبًا» on the teacher home.
  One defect, three cluster sightings: C01-16 / C02-16 / C15-14 (all PARTIAL, all → 045; the exact source
  anchor is in the C15-14 row: `teacher-portal.js:33-35` ignores `e.status`). Pre-seeded by the visual
  audit's fix-first list (§11) and D8.
- **Step 4**: reopen the current frame `app/screenshots/teacher-portal__ar__light__desktop.png` AND the
  legacy frame `output/roles/teacher/screenshots/teacher-home-full.png` as images (both are the cited
  evidence of the visual audit's P-1/P-2 rows).
- **Step 6**: visual-audit preservation rows P-1 (NO salary band on the teacher home — legacy leads with a
  pay panel; REJECTED_PAY_FREE, permanent) and P-2 (NO computed vanity metric — legacy «Attended Percentage
  0%») in `visual-quality-and-academic-design-audit.md`; the pay-free B-3.* family in the preservation
  register. Any redesign that reintroduces either fails review.
- **Step 10**: every owned base through the 8-surface matrix — AR/EN × light/dark × desktop/mobile-390
  (`page-review-ownership-map.md` §3 dims 5–8; D8's 11-step loop). **Routing** (D12): Codex Sol High for the
  visual direction/IA/high-risk pages; Sol Medium for mechanical rebakes, locale parity, screenshot-matrix
  expansion; the browser/screenshot loop is mandatory either way.

### B3. Spec 052 — Greenfield privacy-safe leaderboard (Wave 2, ZERO register rows)

- **Step 1 finds nothing to reconcile — by design.** Register §13 records the explicit zero-allocation: the
  only legacy "recognition" evidence (computed Percentage / Top Performer ranking, C08-09) is
  REJECTED_NO_FAKE — refused, not gapped (RJ-39). 052 is a charter, not a cancelled spec (D6).
- **Start from the charter inputs instead**:
  - Privacy law: audience-scoping from `cross-role-propagation-map.md` P-09 / P-11 (guardian-facing
    lifecycles — never a ranking surface) and 043's ratified rules (D5 edge: 052 depends on 043).
  - The negative requirement: RJ-39 / C08-09 — computed ranking is refused CLIENT-SIDE forever; rankings on
    authored fixtures are banned permanently.
  - The backend-integrity requirement: any computed standing requires a REAL backend
    (`contracts/future-spec-dependency-contract.md` §052; D6 — "no client-side ranking, ever").
  - Visual context, not debt: V-F1 (the sibling league-table dignity finding on `family-portal`) and D-4
    (celebration language beyond the child view) in `visual-quality-and-academic-design-audit.md` — 052 owns
    the recognition-without-ranking PRINCIPLE those rows cite.
- **Deliverable**: fresh scoping under its own future spec — privacy-safe recognition designed from new
  evidence + the inherited laws. Nothing in the 042 corpus authorizes inventing a leaderboard now.

### B4. Spec 054 — Embedded Virtual Classroom & Meeting Lifecycle (Wave 2)

- **Step 1**: register §15 — 5 rows (C01-15 PARTIAL · C02-31 UNKNOWN_EVIDENCE · C03-08 UNKNOWN_EVIDENCE ·
  C11-05 MISSING · C11-09 FUTURE_BACKEND). Two of five are UNKNOWN_EVIDENCE: they stay unknown (step 9) — the
  live classroom UI was never captured (U-6 in the cross-role map: no populated recording exists).
- **The lifecycle**: 054 owns `cross-role-propagation-map.md` **P-22 in full** (§ "P-22 — Virtual classroom /
  meeting lifecycle (the 3-role room)"): create/start/end/Running · the three role-scoped rooms · the
  enter-time presence log · recording (U-6). The map's owner table states the standing rule verbatim: **keep
  the join GATE until a real room exists** — an ungated join link with no room is REJECTED_NO_FAKE.
- **Dependencies** (D5 Wave 2): 043 (presence-monitoring privacy, voice/video of minors — P-22/P-26 rows in
  043's charter; meeting links must be role-, session- AND time-scoped, D9) · 044 (drawer/form hosts for the
  end-class/mark-absent capture, C01-15's 056-bound field sets) · **053's provider contract** (C02-33 Zoom
  provisioning is 053-owned with 054 as the consumer — 054 never provisions and never sees credentials;
  S-01's legacy plaintext `zoom_client_secret` stays refused).

### B5. Spec 056 — Complete Forms & Data Capture Audit (Wave 4, final census)

- **Step 1**: register §17 — 82 rows, the largest allocation. Frame it with `forms-completeness-ledger.md`
  §0: 48 legacy forms audited · 26 PARTIAL · 13 MISSING · 9 field-less gates standing in for captured
  multi-field forms (§6) · validation/help-text coverage ~0 (§8, the systemic gap).
- **The D5(b) split — ownership vs execution**: 056 is the accountable AUDITOR of the 82 rows, but the safe
  field sets for a page group's owned surfaces are DELIVERED inside that group's review (045–050, guided by
  the forms ledger + the 044 host system); 056 then runs the FINAL census after 045–050 and 055 land. The
  register already models this — page groups appear as secondary deps on 056 rows. 056 is not a mid-graph
  bottleneck, and a page group's "done" is provisional until 056's census confirms it.
- **The mandatory field-level comparison**: before ANY form is called complete, compare its current field set
  against the legacy raw record — `output/roles/<role>/pages/<slug>.json` `forms[].fields[]` (and
  `html/raw/*.html` for collapsed modal bodies), exactly as the ledger's Method section prescribes. Law-driven
  omissions (pay/secret/privacy — the ledger's §7 field families) are correct and stay omitted or
  structure-only; everything else evidenced-safe must ship or be explicitly dispositioned
  (`contracts/modal-drawer-form-handoff-contract.md`, D10).
- **Step 10**: the census output re-proves the frozen counts, and every new form guarantee ships with its
  falsifying mutation (D11).

---

## Common failure modes (all previously observed; all forbidden)

1. Treating a REJECTED_* row as a backlog item (D3). 2. Resolving UNKNOWN_EVIDENCE by inference (D3).
3. Calling a design done from source reading — no screenshot loop (D8/D12; the U-4 lesson). 4. Marking a
verification task done without running it (the T061/G-1 lesson, D11). 5. Copying a ledger table into a new
spec instead of citing the row (D1). 6. Moving a page between groups without a declared supersession (D7).
7. Building a form from a summary instead of `forms[].fields[]` (step 5). 8. Reading "5 HONEST_LOCK rows" as
five locks — it is ONE physical lock, `classSalaryReport`, seen from five clusters (D3).
