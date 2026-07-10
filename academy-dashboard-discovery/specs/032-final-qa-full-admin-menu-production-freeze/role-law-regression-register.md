# Role-Law Regression Register — Spec 032 (freeze)

Every standing role-law verified GREEN against the built `public/` output (103 HTML), tied to its enforcing assertion in `tests/smoke/run.cjs` by file:line. Spec 032 must re-pin every one at freeze and keep the regexes **byte-verbatim**. Adding form fields must introduce no new pay/credential/file/figure token.

| # | Role law | Enforcing assert (run.cjs) | Mechanism | Verdict |
|---|---|---|---|---|
| 1 | Teacher pay-free — 16 teacher-portal surfaces | `payHit` def+assert `:1483-1485`; `tchPay` `:1403-1404` (TEACHER_INTERNAL def `:31`) | `/\b(salary\|salaries\|payouts?\|earnings?\|compensation)\b/i` + AR set on `#page-body` | **GREEN** (0 hits) |
| 2 | Teacher pay-free — admin teacher boards (teachers/teacher/teacher-performance) | `PAY28` def `:665`, asserts `:677/:711/:725`; board `forbidden` `:751-760` | body-scoped pay regex; the 6 raw hits in teacher-performance are the sidebar locked-wallet nav (OUTSIDE `#page-body`) | **GREEN** |
| 3 | Family zero-pay — home + family-child | `payFigure` `:1438-1439` / `:1462-1463` | word-bounded `/ريال\|\bSAR\b\|جنيه\|\bEGP\b\|[$€£]\|pay now\|payment\|\bamount\b\|\bprice\b\|مبلغ\|سعر\|رسوم/i` | **GREEN** |
| 4 | Family zero-pay — 7 family internal (incl. billing) | `famPay` `:1372-1373` (FAMILY_INTERNAL def `:29`) | same word-bounded regex on `#page-body` (`\bSAR\b` excludes "**Sar**a") | **GREEN** |
| 5 | Student child-view (no primary-role wording) | assert `:1361-1362` (STUDENT_INTERNAL def `:27`) | `!/لوحة الطالب\|بوابة الطالب\|student dashboard/i` | **GREEN** (14 surfaces, 0) |
| 6 | Finance no-fake-money (Spec 030) | `forbidden` `:944`→`:988`; receipt/file `:939`→`:982`; **no-mutation snapshot `:990-1005`**; tiles=row-counts `:954-959`; figure-free `:1037`→`:1048`; secret/file `:1040-1041`→`:1050` | no chart/canvas/score; no receipt/`type=file`; salaries/banks FIGURE-FREE; Record-payment confirm leaves chips byte-identical | **GREEN** |
| 7 | Settings/staff/library/certificates no-fake (Spec 031) | block `:1064-1129`: pw/file inputs `:1073-1074`→`:1091`; canvas/drag `:1075/1079`→`:1092`; credInputs `:1070-1071`→`:1093`; noPdf `:1078`→`:1094`; figure-free `:1080`→`:1095` | 0 `type=password`/`type=file` INPUTS, 0 canvas, 0 credential-named inputs, figure-free | **GREEN** |
| 8 | Admin finance Spec-009 invariant (dashboard/reports body finance-free; 6 wallets locked) | enHit/arHit `:1137-1138`→`:1156-1157`; wallet-locked `:1147-1151`→`:1161`; money-widget guard `:1142-1143`→`:1165-1167` | body finance-token-free; 6 wallet nav items disabled+aria+lock | **GREEN** |
| 9 | Zero `href="#"` sitewide | deadNav `:96-98`→`:131`; finance `:938`→`:981`; reports `:818`→`:836` | anchors need real route; planned = non-anchor buttons | **GREEN** (103 HTML, 0) |

## Freeze obligations (the forms fix must preserve these)
- No rebuilt teacher/staff form renders a salary/pay/hour-rate field (MUST-OMIT) → laws 1/2 hold.
- No rebuilt family/student/billing form renders a pay figure → laws 3/4 hold.
- No rebuilt form renders `type=password`/`type=file`/credential input, no `<canvas>`, no `.pdf`/`blob:` → laws 6/7 hold.
- Student surfaces gain no primary-role wording → law 5 holds.
- The new form fields live in existing pages' drawers/modals; the protected regexes stay byte-verbatim; any smoke change is additive.

## Notes (carry to freeze)
- **Keep the Spec-031 file-guard DOM-input-scoped** (`fileInputs: q('input[type="file"]')`, `:1074`). Do NOT tighten to a raw-HTML `type="file"` regex — `library.html` legitimately carries `data-type="file"` (media-type facet), which a raw regex would false-positive.
- **Stale citation** (doc-only): `024/correction-status.md:20` cites the teacher-performance pay-free assert at `run.cjs:548-561`; current location is `:718-725` + `:750-760`. Re-cite at freeze; no functional impact.

**All 9 role-laws GREEN. Nothing to fix — the forms work must not regress them.**
