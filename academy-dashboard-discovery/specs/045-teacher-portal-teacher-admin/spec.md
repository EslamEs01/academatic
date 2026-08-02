# Feature Specification: Teacher Portal + Teacher Admin

**Feature Branch**: `045-teacher-portal-teacher-admin`  
**Created**: 2026-08-02  
**Status**: Draft — evidence-grounded and ready for planning  
**Input**: Evidence-based visual and usability completion of the eight Teacher portal surfaces and three Teacher administration surfaces, preserving accepted route, privacy, interaction, localization, accessibility, and frontend-only contracts.

## Evidence basis and precedence

Every requirement cites one or more packets from [visual-grounding.md](visual-grounding.md). The common packets EG-045-C01–C09 bind scope, chronology, ownership, routes, privacy, interactions, source ownership, and verification. The per-scope packets EG-045-01–11 bind each page’s reference-platform purpose, current Academatic behavior, accepted improvements, and remaining defects.

When reference evidence conflicts with a later ratified Academatic contract, the later contract governs and every non-conflicting reference requirement remains. Decisions D045-01–D045-06 record the resolved pay, privacy, performance, interaction, form, and route conflicts. No clarification marker remains because repository evidence resolves the product boundaries.

## User Scenarios & Testing

### User Story 1 - Teacher starts the day from one truthful portal (Priority: P1)

A teacher opens the portal and immediately understands today’s teaching priorities, next class, student follow-ups, and the available Teacher pages without encountering false “soon” states or admin-only destinations.

**Why this priority**: The portal is the Teacher role’s entry surface and the canonical C02 audit identifies its false quick-tile state as Spec 045’s first fix. [EG-045-01, EG-045-C02]

**Independent Test**: Open the Arabic and English Teacher portal at desktop and 390px, use every navigation affordance, and verify that each implemented destination resolves to the corresponding Teacher page while unavailable terminal actions remain truthful.

**Acceptance Scenarios**:

1. **Given** a Teacher-role portal, **when** the teacher reviews the home, **then** today’s schedule, next class, follow-ups, students, outcomes flow, recent work, tasks, materials, timetable, reports, requests, and self-profile remain coherent and pay-free.
2. **Given** an implemented Teacher internal page, **when** the teacher uses its portal navigation affordance, **then** the exact localized destination opens and is not labeled “soon.”
3. **Given** an admin-only Teacher performance route, **when** the teacher views portal navigation and copy, **then** no affordance implies Teacher access to that admin board.

---

### User Story 2 - Teacher follows a readable schedule on any viewport (Priority: P1)

A teacher reviews today and the week in a calm, teacher-scoped schedule that remains usable at 390px and never claims live joining or schedule mutation.

**Why this priority**: The schedule is a core daily workflow and the current mobile agenda is an accepted improvement over the legacy grid. [EG-045-02, EG-045-C03]

**Independent Test**: Compare desktop and 390px schedule states in Arabic/RTL and English/LTR, confirming order, preparation guidance, truthful gates, and zero overflow.

**Acceptance Scenarios**:

1. **Given** the teacher schedule, **when** sessions are reviewed on desktop or 390px, **then** today, next class, week, and preparation information remain readable and ordered.
2. **Given** a live or availability-edit action, **when** the teacher reaches it, **then** the interface explains the backend requirement without loading, success, or mutation claims.

---

### User Story 3 - Teacher follows students and outcomes without private-data leakage (Priority: P1)

A teacher can move from a safe roster to the evidenced history, schedule, plan/report, and outcome contexts needed for teaching while family-private and admin-only information remains absent.

**Why this priority**: The reference platform proves deeper teaching relationships, while Spec 043 makes the privacy boundary non-negotiable. [EG-045-03, EG-045-04, EG-045-C05]

**Independent Test**: Inspect both localized roster/outcomes pages and follow every link or gate, verifying safe student identity, role-scoped relationships, distinct absence semantics, and absence of guardian contact/locality/admin controls.

**Acceptance Scenarios**:

1. **Given** a teacher-scoped roster, **when** the teacher reviews a student, **then** the page exposes only the minimum learning identity and evidenced teaching context.
2. **Given** history, schedule, report/plan, or certificate affordances, **when** used, **then** they navigate safely or provide a truthful backend/future-owner explanation; no action is dead.
3. **Given** outcome summaries, **when** absence information is shown, **then** teacher absence and student absence remain separately labeled and counted.

---

### User Story 4 - Teacher manages tasks, reports, and resources without fake capabilities (Priority: P1)

A teacher can understand authored task states, descriptive reports, and available library resources, search/filter resources, and see truthful limits on terminal operations.

**Why this priority**: These are proven Teacher workflows; enriching them with fabricated data or backend behavior would violate the product contract. [EG-045-05, EG-045-06, EG-045-07]

**Independent Test**: Exercise task, report, and library pages in AR/EN and at 390px, including resource search/filter and every terminal gate.

**Acceptance Scenarios**:

1. **Given** the tasks page, **when** tasks and monthly-plan context are reviewed, **then** authored meanings, states, and due windows remain clear without staff averages, ranking, or fake completion.
2. **Given** the reports page, **when** teaching activity and student descriptions are reviewed, **then** no salary report, invented chart, score, export result, or analytic claim appears.
3. **Given** the library page, **when** the teacher searches or filters, **then** matching authored resources update deterministically and no upload/download success is claimed.

---

### User Story 5 - Teacher views a distinct self-profile (Priority: P1)

A teacher views their own identity, allowed contact, subjects, availability, and preferences without seeing administrator controls or believing that gated edits were saved.

**Why this priority**: Self-profile and administrator detail are separate role surfaces with different visibility rules. [EG-045-08, EG-045-C05]

**Independent Test**: Compare Teacher self-profile with admin detail in both locales and verify distinct content, own-contact allowance, absent admin actions, and truthful edit gates.

**Acceptance Scenarios**:

1. **Given** the Teacher self-profile, **when** it is opened, **then** it displays only self-facing identity, own email, teaching context, availability, preferences, and truthful account gates.
2. **Given** a self-profile terminal action, **when** selected, **then** entered or displayed information is preserved and no persistence claim appears.

---

### User Story 6 - Administrator finds and reviews teachers efficiently (Priority: P1)

An administrator searches, scopes, sorts, and pages through the Teacher directory, opens safe detail previews, and reaches the existing direct Add and Categories surfaces without private/pay data or computed utilization claims.

**Why this priority**: The directory is the entry point to Teacher administration and reference evidence proves its discovery controls. [EG-045-09, EG-045-C04]

**Independent Test**: Exercise search, status/subject/workload scopes, sort, pagination, direct Add/Categories routes, drawers, and localized teacher links at desktop and 390px.

**Acceptance Scenarios**:

1. **Given** the Teacher directory, **when** an administrator changes search, scope, sort, or page, **then** records update deterministically with an accessible empty state and no duplicate or hidden records.
2. **Given** a Teacher card, **when** detail or menu actions are used, **then** the correct localized target or truthful shared interaction opens.
3. **Given** directory summaries, **when** reviewed, **then** they use authored status/workload information and never compute a utilization percentage, score, rank, or pay measure.

---

### User Story 7 - Administrator reviews one complete safe Teacher profile (Priority: P1)

An administrator reviews the accepted eight-tab Teacher detail, follows verified deep links, and uses shared actions without salary, private-contact, impersonation, or mobile action overload.

**Why this priority**: This is the deepest Teacher administration surface and concentrates the role, privacy, navigation, and interaction contracts. [EG-045-10, EG-045-C04–C06]

**Independent Test**: Open all eight tabs and every action at desktop and 390px in both locales, validating targets, drawers/confirmations, focus behavior, policy content, and excluded data.

**Acceptance Scenarios**:

1. **Given** Teacher admin detail, **when** all tabs are selected, **then** Overview, Courses, Groups, Timetable, Sessions & Outcomes, Students, Follow-up, and Notes remain present, coherent, and safe.
2. **Given** an evidenced deep link, **when** selected, **then** its current localized destination resolves without changing the frozen navigation model.
3. **Given** a backend-required or destructive-looking demo action, **when** selected, **then** the Spec-044 interaction contract applies and nothing is actually changed.
4. **Given** a 390px viewport, **when** the header and action set are reviewed, **then** actions remain prioritized, reachable, unclipped, and readable.

---

### User Story 8 - Administrator reviews descriptive performance without ranking teachers (Priority: P1)

An administrator uses the display-only Teacher performance board to review authored counts, categorical signals, and monthly notes without any score, rank, leaderboard, percentile, pay, or computed engine.

**Why this priority**: The current categorical board is an accepted safety improvement over the legacy percentage view. [EG-045-11, D045-03]

**Independent Test**: Exercise overview, session KPI, and monthly views and filters in both locales, themes, desktop and 390px, confirming admin-only placement and prohibited-token absence.

**Acceptance Scenarios**:

1. **Given** the performance board, **when** overview, session, and monthly tabs are reviewed, **then** all values are authored display fixtures with explicit categorical labels and no computed score/rank/chart.
2. **Given** the portal role, **when** navigation is inspected, **then** Teacher performance is absent.
3. **Given** 390px, **when** repeated Teacher records are reviewed, **then** their hierarchy remains compact, complete, and free of horizontal overflow.

---

### User Story 9 - Every Teacher surface shares one professional visual language (Priority: P2)

Teachers and administrators experience consistent hierarchy, density, cards, tables, filters, states, and actions across all eleven scopes while portal and admin identities remain visibly distinct.

**Why this priority**: Spec 045 is a domain visual completion, not eleven unrelated redesigns. [EG-045-C02, all per-scope packets]

**Independent Test**: Compare final accepted screenshots for every affected page across locale, direction, theme, desktop and 390px against its evidence packet and the shared visual contract.

**Acceptance Scenarios**:

1. **Given** all eleven pages, **when** reviewed together, **then** they use consistent Teacher-domain hierarchy, density, spacing, component language, action priority, states, and responsive behavior.
2. **Given** portal versus admin pages, **when** compared, **then** their role identities remain distinct while both belong to the same Academatic product.
3. **Given** Arabic/English, light/dark, desktop/390px variants, **when** inspected, **then** no clipping, overflow, unreadable contrast, direction error, or layout jump appears.

---

### User Story 10 - Reviewer can prove scope, parity, safety, and impact (Priority: P1)

A reviewer can deterministically prove that all eleven scopes and localized consumers are complete, no protected contract weakened, every mutation detects its intended defect, and no unrelated page drift occurred.

**Why this priority**: Completion is valid only when evidence and repository bytes agree. [EG-045-C08, EG-045-C09]

**Independent Test**: Run the accepted build, page/route/inventory, interaction, privacy, smoke, accessibility, screenshot, mutation, impact, and whitespace gates from a clean primary tree.

**Acceptance Scenarios**:

1. **Given** the final tree, **when** all gates run, **then** all expected pages and localized consumers pass with exact counts, zero critical/serious accessibility findings, and zero screenshot console errors.
2. **Given** each required isolated mutation, **when** the intended guarantee is broken once, **then** the exact guard reports RED for that cause and the restored primary tree returns GREEN with zero residue.
3. **Given** the accepted baseline, **when** page bodies and generated output are compared, **then** every change is attributable to Spec 045 and unrelated page-body drift is zero.

### Edge Cases

- Arabic labels, tabs, filters, errors, and action copy expand beyond the available width at exactly 390px.
- Empty search/filter combinations must show one accessible empty state without hiding required controls.
- Sorting and pagination after filtering must never strand the user on an invalid page or duplicate records.
- Locale or theme changes must preserve the logical page state and must not switch portal/admin identity.
- A Teacher has zero upcoming sessions, no students, no tasks, no reports, or no library results.
- A verified deep link has no safe current equivalent; the action must become a truthful unavailable state rather than a guessed route.
- A backend-required result occurs after form entry; values must remain and no success state may appear.
- A drawer/confirmation opens from a dense mobile action region; focus, scroll lock, close, and restoration must still follow Spec 044.
- Long Teacher names, subjects, descriptive notes, validation messages, and translated labels must wrap without clipping.
- A privacy/pay/ranking token appears only in source comments or contracts; deterministic audits must distinguish product-visible output from necessary negative-test vocabulary.
- A legacy module conflicts with a later privacy or interaction contract; the later contract wins and the decision ledger records the exclusion.

## Requirements

### Functional Requirements

#### Scope, evidence, and inventory

- **FR-001**: The feature MUST cover exactly the eleven identified scopes and their existing localized consumers: eight Teacher portal pages and three Teacher administration pages; no unsupported Teacher route or module may be added. [EG-045-C01, EG-045-C04]
- **FR-002**: Every scope MUST retain an evidence packet linking reference screenshots and analysis, current screenshots, route/page inventory, source owner, AR/EN consumers, visible modules/actions, privacy ruling, differences, and derived requirements. [EG-045-01–11]
- **FR-003**: A deterministic inventory MUST fail on a missing scope, source owner, localized consumer, duplicate route/page/required ID, unresolved internal link/trigger, parser failure, unsupported fallback, silently ignored page, or source/generated mismatch. [EG-045-C08, EG-045-C09]
- **FR-004**: The accepted baseline MUST record exact source, generated-page, AR/EN, page-body, route, interaction, form, drawer/modal, dropdown, screenshot, smoke, accessibility, protected-file, and console counts before implementation. [EG-045-C09]
- **FR-005**: Every requirement, acceptance scenario, task, assignment, test, mutation, screenshot, and impact result MUST be traceable through maintained ledgers. [EG-045-C02, EG-045-C09]

#### Unified Teacher visual system

- **FR-006**: All eleven pages MUST present a coherent premium Teacher-domain system using the established Academatic typography, tokens, colors, spacing, radii, icon language, shell, navigation model, and shared components. [EG-045-C08, EG-045-01–11]
- **FR-007**: Each page MUST use a consistent hierarchy for page identity, primary information, actionable work, contextual information, filters/tabs, states, and terminal actions without becoming a repetitive card wall. [EG-045-01–11]
- **FR-008**: The visual system MUST remain calm, readable, information-rich, and professionally Teacher-oriented; it MUST avoid decorative gradients, excessive shadows/glass, oversized empty heroes, meaningless charts, inconsistent tokens, accidental dark blocks, and generic filler. [EG-045-C02, EG-045-01–11]
- **FR-009**: Portal and administrator pages MUST remain structurally and visually role-distinct while sharing one Academatic Teacher-domain language. [EG-045-C04, EG-045-08–11]
- **FR-010**: Any shared-style change MUST identify all consumers and pass regression checks outside the Teacher domain; unrelated pages MUST not be redesigned. [EG-045-C08, EG-045-C09]

#### Teacher portal home and navigation

- **FR-011**: `teacher-portal` MUST remain a Teacher daily entry surface, preserving its accepted schedule, next-class, follow-up, students, outcomes, history, tasks, materials, timetable, rubric/requests, and self-account context in role-appropriate order. [EG-045-01]
- **FR-012**: Every currently implemented Teacher portal destination MUST be represented by a working localized navigation affordance rather than a false planned/soon state. [EG-045-01, EG-045-C02]
- **FR-013**: Teacher portal navigation and copy MUST NOT expose or imply access to the admin-only `teacher-performance` board. [EG-045-01, EG-045-11]
- **FR-014**: The Teacher portal MUST NOT add salary, payroll, compensation, ranking, productivity, or invented analytics content. [D045-01, D045-03]

#### Teacher internal pages

- **FR-015**: `teacher-schedule` MUST preserve the accepted teacher-scoped today/next/week/preparation model and its readable mobile transformation. [EG-045-02]
- **FR-016**: Schedule live-entry and availability-edit affordances MUST remain truthful backend-required or intentionally unavailable states; no mutation or live-session claim may be introduced. [EG-045-02, EG-045-C06]
- **FR-017**: `teacher-students` MUST preserve the safe roster and authored learning/follow-up signals while adding only evidence-backed access or context for history, schedule, report/plan, and certificate workflows. [EG-045-03]
- **FR-018**: Teacher student views MUST expose only minimum learning identity and teacher-scoped relationships; guardian contact, student private contact/locality, unrelated students, and admin management controls MUST be absent. [EG-045-03, EG-045-C05]
- **FR-019**: `teacher-outcomes` MUST preserve the evidenced attendance, remark, summary, homework, files, workflow, recent examples, and review concepts using the accepted shared presentation. [EG-045-04]
- **FR-020**: `teacherAbsent` and `studentAbsent` MUST remain semantically, textually, and structurally distinct everywhere in Teacher scope. [EG-045-04, EG-045-10–11]
- **FR-021**: Outcome recording/saving MUST remain backend-required, preserve values and invalid state where applicable, and MUST NOT claim success or propagation. [EG-045-04, EG-045-C06]
- **FR-022**: `teacher-tasks` MUST preserve authored task meanings, statuses, due windows, and monthly-plan context without inventing persistence, completion, reassignment, collaboration, staff averages, or ranking. [EG-045-05]
- **FR-023**: `teacher-reports` MUST preserve exact descriptive teaching-activity and student-report content without invented charts, scores, analytics, salary-class reports, exports, or downloads. [EG-045-06]
- **FR-024**: `teacher-library` MUST preserve authored resources and truthful upload/download limits and provide evidence-backed deterministic search and category/type filtering. [EG-045-07]
- **FR-025**: Library search/filter controls MUST be keyboard accessible, localized, fail loudly when required selectors are missing, preserve the full resource set when cleared, and show one accessible empty state for no matches. [EG-045-07, EG-045-C09]
- **FR-026**: `teacher-profile` MUST remain a Teacher self-facing surface, preserving own identity/contact, teaching subjects, availability, preferences, and truthful account gates without administrator management controls. [EG-045-08]
- **FR-027**: The self-profile MUST NOT duplicate the administrator detail surface or claim that photo, profile, or password changes were persisted. [EG-045-08, EG-045-C06]

#### Teacher administration

- **FR-028**: `teachers` MUST preserve the accepted teacher records, statuses, subjects, authored workload hints, detail navigation, direct Add/Categories surfaces, safe previews, and existing honest actions. [EG-045-09, EG-045-C04]
- **FR-029**: The directory MUST provide evidence-backed deterministic search, status/scope, subject/workload filtering, sorting, pagination, and no-results behavior with AR/EN parity. [EG-045-09]
- **FR-030**: Filtering, sorting, and pagination MUST not duplicate or lose records, expose hidden/private fields, strand an invalid page, or rely on backend mutation. [EG-045-09, EG-045-C05]
- **FR-031**: Teacher directory summaries MUST use authored categorical status/workload information and MUST NOT compute or display average utilization, scores, ranks, percentages, salary, or compensation. [EG-045-09, D045-01, D045-03]
- **FR-032**: `teacher` MUST remain the administrator’s Teacher detail surface and MUST retain the accepted eight tabs: Overview, Courses, Groups, Timetable, Sessions & Outcomes, Students, Follow-up, and Notes. [EG-045-10]
- **FR-033**: Every retained Teacher-detail deep link MUST resolve to its verified current localized destination and MUST preserve the frozen route/sidebar model. [EG-045-10, EG-045-C04]
- **FR-034**: Teacher-detail actions MUST use truthful navigation, safe UI-only state, or the shared backend-required/confirmation interaction; no action may be dead or perform fake mutation. [EG-045-10, EG-045-C06]
- **FR-035**: Teacher-detail content MUST exclude salary, compensation, payroll, private family/student contact, unsafe left/acquired tables, fabricated credentials, and fake impersonation. [EG-045-10, EG-045-C05]
- **FR-036**: Dense Teacher-detail actions MUST be prioritized and transformed at 390px so all required actions remain visible or reachable without clipping or a long undifferentiated waterfall. [EG-045-10]
- **FR-037**: `teacher-performance` MUST remain administrator-only, display-only, and based on authored counts, categorical status/signal/trend labels, and descriptive notes. [EG-045-11]
- **FR-038**: Teacher performance MUST NOT compute or display a score, rank, leaderboard, percentile, rating, invented chart, salary/payroll/compensation measure, export/print result, or live mutation. [EG-045-11, D045-03]
- **FR-039**: The overview, session-performance, and monthly performance views and their evidence-backed filters MUST remain usable and complete in both locales, themes, desktop, and 390px. [EG-045-11]

#### Privacy, role, and pay-free guarantees

- **FR-040**: Teacher portal and administrator identities MUST remain separate: admin controls may not appear in portal pages, portal-only controls may not enter frozen admin navigation, and `teacher-profile` may not be confused with `teacher`. [EG-045-C04, EG-045-08–10]
- **FR-041**: `teacher-performance` MUST not appear in Teacher portal navigation or role content. [EG-045-11]
- **FR-042**: The complete Teacher scope MUST contain zero user-visible salary, salaries, payroll, payment, pay, compensation, wage, bonus, commission, financial ranking, or Arabic-equivalent concepts. [D045-01]
- **FR-043**: The complete Teacher scope MUST preserve Spec 043 privacy and anti-poaching rules, including Teacher pay-free, family zero-pay, safe student learning identity, own-contact-only self profile, parent-contact denial, and capability-policy boundaries. [EG-045-C05]
- **FR-044**: Privacy verification MUST inspect rendered HTML/DOM and fixture/localization payloads rather than only hidden UI, and protected Spec 043 assertions MUST not be weakened. [EG-045-C05, EG-045-C09]

#### Interaction and truthful frontend-only behavior

- **FR-045**: Every Teacher modal, drawer, confirmation, long-form page, and mobile sidebar interaction MUST use and preserve the Spec 044 open/close, focus, isolation, scroll, dirty-state, validation, backend-required, responsive, and one-overlay contracts. [EG-045-C06]
- **FR-046**: No Teacher page may introduce a page-specific focus trap, body lock, overlay, modal/drawer controller, nested modal-grade surface, duplicated listener, or conflicting z-index system. [EG-045-C06]
- **FR-047**: Every opener, closer, trigger-to-target mapping, Escape/overlay rule, focus restoration, dirty guard, and required selector in changed Teacher interactions MUST be exercised and MUST fail loudly when absent. [EG-045-C06, EG-045-C09]
- **FR-048**: Every terminal action MUST be classified as real client-side behavior, navigation, safe UI-only state, backend-required, or intentionally unavailable with a truthful explanation. [EG-045-01–11]
- **FR-049**: No Teacher action may claim saved, submitted, assigned, approved, created, updated, deleted, sent, uploaded, completed, authorized, or persisted unless that result is real. [EG-045-C06]
- **FR-050**: The feature MUST NOT add a backend, API, database, authentication, authorization, CRUD, upload/export/print/messaging/live-session operation, fake request, fake delay, fake loading, fake success, or browser storage intended to imitate server persistence. [EG-045-C05, EG-045-C06]
- **FR-051**: Backend-required results and recoverable client errors MUST preserve entered values and distinguish validation from missing backend capability. [EG-045-C06]

#### Locale, direction, theme, responsive, and accessibility

- **FR-052**: Every affected page and interaction MUST have structural and copy parity in Arabic/RTL and English/LTR. [EG-045-C08]
- **FR-053**: Every distinct affected layout and component state MUST work in light and dark themes without contrast, surface-collision, focus, destructive/error/status, or token regressions. [EG-045-C08]
- **FR-054**: Every affected page MUST work on desktop, supported tablet layouts, and exactly 390px with no horizontal overflow, clipping, off-screen required action, translated-text failure, fixed-width Arabic failure, accidental content reversal, or layout jump. [EG-045-01–11]
- **FR-055**: Dense tables, schedules, tablists, filters, card grids, and action sets MUST use an evidence-based mobile transformation rather than merely scaling down desktop. [EG-045-02, EG-045-09–11]
- **FR-056**: Semantic headings, landmarks, accessible names, labels, table/list semantics, status text, keyboard access, visible focus, contrast, target size, descriptions, reduced motion, and error announcements MUST be preserved or improved. [EG-045-C06, EG-045-C09]
- **FR-057**: Accessibility acceptance MUST have zero critical and zero serious findings, no keyboard trap, focus loss, background-focus leakage, inaccessible required action, color-only meaning, or missing accessible name. [EG-045-C09]

#### Source ownership, verification, mutations, and impact

- **FR-058**: Authored source MUST remain the owner of generated HTML; generated pages may change only through the established build and source/generated parity rules. [EG-045-C08]
- **FR-059**: Every source change MUST record its generated AR/EN consumers, copied assets, shared consumers, and expected parity rule; unexpected generated drift MUST be investigated. [EG-045-C08, EG-045-C09]
- **FR-060**: Deterministic verification MUST cover all eleven scopes, all expected localized consumers, route/link/trigger/action truthfulness, pay/rank/absence/role/privacy guards, Spec-044 interactions, locale/direction/theme/390px parity, console, accessibility, source/generated parity, page-body impact, and whitespace. [EG-045-C09]
- **FR-061**: Required tests MUST NOT use silent catches, optional assertions, swallowed selector failures, unconditional skips, weakened protected assertions, unrelated failures as expected RED, hidden-markup-only checks, or changed requirements that normalize broken output. [EG-045-C09]
- **FR-062**: Every additive protected guard and required supersession MUST follow the protected-test register with an explicit owner, rationale, acceptance meaning, and falsifying mutation. [EG-045-C05, EG-045-C09]
- **FR-063**: Fresh isolated single-mutation runs MUST prove intended RED and restored GREEN for missing scope/locale, pay leakage, portal performance exposure, self/admin identity confusion, absence conflation, dead link, missing locale copy, removed 390px/dark rule, broken source/generated parity, swallowed selector, false saved wording, Spec-044 regression, privacy regression, and unrelated page-body drift guard. [EG-045-C09]
- **FR-064**: Mutation proof MUST reject syntax/module/fixture/build failures unrelated to the intended guard, remove every isolated copy, prove primary-tree GREEN, and report zero residue. [EG-045-C09]
- **FR-065**: Final visual review MUST open every affected localized page in AR light desktop/390px and EN light desktop/390px, plus dark coverage for every page/layout variant, and record console, overflow, clipping, accessibility observation, verdict, correction, and accepted path. [EG-045-01–11]
- **FR-066**: Final impact accounting MUST report exact changed authored files, generated files, localized pages, page bodies, unchanged Teacher consumers, added/removed pages, shared consumers, test/screenshot/a11y growth, unrelated drift, and a reason for every count change. [EG-045-C09]
- **FR-067**: No page or route may be added unless evidence proves it necessary, it remains inside Spec 045, and its route/navigation/ownership is documented before implementation. [EG-045-C04]
- **FR-068**: All deferred findings MUST name exactly one future owning Spec and a concrete exclusion reason; no Teacher-domain visual/usability defect may be deferred out of Spec 045. [EG-045-C02]

### Key Entities

- **Teacher Portal Surface**: One of eight self-facing pages, carrying Teacher-role navigation, minimum safe learning context, and truthful frontend-only actions.
- **Teacher Administration Surface**: Directory, admin detail, or admin-only performance page, with administrative discovery/context but no pay, ranking engine, private-family leakage, or fake mutation.
- **Teacher Record**: Authored display fixture containing approved identity, subject, categorical status/workload, course/group/student counts, schedule, and follow-up signals.
- **Learning Relationship**: Teacher-to-student/course/group/session context restricted to the minimum evidenced learning identity.
- **Performance Signal**: Authored categorical status, trend, count, or descriptive note; never a computed score, rank, percentile, or compensation measure.
- **Terminal Action**: A control explicitly classified as client-side behavior, navigation, safe UI-only state, backend-required, or intentionally unavailable.
- **Evidence Packet**: The traceable set of reference/current screenshots, analysis, source/generated owners, differences, privacy ruling, and derived requirements for one scope.

## Scope boundaries and ownership

Spec 045 owns the visual/usability completion, responsive behavior, localized/theme parity, direct interaction composition, dead scoped links/actions, and truthful presentation of the eleven Teacher pages.

It does not own family redesign (046), other domain redesigns (047–050), global navigation/sidebar redesign (041), privacy/role-model redesign (043), shared-interaction replacement (044), chat (051), Zoom/session integration (053), live classroom (054), cross-role certificate/reschedule/report propagation (055), exhaustive business-field completeness (056), final product-wide freeze (057), backend sessions/APIs/persistence/RBAC, salary/payroll, computed ranking, or a new frontend architecture. Each discovered deferred item must enter the ownership matrix with exactly one owner.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Exactly 11 Teacher scopes and 22 localized AR/EN page consumers are inventoried, evidence-linked, implemented as required, and independently accepted.
- **SC-002**: 100% of implemented Teacher portal destinations resolve from truthful localized affordances; false “soon” labels for those destinations are zero.
- **SC-003**: All Teacher directory search/scope/sort/pagination combinations return the exact authored records without duplicates, stale pages, or dead states.
- **SC-004**: User-visible pay/compensation concepts, scores, ranks, leaderboards, percentiles, and invented performance charts across Teacher scope are all zero.
- **SC-005**: Portal/admin identity violations, Teacher-performance portal exposure, private-family/student-contact leakage, and `teacherAbsent`/`studentAbsent` conflations are all zero.
- **SC-006**: Every scoped terminal action is functional or truthfully classified; dead buttons and false persistence/success statements are zero.
- **SC-007**: Every required Teacher interaction passes the inherited Spec-044 focus, dismissal, scroll, dirty-state, viewport, and single-overlay guarantees.
- **SC-008**: Every one of the 11 pages passes AR/RTL light desktop, AR/RTL light 390px, EN/LTR light desktop, EN/LTR light 390px, and required dark-layout review with zero clipping, off-screen actions, horizontal overflow, or console errors.
- **SC-009**: Accessibility reports zero critical and zero serious findings and manual keyboard review finds zero traps, lost focus, background leakage, or inaccessible required action.
- **SC-010**: Build, smoke, interaction, privacy, localization, source/generated parity, protected tests, count guards, and whitespace checks are fully green.
- **SC-011**: Every required mutation produces its intended exact RED, the restored primary tree returns GREEN, and mutation residue is zero.
- **SC-012**: Exact impact accounting reports zero unrelated page-body drift and explains every source, generated, page, test, screenshot, and accessibility count change.
- **SC-013**: Independent final review finds zero unresolved Spec-045 requirement, scope, visual, privacy, interaction, accessibility, test, evidence, attribution, or documentation defect.

## Assumptions

- The clean committed Spec-044 baseline at `722be1c37904f0fd44d666553e91239d7e8b4400` is the accepted starting authority.
- The existing static frontend, route count, shell, fixtures, localization model, build process, and shared interaction system remain authoritative unless repository evidence explicitly requires a bounded correction.
- The eleven current source modules and their 22 localized generated pages already exist; no new page or route is currently justified.
- Legacy English/light desktop evidence is incomplete for mobile/dark/Arabic. It establishes page purpose and modules, while final Academatic parity is proven through current source plus the mandatory Spec-045 capture matrix.
- Authored fixture counts and categorical labels are display evidence, not permission to create calculation engines or server persistence.
- Kimi and Claude execution begins only after capability probes and an accepted assignment ledger. Kimi must remain the largest accepted weighted implementer unless the user approves a substitute after a proven blocker.
