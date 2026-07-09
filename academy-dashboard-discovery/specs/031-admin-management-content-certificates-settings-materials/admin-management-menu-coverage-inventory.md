# Admin Management / Settings Menu Coverage Inventory — Spec 031

**Mandatory coverage gate.** Every 031-owned admin menu item is classified below with all required fields. **Zero unclassified.** This extends the Spec-010/029 admin-menu coverage gate; `nav.config.js` stays consistent with the build guard (`nav.config.js:148-156`). Current nav status verified at `app/src/js/nav.config.js` (category `admin` L97-105; category `settings` L107-117).

Disposition legend: **DO**=display-only · **RD**=read-only drawer · **MOD**=backendRequired modal · **GATE**=disabled-with-reason/backendRequired · **FOLD**=into existing page · **FB**=future-backend · **EXCL**=excluded.

## Primary nav items (in `nav.config.js`)

| Menu item | Current nav status | Current route | Current page file | Legacy evidence | Disposition | Owner | Needs page? | Can fold? | Modal/drawer/gate? | Action deepening | Acceptance check |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `staff` | planned (`admin` cat, L99) | none (`staff.html` reserved L143) | none | `management-admins.md` (+perm/category/appear/create/edit) | DO directory + row-kebab; RBAC matrix DO+GATE | 031 | **planning-decided** (page-candidate) | possibly → settings "Users" tab | kebab View(RD)/Edit(MOD,no-pw/salary)/Category(RD)/Permissions(DO+GATE)/Duplicate(MOD)/Delete(GATE) | Add directory+kebab+matrix | directory renders, no `type=password`, no salary figure, no chip mutation |
| `materials` | planned (`admin` cat, L100) | none (`materials.html` reserved L143) | none | `management-materials.md` | DO subject rows + MOD | 031 | planning-decided | possibly fold w/ books | Add/Edit MOD (name/name_ar) | Add catalog + gate | rows render, name-only modal, no files |
| `books` | planned (`admin` cat, L101) | none (`library.html` reserved L143) | none | `management-library.md` | DO media rows + category RD + upload GATE | 031 | planning-decided | possibly fold w/ materials | Add-Material GATE (no `type=file`), Category MOD | Add catalog + category + gates | rows render, no `type=file`, no download link |
| `certificates` | planned (`admin` cat, L102) | none (`certificates.html` reserved L143) | none | `management-pdf.md`, `management-pdf-create.md` | DO templates + static designer preview + Create MOD | 031 | planning-decided | possibly fold certificateRequests in | Edit/Delete/Save GATE/MOD | Add list + static preview | no `<canvas>`, no drag, no `.pdf`, no upload |
| `certificateRequests` | planned (`admin` cat, L103) | none | none | `management-certificate-requests.md` | DO queue + Approve GATE | 031 | planning-decided | **fold into certificates** (tab) | Approve/Reject/Generate/Send GATE | Add queue + gates | no PDF preview, no send, no mutation |
| `settings` | **implemented** (`settings` cat, L109) | `settings.html` | `settings.html`/`.en` | `management-settings-general.md` | HUB (fold target) | 031 | exists | — | tabs/sections | expand into hub | hub renders, theme/lang still real |
| `settingsGeneral` | planned (`settings` cat, L110) | none | none | `management-settings-general.md` | FOLD → settings hub tab (identity + locations slice; pay-rate EXCL) | 031 | No | **Yes → settings.html** | Save GATE | fold as tab/section | Save is gate; no pay-rate field |
| `settingsIntegrations` | planned (`settings` cat, L111) | none | none | `management-settings-integrations.md` | FOLD → settings hub tab (locked-placeholder cards) | 031 | No | **Yes → settings.html** | Connect/Configure/Test FB GATE | fold as tab | no credentials, no `type=password` |
| `settingsCustomization` | planned (`settings` cat, L112) | none | none | `...customisation-personalisation.md` | FOLD → settings hub tab (theme/brand; MsgBuilder EXCL) | 031 | No | **Yes → settings.html** | Save GATE; theme/lang real | fold as tab | Save gate; no invented MsgBuilder fields |
| `settingsNotifications` | planned (`settings` cat, L113) | none | none | `management-settings-notification.md` | FOLD → settings hub tab (figure-free matrix) | 031 | No | **Yes → settings.html** | Save GATE | fold as tab | toggles figure-free, no persist |
| `settingsSecurity` | planned (`settings` cat, L114) | none | none | `...security-policy.md` + general Accessibility | FOLD → settings hub tab (2FA GATE + policy DO); backup EXCL/FB | 031 | No | **Yes → settings.html** | 2FA/Save GATE | fold as tab | 2FA gate; policy display-only; no backup |
| `settingsUsers` | planned (`settings` cat, L115) | none | none | `management-admins.md` | FOLD → the ONE staff home (alias `staff`, B-16) | 031 | No | **Yes → staff/settings** | (see `staff`) | resolve duplicate | one staff surface, not two |

## Sub-surface / non-nav items (grounded, no separate nav anchor)

| Item | Where it lives in legacy | Current nav | Disposition | Owner | Acceptance check |
|---|---|---|---|---|---|
| payment-gateway settings (Stripe/Paypal/Mollie/Xpay/Payoneer/Paymob/Custom) | inside Integrations (`/configure`) | none (facet of settingsIntegrations) | FB (no credentials, no config surface) | future-backend / 030-boundary | no `type=password`, no api-key |
| payout-provider settings (Paymob/Payoneer Payout) | inside Integrations (`/8,9/configure`) | none | FB (no webhook/OAuth) | future-backend | no webhook/secret rendered |
| WhatsApp (Free) connect + insights | inside Integrations (`/1/configure`, insights pages) | none (facet of settingsIntegrations) | DO locked status card + FB gate (authored fake PII) | 031/FB | no phone input, no real PII |
| Email/SMTP integration | inside Integrations (`/11/configure`) | none | FB (no smtp_password) | future-backend | no credentials |
| Backup Settings + Import Data | inside Settings→Security→Data | none | EXCL/FB (no `type=file`, no `backup_email`, no template) | future-backend | no upload/backup affordance |
| expense heads / `heads` | in-page link from Expense (no sidebar) | none | DO + MOD (name/status, **no amount**) | 031 (per 030 register) | figure-free lookup |
| Locations | RBAC-group-name only (no page) | none | FOLD → settings-general display slice | 031 | slice only, no page |
| Message Builder | Customization submenu (504 in crawl) | none | EXCL / generic FB gate | future-backend | no invented fields |
| roles/permissions (Edit-permissions/Category) | row-actions on staff table | none | FOLD → staff RBAC matrix (DO+GATE) | 031 | display-only, Save gate |

## Coverage roll-up
- **031-owned & built (display/fold/modal/gate)**: staff, materials, books, certificates, certificateRequests, settingsGeneral, settingsIntegrations, settingsCustomization, settingsNotifications, settingsSecurity, settingsUsers, expense-heads, Locations-slice, WhatsApp-status-card, RBAC-matrix. **(15)**
- **031-recorded → future-backend**: payment-gateway creds, payout-provider creds, Email/SMTP creds, Backup, Import, Message-Builder, reset-password/invite. **(7)**
- **excluded / owned elsewhere**: teacher-library (025), family cert-notify (family), teacher CV cert (teacher), teacher request-certificate origin (portal), pay-rate/salary fields (030/excluded).
- **Unclassified: 0.**

## Nav / build-guard consequences (to be finalized in planning)
- **Fold-first default**: the six `settings*` items + `settingsUsers` stay `planned` (no route) and are reached as tabs/sections inside the implemented `settings.html` → `nav.config.js` route rules 0-diff (the finance/Spec-030 precedent).
- **Management/content/certificates** (`staff`/`materials`/`books`/`certificates`/`certificateRequests`): planning decides fold-vs-new-page via the page-candidate test; any promotion flips `planned→implemented` + adds a route (build guard enforced) and adds smoke/a11y/screenshot coverage.
- The existing admin-menu coverage gate (Spec-010/029 nav block: 6 rail categories · link-integrity · planned-truthfulness) MUST stay green; every non-implemented item stays a non-navigating `data-coming-soon` button.

## Implementation outcome (Spec 031 shipped — count 97 → 103)
- **Implemented pages** (`nav` planned→implemented + route): `staff`→`staff.html`, `books`→`library.html`,
  `certificates`→`certificates.html`. Admin category still holds exactly **5 items** (membership unchanged; 3 flipped
  to anchors, `materials`/`certificateRequests` stay `planned`/folded).
- **Folded (stay `planned`, reachable inside a hub)**: `materials`→library Materials tab · `certificateRequests`→
  certificates Requests tab · `settingsGeneral/Integrations/Customization/Notifications/Security/Users`→`settings.html`
  tabs · Locations + expense-heads → settings General slices · WhatsApp/Email/payment-gateway/payout → settings
  Integrations locked cards · backup/import/message-builder → settings gates.
- **Future-backend gates**: reset/invite, credentials (gateway/payout/SMTP), backup/import, message-builder.
- **0 unclassified · 0 dead placeholder.** Build guard green (implemented⇒route · non-implemented⇒no route);
  the Spec-010/029 nav block (6 rail categories · link-integrity · planned-truthfulness) stays green.
