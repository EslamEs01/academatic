# Future-Owner Register (Spec 040)

## 1. The roadmap through Spec 057 — a recorded amendment

**Provenance, stated honestly**: the committed spec corpus contains **only Spec 041**, and defines it as the *final* sidebar/route/production re-freeze. **Specs 042–057 appear nowhere in any committed artifact.** The roadmap below is a **maintainer-directed, append-only amendment** (the same mechanism used when the 019–021 sequence was renumbered), and it **redefines 041**: it is now the **route/sidebar baseline freeze *before* an exhaustive review programme**, not the final product freeze.

| Spec | Title |
|---|---|
| **041** | Frontend Route & Sidebar Baseline Freeze — *(redefined: a baseline freeze, **not** the final product freeze; **no real integrations may be assigned to it**)* |
| **042** | Exhaustive Legacy Coverage Re-Audit |
| **043** | Sensitive Data Privacy, Role Isolation & Anti-Poaching |
| **044** | Modal, Drawer & Long-Form Interaction System |
| **045** | Admin General Operations & Communications Review |
| **046** | Admin People & Academic Operations Review |
| **047** | Reports, Analytics & Finance Review |
| **048** | Content, Certificates, Access & Settings Review |
| **049** | Teacher Portal Full Review |
| **050** | Family & Student Portal Full Review |
| **051** | Academy Community, Moderation & Safe Social Interactions |
| **052** | Recognition, Achievements & Privacy-Safe Leaderboards |
| **053** | Integrations Command Center |
| **054** | Embedded Virtual Classroom & Meeting Lifecycle |
| **055** | Cross-Role Feature Propagation & Workflow Consistency |
| **056** | Complete Forms & Data Capture Audit |
| **057** | Final Exhaustive Parity, Security & Production Freeze |

## 2. What Spec 040 hands off

| # | Capability | Why not in 040 | Owner |
|---|---|---|---|
| FO-01 | **Real provider connections** — OAuth, credential storage, connect/disconnect, test-connection, webhooks, live status | Would require a backend; the frontend may never claim a connection | **053** |
| FO-02 | **Real payment processing** — checkout, gateway calls, payment capture | Money. Backend-only | **053** + the payments backend |
| FO-03 | **Real payout execution** (Paymob Payout, Payoneer Payout — these disburse **teacher salaries**) | Backend; and no pay figure may exist in the frontend | **053** + the payroll backend |
| FO-04 | **WhatsApp pairing** (the 4-step wizard, QR, `send_group`, test-send, logout, the live websocket) | Never captured (**UNKNOWN**); every action needs a live provider | **053** |
| FO-05 | **Email/SMTP account management** (`smtp_password` — one of only two real `type=password` inputs in the entire legacy crawl) | Secret storage is backend-only | **053** |
| FO-06 | **Message Builder** | Only legacy evidence is a **504 Gateway Timeout** — zero capability evidence. Never invented | **053** |
| FO-07 | **Real notification delivery** (the 47-control matrix routes; it never sends) | Needs the notification service **and** the channel integrations | **053** (channels) · **055** (propagation) |
| FO-08 | **Meeting integrations** (Zoom / Google Meet) | No legacy Settings evidence; a distinct product surface | **054** |
| FO-09 | **Real settings persistence** — every Save in Settings | No backend exists; all saves are gates | backend |
| FO-10 | **Real data import** — file upload, validation, mapping, dry-run, partial-import and undo | `type="file"` = 0 by law; legacy has **no** validation, dry-run or undo, and **no confirm on any import** | backend + **043** |
| FO-11 | **Real backup** — job execution, download, delivery | Legacy fired a real DB backup with **no confirm**; ours is confirm + gate | backend |
| FO-12 | **The `password` column** in the families import contract | Publishing it would breach the no-secret law | **043** |
| FO-13 | **The `hour_rate` / `currency` columns** in the teachers + families import contracts | Teacher pay-free law | **payroll backend** |
| FO-14 | **Teacher pay rules** — the entire legacy General → Teachers tab (hour-rate tiers, salary period, late-start fine) + `rate_student_absent` | Teacher pay-free law (global) | **payroll/billing backend** — the same owner as the `classSalaryReport` lock |
| FO-15 | **`classSalaryReport`** | Remains an honest `disabled` lock (a real class-salary report implies computed per-class pay) | **payroll/billing backend** |
| FO-16 | **2FA / OTP** — a working control, OTP delivery, session policy, password complexity | Spec 033's security acceptance: *"no secret/OTP control"*. Legacy's shared-OTP-phone-for-all-admins is an anti-pattern | **043** + the auth backend |
| FO-17 | **RBAC enforcement** — real route/API denial per permission | Hiding links is not enforcement | **043** |
| FO-18 | **WhatsApp insights** (both pages) — and their **live group-invite URL + unmasked phone numbers** | A PII/capability leak, and they are messaging *diagnostics*, not configuration | privacy → **043**; capability → a messaging surface (**045**) |
| FO-19 | **Live theme/brand/layout/palette persistence** (beyond theme+language) | Would need new hooks and new storage keys — forbidden by standing law | **055** + backend |
| FO-20 | **Contrast validation** for the admin-tunable palette (11 statuses collapse to 7 hex values in legacy) | Becomes a hard gate when the palette is real | **055** |
| FO-21 | **"Pick from logo"** palette derivation | Depends on a real uploaded logo (itself a gate) + client-side image analysis | **055** |
| FO-22 | **Cross-surface propagation** of every setting (timezone, automation rules, palette, routing) | 040 documents it; it does not implement it | **055** |
| FO-23 | **The global modal/drawer/long-form system** | 040 documents Settings' presentation requirements only | **044** |
| FO-24 | **Product-wide form completeness re-audit** | 040 enforces completeness **for Settings now**; 056 must not be used as an excuse to leave Settings shallow | **056** |
| FO-25 | **Settings re-review** (as part of Content/Certificates/Access/Settings) | A later review pass | **048** |
| FO-26 | **Final parity, security and production freeze** | — | **057** |

## 3. Explicitly NOT assigned to Spec 041

Per the brief: **no real integrations may be assigned to Spec 041**, and 041 is **not** the final product freeze. Its job is to freeze the route and sidebar baseline that Spec 040 completes — every category at zero planned items, the admin menu at 50, the page count at 115, and exactly one honest lock (`classSalaryReport`) remaining.
