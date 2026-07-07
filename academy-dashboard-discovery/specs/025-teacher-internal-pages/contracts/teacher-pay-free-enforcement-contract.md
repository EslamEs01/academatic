# Contract: Teacher Pay-Free Enforcement (three layers)

**Purpose**: teacher-owned pages stay PAY-FREE GLOBALLY. Absolute. Any hit = STOP.

## Forbidden token set
`salary · salaries · pay · payout · earnings · compensation · bonus · fine · fines · money · currency · راتب · رواتب · أجر · أتعاب · مستحقات · مكافأة · غرامة · فلوس · جنيه · ريال · دولار · EGP · SAR · USD · $ · € · £`

## Three layers (re-run every build)
1. **Source grep (incl. comments)** over: the 7 `teacher-*.js`, the teacher slices of `fixtures/portal.js`, the `prt.title.tch*` + `prt.tch.*` locale keys (ar+en) → **0 hits**.
2. **Built grep** over: teacher-portal + the 7 pages, ×2 langs → **0 hits**.
3. **Smoke `payHit`** over the rendered `#page-body` of all 8 teacher-portal-family pages (both langs) → **false**; `payHit` regex BYTE-VERBATIM (never weakened). The admin-side `teacher-performance` body guard stays.

## Excluded pay surfaces (never rendered)
T2 salary hero · T17 /salary ledger · T18 salary-class-report · T19 update-result pay matrix. The outcome CONCEPT survives (teacher-outcomes) without pay columns.

## Related
- No computed score/rank/percentile/chart (esp. teacher-reports).
- The anchor repoint (teacher-home → teacher-reports) removes the admin-finance-shell adjacency; the Spec 024 B-07 exemption note is updated to "closed".

## Acceptance
- All three layers green; `payHit` byte-verbatim; anchor repointed; no computed score/chart. Any single hit = STOP.
