# Derived Route Matrix Contract — Spec 041 (E-04, FR-009 companion)

**Status**: PLANNING artifact. It changes no source, no test, no HTML, and creates no task. It specifies the
**single group-aware derived matrix** that Spec 041's additive smoke block must build from
`src/js/nav.config.js` `NAV_CATEGORIES`, the **oracles** it joins against, and the **eight defect classes** it
must detect.

**Baseline**: HEAD `21502af` (Spec 040 committed; 115 HTML · 57 PAGES bases · 64 admin files · 50 portal files ·
1 index · admin menu 50 = implemented 49 + disabled 1 · `FUTURE_ROUTES = {}` · planned 0 · coming-soon 0).
**Target state encoded**: **post-D-1 (Option A, the MOVE architecture)** — `teachers` stays plain,
`addTeacher` → `teachers.html#view=add`, `teacherCategories` → `teachers.html#view=categories`.
Deep-links **22 → 24** · plain routes **27 → 25** · route-less lock **1** · menu **50** (a declared
re-classification under the `count-and-freeze-contract.md` §5 D-1 carve-out, **not** a §8 supersession).

**Relationship to the other route artifacts — three different documents, three different jobs:**

| Artifact | What it is | Why it exists |
|---|---|---|
| `current-route-inventory.md` | The generated-file inventory (57 bases → 115 files) | Which pages exist |
| `route-inventory-contract.md` | The **hand-committed expected-route table** (FR-009 / Q-9) | An independent expectation `nav.config.js` cannot silently redefine |
| **this file** | The **source-derived, group-aware matrix + the detector algorithm** | The machine that compares source ⇄ committed table ⇄ built DOM ⇄ live behaviour, in **both languages** |

The matrix is **ADDITIVE**. Every existing per-spec route assertion (`nav010`, `nav040`, the Spec-036/037/038/039
DOM blocks, `SP039_DEEPLINKS`, `SP040_VIEWS`, the `nav.config` SOURCE audit, `deadHash`/`badTarget`) **stays and is
not deleted**. The only protected-test edits in Spec 041 are the five D-1 relocations S1–S5 registered in
`protected-test-register.md`.

---

## 0. Why the matrix must be group-aware (E-04)

`enhance.js` `selectTab(group, id)` requires `[data-tab="<id>"]` **inside** `[data-tabs="<group>"]`; `initTabs()`
iterates **all** `[data-tabs]` wraps and is already group-aware. But `selectTab` writes a **single global
`#view=`** fragment, so two tab groups on one page would fight over one fragment. Today **no admin page has two
groups** (§2), so the conflict is latent, not live.

Therefore the matrix records, for **every** deep-link row, **which `[data-tabs]` group owns the tab id**, and every
derived assertion scopes its selector as:

```
[data-tabs="<group>"] [data-tabpanel="<view>"]      // the target panel
[data-tabs="<group>"] [data-tabpanel]:not([hidden]) // must be exactly 1, and must be the target
```

**Explicit refinement (declared, not a supersession — the guard was a specify-phase proposal, never shipped
code):** `deep-link-register.md` §7.4 item **4** proposed a *"one-tabs-widget guard: `[data-tabs]` count ≤ 1 per
admin page."* Spec 041 **does not adopt that rule.** A permanent one-widget-per-page ceiling would forbid a future
page from carrying a second group even when it is honest to do so. It is replaced by the group-aware scoping above
plus the weaker, sufficient **fragment-ownership invariant** (§5, detector **X-9**): *no two `[data-tabs]` groups
on the same page may declare the same tab id* — that, not a widget ceiling, is what makes the one global `#view=`
fragment unambiguous. At the frozen baseline this invariant is vacuously satisfied (max 1 group per page); it
keeps the door open for a future multi-group page without ever allowing an ambiguous deep-link.

---

## 1. Derivation algorithm (what the test builds, in order)

```
S1  SOURCE   = flatten(NAV_CATEGORIES): for each category c → [...c.items, ...(c.sections||[]).flatMap(s=>s.items)]
              → rows { id, category, section?, status, route?, reasonKey? }   |SOURCE| MUST === 50
S2  SPLIT    route → { file, fragment }   where  file = route.split('#')[0]
                                                 fragment = route.includes('#view=') ? '#view=' + route.split('#view=')[1] : null
              destinationType = !route ? 'lock' : fragment ? 'tab' : 'page'
S3  GROUPS   TAB_GROUP_REGISTRY (§2) — the committed {file → group, tabIds[], bakedDefault} oracle.
              For every 'tab' row: group = TAB_GROUP_REGISTRY[file].group   (a missing entry is a FAILURE, not a skip)
S4  LANG     AR href = route (langRoute() no-ops in AR)
              EN href = file.replace(/\.html$/, '.en.html') + (fragment || '')   — sidebar.js:18-27, hash-aware since Spec 035
S5  COMPARE  every row against route-inventory-contract.md §1–6 (transcribed into the test as a LITERAL constant,
              never re-read from nav.config.js — a source-vs-source diff proves nothing; FR-009 / Q-9)
S6  ASSERT   run detectors X-1 … X-9 (§5) against: the built AR + EN DOM (115 files) and, for the deep-link rows,
              a FRESH browser context per row per language with localStorage['academy.schedView.<group>'] pre-seeded
              to a DIFFERENT existing tab id of that group (so the assertion proves hash ≻ stored, not hash ≻ default)
```

The matrix is **derived** (S1–S4) and **cross-checked against a committed literal** (S5). Both halves are required:
derivation alone is circular; the literal alone goes stale.

---

## 2. TAB_GROUP_REGISTRY — the group oracle (17 admin groups post-041)

Live at `21502af`: exactly **16** admin pages carry a `[data-tabs]` wrap, **one group each** (verified by grepping
`data-tabs="…"` across `public/*.html`). D-1 adds the **17th** (`teachers`). Baked default = the **first** item
passed to `tabs()` (`components/tabs.js` marks index 0 `is-active`, all other panels `hidden`).

| file | group | tab ids (source order; **[0] = baked default**) | nav-targeted? | source |
|---|---|---|---|---|
| `families` | `families` | **directory** · categories | yes (1 deep-link) | `pages/families.js:55-60` |
| `students` | `students` | **directory** · results · evaluation | yes (2) | `pages/students.js:122-128` |
| `teachers` | `teachers` | **directory** · add · categories | **yes (2) — NEW, D-1** | `pages/teachers.js` (post-041) |
| `teacher-performance` | `perf` | **overview** · sessions-kpi · monthly | yes (2) | `pages/teacher-performance.js:176-181` |
| `reports` | `reports` | **overview** · monthly · analysis | yes (2) | `pages/reports.js:356-362` |
| `finance` | `finance` | **overview** · invoices · payments · monthly-invoices · salaries · banks | yes (6 items → 5 distinct views) | `pages/finance.js:332-340` |
| `library` | `library` | **materials** · books | yes (2) | `pages/library.js:135-139` |
| `certificates` | `certificates` | **templates** · requests | yes (1) | `pages/certificates.js:146-150` |
| `settings` | `settings` | **general** · notifications · customization · security · users · integrations | yes (6) | `pages/settings.js:360-368` |
| `sessions` | `sessions` | **list** · timetable | no (plain route only) | `pages/sessions.js:74-76` |
| `schedule` | `schedule` | **list** · timetable | no | `pages/schedule.js:58-60` |
| `time-converter` | `timeconv` | **zone** · changes | no | `pages/time-converter.js:138-142` |
| `course` | `course` | **overview** · groups · students · teachers · timetable · outcomes · learningPath · notes | no (drill-down page) | `pages/course.js:127-137` |
| `group` | `group` | **overview** · students · timetable · sessions · teacher · course · notes | no (drill-down) | `pages/group.js:130-139` |
| `family` | `family` | **overview** · students · schedule · plan · notes | no (drill-down) | `pages/family.js:234-241` |
| `teacher` | `teacher` | **overview** · courses · groups · timetable · sessions-outcomes · students · follow-up · notes | no (drill-down) | `pages/teacher.js:169-179` |
| `student` | `student` | **overview** · courses · timetable · results · evaluation · family · notes | no (drill-down; body deep-links only) | `pages/student.js:227-236` |

**Two baked-default coincidences, frozen deliberately** (a deep-link whose fragment IS the baked default): `materials`
(`library`, default `materials`) and `settingsGeneral` (`settings`, default `general`). These rows are **not**
self-validating from a cold, empty-storage load — the target panel would be visible even if the hash were ignored.
They are **exactly why the seeded-storage precondition in S6 is mandatory** for every deep-link row, not just the
convenient ones.

**Not in the registry (and must never be):** the 25 portal bases + `index.html` (no admin sidebar, no `#view=` nav
route) and `add-family` (whose fragment is the wizard `#step=`, a different mechanism — see §6, D-3).

---

## 3. THE MATRIX — 50 rows, group-aware (49 routed + 1 lock)

Columns: **id** · **category** (`sections[]` sub-group in parens) · **status** · **source route** (the literal in
`nav.config.js`) · **file** · **fragment** · **AR route** (rendered `<a href>` on the 32 AR admin pages) · **EN route**
(rendered on the 32 EN admin pages) · **dest** (`page` | `tab` | `shared-tab` | `lock`) · **group** (the `[data-tabs]`
id that owns the tab id — populated for every `tab` row AND for `page` rows whose landing page hosts a group, `—`
where the page has no group).

### 3.1 CONTROL — 12 rows (12 page)

| # | id | category | status | source route | file | fragment | AR route | EN route | dest | group |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `home` | control | implemented | `dashboard.html` | dashboard | — | `dashboard.html` | `dashboard.en.html` | page | — |
| 2 | `sessions` | control | implemented | `sessions.html` | sessions | — | `sessions.html` | `sessions.en.html` | page | `sessions` |
| 3 | `schedule` | control | implemented | `schedule.html` | schedule | — | `schedule.html` | `schedule.en.html` | page | `schedule` |
| 4 | `attendance` | control | implemented | `attendance.html` | attendance | — | `attendance.html` | `attendance.en.html` | page | — |
| 5 | `sessionsAnalysis` | control | implemented | `sessions-analysis.html` | sessions-analysis | — | `sessions-analysis.html` | `sessions-analysis.en.html` | page | — |
| 6 | `messages` | control | implemented | `messages.html` | messages | — | `messages.html` | `messages.en.html` | page | — |
| 7 | `leads` | control | implemented | `leads.html` | leads | — | `leads.html` | `leads.en.html` | page | — |
| 8 | `tasks` | control | implemented | `tasks.html` | tasks | — | `tasks.html` | `tasks.en.html` | page | — |
| 9 | `announcements` | control | implemented | `announcements.html` | announcements | — | `announcements.html` | `announcements.en.html` | page | — |
| 10 | `timeConverter` | control | implemented | `time-converter.html` | time-converter | — | `time-converter.html` | `time-converter.en.html` | page | `timeconv` |
| 11 | `publicHoliday` | control | implemented | `public-holiday.html` | public-holiday | — | `public-holiday.html` | `public-holiday.en.html` | page | — |
| 12 | `scheduledActions` | control | implemented | `scheduled-actions.html` | scheduled-actions | — | `scheduled-actions.html` | `scheduled-actions.en.html` | page | — |

### 3.2 FAMILIES & STUDENTS — 9 rows (6 page + 3 tab)

| # | id | category | status | source route | file | fragment | AR route | EN route | dest | group |
|---|---|---|---|---|---|---|---|---|---|---|
| 13 | `families` | families | implemented | `families.html` | families | — | `families.html` | `families.en.html` | page | `families` |
| 14 | `addFamily` | families | implemented | `add-family.html` | add-family | — | `add-family.html` | `add-family.en.html` | page | — (`#step=` wizard, not `#view=`) |
| 15 | `students` | families | implemented | `students.html` | students | — | `students.html` | `students.en.html` | page | `students` |
| 16 | `courses` | families | implemented | `courses.html` | courses | — | `courses.html` | `courses.en.html` | page | — |
| 17 | `familyCategories` | families | implemented | `families.html#view=categories` | families | `#view=categories` | `families.html#view=categories` | `families.en.html#view=categories` | tab | `families` |
| 18 | `groups` | families | implemented | `groups.html` | groups | — | `groups.html` | `groups.en.html` | page | — |
| 19 | `scheduleSearch` | families | implemented | `schedule-search.html` | schedule-search | — | `schedule-search.html` | `schedule-search.en.html` | page | — |
| 20 | `studentResult` | families | implemented | `students.html#view=results` | students | `#view=results` | `students.html#view=results` | `students.en.html#view=results` | tab | `students` |
| 21 | `studentEvaluation` | families | implemented | `students.html#view=evaluation` | students | `#view=evaluation` | `students.html#view=evaluation` | `students.en.html#view=evaluation` | tab | `students` |

### 3.3 TEACHERS — 6 rows (2 page + 4 tab) — **post-D-1**

| # | id | category | status | source route | file | fragment | AR route | EN route | dest | group |
|---|---|---|---|---|---|---|---|---|---|---|
| 22 | `teachers` | teachers | implemented | `teachers.html` | teachers | — | `teachers.html` | `teachers.en.html` | page | `teachers` (default `directory`) |
| 23 | `addTeacher` | teachers | implemented | `teachers.html#view=add` | teachers | `#view=add` | `teachers.html#view=add` | `teachers.en.html#view=add` | tab **(was bare `teachers.html` @ `21502af` — D-1)** | `teachers` |
| 24 | `teacherCategories` | teachers | implemented | `teachers.html#view=categories` | teachers | `#view=categories` | `teachers.html#view=categories` | `teachers.en.html#view=categories` | tab **(was bare `teachers.html` @ `21502af` — D-1)** | `teachers` |
| 25 | `teacherKpi` | teachers (`cat.teachersPerf`) | implemented | `teacher-performance.html` | teacher-performance | — | `teacher-performance.html` | `teacher-performance.en.html` | page | `perf` |
| 26 | `sessionsKpi` | teachers (`cat.teachersPerf`) | implemented | `teacher-performance.html#view=sessions-kpi` | teacher-performance | `#view=sessions-kpi` | `teacher-performance.html#view=sessions-kpi` | `teacher-performance.en.html#view=sessions-kpi` | tab | `perf` |
| 27 | `monthlyPerf` | teachers (`cat.teachersPerf`) | implemented | `teacher-performance.html#view=monthly` | teacher-performance | `#view=monthly` | `teacher-performance.html#view=monthly` | `teacher-performance.en.html#view=monthly` | tab | `perf` |

Rows 22/23/24 resolve to **three distinct `[data-tabpanel]` targets** (`directory` / `add` / `categories`) inside the
**one** `teachers` group — the pattern already frozen for `library` (rows 40/41). The pre-D-1 duplicate destination
(three ids → one bare `teachers.html`) **ceases to exist**; it is therefore **NOT** entered in the sanctioned-duplicate
register (§4).

### 3.4 REPORTS (3) + `cat.finance` (8) — 11 rows (2 page + 8 tab incl. 2 shared-tab + 1 lock)

| # | id | category | status | source route | file | fragment | AR route | EN route | dest | group |
|---|---|---|---|---|---|---|---|---|---|---|
| 28 | `reports` | reports | implemented | `reports.html` | reports | — | `reports.html` | `reports.en.html` | page | `reports` |
| 29 | `monthlyReports` | reports | implemented | `reports.html#view=monthly` | reports | `#view=monthly` | `reports.html#view=monthly` | `reports.en.html#view=monthly` | tab | `reports` |
| 30 | `dataAnalysis` | reports | implemented | `reports.html#view=analysis` | reports | `#view=analysis` | `reports.html#view=analysis` | `reports.en.html#view=analysis` | tab | `reports` |
| 31 | `finance` | reports (`cat.finance`) | implemented | `finance.html` | finance | — | `finance.html` | `finance.en.html` | page | `finance` |
| 32 | `invoices` | reports (`cat.finance`) | implemented | `finance.html#view=invoices` | finance | `#view=invoices` | `finance.html#view=invoices` | `finance.en.html#view=invoices` | tab | `finance` |
| 33 | `monthlyInvoices` | reports (`cat.finance`) | implemented | `finance.html#view=monthly-invoices` | finance | `#view=monthly-invoices` | `finance.html#view=monthly-invoices` | `finance.en.html#view=monthly-invoices` | tab | `finance` |
| 34 | `salaries` | reports (`cat.finance`) | implemented | `finance.html#view=salaries` | finance | `#view=salaries` | `finance.html#view=salaries` | `finance.en.html#view=salaries` | **shared-tab (S-1, with #35)** | `finance` |
| 35 | `staffSalaries` | reports (`cat.finance`) | implemented | `finance.html#view=salaries` | finance | `#view=salaries` | `finance.html#view=salaries` | `finance.en.html#view=salaries` | **shared-tab (S-1, with #34)** | `finance` |
| 36 | `payments` | reports (`cat.finance`) | implemented | `finance.html#view=payments` | finance | `#view=payments` | `finance.html#view=payments` | `finance.en.html#view=payments` | tab | `finance` |
| 37 | `classSalaryReport` | reports (`cat.finance`) | **disabled** | — (no route; `reasonKey:'nav.reason.finance'`) | — | — | non-anchor `<button aria-disabled="true">` | non-anchor `<button aria-disabled="true">` | **lock** | — |
| 38 | `banks` | reports (`cat.finance`) | implemented | `finance.html#view=banks` | finance | `#view=banks` | `finance.html#view=banks` | `finance.en.html#view=banks` | tab | `finance` |

`finance` group tab id `overview` is reachable by the plain route (row 31) and by no `#view=` nav item — correct and
frozen; the derived matrix must **not** demand a nav item per tab id (that inversion would force fake nav rows).

### 3.5 ADMINISTRATION — 5 rows (2 page + 3 tab)

| # | id | category | status | source route | file | fragment | AR route | EN route | dest | group |
|---|---|---|---|---|---|---|---|---|---|---|
| 39 | `staff` | admin | implemented | `staff.html` | staff | — | `staff.html` | `staff.en.html` | page | — |
| 40 | `materials` | admin | implemented | `library.html#view=materials` | library | `#view=materials` | `library.html#view=materials` | `library.en.html#view=materials` | tab **(fragment = baked default → seeded test mandatory)** | `library` |
| 41 | `books` | admin | implemented | `library.html#view=books` | library | `#view=books` | `library.html#view=books` | `library.en.html#view=books` | tab | `library` |
| 42 | `certificates` | admin | implemented | `certificates.html` | certificates | — | `certificates.html` | `certificates.en.html` | page | `certificates` |
| 43 | `certificateRequests` | admin | implemented | `certificates.html#view=requests` | certificates | `#view=requests` | `certificates.html#view=requests` | `certificates.en.html#view=requests` | tab | `certificates` |

`library.html` has **no `page`-type nav row** (both its nav ids are tab rows) — legal, and the matrix must not
require one.

### 3.6 SETTINGS — 7 rows (1 page + 6 tab)

| # | id | category | status | source route | file | fragment | AR route | EN route | dest | group |
|---|---|---|---|---|---|---|---|---|---|---|
| 44 | `settings` | settings | implemented | `settings.html` | settings | — | `settings.html` | `settings.en.html` | page | `settings` |
| 45 | `settingsGeneral` | settings | implemented | `settings.html#view=general` | settings | `#view=general` | `settings.html#view=general` | `settings.en.html#view=general` | tab **(fragment = baked default → seeded test mandatory)** | `settings` |
| 46 | `settingsIntegrations` | settings | implemented | `settings.html#view=integrations` | settings | `#view=integrations` | `settings.html#view=integrations` | `settings.en.html#view=integrations` | tab | `settings` |
| 47 | `settingsCustomization` | settings | implemented | `settings.html#view=customization` | settings | `#view=customization` | `settings.html#view=customization` | `settings.en.html#view=customization` | tab **(US spelling — `customisation` = silent dead hash)** | `settings` |
| 48 | `settingsNotifications` | settings | implemented | `settings.html#view=notifications` | settings | `#view=notifications` | `settings.html#view=notifications` | `settings.en.html#view=notifications` | tab | `settings` |
| 49 | `settingsSecurity` | settings | implemented | `settings.html#view=security` | settings | `#view=security` | `settings.html#view=security` | `settings.en.html#view=security` | tab | `settings` |
| 50 | `settingsUsers` | settings | implemented | `settings.html#view=users` | settings | `#view=users` | `settings.html#view=users` | `settings.en.html#view=users` | tab **(E-10: +1 a11y row, +1 screenshot frame — the ONE thin view)** | `settings` |

### 3.7 Arithmetic (must close)

```
rows by category : 12 + 9 + 6 + 11 + 5 + 7                          = 50 ✅
rows by status   : 49 implemented + 1 disabled                      = 50 ✅
rows by dest     : 25 page + 24 tab (incl. 2 shared-tab) + 1 lock   = 50 ✅   [POST-D-1]
                 : 27 page + 22 tab (incl. 2 shared-tab) + 1 lock   = 50 ✅   [PRE-D-1 @ 21502af, historical]
distinct {file,fragment} deep-link destinations : 24 − 1 (S-1 pair) = 23
distinct plain-page destinations                : 25, ALL DISTINCT  (D-1 removes the last collision)
distinct groups referenced by tab rows          : families · students · teachers · perf · reports · finance
                                                  · library · certificates · settings = 9
tab-group-bearing admin pages (registry §2)     : 17 post-041 (16 @ 21502af + teachers)
```

---

## 4. Sanctioned duplicate-destination register (the ONLY permitted duplicates)

| key | items | shared destination | why legitimate | freeze note |
|---|---|---|---|---|
| **S-1** | `salaries` (#34) + `staffSalaries` (#35) | `finance.html#view=salaries` / `finance.en.html#view=salaries` | The `salaries` tab renders **both** boards (teacher + staff), both **figure-free** (name · status · period; zero pay amount). Two nav items → one honest destination that literally contains both subjects. Splitting them would require inventing a duplicate tab or computing a per-staff payroll figure — forbidden by the teacher pay-free / finance no-fake-money laws. | Already pinned by `nav010.finLinks` (`run.cjs:1786`). The matrix must **tolerate exactly this one repeated `{file,fragment}` pair and assert it is the only one**. |

**Not in the register:** the pre-D-1 `teachers` / `addTeacher` / `teacherCategories` triple. After D-1 the three ids
carry three distinct fragments (`—` / `#view=add` / `#view=categories`); the duplicate **is removed, not sanctioned**.
Detector **X-8** must fail if any of them ever re-collapses onto a bare `teachers.html`.

**Not a duplicate:** two nav items landing on the **same file** with **different** fragments (e.g. `materials`/`books`
on `library.html`; the six `settings*` on `settings.html`; `teachers`/`addTeacher`/`teacherCategories` post-D-1). The
duplicate key is the **pair** `{file, fragment}`, never the file alone.

---

## 5. The nine detectors (what the matrix must catch)

Each detector states its **failure condition**, its **oracle** (what the expectation is compared against), and its
**scope** (source / built DOM / live behaviour; AR + EN always). All run over the derived rows of §3; none deletes an
existing assertion.

| # | Defect class | Failure condition | Oracle | Scope |
|---|---|---|---|---|
| **X-1** | **Nonexistent destination** | `file` (as `<file>.html` and `<file>.en.html`) is not among the 115 built files. | `PAGES` (`build-html.mjs`) → the 115-file set; `route-inventory-contract.md` column *file*. | source + filesystem, both langs |
| **X-2** | **Real-but-wrong destination** | The row's `file` differs from the committed expectation for that `id`. (Catches a route repointed to a *real* page — e.g. `settingsUsers` → `staff.html`, explicitly rejected by Spec 040 Decision 1 — which X-1 would happily pass.) | the **literal** table transcribed from `route-inventory-contract.md` §1–6 (never re-derived from `nav.config.js` — FR-009 / Q-9). | source ⇄ committed literal |
| **X-3** | **Wrong `#view=` fragment (dead hash)** | For a `tab` row: the built page (AR **and** EN) lacks `[data-tabs="<group>"] [data-tab="<view>"]` **or** `[data-tabs="<group>"] [data-tabpanel="<view>"]`; **or** the fragment string differs from the committed expectation; **or** `TAB_GROUP_REGISTRY[file]` has no entry (a `#view=` aimed at a page with no tab group). | §2 registry + the built DOM. | built DOM, both langs |
| | | Closes `deep-link-register.md` §7.3 hole **(a)**: `run.cjs:1814` (`h.split('#')[0]`) throws the fragment away before the `VALID_FILES` lookup, so `deadHash`/`badTarget` **cannot** see `#view=customisation`, `#view=monthly-invoice`, or a renamed tab id. | | |
| **X-4** | **AR/EN mismatch** | `EN href ≠ file.replace(/\.html$/,'.en.html') + fragment` on any of the 32 EN admin pages; or the AR href ≠ `route`; or an EN page renders an AR route (or vice-versa); or the EN href drops/mangles the fragment. | `sidebar.js:18-27` `langRoute()` (hash-aware since Spec 035) + §3 columns *AR route* / *EN route*. Register: `ar-en-route-parity-register.md` (0 failures at baseline). | built DOM, 64 admin files |
| **X-5** | **Dropped hash (D-3, topbar language switch)** | From `<file>.html#view=<view>`, activating the **topbar** language control lands on `<file>.en.html` **without** the fragment → the visible panel reverts to the group's baked default. **Live at `21502af`** (`enhance.js:237-241` `langUrl()` reads `location.pathname` only; `enhance.js:552-553` `location.href = langUrl(l)`). Reproduced headless: `finance.html#view=banks` → EN → `finance.en.html`, hash gone, tab = `overview`. | Post-fix expectation: `langUrl()` returns `` `${base}.en.html` `` **+ `location.hash`** → the URL keeps `#view=<view>` and the group shows `<view>`. | **live behaviour**, both directions (AR→EN and EN→AR), per deep-link row |
| | | **TEST-SCOPING TRAP (found live):** `settings.html` renders **TWO** `[data-set-lang]` elements — the **topbar** language menu **and** the Customization tab's **real** language control (`settingsSection` appearance). A D-3 test MUST open `[data-action="lang-menu"]` first and click the `[data-set-lang]` **inside that menu**. An unscoped `[data-set-lang]` selector hits the settings control and **silently proves nothing**. | | |
| | | **Also covers the wizard fragment:** `add-family.html#step=<n>` (row 14) — the one-line fix preserves `location.hash` generically, so `#step=` survives the switch too. The detector asserts `#step=` round-trips. | | |
| | | **Query strings, recorded explicitly (NOT adopted):** the current `langUrl()` already drops `location.search` (it only ever read `pathname`). The app is static and uses no query strings. The fix is **hash-only**; preserving `search` would be a behaviour change **beyond** the minimal fix. Recorded here rather than silently changed. | | |
| **X-6** | **Implemented item rendered planned/disabled** | A row with `status:'implemented'` renders as a `<button>` / `[data-coming-soon]` / `[aria-disabled]` / a «قريبًا» label instead of a real `<a href>`; or sitewide `planned ≠ 0` / `[data-coming-soon] ≠ 0`. | `nav.config.js` build-time guard (implemented ⇒ route) + the frozen counts (implemented 49 · planned 0 · coming-soon 0 · `FUTURE_ROUTES = {}`). | built DOM, 64 admin files |
| **X-7** | **Disabled item rendered as an anchor** | `classSalaryReport` (row 37, the ONE lock) renders as `<a href>` / gains a `route` / loses its `reasonKey` / loses `aria-disabled`. Equivalently: the routeless-lock count ≠ 1, or the lock set ≠ `{classSalaryReport}`. | `honest-lock-register.md`; `nav.config.js` guard (non-implemented ⇒ **no** route; disabled ⇒ `reasonKey`). | source + built DOM, both langs |
| **X-8** | **Duplicate destinations** | Any repeated `{file, fragment}` pair among the 49 routed rows **other than** S-1 (`salaries` ≡ `staffSalaries` → `finance.html#view=salaries`); **or** any repeated bare-`file` pair among the 25 `page` rows (post-D-1 all 25 are distinct — a re-collapse of `addTeacher`/`teacherCategories` onto bare `teachers.html` fails here). | §4 register (exactly one sanctioned pair). | source-derived |
| **X-9** | **Ambiguous fragment ownership** (E-04 safety net, replaces the rejected one-widget rule) | On any single page, two `[data-tabs]` groups declare the **same** tab id → the one global `#view=` fragment cannot name a unique panel. Vacuously true today (≤ 1 group per page, §2); asserted so a future multi-group page cannot ship an ambiguous deep-link. | §2 registry + built DOM. | built DOM |

### 5.1 The live-behaviour precondition (mandatory for every `tab` row)

For each of the **24** deep-link rows × **2** languages: open a **fresh** `browser.newContext()` (a hash-only re-`goto`
on the same document does not re-run `initTabs()` — there is **no `hashchange` listener**), pre-seed
`localStorage['academy.schedView.<group>']` to a **different existing tab id of that group**, then `goto`
`<file>[.en].html#view=<view>` and assert:

```
count( [data-tabs="<group>"] [data-tabpanel]:not([hidden]) ) === 1
        and that one panel is [data-tabpanel="<view>"]
external network requests === 0
```

This proves **hash ≻ stored view ≻ baked default** (`enhance.js:261-273`). Without the seed, the 13 currently-unseeded
rows (`deep-link-register.md` §7.2) prove only *hash ≻ baked default*, and the two baked-default-coincident rows
(`materials`, `settingsGeneral`) prove nothing at all. The seeded form makes all 24 rows **discriminating** and, being
derived, makes a 25th deep-link **impossible to add without coverage**.

### 5.2 The count guards (a silent 51st item cannot ship)

```
|SOURCE| === 50 · implemented === 49 · disabled === 1 · planned === 0
deep-link (tab) rows === 24 · plain (page) rows === 25 · lock rows === 1
categories === 6 · FUTURE_ROUTES === {} · coming-soon === 0
sanctioned duplicate pairs === 1 (S-1) · orphan set === exactly {gallery.html, gallery.en.html}
```

Any deviation is a **supersession** requiring a declared amendment (`count-and-freeze-contract.md` §8) — with the ONE
exception already priced: the D-1 re-classification 22→24 / 27→25, routed total invariant at 49.

---

## 6. Rows the matrix must deliberately NOT touch

| Surface | Why it is out of the matrix |
|---|---|
| `add-family` `#step=<n>` (row 14) | A **wizard** fragment, not a `[data-tabs]` view. It enters the matrix only through detector **X-5** (the hash must survive the language switch). It has no group and must never be given one. |
| `student.html#view=results` / `#view=evaluation` (group `student`) | Per-student **body drill-down** links, not nav routes. `run.cjs:2244-2271` already fresh-loads them; they must **not** be counted toward the 24. |
| `library`/`settings`/… tab ids with no nav item (`overview`, `templates`, `list`, `timetable`, `zone`, …) | The matrix maps **nav item → tab**, never **tab → required nav item**. Inverting it would force fake nav rows. |
| The 25 portal bases + `index.html` | No admin sidebar, no `#view=` nav route. Portal role-nav uses a different, un-hashed mechanism (`ar-en-route-parity-register.md` §6). |
| `gallery.html` / `gallery.en.html` | The **frozen orphan** (D-2, Option A): direct-URL-only, owner = the frontend/design-system maintainer, deliberately absent from production navigation. It is **not** a nav row, so it never appears in this matrix; it is fenced by the separate additive orphan-set guard (`d2-gallery-orphan-contract.md`), which freezes the orphan set as **exactly** `{gallery.html, gallery.en.html}` — a NEW orphan is a failure. Zero source / zero body change. |

---

## 7. Additivity, supersessions, and provenance

- **Additive.** The derived matrix is a **new** smoke block. `nav010`, `nav040`, the Spec-036/037/038/039 DOM blocks,
  `SP039_DEEPLINKS`, `SP040_VIEWS`, the `nav.config` SOURCE audit, `deadHash`/`badTarget`, and every count assert
  **stay and are not deleted**. Where the matrix duplicates an existing literal assertion, both run — the literal is
  the hand-committed expectation, the derived row is the machine check (FR-009 / Q-9 requires both).
- **The only protected-test edits in Spec 041** are the five **D-1 relocations** S1–S5 (`protected-test-register.md`):
  `FORM_DRAWERS_032.teachers` → `['trn-edit']` · the picker/drawer register `teachers` entry removed ·
  `HYBRID_032.teachers` dropped · the `trn-categories` drawer+template assert re-hosted onto the **categories tab
  panel** (the honesty guarantee — list + create form + gates — is preserved; only the HOST changes) · the Spec-036
  anchor regexes → `/teachers\.(en\.)?html#view=add$/` and `/#view=categories$/`. Every other protected assert stays
  **BYTE-VERBATIM** (`FORM_DRAWERS_032.teacher = ['trn-edit','trn-note']` unchanged; `HYBRID_032` reports/library
  unchanged).
- **Refinement, not supersession:** `deep-link-register.md` §7.4(4)'s proposed *one-tabs-widget-per-page* guard is
  **replaced** by the group-aware scoping of §0 + detector **X-9**. It was a specify-phase proposal, never shipped
  code — there is nothing to supersede.
- **D-3 promotion:** `deep-link-register.md` §8 logged the topbar hash loss as observation **O-1** and said *"not fixed
  in 041"*. Planning **promotes it to defect D-3** and adopts the one-line `langUrl()` fix (`enhance.js`, the ONE
  declared narrow supersession of the 0-diff wall). The §8 note is superseded by this planning decision; the
  observation's technical content is unchanged and is carried verbatim into detector **X-5**.
- **Documentation corrections, not supersessions:** the stale `run.cjs` comment (FR-020) and the vacuity explanation
  (FR-021) are classified as **documentation corrections** — they touch no assertion's expectation.
- **Roadmap provenance (binding caveat):** the committed corpus charters **only Spec 041**. Specs 042–057 (incl. the
  Spec-044 owner assigned to the `common.backendRequiredNote` copy sweep, which is **NOT** swept in 041) are a
  **maintainer-directed, append-only amendment — not chartered specs**.
