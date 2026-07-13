# Spec 041 — Targeted Visual & Source Grounding

Audit-only. Records exactly what was inspected to ground Spec 041's route/sidebar freeze claims, the
command/method behind every derived number, and the live-browser proof of finding D-1. Baseline: HEAD
`21502af`; the committed tree is **CLEAN (0 entries)** — the only working-tree entries during this pass are the
untracked `specs/041-route-sidebar-production-freeze/` artifacts and the speckit-managed `.specify/feature.json`
(verified via `git rev-parse HEAD` + `git status --short` at the start of this session). **0 application-source, test
or public-HTML files were modified.**

## 1. Source files read in full

| File | Lines | What was verified |
|---|---|---|
| `app/src/js/nav.config.js` | 164 (full file read) | All 6 `NAV_CATEGORIES`, all 50 items, the `item()`/`catItems()`/`categoryOf()` helpers, `FUTURE_ROLE` (3 entries), `FUTURE_ROUTES` (empty object, comment-only body), and the build-time guard loop (L158-164) that throws if an `implemented` item lacks a route, a non-implemented item carries a route, or a `disabled` item lacks a `reasonKey`. Confirmed the exact 22 `#view=` routes, the two non-unique-route pairs (`salaries`/`staffSalaries` → `finance.html#view=salaries`; `teachers`/`addTeacher`/`teacherCategories` → bare `teachers.html`), and the single honest lock `classSalaryReport` (L90: `status: 'disabled', reasonKey: 'nav.reason.finance'`, no `route` key). |
| `app/src/js/components/sidebar.js` | 99 (full file read) | `langRoute()` (L18-27) — confirmed it is hash-aware: splits the route on the first `#`, only rewrites the file part to `.en.html`, and re-appends the hash unchanged, so `settings.html#view=general` → `settings.en.html#view=general`. `navItem()` (L30-49) — confirmed the three-way status rendering: `planned` → `<button data-coming-soon>`, `disabled` → `<button aria-disabled="true" data-disabled-reason data-reason-key>` with a lock icon, `implemented` → `<a href>`. Confirmed no other file reads/writes `NAV_CATEGORIES`. |
| `app/src/js/enhance.js` | 653 (full file read; hash-handling region re-read at L244-273 and L557) | Confirmed there are exactly **two** `location.hash` readers in the entire file: `initTabs()` (L262-273, parses `#view=` and falls back to `localStorage['academy.schedView.<group>']` then the baked default) and the wizard step reader (L319, parses `#step=`). Grepped `location.hash` — 2 hits, both accounted for. **There is no third hash reader and no `hashchange` listener** (`grep -n hashchange` = 0 hits) — i.e. no mechanism exists anywhere in the app to open a `.drawer` sheet from a URL fragment. This is the load-bearing fact behind finding D-1. |
| `app/src/js/components/portal-shell.js` | 106 (full file read) | Confirmed the portal shell renders navigation **outside** `#page-body` (identity block, `pt-nav` list, hub-exit link) and that `navItem()` (L23-31) renders `implemented` entries as `<a class="pt-nav-item">` and any non-implemented entry as a non-anchor `<button class="pt-nav-item is-planned">` — i.e. the portal nav honesty contract mirrors the admin sidebar's. |
| `app/src/js/fixtures/portal.js` | `ROLE_NAV` block read at L139-169 (of 430 total) | Counted the three role registries directly: `student` = 7 entries, all `status:'implemented'` (home/schedule/homework/materials/progress/history/profile); `family` = 8 entries, all implemented (home/children/schedule/progress/billing/requests/materials/profile); `teacher` = 8 entries, all implemented (home/schedule/students/outcomes/tasks/reports/library/profile). Zero `status` other than `'implemented'` in any of the three arrays — confirms "portal planned 0" for all three roles (the `pt-nav-item.is-planned` branch in `portal-shell.js` is retained but permanently unexercised, consistent with CLAUDE.md's Spec-025 note). Each list + hub-exit = the 8/9/9 rendered-item counts (student 7+hub=8, family 8+hub=9, teacher 8+hub=9). |
| `app/scripts/build-html.mjs` | 220 total; `PAGES` import block read at L1-45 | Counted 57 page-render imports (dashboard, reports, gallery, sessions, schedule, students, teachers, courses, settings, families, family, add-family, student, attendance, groups, course, group, teacher, teacher-performance, finance, sessions-analysis, public-holiday, scheduled-actions, staff, … through the Spec-034/035/039/040 additions). Cross-checked against the live build output (`find public -maxdepth 1 -name '*.html' | wc -l` = 115 = 57×2 + `index.html`). |
| `app/tests/smoke/run.cjs` | 2593 total; targeted reads at L1-50 (VALID_FILES/PAGES), L140-260 (deadNav + the retired planned-probe/zero-census), L1380-1600 (nav010/Spec-035..040 route blocks), L1750-1840 (nav010 IA freeze + truth010), L1800-1840 (link-integrity), L2240-2480 (the 5 fresh-context deep-link blocks incl. the two SEEDED ones), L2500-2593 (the post-`browser.close()` nav.config SOURCE audit + the route/page-count freeze) | Independently re-derived (not just trusted from the supplied brief) the 22-deep-link inventory, the 9-seeded/13-unseeded split, the `badTarget` fragment-stripping gap, and the `pub.length === 115` assert with its stale "Spec 032 … 103" comment header — all reconfirmed by direct `grep -n` against the live file (see §3). |
| `app/tests/a11y/run.cjs` | 377 total; `MATRIX` read at L8-333, driver at L342-371 | Confirmed the `settingsUsers` row is the thinnest deep-link coverage (exactly one row, L209, en/light/desktop) by grepping `view=users` — 1 hit — versus every other `#view=` value, which returns ≥2 hits. |
| `app/tests/screenshots/capture.cjs` | 546 total; `MATRIX` read at L18-440, hash-builder at L461, category-driver at L470 | Confirmed the hash-construction rule (`#step=` / `#view=` / `#child=`) and that `s.cat` clicks (`[data-nav-category="…"]`) are the mechanism behind every `cat-*` filename suffix used in §4 below. |

## 2. Live browser probe of `teachers.html` (finding D-1)

Method: served `public/` over `python3 -m http.server 8933` and drove a throwaway Playwright script
(`app/scripts/_probe041.mjs`, written, executed, then deleted — no application file was left behind) against
`node_modules/playwright` already present in the app's `node_modules`. Three checks, all against the
COMMITTED build (no source edited):

1. **Land on `teachers.html` with no hash** (the exact route all three of `teachers`/`addTeacher`/
   `teacherCategories` resolve to per `nav.config.js` L54-56):
   ```json
   { "url": "http://localhost:8933/teachers.html", "drawerOpenCount": 0, "scrimOpenCount": 0,
     "trnAddTemplate": true, "trnCategoriesTemplate": true,
     "headerDrawerButtons": ["trn-categories", "trn-add", "sara", "mohammed", "layan", "abdullah", "reem", "nora", "khalid", "huda"] }
   ```
   The `<template data-preview="trn-add">` and `<template data-preview="trn-categories">` markup both
   exist on the page (confirming Spec 036's claim that the drawers themselves are real), but zero
   `.drawer.is-open` / `.scrim.is-open` nodes exist on load — landing here opens nothing.

2. **Land on a synthetic `teachers.html#drawer=trn-add`** — a hash `nav.config.js` never actually emits
   (used only to test whether *any* hash-drawer mechanism exists anywhere in `enhance.js`, per the §1
   `location.hash` grep which found only the two `#view=`/`#step=` readers):
   ```json
   { "drawerOpenCount": 0 }
   ```
   Confirms there is no hash-triggered drawer opener at all — not merely that `nav.config.js` omits the
   hash.

3. **Positive control** — after the page loads, perform the *second*, manual click a real user would have
   to make (the page's own header button, `[data-drawer="trn-add"]`):
   ```json
   { "drawerOpenCount": 1, "sheetHeading": "إضافة معلّم جديد" }
   ```
   Proves the drawer mechanism itself works correctly — the defect is specifically that the sidebar nav
   item does not trigger it, not that the drawer is broken.

Also confirmed directly on the **built HTML** (no browser needed) that all three sidebar entries carry the
byte-identical `href`:
```
$ grep -oE '<a[^>]*data-nav="(teachers|addTeacher|teacherCategories)"[^>]*>' public/dashboard.html
<a href="teachers.html" class="nav-item" data-nav="teachers" data-nav-status="implemented">
<a href="teachers.html" class="nav-item" data-nav="addTeacher" data-nav-status="implemented">
<a href="teachers.html" class="nav-item" data-nav="teacherCategories" data-nav-status="implemented">
```

**Conclusion (D-1, confirmed by live probe, not just static reading of `nav.config.js` comments):**
`addTeacher` and `teacherCategories` are navigationally indistinguishable from the plain `teachers` link and
from each other — all three land on the same rendered state, and reaching either drawer requires a second,
undocumented manual click the sidebar promise does not describe. This is the only nav item pair in the
product where the promoted route does not open its own distinct surface (every other Spec 035–040
fold-anchor carries a `#view=` hash that `initTabs()` genuinely resolves).

## 3. Re-derivation of the numeric facts (not trusted from the brief — recomputed independently)

| Claim | Command / method | Result |
|---|---|---|
| HEAD commit | `git rev-parse HEAD` | `21502afd1018176331a763f5626e92765350fef0` (matches the supplied `21502af`) |
| Working tree | `git status --short` | no tracked application file modified; the only entries are the speckit-managed `.specify/feature.json` and the untracked `specs/041-…/` artifacts of this pass — **0 source / 0 test / 0 HTML** |
| Total built HTML | `find public -maxdepth 1 -name '*.html' \| wc -l` | 115 |
| Admin menu items | Read `NAV_CATEGORIES` in full (§1) + counted `catItems()` output by category | control 12, families 9, teachers 6 (3 items + 3 in the `teachersPerf` section), reports 11 (3 items + 8 in the `finance` section), admin 5, settings 7 = **50** |
| `#view=` deep-links | Grepped `route:.*#view=` across `nav.config.js` | 22 matches, cross-checked id-by-id against the 22-row inventory in the supplied brief — exact match |
| Honest locks | Grepped `status: 'disabled'` across `nav.config.js` | 1 match: `classSalaryReport` (L90) |
| `FUTURE_ROUTES` | Read L148-155 | `{}` — comment-only body, zero live keys |
| `location.hash` readers | `grep -n "location.hash" src/js/enhance.js` | 2 hits (L265, L319) — no third reader, no `hashchange` listener (`grep -n hashchange` = 0 hits) |
| Non-unique routes | Grepped `route:` values for duplicates across all 50 items | 2 collision groups: `finance.html#view=salaries` (salaries, staffSalaries) and bare `teachers.html` (teachers, addTeacher, teacherCategories) |
| Portal nav counts | Counted `ROLE_NAV` array entries per role (§1) | student 7, family 8, teacher 8 (+1 hub-exit link each, rendered 2× per page — desktop `pt-sidenav` + mobile `pt-nav-drawer` — matching the brief's "rendered 18×/18×/16×" since (7+1)×2=16, (8+1)×2=18, (8+1)×2=18) |

## 4. Screenshots opened as images

Confirmed existence first (`ls screenshots/*.png | wc -l` → 397 total PNGs in `app/screenshots/`), then
opened the four frames named in the assignment plus one extra admin-category control frame, viewing pixels
directly (not just filenames):

1. **`dashboard__ar__light__desktop__cat-teachers.png`** — the admin sidebar rail-teachers category panel
   open (AR). Visually confirms 0 «قريبًا» badges and 0 lock icons anywhere in the teachers category: the
   panel shows `المعلمون` (teachers), `إضافة معلم` (addTeacher), `فئات المعلمين` (teacherCategories) as plain
   nav rows, then a `مؤشرات الأداء` sub-section with `مؤشرات أداء المعلمين` / `مؤشر أداء الحصص` /
   `الأداء الشهري`. Nothing distinguishes `addTeacher`/`teacherCategories` visually from `teachers` itself —
   corroborates D-1 at the pixel level (the screenshot cannot show the missing-drawer defect, since a static
   frame of the sidebar looks identical whether the destination is honest or not — this is precisely why the
   live browser probe in §2 was necessary and a screenshot alone would have been insufficient).
2. **`dashboard__ar__light__desktop__sp040-sidebar-zero-soon__cat-settings.png`** and
   **`dashboard__en__light__desktop__sp040-sidebar-zero-soon-en__cat-settings.png`** — the settings category
   panel, both languages. Visually confirms all 7 settings items (`الإعدادات`/Settings,
   `عام`/General, `التكاملات`/Integrations, `التخصيص`/Customization, `الإشعارات`/Notifications,
   `الأمان`/Security, `المستخدمون والموظفون`/Users & staff) render as plain nav rows with icons — 0 «قريبًا»
   pills, 0 lock icons — confirming settingsPlanned === 0 at the pixel level, matching the source-level
   assertion at `smoke:1539`/`smoke:2505`.
3. **`finance__ar__light__desktop__sp038-classsalary-lock.png`** and
   **`finance__en__light__desktop__sp038-classsalary-lock-en.png`** — the finance sidebar sub-section, both
   languages. Visually confirms `classSalaryReport`/"Class salary report" is the ONLY finance nav row
   rendered in a muted/locked visual treatment with a padlock icon, while `Finance`/`Invoices`/`Monthly
   invoices`/`Salaries`/`Staff salaries`/`Payments`/`Banks` all render as normal dark-text, unlocked links —
   confirming the "exactly ONE honest lock" claim at the pixel level. **Incidental finding, recorded for
   041's own honesty**: the page BODY in this same frame shows 9 amber **"Planned"/"يتطلب الخادم"/"قيد
   التخطيط"** badge cards under "Salaries & accounting" (Monthly invoices, Invoices engine, Payments
   collection, Teacher salaries, Staff salaries, Class salary report, Payouts & compensations, Accounting &
   expenses, Banks). These are the Spec-030/038 **body-level** `availability:'backendRequired'`/`'planned'`
   gate cards (`fixtures/portal.js`-style `PORTAL_PLANNED` pattern, finance's own equivalent) — they are
   **not** `.nav-item[data-nav-status="planned"]` and do **not** count against the sitewide
   `planned === 0` / `[data-coming-soon] === 0` nav census, which scopes strictly to `.nav-panel .nav-item`
   (`smoke:1826-1836`, `2400`, `2506`). This distinction matters for anyone re-grepping screenshots for the
   word "Planned" expecting zero hits — the nav rail has zero, the page body still has these honest
   backend-required cards by design (declared out of scope for the sidebar/route freeze).
4. **`library__en__light__desktop__sp039-sidebar-en__cat-admin.png`** (opened in addition to the four named
   frames, as a control) — the admin-category sidebar panel, English. Confirms the 5-item admin category
   (`Staff & Roles`, `Materials`, `Library`, `Certificates`, `Certificate requests`) with 0 planned badges,
   matching the "admin category now 5 items / 0 «قريبًا»" claim carried from Spec 039.

## 5. Count of nav/route-related screenshot frames available

Method: `ls app/screenshots/*.png` filtered for filenames containing a sidebar-category click marker
(`__cat-<id>`, the `data-nav-category` click driven by `capture.cjs:470`) OR a Spec 035–040 nav-completion
marker (`sp035`…`sp040`, the per-spec nav/deep-link frame tags used throughout Specs 035–040's own
`REVIEW.md` entries). Exact commands:
```
$ ls screenshots/*.png | wc -l                              # 397 total captured frames
$ ls screenshots | grep -E '__cat-' | wc -l                  # 12  (rail-category-open frames)
$ ls screenshots | grep -E 'sp035' | wc -l                   # 11
$ ls screenshots | grep -E 'sp036' | wc -l                   # 9
$ ls screenshots | grep -E 'sp037' | wc -l                   # 19
$ ls screenshots | grep -E 'sp038' | wc -l                   # 13
$ ls screenshots | grep -E 'sp039' | wc -l                   # 13
$ ls screenshots | grep -E 'sp040' | wc -l                   # 23
$ ls screenshots | grep -E '__cat-|sp03[5-9]|sp04[01]' | wc -l  # 96 (union, de-duplicated by `sort -u`)
```
This session's own reproducible union count is **96** nav/route-related frames. The per-tag counts (11 + 9 + 19 + 13 +
13 + 23 = **88** Spec-035…040-tagged frames, plus **12** rail-category `__cat-` frames = 100 raw) overlap on the four
frames that carry **both** a `sp039`/`sp040` tag **and** a `…__cat-admin` / `…__cat-settings` suffix — hence the
de-duplicated union (`sort -u`) is **96**, not 100. The union command above is the authority; the per-tag rows are
its inputs. This is offered as the audit's own from-scratch count rather than a reused prior figure — no earlier
artifact in the repo (checked `REVIEW.md` for the literal string "63", 0 hits) defines a "63 nav-related frames"
figure with a stated method, so that number is not independently reproducible from the committed corpus and 041 does
not cite it.

## 6. Legacy evidence re-read (independently verified, not just trusted from the supplied brief)

| File | Grounding performed |
|---|---|
| `output/roles/admin/pages/management-teachers-details.md` | Read L210-300 directly. Confirmed the exact 4 teacher-domain sidebar rows at **L214-217**: `Teachers → /management/teachers`, `Add New Teacher → /management/teachers/create`, `Teachers Category → /management/teacher-categories`, `Teachers → /management/teachers_details` (a 4th, differently-routed page reusing the "Teachers" label). Cross-confirmed the same 4 rows repeated in the raw "Sidebar Links (68)" DOM dump at **L285-288**. Confirmed **L221/L292** — legacy's own sidebar mislabels `/management/forms` as "monthly reports" — and **L293** — `Data Analysis` is captured as `javascript:void(0)` under "External Links", i.e. a dead legacy stub, not a functioning page. |
| `output/combined/route-graph.md` | Read L415-484 directly (the `management/home` sidebar-edge block). Counted 52 `_(via sidebar)_` edges in that exact range (`sed -n '417,484p' … \| grep -c "via sidebar"` → 52), matching the "51 content destinations + 1 logout" claim. |
| `output/combined/missing-coverage.md` | Grepped `management/logout` — found at **L130**: `URL targets a mutating/destructive action — not navigated`, confirming logout's exclusion is a documented crawler policy, not an oversight. |
| `output/combined/role-permission-matrix.md`, `frontend-planning-deep/03-screenshot-review.md`, `frontend-planning-deep/08-role-page-inventory-v2.md`, `frontend-planning-deep/09-permission-navigation-matrix-v2.md`, `frontend-planning-deep/13-improved-information-architecture-v2.md`, `frontend-planning-deep/20-no-missing-items-audit.md` | Confirmed present on disk (`ls` — all 6 resolve); their specific cited claims (flat ~40-entry legacy sidebar description, 17/13/9-module role presence counts, the ~170-flag permission-data-driven admin RBAC, the distinct `/management/teacher-categories` and `/management/teachers/create` route templates with form/field counts) were supplied pre-verified in this session's briefing and are treated as grounded per the file-existence check above; the teacher-domain-specific claims (the load-bearing ones for D-1) were the ones independently re-derived from primary source in this pass, per the two rows above. |

## 7. What was NOT done (scope discipline)

No application source, test, or public HTML file was modified. The one throwaway probe script
(`app/scripts/_probe041.mjs`) was deleted after use; `git status --short` was re-verified clean of it. No
`plan.md`/`tasks.md` was created. This file is the only artifact written by this pass.
