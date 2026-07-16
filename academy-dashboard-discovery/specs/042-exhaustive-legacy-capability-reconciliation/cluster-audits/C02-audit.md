# C02 — Teachers · Capability Reconciliation Audit (Spec 042)

**Cluster**: Teachers — 109 unique legacy pages (the largest module)
**Current surfaces**: `teachers` · `teacher` · `teacher-performance` · `teacher-portal` · `teacher-schedule` ·
`teacher-students` · `teacher-outcomes` · `teacher-tasks` · `teacher-reports` · `teacher-library` · `teacher-profile`
**Method (honest)**: **56 screenshots opened AS IMAGES** (40 legacy · 16 current) · **34 raw records read**
(31 `pages/*.json` across admin+teacher roles · 2 `text/*.txt` · the C02 path list) · full read of the current
teacher source tree (`pages/teachers.js`, `pages/teacher*.js`, `components/teacher-actions.js`,
`fixtures/portal.js`, `nav.config.js`).
**Baseline**: HEAD `de8d552` · 115 public HTML · admin menu 50 · planned 0 · sole lock `classSalaryReport`.

---

## 0. Scope correction — ~20 of the 109 "Teachers"-tagged records are NOT teacher pages

The legacy module tagger over-collected. Recorded so the parent does not double-count:

| Legacy records | Real subject | Real owner in our product |
|---|---|---|
| `management-admins*` (12: list · create · 6/7-edit · duplicate · appear · categories · permission) | **Staff/admin accounts** | `staff.html` (Spec 031) → cluster C12 |
| `management-new-requests-filter-teacher…` · `…scheduled-trials-completed…` | **Leads / trial requests** | `leads.html` (Spec 034) → C11 |
| `management-public-advertisement` | Announcements | `announcements.html` (Spec 034) |
| `management-public-holiday` | Holidays | `public-holiday.html` (Spec 026) |
| `management-staff-salaries` | Payroll | `finance.html#view=salaries` (Spec 038) → C07 |
| `management-settings-integrations-whatsapp-teachers-insights` | Privacy-sensitive WhatsApp export | **Spec 043** (kept in this ledger as a rejection, §4) |

Also **~60 of the 109 records are pure query-string permutations** of `management/teachers` (7 `sort_by` keys ×
2 directions × 5 scopes: active/inactive/incomplete/unconfirmed/deleted). They are **two** capabilities
(sort · scope), not sixty.

---

## 1. What the legacy actually had — raw-record proof (not summaries)

### 1.1 Add/Edit Teacher is a **57-field** form (edit twin = 54)
`output/roles/admin/pages/management-teachers-create.json` → `POST /management/teachers`, **57 fields**, six
sections visually confirmed in `management-teachers-create-full.png`: Main · Location · **Salary** · **Zoom** ·
Additional · **Payout details**.

- **~26 legitimate fields**: `send_info`, `first_name`, `last_name`, `first_name_ar`, `last_name_ar`, `email`,
  `user_name`, `national_id`, `phone`, `alt_phone`, `member_id[]` (category membership), `birth_date`, `gender`,
  `status`, `group_name`, `country_id`, `city_id`, `timezone`, `timezone_diff`, `is_free_meeting`, `course_id[]`,
  `level[]`×3, `age_student[]`×3, `notes`, `cv_file`, `cv_certificates`.
- **15 pay fields**: `currency`, `fixed_salary`, `salary_type`, `hour_rate`, `fine_per_hour`, `payout_method`,
  `paymob_issuer`, `paymob_wallet_phone`, **`paymob_bank_card_number`**, `paymob_bank_code`, `paymob_full_name`,
  `payoneer_payee_id`, `payout_email`, `payout_notes`.
- **9 credential fields**: `password`, `zoom_email`, **`zoom_password`**, `zoom_meeting_link`, `zoom_passcode`,
  `zoom_id`, `zoom_account_id`, `zoom_client_id`, **`zoom_client_secret`**.

**Ours** (`teachers.html#view=add`, verified in `teachers__en__light__desktop__sp041-add-en.png`) renders
**13 controls** + a CV upload GATE + one gated Save. 13 against ~26 safe fields ⇒ **PARTIAL, never COMPLETE**.
Missing and safe to build: username · national ID · alt-phone · birth date · gender · timezone + offset ·
category membership · teaching-age bands · multi-level / multi-course selection · "send credentials" toggle ·
free-trial-meeting toggle · a separate certificates slot.
Our edit drawer `trn-edit` (`teacher__ar__light__desktop__sp032-trn-edit.png`) renders **11** controls.

### 1.2 The teacher profile has a **Settings tab we have not built at all**
`management-teachers-1.json` + `management-teachers-1-006-page-interaction-006.png` prove four separate forms:

| Legacy endpoint | Controls |
|---|---|
| `POST teachers/1/location/update` | country · city · timezone · timezone_diff (**4**) |
| `POST teachers/1/preferences/update` | parent language · **password reset method** · WhatsApp private/group (**3**) |
| `POST teachers/1/capabilities/update` | **`can_chat` · `can_see_library` · `can_edit_schedule` · `can_edit_class`** (**4**) |
| `POST teacher/teacher-notifications/1` | 4 categories × 2 channels (**8** booleans; one row is `salary_*`) |

The **capabilities block is a real per-teacher permission model** — it is what governs the teacher portal's own
chat / library / schedule-edit / class-edit. We render **zero of these 15 controls anywhere**. This is the single
largest structural gap in C02, and it is *not* a pay/privacy rejection — it is genuinely MISSING. Because
"hiding a link is not authorization", it must land with **043** (role isolation) + **056** (forms audit).

The detail page also carries a **`Left Students` / `Acquired Students`** pair of tables
(`management-teachers-1-full.png`) — teacher-attribution / anti-poaching tracking. We have no equivalent → 043.

### 1.3 The teacher-role app is far deeper than our portal (raw records, `output/roles/teacher/pages/*.json`)

| Legacy write | Endpoint | Controls | Ours |
|---|---|---|---|
| End class | `POST /teacher/classes-end` | remark(req) · summary(req) · homework(req) · notes · `images[]` file = **5** | `teacher-outcomes.js`: the same 5 rendered as **read-only cards**, **0 inputs**, save = gate |
| Mark class absent | `POST /teacher/classes-absent` | `video` file · notes = **2** | **0** — no surface |
| Request cancel / auto make-up | teacher-home modal "Request Cancel" | type radio (Reschedule ‖ Auto Make-up) · date/month/year/time/hour/minute = **11 inputs** | **0** — no request form (admin inbox exists) |
| Edit class | `POST /teacher/edit-class` | date/month/year/time/hour/minute · `sendMessage` · `duration` = **12 inputs** | **0** (and it is capability-gated in legacy by `can_edit_class`) |
| Monthly student progress report | `POST /teacher/student-progress` | **30 inputs** / 9 question groups (month · achievements · learning_progress×4 · focus×4 · homework_completion×4 · punctuality×4 · rescheduled_sessions×4 · additional_support · learning_objectives) | `teacher-reports.js`: **5 display labels**, 0 inputs |
| Request certificate for a student | `POST /teacher/certificate-request` | student · course · description · date = **4** (+ the honest note *"This request will be sent to management for approval and template selection"*) | **0** — no teacher-side surface |
| Own profile edit + password | `POST /teacher/profile-edit` (4) + `POST /teacher/update-teacher-password` (3) | **7** | `teacher-profile.js`: **0 inputs**, 3 honest gates |
| Library browse | `GET` search + category filter | **2** filter controls | `teacher-library.js`: 3 cards, **0** filter controls |
| Chat | `/teacher/chat` (contacts · groups · leave-group) | — | **no chat page, no nav item** (Spec 024 B-06 recorded, deferred) |

Every one of our writes is an honest `backendRequired` gate — the no-fake law is upheld — but **the data-capture
UI does not exist**. Per the Spec-042 rule ("a 3-field form standing in for a 20-field workflow is PARTIAL"),
these are PARTIAL/MISSING, not complete.

---

## 2. THE DEFECT — the teacher home advertises its own live pages as «قريبًا»

`app/src/js/pages/teacher-portal.js:33-36`:

```js
function quickTiles(role) {
  return `<div class="pt-qtiles">${ROLE_NAV[role].filter((e) => e.id !== 'home').map((e) =>
    `<div class="pt-qtile is-planned">…<span class="pt-qtile-soon">${esc(t('prt.nav.soon'))}</span></div>`).join('')}</div>`;
}
```

It stamps `is-planned` + «قريبًا» on **every** tile unconditionally. But all 8 `ROLE_NAV.teacher` entries are
`status: 'implemented'` (`fixtures/portal.js:159-168`) and every page is built. `family-portal.js:42` and
`student-portal.js:39` branch on `e.status === 'implemented'` and emit a real `<a href>` — they received the
Spec-019/020 "quick-tiles honesty fix"; **the teacher home never did**, even though Spec 025 shipped the 7 pages
and flipped the nav.

**Visually confirmed** in `app/screenshots/teacher-portal__ar__light__desktop.png`: the «روابط سريعة» band shows
**7 tiles, each with a «قريبًا» pill**, while the sidebar next to them links to the very same pages. This is a
*false planned claim on a live surface*; it survives the "planned === 0" census only because that census reads the
ADMIN `nav.config.js`, not the portal home body. Fix by mirroring the other two homes — **do not weaken a test**.

---

## 3. Things we do BETTER — preserve, never "fix back"

| # | Legacy | Ours | Why ours is right |
|---|---|---|---|
| I-1 | Teacher home banners **`Your Salary 997.00 EGP · Estimated 1,537 · Fines 1,003 · Bonus 2,000`** and tints the class row `(3.00 Fine)` (`teacher-home-full.png`); a whole second rail = *Salaries · Salary Class Report* (`teacher-salary-full.png`: Fixed/Attended/Fine/Gift/Hour Rate/Total) | Teacher portal **pay-free globally**, three-layer enforced | Teacher pay-free GLOBAL law (016/025/028) |
| I-2 | Monthly Performance = a computed **`Percentage`** per teacher (`management-teacher-feedback-full.png`); Classes KPI = **`0%`** per session (`management-class-feedback-…-full.png`); home hero shows **`Attended Percentage 0%`** | Categorical chips (على المسار · قيد المتابعة · يحتاج عناية) + authored counts (`teacher-performance…sp036-sessions-kpi.png`) | No computed score/rank/percentage (029/036) |
| I-3 | Teacher Tasks renders a **donut chart** + a **Staff Members … Average** table *to the teacher* (`teacher-tickets-full.png`) | Display-only task cards; no chart, no average, **no staff table** | No chart engine + no cross-role staff leak |
| I-4 | Teacher card shows a 0-star **rating** widget (`management-teachers-1-full.png`) | `rating` stays in the fixture, **unsurfaced** | No computed rating (Spec 028) |
| I-5 | `Login as <teacher>` — one click, no confirm | Honest disabled gate (`trn.reason.loginAs`) | Impersonation needs real auth |
| I-6 | Directory = dense sortable table with raw phone/email | Card grid + labeled status/workload/availability chips + counts | Academy identity, scannable |
| I-7 | Three sidebar items all pointed at `teachers.html` | Three real destinations (`#view=add`, `#view=categories`) | Spec 041 D-1 |
| I-8 | All-teachers timetable = its own page | Folded into `schedule.html` teacher lens + the schedule-requests inbox (`schedule__ar__light__desktop__teacher.png`) | Spec 028/026 — 0 new pages |

---

## 4. Must-NOT-copy (rejections, with exact evidence)

- **REJECTED_PAY_FREE** — `fixed_salary`/`hour_rate`/`fine_per_hour`/`currency`/`salary_type` +
  `management-teachers-1-compensations-create.json` (`type=Fine|Bonus`, `amount`) ·
  `management-teachers-1-004-page-interaction-004.png` (Compensations Fine 1000 / Bonus 2000 + **Class
  Deductions**) · the detail literal **"Hour Rate: 120 EGP"** (`management-teachers-1-full.png`) ·
  `teacher-salary-full.png` · `teacher-salary-class-report-full.png`. Settled by the Spec-028
  pay-finance-exclusion-register; `classSalaryReport` remains the **sole honest lock**.
- **REJECTED_SECURITY** — `password` on create/edit; the **8-field Zoom credential block** incl. `zoom_password`
  and `zoom_client_secret` (`management-teachers-create.json`); `Login as`, `Send Reset Password`
  (`management-teachers-1-full.png`); `paymob_bank_card_number` (a raw PAN field).
- **REJECTED_PRIVACY** — `management-settings-integrations-whatsapp-teachers-insights-full.png` exposes teacher
  **name + phone `201278910727` + a LIVE `chat.whatsapp.com/HNeGQ2J7HDzJAHmLKyIcIK?...` group-invite URL +
  username `msadeqx9`**; the same live invite URL is printed on the teacher contact card
  (`management-teachers-1-full.png`). Also the teacher-role Tasks page exposes a **Staff Members** performance
  table to a *teacher* (`teacher-tickets-full.png`) — a cross-role leak. All → **Spec 043**.
- **REJECTED_NO_FAKE** — computed `Percentage` (teacher-feedback / class-feedback), the `Average` column on the
  teacher tasks board, `Attended Percentage 0%`; and the **`teachers_details` report page carries a
  `_method`-spoofed DELETE form against `teachers/1`** (`management-teachers-details.json`) — a destructive write
  on a read-only report.

---

## 5. Cross-role gaps (the consumer exists, the producer does not)

1. **Certificate request** — legacy TEACHER creates it (4 fields); ADMIN approves. Our **admin queue exists**
   (`certificates.html#view=requests`, Spec 031/039) — but there is **no teacher-side request surface**. We ship
   the inbox with no letterbox. → **055** (+ 044 for the form).
2. **Reschedule / make-up request** — legacy TEACHER submits an 11-input request; ADMIN triages. Our **admin inbox
   exists** (`schedule.html` → «طلبات الجدولة الواردة» with قبول/رفض) — the teacher portal has **no request form**.
   → **055**.
3. **Monthly progress report** — legacy TEACHER submits 30 inputs; FAMILY reads it (`family-progress.html`) and it
   is approved downstream (`teacher-monthly-plans/mq==/show` shows a `View | Approve` column — *whose* approval is
   **not provable from the crawl**, see §7). Our family read surface exists; the teacher **write** surface is 5
   display labels. → **056** + **055**.
4. **Teacher capabilities** (`can_chat`/`can_see_library`/`can_edit_schedule`/`can_edit_class`) — the ADMIN toggle
   does not exist, so the portal features it should govern are **ungoverned**. → **043**.
5. **Per-teacher notification matrix** — admin controls how the teacher is notified (4×2). No surface. → **043/056**.

---

## 6. Visual verdict

Our teacher surfaces read as a modern academy (warm cream, rounded cards, labeled icon+text chips, RTL-first) and
are a clear improvement on the legacy Bootstrap-ERP look. Three visual items:

- **`teacher.html` banner action row overflows.** `components/teacher-actions.js:108-126` emits **14 buttons** in a
  single flex row; in `teacher__ar__light__desktop.png` the last one («حذف») is **clipped at the viewport edge**.
  → **Spec 044** (modal/drawer/long-form interaction system) or the 045–050 page-review groups.
- **`teachers.html` summary card «متوسط الإشغال ٦٣٪» is computed at render** (`pages/teachers.js:91` —
  `Math.round(rows.reduce((a, r) => a + r.util, 0) / rows.length)`). It is a *workload utilization* average, not a
  performance score, and Spec 007 authored it — but it is the only runtime-computed percentage on a teacher
  surface and sits one inch from the "no computed percentage" law. **Flagging for an explicit ruling** (authored
  literal vs computed); not calling it a violation.
- The teacher portal's **7 «قريبًا» quick tiles** (§2) are a *visual* lie as much as a code bug.

---

## 7. Unknown / unprovable from the corpus (never guessed)

- Who **approves** a monthly plan (`View | Approve` on a *teacher*-role page, table empty). Teacher self-approval
  would be nonsense; parent-name column hints at admin or guardian. → **UNKNOWN_EVIDENCE**, owner **055**.
- `/teacher/session-class-room/mq==/2` **redirected to the home page** in the crawl
  (`teacher-session-class-room-mq-2-full.png` is byte-equivalent to `teacher-home-full.png`) — the live-classroom
  UI was never captured. Only the `Enter class` / `Enter Again` entry points are proven. → **UNKNOWN_EVIDENCE**,
  owner **054**.
- The teacher-home row kebab exposes **`Send Reminder`** and **`Running`** (`teacher-home-002-…png`); the target
  endpoints are not in the record. → **UNKNOWN_EVIDENCE**, owner **055**.

---

## 8. Owner roll-up

| Owner | What lands there |
|---|---|
| **043** Privacy / role isolation / anti-poaching | WhatsApp teacher insights (phone + live invite URL) · teacher-visible Staff Members table · the missing **capabilities** permission model · the notification matrix · Left/Acquired-students attribution |
| **044** Modal/drawer/long-form system | End-class capture · monthly-report long form · reschedule/cancel request · edit-class · `teacher.html` action-row overflow |
| **045–050** Page review + academic redesign | teacher-portal quick-tiles honesty fix · teacher-students / teacher-library depth · directory sort/scope/pagination |
| **053** Integrations command center | Zoom meeting provisioning (never the credentials) |
| **054** Embedded virtual classroom | "Enter class room" / live session lifecycle |
| **055** Cross-role propagation | certificate-request → admin queue · reschedule-request → admin inbox · monthly report → family/admin · send-reminder |
| **056** Forms & data-capture audit | Add/Edit-teacher completion (13 → ~26) · all teacher-portal write forms · own-profile edit |
| **051** Community/moderation | teacher chat (contacts/groups) |
| **Never** | salary/compensation/payout/hour-rate figures · zoom + login passwords · impersonation · computed % · live WhatsApp invite URLs |
