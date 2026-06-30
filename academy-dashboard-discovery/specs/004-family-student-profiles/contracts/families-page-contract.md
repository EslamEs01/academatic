# Contract: Families Directory Page

**Status**: Binding · `public/families.html` (+ `.en`). The families directory as **family-as-hero cards** grouping each family's children (NOT the legacy table) — header + summary tiles + filter bar + a `cardGrid` of family cards + states. Promotes the `families` nav item (NI12). Active nav: `families`.

## 1. Purpose & reuse

- Give the admin one calm directory that leads with the **family↔student relationship**: each card is a guardian/parent account grouping its **children visually**, with counts, a labeled lifecycle status, a fixture attention hint, and a "view profile" path to `family.html`. It MUST read as the same product as Spec 001/002/003 (warm canvas, violet `--g-violet`, `--r-card`, Tajawal) and MUST improve on the legacy families list (a wide table with a buried "No. Children" column + a status-route wall).
- It MUST compose existing components — `pageHeader` + `summaryCards`, `filterBar` (IP2), `cardGrid` + `directoryCard` + `statMini`, `chip`, `states`, `ui` (avatar/medallion/button) — plus the **NEW** `family-card.js` (research R21) and the **NEW** `family-status.js` lifecycle map (R25). NO new runtime engine; behavior is `enhance.js` over baked markup via `data-*` hooks only.

## 2. Label & navigation (NI12 promotion)

- This page **promotes** the `families` nav item `planned → implemented` with route `families.html` (reserved in `FUTURE_ROUTES`, NI9): set `status:'implemented'`, add the `route`, drop the «قريبًا/Soon» affordance, register the SSG `PAGES` entry `{ base:'families', activeId:'families', titleKey, crumbKey, render }`. The `families` nav item MUST carry the active violet pill + `aria-current="page"`; the `families` category panel opens on load (`categoryOf('families')`).
- `familyCategories`, `groups`, `scheduleSearch`, `studentResult`, `studentEvaluation` MUST **stay `planned`** (Soon buttons, no route). The build-time guard (NI6) MUST pass; **no dead links**.
- The page title, breadcrumb leaf, and header heading MUST use the single label `العائلات` (Arabic) / `Families` (English) — one wording only.

## 3. Layout (RTL, top → bottom)

1. **Page header** — title `العائلات`/`Families` + breadcrumb (`الرئيسية · العائلات`) + subtitle + an **"+ add family"** CTA (§9) that is a real `<a href>` to the wizard.
2. **Summary tiles** (§4) — `summaryCards` row (total / active / needs-attention) — display-only fixture counts.
3. **Filter bar** (§5) — search + status facet + family-category facet + apply/reset + active-filter chips + result count.
4. **Card grid** (§6) — a responsive `cardGrid` of **family cards** over the `FAMILIES` fixture (≥8), each baked at build time.
5. **States region** (§8) — empty / no-results / loading / error.

Single calm column; the shell (rail + topbar) is unchanged. Reflows per §7.

## 4. Summary tiles

- A `summaryCards` row of at most **three** calm tiles: **total families**, **active families**, and **needs attention** (derived from the `attention` flags). Each tile is icon + label + a tabular count — **display-only**, NOT a stat wall and NOT finance.
- The **needs-attention** tile MAY act as a shortcut that applies the attention filter over the pre-rendered cards (§5) — never a dead control; it MUST NOT navigate elsewhere.

## 5. Filter bar (client-side over pre-rendered cards)

- Reuses `filterBar` / IP2: a **search** input + a **status** select (the family lifecycle set, §6) + a **family-category** select (the segmentation facet, FR-013/D6) + **apply** + **reset**, surfacing **active-filter chips** and a **result count**.
- On apply, `enhance.js` MUST show/hide the **pre-rendered** family cards by their `data-status` / `data-category` / `data-search` facets, update the count, and surface the **no-results** state with a reset when nothing matches (§8). Filters MUST give visible feedback always — **never dead** (a weak/dead filter is a screenshot failure condition).
- The family-category facet ALSO renders as **category chips** (the segmentation idea) near the filter bar; selecting a chip applies the same `data-category` filter. The `familyCategories` **nav item stays `planned`** — categories are a facet here, not a new page.
- Degrades gracefully: with JS off, all cards render and the controls are inert (all visible).

## 6. Family card anatomy (`family-card.js`, the hero — exact)

Each card is one `cardGrid` cell carrying `data-row` + its filter facets, composed top → bottom:

- **Card container** — `data-row` + `data-status="<lifecycle>"` + `data-category="<categoryId>"` + `data-search="<guardian+children tokens>"` + (when flagged) `data-attention`. Ids/classes are build-baked, never JS-generated.
- **Guardian header** — a `ui` avatar/medallion in the guardian's `accent` + the guardian `nameKey` (the account holder) + the **family lifecycle status chip** (§ status map; icon + label, **never color-only**) + a kebab `data-row-menu="<id>"` (§9).
- **Children group (the relationship hero)** — the family's `studentIds` resolved to a **grouped row of child avatars/chips** (each child's `accent` + accessible name), showing up to a fixed N, with overflow collapsed to a **"+N" chip**. A family with **no children** shows a calm "no children yet" hint (not a blank row); 1..N children group gracefully. This grouping — not a buried count column — is what makes the family↔student link unmistakable (SC-001).
- **Counts** — a `statMini` pair: **student count** (= `studentIds.length`) and **active courses count** (`activeCoursesCount`), each icon + label + tabular numerals.
- **Segment + attention** — the **category chip** (segment) and, when `attention` is present, a calm **attention hint** rendered icon + label (`data-attention`) — never color-only.
- **Footer** — the primary **"view profile"** affordance: a real `<a href>` to `family.html` (language-aware `family.en.html`), the only navigation off the card. No other dead controls.

Long Arabic/English guardian, child, and category names MUST truncate/wrap gracefully in AR-RTL and EN-LTR.

## 7. Responsive

Desktop/tablet show a multi-column `cardGrid`; below the card breakpoint the grid MUST reflow to a **single column** with no horizontal overflow. The children group, counts, chips, and the kebab menu stay reachable and legible; the "+N" overflow chip absorbs crowding rather than wrapping into a spreadsheet.

## 8. States

Using the Spec 001 `states` patterns, the page MUST distinguish: **empty** "no families yet" (a warm empty state + the "+ add family" CTA) from the filter **no-results** "no match" (+ a reset action); plus a **loading** skeleton (card placeholders) and a friendly **error + retry**. The legacy bare "No data found" is explicitly improved.

## 9. Actions & no-dead-button (IP8/IP9)

- **"+ add family"** (page header) — a real `<a href>` to `add-family.html` (language-aware). **"view profile"** (per card) — a real `<a href>` to `family.html`. These are the only navigations.
- **Kebab `data-row-menu`** (per card) — a popover of honest items: view profile (navigates), **edit** = `data-demo-action` → demo toast, **suspend/stop** = destructive `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`) → demo toast on confirm, and any real-CRUD/export item = `data-disabled-reason` / `data-reason-key` (disabled with a visible reason). No item writes state; **no persistence**.
- Every control satisfies IP8: navigate in-scope / open overlay / apply-or-reset filter / demo-with-toast / confirm→demo / disabled-with-reason. No raw i18n keys; status & attention never color-only.

## 10. Family lifecycle status map (`family-status.js`, R25)

The family/student **lifecycle** status resolves through a single NEW map (distinct from the Spec 001 session map), rendered via the generic `chip` as **icon + label, never numeric/color-only** (fixing the legacy `/status/0..6`):

| `statusId` | tone (token) | meaning |
|---|---|---|
| `active` | success/teal | active family |
| `trial` | sky | trial period |
| `suspended` | amber | temporarily paused |
| `stopped` | coral | ended/stopped |
| `inactive` | slate/muted | dormant |

Each entry is `{ tone, icon, labelKey }`; AA contrast; the label always accompanies the tone+icon. This map is the single source of truth reused by the family cards, the student rows, and the profile banners.

## 11. `data-*` hooks (exact, reuse only — no invention)

`data-filter-form`, `data-filter="status|category|search"`, `data-target`, `data-filter-apply|reset|count`, `data-no-results`; per card `data-row` + `data-status|data-category|data-search` (+ `data-attention` when flagged); `data-row-menu="<id>"` (kebab popover); `data-demo-action`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`), `data-disabled-reason`/`data-reason-key`, `data-toast`. The "view profile" / "add family" affordances are real `<a href>` (not hooks). **No `data-drawer` on this page** (the families directory uses a profile link, not a peek). **No JS-generated ids/classes.**

## 12. Static-HTML-first & Django mapping

- `families.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + header + summary tiles + filter bar + **every** family card (children grouped, counts, chips, kebab) as real baked markup; **no whole-page `<div id="app">`**, no JS-built page DOM. Relative `./assets/` paths; per-language pages (`families.html` ar/rtl default + `families.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no chart/table/form library.
- Django: `public/families.html` → `templates/admin/families.html`; the grid → `{% for family in families %}` with the children group as `{% for child in family.students %}` (+ the `+N` overflow), the status map → a template tag/filter, facets → the same `data-*` attributes server-side; states → `{% if %}`. No surface forks the card partial.

## 13. Enforcement & cross-references

- **Smoke** (R31, `tests/smoke/run.cjs`): `families` is in `PAGES`; family cards **group children** (a children group + counts present); the promoted `families` nav item is a real `<a>` with a route while `familyCategories`/`groups`/`scheduleSearch`/`studentResult`/`studentEvaluation` stay Soon; no dead nav; no `id="app"`; relative assets. The `no-external-request` check proves no table/chart/form lib loads. axe critical = 0.
- **Screenshots** (screenshot-acceptance): Families AR-RTL light desktop, AR-RTL dark desktop, EN-LTR light desktop, and **mobile** Families AR-RTL light — verdicts appended to `app/screenshots/REVIEW.md`.
- Binds to `family-profile-contract.md` (the "view profile" target), `family-form-contract.md` (the "add family" target), the Spec 002 `../../002-admin-core-operations/contracts/navigation-ia-contract.md` (NI12 promotion), `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP2/IP4/IP8/IP9), and `../../002-admin-core-operations/contracts/directory-pages-contract.md` (directory anatomy). The Spec 003 `static-html-django-ready-contract.md` (SD1/SD5–SD8) remains in force.
