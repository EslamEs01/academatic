# Legacy Settings Coverage (Spec 040)

Legacy = the crawled admin console (`output/roles/admin/**`) + the two planning corpora. **Capability and workflow evidence only** — no styling, branding, wording, code or assets are reused.

## 1. Legacy Settings sidebar (as rendered)

`General · Integrations · Customization ▾ (Message Builder · Personalisation) · Notifications · Security ▾ (System Data · Policy) · Users & Staff`

This is **exactly** the six-item shape the current app's settings nav category mirrors. **Payment Methods is not in it** — it is reached through Integrations → Payments (incoming) → Configure → *Add Payment*.

## 2. Route coverage

| Route | HTTP | Forms | Visible fields | Owner in this spec |
|---|---|---|---|---|
| `/management/settings/general` (4 tabs) | 200 | 4 | **41** (11 + 10 + 18 + 2) | `general-settings-scope.md` |
| `/management/settings/notification` | 200 | 1 | **47** | `notification-settings-scope.md` |
| `/management/settings/integrations` | 200 | 0 | 11 `Configure` links | `integrations-scope.md` |
| `/management/settings/integrations/{1..11}/configure` | 200 ×9, **302** ×2 | varies | see provider matrix | `integrations-scope.md` |
| `/management/settings/integrations/whatsapp/{families,teachers}/insights` | 200 | 0 | 2 read-only tables | **NOT rebuilt** — see future-owner register |
| `/management/settings/security/data` | 200 | 4 + 1 AJAX | **6** | `security-settings-scope.md` |
| `/management/settings/security/data/backup/send` | **302** → the Email/SMTP integration | — | — | Recorded as a **defect**, not a feature |
| `/management/settings/security/policy` | 200 | 0 (AJAX) | **2** editors | `security-settings-scope.md` |
| `/management/settings/customisation/personalisation` | 200 | 1 | **35** | `customisation-settings-scope.md` |
| `/management/settings/customisation/message-builder` | **504** | 0 | **0** | **UNKNOWN** — never invented |
| `/management/settings/payments/create?payment_method=1..7` | 200 ×7 | 7 | 2–7 each | `payment-methods-scope.md` |
| `/management/settings/payments/{id}/edit` | 200 | 1 | 2 | `payment-methods-scope.md` |
| `/management/settings/payments` (index) | **does not exist** | — | — | Verified against page-inventory, route-graph, endpoints |

## 3. Write-endpoint register (legacy)

`PATCH /settings/general/update` · `/general/teachers/update` · `/general/courses-classes/update` · `/general/accessibility/update` · `POST /settings/notification/update` · `POST /settings/security/data/import` (multipart, `type` 1–4) · `PATCH /settings/security/data/backup/update` · `GET →302 /settings/security/data/backup/send` · `PATCH /settings/security/policy/update` · `PUT /settings/customisation/personalisation` · `POST /settings/payments` · `POST /payout-providers/{6,7}` · `POST /settings/email-accounts` · `POST /settings/email-accounts/settings` · `/settings/email-accounts/test` · `…/whatsapp/{pairing-code/get, qr/get, wake, test}` + `POST /broadcasting/auth`.

**Every one of these is a backend obligation.** In Spec 040 each corresponding UI action is a `data-disabled-reason` gate.

## 4. Planning-corpus ownership (what the corpus itself said)

- Settings is **admin-only** (`frontend-planning/04-permission-and-navigation-matrix.md:40`); "an **Accountant sees Finance, not Settings**" (`09-permission-navigation-matrix-v2.md:35`).
- RBAC permission groups relevant here: **System Settings (6)** · **Payment Methods (3)** · **Locations (4)**.
- The corpus assigned settings to a notional **S011** ("Settings + Profile + RBAC polish + Error/Utility", 27 pages) and **payment methods to S007** — i.e. the corpus itself treated payment methods as a *separate* concern from settings configuration. Spec 040 keeps them in one place (Integrations) because the legacy UI itself reaches payment methods only through Integrations.
- Integration variants = **exactly 11** (`08-role-page-inventory-v2.md:170`). Payment-method create variants = **exactly 7** (+1 edit) (`06-complete-data-surface.md:366`).
- Notification field count: the corpus says **47** (`ALL-page-interpretations.md:1713`), 48 including `_token`. Raw HTML confirms **47**.
- Personalisation field count: **43** per the corpus; raw HTML shows **35 visible** (+2 hidden), 17 distinct names. Both are recorded; the rebuild works from the **17 distinct names**.

## 5. Legacy defect register (evidence of what NOT to reproduce)

| # | Defect | Consequence for Spec 040 |
|---|---|---|
| L-1 | Message Builder returns **504** | No capability evidence exists → honest gate, never a mock |
| L-2 | `backup/send` is a **302** into the SMTP page; the crawl **fired a real DB backup with no confirm** | Send Backup = confirm + gate; no SMTP secret surface |
| L-3 | Every gateway credential is a plain `type=text` input; the gateway tables **print Key 1 / Key 2 in plain text** | Sensitive fields = structure-only rows; never an input, never a value |
| L-4 | **PayPal defaults to `Live`**, Payoneer to `Sandbox` | Mode must be explicit, never defaulted to live |
| L-5 | `Key 1` / `Key 2` used as credential labels for 6 providers | Meaningful provider-specific labels are mandatory |
| L-6 | Families import CSV requires a **plaintext `password`** column; teachers + families carry **`hour_rate`** | Column references must exclude credential and pay columns |
| L-7 | 4th import card **mis-titled "Upload families"** (it is invoices) and has no template | Import types must be correctly and distinctly labelled |
| L-8 | 11 status colours collapse to **7 distinct hex values** | Status must be icon + text, never colour alone |
| L-9 | WhatsApp insights leaks a live **group-invite URL** + unmasked phone numbers | Not rebuilt in Settings; recorded as a privacy risk for Spec 043 |
| L-10 | The Accessibility tab is inert (2FA disabled, Save card hidden); copy promises password complexity and session timeouts that **do not exist** | 2FA is an honest gate; no promised-but-absent copy |
| L-11 | No bulk-import action has a confirmation dialog — "the highest risk item in this batch" | Destructive actions get a confirm **before** the gate |
| L-12 | `send_plan_report` used **twice** (duplicate name *and* id); `teacher_send_manual_reminder` sits inside the Family block; `student_*` fields are labelled "Family" everywhere | Field naming must be unambiguous; recipients named honestly |
| L-13 | Typos/rot: `whats App`, `appnotifiy`, `applayFins`, "1th…28th" ordinals, lowercase `monthly plan`, `LMS-s`, Arabic text inside `Domain Name`, logo 404 on every settings page | None reproduced |
| L-14 | Four separate `Save changes` buttons across the General tabs with **no cross-tab dirty state** | Unsaved-change behaviour must be defined per form |
| L-15 | The Integrations "Communication · Mail Service · Payments · Webhooks" chip row is **dead decoration**, not a filter | If we render a filter, it must actually filter |

## 6. Dangerous-action register (legacy, from the deep corpus)

WhatsApp **Logout** (kills all automation, no confirm) · Payout **Save** (can flip Sandbox → Live) · Custom-payment **Delete** (while families are using it) · **Remove** salary tier · Email **Mail Settings Submit** (global SMTP) · General **Save changes ×4** · WhatsApp **Send ×2** (real test messages) · Personalisation **Reset to Default** · Security **4 × bulk Upload**, **Send Backup**, Policy **Submit** (overwrites both policies at once).

In Spec 040 **every one of these is a gate**, and every destructive one is a **confirm + gate**.
