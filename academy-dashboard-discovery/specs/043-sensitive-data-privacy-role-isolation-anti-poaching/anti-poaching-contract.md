# Anti-Poaching Contract — Spec 043 (absolute negative requirements)

**The product rule this contract exists to freeze:** *A teacher must never be able to obtain guardian/student
contact information or other sensitive data that could be used to take students outside the academy.* Binding on
every spec that touches a teacher surface (045 first, then 055/056). Grounded in A-01/A-02
(`privacy-and-sensitive-data-findings.md` §4), RJ-19/RJ-20/RJ-22, N-5 (`cross-role-propagation-map.md` §5), and
the P-20/P-21 authorization legs. These are **negative requirements, never backlog** (`contracts/rejected-
legacy-behaviour-contract.md`).

## The frozen rules (AP-1 … AP-11)

| ID | Rule | Evidence it refuses | Guard (mechanism) |
|---|---|---|---|
| **AP-1** | A teacher NEVER sees a guardian phone or e-mail. | Legacy `Show Parent Phone`/`Show Parent Email` grantable-to-all (C12-13); the null-groups leak (P-01) | matrix cells 3/4 TE=DENY; teacher-body contact census (MUT-1); no teacher-reachable parent-contact grant (AP-8) |
| **AP-2** | A teacher NEVER sees a student's private phone / e-mail / home address. | C03-18/-19 | matrix cells 5/6 TE=DENY; teacher-fixture contact census (MUT-2 target) |
| **AP-3** | A teacher NEVER sees country / locality unless it is necessary to teach an assigned student — and it is not. | The legacy teacher roster's `Country` column (A-02, pixel `VUT`) | matrix cell 6 TE=DENY; the current roster already drops it (`teacher-students.js`); census bans a country column on teacher pages |
| **AP-4** | A teacher NEVER sees lead / prospect contact data. | Raw lead table with no role check (C03-13, RJ-22) | matrix cell 9 TE=DENY; leads.html is admin-only by policy (enforcement backend) |
| **AP-5** | A teacher NEVER receives "Left Students" / "Acquired Students" attribution. | The teacher-profile poaching ledger (A-01, `management-teachers-1.json` headings) | matrix (attribution is not a data class rendered to TE); no such table on any teacher surface; census bans the headings |
| **AP-6** | A teacher sees only the MINIMUM learning identity needed to teach assigned students (name + subject + level + course). | The over-broad legacy roster (History/Schedule/Report/plans/certificate drill-downs + Country) | matrix cell 1 TE=ALLOW (minimum only); `teacher-students.js:5-7` design law preserved |
| **AP-7** | No export / copy / share control may expose hidden contact data. | Legacy `Phone Export Invoices` permission; export-of-contacts patterns | the `export guardian contacts` permission is teacher-unreachable (AP-8); no teacher surface has a contact-export affordance |
| **AP-8** | No teacher-facing permission can grant parent-contact visibility. | Legacy made contact a grantable-to-everyone permission (RJ-37) | `parent-contact-default-deny-contract.md`: the 5 grants are structurally unavailable to teacher roles (MUT-2) |
| **AP-9** | No contact value exists in the DOM, fixtures, data-attributes, query strings, drawer payloads, or hidden panels of any teacher surface. | The PAY28 hidden-panel lesson (Spec 041) — data can hide in `[hidden]` panels | teacher-body + hidden-panel contact census (mirrors the Spec-041 PAY28 panel-scoped grep); MUT-1 |
| **AP-10** | Masking is INSUFFICIENT where a teacher should receive no value at all — the requirement is DENY (data absent), never CSS/`hidden` concealment. | "Hiding a link is not authorization" (§6) | DENY cells mean absence from fixtures/DOM, verified by grep = 0, not by a `display:none` |
| **AP-11** | Admin-only attribution (e.g. Left/Acquired), IF ever retained, requires an evidenced operational purpose, must not expose pay, and must never be teacher-visible. Until a purpose is proven it is EXCLUDED. | RJ-19 re-proposal rule; the `salary_*` pay-adjacency | `rbac-and-capability-model-decision-register.md` OQ-2 safe default = exclude; any retention is admin-only + purpose-recorded |

## The `salary_*` adjacency (pay-free intersection)

The per-teacher notification matrix (C02-05) includes a `salary_by_whatsapp` / `salary_by_email` row
(pixel-confirmed, `management-teachers-1-006`). It is a routing row, not a figure — but it is pay-adjacent.
**Rule**: the `salary_*` notification row is never surfaced on a teacher-visible surface (it stays an admin-only
routing control at most, figure-free, owner 053 for delivery). This intersects the teacher pay-free GLOBAL law
(PAY28) — a teacher surface carries no salary token of any kind.

## Current-state compliance (proven, `current-rendered-data-exposure-inventory.md`)

The current app **already complies** with AP-1…AP-11: grep across all `teacher-*.js` pages and
`teacher-*.html` bodies = **0** guardian/student contact tokens, **0** country column, **0** Left/Acquired
tables; the only contact on a teacher surface is the teacher's OWN synthetic e-mail on her own profile
(`sara@academy.example`, `teacher-profile.js:53`). 043 does not change the current app; it **freezes** this
posture as an absolute invariant and names the guards that keep it (see
`protected-test-and-mutation-register.md`). Any future teacher-surface change (045/055/056) that reintroduces a
DENY-class value fails review.

## The absolute clause

There is **no exception** to AP-1…AP-4 and AP-8. No permission, no role override, no admin convenience, no
"reception needs it too" argument may grant a teacher parent-contact visibility. Reception/advisor contact
access (a separate role) is purpose-scoped and masked (matrix RA cells; OQ-3) and does not weaken the teacher
absolute. This is the one rule the whole spec exists to protect.
