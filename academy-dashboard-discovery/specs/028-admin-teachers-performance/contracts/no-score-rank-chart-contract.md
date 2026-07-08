# Contract — No Score / Rank / Chart (Spec 028)
**MUST**: 028 adds no computed score/rank/percentile/leaderboard and no chart/graph/`<canvas>`. Teacher-performance stays authored-count + labeled-signal display-only; teachers keep fixed fixture order; the unused `rating` field is never surfaced; no computed teacher rating.
**Acceptance**
- `grep score|rank|percentile|leaderboard|<canvas>|chart` on the teacher-performance board body = none (new/derived).
- No sort-by-performance ordering; no numeric rating rendered anywhere on teacher surfaces.
- Legacy feedback percentages are NOT reproduced (→029, and only authored if ever built).
- **Fail** on any computed ranking/score/chart or a surfaced `rating`.
