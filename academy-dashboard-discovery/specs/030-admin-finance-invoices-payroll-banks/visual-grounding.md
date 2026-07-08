# Spec 030 — Visual Grounding (Targeted Visual Grounding Gate)

**Method**: read-only 3-agent audit (covering the recommended 11-agent split) + direct source reads, each
citing exact evidence paths. No app files modified. Baseline: HEAD `4be3e87`; Spec 029 in the working tree
(implemented, awaiting watcher commit); public HTML = 97 (re-verified).

**Rule honored**: not from memory; legacy = capability/workflow coverage, not a pixel/behavior clone; no
invented accounting pages; no fake finance calculations; no reproduced charts.

---

## 1. Exact legacy finance / accounting pages & screenshots opened

- `output/combined/page-inventory.md` (13-19 accounting hub + transaction ledgers; 34-35 analysis-expenses/
  invoices; 37-38 banks/create-bank; 78-86 downlaod/expense; 128-139 invoices+variants; 168-172 payout-
  providers/payouts; 181-182 salaries/salary-class-report; 219 staff-salaries; 831-834 monthly-invoices)
- `output/combined/table-inventory.md` (11-19 accounting/transaction/invoices+salary; 31-69 session ledgers;
  81-84 analysis-expenses P&L; 86-89 analysis-invoices; 91-94 banks; 376-414 downlaod; 416-419 expense;
  726-814 invoices variants; 831-834 monthly-invoices; 991-994 payout-providers; 1036-1039 salaries)
- `output/combined/form-inventory.md` (1346-1354 banks/create; 1241-1307 analysis; 5497-5618 downlaod/expense;
  9724-9776 create-parent-invoice; 10834-10891 invoices New-Transaction; 11081-11116 monthly-invoices;
  11845-11940 payout-providers edit; 11988-12043 payouts approve; 12521-12599 salaries/salary-class-report;
  13764-13903 payment-gateway settings; 14276-14295 staff-salaries; 16040-16079 teacher-edit salary/payout)
- `output/combined/{interaction,modal,route-graph,skipped-actions,button-coverage}.md`
- `frontend-planning-deep/02-all-pages-expanded-inventory.md` (accounting 3973-3982; invoices 1912-1947;
  downlaod 1808-1911; expense 3994-4004; analysis-expenses 3984-3992; analysis-invoices 1797-1806;
  payout-providers 4006-4022; salary transactions 1714-1796)
- `output/roles/admin/role-map.md`; `output/roles/admin/text/management-{accounting,invoices,downlaod,expense,
  salaries,staff-salaries,salary-class-report,banks,payouts,payout-providers,analysis-expenses}*.txt`
- Raw HTML (chart confirmation): `output/roles/admin/html/raw/management-accounting.html` (ApexCharts Net
  Income), `management-analysis-expenses.html` (Chart.js ×3 canvases), `management-analysis-invoices.html`
  (Chart.js ×2)
- Screenshots opened: `management-accounting-{001,002,full}.png`, `management-accounting-transaction-{invoices,
  salary,session}-*.png` (+session status attend/student-absent/teacher-absent), `management-analysis-
  {expenses,invoices}-*.png`, `management-banks-{001,full}.png`, `management-banks-create-{001,full}.png`

## 2. Exact legacy invoices / payments evidence opened

- `invoices` (+ date/date_type/status Paid/Unpaid/SoftDelete variants) — `page-inventory.md:128-139`;
  `table-inventory.md:726-814`; New-Transaction modal `modal-inventory.md:628-696`; create-parent-invoice
  `form-inventory.md:9724-9776` (serial/due_date/price/discount/fees/additional/adjustment/paymentMethod/
  sendMessage); record-payment `editUserForm` → `/accountant/store-transaction`
- `downlaod` — `table-inventory.md:376-414` (mirror of invoices; filter GETs to `/invoices`; **no real
  download control found**); `route-graph.md:80-87,130-147` (bidirectional links)
- `monthly-invoices` — `table-inventory.md:831-834` (Parent/Status)
- `expense` (+ `heads` lookup) — `table-inventory.md:416-419`; create/edit forms `form-inventory.md:5556-5618`

## 3. Exact legacy salaries / payroll evidence opened

- `salaries` — `table-inventory.md:1036-1039` (Teacher/Cash Number/Fixed/plus/minus/Fine/Gift/Hour Rate/Total/
  Total EUR/Salary Type/Status/Actions); `form-inventory.md:12521-12545` (`generateteacher` + `bulk-payouts`);
  `management-salaries.txt` ("Generate Salary", "Request payouts (0)")
- `staff-salaries` — `page-inventory.md:219`; `form-inventory.md:14276-14295` (`generatestaff`);
  `management-staff-salaries.txt` ("Generate Salary")
- `salary-class-report` — `form-inventory.md:12562-12595` (date_range / Group By Student-Date-Parent /
  teacher_id → GET `/update-result`); computed group-by-sum
- `analysis-expenses` — `table-inventory.md:81-84` (P&L: Revenue/Net Profit/Teachers+Staff Salaries/Expenses);
  `management-analysis-expenses.txt` ("Staff Salaries: EUR 9,333.00" etc.); Chart.js
- teacher-edit salary+payout fieldset — `form-inventory.md:16040-16079`; teacher-detail Compensations —
  `management-teachers-1-compensations-1.txt` (Fine Amount 1,000.00)

## 4. Exact legacy banks / payouts evidence opened

- `banks` — `table-inventory.md:91-94` (Bank Name/Settings); `banks/create` — `form-inventory.md:1346-1354`
  (**`name` only, no credentials**)
- `payouts` (+`?all=1`) — `table-inventory.md` payouts (Teacher/Amount/Method/Status/Month/Requested at);
  `form-inventory.md:11988-12043` (`bulk-approve-form` → `/payouts/approve`)
- `payout-providers` (+`/6/edit`,`/7/edit`) — `table-inventory.md:991-994` (Method/Mode/Active/**Webhook URL**);
  `form-inventory.md:11845-11940` (`mode/is_active/key1/key2/key3/key4 type=password`; "Username/Login", "API
  password/Key", "Program ID"); `management-payout-providers*.txt`
- payment-gateway settings — `form-inventory.md:13764-13903` (Paypal/Stripe/XPay/mollie/Payoneer creds)

## 5. Exact legacy finance analytics evidence opened

- `analysis-expenses` (Chart.js ×3: currentMonthChart/expectedMonthlyChart/actualMonthlyChart) —
  `management-analysis-expenses.html:2599,2650,2660,3158`
- `analysis-invoices` (Chart.js ×2: monthlyChart/cumulativeChart) — `management-analysis-invoices.html:2624,
  2633,3003`
- accounting hub (ApexCharts Net Income) — `management-accounting.html:1379,3246`

## 6. Exact current finance files / modules opened

- `app/src/js/pages/finance.js` (invoice tiles/list/payments/planned + baked invoice drawers)
- `app/src/js/components/finance-actions.js` (Create-invoice/Export = disabled-reason; Print = demo-toast;
  Record-payment/Mark-paid/Send-reminder = confirm→demo; Send-invoice = disabled)
- `app/src/js/components/finance-status.js` (invoice-status paid/unpaid/overdue/cancelled + payment-status
  recorded/pending/returned chips)
- `app/src/js/fixtures/finance.js` (INVOICES ×9 + PAYMENTS ×6 authored SAR literals; `FINANCE_SUMMARY` =
  row-count roll-ups via `.filter().length`/`Set.size` — no money arithmetic, grep-confirmed; `PLANNED_FINANCE`
  ×9 figure-free cards)
- `app/src/locales/{ar,en}.fin.js` (`fin.*` keys: status/method/act/reason/tile/sec/drawer)
- `app/public/finance.html` / `finance.en.html`
- `app/tests/smoke/run.cjs` finance block (~907-1017): 4 tiles, 9 invoice rows, 6 payment rows, 9 drawers,
  9 planned cards, `forbidden` regex (chart/canvas/graph/score/rank/leaderboard/percentile), no-mutation-on-
  confirm, no-receipt/type=file, six-wallet-locked + finance-sub-section-membership

## 7. Exact admin menu finance items opened

- `app/src/js/nav.config.js:76-92` — finance sub-section: `finance` (implemented, `finance.html`) + `invoices`,
  `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport`, `banks` (all `disabled`,
  `reasonKey:'nav.reason.finance'`)
- `specs/029-…/admin-menu-coverage-inventory.md:62-69` — all 8 finance items → owner **030**

## 8. Evidence gaps

- **Empty-tenant capture**: every legacy finance table rendered "No data found" (zero real invoice/expense/
  session rows at crawl time). Column headers + modal-level actions are evidenced; **per-row action icons
  (edit/delete/mark-paid) are NOT evidenced** → 030 must not assume a specific row-kebab; represent via drawer
  + gates.
- **`downlaod`**: no real download control found (mirrors invoices) → export is an honest gate only.
- **salary-class-report**: table renders via a separate `/update-result` GET, not captured with data → 030
  represents it figure-free display-only or as a gate, never a working engine.
- **Payout-provider secrets**: legacy shows real webhook URLs + API-key/password fields → NEVER reproduced.

## 9. What must be fixed / handled in 030 (grounded)

1. **Deepen finance.html** (invoice list/detail already exist) — supersede the Spec-009 byte-frozen invariant
   via a declared amendment; keep permanent guarantees.
2. **Invoices / monthly-invoices / payments** — display-only rows + read-only drawers + real static filters;
   Create/Mark-paid/Record-payment/Send/Export → gates (amount literals allowed, no aggregate).
3. **Salaries / staff-salaries / class-salary-report / payouts** — STATUS-FIRST, FIGURE-FREE boards (name +
   status, NO amount); Generate/Approve/Pay/Export → gates; class-report figure-free or gate (no group-by/sum).
4. **Banks** — display-only name/status rows; Add/Edit → modal; Import/Reconcile → gates; no credentials.
5. **Accounting / analysis (P&L / Net Income / analysis-expenses/invoices)** — NOT reproduced as figure boards
   or charts; status-first summaries (counts) or planned gates; zero charts.
6. **Export/print honesty pass** — reclassify finance Print demo-toast → gate (like Spec 029 R-G); all export/
   download/PDF/CSV → gates.
7. **Payout providers / payment gateway** — future-backend/excluded; no secret/credential/API-key input; no
   fake integration status.
8. **Finance menu coverage** — flip the 030-owned disabled items to implemented (page/fold) or keep honest
   future-backend gates; nav guard intact; no dead placeholder.
9. **Role laws** — teacher pay-free, family zero-pay, student child-view, Spec 026/027/028/029 all green.
