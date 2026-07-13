# Count Freeze Contract — Spec 041 (plan-round, post-decision)

**Status**: PLANNING artifact. Changes no source, no test, no HTML, creates no task. **Planning only** — this file
is part of the Spec 041 implementation PLAN, not the implementation.
**Spec**: 041 — Full Frontend Route & Sidebar Production Freeze.
**Baseline**: HEAD `21502af` · branch `feature/012-role-portal-foundation` · Spec 040 committed · PR #13 merged
(merge commit `13d38af`, present on `origin/main`) · in sync (ahead 0 / behind 0) · tree clean except the Spec-041
artifacts + `.specify/feature.json`.
**Decision status**: D-1 = Option A (the MOVE), D-2 = Option A (orphan frozen), D-3 = the one-line `langUrl` fix.
**ALL DECIDED** — this file does not re-open any option set; it is the single **post-decision** table every
042–057 spec reads instead of re-deriving the counts from scratch.

**Relationship to the spec-round document.** `count-and-freeze-contract.md` (committed, spec-round) computes the
counts **as they stand at `21502af`, before D-1 is chosen**, and §5 explicitly *prices* the D-1 carve-out without
selecting an option ("The fix is not chosen here. This contract prices the carve-out; `/speckit.plan` selects the
option."). This file is that selection's output: the **same 35 invariants (C-01…C-35), unchanged, plus the ONE
sanctioned re-classification (C-28, C-29) applied**, with every arithmetic identity re-run to show it still closes.
Nothing here contradicts `count-and-freeze-contract.md`; it is that contract's §5 carve-out, exercised.

---

## 1. The frozen invariants (final, post-decision)

| Invariant | Frozen value | Moved by 041? |
|---|---:|---|
| Total generated HTML in `public/` | **115** | no |
| `PAGES` registry entries (`scripts/build-html.mjs`) / base pages | **57** | no |
| Admin bases | **32** | no |
| Portal bases | **25** | no |
| Admin / sidebar-bearing FILES | **64** (32 bases × 2) | no |
| Portal / role-shell FILES | **50** (25 bases × 2) | no |
| Language-neutral files (`index.html`) | **1** | no |
| Rail categories | **6** (`control`·`families`·`teachers`·`reports`·`admin`·`settings`) | no |
| Admin menu items, total | **50**, 0 unclassified | no |
| — control / families / teachers / reports / admin / settings | **12 / 9 / 6 / 11 / 5 / 7** | no |
| `status: 'implemented'` | **49** | no |
| `status: 'planned'` | **0** | no |
| `status: 'disabled'` (honest locks) | **1** — `classSalaryReport` only | no |
| `[data-coming-soon]` rendered anywhere in the 115 pages | **0** | no |
| Deep-link routes (`route` contains `#view=`) | **22 → 24** | **YES — the one sanctioned movement** |
| Plain page routes (bare `*.html`) | **27 → 25** | **YES — the one sanctioned movement** |
| Route-less items | **1** (`classSalaryReport`) | no |
| `FUTURE_ROUTES` | **`{}`** (empty by construction) | no |
| `FUTURE_ROLE` (documented, never rendered) | **3** | no |
| Portal nav uniques (teacher / family / student) | **9 / 9 / 8** | no |
| Shared (non-distinct) deep-link destinations | **1** — `salaries` ≡ `staffSalaries` → `finance.html#view=salaries` (S-1, legitimate) | no |
| Orphan set (registered, unlinked, direct-URL-only) | exactly **{`gallery.html`, `gallery.en.html`}** | no (D-2 freezes the set; ownership assigned, not the count) |
| `finance-analysis` | **ABSENT** from `nav.config.js` and all 115 pages | no — must stay absent |

Every row not marked "YES" is copied verbatim from `count-and-freeze-contract.md` §1 (C-01…C-35). **The two rows
marked YES are the entirety of what 041 moves.** No other cell in this table may differ from the spec-round
contract without invoking the §8 supersession law recorded there.

---

## 2. Every arithmetic check, re-run against the decided state

```
A-1  bases            : 32 admin  + 25 portal                        = 57    ✅  unchanged
A-2  bilingual files  : 57 bases  × 2 languages                      = 114   unchanged
A-3  total generated  : 114       + 1 index.html                     = 115   ✅  unchanged
A-5  admin files      : 32 admin bases × 2                           = 64    ✅  unchanged
A-6  portal files     : 25 portal bases × 2                          = 50    ✅  unchanged
A-7  file partition   : 64 admin + 50 portal + 1 index               = 115   ✅  unchanged
A-10 admin menu       : 12 + 9 + 6 + 11 + 5 + 7                      = 50    ✅  unchanged
A-11 status census    : 49 implemented + 0 planned + 1 disabled      = 50    ✅  unchanged

--- the ONE sanctioned movement ---
D1-1 deep-link routes : 22 (pre-041) + addTeacher + teacherCategories = 24   ✅  (C-28: 22 → 24)
D1-2 plain routes     : 27 (pre-041) − addTeacher − teacherCategories = 25   ✅  (C-29: 27 → 25)
D1-3 route split      : 24 deep-link + 25 plain + 1 route-less        = 50   ✅  (= A-10, cross-check)
D1-4 routed total held: 24 deep-link + 25 plain                       = 49   ✅  (= C-24 implemented, UNCHANGED —
                                                                                 the movement is a re-classification
                                                                                 of the SAME 49 routed items, not a
                                                                                 change in how many are routed)
D1-5 lock ↔ route-less: 1 disabled                                    = 1    ✅  (= C-30, unchanged; classSalaryReport
                                                                                 is the only route-less item both
                                                                                 before and after)
```

**The identity that proves the movement is honest, not silent drift:**

```
Before 041:  22 deep-link + 27 plain + 1 route-less = 50   (implemented 49 = 22 + 27; disabled 1)
After  041:  24 deep-link + 25 plain + 1 route-less = 50   (implemented 49 = 24 + 25; disabled 1)
                                          ^^^^^^^^^^^^^^^
             49 is the SAME 49 nav items (teachers, addTeacher, teacherCategories among them) — only
             addTeacher's and teacherCategories's route STRINGS change, from the defective bare
             `teachers.html` to `teachers.html#view=add` / `teachers.html#view=categories`.
```

`A-12` (route split, `count-and-freeze-contract.md` §2) and `A-13` (implemented↔route) both still close under the
new figures — they are the same identities, re-run with 24/25 in place of 22/27. `A-15` (distinct deep-link
destinations) becomes **23** (24 routes − 1 shared pair, S-1 — was 21 of 22). `A-16` (distinct plain destinations)
is **re-verified unchanged at 25**: `addTeacher` and `teacherCategories` were already collapsed into the `teachers`
plain destination pre-041 (three items, one bare route); removing them from the plain bucket does not change the
bucket's **distinct destination count**, only its **membership count** — recomputed explicitly:

```
A-16 (before) : 27 plain routes − 2 collapsed (addTeacher, teacherCategories ≡ teachers)  = 25 distinct destinations
A-16 (after)  : 25 plain routes − 0 collapsed (addTeacher, teacherCategories now deep-link)= 25 distinct destinations
                                                                                              ^^ same 25 — the two
                                                                                              items that LEFT the
                                                                                              bucket were exactly the
                                                                                              two that were already
                                                                                              double-counted inside it.
```

So **A-16 = 25 both before and after** is not a coincidence to gloss over — it is the arithmetic signature of a
correct fix: a re-classification that resolves a duplicate destination changes the bucket's membership without
changing its distinct-destination count.

---

## 3. The complement caveat (C-09 detection), verified live — do not "fix" this number to 50 by grep

A naive live check:

```bash
grep -l 'pt-nav-item' public/*.html | wc -l
```

returns **48**, not 50. This is not a miscount to chase down — it is `portals.html` / `portals.en.html` (the hub,
2 files, C-14) rendering the **portal shell without a role sidenav**: the hub is a role-selection screen, not a
role app, so it carries no `ROLE_NAV` items and therefore no `pt-nav-item` element at all:

```bash
grep -c 'pt-nav-item' public/portals.html    # → 0
grep -c 'pt-nav-item' public/portals.en.html # → 0
```

The portal FILE class is **48 role-nav-bearing files + 2 hub files = 50** (C-09), and the partition still closes
under the file-count identity that does not depend on the `pt-nav-item` marker at all:

```
64 (admin) + 50 (portal) + 1 (index) = 115
```

**The reliable detector is the complement**, computed from markers that ARE present on every file in their class
(`data-nav-category` for admin, unconditionally, including `gallery.html`/`.en` which carry the marker but no nav
item — D-2):

```
115 − 64 (admin, grep -l 'data-nav-category' public/*.html | wc -l) − 1 (index.html) = 50   ✅  = C-09
```

Any 042–057 spec that re-verifies C-09 must use the complement, not a raw `pt-nav-item` count, or it will report a
false regression (48 ≠ 50) against a portal surface that has not moved.

---

## 4. What this contract does NOT do

- It does not add, remove, or rename a page (C-01/C-02/C-03 stay 115/57/57 — closed by `impact-boundary.md`'s STOP
  list: "**No page may be added**").
- It does not change the honest-lock count (C-26 stays 1; `honest-lock-register.md` is unaffected by D-1/D-2/D-3).
- It does not move `FUTURE_ROUTES` off `{}` (C-31 unchanged; D-1's fix is a route STRING correction on two
  already-implemented items, never a new placeholder route).
- It does not touch `finance-analysis` (stays absent — D-1/D-2/D-3 are unrelated surfaces).
- It does not decide D-2's owner or entry path (that is `page-reachability-register.md` §§4–7 / `d2-gallery-orphan-contract.md`) — it only re-affirms the orphan-set COUNT (2 files) is frozen.
- It creates no new task; `/speckit.tasks` binds tasks to `d1-teacher-route-contract.md`, `d3-language-hash-contract.md`, `d2-gallery-orphan-contract.md`, `route-inventory-contract.md`, `derived-route-matrix-contract.md`, and `protected-test-register.md` — this file is the count ledger those tasks must land on, not a task source itself.

---

## 5. One-line summary (binding on 042–057)

> **115 pages · 57 bases · 64 admin + 50 portal + 1 index · 6 rail categories · 50 nav items (49 implemented / 0
> planned / 1 lock) · 24 deep-links + 25 plain routes + 1 route-less = 50 · routed total held at 49 ·
> `FUTURE_ROUTES = {}` · 0 coming-soon · orphan set = exactly {gallery.html, gallery.en.html} · finance-analysis
> absent · portal nav 9/9/8.** The only number this file moves relative to `21502af` is the 22→24 / 27→25
> deep-link/plain split, and it moves it exactly once, for exactly the reason `count-and-freeze-contract.md` §5
> priced and `d1-teacher-route-contract.md` specifies. Every further move requires the §8 supersession law.

---

## Roadmap-provenance caveat (binding, appended by the plan-round reconciliation)

> The committed spec corpus charters, as a spec directory with its own `spec.md`, **only Spec 041**. **Every spec
> number above 041 named anywhere in this file (042 · 043 · 044 · 045–050 · 051–057) is a MAINTAINER-DIRECTED,
> APPEND-ONLY AMENDMENT — recorded in `040-settings-deep-links-subpages/future-owner-register.md` §1 — NOT a
> chartered spec.** Any ownership assignment made here binds whichever spec is eventually chartered into the named
> slot; this file invents no spec number and creates no roadmap entry.
