# Direct-Fetch & Role-Boundary Contract — Spec 043

Owns C01-27, C03-13, C15-18 (all FUTURE_BACKEND) + the §6 direct-fetch check of
`privacy-and-sensitive-data-findings.md`. The legacy proved role isolation FOUR times by redirect (a teacher
requesting an admin URL gets the teacher home — `teacher/management-student-1` = `teacher-home`, pixel-confirmed
C03-13; the C01 3-redirect proofs). **We cannot reproduce a redirect without a backend.** This contract states
the guarantee the frontend CAN make, and names everything the backend must add.

## The governing law

> **"Hiding a link is NOT authorization."** (`contracts/privacy-role-isolation-handoff-contract.md` §1.4)

Removing a sidebar link, adding `hidden`, or omitting a nav entry is never a security control. A directly-fetched
URL bypasses all of them.

## The current frontend-enforceable guarantee (binding, verbatim)

> **Even if a static page is fetched directly, it contains no sensitive data the requester should not receive.**

Because there is no auth, every built page is world-readable. The guarantee therefore has to be **data-absence**,
not link-hiding. This is enforceable NOW and is what 043 freezes.

## The rules (DF-1 … DF-7)

| ID | Rule | Enforced today by | Verify |
|---|---|---|---|
| **DF-1** | No portal page (`teacher-*`, `family-*`, `student-*`) links to an admin route. | `M-8` shell-markup guard (`smoke:1939`) + a new no-admin-link href census on portal pages | grep portal `a[href]` for admin bases = 0 (MUT-9) |
| **DF-2** | The only sanctioned portal→admin links are `portals.html → dashboard.html` (the explicit demo hub) and `teacher-performance.html` (the sanctioned admin exempt board — NOT a portal page). | recorded exceptions; the exempt board is not in the portal glob semantically | census allowlists exactly these |
| **DF-3** | Teacher bodies bake 0 pay tokens and 0 guardian-contact tokens. | PAY28 + the new teacher-contact census | grep = 0 (MUT-1) |
| **DF-4** | No cross-family data is baked into a single-family surface. Only the active authored family (fam1) appears on guardian-facing pages. | fam1-only fixtures; `family-child.js` cycles only fam1's 5 children (`portal.js:256`) | `أم جوري` (fam2) = 0 hits on any family-portal page (MUT-8) |
| **DF-5** | The child-view bakes only the child's own learning/session data — no guardian contact, no cross-child data, no account controls. | `student-*` pages render guardian name+city only, no contact | `child-view-account-boundary.md`; grep student-portal contact = 0 |
| **DF-6** | No sensitive data (contact, secret, PAN, room link, minor-in-URL) is baked into any world-readable page. | the no-secret gates (g32, `smoke:1404`), real-PII census, link-safety census | 0 across 115 pages |
| **DF-7** | Wording states plainly that real access control is a backend responsibility not yet built. | the hub «بدون تسجيل دخول» note; honest gates; 0 `authorized`/`logged in` hits | MUT-10 |

## The correct role landing destination (recorded, not built)

- The hub is `portals.html` (2 role cards + admin band + demoted child-view preview + honest no-login note).
- `index.html` today is a meta-refresh redirect to `dashboard.html` (the ADMIN console) — a first-visit lands
  in the admin console, not the hub. Whether the landing target should be `portals.html` is a **freeze-level
  product decision owned by 057** (C15-08); 043 records it, does not change it (no count/route impact here).
- A real login would route each role to its own home (admin → dashboard, teacher → teacher-portal, family →
  family-portal). That routing is `FUTURE_BACKEND` (C15-02).

## The role-shell boundary

- Admin surfaces use the admin shell (`#shell[data-rail]`, 6-category rail). Portal surfaces use the portal
  shell (`portal-shell.js`: role topbar + `pt-sidenav` + native `<details>` mobile drawer). All nav renders
  OUTSIDE `#page-body`. A portal page must never render admin shell markup (M-8) and never carry an admin route.
- The frontend guarantee is that the two shells never bleed protected data across the boundary; the real
  boundary (which shell a user is *allowed* to load) is `FUTURE_BACKEND`.

## FUTURE_BACKEND (named, never claimed to exist)

- Real authentication + session (C15-02); real per-role route enforcement / direct-route denial (C01-27,
  C03-13, C15-18); tenant/family row-level isolation (RJ-21). Until these exist, isolation is a **routing
  convention + a data-absence guarantee**, stated honestly, never presented as enforcement.
