# No-Fake Teacher Actions Register (Spec 036)

Every write across the four scoped surfaces ends at an honest gate; no teacher/category/KPI value is created, computed, or persisted.

| # | Forbidden | Where it could appear | Required honest treatment | Acceptance check |
|---|---|---|---|---|
| NF-01 | Fake teacher creation | `trn-add` Save | keep the existing `formDrawer` backendRequired gate; INERT fields | smoke: `trn-add` gate present; no directory row added |
| NF-02 | Fake teacher category create/save | `trn-categories` Create/Save | keep `common.backendRequiredNote` gate; INERT fields; authored list | smoke: `trn-categories` create form + gate present; no list mutation |
| NF-03 | Fake category assign | `trn-categories` assign-members | keep `trn.cat.assignReason` gate | smoke: assign is `aria-disabled` |
| NF-04 | Fake sessions-KPI calculation | sessionsKpi tab | display authored counts/labels only; no arithmetic ranking | grep: no computed score/rank/%/rating; `<canvas>`=0 |
| NF-05 | Fake monthly-performance calculation | monthlyPerf tab | display authored month rows + categorical trend/status; no computed total | grep: no computed score/rank/total/chart |
| NF-06 | Computed score / rank / rating / chart / canvas | either new tab | none — counts + categorical labels + hand-rolled chips only | smoke: 0 `<canvas>`; no ranking/score token newly introduced |
| NF-07 | Fake export / PDF | either tab | none (or a `disabled` gate); no `.pdf`/`window.open`/`blob:` | grep: 0 pdf/window.open/blob in new bodies |
| NF-08 | Row/status mutation | all four | no DOM mutation implying persistence on any final | smoke: post-click state unchanged |
| NF-09 | Backend / API / websocket / external request / dependency | tabs + folds | client-side facet over authored fixtures only; `package.json` 0-diff | smoke: 0 external request on load + interaction |
| NF-10 | Fake success wording | all four | Spec-026 wording («يُتاح بعد ربط الخادم» / "available once the server is connected"); never «تم/حُفظ/(تجريبي)» / "saved/done" | smoke `FAKE` guard byte-verbatim |
| NF-11 | Pay/salary/rate/fine/payout figure | all four | none — see `teacher-pay-free-register.md` | pay grep byte-verbatim |
| NF-12 | type=file / type=password / credential | trn-add / tabs | none (CV = gate; reset-password = gate) | grep: 0 type=file/type=password in teacher bodies |

## Standing pattern reuse (no new hook / storage key / engine)
- Fold anchors reuse the existing `data-drawer`→`template[data-preview]` drawers + `data-disabled-reason` gates.
- The two new tabs reuse the existing `tabs()` widget + `#view=` hash + `filterBar`/`data-facet` client-side narrowing over authored fixtures.
- No new `data-*` hook, no storage key, no analytics/scoring engine.
