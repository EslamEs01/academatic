# Contract — Fixtures & Locales (Spec 040)

Baseline **HEAD `58a53e2`** (Ledger R9). This contract is the exhaustive list of every fixture and locale change
Spec 040 may make, plus the closed ALLOWED/BANNED content lists that every author, reviewer and grep gate must
enforce identically. It formalizes Ledger §H/§J and cross-references the per-domain contracts (`general-settings-
completeness-contract.md`, `automation-rules-contract.md`, `notification-matrix-contract.md`,
`integrations-catalog-contract.md`, `pay-free-settings-exclusion-contract.md`) rather than re-deriving their data.

---

## 1. Fixture files — the complete list (2 touched, 0 others)

| File | Status | Adds |
|---|---|---|
| `app/src/js/fixtures/settings-management.js` | **EXTENDED** | `IDENTITY_FIELDS` (10) + `IDENTITY_OPTS` (country/city/timezone option lists) · `AUTOMATION_GROUPS` (17 controls / 5 `<details>` groups) · `BRAND_ROWS` 4 → **13** (2 theme colours + 11 class-status colours, **6** distinct hexes) · `APPEARANCE_OPTS` (3 selects: `cust-layout`, `cust-sidebar`, `cust-surface`) · `SECURITY_IMPORTS` (4 column contracts, 33 rendered names) · `BACKUP` (1 field) · `POLICIES` (kept, 2 bodies, unchanged) · `INTEGRATIONS` **7 → 11** + `PROVIDER_FIELDS` (21 safe controls + **24** sensitive structure-only rows, `{labelKey, required, purposeKey}` — never a `value`) |
| `app/src/js/fixtures/settings-notifications.js` | **NEW** | `NOTIF_GROUPS` (9 evidenced groups / 47 controls: 5 masters + 10 channel selects + 3 numerics + 29 event toggles) · `CHANNEL_OPTS` (5 values `0/1/3/4/5` — **value `2` must never appear**) |

**0-diff (must not change — any diff is a STOP condition, Ledger K.1):** `fixtures/settings.js` (`SETTINGS` shell +
`ROLES_PREVIEW`) · `fixtures/staff-management.js` · `fixtures/form-options.js` · every other `fixtures/*.js`.

`fixtures/settings-management.js` supersedes `NOTIF_MATRIX` (6 rows) as the notifications data source; the old
constant may be deleted **only if** nothing else imports it (grep `NOTIF_MATRIX` across `src/js` before removal —
if any other page builder consumes it, leave it in place and add the new module alongside, never rename in place).

### 1.1 Per-module control census (must reconcile with the per-domain contracts — this table does not reintroduce numbers, it indexes them)

| Fixture export | Controls | Reconciles with |
|---|---|---|
| `IDENTITY_FIELDS` | 10 `field()` + 1 gate (`logo`) | `general-settings-completeness-contract.md` §2 |
| `AUTOMATION_GROUPS` | 5 select + 5 number + 7 toggle = 17 (18th, `rate_student_absent`, **absent from the fixture entirely**) | `automation-rules-contract.md` §2–3 |
| `BRAND_ROWS` | 13 swatch+hex rows | `customisation-settings-scope.md` |
| `APPEARANCE_OPTS` | 3 select | `customisation-settings-scope.md` |
| `SECURITY_IMPORTS` | 4 cards × (name/type/accept-note/column list) | `security-settings-scope.md` §B |
| `BACKUP` | 1 field | `security-settings-scope.md` §A |
| `INTEGRATIONS` + `PROVIDER_FIELDS` | 21 field + 8 toggle + 26 structure rows | `integrations-catalog-contract.md` §1, §3 |
| `NOTIF_GROUPS` + `CHANNEL_OPTS` | 13 field + 34 toggle | `notification-matrix-contract.md` §3–4 |

Any author touching a fixture must cross-check the reconciling contract's count table before committing — a
silent renumbering in a fixture that is not mirrored in its contract is itself a defect.

---

## 2. ALLOWED fixture/locale content (the closed positive list)

1. **Authored display literals** that already exist in the product's honesty vocabulary: names, categories,
   descriptions, option labels, help copy, status labels drawn from the three closed connection states
   (`not-connected` / `requires-server` / `unavailable` — `integrations-catalog-contract.md` §2).
2. **Structure-only sensitive-field descriptors**: `{labelKey, required: boolean, purposeKey}` — a label, a
   boolean, and a one-line purpose string. **No `value` key may exist on any of the 24 sensitive rows or the 33
   security-import columns.**
3. **Placeholder / demo PII only**: `demo.academy`, `info@demo.academy`, `05xx-xx-0000`-shaped phone patterns —
   never a real Gmail address, a real phone number, or any string traceable to the legacy crawl's authored PII
   (role-permission-and-sensitive-data-carryover.md §5).
4. **The 5-value channel enum verbatim** (`0/1/3/4/5`) and the **6-value chip-tone set**
   (`live|upcoming|completed|cancelled|amber|neutral`, `build-html.mjs:168-175`).
5. **The 6 distinct class-status hex values** (`#FFC107 #17A2B8 #DC3545 #6C757D #28A745 #007BFF`) across the 11
   status rows (Ledger R10: picked **6**, not the 7 an earlier scope doc claimed).
6. **UNKNOWN markers** where legacy evidence is silent (E25 `teacher_delay_reminder`, the master-toggle #2 disable
   reason, etc.) — recorded as fixture **comments**, never guessed into a value.
7. **BackendRequired toast copy** — the single wording family «يُتاح بعد ربط الخادم» / "available once the server
   is connected", reused verbatim across every gate and preview toggle.

---

## 3. BANNED fixture/locale content (the closed negative list — 0 occurrences, enforced by grep)

| # | Banned category | Exact tokens / shapes | Where it would otherwise appear | Enforcing contract |
|---|---|---|---|---|
| B1 | **Password** | any `value` on a field named/labelled password; `type:'password'` (structurally unreachable — `field()` has no such type) | Security import (`password` column, FO-12) | `security-settings-scope.md` §B; role-carryover §5 |
| B2 | **API key / secret / token** value | any populated `Key 1`/`Key 2`/`Client Secret`/`HMAC`/`settings[api_key]` string that looks like a credential | Integrations `PROVIDER_FIELDS` | `integrations-catalog-contract.md` §5 |
| B3 | **Webhook secret** | any webhook URL **value** (the two payout webhook rows are structure rows with **no value**) | Paymob Payout / Payoneer Payout | `integrations-catalog-contract.md` §1, row 8–9 |
| B4 | **SMTP credential** | `smtp_username` / `smtp_password` **value** | Email/SMTP `PROVIDER_FIELDS` | `integrations-catalog-contract.md` §1, row 11 |
| B5 | **Payment live key** | any `sk_live_`/`pk_live_`-shaped string, any provider defaulted to a **Live** environment | PayPal/Payoneer environment selects | `integrations-catalog-contract.md` §1 (PayPal "never defaulted to Live") |
| B6 | **Teacher pay figure** | salary / hour-rate / fine / payout **number or currency token**; `rate_student_absent`; `settings_data[…]`; `fin[…]` | General Teachers tab, Automation, Notifications `salaries` row | `pay-free-settings-exclusion-contract.md` (11-field register, P1–P6) |
| B7 | **Family rate** | any per-family hour-rate or currency figure | not applicable to any Spec 040 surface — recorded so no author adds one under "billing settings" | role-carryover §4 (family zero-pay) |
| B8 | **Real PII** | a real name/email/phone/Gmail address/group-invite URL copied from the legacy crawl | any fixture string | role-permission-and-sensitive-data-carryover.md §5 |
| B9 | **Fake "Connected" status** | the token `متصل` / `connected` **inside a chip**, in any form — including the negative "not connected" (the census is chip-scoped + token-absolute; the honest backendRequired sentence contains the word, so a body-wide grep is unwritable). Chips use the closed 3-state vocabulary: «غير مُعدّ»/"not configured" · «يتطلّب ربط الخادم»/"requires the server" · «غير متاح»/"unavailable" | Integrations status chips | `integrations-catalog-contract.md` §2 (STOP condition 5) |
| B10 | **Fake success wording** | `تم الحفظ` / `\bsaved\b` / `بنجاح` / `successfully` / `تم الربط` / `نجح` / `\bdone\b` — in **any** locale value, label, note or `data-toast`. ⚠ **This bans the naive preview note**: «لا يتم الحفظ» contains «تم الحفظ», and "not saved" contains `saved`. Canonical note: «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected." | every toggle/gate/section note | Ledger R5; scope-guard §3.4 |
| B11 | **`type=file` / `<canvas>` shape** | not a token but a structural ban: no fixture may carry a `type:'file'` or `kind:'canvas'` field descriptor (there is no such `field()` type to begin with) | logo, background upload, cert designer (n/a here) | scope-guard §3.2 |
| B12 | **Currency symbol** | `ريال|SAR|جنيه|EGP|AED|EUR|$|€|£` in any label/help/purpose string | Security invoices import, provider descriptions | Ledger R2 |
| B13 | **Channel value `2`** | the non-existent legacy enum value | `CHANNEL_OPTS` | `notification-matrix-contract.md` §1 |
| B14 | **A 4th connection state** | any status vocabulary outside `not-connected / requires-server / unavailable` | Integrations | `integrations-catalog-contract.md` §2 |

**Grep gates (run against the built `public/settings.html` + `public/settings.en.html`, and against the fixture/
locale source diff — comments included, per the standing G8a rule):**
```bash
grep -niE 'type="password"|type="file"' public/settings*.html                                   # 0 (B1/B11)
grep -niE 'sk_live|pk_live|client_secret=|hmac|smtp_password|smtp_username' public/settings*.html # 0 (B2/B4/B5)

# B6 — pay is a FIGURE ban, not a word ban. "Salary events" (notifications routing section) and the provider
# names "Paymob Payout"/"Payoneer Payout" are LAWFUL; a digit next to them is not. Do NOT grep the bare words to 0.
grep -niE '(salary|رواتب|hour[-_ ]?rate|أجر الساعة|\bfine\b|غرامة|payout)[^<]{0,24}[0-9]' public/settings*.html  # 0 (B6)
grep -nE 'settings_data\[|salary_period|applayFins|fin\[|rate_student_absent|hours-input|rate-input' public/settings*.html # 0 (B6)

# B9 — CHIP-scoped, token-absolute (never a body-wide /connected/i grep: the honest backendRequired sentence
# "available once the server is connected" contains the word).
node -e "const fs=require('fs');for(const f of ['public/settings.html','public/settings.en.html']){
  const c=(fs.readFileSync(f,'utf8').match(/<span[^>]*class=\"[^\"]*chip[^\"]*\"[^>]*>[\s\S]*?<\/span>/g)||[]);
  console.log(f, c.filter((x)=>/متصل|connected/i.test(x)).length);}"                              # 0  0 (B9)

grep -niE 'تم الحفظ|\bsaved\b|بنجاح|\bsuccessfully\b|تم الربط|نجح' public/settings*.html          # 0 (B10)
grep -RoE '(ريال|SAR\b|جنيه|EGP\b|AED\b|EUR\b|[$€£])'  public/settings*.html                      # 0 (B12)
grep -n "value.*['\"]2['\"]" src/js/fixtures/settings-notifications.js                            # 0 in CHANNEL_OPTS (B13)
```

---

## 4. Locales — `ar.adm.js` + `en.adm.js` only (already registered — `i18n.js` stays 0-diff)

### 4.1 Files

| File | Status | Before → after `adm.*` | Before → after `adm.set.*` |
|---|---|---|---|
| `app/src/locales/ar.adm.js` | EXTENDED | 397 → ≈ 726 | 121 → ≈ 450 |
| `app/src/locales/en.adm.js` | EXTENDED | 397 → ≈ 726 | 121 → ≈ 450 |

Exact counts are the implementer's — **AR and EN must be numerically equal** (STOP condition 10). This table
records the estimate so a reviewer can sanity-check the order of magnitude, not a binding literal.

**No other locale module is touched.** `ar/en.extra.js` (`set.*`, 43 keys each — a pre-existing, unrelated `set.*`
namespace used by non-Settings surfaces) is **0-diff**; do not confuse it with the new `adm.set.*` keys.

### 4.2 New namespaces (all under `adm.set.*`, all mirrored AR/EN)

| Namespace | Domain | Approx. new keys | Contract of record |
|---|---|---|---|
| `adm.set.gen.identity.*` | General identity fields (10) + logo gate | ~20 | `general-settings-completeness-contract.md` |
| `adm.set.gen.auto.*` | Automation — 5 group titles + 17 control labels/help | ~45 | `automation-rules-contract.md` |
| `adm.set.gen.payRulesTitle` / `payRulesNote` | The honest pay-absence explanation (⚠ `adm.set.gen.payNote` is **existing**, byte-verbatim) | 2 | `pay-free-settings-exclusion-contract.md` §2 |
| `adm.set.notif.sec.*` | 7 section titles | 7 | `notification-matrix-contract.md` §5 |
| `adm.set.notif.master.*` | 5 master toggle labels | 5 | `notification-matrix-contract.md` §2 |
| `adm.set.notif.ev.*` | 28 distinct event labels (shared across recipients) | 28 | `notification-matrix-contract.md` §3 |
| `adm.set.notif.ch.*` | 5 channel labels | 5 | `notification-matrix-contract.md` §1 |
| `adm.set.notif.field.*` | 13 field labels (10 selects + 3 numbers) | 13 | `notification-matrix-contract.md` §4 |
| `adm.set.notif.note.*` / `chip.*` / `reason.*` | preview-only notes, integration-unavailable chips, disable reasons | ~10 | `notification-matrix-contract.md` §6.4 |
| `adm.set.cust.brand.*` | 2 theme-colour rows | 4 | `customisation-settings-scope.md` |
| `adm.set.cust.status.*` | 11 status-colour rows | 11 | `customisation-settings-scope.md` |
| `adm.set.cust.appearance.*` | 3 appearance selects (`cust-layout`, `cust-sidebar`, `cust-surface`) | ~9 | `customisation-settings-scope.md` |
| `adm.set.sec.import.*` | 4 import cards × (title, purpose, column list, template gate) | ~40 | `security-settings-scope.md` §B |
| `adm.set.sec.backup.*` | destination field (`sec-backupTo`) + Save gate + Send-backup gate + its **standing scope/destination/permission/audit copy** (no confirm — `security-import-backup-policy-contract.md` §H1) | ~8 | `security-settings-scope.md` §A |
| `adm.set.sec.policy.*` | 2 policy bodies + edit gate | ~8 | `security-settings-scope.md` §C |
| `adm.set.sec.tfa` / `tfaReason` | **EXISTING — byte-verbatim, 0 new keys** | 0 | `general-settings-completeness-contract.md` §3 |
| `adm.set.integ.provider.*` | 11 providers × (name, category, description) | ~33 | `integrations-catalog-contract.md` §1, §3 |
| `adm.set.integ.field.*` | 21 safe field labels | 21 | `integrations-catalog-contract.md` §1 |
| `adm.set.integ.sensitive.*` | 24 sensitive-row labels + purposes | ~48 | `integrations-catalog-contract.md` §1 |
| `adm.set.integ.chip.*` | 3 connection-state chips | 3 | `integrations-catalog-contract.md` §2 |

**Unchanged (0-diff namespaces):** `adm.set.users.*`, `adm.set.tab.*`, `adm.set.heads.*`, `adm.set.loc.*`,
`adm.set.gen.payNote` (existing pointer, byte-verbatim per `pay-free-settings-exclusion-contract.md` §2).

### 4.3 Why `i18n.js` stays 0-diff

`i18n.js` already registers the `ar.adm` / `en.adm` module pair (shipped by Spec 031). Extending the objects those
modules export requires **no import list change, no registry change** — `i18n.js` never enumerates individual
keys, only modules. This is the same mechanism every prior nav-completion spec (034–039) relied on to keep
`i18n.js` at 0-diff while adding hundreds of keys.

### 4.4 Locale-parity verification (must be run, both statically and via the raw-key smoke guard)

```bash
node -e "
const ar = Object.keys(require('./src/locales/ar.adm.js').default ?? require('./src/locales/ar.adm.js'));
const en = Object.keys(require('./src/locales/en.adm.js').default ?? require('./src/locales/en.adm.js'));
console.log('ar:', ar.length, 'en:', en.length, 'onlyAr:', ar.filter(k=>!en.includes(k)).length,
  'onlyEn:', en.filter(k=>!ar.includes(k)).length);
"
# EXPECT: ar.length === en.length, onlyAr === 0, onlyEn === 0.
```
The static diff catches renames; `tests/smoke/run.cjs:125,157`'s `⟦key⟧` raw-key regex catches anything that
actually rendered unresolved on either language build — both must be run (`quickstart.md` §4–5).

---

## 5. Acceptance

| # | Check | Expectation |
|---|---|---|
| L1 | `git diff --stat -- src/js/fixtures` | exactly `settings-management.js` (modified) + `settings-notifications.js` (new) |
| L2 | `git diff --stat -- src/locales` | exactly `ar.adm.js` + `en.adm.js` |
| L3 | `git diff -- src/js/i18n.js` | empty |
| L4 | Every sensitive-field / column descriptor object | has `labelKey` + `required` + `purposeKey`; **no** `value` key |
| L5 | §3 grep gates | all return 0 |
| L6 | §4.4 locale-parity check | `ar.length === en.length`, 0 divergence either direction |
| L7 | Raw-key smoke guard (`⟦key⟧`) on `settings(.en).html` | 0 matches |
| L8 | `CHANNEL_OPTS` values | exactly `{0,1,3,4,5}` — no `2` |
| L9 | `BRAND_ROWS` status-colour hex set | exactly 6 distinct values across 11 rows |
