# Contract — A11y & Screenshot Coverage (Spec 040)

Baseline **HEAD `58a53e2`**. Target: **critical=0, serious=0** (a11y), **0 console errors** (screenshots).
Additive only — no existing row/frame is weakened, rescoped or deleted (Ledger §K STOP 8).

---

## 1. Current coverage (what already exists, so nothing is duplicated)

`#view=security`, `#view=users` and `#view=integrations` already have a11y rows from Spec 031 (the tabs existed,
even though `integrations`/`security` were content-thin). **`#view=general`, `#view=notifications` and
`#view=customization` have ZERO coverage today** — `targeted-visual-grounding.md` §1 confirms the current
`settings.js` renders only 2 form fields total, so there was nothing tab-specific to test. Spec 040 is the first
spec to give these three tabs real content, and therefore the first spec that can honestly test them.

---

## 2. A11y matrix — 6 views × AR/EN × light/dark × mobile-390 + 8 named states

### 2.1 The six base views (new + existing, all re-verified after the rewrite)

| Surface (`settings(.en).html#view=…`) | AR | EN | light | dark | mobile-390 | Coverage before 040 |
|---|---|---|---|---|---|---|
| `general` | ✓ | ✓ | ✓ | ✓ | ✓ | **none (new)** |
| `notifications` | ✓ | ✓ | ✓ | ✓ | ✓ | **none (new)** |
| `customization` | ✓ | ✓ | ✓ | ✓ | ✓ | **none (new)** |
| `security` | ✓ | ✓ | ✓ | ✓ | ✓ | existed thin; re-verified against the completed 4-import + backup + policy + 2FA body |
| `users` | ✓ | ✓ | ✓ | ✓ | ✓ | existed; body 0-diff — re-run only, no new finding expected |
| `integrations` | ✓ | ✓ | ✓ | ✓ | ✓ | existed thin (7 cards, 0 fields); re-verified against the 11-card + 11-drawer body |

**5 × 6 = 30 base cells** (each view × AR/EN/light/dark/mobile, counted as one row with 5 sub-checks).

### 2.2 The 8 named states (each maps to one concrete, evidenced interaction — no state is invented)

| # | Named state | Concrete target | Why this state and not another |
|---|---|---|---|
| S1 | **keyboard tab nav** | roving-tabindex ArrowRight/ArrowLeft across the 6 `[role=tab]`s + Enter/Space activation, both languages (RTL arrow-direction reversal on AR) | The tab mechanism (`components/tabs.js`) is unchanged, but this is the first spec where all 6 tabs hold real, divergent content — a keyboard user must be able to reach every one |
| S2 | **long-form scroll** | `#view=general` with all **5** `<details class="set-acc">` accordions **open** (Renewal · Cancellation · Attendance · Class closing · Reporting) — the longest tab (22 fields) | Proves the page scrolls **vertically only** (no horizontal overflow at any width) and that a screen-reader user can traverse 5 nested disclosures without a trap |
| S3 | **matrix** | `#view=notifications` with the **Class updates** section (18 event toggles, the largest of the 7 `settingsSection`s) expanded | The densest control surface in the whole spec (34 toggles); every toggle must expose `role="switch"` + `aria-checked` + an accessible name distinct from its 8 siblings |
| S4 | **provider drawer** | `#view=integrations` with `integ-paymob` open (5 sensitive structure rows + a real `region` select — the richest drawer) | Verifies a `formDrawer` focus trap holds over a mix of real `field()`s and structure-only rows without the structure rows being mistaken for interactive controls |
| S5 | **security gate + its standing copy** | `#view=security` with the **Send Backup** gate focused and its backendRequired toast open, alongside the always-visible scope/destination/permission/audit copy (`security-import-backup-policy-contract.md` §B.3) | Spec 040 adds **no confirm dialog** (§H1 / Ledger §G) — the highest-consequence control on the hub is an honest gate, and this row proves the gate is keyboard-reachable, announces its reason, and returns focus. It also proves the four facts are readable **without** summoning a dialog |
| S6 | **customisation preview** | `#view=customization` with the real `data-set-theme` control toggled **light → dark** while the 11-row status palette and 2 brand swatches remain visible | This is the **one genuinely live** interaction on the entire settings hub (`customisation-settings-scope.md` §"honesty split") — the row proves the real toggle and the inert swatches are both legible and distinguishable in the resulting theme, not merely present |
| S7 | **validation** | `#view=general` Identity section, focus landed on a `required` field (`gen-name`) | Fields are **inert by law** (`general-settings-completeness-contract.md` §2: "the frontend enforces none of it") — this row asserts the **static** `aria-required`/associated-`<label>` semantics are correct, not that a validation flow fires. No dynamic validation state exists to test |
| S8 | **gate** | any `[data-disabled-reason]` primary (e.g. General's Save) focused, its backendRequired toast open | Reuses the existing is-disabled reason-toast probe pattern (`smoke:231-240`) at the a11y layer: the gate must be reachable by keyboard, announce its reason, and return focus correctly |

**8 named-state rows × AR/EN where applicable** (S1/S6 are inherently bilingual-relevant — RTL arrow direction
and theme legibility both differ AR vs EN; S2–S5, S7, S8 are run in AR with a spot-check in EN) = **8 rows**.

### 2.3 Total a11y additions

| Bucket | Rows |
|---|---|
| 3 genuinely new views (general/notifications/customization) × AR/EN × light/dark + mobile-390 | **15** |
| 3 re-verified views (security/users/integrations) × AR/EN × light/dark + mobile-390 (re-run, not new coverage but re-baselined against new content) | 15 (re-run) |
| 8 named states (S1–S8) | **8** |
| **Net new rows in `tests/a11y/run.cjs`** | **23** (15 new-view + 8 named-state; the 15 re-run rows already exist as entries and are not duplicated, only their expected DOM changes) |

Target unchanged from every prior spec in the roadmap: **critical=0, serious=0**, sitewide.

---

## 3. Screenshot matrix — a documented REPRESENTATIVE set (not a full cross-product)

A full cross-product of 6 tabs × 2 languages × 2 themes × 2 viewports × 8 states would be **192** frames — an
uncontrolled explosion the standing screenshot-visual-acceptance practice explicitly rejects. Spec 040 instead
captures **one frame per (view × language) at light/desktop** (the primary review surface), plus a **small,
named, representative** set covering dark, mobile, and every state category that is otherwise invisible in a
light/desktop shot. Every domain (General/Notifications/Customization/Security/Users/Integrations) and every
critical honesty state (gate, drawer, confirm, matrix, accordion, real theme) appears at least once.

| # | Frame | Language(s) | Theme | Viewport | Covers |
|---|---|---|---|---|---|
| 1–6 | `settings__<lang>__light__desktop__sp040-<tab>.png` for each of the 6 tabs | AR **and** EN (12 frames) | light | desktop | the 6 base views, both languages |
| 7 | `settings__ar__dark__desktop__sp040-general.png` | AR | dark | desktop | dark-mode legibility on the longest tab |
| 8 | `settings__ar__dark__desktop__sp040-integrations.png` | AR | dark | desktop | dark-mode legibility on the card grid + chip tones |
| 9 | `settings__ar__light__mobile-390__sp040-general.png` | AR | light | mobile-390 | S2 long-form scroll, no horizontal overflow |
| 10 | `settings__ar__light__mobile-390__sp040-notifications.png` | AR | light | mobile-390 | S3 matrix collapses to native `<details>` per recipient (`notification-matrix-contract.md` §6.1) |
| 11 | `settings__ar__light__desktop__sp040-general-accordions-open.png` | AR | light | desktop | S2, all 5 `<details>` open |
| 12 | `settings__ar__light__desktop__sp040-notifications-class-open.png` | AR | light | desktop | S3, Class updates section expanded (18 toggles) |
| 13 | `settings__ar__light__desktop__sp040-integ-paymob-drawer.png` | AR | light | desktop | S4, provider drawer with sensitive structure rows |
| 14 | `settings__ar__light__desktop__sp040-integ-paymob-payout-drawer.png` | AR | light | desktop | a payout drawer — proves the salary-adjacent surface carries 0 figures |
| 15 | `settings__ar__light__desktop__sp040-head-add-drawer.png` | AR | light | desktop | the pre-existing `head-add` drawer, unchanged, re-confirmed inside the rewritten General tab |
| 16 | `settings__ar__light__desktop__sp040-security-backup-gate.png` | AR | light | desktop | S5, the Send-Backup **gate** + its open backendRequired toast + the standing scope/destination/permission/audit copy (**no confirm dialog exists** — Ledger §G) |
| 17 | `settings__ar__light__desktop__sp040-security-import-columns.png` | AR | light | desktop | Security import card's Required-Columns `<details>` disclosure |
| 18 | `settings__ar__light__desktop__sp040-customization-theme-dark.png` | AR | dark | desktop | S6, the live theme toggle proven on the Customization tab itself |
| 19 | `settings__ar__light__desktop__sp040-gate-toast.png` | AR | light | desktop | S8, an open backendRequired reason toast on a primary gate |
| 20 | `dashboard__ar__light__desktop__cat-settings.png` | AR | light | desktop | **RE-BASELINE** (not new) — the shared sidebar's 6 settings rows, «قريبًا» buttons → real links |

### 3.1 Total

**19 new `sp040-*` frames + 1 re-baselined existing frame = 20 screenshot artifacts.** This is the exact,
exhaustive list — no author may add or drop a frame without amending this table. Every one of the 6 domains
appears in frames 1–6 at minimum; every named state S1–S8 maps to at least one frame (S1 keyboard-nav is
behavioural, not a still frame, and is covered by the a11y matrix instead — recorded here so no reviewer expects
a "keyboard" screenshot).

---

## 4. Rules

1. **Additive only.** No existing a11y row or screenshot frame outside `dashboard__ar__light__desktop__cat-
   settings.png` is touched, rescoped, or deleted.
2. **The `cat-settings` re-baseline is an EXPECTED change, not a regression** — it must be reviewed by eye before
   acceptance (quickstart.md §9), and the review note must state explicitly that six buttons became six links.
3. **0 console errors** across every capture; **0 external requests** during any `#view=` fresh-load capture.
4. **`screenshots/REVIEW.md`** gains a Spec 040 section recording: the 20-frame list, the before/after
   `cat-settings` description, and the `sidebar.js:33`/`enhance.js` unexercised-but-retained branch note (Ledger
   §D.2 REVIEW.md record item).
5. **No frame or a11y row may itself violate any BANNED-content rule** (`fixtures-locales-contract.md` §3) — e.g.
   frame 13/14 must show structure-only rows with **no** visible credential value.

---

## 5. Acceptance

| # | Check | Expectation |
|---|---|---|
| A1 | `npm run test:a11y` | critical=0, serious=0, including all 23 net-new rows |
| A2 | `node tests/screenshots/capture.cjs` | 0 console errors; exactly the 20 artifacts in §3 present/updated |
| A3 | `cat-settings` frame reviewed by eye | six `<a>` links visible, 0 `data-coming-soon` buttons |
| A4 | The mobile-390 frames (**9–10**) + the S2 accordion frame (11) | 0 horizontal scrollbar / 0 clipped content at 390px (there is no S9/S10 — the named states stop at S8) |
| A5 | S6 frame pair (light vs dark) | brand swatches + 11 status rows remain legible and distinguishable in both themes |
| A6 | S7 row | `aria-required="true"` (or equivalent native `required`) present on `gen-name`/`gen-nameAr`/`gen-domain`/`gen-email`/`gen-country`; no dynamic error message rendered anywhere (fields are inert) |
