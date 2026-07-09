# Settings & Integration Scope — Spec 031

Defines exactly what the settings and integration surfaces may display, what they must never persist or render, and the grep strategy that proves it. Grounded in the legacy settings/integrations audit (`legacy-management-content-coverage.md` §D/§E).

## Fold model (the finance.html precedent)
`settings.html` is already an implemented, honest page (theme/lang real; 2FA/billing already disabled-with-reason). Spec 031 **folds** the six `settings*` sub-domains + integrations into it as `data-tab` panels/sections — **zero new pages**, `nav.config.js` route rules 0-diff — exactly as Spec 030 folded salaries/banks into finance.html. The six `settings*` nav items stay `planned` (no route) and are reached inside the hub.

## Allowed authored settings (display-only + save gate)
| Panel | Authored content | Real vs gated |
|---|---|---|
| **General** | Academy identity (name/domain/email/phone/whatsapp/address); Locations slice (country/city/timezone/address); course/class automation toggles | display + **Save = gate**; logo = gate (no upload) |
| **Customization** | theme (light/dark/system), language | **REAL** (existing client-side pref — preserved) |
| **Customization** | brand primary/secondary color, layout, 11 status colors | display + **Save = gate** |
| **Notifications** | ~47-row event×role×channel matrix (global/course/class/reminder/invoice/`salaries`/family-status) | display toggles (authored state) + **Save = gate** |
| **Security** | 2FA/OTP state; Family/Teacher policy documents | 2FA = gate; policy = **display-only text** + edit gate |
| **Users** | staff directory + RBAC preview | display + gates (the ONE staff home) |
| **Integrations** | provider cards (payments/payouts/WhatsApp/Email) | **locked-placeholder** cards + future-backend gates |

## Forbidden — real persistence
- No setting save persists (no localStorage write beyond the existing theme/lang keys, no server call).
- Toggles show **authored** current state only; flipping one changes nothing.
- No fake "saved"/«تم الحفظ»/«بنجاح»/"successfully" wording (reuse the `FAKE` guard).

## Forbidden — credential / secret rendering
- **No `type="password"`** anywhere (staff, profile, SMTP, gateway, payout).
- **No** API key, client secret, webhook URL, token, OAuth credential, `settings[api_key]`, `key1..key4`, `smtp_password`, `backup_email` **value or input**.
- If credential parity is needed → a **locked placeholder card** (provider name + status chip), never an input.
- Payment-gateway + payout-provider credentials → **future-backend** (Spec-030 boundary); no config surface.

## Forbidden — which toggles/actions are display-only vs future-backend gate
| Action | Class |
|---|---|
| Theme / language | REAL (client-side, kept) |
| Save-changes (any settings tab) | backendRequired gate |
| Notification toggles | display-only (authored), Save = gate |
| Connect / Disconnect / Test-connection / Save-credentials (any integration) | future-backend gate |
| WhatsApp connect / pairing / test-send | future-backend gate (no phone input, no wizard) |
| Backup / Send-backup / Import / Restore | excluded / future-backend gate (no `type=file`, no email input, no template) |
| Message-Builder | excluded / generic future-backend gate (504 — no invented fields) |
| Logo / avatar upload | gate (no `type=file`) |
| 2FA edit | gate |
| Policy edit | gate (no live rich-text editor) |

## Finance / pay boundary (binding)
- General tab **omits** teacher hour-rate/salary-period/`rate_student_absent`-% fields → at most a non-numeric "managed in Finance" pointer.
- Notifications `salaries` row is a **figure-free** on/off toggle (no amount).
- No salary/payout/compensation figure on any settings surface.

## Smoke grep strategy (built settings/integration bodies)
```
noSecret   = !/type="password"|api[-_ ]?key|client[-_ ]?secret|webhook|secret|token|paymob|payoneer|stripe|paypal|xpay|mollie|smtp_password/i
noFile     = !/type="file"/i
noBackup   = !/backup_email|send backup|إرسال نسخة|استعادة|restore/i   (no live backup/restore affordance)
noFakeSave = FAKE guard (no تم الحفظ / بنجاح / saved / successfully on save controls)
figureFree = !/ريال|SAR|جنيه|EGP|AED|EUR|[$€£]|[0-9]+[.,][0-9]/  on settings bodies
noMutate   = before/after snapshot on any toggle/Save confirm (unchanged)
gates      = [data-disabled-reason] present for Save/Connect/Test/Import/Backup/Logo
realTheme  = theme/lang controls still functional (existing assert unchanged)
```
Protected role-law regexes (`payHit`/`tchPay`/`famPay`/`payFigure`/child-view/finance-no-mutation/finance-forbidden) stay **byte-verbatim**.
