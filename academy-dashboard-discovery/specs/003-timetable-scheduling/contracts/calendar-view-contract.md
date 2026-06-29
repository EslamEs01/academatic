# Contract: Calendar / Weekly Timetable Grid

**Status**: Binding · The hand-rolled weekly time-grid on the Schedule Timetable tab (and the shape the Sessions agenda derives from). **No calendar/chart/drag-drop library; baked at build, never runtime-drawn.**

## 1. No-library, baked rule (hard)

The grid MUST be **native HTML + CSS grid/flex only** — **no calendar library, no chart library, no drag-and-drop, no external dependency, zero CDN requests**. It MUST be **pre-rendered to complete static HTML at build time** by the SSG: every day column, time-axis row, and placed block is real markup in `public/schedule.html`. Runtime `enhance.js` MUST draw **nothing** and build no grid DOM — it only filters pre-rendered blocks, opens the drawer, and (on mobile) toggles the agenda day. This honors scope-guard "no calendar library" and `../../002-admin-core-operations/contracts/static-html-django-ready-contract.md` (SD1/SD2).

## 2. DOM structure

The grid root carries `data-timetable`. Structure (logical/source order, mirrored visually in RTL via logical properties):

1. A leading **time-axis column** of `data-slot` rows, each labeled with its time (§4).
2. One **day column per weekday**, **Sat-first** (§3), each headed by weekday name + date (+ today marker, §7).
3. **Blocks** placed inside the day columns by build-time grid-row span (§5).

It SHALL be a single CSS-grid container (axis column + 7 day columns as grid columns; slot rows as grid rows) so blocks place deterministically and mirror cleanly — **not** absolute pixel positioning.

## 3. Week ordering (Sat-first)

Day columns MUST be ordered **Saturday → Friday** (`sat,sun,mon,tue,wed,thu,fri`), matching the academy week and the reference. Ordering is fixed at build time; RTL/LTR change visual direction (§9) but never the logical Sat-first sequence.

## 4. Cropped working-hours axis + 30-min rows

- The time axis MUST be **cropped** to `floor(min start) … ceil(max end)` across the **visible fixture week** (with a small pad) — **never a full empty 24-hour axis** (the documented legacy weakness).
- Rows are fixed **30-minute** slots (`axis.stepMin = 30`). Each axis label is a `data-slot` cell showing its time (e.g. `08:00`).
- Axis labels are **time numerals** and MUST stay **LTR even in Arabic RTL** (§9).
- If the fixture week is empty, the axis falls back to a sensible default window and the empty-week state (§10) is shown.

## 5. Build-time block placement (grid-row span)

- Each block's row span MUST be **computed at build time** from its `start`/`end` against the cropped axis and baked onto the element as a custom property or class — e.g. `style="--row: 3 / 7"` (or an equivalent precomputed class). Hand-authored spans are forbidden; runtime JS MUST NOT compute layout.
- A block spans `((start − axisStart) / stepMin) + 1` to the analogous end row; back-to-back blocks share an edge cleanly without gaps.

## 6. Overlap handling (sub-columns)

When two or more blocks overlap within one day, that day column MUST split into side-by-side **sub-columns**, each block carrying a **build-time** `gridCol`/`--col` sub-index (CSS subgrid or nested flex). All overlapping blocks MUST stay readable (no block hidden behind another). An overlap MAY also carry the fixture `data-attention` indicator (§8 / `conflict`). Sub-column count is computed at build, never at runtime.

## 7. Status tones + today/now accent

- Each block MUST carry its status as a **subtle tint + inline-start accent** drawn from the single status map (live→teal, upcoming→sky, completed→success, cancelled→coral) — calm, not saturated, **never color-only** (the block also shows the status icon+label).
- Today's day column MUST carry a **quiet "today/now" accent** (a soft column tint / marker) from the build-time `isToday` flag — subtle, not a loud highlight. No real live "now" line (fixed fixture clock; presentational only).

## 8. Block content hierarchy + minimum readable size

- A block MUST show **course/teacher primary** (title + teacher) and **time/duration secondary**, plus the status icon+label; long Arabic/English titles, teacher names, and room labels truncate/wrap gracefully.
- Blocks MUST be **generous and readable** — a short session MUST still meet a sensible **minimum block height** (no tiny saturated rectangles, the legacy weakness); a dense day stays readable (scroll within the column / sensible min height), a single-session day is not stretched awkwardly.
- Each block carries `data-row` + its facets and a `data-drawer` trigger (opens the shared appointment drawer, `appointment-details-contract.md`), keyboard-operable.

## 9. RTL mirroring rules (times never mirrored)

- The grid MUST be **RTL-first**: day columns mirror via **logical properties** (inline-start/inline-end), so in Arabic the week reads start→end correctly and in English it mirrors back — without reordering the logical Sat-first sequence (§3).
- **Times, numbers, and dates are NEVER mirrored**: the time-axis numerals, in-block time ranges, and durations stay LTR/locale-correct in both directions. Chevrons/inline-start accents flip; numerals do not.
- Theme switch (Light/Dark/System) re-tones the grid/blocks instantly with no flash.

## 10. Empty-day / empty-week states

- A weekday column with no blocks MUST show a clear **empty-day** state ("no sessions scheduled") distinct from a filter **no-match** state — never a blank column.
- A week with no blocks (or none matching) MUST show an **empty-week** / no-results state with a reset action, not a bare grid. Loading shows a grid skeleton; error shows retry. (Reuses Spec 001 `states`.)

## 11. Mobile agenda fallback

Below the timetable breakpoint the weekly grid MUST be replaced by a **single-day agenda** (`data-agenda`): a day switcher (chips / prev-next) over a vertical list of `.sched-block`-style time blocks for the selected day, reusing the same blocks + the same `data-drawer` triggers. The same agenda powers the Sessions "Timetable/agenda" tab (today only). No horizontal-scroll grid on phones; no separate mobile fixture.

## 12. `data-*` hooks (exact, no invention)

`data-timetable` (grid root), `data-slot` (axis row), `data-teacher` (= `data-filter="teacher"` lens), `data-agenda` (mobile/today agenda), `data-attention` (fixture conflict/delay/cancelled indicator), per block `data-row` + `data-status|data-subject|data-teacher|data-day` + build-time `--row`/`--col`, and `data-drawer`/`data-preview`/`data-sheet-close` for details. No JS-generated ids/classes; all placement custom properties are build-baked.

## 13. Cross-references

Lives inside the Timetable tab of `timetable-page-contract.md` and is shown/hidden by `schedule-tabs-contract.md`; blocks open `appointment-details-contract.md`; the teacher lens is `teacher-timetable-contract.md`. Spec 002 `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP5 drawer, IP8 no-dead-button, IP10 a11y) and `../../002-admin-core-operations/contracts/static-html-django-ready-contract.md` (SD1/SD6) remain binding. Django: `{% for day in week.days %}{% for block in day.blocks %}` with each block's precomputed `--row`/`--col` baked into `style`/class.
