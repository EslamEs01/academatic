# Batch 18 — admin · Settings (General, Customisation, Integrations, Security/Backup)

---

### `management-settings-customisation-personalisation` — Personalisation

- **Purpose:** Lets admin customise the LMS visual identity — theme colours, light/dark/system mode, layout width, sidebar state, card style, and per-status colour codes for classes.
- **Key sections / flows:** Single card "Personalisation" with sub-sections: Global Appearance (primary colour picker `#5865F2`, secondary `#7B6BA8`, theme radio, container width radio, sidebar type radio, card style radio); Class Status Colours section mapping 11 statuses (pending, waiting, teacher-absent, student-absent, teacher-cancel, student-cancel, admin-cancel, attend, reschedule, running, makeup) to colour pickers + hex inputs.
- **Key SAFE actions:** View all courses, View All Queues (navigation only).
- **Key MUTATING/dangerous actions:** "Apply for me" (AI/auto colour apply), "Reset" (resets colour form), "Reset to Default" (resets all to system defaults), "Save changes" (persists all personalisation settings via POST to `/management/settings/customisation/personalisation`).
- **Important modals/forms:** Form 2 posts to the personalisation endpoint with 43 fields (radio groups + paired color/text inputs for each status). No confirmation dialog before Save.
- **Variant-of:** Unique template (distinct colour-mapping UI not seen elsewhere).
- **Broken/empty:** Logo image returns 404 (`/storage/uploads/logo.png`) — consistent across all settings pages; not a page-level error, just a missing asset.
- **UX improvement for the rebuild:** Add live preview of the colour theme applied to a miniature UI mock, and require a confirmation step before "Reset to Default" since it wipes all customisation irreversibly.

---

### `management-settings-general` — General Settings

- **Purpose:** Central configuration hub for school-wide operational settings, split across four tabs: General (company identity + location), Teachers (pay rates + salary schedule), Courses & Classes (renewal/cancellation/automation rules), and Accessibility (2FA + OTP).
- **Key sections / flows:**
  - **General tab:** Company name (EN + AR), domain, contact email, phone, WhatsApp, logo upload, country/city/timezone selects, full address.
  - **Teachers tab:** Default session rate, tiered hour-rate rules (if-greater-than thresholds), salary period type (monthly or custom start day), lateness-discount tiers.
  - **Courses & Classes tab:** Status after renewal, auto-renew unpaid courses, stop-after-N-invoices, monthly plan email, teacher/family cancel permissions, automatic cancel rule (daily 4AM), makeup credit rules, classes-not-closed handling, cancellation window (minutes), teacher-absent-student flag + rate, pre-class entry minutes, teacher-edit permission.
  - **Accessibility tab:** Two-factor auth toggle (OTP via phone), shared OTP number for all admin/support users.
- **Key SAFE actions:** Tab switching (General / Teachers / Courses & Classes / Accessibility) — navigation only, no page reload.
- **Key MUTATING/dangerous actions:** "Save changes" on each of the four tabs (4 separate POST endpoints: `/settings/general/update`, `/settings/general/teachers/update`, `/settings/general/courses-classes/update`, `/settings/general/accessibility/update`); "Remove" buttons on salary tier rows (removes a dynamically-added rate tier).
- **Important modals/forms:** No dedicated modals; all editing is inline within the tabbed form sections.
- **Variant-of:** Unique template (multi-tab settings hub with four independent save flows).
- **Broken/empty:** Logo 404 as above. No other errors observed.
- **UX improvement for the rebuild:** The four tabs each have their own "Save changes" button with no cross-tab dirty-state indicator — users can navigate away from an unsaved tab without warning. Rebuild should track per-tab dirty state and warn on tab switch or navigate-away.

---

### `management-settings-integrations` — Integrations Hub (index)

- **Purpose:** Landing page listing all available third-party integrations grouped by category (Payments incoming, Payouts outgoing, Communications), each with a "Configure" link.
- **Key sections / flows:** H3 heading "Integrations"; category H4s: Payments (incoming) — Stripe, Paypal, Mollie, Xpay, Payoneer, Paymob, Custom; Payouts (outgoing) — Paymob Payout, Payoneer Payout; Communications — Whatsapp (Free), Email. Each card shows the provider name, a short description, and a "Configure" navigation link. Tab/badge bar shows: Communication, Mail Service, Payments, Webhooks (likely filter tabs, though no query-param change was observed).
- **Key SAFE actions:** 11 "Configure" navigation links, tab badges for category filtering.
- **Key MUTATING/dangerous actions:** None on the index page itself (all mutations are on configure sub-pages).
- **Important modals/forms:** None beyond global chrome.
- **Variant-of:** Unique template (integration catalogue/hub, no CRUD on this page).
- **Broken/empty:** No data errors. Logo 404 as above.
- **UX improvement for the rebuild:** Add connection-status badges (connected/disconnected/error) directly on each integration card, so admins can see health at a glance without clicking into each provider.

---

### `management-settings-integrations-1-configure` — WhatsApp (Free) Configure

- **Purpose:** Wizard to connect a personal WhatsApp number via unofficial/free integration, plus operational controls (status, test messaging, connection insights).
- **Key sections / flows:**
  - "WhatsApp Setup Wizard" — 4-step stepper: (1) Phone number, (2) Pairing Code, (3) Finishing Setup, (4) Success. User enters phone, receives pairing code to enter in WhatsApp's "Linked Devices" → "Link with Phone Number".
  - "Caution" card — disclaimer that this is unofficial, may break, encourages official WhatsApp Business API.
  - "Free Whatsapp Status" card — connection status badge (Connected / Disconnected count), Logout button, send-mode selector (group vs private), Update buttons for group/private send settings, Group Test / Private Test send buttons, Insights panel showing families/teachers connected to WhatsApp groups with Retry sync actions.
- **Key SAFE actions:** Copy (webhook/code), Retry, Refresh, Wake connection (status checks).
- **Key MUTATING/dangerous actions:** "Start Setup" (initiates pairing), "Logout" (disconnects WhatsApp session — dangerous, will break all WA notifications), "Update" ×2 (save send-mode settings), "Send" ×2 (send test messages to group/private).
- **Important modals/forms:** 4-step wizard embedded in page; a `send_group` select filter controls routing.
- **Variant-of:** Unique template (multi-step wizard + live-status panel, no other page has this pattern).
- **Broken/empty:** "Connected: 0" badge visible — may indicate no families/teachers connected in the test environment.
- **UX improvement for the rebuild:** The "Logout" button sits inline with status controls without a confirmation dialog; a destructive-confirm modal is essential since logout instantly kills all WhatsApp automation for the whole school.

---

### `management-settings-integrations-2-configure` — Stripe Configure

- **Purpose:** Manage Stripe payment gateway credentials — list existing Stripe API key sets per "payment name + family count" and add new ones.
- **Key sections / flows:** Info card (description of Stripe). Table with columns #, Name, Number Of Family, Key 1, Key 2, Settings (Edit/Delete row actions). "Add Payment" link navigates to create form.
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment" (creates a new Stripe key set), row-level "Edit" and "Delete" (table contains "No data found" in test environment so no live rows, but Delete would remove credentials).
- **Important modals/forms:** None captured; Add Payment likely goes to a separate form page.
- **Variant-of:** Base template for standard payment gateway configure pages (Stripe is the canonical instance; Paypal/Mollie/Xpay/Payoneer/Paymob all share this exact layout — confirmed by identical DOM counts and token values across slugs 2–7).
- **Broken/empty:** Table shows "No data found" — empty state (no gateways configured in test env).
- **UX improvement for the rebuild:** Column labels "Key 1" / "Key 2" are ambiguous; rename to the provider-specific names (e.g., "Publishable Key" / "Secret Key" for Stripe) and mask secret key values in the table with a reveal-on-hover toggle.

---

### `management-settings-integrations-3-configure` — Paypal Configure

- **Purpose:** Manage PayPal Client ID / Client Secret credential sets.
- **Key sections / flows:** Same pattern as Stripe: info card + table (#, Name, Number Of Family, Client ID, Client Secret, Settings with Edit/Delete) + "Add Payment" link.
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None on page.
- **Variant-of:** Variant of `management-settings-integrations-2-configure` (standard payment gateway configure template). Column heading differs: "Key 1" → "Client ID", "Key 2" → "Client Secret".
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Same as Stripe — show humanised credential names; also add environment badge (Sandbox/Live) so admins can immediately see which credential sets are live vs test.

---

### `management-settings-integrations-4-configure` — Mollie Configure

- **Purpose:** Manage Mollie API key sets for European payment methods (iDEAL, cards, SEPA, etc.).
- **Key sections / flows:** Same standard payment gateway template: info card + credentials table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Same as above (environment badge + meaningful column names).

---

### `management-settings-integrations-5-configure` — Xpay Configure

- **Purpose:** Manage XPay key sets for Egypt/MENA card, Fawry, and wallet payments.
- **Key sections / flows:** Standard payment gateway template — info + table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Consider adding a "families using this gateway" count as a read-only column so admins know impact before deleting.

---

### `management-settings-integrations-6-configure` — Payoneer Configure

- **Purpose:** Manage Payoneer credential sets for global payment collection.
- **Key sections / flows:** Standard payment gateway template — info + table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Same credential-masking and environment label improvements.

---

### `management-settings-integrations-7-configure` — Paymob Configure

- **Purpose:** Manage Paymob (Accept) credential sets for Egypt/MENA card, wallet, kiosk, and Valu payments.
- **Key sections / flows:** Standard payment gateway template — info + table (Key 1 / Key 2) + "Add Payment".
- **Key SAFE actions:** View table.
- **Key MUTATING/dangerous actions:** "Add Payment", row Edit/Delete.
- **Important modals/forms:** None.
- **Variant-of:** Variant of `management-settings-integrations-2-configure`.
- **Broken/empty:** "No data found" empty state.
- **UX improvement for the rebuild:** Distinguish visually from Paymob Payout (slug 8) since both are "Paymob" — use clear "Paymob Accept" vs "Paymob Payout" labelling.

---

### `management-settings-integrations-8-configure` — Paymob Payout Configure

- **Purpose:** Configure Paymob Disburse credentials for disbursing instructor salaries via mobile wallets; form also displays webhook URL for provider callbacks.
- **Key sections / flows:** Single card "Webhook URL" with copyable callback URL. Form fields: Mode (Sandbox/Live select), Active checkbox, Client ID (key1), Client Secret (key2), Username (key3), Password/key4 (password input). Note clarifies these are Paymob Payouts/Disburse credentials, different from Paymob Accept. "Back" navigation link. "Save" submits to `/payout-providers/7`.
- **Key SAFE actions:** Copy webhook URL, Back navigation.
- **Key MUTATING/dangerous actions:** "Save" (writes payout provider credentials to DB — switching Mode from Sandbox to Live would affect real payouts).
- **Important modals/forms:** Payout provider form (mode + 5 credential fields).
- **Variant-of:** Unique template within configure pages — payout providers have a different form structure (single-record credential form with Mode/Active toggles + webhook URL) vs incoming payment gateways (multi-record key table).
- **Broken/empty:** No errors; actual URL resolves to `/payout-providers/7/edit` (note: slug was accessed as integrations/8/configure but redirects to payout-providers route).
- **UX improvement for the rebuild:** Show current credential status (last-verified, last-successful-payout) alongside the form so admins know if existing credentials are valid before changing them.

---

### `management-settings-integrations-9-configure` — Payoneer Payout Configure

- **Purpose:** Configure Payoneer Mass Payouts credentials for disbursing instructor salaries globally.
- **Key sections / flows:** Same payout-provider template as slug 8: webhook URL card, Mode select (Sandbox/Live), Active checkbox, Username/Login (key1), API password/Key (key2), Program ID (key3). Submits to `/payout-providers/6`. "Back" link.
- **Key SAFE actions:** Copy webhook URL, Back navigation.
- **Key MUTATING/dangerous actions:** "Save" (writes Payoneer payout credentials).
- **Important modals/forms:** Payout provider form (3 credential fields vs 4 in Paymob Payout).
- **Variant-of:** Variant of `management-settings-integrations-8-configure` (payout provider configure template).
- **Broken/empty:** No errors. Actual URL is `/payout-providers/6/edit`.
- **UX improvement for the rebuild:** Same as slug 8 — show last-payout-status and credential validation date.

---

### `management-settings-integrations-10-configure` — Custom Payment Configure

- **Purpose:** Manage custom/offline payment methods (bank transfers, cash, manual workflows) that exist outside automated gateways.
- **Key sections / flows:** Info card (description). Table with columns #, Name, Number Of Family, Key 1, Key 2, Settings (Edit/Delete). One live sample row: "احمد محمد" (2 families, key "01015264856"). "Add Payment" link. Pagination showing "2" (second page links to families filtered by payment_methods[0]=1).
- **Key SAFE actions:** View table, paginate.
- **Key MUTATING/dangerous actions:** "Add Payment" (create custom payment method), row "Edit", row "Delete" (remove a payment method that families may already be using).
- **Important modals/forms:** None captured on page.
- **Variant-of:** Variant of `management-settings-integrations-2-configure` (payment configure template), but uniquely has actual live data (1 record) vs the "No data found" empty state of all other payment gateways.
- **Broken/empty:** Not broken; has real data. Logo 404 as above.
- **UX improvement for the rebuild:** "Delete" on a custom payment method that has "Number Of Family = 2" should be blocked or require an explicit migration step (reassign those families to another method), not just a simple confirm/delete.

---

### `management-settings-integrations-11-configure` — Email Integration Configure

- **Purpose:** Configure SMTP email accounts for CRM messaging and automated notifications; manage multiple accounts with default/active flags.
- **Key sections / flows:** Two top-level tabs: "Accounts" and "Mail Settings".
  - **Accounts tab** (default): Table (#, Email Address, Default, Status, Settings with Edit/Delete); "Add Email Account" link goes to add-account sub-tab. Sub-tabs: "Add Email Account" (inline form — Email Address, SMTP Username, SMTP Password, Active checkbox, Default checkbox, Test SMTP button, Submit) and list view of existing accounts.
  - **Mail Settings tab:** Global SMTP host/port/encryption form (smtp.example.com, port number, encryption select: None/SSL/TLS), Submit.
- **Key SAFE actions:** Tab switching (Accounts / Mail Settings), "Test SMTP" (sends a test connection check).
- **Key MUTATING/dangerous actions:** "Add Account" / "Submit" (create a new email account), "Mail Settings" → "Submit" (changes global SMTP settings affecting all outgoing email), row Delete (removes an email account), "Add Email Account" link.
- **Important modals/forms:** Add Email Account form (email, SMTP username, password, active, default toggles); Mail Settings form (host, port, encryption).
- **Variant-of:** Unique template (tabbed email account management + SMTP settings, distinct from payment gateway template).
- **Broken/empty:** Table shows "No data found" — no email accounts configured in test environment.
- **UX improvement for the rebuild:** "Test SMTP" should show real-time feedback (loading spinner → success/failure message with connection details) rather than silently submitting; currently the UX intent is unclear.

---

### `management-settings-security-data-backup-send` — Security / Data Backup Send

- **Purpose:** This page's slug suggests it is a security/data-backup-send action page, but the captured content is actually the Email integration configure page (identical to slug 11 in structure and content). The crawler appears to have captured this URL while navigating from `/settings/security/data` but rendered the email configuration state from integration 11.
- **Key sections / flows:** Same as `management-settings-integrations-11-configure` (Accounts + Mail Settings tabs, SMTP forms, email account table).
- **Key SAFE actions:** Same as slug 11.
- **Key MUTATING/dangerous actions:** Same as slug 11 (Submit email account, Submit SMTP settings).
- **Important modals/forms:** Same as slug 11.
- **Variant-of:** Variant of (or duplicate of) `management-settings-integrations-11-configure` — the URL is `/settings/security/data/backup/send` but the page content matches the Email integration configure view. This is likely a crawler navigation artefact where clicking "send backup" redirected through the email config page; the actual backup-send functionality (if it exists) was not distinctly captured.
- **Broken/empty:** Page loaded (200 OK) but content does not match the URL slug's implied purpose (security/backup). Actual URL in interaction logs resolves to `/settings/integrations/11/configure`. This may indicate that the backup-send action uses the email integration to send the backup, or that the crawler followed a misleading link.
- **UX improvement for the rebuild:** If a "send data backup via email" feature exists, it should have its own dedicated confirmation page (choose destination email, confirm, show download/send progress) rather than dumping the user into the generic email account configuration screen.

---

## Module synthesis (this batch)

### What this module does and its core entities

This batch covers the admin **Settings** module, specifically:
- **General settings** (organisation identity, timezone, teacher pay tiers, class-cancellation/makeup rules, 2FA)
- **Personalisation** (theme, colours, sidebar, per-class-status colour codes)
- **Integrations** (11 external service connectors grouped as: incoming payments ×7, outgoing payouts ×2, communications ×2)
- **Security/backup** (likely sends a data backup via email; captured as duplicate of email integration page)

Core entities: payment gateway credential sets (keyed per provider, linked to "Number Of Family"), payout provider credentials (single-record per provider), email accounts (SMTP credentials, default flag), WhatsApp connection session, school configuration scalars.

### Distinct page templates vs variant count

| Template | Pages using it |
|---|---|
| Multi-tab general settings hub | 1 (slug: general) |
| Theme/colour personalisation | 1 (slug: customisation-personalisation) |
| Integration catalogue index | 1 (slug: integrations) |
| WhatsApp wizard + status panel | 1 (slug: integrations-1) |
| Standard payment gateway configure (info + key table + Add) | 6 variants (Stripe=2, Paypal=3, Mollie=4, Xpay=5, Payoneer=6, Paymob=7) |
| Custom payment configure (same template but with live data) | 1 variant (slug: integrations-10) |
| Payout provider configure (single-record form + webhook URL) | 2 variants (Paymob Payout=8, Payoneer Payout=9) |
| Email integration configure (tabbed: accounts + SMTP settings) | 2 pages (integrations-11, security-data-backup-send are identical) |

**Unique templates: 7. Variant pages: 8.**

### Cross-cutting interactions (modals/filters/tabs) and which are dangerous

- **WhatsApp "Logout"** — appears inline, no confirm dialog. Destroys entire WA session. Dangerous.
- **Paymob/Payoneer Payout "Save"** — switches between Sandbox/Live mode. Dangerous if wrong mode is saved.
- **Custom payment "Delete"** — deletes a payment method that families are actively using. Dangerous; no guard observed.
- **General Settings "Remove" (salary tier)** — removes configured rate tiers inline. Mildly dangerous; no confirm observed.
- **Email "Submit" (Mail Settings tab)** — changes global SMTP config affecting all outbound mail. Dangerous.
- **General Settings "Save changes" ×4** — each tab has its own save; no cross-tab dirty-state warning.
- **WhatsApp "Send" ×2** — sends actual WhatsApp messages to families/teachers as a test. Dangerous in production.
- **Personalisation "Reset to Default"** — nukes all colour customisation without confirm. Dangerous if accidental.

All tabs in the integrations configure pages (WhatsApp wizard steps, Email Accounts/Add Account/Mail Settings) are safe navigation only.

### Improvements for the new platform

1. **Confirmation dialogs:** WhatsApp Logout, "Reset to Default" (personalisation), credential Delete, and "Send" test messages all need explicit confirm modals with impact statements (e.g., "This will stop all WhatsApp notifications for N families").
2. **Dirty-state guard:** General Settings tabs — show unsaved-changes badge per tab and warn before navigating away.
3. **Credential masking:** Payment gateway tables show API keys in plain text columns ("Key 1" / "Key 2"). Rebuild should mask secrets and use reveal-on-demand, with humanised column names per provider.
4. **Integration status overview:** The integrations index should show live connection health (connected/error/unconfigured) on each card, not just a description. Reduces need to click into each provider.
5. **Custom payment method guard:** Block delete if "Number Of Family" > 0; require reassignment to another method first.
6. **WhatsApp integration warning banner:** The unofficial/free WhatsApp integration has a "Caution" block but it is buried below the wizard. Move it to the top as a persistent warning banner until the admin acknowledges it.
7. **Sandbox/Live mode clarity:** Payout provider forms should have a prominent mode indicator at the top of the page (not just a dropdown), and show a warning if switching from Sandbox to Live.
8. **Email Test SMTP feedback:** Show real-time spinner and success/error message when testing SMTP connectivity.
9. **Class status colour preview:** Personalisation page has 11 status colour pickers but no live preview. A mini-calendar or class-card mock that updates in real time would dramatically improve usability.
10. **RTL readiness:** All pages are LTR-only. Arabic company name exists as a field in General settings, implying the LMS operates in Arabic too. The rebuild must be RTL-first with bidirectional layout support for all settings forms.
11. **Security/backup page:** Needs its own distinct template — the current crawler captured the email integration page instead. Confirm with backend whether "send backup" is a standalone feature or a sub-action of the email integration.
12. **Accessibility (general settings tab):** The shared OTP phone number for all admins is a security anti-pattern. Flag for backend confirmation — individual admin OTP phones would be safer.

### Anything that needs owner/backend confirmation

- Does `/settings/security/data/backup/send` have its own distinct page or does it redirect through the email integration? The captured content is ambiguous.
- Is "Webhooks" (badge seen on the integrations index) a real tab/filter for a webhooks section not yet discovered?
- The "Apply for me" button on personalisation — what does it apply? Confirm if this is an AI colour suggestion or something else.
- Custom payment "Key 1" / "Key 2" column names — what do they represent for each provider? Need API spec to rename them correctly in the rebuild.
- Shared OTP phone for all admins (accessibility tab) — is this intentional? Security review recommended.
- WhatsApp integration: does the system support the official WhatsApp Business API as an alternative (referenced in the Caution card) — if so, where is that configure page?
