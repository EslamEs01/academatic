# Full Admin Menu Coverage Inventory — Spec 032

Every admin nav item in `src/js/nav.config.js` (50 items · 6 rail categories) classified. **0 unclassified.** Build guard (`nav.config.js:148-154`) green by inspection: implemented⇒route · non-implemented⇒no-route · disabled⇒reasonKey. The Spec-010/029 nav block (6 rail categories · link-integrity · planned-truthfulness) stays green.

Status legend: **IMPL**=implemented (real route+page) · **FOLD**=folded into an existing page (drawer/modal/tab) · **PLAN-029**=deliberate Spec-029 planned-gate (page-candidate rejected, honest «قريبًا») · **FB**=future-backend gate (needs an engine) · **DIS**=disabled-with-reason (finance).

## control (12) — `nav.config.js:19-36`
| id | status | route / fold-owner |
|---|---|---|
| home | IMPL | dashboard.html |
| sessions | IMPL | sessions.html |
| schedule | IMPL | schedule.html |
| attendance | IMPL | attendance.html |
| sessionsAnalysis | IMPL | sessions-analysis.html |
| messages | FB | messaging engine |
| leads | FB | CRM engine |
| tasks | FB | task engine |
| announcements | FB | broadcast engine |
| timeConverter | FB | tool (deferred) |
| publicHoliday | IMPL | public-holiday.html |
| scheduledActions | IMPL | scheduled-actions.html |

## families (9) — `nav.config.js:37-50`
| id | status | route / fold-owner |
|---|---|---|
| families | IMPL | families.html |
| addFamily | IMPL | add-family.html (the real wizard) |
| students | IMPL | students.html |
| courses | IMPL | courses.html |
| familyCategories | FOLD | `family.html` `fam-cat` drawer (Spec 027) |
| groups | IMPL | groups.html |
| scheduleSearch | FB | availability-search engine |
| studentResult | PLAN-029 | (distinct from student.html Results tab) |
| studentEvaluation | PLAN-029 | (distinct from evaluation-rubric.js) |

## teachers (6) — `nav.config.js:51-68`
| id | status | route / fold-owner |
|---|---|---|
| teachers | IMPL | teachers.html |
| addTeacher | FOLD | `teachers.html` modal (Spec 028) |
| teacherCategories | FOLD | `teachers.html` `trn-categories` drawer (Spec 028) |
| teacherKpi | IMPL | teacher-performance.html |
| sessionsKpi | PLAN-029 | — |
| monthlyPerf | PLAN-029 | — |

## reports + finance sub-section (11) — `nav.config.js:69-95`
| id | status | route / fold-owner |
|---|---|---|
| reports | IMPL | reports.html |
| monthlyReports | PLAN-029 | — |
| dataAnalysis | PLAN-029 | overview counts stand in |
| finance | IMPL | finance.html |
| invoices | DIS | nav.reason.finance |
| monthlyInvoices | DIS | nav.reason.finance |
| salaries | DIS | (content folded → finance.html Salaries tab; nav stays disabled per Spec-030 design) |
| staffSalaries | DIS | (same Salaries-tab fold) |
| payments | DIS | nav.reason.finance |
| classSalaryReport | DIS | nav.reason.finance |
| banks | DIS | (content folded → finance.html Banks tab; nav stays disabled) |

## admin (5) — `nav.config.js:96-105`
| id | status | route / fold-owner |
|---|---|---|
| staff | IMPL | staff.html |
| materials | FOLD | `library.html` Materials tab (Spec 031) |
| books | IMPL | library.html |
| certificates | IMPL | certificates.html |
| certificateRequests | FOLD | `certificates.html` Requests tab (Spec 031) |

## settings (7) — `nav.config.js:106-117`
| id | status | route / fold-owner |
|---|---|---|
| settings | IMPL | settings.html |
| settingsGeneral | FOLD | settings.html General tab |
| settingsIntegrations | FOLD | settings.html Integrations tab |
| settingsCustomization | FOLD | settings.html Customization tab |
| settingsNotifications | FOLD | settings.html Notifications tab |
| settingsSecurity | FOLD | settings.html Security tab |
| settingsUsers | FOLD | settings.html Users tab → deep-link to staff.html (B-16 alias) |

## Roll-up
**20 IMPL · 11 FOLD · 6 PLAN-029 · 6 FB · 7 DIS = 50 · 0 unclassified.** Every FOLD item has a real drawer/modal/tab in source; every FB/PLAN item is a non-navigating `data-coming-soon` button; every DIS item has `nav.reason.finance` (a real localized string).

## Flags (documentation-only drift — cleanup candidates for 032, not build-guard violations)
1. **`FUTURE_ROUTES.sessionsAnalysis`** (`nav.config.js:140`) still maps `'sessions-analysis.html'` though the item is already IMPL with its own route — stale (previously flagged in `029/admin-menu-coverage-inventory.md:104-106` for "032 cleanup"). Unused at runtime.
2. **`FUTURE_ROUTES.teacherCategories`** (`nav.config.js:142`) maps `'teacher-categories.html'` though the item was resolved via FOLD (a drawer, no standalone page) in Spec 028 — same stale class, not previously called out. Unused at runtime.
→ Freeze action: optionally delete both stale entries (mirroring how `materials: 'library.html'` was corrected in Spec 031). No functional impact either way.

**Acceptance**: 0 unclassified · build guard green · nav block green · 2 stale-map entries recorded (optional cleanup).
