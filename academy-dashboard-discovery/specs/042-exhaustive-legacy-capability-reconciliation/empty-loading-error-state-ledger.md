# Spec 042 — Empty / Loading / Error State Coverage Ledger

**Lens:** EMPTY · LOADING · ERROR · NO-RESULTS state coverage across every list, table, board, form and drawer.
**Method:** primitives read from source; coverage counted on the **built output** (`app/public/*.html`), not on source
intent; legacy states counted from raw crawl records. Where source and a planning summary disagreed, the built HTML won.
**Read-only on `app/**`.** Baseline HEAD `de8d552` · 115 public HTML · 402 screenshots.

---

## 1. The state primitives that exist

| Primitive | Source | Shape | Who may use it |
|---|---|---|---|
| `emptyBox({icon,tone,titleKey,msgKey,ctaKey})` | `app/src/js/components/states.js:7` | card + medallion + title + message + optional CTA | admin |
| `noResults()` | `app/src/js/components/states.js:19-21` | `<div class="hidden" data-no-results>` wrapping `emptyBox` | admin (filter only) |
| `loadingSkeleton()` | `app/src/js/components/states.js:23-36` | `role="status"` card + shimmer lines | admin |
| `errorState()` | `app/src/js/components/states.js:38-47` | card + coral medallion + `data-action="retry"` button | admin |
| `emptyState()` | `app/src/js/components/states.js:49-60` | card + CTA link → `sessions.html` | admin |
| `.pt-empty` | inline in 7 portal pages (e.g. `pages/teacher-schedule.js:64`) | icon + **title only** — no message, no CTA | portals |
| `.empty-row` | `pages/teacher-performance.js:98` | bare text row | one board |
| `.pt-note` | `pages/student-history.js:55` | inline note line | one board |

**Finding S-0 — there are FOUR parallel empty-state systems** (`emptyBox`, `.pt-empty`, `.empty-row`, `.pt-note`) with
different anatomy: the admin one carries a message + CTA, the portal one carries a title only. No page can be reviewed
against a single contract. → **PARTIAL · owner 044** (interaction system) with **045–050** for the copy pass.

---

## 2. Coverage census (counted on the BUILT output)

| State class | Surfaces that ship it | Reality |
|---|---|---|
| **NO-RESULTS** (filter) | 13 admin pages ship `[data-no-results]` | the **only** state class with real coverage |
| **EMPTY** (page/list) | **0 admin pages**; 5 portal pages ship 24 `.pt-empty` nodes | the admin product has **no reachable page-level empty state** |
| **LOADING** | **0 real** (1 decorative — see D-1) | no surface has a loading state |
| **ERROR** | **0 real** (1 decorative — see D-1); **no `404.html` / `500.html`** in `public/` | no surface has an error state |
| **FORM VALIDATION** | **0** — `components/form-field.js` contains no `error`, `invalid`, `aria-invalid` or `required` affordance (grep: 0 hits) | no form can report a bad value |
| **TOAST severity** | 1 variant — `components/toast.js:20` defaults `ico='check-circle'` and **all 10 `toast()` call sites in `enhance.js` use the default** | every message, including "requires the server", wears a success checkmark |

**Screenshot evidence:** of **402** frames in `app/screenshots/`, exactly **one** captures any of these states
(`schedule-search__ar__light__desktop__sp035-schedule-search-empty.png`). **Zero** frames capture a loading, error or
no-results state.

**Test evidence:** exactly **one** behavioural assertion exists sitewide —
`app/tests/smoke/run.cjs:1721-1729` (schedule-search reveals its empty state on a no-match combo). The other 12
`[data-no-results]` panels are **never exercised**; `loadingSkeleton`, `errorState`, `emptyState` and the announcements
`emptyBox` are asserted by nothing and screenshotted by nothing.

---

## 3. Legacy baseline — the states we are measured against

| Legacy state | Evidence | Count |
|---|---|---|
| Empty list — **"No data found"** | `output/roles/admin/text/*.txt` (grep) | **68 pages** |
| Empty list — "No Data found" / "No Material Added" | `.../management-library.txt` and 2 others | 3 |
| Empty media — "No recording available" | `output/roles/*/text/*.txt` | 6 |
| **Loading — `class="preloader"` full-page gate** | `output/roles/admin/html/raw/*.html` | **299 pages** |
| **Loading — `spinner-border`** | same | **296** |
| Loading — in-button `loader-sm` spinner | same | 55 |
| **Error — "Cannot download invoice"** | `.../management-downlaod*.txt` | 8 |
| **Error — "Something went wrong, try again later"** | `.../management-new-requests-scheduled-trials-*.txt` | 7 |
| **Error — "Server Error" (HTTP 500)** | 7 records, `"httpStatus": 500` | 7 |
| **Error — branded 404 "Opps!!!"** | `output/roles/{family,teacher}/.../main-index.*` | 5 |
| **Validation — `required` attribute** | `output/roles/admin/html/raw/*.html` | **676** |
| **Validation — `is-invalid` / `invalid-feedback`** | same | 23 / 19 |

**The decisive fact:** the legacy tenant was **largely empty at crawl time** — "No data found" is its single most common
screen (68 pages). **The empty state IS the day-one screen of a real academy.** Our fixtures are never empty, so we have
never designed, rendered, screenshotted or tested the screen a new customer sees first.

---

## 4. Defects (confirmed from source + built output)

### D-1 · A design-system gallery band ships on the PRODUCTION admin home — with a FAKE error and a FAKE empty
`app/src/js/pages/dashboard.js:116-120` renders, under the heading `section.states` («حالات الواجهة» — the *same*
heading the gallery uses, `locales/ar.js:110`):
- `loadingSkeleton()` → `role="status" aria-label="جارٍ التحميل…"` (`states.js:29`)
- `errorState()` → **«تعذّر تحميل البيانات»** ("Failed to load data") + a Retry button
- `emptyState()` → **«لا توجد جلسات بعد»** ("No sessions yet") + "Add session"

All three are present in the built `app/public/dashboard.html` (verified by string grep). Consequences:

1. **A permanent error card claiming data failed to load, on a page where nothing failed.** This is a *fabricated
   error state* — the mirror image of a fake success, and it fails the no-fake law just as squarely.
2. **A permanent empty card saying "no sessions yet" while the same page renders 5 sessions** (`data-row` × 5 in
   `dashboard.html`). `state.empty` is hard-coded to session copy (`locales/ar.js:99`) — `emptyState()` is not a generic
   primitive, it is *the dashboard sessions empty state*, rendered in a showcase strip instead of being wired to the
   sessions list.
3. **A perpetual `role="status"` live region announcing "Loading…"** to screen readers on a fully-loaded page. `axe`
   does not flag a valid `role=status`, which is why `critical=0 / serious=0` never caught it.
4. **The Retry button is unhandled.** `data-action="retry"` appears nowhere in `enhance.js` (grep: 0 hits); it falls to
   `default: toast(acknowledge(trg))` (`enhance.js:663`). Honest, but a "Retry" that retries nothing.
5. **Its shimmer animation escapes the reduced-motion quarantine** — see D-2.

Meanwhile **the real sessions table on the same page has no empty, loading or error state at all.** The legacy day board
*does* have one (`management-home`, the "No data found" band).
**Disposition: REJECTED_NO_FAKE** (the fabricated error/empty) · **owner 045–050** (admin home review) — remove the band
from `dashboard.js`; it already lives in `gallery.html`, the sanctioned orphan.

### D-2 · The loading skeleton's infinite shimmer escapes the reduced-motion guard — and the audit built to catch it
`app/src/styles/app.css:198-202` declares `.skeleton::after { animation: shimmer 1.4s linear infinite; }` at the **top
level**. The `@media (prefers-reduced-motion: no-preference)` quarantine begins at `app.css:1142`. The Spec-022 law
requires *all* auto-playing motion inside it.
The smoke audit that enforces this (`app/tests/smoke/run.cjs:2887`) matches only
`animation:...\blv-(fill|fadeup|pulse)\b` — **it greps for three animation names and `shimmer` is not one of them.**
So an infinite shimmer runs on the production admin home for users who explicitly requested reduced motion.
**Disposition: PARTIAL (a11y defect)** · **owner 045–050** (with the D-1 removal this disappears) · the **audit regex
itself must be widened to any `animation:` declaration** → **057** (final freeze).

### D-3 · `reports.html` mis-binds its no-results panel — a filter reveals the WRONG empty state
`enhance.js:540` resolves the panel with a **document-global** `document.querySelector('[data-no-results]')` — always the
**first** match — while `rowsOf(form)` (`enhance.js:501-504`) correctly scopes the *list* per-form via `data-target`.

`app/public/reports.html` ships **two** filter forms and **two** no-results panels, **all four inside the single visible
`overview` tab panel** (byte offsets, verified):

| offset | node |
|---|---|
| 38494 | `data-tabpanel="overview"` (**not** hidden — the default tab) |
| 46095 | `data-filter-form data-target="#reports-grid"` (form A) |
| 55991 | `data-no-results` ← **form A's panel; the only one `querySelector` can ever return** |
| 65222 | `data-filter-form data-target="#reports-feedback-grid"` (form B) |
| 83614 | `data-no-results` ← **form B's panel — dead markup, never shown under any input** |
| 144858 | `data-tabpanel="monthly"` **hidden** |

**Reproduction (zero navigation):** open `reports.html` → type a non-matching string into the **feedback board's** search
→ the feedback grid hides (correct, `target` is scoped) → a **«لا توجد نتائج مطابقة»** panel appears **~10 KB earlier in
the page, inside the reports catalogue, directly above a fully-populated reports grid** → and the feedback board itself
shows *nothing at all, with no explanation*.

This is the constraint Spec 037 was silently working around when it refused to give its new tabs a filterBar ("honoring
enhance.js's single global `[data-no-results]`"). The workaround suppressed *new* coverage; it never fixed the page that
already had two. **Fix is one expression** — resolve `nr` relative to the form's `data-target` container rather than the
document.
**Disposition: PARTIAL (correctness defect) · owner 044** (interaction system) — recommend an immediate corrective.

### D-4 · Three pages filter into a SILENT VOID — a filterBar with no empty state
`library.js:116`, `messages.js:132` and `staff.js:109` call `filterBar()` but **never call `noResults()`**. Verified on
the built output — each has a working `data-filter-form` + `data-target` and **zero** `[data-no-results]`:

| page | filter target | `[data-no-results]` |
|---|---|---|
| `library.html` | `#books-rows` | **0** |
| `messages.html` | `#msg-list` | **0** |
| `staff.html` | `#staff-grid` | **0** |

At `enhance.js:541-542`, `nr` is `null` (no panel to reveal) and `target.classList.toggle('hidden', shown === 0)` **hides
the list anyway**. Filtering to zero matches makes the content vanish into a blank region with **no message, no reset
hint, no explanation**. That is 3 bases × 2 languages = **6 built pages**. `staff.html` even ships an Apply/Reset control
(C12), so the void is trivially reachable.
**Disposition: MISSING · owner 044** (pattern) + **045–050** (the three page reviews).

### D-5 · The only page-level `emptyBox()` in the product is DEAD CODE
`announcements.js:53-55` is the sole real `emptyBox()` call site — but it sits in the **false branch** of
`ANNOUNCEMENTS.length ? cardGrid(...) : emptyBox(...)`. The fixture is non-empty, so the branch never renders:
`app/public/announcements.html` contains **0** `emptyBox`/`pt-empty` nodes. The same is true of the portal empties in
`family-materials.js:41`, `student-homework.js:45`, `student-materials.js:33` and `student-history.js:55` — all four
build to **0** `.pt-empty` nodes.

**The generalisation, and the core structural finding of this lens:** *every* empty state in the product is guarded by
`fixture.length ? list : empty`, and **the fixtures are authored never to be empty**. The empty branches are therefore
unreachable, unrendered, unscreenshotted and untested — while the legacy proves (68 pages) that empty is the **normal**
state of a fresh academy. We have shipped an application that cannot show a new customer their first screen.
**Disposition: MISSING · owner 045–050** (author the empty screens) + **057** (a build/test gate that forces every
`X.length ? … : …` empty branch to be rendered at least once).

**Empty branches that DO render** (the honest minority, 24 nodes / 5 pages): `teacher-schedule.html` (6),
`family-schedule.html` (6), `student-schedule.html` (6) — the rest-day empties; `family-child.html` (4) — no-class-today;
`family-requests.html` (2) — the follow-up-meetings empty. These are the only shipped empty states in the product and
they are good (`prt.stu.weekFriNote`: «يوم راحة — استمتع بعطلتك 🌤»; `prt.fam.req.meetingsEmpty`: «لا توجد لقاءات مجدولة
— كل شيء على ما يرام 🌿»). **INTENTIONALLY_IMPROVED — preserve.**

**Copy defect inside it:** `teacher-schedule.js:64` renders a **teacher's** rest day using the **student** key
`prt.stu.weekFriNote` (`ar.prt.js:233`). Cross-role key reuse. → **045–050**.

### D-6 · No form in the product can report a bad value
`components/form-field.js` contains **no** `error`, `invalid`, `aria-invalid`, `aria-describedby` or `required`
affordance (grep: 0 hits). The legacy carries **676 `required` attributes**, 311 "Required" labels, and a real
client-side validation display (`is-invalid` ×23, `invalid-feedback` ×19). Legacy `summary` and `homework` textareas are
`required` (C06/C13).
Fields are inert by design and nothing submits, so **no law is broken today** — but when Spec 056 fills the ~40 field-less
forms, there is **no error-state vocabulary for it to use**, and every form it builds will be unable to say "this field is
required".
**Disposition: MISSING · owner 044** (define the invalid/required/error-summary pattern) — **blocking prerequisite for
056**, which must not author 40 forms against a missing primitive.

### D-7 · Every toast wears a success checkmark
`components/toast.js:20` defaults `ico='check-circle'`, and **all 10 `toast()` call sites in `enhance.js` use the
default** (grep: 0 pass `ico:`). So the honest backendRequired message («يُتاح بعد ربط الخادم») and the D-1 Retry
fall-through both render with a **success** icon. There is no warning/error toast variant.
**Disposition: PARTIAL · owner 044** (toast severity variants).

### D-8 · No error page exists
`app/public/` contains **no `404.html` and no `500.html`** (verified). The legacy ships a branded 404 ("Opps!!!" + Go Back
to Home, 5 captures) and served 7 real 500s + 1 504. A bad URL on our static host yields the host's default page.
Already recorded as C14-18 / C15-17.
**Disposition: MISSING · owner 057** (Final Production Freeze) — design may come from **045–050**.

---

## 5. Per-surface ledger

Legend: ✅ ships · ⚠️ ships but defective · ❌ absent · — n/a · **DEAD** = code exists, unreachable in the build.

### Admin — list / board surfaces

| Surface | Empty | Loading | Error | No-results | Legacy state evidence | Disposition | Owner |
|---|---|---|---|---|---|---|---|
| `dashboard.html` today's sessions | ❌ (⚠️ a *decorative* fake empty sits elsewhere on the page — D-1) | ❌ (⚠️ D-1) | ❌ (⚠️ D-1) | ❌ (no filter — removed by Spec 026 DU-20) | `management-home` "No data found" | **REJECTED_NO_FAKE** (D-1) | 045–050 |
| `sessions.html` | ❌ | ❌ | ❌ | ✅ | `management-home` | PARTIAL | 044 · 045–050 |
| `attendance.html` | ❌ | ❌ | ❌ | ✅ | — | PARTIAL | 045–050 |
| `schedule.html` | ❌ | ❌ | ❌ | ✅ | — | PARTIAL | 045–050 |
| `schedule-search.html` | ✅ **(the one good one — the sole tested + screenshotted state in the product)** | ❌ | ❌ | ✅ | legacy renders **no results region at all** | **INTENTIONALLY_IMPROVED** | — preserve |
| `students.html` | ❌ | ❌ | ❌ | ✅ | `management-student/status/softdelete` empty | PARTIAL | 045–050 |
| `teachers.html` | ❌ | ❌ | ❌ | ✅ | — | PARTIAL | 045–050 |
| `families.html` | ❌ | ❌ | ❌ | ✅ | `management-families-feedback-students-status-*` "No data found" | PARTIAL | 045–050 |
| `courses.html` | ❌ | ❌ | ❌ | ✅ | `management-courses-status-0-*` "No data found" (×5) | PARTIAL | 045–050 |
| `groups.html` | ❌ | ❌ | ❌ | ✅ | **legacy group list rendered EMPTY** | PARTIAL | 045–050 |
| `finance.html` (6 tabs) | ❌ | ❌ | ❌ **(legacy proves a download-failure banner is a real state)** | ✅ (1 form) | `management-banks`, `management-invoices`, `management-downlaod` "Cannot download invoice" ×8 | PARTIAL | 045–050 · billing backend |
| `reports.html` | ❌ | ❌ | ❌ | ⚠️ **MIS-BOUND (D-3)** | — | **PARTIAL (defect)** | **044** |
| `leads.html` | ❌ | ❌ | ❌ | ✅ | `new-requests/scheduled-trials` → **"Something went wrong, try again later"** (the legacy's own error state) | PARTIAL | 045–050 |
| `teacher-performance.html` | ✅ `.empty-row` (`queueNone`) | ❌ | ❌ | ✅ | — | PARTIAL | 045–050 |
| `staff.html` | ❌ | ❌ | ❌ | ❌ **SILENT VOID (D-4)** | `management-admins` | **MISSING** | **044** · 045–050 |
| `library.html` | ❌ | ❌ | ❌ | ❌ **SILENT VOID (D-4)** | **"No Material Added"** (`management-library`) | **MISSING** | **044** · 045–050 |
| `messages.html` | ❌ | ❌ | ❌ | ❌ **SILENT VOID (D-4)** | `management-chat` | **MISSING** | **044** · 045–050 |
| `certificates.html` (templates + requests) | ❌ | ❌ | ❌ | ❌ (no filter) | **"No data found"** on `management-pdf` AND `management-certificate-requests` | **MISSING** (= C10-30) | 045–050 |
| `announcements.html` | **DEAD** (D-5) | ❌ | ❌ | ❌ | — | MISSING | 045–050 |
| `tasks.html` | ❌ | ❌ | ❌ | ❌ | legacy tickets board captured **completely empty** | MISSING | 045–050 |
| `scheduled-actions.html` | ❌ | ❌ | ❌ | ❌ (no filter) | `management-scheduled-actions` | MISSING | 056 (filters) · 045–050 |
| `public-holiday.html` | ❌ | ❌ | ❌ | ❌ | — | MISSING | 045–050 |
| `sessions-analysis.html` | ❌ | ❌ | ❌ | ❌ | — | MISSING | 045–050 |
| `settings.html` → payment methods | ✅ honest empty state (0 authored instances) | ❌ | ❌ | — | legacy instance table | **INTENTIONALLY_IMPROVED** | 053 |
| `time-converter.html` | ❌ | — (client-side, instant) | ❌ (no invalid-zone state) | — | — | PARTIAL | 045–050 |
| `gallery.html` | ✅ showcase | ❌ (imports `loadingSkeleton` but **never calls it** — `gallery.js:10` vs `:53`) | ✅ showcase | ❌ | none | INTENTIONALLY_IMPROVED | design-system maintainer |

### Portals — the honest minority

| Surface | Empty | Loading | Error | Notes | Disposition | Owner |
|---|---|---|---|---|---|---|
| `teacher-schedule.html` | ✅ ×6 rest-day | ❌ | ❌ | **uses the STUDENT key** `prt.stu.weekFriNote` (D-5) | INTENTIONALLY_IMPROVED (copy bug) | 045–050 |
| `family-schedule.html` | ✅ ×6 | ❌ | ❌ | — | INTENTIONALLY_IMPROVED | — |
| `student-schedule.html` | ✅ ×6 | ❌ | ❌ | — | INTENTIONALLY_IMPROVED | — |
| `family-child.html` | ✅ ×4 (`prt.child.noToday`) | ❌ | ❌ | — | INTENTIONALLY_IMPROVED | — |
| `family-requests.html` | ✅ ×2 (`meetingsEmpty`) | ❌ | ❌ | consumer with no producer (C04-29) | INTENTIONALLY_IMPROVED | 055 |
| `family-materials.html` | **DEAD** | ❌ | ❌ | empty branch unreachable (D-5) | MISSING | 045–050 |
| `student-materials.html` | **DEAD** | ❌ | ❌ | — | MISSING | 045–050 |
| `student-homework.html` | **DEAD** | ❌ | ❌ | — | MISSING | 045–050 |
| `student-history.html` | **DEAD** (`.pt-note`) | ❌ | ❌ | — | MISSING | 045–050 |
| `teacher-portal` / `family-portal` / `student-portal` homes | ❌ | ❌ | ❌ | no state of any kind on any role home | MISSING | 045–050 |
| all 7 other portal internals | ❌ | ❌ | ❌ | — | MISSING | 045–050 |

### Forms & drawers (all 24+ form drawers, sitewide)

| State | Status | Evidence | Owner |
|---|---|---|---|
| Required-field marker | ❌ **none** | `form-field.js` (0 hits) vs legacy 676 `required` | **044** → 056 |
| Field-level validation error | ❌ **none** | `form-field.js` vs legacy `is-invalid`/`invalid-feedback` | **044** → 056 |
| Form-level error summary | ❌ none | — | 044 |
| Submitting / pending state | ❌ none | legacy: 55 in-button `loader-sm` spinners | 044 → backend |
| Drawer content loading | ❌ none | legacy `.preloader` ×299 | 044 → backend |
| Success state | — n/a by law (no persistence) | — | — |

---

## 6. UNKNOWN_EVIDENCE

| # | Question | Why unprovable | Owner |
|---|---|---|---|
| U-1 | What the legacy's **populated** list screens look like — row actions, pagination, density | 68 legacy pages were captured **empty**; the tables never had rows | 045–050 — do not infer row behaviour from an empty table |
| U-2 | Whether the legacy `.preloader` was a genuine async gate or a fixed-duration splash | only the markup was captured; no timing evidence | 044 — design our own, do not port |
| U-3 | The legacy's **empty-state copy** beyond the bare strings ("No data found") — was there an illustration, a CTA? | text captures only; no populated-vs-empty screenshot pair | 045–050 — author ours |
| U-4 | Whether the legacy 500/504 pages were intentional error pages or raw framework dumps | 7×500 + 1×504 captured as `isErrorPage: true`, content is a bare "Server Error" | 057 |
| U-5 | The legacy download-failure UX ("Cannot download invoice" ×8) — banner, toast, or page? | string only, no interaction capture | 045–050 · billing backend |

---

## 7. Owner summary

| Owner | Items |
|---|---|
| **044** Modal/Drawer/Long-Form Interaction System | **D-3** (mis-bound no-results — one-expression fix) · **D-4** (silent-void pattern) · **D-6** (required/invalid/error-summary primitives — **blocking prerequisite for 056**) · **D-7** (toast severity) · S-0 (unify the 4 empty systems) · loading/pending states for drawers |
| **045–050** Bounded page review + academic redesign | **D-1** (remove the fake-states band from the admin home) · **D-2** (resolves with D-1) · **D-5** (author the *reachable* empty screens — the day-one screen for 20+ admin surfaces and 11 portal pages) · empty-state copy pass · the `prt.stu.weekFriNote` cross-role key · library/certificates/tasks/announcements empties (C10-30) |
| **055** Cross-Role Propagation | `family-requests` meetings empty = a consumer with no producer (C04-29) |
| **056** Complete Forms & Data Capture Audit | must **not** author its ~40 forms until 044 ships the validation vocabulary (D-6); filters for scheduled-actions / sessions-analysis |
| **057** Final Production Freeze | **D-8** (`404.html` / `500.html`) · widen the reduced-motion smoke regex beyond `lv-*` (D-2) · a gate forcing every `X.length ? … : …` empty branch to render once (D-5) |
| **053** Integrations | settings payment-methods empty state (already good — preserve) |
| — preserve | `schedule-search` empty state · the 24 portal `.pt-empty` nodes · settings payment-methods empty |

---

## 8. Standing-law check

- **No fake states introduced by this ledger.** D-1 *removes* a fabricated error/empty from a production page —
  a fake error is as much a no-fake violation as a fake success.
- **No pay/PII/credential surface touched.** The empty/loading/error copy carries no figures, no names, no secrets.
- **Hiding a link is not authorization** — the silent void (D-4) hides *content*, which is a UX defect, not an
  authorization mechanism; no permission decision is implied.
- **Never invent** — the 5 UNKNOWN_EVIDENCE rows above are recorded rather than designed; in particular the legacy's
  populated-list behaviour (U-1) may not be inferred from 68 empty tables.
