# Current Product BETTER Than Legacy — Preservation Register (Spec 042)

**Lens:** where our rebuild is *already superior* to the legacy academatic.online product.
Every row cites (a) the legacy evidence proving the legacy was worse and (b) the current-source proof
that we do better, then assigns a **future owner from the 043–057 roadmap** who MUST preserve the win
and must NOT regress it back toward legacy parity.

**Baseline:** committed HEAD `de8d552` — 115 public HTML · 57 page bases · admin menu 50 ·
route split 24 deep / 25 plain / 1 lock · planned 0 · orphan set = exactly `{gallery.html, gallery.en.html}`.

**Dispositions used here:** `INTENTIONALLY_IMPROVED` (we built something better) · `REJECTED_*`
(we are better by *refusing* a legacy behaviour) · `HONEST_LOCK` · plus honest-gate wins.
Legacy evidence roots are relative to `output/roles/`. Current-source refs are relative to `app/`.

**Read this next to the caveat block at the very bottom** — there is exactly ONE place the standing
"we are better / no dead control" narrative is NOT true today (the teacher-portal quick tiles), and it
is flagged so no reader over-claims.

---

## Verification note (done for this register, not inherited)

The following were re-proven directly against raw bytes for this audit (not trusted from summaries):

| Claim | Legacy proof | Current proof |
|---|---|---|
| Teacher salary/fines/bonus on teacher home | `teacher/text/teacher-home.txt:19` («Your Salary»), `:23` (Fines 1,003.00), `:24` (Bonus 2,000.00) | 0 pay tokens in any `teacher-*` file (grep clean) |
| Computed «Attended Percentage» on teacher hero | `teacher/text/teacher-home.txt:18` | no runtime % on any teacher surface |
| «Delete Fine» → real DELETE, no confirm | `admin/pages/management-home.json:1511` (text), `:2432` (action `…/teachers/1/compensations/3`) | not ported |
| Real admin PII + 3rd-party avatar CDN in header | `admin/html/raw/management-home.html:1440` (`eslammekky@gmail.com`), `ui-avatars.com` ×2 | 0 `ui-avatars` in `app/`; fixture identity only |
| Admin password as `type="text"`, no old-pw check | `admin/html/raw/management-profile-edit.html:2474` | 0 `type="password"` across 115 pages; 0 `<input type="file">` |
| All 11 integrations ship `is_enabled=1 checked` | `admin/html/raw/management-settings-integrations.html` (11× `is_enabled]" value="1" … checked`) | no card carries an enable control; all authored `notConfigured` |
| PayPal defaults to **Live** | `admin/html/raw/…payments-create-payment-method-1.html:2465` (`value="live" checked`) | Sandbox default (Spec 040) |
| Chat over unencrypted ws + public broker | `admin/html/raw/management-chat.html:3580` (`mqtt.connect(`) | no websocket/engine by constitution |
| Certificate Approve → `Swal.fire('Success')` + row removal | `admin/html/raw/management-certificate-requests.html:2659` | honest backendRequired gate |
| RBAC ships 170/170 granted (everyone super-admin) | `admin/html/raw/management-admins-permission-6.html` (171 `permisions[]`, 170 `checkbox … checked`) | authored `granted` booleans, deny-by-default posture |
| Real DB backup fired from bare GET + success banner | `admin/text/management-settings-security-data-backup-send.txt:9` | destination field + scope/permission/audit copy + 2 gates |
| Unmasked guardian/teacher phones + LIVE invite URL | `admin/pages/…whatsapp-families-insights.json:1293` (`01154859653`), `…teachers-insights.json:1285` (`chat.whatsapp.com/HNeGQ2J7…`) | both pages excluded (Spec 040) |
| Legacy never rendered RTL | `management-home.html` `dir="ltr" lang="en"`; only 1 of 300 raw captures carries `dir="rtl"` | AR RTL-first + EN LTR, both fully baked |

---

## 1. Honesty gates instead of fake success

The legacy routinely fakes success, mutates from bare buttons, and fires real side effects without confirmation.
Our every write is a labelled `data-disabled-reason` gate or a confirm that mutates nothing.

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner (must preserve) |
|---|---|---|---|---|---|
| B-1.1 | Certificate Approve/Reject are honest gates, not a fake `Swal.fire('Success!')` that removes the row regardless of server | `admin/html/raw/management-certificate-requests.html:2659` | `certificates.html#view=requests` gate (C10-19/22) | REJECTED_NO_FAKE | FUTURE_BACKEND (render service) |
| B-1.2 | «Send Backup» is a destination field + standing scope/destination/permission/audit copy + 2 gates — legacy fires a real DB backup from a bare GET, banners success, silently redirects to SMTP | `admin/text/…backup-send.txt:9`; C09-16 / C12-17 | `settings.html#view=security` (settings.js:248-257, 2 gates 0 confirm) | INTENTIONALLY_IMPROVED / REJECTED_NO_FAKE | 043 framing + backend (FO-11) |
| B-1.3 | Two-step confirm-first delete that mutates nothing, vs legacy one-click kebab DELETE (`courses/1/delete`, `student/{id}/delete`, `admins/{id}` DELETE, `Delete Fine`) with no captured confirm | `admin/pages/management-home.json:2432`; C05/C14 kebab deletes | `enhance.js:129` confirm-danger; staff/courses/groups/library deletes all confirm→gate | REJECTED_NO_FAKE | none — pattern is superior; 057 to freeze |
| B-1.4 | Finance writes (Create-invoice, Record-payment, Run-salary, Mark-paid, Send) are honest gates; legacy `New Transaction` computes a Total and `Approve selected` posts bulk payouts with no confirm | `admin/screenshots/management-payouts-full.png` (Approve selected → `/payouts/approve`) | `finance-actions.js:47,66-79` gates | FUTURE_BACKEND | future billing/payroll spec |
| B-1.5 | Class-report Save is a gate; legacy `markAsAttended` silently pushes the report to the family over WhatsApp from inside the modal | `admin/pages/management-courseclasses-1.json` (markAsAttended + sendWhatsappMessage) | outcome drawer gate (C13-01) | REJECTED_NO_FAKE | 044 form + 054/053 delivery |
| B-1.6 | Every acknowledge/toast says «يُتاح بعد ربط الخادم» (available once the server is connected); killed the legacy demo-success vocabulary; 0 fake-success toast in any built page | Spec 026 Layer B; legacy template feed | `enhance.js:39,:642-660` | INTENTIONALLY_IMPROVED | 044/055 must not reintroduce fake success |
| B-1.7 | The time-converter is the ONE honest exception done right: it genuinely works client-side (native `Intl`), so it carries NO fake gate | legacy `/management/time-convertor` grid (C14-02) | `enhance.js:336-379 initTimeConverter` | COMPLETE_AND_VERIFIED | none — preserve (do not gate a working tool) |

---

## 2. No exposed secrets / credentials

The legacy renders provider secrets as plain `type="text"`, prints saved keys as table columns, ships a plaintext
admin password field with no old-password check, and defaults a payment gateway to Live.

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner (must preserve) |
|---|---|---|---|---|---|
| B-2.1 | 24 sensitive provider fields render as **structure-only rows** (label + purpose, no value slot); legacy renders 15 as `type=text`, ships 2 real `type=password`, and PRINTS saved keys (Key 1 / Client Secret) | `admin/screenshots/…-8-configure-full.png`, `-9-`, `-2-`; C09-19 | `settings.html#view=integrations`; 0 `type=password` sitewide | REJECTED_SECURITY | 053 (structure-only forever) |
| B-2.2 | PayPal/Payoneer default to **Sandbox**; legacy defaults an unconfigured gateway to **Live** | `…payment-method-1.html:2465` (`value="live" checked`) | Spec 040 Environment select defaults Sandbox | INTENTIONALLY_IMPROVED | 053 |
| B-2.3 | No integration card carries an enable control; every provider authored `notConfigured` — legacy ships ALL 11 `is_enabled=1 checked` while every provider shows "No data found" | `management-settings-integrations.html` (11× checked) | 11 provider cards, 0 enable control | INTENTIONALLY_IMPROVED | 053 |
| B-2.4 | Admin password: we render 0 password inputs anywhere; legacy admin password is `type="text"` on the same form as name/email with no old-password verification (the highest-privilege account got the *least* secure form) | `management-profile-edit.html:2474` | 0 `type=password` / 115 pages | REJECTED_SECURITY | 043 policy + backend auth |
| B-2.5 | Import column contracts published MINUS `password`, `hour_rate`, `currency` (6 of 39 slots) and minus the legacy example values | `management-settings-security-data.html` (`password`/`hour_rate`/`currency` columns) | `SECURITY_IMPORTS` 8+12+7+6 = 33 | REJECTED_SECURITY/PAY_FREE | 043 (FO-12) + payroll backend |
| B-2.6 | Chat transport refused: legacy uses unencrypted `ws://localhost:8083/mqtt` + a public test broker `wss://test.mosquitto.org:8081` + a guessable `user/{type}/{id}` topic namespace with no client ACL | `management-chat.html:3580` | no websocket/engine (constitution) | REJECTED_SECURITY | 043 authz + 054 transport (design own, never port) |
| B-2.7 | No shared-OTP anti-pattern: legacy stores ONE OTP destination phone for ALL admins | `management-settings-general.json` (`name=otp`) | not ported | REJECTED_SECURITY | 043 + auth backend (FO-16) |
| B-2.8 | No live CSRF token / authored secret embedded in shipped HTML (legacy raw HTML carries a live token `UnLXXB6…`) | `admin/html/raw/management-certificate-requests.html` | 0 authored secrets | REJECTED_SECURITY | 043 |

---

## 3. No teacher pay leakage (pay-free GLOBAL)

The single most-repeated legacy defect: teacher salary/fines/bonus surfaced to the teacher, `(3.00 Fine)` chips on
class rows, hour-rate literals on courses/groups, and pay columns in timetables. Three-layer enforced since Spec 015.

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner |
|---|---|---|---|---|---|
| B-3.1 | Teacher home carries **zero** pay tokens; legacy leads with «Your Salary 997.00 EGP / Estimated 1,537 / Fines 1,003 / Bonus 2,000» | `teacher/text/teacher-home.txt:19,23,24`; `teacher-home-full.png` | 16 teacher-portal files grep-clean | REJECTED_PAY_FREE | none — permanent |
| B-3.2 | No `(3.00 Fine)` chip + `Delete Fine` kebab on any class/day board | `management-home.json:1511,2432` | not ported | REJECTED_PAY_FREE | none — permanent |
| B-3.3 | Salaries boards are STATUS-FIRST and FIGURE-FREE (name + period + status); legacy shows a 15-column pay table (Hour Rate / Fixed / Fine / Gift / Total) | `management-salaries-full.png` | `finance.html#view=salaries` | REJECTED_PAY_FREE | 056 (selection form only) + payroll backend |
| B-3.4 | Course/group surfaces carry no rate; legacy prints `teacher_hour_rate` (120), `t_hour_rate`, "Teacher rate" column, "60 min (120)" | `management-courses-1-edit-full.png`; `text/management-courses-1.txt` | 0 rate tokens on 4 C05 pages | REJECTED_PAY_FREE | none — permanent |
| B-3.5 | Timetable blocks tinted by SESSION status only; legacy tints by payment status ("Active & unpaid" legend) — a pay signal on a teaching surface | `management-all-teachers-timetable`; M-14 | status-only tints | REJECTED_PAY_FREE | none — standing M-14 |
| B-3.6 | `classSalaryReport` is the SOLE honest lock (padlock + reason + no route); legacy fully exposes the teacher-facing salary-class report | `teacher/salary-class-report`; C07-14 | nav lock, no route | HONEST_LOCK | future payroll backend (may never unlock in a frontend spec) |
| B-3.7 | Settings General omits the 10-control Teachers pay tab + `rate_student_absent`; import rejects `hour_rate`/`currency` | `management-settings-general.json`; C09-05/06/14 | non-numeric "managed in Finance" pointer | REJECTED_PAY_FREE | payroll backend (FO-14) |
| B-3.8 | Staff record omits salary + 17-currency selector (`a31.currency===0` machine-gated) | `management-admins-create-full.png`; C12-19 | staff.html forms | REJECTED_PAY_FREE | none — settled Spec 031 |
| B-3.9 | Salary-event notification reproduced as routing ONLY (`ntf-salEventsCh`), deliberately not named `*salary*`, zero pay figure | `management-settings-notification.json` (`name=salaries`) | `settings.html#view=notifications` | INTENTIONALLY_IMPROVED | 055 routing; figure never |

---

## 4. No real PII / anti-poaching

The legacy corpus leaks the operator's real identity on every page, unmasked guardian/teacher phones, a live WhatsApp
invite URL, student country/timezone columns, and a children-by-country world map.

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner |
|---|---|---|---|---|---|
| B-4.1 | Header shows a fixture identity + initials avatar, no email, ZERO external requests; legacy prints the real name/email and pushes the real name to `ui-avatars.com` | `management-home.html:1440`, `ui-avatars.com` ×2 | 0 `ui-avatars` in app; `topbar.js` fixture chip | REJECTED_PRIVACY | 043 (standing refusal) |
| B-4.2 | Both WhatsApp-insights pages EXCLUDED; legacy renders name + unmasked phone + LIVE `chat.whatsapp.com` invite + username in a plain admin table | `…teachers-insights.json:1285`; `…families-insights.json:1293` | not built (Spec 040) | REJECTED_PRIVACY | 043 (masked health view only) |
| B-4.3 | Teacher surfaces carry no guardian contact (anti-poaching); legacy exposes guardian phone/email in list + edit + insights, and student Country on the teacher roster | `teacher/screenshots/teacher-studentslist-full.png`; C04-34/C03 | `teacher-students.js:6` (explicit) | INTENTIONALLY_IMPROVED | 043 (anti-poaching) |
| B-4.4 | No children-by-country world map (location plotting of minors) | `management-analysis-student-full.png` | authored `reports.html#view=analysis` cards | REJECTED_PRIVACY / no-chart law | 043 + 045-050 (counts only) |
| B-4.5 | Directory omits Timezone / WhatsApp Group / Gender / Age columns | `management-student-full.png`; C03 | `students.html` facets | REJECTED_PRIVACY | 043 (do not "restore") |
| B-4.6 | All fixtures authored (leads `@example.com` / `05000000NN`; family `+966 50 000 0000`); legacy prefills real parent name/phone/email into the invoice builder and lead tables | `management-invoices-create-parent-invoice-1-full.png`; C07/C11 | authored personas | REJECTED_PRIVACY | 043 |
| B-4.7 | Certificate delivery has no "Send group" option (legacy pushes a NAMED child's certificate + link into a shared WhatsApp group — cross-family disclosure of a minor) | `management-certificate-requests.html` (`option value='group'`) | no channel control; gate only | REJECTED_PRIVACY | 043 (private opt-in only) |
| B-4.8 | Task board enforces role isolation: teacher sees only own tasks; legacy `teacher/tickets` renders the full Staff-Members performance table (with per-staff Average) INSIDE the teacher role | `teacher/screenshots/teacher-tickets-full.png` | `teacher-tasks.html` | INTENTIONALLY_IMPROVED | 043 (do not restore) |

---

## 5. Labeled status chips, no dead controls, RBAC deny-by-default

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner |
|---|---|---|---|---|---|
| B-5.1 | Every status/signal is an icon+text chip; legacy uses numeric `/status/0..6` codes and colour-only pills | `management-families/status/*`; C04 | labelled chips sitewide | INTENTIONALLY_IMPROVED | 045-050 (keep icon+text) |
| B-5.2 | Zero `href="#"` sitewide; planned=0; one labelled lock — every click has an outcome | Specs 011/026/041 | 0 `href="#"` in app | INTENTIONALLY_IMPROVED | 057 (freeze) — **but see caveat C-1** |
| B-5.3 | Staff/teacher directories add a real filterBar (search+role/status) + labelled chips; legacy list is a bare 5-column table, no search | `management-admins`; C12-01 | `staff.html`, `teachers.html` | INTENTIONALLY_IMPROVED | 045-050 |
| B-5.4 | Status lifecycle collapsed to ONE status + confirm + chip; legacy has redundant `status` AND `enable` selects (double source of truth) | `management-admins/{id}/edit`; C12-07 | staff.html | INTENTIONALLY_IMPROVED | 045-050 |
| B-5.5 | RBAC authored with real `granted` booleans and a deny-by-default posture; legacy ships BOTH captured staff at 170/170 (every staff member a de-facto super-admin) | `management-admins-permission-6.html` (170 checked) | `fixtures/staff-management.js` PERM_GROUPS | INTENTIONALLY_IMPROVED | new RBAC spec + 043 (never default all-on) |
| B-5.6 | Import card 4 correctly named INVOICES (from the raw form `type=4/invoices_file`); legacy UI mislabels it "Upload families" | `management-settings-security-data.html`; C09/C12-22 | `imp-invoices` (Spec 040) | INTENTIONALLY_IMPROVED | settled |

---

## 6. RTL-first, dark mode, hash-aware i18n

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner |
|---|---|---|---|---|---|
| B-6.1 | AR RTL-first + EN LTR, both fully pre-rendered; legacy never actually rendered RTL (all 300 captures `dir=ltr lang=en`; 1 stray rtl) | `management-home.html` `dir="ltr"` | 115 pages baked both directions | INTENTIONALLY_IMPROVED | none — preserve (constitution) |
| B-6.2 | Three-mode theme (light/dark/system) with a no-flash boot snippet + live OS listener, styled dark across all 115 pages; legacy only flipped a Bootstrap attribute on a light-first template | C15-09; legacy customizer | `theme.js`, `build-html.mjs:162` | INTENTIONALLY_IMPROVED | none — preserve |
| B-6.3 | Language switch preserves the fragment (`#view=`/`#step=`/`#child=`); legacy 7-language links are plain server-locale page swaps that drop state | Spec 041 D-3, Spec 035; C15-10 | `langUrl()` + hash-aware `langRoute()` | INTENTIONALLY_IMPROVED | none — 044 must not regress |
| B-6.4 | Arabic-Indic digits via `num()`; legacy renders latin digits regardless of locale | C15-10 | `i18n.js` num() | INTENTIONALLY_IMPROVED | none |

---

## 7. Accessibility (machine-gated)

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner |
|---|---|---|---|---|---|
| B-7.1 | a11y critical=0 **and serious=0**, now MACHINE-GATED (Spec 041 R-2 proven by mutation → exit 1); legacy captured NO a11y data at all | C15-19; Spec 041 | `tests/a11y/run.cjs` | INTENTIONALLY_IMPROVED | 044 must not regress the gate |
| B-7.2 | Console-error gate: 375 screenshots, 0 console errors, now gated (Spec 041 R-3, previously `capture.cjs` always exited 0) | Spec 041 | `capture.cjs` | INTENTIONALLY_IMPROVED | 045-050/057 |
| B-7.3 | Shell a11y scaffolding: skip link, `main tabindex=-1`, aria-labelled landmarks, roving tabindex on rail+tabs, drawer/modal focus-trap + Esc + focus-return | C15-19 | `enhance.js openPanel/openConfirm` | INTENTIONALLY_IMPROVED | 044 (preserve trap/Esc/return contract) |

---

## 8. Deep-linkable tabs, route/orphan freeze, superior nav

| # | We are better because… | Legacy evidence (worse) | Current proof | Disp. | Owner |
|---|---|---|---|---|---|
| B-8.1 | Deep-linkable tabs (`#view=`) — 24 seeded deep-links resolve on fresh load, both languages; legacy tabs are server-round-trip pages with no fragment addressability | Spec 041; C15-12 | `components/tabs.js` + sidebar routes | COMPLETE_AND_VERIFIED | 044/057 — never regress `stored||hash` precedence |
| B-8.2 | The nav is FROZEN and honest: 6 rail categories, 50 items, 24 deep / 25 plain / 1 lock, planned=0, roving tabindex, persisted category, collapsible rail | Spec 041; C15-12 | `components/sidebar.js` | COMPLETE_AND_VERIFIED | frozen (Spec 041) |
| B-8.3 | All-teachers timetable FOLDED into `schedule.html` teacher lens (0 new pages) rather than a separate legacy page | Spec 028; C02-24 | `schedule.js` | INTENTIONALLY_IMPROVED | none — settled |
| B-8.4 | Orphan set frozen at exactly `{gallery.html, gallery.en.html}` — a maintainer design-system showcase with no legacy counterpart, deliberately unlinked | Spec 041 D-2; C14-17 | build `activeId=null` | INTENTIONALLY_IMPROVED | design-system maintainer (do not link, do not delete) |
| B-8.5 | Role landing is an honest, explicitly-labelled demo hub that demotes the student to a child-view preview; legacy admin header linked straight into `/teacher/home` (a cross-role hop) | Spec 021/022; C15-03 | `portals.html` hub | INTENTIONALLY_IMPROVED | 043 (make redirect isolation an explicit invariant) |
| B-8.6 | Honest logout gate + confirm; legacy logs you out immediately from the avatar popover with no confirm | C12-23/C15-02 | `enhance.js profileMenu` confirm | INTENTIONALLY_IMPROVED | backend auth + 044 |

---

## 9. Genuinely-new capabilities with no legacy equivalent (and honest empty/error states)

| # | We are better because… | Legacy evidence (none / worse) | Current proof | Disp. | Owner |
|---|---|---|---|---|---|
| B-9.1 | A real subject-offering CATALOGUE — legacy has no course catalogue at all ("course" exists only as a select option) | C05-01 | `courses.html` | INTENTIONALLY_IMPROVED | none — preserve |
| B-9.2 | Display-only Learning Path (level ladder + per-level counts) with an explicit «عرض فقط» disclaimer; no legacy counterpart | C05-19 | `course.html` المسار التعليمي | INTENTIONALLY_IMPROVED | none — preserve |
| B-9.3 | A real GROUP profile (7 tabs) — the legacy group list was empty and had no detail page | C05-20 | `group.html` | INTENTIONALLY_IMPROVED | 045-050 |
| B-9.4 | `schedule-search.html` — a filterable availability finder with KPIs, per-slot drawers, empty state, honest book/assign gates; legacy is a bare form that renders NO results region | C06-24 | `schedule-search.html` (Spec 035) | INTENTIONALLY_IMPROVED | 035 owns; 056 numeric window |
| B-9.5 | `reports.html` Overview — a cross-area operations hub with deep-links to every source; the legacy REPORT rail jumps straight to raw forms/analysis pages | C08-01 | `reports.html#view=overview` | INTENTIONALLY_IMPROVED | 045-050 (do NOT turn into a BI board) |
| B-9.6 | Leads detail drawer CONSOLIDATES four stacked legacy Bootstrap modals (showNewRequest + Notes + Add-Notes + Change-Status) into one coherent drawer + adds a SOURCE facet the legacy never had | C11-18 | `leads.html` (Spec 034) | INTENTIONALLY_IMPROVED | future CRM backend (don't split back into modals) |
| B-9.7 | A real child-facing homework surface + child class history with summary; legacy has NO student login and its family portal never exposed homework (0 grep hits) | C13-04 | `student-homework.html`, `student-history.html` | INTENTIONALLY_IMPROVED | preserve; 045-050 for guardian rollup |
| B-9.8 | Family billing is amount-free / quota-first; legacy shows the family a bare Amount column (Total Fees 72 EUR / Hour Rate 6 EUR) | `family-billing…` legacy; C07-24 | `family-billing.html` (Spec 020) | INTENTIONALLY_IMPROVED / REJECTED_PAY_FREE | 043 only if the zero-pay law is ever revisited |
| B-9.9 | Task board with per-column tallies + authored (never computed) Average, and NO donut chart; legacy Tasks page was captured EMPTY with a chart placeholder | `management-tickets` (empty + donut); C14-14 | `tasks.html` | INTENTIONALLY_IMPROVED | none — do NOT restore the chart |
| B-9.10 | In-page empty/error/loading states (`states.js`); legacy shipped a standalone 404 and 500s on `/teacher/profile`, `/student/profile` | C15-17 | `states.js` | INTENTIONALLY_IMPROVED | 057 (add a static 404.html — see caveat C-2) |
| B-9.11 | No computed vanity metrics anywhere: authored counts + categorical chips replace legacy `Percentage`, `% growth`, `Avg. Scheduling Time`, `Top Performer` ranking, per-teacher score | `management-teacher-feedback`, `management-new-requests` ~24 tiles; C06-18/C08/C11-19 | Spec 036/037 boards | REJECTED_NO_FAKE | 052 (any real metric needs a fairness review) |
| B-9.12 | Media library gains a labelled TYPE chip + 3 filters; certificate-requests queue gains a labelled STATUS chip the legacy table lacked entirely | C10-06/C10; empty legacy tables | `library.html`, `certificates.html#view=requests` | INTENTIONALLY_IMPROVED | 045-050 |

---

## Preservation watchlist — highest regression risk under 043–057

These wins are the most likely to be eroded by a downstream spec that "adds the missing capability." Guard them:

1. **Teacher pay-free (B-3.\*)** — 056 (Complete Forms) will build the add-teacher / end-class / salary-selection
   forms. The legacy field sets are riddled with salary/hour-rate/fine/payout/currency. Owner **056 + payroll backend**
   must keep every teacher surface figure-free; `classSalaryReport` stays the sole lock.
2. **No secrets (B-2.\*)** — 053 (Integrations Command Center) is where provider credentials live. Structure-only rows,
   Sandbox default, no enable-on-empty. Owner **053**.
3. **No fake success (B-1.\*)** — 044 (Modal/Drawer) + 056 will add real fields behind today's gates. The Save must stay
   `backendRequired`; the confirm-first delete must not become one-click. Owner **044/056**, delivery **055**.
4. **PII / anti-poaching (B-4.\*)** — 043 owns the standing refusals (WhatsApp insights, guardian contact on teacher
   surfaces, group certificate delivery, children map). Owner **043**.
5. **a11y + console gates (B-7.\*)** — machine-gated now; 044/045-050 must not regress the focus-trap/Esc/return contract
   or reintroduce console errors. Owner **044 / 045-050 / 057**.
6. **Route/orphan/nav freeze (B-8.\*)** — Spec 041 froze this; 057 re-freezes. Owner **057**.

---

## Caveats — where the "we are better" narrative is NOT yet true (do not over-claim)

- **C-1 (real, active defect):** the standing claim *"planned = 0 / no dead control sitewide"* (B-5.2) is TRUE only for
  the ADMIN nav census. `teacher-portal.html` (+ `.en`) renders **7 «قريبًا» quick tiles** (`.pt-qtile.is-planned` /
  `.pt-qtile-soon`) for pages that Spec 025 already BUILT and that the same page's sidebar links to — a dead control AND
  a visual lie. Proof: `pages/teacher-portal.js:33-35` vs `fixtures/portal.js:159-168`; `grep -c قريبًا teacher-portal.html
  = 7`, `family-portal.html = 0`, `student-portal.html = 0`. The sitewide census missed `.pt-qtile-soon`. This is the one
  place we are *worse than our own standard* (family/student were fixed in Specs 019/020; teacher was never fixed).
  **Owner: 045-050** (a one-expression corrective mirroring `family-portal.js:42`). Do NOT cite the teacher portal as an
  example of "no dead controls" until this is closed.
- **C-2:** there is no `404.html` in `public/` (115 pages, none is an error page). We have in-page `states.js` only. The
  legacy had a real branded 404. This is a genuine legacy capability we do NOT yet match. **Owner: 057** (B-9.10).
- **C-3:** the static unread dot on the admin bell (`topbar.js:39`) + placeholder notification rows read as a live feed
  in a static frame. Honest-adjacent but should be removed/made honest. **Owner: 055** (notification engine).
- **C-4:** the dashboard/sessions table footer pager (`1|2|3`, "showing 5 of 24") is inert and looks functional — a
  silent dead control (C01-33). Either wire it or make it an honest "showing N of N". **Owner: 044/056.**
