# Contract 3 — Page-Review Partition (Specs 045–050)

**Canonical sources**: `page-review-ownership-map.md` (§1 priority law, §2 partition arithmetic, §3 review
dimensions, §4–§9 group charters, §10 cross-checks) · `plan.md` D2 (precedence) / D4 (57-vs-58 semantics) /
D7 (immutability + supersession protocol) · superseded draft: `visual-quality-and-academic-design-audit.md` §10.

**Bound parties**: Specs 045–050 (page groups); any spec tempted to touch a page it does not own.

## 1. The binding partition (ownership map §2 — verbatim)

| Group | Owned bases | Count |
|---|---|---|
| **045** | teacher-portal · teacher-schedule · teacher-students · teacher-outcomes · teacher-tasks · teacher-reports · teacher-library · teacher-profile · teachers · teacher · teacher-performance | **11** |
| **046** | family-portal · family-schedule · family-progress · family-billing · family-requests · family-materials · family-profile · family-children · family-child · families · family · add-family | **12** |
| **047** | student-portal · student-schedule · student-homework · student-progress · student-history · student-materials · student-profile · students · student · dashboard · sessions · attendance | **12** |
| **048** | settings · staff · finance · schedule · schedule-search · sessions-analysis · public-holiday · scheduled-actions | **8** |
| **049** | reports · courses · course · groups · group · library · certificates | **7** |
| **050** | messages · leads · tasks · announcements · time-converter · portals · gallery — **plus `index`** | **7** (+ index) |

**Arithmetic**: 11+12+12+8+7+7 = **57** bases ✓, each owned **exactly once** — no duplicate, no orphan, no shared
owner — plus `index` assigned to 050 → **58 review units = 115 files**. The declared deviation from the
recommended sketch (session-lifecycle core in 047; the five scheduling-ops utilities in 048) is documented in
map §2 and is part of the binding shape.

## 2. Precedence ruling (plan.md D2)

`page-review-ownership-map.md` §2 is **canonical** — it is what the adversarial review verified (check 15).
`visual-quality-and-academic-design-audit.md` §10 carries an older *proposed* partition: it is a historical
draft, already labeled "proposed", and is **not edited** (specify-phase ledgers stay untouched). Any future
disagreement among 042 artifacts resolves by the D2 chain: cluster audits (normalized tables) →
consolidation ledgers/registers → prose → pre-consolidation proposals.

## 3. Index semantics (plan.md D4)

**57 = the bilingual `PAGES` bases** (AR/EN pairs, 114 files). `index.html` is the **one additional single-file
review unit** (57×2+1 = 115), the portals-hub shell counterpart, **outside the 57-base `PAGES` contract**, and
explicitly owned by **050**. Visual review may speak of "58 review units"; nothing may rename this "58 PAGES
bases", and no count contract changes because of the phrasing.

## 4. Page-move supersession protocol (plan.md D7)

The partition is **immutable during planning** — this plan moves **none**. A later spec may move a base only by
an **explicit supersession of the ownership map** carrying ALL of:

1. **Evidence** — why the base's journey belongs to the other group (cited by path + stable ID);
2. **Dependency justification** — the wave-graph consequences (see `future-spec-dependency-contract.md`);
3. **Arithmetic re-proof** — the six group counts re-summed to exactly 57 (+ index owned once);
4. **Zero overlap** — no base in two groups after the move;
5. **Zero orphan** — no base unowned after the move;
6. **Explicit map supersession** — the move names `page-review-ownership-map.md` §2 as superseded for that row;
   the map itself is never silently edited.

Reviewing a base you do not own — even "just fixing one small thing while in there" — is a scope violation.
Verifying an allocated gap's disposition **on** your surface (map §10, "gap ownership") is review, not ownership.

## 5. Teacher/family earliest-groups law (map §1)

The teacher portal (teacher-portal + 7 `teacher-*` internals) and the family portal (family-portal + 7
`family-*` internals) hold HIGH-PRIORITY ownership in the **earliest** groups — **045** and **046** respectively
— never deferred late. They are the weakest experiences and the most-used role surfaces (spec.md §7). No
re-ordering of the wave-1 groups may demote them behind an admin-only group.
