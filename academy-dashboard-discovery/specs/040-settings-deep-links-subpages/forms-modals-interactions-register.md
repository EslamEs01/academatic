# Forms, Modals & Interactions Register (Spec 040)

Presentation law for Settings. The **global** modal/drawer overhaul belongs to **Spec 044**; Settings still documents its correct presentation now.

## 1. Presentation decision per interaction

| Interaction | Presentation | Why |
|---|---|---|
| The six Settings domains | **Inline tab** (existing `tabs({group:'settings'})`) | Already exists; each is deep-linkable via `#view=`; no navigation cost |
| General configuration (28 fields, 4 groups) | **Inline tab, grouped sections** | Far too long for a modal; benefits from scanning |
| Notification matrix (47 controls) | **Inline tab, row-based sections** | A grid does not survive 390px or RTL; legacy itself uses rows, not a `<table>` |
| Customization appearance + palette | **Inline tab** | Short; theme/language must stay adjacent to their live effect |
| Security import / backup / policy | **Inline tab** | Reference material (column contracts) needs room |
| **Provider configuration** (7–9 fields) | **Side drawer** (`data-drawer` → `template[data-preview]`) | Focused, per-provider, returns you to the catalog. Legacy uses a **full page** and loses the settings sub-nav entirely on the two credential pages — the rebuild keeps you oriented |
| **Payment-method create / edit** | **Side drawer** | Same; belongs to its provider |
| Expense-head add (existing `head-add`) | **Side drawer** | Unchanged |
| Destructive actions (Send backup · Upload · Delete method · Reset to default · Disconnect) | **Confirmation modal → gate** | Legacy has **no confirm on any of these**; the deep corpus calls bulk import "the highest risk item in this batch" |
| Column-contract reference | **Inline disclosure** inside Security | It is reference text, not a dialog |

**Forbidden**: a long integration or settings form inside an undersized modal. **Forbidden**: nested modals.

## 2. Per-form definition

Every Settings form must declare all of the following. (Values are given per form in the domain scope files.)

| Attribute | Requirement |
|---|---|
| Purpose | one sentence, rendered as section help |
| Complete field set | per `settings-complete-field-matrix.md`; every evidenced field accounted for |
| Sections / groups | titled; no ungrouped wall of fields |
| Required vs optional | marked programmatically, not by a decorative `*` (legacy's `*` is label-only — **no `required` attribute exists anywhere in the legacy payment forms**) |
| Field types | only `text · number · select · textarea` (the `field()` primitive) — this is what makes `type=password`/`type=file` structurally unreachable |
| Options | authored, complete, and honest |
| Conditional visibility | e.g. `stop_after` depends on `renew`; `classes_not_closed_hours` depends on `classes_not_closed`; `city` depends on `country` |
| Dependencies | e.g. WhatsApp/E-mail channels depend on their integration; the monthly-plan report depends on WhatsApp |
| Defaults | authored from evidence; **a mode control is never defaulted to live** |
| Validation | intent stated (shape, range, one-of); inert until the backend exists |
| Inline help | required wherever a setting has a non-obvious downstream effect (timezone, auto-makeup, credit, cancellation windows) |
| Sensitive-field treatment | **structure-only row** — label + requirement + purpose; never an input |
| Destructive / reset confirmation | confirm **before** the gate; the confirm itself mutates nothing |
| Unsaved-change behaviour | one save scope per form; a form must not silently co-submit another (legacy posts **both** policies from one button, and gives its 4 General tabs 4 independent saves with **no cross-tab dirty state**) |
| Loading / error / empty states | authored honest states; at most **one** filterable region per page (`enhance.js` has a single global `[data-no-results]`) — reserved for the provider catalog |
| Save ownership | the backend; every save is a gate |
| Audit ownership | the backend (Spec 043) |
| Propagation | per `settings-cross-surface-impact-register.md` |

## 3. Drawer / modal accessibility contract

Applies to every Settings drawer, confirm and dialog:

- Focus moves into the dialog on open and is **trapped** while it is open; focus returns to the invoking control on close.
- **Escape** closes; a visible, labelled close control exists.
- Scroll is **contained** within the dialog; the page behind does not scroll.
- The save/cancel area stays reachable on a long form (sticky where the content overflows).
- **Mobile 390** is a first-class viewport: no clipped content, **no horizontal page overflow**.
- Correct in **RTL and LTR**, **light and dark**.
- Unsaved-change warning where the form holds edits.
- **No nested modals.**
- a11y: **critical = 0, serious = 0** with the dialog open.
- Every status/state signal is **icon + text**, never colour alone.

## 4. Reuse before adding

Existing primitives that cover this spec — **no new hook, no new storage key, no new engine, no new dependency, no `package.json` change**:

`tabs()` · `formDrawer(id,{titleKey,headIcon,fields,ctaKey,reasonKey})` · `field({labelKey,name,type,options,…})` · `previewTemplate()` / `sheetRow()` · `confirmAction()` · `filterBar()` · `cardGrid()` · `statusChip()` / `chip()` · `settingsSection()` · `emptyBox/noResults/errorState` · `pageHeader()` / `summaryCards()`.

The closed `data-*` hook set is unchanged: `data-tabs`/`data-tab`/`data-tabpanel` · `data-drawer`/`data-preview`/`data-sheet-close` · `data-confirm` · `data-disabled-reason`/`data-reason-key` · `data-filter*` · `data-set-theme`/`data-set-lang` · `data-coming-soon` (retained as a component, no longer used by production nav).

## 5. Legacy interaction defects this register exists to prevent

1. A long credential form on a full page that **blanks the settings sub-nav** (legacy payout pages).
2. A destructive action (**Send Backup**) with **no confirmation** that fires a real job and then redirects to an unrelated page.
3. Four independent Save buttons with **no cross-tab dirty state**.
4. One Submit that silently writes **two** documents (the policy page).
5. A `Reset to Default` that wipes 11 colours with no confirm.
6. Editors that are **disabled on load** with no visible Save until a pencil is found.
7. A decorative chip row that **looks like a filter and is not**.
8. Event chips with a ✓ and **no off-state** — state carried by colour alone.
