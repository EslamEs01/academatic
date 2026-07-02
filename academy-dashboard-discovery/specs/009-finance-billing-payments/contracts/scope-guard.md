# Contract: Scope Guard (Spec 009)

**Status**: Binding · What Spec 009 must never become — and the path-aware reconciliation that lets the finance spec exist without breaking eight finance-forbidding predecessors. References FR-022; SC-002–SC-006; research D1, D4, D9.

## G1. Forbidden — product scope (no engine, no gateway, no payroll, no ledger)

A real **invoice engine** (creation, line-item totals, discount/fees/adjustment/instalment math) · a real **payment engine/collection/gateway** (no Paymob/Payoneer/Stripe/PayPal anything, no gateway state) · a real **accounting engine** (ledger, expenses write, FX/currency conversion, VAT/tax, P&L) · a real **payroll engine** (salary calculation, compensation workflow, payout lifecycle) · real **PDF/CSV generation**, real **send** (email/WhatsApp), real **scheduled reminders**, real **receipt upload**, real **mark-paid mutation**, any **persistence** · **runtime money arithmetic of any kind** (no `Sum`, balance, allocation, average, FX, overdue-from-date, or total derived from `hourRate`/sessions) · **revenue analytics/cashflow/financial reports** · **charts/canvas/graphs** · **subscription engine** · **portals** (family billing portal, teacher earnings) — NONE. Legacy action → treatment: Create invoice → disabled-with-reason · Record payment/Mark paid → confirm→demo toast · Download/Export → disabled-with-reason · Send invoice → disabled-with-reason · Send reminder → confirm→demo toast · Generate salary / Request payouts / FX edit / Add expense → absent (planned cards only) · Upload receipt → **absent entirely** (the reference had none).

## G2. Forbidden — technology

No payment/accounting/chart/table/form/calendar/analytics library, no SPA framework, no TypeScript, no CDN, no backend API/DB/auth.

## G3. Forbidden — architecture regressions

No whole-page `#app` mount; no runtime page-DOM construction; no new `data-*` hook; no `enhance.js` semantic change; no absolute/external asset path; no per-page CSS fork; no new chip tone.

## G4. Forbidden — legacy reuse

No copied legacy assets/classes/palette/logo/private wording; no numeric status codes or raw-code leaks (`messages.3`, "Active & unpaid"-style); no misspelled route homage (`/downlaod`); no 10–23-column table; no 3–6-inline-pill action rows.

## G5. Allowed in this spec

One new page pair + one born-and-promoted nav item; fixture-authored invoices/payments with labeled chips; row-count tiles (tiles-as-filters); the baked invoice drawer; the honest action matrix; nine figure-free planned/backendRequired cards; real source links to implemented pages; the `fin.*` overlay; the 1-line truthful reason-copy edit; minor app.css additions reusing existing tokens/tones.

## G6. Future-role surfaces stay out

The legacy family billing portal (`/student/billing`) and teacher earnings pages (`/teacher/salary*`) are never rendered; `future-role` nav entries stay never-rendered; the shell is admin-only.

## G6b. Identity

Spec 009 IS the "future finance spec" that Specs 004 (billing stub), 005 (add-to-credit), 007 (salary/payroll exclusion, incl. its G6b naming-collision note), and 008 (revenue card removal) each deferred to — as a **fixture-only shell**. The REAL billing/payroll/accounting engines remain future backend specs (the legacy planning's own 007a invoices/accounting + 007b payroll/payouts split is the anticipated shape).

## G7. Admin-frontend-only invariants

Fixtures only; no real permission enforcement (no `requiresPermission` gating added); every number fixture-authored; every action honest; every status labeled icon+text.

## G8. Path-aware vocabulary containment (the reconciliation rule)

Finance vocabulary (EN: invoice/payment/billing/salary/payroll/payout/revenue/accounting/gateway/FX… · AR: فاتورة/فواتير/مدفوعات/رواتب/محاسبة/بنوك…) may exist ONLY in:
- Spec 009's own new files: `src/js/pages/finance.js`, `src/js/fixtures/finance.js`, `src/js/components/finance-status.js`, `src/js/components/finance-actions.js`, `src/locales/ar.fin.js`, `src/locales/en.fin.js`;
- the three registration touch-points: `nav.config.js` (+1 item, +1 `FUTURE_ROUTES` line), `build-html.mjs` (+1 import, +1 PAGES entry), `i18n.js` (+2 imports, +2 merges);
- the 1-line `nav.reason.finance` copy edit in base `ar.js`/`en.js`;
- Spec 009's docs/contracts/tests (smoke block, MATRIX entries, REVIEW.md section).

**Sanctioned pre-existing touch-points** (predate Spec 009; MUST NOT be flagged, edited, or removed by this spec): the Spec 001 `kpis.js` `revenue` KPI + `kpi.revenue`/`unit.sar` labels · the Spec 004 family `plan`/`hourRate` stub + disabled Manage-billing (`fam.bill.*`) + `fam.attn.payment` · the Spec 005 `att.act.addToCredit` disabled action + `att.reason.finance` · the settings `billingAlerts` toggle (`set.reason.billing`) · the seven locked wallet nav items + their base-locale labels. Comment discipline: comments in new finance files MUST NOT contain other specs' forbidden tokens (`score/rank/chart/leaderboard`) and MUST NOT claim amounts are derived (the audits scan comments too).

## G8a. Concrete grep AUDIT (each MUST print `ok`)

```bash
cd academy-dashboard-discovery/app

# 1) NO-LEAK direction — finance tokens must NOT appear in the Spec 001–008 module file sets
grep -RniE 'invoice|فاتورة|فواتير|مدفوعات|payroll|payout|salary|accounting|محاسبة|gateway|billing' \
  src/js/pages/dashboard.js src/js/pages/reports.js src/js/fixtures/reports.js \
  src/js/components/report-card.js src/js/components/report-status.js src/js/components/report-actions.js \
  src/js/pages/family.js src/js/pages/families.js src/js/pages/student.js src/js/pages/students.js \
  src/js/pages/teacher.js src/js/pages/teachers.js src/js/pages/teacher-performance.js \
  src/js/pages/course.js src/js/pages/courses.js src/js/pages/group.js src/js/pages/groups.js \
  src/js/pages/attendance.js src/js/pages/sessions.js src/js/pages/schedule.js \
  src/js/fixtures/teachers.js src/js/fixtures/students.js src/js/fixtures/courses.js src/js/fixtures/groups.js \
  src/locales/ar.rep.js src/locales/en.rep.js src/locales/ar.trn.js src/locales/en.trn.js \
  | grep -viE 'fam\.bill|fam\.attn\.payment|fam\.tab\.billing|Plan & Billing|att\.reason\.finance|att\.act\.addToCredit|billingPanel|billingStep|billingAlerts|hourRate|No pay/finance|no pay figures|finance is out' \
  && echo FAIL || echo ok
#    (the exclusion list = the sanctioned PRE-EXISTING touch-points of Specs 004/005 — nothing Spec 009 adds may need it.
#     `fam.tab.billing` + the "Plan & Billing" header comment are Spec 004 lines in pages/family.js, unchanged by Spec 009 — verified via git diff.)

# 2) NO-ENGINE direction — no gateway/ledger/FX/tax machinery in the finance files
grep -RniE 'paymob|payoneer|stripe|paypal|ledger|vat|\btax\b|exchange.?rate|conversion|gateway' \
  src/js/pages/finance.js src/js/fixtures/finance.js src/js/components/finance-*.js src/locales/*.fin.js && echo FAIL || echo ok

# 3) NO-MONEY-ARITHMETIC — the only derived numbers are row counts
grep -RnE '\.reduce\(|\+=|Sum|total\s*=|amount\s*[*+/-]' \
  src/js/pages/finance.js src/js/fixtures/finance.js src/js/components/finance-*.js && echo FAIL || echo ok

# 4) NO-RECEIPT — the concept must not exist
grep -RniE 'receipt|إيصال|upload|attachment|proof' \
  src/js/pages/finance.js src/js/components/finance-*.js src/js/fixtures/finance.js src/locales/*.fin.js && echo FAIL || echo ok
grep -RnE 'type="file"' public/finance.html public/finance.en.html && echo FAIL || echo ok

# 5) NO-FORBIDDEN-STATUS ids
grep -RniE "id:\s*'(partial|draft|failed|refunded|authorized|captured|processing)'" \
  src/js/components/finance-status.js && echo FAIL || echo ok

# 6) page hygiene (finance pages)
grep -RnE 'id="app"' public/finance.html public/finance.en.html && echo FAIL || echo ok
grep -RnE 'https?://|cdn\.' public/finance.html public/finance.en.html | grep -v 'xmlns=' | grep -q . && echo FAIL || echo ok
#    (the inline SVG sprite's standard xmlns attribute is not an external request — smoke separately asserts zero external REQUESTS)
grep -RnE '⟦' public/finance.html public/finance.en.html && echo FAIL || echo ok
grep -c 'href="#"' public/finance.html public/finance.en.html | grep -v ':0' && echo FAIL || echo ok

# 7) PRIOR-GUARD re-run — Specs 001–008 scope-guard G8a blocks re-run verbatim and stay green
#    (esp. 008: its finance-token grep over reports files must still print nothing)
```
Built-page body checks for dashboard/reports are DOM-based in smoke (a file grep over `public/dashboard.html` would false-positive on the sidebar's legitimate «المالية» label) — see the impact contracts.

## G8b. One-line reviewer tests

- "Does any number on Finance derive from arithmetic (sum/FX/total/allocation) rather than an authored literal or a row count?" → MUST be **no**.
- "Does any action mutate a chip, produce a file, send anything, or persist anything?" → MUST be **no**.
- "Does the dashboard or reports **body** (excluding the sidebar) contain any new finance word, figure, or link?" → MUST be **no**.
- "Is there a receipt-upload affordance, a pay figure, a gateway name, or a chart anywhere?" → MUST be **no**.
- "Did any file from Specs 001–008's guarded sets change?" → MUST be **no** (git diff is the evidence).

## G9. Enforcement

Build: the nav guard + the finance fixture coherence guard both throw on violation. Smoke: the Spec 009 block (tiles=row counts · labeled chips · honest actions incl. cancelled-gating · drawer baked · no receipt token · no dead link) + the body-scoped dashboard/reports checks (finance-token regex vs `#page-body` clean · exactly one sidebar `a[href$="finance.html"]` · six wallet items still locked) + all carried IA/no-dead-button/raw-key/external-request assertions. Axe critical = 0. The screenshot matrix treats a money-KPI/gateway/payroll/receipt impression as hard FAIL. **Binds to** `finance-page-contract.md`, `finance-actions-contract.md`, `finance-status-contract.md`, `dashboard-impact-contract.md`, `reports-impact-contract.md`, `navigation-impact-contract.md`, and the Spec 008 `../../008-academic-reports-analytics/contracts/scope-guard.md` (which must remain green verbatim).

**Acceptance (binding):**
1. **Given** Finance, **When** audited, **Then** every displayed number is an authored literal or a row count — zero money arithmetic, zero FX, zero aggregate figure.
2. **Given** any finance action, **When** triggered, **Then** it yields drawer/demo/confirm-demo/disabled-reason/real-link only — nothing exports/sends/uploads/mutates/persists.
3. **Given** the G8a audit, **When** run, **Then** every command prints `ok` — both directions.
4. **Given** the Spec 001–008 scope-guard audits, **When** re-run after Spec 009 lands, **Then** all remain green (their file sets untouched by git diff).
5. **Given** the built dashboard/reports pages, **When** the body-scoped smoke checks run, **Then** their `#page-body` regions contain zero new finance chrome and the sidebar carries exactly one finance link.
