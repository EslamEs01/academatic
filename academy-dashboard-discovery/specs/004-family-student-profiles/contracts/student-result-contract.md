# Contract: Student Results Tab (fixture-only)

**Status**: Binding · The **Results** tab inside `student.html` — fixture-only per-course **progress** (hand-rolled visuals) + a **certificates** list + a **level/term summary**. Rendered by `result-summary.js` from data-model *StudentResultSummary*. **No gradebook, no marks/terms engine, no real grade computation** — display only. Hosted by `student-profile-contract.md` (§9).

## 1. Purpose & honest scope (no grade engine)

The reference academy has **no academic grade system** (an explicit gap, R26); achievement surfaced there as **progress + certificates**, not marks. This tab honors that honestly: it presents fixture progress and certificates calmly and **MUST read as demo/fixture data, never as a live gradebook**. It MUST NOT invent a subjects×terms marks table, a GPA, an exam engine, or any computed score. It improves on the legacy's cramped duplicate tables with one airy, scannable summary.

## 2. Data source (binding)

The tab MUST render **only** from `Student.results` (data-model *StudentResultSummary*) — no second source, no engine:

- `levelKey` / `termKey` — the level/term the summary describes.
- `overallProgress` — number 0–100 (overall, hand-rolled).
- `courses` — `{ courseTitleKey, progress (0–100) }[]` — per-course progress.
- `certificates` — `{ titleKey, dateKey, statusId }[]` — the certificates list.

All strings are i18n keys resolved at build time; numbers format per locale and are **never mirrored**.

## 3. Anatomy (RTL, top → bottom)

1. **Level / term summary** (§4) — the heading line: `levelKey` + `termKey` + the overall progress visual.
2. **Per-course progress** (§5) — a calm list/grid, one row per `courses[]` entry.
3. **Certificates** (§6) — the certificates list, or its empty state.
4. **Actions** (§7) — export / print, demo or disabled-with-reason.

The whole tab is baked static HTML inside the Results `role="tabpanel"`; runtime JS renders nothing here.

## 4. Level / term summary

A small `statMini`-style summary header: the `levelKey` and `termKey` labels + an **overall progress** visual for `overallProgress`. It MUST be a labeled summary (e.g. "Level 2 · Spring term · 72%"), not a numeric score badge, and never color-only.

## 5. Per-course progress visuals (binding — hand-rolled)

- Each `courses[]` entry MUST render the course `courseTitleKey` + its `progress` as a **hand-rolled** progress **bar or ring** (the existing Spec 001 R9 SVG/CSS visual — **no chart/progress library**).
- Progress MUST be conveyed by **both** the visual fill **and** a textual percent (and/or label) — **never color-only** (a11y). Long course titles wrap/truncate gracefully in AR-RTL and EN-LTR; the bar/ring mirrors via logical properties; the numeral stays LTR.
- This is display-only — there is no per-course recompute, no editable mark, no "submit grade".

## 6. Certificates list

- Each `certificates[]` entry MUST render the certificate `titleKey`, its `dateKey`, and a `statusId` chip (e.g. issued / pending) as **icon + label, never color-only**. A "view"/"download" affordance, if present, is **demo-with-toast** or **disabled-with-reason** (no real file/PDF backend) — never a dead link.
- **Empty state**: when `certificates` is empty, a calm "no certificates yet" state (warm, not a bare "No data") — distinct from a filter no-result.

## 7. Actions — demo / disabled-with-reason (binding)

Any result action — **export**, **print**, **download certificate**, "request certificate" — MUST be **demo-with-toast** (`data-demo-action` → clearly-labeled toast) or **disabled-with-reason** (`data-disabled-reason` / `data-reason-key`). **No real export/print/persistence.** No dead control (IP8/IP9).

## 8. States, responsive, a11y

- **Empty**: a student with no results shows a single calm "no results yet" state for the whole tab; per-section empties (no certificates) as above — never a blank region.
- **Responsive**: per-course progress and certificates stack to single column on mobile; no horizontal overflow.
- **A11y**: progress and status are icon/label/text + visual (never color-only); any action is keyboard operable with visible focus; ≥44px targets; axe critical = 0. Light/Dark/System via tokens.

## 9. `data-*` hooks (exact, no invention)

The tab itself is the `data-tabpanel="results"` panel (owned by `student-profile-contract.md` §5/§15). Inside it: `data-demo-action` + `data-toast` (export/print/download demo), `data-disabled-reason`/`data-reason-key` (gated real ops). The progress bars/rings and certificate rows are static markup with **no behavioral hook**. **No invented hooks; no JS-generated ids/classes; no `data-*` filter/table machinery** (this tab is not filterable).

## 10. Reused / cross-references

Reuses the Spec 001 hand-rolled progress visual (R9), `statMini`, `chip`, `states`, `ui`, and the toast/disabled-with-reason behaviors. New shared piece: `result-summary.js`. Binds to: `student-profile-contract.md` (the hosting Results tab), `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP8/IP9/IP10), and `static-html-django-ready-contract.md` (SSG/Django rules). Distinct from `student-evaluation-contract.md` (the Evaluation tab — a rubric, not progress).

## 11. Django mapping & enforcement

- **Django**: the Results panel → a static section / `{% if view == "results" %}` inside `student.html`; `{% for course in student.results.courses %}` for the progress rows (the bar/ring fill emitted as an inline `style="--pct:{{ course.progress }}"` / class, **never JS-computed**); `{% for cert in student.results.certificates %}` for the certificates; the certificate `statusId` → a status template tag; export/print → the same `data-demo-action`/`data-disabled-reason` attributes server-side. Fixtures → view context. No whole-page `#app` mount; relative paths; zero external requests.
- **Enforcement**: the smoke harness (R31) asserts (via the `student.html#view=results` frame) that the Results panel is baked static HTML with per-course progress visuals carrying a **baked** fill (a `--pct`/class present in source, not added by JS) **and** a textual percent (never color-only), a certificates list with icon+label status, that export/print/download are demo or disabled-with-reason (no dead control, IP8), that there is a calm empty state, that there are **no raw i18n keys** and **zero external requests** (also proving no chart/progress library loads). Screenshot acceptance captures the Results tab AR-RTL light (`__results` variant via `#view=results`).
