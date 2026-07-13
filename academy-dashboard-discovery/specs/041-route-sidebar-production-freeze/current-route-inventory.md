# Current Route Inventory — Spec 041

Recomputed live at HEAD `21502af` (`find public -maxdepth 1 -name '*.html' | wc -l` = 115; `PAGES` array in
`scripts/build-html.mjs` = 57 entries, L92–159). This is the complete generated route set — every file
`npm run build:html` produces under `public/`. No file in `public/` is hand-written; every row below traces to
exactly one `PAGES` entry (or, for `index.html`, to the standalone index template).

## 1. Arithmetic checks

```
total generated HTML                = 115
  = 1 index.html
  + 57 Arabic pages   (public/<base>.html)
  + 57 English pages  (public/<base>.en.html)

57 bases = 32 admin bases + 25 portal bases

admin sidebar-bearing files (render .nav-panel + data-nav-category) = 64  =  32 admin bases × 2 langs
portal / role-shell files   (render pt-nav-item, no admin sidebar)  = 50  =  25 portal bases × 2 langs
neither (index.html)                                                 =  1

CHECK: 64 + 50 + 1 = 115 ✅
CHECK: 32 + 25     =  57 ✅

portal split (25 bases → 50 files):
  family:  9 bases → 18 files
  teacher: 8 bases → 16 files
  student: 7 bases → 14 files
  hub:     1 base  →  2 files
  CHECK: 9+8+7+1 = 25 bases ✅ ; 18+16+14+2 = 50 files ✅
```

`gallery` is counted inside the 32 admin bases (it renders the shared `.nav-panel` sidebar like every other
admin page — `PAGES` gives it no `shell:'portal'`/`role`) but is **reference-only / orphan**: it carries
`activeId: null`, so it is a real admin-shell page that is never a nav-item destination and is linked from
no other page (0 inbound links anywhere in the 115-file corpus — see D-2 in the audit summary). It is listed
separately below for clarity but is included in the "32 admin bases" and "64 admin sidebar-bearing files" totals.

`index.html` has no `.en` twin and is not a `PAGES` entry — it is the single bilingual landing/redirect shell
built outside the `PAGES` loop, hence `type = public`.

## 2. Full base-page inventory (57 bases, PAGES order)

Type legend: `admin` = renders `.nav-panel` + `data-nav-category` (6-category rail) · `portal-teacher` /
`portal-family` / `portal-student` = renders `pt-nav-item` under that `ROLE_NAV` registry · `hub` = the
portal-selector page (`portals.html`, `shell:'portal'`, `role:'hub'`, no `pt-nav-item` role sidebar of its own) ·
`public` = outside both shells (`index.html` only) · `reference-only` = admin-shell page, `activeId: null`,
zero inbound links (orphan; `gallery` only).

| # | base | type | activeId (PAGES) | admin nav id it maps to (if any) | notes |
|---|------|------|-------------------|-----------------------------------|-------|
| 1 | `dashboard` | admin | `home` | (dashboard is the shell root, no `.nav-item`) | |
| 2 | `reports` | admin | `reports` | `reports` category header | Spec 037 tabs: overview·monthly·analysis |
| 3 | `gallery` | reference-only | `null` | — | orphan; component/design-system reference page; D-2 |
| 4 | `sessions` | admin | `sessions` | `sessions` | |
| 5 | `schedule` | admin | `schedule` | `schedule` | folds all-teachers-timetable (Spec 028) + schedule-requests inbox (Spec 026) |
| 6 | `students` | admin | `students` | `students` | Spec 037 tabs: directory·results·evaluation |
| 7 | `teachers` | admin | `teachers` | `teachers` **+ `addTeacher` + `teacherCategories`** | 3 nav ids → 1 bare route, no hash (D-1) |
| 8 | `courses` | admin | `courses` | `courses` | |
| 9 | `settings` | admin | `settings` | `settings` category header + 6 `settingsX` deep-links | Spec 031/040 6-tab hub |
| 10 | `families` | admin | `families` | `families` **+ `familyCategories`** (`#view=categories`) | |
| 11 | `add-family` | admin | `addFamily` | `addFamily` | 5-step wizard |
| 12 | `family` | admin | `families` | (profile template, not its own nav id) | drill-down from `families.html` |
| 13 | `student` | admin | `students` | (profile template, not its own nav id) | drill-down from `students.html` |
| 14 | `attendance` | admin | `attendance` | `attendance` | |
| 15 | `groups` | admin | `groups` | `groups` | |
| 16 | `course` | admin | `courses` | (profile template) | drill-down from `courses.html` |
| 17 | `group` | admin | `groups` | (profile template) | drill-down from `groups.html` |
| 18 | `teacher` | admin | `teachers` | (profile template) | drill-down from `teachers.html` |
| 19 | `teacher-performance` | admin | `teacherKpi` | `sessionsKpi` (`#view=sessions-kpi`) + `monthlyPerf` (`#view=monthly`) | sanctioned Spec-024 B-07 pay exempt board |
| 20 | `finance` | admin | `finance` | `finance` category header + `invoices`/`monthlyInvoices`/`salaries`/`staffSalaries`/`payments`/`banks` deep-links + `classSalaryReport` lock | 6-tab hub (Spec 030/038) |
| 21 | `sessions-analysis` | admin | `sessionsAnalysis` | `sessionsAnalysis` | Spec 026 |
| 22 | `public-holiday` | admin | `publicHoliday` | `publicHoliday` | Spec 026 |
| 23 | `scheduled-actions` | admin | `scheduledActions` | `scheduledActions` | Spec 026 |
| 24 | `messages` | admin | `messages` | `messages` | Spec 034 |
| 25 | `leads` | admin | `leads` | `leads` | Spec 034 |
| 26 | `tasks` | admin | `tasks` | `tasks` | Spec 034 |
| 27 | `announcements` | admin | `announcements` | `announcements` | Spec 034 |
| 28 | `time-converter` | admin | `timeConverter` | `timeConverter` | Spec 034; only genuinely-working client tool |
| 29 | `staff` | admin | `staff` | `staff` **+ `settingsUsers`** (`settings.html#view=users`, NOT staff.html — Spec 040 Decision 1) | the ONE staff home |
| 30 | `library` | admin | `books` | `books` (`#view=books`) + `materials` (`#view=materials`) | Spec 031/039 tabs |
| 31 | `certificates` | admin | `certificates` | `certificates` + `certificateRequests` (`#view=requests`) | Spec 031/039 tabs |
| 32 | `schedule-search` | admin | `scheduleSearch` | `scheduleSearch` | Spec 035; the only page-count-adding spec since 032 |
| 33 | `portals` | hub | `null` | (not an admin nav item — the role-portal entry point) | Spec 012 |
| 34 | `student-portal` | portal-student | `null` | (role home, `pt-nav-item` self-link) | |
| 35 | `family-portal` | portal-family | `null` | (role home, `pt-nav-item` self-link) | |
| 36 | `teacher-portal` | portal-teacher | `null` | (role home, `pt-nav-item` self-link) | |
| 37 | `family-child` | portal-family | `null` | (drill-down; family-owned child-view, Spec 018/022 B-01) | |
| 38 | `student-schedule` | portal-student | `schedule` | | Spec 019 |
| 39 | `student-homework` | portal-student | `homework` | | Spec 019 |
| 40 | `student-materials` | portal-student | `materials` | | Spec 019 |
| 41 | `student-progress` | portal-student | `progress` | | Spec 019 |
| 42 | `student-history` | portal-student | `history` | | Spec 019 |
| 43 | `student-profile` | portal-student | `profile` | | Spec 019 |
| 44 | `family-children` | portal-family | `children` | | Spec 020 |
| 45 | `family-schedule` | portal-family | `schedule` | | Spec 020 |
| 46 | `family-progress` | portal-family | `progress` | | Spec 020 |
| 47 | `family-billing` | portal-family | `billing` | | Spec 020; zero-pay status-first |
| 48 | `family-requests` | portal-family | `requests` | | Spec 020 |
| 49 | `family-materials` | portal-family | `materials` | | Spec 020 |
| 50 | `family-profile` | portal-family | `profile` | | Spec 020 |
| 51 | `teacher-schedule` | portal-teacher | `schedule` | | Spec 025 |
| 52 | `teacher-students` | portal-teacher | `students` | | Spec 025 |
| 53 | `teacher-outcomes` | portal-teacher | `outcomes` | | Spec 025 |
| 54 | `teacher-tasks` | portal-teacher | `tasks` | | Spec 025 |
| 55 | `teacher-reports` | portal-teacher | `reports` | | Spec 025; teacher-home performance anchor target (post B-07 repoint) |
| 56 | `teacher-profile` | portal-teacher | `profile` | | Spec 025 |
| 57 | `teacher-library` | portal-teacher | `library` | | Spec 025; planned nav item since Spec 024 B-05 (still `plannedNavAnchors===0` — never an anchor) |

Plus, outside `PAGES` and outside both shells:

| — | `index` | public | — | — | single bilingual entry file; no `.en` twin |

## 3. Type totals (cross-check against §1)

| type | bases | files (×2 langs, index ×1) |
|---|---|---|
| `admin` (incl. `gallery`) | 32 | 64 |
| `reference-only` (subset of the 32 admin bases above — NOT additional) | 1 (`gallery`) | 2 (`gallery.html`, `gallery.en.html`) |
| `portal-family` | 9 | 18 |
| `portal-teacher` | 8 | 16 |
| `portal-student` | 7 | 14 |
| `hub` | 1 | 2 |
| `public` | — | 1 (`index.html`, no base/twin) |
| **TOTAL** | **57 bases** | **115 files** |

`reference-only` is a sub-classification of `admin`, not a sixth bucket in the file-count arithmetic — the
64/50/1 partition in §1 already carries `gallery.html`/`.en` inside the 64 admin-sidebar-bearing files, exactly
as the audit's impact-partition method requires (`040-settings-deep-links-subpages/contracts/impact-protection-contract.md`
§2, carried into 041's authoritative facts): "64 admin files (which render the shared sidebar, **including
`gallery.html`/`.en`**) + 51 non-admin files … = 115." **That prior "51 non-admin" = the 50 portal files +
`index.html`** — the same product, one partition coarser; the frozen 041 partition is **64 + 50 + 1 = 115**
(`count-and-freeze-contract.md` §1/§3).

## 4. Notes for the freeze

- **Zero new bases since Spec 035** (`schedule-search`, the +2 that took the count 113→115). Specs 036–040 held
  57 bases / 115 files by construction (fold-anchors and `#view=` deep-links onto existing tab groups only).
- Two bases carry **more than one admin nav id** pointed at them: `teachers` (3 ids: `teachers`, `addTeacher`,
  `teacherCategories` — see D-1, the one genuine route defect) and `finance` (7 ids: the category header plus
  6 tab deep-links, one of which — `classSalaryReport` — is the honest routeless lock, not a route to
  `finance.html`).
- `gallery` remains the only orphan in the 115-file corpus. It is intentionally reachable by direct URL only
  (component/design-system reference), but per the audit law an intentionally-reachable non-sidebar page still
  needs a documented owner and entry path — today it has neither (D-2; carried forward, not fixed here).
