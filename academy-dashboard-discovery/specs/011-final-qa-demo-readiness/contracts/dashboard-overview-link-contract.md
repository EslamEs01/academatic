# Contract: Dashboard Overview Link Fix (Spec 011)

**Status**: Binding · The one sanctioned dashboard-body touch-point. References FR-001/FR-002/FR-011; US1; SC-001/SC-004; research D1; data-model §1.

## 1. The change (complete)

`src/js/pages/dashboard.js` Overview `sectionHeader({ titleKey: 'section.overview', linkKey: 'section.overviewLink' })` gains a language-aware `linkHref` → `reports.html` (`reports.en.html` on the EN build), using the same `getLang()` idiom as the file's other links. Nothing else in the call or the section changes. The shared `sectionHeader()` component in `ui.js` is **not** modified (its `linkHref='#'` default stays for other callers).

## 2. MUST

- Built `dashboard.html` and `dashboard.en.html` contain **zero** `href="#"`.
- The Overview "View all metrics" / «عرض كل المؤشرات» affordance still renders with the same text, icon, and style (zero visual change) — only its `href` becomes a real page.
- The target is implemented and language-correct (`reports.html` / `reports.en.html`); never a fake route, a planned/locked item, or a broken hash.
- The dashboard `#page-body` diff versus `HEAD` is limited to this Overview `<a href>` value — no added/removed cards, stats, widgets, or analytics.

## 3. MUST NOT

No dashboard redesign; no new/removed dashboard content; no change to `sectionHeader()`'s default or signature; no finance vocabulary (the target is `reports.html`, already a dashboard link — the Spec 009 body-scoped checks stay green).

**Acceptance (binding):**
1. **Given** both built dashboard files, **When** grepped, **Then** `href="#"` count is 0.
2. **Given** the Overview link, **When** clicked in each language, **Then** it opens the language-correct `reports` page.
3. **Given** the dashboard `#page-body` vs `HEAD`, **When** diffed, **Then** the only change is the Overview href value.
