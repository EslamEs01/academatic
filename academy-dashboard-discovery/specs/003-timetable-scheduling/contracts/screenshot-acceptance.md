# Contract: Screenshot Acceptance (Spec 003 — Timetable & Scheduling)

**Status**: Binding · Automated tests are required but NOT sufficient. Final acceptance is a human screenshot review of the scheduling surfaces against the Spec 001/002 approved direction. "Passes tests but looks bad / is a plain table only / drifts from Spec 001" = **fail**.

## A0. Targets are built static pages

Acceptance runs against the built static site in `app/public/`. Targets are the pre-rendered per-language files: `public/schedule.html` / `.en.html`, `public/sessions.html` / `.en.html`, `public/dashboard.html` / `.en.html`. `npm run build` produces them; the harness serves `public/` and loads these files. **Content (shell, tab panels, weekly grid, agenda, drawer templates) renders WITHOUT JS**; JS is used only to reach a tab/drawer **state** (switch to the Timetable panel, open the detail drawer).

## A1. Capture harness

Extends `tests/screenshots/capture.cjs` (Playwright/Chromium): per scenario, set theme via `localStorage`, load the per-language file at the viewport, drive the minimal state (tab via `#view=` hash or click; drawer via a `data-drawer` trigger), then capture a full-page PNG to `app/screenshots/`. Viewports: **desktop 1440×900, tablet 834×1112, mobile 390×844**. Deterministic fixtures + a **fixed clock** (stable "today" accent); non-essential animation disabled.

## A2. Required matrix (minimum 10) — exact file names

File naming: `{page}__{lang}__{theme}__{viewport}[__{variant}].png` (variants: `list`, `timetable`, `teacher`, `drawer`, `agenda`, `schedule-impact`).

| # | Scenario | File |
|---|---|---|
| 1 | Schedule — **List** tab — AR RTL · Light · Desktop | `schedule__ar__light__desktop__list.png` |
| 2 | Schedule — **Timetable** tab — AR RTL · Light · Desktop | `schedule__ar__light__desktop__timetable.png` |
| 3 | Schedule — **Timetable** tab — AR RTL · **Dark** · Desktop | `schedule__ar__dark__desktop__timetable.png` |
| 4 | Schedule — **Timetable** tab — **EN LTR** · Light · Desktop | `schedule__en__light__desktop__timetable.png` |
| 5 | Schedule — **Teacher-timetable lens** — AR RTL · Light · Desktop | `schedule__ar__light__desktop__teacher.png` |
| 6 | **Appointment/session detail drawer** — AR RTL · Light · Desktop | `schedule__ar__light__desktop__drawer.png` |
| 7 | **Dashboard** schedule-impact — AR RTL · Light · Desktop | `dashboard__ar__light__desktop__schedule-impact.png` |
| 8 | **Mobile** agenda fallback — AR RTL · Light · Mobile | `schedule__ar__light__mobile__agenda.png` |
| 9 | **Tablet** Timetable view — AR RTL · Light · Tablet | `schedule__ar__light__tablet__timetable.png` |
| 10 | Sessions — **Timetable/agenda** tab — AR RTL · Light · Desktop | `sessions__ar__light__desktop__timetable.png` |

(Additional dark/EN/state captures MAY be added; the ten rows above are the minimum gate.)

## A2b. Scheduling acceptance criteria (what each frame must show)

- **List tab (#1)**: the calm day-grouped block list with per-day header + filter bar; clearly the same product as Spec 001.
- **Timetable tabs (#2–4, #9)**: a readable hand-rolled weekly grid — generous status-colored blocks (icon+label, not a rainbow), a **cropped** time axis (no empty 24h span), a quiet "today/now" accent, Sat-first columns mirrored in RTL with **times not mirrored**, and **no calendar library** loaded. Dark mode is true-dark with correct contrast.
- **Teacher lens (#5)**: the grid scoped to one teacher (name/avatar labeled) or an all-teachers overview — admin display only, no portal chrome.
- **Drawer (#6)**: a right-side detail drawer with summary-first fields (status, date/time, duration, teacher, students/family, subject, room/online link) + secondary notes/attention; actions demo-with-toast or disabled-with-reason.
- **Dashboard impact (#7)**: the schedule deep-link + unified drawer wiring (and any fixture-backed up-next/attention preview) is visible — the **Dashboard Impact Review** is represented.
- **Mobile agenda (#8)**: the weekly grid reflows to a single-day agenda (day switcher), no horizontal overflow.
- **Sessions timetable (#10)**: the table stays the default List tab; the Timetable/agenda tab shows today's sessions as time-ordered blocks over the same fixture.
- Across all: **>1 nav category panel visible at once = shell regression = fail** (carry the Spec 002 sidebar rule).

## A3. Review process & comparison references

1. Generate the matrix via the harness.
2. Place each capture **side-by-side** with: the Spec 001 approved dashboard (`design-references/approved-dashboard/academy-dashboard.png`), the approved **sidebar reference** (`design-references/approved-dashboard/sidebar-reference.png`), the **existing Spec 001/002 screenshots** (`app/screenshots/*.png`), and the **old academy schedule/timetable/teacher-timetable/session screenshots** — the last group is **product/UX reference only, never a visual copy**.
3. Apply the failure conditions (A4). Any single failure = not accepted; fix and re-capture.
4. Record verdicts in `app/screenshots/REVIEW.md` (A6).

## A4. Failure conditions (any one = FAIL)

- The schedule/timetable appears as a **plain table only**.
- The **calendar/timetable tab is missing**.
- The **details drawer/modal is missing**.
- Looks **invented / unrelated** to the reference.
- Looks like a **legacy visual copy**.
- **Cluttered / unreadable** time blocks.
- **Weak filters.**
- **Dead actions.**
- **Poor dark mode.**
- **Broken RTL or LTR.**
- Page is **JS-rendered** instead of static HTML-first, or the **grid is runtime-drawn**.
- A **calendar library** is added.
- **Cannot deploy** to GitHub Pages (absolute paths / external requests).
- **Hard to convert** to a Django template.
- The **Dashboard Impact Review is missing**.
- **More than one nav category panel** shown at once (shell regression).

## A5. Automated checks that accompany (not replace) the review

- **a11y**: axe critical = 0 and serious = 0 on each scheduling page (AR light + ≥1 dark + ≥1 EN sampled).
- **no-dead-button / no-raw-i18n-key / no-external-request**: smoke over schedule/sessions/dashboard (no-external-request also proves no calendar/chart lib).
- **HTML-structure**: static shell + baked tab panels + a `[data-timetable]` grid with **build-time block spans** + baked `[data-agenda]` + `<template data-preview>`s + **no `id="app"`**; relative asset paths.
- **tabs/grid/drawer smoke**: `role="tablist"` ≥2 tabs, exactly one visible `tabpanel`, tab switch (click + keyboard) persists, filters narrow **both** views, drawer opens with required fields.
- **keyboard**: scripted tab-through reaches tabs/blocks/controls with visible focus.

## A6. REVIEW.md verdict format

Append a **dated section** to `app/screenshots/REVIEW.md` with a verdict table, then the two trailer lines:

```
## Spec 003 — Timetable & Scheduling — <YYYY-MM-DD>

| # | Scenario | File | Verdict |
|---|---|---|---|
| 1 | Schedule List (AR/light/desktop) | schedule__ar__light__desktop__list.png | ✅ PASS — <reason> |
| … | … | … | … |

Failure conditions: none triggered.
Automated (accompanying): build clean · smoke PASS · axe critical=0/serious=0 · 0 console errors.
```

Every row uses `✅ PASS — <reason>`; any FAIL names the triggered A4 condition and blocks acceptance until re-captured.

## A7. Output & naming

`app/screenshots/{page}__{lang}__{theme}__{viewport}[__{variant}].png` (e.g. `schedule__ar__dark__desktop__timetable.png`), with verdicts appended to `app/screenshots/REVIEW.md` per A6.
