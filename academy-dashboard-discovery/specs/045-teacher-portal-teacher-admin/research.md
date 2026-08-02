# Research and Decision Ledger

## R045-01 — Baseline authority

**Decision:** Use committed HEAD `722be1c37904f0fd44d666553e91239d7e8b4400` on the clean Spec-044 branch as the accepted pre-045 baseline, then create the single authorized `045-teacher-portal-teacher-admin` branch without changing HEAD.  
**Rationale:** Git proves Spec 044 and its implementation are committed; no Spec-044 working bytes were absorbed.  
**Alternatives considered:** The previously reported uncommitted 044 tree and historical Spec-043 counts were rejected because the live committed tree is newer authority.

## R045-02 — Reference versus current product

**Decision:** Retain reference-platform page purpose, information architecture, safe modules, fields, filters, tabs, states, and workflows; preserve later Academatic improvements and reject conflicting legacy pay/private/ranking/interaction behavior.  
**Rationale:** Specs 042/043/044 explicitly ratify chronology and negative requirements.  
**Alternatives considered:** Pixel-copying the legacy product or restyling current pages without comparison; both violate the evidence contract.

## R045-03 — Route and page impact

**Decision:** Keep the existing 11 routes and 22 localized consumers; add no page or navigation domain.  
**Rationale:** All required scope identifiers already have source owners and AR/EN output; Spec 041 freezes the route/sidebar model.  
**Alternatives considered:** Creating a separate portal performance or report-form page; unsupported and owned elsewhere.

## R045-04 — Visual architecture

**Decision:** Create one bounded Teacher-domain composition using existing portal/admin primitives and tokens, with additive shared patterns applied across page families.  
**Rationale:** It provides coherence without global redesign or eleven page-specific systems.  
**Alternatives considered:** Global design-system rewrite; page-by-page decorative redesign; new framework; all have unnecessary blast radius.

## R045-05 — Portal navigation truth

**Decision:** Implement real localized links for the seven internal Teacher destinations already present in the role navigation registry and remove copy implying portal access to admin Teacher performance.  
**Rationale:** C02 fix-first evidence proves the destinations exist and the “soon” presentation is false.  
**Alternatives considered:** Keep planned labels or route to admin performance; both contradict accepted role/route evidence.

## R045-06 — Student workflow depth

**Decision:** Add safe evidenced navigation/context for history, schedule, report/plan, and certificate workflows without private contact fields or exhaustive forms.  
**Rationale:** Reference evidence proves the relationships; Spec 043 limits visibility; Specs 055/056 own propagation and field completeness.  
**Alternatives considered:** Copy legacy roster fields/forms wholesale or leave the page shallow; both fail an applicable contract.

## R045-07 — Library discovery

**Decision:** Reuse existing client-side filter/search conventions for authored resources and add one accessible no-results state.  
**Rationale:** Search/category filters are explicit reference behavior and require no backend.  
**Alternatives considered:** A new search service or fake asynchronous loading; forbidden and unnecessary.

## R045-08 — Directory discovery and summaries

**Decision:** Add evidence-backed scope/sort/pagination using authored records and existing filter conventions; replace computed average-utilization presentation with authored categorical summaries.  
**Rationale:** Reference controls are proven, while computed percentage KPIs conflict with the no-computed-performance rule.  
**Alternatives considered:** Private phone sorting or a runtime workload engine; rejected by privacy and performance contracts.

## R045-09 — Performance model

**Decision:** Preserve the current categorical admin-only board—authored counts, statuses, signals, trends, and notes—and improve only composition and responsiveness.  
**Rationale:** It is an intentional safe improvement over legacy percentages/ratings.  
**Alternatives considered:** Recreate ratings, scores, ranks, leaderboards, percentiles, or charts; explicitly forbidden.

## R045-10 — Interactions

**Decision:** Compose all Teacher interactions through the existing Spec-044 system; treat any shared defect as a bounded 044 regression fix with non-Teacher regression coverage.  
**Rationale:** Duplicated modal/focus/scroll behavior would weaken the accepted single-overlay contract.  
**Alternatives considered:** Page-local drawer/modal handlers; forbidden.

## R045-11 — Data and persistence

**Decision:** Keep all fixtures authored and all edit/save/upload/export/mutation actions truthful and non-persistent.  
**Rationale:** The project is a static frontend and no backend evidence exists.  
**Alternatives considered:** localStorage, fake requests/delays/loading/success, or static “saved” claims; rejected.

## R045-12 — Verification and executor availability

**Decision:** Extend the existing guard and capture mechanisms; run capability probes only after artifact/task coverage and stop before application work if Kimi cannot deliver grounded files.  
**Rationale:** The user makes working Kimi participation a completion precondition and forbids another silent all-Sol fallback.  
**Alternatives considered:** New test framework, ungrounded relay reports, or reassigning all work to Sol without approval; rejected.

## Resolved unknowns

No `NEEDS CLARIFICATION` remains. Data volume is the authored fixture set, external integrations are absent, latency/availability concerns are non-applicable to this static phase, and every future/business-field gap has a named owner.
