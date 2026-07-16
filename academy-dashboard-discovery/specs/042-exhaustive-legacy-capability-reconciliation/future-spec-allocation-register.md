# Spec 042 — Future-Spec Allocation Register (043–057)

**Status**: Spec 042 ownership artifact (documentation-only — zero application bytes change).
**Source**: the normalized disposition tables of all 15 cluster audits
(`cluster-audits/C01-audit.md` … `C15-audit.md`), read row by row.

## 1. The invariant (binding)

> **One primary owner per gap.** Every non-complete capability row is allocated to **exactly one** primary
> owning spec among 043–057. Secondary dependencies are recorded in a **separate column — never as
> co-owners**. `FUTURE_BACKEND` rows name the **nearest owning spec** and are marked **backend prerequisite**.
> Where two cluster rows describe the **same capability** with divergent audit owners, the register reconciles
> them to one owner and documents the resolution (§3) — a gap with two owners is a gap that ships.

## 2. Input census (from the 15 normalized tables)

**380** normalized capability rows total. **227 non-complete rows are allocated here**:

| Disposition | Rows |
|---|---|
| PARTIAL | 96 |
| MISSING | 58 |
| FUTURE_BACKEND | 40 |
| UNKNOWN_EVIDENCE | 28 |
| HONEST_LOCK | 5 |
| **Allocated total** | **227** |

**153 rows are NOT allocated** (they are complete or refused-by-law, not gaps): 17 COMPLETE_AND_VERIFIED ·
16 COMPLETE_BUT_VISUAL_REVIEW_REQUIRED (routed to their page group's review dimensions via
`page-review-ownership-map.md`, not counted as gaps) · 57 INTENTIONALLY_IMPROVED (**preservation list** — any
regression fails review) · 20 REJECTED_PRIVACY · 19 REJECTED_PAY_FREE · 13 REJECTED_SECURITY ·
11 REJECTED_NO_FAKE. 153 + 227 = 380 ✓.

Cluster legend: C01 Dashboard & Home · C02 Teachers · C03 Students · C04 Families/Guardians · C05 Courses &
Groups · C06 Sessions/Schedule/Attendance · C07 Finance/Payments/Invoices · C08 Reports & Analytics ·
C09 Settings · C10 Content/Materials/Certificates · C11 Messages/Notifications/Leads · C12 Staff/Profile/RBAC ·
C13 Exams/Assignments/Results · C14 General/Utilities · C15 Auth/Public/Shared Shell.

## 3. Owner-resolution rules applied (documented, not silent)

1. **Audit-recorded owners are kept verbatim** wherever they name a valid future spec (043–057).
2. **The "045-050" band** (27 rows) is resolved to a specific page group via the partition in
   `page-review-ownership-map.md` (e.g. teacher-surface rows → 045, dashboard/students rows → 047,
   reports/content rows → 049). C05-08's literal "045" was a pre-partition placeholder → resolved to 049
   (courses).
3. **Past-spec / non-spec / blank owners** are resolved to the nearest valid future owner, each noted in its
   row: `030`→046 · `029`→049 · `036`→045 · `034`→056 · `backend`/`future-backend`/`FUTURE_BACKEND`-as-owner →
   the nearest owning spec, marked backend prerequisite · `—`/`not stated` → resolved by host surface.
4. **Duplicate-capability reconciliations** (same gap in two clusters, divergent owners → ONE owner):
   - Board display-mode preference (`custemize-table`): **C01-05 + C06-28 → 044** (C06-28 from 056).
   - Session outcome/edit field sets: **C01-03 + C06-01 → 056**, **C01-04 + C06-02 → 056** (C06-01/02 from
     044; 044 stays secondary as the drawer/long-form host).
   - Teacher chat: **C02-15 + C11-11 → 051** (C11-11 from 055; 055 stays secondary).
   - Personal nav shortcuts: **C01-13 + C14-28 → 056** (C14-28 from 057; persistence = backend prerequisite).
   - Scheduled-trials board: **C11-29 + C14-04 → 056** (C14-04 from the past-spec ref "034").
   - Same-owner pairs kept and cross-noted: C01-16/C02-16/C15-14 (→045), C08-07/C11-27 (→050),
     C02-12/C10-16/C03-12 aspects (→055), C09-04/C11-16/C14-07 (→053).
5. **HONEST_LOCK rows** (all five are the one sanctioned lock, `classSalaryReport`) → **057** as
   lock-preservation verification. The *real* report is a backend billing/accounting prerequisite outside
   043–057; the lock itself must survive every review untouched — it stays the **sole** honest lock.

---

## 4. Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching (17 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-27 | Role isolation as an explicit invariant (legacy 3 redirect proofs; today routing convention only, no auth) | C01 | FUTURE_BACKEND | — | backend prerequisite |
| C02-04 | Per-teacher capabilities permission model (can_chat / can_see_library / can_edit_schedule / can_edit_class) | C02 | MISSING | 055 (capability gates alter cross-role surfaces) | — |
| C02-05 | Per-teacher notification matrix (4×2) | C02 | MISSING | 053 (delivery channels) | — |
| C02-06 | Left/Acquired students attribution tables (anti-poaching signal) | C02 | MISSING | — | — |
| C03-13 | Teacher→admin role isolation (legacy redirect proof; real enforcement requires backend auth) | C03 | FUTURE_BACKEND | — | backend prerequisite; hiding a link is NOT authorization |
| C04-22 | WhatsApp families insights board (null-group check) | C04 | MISSING | — | Spec 040 already excluded both WhatsApp-insights pages → 043; real corpus PII is never ported |
| C09-19 | RBAC enforcement (FO-16) | C09 | FUTURE_BACKEND | — | backend prerequisite |
| C12-01 | Per-member permission matrix editing UI (170 `permisions[]` checkboxes · 17 groups · Select/Clear All · search · live N/170 counter vs 22-row display-only drawer + Save gate) | C12 | PARTIAL | 044 (matrix drawer host) | — |
| C12-02 | RBAC enforcement (grants actually gating features; per-member vs named-role model decision) | C12 | FUTURE_BACKEND | — | backend prerequisite |
| C12-09 | Portal change-password (old/new/confirm; real `type=password` in legacy → honest gates today) | C12 | FUTURE_BACKEND | — | backend prerequisite; no-secret law (0 `type=password` authored) |
| C12-13 | PII-visibility grants (Show Parent Phone / Show Parent Email) — no successor concept gates guardian contact data | C12 | MISSING | — | — |
| C12-19 | Login-as / impersonation (zero evidence in all 9 C12 records; teacher-side gate recorded by Spec 028) | C12 | UNKNOWN_EVIDENCE | — | never guessed |
| C14-09 | DST "Affected Accounts" per-zone live aggregate | C14 | FUTURE_BACKEND | 050 (time-converter host) | backend prerequisite |
| C15-01 | Legacy login / register / password-reset / public marketing UI (never captured — crawler ran authenticated) | C15 | UNKNOWN_EVIDENCE | — | — |
| C15-02 | Real authentication + session lifecycle (3 role logins at shared /login, Laravel guards, remember-me + session cookies) | C15 | FUTURE_BACKEND | — | backend prerequisite |
| C15-03 | Login bot protection (legacy Google reCAPTCHA) | C15 | FUTURE_BACKEND | — | backend prerequisite |
| C15-18 | Role isolation & route authorization (currently presentational only) | C15 | FUTURE_BACKEND | — | backend prerequisite |

## 5. Spec 044 — Modal, Drawer & Long-Form Interaction System (24 rows)

044 additionally owns the **30 pre-existing `f-fbAdd` duplicate ids** (Spec-032 nested `fb-add` drawer lineage
— a standing carry-forward defect, present at baseline `21502af`, not a cluster table row).

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-05 | Board display-mode preference (`custemize-table`: Today/Upcoming/Past + group-by-time, persisted per user) | C01 | MISSING | 056 (preference capture) | one capability with C06-28 |
| C01-17 | D-B: sessions-table pager is a silent dead control (no handler, no honest gate) | C01 | PARTIAL | 047 (page host) | the one silent dead control found in C01 |
| C02-07 | Teacher end-class outcome capture (5 controls) | C02 | PARTIAL | 056 (field set) | — |
| C02-10 | Teacher edit-class (12 inputs, capability-gated) | C02 | MISSING | 043 (capability gate) · 056 | teacher-side surface (distinct from admin edit → C06-02) |
| C02-29 | teacher.html banner action-row overflow (14 buttons) | C02 | PARTIAL | 045 (page host) | — |
| C03-03 | Admin per-student session-lifecycle modal suite (~20 modals: Add Lesson · attended/absent · cancel · schedule-cancel-course · timetable) | C03 | PARTIAL | 056 (field sets) | — |
| C04-18 | Long-form host for the 32-control 4-section family create/edit (current fam-edit is a narrow single-column drawer) | C04 | PARTIAL | 056 (C04-16 field set) | — |
| C05-09 | Course lifecycle writes: copy/duplicate, change status, delete (gates never implemented) | C05 | MISSING | — | — |
| C05-13 | Bulk "Schedule Cancel on Date" (Auto Makeup / Reschedule / No Makeup + credit + note) | C05 | MISSING | 056 | — |
| C05-16 | Picker/drawer completeness: crs-enroll / grp-assign lack any selection control; grp-edit opens without current values | C05 | PARTIAL | — | — |
| C06-03 | Sessions row kebab depth (10 legacy items) + confirm on destructive Cancel | C06 | PARTIAL | — | — |
| C06-11 | Class-detail depth (event log · timeline audit log · queues panel · files panel) | C06 | PARTIAL | 055 (timeline backend) | cross-ref C01-09/C01-10/C01-11 |
| C06-28 | Display-mode table preference (`custemize-table`: timeType + groupByTime) | C06 | MISSING | — | reconciled 056→044 to match C01-05 (one gap, one owner) |
| C09-11 | formDrawer sticky action footer (Save below the fold on long Configure drawers) | C09 | PARTIAL | — | FO-23 |
| C09-12 | formDrawer `.wiz-grid` wrapping composite non-field blocks (structural smell) | C09 | PARTIAL | — | FO-23 |
| C10-08 | Library item detail sheet (`libShowModal` via View column) | C10 | MISSING | — | audit owner `044*` = normalization-assigned |
| C10-10 | Certificate designer WYSIWYG (~15 controls → 1; sanctioned by the Spec-031 gate contract) | C10 | PARTIAL | — | no canvas/drag/PDF is ever faked |
| C10-17 | Student-profile per-course certificates list (Certificate Details modal → Results tab) | C10 | PARTIAL | — | — |
| C11-02 | Open thread from list (inline pane hard-wired to MESSAGES[0]) | C11 | PARTIAL | 050 (page host) | — |
| C11-08 | Group settings offcanvas + Leave Group (destructive, no surface) | C11 | MISSING | 051 | — |
| C11-33 | Lead-new long-form-in-drawer UX (section keys exist, never rendered) | C11 | PARTIAL | 056 | — |
| C11-34 | Gated-primary visual affordance (`aria-disabled` reads as live) | C11 | PARTIAL | — | system-wide affordance rule |
| C12-18 | Policy rich-text long-form editor interaction | C12 | PARTIAL | — | interaction facet only; the authoring capability row is C09-17 (→ 056) |
| C15-16 | Popover `role=menu` keyboard pattern (no ArrowUp/Down/Home/End between menuitems) | C15 | PARTIAL | — | accessibility |

## 6. Spec 045 — Page review: teacher portal + teacher admin surfaces (8 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-16 | D-A: teacher quick-tiles falsely badge 7 implemented pages as «قريبًا» (escapes the planned/coming-soon census) | C01 | PARTIAL | — | band → 045; same defect as C02-16/C15-14 |
| C02-01 | Teacher directory sort/scope/pagination | C02 | PARTIAL | — | band → 045 |
| C02-14 | Teacher library browse search + category filter | C02 | PARTIAL | — | band → 045 |
| C02-16 | Teacher-portal quick tiles falsely stamped «قريبًا» | C02 | PARTIAL | — | band → 045; trio with C01-16/C15-14 |
| C02-34 | teacher-students page depth | C02 | PARTIAL | 056 (roster fields, C03-11) | band → 045 |
| C10-21 | Teacher library page (search + category affordance + content propagation) | C10 | PARTIAL | 055 (content propagation) | band* → 045 |
| C14-03 | Teacher Monthly Classes (legacy 500 — zero field-level evidence) | C14 | UNKNOWN_EVIDENCE | — | resolved from past-spec ref "036 (C02 evidence)"; re-evidence during teacher-performance review |
| C15-14 | Teacher-home quick-tiles: 7 stale baked «قريبًا» planned tiles for implemented pages (`teacher-portal.js:33-35` ignores `e.status`) | C15 | PARTIAL | — | band → 045 |

## 7. Spec 046 — Page review: family portal + family admin core (4 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C04-01 | Families directory board (7 status KPI tiles + 7 status lens routes + 12-column table vs 3 summary cards + hero cards) | C04 | PARTIAL | — | band → 046 |
| C04-06 | Family Billing & invoices tab (invoice list, Create Invoice, Deleted Invoices; persistence) | C04 | FUTURE_BACKEND | 048 (finance backend model) | **backend prerequisite**; resolved from past-spec ref "030"; never a fake invoice write |
| C04-19 | Family categories management (create/edit/assign; current Categories tab is a flat card grid with no per-row actions) | C04 | PARTIAL | 056 (category forms) | band → 046 |
| C07-21 | Family subscriptions list (per-child Subscription + History column) | C07 | PARTIAL | — | band → 046; family zero-pay — STATUS-FIRST, figure-free |

## 8. Spec 047 — Page review: student child-view + students & session-lifecycle ops (8 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-01 | KPI/status tile drill-down links (8 status-filtered board links → 0; cards/tiles inert) | C01 | PARTIAL | — | band → 047 (dashboard) |
| C01-06 | Excel export of the day board (legacy POST /management/export-aa) | C01 | MISSING | — | band → 047; real export execution = backend prerequisite — the surface stays an honest gate |
| C01-18 | D-C: "UI states" showcase band ships on the production admin home; the real sessions table has no genuine empty/error state | C01 | PARTIAL | — | band → 047 |
| C03-01 | Admin student directory (7 lifecycle KPI tiles · 8-column table · date-range filter · row kebab; timezone + age columns dropped) | C03 | PARTIAL | 056 (filter form) | band → 047 |
| C03-02 | Admin student detail hub (banner + notice chips · Courses/Siblings tabs · 3-button primary bar · action dropdown; overview thin today) | C03 | PARTIAL | 044 (action surfaces) | band → 047 |
| C03-06 | Admin student analytics (5 count tiles · 6 charts · world map) — no current-state comparison recorded in the audit | C03 | UNKNOWN_EVIDENCE | — | band → 047; charts/computed metrics stay banned — the review decides the lawful subset |
| C03-16 | Family child-view pages (home counters · All Account Subscriptions · today-sessions · per-child history filter · library) | C03 | PARTIAL | — | band → 047 |
| C10-22 | Student/child-view materials page (legacy search + category select) | C10 | PARTIAL | — | band* → 047 |

## 9. Spec 048 — Page review: admin back-office (settings/staff/finance) + scheduling ops (7 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C07-01 | Invoice list + status lenses (all/unpaid/paid/deleted) with date-range/date-type/currency/gateway facets | C07 | PARTIAL | 056 (facet forms) | band → 048 |
| C07-04 | Invoice PDF download / CSV export / print execution (legacy itself errored "Cannot download invoice") | C07 | FUTURE_BACKEND | — | **backend prerequisite**; no fake PDF/export, ever |
| C07-06 | Accounting dashboard (10 money aggregates + Net Income + 5 charts + month shortcuts) | C07 | FUTURE_BACKEND | — | **backend prerequisite**; no client-side computed aggregate |
| C07-07 | Multi-currency model (16 currencies + editable Currency-Rates modal) | C07 | FUTURE_BACKEND | — | **backend prerequisite** |
| C07-08 | Accounting transactions — invoices lens (11 money columns, family/date filter) | C07 | FUTURE_BACKEND | — | **backend prerequisite** |
| C07-14 | Teacher payout queue (6-status pipeline, bulk approve, amounts, month/year/status filter) | C07 | FUTURE_BACKEND | — | **backend prerequisite**; pay figures are never rendered — teacher pay-free GLOBAL and the zero-pay-figure law stand |
| C07-25 | Analysis — Invoices & Accounts money BI (6 aggregates + 2 charts + families dues table) | C07 | FUTURE_BACKEND | 049 (overlap C08-06) | **backend prerequisite** |

## 10. Spec 049 — Page review: reports, courses & groups, content catalog (7 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C05-08 | Cross-student enrollment ledger (7 saved working lists, 8 status filters, teacher/date/has-invoice filters, export) | C05 | MISSING | 048 (has-invoice facet) | audit wrote "045" as a pre-partition placeholder → resolved to 049 (courses) |
| C07-17 | Courses-without-invoice lens (7 course-action lenses + has_invoice facet + unbilled census) | C07 | PARTIAL | 048 (finance census) | band → 049 (courses host) |
| C08-06 | Data-analysis demographic breakdowns (age/language/status/gender/country counts, no charts) | C08 | PARTIAL | — | band → 049 (reports `#view=analysis`); counts only, never charts/computed % |
| C10-26 | Per-row Actions of the three empty legacy tables (library · pdf · certificate-requests) | C10 | UNKNOWN_EVIDENCE | — | band* → 049 |
| C10-27 | Authored empty/loading/error states across the content cluster | C10 | MISSING | — | band → 049 |
| C14-01 | Export Course (legacy 500 — zero field-level evidence) | C14 | UNKNOWN_EVIDENCE | — | audit owner "—" → 049 (courses re-evidence) |
| C14-02 | Family Feedback (legacy 500 — zero field-level evidence) | C14 | UNKNOWN_EVIDENCE | — | resolved from past-spec ref "029 (C08 evidence)" → 049 (reports feedback boards) |

## 11. Spec 050 — Page review: control center, utilities, hub & shell (7 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-14 | Global search results surface (GET /management/search + Recent Searches modal) | C01 | MISSING | 057 (shell freeze) | band → 050 (shared shell / hub owner) |
| C08-07 | Lead-funnel statistics board (non-computed aggregates beyond the 4 authored KPI cards) | C08 | PARTIAL | — | band → 050 (leads host); one capability with C11-27 |
| C11-17 | Announcement compose form (11 controls; 3 stub selects · `hours` mislabel · free-text expire) | C11 | PARTIAL | 056 (control fixes) | band → 050 |
| C11-27 | New-requests statistics board (~24 tiles → 4 authored KPI cards) | C11 | PARTIAL | — | owner "future-backend" resolved → 050; computed funnel aggregates = backend prerequisite |
| C14-08 | Time converter — multi-zone comparison board (24h band grid, add/remove ~150 locations, Prev/Today/Next rail, 6-col DST board) vs our 2-zone point converter | C14 | PARTIAL | — | band → 050 |
| C14-17 | Trials pipeline analytics (computed hero/alert/KPI/outcome/insight aggregates) | C14 | FUTURE_BACKEND | — | **backend prerequisite**; audit owner "—" → 050 (leads host) |
| C14-25 | Task move (drag / status change) | C14 | FUTURE_BACKEND | 044 (interaction pattern) | **backend prerequisite**; audit owner "—" → 050 (tasks host) |

## 12. Spec 051 — Community, Moderation & Safe Social Interactions (2 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C02-15 | Teacher chat (contacts/groups) | C02 | MISSING | 053 (transport) · 043 (can_chat gate) | Spec 024 B-06 lineage |
| C11-11 | Teacher chat surface (legacy reduced variant; no current consumer) | C11 | MISSING | 055 (cross-role consumer wiring — audit-recorded pointer) | reconciled 055→051 to match C02-15 (one gap, one owner) |

## 13. Spec 052 — Recognition, Achievements & Privacy-Safe Leaderboards (0 rows)

**No non-complete row allocates to 052.** The only legacy "recognition" evidence (computed Percentage / Top
Performer ranking, C08-09) is **REJECTED_NO_FAKE** — refused, not gapped. Privacy-safe recognition is a
green-field charter that enters only under 052's own future scoping (with a real backend for any computed
standing); nothing in the legacy corpus creates a reconciliation debt for it. Recorded here so the spec's
zero-allocation is explicit, not an omission.

## 14. Spec 053 — Integrations Command Center (17 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-07 | Per-class Send Reminder / Send WA message (session-scoped notification touching teacher AND family) | C01 | MISSING | 055 (cross-role touch) | — |
| C02-33 | Zoom meeting provisioning (never credentials) | C02 | FUTURE_BACKEND | 054 (classroom consumer) | **backend prerequisite** |
| C03-09 | Public Advertisement audience-targeted broadcast (media file · WhatsApp type · teacher/student recipient pickers) — no current-state comparison recorded | C03 | UNKNOWN_EVIDENCE | — | — |
| C06-18 | Send WA Message / Send Reminder messaging channels | C06 | FUTURE_BACKEND | 055 | **backend prerequisite** |
| C07-15 | Payout provider configuration (Paymob/Payoneer sandbox-live + webhook; legacy showed plain-text credentials incl. "API password") | C07 | FUTURE_BACKEND | — | **backend prerequisite**; the legacy's plain-text secrets stay refused — no authored secret, ever |
| C07-16 | Payment-gateway instances wired to invoicing (7 create variants + edit; invoice "Accept payments via"; list gateway filter) | C07 | FUTURE_BACKEND | 048 (invoice surfaces) | **backend prerequisite** |
| C09-04 | Customisation → Message Builder (legacy capture = 504 Gateway Timeout) | C09 | UNKNOWN_EVIDENCE | — | same surface as C11-16/C14-07 |
| C09-15 | Real provider connections / payments / payouts / WhatsApp pairing / SMTP send (FO-01…FO-07) | C09 | FUTURE_BACKEND | — | **backend prerequisite** |
| C09-22 | Payment-method instance list + Number-Of-Family assignment count + edit/delete | C09 | PARTIAL | — | — |
| C09-25 | Email account list management (Default flag / Status / per-row settings / Add Account) | C09 | PARTIAL | — | — |
| C09-26 | Real import execution (validation/dry-run/undo) + real backup execution (FO-10/FO-11) | C09 | FUTURE_BACKEND | — | **backend prerequisite**; owner "backend" resolved → 053 |
| C10-20 | Guardian certificate delivery (private, per-guardian, opt-in only) | C10 | FUTURE_BACKEND | 043 (privacy posture) | **backend prerequisite** |
| C11-14 | In-app notification bell/popover (legacy live count badge) | C11 | PARTIAL | — | owner "future-backend" resolved → 053; live count = backend prerequisite |
| C11-15 | Notification inbox list page (destination never crawled) | C11 | UNKNOWN_EVIDENCE | — | owner "future-backend" resolved → 053 |
| C11-16 | Message Builder (legacy capture = 504) | C11 | UNKNOWN_EVIDENCE | — | — |
| C14-07 | Message Builder (legacy 504 — zero evidence) | C14 | UNKNOWN_EVIDENCE | — | trio with C09-04/C11-16 |
| C15-04 | Real-time transport (legacy Pusher websocket — `pusherTransportTLS`) | C15 | FUTURE_BACKEND | 051 · 054 (consumers) | **backend prerequisite** |

## 15. Spec 054 — Embedded Virtual Classroom & Meeting Lifecycle (5 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-15 | Teacher-home working session controls (date search over own classes · Enter Again/join · End class form · Mark absent · request cancel/reschedule — reduced to a 0-field guidePanel gate) | C01 | PARTIAL | 045 (teacher-home host) · 056 (field sets) | — |
| C02-31 | Live classroom UI (session-class-room redirect) | C02 | UNKNOWN_EVIDENCE | — | — |
| C03-08 | Student Feedback meeting boards (admin Parents board + `addFeedbackModal` + family `student-feedbacks` end) — no current-state comparison recorded | C03 | UNKNOWN_EVIDENCE | 055 (pipeline, C04-20) | — |
| C11-05 | Voice notes / emoji / delete-message / seen receipts | C11 | MISSING | 051 (chat surface) | — |
| C11-09 | `loadMoreChats` thread pagination | C11 | FUTURE_BACKEND | — | **backend prerequisite** |

## 16. Spec 055 — Cross-Role Propagation & Workflow Consistency (33 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-08 | Per-class "Running" status transition | C01 | MISSING | — | — |
| C01-09 | Class Timeline audit trail (status diffs, actor, timestamps) | C01 | FUTURE_BACKEND | — | **backend prerequisite** |
| C01-12 | Topbar unpaid-courses alert (`courses?type=no_invoices`) | C01 | FUTURE_BACKEND | 048 (finance data) | **backend prerequisite** |
| C01-26 | Session-outcome cross-role chain (record-outcome creation surface absent; family billing / teacher follow-ups / attendance consumers are fixture-fed) | C01 | FUTURE_BACKEND | — | **backend prerequisite** |
| C02-09 | Cancel / auto make-up request (11 inputs) | C02 | MISSING | 056 (form fields) | — |
| C02-12 | Teacher-side certificate request (4 fields) | C02 | MISSING | — | pair C10-16/C03-12 |
| C02-30 | Monthly-plan approval authority (View / Approve) | C02 | UNKNOWN_EVIDENCE | — | — |
| C02-32 | Send Reminder / Running kebab endpoints | C02 | UNKNOWN_EVIDENCE | 053 (delivery) | — |
| C03-07 | Monthly student-progress report cycle (teacher 9-field authoring + admin approve/edit/delete queue + has-report index; read view shipped) | C03 | PARTIAL | 056 (authoring forms C02-11/C08-02) | — |
| C03-10 | Trial lifecycle (admin Add-trial 9-field form · Trials tab · family 2-step 10-field Request-Trial wizard · previous-trials counter) | C03 | MISSING | 056 (forms) | — |
| C03-12 | Teacher certificate-request producer modal (admin consumer `certificates.html#view=requests` exists) | C03 | PARTIAL | — | pair C02-12/C10-16 |
| C03-22 | Homework propagation End-class → child-view homework (both ends exist; propagation not modelled) | C03 | PARTIAL | — | — |
| C03-23 | Student-timezone framing ("Student date/time" labels; absent everywhere in our app) | C03 | MISSING | — | — |
| C04-10 | Family profile Activity audit timeline (who changed what, when) | C04 | FUTURE_BACKEND | — | **backend prerequisite** |
| C04-12 | Capability toggles Chat / Library (cross-role gates on what the family portal shows) | C04 | MISSING | 043 (grant model) | — |
| C04-20 | Parent-meeting feedback pipeline (Parents board, schedule meeting, Add Notes, 4-textarea per-student report, View Report — portal consumer exists with no producer) | C04 | PARTIAL | 054 (meeting surface) | — |
| C05-03 | Add Lesson from a course/enrollment (`sess-new` ≈ legacy Add Lesson but not reachable from course) | C05 | PARTIAL | — | — |
| C05-14 | Course timeline / status audit trail | C05 | MISSING | — | adjacency C14-20 |
| C05-15 | Cross-role drill-downs: teacher per-student class history; family course feedback + per-subscription history | C05 | MISSING | — | — |
| C06-04 | Request→response scheduling loop (send schedule/trial request ~35 controls + "Teachers you sent / Accepted teachers" response views) | C06 | MISSING | 056 (forms) | pair C13-07/C13-08 |
| C07-31 | Invoice → family-portal propagation + Send-Notification delivery (admin invoice appearing in family billing) | C07 | FUTURE_BACKEND | 053 (delivery) | **backend prerequisite** |
| C09-24 | Palette/layout persistence + cross-surface propagation (Apply-for-me / Reset; FO-19…FO-22) | C09 | PARTIAL | — | — |
| C10-16 | Teacher `Request Certificate` modal (`POST /teacher/certificate-request`) | C10 | MISSING | — | pair C02-12 |
| C11-20 | Announcement consumer/render surface (dashboard band, any role) | C11 | MISSING | 050 (announce host) | — |
| C11-30 | Lead → family conversion workflow (form/destination uncaptured) | C11 | UNKNOWN_EVIDENCE | 056 (forms — audit-recorded secondary) | — |
| C12-21 | Cross-surface identity propagation (topbar PROFILE / staff directory / portal personas are unlinked fixtures; profile edits must propagate) | C12 | PARTIAL | — | — |
| C13-07 | Trial/Schedule response tracker tables (Student·Parent·Course·Date/Time/Duration/Schedule·Status·Requests) | C13 | PARTIAL | — | — |
| C13-08 | "Teachers You Sent" / "Accepted Teachers" per-request drill-down modals (teacher message + Options) | C13 | MISSING | 044 (modal host) | — |
| C13-09 | Response-row actions + Requests/Options cell content (both tables empty at crawl) | C13 | UNKNOWN_EVIDENCE | — | — |
| C13-14 | Request→teacher→response cross-role propagation engine (send-to-teachers, acceptance, teacher message) | C13 | FUTURE_BACKEND | — | **backend prerequisite** |
| C14-10 | Cross-role DST visibility (teacher portal / family portal / child view surface no DST change) | C14 | MISSING | 050 (converter host) | — |
| C14-19 | Dual-timezone (student ↔ teacher) session timetable rendering | C14 | MISSING | 056 (C05-12 capture) | — |
| C14-20 | Entity activity timeline (audit trail on enrollments/courses/sessions) | C14 | FUTURE_BACKEND | — | **backend prerequisite** |

## 17. Spec 056 — Complete Forms & Data Capture Audit (82 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C01-02 | Day-board filter form (legacy 12 inputs: date_range/time-window/teacher/family/student/type vs 3 controls on sessions.html) | C01 | PARTIAL | 047 (page host) | pair C06-27 |
| C01-03 | Session outcome/write forms with fields (attend 7→0 · absent 13→0 · cancel 10→0 · edit 8→0; kebab/drawer finals field-less) | C01 | PARTIAL | 044 (drawer host) | one capability with C06-01 |
| C01-04 | Session teacher-reassignment control (legacy editClass `teacher_id`; no reassignment control anywhere) | C01 | MISSING | — | one capability with C06-02 |
| C01-10 | Class Files panel (teacher/student files per class) | C01 | FUTURE_BACKEND | — | **backend prerequisite** |
| C01-11 | Per-class queue add with fields (legacy addQueueAction: level + text) | C01 | MISSING | — | — |
| C01-13 | User-defined nav shortcuts (POST /management/shortcuts: shortcut_title + shortcut_link) | C01 | FUTURE_BACKEND | — | **backend prerequisite**; one capability with C14-28 |
| C02-02 | Add/Edit teacher form (13 vs ~26 safe fields) | C02 | PARTIAL | — | pay/credential fields stay excluded forever |
| C02-03 | Teacher settings tab: location + preferences forms | C02 | MISSING | — | — |
| C02-08 | Mark class absent (video + notes) | C02 | MISSING | — | — |
| C02-11 | Monthly student progress report (30 inputs) | C02 | PARTIAL | 055 (cycle, C03-07) | — |
| C02-13 | Teacher own profile edit + password (7 controls) | C02 | PARTIAL | 043 (password portion, C12-09) | — |
| C03-04 | Admin student create/edit forms (14- and 7-control evidenced sets vs `stu-add` 9 fields) | C03 | PARTIAL | — | — |
| C03-05 | Admin suspend / stop / schedule-stop lifecycle actions (evidenced 3/1/4-field modals vs bare confirm today) | C03 | PARTIAL | 044 (confirm→form host) | — |
| C03-11 | Teacher student roster (Country · history · schedule · plans columns + per-student Classes History view) | C03 | PARTIAL | 045 (page host) | — |
| C03-17 | Child-view profile edit (legacy 7 non-credential profile controls vs 0 fields today) | C03 | PARTIAL | — | pair C14-05 |
| C04-02 | Families advanced filter panel (31 raw fields / 7 facets incl. hour_rate, children_no, cost_type, course_types, payment_methods, 16 currencies) vs search + 2 selects | C04 | PARTIAL | — | pay-adjacent facets are never ported as figures |
| C04-03 | Family directory row kebab actions (legacy Show/Edit/Delete vs current 5-item kebab without Delete) | C04 | PARTIAL | 044 | — |
| C04-04 | Update-returning modal (returned_at + note) | C04 | MISSING | — | — |
| C04-05 | Family detail info panel & tab set (22-row panel / 7 tabs vs banner + 4 KPIs / 5 tabs) | C04 | PARTIAL | 046 (page host) | — |
| C04-08 | Invoice Adjustments tab (value/count/type/note + per-row Edit/Delete) | C04 | MISSING | 048 (finance model) | — |
| C04-09 | Credits tab (session/student/teacher/duration) | C04 | MISSING | — | — |
| C04-11 | Family Settings tab — Update Location (4) + Preferences (7 incl. stop_after unpaid-invoice threshold) | C04 | MISSING | — | — |
| C04-13 | Family profile Notifications 7×2 event/channel matrix (14 checkboxes) | C04 | MISSING | 053 (channels) | — |
| C04-14 | Family lifecycle actions & modals (Suspend/Stop with date + auto-return + mandatory note; Deactivate · Activate · Schedule-Stop-on-Date · Delete; Deleted/Incomplete statuses) | C04 | PARTIAL | 044 | — |
| C04-16 | Family create/edit contract form (32 user-facing controls; Payment + Courses block vs 12 family-level wizard controls) | C04 | PARTIAL | 044 (long-form host, C04-18) | — |
| C05-02 | Course (enrollment) create/edit forms — lawful field coverage (legacy 10 allowed create / ~24 allowed edit vs crs-add 6 / crs-edit 7; single schedule row) | C05 | PARTIAL | — | — |
| C05-10 | Free / trial enrollment creation path (store_free) | C05 | MISSING | — | — |
| C05-11 | Teacher field on the group create form (legacy requires one; grp-add has none) | C05 | PARTIAL | — | — |
| C05-12 | Dual-timezone scheduling (student + teacher weekday/time per schedule row, timezone-difference badge, dual-column timetable) | C05 | MISSING | 055 (rendering, C14-19) | — |
| C06-01 | Session lifecycle outcome forms (mark-attended 7 / student-absent 13 / cancel 10 fields — notify, make-up, add-to-credit, timezone, remark, summary, homework) | C06 | PARTIAL | 044 (drawer host) | reconciled 044→056 to match C01-03 (one gap, one owner) |
| C06-02 | Edit/Reschedule session form (date · time · duration · teacher reassign · accounting statement) | C06 | PARTIAL | 044 (drawer host) | reconciled 044→056 to match C01-03/C01-04 |
| C06-05 | Public-holiday bulk-cancel form (~9 controls) | C06 | PARTIAL | 048 (page host) | — |
| C06-06 | Scheduled-actions management (2 filters + 10-col table + 18-control create form) | C06 | PARTIAL | 048 (page host) | pair C14-11/C14-12 |
| C06-07 | Sessions-analysis filter form + full row set (Returned Today, Teacher/Admin Cancel) | C06 | PARTIAL | 048 (page host) | — |
| C06-08 | Teacher availability editor (5 controls, Add/Update/Delete) | C06 | MISSING | — | — |
| C06-09 | Family request-cancel/reschedule form (type radios + date + time) | C06 | PARTIAL | 046 (portal host) | — |
| C06-10 | Session files upload + files panels (family `uploadFileModal` incl. voice, teacher `images[]`, class Files panel) | C06 | MISSING | — | upload execution = backend; MUST-GATE (0 `type=file`) |
| C06-27 | Class-board Filter-Classes form (9 controls vs our 3 filter controls) | C06 | PARTIAL | 047 (dashboard host) | pair C01-02 |
| C07-02 | Create-parent-invoice authoring form (~17 controls, line items, adjustments+repetition, notify) | C07 | MISSING | 048 (page host) | final stays a backendRequired gate |
| C07-03 | Record-payment capture form ("New Transaction": txn id/date/basic/additional/taxes/currency/gateway) | C07 | PARTIAL | — | never a fake payment success |
| C07-11 | Expense ledger (Add/Edit 8-control forms + Heads + Actions table) | C07 | PARTIAL | 048 (page host) | pair C14-16 |
| C07-18 | Assign-course-to-invoice picker modal ("All Invoice For This Parent") | C07 | MISSING | 044 (picker host) | — |
| C07-28 | Row-level Actions menus on money tables (invoices/salaries/staff/expense/family billing — ALL empty at crawl) | C07 | UNKNOWN_EVIDENCE | — | never guessed |
| C08-01 | Form/questionnaire builder (N repeatable question rows, 6 field types, per-form colour picker) | C08 | PARTIAL | — | — |
| C08-02 | Monthly student progress report authoring (9-input Send Report, admin + teacher producer surface) | C08 | MISSING | 055 (cycle, C03-07) | — |
| C08-03 | Reports follow-up tracker (teacher/student/has_report/month board + Student Timetable modal) | C08 | MISSING | — | — |
| C08-04 | Form responses viewing | C08 | MISSING | — | — |
| C08-05 | Per-teacher-per-month feedback note entry point from the teacher board | C08 | PARTIAL | — | — |
| C08-14 | nav.monthlyReports label vs legacy capability pairing (legacy = form builder / progress-report workflow) | C08 | PARTIAL | 049 (reports host) | — |
| C08-15 | Forms-table row-level Actions (edit/delete/set-default/toggle-status/duplicate — table empty at crawl) | C08 | UNKNOWN_EVIDENCE | — | — |
| C09-02 | Country/city lookup (251 countries + Show-Country-List reference modal w/ Copy) | C09 | PARTIAL | 048 (settings host) · 044 (reference modal) | owner "not stated" → 056 (option-set completeness) |
| C09-10 | Colour pickers (swatch + hex text vs 13 legacy `input type=color`) | C09 | PARTIAL | 048 (settings host) | owner "not stated" → 056 (control fidelity) |
| C09-17 | Policy rich-text authoring (legacy prose UNKNOWN — both Quill editors empty on captured tenant) | C09 | PARTIAL | 044 (long-form editor interaction, C12-18) | owner "not stated" → 056 |
| C10-05 | Add Material form (legacy 5 fields → 3 shipped) | C10 | PARTIAL | — | — |
| C10-06 | Add Material `file` + `thumbnail` upload | C10 | FUTURE_BACKEND | — | **backend prerequisite**; MUST-GATE |
| C10-07 | Category Details modal (legacy create + per-row edit; per-row edit not shipped) | C10 | PARTIAL | 044 | — |
| C10-12 | Certificate Approve modal (7 controls → 0; template/delivery/message at approval time) | C10 | PARTIAL | — | — |
| C10-18 | Create/Issue certificate (5-field drawer; no delivery control shipped) | C10 | PARTIAL | 053 (delivery, C10-20) | — |
| C10-19 | Upload certificate (`POST /management/upload-certificate`) | C10 | FUTURE_BACKEND | — | **backend prerequisite**; MUST-GATE |
| C11-18 | Announcement recipient selection (teacher/student pick tables + Select All) | C11 | MISSING | 050 (compose host) | — |
| C11-19 | Announcement edit / delete / duplicate | C11 | MISSING | — | — |
| C11-23 | Lead `country_id` option set (select → free text) | C11 | PARTIAL | — | — |
| C11-25 | Leads date-range filter (Range / Submit / Reset) | C11 | PARTIAL | — | — |
| C11-29 | Scheduled-trials board (legacy captures = HTTP 500) | C11 | UNKNOWN_EVIDENCE | 050 (leads host) | one capability with C14-04 |
| C12-04 | Admin own account page (show + edit: photo/name/email/username; topbar "Account" is a noop today) | C12 | MISSING | — | — |
| C12-07 | Teacher own profile edit form (photo + first/last name + email inputs → display rows + 3 gates, 0 inputs) | C12 | PARTIAL | — | pair C14-06 |
| C12-08 | Family/guardian own profile edit form (same shape at /student/profile-edit; edits the child identity) | C12 | PARTIAL | — | pair C14-05 |
| C12-10 | Profile photo upload (`type=file`, 1MB copy → MUST-GATE law, gates today) | C12 | FUTURE_BACKEND | — | **backend prerequisite**; owner "backend" → 056 |
| C12-11 | Legacy staff Add/Edit/Delete form fieldset (actions proven only by permission labels; no page record in corpus) | C12 | UNKNOWN_EVIDENCE | — | — |
| C13-02 | Create/Edit-task form fields (legacy Livewire form never captured; ours = authored 7-field drawer + gated Save) | C13 | UNKNOWN_EVIDENCE | — | — |
| C13-03 | Add-Section form fields (`wire:click="create"`, uncaptured; ours = 1-field drawer + gated Save) | C13 | UNKNOWN_EVIDENCE | — | — |
| C13-13 | Real persistence for task/section writes, task completion/assignment and homework submission upload | C13 | FUTURE_BACKEND | — | **backend prerequisite** |
| C14-04 | Scheduled Trials queue (legacy 500 ×2 — zero field-level evidence) | C14 | UNKNOWN_EVIDENCE | 050 (leads host) | resolved from past-spec ref "034 (C11 evidence)" → 056, matching C11-29 |
| C14-05 | Student Profile (legacy 500 — zero field-level evidence) | C14 | UNKNOWN_EVIDENCE | — | resolved from "no spec stated" → 056 (pairs C12-08/C03-17) |
| C14-06 | Teacher Profile (legacy 500 — zero field-level evidence) | C14 | UNKNOWN_EVIDENCE | — | resolved from "no spec stated" → 056 (pairs C12-07) |
| C14-11 | Scheduled-action create form (0 fields vs 16 evidenced conditional controls) | C14 | MISSING | 048 (page host) | — |
| C14-12 | Scheduled-actions list (filters, Created-by/Executed-At/Result/Note columns, per-row Settings) | C14 | PARTIAL | 048 (page host) | — |
| C14-14 | Scheduled-action status vocabulary (legacy Pending/Executed/Failed/Cancelled vs ours queued/upcoming/cancelled) | C14 | PARTIAL | — | — |
| C14-16 | Expense heads — row manage actions (edit / delete / status toggle) | C14 | PARTIAL | 048 (settings/finance host) | — |
| C14-18 | Lead record workflow (19/~21 create fields; missing repeatable Children rows + Teacher-gender; 9-status enum maps 1:1) | C14 | PARTIAL | 050 (leads host) | — |
| C14-24 | Task create (7 fields) + add-section (1 field) field sets — authored, not evidenced | C14 | UNKNOWN_EVIDENCE | — | pair C13-02/C13-03 |
| C14-28 | Topbar personal persisted nav shortcuts (`shortcutsNavModal`) | C14 | MISSING | — | reconciled 057→056 to match C01-13; persistence = backend prerequisite |

## 18. Spec 057 — Final Production Freeze (6 rows)

| capId | Capability | Cluster | Disposition | Secondary deps | Notes |
|---|---|---|---|---|---|
| C03-14 | Salary Class Report grouped by student (`teacher/update-result?filter=student`) | C03 | HONEST_LOCK | backend billing/accounting (outside 043–057) | 057 verifies the lock persists (`disabled` + `nav.reason.finance` + no route); stays the **sole** honest lock |
| C06-13 | Class salary report (`classSalaryReport`) | C06 | HONEST_LOCK | backend billing/accounting (outside 043–057) | same lock — preservation verification |
| C07-23 | Salary Class Report — admin (range + Group-By Student/Date/Parent + teacher → update-result) | C07 | HONEST_LOCK | backend billing/accounting (outside 043–057) | same lock — preservation verification |
| C08-08 | Salary Class Report (admin) — date range + Group By + teacher select | C08 | HONEST_LOCK | backend billing/accounting (outside 043–057) | same lock — preservation verification |
| C09-23 | classSalaryReport (FO-15) | C09 | HONEST_LOCK | backend billing/accounting (outside 043–057) | owner "backend" resolved → 057 (lock-preservation verification) |
| C14-27 | Branded 404 / error page (legacy has one; our static build has no 404.html) | C14 | MISSING | — | production-freeze deliverable; any count impact is a recorded proposal, never built inside 042 |

---

## 19. Per-spec totals and grand total

| Owning spec | Rows | of which FUTURE_BACKEND (backend prerequisite) |
|---|---|---|
| 043 Sensitive Data Privacy, Role Isolation & Anti-Poaching | **17** | 9 |
| 044 Modal, Drawer & Long-Form Interaction System | **24** | 0 |
| 045 Page review — teacher portal + teacher admin | **8** | 0 |
| 046 Page review — family portal + family admin core | **4** | 1 |
| 047 Page review — child-view + students/sessions ops | **8** | 0 |
| 048 Page review — settings/staff/finance + scheduling ops | **7** | 6 |
| 049 Page review — reports/courses/groups/content | **7** | 0 |
| 050 Page review — control center/utilities/hub | **7** | 2 |
| 051 Community, Moderation & Safe Social Interactions | **2** | 0 |
| 052 Recognition & Privacy-Safe Leaderboards | **0** | 0 |
| 053 Integrations Command Center | **17** | 8 |
| 054 Embedded Virtual Classroom & Meeting Lifecycle | **5** | 1 |
| 055 Cross-Role Propagation & Workflow Consistency | **33** | 7 |
| 056 Complete Forms & Data Capture Audit | **82** | 6 |
| 057 Final Production Freeze | **6** | 0 |
| **Grand total** | **227** | **40** |

Cross-checks: 17+24+8+4+8+7+7+7+2+0+17+5+33+82+6 = **227** ✓ · dispositions 96 PARTIAL + 58 MISSING +
28 UNKNOWN_EVIDENCE + 40 FUTURE_BACKEND + 5 HONEST_LOCK = **227** ✓ · every row has exactly one primary owner ·
secondary dependencies are informational pointers only, never co-owners · all five HONEST_LOCK rows are the one
sanctioned `classSalaryReport` lock · no row proposes fake backend behaviour, an authored secret, corpus PII,
a pay figure on a teacher surface, or a family-portal pay figure.
