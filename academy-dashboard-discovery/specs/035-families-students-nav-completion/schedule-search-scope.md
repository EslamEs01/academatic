# Schedule Search — Scope (Spec 035)

**Item:** `scheduleSearch` / بحث الجدول
**Decision:** **Standalone page** `schedule-search.html` + `schedule-search.en.html`. **Count impact = +2.**

## Why a standalone page (not a fold)
The legacy "Search Schedule" (`/management/search-schedule`) is a **distinct availability/slot-finder tool** — "Search for an available & specific time among the teacher's timetable" — separate from the ordinary calendar browse ("Teachers Schedule" → `/management/all/teachers/timetable`). The new app's `schedule.html` is that ordinary browse (filter over List/Timetable, schedule.js:45-77). A query-by-time-window availability matcher reads honestly as its own page. Spec 033 recommended standalone; page-count-envelope named `schedule-search` as a new pair.

**Legacy evidence:** `output/roles/admin/pages/management-search-schedule.md:39` (H6 "Search Schedule Teacher Timezone"), `:72-91` (form fields), `:123` (KPI text), `:177` (distinct "Teachers Schedule" browse). Screenshot `management-search-schedule-full.png`.

## Main sections
1. **Page header** — title/subtitle + optional summary strip (authored counts, e.g. teachers scanned / slots found — literals, not computed).
2. **Search form** — a real filter/criteria form (see Filters).
3. **Results board/table** — display-only list of matching authored candidates (teacher + subject/category + day/time window + an availability status chip). No score/figure.
4. **Empty state** — the shared `noResults()` / `emptyBox` for "no matches" and the initial "enter criteria" state.
5. **Detail drawer (optional, if grounded)** — a candidate's slot detail as a read-only `template[data-preview]` sheet, reusing the appointment/preview pattern.

## Filters (grounded in the legacy form)
- **Time window** — From / To (HH:MM) selects (legacy `from`/`to` + hour/minute).
- **Day / date range** — day-of-week or date control.
- **Teacher** selector (name only — NO pay/rate).
- **Course / group / category** selector (legacy `category_selected[]`).
- **Availability toggle** (legacy `filter_by_available`) + **Courses toggle** (legacy `filter_by_courses`) as display chips/checkboxes.
- **Search** text box.
- Mechanism = the existing `filterBar` `targetId` + `data-facet` client-side narrowing over authored fixture rows (an established, honest display-filtering pattern — NOT a backend query).

## Allowed authored data
- A new display-only fixture (e.g. `fixtures/schedule-search.js`) of candidate teacher/slot rows: teacher name key, subject/category, day + start/end, availability status. Authored — no PII, no pay, no computed metric.
- Availability chips are **authored labels** (available / partially / booked), never derived.

## Final gated actions
- **Book / Assign / Add-to-schedule** = a single `data-disabled-reason` (`backendRequired`) final per result (or one page-level final). No slot is marked booked; no schedule row is added; no assignment persists.
- Any **Export** = `disabled` gate (no `.pdf`/`window.open`/`blob:`).

## Forbidden behavior
- ❌ real availability engine / real matching backend / API / websocket
- ❌ fake booking / fake schedule mutation / fake assignment / row mutation after "book"
- ❌ external dependency (`package.json` 0-diff); no new global `data-*` hook / storage key
- ❌ pay/rate/salary figure on any teacher row (teacher pay-free law)
- ❌ `<canvas>` / chart / computed score / `type=file` / `type=password` / credential

## Locale
- New keys under a mirrored `ar/en` module (e.g. `ssr.*` or an existing families locale module) — AR + EN parity, 0 divergence, 0 raw keys.

## Smoke / a11y / screenshot scope
- **Smoke:** `schedule-search.html` + `.en` load; page has a search form + a results container + empty state; the Book/Assign final is `data-disabled-reason`/`aria-disabled` (no fake success); `filter_by_available`-style facet narrows the visible rows client-side; **0 external request** on load + interaction; `FAKE` guard byte-verbatim; no pay/`type=file`/`type=password`/`<canvas>` token; nav `scheduleSearch` = implemented + route; route-freeze 115.
- **A11y:** `schedule-search` AR + EN, light/dark, mobile-390, and an open detail drawer (if built) → critical=0 serious=0.
- **Screenshots:** AR + EN frames (light/dark/mobile-390) of the search form + a results state + empty state.
