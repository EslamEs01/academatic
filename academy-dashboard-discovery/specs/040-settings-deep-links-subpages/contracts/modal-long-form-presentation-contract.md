# Contract — Modal, Drawer & Long-Form Presentation (Spec 040)

**Ownership boundary (binding, read first):** the **global** modal/drawer/long-form interaction **system** —
a unified spec for every surface in the product, new primitives, new interaction law — belongs to **Spec 044 —
Modal, Drawer & Long-Form Interaction System** (`future-owner-register.md` FO-23). **Spec 040 does not build that
system.** Spec 040's obligation is narrower and fully achievable today: **use the four presentation primitives
that already exist, correctly, on every one of the 34 Settings forms** — and never let "044 will systematise this"
become an excuse to misuse a small modal for a long form now (the direct sibling of the Spec-056 non-excuse clause
in `complete-settings-forms-contract.md` §0). This contract is the binding per-surface presentation decision for
Spec 040; Spec 044 may later generalise its patterns, but may not find a Spec-040 surface non-compliant with a law
that already existed.

Baseline: HEAD **`58a53e2`** (Ledger R9). Every mechanic described below is cited to the **actual shipped code**
(`app/src/js/enhance.js`, `app/src/js/components/tabs.js`, `app/src/js/components/preview-drawer.js`,
`app/src/styles/app.css`) — nothing here is invented UX; it is a documentation of what the existing, 0-diff-
protected components already do, plus the binding rule for which surface gets which one.

---

## 1. The five honest presentation classes (closed set — no sixth is introduced)

| Class | Primitive | Component (0-diff) | Mechanism (real, cited) |
|---|---|---|---|
| **Inline section** | `panel()` / `settingsSection()` wrapping `.wiz-grid` `field()`s or toggle rows | `pages/settings.js`, `components/settings-section.js`, `components/form-field.js` | static baked HTML, part of the tab's own scroll |
| **Tab** | `tabs({group:'settings'})` | `components/tabs.js` | `[data-tab]` click / roving-tabindex ArrowRight·ArrowLeft·Home·End cycles `[role=tab]`; `enhance.js` `selectTab()` toggles `[data-tabpanel]` visibility, persists `localStorage['academy.schedView.settings']`, syncs `#view=<id>` (`tabs.js:1-6`) |
| **Accordion** | native `<details class="set-acc">` | **no component** — browser-native | zero JS, zero new hook (precedent `add-family.js:51`) |
| **Drawer** (right-side sheet) | `formDrawer(id,{…})` / `previewTemplate(id,{…})` → `data-drawer="<id>"` opens it | `components/preview-drawer.js`, `enhance.js` `openPanel()`/`openSheet()` | clones `<template data-preview="id">` into a `.drawer.sheet`, `role="dialog" aria-modal="true"`, full focus trap, `Escape` closes, focus returns to trigger (`enhance.js:388-419,432-436`) |
| **Confirm dialog** | `data-confirm` + `data-confirm-title/msg/cta/toast[-danger]` | **existing hook**, `enhance.js` confirm-modal builder | `.modal-scrim` + `.modal`, `role="dialog" aria-modal="true"`, `Escape` closes, CTA auto-focused, focus returns to trigger (`enhance.js:438-465`) |

**No sixth class exists and none is introduced.** In particular: **no "large modal" is used anywhere in Spec 040.**
`enhance.js` also ships a generic small `openModal()` (`data-modal-trigger`, used by `.modal` at `max-width:440px`,
`app.css:350-351`) — it is the same visual family as the confirm dialog (short, no internal scroll) and is
**correctly never invoked for a Settings form**, only for confirms and the pre-existing shallow triggers this spec
does not touch.

---

## 2. Per-surface presentation decision (binding — cross-checked against `complete-settings-forms-contract.md` §1)

| Form(s) | Class | Why |
|---|---|---|
| GEN-1 Identity (10 fields) | **Inline section** | 10 fields fit one `.wiz-grid`; a modal would bury them and force a second navigation to see the timezone warning, the highest-leverage non-credential setting in the product |
| GEN-2 Automation (17 controls, 5 groups) | **Inline section, subdivided by Accordion** (5× `<details>`: Renewal · Cancellation window · Attendance & class conduct · Class closing · Reporting) | 17 controls in one flat list is a wall; legacy's own 4-tab split proves grouping matters. `<details>` costs zero JS/hooks and is native-keyboard-correct out of the box |
| GEN-3 Locations, GEN-4 Expense heads | **Inline section** (unchanged) + `head-add` **Drawer** (unchanged, 2 fields) | Spec-031 surfaces, 0-diff — the drawer precedent this whole spec extends |
| NOTIF-1..7 (47 controls, 7 sections) | **Inline section**, row-based (never a `<table>`, never a grid) | `forms-modals-interactions-register.md` §1: *"a grid does not survive 390px or RTL; legacy itself uses rows, not a `<table>`"*. **Explicitly NOT a modal** — the matrix IS the page |
| CUST-1 Global appearance, CUST-2 Status palette | **Inline section** | short (17 distinct names); theme/language must stay visually adjacent to their **live** effect, which a modal would hide behind an extra click |
| CUST-3 Message Builder | **Gate only** (no modal, no drawer — there is nothing to open) | zero UI evidence; unchanged since Spec 031 |
| SEC-1..4 Imports | **Inline card** + **Accordion** (`<details class="set-acc">` "Required columns", mirrors the legacy info-toggle) | column contracts (8–12 rows each) need room to read before preparing a file; a modal would truncate the reference mid-read |
| SEC-5 Backup | **Inline row** (1 field) | trivially short |
| SEC-6/7 Policies | **Inline, full-width display section** | `security-import-backup-policy-contract.md` §C: *"never a small modal"* — a policy document truncated into a 440px modal is unreadable and re-invites the legacy co-submit bug by making the two policies look like one dialog |
| SEC-8 Two-factor | **Inline row** | one structure row, one gate |
| USERS-1 | **Inline** (unchanged) — real `<a href="staff.html">` + `rolesSection()` | 0-diff |
| INTEG-1..11 **catalog cards** | **Inline card grid** (`.card`, existing `integCard()` pattern) | scanning 11 providers by name/status/category needs a grid, not a stack of modals |
| INTEG-1..11 **Configure** (per-provider, 1–9 fields + sensitive rows) | **Drawer** (`formDrawer('integ-<id>', …)`) | `forms-modals-interactions-register.md` §1: *"Focused, per-provider, returns you to the catalog. Legacy uses a full page and loses the settings sub-nav entirely on the two credential pages — the rebuild keeps you oriented"* |
| **Destructive-looking finals** — Send backup · Upload (×4) · Reset-to-Default (palette) | **Direct `data-disabled-reason` gate — NO confirm dialog** | None of them can run in Spec 040, so there is nothing to confirm: a confirm before an inert gate is theatre and trains click-through against an action that will one day be real. Ledger §G: *"Confirms: none added"*. The scope/destination/permission/audit facts are **standing visible copy** beside the gate (`security-import-backup-policy-contract.md` §B.3/§H1). The **real** confirm ships with the **real** action (FO-10/FO-11/FO-19) |
| Column-contract reference (imports) | **Accordion**, not a dialog of any kind | it is reference text, read while the card stays in place |

**Zero surfaces use "large modal."** Zero surfaces are undecided. **Zero confirm dialogs are added** — the Confirm
class in §1 is documented because it exists in `enhance.js` and is *reused nowhere by Spec 040*, so a future author
knows exactly what it is and why it stayed unused.

---

## 3. THE BAN — long content may never live in a small modal (binding, zero exceptions)

**Forbidden, explicitly, by name:**

1. The **47-control notification matrix** (or any of its 7 sections) inside a modal of any size. It is the tab
   body itself (§2).
2. Any **integration provider's Configure form** (up to 9 rendered controls + up to 5 sensitive structure rows)
   inside `.modal` (`max-width:440px`, no internal scroll, `app.css:350-351`). It is a **Drawer**
   (`.drawer.sheet`, `width:min(440px,92vw)`, internally scrollable body — §5).
3. The **Security import column contracts** (8–12 rows per card) inside a modal. They are an inline **Accordion**.
4. Either **Policy editor** (family or teacher) inside a modal — see §2's co-submit-bug argument.
5. **Complete Customisation** (17 distinct names, 2 real + 15 display) inside a modal. It is the tab body.
6. **Any of the 5 General-Automation accordion groups**, individually or together, inside a modal. They are inline
   `<details>` inside the tab body.

**Why this ban exists (the legacy defects it prevents — `forms-modals-interactions-register.md` §5, restated
per-item so the ban is traceable):**

| Legacy defect | What a small-modal Settings form would reproduce |
|---|---|
| A long credential form on a **full page** that blanks the settings sub-nav (legacy payout pages) | The **opposite** failure — cramming the same content into a 440px modal — is equally dishonest: it either clips fields or forces internal scrolling inside a container never designed for it. The Drawer is the one class built for "focused, but still oriented" (§2) |
| A destructive **Send Backup** with **no confirmation** | **Not reproducible in Spec 040 — the action does not exist.** Send-backup and the 4 imports are honest gates: nothing runs, so nothing needs guarding. The *content* of the missing confirmation (scope · destination · permission · audit) is rendered as **standing copy** beside the gate, and the **real** confirm is a declared backend-era obligation shipped **with** the real action (FO-10/FO-11). A confirm staged in front of an inert gate would fake a safety mechanism we do not have |
| Four independent Saves with **no cross-tab dirty state** | Collapsing General's Identity+Automation into one modal-hosted Save would hide this boundary instead of expressing it — see `complete-settings-forms-contract.md` §2's save-scope map |
| One Submit that silently writes **two** documents (policy page) | A single modal hosting both policies invites exactly this bug visually, even if the code stays honest. Two full-width inline sections with two separate gates make the independence *visible* |
| A `Reset to Default` that wipes 11 colours with **no confirm** | **Nothing is wiped**: Reset-to-Default is a `data-disabled-reason` gate that changes not one swatch (§2). The confirm arrives with the real reset (FO-19) |
| Editors **disabled on load** with no visible Save until a pencil is found | Every Spec-040 inline section shows its gated final **immediately**, never behind a discovery step |
| A decorative chip row that **looks like a filter and is not** | No `filterBar` is rendered anywhere on the settings hub (`integrations-catalog-contract.md` §1) — nothing invites a false affordance |
| Event chips with a ✓ and **no off-state** — colour alone | Every `data-toggle` exposes `role="switch"` + `aria-checked`, icon+text (standing law) |

---

## 4. Dialog mechanics — grounded in the real, unmodified code

### 4.1 Tabs (`components/tabs.js`, `enhance.js` `selectTab()`)

- **Keyboard**: `role="tablist"` + `[role=tab]` with roving `tabindex` (active = `0`, others = `-1`); ArrowRight/
  ArrowLeft cycle (direction is native RTL/LTR-correct via the browser's own arrow semantics on a `dir`-aware
  document — no bespoke direction math is added); Home/End jump to ends (`tabs.js` header comment).
- **Narrow-viewport**: `.tabs-wrap > .tabs { overflow-x: auto; max-width: 100% }` (`app.css:641`) — the six tabs
  **scroll horizontally within the tablist**, never wrap and never force the page itself to overflow horizontally.
  This is the existing, unmodified mobile tab behaviour; Spec 040 changes only the panels' content, not this rule.
- **Deep-link**: hash → localStorage → baked-first-tab resolution order (existing, unchanged — Ledger, standing).

### 4.2 Drawer / sheet (`enhance.js` `openPanel()`/`openSheet()`, lines 388-436)

- Opened by `data-drawer="<id>"` → clones `template[data-preview="<id>"]` into a fresh `.drawer.sheet` node,
  appended after a `.scrim`.
- `panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','true')` — a real ARIA dialog, not a
  decorative panel.
- **Focus enters** the drawer on open: the first focusable element (`a,button,select,input,[tabindex]:not([tabindex="-1"])`, excluding `:disabled`) receives focus immediately.
- **Focus is trapped**: a `keydown` listener intercepts `Tab`/`Shift+Tab` and wraps from last→first / first→last
  inside the drawer's own focusable set — focus can never escape to the page behind it while open.
- **Escape closes** the drawer (`if (e.key === 'Escape') return closePanel();`).
- **Scroll is contained**: `.sheet-body { overflow-y: auto; flex: 1 }` inside a `.sheet-card` whose height is
  `100%` of the fixed-position `.drawer` (`app.css:328,506-508`) — the drawer's own body scrolls; the **page
  behind never scrolls** while a `.scrim` overlays it.
- **Focus returns** to the exact triggering control on close (`lastFocus.focus()`), never to `<body>` or a
  different control.
- **Width, mobile-safe by construction**: `.drawer.sheet { width: min(440px, 92vw) }` (`app.css:505`) — on a
  390px viewport the drawer is `min(440,359)=359px`, i.e. it **never exceeds 92% of the viewport**, so no field
  inside it is clipped by the drawer's own edge.
- **RTL/LTR slide direction**: handled entirely by the existing logical-property CSS
  (`inset-inline-end`/`transform:translateX` flipped per `html[dir]`, `app.css:328-330`) — Spec 040 adds no new
  drawer instance mechanics, only new `<template data-preview>` bodies inside the same mechanism.

### 4.3 Confirm dialog (`enhance.js` confirm-modal builder, lines 438-465)

- Built from `data-confirm-title/msg/cta/[-danger]` on the triggering element — the existing hook, no new one.
- `.modal-scrim` (`place-items:center`, `app.css:350`) + `.modal` (`role="dialog" aria-modal="true"`,
  `max-width:440px`, `app.css:350-351`).
- `Escape` closes; the CTA button is auto-focused on open; focus returns to the trigger on close.
- **By construction, a confirm dialog never hosts a form** — it has a title, a message, and a CTA. This is why
  §3's ban is structurally easy to keep: the confirm class is simply too small to misuse for a long form, and no
  Spec-040 surface asks it to.

### 4.4 Accordion (native `<details>`)

- Zero JS, zero ARIA to hand-author — `<details>`/`<summary>` are natively keyboard-operable (`Enter`/`Space` on
  the focused `<summary>` toggles `open`; native screen-reader semantics announce expanded/collapsed state).
- Styling only via the additive `.set-acc` / `.set-acc > summary` classes (`plan.md:507`) — **additive CSS is not
  a hook** and does not touch `form-field.js`/`settings-section.js`/`preview-drawer.js`.
- **a11y requirement (binding)**: every `<details>` used for a required-reading contract (General automation
  groups, Security import columns) must be reachable and operable by keyboard with **no custom key handling** —
  the native element already satisfies this; Spec 040 must not wrap it in extra JS that could break it.

---

## 5. Scroll containment + sticky action footer — the honest gap, recorded not silently fixed

`forms-modals-interactions-register.md` §3 states the requirement generally: *"the save/cancel area stays
reachable on a long form (sticky where the content overflows)."* This contract resolves it precisely for Spec 040:

- **Today's real behaviour** (§4.2): `formDrawer()`'s CTA button is rendered **inside** `bodyHTML`, i.e. it is the
  **last element inside `.sheet-body`**, which scrolls as one region with the rest of the form. On the longest
  drawer in this spec (Paymob Payout / Payoneer Payout: ~4 rendered controls + 4–5 structure rows + the webhook
  info row), the Save button is **reachable by scrolling within the contained sheet** — it is never clipped, never
  hidden behind another element, and the page behind never scrolls (§4.2). This satisfies "reachable."
- **What it does not do**: the CTA is **not visually pinned** (`position: sticky`) while the rest of the form
  scrolls past it — it is not a "sticky action footer" in the strict sense.
- **The ruling for Spec 040**: **accepted as-is.** Making the CTA a true sticky footer requires restructuring
  `formDrawer()`'s returned markup (moving the action row out of `bodyHTML` into a sibling of `.sheet-body` inside
  `.sheet-card`) — a change to `components/preview-drawer.js`, which is on the ledger's **MUST-BE-0-DIFF list**
  (Ledger §H). **A component change is out of scope for Spec 040 by the same law that keeps `form-field.js` and
  `settings-section.js` untouched.** Introducing a *bespoke* sticky-footer CSS override scoped only to Settings
  drawers, bypassing the shared component, would create exactly the kind of surface-specific interaction drift
  Spec 044 exists to prevent — so it is **not** done as a local workaround either.
- **Owner**: standardising a sticky action footer across every drawer in the product is **Spec 044** (FO-23). This
  contract records the requirement and the reason it is deferred so 044 does not have to re-derive it, and so no
  reviewer mistakes the current "reachable, not pinned" state for an oversight.
- **What this is not**: this is not a violation of §3's "reachable" requirement (which every drawer in this spec
  satisfies), and it is not a clipped-field defect (§7). It is a **named, deliberate, single-line gap** with one
  named owner.

---

## 6. AR/EN · RTL/LTR · light/dark (binding, zero exceptions)

| Requirement | How it holds in Spec 040 |
|---|---|
| Every inline section, accordion, drawer and confirm renders correctly in **AR (RTL)** and **EN (LTR)** | All layout is done with **logical properties** (`inset-inline-*`, existing `.wiz-grid`/`.drawer`/`.modal` rules) — Spec 040 authors no new physical-direction CSS (`left`/`right`) |
| **Light and dark** | Every new class (`.set-struct`, `.set-acc`, `.set-swatch`) is written from **existing design tokens** (`var(--c-*)`), never a hard-coded colour — the same law every additive class since Spec 034 (`.cc-*`), Spec 038 (`.finm-*`) and Spec 031 (`.cert-stage`) followed |
| The **one genuinely live** interaction — theme toggle (CUST-1) | Verified with both themes on the same frame (`a11y-screenshot-contract.md` S6) — the brand swatches and 11 status rows must stay legible in both, since they are display-only content sitting beside a real control |
| **Sensitive structure rows** (`.set-struct`) | Render identically in both directions and both themes — a label, a required badge, a purpose sentence; no value, so no truncation-direction bug is possible |
| Locale parity | `adm.*` AR key-set === EN key-set, 0 divergence (standing law, re-asserted per `complete-settings-forms-contract.md` C7) |

---

## 7. Mobile 390 — no clipped fields, ever

| Surface | Mobile behaviour | Evidence |
|---|---|---|
| `.wiz-grid` (Identity, Automation selects/numbers, provider safe fields) | `sm:grid-cols-2` above the small breakpoint, forced to `grid-template-columns: 1fr` at `max-width:640px` | `app.css:627,647` |
| Notification matrix | **row-based**, never a `<table>` or CSS grid — rows stack vertically by construction, no horizontal scroll possible | `notification-settings-scope.md` §"Shape" |
| Integration catalog (11 cards) | existing responsive `cardGrid()`/`.card` pattern reflows to 1 card per row under its own container query/media rule (unchanged component) | `integrations-catalog-contract.md` §1 |
| Provider Configure drawer | `width: min(440px, 92vw)` — **never** wider than 92% of any viewport, including 390px | `app.css:505` |
| Security import "Required columns" | native `<details>` collapses to a single-column scrollable disclosure; closed by default, so it costs 0 vertical space until opened | §4.4 |
| Settings tablist (6 tabs) | `overflow-x:auto` **inside the tablist only** — the tab row scrolls, the page never does | `app.css:641` |
| Confirm dialogs | `.modal { max-width:440px; padding:22px }`, centred via `.modal-scrim { display:grid; place-items:center; padding:20px }` — always fits inside a 390px viewport with margin | `app.css:350-351` |

**Zero horizontal page overflow is a hard requirement** at 390px on every one of the six tabs, verified per
`a11y-screenshot-contract.md` §2.1/§3 (frames 9–10, S2/S3 named states).

---

## 8. No nested dialogs (binding)

**Rule**: no Spec-040 interaction opens a second `role=dialog` element while a first is already open.

**The rule holds trivially: Spec 040 opens ZERO confirm dialogs** (Ledger §G — "Confirms: none added"). Audit:

| Interaction | Class in Spec 040 | Nested dialog? |
|---|---|---|
| Send backup / Upload ×4 | **direct gate** on the inline Security card (Security has 0 drawers of its own) | **No** — a gate opens a toast, not a dialog |
| Reset-to-Default (palette) | **direct gate** on the inline Customization tab | **No** |
| WhatsApp Logout / Wake / Send-test / Pair | **gates** living *inside* the `integ-whatsapp` drawer | **No** (a toast is not a `role=dialog`) |
| Every provider's Save | a single gate inside the drawer, no confirm chain | **No** |

**If a future author is tempted to add a confirm-before-save inside a drawer** (e.g. "confirm before saving
Stripe config"), that confirm **must first close the drawer** or be rejected — Spec 040 introduces **zero** such
chains, and this contract records the rule so Spec 044 inherits a clean baseline rather than a bug to fix.

---

## 9. Use current components correctly — the explicit binding statement

1. Spec 040 **adds zero new dialog/drawer/modal components**. Every one of the 34 forms in
   `complete-settings-forms-contract.md` §1 is presented with one of the five classes in §1 above — no new class,
   no new file under `components/`.
2. Spec 040 **adds zero new `data-*` hooks** for presentation (`data-tabs`/`data-tab`/`data-tabpanel`,
   `data-drawer`/`data-preview`/`data-sheet-close`, `data-confirm`, `data-disabled-reason`/`data-reason-key` are
   the complete closed set reused — `forms-modals-interactions-register.md` §4).
3. Spec 040 **adds exactly three additive CSS classes** (`.set-struct`, `.set-acc`/`.set-acc > summary`,
   `.set-swatch`) — styling only, all built from existing tokens (§6), none of them a hook.
4. **The one recorded gap** (§5, sticky footer) is deferred to Spec 044 by name, not silently patched with a
   component-breaking or surface-scoped workaround.
5. **The Spec-056 boundary applies here too**: no Settings surface may be presented with a deliberately worse
   pattern (e.g. a modal for the notification matrix) on the theory that "044 will redesign the whole system
   later." §3's ban is binding **now**, independent of whatever Spec 044 eventually ships.

---

## 10. MUST NOT (any one = STOP)

1. Any of the 6 items in §3 rendered inside `.modal` (`max-width:440px`, no internal scroll).
2. A drawer or modal opened while another drawer or modal is already open (§8).
3. A confirm dialog used to host form fields (by construction it cannot — but no future author may extend it to).
4. A dialog (drawer or confirm) that does not trap focus, does not close on `Escape`, or does not return focus to
   its trigger on close (§4.2, §4.3 — all inherited unmodified from `enhance.js`; Spec 040 must not fork them).
5. Any horizontal page-level overflow at 390px on any of the 6 tabs (§7).
6. A new `data-*` hook, component file, or CSS class beyond the three named in §9.3.
7. A bespoke sticky-footer override that bypasses `preview-drawer.js` (§5) — the gap is recorded, not patched
   locally.
8. Any physical-direction (`left:`/`right:`) CSS authored for a Spec-040 surface, in place of the existing logical
   properties.

---

## 11. Acceptance (verification owned by `a11y-screenshot-contract.md`; cross-referenced here)

| # | Check | Expectation |
|---|---|---|
| P1 | Every form in §2 | rendered with exactly the class assigned; grep the built HTML for `.modal` co-occurring with any of the 6 banned surfaces from §3 → 0 |
| P2 | Drawer open (any `integ-*`, `head-add`) | `role="dialog"`, `aria-modal="true"`, first focusable element focused, `Tab`/`Shift+Tab` wraps inside, `Escape` closes, focus returns to the trigger — `a11y-screenshot-contract.md` S4 |
| P3 | **Confirm census** | **0** new `data-confirm` on `settings(.en).html`. Send-backup / Upload ×4 / Reset-to-Default are `[data-disabled-reason]` **gates**; clicking one opens a **toast**, never a dialog — S5 |
| P4 | Accordion (General automation ×5, Security import columns ×4) | keyboard-operable via native `Enter`/`Space` on `<summary>`, no custom JS — S2 |
| P5 | Tablist | roving tabindex, ArrowRight/ArrowLeft cycle correctly reversed under `dir=rtl` vs `dir=ltr` — S1 |
| P6 | Mobile 390 | 0 horizontal scrollbar on all 6 tabs, drawer ≤92vw, tablist scrolls internally — §7, frames 9–10 |
| P7 | Light/dark | every new class legible in both; theme toggle frame pair — S6 |
| P8 | Nested-dialog audit (§8) | 0 occurrences of a second `role=dialog` opening while one is already open |
| P9 | a11y | critical=0, serious=0 on every row this contract touches (delegated to `a11y-screenshot-contract.md`) |

**Status**: Binding. Sources: Ledger §G/§H/§K; `forms-modals-interactions-register.md`;
`complete-settings-forms-contract.md`; `general-settings-completeness-contract.md`; `automation-rules-contract.md`;
`notification-matrix-contract.md`; `security-import-backup-policy-contract.md`; `integrations-catalog-contract.md`;
`a11y-screenshot-contract.md`; `future-owner-register.md` (FO-23); `app/src/js/enhance.js`,
`app/src/js/components/tabs.js`, `app/src/js/components/preview-drawer.js`, `app/src/styles/app.css` (cited
line-numbers as of HEAD `58a53e2`).
