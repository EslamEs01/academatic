# Contract: Screenshot Acceptance (Spec 005 — Attendance & Session Outcomes)

**Status**: Binding · Automated tests are required but NOT sufficient. Final acceptance is a human screenshot review of the attendance/outcomes surfaces against the Spec 001/002/003/004 approved direction. "Passes tests but looks like a generic attendance spreadsheet / a numeric status dump / drifts from Spec 001 / hides the student-vs-teacher absence distinction" = **fail**. Self-contained for Spec 005.

## A0. Targets are built static pages

Acceptance runs against the built static site in `app/public/`. Targets are the pre-rendered per-language files: `public/attendance.html` / `.en.html`, plus the regenerated `public/sessions.html`, `public/student.html`, `public/family.html`, `public/dashboard.html` (each + `.en.html`). `npm run build` produces them; the harness serves `public/` and loads these files. **Content (shell, summary tiles, filter bar, every `.outcome-row`, the outcome drawer templates) renders WITHOUT JS**; JS is used only to reach a **state** (open the outcome drawer, open a confirm modal, apply a tile filter).

## A1. Capture harness

Extends `tests/screenshots/capture.cjs` (Playwright / **Chromium**): per scenario, set the **theme via `localStorage`** (`academy.theme`), load the per-language file at the viewport, drive the minimal state, then capture a full-page PNG to `app/screenshots/`. Viewports: **desktop 1440×900, tablet 834×1112, mobile 390×844**. Deterministic fixtures + a **fixed clock** (stable "today" for the outcomes slice); non-essential **animation disabled**.

State-driving (no page DOM is built — only existing hooks are exercised):

- **Outcome drawer** — click an `.outcome-row` `[data-row-menu]` → `[data-drawer]` (or the row's open affordance) opening the **canonical outcome drawer**; capture the overlay; named `__drawer`.
- **Confirm modal** — open the drawer, trigger a destructive action (`[data-confirm]` cancel / mark-absent / reschedule), capture the confirmation modal; named `__confirm`.
- **Tile filter** — click a summary tile `[data-filter-set]`; capture the filtered list (used to evidence the clickable status tile if desired).
- **Sessions integration** — load `sessions.html`, open a row's outcome view to show the secondary outcome chip + shared drawer; named `__outcome`.
- **Profile / dashboard sections** — load `student.html` / `family.html` / `dashboard.html`; the fixture hint + deep-link renders on load.

## A2. Required matrix (minimum 11) — exact file names

File naming: `{page}__{lang}__{theme}__{viewport}[__{variant}].png` (variants: `drawer`, `confirm`, `outcome`, `attendance`, `outcome-impact`).

| # | Scenario | File |
|---|---|---|
| 1 | **Attendance** board — AR RTL · Light · Desktop | `attendance__ar__light__desktop.png` |
| 2 | **Attendance** board — AR RTL · **Dark** · Desktop | `attendance__ar__dark__desktop.png` |
| 3 | **Attendance** board — **EN LTR** · Light · Desktop | `attendance__en__light__desktop.png` |
| 4 | **Outcome details drawer** — AR RTL · Light · Desktop | `attendance__ar__light__desktop__drawer.png` |
| 5 | Outcome action **confirmation modal** — AR RTL · Light · Desktop | `attendance__ar__light__desktop__confirm.png` |
| 6 | **Sessions** outcome integration — AR RTL · Light · Desktop | `sessions__ar__light__desktop__outcome.png` |
| 7 | **Student profile** attendance/outcome section — AR RTL · Light · Desktop | `student__ar__light__desktop__attendance.png` |
| 8 | **Family profile** follow-up section — AR RTL · Light · Desktop | `family__ar__light__desktop__attendance.png` |
| 9 | **Dashboard** outcome impact — AR RTL · Light · Desktop | `dashboard__ar__light__desktop__outcome-impact.png` |
| 10 | **Mobile** Attendance board — AR RTL · Light · Mobile | `attendance__ar__light__mobile.png` |
| 11 | **Mobile** outcome drawer — AR RTL · Light · Mobile | `attendance__ar__light__mobile__drawer.png` |

(Additional dark/EN/state captures — e.g. an EN drawer, a tablet board, a tile-filtered list — MAY be added; the eleven rows above are the minimum gate.)

## A2b. Per-frame acceptance criteria (what each frame must show)

- **Attendance board (#1–3, #10)**: a page header + **outcome summary tiles** (total / attended / student-absent / teacher-absent / cancelled-or-rescheduled / needs-follow-up, each with a build-baked count and a clickable status-tile affordance) + a persistent **filter bar** (day · teacher · student/family · subject · outcome · attention) over an airy **list/card hybrid** of `.outcome-row`s — each leading with the time, the session + course, the teacher, the student/family link, a **labeled outcome chip (icon + text)**, and an attention/follow-up flag where flagged. It reads as a calm daily session-outcomes board, **not a generic attendance spreadsheet, not a numeric status dump**. Mobile (#10) reflows to single-column cards with no horizontal overflow; tiles wrap. Dark (#2) is true-dark with correct AA contrast.
- **Outcome drawer (#4, #11)**: the **one canonical** `<template data-preview>` outcome drawer showing the scheduling **Status** + the review **Outcome** (labeled distinctly), the people (teacher + student/family with the family-context row), the attendance summary (`present/capacity`), the **who-absent / who-cancelled attribution**, a make-up/credit **display hint**, a follow-up hint, notes, and the **status-gated action cluster** — the same drawer used on Sessions, not a bespoke per-page modal. Mobile (#11) is full-height.
- **Confirmation modal (#5)**: a destructive outcome action (cancel / mark-absent / reschedule) routes through a **calm confirm modal** (title + message + confirm CTA), confirming a clearly-labeled **demo** toast — not a 13-control field-dense legacy modal, never a real mutation.
- **Sessions integration (#6)**: `sessions.html` rows keep their **primary scheduling status** chip and gain a small **secondary outcome chip** only where a recorded outcome exists; the row view opens the **shared outcome drawer**; a "View attendance" deep-link is present. The existing List/Timetable structure is unchanged.
- **Student profile (#7)**: a calm **fixture-only** recent-outcomes / attendance hint (e.g. "attended N of M · 1 absence to follow up") in the existing Overview/Timetable area + a "View attendance" deep-link — clearly demo/fixture, **not a live metric, no new tab**.
- **Family profile (#8)**: a calm **fixture-only** children follow-up hint + a deep-link — **no finance/credit claim**.
- **Dashboard impact (#9)**: **one** fixture-backed "needs follow-up / absences today" count chip folded into the existing people-signal card + a deep-link to Attendance + the Today's Sessions rows able to carry an outcome chip / open the shared drawer — the **Dashboard Impact Review is represented**; **no new stat wall, no fake/unbacked finance/credit widget, no real attendance metrics**.
- **Across all**: recognizably the same product as Spec 001 (tokens, calm cards, **labeled** status chips never numeric/color-only); **>1 nav category panel visible at once = shell regression = fail**; `attendance` is now a real link in the `control` category while `sessionsAnalysis` + the rest stay «قريبًا/Soon»; no `future-role` portal chrome.

## A3. Review process & comparison references

1. Generate the matrix via the harness.
2. Place each capture **side-by-side** with: the Spec 001 approved dashboard (`design-references/approved-dashboard/academy-dashboard.png`), the approved **sidebar reference** (`design-references/approved-dashboard/sidebar-reference.png`), the **existing Spec 001/002/003/004 screenshots** (`app/screenshots/*.png`), and the **old academy session / attendance / outcome screenshots** (the "Classes Of {date}" board, the session-action Mark-Attend / Mark-Absent / Cancel modals, the session detail, the teacher cancel/absent/attend roll-ups, the monthly progress report) — the last group is **product/UX reference ONLY, never a visual copy**.
3. Apply the failure conditions (A4). Any single failure = not accepted; fix and re-capture.
4. Record verdicts in `app/screenshots/REVIEW.md` (A6).

## A4. Failure conditions (any one = FAIL)

- Looks like a **generic attendance spreadsheet**.
- Missing the **outcome status vocabulary** (the labeled OUTCOME map).
- Missing the **student-absent vs teacher-absent distinction** (on the list and in the drawer).
- Missing the **outcome details drawer/modal** (the canonical shared drawer).
- Missing honest **demo / disabled action** behavior.
- **Dead links / dead actions** (any control not navigating, opening an overlay, filtering, demoing with a toast, or disabled-with-reason).
- **Copied legacy visuals / assets / colors / classes / logo / icons / wording / numeric statuses** (e.g. `status=1..8`).
- **Raw i18n keys** visible.
- **Poor dark mode.**
- **Broken RTL or LTR** (mirrored numbers/dates/times/`present-capacity`, or a broken chip/tile/drawer in either direction).
- Page is **JS-rendered whole page** instead of static HTML-first (a tile/row/drawer built at runtime).
- **Claims real attendance persistence** (or real notification / real reschedule / real credit) instead of honest demo/fixture.
- **Cannot deploy** to GitHub Pages (absolute paths / external requests).
- **Hard to convert** to a Django template.
- The **Dashboard Impact Review is missing** (or a new stat wall / fake-unbacked finance/credit widget was added).
- Does **not visibly reflect** the inspected reference idea (the daily session-outcomes board, cleaner/calmer/more premium).
- **More than one nav category panel** shown at once (shell regression).

## A5. Automated checks that accompany (not replace) the review

- **a11y**: axe critical = 0 (and serious = 0) on each Spec 005 page (AR light + ≥1 dark + ≥1 EN sampled); outcome status / attention never color-only.
- **no-dead-button / no-raw-i18n-key / no-external-request**: smoke over `attendance`/`sessions`/`student`/`family`/`dashboard` (no-external-request also proves no chart/table/form/calendar library loads).
- **HTML-structure**: static shell + baked summary tiles (with derived counts + `data-filter-set`) + a baked filter bar + **≥12** baked `.outcome-row`s (labeled outcome chips + facet attrs) + baked `<template data-preview>` outcome drawers (incl. the outcome section + action cluster) + **no `id="app"`**; relative asset paths.
- **nav (NI12)**: `attendance` is a real `<a>` with a route + exactly one `is-active[aria-current]` on `attendance.html`; `sessionsAnalysis` + the rest of `control` stay Soon buttons; no portal in the DOM; no dead nav link.
- **tile-filter / drawer / confirm smoke**: a tile sets a filter and narrows rows (`data-filter-set`); the canonical drawer opens with the outcome section; a destructive action routes through the confirm modal and toasts; a backend-bound action is disabled-with-reason.
- **keyboard**: scripted tab-through reaches the tiles, the filter controls, the rows, and the drawer actions with visible focus.

## A6. REVIEW.md verdict format

Append a **dated section** to `app/screenshots/REVIEW.md` with a verdict table, then the two trailer lines:

```
## Spec 005 — Attendance & Session Outcomes — <YYYY-MM-DD>

| # | Scenario | File | Verdict |
|---|---|---|---|
| 1 | Attendance board (AR/light/desktop) | attendance__ar__light__desktop.png | ✅ PASS — <reason> |
| … | … | … | … |

Failure conditions: none triggered.
Automated (accompanying): build clean · smoke PASS · axe critical=0/serious=0 · 0 console errors.
```

Every row uses `✅ PASS — <reason>`; any FAIL names the triggered A4 condition and **blocks acceptance** until re-captured.

## A7. Output & naming

`app/screenshots/{page}__{lang}__{theme}__{viewport}[__{variant}].png` (e.g. `attendance__ar__light__desktop__drawer.png`, `dashboard__ar__light__desktop__outcome-impact.png`), with verdicts appended to `app/screenshots/REVIEW.md` per A6.

## A8. Determinism & shell-invariant cross-check

- **Deterministic** — fixtures are fixed and a **fixed clock** pins "today" so the outcomes slice (which sessions are upcoming/live vs completed/absent) is stable across runs; non-essential animation is disabled so the drawer/confirm frames are crisp.
- **Shell cross-check** — every Spec 005 frame MUST also satisfy the carried shell rules: exactly one visible nav category panel (the **control** panel on `attendance.html`), exactly one `is-active[aria-current]` (the `attendance` row), six rail tabs, and no `future-role` portal chrome. A frame violating any of these triggers the "shell regression" / ">1 nav category panel" FAIL even if the page content is otherwise correct.
- **No legacy bleed-through** — reviewers compare against the old session/attendance screenshots only to confirm the *product idea* (a daily outcomes board, the who-absent/who-cancelled distinction); any copied numeric status, palette, class, icon set, or wording in a frame is an automatic FAIL (A4).
