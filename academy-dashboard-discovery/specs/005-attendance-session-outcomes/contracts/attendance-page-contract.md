# Contract: Attendance & Session Outcomes Page

**Status**: Binding · `public/attendance.html` (+ `.en`).

The admin **daily session-outcomes board** — page header + breadcrumb, **outcome summary tiles that double as filters**, a persistent filter bar, an airy **`.outcome-row` list/card hybrid** (NOT a table/spreadsheet/numeric dump), and the full state set. Promotes the new `attendance` nav item (NI12). Active nav: `attendance` (`control` category, `activeId:'attendance'`). Realizes D1/D6, R32/R34/R38/R39, FR-001/FR-002/FR-004, US1/US2.

## 1. Purpose & reuse

- Give the admin one calm place to review which of today's/recent sessions were **attended**, which had a **student** or **teacher** absent, which were **cancelled** or **rescheduled**, and which **need follow-up** — at a glance, labeled, filterable.
- It MUST read as the same product as Spec 001–004 (warm canvas, violet `--g-violet`, `--r-card`, Tajawal) and MUST improve on the legacy "Classes Of {date}" board (a 23-column table + opaque numeric `status=1..8` URL codes + 3–6 inline pills per row).
- It MUST compose **existing** components only — `pageHeader` + `summaryCards`, `filterBar` (IP2), the `cardGrid`/`dataTable` row pattern, `chip`, `states` (`emptyBox`/`noResults`/`loadingSkeleton`/`errorState`), `attentionFlag`, `avatar`, `ui` (button/medallion) — plus the **NEW** `outcome-row.js` (R39), the **NEW** `outcome-status.js` map (R33, see `outcome-status-contract.md`), and the **NEW** canonical `outcome-details.js` drawer (R35, see `outcome-details-contract.md`).
- NO new runtime engine. Behavior is `enhance.js` over baked markup via `data-*` hooks only. The **ONLY new hook Spec 005 adds is `data-filter-set`** (R38) — every other behavior (filter, drawer, confirm, demo, disabled, toast) is reused as-is.

## 2. Label & navigation (NI12 promotion)

- This page **promotes** the `attendance` nav item `planned → implemented`:
  - set `status:'implemented'`, add `route:'attendance.html'`, add that route to `FUTURE_ROUTES` at promotion (exactly as `addFamily` in Spec 004), drop the «قريبًا/Soon» affordance.
  - register the SSG `PAGES` entry `{ base:'attendance', activeId:'attendance', titleKey, crumbKey, render: renderAttendance }` (ar + en).
- The `attendance` nav item MUST be a real `<a>` carrying the active violet pill + `aria-current="page"`; its category (`control`) panel opens on load via `categoryOf('attendance')`. The shell invariant holds: exactly one visible `.cat-panel`, one `is-active[aria-current]`, six category tabs.
- `sessionsAnalysis` and the rest of the `control` category (and every other planned item) MUST **stay `planned`** (Soon buttons, no route). The build-time guard (NI6) MUST pass; **no dead links; no portals/role dashboards rendered**.
- Wording (one each, no RTL-reversed text):
  - page **title** + header heading: «الحضور ونتائج الجلسات» / "Attendance & Session Outcomes".
  - **nav label** + breadcrumb leaf: «الحضور» / "Attendance".

## 3. Layout (RTL, top → bottom)

1. **Page header** — heading «الحضور ونتائج الجلسات» + breadcrumb (`الرئيسية · الحضور`) + subtitle. No persistence-implying CTA (no "+ add").
2. **Outcome summary tiles** (§4) — a `summaryCards`/tile row whose tiles **double as filters** (§5).
3. **Filter bar** (§5) — the persistent `filterBar` with the six facets (day/teacher/family/subject/outcome/attention) + apply/reset + active-filter feedback + result count.
4. **Outcome list/card hybrid** (§6) — the airy `.outcome-row` list (id `attendance-list`) over the `SESSION_OUTCOMES` fixture (≥12 rows), each baked at build time + carrying facet attrs.
5. **States region** (§8) — empty / no-results / loading / error.
6. **Baked drawers** — every row's `<template data-preview="<id>">` canonical outcome drawer lives on the page as real markup (§9).

Single calm column; the shell (rail + topbar) is unchanged. Reflows per §7.

## 4. Outcome summary tiles (tiles double as filters — R38)

- A row of at most **five** calm tiles, each icon + label + a tabular count derived from `OUTCOME_SUMMARY` (display-only, NOT a stat wall, NOT finance):
  - **مكتملة / Attended** → `data-filter-set="outcome:attended"`
  - **غياب طلاب / Student absent** → `data-filter-set="outcome:studentAbsent"`
  - **غياب معلمين / Teacher absent** → `data-filter-set="outcome:teacherAbsent"`
  - **ملغاة ومؤجلة / Cancelled & rescheduled** → `data-filter-set="outcome:cancelled"` (the rescheduled count is folded into this tile's copy)
  - **تحتاج متابعة / Needs follow-up** → `data-filter-set="attention:1"`
  - A leading **الكل/Total** count MAY appear (display-only, not a filter, or maps to a reset).
- Each tile MUST be a real `<button data-filter-set="<facet>:<value>" data-target="#attendance-list">`. Clicking a tile MUST set the matching `<select data-filter>` in the filter form and re-run the existing `applyFilter` — a **clickable status tile = a filter shortcut**, never a dead control, never a navigation, never a route-per-status wall.
- Tile tone/icon MUST resolve through the **same** `outcome-status` map (§10) so colors never drift; the label always accompanies the tone+icon (never color-only).

## 5. Filter bar (client-side over pre-rendered rows)

- Reuses `filterBar` / IP2: a **search** input + selects for **day**, **teacher**, **family**, **subject/course**, **outcome**, and **attention** (the fixture-backed facets) + **apply** + **reset**, surfacing **active-filter feedback** + a **result count** (`data-filter-count`, the `filter.count` copy "X of N").
- On apply/input/change, `enhance.js` MUST show/hide the **pre-rendered** `.outcome-row`s by their `data-day`/`data-teacher`/`data-family`/`data-subject`/`data-outcome`/`data-attention`/`data-search` facets, update the count, and surface the **no-results** state with a reset when nothing matches (§8).
- Filters MUST give visible feedback always — **never dead** (a weak/dead filter is a screenshot failure condition); **no hidden/collapsed filters** (improving the legacy collapsed-filter weakness).
- The **summary tiles** (§4) set the `outcome`/`attention` facet via the new `data-filter-set` hook over this **same** form — one filter engine, no second mechanism, no URL-per-status.
- Degrades gracefully: with JS off, all rows render and the controls are inert (all visible).

## 6. Outcome row anatomy (`outcome-row.js`, the hero — exact)

Each row is one `.outcome-row` (a flex list row that reflows to a card) carrying `data-row` + its facet attrs (built via `facetAttrs`), composed inline-start → inline-end:

- **Row container** — `data-row` + `data-outcome="<id>"` + `data-teacher="<id>"` + `data-family="<id>"` + `data-day="<dayId>"` + `data-subject="<subject>"` + (when flagged) `data-attention` + `data-search="<title+teacher+student tokens>"`. Ids/classes are build-baked, never JS-generated.
- **When** — the session **time + date** (tabular numerals, locale-formatted, never mirrored in RTL).
- **Session + course** — the session `titleKey` + the course/`subject` (subdued).
- **Teacher** — a `ui` avatar in the trainer `accent` + the teacher `nameKey` (a label; teachers-directory link optional, never dead).
- **Student / family link-chip** — the resolved `studentId`/`familyId` rendered as a **real `<a href>`** link-chip to `student.html` / `family.html` (language-aware) — a true navigation, not a `#` and not a hook.
- **Outcome chip (PRIMARY here)** — the **labeled outcome chip** from the `outcome-status` map (§10): icon + label, **never numeric or color-only**. This is the page's primary status; the scheduling status is NOT shown on the row (it lives in the drawer — R34).
- **Attention / follow-up flag** — when `followUp`/`attention` is present, a calm `attentionFlag` (icon + label, `data-attention`) — never color-only.
- **Row menu** — a kebab `data-row-menu="<id>"` whose "view" item opens the **canonical outcome drawer** (§9) for that row.

Long Arabic/English session, teacher, and student names MUST truncate/wrap gracefully in AR-RTL and EN-LTR. A group session shows ONE outcome + a `present/capacity` summary (session-level, not a per-student roster engine). An `upcoming`/`live` row shows no absence attribution and gates actions accordingly (§9).

## 7. Responsive

- Desktop/tablet show the airy multi-field `.outcome-row` list; below the row breakpoint each row MUST reflow to a **single-column card** (CSS source-order, the Spec 003 reflow pattern) with **no horizontal overflow**.
- Tiles wrap; the outcome chip, links, attention flag, and kebab stay reachable and legible; the drawer is **full-height** on mobile.
- No 23-column table, no horizontal scroll, no off-canvas content.

## 8. States

Using the Spec 001 `states` patterns the page MUST distinguish:

- **empty** "no sessions for this day yet" — a warm empty state (NOT a filter no-result).
- filter **no-results** "no match" — `data-no-results` + a reset action.
- **loading** — a skeleton of row placeholders (`loadingSkeleton`).
- **error** — a friendly `errorState` + retry.

The legacy bare "Loading…" / "No data" is explicitly improved; the empty vs no-results distinction is mandatory (an edge case in the spec).

## 9. Actions, drawer & no-dead-button (IP8/IP9)

- **Student/family link-chips** are real `<a href>` (the primary navigations off a row). **"View in schedule"** (in the drawer) deep-links to `schedule.html#view=timetable` (language-aware) — no dead link, no duplicated timetable engine.
- **Kebab `data-row-menu`** opens a popover whose "view" carries `data-drawer="<id>"` → the existing `openSheet` engine clones the baked `<template data-preview="<id>">` **canonical outcome drawer** (R35), the SAME drawer reused by the Sessions page (one canonical surface, no per-page modal duplication).
- The drawer's **status-gated** action cluster (mark attend / mark student-absent / mark teacher-absent / cancel / reschedule / notify / feedback / make-up-suggestion / reverse) is each exactly one of:
  - `data-demo-action` + `data-toast` (mark attend, notify, feedback, reverse) → a clearly-labeled **demo** toast;
  - `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`) → confirm modal → demo toast (**destructive**: cancel, reschedule, mark-absent);
  - `data-disabled-reason`/`data-reason-key` (any real-save / real-notify / **add-to-credit**) → disabled-with-reason.
  - Actions are shown only when sensible for the row's outcome (no "reverse" on `upcoming`). See `outcome-actions-contract.md`.
- **No item writes state; no persistence, no mutation, no notification, no reschedule, no credit.**
- Every control satisfies IP8: navigate in-scope / open overlay / apply-or-reset filter / set-filter / demo-with-toast / confirm→demo / disabled-with-reason. No raw i18n keys; outcome/attention never color-only; zero external requests.

## 10. Outcome status & chips (cross-reference)

The row outcome chip + the tile tone/icon resolve through the single labeled **OUTCOME** map (`outcome-status.js`, R33) — `attended · studentAbsent · teacherAbsent · cancelled · rescheduled · upcoming · live` + flags `makeUpSuggested · needsFollowUp`, rendered icon + label, never numeric/color-only, AA-contrast, AR/EN. That map is binding in `outcome-status-contract.md` and is DISTINCT from the Spec 001/003 session status map and the Spec 004 lifecycle map.

## 11. `data-*` hooks (exact — reuse only + the one new `data-filter-set`)

- Filtering: `data-filter-form`, `data-filter="day|teacher|family|subject|outcome|attention|search"`, `data-target="#attendance-list"`, `data-filter-apply|reset|count`, `data-no-results`.
- Rows: `data-row` + `data-outcome|data-teacher|data-family|data-day|data-subject|data-search` (+ `data-attention` when flagged).
- Drawer/menu: `data-row-menu="<id>"`, `data-drawer="<id>"` + the baked `<template data-preview="<id>">`, `data-sheet-close`.
- Actions: `data-demo-action`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`), `data-disabled-reason`/`data-reason-key`, `data-toast`.
- **NEW (the only new hook):** `data-filter-set="outcome:<id>"` / `data-filter-set="attention:1"` on the summary tiles (R38) — `enhance.js` parses `facet:value`, sets the matching `<select data-filter>`, and re-runs `applyFilter`.
- The student/family/schedule affordances are real `<a href>` (NOT hooks). **No JS-generated ids/classes; no invented hooks beyond `data-filter-set`.**

## 12. Static-HTML-first & Django mapping

- `attendance.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + header + tiles + filter bar + **every** `.outcome-row` + **every** `<template data-preview>` outcome drawer as real baked markup; **no whole-page `<div id="app">`**, no JS-built page DOM. Relative `./assets/` paths; per-language pages (`attendance.html` ar/rtl default + `attendance.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no chart/table/form/calendar library.
- Django mapping:
  - list → `{% for outcome in outcomes %}` (resolving `outcome.student` / `outcome.family`);
  - summary tiles → context counts (`OUTCOME_SUMMARY`) keeping the `data-filter-set` attrs server-side;
  - the outcome chip → the `outcome_chip` template tag/filter;
  - the drawer → `{% include "admin/_outcome_details.html" %}` (one partial, no per-page fork);
  - states → `{% if %}`; facets → the same `data-*` attributes.

## 13. Fixture binding (`SESSION_OUTCOMES`)

- All displayed rows MUST come from the new `fixtures/attendance.js` → `SESSION_OUTCOMES = { rows: [...] }` (**≥12 rows spanning every outcome state**: attended, studentAbsent, teacherAbsent, cancelled, rescheduled, upcoming, live).
- Each row reuses the existing session shape (titleKey/levelKey/subject/trainer{id,nameKey,accent}/roomKey/time/durationMin/dateKey/present/capacity) **plus** `outcomeId`, `statusId`, a real `studentId` → `STUDENTS` and `familyId` → `FAMILIES`, the `attribution` (`absentBy?`/`cancelBy?`), `makeup?`, `followUp?`, `rescheduleHint?`, `notesKey?`, `feedbackKey?`. Student/family → name/accent/href are resolved at **build time**.
- The summary tile + the dashboard signal counts derive from `OUTCOME_SUMMARY` (`total`/`attended`/`studentAbsent`/`teacherAbsent`/`cancelledOrRescheduled`/`needsFollowUp`) — derived, no engine. **No real backend, auth, persistence, or attendance/outcome/finance engine** (FR-013).

## 14. Edge cases (binding)

- **Empty vs no-results** — "no sessions for this day yet" (warm empty) is distinct from the filter "no match" (`data-no-results` + reset).
- **Mixed-state day** — a day containing attended + student-absent + teacher-absent + cancelled + rescheduled + upcoming renders all chips legibly with no color collision (icon + label carry meaning).
- **Group session** — attendance is a **session-level** outcome: one outcome + a `present/capacity` summary, never a per-student roster engine.
- **Upcoming/live** — no absence attribution; the action cluster gates accordingly (no "reverse" on an upcoming session).
- **Make-up/credit** — display-only hint; the real make-up/credit action is disabled-with-reason; never implies a real balance.
- **Long content** — long AR/EN session/teacher/student names truncate/wrap gracefully in both directions, in rows, tiles, and the drawer.
- **Theme/direction** — Light↔Dark↔System re-themes instantly (zero layout shift); AR↔EN navigates to the equivalent page; chips/times/dates never mirror incorrectly.
- **Mobile** — list/card reflow to single-column cards; tiles wrap; drawer full-height; no horizontal overflow.

## 15. Enforcement & cross-references

- **Smoke** (R43, `tests/smoke/run.cjs`): `attendance` is in `PAGES`; the **outcome summary tiles** are present and each is a clickable `[data-filter-set]` control (not a dead tile); **≥1 labeled outcome chip** (icon + label text, never bare color) renders; the rows are **filterable** (the filter form targets `#attendance-list`, the tile filter sets a facet); the **canonical outcome drawer opens** from a row with its outcome section; the **student/family links are real `<a href>`** and the schedule deep-link resolves; the `attendance` nav item is a real `<a>` with a route while `sessionsAnalysis` + the rest stay Soon; **no `id="app"`**; relative assets; no portals in DOM. The `no-external-request` check proves no table/chart/form/calendar lib loads.
- **axe**: critical violations = **0**; every surface keyboard-operable with visible focus.
- **Screenshots** (screenshot-acceptance): Attendance **AR-RTL light desktop**, **AR-RTL dark desktop**, **EN-LTR light desktop**, and **mobile** Attendance AR-RTL light — verdicts appended to `app/screenshots/REVIEW.md`.
- Binds to `outcome-status-contract.md` (the chip vocabulary), `outcome-details-contract.md` (the drawer), `outcome-actions-contract.md` (the action set), `sessions-integration-contract.md` (the shared drawer + deep-link), `navigation-impact-contract.md` (the NI12 promotion), `static-html-django-ready-contract.md`, `screenshot-acceptance.md`, and `scope-guard.md`. The Spec 002 `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP2/IP8/IP9) remains in force.
