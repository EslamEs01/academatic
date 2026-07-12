# Role, Permission & Sensitive-Data Carryover (Spec 040)

## 1. Settings is admin-only

The planning corpus is explicit: Settings is admin-only (`frontend-planning/04-permission-and-navigation-matrix.md:40`), and **"an Accountant sees Finance, not Settings"** (`09-permission-navigation-matrix-v2.md:35`). Legacy's RBAC groups relevant here: **System Settings (6)** · **Payment Methods (3)** · **Locations (4)**.

## 2. Permission map per domain

| Domain | View permission | Edit permission | Notes |
|---|---|---|---|
| General — identity / location | System Settings · view | System Settings · edit | Identity propagates to branding, documents and outbound mail |
| General — course/class automation | System Settings · view | System Settings · edit | Changes real academic behaviour → highest blast radius of the non-credential settings |
| General — teacher pay rules | **n/a — not rendered** | **n/a** | Excluded by the teacher pay-free law; owner = payroll backend |
| Notifications | System Settings · view | System Settings · edit | Routing only; delivery is backend |
| Customization — theme/language | **every authenticated user (their own preference)** | same | A personal preference, not an academy setting |
| Customization — brand/palette | System Settings · view | System Settings · edit | Would apply globally when real ("applies globally to all users") |
| Security — import / backup | Security · view | **Security · manage** (a distinct, higher permission) | Destructive/expensive; confirm + gate |
| Security — policy | Security · view | Security · edit | |
| Security — 2FA | Security · view | **Security · manage** | Gate only; no OTP control |
| Users & roles | Users · view | **Users · manage** | Display-only preview today; no enforcement claimed |
| Integrations — status | Integrations · **view status** | — | A read-only role can see whether a provider is connected without seeing configuration |
| Integrations — configuration | Integrations · view | **Integrations · manage** | The credential surface — the tightest permission |
| Payment methods | Payment Methods · view | **Payment Methods · manage** | Inside Integrations |

**Read-only auditor**: supported conceptually — an auditor may hold *view* on any domain and *manage* on none. Because every write in Spec 040 is already a gate, the static frontend cannot violate this; it becomes a real constraint when the backend arrives (**Spec 043**).

## 3. Non-admin roles — hard exclusions

Teacher, family and student surfaces MUST have:

- **no** admin Settings route (the portals are a separate surface and Settings has never been in their nav);
- **no** integration configuration;
- **no** payment-credential access;
- **no** notification-routing administration (a family may hold *their own* preferences elsewhere — that is a family-profile concern, not this matrix);
- **no** security import/backup control;
- **no** customisation administration (theme/language remain each user's own personal preference — that is not administration).

**Hiding links is not enforcement.** The static frontend can only guarantee that no route, link or control is rendered. Real route/API denial for unauthorized roles is a **backend obligation**, owned by **Spec 043 — Sensitive Data Privacy, Role Isolation & Anti-Poaching**. This spec states the expectation so that the later enforcement has something to enforce.

## 4. Carried role laws (unchanged, byte-verbatim in tests)

| Law | Status in Spec 040 |
|---|---|
| **Teacher pay-free (global)** | **Upheld — and actively defended.** Settings is where legacy hides its pay engine: the whole General → Teachers tab (hour-rate tiers, salary period, late-start fine) and `rate_student_absent` ("% of the class price added to the teacher's salary"). **All excluded.** The only permitted trace is the existing non-numeric "managed in Finance" pointer. The `salaries` notification row routes an *event* and carries no figure. Both payout providers may be named as providers, with no pay figure. |
| **Family zero-pay** | Upheld. No currency or pay figure reaches any family surface; nothing in Settings changes that. |
| **Student child-view** | Upheld. Untouched. |
| **Finance no-fake-money** | Upheld. No money is computed anywhere in Settings. The invoices import is a structure reference only. |
| **Spec 039 content/certificate honesty** | Upheld. Untouched. |
| **`classSalaryReport` honest lock** | **Unchanged** — still `disabled` + `nav.reason.finance` + no route. A disabled lock is not a planned item; this spec must not blur them. |
| **No sensitive credential exposure** | **Upheld and strengthened** — see below. |

## 5. Sensitive-data rules

### Credentials

- **17 sensitive fields** exist across the 11 providers. Legacy renders **15 of them in plain `type=text`**, and its gateway tables **print stored `Key 1` / `Key 2` on screen**.
- Spec 040: a sensitive field is a **structure-only row** — label, requirement, purpose. **Never an input.** Never a value. `type="password"` = 0. `type="file"` = 0.
- **No authored credential value** in any fixture or locale module — no API key, client secret, HMAC, SMTP password, OAuth token, webhook secret, merchant/integration id, or realistic-looking placeholder for one.
- The sitewide no-secret assertions are **not weakened** — they get stricter.

### PII

- The legacy **WhatsApp insights** pages leak a live `chat.whatsapp.com/<invite-token>` group-invite URL and unmasked family and teacher phone numbers. **They are not rebuilt in Settings.** The privacy risk is logged for **Spec 043**; the underlying capability ("who is unreachable on WhatsApp") belongs on a messaging surface, not in configuration.
- The legacy **families import contract requires a plaintext `password` column**. It is **omitted** from any rendered column reference.
- Legacy settings pages display real academy PII (a real Gmail address, real phone numbers). Our fixtures use obvious placeholders (`demo.academy`, `info@demo.academy`, `05xx-xx-0000`) — **no real PII, ever**.
- The legacy **shared-OTP-phone-for-all-admins** pattern is recorded as an anti-pattern and never reproduced.

**No new privacy weakness may be introduced by this spec.** Field-level PII isolation across the product remains owned by **Spec 043**; Spec 040's obligation is to add nothing it must later remove.
