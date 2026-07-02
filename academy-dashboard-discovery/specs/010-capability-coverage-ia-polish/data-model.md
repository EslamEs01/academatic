# Data Model: Spec 010 — Capability Coverage, Navigation IA & Polish

**All shapes are documentation/build-time shapes only.** No DB schema, no API schema, no runtime app data engine, no new fixture entity. The only runtime-adjacent data change in Spec 010 is D6 (nav badge derives from the existing authored `SESSIONS.total`). Shapes 1–7 live in markdown artifacts; 8–9 describe existing `nav.config.js` structures this spec touches; 10–11 describe build/test-time records.

## 1. LegacyCapability *(matrix row subject — documentation)*

| Field | Type | Rules |
|---|---|---|
| `name` | string | Human name, new-system wording (never legacy private wording) |
| `legacyRoutes` | string[] | From `output/combined/page-inventory.md`; query-param variants collapsed |
| `whatItDid` | string | 1 line, from the combined inventories |
| `adminValue` | enum | `useful · weak · duplicated · broken · backend-only` |
| `roles` | enum[] | `admin · teacher · family/student` |
| `sourceRef` | string | Inventory/planning doc path the row is grounded in |

## 2. CapabilityClassification *(exactly one per capability)*

| Field | Type | Rules |
|---|---|---|
| `classification` | enum | `implementedNow · betterName · moved · merged · planned · backendRequired · futureRole · intentionallyExcluded · missingLogged` — exactly one primary |
| `destination` | string | Page base / nav item id / Spec 009 planned-card id / future-spec name / "—" (excluded) |
| `rationale` | string | 1 line; mandatory for `intentionallyExcluded` and `missingLogged` |

## 3. CoverageMatrix *(the artifact: `legacy-capability-coverage.md`)*

Ordered groups (one per classification, D9 order) of LegacyCapability+CapabilityClassification rows; **must** contain rows for the fifteen named capabilities (FR-002 + brief list); ends with the sign-off checklist: every module classified · every exclusion justified · every future-role capability registered · zero silent gaps · reviewer/date line.

## 4. NavigationAuditItem *(per nav item — audit + correction record)*

| Field | Type | Rules |
|---|---|---|
| `id / category / labelAr / labelEn` | strings | From `nav.config.js` + locales |
| `status` | enum | `implemented · planned · disabled · future-role · hidden` (existing vocabulary, unchanged) |
| `routeOrReason` | string | Route (implemented) / reasonKey (disabled) / — (planned) |
| `correction` | enum | `none · regrouped · moved · relabeled · badgeDerived · futureRouteRemoved` |

Invariants (bind FR-011): implemented↔route, planned↔no route + «قريبًا», disabled↔reasonKey, one active per page (0 on gallery), sitewide sidebar finance links = 1, locked finance items = 7 (six billing + banks).

## 5. PageAuditItem *(per page base — 20 rows in `page-coverage-audit.md`)*

Ten dimension cells — `purpose · contentRichness · linkIntegrity · actionHonesty · bilingual · rtlLtr · darkMobile · legacyCoverage · betterThanLegacy` — each `pass · fixNow · future` + note; plus `disposition` (fix-now items → PolishActions; future items → matrix rows).

## 6. PolishAction *(one concrete fix)*

| Field | Type | Rules |
|---|---|---|
| `target` | string | File/surface (must be inside the scope-guard allowed set) |
| `defect` | string | What is wrong today (observable) |
| `change` | string | Copy/empty-state/style-level only — no new sections, no new hooks |
| `verification` | string | The smoke assertion / screenshot frame / audit command that proves it |

## 7. ShortcutLink *(exactly one in Spec 010)*

`source: family.html → billingPanel actions row` · `dest: finance.html (finance.en.html on EN)` · `labelKey: fam.bill.viewInvoices` (AR/EN pair added to the fam overlay; honest "fixture preview" wording) · `guardAmendment: Spec 009 scope-guard G8a + G8b#5 exact-token amendment (research D10)` · rendered as a real `<a>` styled with existing button/link idiom — no new component.

## 8. SidebarSection *(existing nav shape — reused, not invented)*

`{ titleKey: string, items: item[] }` inside a category's `sections[]` — exactly the Spec 007 `cat.teachersPerf` mechanism. Spec 010 adds one: `{ titleKey: 'cat.finance', items: [finance, invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks] }` in the reports category; new label key `cat.finance` (AR «المالية» / EN "Finance") in base locales. Constraint: `catItems()`/`categoryOf()` untouched.

## 9. HeaderCrumb *(existing shape — verify-only)*

`{ titleKey, crumbKey }` per `build-html.mjs` PAGES entry — audit confirmed all 20 present and symmetric AR/EN; Spec 010 changes none, asserts completeness in the audit artifact.

## 10. PlannedSurface *(register of honest not-yet-real surfaces — verify-only)*

Union of: 20 planned nav items («قريبًا», no route) · 7 disabled finance items (reason-locked) · 9 Spec 009 planned/backendRequired cards · Spec 008 planned report cards. Spec 010 adds none, removes none; the truthfulness sweep (FR-017/US7) asserts each: visible label + (if disabled) visible reason, non-navigating, non-mutating, no figures on finance cards.

## 11. AcceptanceFrame *(screenshot record — 13 frames, research D11)*

| Field | Type | Rules |
|---|---|---|
| `id / page / lang / theme / viewport` | strings | From the existing capture MATRIX vocabulary |
| `state` | string | e.g. `nav:reports-category-open`, `filter:status-tile-applied`, `tab:plan-billing` |
| `passConditions / failConditions` | string[] | From spec FR-022 + the brief's failure list |
| `verdict` | enum | `pass · fail` — recorded in `screenshots/REVIEW.md` Spec 010 section |

## Build-time guard additions (not data, recorded here for completeness)

- **Chip-tone guard** (FR-016): in `build-html.mjs`, post-render scan of each page's HTML for `chip tone-([a-z-]+)`; every capture must be in the styled set `{live, upcoming, completed, cancelled, amber, neutral}`; unknown tone → `throw` (build fails). Medallion tones are out of scope (separate palette).
- **Existing guards untouched**: nav build guard, Spec 009 fixture coherence guard.
