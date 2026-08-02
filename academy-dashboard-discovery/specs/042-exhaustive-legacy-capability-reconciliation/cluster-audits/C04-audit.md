# C04 — Families / Guardians — Capability Audit (Spec 042)

**Honest method count**: **37 screenshots opened AS IMAGES** with the Read tool (27 legacy admin,
10 current-app) · **26 raw records inspected** (10 legacy `pages/*.json`, 14 current-app source
files, 2 prior-spec artifacts). Every field/route/state below is proven from an image or from the
raw JSON record — never from a planning summary.

**Legacy scope**: the 31 admin pages listed in `C04-paths.md`
(`/management/families*`, `/management/families/status/*`, `/management/families/feedback*`,
`/management/categories/families*`, `/management/family/feedback-categories*`,
`/management/settings/integrations/whatsapp/families/insights`).
`output/combined/role-permission-matrix.md` proves the module is **admin-only**
(`Parents / Guardians / Families | admin: yes (31p) | family: — | teacher: —`); the guardian's own
`/student/*` login pages are tagged to other modules and owned by other clusters — they appear here
only as **cross-role consumer surfaces**.

---

## 1. What the legacy actually is (proven)

### 1.1 Families list — `/management/families` (+ 7 status lenses)
From `management-families-full.png`, `-002`, `-003`, `-004` and `management-families.json`:

* **7 status KPI tiles** — On Trial · Incomplete · Active · Stopped · Suspended · Inactive ·
  **Deleted** — each `N (P %)` with a bar. Seven sibling routes `/management/families/status/<s>`
  render the SAME board retitled ("Deleted Families" — `management-families-status-deleted-full.png`).
* **12-column table**: `# · Family name (+email) · Phone number (masked) · Join Date · User Name ·
  Course Type · No. Children · Country · Hour Rate (6 EUR / 6 GBP) · Total Hours · Returned date ·
  Actions`.
* **Row kebab (3 items)**: Show Details · Edit `<name>` · Delete `<name>` (`-002`).
* **Collapsible Filter panel — 31 raw fields / 7 facets** (`-003` + the `families/index/filter` GET
  form): `hour_rate` + comparator (`<`/`>`/`=`), `children_no` + comparator, `is_post[]` (Post/Pre),
  `cost_type[]` (Fixed/Variable), `course_types[]` (4), `payment_methods[]` (1), `currency[]`
  (**16** currencies) + Submit.
* A **Range** date filter, a **Create** button, and an inline `update-returning` modal
  (`returned_at` + `note`).

### 1.2 Family detail — `/management/families/{id}` — 7 tabs, 22-row info panel, 7 actions
From `management-families-1-full.png`, `-003`…`-011` and `management-families-1.json`:

* **Action list (7)**: Edit · **Send Reset Password** · Deactivate · Suspend · Stop ·
  **Schedule Stop on Date** · Delete — plus a **"Login as abdo ahmed"** impersonation button.
* **Info panel (22 rows)**: Username · Phone (masked, copy) · E-mail · Birth Date · Join Date ·
  Gender · Whatsapp Group · Address · Timezone · Time difference (UTC) · Time difference (Localtime)
  · Auto Renew · Payment Method · Invoice Type · **Total Fees 72 EUR** · **Hour Rate 6 EUR** ·
  Total Hours 12 h/month · Course Type · Invoice Day · Session Day · Notes (+ 2 KPIs: Total Hours,
  Family Members).
* **Tabs (7)**:
  1. **Children** — `Student · Status · Teacher Name · course details · Subscription (5 H) · Options`
     + **Add New Child**.
  2. **Billing** — `Billings & Invoices` (`Payment Id · Payment Date · Due Date · Amount · Status ·
     Actions`) + **Create Invoice** + a **Deleted Invoices** table; the baked `editUser` modal is a
     **"New Transaction"** record-payment form (`transaction_id · date_payment · invoiceID · basic ·
     additional · taxes · total · currancy · getway`) — a **payment gateway**.
  3. **Invoice Adjustments** — `# · value · invoices_count · Type · invoices · Note · Actions` +
     *Add New Adjustment* (`type · amount · count · note`) + per-row Edit/Delete.
  4. **Credits** — `session · Student · Teacher · Duration · Actions` (`00:00 (0)`).
  5. **Profile Activity** — an **audit timeline** (`18th June 2026 · 02:30 PM · mohamed updated
     country_id, city_id & timezone` + *Show Details*).
  6. **Student Feedback** — `Meeting Date · Meeting Time · Meeting Manager · Family Members ·
     Status` + *Show More*.
  7. **Settings** — four write panels (`-008`):
     * *Update Location* (4): Student Country\* · Student city\* · Timezone\* · Time difference\*
     * *Preferences* (**7** — the 7th is off-screen but present in the raw form): Parent Language ·
       Auto Add Credit to Invoice · Password Reset Method · Send WhatsApp messages to · Renew Unpaid
       Courses · Send Invoice · **`stop_after` "Stop course after number of unpaid invoices"**
     * *Capabilities* (2): **Chat\*** · **Library\***
     * *Profile Notifications*: a **7 × 2 matrix** (invoices · Invoices Reminders · Class Reminders ·
       Class Updates · Courses Update · Certificates · Family Status) × (WhatsApp · E-mail) =
       **14 checkboxes** + Save changes / Discard.
* **Lifecycle modals**: *Suspended Family* (`Returned date (Student time)` + `Schedule auto-return`
  + `Note*`, with an accrued-debt warning) · *Stop Family* (`Note*`) · *Schedule Stop Family*
  (`Scheduled Date*` + `Returned date` + auto-return + note → posts to `/management/scheduled-actions`)
  · *Activate*.

### 1.3 Create / Edit family
`management-families-create-full.png` + the raw `POST /management/families` form = **32 user-facing
controls** in 4 sections (37 raw fields incl. `_token`):
Main info (`send_info` toggle · first/last name · first/last name **in Arabic** · `user_name` ·
**`password`** · `member_id[]` category members · multi-`emails` · multi-`phones` · birth_date ·
join_at · gender · status · whatsapp group name) · Location (country · city · timezone ·
timezone_offset) · **Payment** (courses renew · create invoice · payment type · payment method ·
**currency ×16**) · **Courses** (course_type radio ×4 · **hour_rate\*** · **total_hours\*** ·
automatic fees % · invoice_day\* · session_day\* · invoice cost type\* · notes).
Edit (`management-families-1-edit-full.png`) = the same minus Location (moved into Settings), with a
"there are courses currently running, so you cannot change the course type or the number of hours"
lock — and it renders the **real phone `01154859653` UNMASKED**.

### 1.4 Family categories — `/management/categories/families`
Table `# · Name · Description · Status · Count · Settings(kebab)` + **Create category**
(`name · status · description`) + `/{id}/edit` (same 3 fields) + `/{id}/assign` → *Choose Families*
= one `member_id[]` multiselect + Submit.

### 1.5 The parent-meeting "Student Feedback" pipeline (the biggest missed capability)
`management-families-feedback*.json` + screenshots prove a real workflow:
* `/families/feedback/students` — a **Parents** board (5 status tiles + search) with
  `Name · Status · Last Feedback · Next Meeting · Meeting Manager` and a kebab
  (**Show Details · Add Meeting Date**).
* Schedule form: `family_id · date · user_id (Manager)`.
* `/families/feedback` — the meetings queue (`Parents · Manager · Meeting Date · Meeting Time ·
  Meeting Manager · Status`) with modals: **Edit** (meeting date) · **Add Notes** (`feedback`
  textarea) · **Add Report** — a **4-textarea per-student report**: *Curriculum Followed* ·
  *Expected Outcomes after 4 Months* · *Student's Level and Any Notes* · *Student Current
  Achievements* — · **View Report**.
* `/family/feedback-categories` (+ `/create`) — `name · status · description`.

### 1.6 WhatsApp families insights
"Names of Null groups — check out which families are not connected to whatsapp":
`Family name · Phone number · Group Name · Status` with **UNMASKED real phones**
(`01154859653`, `441200480244`). Explicitly excluded by Spec 040 → Spec 043.

---

## 2. What we have today (proven from source + current screenshots)

* `families.html` — 3 summary cards (total/active/attention) · 2 tabs (Directory · **Categories**,
  Spec 037) · a `filterBar` = **search + 2 selects** (status, category) · family-as-hero cards with a
  **5-item kebab** (View · Edit · Reclassify · Suspend · Stop) · the `fam-edit` + `fam-cat` drawers
  baked once.
* `family.html` — banner (status + category + 4 KPIs) · **4 actions** (Edit · Add child · Suspend ·
  Stop) · **5 tabs** (Overview · Students · Schedule · Plan & Billing · Notes).
* Drawers: `fam-edit` (**9 fields**) · `fam-child` (**7**) · `fam-note` (**1**) · `fam-cat` (1 inert
  select + a member-count list + a gated Save).
* `add-family.html` — a **5-step wizard**: identity (4) · contact (5) · children (3 rows × 3 = 9) ·
  billing (3: planType · hourRate · cycle) · review. **21 controls, 12 of them family-level.**
  Save = an honest `backendRequired` modal (`wizard.js`).
* Family **portal** (`family-portal`, `-children`, `-schedule`, `-progress`, `-billing`,
  `-requests`, `-materials`, `-profile`, `family-child`) — living, display-only, **zero forms**,
  **zero currency figures** (billing = hour quota 40/12/28 + status-only invoice rows + gates).
* `reports.html` — the Spec-029 feedback board carries a **family lens** (3 authored family rows, 2
  in a "meeting" category), a 5-field create-feedback drawer and a 3-field feedback-category create
  form.

---

## 3. Headline findings

1. **The family record is a CONTRACT record in the legacy and a CRM card in ours.** Legacy create =
   **32 controls**; our wizard = **12 family-level controls**. The whole *Payment* + *Courses*
   contract block (course type · hour rate · total hours · automatic fees · invoice day · session day
   · invoice cost type · currency · payment method · invoice type · auto-renew · create-invoice) is
   absent except one `hourRate` field. Largest field-level deficit in the cluster.
2. **The entire family *Settings* tab is missing** — location, the 7 preferences (incl. the
   `stop_after` unpaid-invoice stop threshold), the 2 **capability toggles (Chat / Library)** and the
   **7 × 2 notification matrix**. The capability toggles are *cross-role*: they gate what the family
   portal shows; our portal has no corresponding switch, so those guardian surfaces are
   unconditionally on.
3. **The parent-meeting feedback pipeline is missing** (schedule a meeting with a manager, log notes,
   write the 4-part per-student report). Our family portal ALREADY advertises "لقاءات المتابعة" with
   an empty state + a planned card — a **consumer surface with no producer**.
4. **Lifecycle is half-built.** Suspend/Stop are field-less confirms (legacy: date + auto-return +
   mandatory note). Deactivate, Activate, Schedule-Stop-on-Date, Delete, the Deleted/Incomplete
   statuses and the returning-date update are entirely absent.
5. **Correct refusals to preserve**: no `password`/`user_name` on any family form; no "Login as"
   impersonation; no reset-password send; no payment-gateway "New Transaction" form; no unmasked
   phone anywhere; the family portal stays zero-pay; teacher surfaces carry **no** guardian contact
   (anti-poaching — `teacher-students.js:6`). Every one is a deliberate, law-backed improvement —
   do NOT "fix" them back. (Login-as / reset-password were already settled as `future-backend` by
   Spec 027 row **M-U**; billing persistence by row **M-Q** → Spec 030.)
6. **Long-form pressure on the drawer system**: a faithful family create/edit is a 32-control,
   4-section form. Our `fam-edit` drawer is a narrow single-column sheet
   (`family__ar__light__desktop__sp032-fam-edit.png`). Spec 044 must choose the long-form host
   BEFORE Spec 056 tries to complete the fields.
7. **Visual identity is good** — the families grid and the family portal read as a warm, cheerful
   academy, not a corporate ERP. No redesign needed; only the *Categories* board (a flat card grid
   with no per-row actions) and the sparse 3-tile summary strip (vs 7 legacy status tiles) deserve a
   second look in the 045–050 visual groups.

---

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
| --- | --- | --- | --- | --- |
| C04-01 | Families directory board (7 status KPI tiles + 7 status lens routes + 12-column table vs 3 summary cards + hero cards) | PARTIAL | 045-050 | §1.1 + Finding 7 |
| C04-02 | Advanced filter panel (31 raw fields / 7 facets incl. hour_rate, children_no, cost_type, course_types, payment_methods, 16 currencies) vs search + 2 selects | PARTIAL | 056 | §1.1 + Finding 1 |
| C04-03 | Directory row kebab actions (legacy Show/Edit/Delete vs current 5-item kebab without Delete) | PARTIAL | 056 | §1.1 + Finding 4 |
| C04-04 | Update-returning modal (returned_at + note) | MISSING | 056 | §1.1 + Finding 4 |
| C04-05 | Family detail info panel & tab set (22-row panel / 7 tabs vs banner + 4 KPIs / 5 tabs) | PARTIAL | 056 | §1.2 + Finding 1 |
| C04-06 | Billing & invoices tab (invoice list, Create Invoice, Deleted Invoices; persistence) | FUTURE_BACKEND | 030 | §1.2 + Finding 5 (Spec 027 row M-Q) |
| C04-07 | "New Transaction" payment-gateway record-payment form (transaction_id/taxes/total/getway) | REJECTED_NO_FAKE | — | §1.2 + Finding 5 |
| C04-08 | Invoice Adjustments tab (value/count/type/note + per-row Edit/Delete) | MISSING | 056 | §1.2 |
| C04-09 | Credits tab (session/student/teacher/duration) | MISSING | 056 | §1.2 |
| C04-10 | Profile Activity audit timeline (who changed what, when) | FUTURE_BACKEND | 055 | §1.2 |
| C04-11 | Family Settings tab — Update Location (4) + Preferences (7 incl. stop_after unpaid-invoice threshold) | MISSING | 056 | §1.2 + Finding 2 |
| C04-12 | Capability toggles Chat / Library (cross-role gates on what the family portal shows) | MISSING | 055 | §1.2 + Finding 2 |
| C04-13 | Profile Notifications 7 × 2 event/channel matrix (14 checkboxes) | MISSING | 056 | §1.2 + Finding 2 |
| C04-14 | Lifecycle actions & modals (Suspend/Stop with date + auto-return + mandatory note; Deactivate · Activate · Schedule-Stop-on-Date · Delete; Deleted/Incomplete statuses) | PARTIAL | 056 | §1.2 + Finding 4 |
| C04-15 | "Login as" impersonation + Send Reset Password | REJECTED_SECURITY | — | §1.2 + Finding 5 (Spec 027 row M-U: future-backend) |
| C04-16 | Family create/edit contract form (32 user-facing controls; Payment + Courses block vs 12 family-level wizard controls) | PARTIAL | 056 | §1.3 + Findings 1, 6 |
| C04-17 | password / user_name credential fields on family forms | REJECTED_SECURITY | — | §1.3 + Finding 5 |
| C04-18 | Long-form host for the 32-control, 4-section create/edit (current fam-edit is a narrow single-column drawer) | PARTIAL | 044 | Finding 6 |
| C04-19 | Family categories management (create/edit/assign; current Categories tab is a flat card grid with no per-row actions) | PARTIAL | 045-050 | §1.4 + Finding 7 |
| C04-20 | Parent-meeting feedback pipeline (Parents board, schedule meeting with manager, Add Notes, 4-textarea per-student report, View Report — portal consumer exists with no producer) | PARTIAL | 055 | §1.5 + Finding 3 |
| C04-21 | Feedback categories CRUD (legacy name/status/description create; current reports.html 3-field create form) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | — | §1.5 + §2 |
| C04-22 | WhatsApp families insights board (null-group check) | MISSING | 043 | §1.6 |
| C04-23 | Unmasked real-phone PII porting (01154859653, 441200480244) | REJECTED_PRIVACY | — | §1.3 + §1.6 + Finding 5 |
| C04-24 | Anti-poaching: no guardian contact on any teacher surface (teacher-students.js:6) | INTENTIONALLY_IMPROVED | — | Finding 5 |
| C04-25 | Family portal zero-pay, display-only living cockpit (zero forms, zero currency figures) | INTENTIONALLY_IMPROVED | — | §2 + Finding 5 |
| C04-26 | Families grid + family portal visual identity (warm academy look; no redesign needed) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045-050 | Finding 7 |

Honest counts: screenshotsOpened=37 · recordsInspected=26 · currentSourceFiles=14
