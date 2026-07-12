# Contract — Cross-Surface Impact (Spec 040)

**Binding statement:** Spec 040 **implements zero propagation**. Every value rendered by the settings hub is
**inert** — it changes nothing anywhere else in the product. This contract is the formalized, per-setting register
of *where a real value would eventually take effect*, so **Spec 055 — Cross-Role Feature Propagation & Workflow
Consistency** does not have to re-derive it, and so no Spec 040 author is tempted to "helpfully" wire a preview
through to a consuming surface (which would itself be a fake-persistence violation). Source: `settings-cross-
surface-impact-register.md`, cross-checked against `future-owner-register.md` (FO-* ids).

---

## 1. The propagation register (per setting)

| Setting | Editor / permission | Consumers (surfaces) | Affected roles | Notification impact | Reporting impact | Audit impact | Backend dependency | Future owner |
|---|---|---|---|---|---|---|---|---|
| **Academy identity** (name, AR name, domain, email, phone, WhatsApp, logo) | Admin · System Settings · view/edit | shell branding, topbar, `index.html`, invoices, certificates, outbound mail, public pages | all | reply-to / sender identity | report headers | who changed identity | settings store + asset storage | **053** (delivery) + backend |
| **Location** (country, city, address) | Admin · System Settings | academy profile, documents | admin | — | — | ✔ | settings store | backend |
| **Timezone** | Admin · System Settings | **every schedule/session/attendance/reminder/timetable surface, all roles** | **all** | reminder send times shift | every time-bound report | **high** — silently moves history | settings store + scheduling engine | **055** |
| **Course/class automation** (17 rendered rules) | Admin · System Settings | courses, sessions, schedule, attendance, cancellation/make-up, family requests, teacher session actions, hour-credit balances | admin · teacher · family · student | drives class-update + reminder events | attendance & session reports | **high** — decides who is charged/credited (in hours, never money) | rules engine | **055** |
| **Teacher pay rules** (11 excluded fields) | **NOT in Settings — n/a** | salary computation only | — | salary events (routing only) | payroll reports | ✔ | payroll backend | **payroll/billing backend** (FO-14), never teacher-visible, never a frontend calculation |
| `rate_student_absent` | **NOT in Settings — n/a** | salary computation | — | — | payroll | ✔ | payroll backend | **payroll backend** (FO-14) |
| **Notification routing** (47 controls) | Admin · System Settings | every notification the product sends: course events, 29 class/reminder events, invoices, salary events (routing only), family status | admin · teacher · family | **this IS the notification impact** | delivery reports | ✔ | notification service + WhatsApp/Email integrations | **053** (channels) · **055** (propagation) |
| **Theme / language** | **every user, their own** | that user's whole app | all | — | — | — | **none — already real** | done |
| **Brand colours, layout, sidebar, card style** | Admin · System Settings | all role apps ("applies globally to all users") | all | — | — | ✔ | settings store + theme tokens | **055** (FO-19) |
| **Class/session status palette** (11 rows / 6 hexes) | Admin · System Settings | every status chip on every schedule/attendance/session surface, all roles | all | — | report legends | ✔ | settings store + theme tokens; **contrast validation is a hard gate** | **055** (FO-20) |
| **Data import** (teachers/families/children/invoices) | Admin · Security · manage | core directories | admin | account-creation events | data quality everywhere | **very high** — bulk mutation | import service + validation + dry-run + undo | **043** (privacy) + backend (FO-10) |
| **Backup** (destination + send) | Admin · Security · manage | the database | admin | backup-complete notice | — | **very high** | backup job + mail | backend (FO-11) |
| **Policies** (family, teacher) | Admin · Security · edit | family portal, teacher portal, onboarding | family · teacher | — | — | ✔ (versioning) | content store | **049**/**050** (portal display) |
| **2FA / OTP** | Admin · Security · manage | authentication for admins/support; privileged-settings access | admin · staff | OTP delivery | security audit | **very high** | auth backend | **043** + auth backend (FO-16) |
| **Users & roles / permissions** | Admin · Users · manage | every admin surface's visibility + write access | admin · staff | — | — | **very high** | RBAC backend | **043** (FO-17) |
| **Payment methods** (per gateway, folded into Integrations) | Admin · Payment Methods · manage | family billing, admin finance, invoices, checkout | admin · family | invoice + payment events | revenue reports | **very high — money** | payments backend + gateway | **053** + payments backend (FO-01/FO-02) |
| **Payout providers** | Admin · Integrations · manage | teacher salary disbursement | admin | salary events | payroll reports | **very high** | payouts backend | **053** + payroll backend (FO-03) |
| **WhatsApp integration** | Admin · Integrations · manage | broadcasts, class reminders, invoice notices, family communication, announcements | admin · teacher · family | **enables the WhatsApp channel** in the notification matrix | delivery reports | ✔ | WhatsApp provider + pairing | **053** (FO-04) |
| **Email / SMTP integration** | Admin · Integrations · manage | all outbound mail: reminders, invoices, reports, backups | admin · teacher · family | **enables the E-mail channel** | delivery reports | ✔ | SMTP + secret storage | **053** (FO-05) |
| **Meeting integration** (Zoom/Meet) | *(no legacy Settings evidence)* | session creation, teacher dashboard, join surfaces | all | join reminders | attendance | ✔ | meeting provider | **054** (FO-08) |
| **Message templates** (message-builder) | Admin | every templated message, every channel | all | template content | — | ✔ | template engine | **053** (FO-06 — no legacy UI evidence, 504) |

---

## 2. Cross-cutting rules (binding, not advisory)

1. **Timezone and course/class automation are the two highest-leverage non-credential settings.** Both silently
   change behaviour for every role once real. Both carry **prominent inline help now** (`general-settings-
   completeness-contract.md` row 10; `automation-rules-contract.md` §4) and must carry a change-confirmation when
   they become real (a Spec 055 obligation, not Spec 040's).
2. **Integrations gate the notification matrix, not the reverse.** Choosing WhatsApp or E-mail for an event is
   inert until the corresponding provider **and** the backend both exist — the matrix says so via the two static
   integration-unavailable chips (`notification-matrix-contract.md` §6.4), which deliberately do **not** track the
   select's live value (a tracking chip would require `enhance.js` to change — 0-diff, forbidden).
3. **Nothing in this register is propagated by Spec 040.** The only genuinely live settings in the entire hub are
   **theme** and **language**, which already propagate through the pre-existing `data-set-theme`/`data-set-lang`
   mechanism (Spec 001-era, unchanged).
4. **No consuming surface may be touched to "prove" a setting works.** `schedule.html`, `sessions.html`,
   `finance.html`, `teacher*.html`, `family*.html`, and every other listed consumer are **0-diff** for this spec —
   see `impact-protection-contract.md` §2 for the exact protected set.
5. **No propagation claim may appear in Settings copy.** A help string may say *what a setting will affect once
   real* (e.g. the timezone warning), but it must never claim the effect is currently happening. Present tense for
   an inert control is a fake-persistence violation.

---

## 3. MUST NOT (grep/read-review gate)

| # | Rule | Enforcement |
|---|---|---|
| C1 | No `fetch`/`XHR`/`postMessage`/`BroadcastChannel` call from any Settings control to another page's state | `git diff` review of `pages/settings.js`; sitewide external-request guard (0 requests) |
| C2 | No new `localStorage` key used to "stage" a setting for another page to read | scope-guard §3.5 (0 new keys) |
| C3 | No consuming page (`schedule.html`, `sessions.html`, `finance.html`, teacher/family/student pages) diffed by this spec | `impact-protection-contract.md` §2 (byte-identical set) |
| C4 | No computed effect of a setting displayed anywhere (e.g., a derived "next renewal date" using `stop_after`) | Ledger stop condition 3 (no computed metric); `automation-rules-contract.md` §5.3 |
| C5 | No help copy phrased in the present/active tense ("this changes X now") for an inert control | manual copy review against §2 rule 5 |

---

## 4. Acceptance

1. This register's 20 settings rows are the complete enumeration handed to Spec 055 — no consumer surface is
   missing an owner, and no setting is propagated in Spec 040 itself.
2. `git diff --stat` outside the 7 allowed source files (`fixtures-locales-contract.md` §1 + `nav.config.js` +
   `settings.js` + `app.css`) is **empty** — proving no consuming surface was touched to fake propagation.
3. Every "Future owner" cell resolves to a named spec (041–057) or "backend" — **0** cells read "unowned".
4. `settings-cross-surface-impact-register.md` and this contract stay in agreement; any future amendment to one
   requires a matching amendment to the other (declared, not silent).
