# Contract — Security Tab: Imports · Backup · Policies · 2FA (Spec 040)

**Nav id** `settingsSecurity` (`nav.config.js:114`) · **Status after** `implemented` · **Route** `settings.html#view=security`
(EN resolved by the hash-aware `langRoute()` → `settings.en.html#view=security`; `sidebar.js` 0-diff) · **Tab id** `security`
(EXISTING, byte-pinned at `smoke:1194`) · **New pages** 0 · **Count impact** 0 (115 HTML · 50 admin-menu items).

Legacy evidence: `/management/settings/security/data` (6 visible fields + 4 multipart import forms) and
`/management/settings/security/policy` (2 Quill editors). This tab is the one place where the rebuild must be
**strictly safer than the original**, not merely equivalent — the legacy surface ships a plaintext-`password` import
column, a no-confirmation full-database backup, and a co-submitting policy form.

---

## 0 — Surface budget (binding, from the ledger §F.4 / §F.7)

| Quantity | Value | Note |
|---|---|---|
| `field()` controls on the Security tab | **1** | the backup **destination** (`type:'text'`) — the ONLY input on this tab |
| Structure-only rows | **34** | 33 import column rows + 1 two-factor row |
| `data-disabled-reason` gates | **≈12** | 4 upload + 3 download-template + 2 backup + 2 policy-edit + 1 2FA |
| `data-toggle` previews | **0** | none on this tab |
| `formDrawer()` drawers | **0** | Security adds **no** drawer; `FORM_DRAWERS_032.settings` gains only the 11 `integ-*` (ledger §D.2/R4) |
| `input[type=file]` · `[type=password]` · `<canvas>` · `download=` attr · `window.open` | **0** | stop condition 4 |
| Authored secret / credential / pay figure / currency token | **0** | stop conditions 4 · 6 (`a31.currency === 0`) |

A Security **textarea** is explicitly OUT of scope: giving the policy Edit a real editor would push `field()` 1 → 3 and
requires a declared amendment. Edit stays a gate (§C).

---

## A — The four import flows

Legacy: four multipart `<form>`s → `POST /settings/security/data/import`, each carrying `type` + a single required
`accept=".xlsx"` file input. No validation preview, no dry-run, no column mapping, no undo, **and no confirmation on any
of the four** — the deep corpus records this as *"the highest risk item in this batch"*.

| `type` | Legacy file id | Legacy card title | **Functional label used** | Legacy template link | Rendered columns | Controls |
|---|---|---|---|---|---|---|
| 1 | `teachers_file` | Upload teachers | **Teachers** | ✔ | **8** | Download template (gate) · Upload (**gate**) |
| 2 | `families_file` | Upload families | **Families** | ✔ | **12** | Download template (gate) · Upload (**gate**) |
| 3 | `children_file` | Upload children | **Children** | ✔ | **7** | Download template (gate) · Upload (**gate**) |
| 4 | `invoices_file` | **"Upload families"** — *mis-titled in legacy* | **Invoices** | **✘ (absent)** | **6** | Upload (**gate**) — **no download control** |

- The 4th card's title is a legacy bug: the raw HTML carries `type=4` + `invoices_file`. We render the **functional**
  name (Invoices) and record the mislabel in the fixture comment. We do **not** reproduce a second "Upload families".
- Card 4 has **no** Download-Template link in legacy ⇒ **we render no download control for it**. Inventing one would
  fabricate an artefact that has never existed.
- Column counts are the register in `safe-import-columns-contract.md` (39 evidenced − 6 rejected slots = **33**).

### A.1 — The flow, step by step (identical for all four)

1. **Card** (`.card`, inline in the `security` section — never a modal, never a drawer).
2. **Purpose line** + **accepted format** (`.xlsx`) — copy only, no input.
3. **Required columns** — a native `<details class="set-acc">` disclosure (mirrors the legacy info-toggle) listing the
   card's rendered columns as **structure rows** (`.set-struct`: label + required badge + purpose). **No values, no
   inputs, no file picker.**
4. **Download template** → `<button data-disabled-reason>` (cards 1-3). **Never** `<a download=…>` — R3: the
   `g32.pdfish` regex `/window\.open|blob:|createObjectURL|\.pdf"|[^-\w]download=/i` fails the build's own test on the
   *attribute*; the word "download" inside a **label** is safe.
5. **Upload** → a **direct `data-disabled-reason` backendRequired gate** (**no `data-confirm`** — see §H1). No file
   is selected, no file is read, nothing is parsed, nothing is persisted, no row count is invented, no success toast
   fires. The gate's reason copy states the **scope · destination · permission · audit** facts (§B.3) that a real
   import/backup would need — the *content* of the refused legacy confirmation is preserved as **standing, visible
   copy**, which is strictly more informative than a dialog the user must first trigger.

### A.2 — Refused legacy behaviours (each one is a law, not a preference)

| Legacy behaviour | Refused because | Our behaviour |
|---|---|---|
| `type="file"` on 4 forms | no-secret / no-fake law; `a31.fileInputs === 0` sitewide | 0 file inputs; upload is a gate |
| Bulk import with **no confirmation** | destructive, irreversible, no undo | **The import cannot run at all** — it is an honest gate. The confirmation is a *backend-era_ obligation (§B.4), recorded here and shipped **with** the real action; a confirm staged in front of an inert gate would be theatre, and Spec 040 adds **zero** confirms (Ledger §G) |
| Publishing the `password` column | no-secret law (a plaintext credential column on screen) | REJECTED by name |
| Publishing `hour_rate` / `currency` | teacher pay-free GLOBAL | REJECTED by name |
| Mis-titled card 4 | dishonest label | functional name (Invoices) |
| No dry-run / mapping / undo | not inventable (no UI evidence) | **UNKNOWN — not invented**; the backend owner must supply validation + dry-run before the gate can ever open |

---

## B — The backup flow

### B.1 — The anti-pattern being refused (stated plainly)

Legacy `Send Backup` is a plain `<a>` → `GET …/backup/send`. It **fires a real, full database backup with NO
confirmation dialog**, from an idempotent-looking GET, and then **302-redirects the admin into the Email/SMTP
integration page**. Three defects in one control: an unconfirmed irreversible data-egress action, a state-changing
GET, and a **silent redirect** that leaves the admin on a different surface with no result. Spec 040 reproduces
**none** of it.

### B.2 — What we render

| Element | Rendering | Notes |
|---|---|---|
| **Destination** | **1 `field({type:'text'})`**, **no value** | the tab's only input. Naming law (R1): the `name`/`id` must not contain `pass·secret·api·key·token·webhook·card·cvv` → recommended `sec-backupTo` (author's choice; the constraint is binding, the string is not). `field()` has no `email` type — `text` is correct and sufficient. |
| **Save destination** | `data-disabled-reason` **gate** | no persistence, no `academy.*` key, no toast reading "saved / تم الحفظ". |
| **Send backup now** | **direct `data-disabled-reason` gate** (**no `data-confirm`** — §H1) | the four facts of §B.3 are rendered as the control's **visible reason/purpose copy**, always on screen — not staged behind a confirm for an action that structurally cannot run. |
| **Result / history / last-run** | **NOT rendered** | no evidence exists; inventing a "last backup" line would be a fake record. |

**No navigation of any kind.** The control is a `<button>`: 0 `href`, 0 `window.open`, 0 `download=`, and it never
routes to the Integrations tab. The legacy redirect is not reproduced (stop condition 4).

### B.3 — The gate copy: scope · destination · permission · audit

The **visible reason/purpose copy** beside the Send-backup gate states the four facts an admin would need before an
irreversible egress, and claims nothing beyond them (keys mirrored AR/EN under `adm.set.sec.*`, 0 divergence). This is
the content the legacy product omitted entirely; Spec 040 renders it **standing on the page** rather than in a confirm
dialog (§H1 — no confirm is added for an action that cannot run):

| Fact | What the copy says | Evidence status |
|---|---|---|
| **Scope** | this requests a **full database export** — the whole academy record set, not a filtered slice | legacy route is a whole-DB backup; the exact table set is **UNKNOWN** and is *not* enumerated |
| **Destination** | the export leaves the system to the **single configured destination address** shown above | grounded: legacy has exactly one `backup_email` destination |
| **Permission** | this action requires a **server-side permission check**; the frontend cannot authorise it | legacy evidences **no** permission gate — recorded as a gap, **not** simulated with a fabricated role picker |
| **Audit** | the export must be **recorded server-side** (who/when/where-to) | legacy evidences **no** audit trail — recorded as a gap, **not** faked with an on-page log |

Clicking the gate then fires the shared backendRequired toast («يُتاح بعد ربط الخادم» / "available once the server is
connected"). **Nothing in the copy claims a backup has started, is queued, or has been sent.**
**Backend-era obligation (recorded, not built):** when the real POST exists, it MUST be fronted by a real confirm
carrying exactly these four facts — the confirm and the action ship **together** (§B.4, FO-11).

### B.4 — Backend-owner contract (what must exist server-side before this gate may ever open)

1. An authenticated, **permission-checked** POST (never a GET) endpoint.
2. A declared, versioned **scope manifest** of what the export contains.
3. **Destination verification** (the address is proven owned before any egress).
4. An **audit record** per invocation, and a rate limit.
5. **No redirect on completion** — the caller receives a result, not a new page.
Owner: the real backend. Field-level PII isolation and export redaction remain owned by **Spec 043 — Sensitive Data
Privacy, Role Isolation & Anti-Poaching**; the SMTP transport that would carry the export is owned by **Spec 053 —
Integrations Command Center**. Neither is widened into Spec 040.

---

## C — The two policy editors

Legacy: two **Quill** rich-text editors (`family_privacy`, `teacher_privacy`), both empty, **both disabled on load**; a
pencil button enables one and reveals a Submit that **posts both policies together** and pops
"Policies updated successfully". Two unlabelled selects sit beside them (U-6) with no evidenced meaning.

**Spec 040 renders both as structured long-form display sections, built from EXISTING components only:**

| Rule | Statement |
|---|---|
| Components | the existing `settingsSection()` / `.set-section` heading + authored display body (the shipped `POLICIES` fixture, 2 rows, Spec 031). **No new component, no new dependency, no Quill, no `contenteditable`, no toolbar, no `<textarea>`.** |
| Long-form shape | heading → authored policy body (paragraph blocks) → one gated **Edit** per policy. The section is **inline and full-width — never a small modal** (ledger §G). |
| **Independent ownership** | the two policies carry **two separate Edit gates**. The legacy single-Submit-posts-both behaviour is a coupling bug and is **refused**: editing the family policy must never write the teacher policy. |
| Edit | `data-disabled-reason` **gate**. It does **not** open a textarea drawer — that would raise Security `field()` 1 → 3 and needs a declared amendment. |
| Not invented | version number, "last updated", author, changelog, publish state — **no evidence ⇒ not rendered**. |
| Not reproduced | the 2 unlabelled selects (U-6); the "Policies updated successfully" alert (fake success — stop condition 5). |

---

## D — Two-factor authentication

Legacy: `tfa` (checkbox, **disabled**, reason "No WhatsApp Connected") + a **hidden `otp` phone field** — a single
shared OTP destination for *all* admins — on an inert tab whose Save card is hidden, while the page copy promises
password-complexity and session-timeout controls **that do not exist**.

| Item | Decision |
|---|---|
| `tfa` | **relocated from the General tab** (ledger §F.1 group D) → **1 structure row** (`.set-struct`: label + purpose "OTP on login for admins & support") + **1 `data-disabled-reason` gate**. The locale keys `adm.set.sec.tfa` / `adm.set.sec.tfaReason` already exist (Spec 031) — reused, not re-minted. |
| `otp` | **NOT RENDERED.** A single shared OTP phone for all users is a recorded security anti-pattern (Spec 033 security acceptance: *"no secret/OTP control"*). |
| Legacy Accessibility intro copy | **not reproduced** — it promises capabilities that do not exist in legacy and would not exist here. |
| Working 2FA | none. There is no OTP input, no secret, no `type=password`. |

---

## E — Access / audit explanations: what we say vs what we refuse to claim

| We SAY (honest, grounded) | We REFUSE to claim (fabrication) |
|---|---|
| "this action runs on the server and requires a permission check" (gate reason) | a rendered role/permission picker for backup, import or policy — **zero legacy evidence** |
| "the export must be recorded server-side" (confirm body) | an on-page audit log, an actor name, a timestamp, a "last backup 12:04" line |
| "0 files leave this page" (the download-template gate) | a template file, a generated `.xlsx`, a `blob:` URL |
| the import's **required-column contract** (33 structure rows) | a validation result, a row count, a dry-run diff, an undo |
| "not connected — available once the server is connected" | any "Connected", "Saved", "Sent", "تم الحفظ" state (stop condition 5) |

Permission ownership is unchanged by Spec 040: `staff.html` remains the sole (explicitly non-functional) RBAC surface;
the settings **Users** tab stays a display-only preview + a real `<a href="staff.html">` link (ledger §C, `usersPanel()`
0-diff). **No permission engine is created here.**

---

## F — Honesty contract (action → class)

| Action | Class |
|---|---|
| Save backup destination | `data-disabled-reason` gate |
| **Send backup now** | **direct `data-disabled-reason` gate** (facts in the visible copy, §B.3) |
| Upload import ×4 | **direct `data-disabled-reason` gate** |
| Download template ×3 (cards 1-3; card 4 has none) | gate — a `<button>`, never `<a download=…>` |
| Edit family policy · Edit teacher policy | gate (×2, independent) |
| Enable two-factor | gate |
| Reset demo data (pre-existing) | confirm, no mutation — **unchanged** |
| **New confirms added by Spec 040** | **ZERO** (Ledger §G) |

**Forbidden on this tab (census must read 0):** fake import · fake backup · fake policy save · fake success wording ·
`input[type=file]` · `input[type=password]` · `<canvas>` · `download=` attribute · `window.open` · `blob:` ·
any secret / API key / token / webhook **value** · any pay figure or currency token · any computed metric · any
redirect on a write · **any executable destructive action at all** (there is none to confirm — every one is a gate) ·
`href="#"` · raw locale key · new `data-*` hook · new `localStorage` key · new dependency.

---

## G — Proof (test hooks that already enforce this)

- `a31` (`smoke:~1172-1176`): `fileInputs === 0` · `passwordInputs === 0` · `credInputs === 0`
  (`/pass|secret|api|key|token|webhook|card|cvv/i` over every input `name`/`id` — R1) · `canvas === 0` ·
  `currency === 0` (R2) · `gates >= 20` (sanctioned strengthening from `>= 4`).
- Sitewide `g32` (`smoke:1288-1297`): `pw===0 && file===0 && canvas===0 && !pdfish` on **every** built page — the
  download-template gate must therefore be a `<button>` (R3).
- Sitewide FAKE-success guard: no toast may read "saved / تم الحفظ / done" (R5).
- `#view=security` fresh-context deep-link (AR + EN): exactly **one** visible `[role=tabpanel]` = `security`,
  **0 external requests**.
- a11y (R7): `#view=security` × AR/EN × light/dark + mobile-390 + the open `<details>` column disclosures →
  **critical = 0, serious = 0**.

---

## H — Ledger reconciliation (RESOLVED — do not re-litigate)

1. **Confirms — OVERRULED, resolved to GATE-ONLY.** An earlier draft of this contract asked `plan.md` to ratify
   `confirm → gate` on Send-backup and the 4 imports. **The reconciler overrules it.** Ledger §F.4 says *"Every Upload =
   **GATE** (`data-disabled-reason`)"* and *"+ gated 'Send backup now'"*; Ledger §G says *"Confirms: **none added**"*.
   Both point the same way, so the premise of the ratification request ("§F.4 requires confirm → gate") was simply
   wrong. **Binding disposition: every Security final is a DIRECT `data-disabled-reason` gate; Spec 040 adds ZERO
   `data-confirm` chains anywhere in the hub.**
   *Reasoning, so the substance is not lost:* a confirm dialog in front of an inert gate stages a
   destructive-action ritual for an action that **structurally cannot occur** — it is theatre, and it teaches the
   user a habit (click-through) against an action that will one day be real. The valuable content of the refused
   confirmation — **scope · destination · permission · audit** (§B.3) — is preserved as **standing visible copy**
   beside the gate, which is strictly more informative than a dialog that must be summoned. The real confirm is a
   **backend-era obligation** (§B.4) and ships **with** the real action (FO-11 → backend; FO-10 → backend + 043).
   Gate count is unchanged (≈12); no ledger number moves.
2. **Families rendered columns.** `security-settings-scope.md` says "render 11"; the ledger §F.4 enumerates **12**
   (15 evidenced − `password` − `currency` − `hour_rate`). **The ledger wins: 12.** Total rendered = 8 + 12 + 7 + 6 = **33**.

## I — Acceptance

Built `settings.html` / `settings.en.html` `security` panel: 4 correctly-labelled import cards (3 with a gated template
button, card 4 without) · 33 column structure rows behind native `<details>` · 1 destination `field()` (`sec-backupTo`)
with no value · Send-backup as a **direct gate** with no redirect and no confirm, its scope/destination/permission/audit
copy visible on the page · 2 independently-gated policy documents rendered from the existing components · 1 two-factor
structure row + gate · `otp` absent as a control · 0 file/password/canvas/download-attr/secret/currency · 0 fake
success · **0 new `data-confirm`** · every final write a backendRequired gate.
