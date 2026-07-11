# Contract — Finance-Free Reports (GLOBAL, all 037 tabs)

Binding on every panel Spec 037 adds to `reports.html` (overview / monthly / analysis) — the reports
body stays finance-free FOREVER (Spec-009 invariant, re-affirmed by `monthly-reports-scope.md` and
`spec.md`'s Grounding verdict).

## Forbidden tokens (0 in any reports body — copy AND rendered output, all 3 tabs)
Reuse the EXISTING reports forbidden-token regex (`tests/smoke/run.cjs` approx. line 855):
`salary` · `payroll` · `payout` · `invoice` · `revenue` · `accounting` · `compensation` · `chart` ·
`canvas` · `graph` · `leaderboard` · `percentile` · `score` · `scored` · `rank` · `ranked` ·
`ranking` (+ the Arabic mirror: الرواتب/الراتب/المدفوعات/الفواتير/الإيرادات/المحاسبة/الرسم
البياني/لوحة الصدارة/لوحة المتصدرين/الترتيب/النسبة المئوية/تقييم رقمي).

**Extend** the token set for Spec 037's new panels with: `money` · `currency` · `payment` · any
currency symbol/figure (ج.م / EGP / $ / ريال) · any computed finance total.

## Allowed (non-finance)
- Authored area/subject/month labels, COUNT literals (sessions/attendance/outcome/insight counts).
- Categorical status/signal/trend chips (`healthy` / `needsFollowUp` / `improving` / `steady` /
  `declining`) — labels, never derived math.
- Authored notes; `backendRequired` final gates (Export/PDF/Send/Run-analysis).

## Explicitly excluded (owned elsewhere)
- Finance-flavoured "analysis" — `analysis-expenses`, `analysis-invoices`, `monthly-invoices`,
  `salary-class-report` — is OUT of Spec 037's `dataAnalysis` tab scope entirely; owned by Spec 038.
  The `analysis` tab covers ONLY non-finance insight areas (attendance / sessions / coursesGroups /
  teachers / studentsFamilies).
- `finance.html` body is not touched by Spec 037 (Spec-009/030 invariant untouched).

## Surface proof
- Monthly tab (`#mr-grid`): month + area label + authored count + status chip. 0 money token.
- Analysis tab (`#da-grid`): area/subject + authored count + trend/status chip. 0 money token, 0
  computed derivation.
- Overview tab: existing `reports.js` body, unchanged — already finance-free since Spec 008/029.

## Enforcement (smoke)
- The existing reports `forbidden` grep (line 855/884) re-runs and must stay `false` for the
  default/active tab; because `tabs()` hides inactive panels with the `hidden` attribute,
  `body.innerText` alone will NOT reach hidden-panel text — **the smoke check MUST additionally
  switch to (or directly query the DOM `innerHTML` of) each of the 3 tabpanels**
  (`#tabpanel-reports-overview`, `-monthly`, `-analysis`) so the forbidden-token grep genuinely
  covers all three panels, not just whichever tab is active on load.
- Grep list + expected result: each of the 3 panels' `innerHTML` against the extended forbidden
  regex above → **0 matches**, all 3 panels, both languages.
- Re-pin byte-verbatim: `payHit`/teacher-pay guards, `famPay`/`payFigure`, the child-view guard, the
  finance 9-planned/figure-free assertions, and every Spec 026-036 reports/finance assert.
- Any money/finance token found in a Spec-037-touched reports panel = STOP.
