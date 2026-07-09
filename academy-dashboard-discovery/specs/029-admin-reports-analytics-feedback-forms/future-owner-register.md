# Spec 029 — Future Owner Register

Every out-of-scope report/analytics/feedback/forms/finance/settings/certificate action or page, with an
owner and rationale. Owners: **030** finance/invoices/payroll/banks · **031** management/content/certificates/
settings/materials · **032** final QA · **future-backend** · **intentionally-excluded**. Rule: 029 builds none
of these; each stays an honest `data-disabled-reason` / `data-coming-soon` / planned gate.

## → 030 (finance / invoices / payroll / banks)

| Item | Legacy/nav evidence | Rationale |
|---|---|---|
| Analysis — Expenses (P&L / net profit / teacher+staff salaries / EUR) | `table-inventory.md:81-84`; `02-…:3984-3992` | Money/payroll analytics; admin finance invariant |
| Analysis — Invoices (paid/due/overdue/discount, AED) | `table-inventory.md:86-89`; `02-…:1797-1806` | Invoice money analytics |
| Salary Class Report | `page-inventory.md:182`; `form-inventory.md:12571-12580` | Salary computation |
| Invoice download / accounting (`downlaod`) | `02-…:1808-1819` | Payment gateway + AED totals |
| Invoice export (`invoicesexportdata`) | `route-graph.md:424` | Finance export |
| nav finance sub-section: invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks | `nav.config.js:85-91` | Already disabled-with-reason; 030 builds the real pages |
| finance.html deepen | `nav.config.js:84` | Real billing backend = 030; 029 leaves it Spec-009-invariant |

## → 031 (management / content / certificates / settings / materials)

| Item | Legacy/nav evidence | Rationale |
|---|---|---|
| Certificate PDF designer + list | `page-inventory.md:173-174`; `table-inventory.md:1006-1009` | Certificates content domain |
| nav admin: staff, materials, books, certificates, certificateRequests | `nav.config.js:99-103` | Management/content pages |
| nav settings: settingsGeneral/Integrations/Customization/Notifications/Security/Users | `nav.config.js:110-115` | Settings domain |
| Settings ▸ data backup | `page-inventory.md:217` | Backup/integration |
| Settings ▸ WhatsApp insights (families/teachers) | `page-inventory.md:205-206` | Integration connectivity |

## → future-backend (needs a real engine)

| Item | Nav/legacy evidence | Rationale |
|---|---|---|
| messages | `nav.config.js:28` | Messaging engine |
| leads / new-requests (+ stats, download-report) | `nav.config.js:29`; `page-inventory.md:153-162` | CRM/leads engine |
| tasks | `nav.config.js:30` | Task engine |
| announcements | `nav.config.js:31` | Announcement engine |
| timeConverter | `nav.config.js:32` | Utility (no data) |
| scheduleSearch | `nav.config.js:46` | Availability-search engine |
| Real report/chart/export generation, feedback persistence, notification/chat/live-room | (whole-spec) | Any real backend/API/auth/engine |

## → 032 (final QA)

| Item | Evidence | Rationale |
|---|---|---|
| Stale `FUTURE_ROUTES.sessionsAnalysis` cleanup | `nav.config.js:140` | Harmless unused map entry; cleanup at final QA |
| Final no-missing sweep across admin menu | this register + coverage inventory | 032 re-verifies 029's coverage held |

## intentionally-excluded (binding role laws — never built)

| Item | Rationale |
|---|---|
| Teacher-portal own Salary / Salary-Class-Report | Teacher pay-free GLOBAL law (Spec 016/025/028) — the `teacher-*` pay grep must stay 0 |
| Teacher portal pay/finance/chat/live-room pages | Teacher portal laws |
| Family payment page / any family pay figure | Family zero-pay law |
| Student primary-role page («لوحة الطالب») | Student child-view law |
| Computed score/rank/percentile/chart anywhere | Standing law |

**Rule restated**: 029 implements only the reports/analytics/feedback/forms scope in `spec.md`. Every item
above stays an honest gate; smoke asserts each is non-dead and figure-free.
