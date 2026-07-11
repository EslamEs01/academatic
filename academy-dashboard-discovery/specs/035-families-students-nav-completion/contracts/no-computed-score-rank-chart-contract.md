# Contract — No Computed Score / Rank / Chart

Binding across all four surfaces (esp. studentResult/studentEvaluation and schedule-search).

## Forbidden (must be absent from new/changed bodies)
- Computed **score**, **mark**, **grade**, **GPA**, **percentage rollup**, **rank**, **percentile**, **rubric total**, **average of ratings**.
- `<canvas>`, any charting/plotting element, drawn graph.
- Any arithmetic that derives a displayed academic number from other data.

## Allowed
- **Authored literal** figures (e.g. a fixture `progress: 72` rendered as a hand-rolled `progressBar`) — display, not derived.
- Categorical rating pills (excellent/good/sometimes/rarely) — labels, never summed.
- Authored KPI literals on schedule-search (`SS_KPIS`).

## Evidence basis
Crawl-wide grep across `output/roles/admin/text/` + `output/combined/*.md` returned **0** hits for `grade|gpa|score|exam|assessment|rubric|percentage|outcomes` — legacy had no computed academic figures. Reproducing any would be inventing data.

## Acceptance
- `result-summary.js` + `evaluation-rubric.js` byte-identical (no new arithmetic).
- Smoke grep: 0 `<canvas>` in new/changed bodies; no new score/rank/GPA/percentage/total token introduced by Spec 035; the existing no-computed-% / no-chart guards stay byte-verbatim.
