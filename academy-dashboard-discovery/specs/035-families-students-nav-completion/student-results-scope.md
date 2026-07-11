# Student Results — Scope (Spec 035)

**Item:** `studentResult` / نتائج الطلاب
**Decision:** **DEEP-LINK to the existing display-only Results tab** — no new page, no new board, no computed academic figure. **Count impact = 0.**

## Deep-link / tab / page decision

| Option | Verdict | Reason |
|---|---|---|
| Standalone `student-results.html` (the stale `FUTURE_ROUTES` entry) | **REJECTED** | An aggregate "all students results" page has no honest content — the project forbids computed score/rank/GPA/percentile/chart, so such a page would either be empty or invent metrics. |
| Folded admin board/tab on `students.html` | **REJECTED** | Would require per-student result columns; the only honest source is `Student.results`, already surfaced on the profile. Duplicating it invites computed aggregates. |
| **Deep-link `student.html#view=results`** | **CHOSEN** | The Results surface already exists, is display-only, and the tabs widget already honors `#view=` on load (tabs.js:4; enhance.js:265). Zero new page, zero new fake. |

**Evidence:**
- `student.js:233,242` — the profile tabs include `{ id: 'results', … }` → `panels.results = resultSummary(st.results)`.
- `components/result-summary.js:1-4` header — "FIXTURE ONLY: per-course progress (hand-rolled bars, no chart library) + certificates list + a level/term summary. NO gradebook, NO marks, NO computed score."
- `components/tabs.js:4` — "syncs the URL hash `#view=<id>` so deep-linking … work"; `enhance.js:261-269` — on load "URL hash (#view=) wins".
- The overview panel already exposes a `data-tab="results"` shortcut button (student.js:84), proving the Results tab is a first-class, reachable surface.

## Display sections (already present — Spec 035 adds NONE)
- Level / term summary line + an **authored** overall-progress bar (`r.overallProgress` literal, not computed).
- Per-course progress rows — authored `c.progress` literals rendered as hand-rolled `progressBar` (no chart lib).
- Certificates list — issued/pending status chips (icon + label).

## Allowed authored result data
- The existing `Student.results` fixture (per-course progress literals, certificate rows, level/term keys). No new fixture required for the deep-link.
- If any label is added, it is an authored string — never a derived number.

## Forbidden (hard)
- ❌ computed score / mark / grade
- ❌ computed rank / percentile / GPA / percentage rollup
- ❌ `<canvas>` / chart library / drawn graph
- ❌ fake publish / fake export / fake PDF / `window.open` / `blob:`
- ❌ fake save / row / status mutation
- ❌ backend / API

## Final gated actions (if any)
- The Results surface already gates its writes honestly and Spec 035 keeps them byte-identical: **Export = disabled-with-reason** (`res.exportReason`), **Print/View = "available once the server is connected"** demo toast (Spec-026 honest wording). Spec 035 introduces **no** new action here.

## Nav mechanism
- `nav.config.js`: `studentResult` `status:'planned'` → `status:'implemented'` with `route:'student.html#view=results'` (a real `<a href>` with a hash fragment; the build's dead-link guard is satisfied because the item now has a route). Remove the stale `FUTURE_ROUTES.studentResult` entry.
- Active-pill/`categoryOf` note (for the plan, not this spec): the item resolves to the **families** category; landing on `student.html` (a detail page, not itself a nav route) means no admin nav item claims `aria-current` — acceptable and consistent with how `student.html` is reached today from `students.html`.

## Smoke / a11y / screenshot scope
- **Smoke:** assert `studentResult` nav item is `implemented` with route `student.html#view=results` (a real anchor, not a «قريبًا» button); assert 0 «قريبًا» remains for this item; re-affirm `student.html` body has a `results` tabpanel and **no** computed-score token is newly introduced (the existing `payFigure`/no-chart guards stay byte-verbatim).
- **A11y:** covered by the existing `student.html` rows (the Results tab already ships); confirm the deep-linked tab opens with 0/0.
- **Screenshots:** one AR + one EN frame of `student.html#view=results` (light/dark), confirming the Results tab is the active surface via deep-link.
