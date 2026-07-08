# Contract — Teacher Performance (Spec 028)
**MUST**: the `teacher-performance.html` board stays display-only (authored counts + labeled workload/follow-up/status signals + facet filters + real profile links); 028 adds NO computed metric; optional export = a `backendRequired`/029 gate.
**Acceptance**
- No computed score/rank/percentile/leaderboard; no `<canvas>`/chart; teachers keep fixed fixture order (no sort-by-performance).
- No pay/salary/payroll/compensation/payout figure on the board.
- The unused `rating` fixture field is never rendered.
- Export/print (if added) is an honest gate → 029; no fake file.
- **Fail** on any computed ranking/score/chart or pay figure introduced on the board.
