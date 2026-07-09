# Missing-Action Register — Spec 031

Every missing / dead / misleading / out-of-scope 031 action or page, resolved. **Prefix `C-`** (Content/management/Certificates/settings) — one consistent prefix for Spec 031. **No row unresolved.**

Resolution legend: **BUILD**=build honestly in 031 · **FOLD**=fold into existing page · **GATE**=disabled-with-reason/backendRequired · **FB**=future-backend · **EXCL**=intentionally-excluded.

| ID | Page/Menu | Action/Page | Problem | Evidence | Resolution | Fix now (031)? | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|---|
| C-01 | staff | Staff directory | planned nav, no page/surface | `management-admins.md`; nav L99 | BUILD DO directory + row-kebab | Yes | 031 | directory renders; no salary/pw |
| C-02 | staff | Add/Edit staff | legacy form carries `password`+`salary` | `management-admins-create.md:70-91` | BUILD MOD **omitting password + salary** | Yes | 031 | modal has no `type=password`, no salary |
| C-03 | staff | RBAC permission matrix | ~170-checkbox real engine risk | `management-admins-permission-6.md:37-341` | BUILD DO grouped matrix + Save GATE | Yes | 031 | toggling mutates nothing; Save is gate |
| C-04 | staff | Category-scope / Activity log | not surfaced | `management-admins-categories-6.md`, `-appear-6.md` | BUILD RD + assign GATE / DO log | Yes | 031 | drawer read-only; assign is gate |
| C-05 | staff | Delete / Deactivate / Activate | mutation risk | `html/raw/management-admins.html:2501-2552` | GATE (confirm, no mutation) | Yes | 031 | confirm mutates nothing |
| C-06 | staff | Reset-password / Invite | no legacy flow; password risk | audit gap (none found) | FB gate (no password field) | Record | future-backend | gate only, no `type=password` |
| C-07 | staff/settingsUsers | duplicate staff home | two nav spots (B-16) | `024` B-16; nav L99 vs L115 | resolve → ONE staff home; alias/fold duplicate | Yes | 031 | single staff surface |
| C-08 | materials | Subject catalog | planned nav, no page | `management-materials.md`; nav L100 | BUILD DO rows + name-only MOD | Yes | 031 | rows render; name-only modal |
| C-09 | books/library | Media catalog | planned nav, no page | `management-library.md`; nav L101 | BUILD DO rows (count literals) | Yes | 031 | rows render; no computed count |
| C-10 | books/library | Add-Material / Upload (file+thumbnail) | real `type=file` ×2 | `management-library.md:104-121` | GATE (**no `type=file`**) | Yes | 031 | no `type=file`; gate surfaces reason |
| C-11 | books/library | Category CRUD | not surfaced | `management-library.md:88-102` | BUILD RD list + name-only MOD | Yes | 031 | read-only list + name modal |
| C-12 | books/library | Download / Publish / Delete | fake-file/publish risk | `management-library.md` Actions | GATE (no file/publish) | Yes | 031 | no `.pdf`/download link |
| C-13 | certificates | Templates list | planned nav, no page | `management-pdf.md`; nav L102 | BUILD DO rows | Yes | 031 | rows render |
| C-14 | certificates | Designer | jQuery-UI drag-drop; FPDF backend | `html/raw/management-pdf-create.html:2523-3252` | BUILD **static preview** + Save MOD (no drag/canvas/upload) | Yes | 031 | no `<canvas>`, no drag, no upload |
| C-15 | certificateRequests | Approve/Reject | live PDF preview + WhatsApp send + mutation | `html/raw/management-certificate-requests.html:2804-2934` | GATE (no PDF/send/mutation) | Yes | 031 | no `window.open`, no `.pdf`, no mutation |
| C-16 | certificates | Generate/Download/Preview/Upload-cert | fake-PDF/file risk | `management-student-1.md:160-170,433-452` | GATE (no file, no `type=file`) | Yes | 031 | no file affordance |
| C-17 | certificateRequests | queue page vs fold | separate nav item | nav L103 | FOLD into certificates (tab) OR page — planning decides | Yes | 031 | queue reachable; no dead nav |
| C-18 | settings* (×6) | six settings sub-pages | planned nav, no page | nav L110-115 | FOLD → settings.html tabs/sections | Yes | 031 | reachable in hub; count held |
| C-19 | settingsGeneral | pay-rate / salary-% fields | finance/pay figure | `management-settings-general.md:110-165` | EXCL (omit; "managed in Finance" pointer) | Yes | 030/excluded | no pay figure on settings |
| C-20 | settingsGeneral | logo upload | `type=file` | `management-settings-general.md:85-108` | GATE (no `type=file`) | Yes | 031 | no `type=file` |
| C-21 | settingsGeneral | Locations slice | RBAC-group-name only, no page | `024` B-02; perm screenshot | FOLD (country/city/timezone/address slice) | Yes | 031 | slice display-only, no page |
| C-22 | settingsCustomization | Message Builder | 504 in crawl, no fields | `...message-builder.md` | EXCL / generic FB gate (no invented fields) | Record | future-backend | no invented fields |
| C-23 | settingsCustomization | theme/brand/status colors | persist risk | `...personalisation.md:74-121` | theme/lang real; brand/status colors Save GATE | Yes | 031 | theme real; colors save-gated |
| C-24 | settingsNotifications | ~47 toggles incl. `salaries` | figure/persist risk | `management-settings-notification.md:74-127` | DO figure-free toggles + Save GATE | Yes | 031 | `salaries` row figure-free |
| C-25 | settingsSecurity | 2FA | mutation risk | general Accessibility tab | GATE (extend `#set-account`) | Yes | 031 | 2FA gate only |
| C-26 | settingsSecurity | Policy documents | live WYSIWYG risk | `...security-policy.md:39-77` | DO static text + edit GATE (no live editor) | Yes | 031 | no `contenteditable`/rich editor |
| C-27 | settingsSecurity | Backup / Import | LMS export + `type=file` + `password:123456` | `management-settings-security-data.md` | EXCL/FB (no `type=file`, no `backup_email`, no template) | Record | future-backend | no upload/backup affordance |
| C-28 | settingsIntegrations | Provider cards | 11 cards | `management-settings-integrations.md:39-52` | DO locked-placeholder (name+status) | Yes | 031 | cards show name/status only |
| C-29 | settingsIntegrations | Connect/Configure/Test/Save-creds | credentials/`type=password` | `...integrations-{2..11}-configure.*` | FB gate (**no credentials**) | Record | future-backend | no `type=password`/api-key |
| C-30 | settingsIntegrations | Payment-gateway / Payout-provider config | secrets/webhooks (030 boundary) | `...integrations-{2..9}-configure.md` | FB (no config surface) | Record | future-backend/030 | no credentials, no webhook |
| C-31 | settingsIntegrations | WhatsApp connect + insights | pairing wizard + real PII | `...integrations-1-configure.md`, insights | DO locked status card + FB gate (authored fake data) | Yes (card) | 031/FB | no phone input, no real PII |
| C-32 | settingsIntegrations | Email/SMTP | `smtp_password` type=password | `...integrations-11-configure.md` | FB (no credentials) | Record | future-backend | no `type=password` |
| C-33 | content | Expense heads lookup | finance-adjacent; owner tension | `management-heads.md`; `030` register | BUILD DO + MOD (**name/status, no amount**) | Yes (if surfaced) | 031 | figure-free lookup |
| C-34 | (global) | Real PII in fixtures | legacy captures leak PII | integrations/whatsapp insights | EXCL (authored fake data only) | Yes | 031 | no captured PII in fixtures |
| C-35 | (global) | Export/Print/PDF/CSV/Excel/Download | fake-file risk | across surfaces | GATE (no file, no print) | Yes | 031 | zero real export |

## Out-of-scope / owned elsewhere (recorded, not built by 031)
| ID | Item | Owner | Note |
|---|---|---|---|
| C-36 | teacher-library | Spec 025 | already built; do not duplicate |
| C-37 | family cert-notification toggles | family settings | adjacent; don't duplicate |
| C-38 | teacher CV `cv_certificates` | teacher onboarding | name collision only; exclude |
| C-39 | teacher request-certificate (queue origin) | teacher portal | pre-seed fixture rows; no live path |
| C-40 | stale-map / final coverage sweep | Spec 032 | final QA |

**Unresolved rows: 0.**
