# Contract — Targeted Visual Grounding (Spec 040)

**Binding gate:** every factual claim in the Spec 040 ledger, plan and contracts traces to a file that was
**opened**, or is marked **UNKNOWN**. Screenshots were opened as images, not merely listed as paths. This contract
formalizes `targeted-visual-grounding.md` into a checkable register plus a drift table, so implementation-time
re-grounding has a fixed baseline to diff against.

---

## 1. Current application source read (exact files — must be re-opened, not assumed, at implementation time)

| File | What was established |
|---|---|
| `app/src/js/nav.config.js` (full, 158 lines) | 6 categories, all 50 items, the **six settings ids at L110–115** (all `status:'planned'`, no `route`), `FUTURE_ROUTES` = empty `{}` (L141–148), `classSalaryReport` disabled lock (L90), the build-time dead-link guard `implemented ⇒ must have route` (L151–157) |
| `app/src/js/pages/settings.js` (full) | 6-tab hub (`tabs({group:'settings'})`), 12 `.set-section`s, **2 form fields total**, 36 actions, 23 gates |
| `app/src/js/fixtures/settings.js`, `fixtures/settings-management.js` | authored fixtures, no credential value; dead `SETTINGS[0]` (`id:'profile'`) never rendered |
| `app/src/js/components/tabs.js` | `#view=` mechanism; hash → localStorage → baked-first-tab precedence; roving tabindex |
| `app/src/js/components/sidebar.js` | planned → `button.nav-item.is-planned[data-coming-soon]`; disabled → `button[aria-disabled][data-disabled-reason]`; implemented → `<a href=langRoute()>`; `langRoute()` is hash-aware |
| `app/src/js/components/preview-drawer.js`, `form-field.js`, `confirm-modal.js`, `filter-bar.js`, `card-grid.js`, `states.js`, `status-chip.js`, `settings-section.js` | `field()` supports only `text · number · select · textarea` (`type=password`/`type=file` structurally unreachable); `settingsSection` toggle path emits `<button data-toggle>` (existing hook) |
| `app/src/js/enhance.js` (full) | the CLOSED `data-*` hook set; storage keys = `academy.rail`, `academy.navCategory`, `academy.schedView.<group>`, `academy.theme`, `academy.lang`; `data-drawer` dispatches before `data-modal-trigger`; catch-all → honest «يُتاح بعد ربط الخادم» |
| `app/src/js/i18n.js` | 13 mirrored locale pairs already registered, including `ar.adm`/`en.adm` |
| `app/src/locales/ar.adm.js`, `en.adm.js` | `adm.set.*` = 121 keys each (403 total per file, 0 divergence); unused keys prove intended-but-unbuilt scope (`gen.automation*`, `sec.tfa*`, `integ.configure*`) |
| `app/src/locales/ar.extra.js`, `en.extra.js` | `set.*` = 43 keys each — a **different, unrelated** `set.*` namespace |
| `app/scripts/build-html.mjs` | **`PAGES` = 57 bases** → 57 × 2 + `index.html` = **115** (re-counted in the tree at `58a53e2`; an earlier draft said "58 bases", which does not reconcile with 115); settings entry at L101 |
| `app/src/styles/app.css` | `.set-section/.set-row/.set-label/.set-help/.perm-*`; **no other `set-*` class exists yet** — `.set-struct`/`.set-acc`/`.set-swatch` are genuinely new |
| `app/public/settings.html` (built) | `type=password` 0 · `type=file` 0 · `<canvas>` 0 · credential-like strings 0 · `href="#"` 0 · **`data-disabled-reason` 24 in the whole file = 23 in `#page-body` + 1 in the shared sidebar (`classSalaryReport`)** · `data-coming-soon` 6 · **`field()` controls in `#page-body` = 2**, both inside the `head-add` `<template>` (the 3rd `input` in the file is the topbar search box, **outside** `#page-body`) |
| `app/tests/smoke/run.cjs` (full) | every protected assertion; `settingsPlanned === 6` (L1446, L2340); the planned-item click probe (L223–230); the `nav.config` source audit (L2347–2363); the `a31` settings honesty block (L1193–1197); **`anchorOk039` is defined at L1442** (not L1444 — the Ledger's figure is an off-by-two typo; L1443/1444/1445 are the three Spec-039 anchor asserts); `FORM_DRAWERS_032.settings` at L92; `a31.gates >= 4` at L1196 |
| `app/tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`, `screenshots/REVIEW.md`, `app/package.json` | a11y route list (6 settings rows already present but content-thin), 347 capture frames, review structure, npm scripts |
| Specs 031/032/033/034–039 contracts | standing law, the 033 roadmap row naming 040, the 038/039 supersession precedent, the 039 non-destructive impact method |

---

## 2. Legacy screenshots opened visually — 64 of 64 (0 skipped, 0 inferred-from-filename)

| Group | Count | Opened by |
|---|---|---|
| `management-settings-general-*` (full + 4 tab interactions) | 5 | full → this session; interactions → grounding agent |
| `management-settings-notification-*` (full + interaction) | 2 | full → this session; interaction → agent |
| `management-settings-integrations-*` (catalog + 11 configure variants, full + interactions) | 24 | agent (all 24 opened) |
| `management-settings-customisation-*` (personalisation full + interaction, message-builder) | 3 | full → this session; rest → agent |
| `management-settings-security-*` (data, backup-send, policy; full + interactions) | 8 | data/policy full → this session; rest → agent |
| `management-settings-payments-*` (7 create variants × 2, edit × 2) | 16 | agent (all 16 opened) |
| `management-settings-integrations-whatsapp-*-insights-*` | 4 | agent |
| **Total** | **64** | — |

Also opened: `settings__ar__light__desktop__sp031-settings.png` and `…sp031-integrations.png` (to see what Spec 031
actually shipped, as distinct from what the legacy corpus shows).

**Decisive negative finding from the interaction-frame audit:** every `*-001-page-interaction-001.png` in the
payments and integrations sets captured only the **top-right avatar menu** being opened — the crawler never
opened a provider dropdown. **No provider option-list is recoverable from images.** Every option list in this
spec (§F.5's mode controls, §F.1's automation selects) is sourced from raw HTML instead, and is recorded as such —
never guessed from a screenshot that does not show it.

---

## 3. Legacy records read (not merely listed)

- `output/roles/admin/pages/<slug>.{md,json}` — structured page records for all 7 settings routes + 11
  integration variants + 8 payment forms.
- `output/roles/admin/html/raw/<slug>.html` — **the only source where real form `action`s, input `name`s,
  `value`s, `checked`, `disabled` and `accept` survive** (the sanitized HTML rewrites every action to `#`). **All
  authoritative field names in every Spec 040 contract come from here**, not from the sanitized copy.
- `output/roles/admin/text/<slug>.txt`, `output/roles/admin/network/endpoints.json`, `output/roles/admin/role-map.
  {md,json}`.
- `output/combined/`: page-inventory, route-graph, role-permission-matrix, shared-unique-pages, component-
  inventory, interaction-inventory, modal-inventory, form-inventory, table-inventory, button-coverage, missing-
  coverage, skipped-actions, llm-context, speckit-discovery.
- `frontend-planning/`: 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 12, 13.
- `frontend-planning-deep/`: 00, 01, 02, 03-screenshot-review, 03-visual-patterns, 04–15, 17–20,
  `_parts/ALL-page-interpretations.md`, and the settings-bearing `_parts/c-batch-{08,09,11,14,15,18}.md`
  (verified byte-identical to the corresponding ALL- sections).
- Contact sheets `full__admin__Settings.png`, `full__admin__Messages-Notifications.png`,
  `contact-sheets/_index.json` — orientation only, **never sole evidence** for any field/count.

---

## 4. What was SEEN, per domain (summary — full detail in the per-domain contracts)

| Domain | Key visual/record finding | Feeds |
|---|---|---|
| General | 4 tabs, no breadcrumbs; identity form + Location card; **Tab 2 is a complete teacher-pay engine**; **Tab 3 hides a second pay field** (`rate_student_absent`); **Tab 4 is ~90% inert** (disabled 2FA, hidden OTP, hidden Save) | `general-settings-completeness-contract.md`, `pay-free-settings-exclusion-contract.md`, `automation-rules-contract.md` |
| Notifications | not a grid — a stack of sections; master toggle → per-recipient channel select → event chips; **9 class events per recipient, asymmetric**; chips show ✓ with **no visible off-state** | `notification-matrix-contract.md` |
| Integrations | 2-column card grid, 3 category headings, **11 providers**; a dead decorative chip row (not a filter); **no connection-status vocabulary anywhere**; on the 2 payout configure pages **the sub-nav goes completely blank** — orientation lost precisely on the credential pages | `integrations-catalog-contract.md` |
| Payment methods | 7 full-page create forms, **no modal/drawer anywhere in the legacy module**; **PayPal defaults Live, Payoneer defaults Sandbox** — same control, contradictory defaults; every credential a plain `type=text`; Paymob ships a **prefilled, real-looking** Integration ID triple | `integrations-catalog-contract.md` §1 (folded as Configure drawers) |
| Security | Backup = 1 field + Save + **Send Backup with no confirm**; Import = 4 cards, the 4th **mis-titled "Upload families" but is actually invoices**; Policy = 2 Quill editors, **no visible Save until a pencil is pressed**, both post together | `security-settings-scope.md` |
| Customisation | Global Appearance (2 hex + theme + layout + sidebar + card-style + **"Apply for me" = localStorage-only**), 11 status colours badged "applies globally", **11 statuses collapse to 6 distinct hexes** | `customisation-settings-scope.md` |
| Message Builder | bare **HTTP 504 Gateway Timeout**, all-zero `domSummary` | `integrations-catalog-contract.md` §6 (owner: Spec 053) |
| WhatsApp insights (×2) | read-only tables; **leaks a live `chat.whatsapp.com/<invite-token>` URL in full**, plus unmasked phone numbers | `role-permission-privacy-carryover-contract.md` §6.2 |

---

## 5. Recorded UNKNOWNs (never guessed into a value)

| # | Unknown | Why | Disposition |
|---|---|---|---|
| U-1 | Message-builder fields, variables, preview | only capture is a 504 | never invented; honest gate; owner Spec 053 |
| U-2 | The provider chooser that seeds `?payment_method=N` | upstream screen never captured; no in-form selector exists | rebuild derives the chooser from the provider catalogue itself |
| U-3 | WhatsApp QR/pairing UI | never rendered in any capture | pairing stays a gate; no wizard invented |
| U-4 | Email "Add Account" tab | recorded as the single missing-coverage gap in the deep corpus | SMTP account management stays a gate |
| U-5 | The 4th import card's true type | mis-titled "Upload families"; raw HTML `type=4` + `invoices_file` proves it is **invoices** | resolved from raw HTML, not from the visible label |
| U-6 | Whether the 2 unlabelled policy-page selects mean language or version | no labels anywhere | not reproduced; policy stays display-only + gated edit |
| U-7 | RTL behaviour of the legacy payment/integration forms | everything was captured in EN/LTR | our RTL is authored, not ported |

Every per-domain contract that touches one of these UNKNOWNs must cite it by id (`U-1`…`U-7`) rather than
re-deriving a disposition — a second, differently-worded disposition for the same unknown is itself a drift.

---

## 6. Drift table (re-run at implementation time — any row that fails must be reconciled BEFORE proceeding)

| # | Expected (as of grounding) | Re-confirm at implementation | If drifted |
|---|---|---|---|
| D1 | `nav.config.js:110-115` — six settings ids, all `status:'planned'`, no `route` | re-read the exact lines | update Ledger §B before editing |
| D2 | `FUTURE_ROUTES` = `{}` (`nav.config.js:141-148`) | re-read | if non-empty, STOP — a prior spec must have regressed it |
| D3 | `settings.js` tab id list = `['general','notifications','customization','security','users','integrations']` (`smoke:1194`) | re-read `pages/settings.js` `tabs({group:'settings', ...})` call | if the tab-id set changed, every `#view=` route in this feature is wrong |
| D4 | `settings.js` renders **2** form fields total (both in the `head-add` drawer) and **23** `data-disabled-reason` gates **inside `#page-body`** (24 counting the sidebar's `classSalaryReport` lock) | re-count in the live file | if the count differs, the "before" side of every field-accounting table in this feature must be corrected first. **Note:** because the body already carries 23 gates, the sanctioned `a31.gates >= 20` floor is *below* today's value and is not load-bearing — the exact `fields`/`toggles`/`struct` censuses are |
| D5 | `i18n.js` already registers `ar.adm`/`en.adm` | grep `i18n.js` for the module pair | if absent, `i18n.js` is NOT 0-diff and the whole fixtures-locales plan must be revised |
| D6 | `smoke:1446`/`:2340` read `settingsPlanned === 6` | re-read both lines verbatim | if the literal is not `6`, Supersession 1's "current" block is stale — re-derive it, do not blind-apply |
| D7 | `smoke:223-230` — the planned-item click probe currently points `admin → settings` | re-read verbatim | if it points elsewhere, Supersession 2 targets the wrong block |
| D8 | `smoke:92` `FORM_DRAWERS_032.settings` = `['head-add']` only | re-read | if more entries already exist, the 12-entry target list must be reconciled, not overwritten |
| D9 | `smoke:1196` `a31.gates >= 4` | re-read | if the floor already differs, choose the new floor as `max(20, current)` |
| D10 | Admin menu = 50, settings category = 7 items / 1 implemented / 6 planned | re-run the build + count | if drifted, STOP — the Ledger's whole count table (§A) is invalidated |
| D11 | `app.css` has no `set-struct`/`set-acc`/`set-swatch` class yet | grep `app.css` | if one already exists, do not redefine it — extend or reuse |
| D12 | `gallery.js` renders no nav-item specimen (87 lines; sections = buttons/kpi/tiles/chips/medallions/fields/avatars/badges/report/menu/toast/states) | re-read `pages/gallery.js` | if a nav-item specimen now exists, Decision 2's Option-C reasoning must be revisited before retiring the probe |

**Rule:** if any row drifts, the evidence artifact it depends on (Ledger, the per-domain contract, this contract)
must be **updated first**, the drift **recorded**, and only then may implementation proceed. Proceeding against
stale evidence is forbidden — this is the same rule Spec 039's grounding contract established, carried forward.

---

## 7. Acceptance

1. Every row in §1's file table and §2's screenshot table was re-opened (not assumed) in the implementation
   session — a transcript or tool-call record exists for each.
2. §6's drift table was run in full immediately before the first source edit; any drifted row was reconciled and
   the reconciliation is recorded in `implementation-status.md`.
3. No claim anywhere in the Spec 040 artifact set (ledger, plan, contracts) lacks a citation to a file in §1/§2/§3
   or an explicit UNKNOWN id from §5.
