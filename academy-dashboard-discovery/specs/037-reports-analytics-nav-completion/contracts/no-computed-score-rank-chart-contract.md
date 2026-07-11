# Contract — No Computed Score / Rank / Chart

The hardest boundary in Spec 037. Binding on all five new/changed surfaces: `reports.html#view=
monthly`, `#view=analysis`, `families.html#view=categories`, `students.html#view=results`,
`students.html#view=evaluation` (and any component touched by the fold).

## Forbidden (must be absent from new/changed bodies)
- Computed **score / rank / GPA / percentage-as-metric / percentile / rubric-total / average**
  (as a derived value, not an authored literal).
- **Cross-student or cross-row aggregation** of any kind (sum, mean, roll-up across boards).
- **Sort-by-score** or any ranking derived from a numeric comparison.
- **Derived trend arithmetic** presented as a claim — e.g. "+12% vs last month", "top 3", "avg N" —
  even when every underlying number is an authored literal.
- `<canvas>`, ApexCharts (or any charting/plotting library), sparkline-as-metric, any
  graph/plot rendering.
- `getContext('2d'|'webgl')` or any drawing-surface call.

## Allowed
- **Authored literal counts** — `MONTHLY_REPORTS[].count`, `DATA_INSIGHTS[].count`,
  `FAMILY_CATEGORIES[].count`, `results.certificates.length` — display, never derived at runtime
  from other displayed numbers.
- **Categorical status/trend chips** (icon + label, never color-only, never a number standing in
  for a score): `healthy`/`needsFollowUp`; `improving`/`steady`/`declining`; `onTrack`/`watch`/
  `atRisk`; `approved`/`pending`. These are hand-assigned fixture labels, not code-computed.
- **Existing authored per-row fields displayed 1:1** — no new transformation applied.
- The **single-student drill-down** (`student.html#view=results`/`#view=evaluation`) keeps its
  pre-existing authored `overallProgress%` display and rubric rating pills UNCHANGED — Spec 037
  introduces no new computed metric there or anywhere else in the chain (see the parallel
  no-fake-student-family-corrections-contract SF-03).

## Distinction (binding)
The **cross-student BOARDS** (Results board, Evaluation board) are new in Spec 037 and MUST NOT
introduce any computed metric — they show authored counts + categorical chips only. The
**pre-existing single-student drill-down** is unchanged and out of scope for this restriction (its
`overallProgress%` and rating pills already existed pre-Spec-037 and are not touched).

## Exact smoke grep set (expected 0 in all new/changed bodies)
| Pattern | Scope |
|---|---|
| `<canvas` | `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en` |
| `getContext(` | same five bodies + any touched `.js` component |
| `apexcharts` / `ApexCharts` | same five bodies + `package.json` (dependency) |
| `chart` (as a class/id/import, case-insensitive, excluding pre-existing unrelated hits) | new tab/board markup + new fixture files |
| `rank` / `GPA` / `percentile` | new tab/board markup + new fixture files |
| `avg` / `average` (as a computed label) | new tab/board markup + new fixture files |
| a computed-percentage expression pattern (e.g. `Math.round(` paired with a `/`-division feeding a rendered `%`) | new tab/board rendering code paths only |

## Acceptance
- Grep: 0 hits for the above set across the five new/changed surfaces' bodies + new fixture/
  component files.
- Diff: `result-summary.js` / `evaluation-rubric.js` byte-identical to pre-Spec-037 (0 new computed
  field introduced upstream or downstream of the boards).
- Smoke: all pre-existing no-computed-score/no-chart guards (Spec 007/028/029/036) stay
  byte-verbatim; the two new report tabs and three corrective boards add 0 new violation.
