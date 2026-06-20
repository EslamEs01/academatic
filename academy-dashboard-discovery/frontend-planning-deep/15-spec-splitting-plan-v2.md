# 15 — Spec‑Splitting Plan (v2)

> Confirms the v1 12‑spec split ([../frontend-planning/10-spec-splitting-plan.md](../frontend-planning/10-spec-splitting-plan.md)) with **verified page coverage** ([19](19-spec-coverage-map.md)) and the improvements from the exhaustive read. Still **many small specs**, one at a time — never one giant spec. Every one of the 339 pages + 66 modals maps to exactly one spec ([20](20-no-missing-items-audit.md)).

## Specs with verified coverage
| Spec | Title | Pages | Key components / new improvements |
|---|---|--:|---|
| **001** | Foundation + Design System + App Shell | 0 (cross‑cutting) | tokens, light/dark, RTL, shell, base components, status‑color map ([16](16-spec-001-brief-v2.md)) |
| **002** | Admin Shell + Dashboard + Reports/Analytics | 34 | DataTable (clickable sort headers), FilterBar+chips, Chart+geo map, permission‑aware render; status‑gated dashboard row actions |
| **003** | Admin: Students + Families + Leads | 49 | 8‑tab lazy detail, advanced finance filter→chips, Re‑activate on Inactive, Lead drawer+notes, NotificationMatrix |
| **004** | Admin: Teachers + Staff/RBAC + Courses + Materials/Library | 109 | collapse ~60 teacher variants→1 list; PermissionMatrix (confirm diff‑vs‑replace); course dual‑rate+free toggle+impact preview; LibraryGrid chips; fix `messages.Materials` i18n leak |
| **005** | Classes + Timetable + Attendance + Live Sessions | 16 | status‑gated SessionActionPanel + dual‑TZ; WeeklyCalendar w/ conflict warnings; schedule‑request wizard; real classroom UI decision |
| **006** | Forms/Assessments + Certificates + Tasks | 7 | FormBuilder; CertificateDesigner + approve‑with‑preview+send‑confirm; rename Tickets→Tasks w/ Create + empty state; **Exams gap flagged** |
| **007** | Finance (Invoices + Accounting + Expenses + Payroll + Payouts) | 56 | InvoiceBuilder (adjustments/instalments); generate‑salary; payout lifecycle (8 statuses); CurrencyAmount base‑equivalent; export UX; KeyValueRowsEditor (custom pay). *Splittable into 007a Invoices/Accounting + 007b Payroll/Payouts.* |
| **008** | Messages + Notifications + Broadcast + Chat | 2 | ChatPanel (realtime); BroadcastComposer w/ **Preview‑Recipients** + quota; notification matrix (in 011) |
| **009** | Teacher Portal | 26 | mobile‑first reuse; End/Absent(+video)/Request‑Cancel/Edit; 24‑field report drawer w/ autosave; consolidate duplicate history routes; build real profile view; remove `main/index.html` |
| **010** | Family/Student Portal | 13 | multi‑child switcher; Request‑Trial wizard; Feedback‑about‑teacher; Request‑Cancel (no‑replacement warning); Upload+**voice (MediaRecorder)**; build real profile view |
| **011** | Settings + Profile + RBAC polish + Error/Utility | 27 | tab‑per‑domain settings; Integrations catalog + wizards; NotificationMatrix (~47); Customisation→re‑themes app (closes loop w/ S001); CSV import; **all 5 error states** + 4 newly‑found 500s |
| **012** | Final QA + Responsive + Polish + Coverage Check | 0 | re‑run [20](20-no-missing-items-audit.md) audit against the build; AX/RTL/dark/responsive/perf passes; **no dead buttons** |

(Totals: 34+49+109+16+7+56+2+26+13+27 = 339 captured pages, all assigned.)

## For each spec (template — full detail in v1 [10](../frontend-planning/10-spec-splitting-plan.md))
scope · pages (from [19](19-spec-coverage-map.md)) · components ([10](10-component-inventory-v2.md)) · interactions ([11](11-interactions-states-v2.md)) · acceptance criteria · dependencies · **NOT in this spec**.

## Build‑order rationale (unchanged)
Foundation → admin shell → admin data (people → learning → finance → comms) → teacher → family → settings/account → QA. Admin first (richest, defines most components); teacher/family reuse the library; entities before dependents (Family/Student → Courses → Sessions → Finance).

## New cross‑cutting acceptance criteria (apply to every spec)
- Variant URLs collapsed to **stateful pages** (filter/sort/page in URL).
- **Clickable sort headers** + **row‑action menus** (no per‑row button clusters).
- **Lazy** detail tabs/modals (legacy pages 300–380 KB).
- Every list: skeleton + **"none yet" vs "no match"** empty + error state.
- Destructive actions: confirm dialog naming the entity; danger styling; never auto‑fire.
- Typed i18n (no `messages.*` leaks); Arabic RTL + dark verified.

## Coverage guarantee
[19](19-spec-coverage-map.md) maps every page (339/339, 0 unassigned) and every modal (66/66) to a spec; [20](20-no-missing-items-audit.md) verifies nothing is dropped. Spec **012** re‑audits against the shipped product.
