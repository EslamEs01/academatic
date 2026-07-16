# C12 — Staff / Profile / Roles & Permissions · Capability Reconciliation Audit (Spec 042)

**Method (honest counts)**: **16 screenshots opened AS IMAGES** with the Read tool (9 legacy + 7 current) and
**15 raw legacy records** read (9 page `.json` field-by-field, 2 `text/*.txt`, 4 `html/raw/*.html` greps for input
types/values/checked-state). The current implementation was read at source — **10 files** under `app/src/js/`
(`pages/staff.js`, `fixtures/staff-management.js`, `pages/teacher-profile.js`, `pages/student-profile.js`,
`pages/family-profile.js`, `fixtures/profile.js`, `pages/settings.js` [users/security panels], `components/topbar.js`,
`enhance.js` [profileMenu + staffMenu + acknowledge], `nav.config.js`). Raw records beat every planning summary.

## Legacy page assignment (all 9 pages accounted for — zero unassigned)

| Surface | Legacy pages (slugs) | Notes |
|---|---|---|
| **S1 Per-member permission matrix** | admin `management-admins-permission-6`, `management-admins-permission-7` | ONE surface, two member variants (hidden `userID` 6 vs 7). Sampling: permission-6 read in full (json+txt+raw html); permission-7 verified by field-list diff (**identical 173 fields**), txt counter grep and its interaction screenshot. |
| **S2 Admin own profile — show** | admin `management-profile-show` | read-only account card |
| **S3 Admin own profile — edit** | admin `management-profile-edit` | account edit form |
| **S4 Teacher own profile — edit** | teacher `teacher-profile-edit` | profile + change-password |
| **S5 Family/guardian own profile — edit** | family `student-profile-edit` | the `/student/*` login IS the family/guardian role (Spec 021); same shape as S4 |
| **S6 Security → System Data (import/backup)** | admin `management-settings-security-data` | cluster overlap — **capability audit owned by C09** (C09-03/-08/-26); assigned here for page-accounting only |
| **S7 Backup send (redirect page)** | admin `management-settings-security-data-backup-send` | overlap — owned by C08-12/C09-08 |
| **S8 Security → Policy** | admin `management-settings-security-policy` | overlap — owned by C09-17 |

---

## 1. What the legacy actually is (proved from images + raw forms)

### S1 — "Set Permissions for staff member" (the roles/permissions surface)

Evidence: `output/roles/admin/pages/management-admins-permission-6.json` (`forms[1]` →
`POST /management/admins/permission/store`), `output/roles/admin/text/management-admins-permission-6.txt`,
`output/roles/admin/html/raw/management-admins-permission-6.html`, pixels in
`output/roles/admin/screenshots/management-admins-permission-6-full.png` and
`…/management-admins-permission-7-001-page-interaction-001.png`.

* **173 form fields** = `_token` + hidden `userID` + 1 search text + **170 `permisions[]` checkboxes** (the field
  name is misspelled in the legacy DOM). There are **NO named roles and NO role CRUD** — permissions are keyed
  per member (`userID`), one flat grant list each.
* **17 permission groups**, each headed by its own lead permission checkbox with a live count badge
  (txt file, counted): Show Dashboard 14 · Show New Requests 6 · Show Families 24 · Show Students List 21 ·
  Show Teachers 17 · Search Teacher Schedule 1 · Show Reports 20 · View Invoices List 15 · Show Payment Methods 3 ·
  Show Locations 3 · Show Material 3 · Show Library 3 · Show Banks 3 · Show System Settings 6 · Show Staff Members 6 ·
  Show Groups 5 · Show Scheduled Actions 3 (= 153 children + 17 group-lead permissions = **170**).
* Chrome: global **Select All / Clear All**, **per-group Clear All** (18 Clear-All buttons total, counted from
  `buttons[]`), a search filter box, a live **"170/170 permissions selected"** counter, one **Submit**.
* **Both sampled members are 170/170 all-granted** (`text/management-admins-permission-6.txt:11`,
  `text/management-admins-permission-7.txt:11` — grep) — in practice the tenant ran every staff member as a full
  admin; the granular matrix was not actually used to differentiate anybody.
* Permission rows that prove cross-cluster capabilities (labels read from `forms[1].fields[]`):
  **Show Parent Phone / Show Parent Email** (PII-visibility grants), **Show Salaries Page · Show Teacher Rate ·
  Show Salary Class Report · Generate Salaries · Send/Edit/Delete Salaries · View/Request/Approve/Execute/Delete
  Payouts · Manage Payout Providers** (pay-feature grants), **Show Staff Members · Add Staff Members · edit staff
  members · Show Staff Actions · Show Member Permissions · Edit Member Permissions · Delete Staff Member**
  (staff CRUD exists in legacy, but **no staff list/create page record is in this cluster** — see §5),
  **Backup Settings**, and one **raw untranslated key rendered as a label: `permessions.show_agenda`**
  (visible in the full screenshot under Show Reports — a shipped translation defect).

### S2/S3 — Admin own profile (show + edit)

Evidence: `output/roles/admin/pages/management-profile-{show,edit}.json`,
`output/roles/admin/html/raw/management-profile-{show,edit}.html`,
`output/roles/admin/screenshots/management-profile-{show,edit}-full.png`.

* **Show**: avatar + heading **"Eslam Essam"** and 4 readonly inputs — `name` = Eslam Essam, `email` =
  eslammekky@gmail.com, `username` = eslam, `password` (empty value, dot placeholder) + an **Edit** button.
* **Edit** (`POST /management/profile/edit`): photo block (`type=file`, accept png/jpeg, "Allowed JPG, GIF or PNG.
  Max size of 1MB", Upload new photo / Reset) + `name` + `email` + `username` + **`password` as
  `<input type="text">`** (raw html: `<input type="text" name="password" …>` on BOTH show and edit) +
  Save changes / Discard. Two security defects in one control: a typed password would be visible in cleartext,
  and password change requires **no old password and no confirmation field**.
* The profile dropdown (permission-7 interaction screenshot) exposes the operator identity on every page:
  **Eslam Essam · Manager · eslammekky@gmail.com · My Profile · Log Out** — real operator PII.

### S4/S5 — Teacher and family own profile edit

Evidence: `output/roles/teacher/pages/teacher-profile-edit.json`,
`output/roles/family/pages/student-profile-edit.json`, screenshots
`output/roles/teacher/screenshots/teacher-profile-edit-full.png`,
`output/roles/family/screenshots/student-profile-edit-full.png`.

* Identical shape per role: photo block (`type=file`, same 1MB copy) + **`first_name` + `last_name` + `email`**
  + Save changes, and a **separate Change Password card** — `old_password` + `new_password` + `confirm_password`,
  all real `type=password` (`POST /teacher/update-teacher-password`, `POST /student/update-password`). The
  portal roles got the safe password pattern the admin page lacks.
* Real PII in the records: teacher **«المعلم محمد صادق» / aboda155502@gmail.com**; family **«الطالبة لمار / حسن» /
  `alaashapan1996`** (a bare local-part in the email input — also a data-quality defect). Note: the family login's
  "profile" edits the CHILD's name — the account identity is the student record, more evidence for the Spec-021
  role model (family owns the child; student is not an adult role).

### S6/S7/S8 — Security Data / Backup-send / Policy (cluster overlap)

Records + full screenshots re-inspected (`management-settings-security-data.json` — 4 × `type=file` import forms
+ backup "To" + bare **Send Backup** link; `…-backup-send.json` — the "Database backup has been initiated
successfully." banner + silent redirect to the Email/SMTP screen with Accounts/Add Account/Mail Settings tabs +
Test SMTP; `…-security-policy.json` — 2 empty Quill editors, Family Policy / Teacher Policy). Findings match the
C09 audit exactly; **no new analysis here** — capability rows stay owned by C09 (C09-03/-08/-17/-26) and C08-12.

---

## 2. What we ship today (control-level, from source)

* **`staff.html`** (`pages/staff.js` + `fixtures/staff-management.js`, Specs 031/032) — the ONE staff home:
  filterBar (search + role + status selects), **5 authored staff cards** (name / username / masked-style phone
  `05xx-xx-…` / demo email / role chip / status chip — fixture header: *"Deliberately NO password, NO salary/pay
  figure, NO real PII"*), primary **Add member** → `staff-add` form drawer, and a per-card kebab
  (`enhance.js staffMenu`): View drawer (5 read-only rows) · Edit drawer · Permissions drawer · Category drawer
  (2 scope rows + assign gate) · Activity drawer (4 authored audit rows) · Duplicate drawer · Reset-password
  **gate** · Deactivate **confirm** · Delete **confirm** (both mutate nothing).
* **The three staff form drawers** (`staff.js:71-89`): Add (blank) / Edit / Duplicate (prefilled st1), each
  **exactly 6 `field()` controls** — name · username · email · phone · role select (4 options) · status select —
  + ONE backendRequired Save. **0 password, 0 salary, 0 `type=file`.** Verified on pixels
  (`app/screenshots/staff__ar__light__desktop__sp032-staff-edit.png`).
* **The RBAC drawer** (`staff.js permDrawer` + `PERM_GROUPS`): **display-only** — 10 groups × 2–3 items =
  **22 icon+label rows** ("granted / not granted"), an explanatory note, and a Save **gate**. The fixture states
  the design position: *"~10 groups standing in for the legacy ~17-group set … informational only, never a
  working permission engine. Role is a fixed enum (legacy has no role-definition CRUD)."* Grants are authored
  **mixed** (e.g. teachers-manage = notGranted) — unlike the legacy all-granted reality.
* **`settings.html#view=users`** (`pages/settings.js:275-296`, Spec 040): a panel with a **real link to
  `staff.html`** + `rolesSection()` — a read-only role preview («مدير الأكاديمية», 4 groups: sessions 4 / people 3 /
  content 3 / settings 2 rows, all view/manage/create/export style). Verified on pixels
  (`app/screenshots/settings__ar__light__desktop__sp040-users.png`). The security tab renders 2FA as a structure
  row + gate and **deliberately does NOT render `otp`** (`settings.js:265-270` comment — the legacy shared-OTP
  defect, C09-20).
* **Admin own profile**: **none.** The topbar profile chip (`components/topbar.js:48-55`, fixture `PROFILE` —
  authored «نورة العتيبي / مديرة الأكاديمية») opens `profileMenu()` (`enhance.js:35-45`): **"Account" is a
  `data-action="noop"`** (→ the honest "available once the server is connected" toast), Settings is a real link,
  Logout is a confirm. There is no admin account page, no route, no drawer.
* **Portal profile pages** (`teacher-profile.js` / `family-profile.js` / `student-profile.js`, pixels opened for
  all three): display-only identity/detail/preference rows + **EXACTLY three backendRequired gates each** —
  photo change · profile/account save · password change — **zero forms, zero inputs, zero fake save**. Teacher
  page is pay-free; student page is explicitly the child-view («عرض الابن»).

## 3. The honest gaps (control-level, legacy count → our count)

1. **Permission matrix editing: 170 interactive checkboxes → 22 display-only rows.** Legacy: 17 groups, group-lead
   checkboxes, Select All/Clear All (global + per-group), search filter, live `N/170` counter, Submit. Ours: a
   10-group informational drawer + Save gate — an admin cannot even *stage* a grant change. PARTIAL (C12-01,
   owner 043); actual enforcement is a pure backend prerequisite (C12-02, FUTURE_BACKEND, 043).
2. **Admin own account page is MISSING.** Legacy has show + edit (photo/name/email/username/password). Ours: the
   topbar "Account" item is a noop toast; no surface at all (C12-04, owner 056). The safe rebuild must copy the
   TEACHER pattern (old/new/confirm), never the admin one (see §4).
3. **Teacher/family profile edit forms: 4 visible inputs + 3 password inputs → 0 inputs.** Our portal profile
   pages render the write surface as three gates with no pre-gate form UI (the Spec-032 "form first, gate the
   Save" law was applied to admin pages, not the portals). Field-level: `first_name`/`last_name`/`email` editable
   in legacy; display-only here (C12-07/-08, owner 056). Password change and photo upload are backend
   prerequisites (C12-09/-10).
4. **PII-visibility grants (Show Parent Phone / Show Parent Email) have no successor concept** anywhere in the
   current product — nothing gates who may see guardian contact data (C12-13, owner 043 — it is the privacy
   spec's core question).
5. **Legacy staff Add/Edit/Delete forms are UNPROVEN.** The permission labels prove the actions exist
   (`Add Staff Members`, `edit staff members`, `Delete Staff Member`, `Show Staff Actions`), but **no staff
   list/create/edit page record is in this cluster's corpus** — our 6-field Add/Edit drawers cannot be
   field-compared. UNKNOWN_EVIDENCE (C12-11, owner 056); never invent the legacy fieldset.
6. **Cross-surface identity propagation**: the topbar `PROFILE` fixture, the staff directory fixtures and the
   portal persona fixtures are unlinked authored islands; a real profile edit must propagate (topbar, directory
   card, activity log). Ours has no linkage story (C12-21, owner 055).
7. **Empty/loading/error states**: legacy shows none on these pages (flat server-rendered forms; the permission
   search filters client-side — behaviour beyond the filter box unproven). Ours: the staff grid rides the global
   `[data-no-results]` empty state; drawers are baked templates (no loading state needed, static build).

## 4. What we deliberately REFUSED (must never be "fixed back")

* **`<input type="text" name="password">` on the admin profile (show AND edit)** — cleartext password entry, no
  old-password check, no confirmation (`html/raw/management-profile-{show,edit}.html`). REJECTED_SECURITY
  (C12-05). Our staff drawers and portal pages render **0 password inputs of any kind**; the future account page
  must use the legacy *teacher* pattern (old/new/confirm, `type=password`) — which is FUTURE_BACKEND, not a
  reason to port the defect.
* **Operator PII** — Eslam Essam / eslammekky@gmail.com / username `eslam` baked into profile pages and every
  page's profile dropdown; plus the teacher/family records' real names and emails (aboda155502@gmail.com,
  alaashapan1996). REJECTED_PRIVACY (C12-06); our fixtures are authored demo identities.
* **Pay-scoped permission rows** (Show Salaries Page · Show Teacher Rate · Show Salary Class Report · Generate/
  Send/Edit/Delete Salaries · the 5 payout grants · Manage Payout Providers) — grants over features the product
  excludes (teacher pay-free GLOBAL; `classSalaryReport` = the sole honest lock). Not reproduced in the RBAC
  preview; they belong to the payroll backend if it ever exists (C12-14).
* **The shared-admin OTP phone / 2FA defect** — the legacy Accessibility tab (ONE `otp` destination for ALL
  admins) is C09-20 (REJECTED_SECURITY, 043); this cluster's current security tab correctly renders 2FA as a
  structure row + gate with **no `otp` field** (`settings.js:265-270`). Recorded here only because 2FA is on the
  C12 watch list; the page itself is not among the 9.
* **The no-confirm real DB backup + silent SMTP redirect** (S7) — already REJECTED (C08-12/C09-08); re-verified
  from this cluster's record, nothing new.
* **Legacy shipped defects we did not reproduce**: the raw `permessions.show_agenda` label, the misspelled
  `permisions[]` field name, and the bare local-part email accepted by the family profile form. Ours is fully
  localized (AR/EN mirrored keys) with labeled icon+text chips (C12-15).

## 5. Evidence conflicts / naming risks

* **`management-admins-permission-6/7` are module-tagged "Roles / Permissions, Teachers"** — the Teachers tag is
  noise (staff members 6/7 are back-office users, not teachers; the form posts to `admins/permission/store`).
  C12 owns the capability.
* **The legacy "roles" vocabulary is a misnomer**: there are no roles, only per-member grant lists. Our UI shows
  a **named-role enum** (manager/accountant/supervisor/support) as a display chip — a deliberate simplification
  recorded in the fixture comment. A future real RBAC must decide the model (named roles vs per-member grants);
  043 owns that decision (noted on C12-01/-02/-12).
* **Both sampled permission pages are 170/170 all-granted** — so the *differentiated* rendering of the matrix
  (what a partially-granted member looks like: mixed checkboxes? group counts like 9/24?) is technically
  inferred from the counter widget, not observed. The group-count badges and Clear-All-per-group make partial
  states obviously supported; recorded as a sampling note, not UNKNOWN.
* **`login-as` / impersonation (watch item): ZERO evidence in all 9 records** — no button, no form, no link in
  any C12 page. Prior specs recorded a teacher-page "Login as" gate (Spec 028, future-backend). Whether legacy
  staff/admins had impersonation is UNKNOWN_EVIDENCE from this cluster (C12-19, owner 043) — never invented.
* **The current screenshot `staff__ar__light__desktop__sp031-staff-rbac.png` does not show an open RBAC drawer**
  — opened as an image, it is visually identical to the plain directory frame. The drawer exists in source
  (`permDrawer()` baked as `template[data-preview="st-perm"]`) and the kebab wires it, but the *visual* record of
  the open matrix drawer is missing from the screenshot set → folded into C12-20 (visual review, 045-050).
* `management-settings-security-data(-backup-send)`/`-policy` carry the *Profile / Account* module tag in the
  crawl, but they are Settings/Security routes; C09/C08 own their capabilities (rows C12-16/-17/-18 mirror the
  C09 ledger and add no new analysis).

## 6. Visual verdict

Our staff directory reads calm and academic (cream canvas, violet accents, labeled icon+text status chips
«نشط / غير نشط / موقوف مؤقتًا», clean card grid, honest sub-line "عرض فقط — كل إجراء يحتاج ربط الخادم") — a clear
improvement over the legacy grey-purple ERP board. The Edit drawer is a tidy 6-field sheet with one Save. The
settings Users tab preview is clean and honestly labeled («معاينة للصلاحيات — للعرض فقط، دون تفعيل»). The three
portal profile pages are consistent, warm, and honest (dashed gate cards with «يتطلب الخادم» pills). Three notes
for the 045-050 groups: (1) the RBAC drawer is a thin stand-in for the legacy 170-row board and its open state
was never captured (C12-20); (2) the staff directory has no per-member permissions *summary* on the card (the
legacy counter-per-group idea is good information design worth keeping in display-only form); (3) the portal
profile "edit" sections read as three identical beige gate cards — correct, but visually undifferentiated.

## Disposition summary (normalized — Spec 042 ledger source)

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C12-01 | Per-member permission matrix editing UI (170 `permisions[]` checkboxes · 17 groups · Select/Clear All · per-group Clear All · search · live N/170 counter · Submit → our 22-row display-only drawer + Save gate) | PARTIAL | 043 | §1 S1 / §3 item 1 |
| C12-02 | RBAC enforcement (grants actually gating features; per-member vs named-role model decision) | FUTURE_BACKEND | 043 | §3 item 1 / §5 |
| C12-03 | settings#view=users — real staff.html link + read-only role preview (a summary surface legacy lacks) | INTENTIONALLY_IMPROVED | — | §2 |
| C12-04 | Admin own account page (show + edit: photo/name/email/username; topbar "Account" is a noop today) | MISSING | 056 | §1 S2-S3 / §3 item 2 |
| C12-05 | Admin password as `type=text` with no old-password and no confirm (show + edit) | REJECTED_SECURITY | — | §1 S2-S3 / §4 |
| C12-06 | Operator + user PII in profile pages and profile menus (Eslam Essam / eslammekky@gmail.com; teacher/family real names + emails) | REJECTED_PRIVACY | — | §1 / §4 |
| C12-07 | Teacher own profile edit form (photo + first/last name + email inputs → display rows + 3 gates, 0 inputs) | PARTIAL | 056 | §1 S4 / §3 item 3 |
| C12-08 | Family/guardian own profile edit form (same shape at /student/profile-edit; edits the child identity) | PARTIAL | 056 | §1 S5 / §3 item 3 |
| C12-09 | Portal change-password (old/new/confirm, real type=password in legacy → honest gates today) | FUTURE_BACKEND | 043 | §1 S4-S5 / §3 item 3 |
| C12-10 | Profile photo upload (type=file, 1MB copy → MUST-GATE law, gates today) | FUTURE_BACKEND | backend | §1 / §3 item 3 |
| C12-11 | Legacy staff Add/Edit/Delete form fieldset (actions proven only by permission labels; no page record in corpus) | UNKNOWN_EVIDENCE | 056 | §3 item 5 / §5 |
| C12-12 | Named-role enum (manager/accountant/supervisor/support) + authored mixed grants replacing the per-member all-170-granted reality | INTENTIONALLY_IMPROVED | — | §2 / §5 |
| C12-13 | PII-visibility grants (Show Parent Phone / Show Parent Email) — no successor concept gates guardian contact data | MISSING | 043 | §1 S1 / §3 item 4 |
| C12-14 | Pay-scoped permission rows (Salaries Page / Teacher Rate / Salary Class Report / Generate Salaries / 5 payout grants / Payout Providers) | REJECTED_PAY_FREE | backend | §1 S1 / §4 |
| C12-15 | Legacy shipped label defects (raw `permessions.show_agenda` key, misspelled field name, bare local-part email) not reproduced; fully localized AR/EN instead | INTENTIONALLY_IMPROVED | — | §1 S1 / §4 |
| C12-16 | Security Data import surface (page assigned here; capability = C09-03, verified 33-safe-column contract) | COMPLETE_AND_VERIFIED | — | §1 S6 (primary: C09-03) |
| C12-17 | Backup action honesty (page assigned here; capability = C09-08/C08-12; real execution = C09-26 FUTURE_BACKEND) | INTENTIONALLY_IMPROVED | — | §1 S7 (primary: C09-08) |
| C12-18 | Policy rich-text authoring (page assigned here; capability = C09-17, owner unstated there — long-form editor interaction assigned to 044) | PARTIAL | 044 | §1 S8 (primary: C09-17) |
| C12-19 | Login-as / impersonation (watch item — zero evidence in all 9 C12 records; teacher-side gate recorded by Spec 028) | UNKNOWN_EVIDENCE | 043 | §5 |
| C12-20 | Staff/RBAC visual review (open RBAC drawer never captured — sp031-staff-rbac frame shows the closed directory; thin matrix vs legacy 170-row board; per-card permission summary idea; portal gate-card sameness) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045-050 | §5 / §6 |
| C12-21 | Cross-surface identity propagation (topbar PROFILE / staff directory / portal personas are unlinked fixtures; profile edits must propagate) | PARTIAL | 055 | §3 item 6 |

Honest counts: screenshotsOpened=16 · recordsInspected=15 · currentSourceFiles=10
