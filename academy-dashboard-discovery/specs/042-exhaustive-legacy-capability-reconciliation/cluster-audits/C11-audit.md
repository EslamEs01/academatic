# C11 — Messages, Notifications, Leads — Capability Audit (Spec 042)

**Cluster**: C11 · **Legacy scope**: Messages / Notifications (5 legacy pages) · **Current scope**: `messages`, `announcements`, `leads`
**Method**: 26 screenshots opened AS IMAGES with Read · 31 raw records (page JSON / raw HTML / text / combined inventories / current source) inspected.
**Baseline**: HEAD `de8d552` · 115 public HTML · admin menu 50 · planned 0.

---

## 0. Evidence-boundary note (READ FIRST)

The C11 path list contains **5 legacy pages** (`management-chat`, `teacher-chat`, `management-public-advertisement`,
`management-settings-notification`, `management-family-feedback-categories-create`) but the **current** scope it names
includes **`leads`**. The legacy evidence for leads is `/management/new-requests*` — which the cluster generator tagged
into **C01 / C02 / C08 / C14**, not C11 (module-tag artifact, not a semantic decision). Because `leads.js` is squarely
in my current scope and cannot be audited without it, I **cross-read** the new-requests records:

- `output/roles/admin/pages/management-new-requests.json` (C08-tagged)
- `output/roles/admin/pages/management-new-requests-create.json` (C01-tagged)
- `output/roles/admin/pages/management-new-requests-filter-{pending,contacting,duplicat,no-response}-*.json` (C08)
- `output/roles/admin/pages/management-new-requests-scheduled-trials-index-status-3-4-*.json` (C14)

Whoever consolidates Spec 042 must **de-duplicate** these rows against C01/C02/C08/C14 — they describe the same
capability set. I flag this explicitly rather than silently owning or silently dropping them.

**Disposition convention used here** (stated so the ledger reads unambiguously):
- `COMPLETE_AND_VERIFIED` = the frontend **shell** is field-for-field complete vs the evidenced legacy control set AND
  the only missing piece is the (correctly gated) server. The `backendDependency` column names the engine.
- `PARTIAL` = the shell itself is thinner than the evidenced legacy surface (missing fields, missing filters, missing
  option sets, missing states).
- `FUTURE_BACKEND` = **no surface exists at all** in our product and one is legitimately owed.
- `MISSING` = a legacy capability with a real surface that we simply do not have and that is not merely a backend gate.

---

## 1. Messaging / Chat

### 1.1 What the legacy actually is (proven, not summarised)

`management-chat` is **not** a static list — it is a **live MQTT chat client**. From
`output/roles/admin/html/raw/management-chat.html`:

```
const userId = 6; const userType = "0";
class MQTTManager { ... connect(brokerUrl, options) { this.client = mqtt.connect(brokerUrl, options); ... } }
mqtt.connect("ws://localhost:8083/mqtt", { clientId: userId + '-' + currentToken, clean: true, ... })
mqttManager.publish(`user/1/${id}`, ...)   // topic namespace: user/{userType}/{id}
mqttManager.publish(`user/2/${id}`, ...)
// docstring example broker: 'wss://test.mosquitto.org:8081'   ← a PUBLIC test broker
```

Message-level affordances present in the raw HTML: `sendMessage`, `attachemntsInput`, `attachFileBtn`, `attach-doc`,
`voice`/`voices` (voice notes), `seen` (read receipts), `Delete Message`, emoji classes. `POST /management/chat/loadMoreChats`
is the pagination endpoint. Full page screenshot shows the empty state **"Open chat from the list"** and a `+` (create group)
affordance next to the identity block.

**Modals (from `management-chat.json`, verbatim):**
| Modal | Fields | Buttons |
|---|---|---|
| `createGroupModal` "Create Group" | `name` (text), `bio` (text), `image` (**file**), `staff[]`, `teachers[]`, `students[]` (multi-selects) | Close, Submit |
| `addMemberModal` "Add Member" | `staffMember[]`, `teachersMember[]`, `studentsMembers[]` | Close, Submit |
| `offcanvasRight` (group settings) | image (**file**), `group-name` (text), `group-bio` (textarea) | Close, Save, Cancel, Confirm, **Leave Group** |
| `chat-sidebar` | Search Contact | Close |

**Teacher chat (`teacher-chat.json`) is a REDUCED variant** — proven: contact list + Search Contact + `offcanvasRight`
with **only** `Close` / `Leave Group`. **No `createGroupModal`, no `addMemberModal`.** Teachers can participate and
leave; they cannot create groups or add members. That asymmetry is real and must be preserved if we ever build it.

**The family/guardian role has NO chat at all.** Proven from `family/pages/student-home.json` `sidebarLinks`:
Home · Schedule · Classes Summary · Courses · Billing · Student Feedback · Library · Logout. No chat entry, no chat
page in `output/roles/family/pages/`. Families in the legacy could not message the academy.

### 1.2 What we have

`messages.html` (Spec 034) is a **display-only two-pane inbox**: searchable + status-filterable conversation list
(5 authored conversations), an inline thread pane with authored bubbles, a compose box whose **Send** and **Attach file**
are `data-disabled-reason` gates, per-conversation read-only thread sheets, and two `formDrawer`s (Create group / Add member),
each ending at exactly one backendRequired Save. `fixtures/control-center.js` `MESSAGES` — authored names, no PII.

### 1.3 Field-by-field

| Legacy control | Ours | Verdict |
|---|---|---|
| Contact list + Search Contact | conversation list + `msg.searchPh` search + status facet | **better** (we added a read/unread facet) |
| Open thread from list | `data-drawer="msg-<id>"` opens a **read-only sheet**; the inline pane is **hard-wired to `MESSAGES[0]`** (`messages.js:71 const c = MESSAGES[0]`) | **PARTIAL** — clicking a conversation does not switch the pane |
| Compose + Send | textarea + gated Send | shell complete, engine owed |
| Attach file (`attachemntsInput`, `type=file`) | **gate**, no `type=file` | correct (no-fake law) |
| Voice notes / emoji / delete-message / seen receipts | **none** | MISSING (unbuilt), engine-dependent |
| Create Group (6 controls) | 5 `field()` + 1 attach **gate** = 6 controls | **complete** (image→gate is the honest form) |
| Add Member (3 selects) | 3 selects | **complete** |
| Group settings offcanvas (image/name/bio/Save/Leave Group) | **none** | **MISSING** |
| `loadMoreChats` pagination | n/a (5 authored rows) | acceptable for a fixture shell |

### 1.4 REJECTED_SECURITY — the transport must never be copied

`ws://localhost:8083/mqtt` is **unencrypted**; the documented example broker is the **public** `wss://test.mosquitto.org:8081`;
the topic namespace is `user/{userType}/{id}` with the auth material carried as `clientId: userId + '-' + token`. There is
no ACL evident in the client. A naive re-implementation would let any subscriber on the broker read other users' topics.
Our constitution already forbids websockets/engines, so we are safe by construction — but this must be recorded so that a
future messaging spec (real backend) **designs its own transport and authorization** rather than porting this one.
**Owner: 043 (role isolation) for the topic/authz model + 054 (virtual classroom & realtime lifecycle) for the transport.**

### 1.5 Cross-role

- **Teacher**: legacy had a teacher chat page. Our teacher portal has **no messaging surface** (`ROLE_NAV.teacher` =
  home/schedule/students/outcomes/tasks/reports/library/profile). Spec 024 **B-06** already recorded "teacher chat → future
  (owner 025, no nav item)" and Spec 025 shipped **no** chat. That is a **settled deferral**, not a bug — but the consumer
  surface does not exist, so admin "Send" has nowhere to land.
- **Family**: no legacy chat, no current chat → parity. A family↔academy inbox would be a **new** capability (not a legacy
  restoration); the nearest existing surface is `family-requests`.
- **Student**: legacy chat groups accept `students[]` members, but the legacy has **NO student login** (Spec 021 DEC-001).
  Any student added to a legacy chat group could never read it. **Legacy defect — do not reproduce.** Our Create-group
  drawer keeps a students picker (grounded), which is fine for a shell, but a real build must resolve who reads a
  student-addressed message (answer per our role model: the **family/guardian**).

---

## 2. Notifications

### 2.1 Notification routing settings — the ONE thing we finished

`management-settings-notification` posts **47 real fields** (48 minus `_token`) to `/management/settings/notification/update`
across 9 groups: system master · in-app master · course-updates (teacher/family channel + Create/Edit/Status events) ·
class-updates (teacher 9 events / family 9 events — asymmetric by design) · class-reminders (channel + hours-before numeric +
3 event toggles per recipient) · invoice channel · invoice-reminder channel + days numeric · salaries channel · family-status
channel. The channel enum is `0/1/3/4/5` (Off · As Profile · whats App · E-mail · Private) — **value `2` does not exist**.

`app/src/js/fixtures/settings-notifications.js` (Spec 040) reproduces **all 47: 0 omitted, 0 invented** — 13 `field()`
(10 channel selects + 3 numerics) + 34 `data-toggle` local previews (5 masters + 29 events), 7 rendered sections, each with
its own backendRequired Save. The settings screenshot (`settings__ar__light__desktop__sp040-notifications.png`) confirms it
end-to-end. The class-status asymmetry (teacher carries *Teacher-absent* code 6; family carries *End-class* code 5) is
preserved as **law, not fixed as a bug**. `salaries` renders as `ntf-salEventsCh` — a **routing select with zero figure**
(teacher pay-free law upheld while still covering the legacy control). **COMPLETE_AND_VERIFIED. Settled by Spec 040 — do
not re-litigate.**

### 2.2 In-app notification inbox — PARTIAL + UNKNOWN_EVIDENCE

Every legacy admin page carries a topbar bell with a **count badge ("1")** and a **"See All Notifications"** submit control
(`combined/button-coverage.md` shows it on ~every route). **The destination page was never crawled** — there is no
`/management/notifications` record anywhere in `output/roles/*/pages/`. So the notification-inbox *list* is
**UNKNOWN_EVIDENCE**: I will not invent its columns, filters or actions.

Ours: `enhance.js:82 notificationsMenu()` — a popover with two static links (Sessions, Reports) and a gated
"view all" (`topbar.notifViewAllReason`), **no count, no unread dot**. That is honest and deliberately weaker than the
legacy (which showed a live count). Recording it as PARTIAL, owner **future-backend** (a real unread count needs a server)
with the list shape owed to a future spec once evidence exists.

### 2.3 Message Builder — a 504, already owned

`management-settings-customisation-message-builder.json` → `httpStatus: 504`, `title: "504 Gateway Timeout"`,
`isErrorPage: true`. **Zero usable evidence.** Spec 040 already routed it to **Spec 053** and explicitly refused to invent it.
Confirmed here; nothing further to add.

---

## 3. Announcements (Public Advertisement & Notification)

### 3.1 The legacy form, verbatim (`management-public-advertisement.json`, POST `/management/public-advertisement-submit`)

| # | Field | Type | Notes |
|---|---|---|---|
| 1 | `type[]` id=`dashboard` | checkbox | "Advertisement ( Will appear on the dashboard )" |
| 2 | `type[]` id=`whatsapp` | checkbox | WhatsApp channel |
| 3 | `private` | checkbox | "Send Private (Avoid sending more messages to prevent blocking)" |
| 4 | `message` | textarea | "Message (add link)" |
| 5 | `media[]` | **file (multiple)** | "Choose Media" |
| 6 | `expire_at` | text (YYYY-MM-DD) | "Expire At" |
| 7 | `category_selected[]` | select-multiple | teacher categories — options: Active / Deactivate / **محمد السيد** |
| 8 | `student_category_selected[]` | select-multiple | student categories — Active / Suspend / Deactive / On Trial / **المشرفه حسناء** / **المشرفه اسماء** |
| 9 | `country_id` | select-one | All / United Kingdom / Vanuatu |
| 10 | `hours` | select-one | All / **6** — an **audience facet by contracted hours**, NOT a time-of-day control |
| 11 | `language` | select-one | All / ar / en / fr / de / it / pt / ru / es / tr … |
| — | **List of Teachers** | table + **Select All** + per-row checkbox | recipient picking |
| — | **List of Students** | table + **Select All** + per-row checkbox | recipient picking |

= **11 form controls + 2 recipient pick tables**.

### 3.2 Ours (`announcements.js`)

7 `field()` (message · expire · teacher-category · student-category · country · hours · language) + 3 checkboxes
(dashboard-ad · whatsapp · private) + 1 media **gate** = **11 controls**. Plus: an authored announcement list with
status/channel/audience/expiry chips, a preview card, and two **read-only** recipient chip columns. Publish / WhatsApp /
Media are all `data-disabled-reason` gates. No `type=file`, no fake send.

### 3.3 The gaps (why this is PARTIAL, not complete)

1. **Recipient selection does not exist.** Legacy lets you tick individual teachers/students (or Select-All) — this is the
   difference between "broadcast to a category" and "broadcast to these five people". We render the recipients as
   **display-only chips** (`recipientColumn()` → `chip()`, no inputs). The *targeting* capability is absent.
2. **`country` / `hours` / `language` selects carry a single option** — `const oneOpt = [{ value: 'all', ... }]`
   (`announcements.js:83`). Legacy carries real option sets (country list, hours values, 10+ languages). Three stub selects.
3. **`ann.field.hours` is mislabelled "Timing" / «التوقيت»** (`en.ctrl.js:104`). The legacy `hours` select is an audience
   facet on **contracted hours** (options: All, 6) sitting between Countries and Language. Our label reads as a
   time-of-day/scheduling control. **Semantic drift — fix the label, do not fix the field away.**
4. **`expire` is a free-text field**, not a date control (legacy `expire_at` placeholder `YYYY-MM-DD`).
5. **No edit / delete / duplicate of an existing announcement** — the four authored cards are inert.

### 3.4 The consumer surface does not exist anywhere — the biggest cross-role gap in C11

The legacy checkbox literally says **"Advertisement ( Will appear on the dashboard )"**. In our product, **nothing renders
an announcement to anyone**: `grep -rn "announc|megaphone" pages/dashboard.js pages/*portal*.js` → **0 hits**. The admin can
compose an announcement whose entire purpose is to appear on family / teacher / student dashboards, and there is **no such
band on any of them, nor on the admin dashboard**. Composition surface ≠ delivered capability.
(The legacy role-home captures show no ad band either — but that is because no ad was live at crawl time, not because the
surface doesn't exist; the label is the evidence. I mark the legacy *renderer* UNKNOWN_EVIDENCE and the **gap** real.)
**Owner: 055 (cross-role propagation & workflow consistency).**

---

## 4. Leads / New Requests

### 4.1 Legacy

- **`/management/new-requests`** — "New Requests Statistics": a date-range filter (Range / Submit / Reset) over **~24 stat
  tiles**: 9 status cards (Duplicated · PENDING · Contacted · no response · Qualified · scheduled · Trial Taken · Trial
  Missed · Teacher, each with a *Show Details* deep-link) + **Converted (18) / Not Converted (10)** + Total Request +
  **Male/Female Teachers Requested (`0 % of requests`)** + Avg. Scheduling Time (`0H`, "0 % Faster than last month") +
  Pending Actions + Completed / Cancelled Trials + Total Teachers / Total Families / New Families This Month /
  **Avg. Families per Teacher** / **Requests Growth (Month Over Month) 0%** + Fastest Scheduling / **Top Performer** /
  Most Requests From / Most Requested.
- **`/management/new-requests/filter/<STATUS>`** — table `# · Date · Parent name · E-mail · Phone number · Status · Actions`
  + a **Create** button; modals: `showNewRequest` (detail) · `bs-example-modal-lg` "Notes List" · `bs-show-note-lg`
  "Add Notes" (`note` textarea) · `model-change-status` (`status` select) + an `update status` button.
  The 9 statuses are proven by the filter routes: `pending, contacting, no_response, qualified, teacher, trial_taken,
  trial_missed, duplicat` + `scheduled-trials`.
- **`/management/new-requests/create`** — **19 visible fields** (+ hidden Hour/Minute sub-inputs inside the trial-time
  picker): First Name* · Last Name · E-mail* · Main Phone* · Number of Friends · Classes Duration · How Did You Hear
  About Us? · Number of Classes · Parent Gender · Age · Parent Age · Language · Timezone · Trial Date · Trial Time ·
  Coupon Code · Parent Country* · Course Name* · Note.
- **`/management/new-requests/scheduled-trials/index?...`** → **HTTP 500, "Something went wrong, try again later"** on the
  status-3,4 and status-5,7,6 captures. The scheduled-trials board is **UNPROVEN**.

### 4.2 Ours (`leads.js`) — field-by-field

| Legacy | Ours | Verdict |
|---|---|---|
| Create form, **19** visible fields | **19** `field()` (`leads.js:128-148`) | **1:1** — `coupon` is a **code**, not a money figure (no-pay law intact) |
| `country_id` select (full country list) | free-**text** `lead-country` | acceptable degradation; option set not ported |
| `gender` / `language` selects | selects (`fopt.gender`, `lang`) | ok |
| List columns (Date/Parent/E-mail/Phone/Status/Actions) | card rows: parent · date · email · phone · status chip · source chip · View | ok (+ we added a **source** facet the legacy lacks) |
| **Date-range filter** (Range/Submit/Reset) | **none** | **PARTIAL** |
| Detail modal + Notes-List modal + Add-Note modal + Change-Status modal (4 modals) | **ONE** drawer holding all four: identity rows · students+age · notes log · Add-note mini-form · Change-status mini-form · Convert / Assign gates | **INTENTIONALLY_IMPROVED** (4 stacked bootstrap modals → 1 coherent drawer) |
| ~24 stat tiles incl. computed % / MoM growth / averages / "Top Performer" | **4 authored KPI cards** (18 / 7 / 9 / 5) | **PARTIAL**; the computed half is **REJECTED_NO_FAKE** (standing law: no computed score/rank/percentage) — a real conversion funnel needs the server |
| scheduled-trials board | none | **UNKNOWN_EVIDENCE** (legacy 500s) |

### 4.3 Lead → family conversion

Our detail drawer offers **«تحويل إلى عائلة» / "Convert to family"** and **"Assign follow-up"** as gates. The legacy shows
**Converted / Not Converted** counters, so a conversion workflow certainly existed — but **no convert control was captured**
in any new-requests record (`buttons` = Create, update status, Filter, Reset, Submit). The *form* and *destination* of the
conversion are therefore **UNKNOWN_EVIDENCE**. The consumer surface (`families.html` / `add-family.html`) **does exist**,
which is more than can be said for announcements. Owner: **055** (propagation) + **056** (forms audit) once evidence exists.

### 4.4 Privacy

Our lead rows and detail drawers render **e-mail and phone in the clear** (`noor@example.com` / `0500000001`) — synthetic,
no real PII, so no law is broken today. But the *pattern* is: raw contact data for a not-yet-customer, visible to every
admin-shell viewer with no masking and no role check. **Spec 043** owns whether reception/advisor/teacher roles should see
lead contact details at all (anti-poaching: a teacher who can read a lead's phone can take the family off-platform).
Legacy did the same and worse — the crawl's own chrome leaks the operator's real address (`eslammekky@gmail.com`, visible in
`management-chat-001-page-interaction-001.png` and every other `-001` capture). **That real PII is correctly absent from our
fixtures and must stay absent.**

---

## 5. Feedback categories (the fifth C11 legacy page)

`management-family-feedback-categories-create` = **3 fields** (Name · Status[Active/Deactive] · Description) → POST
`/management/family/feedback-categories`. Ours: the `rep-fbcat` drawer inside `reports.html`
(`components/report-feedback.js:97-116`) renders **name · status · description** = **3/3**, plus the existing category list
with member counts, plus a gated Save and a gated Assign. **COMPLETE_AND_VERIFIED. Settled by Spec 029** (nav item stays
folded, no page). Nothing owed.

---

## 6. Visual verdict (academy identity, not corporate ERP)

Opened: `messages` (ar/en/dark/mobile + group drawer), `leads` (ar/en/dark/mobile + detail + create), `announcements`
(ar/dark), `settings#notifications`.

- **Messages** — the strongest page in the cluster. Warm cream canvas, real chat bubbles, medallion identity, labelled
  role/unread chips, clean RTL↔LTR mirroring, credible dark mode. **Far ahead of the legacy's cold white/purple Bootstrap
  panel with a broken `alt="image"` avatar.** No redesign needed; **preserve**.
- **Leads** — clean and scannable; the KPI strip reads as an academy dashboard, not a CRM. Chips are icon+text throughout.
  Mobile stacks correctly. Compare to the legacy's 24-tile wall of zeros: ours is calmer *and* more honest. No redesign.
- **Announcements** — functional but the **flattest** page in the cluster: the compose card is a plain 7-field grid with a
  bare checkbox column; the three stub selects all read "All"; the recipient chips look interactive but are not. It reads
  more "settings form" than "broadcast to your academy". **Flag for the 045–050 visual-redesign group** (a proper compose
  → audience → preview → send flow), and fix the three stub option sets + the `hours` label first.
- **Settings › Notifications** — dense but well-sectioned; the accordion + toggle rhythm holds up over 47 controls. Fine.

## 7. Modal / drawer issues for **Spec 044**

1. **Thread selection is a drawer, not a pane.** `messages.js:57` makes every conversation row a `data-drawer` trigger to a
   read-only sheet, while the inline thread is permanently `MESSAGES[0]`. Two competing representations of the same object;
   the drawer sheet has no compose box, so the "reply" affordance vanishes when you open a conversation. This is the exact
   pattern 044 exists to fix.
2. **`lead-new` is a 19-field form in a narrow drawer.** The screenshot shows the Submit CTA below the fold with no sticky
   footer and no section grouping — the legacy at least split it into "Main information" / "Additional information"
   (`lead.create.main` / `lead.create.more` keys **exist in the locale file but are never rendered**). Long-form-in-drawer =
   044's core problem statement.
3. **Group settings / Leave-group have no drawer at all** (legacy `offcanvasRight`) — a destructive action ("Leave Group",
   with a Confirm in the legacy) with no surface in ours.
4. **Gated primaries look enabled.** `Send` / `Publish` render as filled primary buttons with `aria-disabled="true"`; in a
   static screenshot they read as live. Consistent with the standing `data-disabled-reason` pattern, but 044 should
   consider a stronger visual for "gated".

## 8. Standing laws — status in this cluster

| Law | Status |
|---|---|
| Teacher pay-free GLOBAL | **Green.** The one pay-adjacent legacy control (`salaries` notification channel) ships as `ntf-salEventsCh` — routing only, zero figure. No pay token on `messages`/`leads`/`announcements`. |
| No fake persistence / delivery / upload | **Green.** Send · Attach · Publish · WhatsApp · Media · Save-note · Update-status · Convert · Assign · Create-group · Add-member — all `data-disabled-reason`. `type=file` count = **0** across all three pages (legacy had 2: chat `image`, ads `media[]`). |
| No real PII | **Green.** Fixtures use `*@example.com` + `05000000NN`. The legacy corpus' real operator e-mail and the real teacher/supervisor names in the ads category selects (`محمد السيد`, `المشرفه حسناء`, `المشرفه اسماء`) are **not ported**. |
| No computed metric | **Green** — and it costs us the legacy's conversion analytics (correctly). |
| No engine / websocket | **Green** — and it is what keeps the MQTT design out of our codebase. |
| Planned = 0 / FUTURE_ROUTES = {} | **Green** — all three routes are plain implemented entries (`nav.config.js:28,29,31`). |
