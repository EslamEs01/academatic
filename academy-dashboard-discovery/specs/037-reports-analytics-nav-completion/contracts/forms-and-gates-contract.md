# Contract — Forms & Gates (all five Spec 037 surfaces)

Reuse ONLY existing primitives and the CLOSED `data-*` hook set. No new hook, storage key, or engine,
across `reports.html` (monthly + analysis tabs), `families.html` (categories tab), and `students.html`
(results + evaluation tabs).

## Primitives (reuse as-is)
- `tabs({group,items,panels})` + `#view=` hash — three tabs-wraps: `reports` (overview/monthly/
  analysis), `families` (directory/categories), `students` (directory/results/evaluation). enhance.js's
  existing hash-open behavior + `academy.schedView.<group>` persistence (Spec 035/036 mechanism) — one
  storage-key family, not a new one per group.
- `formDrawer` / `previewTemplate` + `field()` — reused for any Create-category form; `famCatDrawer`
  unchanged.
- `filterBar({targetId,searchKey,selects})` + `facetAttrs({...})` — client-side narrowing on every new
  board.
- `cardGrid` / `dataTable` / `chip` / `summaryCards` / `avatar` — board rows/tiles/chips.
- `data-disabled-reason data-reason-key aria-disabled="true"` — every final write/generate/export gate.
- `data-demo-action data-toast` → `acknowledge()` — only for non-persistence-implying acknowledgements
  (e.g. an informational "view" hint), never to imply a save/send/generate succeeded.
- `noResults()` — empty state, the single global `[data-no-results]` contract, untouched.

## Hooks (closed set — do not extend)
`data-tab`/`data-tabs`/`data-tabpanel` (+ `#view=`), `data-drawer`→`template[data-preview]`,
`data-disabled-reason`/`data-reason-key`, `data-demo-action`/`data-toast`, `data-filter`/`data-facet`,
`data-confirm`, `data-row-menu`.

## Gate inventory (every write/generate/export final)
| Surface | Action | Gate class |
|---|---|---|
| `reports.html#view=monthly` | Generate/Refresh report | `data-disabled-reason` backendRequired |
| `reports.html#view=monthly` | Export/PDF/CSV/Download | `data-disabled-reason` backendRequired |
| `reports.html#view=monthly` | Send/Email/Share | `data-disabled-reason` backendRequired |
| `reports.html#view=analysis` | Run-analysis/Refresh-analysis | `data-disabled-reason` backendRequired |
| `reports.html#view=analysis` | Export/PDF/CSV/Download | `data-disabled-reason` backendRequired |
| `families.html#view=categories` | Create-category | `data-disabled-reason` backendRequired |
| `families.html#view=categories` | Reclassify (`famCatDrawer` assign) | `data-disabled-reason` backendRequired (unchanged from Spec 035) |
| `students.html#view=results` | Export/PDF/Print (if surfaced) | `data-disabled-reason` backendRequired |
| `students.html#view=evaluation` | Approve (if surfaced on board) | `data-disabled-reason`/`confirmAction` backendRequired, identical to the existing single-student gate; no DOM mutation |
| `students.html#view=evaluation` | Export/PDF/Print (if surfaced) | `data-disabled-reason` backendRequired |

Every gate is clickable-but-`aria-disabled`, carries a `data-reason-key`, and mutates nothing in the DOM.

## MUST-OMIT (0 rendered anywhere across the five surfaces)
- `type="file"`, `type="password"`.
- Any secret/API-key/webhook/credential input.
- `window.open`, a `blob:` URL, `.pdf` generation or link.
- Fake success wording ("تم"/"حُفظ"/"saved"/"done"/"(demo)"/"(تجريبي)") — the ONLY gate toast is
  `enhance.js`'s existing `acknowledge()` text: "available once the server is connected" /
  «يُتاح بعد ربط الخادم».
- Computed score/rank/GPA/percentage/rubric-total/prediction/forecast token.
- `<canvas>`/chart/plotting library of any kind.
- Money/salary/payout/currency figure (families zero-pay + teacher pay-free + reports finance-free
  boundaries all carry over unchanged).
- New `href="#"`, dead button, new dependency, or `package.json`/`build-html.mjs` change beyond the
  tab-wiring already covered by `page-count-contract.md`.

## Acceptance
- Grep: 0 `type="file"` / `type="password"` / `window.open` / `blob:` / `.pdf` across
  `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en`.
- Grep: 0 fake-success token; every gate's toast text matches `acknowledge()` byte-for-byte.
- Smoke: every listed gate is `aria-disabled` with a `data-reason-key`; clicking each produces 0 DOM
  mutation (row count, chip state, category count all unchanged before/after).
- No new `data-*` attribute name introduced in `enhance.js` or any page; if `enhance.js` needs a change
  it is limited to the proven `#view=` hash-open path already extended by Specs 035/036 — no new
  hook/storage-key family.
- Re-pin byte-verbatim: `payHit`, `famPay`, `tchPay`, `payFigure`, `child-view`, finance-forbidden,
  admin-menu-50, and the Spec 026–036 gate asserts.
- Cross-reference: the detailed per-action honesty tables live in
  `no-fake-report-actions-contract.md` (RA-01…RA-07) and
  `no-fake-student-family-corrections-contract.md` (SF-01…SF-07) — this contract governs the shared
  mechanism/hook/MUST-OMIT surface, not a duplicate table.
