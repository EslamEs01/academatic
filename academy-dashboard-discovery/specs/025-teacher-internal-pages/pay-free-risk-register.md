# Pay-Free Risk Register — Spec 025 Teacher Internal Pages

**Date**: 2026-07-07. Teacher-owned pages are PAY-FREE GLOBALLY (binding law, Spec 016 contract). This register enumerates the excluded pay surfaces, the risk points where pay could leak, and the three-layer enforcement. Absolute — no exceptions.

## Forbidden token set (source · locales · comments · built output)

`salary · salaries · pay · payout · earnings · compensation · bonus · fine · fines · money · currency · راتب · رواتب · أجر · أتعاب · مستحقات · مكافأة · غرامة · فلوس · جنيه · ريال · دولار · EGP · SAR · USD · $ · € · £`

## Excluded legacy pay surfaces (NEVER rendered)

| T# | Surface | Legacy content | Disposition |
|---|---|---|---|
| T2 | home salary hero | 997.00 EGP + Estimated/Fines/Bonus badges + "(3.00 Fine)" cell | intentionally-excluded-by-law |
| T17 | /teacher/salary | 13-col ledger (Fixed/Fine/Gift/Hour Rate/Total, EGP) | intentionally-excluded-by-law; admin-finance-only (Spec 030) if ever |
| T18 | /teacher/salary-class-report | pay report filter → update-result | intentionally-excluded-by-law |
| T19 | /teacher/update-result | 23-col per-student pay matrix (EGP) | intentionally-excluded-by-law (the OUTCOME concept survives in teacher-outcomes; the PAY columns do not) |

## Risk points (per page) + mitigation

| Page | Pay-leak risk | Mitigation |
|---|---|---|
| teacher-schedule | legacy timetable colored sessions «Active & unpaid» | drop the tint; status chips are academic only (now/next/done) |
| teacher-students | legacy roster adjacent to pay report | roster is course/group + learning signal only; no pay column |
| teacher-outcomes | derived from update-result (a pay matrix) | render ONLY the classes-end academic fields (attendance·remark·summary·homework·files); NO price/paid/total columns |
| teacher-tasks | tickets shell had a computed "Average" + fine concepts | tasks are academic prep/follow-up only; no fine/average |
| **teacher-reports** | **highest risk** — legacy "reports" adjacency to salary-class-report; the word "reports" | academic-only: session completion · progress · rubric dims; NO finance section; the three-layer scan is mandatory here |
| teacher-profile | legacy profile adjacent to salary/compensations tabs | identity/subjects/availability/prefs only; NO comp/salary tab |
| teacher-library | low | materials only |
| **nav / anchor** | the teacher-home → teacher-performance anchor lands in the ADMIN shell (finance nav one click away) | FR-009 repoints the anchor to teacher-reports (teacher-owned, pay-free); the admin-board link is demoted admin-only; the Spec 024 B-07 exemption is updated (the tension is closed, not just documented) |

## Three-layer enforcement (mandatory, re-run every build)

1. **Source grep (incl. comments)** over all teacher-owned source: the 7 new `teacher-*.js`, the teacher slices of `fixtures/portal.js`, the `prt.nav.tch.*`/`prt.tch.*`/`prt.title.tch.*` locale keys (ar+en) → **0 hits** on the forbidden set.
2. **Built grep** over all 8 teacher-portal-family built pages (teacher-portal + the 7 new, × 2 langs) → **0 hits**.
3. **Smoke `payHit`** over the rendered `#page-body` of every teacher-portal-family page (both langs) → **false**; the `payHit` regex stays BYTE-VERBATIM (never weakened). Plus the admin-side guard on `teacher-performance` body stays.

## Related laws (also enforced)

- **No computed score/rank/percentile/chart** — teacher-reports rubric = dimension lines only; no answer scales, no chart engine, no "Average" column.
- **No fake actions** — live-room/save/submit/upload/download/complete/export/contact are backendRequired gates.
- **Family zero-pay / student wording** unaffected — teacher pages introduce no family payment token, no student-primary wording.

## Acceptance

- All three layers green after build; `payHit` byte-verbatim; the anchor repoint verified (teacher home → teacher-reports, not the admin shell); no computed score/chart on teacher-reports. Any single hit = STOP condition.
