# Route Inventory Contract — Spec 041 (FR-009 / Q-9)

**Status**: SPECIFY-ONLY. This file changes no source, no test, no HTML. It is the **committed exact
expected-route table** FR-009/Q-9 requires: a checked-in expectation for all **50** admin nav items, asserted
**IN ADDITION TO** the source-derived matrix (`sidebar-item-register.md` §1–5, `deep-link-register.md`), so that an
edit to `src/js/nav.config.js` can never silently redefine its own expectation — a test that reads `nav.config.js`
and compares it to `nav.config.js` proves nothing; this table is the independent, hand-committed baseline the
source-derived assertion must match.

**Baseline reconciled to**: HEAD `21502af` (Spec 040 committed), `sidebar-item-register.md`, `deep-link-register.md`,
`count-and-freeze-contract.md`. **Target state reflected**: this table encodes the routes **AFTER** D-1 Option A
ships (`spec.md` §7 D-1, `count-and-freeze-contract.md` §5 carve-out) — `teachers` stays a plain page,
`addTeacher` → `teachers.html#view=add`, `teacherCategories` → `teachers.html#view=categories`. At `21502af`
today, `addTeacher`/`teacherCategories` still carry the defective bare `teachers.html` (Class 5, INVALID — see
`sidebar-item-register.md` §3.2 rows 23–24). **This contract is the target Spec 041 tasks must deliver**, not a
re-statement of the current defect. Every other one of the 50 rows is unchanged from `21502af` and is reflected
as-is.

**Reclassification note (binding, not a supersession)**: `count-and-freeze-contract.md` §5 prices this exact move:
C-28 (deep-link routes) **22 → 24**, C-29 (plain routes) **27 → 25**, routed total invariant at **49** (+1 lock =
**50**). This is a **declared re-classification under the D-1 carve-out**, not a §8 supersession — no other count
in `count-and-freeze-contract.md` §1 moves.

---

## 0. Column definitions

| Column | Meaning |
|---|---|
| **#** | Row number, 1–50, in `nav.config.js` category order (matches `sidebar-item-register.md`). |
| **id** | The nav item's `id` field in `NAV_CATEGORIES` (`src/js/nav.config.js`). |
| **category** | The `NAV_CATEGORIES[]` entry (or `sections[]` sub-group) the item is declared in. |
| **status** | `nav.config.js` `status` field: `implemented` or `disabled`. (`planned` = 0 sitewide; not present in this table.) |
| **expected route string** | The exact value the `route` field must hold (AR-form; empty string / absent for the one lock). This is the literal to diff `nav.config.js` against. |
| **file** | The base page (no extension, no language suffix) the route targets. |
| **fragment** | The `#view=` hash carried by the route, or `—` for a bare page route, or `—` (no route) for the lock. |
| **AR route** | The rendered `<a href>` on every Arabic admin page — `langRoute()` no-ops in AR, so this equals **expected route string**. |
| **EN route** | The rendered `<a href>` on every English admin page — `langRoute()` rewrites `<file>.html` → `<file>.en.html` and **re-appends the fragment byte-identically** (`sidebar.js:18-27`, Spec 035 hash-aware). |
| **destination type** | `page` — bare route, the item's own distinct surface · `tab` — `#view=` deep-link resolving to a `[data-tab]`/`[data-tabpanel]` inside another page's tab group · `shared-tab` — a `tab` whose `{file,view}` pair is intentionally shared with exactly one other item (S-1) · `lock` — `status:'disabled'`, no route, non-anchor `<button>`. |
| **tab group** | The `data-tabs="<group>"` id on the target page, for `page` rows that host a tab group and for every `tab`/`shared-tab` row. `—` where the target page has no tab group at all. |

---

## 1. CONTROL (12 items, all `page`, all Class 1) — `nav.config.js:20-36`

**No deep-link targets any of these 12 pages** — every CONTROL route is a bare page route. But three of the target
pages **do host a `[data-tabs]` group of their own** (reached only by the plain route, landing on the baked default
tab): `sessions.html` → `sessions` (default `list`), `schedule.html` → `schedule` (default `list`),
`time-converter.html` → `timeconv` (default `zone`). Verified live at `21502af` (`grep -o 'data-tabs="…"'`), and
consistent with `derived-route-matrix-contract.md` §2/§3.1, which is the authoritative group registry.
*(An earlier draft of this section asserted "none of these 12 pages carries a `data-tabs` group" — that is **false**
and is corrected here; the "tab group" column below is populated accordingly. The claim that matters — **no CONTROL
item is a `tab`-type row** — is unaffected.)*

| # | id | category | status | expected route string | file | fragment | AR route | EN route | destination type | tab group |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `home` | control | implemented | `dashboard.html` | `dashboard` | — | `dashboard.html` | `dashboard.en.html` | page | — |
| 2 | `sessions` | control | implemented | `sessions.html` | `sessions` | — | `sessions.html` | `sessions.en.html` | page | `sessions` (default `list`) |
| 3 | `schedule` | control | implemented | `schedule.html` | `schedule` | — | `schedule.html` | `schedule.en.html` | page | `schedule` (default `list`) |
| 4 | `attendance` | control | implemented | `attendance.html` | `attendance` | — | `attendance.html` | `attendance.en.html` | page | — |
| 5 | `sessionsAnalysis` | control | implemented | `sessions-analysis.html` | `sessions-analysis` | — | `sessions-analysis.html` | `sessions-analysis.en.html` | page | — |
| 6 | `messages` | control | implemented | `messages.html` | `messages` | — | `messages.html` | `messages.en.html` | page | — |
| 7 | `leads` | control | implemented | `leads.html` | `leads` | — | `leads.html` | `leads.en.html` | page | — |
| 8 | `tasks` | control | implemented | `tasks.html` | `tasks` | — | `tasks.html` | `tasks.en.html` | page | — |
| 9 | `announcements` | control | implemented | `announcements.html` | `announcements` | — | `announcements.html` | `announcements.en.html` | page | — |
| 10 | `timeConverter` | control | implemented | `time-converter.html` | `time-converter` | — | `time-converter.html` | `time-converter.en.html` | page | `timeconv` (default `zone`) |
| 11 | `publicHoliday` | control | implemented | `public-holiday.html` | `public-holiday` | — | `public-holiday.html` | `public-holiday.en.html` | page | — |
| 12 | `scheduledActions` | control | implemented | `scheduled-actions.html` | `scheduled-actions` | — | `scheduled-actions.html` | `scheduled-actions.en.html` | page | — |

**Category subtotal: 12** ✅

---

## 2. FAMILIES & STUDENTS (9 items: 6 `page` + 3 `tab`) — `nav.config.js:40-48`

Tab groups: `families.html` → `data-tabs="families"` (baked default `directory`); `students.html` →
`data-tabs="students"` (baked default `directory`).

| # | id | category | status | expected route string | file | fragment | AR route | EN route | destination type | tab group |
|---|---|---|---|---|---|---|---|---|---|---|
| 13 | `families` | families | implemented | `families.html` | `families` | — | `families.html` | `families.en.html` | page | `families` |
| 14 | `addFamily` | families | implemented | `add-family.html` | `add-family` | — | `add-family.html` | `add-family.en.html` | page | — (`#step=` wizard, not `#view=`) |
| 15 | `students` | families | implemented | `students.html` | `students` | — | `students.html` | `students.en.html` | page | `students` |
| 16 | `courses` | families | implemented | `courses.html` | `courses` | — | `courses.html` | `courses.en.html` | page | — |
| 17 | `familyCategories` | families | implemented | `families.html#view=categories` | `families` | `#view=categories` | `families.html#view=categories` | `families.en.html#view=categories` | tab | `families` |
| 18 | `groups` | families | implemented | `groups.html` | `groups` | — | `groups.html` | `groups.en.html` | page | — |
| 19 | `scheduleSearch` | families | implemented | `schedule-search.html` | `schedule-search` | — | `schedule-search.html` | `schedule-search.en.html` | page | — |
| 20 | `studentResult` | families | implemented | `students.html#view=results` | `students` | `#view=results` | `students.html#view=results` | `students.en.html#view=results` | tab | `students` |
| 21 | `studentEvaluation` | families | implemented | `students.html#view=evaluation` | `students` | `#view=evaluation` | `students.html#view=evaluation` | `students.en.html#view=evaluation` | tab | `students` |

**Category subtotal: 9** ✅ (6 page + 3 tab)

---

## 3. TEACHERS (6 items: 2 `page` + 4 `tab`) — `nav.config.js:54-64` — **D-1 target state**

Tab groups: `teachers.html` → `data-tabs="teachers"` (baked default `directory`; **NEW** as of Spec 041 D-1 —
`add`/`categories` panels move here from the retired `trn-add`/`trn-categories` drawers); `teacher-performance.html`
→ `data-tabs="perf"` (baked default `overview`, unchanged).

| # | id | category | status | expected route string | file | fragment | AR route | EN route | destination type | tab group |
|---|---|---|---|---|---|---|---|---|---|---|
| 22 | `teachers` | teachers | implemented | `teachers.html` | `teachers` | — | `teachers.html` | `teachers.en.html` | page | `teachers` |
| 23 | `addTeacher` | teachers | implemented | `teachers.html#view=add` | `teachers` | `#view=add` | `teachers.html#view=add` | `teachers.en.html#view=add` | tab **(was `page`/Class 5 INVALID at `21502af` — fixed by D-1)** | `teachers` |
| 24 | `teacherCategories` | teachers | implemented | `teachers.html#view=categories` | `teachers` | `#view=categories` | `teachers.html#view=categories` | `teachers.en.html#view=categories` | tab **(was `page`/Class 5 INVALID at `21502af` — fixed by D-1)** | `teachers` |
| 25 | `teacherKpi` | teachers → `cat.teachersPerf` | implemented | `teacher-performance.html` | `teacher-performance` | — | `teacher-performance.html` | `teacher-performance.en.html` | page | `perf` |
| 26 | `sessionsKpi` | teachers → `cat.teachersPerf` | implemented | `teacher-performance.html#view=sessions-kpi` | `teacher-performance` | `#view=sessions-kpi` | `teacher-performance.html#view=sessions-kpi` | `teacher-performance.en.html#view=sessions-kpi` | tab | `perf` |
| 27 | `monthlyPerf` | teachers → `cat.teachersPerf` | implemented | `teacher-performance.html#view=monthly` | `teacher-performance` | `#view=monthly` | `teacher-performance.html#view=monthly` | `teacher-performance.en.html#view=monthly` | tab | `perf` |

**Category subtotal: 6** ✅ (2 page + 4 tab, post-D-1; was 4 page + 2 tab pre-D-1, with rows 23/24 Class-5 INVALID)
**D-1 collision closed**: rows 22/23/24 now resolve to three **distinct** `[data-tabpanel]` targets
(`directory`/`add`/`categories`) inside the same `teachers` group — the exact pattern already frozen for
`library.html` (`materials`/`books`, row 40/41 below).

---

## 4. REPORTS (3) + `cat.finance` (8) = 11 items (2 `page` + 8 `tab` + 1 `lock`) — `nav.config.js:72-91`

Tab groups: `reports.html` → `data-tabs="reports"` (baked default `overview`); `finance.html` →
`data-tabs="finance"` (baked default `overview`).

| # | id | category | status | expected route string | file | fragment | AR route | EN route | destination type | tab group |
|---|---|---|---|---|---|---|---|---|---|---|
| 28 | `reports` | reports | implemented | `reports.html` | `reports` | — | `reports.html` | `reports.en.html` | page | `reports` |
| 29 | `monthlyReports` | reports | implemented | `reports.html#view=monthly` | `reports` | `#view=monthly` | `reports.html#view=monthly` | `reports.en.html#view=monthly` | tab | `reports` |
| 30 | `dataAnalysis` | reports | implemented | `reports.html#view=analysis` | `reports` | `#view=analysis` | `reports.html#view=analysis` | `reports.en.html#view=analysis` | tab | `reports` |
| 31 | `finance` | reports → `cat.finance` | implemented | `finance.html` | `finance` | — | `finance.html` | `finance.en.html` | page | `finance` |
| 32 | `invoices` | reports → `cat.finance` | implemented | `finance.html#view=invoices` | `finance` | `#view=invoices` | `finance.html#view=invoices` | `finance.en.html#view=invoices` | tab | `finance` |
| 33 | `monthlyInvoices` | reports → `cat.finance` | implemented | `finance.html#view=monthly-invoices` | `finance` | `#view=monthly-invoices` | `finance.html#view=monthly-invoices` | `finance.en.html#view=monthly-invoices` | tab | `finance` |
| 34 | `salaries` | reports → `cat.finance` | implemented | `finance.html#view=salaries` | `finance` | `#view=salaries` | `finance.html#view=salaries` | `finance.en.html#view=salaries` | shared-tab (S-1, shared with #35) | `finance` |
| 35 | `staffSalaries` | reports → `cat.finance` | implemented | `finance.html#view=salaries` | `finance` | `#view=salaries` | `finance.html#view=salaries` | `finance.en.html#view=salaries` | shared-tab (S-1, shared with #34) | `finance` |
| 36 | `payments` | reports → `cat.finance` | implemented | `finance.html#view=payments` | `finance` | `#view=payments` | `finance.html#view=payments` | `finance.en.html#view=payments` | tab | `finance` |
| 37 | `classSalaryReport` | reports → `cat.finance` | **disabled** | — (no route; `reasonKey:'nav.reason.finance'`) | — | — | — (non-anchor `<button aria-disabled="true">`) | — (non-anchor `<button aria-disabled="true">`) | lock | — |
| 38 | `banks` | reports → `cat.finance` | implemented | `finance.html#view=banks` | `finance` | `#view=banks` | `finance.html#view=banks` | `finance.en.html#view=banks` | tab | `finance` |

**Category subtotal: 11** ✅ (2 page + 8 tab [incl. 2 shared-tab counted once each] + 1 lock)

---

## 5. ADMINISTRATION (5 items: 2 `page` + 3 `tab`) — `nav.config.js:99-103`

Tab groups: `library.html` → `data-tabs="library"` (**baked default `materials`** — the one D-1-precedent row
where the hash sits ON the baked default, see `deep-link-register.md` §7.1); `certificates.html` →
`data-tabs="certificates"` (baked default `templates`).

| # | id | category | status | expected route string | file | fragment | AR route | EN route | destination type | tab group |
|---|---|---|---|---|---|---|---|---|---|---|
| 39 | `staff` | admin | implemented | `staff.html` | `staff` | — | `staff.html` | `staff.en.html` | page | — |
| 40 | `materials` | admin | implemented | `library.html#view=materials` | `library` | `#view=materials` | `library.html#view=materials` | `library.en.html#view=materials` | tab | `library` |
| 41 | `books` | admin | implemented | `library.html#view=books` | `library` | `#view=books` | `library.html#view=books` | `library.en.html#view=books` | tab | `library` |
| 42 | `certificates` | admin | implemented | `certificates.html` | `certificates` | — | `certificates.html` | `certificates.en.html` | page | `certificates` |
| 43 | `certificateRequests` | admin | implemented | `certificates.html#view=requests` | `certificates` | `#view=requests` | `certificates.html#view=requests` | `certificates.en.html#view=requests` | tab | `certificates` |

**Category subtotal: 5** ✅ (2 page + 3 tab)

Note: `library.html` has **no `page`-type nav item at all** — `materials`/`books` are both `tab` rows on the same
page. `staff.html` has **no tab group** — it is the ONE staff home (Spec 031, reaffirmed Spec 040 Decision 1);
`settingsUsers` (row 50) deliberately does **not** repoint here.

---

## 6. SETTINGS (7 items: 1 `page` + 6 `tab`) — `nav.config.js:109-122`

Tab group: `settings.html` → `data-tabs="settings"` (**baked default `general`** — the hash sits ON the baked
default for `settingsGeneral`, same class of row as `materials` above).

| # | id | category | status | expected route string | file | fragment | AR route | EN route | destination type | tab group |
|---|---|---|---|---|---|---|---|---|---|---|
| 44 | `settings` | settings | implemented | `settings.html` | `settings` | — | `settings.html` | `settings.en.html` | page | `settings` |
| 45 | `settingsGeneral` | settings | implemented | `settings.html#view=general` | `settings` | `#view=general` | `settings.html#view=general` | `settings.en.html#view=general` | tab | `settings` |
| 46 | `settingsIntegrations` | settings | implemented | `settings.html#view=integrations` | `settings` | `#view=integrations` | `settings.html#view=integrations` | `settings.en.html#view=integrations` | tab | `settings` |
| 47 | `settingsCustomization` | settings | implemented | `settings.html#view=customization` | `settings` | `#view=customization` | `settings.html#view=customization` | `settings.en.html#view=customization` | tab | `settings` |
| 48 | `settingsNotifications` | settings | implemented | `settings.html#view=notifications` | `settings` | `#view=notifications` | `settings.html#view=notifications` | `settings.en.html#view=notifications` | tab | `settings` |
| 49 | `settingsSecurity` | settings | implemented | `settings.html#view=security` | `settings` | `#view=security` | `settings.html#view=security` | `settings.en.html#view=security` | tab | `settings` |
| 50 | `settingsUsers` | settings | implemented | `settings.html#view=users` | `settings` | `#view=users` | `settings.html#view=users` | `settings.en.html#view=users` | tab | `settings` |

**Category subtotal: 7** ✅ (1 page + 6 tab)

**Spelling trap, frozen deliberately** (`nav.config.js` inline comment, Spec 040): `settingsCustomization`'s tab id
is the US spelling `customization`. A hash of `#view=customisation` (UK) is a **silent dead deep-link** — it is
NOT this table's `#view=customization` and must never be substituted for it.

---

## 7. Arithmetic reconciliation (must close before/after D-1)

```
By category  : 12 + 9 + 6 + 11 + 5 + 7                              = 50  ✅
By status    : 49 implemented + 1 disabled                          = 50  ✅
By dest.type : 25 page + 24 tab (incl. 2 shared-tab) + 1 lock        = 50  ✅   [POST-D-1, this contract]
             : 27 page + 22 tab (incl. 2 shared-tab) + 1 lock        = 50  ✅   [PRE-D-1, historical @ 21502af]
Distinct deep-link {file,view} destinations : 24 tab rows − 1 shared pair (salaries≡staffSalaries) = 23
Distinct plain-page destinations            : 25 page rows, ALL DISTINCT (D-1 removes the last collision)
```

**Pre/post D-1 delta, exhaustively**: exactly 2 rows change `destination type` (`addTeacher` row 23:
`page`→`tab`; `teacherCategories` row 24: `page`→`tab`), 2 rows change `expected route string` (rows 23/24 gain
`#view=add` / `#view=categories`), and the `teachers` tab group column is newly populated for rows 22/23/24 (was
`—` for all three pre-D-1, since `teachers.html` had no `data-tabs` wrap). **Every other one of the 50 rows is
byte-identical pre- and post-D-1.** No row is added, removed, or reordered; the table stays 50 rows before and
after.

---

## 8. How this contract is asserted (for the tasks that implement it)

This file is the **independent expectation**. The additive smoke assertion Spec 041 specifies must:

1. Parse `src/js/nav.config.js` (`NAV_CATEGORIES`, flattened incl. `sections[]`) into `{id, category, status,
   route}` tuples — the **source-derived** matrix.
2. Compare every tuple against the corresponding row in **this file** (parsed or hand-transcribed into the test as
   a literal constant — NOT re-derived from `nav.config.js` a second time, or the check is circular).
3. Fail on: a route string that differs from column "expected route string"; a status that differs from column
   "status"; a row present in source but absent from this table, or vice versa; a `#view=` fragment whose target
   page lacks a matching `[data-tab]`/`[data-tabpanel]` in **both** languages (closes `deep-link-register.md` §7.3
   hole (a) — the crawl that strips the hash before comparing).
4. Assert the row count is exactly **50** and the destination-type tally matches §7 — so a silent 51st item, or a
   silent re-collapse of rows 23/24 back onto bare `teachers.html`, both fail immediately.

This is **in addition to**, not a replacement for, the existing DOM-rendered assertions (`nav010`, `nav040`, the
`nav.config` SOURCE audit) and the fresh-context deep-link tests in `deep-link-register.md` §7 — those prove the
**rendered page** behaves correctly; this table proves the **source** was not silently redefined out from under
those tests.
