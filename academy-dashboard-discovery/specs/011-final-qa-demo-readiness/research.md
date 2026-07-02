# Research: Admin Console Final QA Hotfix & Demo Readiness (Spec 011)

**Input**: spec.md · `dashboard.js` · `ui.js` (`sectionHeader`) · `sidebar.js` · `i18n.js` (`num`) · `nav.config.js` · built `public/*.html` · Spec 010 `tests/smoke/run.cjs` (badge + link-crawl asserts) · Spec 009/010 impact + scope-guard contracts. Every decision verified against the actual files this session.

---

## D1 — Dashboard Overview `href="#"` fix

**Decision**: At the dashboard call site `src/js/pages/dashboard.js:94`, add `linkHref: 'reports.html'` to the Overview `sectionHeader(...)` call, made language-aware exactly like every other dashboard onward link (EN build → `reports.en.html`). Result: `<a href="reports.html" class="link-more">عرض كل المؤشرات / View all metrics ↗</a>`.

**Rationale**: The Overview section is the KPI row; "View all metrics" / «عرض كل المؤشرات» naturally leads to the implemented **Academic Reports & Operations Shell** (`reports.html`), which is the app's real metrics/operations hub (Spec 008). This is:
- **Zero visual change** — the link already renders with that exact text/style; only its `href` changes from `#` to a real page. This is the smallest possible fix and cannot cause a visual regression (unlike removing the link).
- **Honest** — `reports.html` exists and is implemented; not a fake route, not a planned/locked item.
- **Minimal & consistent** — one added key at the call site, mirroring the sibling Reports section header (`dashboard.js:111`, already `linkHref: 'reports.html'`). The shared `sectionHeader()` component and its `linkHref='#'` default are **not** changed (keeps the blast radius to the one sanctioned dashboard touch-point; other callers unaffected).

Language-awareness: `dashboard.js` already computes `.en.html` variants for its links (e.g. `schedHref()`, `peopleSignal()` hrefs). The Overview href follows the same `getLang() === 'en' ? 'reports.en.html' : 'reports.html'` idiom.

**Alternatives considered**: (a) Make the Overview header non-navigational (drop `linkKey`) — rejected: removes the visible affordance (a visual change) for no honesty gain, since a real honest target exists. (b) In-page anchor to a dashboard section id — rejected: dashboard sections carry no ids; adding one is more change than needed and "jump to KPI row" is a weaker affordance than "go to the metrics hub". (c) Change `sectionHeader()`'s default from `'#'` to something — rejected: shared-component behavior change with unknown blast radius; the spec scopes this to the dashboard Overview touch-point.

## D2 — Sessions badge digit localization

**Decision**: In `src/js/components/sidebar.js`, import `num` from `../i18n.js` and render the badge as `${num(it.badge)}` instead of the raw `${it.badge}` (line 37). No change to `nav.config.js` (the value stays `badge: SESSIONS.total`).

**Rationale**: `num()` (`i18n.js`) is the project's existing locale digit formatter (`Intl.NumberFormat('ar-EG')` → Arabic-Indic ٢٤ · `'en-US'` → Western 24), reading the `current` locale set by `applyLang(lang)` during the static build — so the badge localizes per built page with **no runtime rendering, no new library, no hard-coded per-language strings**, and stays tied to the single fixture source `SESSIONS.total`. This is the spec's preferred "reuse the existing number-formatting helper" path. It also makes the page internally consistent: `dashboard.html` already shows `٢٤` for the Overview "today's sessions" KPI (also via `num()`), while the sidebar badge currently shows Western `24` — the fix aligns them.

**Alternatives considered**: (a) Format in `nav.config.js` — rejected: `nav.config.js` is a data/config module; formatting belongs at the render site, and doing it in config would bake a language into the shared config (wrong layer). (b) A new helper — rejected: `num()` already does exactly this. (c) Two hard-coded strings — explicitly forbidden by the spec (breaks the single-source truthfulness).

**Scope note**: the badge is in the shared sidebar (outside `#page-body`), so this ripples all 40 pages' sidebars — expected, and NOT a dashboard/reports/finance body change.

## D3 — Required test updates (Spec 010 assertions the fixes intentionally change)

Two Spec 010 smoke assertions encode the pre-fix state and MUST be updated to the post-fix truth (this is in-scope verification maintenance, not new behavior):

1. **Badge assertion** (`tests/smoke/run.cjs:831`, currently `ok(nav010.sessBadge === SESSIONS_TOTAL, …)`): make it **locale-aware** — compute the expected form with the same locale formatter (`new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ar-EG').format(Number(SESSIONS_TOTAL))`) and assert `sessBadge === expected`. This proves both: correct localization AND the tie to the fixture count (AR pages must show the Arabic-Indic form of `SESSIONS.total`, EN the Western form).
2. **Link-crawl deadHash** (`tests/smoke/run.cjs:853`, currently `ok(links010.deadHash === (page === 'dashboard' ? 1 : 0), …)`): tighten to `ok(links010.deadHash === 0, …)` for **all** pages — the dashboard follow-up is closed, so zero `href="#"` sitewide is the new invariant. Update the accompanying comment.

Both changes are in `tests/smoke/run.cjs` (a sanctioned test file). No new test file is added; the demo-readiness sweep otherwise reuses the existing Spec 010 link crawl + truthfulness sweep unchanged.

## D4 — Prior-artifact reconciliation (Spec 010 audit + G7 note)

- **Spec 010 `contracts/scope-guard.md` G7 #4** (`grep … | grep -vE 'dashboard\.(en\.)?html:1$'`) allowed the dashboard to carry exactly one `href="#"`. After Spec 011 the dashboard has zero, so that audit line **still passes** (all pages `:0`). To keep it truthful, tighten the line to the plain "zero `href="#"` on every page" form and annotate it "(closed by Spec 011)". This is a documentation reference update to a fixed follow-up — the one prior-doc edit the spec permits.
- **Spec 010 `page-coverage-audit.md`** "Accepted follow-up" section and **`REVIEW.md`** Spec 010 note describe the dashboard `href="#"` as an open follow-up. Add a one-line "Resolved in Spec 011" annotation to each (reference-to-fixed-follow-up updates, explicitly allowed by the spec's out-of-scope carve-out). No classification or matrix content changes.

No amendment is needed to Spec 009's guard or Spec 010's other guards: the badge change is sidebar-only (no finance/reports vocabulary), and the Overview link points to `reports.html` (not a finance token; `reports.html` is already linked from the dashboard, so the Spec 009 body-scoped finance checks are unaffected).

## D5 — MVP & sequencing

Trivial two-fix spec; sequence: (1) baseline gate (green pre-change) → (2) Overview link fix (`dashboard.js`) → (3) badge localization (`sidebar.js`) → (4) update the two Spec 010 smoke assertions (D3) → (5) build + smoke + a11y + link/truthfulness sweep → (6) `#page-body` body-diff proofs (dashboard limited to Overview; reports/finance identical) + all prior guards → (7) screenshots + review → (8) docs (REVIEW + the D4 reconciliations + CLAUDE). **MVP = steps 1–4** (both fixes + green tests): the demo-ready outcome, shippable on its own.

---

## Additional verified facts

- Built output has exactly one `href="#"` per dashboard file, zero on the other 38 pages — so closing the dashboard one makes the sitewide count 0 (SC-001).
- `num()` returns a string; wrapping `it.badge` is transparent to the `.nav-badge.tabular` markup.
- Only the `sessions` nav item has a `badge`; there is exactly one badge render site to change.
- The dashboard `#page-body` change is confined to the Overview `<a>`'s `href` attribute value; the badge lives in `.sidebar` (outside `#page-body`), so the dashboard-body diff is limited to the Overview fix (SC-004) and reports/finance bodies stay byte-identical (SC-005).
