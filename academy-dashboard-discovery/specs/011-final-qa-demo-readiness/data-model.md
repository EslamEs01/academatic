# Data Model: Spec 011 — Final QA Hotfix & Demo Readiness

**All shapes are documentation/build-time only.** No DB schema, no API schema, no new fixture domain, no new runtime data. Spec 011 changes two render sites and two test assertions; there is no new app data.

## 1. DashboardOverviewFix

| Field | Value |
|---|---|
| `site` | `src/js/pages/dashboard.js:94` — the `section.overview` `sectionHeader(...)` call |
| `oldState` | `<a href="#" class="link-more">…View all metrics ↗</a>` (dead — `linkHref` omitted, `sectionHeader` default `'#'`) |
| `newTreatment` | real link → `reports.html` (`reports.en.html` on EN), via added `linkHref` at the call site (language-aware) |
| `honesty` | target is implemented + already linked from the dashboard; not fake/planned/locked; zero visual change (only the href value changes) |
| `bodyScope` | inside dashboard `#page-body`; this is the one sanctioned dashboard-body touch-point |

## 2. LocalizedBadge

| Field | Value |
|---|---|
| `site` | `src/js/components/sidebar.js:37` — the sessions nav badge |
| `sourceValue` | `SESSIONS.total` (fixture-derived, from `nav.config.js`; unchanged) |
| `renderHelper` | `num()` (`src/js/i18n.js`) — `Intl.NumberFormat`, build-time locale |
| `expectAR` | Arabic-Indic digits (e.g. ٢٤) |
| `expectEN` | Western digits (e.g. 24) |
| `truthfulness` | value stays the single `SESSIONS.total` source; no duplicate literal, no per-language string |
| `bodyScope` | shared sidebar (outside `#page-body`); ripples all 40 pages, not a body change |

## 3. LinkAuditResult *(sweep record — the existing Spec 010 crawl, verified)*

Per built page: `href="#"` count (target: **0 on every page**, dashboard included), dead-target count (0), external/CDN count (0), raw-key count (0), nav-truthfulness (planned non-navigating · disabled expose reason · future-role unrendered). Recorded via the smoke link crawl + truthfulness sweep (assertions updated per research D3).

## 4. ImpactDiff *(before/after proof)*

| Region | Expectation |
|---|---|
| dashboard `#page-body` | differs from `HEAD` only at the Overview `<a href>` value |
| reports `#page-body` | byte-identical to `HEAD` |
| finance `#page-body` | byte-identical to `HEAD` |
| `pages/reports.js`, `pages/finance.js` + their fixtures/components | zero git diff |
| sidebar (all pages) | localized sessions badge — the only sitewide ripple |

## 5. AcceptanceFrame *(screenshot record — research D5 / screenshot-acceptance contract)*

| Field | Rule |
|---|---|
| `id / page / lang / theme / viewport` | from the existing capture MATRIX vocabulary |
| `state` | dashboard default (Overview fixed) · sidebar badge (AR ٢٤ / EN 24) · mobile AR sidebar |
| `passConditions / failConditions` | from spec FR/SC + the spec's failure list |
| `verdict` | pass · fail — recorded in `screenshots/REVIEW.md` Spec 011 section |

## Build/test-time changes (recorded for completeness — not data)

- `tests/smoke/run.cjs`: badge assertion → locale-aware; link-crawl `deadHash` → `=== 0` for all pages (research D3).
- No new build guard; existing nav guard, finance coherence guard, and chip-tone guard remain and stay green.
