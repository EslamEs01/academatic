# Spec 042 — Privacy / Security / Role-Isolation Cross-Cutting Findings

**Lens**: every place the legacy exposed sensitive student/family contact data across role
boundaries, every credential/secret rendered in the DOM, every anti-poaching risk, every
over-granted permission — and, for OUR product, confirmation that we do not normalise any
leak and that no surface would leak if fetched directly ("hiding a link is not authorization").

**Method**: raw legacy records (`output/roles/*/pages/*.json`, `html/raw/*.html`) read
field-by-field, screenshots opened as images, and the current app read at source
(`app/src/js/**`) + built output (`app/public/*.html`). READ-ONLY on `app/**`; the only file
written is this one. Baseline HEAD `de8d552` · 115 public HTML · admin menu 50 · planned 0.

Paths below are relative to `academy-dashboard-discovery/`.

**Verdict**: our product introduces **ZERO privacy/security regressions**. Across 115 built
pages: **0 `type=password`**, **0 `type=file`**, **0 authored secret/credential**, **0 real
crawl PII**, **0 external host** (only `http://www.w3.org` SVG namespace literals). Every
sensitive legacy surface is either refused outright, rendered structure-only, or replaced with
authored personas. What remains is **forward policy work** — role-scoped visibility rules that
a fixtures-only frontend cannot enforce and must hand to **Spec 043** — plus **one honest gap in
our own product** (staff RBAC omits the parent-contact privacy permissions) and **one standing
role-model wart** (a password gate on the child-view).

---

## 1. Dispositions summary

| Disposition | Count | Rows |
| --- | --- | --- |
| REJECTED_PRIVACY | 9 | P-01 … P-09 |
| REJECTED_SECURITY | 8 | S-01 … S-08 |
| REJECTED_PAY_FREE (contact/attribution-adjacent) | 2 | A-01, A-02 |
| INTENTIONALLY_IMPROVED (we already close the leak) | 6 | I-01 … I-06 |
| MISSING / policy gap in OUR product | 3 | G-01 … G-03 |
| UNKNOWN_EVIDENCE | 3 | U-01 … U-03 |

**Most serious findings** (ranked): **S-01** teacher Zoom credentials + raw PAN in the DOM ·
**P-01/P-02** WhatsApp insights leak unmasked guardian/teacher phones + a live group-invite URL ·
**P-06** certificate "Send group" discloses a named minor's record to a shared WhatsApp group ·
**S-05** MQTT chat over `ws://` on a public broker with a guessable topic and no client ACL ·
**S-02** admin password as `type=text` with no old-password check · **A-01** teacher "Left/Acquired
Students" attribution board (anti-poaching) · **G-01** our staff RBAC omits the parent-phone/email
privacy permissions.

---

## 2. REJECTED_PRIVACY — sensitive data the legacy exposed; we must never port

| # | Leak | Legacy evidence | Current state | Owner |
| --- | --- | --- | --- | --- |
| P-01 | **WhatsApp FAMILIES insights**: unmasked guardian phones + e-mail in a plain admin table (`abdo ahmed abod11@gmail.com / 01154859653`; `441200480244`) | `output/roles/admin/pages/management-settings-integrations-whatsapp-families-insights.json` (tables[0]) | NONE — Spec 040 excluded the page. Keep excluded; a future connection-health view must show **counts + masked identifiers only** | **043** (view) + 053 (WhatsApp) |
| P-02 | **WhatsApp TEACHERS insights**: teacher name + phone `201278910727` + **live** `https://chat.whatsapp.com/HNeGQ2J7HDzJAHmLKyIcIK?...` invite URL + username `msadeqx9` | `output/roles/admin/pages/management-settings-integrations-whatsapp-teachers-insights.json` (tables[0]) | NONE — excluded | **043** + 053 |
| P-03 | The **same live invite URL + raw phone + `Hour Rate: 120 EGP`** printed on the teacher contact card AND its edit form AND the teacher audit page | `output/roles/admin/html/raw/management-teachers-1.html`, `-1-edit.html`, `management-admins-appear-7.html` (`<span class="badge...">https://chat.whatsapp.com/HNeGQ2J7…</span>`) | NONE ported; teacher fixtures authored, zero pay token | **043** |
| P-04 | **Admin profile popover** renders a real person + e-mail on EVERY admin page (`Eslam Essam · Manager · eslammekky@gmail.com`) and builds the avatar via **ui-avatars.com** with the real name in the query string | `output/roles/admin/html/raw/management-home.html`; screenshot `…/management-home-001-page-interaction-001.png` | Fixture identity (`نورة العتيبي / مديرة الأكاديمية`), initials avatar, **no e-mail**, **0 external requests** | **043** (standing refusal); **C12-06** (operator PII, REJECTED_PRIVACY — `cluster-audits/C12-audit.md`) |
| P-05 | **Dashboard filter selects enumerate the whole tenant roster by real name** (family/student/teacher) — a whole-tenant roster dump inside a filter widget | `output/roles/admin/pages/management-home.json` `forms[1].options` | Facets use authored personas | **043** |
| P-06 | **Certificate "Send group"** pushes a NAMED CHILD's certificate + link into a shared WhatsApp group — cross-family disclosure of a minor's record | `output/roles/admin/html/raw/management-certificate-requests.html` (`<option value="group">Send group`) | `certificates.html` Send = a bare backendRequired gate; **no channel/recipient control**. REJECT the group option permanently; private per-guardian opt-in only | **043** (rule) + 053 (delivery) |
| P-07 | **Certificate preview URL** carries a minor's data in the query string (`/preview?student_name=…&teacher_name=…&description=…`) via `window.open`, a shareable link containing a child's record | `output/roles/admin/html/raw/management-certificate-requests.html:2911-2924` | Preview/Generate/Download are gates; no PDF, no `window.open` | 043 + FUTURE_BACKEND (render) |
| P-08 | **Announcement audience selects leak real STAFF names** as option labels (`محمد السيد`, `المشرفه حسناء`, `المشرفه اسماء`) | `output/roles/admin/pages/management-public-advertisement.json` (`category_selected[]`, `student_category_selected[]`) | `announcements.html` renders authored recipient chips; targeting is display-only | 043 + 056 |
| P-09 | **Real student/parent PII in the corpus** (`محمد احمد`, `abdo ahmed`, `منار حسن`, `المعلم محمد صادق صادق`) across student/course/session/enrollment records; tenant contact `afaaqonline1@gmail.com / 201508604112` in General settings | `output/roles/admin/html/raw/management-settings-general.html`; `…/management-courseclasses-default-member-course-details-1-full.png`; `management-student-1.json` | 100% authored fixtures; grep of `src/` + `public/` for every real token = **0 hits** | **043** |

---

## 3. REJECTED_SECURITY — credentials/secrets & insecure patterns

| # | Item | Legacy evidence | Current state | Owner |
| --- | --- | --- | --- | --- |
| S-01 | **Teacher Zoom credentials + raw PAN on the teacher form**: `zoom_password`, `zoom_client_secret` as plaintext inputs; `paymob_bank_card_number` a raw PAN field; plus a `password` (`type=password`) | `output/roles/admin/html/raw/management-teachers-create.html` (all four `<input>`s confirmed) | NONE — 0 credential/PAN/password input anywhere | 053 (provisioning only, never the secret) + real auth backend |
| S-02 | **Admin password as `type=text`** with a masked placeholder, on the same form as name/email/username, **no old-password verification** — the highest-privilege account got the insecure input | `output/roles/admin/html/raw/management-profile-edit.html` (`<input type="text" name="password" …>`); also `management-admins-create.html`, `management-admins-6-edit.html` (`type=password`) | 0 password inputs in 115 pages; admin has no profile form at all (topbar item is a noop → honest toast) | **043** (policy) + real auth backend |
| S-03 | **Family login credentials on the create/edit form** (`user_name` required, `password` `type=password` required) + a `send_info` toggle that transmits the account data to the family | `output/roles/admin/html/raw/management-families-create.html`; `management-families-1.json` (reset method = WhatsApp) | NONE — the add-family wizard carries no username/password/send-info | future-backend (auth); settled by Spec 027 M-U |
| S-04 | **Provider credentials in the DOM**: 15 plaintext key inputs, 2 real `type=password` (Paymob-Payout password, SMTP password), and **saved keys printed as table columns** (Client Secret / Key 1 / Key 2) | `management-settings-integrations-{2,8,9}-configure-full.png`; raw HTML | `settings.html#view=integrations` renders 24 sensitive fields as **structure-only rows** (label+required+purpose, **no value slot** by construction); PayPal defaults **Sandbox** (legacy defaults Live) | 053 (persist server-side) |
| S-05 | **Chat MQTT transport**: `mqtt.connect("ws://localhost:8083/mqtt", { clientId: userId+'-'+token, username:'WOrion-V3', password: mqtt_token })`, JSDoc broker `wss://test.mosquitto.org:8081` (a **public** test broker), topics `user/${userType}/${userId}` + `chat/${chatId}` with **no client-side ACL** — any subscriber could read others' messages | `output/roles/admin/html/raw/management-chat.html:3578-3618, 3840` | NONE — no websocket/engine by constitution. A future messaging spec must design its OWN transport + authz, never port this | **043** (authz) + 054 |
| S-06 | **"Send Reset Password" / "Login as \<teacher>/\<family>"** one-click, no confirm, no audit prompt | `management-teachers-1.json`; `management-families-1.json` | Teacher: honest disabled gates (`trn.reason.resetPassword`, `trn.reason.loginAs`). Family: not built. 0 impersonation surface | real auth backend (never mocked) |
| S-07 | **Shared OTP destination phone for ALL admins** (`name="otp"`, single value) — one 2FA target for every admin | `output/roles/admin/html/raw/management-settings-general.html` (`<input … name="otp" … placeholder="20123456789">`) | `settings.html#view=security` renders a structure row + Enable gate; no shared-OTP field | **043** + auth backend |
| S-08 | **`shortcut_link` free-form URL** stored per user (admin + teacher) — an open-redirect / stored-link surface (`placeholder="https://academatic.online/management/families/create"`) | `management-home.json` `forms[…]`; `output/roles/admin/html/raw/management-home.html` (`name="shortcut_link"`) | Honest backendRequired toast (0 fields). If ever built, constrain to an **in-app route allowlist**, never a free URL | 056 + **043** (link-safety policy) |

---

## 4. REJECTED_PAY_FREE (anti-poaching / attribution-adjacent)

These are recorded under the privacy lens because they are cross-role **attribution / contact-harvesting**
signals, not just pay figures.

| # | Item | Legacy evidence | Current state | Owner |
| --- | --- | --- | --- | --- |
| A-01 | **Teacher "Left Students" / "Acquired Students" attribution board** on the teacher profile — which students a teacher lost/gained (a poaching/attribution signal). If ever surfaced it must **never** be visible to a teacher | `output/roles/admin/pages/management-teachers-1.json` (headings `Left Students`, `Acquired Students`) | NONE | **043** (anti-poaching) |
| A-02 | **Student `Country` column in the TEACHER's own roster** + `Report For Student` — a locality signal on a teacher-visible list (poaching aid) | `output/roles/teacher/pages/teacher-studentslist.json` (tables), `teacher-students.json` | Our `teacher-students.js` is a **link-less, contact-less** roster (name + course + authored learning-signal only; source header lines 1-8 state "no private guardian contact") | 043 + 045-050 |

---

## 5. INTENTIONALLY_IMPROVED — leaks we already close

| # | Improvement | Evidence (ours) |
| --- | --- | --- |
| I-01 | **No real PII sitewide**: grep of `src/` + `public/` for every crawl token (`eslammekky`, `01154859653`, `441200480244`, `201278910727`, `chat.whatsapp.com`, `ui-avatars`, `afaaqonline`, `201508604112`) = **0 hits** | (verified this audit) |
| I-02 | **0 external hosts** in any built page (only `http://www.w3.org` SVG-namespace literals, ×114) — no avatar CDN, no analytics, no invite URL | `grep -hoE 'https?://…' public/*.html` |
| I-03 | **0 `type=password`, 0 `type=file`** across 115 pages; input types are only search/text/number/date/time/checkbox. (The 4 fixture/source matches for "password/file" are **comments and a data-attribute** — `library.html` `data-type="file"` is a media-type facet, not a file input) | `grep -rhoE '<input[^>]*type="…"' public/*.html` |
| I-04 | **Teacher surfaces carry no guardian contact** (anti-poaching); the family portal is zero-pay; the admin `family.html` shows placeholder phones (`+966 50 000 0000`) not real numbers | `src/js/pages/teacher-students.js:1-8`; `src/locales/{ar,en}.fam.js:182-183` |
| I-05 | **Provider sensitive block is structure-only** (documentation rows, no value slot); PayPal defaults Sandbox; no card carries an enable control | `src/js/fixtures/settings-management.js:452-458, 505-511` (comments name the two legacy `type=password` rows and keep them structure-only) |
| I-06 | **Lead / staff / family contact uses synthetic placeholders** (`noor@example.com`, `0500000001`, `@demo.academy`) — no law broken today | `src/js/pages/leads.js:51-52`; `src/locales/en.fam.js:183-190` |

---

## 6. Direct-fetch check — "hiding a link is not authorization"

Because there is no auth, every built page is world-readable; the guarantee has to be that **no
page BAKES sensitive data that a hidden link would have gated**. Checked:

- **Portal pages (`teacher-*`, `family-*`, `student-*`, `portals`) never link out to an admin
  page.** The only non-portal href from any portal-shell page is `portals.html → dashboard.html`
  (the explicit demo hub), and `teacher-performance.html` (the **sanctioned admin exempt board**,
  Spec 024 B-07 — not a portal page) links to admin surfaces. No teacher/family/student portal
  page exposes an admin route. *(verified: hrefs enumerated across all portal pages this audit.)*
- **Teacher portal bodies carry 0 pay tokens** and **0 guardian-contact tokens**
  (`راتب|أجر|ريال|salary|payout|fine|SAR` = 0; `ولي الأمر|guardian|parent` = 0 except one benign
  flow caption on `teacher-outcomes.html:301` "تُراجَع النتيجة ثم تظهر لولي الأمر والطالب" — a
  workflow description, not contact data). Confirms a directly-fetched teacher page leaks nothing.
- **No cross-family data is baked into a single-family surface**: `family-portal.html` /
  `family-child.html` render only the fam1 persona (`أبو سلمان الغامدي`); the other guardian
  names (`أم جوري`, `أبو ياسر`, …) appear only on the **admin** `families` directory, never on a
  guardian-facing page. *(verified per-name.)*
- **`family-children.html` etc. do carry other authored family names** — but those are the ADMIN
  directory-style pages / authored demo data, not a guardian's own portal leaking siblings' data.
  Role isolation is a **routing convention** today (no auth); **Spec 043 must make it an
  invariant** (see C01 finding: legacy proves 4× that cross-role routes redirect to the caller's
  own home).

---

## 7. Over-granted permissions (the legacy RBAC posture)

- **Default-all-on**: BOTH captured staff members carry **170/170** permissions granted, 0
  unchecked — every staff member is a de-facto super-admin. Proven from raw HTML: 170 `permisions[]`
  inputs, 170 `checked`, for both `/permission/6` and `/permission/7`; the two full-page
  screenshots are **byte-identical** (`md5 2dad126b…`). This is the same defect class as Spec 040's
  "11 integration cards shipping enabled" and must **never be copied as a default**.
  Evidence: `output/roles/admin/html/raw/management-admins-permission-{6,7}.html`.
- **The 170-list contains privacy gates in disguise** — `Show Parent Phone`, `Show Parent Email` —
  and pay-visibility gates — `Show Teacher Rate`, `Show Student Rate`, `Show Salaries Page`,
  `Edit Hour Rate`, `Manage Payout Providers`, plus destructive `Force Delete / Restore` verbs.
  These prove the legacy treated parent contact as a **grantable-to-everyone** permission.
  **Spec 043 must make parent phone/email DENY-by-default** and must never surface teacher-rate
  permissions on a teacher-visible surface. Evidence: extracted labels from the raw permission form.
- **Teacher capability model** (`can_chat`, `can_see_library`, `can_edit_schedule`, `can_edit_class`)
  and **family capabilities** (`can_chat`, `can_see_library`, `whatsapp_private`) gate portal
  features — we render **none** of these controls, so those features are ungoverned. Evidence:
  `management-teachers-1.html`, `management-families-1.html`. → **043** (isolation) + 056 (form).

---

## 8. MISSING / policy gaps in OUR product

| # | Gap | Evidence | Owner |
| --- | --- | --- | --- |
| G-01 | **Our staff RBAC omits the parent-contact privacy permissions.** `PERM_GROUPS` is 10 groups / 24 rows of generic verbs (view/manage/create/export) — it has **no `Show Parent Phone` / `Show Parent Email` row**, so the single most important privacy control in the legacy 170-list is unrepresented. It is also all-`granted:true` except a handful of authored guesses. | `src/js/fixtures/staff-management.js:34-44` | **043** + a dedicated RBAC spec |
| G-02 | **The RBAC matrix has no consumer** — it is display-only and enforces nothing; "staff member X cannot see Finance" is representable but not true on any surface. Correct for a fixtures-only frontend, but it must be stated plainly: we ship a permissions UI that is a promise the backend must keep. | Spec 031 `rbac-display-only-contract.md`; static nav | **043** (enforcement) |
| G-03 | **Child-view password gate.** `student-profile.html` renders a "change your password" backendRequired gate for a login that **does not exist** (legacy has NO student role — `/student/*` IS the family login, Spec 021). A password-change affordance on a child-view implies an account the child does not have. | `src/js/fixtures/portal.js:323` (`passwordChange` on the student card) | **043** (role isolation) — carried by this register as G-03 (nearest C12 audit row: **C12-09**, portal change-password; the published C12 audit mints no child-view-specific row) |

---

## 9. UNKNOWN_EVIDENCE (never invent)

| # | Item | Why unknown | Owner |
| --- | --- | --- | --- |
| U-01 | **Staff "category" semantics** — `/management/admins/categories/{id}` is a checkbox list whose labels are just real people's names (`المشرفه حسناء`, `محمد السيد`); whether a "category" is a data-visibility scope, a supervisor grouping, or a teacher-category is not derivable. Our `st-cat` drawer invents a two-row scope model that is ungrounded. Do not build further. | `management-admins-categories-6.json` labels only | **043** (if a visibility scope) |
| U-02 | **Class `Direct Links` / room join** exposes per-role join URLs (`student/teacher/management/session-class-room/MQ==/{n}`) — who may see/copy which link is a privacy decision, and the room UI was never captured (redirected to home). Our Join is a gate. | `management-courseclasses-1.json` (Account/Link table) | 054 (room) + 043 (who may copy) |
| U-03 | **Class TimeTable "Student Enter At / Teacher Enter At" + Timeline "Added by / mohamed created"** — presence-monitoring of a minor and staff-identity audit exposure. Populated recording panel never captured. If ported, who may see it is unset. | `management-courseclasses-1.json` headings + tables | **043** / 055 (audit) |

---

## 10. Handoff to Spec 043 (primary owner)

Spec 043 (Sensitive Data Privacy / Role Isolation / Anti-Poaching) must, at minimum, rule on:
**(a)** parent phone/email as DENY-by-default RBAC (G-01, §7); **(b)** masked-only connection-health
in place of the two WhatsApp insights pages, counts + masked identifiers, never a live invite URL
(P-01/P-02); **(c)** REJECT certificate group-delivery; private per-guardian opt-in only (P-06);
**(d)** make role-scoped landing/redirect an explicit invariant (§6, C01); **(e)** whether
reception/advisor/**teacher** may see lead contact details at all (C11 §4.4 — a teacher who reads a
lead's phone can take the family off-platform); **(f)** remove the child-view password gate (G-03);
**(g)** scope class presence-timestamps, audit "Added by", and per-timezone account counts (U-03,
C14). Secondary owners: **053** (WhatsApp/SMTP/provider integrations — structure-only), **054**
(room/recording lifecycle), **055** (audit-trail propagation), **056** (the honest forms, with
043's security patterns), real **auth backend** (login/impersonation/password/2FA, post-057).
