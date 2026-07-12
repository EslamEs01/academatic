# Contract — Safe Import Columns: the exact column decision register (Spec 040)

**Surface** `settings.html#view=security` → the 4 data-import cards · **Legacy** `POST /management/settings/security/data/import`
(4 multipart forms, `type` 1-4) · **Count impact** 0.

Every column the legacy import contract publishes is decided here **by name**. Nothing is rendered that is not in the
ALLOWED set; nothing in the REJECTED set appears anywhere in the built HTML — not as an input, not as a structure row,
not as help copy.

---

## 0 — Totals (binding, ledger §F.4)

| Import | `type` | file id | Evidenced columns | Rejected slots | **Rendered** |
|---|---|---|---|---|---|
| Teachers | 1 | `teachers_file` | 10 | 2 | **8** |
| Families | 2 | `families_file` | 15 | 3 | **12** |
| Children | 3 | `children_file` | 7 | 0 | **7** |
| Invoices | 4 | `invoices_file` (legacy card mis-titled "Upload families") | 7 | 1 | **6** |
| **Total** | | | **39** | **6 slots / 3 distinct names** | **33** |

**39 − 6 = 33.** ✔ The 33 rendered columns are the 33 import structure rows counted in ledger §F.7 (Security: 34
structure rows = 33 columns + 1 two-factor row).

**Rejected by name (3 distinct, 6 slots):** `password` (×1) · `hour_rate` (×2) · `currency` (×3).

---

## 1 — How an ALLOWED column is rendered

A rendered column is a **structure row**, never an input:

```
.set-struct  →  { labelKey, required, purposeKey }      // NEVER a `value`
```
- Emitted inside the card's native `<details class="set-acc">` "Required columns" disclosure (zero JS, zero new hook).
- **0 `<input>` / `<select>` / `<textarea>`** ⇒ the column names can never trip `a31.passwordInputs` / `fileInputs` /
  `credInputs`, and can never be submitted.
- **0 values.** No sample data, no example row, no PII, no amount, no currency symbol.

**Naming law (R1), binding for anything that ever becomes an input on the settings hub:** no `name`/`id` may contain
`pass` · `secret` · `api` · `key` · `token` · `webhook` · `card` · `cvv` (`smoke:1174` fails the build's own test).
The rejected columns are the reason this law bites here — `password` alone would fail it — and they are rejected
anyway, on the standing laws.

---

## 2 — Register: Teachers (`type=1`, `teachers_file`) — 10 evidenced → 8 rendered

| # | Legacy column | Sensitivity | Decision | Rendered as | Safe replacement | Backend owner |
|---|---|---|---|---|---|---|
| 1 | `id` | identifier | **ALLOWED** | structure row (required) | — | core |
| 2 | `first_name` | PII — name | **ALLOWED** | structure row (required) | — | core |
| 3 | `last_name` | PII — name | **ALLOWED** | structure row (required) | — | core |
| 4 | `email` | PII — contact | **ALLOWED** | structure row (required) | — | core |
| 5 | `phone` | PII — contact | **ALLOWED** | structure row | — | core |
| 6 | `gender` | demographic | **ALLOWED** | structure row | — | core |
| 7 | `status` | operational enum | **ALLOWED** | structure row | — | core |
| 8 | `timezone` | locale | **ALLOWED** | structure row | — | core |
| 9 | **`currency`** | money unit | **REJECTED** | — (absent) | **none.** A currency token on the settings body trips `a31.currency === 0` (stop condition 6 / R2). | finance backend (Spec 030 no-fake-money invariant) |
| 10 | **`hour_rate`** | **teacher pay figure** | **REJECTED** | — (absent) | **none, ever.** Teacher pay-free is GLOBAL: no salary/rate/fine/payout figure on any surface, in copy **or** comments. | payroll backend (excluded from every frontend spec, FOREVER) |

---

## 3 — Register: Families (`type=2`, `families_file`) — 15 evidenced → 12 rendered

| # | Legacy column | Sensitivity | Decision | Rendered as | Safe replacement | Backend owner |
|---|---|---|---|---|---|---|
| 1 | `id` | identifier | **ALLOWED** | structure row (required) | — | core |
| 2 | `name` | PII — name | **ALLOWED** | structure row (required) | — | core |
| 3 | `user_name` | account handle | **ALLOWED** | structure row | — | core |
| 4 | **`password`** | **credential (plaintext)** | **REJECTED** | — (absent) | **no column may carry a credential.** Accounts are provisioned server-side; the server issues an invite / reset flow. The import never transports a password. | real auth backend; PII isolation → **Spec 043** |
| 5 | `email` | PII — contact | **ALLOWED** | structure row (required) | — | core |
| 6 | `phone` | PII — contact | **ALLOWED** | structure row | — | core |
| 7 | `status` | operational enum | **ALLOWED** | structure row | — | core |
| 8 | `country_id` | locale | **ALLOWED** | structure row | — | core |
| 9 | `timezone` | locale | **ALLOWED** | structure row | — | core |
| 10 | **`currency`** | money unit | **REJECTED** | — (absent) | none (R2) | finance backend |
| 11 | **`hour_rate`** | **pay figure** | **REJECTED** | — (absent) | none, ever (pay-free law; also the family surface is zero-pay) | payroll backend |
| 12 | `total_hours` | enrolment quota (a **count**, not money) | **ALLOWED** | structure row | — | enrolment backend |
| 13 | `invoice_type` | finance enum (name only) | **ALLOWED** | structure row | — | finance backend |
| 14 | `course_type` | catalogue enum | **ALLOWED** | structure row | — | core |
| 15 | `payment_method` | payment **routing** enum | **ALLOWED — column name only** | structure row. **Never** a live gateway selector, never a provider list, never a credential. | the live gateway is owned by **Spec 053 — Integrations Command Center** |

`total_hours` is safe precisely because it is a **count** — the same reason the family portal's hour-quota (40/12/28) is
lawful while an amount is not.

---

## 4 — Register: Children (`type=3`, `children_file`) — 7 evidenced → 7 rendered (0 rejected)

| # | Legacy column | Sensitivity | Decision | Rendered as | Backend owner |
|---|---|---|---|---|---|
| 1 | `id` | identifier | **ALLOWED** | structure row (required) | core |
| 2 | `name` | PII — name | **ALLOWED** | structure row (required) | core |
| 3 | `parent_id` | relational identifier | **ALLOWED** | structure row (required) | core |
| 4 | `age` | demographic (minor) | **ALLOWED** | structure row | core; child-data handling → **Spec 043** |
| 5 | `gender` | demographic | **ALLOWED** | structure row | core |
| 6 | `language` | locale | **ALLOWED** | structure row | core |
| 7 | `status` | operational enum | **ALLOWED** | structure row | core |

No credential, no money, no pay column exists in this import — it is rendered whole.

---

## 5 — Register: Invoices (`type=4`, `invoices_file`) — 7 evidenced → 6 rendered

The legacy card is titled **"Upload families"**; the raw HTML (`type=4` + `invoices_file`) proves it is the **Invoices**
import. The functional name is used. The card has **no Download-Template link in legacy ⇒ no download control here**.

| # | Legacy column | Sensitivity | Decision | Rendered as | Safe replacement | Backend owner |
|---|---|---|---|---|---|---|
| 1 | `id` | identifier | **ALLOWED** | structure row (required) | — | finance backend |
| 2 | `parent_id` | relational identifier | **ALLOWED** | structure row (required) | — | finance backend |
| 3 | `price` | money **amount** | **ALLOWED — column name only** | structure row. **0 figures, 0 example amounts, 0 currency symbol, 0 computed total.** | — | finance backend (Spec 030/038 no-fake-money) |
| 4 | **`currency`** | money unit | **REJECTED** | — (absent) | none — a `ريال/SAR/EGP/AED/EUR/$/€/£` token anywhere on the settings body fails `a31.currency === 0` | finance backend |
| 5 | `status` | operational enum | **ALLOWED** | structure row | — | finance backend |
| 6 | `due_date` | date | **ALLOWED** | structure row | — | finance backend |
| 7 | `note` | free text | **ALLOWED** | structure row | — | finance backend |

`price` is admissible **as a column name** for the same reason the Spec-030/038 finance boards are admissible: the word
is not a figure. Rendering a figure — even a placeholder — is a stop condition.

---

## 6 — Why this register exists (the law-level finding)

Publishing the legacy import contract verbatim would place, in a single on-screen table:
- a **plaintext `password` column** (no-secret law), and
- an **`hour_rate` teacher-pay column** + a **`currency` unit** (teacher pay-free GLOBAL / no-fake-money law).

Two standing laws breached by one copy-paste. The rebuild is therefore **not** a faithful port of the column contract —
it is a **redacted** one, and the redaction is enumerated here so no author can silently re-add a name.

**Consequence for the backend:** the 6 rejected slots do not disappear from the world; they move to their owners —
credential provisioning to the auth backend (and PII isolation to **Spec 043**), compensation to the **payroll backend**
(never a frontend surface), money units to the **finance backend**. Recorded in the future-owner register.

---

## 7 — UNKNOWN (stated, never invented)

- Whether any column is genuinely optional vs required beyond the `required` flags evidenced in the legacy markup.
- The accepted value enums for `status`, `invoice_type`, `course_type`, `payment_method` — legacy publishes **names
  only**, no enum. We publish names only. **No enum is invented.**
- Row limits, encoding, header-row requirements, dry-run semantics, undo — **no evidence** in the corpus.
- The exact `.xlsx` template contents (cards 1-3 link to a file we never fetch; card 4 has no link).

---

## 8 — Acceptance

1. Built `settings(.en).html`: exactly **33** import column structure rows (8 + 12 + 7 + 6), each `label + required +
   purpose`, **0 values**.
2. `grep -i` over the built settings bodies: **0** occurrences of `password` · `hour_rate` · `currency` as a column
   name; **0** currency symbols/codes (`a31.currency === 0`); **0** money figures.
3. `a31`: `fileInputs === 0` · `passwordInputs === 0` · `credInputs === 0` (R1 naming law) on `settings` AR + EN.
4. Card 4 renders as **Invoices** (never a second "Upload families") and carries **no** download control.
5. AR/EN `adm.set.sec.*` column keys mirrored, **0 divergence** (stop condition 10).
