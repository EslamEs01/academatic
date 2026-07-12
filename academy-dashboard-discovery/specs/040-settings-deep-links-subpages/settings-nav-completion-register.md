# Settings Nav Completion Register (Spec 040)

The six items Spec 033 assigned to Spec 040, resolved from evidence.

## The register

| # | Nav id | Current status | Current route | Target surface | Existing tab id | Current fields | Current actions | Current gates | Fixture | Locale | Test | Screenshot | Gap | Disposition | **Proposed route** | Count impact |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `settingsGeneral` | planned («قريبًا») | none | Settings hub, General tab | `general` | **0** inputs (14 display rows) | 5 | 3 | `settings-management.js` (identity/location/heads) | `adm.set.gen.*` (+4 **unused** automation keys) | a11y ✗ · smoke: tab-id list only | ✗ (no `#view=general` frame) | Automation group (18 fields) and 2FA absent; identity is read-only text | **Deep-link + complete the form in place** | `settings.html#view=general` | **0** |
| 2 | `settingsIntegrations` | planned | none | Settings hub, Integrations tab | `integrations` | **0** | 14 | 14 | `settings-management.js` (7 cards) | `adm.set.integ.*` (+2 **unused** configure keys) | a11y ✓ (`#view=integrations`) | ✓ (`sp031-integrations`) | 4 of 11 providers missing; **no configuration surface at all**; payment methods unreachable | **Deep-link + build the catalog and per-provider configuration** | `settings.html#view=integrations` | **0** |
| 3 | `settingsCustomization` | planned | none | Settings hub, Customization tab | `customization` | **0** (5 **real** theme/lang controls) | 7 | 2 | `settings.js` (`SEC.appearance`) | `adm.set.cust.*` | a11y ✗ | ✗ | 9 of 11 status colours + 3 layout controls + brand colours absent | **Deep-link + complete the appearance set (display-only; theme/lang stay real)** | `settings.html#view=customization` | **0** |
| 4 | `settingsNotifications` | planned | none | Settings hub, Notifications tab | `notifications` | **0** | 4 | 1 | `settings.js` (`SEC.notif`, 6 matrix rows) | `adm.set.notif.*` (+3 **unused** matrix keys) | a11y ✗ | ✗ | 6 rows vs **47** evidenced controls | **Deep-link + build the complete routing matrix** | `settings.html#view=notifications` | **0** |
| 5 | `settingsSecurity` | planned | none | Settings hub, Security tab | `security` | **0** | 5 | 3 | `settings.js` (`SEC.account`) | `adm.set.sec.*` (+2 **unused** 2FA keys) | a11y ✓ (`#view=security` dark) | ✗ | 4 import types + column contracts + policy structure absent; 2FA is a native-disabled button, not a hook gate | **Deep-link + complete import/backup/policy/2FA as gates** | `settings.html#view=security` | **0** |
| 6 | `settingsUsers` | planned | none | Settings hub, Users tab | `users` | **0** | 1 (**real** link to `staff.html`) | 0 | `staff-management.js` (`ROLES_PREVIEW`) | `set.perm.*` | a11y ✓ (`#view=users` EN) | ✗ | Closest to complete; needs the deep-link and gated management actions | **Deep-link; keep `staff.html` as the canonical directory** | `settings.html#view=users` | **0** |

**Totals**: 6 items · 6 deep-links · **0 new page bases** · **0 count delta** · settings planned **6 → 0** · sitewide planned **6 → 0** · admin menu **50 → 50**.

## Items that are NOT in this register (and why)

| Capability | Why it is not one of the six | Where it goes |
|---|---|---|
| **Payment Methods** | **Not a nav item** — in legacy it is the "Payments (incoming)" group *inside* Integrations; the 7 create forms are reached via a provider's Configure → Add Payment. The brief expected it as the sixth domain; the sixth id is actually `settingsUsers`. | Inside `settings.html#view=integrations` — **no new nav item**, admin menu stays 50 |
| **Message Builder** | A legacy sidebar item under Customization, but its only capture is a **504** — zero capability evidence | Honest gate now; redesigned by **Spec 053** |
| **WhatsApp insights (×2)** | Filed under Settings in legacy, but they are read-only messaging **diagnostics**, not configuration — and they leak a live group-invite URL and unmasked phone numbers | Not rebuilt in Settings; privacy risk logged for **Spec 043**; capability for a messaging surface |
| **Teacher pay rules** (General → Teachers tab) | A complete teacher-pay engine (hour-rate tiers, salary period, late-start fine) | **Excluded by the teacher pay-free law**; owner = the payroll/billing backend, alongside `classSalaryReport` |
| **Locations** (legacy RBAC group) | Already folded into the General tab's location group by Spec 031 | No action |

## The nav flip, precisely

Each of the six gains a `route:` in `src/js/nav.config.js`. Because `item()` defaults `status` to `implemented` whenever a route is present, adding the route **is** the flip — the explicit `status:'planned'` is removed. `sidebar.js` then renders an `<a href>` instead of a `button.nav-item.is-planned`, and its `langRoute()` (hash-aware since Spec 035) resolves the English mirror to `settings.en.html#view=…`.

This makes `src/js/nav.config.js` the **only** navigation-source edit — the same shape as Spec 039's unlock.
