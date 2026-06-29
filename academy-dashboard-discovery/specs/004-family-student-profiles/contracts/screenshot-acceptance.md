# Contract: Screenshot Acceptance (Spec 004 — Families & Student Academic Profiles)

**Status**: Binding · Automated tests are required but NOT sufficient. Final acceptance is a human screenshot review of the families/students surfaces against the Spec 001/002/003 approved direction. "Passes tests but looks like a generic CRM / a plain spreadsheet / drifts from Spec 001 / hides the family↔student relationship" = **fail**. Self-contained for Spec 004.

## A0. Targets are built static pages

Acceptance runs against the built static site in `app/public/`. Targets are the pre-rendered per-language files: `public/families.html` / `.en.html`, `public/family.html` / `.en.html`, `public/add-family.html` / `.en.html`, `public/student.html` / `.en.html`, `public/students.html` / `.en.html`, `public/dashboard.html` / `.en.html`. `npm run build` produces them; the harness serves `public/` and loads these files. **Content (shell, family cards + grouped children, profile tab panels, ALL wizard steps, drawer templates) renders WITHOUT JS**; JS is used only to reach a **state** (switch to a profile tab, advance a wizard step, open the detail drawer).

## A1. Capture harness

Extends `tests/screenshots/capture.cjs` (Playwright/**Chromium**): per scenario, set the **theme via `localStorage`** (`academy.theme`), load the per-language file at the viewport, drive the minimal state, then capture a full-page PNG to `app/screenshots/`. Viewports: **desktop 1440×900, tablet 834×1112, mobile 390×844**. Deterministic fixtures + a **fixed clock** (stable "today" accent for the timetable slice); non-essential **animation disabled**.

State-driving (no page DOM is built — only existing hooks are exercised):

- **Profile tab** (Results / Evaluation / any section) — load with the `#view=<token>` hash (e.g. `student.html#view=results`, `#view=evaluation`) **or** click `[data-tab="<id>"]`; capture after the panel becomes visible.
- **Wizard step** — load with the step hash **or** click `[data-step-next]` until the target step is active (e.g. step 3 = Children), then capture; named `__wizard-step3`.
- **Drawer** — click a `[data-drawer]` trigger (a student row's quick-peek, or a profile Timetable session block opening the **shared appointment drawer**); capture the overlay; named `__drawer`.
- **Family card / facet** — `families.html` renders its baked cards on load; no state needed for the directory frame.

## A2. Required matrix (minimum 13) — exact file names

File naming: `{page}__{lang}__{theme}__{viewport}[__{variant}].png` (variants: `wizard-step3`, `results`, `evaluation`, `drawer`, `family-impact`).

| # | Scenario | File |
|---|---|---|
| 1 | **Families** directory — AR RTL · Light · Desktop | `families__ar__light__desktop.png` |
| 2 | **Families** directory — AR RTL · **Dark** · Desktop | `families__ar__dark__desktop.png` |
| 3 | **Families** directory — **EN LTR** · Light · Desktop | `families__en__light__desktop.png` |
| 4 | **Family profile** hub — AR RTL · Light · Desktop | `family__ar__light__desktop.png` |
| 5 | **Add-family wizard** (Children step) — AR RTL · Light · Desktop | `add-family__ar__light__desktop__wizard-step3.png` |
| 6 | **Students** directory (family link + facet) — AR RTL · Light · Desktop | `students__ar__light__desktop.png` |
| 7 | **Students** directory — AR RTL · **Dark** · Desktop | `students__ar__dark__desktop.png` |
| 8 | **Student academic profile** — AR RTL · Light · Desktop | `student__ar__light__desktop.png` |
| 9 | Student **Results** tab — AR RTL · Light · Desktop | `student__ar__light__desktop__results.png` |
| 10 | Student **Evaluation** tab — AR RTL · Light · Desktop | `student__ar__light__desktop__evaluation.png` |
| 11 | **Dashboard** family/student impact — AR RTL · Light · Desktop | `dashboard__ar__light__desktop__family-impact.png` |
| 12 | **Mobile** Families directory — AR RTL · Light · Mobile | `families__ar__light__mobile.png` |
| 13 | **Mobile** Student profile — AR RTL · Light · Mobile | `student__ar__light__mobile.png` |

(Additional dark/EN/state captures — e.g. a family-profile drawer, an EN wizard step, a tablet profile — MAY be added; the thirteen rows above are the minimum gate.)

## A2b. Family/student acceptance criteria (what each frame must show)

- **Families directory (#1–3, #12)**: a page header + summary tiles + a filter bar (search + status + **family-category** facets) over a calm grid of **family cards** — each leading with the guardian and the family's **children grouped visually** (child avatars/chips + a "+N" overflow), student & active-course counts, a labeled family-status chip (icon+label), and a fixture attention hint where flagged. The family↔children relationship is the **hero**, not a buried table column. Mobile (#12) is single-column with no horizontal overflow. Dark (#2) is true-dark with correct contrast.
- **Family profile (#4)**: a banner (guardian + status) + a baked **tablist** (Overview · Students · Schedule · Plan & Billing · Notes); the **Students** tab lists the family's children, each linking to their student profile; Plan & Billing reads as a calm fixture/disabled-with-reason stub (no real finance); actions are demo-with-toast or disabled-with-reason (destructive → confirm modal).
- **Add-family wizard (#5)**: a baked multi-step flow with a step indicator showing the active **Children** step; **every field is labeled**; Next/Back move the active step (the other steps `hidden`); Save reads as a clearly-labeled demo. Not one giant legacy form.
- **Students directory (#6, #7)**: the existing directory enriched with a real **family** link/chip per student + a **family** filter facet + a "view profile" link to the student profile, with the quick-peek drawer preserved; strong, visible-feedback filters + a no-results/reset state.
- **Student profile (#8, #13)**: a banner (student + **family link** + status + level + progress) + a baked **tablist** (Overview · Courses · Timetable · Results · Evaluation · Family · Notes); the Timetable tab reuses the scheduling visual language (`scheduleAgenda` + the shared appointment drawer) with a "View in schedule" deep-link; reads as a calm academic profile, not a 99-button spreadsheet. Mobile (#13) stacks the tabs with no overflow.
- **Results tab (#9)**: fixture-only per-course **progress** (hand-rolled bars/rings) + a **certificates** list + a level/term summary — clearly display, not a live gradebook.
- **Evaluation tab (#10)**: the fixture-only **monthly progress-report rubric** — criteria rows (learning progress / focus / homework / punctuality) each with a calm rating **pill (icon+label, never color-only)** + an achievements narrative + next-month objectives + an Approve **demo** action.
- **Dashboard impact (#11)**: a deep-link to Families/Students + the Today's Sessions rows' shared drawer carrying family context + at most one fixture-backed "needs attention" count chip — the **Dashboard Impact Review** is represented; **no new stat wall, no fake/unbacked finance widget**.
- **Across all**: recognizably the same product as Spec 001 (tokens, calm cards, labeled status chips); **>1 nav category panel visible at once = shell regression = fail** (carry the Spec 002 sidebar rule); `families`/`addFamily` are now real links while the rest of the Families category stays «قريبًا/Soon»; no `future-role` portal chrome.

## A3. Review process & comparison references

1. Generate the matrix via the harness.
2. Place each capture **side-by-side** with: the Spec 001 approved dashboard (`design-references/approved-dashboard/academy-dashboard.png`), the approved **sidebar reference** (`design-references/approved-dashboard/sidebar-reference.png`), the **existing Spec 001/002/003 screenshots** (`app/screenshots/*.png`), and the **old academy family/student screenshots** (families list, add-family form, family details hub, students list, student details, monthly progress report) — the last group is **product/UX reference ONLY, never a visual copy**.
3. Apply the failure conditions (A4). Any single failure = not accepted; fix and re-capture.
4. Record verdicts in `app/screenshots/REVIEW.md` (A6).

## A4. Failure conditions (any one = FAIL)

- Looks like a **generic CRM**.
- Looks like a **plain spreadsheet only**.
- Missing the **family↔student relationship** (no grouped children / no real family link).
- Missing the **family profile** experience.
- Missing the **student academic profile** experience.
- Missing the **add-family wizard**.
- Missing **search/filters** (or weak/dead filters).
- Missing the **result/evaluation decision** (no Results progress+certificates, no Evaluation rubric).
- Missing the **timetable-linkage decision** (no `scheduleAgenda` reuse / no "View in schedule" deep-link).
- The **Dashboard Impact Review is missing** (or a new stat wall / fake-unbacked finance widget was added).
- **Dead links / dead actions** (any control not navigating, opening an overlay, filtering, switching a tab-or-step, demoing with a toast, or disabled-with-reason).
- **Copied legacy visuals/assets/colors/classes/logo/icons/wording.**
- **Raw i18n keys** visible.
- **Poor dark mode.**
- **Broken RTL or LTR** (mirrored numbers/dates/progress, or a broken stepper/tab in either direction).
- Page is **JS-rendered whole page** instead of static HTML-first (a card/tab/step/drawer built at runtime).
- **Cannot deploy** to GitHub Pages (absolute paths / external requests).
- **Hard to convert** to a Django template.
- Does **not visibly reflect** the inspected reference idea (a real academy platform, cleaner/calmer/more premium).
- **More than one nav category panel** shown at once (shell regression).

## A5. Automated checks that accompany (not replace) the review

- **a11y**: axe critical = 0 (and serious = 0) on each Spec 004 page (AR light + ≥1 dark + ≥1 EN sampled); status/attention never color-only.
- **no-dead-button / no-raw-i18n-key / no-external-request**: smoke over `families`/`family`/`add-family`/`student`/`students`/`dashboard` (no-external-request also proves no chart/table/form/calendar/grade library loads).
- **HTML-structure**: static shell + baked family cards (with build-baked grouped children) + a profile `role="tablist"` with **exactly one** visible `tabpanel` + a baked `[data-wizard]` with **all five** steps (`data-step-next`/`data-step-prev`, exactly one visible) + baked `<template data-preview>`s (incl. the shared `appointmentTemplate`) + **no `id="app"`**; relative asset paths.
- **NI12 nav**: `families`/`addFamily` are real `<a>` with routes; `familyCategories`/`groups`/`scheduleSearch`/`studentResult`/`studentEvaluation` stay Soon buttons; `family.html`/`student.html` keep exactly one `is-active[aria-current]` on families/students; no portal in the DOM; no dead nav link.
- **tabs/wizard/drawer smoke**: profile tab switch (click + keyboard) persists across `#view`; the wizard advances/retreats on Next/Back with exactly one visible step and Save toasts; the drawer opens with its required fields (incl. family context).
- **keyboard**: scripted tab-through reaches cards, tabs, the stepper, and controls with visible focus.

## A6. REVIEW.md verdict format

Append a **dated section** to `app/screenshots/REVIEW.md` with a verdict table, then the two trailer lines:

```
## Spec 004 — Families & Student Academic Profiles — <YYYY-MM-DD>

| # | Scenario | File | Verdict |
|---|---|---|---|
| 1 | Families directory (AR/light/desktop) | families__ar__light__desktop.png | ✅ PASS — <reason> |
| … | … | … | … |

Failure conditions: none triggered.
Automated (accompanying): build clean · smoke PASS · axe critical=0/serious=0 · 0 console errors.
```

Every row uses `✅ PASS — <reason>`; any FAIL names the triggered A4 condition and **blocks acceptance** until re-captured.

## A7. Output & naming

`app/screenshots/{page}__{lang}__{theme}__{viewport}[__{variant}].png` (e.g. `student__ar__light__desktop__evaluation.png`, `add-family__ar__light__desktop__wizard-step3.png`), with verdicts appended to `app/screenshots/REVIEW.md` per A6.
