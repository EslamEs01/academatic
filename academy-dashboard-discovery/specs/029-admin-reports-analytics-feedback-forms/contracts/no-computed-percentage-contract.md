# Contract — No Computed Percentage

**Guarantee**: legacy feedback Percentage / completion-rate KPIs are NOT reproduced as computed values.
- Feedback shows categorical remark pills (excellent/good/sometimes/rarely) + status; NO %, NO score, NO rank, NO percentile.
- Any percentage that must appear = an authored fixture literal, clearly not derived at runtime.
**Verify**: smoke greps 029 bodies for computed-`%`/percentile/leaderboard (authored literals excepted) = 0; source has no `* 100`/ratio helper for display.
**Fail if**: a computed percentage/score/rank appears on any 029 body.
