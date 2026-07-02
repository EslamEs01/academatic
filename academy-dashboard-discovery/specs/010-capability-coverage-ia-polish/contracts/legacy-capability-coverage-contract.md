# Contract: Legacy Capability Coverage Matrix (Spec 010)

**Status**: Binding · The artifact that proves zero silent gaps. References FR-001–FR-005; SC-001/SC-002; research D9; data-model §1–3.

## 1. Artifact

`academy-dashboard-discovery/specs/010-capability-coverage-ia-polish/legacy-capability-coverage.md` — markdown, grouped by the nine classifications in this order: implemented now · implemented under a better name · moved to a better category · merged into a stronger workflow · planned/قريبًا · backendRequired · future-role · intentionally excluded · missing-accidentally-now-logged. Each row: capability · legacy route(s) · what it did (1 line) · destination · rationale (1 line). Query-param variants collapse into their parent capability. Grounded in `output/combined/*` + `frontend-planning-deep/*` (cited at top).

## 2. Mandatory explicit rows (no silent gaps)

The fifteen named capabilities MUST each have a row: forms/assessment builder · family feedback-meetings · teacher request-schedule/response workflow · per-session class feedback · Zoom/live-classroom surfaces · notification settings matrix · CSV import/backup · RBAC permission matrix (~170 flags) · WhatsApp/Email integration config · certificate designer · currency-rates maintenance · teacher-portal pages (all 26, groupable) · family/student-portal pages (all 13, groupable) · broken legacy routes (message-builder 504; export-course, teacher monthly-classes, scheduled-trials index, family-feedback detail, teacher/student profile views — 500) · duplicate/thin features (tickets shell, total-queues, WhatsApp insights, duplicate teacher-history routes, `downlaod` typo).

## 3. Classification rules

- Exactly ONE primary classification per capability; a secondary note is allowed (e.g. merged + "future academy-wide page stays planned").
- `intentionallyExcluded` and `missingLogged` rows MUST state a reason; excluded capabilities get NO nav item, card, or link.
- `futureRole` rows MUST match the `FUTURE_ROLE` register and never render in the admin console.
- The dashboard revenue KPI, the dev gallery page, and `index.html` get documentation rows (sanctioned artifacts, not gaps).
- The matrix is documentation ONLY — never rendered as an app page; no legacy private wording or numeric status codes appear in any row's "new system" columns.

## 4. Sign-off

Ends with the product-owner checklist: every module classified · every exclusion justified · every future-role capability registered · zero silent gaps · reviewer/date line (FR-005).

**Acceptance (binding):**
1. **Given** the matrix, **When** any of the 19 legacy modules or 15 named capabilities is looked up, **Then** a row exists with exactly one primary classification, a destination, and a rationale.
2. **Given** 3 randomly sampled routes from `page-inventory.md`, **When** resolved, **Then** each maps to a matrix row (directly or via its collapsed parent capability).
3. **Given** rows classified excluded/missing-logged, **When** the app is greped, **Then** no nav item, card, or link exists for them.
4. **Given** the sign-off checklist, **When** walked, **Then** every item is checked.
