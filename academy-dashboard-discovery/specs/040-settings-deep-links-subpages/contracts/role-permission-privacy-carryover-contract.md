# Contract — Role, Permission & Privacy Carryover (Spec 040)

Formalizes `role-permission-and-sensitive-data-carryover.md` into binding rules. Source citations:
`frontend-planning/04-permission-and-navigation-matrix.md:40` ("an Accountant sees Finance, not Settings"),
`09-permission-navigation-matrix-v2.md:35`; legacy RBAC groups **System Settings (6)** · **Payment Methods (3)** ·
**Locations (4)**.

---

## 1. Settings is admin-only (binding, no exception)

No role other than admin may reach any `settings.html#view=…` route, any settings nav item, or any settings
control. This was true before Spec 040 (Settings has never appeared in `ROLE_NAV.teacher|family|student`) and
remains true after it — Spec 040 adds **zero** navigation surface to any portal.

---

## 2. Permission map per domain (view vs manage — a distinct, higher permission where legacy evidences one)

| Domain | View permission | Edit/manage permission | Notes |
|---|---|---|---|
| General — identity / location | System Settings · view | System Settings · edit | identity propagates to branding, documents, outbound mail |
| General — course/class automation | System Settings · view | System Settings · edit | highest blast radius of the non-credential settings once real |
| General — teacher pay rules | **n/a — not rendered** | **n/a** | excluded by the pay-free law; owner = payroll backend (FO-14) |
| Notifications | System Settings · view | System Settings · edit | routing only; delivery is backend |
| Customization — theme/language | **every authenticated user, own preference** | same | a personal preference, not an academy setting — this is why it stays REAL while everything else on the tab is a preview |
| Customization — brand/palette | System Settings · view | System Settings · edit | would apply globally when real ("applies globally to all users") |
| Security — import / backup | Security · view | **Security · manage** | destructive/expensive **once real**; in Spec 040 every one is an **honest gate — 0 confirms added** (`security-import-backup-policy-contract.md` §H1), because nothing can run. The real confirm ships with the real action |
| Security — policy | Security · view | Security · edit | |
| Security — 2FA | Security · view | **Security · manage** | gate only; no OTP control rendered |
| Users & roles | Users · view | **Users · manage** | display-only preview today (`usersPanel()`); no enforcement claimed |
| Integrations — status | Integrations · **view status** | — | a read-only role could see whether a provider is connected without seeing its configuration |
| Integrations — configuration | Integrations · view | **Integrations · manage** | the credential surface — the tightest permission of the whole hub |
| Payment methods | Payment Methods · view | **Payment Methods · manage** | folded inside Integrations, not a separate surface |

**Read-only auditor** is supported conceptually: an auditor may hold *view* on any domain and *manage* on none.
Because every write in Spec 040 is already a `data-disabled-reason` gate, **the static frontend structurally
cannot violate this** — there is no code path where a *view*-only session could trigger a *manage* action, because
no session concept exists yet. This becomes a real, enforceable constraint only when the backend arrives
(**Spec 043**, FO-17).

---

## 3. Non-admin roles — hard exclusions (must hold on every teacher/family/student page)

Teacher, family and student surfaces MUST render:
- **no** admin Settings route, link, or nav item (portals have never carried one);
- **no** integration configuration of any kind;
- **no** payment-credential access;
- **no** notification-routing administration (a family's *own* notification preference, if it ever exists, is a
  family-profile concern — never this matrix);
- **no** security import/backup control;
- **no** customisation administration (theme/language remain each user's **own** preference — administering the
  *academy-wide* palette is not the same capability and is never exposed there).

**Enforcement:** `impact-protection-contract.md` §2's byte-identical set (16 portal pages + portal internals +
`index.html`, 51 files) is the machine-checkable proof that Spec 040 adds nothing to any non-admin surface.

---

## 4. "Hiding links is NOT enforcement" (binding statement, quoted from the source register)

The static frontend can only guarantee that **no route, link, or control is rendered** for a role that should not
have one. It cannot guarantee that a determined client cannot navigate directly to `settings.html` and see the
(inert, gated) content — there is no session, no auth, no server-side check anywhere in this product yet.

**Real route/API denial for unauthorized roles is a backend obligation, owned by Spec 043 — Sensitive Data
Privacy, Role Isolation & Anti-Poaching (FO-17).** Spec 040's job is to state the *expected* permission shape
(§2 above) precisely enough that Spec 043 has something concrete to enforce — not to simulate enforcement itself.
Simulating enforcement (e.g., a fake "access denied" page, a client-side redirect pretending to be a permission
check) would itself be a fake-behaviour violation and is forbidden.

---

## 5. Carried role laws (unchanged, byte-verbatim in tests)

| Law | Status in Spec 040 |
|---|---|
| **Teacher pay-free (global)** | **Upheld and actively defended.** Settings is where legacy hides its entire pay engine (General → Teachers tab: hour-rate tiers, salary period, late-start fine) plus `rate_student_absent`. **All 11 fields excluded** (`pay-free-settings-exclusion-contract.md`). The only permitted trace is the existing non-numeric "managed in Finance" pointer (`adm.set.gen.payNote`, byte-verbatim) plus the new non-numeric `payRulesNote` explanation. The `salaries` notification row routes an *event*, carries **zero figure**. Both payout providers may be named as providers with **zero** pay figure. |
| **Family zero-pay** | Upheld. No currency or pay figure reaches any family surface; Settings changes nothing about it (`cross-surface-impact-contract.md` §3 rule C3). |
| **Student child-view** | Upheld. Untouched — 0 bytes changed on any student surface. |
| **Finance no-fake-money** | Upheld. No money is computed anywhere in Settings; the Invoices import is a structure reference only, and its `currency`/`price`-adjacent columns carry no computed total. |
| **Spec 039 content/certificate honesty** | Upheld. Untouched — library.html/certificates.html are outside the Spec 040 allowlist. |
| **`classSalaryReport` honest lock** | **Unchanged** — still `status:'disabled'` + `reasonKey:'nav.reason.finance'` + no route. A disabled lock is categorically not a planned item; Spec 040 must not blur them (Ledger §B rule 5; `settings-nav-completion-contract.md`). |
| **No sensitive credential exposure** | **Upheld and strengthened** — see §6. |

---

## 6. Sensitive-data findings (from the legacy corpus — recorded so the omission is auditable, not accidental)

### 6.1 Credentials

- **24 sensitive fields** exist across the 11 providers (`integrations-catalog-contract.md` §1; Ledger R10 — pick
  24, not the 17 an earlier scope doc undercounted). Legacy renders **15 of them in plain `type="text"`**, and its
  gateway tables **print stored `Key 1` / `Key 2` on screen, unmasked**.
- Spec 040: every sensitive field is a **structure-only row** — label, requirement, purpose. **Never an input,
  never a value.** `type="password"` = 0. `type="file"` = 0.
- **No authored credential value** appears in any fixture or locale module — no API key, client secret, HMAC,
  SMTP password, OAuth token, webhook secret, merchant/integration id, or realistic-looking placeholder for one.
- The sitewide no-secret assertions (`a31.credInputs`, `passwordInputs`, `fileInputs`) are **not weakened** by
  completing 73 fields — they get **stricter** (the assertion floor rises alongside the field count).

### 6.2 PII

| Finding | Legacy evidence | Disposition | Owner |
|---|---|---|---|
| **WhatsApp insights leak** | Two read-only pages inside the Settings shell leak a live joinable `chat.whatsapp.com/<invite-token>` group-invite URL **in full**, plus unmasked family/teacher phone numbers; the teachers-insights page even reuses the "Family name" header (a copy bug) | **Not rebuilt in Settings, at all.** The privacy risk is logged for Spec 043; the underlying capability ("who is unreachable on WhatsApp") belongs on a messaging surface (Spec 045), never in configuration | privacy → **043**; capability → **045** (FO-18) |
| **Plaintext `password` column** | The legacy families-import contract requires a plaintext `password` column (15 columns total) | **Omitted entirely** from the rendered **12**-column families reference (15 evidenced − `password` − `currency` − `hour_rate`; `safe-import-columns-contract.md` §3) — not even as a column-name structure row | **043** (FO-12) |
| **Real academy PII in legacy captures** | A real Gmail address, real phone numbers, a real prefilled Paymob Integration ID triple | Our fixtures use obvious placeholders (`demo.academy`, `info@demo.academy`, `05xx-xx-0000`-shaped) — **no real PII, ever**, in any fixture or locale value | n/a — enforced now |
| **Shared-OTP-phone-for-all-admins** | Legacy's `otp` hidden field is a single destination phone for **every** admin's 2FA code | Recorded as an anti-pattern; **never reproduced** — `otp` is **not rendered** at all (Spec 033's security acceptance: "no secret/OTP control") | **043** + auth backend (FO-16) |
| **Unmasked stored credentials in legacy UI** | Configure tables print `Key 1`/`Key 2` columns raw; one populated row emits `<td>01015264856</td>` | None of it is rendered — every sensitive row in Spec 040 is structure-only | n/a — enforced now |

**No new privacy weakness may be introduced by this spec.** Field-level PII isolation across the product remains
owned by Spec 043; Spec 040's obligation is strictly to **add nothing it must later remove**.

---

## 7. MUST NOT / grep gate

```bash
grep -niE 'chat\.whatsapp\.com|invite-token|group-invite' public/settings*.html          # 0
grep -niE 'name="[^"]*password"' public/settings*.html                                    # 0 (no families-import password column)
grep -niE '@gmail\.com|05[0-9]{8}\b' public/settings*.html                                # 0 (no real-shaped PII; demo placeholders only)
grep -niE '(name|id)="[^"]*otp[^"]*"' public/settings*.html                                # 0 — no OTP CONTROL may exist.
# NB: the WORD "OTP" is lawful inside the 2FA purpose copy ("OTP on login for admins & support",
# adm.set.sec.tfa/tfaReason) — so a bare `grep -i '\botp\b'` would return a legitimate hit. The ban is on the
# CONTROL, not the noun; grep the name/id, never the prose.
```

---

## 8. Acceptance

1. `impact-protection-contract.md` §2's 51-file byte-identical set holds — proves 0 non-admin surface gained
   Settings access.
2. §2's permission table and §5's role-law table match `role-permission-and-sensitive-data-carryover.md`
   line-for-line in substance (this contract may add structure/citations, never contradict the source register).
3. §6's PII findings are each traceable to a named legacy evidence source (page slug or raw HTML file) — no
   finding in this contract may be invented.
4. §7's grep gate returns 0 on every pattern.
5. `a31.credInputs === 0` and `a31.passwordInputs === 0` and `a31.fileInputs === 0` hold on `settings(.en).html`
   after the 73-field rewrite (cross-referenced with `fixtures-locales-contract.md` §3).
