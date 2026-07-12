# Contract — Customization (Spec 040)

**Nav id** `settingsCustomization` · **Status** `planned` → `implemented` · **Route** `settings.html#view=customization`
(EN `settings.en.html#view=customization`, resolved by the hash-aware `langRoute()`) · **Tab id** `customization`
(EXISTING, byte-pinned at `smoke:1194`) · **Page-count impact 0** (115 held, admin menu 50 held).

**Spelling trap (binding, ledger §B.1.1):** nav id `settingsCustomiz**ation**` → tab id `customization` (US
spelling, no `s`). The legacy route is `/management/settings/customi**s**ation/...` (UK spelling). Never write
`#view=customisation` — it matches no tab and the deep-link falls back to the baked first tab (`general`).

Owner file: `app/src/js/pages/settings.js` → `customizationPanel()`. Data: `app/src/js/fixtures/settings-management.js`
(`BRAND_ROWS` extended 4 → 13, `APPEARANCE_OPTS`). Copy: `app/src/locales/ar.adm.js` + `en.adm.js` (`adm.set.cust.*`,
mirrored, 0 divergence). `form-field.js`, `settings-section.js`, `preview-drawer.js` stay 0-diff — this contract adds
**0 new components and 0 new `field()` types**.

---

## 1. Field accounting (binding) — 17 distinct legacy names

Legacy `/management/settings/customisation` — one PATCH endpoint for appearance + a separate 11-row status-color
grid + the (504, evidence-free) message-builder link.

| Legacy name | Our control | `name` → id `f-<name>` | Type | Rendering |
|---|---|---|---|---|
| `theme` (light/dark/system) | Theme | — | **REAL**, existing | existing `data-set-theme` control, unchanged |
| `color_scheme` (`#5E4D7E`) | Primary brand color | `cust-colorPrimary` | text (hex) | swatch chip + hex `field()` |
| `secondary_color_scheme` (`#7B6BA8`) | Secondary brand color | `cust-colorSecondary` | text (hex) | swatch chip + hex `field()` |
| `container_layout` (full / boxed) | Container layout | `cust-layout` | select | inline `field()` |
| `sidebar_type` (full / mini-sidebar) | Sidebar type | `cust-sidebar` | select | inline `field()` |
| `card_style` (border / shadow) | Surface style | **`cust-surface`** | select | inline `field()` — **naming law, §4** |
| `class_statuses_colors[11]` (11 rows) | 11 status colors | `cust-status-<slug>` ×11 | text (hex) ×11 | swatch chip + hex `field()` per row |

`1 (real theme) + 2 (brand hex) + 3 (appearance selects) + 11 (status hex) = 17`. **Zero silently dropped, zero
invented.** `field()` total = **16** (2 + 3 + 11); the 17th control (`theme`) is real, not a `field()`.

**Language** (`lang`, AR/EN) is a second **REAL** control on this tab. It is **not** one of the 17 — it has no
legacy `customisation` counterpart (legacy is Arabic-only admin copy; our bilingual build is ours, not ported) — but
it is governed by the same personal-vs-academy split as `theme` (§2) and is documented here for completeness.

> **Resolved conflict (ledger R10):** `customisation-settings-scope.md` says "7 distinct hexes". The raw-HTML
> enumeration of `class_statuses_colors[11]` yields **6**: `pending #FFC107` · `waiting #17A2B8` ·
> `teacher-absent #DC3545` · `student-absent #DC3545` · `teacher-cancel #6C757D` · `student-cancel #6C757D` ·
> `admin-cancel #6C757D` · `attend #28A745` · `reschedule #007BFF` · `running #007BFF` · `makeup #17A2B8`
> (`DC3545`, `6C757D`, `007BFF`, `17A2B8` each repeat). **This contract PICKS 6.** No author may author a 7th hex to
> match the stale doc.

---

## 2. REAL personal preference vs GATED academy-wide branding — the load-bearing distinction

Two controls on this tab are **genuinely functional**; the other fifteen are **inert, labelled previews**. The UI
**must** make the split visible — a user must never mistake one for the other.

| | Scope | Persistence | Hook (existing, 0-diff) | Label shown to the user |
|---|---|---|---|---|
| **Theme** (light/dark/system) | **personal, per-browser** | REAL — `localStorage['academy.theme']` | `data-set-theme` | «تفضيلك الشخصي — يُطبَّق على هذا المتصفح فقط، ولا يغيّر مظهر الأكاديمية للآخرين» / "Your personal preference — applies to this browser only; it does not change the academy's appearance for anyone else" |
| **Language** (AR/EN) | **personal, per-browser** | REAL — `localStorage['academy.lang']` | `data-set-lang` | same framing, reused |
| **Primary / secondary brand color, layout, sidebar type, surface style, 11 status colors** (16 `field()`s) | **academy-wide branding** | **NONE** — labelled local preview only | none (`field()` is inert; no `data-*` hook attaches) | «معاينة فقط — لا يُخزَّن أي تغيير قبل ربط الخادم.» / "Preview only — nothing is stored until the server is connected", printed once above the section, plus **ONE** gated Save per section. ⚠ **Copy law:** the note must **not** contain «الحفظ» / `saved` — the fake-success census greps «تم الحفظ» + `\bsaved\b` over body **and** template text, and both «لن يُحفظ … يتم …» phrasings and "will not be saved" trip it. Use «لا يُخزَّن» / "nothing is stored" |

**Never show a preview as saved.** The 16 inert `field()`s carry no `data-toast`, no confirmation, no visual
"saved" state of their own — only the section-level gated Save button (`data-disabled-reason`) reacts to a click, and
its reaction is the standard **backendRequired** toast («يُتاح بعد ربط الخادم» / "available once the server is
connected"), never «تم الحفظ» / "saved". This is the Customization instance of the sitewide FAKE-success guard; see
`no-fake-settings-contract.md` §2 for the full cross-tab ledger.

**Why theme/lang are exempt from the "no client engine" law.** They are not new: `data-set-theme`/`data-set-lang`
and the `academy.theme`/`academy.lang` keys are **pre-existing** (Spec 004 era), reused unchanged. Nothing new is
built; Spec 040 only places them, correctly labelled, next to the sixteen inert controls they are easily confused
with.

---

## 3. The 13 color swatches — presentation + contrast

Two brand colors (§1) + 11 status colors (§1) = **13 swatch rows**, each: a decorative color chip (`.set-swatch`,
additive CSS, styled `background:#<hex>`) + the hex value printed as **plain body text** (not text-on-swatch) +
an editable hex `field(type:'text')` seeded with the authored current value.

| Status | Hex | Status | Hex |
|---|---|---|---|
| `pending` | `#FFC107` | `attend` | `#28A745` |
| `waiting` | `#17A2B8` | `reschedule` | `#007BFF` |
| `teacher-absent` | `#DC3545` | `running` | `#007BFF` |
| `student-absent` | `#DC3545` | `makeup` | `#17A2B8` |
| `teacher-cancel` | `#6C757D` | | |
| `student-cancel` | `#6C757D` | | |
| `admin-cancel` | `#6C757D` | | |

**Contrast-validation requirement (implementation constraint, not a runtime feature — derived from ledger R7's
a11y critical=0/serious=0 requirement on the new `#view=customization` load, not a literal ledger line item):**
axe-core's `color-contrast` rule flags any element that renders text **over** an arbitrary background color. Because
these 13 hexes are **authored data**, not app chrome, they must never sit under the hex label's own text — the label
text renders in the app's **normal foreground-on-background token pair** (unchanged theme tokens), and the
`.set-swatch` chip is a **separate, decorative** element (`aria-hidden="true"`, its accessible name carried by the
adjacent label text, not by content inside the chip). This is the tab's *entire* contrast obligation:

- **No** contrast computation, no WCAG-ratio library, no new dependency — the "requirement" is a layout rule
  (swatch-beside-text, never swatch-under-text), enforced by CSS structure alone.
- **No** live-updating swatch preview as the hex `field()` is edited — `field()` is inert (§1; General's law, ledger
  §F.1 note 1), so the swatch shows only the **baked authored value**, never a value derived from unsaved input.
- A future real color picker with live contrast feedback is out of scope; **UNKNOWN / not evidenced in legacy**
  (legacy's own "Pick from logo" swatch tool used `<canvas>`+`getImageData`, which is forbidden — §5).

---

## 4. Naming law (ledger R1 — the highest-risk trap on this tab)

`smoke:1174` (`a31.credInputs`) asserts **0** inputs whose `name` **or** `id` matches
`/pass|secret|api|key|token|webhook|card|cvv/i`, on **every** page. The legacy control is literally named
**`card_style`** — porting that name verbatim would trip the guard on the one settings page that most needs to pass
it.

> **`card_style` → our field name/id is `cust-surface` (`f-cust-surface`). Never `cust-card*`, never
> `*card_style*`, never any name containing the substring `card`.**

All other names in §1 (`cust-colorPrimary`, `cust-colorSecondary`, `cust-layout`, `cust-sidebar`,
`cust-status-<slug>`) are clean against the same regex.

---

## 5. What is deliberately NOT rebuilt

| Legacy control | Evidence | Why excluded | Disposition |
|---|---|---|---|
| "Pick from logo" ×2 (brand + secondary swatch pickers) | uses `<canvas>` + `getImageData`; the source logo it samples 404s in the capture | **`<canvas>` is forbidden sitewide**; the tool is provably non-functional in legacy anyway | **Ø** — not rendered |
| "Apply for me" | writes `localStorage` keys `theme`, `boxedLayout`, `sidebarType`, `cardBorder` | would require **4 NEW localStorage keys** — closed-hook law | **Ø** — not rendered, no gate either (there is nothing honest to gate; the action's *only* function was the forbidden local write) |
| "Reset" (paired with "Apply for me") | same 4-key local write, in reverse | same reason | **Ø** |
| "Reset to Default" (the 11-color grid) | a **client-only DOM rewrite** back to hardcoded defaults — would need a dedicated JS engine/hook | distinct from "Apply for me": this one *is* a legitimate academy-wide action, just currently client-only | **REPLACED by a DIRECT GATED Reset** (§6 — gate only, no confirm) — the capability is preserved honestly, not deleted |
| Message Builder | `/management/settings/customisation/message-builder` → **HTTP 504**, `isErrorPage:true`, `domSummary` all-zero (0 links/buttons/forms/inputs/images), corroborated twice | **zero UI evidence exists; no UI may be invented** | existing gate **unchanged** (§7) |

---

## 6. Reset — a DIRECT gate (no confirm — Spec 040 adds zero confirms)

"Reset to Default" (§5) is preserved as an **honest single-step gate**:

1. Click **"إعادة الألوان للوضع الافتراضي" / "Reset status colors to defaults"** → it is a
   `<button data-disabled-reason>` and fires the standard **backendRequired** toast («يُتاح بعد ربط الخادم» /
   "available once the server is connected").
2. **Nothing changes**: no swatch repaints, no hex value updates, no toast reads "reset" / "done" / "saved".

Scope of the (future, real) action: the **11 status colors only** — matching the legacy control's own scope; it was
never advertised as resetting the 2 brand colors or the 3 appearance selects.

**Why NOT `data-confirm` → gate** (an earlier draft proposed it, and Ledger §G overrules it): a confirm dialog in
front of an inert gate stages a destructive-action ritual for an action that **structurally cannot occur** — nothing
can be reset, so there is nothing to guard, and the dialog would train click-through against an action that will one
day be real. **Spec 040 adds ZERO `data-confirm` chains anywhere in the hub** (`no-fake-settings-contract.md` §3).
The real confirm ships with the real reset (backend / Spec 055, FO-19).

---

## 7. Message Builder — explicit refusal to rebuild

**No UI is built for Message Builder in Spec 040 or any spec short of a live channel integration.** Restated in
full because this is a standing STOP condition (`scope-guard.md` §5.11):

- **Evidence:** sibling of Personalisation under Settings › Customization; **HTTP 504 Gateway Timeout**,
  `isErrorPage:true`; `domSummary` shows 0 links, 0 buttons, 0 forms, 0 inputs, 0 images — corroborated twice (the
  page's own capture JSON **and** the Personalisation page's network log). There is **no captured field, no captured
  label, no captured layout** to ground any rendering.
- **Disposition:** the **existing** gate ships unchanged — `adm.set.cust.msgBuilder` (label) +
  `adm.set.cust.msgBuilderReason` (reason string), shipped by Spec 031, `#view=customization` panel. Spec 040 makes
  **0 edits** to this gate: no new fields, no drawer, no copy describing a UI nobody has evidence for.
- **Owner (ledger §E):** capability = **Spec 053** (Integrations Command Center) — a message *builder* composes
  outbound channel messages and is inert without a connected channel, which only 053 owns. **Spec 048** is the
  *placement custodian* — it re-verifies the Customization tab still carries an honest gate, it does not build the
  composer. **Spec 057** (freeze) may not originate a capability either.
- **STOP CONDITION:** any Spec-040 commit that adds a field, drawer, template list, variable-picker, or preview pane
  under a Message-Builder heading is a ledger violation — halt, do not commit.

---

## 8. RTL / LTR

Standing law: Arabic RTL first (`settings.html`) + English LTR (`settings.en.html`) — both builds render this tab.

| Control class | Direction rule |
|---|---|
| Appearance selects (`cust-layout`, `cust-sidebar`, `cust-surface`) | natural page direction — RTL in AR, LTR in EN; no override |
| Hex `field()`s (2 brand + 11 status = 13) | **always `dir="ltr"`**, regardless of page direction — hex codes (`#5E4D7E`, `#FFC107`, …) are LTR content by convention in both builds. This is an implementation decision of this contract, not a literal ledger line item; it prevents a hex string from visually reversing inside an RTL form row |
| Swatch chips | direction-agnostic (a colored box carries no text direction) |
| Theme / language controls | unchanged, existing behavior in both directions |

---

## 9. Mobile

Per ledger R7 (a11y target: critical=0, serious=0 on the new `#view=customization` load, incl. a **mobile-390**
row): the 13-swatch grid **reuses the existing responsive `.card`/grid breakpoints** — **0 new CSS breakpoint, 0 new
media query pattern**. At narrow widths the grid degrades to a single-column stacked list (swatch + hex field per
row), matching the existing card-grid reflow used elsewhere (Integrations' provider grid, General's Locations
cards). The Save and Reset buttons remain reachable without introducing horizontal scroll.

---

## 10. MUST NOT (any one fires ⇒ STOP)

1. No `<canvas>`, no `getImageData`, no client-side image sampling (the "Pick from logo" tools, §5).
2. No new `localStorage` key (the "Apply for me"/"Reset" pair's 4-key write, §5, is never reproduced in any form).
3. No live-updating swatch preview driven by the hex `field()`'s current input value — the swatch shows the **baked**
   value only (§3).
4. No `name`/`id` containing `card` (or `pass|secret|api|key|token|webhook|cvv`) anywhere on this tab — `card_style`
   → `cust-surface` (§4).
5. No toast/label reading «تم الحفظ» / "saved" / "Connected" / "Done" — every final on this tab is backendRequired
   wording (§2, §6).
6. No Message-Builder field, drawer, template picker, or variable list of any kind (§7).
7. No currency token, no pay figure (standing law; N/A content-wise on this tab, asserted anyway — `a31.currency===0`
   holds sitewide).
8. No new `field()` type, no new component diff in `form-field.js` / `settings-section.js` / `preview-drawer.js`.

---

## 11. Acceptance

| # | Check | Expectation |
|---|---|---|
| C1 | `settings.html` / `settings.en.html` `#view=customization` on a **fresh context** | exactly ONE visible `[role=tabpanel]` = `customization`; 0 external requests |
| C2 | Sidebar `.nav-item[data-nav="settingsCustomization"]` | `<a href="settings.html#view=customization">` (AR) / `settings.en.html#view=customization` (EN); no `data-coming-soon`, no `aria-disabled`, no `#i-lock` |
| C3 | `nav.config` source audit | `settingsCustomization` → `status:'implemented'`, `route:'settings.html#view=customization'` |
| C4 | Field census on the panel | 16 `field()` controls with the exact `cust-*` names in §1; `cust-surface` present, `cust-card*`/`*card_style*` absent |
| C5 | Distinct hex census | exactly **6** distinct hex values across the **11 status** swatches (§1 conflict resolution). Across all **13** swatches there are **8** distinct values (the 6 status hexes + the 2 brand hexes `#5E4D7E`, `#7B6BA8`) — the "6" is a statement about the status grid **only** |
| C6 | `a31.credInputs` | **0** on `settings(.en).html` |
| C7 | Theme/lang controls | still functional (`data-set-theme`/`data-set-lang` fire; `academy.theme`/`academy.lang` update); explicitly labelled "personal preference / this browser only" |
| C8 | Every other Customization control | 0 persistence — reload restores the baked authored value, never the last-typed value |
| C9 | Reset flow | click → the **backendRequired toast** fires directly from a `[data-disabled-reason]` button; **0** `data-confirm` on this tab; 0 DOM mutation before/after (no swatch repaint, no hex change) |
| C10 | Message Builder gate | byte-identical to the Spec-031 shipped version; 0 new fields/drawer |
| C11 | `<canvas>` / `download=` / `window.open` on `settings(.en).html` | 0 / 0 / 0 |
| C12 | Hex `field()` direction | `dir="ltr"` on all 13, in **both** AR and EN builds |
| C13 | a11y | `#view=customization` × AR/EN × light/dark + mobile-390 rows → critical=0, serious=0; swatch/label pairs pass `color-contrast` |
| C14 | Locale parity | `adm.set.cust.*` AR key-set === EN key-set (0 divergence) |
