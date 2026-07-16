# Child-View Account Boundary — Spec 043

Owns G-03 (`privacy-and-sensitive-data-findings.md` §8) via C12-09. The child-view («عرض الابن») renders a
"change your password" gate for a login that **does not exist**. The legacy has NO student role: the `/student/*`
area IS the family/guardian login (`roles.config.json` lists 3 roles; `student` under `supportedFutureRoles`;
cookie-layer proof: the family authenticates as `remember_student_*`, Agent B). Pixel-confirmed: the family
login's "profile edit" edits the CHILD's identity (`student-profile-edit-full.png`: First Name `الطالبة لمار`).
A password-change affordance on the child-view implies an account the child does not have.

## The decisions (CB-1 … CB-7)

| ID | Decision | Grounding | Frontend action |
|---|---|---|---|
| **CB-1** | The child-view is NOT an adult account. | Spec 021 role model; the family owns the child journey | the child-view is «عرض الابن», framed inside the family journey, never a fourth role |
| **CB-2** | **Remove the child-view password-change gate.** | G-03; `portal.js:323` `passwordChange` on the student profile | direct removal of the `passwordChange` entry from `STUDENT_PAGES.profile.gates`; declared supersession (below) |
| **CB-3** | No admin / guardian account controls on the child-view. | the child is not an account holder | 0 account affordances; `student-profile.js` renders identity + academic rows + gates only |
| **CB-4** | No guardian private data on the child-view. | anti-poaching + role isolation | `student-profile.js:61-62` renders guardian NAME + CITY only, no phone/e-mail (matrix cells 3/4 CV=DENY) |
| **CB-5** | No cross-child / cross-family data. | RJ-21 | `student-history.js` renders st1-only records; `family-child.js` cycles only fam1's 5 children (`portal.js:256`) |
| **CB-6** | Only the child's own learning / session information. | the child-view purpose | day rail, homework, progress, certificates — all the child's own |
| **CB-7** | No wording implies a standalone student login unless real auth later provides one. | RJ-50 (no fake login); the «عرض الابن» reframe | 0 wording implying a student session; the two remaining gates (photo/save) stay honest |

## Which gates stay, which goes

The child-view profile currently shows **three** backendRequired gates: photo upload · profile save · password
change (`portal.js:320-325`; `student-profile.js` renders them via `plannedCard`). After CB-2:

- **REMOVE**: `passwordChange` (a child has no password/login to change).
- **KEEP (as honest gates, unchanged)**: `photoUpload` and `profileSave` — the guardian may, in a real backend,
  update the child's photo/display profile from within the family journey. These remain `backendRequired`.
- Result: the child-view profile shows **2** gates, not 3.

## The declared test supersession (mandatory; `contracts/protected-test-carryover-contract.md` §2.3)

Removing the gate changes a protected count. This is a **declared supersession**, not a silent weakening. The
exact points (Agent E, verbatim):

- `tests/smoke/run.cjs:1971` — `if (page === 'student-profile') ok(prt.plannedBackend === 3, …)` → **`=== 2`**,
  and the inline comment "photo/save/password" → "photo/save". (`plannedBackend` is a DOM count of
  `.pt-planned .chip.tone-amber`, so it counts rendered gate cards, not wording.)
- `tests/smoke/run.cjs:2082` — the `expPlanned` map entry `'student-profile': 3` → **`2`**.

The six supersession fields: **old code** (the two `=== 3` / map entries) · **new code** (`=== 2`) ·
**evidence** (G-03; `portal.js:323`; `student-profile-edit-full.png`) · **reason** (a child has no login; the
password gate implies a non-existent account) · **neighbours** (the family-profile `=== 3` at `:2007`/map `:2083`
and teacher-profile `=== 3` at `:2020`/map `:2084` stay **BYTE-VERBATIM**) · **mutation proof** (MUT-3:
re-adding the child password gate → `student-profile: plannedBackend===2` fails).

## CRITICAL scope-discipline (Agent E finding — do not weaken family/teacher)

The family-profile and teacher-profile pages carry the **identical** 3-gate pattern (photo/save/password) —
but the guardian and the teacher are **real account holders** who plausibly change their own password. Their
`=== 3` asserts (family `:2007`/`:2083`, teacher `:2020`/`:2084`) and their `passwordChange` gates
(`portal.js:380` family; inlined in `teacher-profile.js` teacher) MUST stay **UNTOUCHED**. Only the STUDENT
(child) profile loses its password gate. A supersession that touched all three, or a shared regex without
page-scoping, would silently weaken family/teacher protections — a review failure. **The spec names
`student-profile` ONLY.**

## Ownership note

043 (specify) writes no application bytes. It directs the removal + the declared supersession; the actual
`portal.js`/test edit rides the child-view page group (047, `page-review-ownership-map.md` §8) at its Gate-3
merge — the removal merges only with MUT-3 green. The child-view boundary rule is 043's ratified deliverable.
