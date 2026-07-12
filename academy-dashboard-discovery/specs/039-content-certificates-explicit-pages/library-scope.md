# Library / Content Scope — Spec 039

**Related dependency — NOT a primary target, NOT new build scope.** Nav id `books` (AR «مكتبة المحتوى/الكتب»)
is already `route:'library.html'` (implemented since Spec 031). `library.html` hosts BOTH the Materials tab
(subject catalog, primary target) and the Books tab (media/content library).

## Current surface (already built — Spec 031)
`library.js` → `booksPanel()`: authored `BOOKS` (6) rows in a table (Name · Type · Category · Published · Views ·
Downloads · Status + row gates), a `filterBar` (search + type + category selects over `#books-rows`), a
`lib-cats` **Categories** drawer (read-only rows + inline create form + gated Save), and a `lib-item` **Add
content** drawer (name + type select + category select; upload/thumbnail = **gates, no `type=file`**). Fixtures:
`BOOK_TYPES` = `file · video · image · audio · link` (matches legacy Files/Video/Images/Audio/Links);
`BOOK_STATUS` = `published · draft · archived`; `BOOK_CATEGORIES` (6, authored `count` literals). Views/downloads
are authored integer literals — never computed/mutated.

## Legacy evidence
`/management/library`: Book Name/Category/Published at/Views/Downloads/Status/View/Actions; "No Material Added";
"Categories" modal (add + list + Edit); "Add Material" modal with `file`+`thumbnail` (type=file) uploads; type
enum Files/Video/Images/Audio/Links.

## Decision — REUSED (no change beyond the optional `books` route refinement)
The library content surface is **complete and reused**. Spec 039 introduces **no** new library capability.
- **Optional refinement (open decision, safe-default = APPLY):** `books` currently routes to `library.html`
  (no hash), which opens the **Materials** tab (first tab) by default — so the "Books/Content" nav item lands on
  Materials, a mild IA blur now that `materials` gets its own deep-link. Repointing `books` →
  `library.html#view=books` makes the two library items each open their own tab (mirrors Spec 038's per-item
  `#view=` discipline for invoices/payments/etc.). This is a nav **route refinement** (a declared amendment like
  Specs 035/037), **0 count impact**. If rejected, `books` stays `library.html` (still valid) and the two items
  simply share a page with Materials as the default tab. **Recommendation: apply the refinement.**

## Content types (evidence-confirmed; already present)
files · video · images · audio · links (+ categories, search, type/category filters, cards/table, authored
view/download metrics only, item detail, thumbnail affordance, published date, status, safe category management).

## No-fake / role law
Add/Upload/Download/Publish/Delete/category-Save = gates/confirms; **no `type=file`**, no fake persistence, no
computed metric. Admin-manage only; teacher/family read-only library pages untouched (out of scope).

## Test contract
No new library assertions required beyond the existing `a31` block (tabIds `['materials','books']`, rows ≥6,
gates ≥3, no file/canvas/password). If the `books` route refinement is applied: add an anchor+fresh-load
assertion for `books`→`library.html#view=books` (AR/EN), and keep the existing `#view=books` tab-switch check.
