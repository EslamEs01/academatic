# Visual Grounding — Spec 031 (Admin Management / Content / Certificates / Settings / Materials)

Targeted Visual Grounding Gate: an **8-agent read-only audit** inspected exact legacy evidence and current source. No memory, no invention, no pixel-clone. All paths relative to repo root. Every capability row in `legacy-management-content-coverage.md` carries its own citations; this file records **which evidence was opened** and the grounding verdict.

## Legacy evidence opened

### Staff / admin users / roles / permissions
- `output/roles/admin/pages/management-admins.md` (list: Name/UserName/Phone/Role/Actions; kebab: Show-activity/Edit-permissions/Category/Edit/Duplicate-with-permissions/Delete) + `html/raw/management-admins.html:1846-1889` (sidebar label **"Users & Staff"**, nested last in Settings group), `:2485-2502` (row kebab), `:2501-2502`/`:2551-2552` (delete form, method-spoofed DELETE, `deleteStud` hook reuse)
- `output/roles/admin/pages/management-admins-create.md:70-91,123` (Add-member form: name/email/username/phone/**password**/**salary**/currency/role[Manager,Accountant,Supervisor,Support]/status/2FA) · `management-admins-6-edit.md:70-92` · `management-admins-duplicate-6.md:70-124` (source_id clone)
- `output/roles/admin/pages/management-admins-permission-6.md:37-273,305-341` (RBAC: ~170 `permisions[]` checkboxes, ~17 groups, select-all/clear-all/search, single Submit) · `management-admins-permission-7.md`
- `output/roles/admin/pages/management-admins-appear-6.md:36-136` (activity log, GET-only filters) · `management-admins-categories-6.md:70-84` (category-scope checkboxes)
- `frontend-planning/03-role-page-inventory.md:72`, `04-permission-and-navigation-matrix.md:28,45,51-67`, `07-data-and-api-surface.md:32-34,100,110`

### Materials / books / library / uploads
- `output/roles/admin/pages/management-materials.md`(+`-create.md`,`-1-edit.md`) (subject catalog: name/name_ar only; legacy title mislabeled "Courses List") + `.txt` variants
- `output/roles/admin/pages/management-library.md:47,88-121,153-240` (media catalog: #/Book-Name/Category/Published-at/Views/Downloads/Status/View/Actions; category CRUD sub-modal; **Add-Material modal with `file` + `thumbnail` `type=file`**; read-only Details modal)
- `frontend-planning/03-role-page-inventory.md:107-108,157,181`, `07-data-and-api-surface.md:77-78,103-104`
- `output/combined/academy-system-map.md:454-463`, `llm-context.md:39`, `form-inventory.md:856-863,1065-1072` (materials/library permission rows)

### Certificates
- `output/roles/admin/pages/management-certificate-requests.md:99-110,152-156` + `html/raw/management-certificate-requests.html:2804-2934` (Approve modal: template select + **live `/certificate/{id}/preview` window.open** + WhatsApp send + `POST /approve`)
- `output/roles/admin/pages/management-pdf.md:95-106` (Templates list) + `html/raw/management-pdf.html:2803-2815` (delete confirm)
- `output/roles/admin/pages/management-pdf-create.md` + `html/raw/management-pdf-create.html:2523-2576,2995,3018-3025,3062-3252` (**Designer = jQuery-UI `.draggable()` over `<img id="cert-bg">`, NOT `<canvas>`; backend FPDF `buildFpdfCommands()`**)
- `output/roles/admin/pages/management-student-1.md:160-170,433-452,644,833-836` (per-course Create-Certificate modal `create-certificate`, Upload-Certificate `upload-certificate` `type=file`, Certificate-Details modal)
- `output/combined/form-inventory.md:786-787,995-996,5856-5859,16061,20247-20257` (RBAC cert perms; family cert-notify toggles; teacher CV `cv_certificates`; teacher request-certificate origin)
- `frontend-planning/06-interactions-and-states.md:46-47`, `frontend-planning-deep/05-distinct-interaction-catalog.md:66,84`

### Settings (general / customization / notifications / security)
- `output/roles/admin/pages/management-settings-general.md:85-181,213-216,241-254` (4 tabs: Identity[+logo `type=file`] · **Teacher Hour-Rates/salary — excluded** · Courses-automation[+`rate_student_absent` %] · Accessibility/2FA[`tfa`+`otp`])
- `output/roles/admin/pages/management-settings-customisation-personalisation.md:74-121,153` + `html/sanitized/...html:2385,2406` (brand colors, theme/layout radios, 11 status colors, logo eyedropper)
- `output/roles/admin/pages/management-settings-customisation-message-builder.md` (**HTTP 504 Gateway Timeout — 0 fields captured**)
- `output/roles/admin/pages/management-settings-notification.md:74-127,159` (~47-field event×role×channel matrix; `salaries` notify-channel row — figure-free)
- `output/roles/admin/pages/management-settings-security-policy.md:39-77` (Family/Teacher Policy WYSIWYG documents)
- `output/roles/admin/pages/management-profile-show.md:74-82`/`management-profile-edit.md:67-84` (password masked as dots; avatar upload) — adjacent Profile module
- `frontend-planning/03-role-page-inventory.md:136-141`, `06-interactions-and-states.md:83,100,112`

### Integrations / notifications-delivery / backup / payment-gateway settings
- `output/roles/admin/pages/management-settings-integrations.md:39-52,121-134` (11 provider cards: Stripe/Paypal/Mollie/Xpay/Payoneer/Paymob/Custom + Paymob/Payoneer Payout + WhatsApp/Email)
- `output/roles/admin/pages/management-settings-integrations-{2..7,10}-configure.*` (payment-gateway `key1-4`/`settings[api_key]` — **unmasked**), `-8/-9-configure.md` (payout Webhook/OAuth: Client-ID/Secret/Username/Password[`type=password`]/Program-ID), `-1-configure.md` (WhatsApp pairing wizard + status), `-11-configure.md` (Email SMTP: host/port/**`smtp_password` type=password**), `-whatsapp-{families,teachers}-insights.md` (real-PII status tables)
- `output/roles/admin/pages/management-settings-security-data.md:40-45,93-149,179-230` (**Backup Settings** `backup_email`+Send; **Import Data** 4×`type=file`, family template exposes `password:123456`) + `-backup-send.md`
- `output/roles/admin/pages/management-payout-providers.md`(+`-{6,7}-edit.md`) (alias route, same forms)
- `output/combined/form-inventory.md:732,825-830,848-851,870,874` (permission flags: integrations/backup/payment-methods/payouts/whatsapp-monitor)

### Content / lookups / expense-heads / legacy menu
- `output/roles/admin/pages/management-heads.md` (Expense Heads: name/status lookup CRUD) + `management-expense.md:47,83,160,174` (head_id filter)
- `output/roles/admin/pages/management-heads.json` `sidebarLinks` (full 68-item sidebar) + `management-admins.md:210-260` (cross-verified)
- `output/roles/admin/role-map.md:20-38,86-94,204-225`, `output/combined/academy-system-map.md:332-337,454-463`
- `output/roles/admin/screenshots/management-admins-permission-6-full.png` (RBAC "Locations" group — no crawled `/management/locations` page)

### Routed-to-031 registers (prior specs)
- `specs/029-.../future-owner-register.md:20-28`, `admin-menu-coverage-inventory.md:75-102`
- `specs/030-.../future-owner-register.md:13,23,24`, `finance-menu-coverage-inventory.md:35,37`, `no-fake-money-register.md` (template)
- `specs/028-.../pay-finance-exclusion-register.md:41-45` (grep-discipline template)
- `specs/024-.../` B-02 (Locations→031), B-16 (settingsUsers duplicate→031); `specs/023-.../missing-capabilities-register.md:28,31,40,62-66,84-85` (M-04/M-07/M-16; 031×12 footprint)
- `specs/016-.../admin-sidebar-page-inventory.md`; `specs/023-.../agent-findings/05-admin-coverage.md:163-177`

### Current source
- `app/src/js/nav.config.js:97-156` (categories admin/settings; 031 items planned; `settings`→settings.html implemented; FUTURE_ROUTES:143; build guard:148-156)
- `app/src/js/pages/settings.js`, `app/src/js/fixtures/settings.js`, `app/src/js/components/settings-section.js`, `app/public/settings.html:460-602` (5 honest sections; 0 tabs today; theme/lang real; 2FA already disabled-with-reason)
- `app/src/js/enhance.js:475-580` (closed data-* dispatch), `app/src/js/components/{directory-card,filter-bar,table,preview-drawer,confirm-modal,tabs,report-actions,finance-actions,ui,status-chip,page-header}.js`
- `app/src/js/i18n.js:4-58` (locale registration), `app/scripts/build-html.mjs:80-187` (48 PAGES entries → 97 HTML; chip-tone guard `:140-151`)
- `app/tests/smoke/run.cjs` (f30 finance block:1019-1056; protected regexes; coverage gate:1100-1176)

## Screenshots referenced (not pixel-cloned — capability evidence only)
`management-admins-full.png`, `management-admins-permission-6-full.png`, `management-materials-full.png`, `management-library-002/003-page-interaction-*.png`, `management-pdf-full.png`, `management-pdf-create-full.png`, `management-certificate-requests-full.png`, `management-settings-general-{full,001..004}.png`, `management-settings-customisation-personalisation-{full,001}.png`, `management-settings-notification-{full,001}.png`, `management-settings-security-policy-{full,001}.png`, `management-settings-integrations-full.png`.

## Evidence gaps (recorded, not invented)
1. **Message Builder** — HTTP 504 at capture; zero fields → excluded/gated, no invented fields.
2. **Locations** — no crawled page; RBAC-group-name only → fold into settings-general as a display slice.
3. **RBAC group count** — sources disagree (17 vs 16 groups / ~170 perms); treat 170/17 as approximate; ground exact copy from `management-admins-permission-6.md`.
4. **Empty legacy tables** — certificate-requests, templates, per-course cert-details all captured empty ("No data found"); the populated Action/Options column contents are unobserved → gate conservatively, author fixture rows.
5. **Provider-specific credential labels** — crawler recorded generic `key1-4`; exact labels (e.g. Stripe "Publishable Key") unknown → irrelevant (credentials never rendered; locked placeholders only).
6. **Real PII in captures** — emails/phones/names in integrations/whatsapp insights → never reused; all fixtures authored fake.

## Grounding verdict
The 031 domain is **fully grounded** in legacy evidence and prior-spec ownership. The dominant shape: **honest, shallow-to-medium admin surfaces** where display is legitimate but every write/secret/file/generation is a gate. `settings.html` is a proven fold hub (finance.html analogue). Highest risks — certificate PDF/canvas, integration credentials, backup/import files, staff password/salary — are all covered by exclusions and gates. No surface requires a new hook, engine, chart, or canvas. What must be fixed in 031: turn the planned nav items into honest display-only surfaces (folded or a small, page-candidate-verified set of new pages), never faking persistence, secrets, files, or generation.
