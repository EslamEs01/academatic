# Spec 042 — Adversarial Completeness Review · Requirements Checklist

**Review round: 3** · Reviewer: adversarial completeness reviewer (did NOT author the artifacts)
**Method**: every count below was re-derived by script from the raw artifacts, the evidence corpus
(`academy-dashboard-discovery/output/`), and the read-only app (`academy-dashboard-discovery/app/`).
No total was trusted from any artifact without independent reproduction. Escaped-pipe-aware table
parsing was used throughout (naive `split('|')` produces four FALSE mismatches — C02-30, C09-01,
C13-11, C14-19 — all of which are `\|` cell content, verified clean). 20 checks; verdict per check.

**Round-2 → round-3 delta**: round 2 failed checks 9 and 11. Both defect sets were re-examined against
the current artifact bytes (forms ledger re-edited 18:53, better-register / cross-role map / visual audit
18:48) and are **remediated** — details under checks 9 and 11.

---

## Check 1 — All 339 legacy pages assigned

**Verdict: PASS**

- Corpus ground truth: `ls output/roles/{admin,teacher,family}/pages/*.json` = **300 + 26 + 13 = 339**.
- Union of `(role, slug)` rows across all 15 `cluster-evidence-paths/C*-paths.md` tables = **339 distinct**
  (**422 memberships**; 69 multi-tag pages). Full set-diff against the on-disk corpus basenames is
  **empty both ways** — 0 unassigned, 0 invented.
- Per-cluster row counts reproduced AND each equals its file's declared "Unique legacy pages" line:
  C01 36 · C02 109 · C03 39 · C04 31 · C05 26 · C06 24 · C07 67 · C08 17 · C09 27 · C10 9 · C11 5 ·
  C12 9 · C13 4 · C14 19 · C15 0. Sum of memberships 422 ✓ (matches `page-and-route-reconciliation.md`
  §1 "422 memberships / 339 unique" and `exhaustive-evidence-inventory.md`).
- Every audit accounts for its pages: the paths files enumerate them row-by-row; the audits fold
  query-permutation families into capabilities explicitly (e.g. C02-01: "~60 permutations = 2 capabilities");
  `exhaustive-evidence-inventory.md` reconciles per-cluster page/button/form/table/modal totals.

## Check 2 — All 57 current page bases represented

**Verdict: PASS**

- Ground truth from `app/public/`: 115 `*.html` → strip `.en`, dedupe → **58 bases incl. `index`**, i.e.
  **57 mirrored bases** (57 × 2 + 1 = 115 ✓).
- `page-and-route-reconciliation.md` §2 table: **57 rows, 57 distinct bases**; set-equality against the
  public/ list (excl. `index`) holds — 0 missing, 0 phantom.
- `index` is handled explicitly as the 58th review unit (spec.md §7 unit note; partition map §1/§9).

## Check 3 — All 50 admin nav items represented

**Verdict: PASS**

- `nav.config.js` parsed: **50 items** (49 with routes + `classSalaryReport` route-less disabled lock).
- `page-and-route-reconciliation.md`: the 49 routed ids all appear in the §2 table (exact id + exact route),
  and `classSalaryReport` appears in the §4 route register (the 24/25/1 split). 50/50.
- Ledger representation (capability level): 26 of the ids appear verbatim; the remainder are represented by
  their route/surface rows — verified individually: settings deep-links → C09-01 ("`settings.html#view=…`
  6 tabs" + per-tab rows C09-10/-14/-05/-08/-03), `books` → C10-04 (Books & Library tab), `teacherKpi`/
  `sessionsKpi`/`monthlyPerf` → C02-18 (`teacher-performance` deep-links) + C06-15, `certificateRequests` →
  C10-12/-14 requests-queue rows, etc. No nav item is unrepresented in the combined artifacts.

## Check 4 — All role portal routes represented (teacher 8 / family 8 / student child-view 7)

**Verdict: PASS**

- Source ground truth `src/js/fixtures/portal.js` `ROLE_NAV`: **student 7 · family 8 · teacher 8** entries,
  all `status:'implemented'`, pages matching the built bases exactly.
- `role-surface-reconciliation.md` §5 lists precisely these bases per role (+ child-view reached via family);
  §1 re-proves the no-student-login finding from the crawl root (`output/roles/` = admin/teacher/family only).
- All 23 portal bases (+ `family-child` + `portals`) appear as `_portal_` rows in the
  `page-and-route-reconciliation.md` §2 table and in the 045/046/047 partition groups.

## Check 5 — Exactly 15 cluster audits, exactly once, in `cluster-audits/`; no `clusters/` dir

**Verdict: PASS**

- `cluster-audits/` contains exactly `C01-audit.md … C15-audit.md` — 15 files, each id exactly once.
- `specs/042-…/clusters/` does **not** exist on disk (`ls` → No such file or directory). The stray
  `clusters/C09-audit.md` from the paused run shows only as a git `D` entry (deletion pending the watcher
  commit); the working tree is clean of it.
- `find` for `*audit*.md` returns only the 15 cluster audits + `visual-quality-and-academic-design-audit.md`
  (a distinct cross-cutting artifact, not a cluster audit). No duplicates anywhere else.

## Check 6 — Every cited evidence path exists on disk

**Verdict: PASS**

- Exhaustive script (`test -f` equivalent over every extracted path): the 15 paths files cite
  **2,034 distinct `output/…` paths** → **0 broken**.
- The 15 audits + all top-level artifacts cite 108 further distinct `output/…` references → 19 initially
  flagged by the extractor, **all 19 resolved as shorthand, not breakage**: line-suffix citations
  (`….html:2911-2924` → file exists), brace expansions (`management-admins-permission-{6,7}` → both exist),
  ellipses (`…filter-….json` → the filter-family files exist), extension-less slugs
  (`student-student-history-fillter-2` → `.json`/`.md` exist), and `<role>`/`{admin,…}` placeholders.
  Every expansion was checked against a real file. **0 genuinely broken references.**

## Check 7 — Screenshots claimed opened correspond to actual inspection

**Verdict: PASS**

- Honest-counts lines present in **all 15** audits AND transcribed identically into the ledger:
  screenshotsOpened = 33/56/47/37/37/34/34/31/47/35/26/16/15/26/7 (C01→C15); recordsInspected =
  21/34/10/26/17/16/30/17/14/27/31/15/10/14/10. C14's header (19 legacy + 7 current = 26) matches its
  honest-counts line; C03's (40 legacy + 7 current = 47) likewise.
- Two adversarial image spot-checks (screenshots opened by THIS reviewer, not trusted):
  1. `output/roles/admin/screenshots/management-home-001-page-interaction-001.png` — confirms the C01-19/
     C01-20 claims pixel-for-pixel: profile popover **"Eslam Essam · Manager · eslammekky@gmail.com"**
     (real PII) and the **«(3.00 Fine)»** chip on the class row.
  2. `app/screenshots/teacher__ar__light__desktop.png` — confirms C02-29: the banner action row's «حذف»
     button is visibly clipped at the viewport edge.
- Audit prose is image-derived throughout (exact tile values, exact clipped-label findings, exact modal
  control counts), consistent with genuine inspection.

## Check 8 — Cluster normalized tables reconcile EXACTLY with the ledger

**Verdict: PASS**

- All 15 clusters: audit normalized-table rows = ledger section rows = declared header count, row-by-row
  identical on (capId, disposition, owner): C01 27 · C02 34 · C03 23 · C04 26 · C05 18 · C06 29 · C07 33 ·
  C08 17 · C09 26 · C10 27 · C11 34 · C12 21 · C13 16 · C14 29 · C15 20. **Grand total 380 = 380.**
- The ledger's 15×12 cluster-by-disposition matrix was re-computed from the raw rows and matches the printed
  matrix **cell-for-cell**; per-disposition grand totals reproduced exactly:
  PARTIAL 96 · MISSING 58 · INTENTIONALLY_IMPROVED 57 · FUTURE_BACKEND 40 · UNKNOWN_EVIDENCE 28 ·
  REJECTED_PRIVACY 20 · REJECTED_PAY_FREE 19 · COMPLETE_AND_VERIFIED 17 ·
  COMPLETE_BUT_VISUAL_REVIEW_REQUIRED 16 · REJECTED_SECURITY 13 · REJECTED_NO_FAKE 11 · HONEST_LOCK 5 = 380.
- capId uniqueness: every capId appears exactly once; C09's printed order is non-sequential but its ID SET is
  dense C09-01…C09-26 (as the ledger itself declares).

## Check 9 — Closed 12-word disposition set everywhere

**Verdict: PASS** *(round-2 FAIL remediated)*

- Ledger: 380/380 disposition cells ∈ the closed set. Audits: 380/380 normalized rows ∈ the closed set.
- Token sweep across ALL 042 artifacts for disposition-shaped uppercase tokens returns ONLY the 12 closed
  words (+ `FUTURE_ROUTES`, a nav constant, not a disposition).
- Round-2 defects re-verified fixed: better-register **B-2.5** now carries two well-formed closed tokens with
  explicit scoping ("REJECTED_SECURITY (the `password` column, C09-18) / REJECTED_PAY_FREE (the
  `hour_rate`/`currency` columns, C09-21)") — no compound `REJECTED_SECURITY/PAY_FREE` token remains anywhere
  (grep = 0). **B-8.1**'s `stored \|\| hash` pipe is now escaped; the row parses to the correct column count
  and its Disp. cell reads `COMPLETE_AND_VERIFIED`. All 63 B-rows parse cleanly with owners.

## Check 10 — Every PARTIAL/MISSING/UNKNOWN_EVIDENCE/FUTURE_BACKEND row has exactly one owner

**Verdict: PASS**

- Ledger needing rows: 96 + 58 + 28 + 40 = **222**; + 5 HONEST_LOCK (all five = the one `classSalaryReport`
  lock, → 057 as lock-preservation) = **227 allocated**, exactly the register's declared total.
- `future-spec-allocation-register.md` parsed section-by-section: 043 = 17 · 044 = 24 · 045 = 8 · 046 = 4 ·
  047 = 8 · 048 = 7 · 049 = 7 · 050 = 7 · 051 = 2 · 052 = 0 · 053 = 17 · 054 = 5 · 055 = 33 · 056 = 82 ·
  057 = 6 → **227 parsed = 227 declared**, every per-section declared count matches its parsed row count.
- **0** needing capIds unallocated · **0** capIds in more than one section (exactly one primary owner) ·
  **0** non-gap (complete/rejected/improved) rows allocated. The 6 rows whose audit owner was `—`/`not stated`
  (C09-02/-10/-17, C14-01/-17/-25) are all resolved to a named owner in the register (§3 resolution rules,
  each documented in its row).

## Check 11 — Every incomplete form in the forms ledger has an owner

**Verdict: PASS** *(round-2 FAIL remediated)*

- §0 census: 26 PARTIAL + 13 MISSING + 9 field-less gates + the UNKNOWN_EVIDENCE form set — every entry in
  §§1–6, 8–10 carries an explicit `Disp … · owner …` marker (056 bulk; 044 long-form/confirm-with-fields
  hosts; 055 propagation; 043 privacy-adjacent; 053 provider structure; future-backend persistence);
  §11 rolls all owners up. No ownerless incomplete form found.
- Round-2's stale-anchor defect re-verified fixed: **all 75 capId citations** in the forms ledger resolve to
  real ledger rows, and a full citation-by-citation semantic pass (every citation printed beside its ledger
  row text) shows topic-correct anchors throughout — e.g. §2.9 Suspend/Stop family → **C04-14**
  ("Lifecycle actions & modals (Suspend/Stop with date + auto-return + mandatory note…)"), Suspend/Stop
  student → **C03-05**, salaries → C07-12/-13, scheduled-action → C14-11/C06-06, backup → C08-12/C09-08/
  C09-26, imports → C09-03/C09-26. The formerly ownerless "Stop family" row now reads
  "PARTIAL, owner 056 + 044. C04-14".
- Spill-over stale anchors from round 2 also fixed: cross-role P-03 → C04-09 ("Credits tab") ✓;
  better-register B-2.1 → C09-05 ✓, B-9.5 → C08-16 ✓, B-9.11 → C06-15/C08-09/C11-28 ✓; visual audit
  V-A1 → C14-26 (gallery orphan-by-design) ✓, V-A6 → C01-01 ✓.

## Check 12 — Every modal/drawer issue has an owner (incl. the 30 `f-fbAdd` duplicate ids → 044)

**Verdict: PASS**

- The summary table's 12 finding rows (A · B.1 · B.3 · C.1–C.4 · D · D′ · E · E′ · E″) all carry owners;
  every Part E row (16 legacy-modal gaps + E′ per-row identity + E″ messages pane) is individually owned.
- The `f-fbAdd` investigation independently re-verified from `app/public/` bytes:
  `id="f-fbAdd-*"` occurs **84×** total = per-page `f-fbAdd-category` counts **5/3/2/2/2**
  (attendance/sessions/course/group/teacher, ×3 id names, ×2 langs) — exactly matching Part A.2's table;
  the "30" = 3 id names × 10 page files, as A.2 states. `teachers.html`/`.en` = 0 ✓. **Owner: 044**, stated
  in A.5 AND summary row A ("**044** (not 042)"), with the FC-25/`nestedFbAdd` guard constraint recorded.

## Check 13 — Every privacy finding has an owner (043 for enforcement)

**Verdict: PASS**

- All rows owned: P-01…P-09 (REJECTED_PRIVACY), S-01…S-08 (REJECTED_SECURITY), A-01/A-02, I-01…I-06
  (improvements, preserved), G-01…G-03 (our gaps → 043), U-01…U-03 (UNKNOWN_EVIDENCE → 043/054/055).
  §10 hands enforcement to **043** as primary with explicit rulings (a)–(g); secondaries named.
- Adversarial re-verification of the artifact's own claims: grep of `src/` + `public/` for all nine real
  crawl tokens (`eslammekky`, `01154859653`, `441200480244`, `201278910727`, `chat.whatsapp.com`,
  `ui-avatars`, `afaaqonline`, `201508604112`, `msadeqx9`) = **0 files**; `<input type="password">` = 0 and
  `<input type="file">` = 0 across all 115 pages (the 4 `type="file"` substring hits are `data-type="file"`
  facet attributes on `library.html`/`.en` — exactly as I-03 discloses).

## Check 14 — All cross-role lifecycle gaps have owners

**Verdict: PASS**

- `cross-role-propagation-map.md`: **26/26** lifecycle registers P-01…P-26 each end in an explicit
  `**Owner: …**` assignment (055/056/044 dominant; 043 for authorization legs; 054 room; 051 moderation;
  053 delivery); §5 NEVER-PROPAGATE register rows and §6 UNKNOWN_EVIDENCE rows are also owned; §8 rolls all
  owners up. 0 ownerless gaps.

## Check 15 — `page-review-ownership-map.md` is an exact partition of the 57 bases (+ index)

**Verdict: PASS**

- Parsed the §2 arithmetic table and verified against the actual public/ base list:
  045 = 11 · 046 = 12 · 047 = 12 · 048 = 8 · 049 = 7 · 050 = 7 → **57**, plus `index` explicitly in **050**
  (exactly once, marked "outside the 57-base PAGES contract").
- Set algebra: **0 duplicates across groups · 0 unowned bases · 0 phantom bases**; declared per-group counts
  = parsed counts for all six groups; §4–§9 owned-bases lists agree with the §2 table.
- Priority law: all 8 teacher-portal bases ⊂ **045** (earliest) and all 8 family-portal bases ⊂ **046**
  (second-earliest) — verified by set inclusion.
- §10 cross-checks hold: all 15 paths files referenced by ≥1 group.

## Check 16 — Better-than-legacy register findings marked as preserved

**Verdict: PASS**

- **63 B-rows** parsed; every row carries a non-empty "Owner (must preserve)" cell (0 blank/dash).
- The register is framed as a preservation list (title, header, "Preservation watchlist" §, and the
  allocation register's §2 counts the 57 INTENTIONALLY_IMPROVED ledger rows as "preservation list — any
  regression fails review"); partition map §3.9 binds every review group to it.
- The honest caveat block (C-1 teacher quick-tiles «قريبًا» lie · C-2 no 404 page · C-3 static bell dot ·
  C-4 inert pager) prevents over-claiming, each caveat owned.

## Check 17 — Rejected legacy behavior is not proposed anywhere else

**Verdict: PASS**

- Structural proof: the ledger's **63 REJECTED_\*** capIds are (a) **all** consolidated into
  `rejected-legacy-behaviour-register.md` (52 deduplicated RJ rows with NEVER/supersession rules, every
  rejected capId mentioned), and (b) allocated to **zero** future-spec sections in
  `future-spec-allocation-register.md` (the allocated set = exactly the 222 needing + 5 lock rows — verified
  0 intersection with the rejected set).
- Prose sweep: no artifact proposes restoring salary figures, credential inputs, PII ports, computed
  vanity metrics, fake success, or `type=password`/`type=file` surfaces; where rejected material borders a
  future capability, the artifacts consistently re-scope it (structure-only rows → 053; masked-counts-only
  → 043; "design it, do not restore it" → 055/056; forms §7 MUST-OMIT families = "never any spec").

## Check 18 — No application source/test/public/script/package file changed

**Verdict: PASS**

- `git status --porcelain` = **35 entries**; path-by-path check: **every** entry is under
  `academy-dashboard-discovery/specs/042-exhaustive-legacy-capability-reconciliation/` or is
  `.specify/feature.json`. **0 entries** touch `app/src`, `app/tests`, `app/public`, `app/scripts`,
  `package.json`, `nav.config.js`, or any other application path. (The one `D` entry is the stray
  `clusters/C09-audit.md`, itself inside specs/042 — see check 5.)

## Check 19 — Count and route invariants frozen

**Verdict: PASS** (all re-derived from `app/src/js/nav.config.js` + `app/public/`, not from artifact claims)

- `public/*.html` = **115** files = **57** mirrored bases × 2 + `index.html`.
- `nav.config.js` parsed: menu **50** items · implemented **49** · planned **0** · disabled **1**
  (`classSalaryReport`, route-less honest lock) · route split **24 deep (`#view=`) / 25 plain / 1 lock** ·
  `FUTURE_ROUTES` = **{}** (comments only, 0 keys). Every routed base file exists on disk (0 dead routes).
- Orphan census over all inbound `href`s in the built pages: exactly
  **`{gallery.html, gallery.en.html}`** have no inbound link (excl. `index.html` as the root).

## Check 20 — No stale remaining-work claims contradicting the final state

**Verdict: PASS**

- Grep sweeps for TBD / TODO / "not yet written" / "to be written" / "will be written" / "still to write" /
  "remaining work" / paused / WIP across all 042 artifacts **except `RESUME-CHECKPOINT.md`** (exempt by
  definition — the frozen pause snapshot, updated separately): **0 stale work claims**. Every
  "pending/remaining" hit is legitimate domain prose (legacy status vocabulary — "Sessions Pending",
  "Pending/Overdue" tiles — or gap-section headers like "Real remaining gaps", whose rows all carry owners).
- The two "consolidation pass" mentions (spec.md §9 note, page-and-route §5) are conditional descriptions
  whose named deliverables (`legacy-current-capability-ledger.md`, `future-spec-allocation-register.md`,
  `page-review-ownership-map.md`, the rejected/unknown registers, this checklist) **all now exist** and are
  evaluated here — the completion condition they state is satisfied, not contradicted.

---

# OVERALL READINESS VERDICT: **PASS** (20 of 20 PASS)

The round-2 failures (check 9: one malformed compound disposition token + one unescaped pipe; check 11:
stale capId anchors in the forms ledger and four spill-over artifacts) are verified **fixed in the current
bytes** — the disposition vocabulary is now closed-set everywhere, and every cross-reference resolves to a
semantically matching ledger row. Everything heavy reproduces exactly under independent recount: the corpus
accounting (339/339 pages, 2,034 evidence paths, 0 broken), the 380-row audit↔ledger reconciliation
(including the full 15×12 disposition matrix), the 227-row exactly-one-owner allocation, the 57(+1)-base
partition with teacher/family in the earliest groups, the rejected-behavior containment (63 rejected rows
consolidated, 0 re-proposed, 0 allocated), the clean tree, and the frozen count/route invariants re-derived
from source. Spec 042 meets its own §9 quality gates and is ready to be declared complete — pending only the
watcher commit.

---

## Plan-phase adversarial review (round 2)

**Scope**: plan.md (D1–D14) · research.md (R1–R8) · data-model.md (17 entities) · quickstart.md ·
contracts/ (15 files), as amended after round 1. Reviewer did NOT author these artifacts. Every number
below was re-derived by script/grep from the specify-phase corpus, the read-only app tree, and git —
never trusted from the artifact under review. This section REPLACES the round-1 section per the review
loop's protocol; the round-1 verdict was FAIL 14/15 on exactly one defect (the fix-first item-5 owner
mis-seed, 049 vs 048), whose repair is re-verified below (check 9). 15 checks; verdict per check.

| # | Check | Verdict | Reproduced evidence (and, for FAIL, the exact deficiency) |
|---|---|---|---|
| 1 | No duplication of the exhaustive audit | **PASS** | Script compared every `\|`-table row ≥100 chars in the 12 ledgers/registers + 15 cluster audits against plan.md/research.md/data-model.md/quickstart.md/contracts/*: **0 verbatim table-row copies**. The only full table reproduced is the contract-3 partition (required verbatim by the partition check below); the N-1…N-7 and scoreboard summaries in contract 8 carry explicit "frozen from map §4 — re-derive there, never here" / "POINTERS ONLY; the map's §8 table is the assignment of record" disclaimers; contract 2 §4's one-row totals table says "cite, never recount informally". |
| 2 | Contracts reference canonical artifacts by path + stable ID | **PASS** | All 15 contracts open with a "Canonical sources" block (path + § + ID namespace). Spot-verified ~25 citations: contract-4 edge groundings (C01-17→047-host · C02-29→045-host · C04-18 family host · C09-11/12 · C10-08 · C11-02 · C02-10 sec-043 · C02-15 sec-053/043 · C02-33 sec-054 · C10-20 sec-043 · C15-04 sec-051/054 · C01-02/C06-27 sec-047 · C14-11/12 sec-048) all resolve in the register with the claimed secondaries; research R1's "C02-04 sec-dep 055" resolves (register §4); quickstart B1's 17-row 043 list and B4's 5-row 054 list (with dispositions) match register §4/§15 exactly; the C12-13 trace (register→C12-audit:236→paths) resolves; all 8 pixel-grounding screenshots named by contracts 5/6/7 EXIST on disk (verified by file test); privacy ID namespaces re-derived: S×8 · P×9 · G×3 · U×3 · I×6 · A×2 ✓. |
| 3 | 57-bases / index semantics correct everywhere | **PASS** | Grep of every "58" across the 19 plan-phase files: all instances are "58 review units", the disposition census "58 MISSING", or an explicit REJECTION of the "58 PAGES bases" phrasing (plan D4 · research R3 "factually wrong… rejected" · contract 12 §2 · contract 3 §3 · data-model E6 "The 58th unit is NEVER a `PAGES` base"). 57×2+1=115 restated identically in plan D4, research R3, data-model E6, quickstart step 8, contracts 3 §3 / 12 §2. Zero "58 PAGES bases" assertions. |
| 4 | Spec 052 remains a greenfield charter | **PASS** | Register §13 re-read: explicit 0-row allocation ("recorded here so the spec's zero-allocation is explicit, not an omission"); §19 row `052 … 0`; my own awk over §4–§18 re-derives 052 = 0 rows. Plan D6 + research R4 + contract 4 §4(c)+§5.10 + data-model E9 invariant (i) + quickstart B3 all keep 052 CHARTERED with "real backend requirement for any computed standing — no client-side ranking, ever". C08-09 re-verified REJECTED_NO_FAKE at `cluster-audits/C08-audit.md:191`; RJ-39 carries the `Top Performer` ban + "052 owns privacy-safe recognition". |
| 5 | One physical lock, never five | **PASS** | Register §18 re-read: the 5 HONEST_LOCK rows are exactly C03-14 · C06-13 · C07-23 · C08-08 · C09-23, each annotated "same lock — preservation verification" → 057; §19 cross-check "all five HONEST_LOCK rows are the one sanctioned `classSalaryReport` lock". Sweep for "five locks"/"5 locks" over all plan-phase artifacts: hits ONLY in negation sentences (plan D3 · data-model E4 (ii) · contract 2 §2 · quickstart failure-mode 8). Contract 12 invariant 7 pins lock = 1. |
| 6 | 043–057 clear, non-overlapping boundaries | **PASS** | Contract 4 §5 = 15 one-paragraph charters keyed to register sections + row counts. Re-derived by script from register §4–§18: per-spec rows **17·24·8·4·8·7·7·7·2·0·17·5·33·82·6 = 227** (matches §19, contract 2 §4, and contract 4 §5 verbatim); **227 unique capIds, 0 duplicates** — exactly one primary owner per row; secondary deps confined to their own column (register §1 / contract 2 §3: "never co-owners"). |
| 7 | Dependency graph acyclic | **PASS** | Contract 4 §1 waves 0–5; §2 edge list checked edge-by-edge: every edge targets a strictly lower (wave, spec-number) pair; the single intra-wave edge **054→053** is resolved lexicographically (053<054) exactly as plan D5 itself declares 054's deps (043,044,053) — a valid topological order, hence acyclic. *Non-blocking imprecision*: plan.md D5's closing parenthetical "every edge points to a lower wave" is not literally true of 054→053; the BINDING artifact (contract 4 §3) states the correct (wave, spec) proof and names the exception explicitly. |
| 8 | Every page owned exactly once | **PASS** | Programmatic base-list diff, contract 3 §1 vs ownership map §2: **6/6 groups IDENTICAL** (only the map's parenthetical annotation on `index` differs); 57 bases, all unique; arithmetic re-derived **11+12+12+8+7+7 = 57** ✓ + `index`→050 owned exactly once; 0 duplicates, 0 orphans. The move protocol (contract 3 §4: 6 mandatory fields incl. arithmetic re-proof + zero-overlap/zero-orphan + explicit map supersession) is present; this plan moves none (D7). D2 precedence over the visual audit's §10 draft verified: §10 is headed "proposed" and differs (e.g. 19-page 046, finance∈049) — correctly ruled superseded, not edited. |
| 9 | Visual redesign requirements BINDING | **PASS** | Contract 5 §2 NOT-list = "review-failure condition[s]"; §3 IS-list = review criteria; §4 = the 11-step loop (re-counted: 11 steps; steps 9–11 "never skippable"; "a design is not complete because the source looks correct"); §5 = the 8-surface matrix (re-counted: 8 surfaces) with R-2/R-3 as unrelaxable hard gates; §6 pre-seeds the five §11 fix-first items. **Round-1 defect re-verified FIXED**: fix-first item 5 now reads "**048**" in both `contracts/academic-visual-redesign-handoff-contract.md` §6.5 and `plan.md` D8, each carrying the explicit correction note ("the visual audit's §11 «049» tag follows its SUPERSEDED §10 draft partition (D2) and is corrected here"); visual audit §11 itself (which still says «049») is correctly left unedited per D14. All five owners now re-derive against the canonical partition: teacher-portal∈045 ✓ · dashboard∈047 ✓ · pager+mobile drawer = 044 system ✓ · finance∈048 ✓. |
| 10 | Teacher + Family remain Priority 1 | **PASS** | Ownership map §1 "Priority law honored… **earliest** groups — 045 and 046… never deferred late" → carried as contract 3 §5 ("No re-ordering of the wave-1 groups may demote them behind an admin-only group"), contract 5 §1.3 ("Priority 1 = Spec 045 (teacher) and Spec 046 (family)… run first among the page groups"), contract 4 §5.3 ("earliest, highest priority"), data-model E7 priority note, quickstart B2 ("HIGH PRIORITY"). Set inclusion re-verified: all 8 teacher-portal bases ⊂ 045, all 8 family-portal bases ⊂ 046. |
| 11 | Privacy foundations precede social/integration | **PASS** | 043 = Wave 0 (contract 4 §1). Edges re-checked in §2: **051→043**, **052→043**, **053→043**, **054→043** (plus 044/053 as applicable) — every risky social/integration spec depends on 043; 045–050 may not MERGE redesigned pages before 043's rules are ratified (D5a, contract 4 §4a). Contract 6 §2 binds S-01…S-08 / P-01…P-09 / G-01…G-03 / U-01…U-03 / I-01…I-06 / A-01/A-02 to 043 requirement classes by ID (all namespaces re-derived from the findings document ✓). |
| 12 | Forms/overlays have explicit future owners | **PASS** | The 30 `f-fbAdd-*` ids → **044** stated identically in contract 2 §4, contract 7 §1, contract 13 §5, data-model E16 (i), and `protected-test-carryover.md` §5 — same counting basis everywhere (30 = 3 id NAMES × 10 page files; per-file occurrences 5/3/2/2/2 re-verified against modal ledger Part A). The D5(b) ownership-vs-execution split (056 = accountable auditor of its 82 rows; page groups DELIVER their safe field sets; 056 runs the FINAL census after 045–050 + 055) is stated consistently in plan D5(b)+D10, research R1(b), contract 4 §4(b), contract 7 §5, quickstart B5, data-model E15. Forms census re-verified from the ledger: 48 audited · 26 PARTIAL + 13 MISSING · 9 field-less gates · 11 law-driven omission families · validation ~0. |
| 13 | Preservation + rejection registers binding | **PASS** | Contract 9: "MUST-PRESERVE requirement", MUST enumerate-by-ID + re-assert post-change, "**Regression = review failure** — the change does not merge"; P-1…P-9 named; the watchlist + caveats C-1…C-4 carried. Contract 10: MUST enumerate + assert ABSENCE, "Zero re-proposals", NEVER rows never re-opened, guard-weakening forbidden (the PAY28/"Sara" warning). The 10 headline rows (RJ-27 PayPal-Live · RJ-29 no-confirm backup · RJ-26 plaintext secrets · RJ-11 WhatsApp PII+invite URL · RJ-39 ranking · RJ-01/02 teacher salary · RJ-30 shared OTP · RJ-10 import columns · RJ-13 operator PII · RJ-38 fake success) verified row-by-row in the register; register category totals re-derived **10+12+15+15 = 52 RJ** (matches contract 10's split exactly); B register re-derived **63** unique B-x.y; both contracts route change through declared supersession + mutation proof (contract 13). |
| 14 | No app/test/public change | **PASS** | `git status --porcelain` = **6** entries: 5 `??` plan-phase files (plan.md · research.md · data-model.md · quickstart.md · contracts/) + 1 ` M` `checklists/requirements.md` (the review-loop's own appendix; its diff = pure append after committed line 288 — specify-phase content byte-identical, re-verified against `git show HEAD:`). **0** entries outside `specs/042-…/**`; CLAUDE.md and `.specify/` untouched; `git status --porcelain academy-dashboard-discovery/app` = EMPTY and `git diff --stat -- academy-dashboard-discovery/app` = EMPTY (zero-diff proof, non-destructive). |
| 15 | No invention of missing legacy evidence | **PASS** | Contract 11 §4 anchor rows match the UK register exactly (UK-01→043 · UK-02→053 · UK-08→054 · UK-17→056 · UK-25/26/43→043 · UK-46→057 · UK-47→045-050); 47 unique UK IDs re-derived. Grep of all plan-phase artifacts for the UK subjects (Message Builder/504, login/register, live classroom/room UI, empty-table unknowns): every mention states ONLY the negative capture ("a single 504 capture", "never captured — crawler ran authenticated", "redirected to home in both roles") — zero unevidenced legacy facts asserted; quickstart B4 keeps 054's two UNKNOWN_EVIDENCE rows unknown; the 057 404-page stays "a recorded proposal, never built inside 042" (contract 12 §3, research R8); data-model E2/E3 make error captures NEGATIVE evidence by invariant. |

### Non-blocking errata (recorded for the tasks phase; neither fails a check above)

1. **data-model.md:140 (E6)** cites "the 8 dimensions of `page-review-ownership-map.md` §3" — the map's §3
   lists **9** numbered dimensions (quickstart step 1 correctly says "nine"). One-word erratum; the canonical
   map governs (D1/D2) and no binding directive derives from the miscount.
2. **plan.md D5 closing parenthetical** ("every edge points to a lower wave") is imprecise for the declared
   intra-wave edge 054→053; the binding dependency contract §3 carries the correct (wave, spec-number) proof
   and names the exception. plan D5 itself lists 054's deps as (043,044,053), so no scheduling error can result.

### PLAN READINESS VERDICT: **PASS — 15/15**

The single round-1 blocker (fix-first item-5 owner 049→048) is repaired in both named files with an explicit
supersession note, and the correction re-derives against the canonical partition. Everything else reproduced
exactly under independent re-derivation: 0 ledger duplication, the 380/227/52/47/63/26/48 totals, the
57(+index) partition matching the ownership map verbatim, the acyclic wave graph with 043∥044 foundations
first, the 052 greenfield charter, the single `classSalaryReport` lock, the consistent 044/056 + D5(b) split,
the binding preservation/rejection inheritance, the no-invention holds, and the clean zero-diff app tree.
The plan phase is ready for `/speckit.tasks`.
