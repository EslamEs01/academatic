# Contract 4 — Future-Spec Dependency Graph (043–057)

**Canonical sources**: `plan.md` D5 (the evaluated graph + three formalizations) / D6 (052 greenfield) ·
`future-spec-allocation-register.md` §4–§19 (rows + secondary-dependency columns) ·
`cross-role-propagation-map.md` §8 (owner roll-up) · `page-review-ownership-map.md` (wave-1 groups).

**Bound parties**: the sequencing of Specs 043–057. Secondary deps in the register are informational pointers,
never co-owners (register §1); the **binding** edges are the ones below.

## 1. Waves (plan.md D5)

Wave 0: **043 ∥ 044** · Wave 1: **045 · 046 · 047 · 048 · 049 · 050** (parallel) · Wave 2: **051 · 052 · 053 ·
054** · Wave 3: **055** · Wave 4: **056** · Wave 5: **057**.

## 2. The edge list (X → Y = "X depends on Y"; every edge points to a strictly lower wave)

| Edge(s) | Rationale (grounded by row / map ID) |
|---|---|
| 045…050 → **043** | Three-gate (§4a): specify/plan on 043's ratified role-visibility/PII rules; a page handling protected data **merges only after the applicable 043 frontend protection is implemented and verified** — a ratified rule does not prove the rendered page obeys it. Grounding: C02-10 (043 capability-gate secondary) · C12-13/C12-01 rules bind teacher/staff surfaces · map §8 row 043 (P-20/P-21, N-2…N-7) · D9. |
| 045…050 → **044** | Three-gate (§4a): implement in isolation on the frozen component API; a page using the shared modal/drawer/long-form system **merges only after the applicable 044 shared implementation + its overlay tests are green** — a frozen API does not prove the implementation exists. Local duplication of a pending 044 component is forbidden (§6). Grounding: 044 rows sited on group pages — C01-17 (047 host) · C02-29 (045 host) · C04-18 (046) · C09-11/12 (048) · C10-08 (049) · C11-02 (050 host) — and the 30 `f-fbAdd` ids (044 preamble). |
| 051 → 043, 044 | Chat needs the `can_chat` grant model (C02-15 secondary: 043) and safe interaction surfaces (C11-08: 044 row, secondary 051). Transport (C02-15 secondary: 053) is an execution note, not a merge blocker — the honest surface may land gated. |
| 052 → 043 | **No incoming legacy-debt edge** (0 rows, register §13). Depends only on 043's audience-scoping rules + its **own integrity contract** — see §4 below. |
| 053 → 043, 044 | Integration surfaces render structure-only secrets (043 no-secret posture; C10-20 secondary 043) and live in Configure drawers (C09-11 sticky footer, 044). |
| 054 → 043, 044, 053 | Meeting links are role-, session- and time-scoped (D9); the room lifecycle needs 044's interaction hosts (C01-15 secondary 044-adjacent via 056/045) and 053's provisioning channel (C02-33 → Zoom, secondary 054; C15-04 transport, secondary 054). |
| 055 → 045…050 | Reconciliation needs the redesigned producer/consumer pages to exist first (map §8: 055 is the primary owner of P-01…P-26 legs spanning those surfaces). |
| 055 → 053, 054 (channel-dependent legs only) | P-15 notification channels are 053's; P-22 rooms are 054's (map §8). Legs not touching a channel/room do not wait. |
| 056 → 045…050, 055 | The final field-level census runs **after** the page groups deliver their field sets and 055 wires the cross-role forms (register: page groups appear as secondary deps on 056 rows, e.g. C01-02/C06-27 → 047, C14-11/12 → 048). |
| 057 → 043…056 (all) | Final production freeze: re-freeze counts/routes, verify the sole lock (C03-14 · C06-13 · C07-23 · C08-08 · C09-23), record standing refusals + UNKNOWN legs (map §8 row 057). |

## 3. Acyclicity proof

Order every spec by the pair **(wave number, spec number)**. Every edge in §2 points from a strictly greater
pair to a strictly lesser one: wave-1 edges target wave 0; wave-2 edges target wave 0, except **054→053**, which
is intra-wave-2 and resolved by spec number (053 < 054 — exactly as `plan.md` D5 declares 054's deps as
(043,044,053)); wave-3/4/5 edges target lower waves only. A cycle would require some edge to point to an equal
or greater pair; none does — therefore the graph is acyclic. Under the three gates (§4a) the **054→053** edge
means: 053's ratified provider/provisioning contract opens 054's Gates 1–2 (specify; implement honest room/link
*structure* in isolation); 054's **Gate 3** — claiming or merging an **operational** Zoom/Meet room lifecycle —
requires the 053 provider **seam implemented and verified**. If the provider does not exist, the feature stays
explicitly gated and student/family join surfaces claim no availability (§6.7).

## 4. The three formalizations (plan.md D5 a–c)

- **(a) THE THREE DEPENDENCY GATES** *(corrected 2026-07-16; supersedes the original "contracts ratified =
  merge-ready" wording, which was rejected as unsafe — ratification proves intent, never implemented safety)*:
  - **Gate 1 — SPECIFY/PLAN START**: a dependent spec is specified/planned once the relevant foundation
    **contracts are ratified**. Diagnosis + targeted visual grounding are ungated and may begin immediately.
  - **Gate 2 — IMPLEMENTATION START**: isolated branch/worktree implementation begins once the applicable
    interfaces/contracts are **frozen**, owned file boundaries are known, and single-writer conflicts are
    prevented (contract 14 §3). Parallel work may proceed but may not claim integrated completion.
  - **Gate 3 — MERGE/COMPLETION**: no dependent implementation is declared complete or merged until the
    applicable foundation **implementation and its tests are available and green**. Contract ratification
    alone is never sufficient. Per-spec rules: **§6**.
  043's graph deliverable at Gate 1 is the ratified role-visibility rule-set; 044's is the frozen
  interaction-system component API (long-form host · sticky action footer · gated-affordance rule ·
  uniquified nested drawer). Gate 3 additionally requires those deliverables **implemented and verified**
  wherever a dependent surface exercises them.
- **(b) 056 ownership vs execution split.** 056 owns its 82 rows as the *accountable auditor*; safe field sets
  for a group's surfaces are *delivered inside that group's review* (guided by `forms-completeness-ledger.md` +
  the 044 host system), then **verified by 056's final census**. 056 is never a mid-graph bottleneck.
- **(c) §052 — greenfield charter (plan.md D6).** 052 has 0 allocated rows; the only legacy "recognition"
  evidence (C08-09 computed Percentage / Top Performer) is REJECTED_NO_FAKE. 052 enters via its own future
  scoping: privacy-safe recognition with a **real backend requirement for any computed standing** (no
  client-side ranking, ever). Inherited as *context, not debt*: visual-audit rows V-F1/D-4, privacy P-09/P-11
  (guardian-facing, never a ranking), 043's audience scoping.

## 5. Charters (one paragraph each; register section + row count are the scope authority)

1. **043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching** (register §4, **17** rows, 9 backend-prereq):
   ratifies who may see what per role (guardian contact data, PII classes), anti-poaching, no-secret; RBAC
   *enforcement* stays FUTURE_BACKEND — 043 ratifies rules, the backend enforces them.
2. **044 — Modal, Drawer & Long-Form Interaction System** (§5, **24** rows + the 30 `f-fbAdd` duplicate ids):
   the interaction system API — long-form hosts, sticky footers, gated affordances, nested-drawer uniquification,
   overlay a11y patterns.
3. **045 — Page review: teacher portal + teacher admin** (§6, **8** rows; map §4, 11 bases): earliest, highest
   priority; fixes the quick-tiles «قريبًا» lie (C01-16/C02-16/C15-14); teacher pay-free GLOBAL absolute.
4. **046 — Page review: family portal + family admin core** (§7, **4** rows; map §5, 12 bases): family zero-pay,
   STATUS-FIRST billing, no corpus PII.
5. **047 — Page review: child-view + students & session-lifecycle ops** (§8, **8** rows; map §6, 12 bases):
   child-view law («عرض الابن»), dashboard/sessions/attendance lifecycle surfaces.
6. **048 — Page review: admin back-office + scheduling ops** (§9, **7** rows, 6 backend-prereq; map §7, 8 bases):
   finance stays no-fake-money/figure-free; settings stay no-secret.
7. **049 — Page review: reports, courses & groups, content catalog** (§10, **7** rows; map §8, 7 bases): reports
   finance-free forever; no chart/computed %; static certificate designer stands.
8. **050 — Page review: control center, utilities, hub & shell** (§11, **7** rows, 2 backend-prereq; map §9,
   7 bases + `index`): gallery stays the frozen orphan pair; the hub keeps its honest notes.
9. **051 — Community, Moderation & Safe Social Interactions** (§12, **2** rows): teacher chat surfaces under
   043's `can_chat` gate; transport arrives via 053.
10. **052 — Recognition & Privacy-Safe Leaderboards** (§13, **0** rows): greenfield per §4(c) — never a
    reconciliation debt, never a client-side ranking.
11. **053 — Integrations Command Center** (§14, **17** rows, 8 backend-prereq): every channel (WhatsApp, email,
    in-app, payment/payout providers); legacy plain-text secrets stay refused.
12. **054 — Embedded Virtual Classroom & Meeting Lifecycle** (§15, **5** rows, 1 backend-prereq): P-22 in full
    (map §8); the join GATE stands until a real room exists.
13. **055 — Cross-Role Propagation & Workflow Consistency** (§16, **33** rows, 7 backend-prereq): primary owner
    of the cross-role map (26 lifecycles P-01…P-26); producers for consumer-only surfaces.
14. **056 — Complete Forms & Data Capture Audit** (§17, **82** rows, 6 backend-prereq): the accountable
    field-level auditor per §4(b); final census after 045–050 and 055.
15. **057 — Final Production Freeze** (§18, **6** rows): lock-preservation verification (the ONE
    `classSalaryReport` lock), the C14-27 404-page **proposal** (any count impact is declared there, never
    pre-applied), and the final count/route/test re-freeze.

## 6. Per-spec gate rules (correction pass, 2026-07-16 — binding; applies §4a's three gates)

1. **045–050 (page groups)**: specify/plan after the applicable 043/044 contracts are ratified (Gate 1);
   visual diagnosis starts immediately (ungated); page implementation proceeds in isolation after the shared
   contracts/interfaces are frozen (Gate 2). **Gate 3**: a redesigned page that handles protected data may not
   merge until the applicable **043 frontend protection is implemented and verified**; a page using the shared
   modal/drawer/long-form system may not merge until the applicable **044 shared implementation is available
   and verified**. A page that does not exercise a given 043/044 capability may proceed only with an
   **explicit non-applicability proof in its own plan/tasks**. **No page may duplicate a pending 044 component
   locally** merely to avoid the dependency.
2. **043**: real server-side authorization stays **FUTURE_BACKEND** (this repository is frontend-only). But
   frontend fixtures and rendered surfaces must **already obey the ratified visibility law**: protected data
   not rendered · secrets not rendered · cross-role direct-link claims honestly gated · **no wording may claim
   backend authorization exists**. A page depending on backend enforcement remains an honest gate until the
   real backend exists.
3. **044**: "component API frozen" opens dependent **Gate 2 only**. Dependent **Gate 3** requires the
   applicable shared component implementation with its **focus · keyboard · backdrop · scroll · mobile ·
   RTL/LTR · duplicate-id · required-selector · a11y** tests green.
4. **051**: may be specified after the 043/044 contracts (Gate 1). A community UI cannot merge if it renders
   unsafe audiences, fake moderation, or duplicates an unimplemented interaction host. Transport may remain
   honestly gated.
5. **052**: may be specified after 043's privacy rules + its **own integrity contract** (Gate 1). Any computed
   ranking remains backend-required. A privacy-safe **authored** recognition preview may exist only if it does
   not claim computed standing. It cannot merge with public-exposure rules unresolved.
6. **053**: specify/plan after the 043/044 contracts (Gate 1). Configure surfaces cannot merge until the
   applicable **044 host implementation** is ready (Gate 3). Secrets remain structure-only and are never
   rendered as values. Real connection/payment behavior stays gated without a backend.
7. **054**: may be specified after the 053 provisioning/provider **contract** is ratified (Gate 1); may
   implement honest room/link **structure** in isolation (Gate 2). It may **NOT claim or merge an operational
   Zoom/Meet room lifecycle** until the required **053 provider seam exists and is verified** (Gate 3). If the
   provider does not exist, the feature remains explicitly gated; student/family join surfaces cannot claim
   availability without a **real propagated room/link**.
8. **055**: remains after the producer/consumer page features. It must verify **real cross-role propagation
   legs, not only contracts** — a leg is closed by an observed propagation, never by a ratified intention.
9. **056**: remains the final field-level auditor. Page groups deliver page-local forms; 056 verifies the
   complete product **after** the page and workflow implementations.
10. **057**: remains last and requires **all previous implementation/merge gates satisfied** — not merely all
    contracts ratified.
