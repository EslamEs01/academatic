# Feature Specification: Sensitive Data Privacy, Role Isolation & Anti-Poaching

**Feature Branch**: `feature/012-role-portal-foundation` (spec dir `043-sensitive-data-privacy-role-isolation-anti-poaching`)
**Created**: 2026-07-17
**Status**: Draft (specify phase — no plan, no tasks, no implementation)
**Wave**: 0 (foundation; `044` runs in parallel) — `contracts/future-spec-dependency-contract.md` §1
**Input**: Freeze the frontend privacy and role-visibility foundation that Specs 045–056 consume; consume the
17 owned rows from Spec 042 `future-spec-allocation-register.md` §4.

> **This is a FRONTEND-ONLY policy-and-visibility foundation.** Spec 043 ratifies WHO may see WHAT per role and
> ships the honest frontend gates + fixture/DOM absence that already obey the visibility law. It does **NOT**
> build a permission engine, authentication, sessions, or secret storage — every one of those is
> `FUTURE_BACKEND`. No wording anywhere may claim backend authorization exists. Real server-side authorization,
> authentication and secret persistence are out of scope and are named as backend prerequisites throughout.

> **WAVE-0 FOUNDATION OWNERSHIP (correction, 2026-07-17).** Spec 043 is an *implementable* Wave-0 foundation, not
> a specify-only ratification. Its frontend-enforceable foundation is implemented and tested **by Spec 043's own
> `/speckit.implement` phase**, BEFORE any dependent protected-data page (045–056) reaches Gate 3. Work splits
> into three classes: **(A) SPEC-043-OWNED FRONTEND FOUNDATION** — implemented + tested + mutation-proven during
> Spec 043's own implement phase (child-view password-gate removal; the parent-contact deny-by-default registry
> on the existing RBAC host; the global privacy absence guards; the teacher-capability/notification policy
> preview; the existing-safe-surface freeze assertions). **(B) DOWNSTREAM PAGE-LOCAL COMPLIANCE** — Specs 045–056
> consume the *already-implemented* 043 foundation, preserve its global guards, and add page-local tests for
> their own new/changed surfaces; they may never become the primary implementation owner of a 043 closure, and
> may never weaken or replace a 043 test. **(C) FUTURE_BACKEND ENFORCEMENT** — authentication, sessions, real
> RBAC, row-level isolation, secret persistence and direct-route denial stay honestly gated, never faked.
> Ratification alone is Gate 1; a future plan is not implementation; a downstream promise is not a completed
> foundation. The canonical per-row split is `owned-row-reconciliation.md` §"Implementation-ownership table".
> **NOTE ON PHASE:** this current `/speckit.specify` phase still writes **0 application bytes** — the class-A
> implementation is delivered by Spec 043's subsequent plan/tasks/implement phases, which this correction now
> assigns to Spec 043 itself (no longer to any dependent spec).

**Baseline HEAD**: `ce33a7c` · 115 public HTML · 57 PAGES · admin menu 50 · routes 24 deep / 25 plain / 1
disabled lock · 49 implemented / 0 planned / 1 disabled · `FUTURE_ROUTES = {}` · sole honest lock
`classSalaryReport` · gallery orphan pair `{gallery.html, gallery.en.html}`.

**Owned rows (exactly 17)**: C01-27 · C02-04 · C02-05 · C02-06 · C03-13 · C04-22 · C09-19 · C12-01 · C12-02 ·
C12-09 · C12-13 · C12-19 · C14-09 · C15-01 · C15-02 · C15-03 · C15-18
(`future-spec-allocation-register.md` §4; 9 backend-prerequisite). Reconciliation with dispositions +
destinations: `owned-row-reconciliation.md`.

**Companion artifacts** (thin, referential — cite Spec 042 by path + stable ID, never restate): see the
artifact index at the end of this document. The full grounding trace + honest reopen counts:
`targeted-visual-grounding.md`.

---

## Why this spec exists (the one product rule)

> **A teacher must never be able to obtain guardian/student contact information or other sensitive data that
> could be used to take students outside the academy.**

The legacy product treated `Show Parent Phone` / `Show Parent Email` as permissions **grantable to everyone**
(`privacy-and-sensitive-data-findings.md` §7; both captured staff members = 170/170 all-granted,
`rejected-legacy-behaviour-register.md` RJ-37), printed a teacher's student roster with a **Country** column
(`output/roles/teacher/pages/teacher-studentslist.json`, A-02 — pixel-verified: the teacher's own "List of
Students" shows `Country: VUT` next to the student name), and carried **Left Students / Acquired Students**
attribution tables on the teacher profile (`output/roles/admin/pages/management-teachers-1.json`, A-01 —
pixel-verified). Any one of these lets a teacher identify and reach a family directly. The same isolation
requirement holds between unrelated families, between the student child-view and adult/admin data, between
teachers and private staff/admin data, between public surfaces and tenant data, and between integration
configuration and stored secrets.

This repository is frontend-only, so 043 cannot enforce authorization at runtime. What it CAN guarantee — and
what it freezes here — is that **no static page bakes sensitive data the requester should not receive**, that
every ungoverned entitlement is an honest gate, and that no wording claims an enforcement that does not exist.
"Hiding a link is NOT authorization" (`contracts/privacy-role-isolation-handoff-contract.md` §1.4).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — A teacher cannot harvest a family's contact details (Priority: P1)

A teacher opens every teacher-facing surface they can reach (portal home, roster, schedule, outcomes, reports,
library, profile; and — in the future admin teacher surfaces — the teacher's own admin record). On none of them
does a guardian phone, guardian e-mail, student private phone/e-mail, home address, or unnecessary
country/locality appear — not as visible text, not in the DOM, not in a fixture, not in a data-attribute, not
in a query string, not in a hidden drawer payload. No export/copy/share control reveals hidden contact data.
No teacher-facing permission can grant parent-contact visibility.

**Why this priority**: This is the single product rule the whole spec exists to freeze. A leak here is the
anti-poaching failure the academy most fears; it is the highest-severity finding class in the corpus
(S-01/P-01/A-01).

**Independent Test**: Grep the built `teacher-*.html` bodies and the `teacher-*` fixtures for any
phone/e-mail/address pattern and for guardian-contact tokens → 0. Grep the teacher roster fixture for a
`country`/locality field → 0. Confirm no permission row in any teacher-visible surface names parent contact.
(Falsified by mutation MUT-1 / MUT-2 in `protected-test-and-mutation-register.md`.)

**Acceptance Scenarios**:

1. **Given** the built `teacher-students.html` / `.en`, **When** its `#page-body` is searched for guardian or
   student contact values or a country column, **Then** zero matches are found (the current roster is
   name + course + authored learning-signal only — `app/src/js/pages/teacher-students.js` header states "no
   private guardian contact").
2. **Given** the teacher-facing fixtures, **When** searched for guardian phone/e-mail/address/country,
   **Then** none exists — there is no field to leak.
3. **Given** the ratified parent-contact permission set (`parent-contact-default-deny-contract.md`), **When**
   any teacher role or a teacher-visible surface is checked, **Then** it can never hold a `view guardian phone`,
   `view guardian e-mail`, `export guardian contacts`, or `reveal masked value` grant — those grants are
   structurally unavailable to teachers, and all default DENY.

---

### User Story 2 — The child-view is not an adult account (Priority: P1)

The student child-view (`student-*` pages, «عرض الابن») shows only the child's own learning and session
information. It carries no password-change affordance, no admin/guardian account controls, no guardian private
data, and no cross-child/family data. No wording implies the child has a standalone login (the legacy has NO
student role — the `/student/*` area IS the family login; `roles.config.json` lists 3 roles, `student` only
under `supportedFutureRoles`).

**Why this priority**: The current product ships a "change your password" gate on `student-profile.html` for a
login that does not exist (G-03; `app/src/js/fixtures/portal.js` `passwordChange`). A password affordance
implies an account the child does not have — a role-model wart that 043 must direct removal of.

**Independent Test**: The child-view built pages contain no password/account affordance and no guardian contact.
(Falsified by MUT-3 — re-adding the child password gate.)

**Acceptance Scenarios**:

1. **Given** `student-profile.html` / `.en`, **When** searched for a password-change gate or any account
   control, **Then** none is present (the gate is directed for removal; see `child-view-account-boundary.md`).
2. **Given** any child-view page, **When** searched for guardian phone/e-mail or another child's data, **Then**
   none is present — only the fam1 child's own learning/session data renders.
3. **Given** the child-view shell copy, **When** read, **Then** no phrase implies a standalone student login or
   session; the framing is «عرض الابن» (a view of the child within the family journey).

---

### User Story 3 — Secrets and credentials never render (Priority: P1)

An admin opens Settings › Integrations and Security. Every sensitive provider field is a structure-only row
(label + required + purpose, no value slot). There are zero `type=password` inputs, zero `type=file` inputs,
zero raw card numbers, zero saved-key table columns, zero shared-OTP destination, and zero plaintext
password/reset UI anywhere in the 115 pages. Provider configuration is described honestly; persistence is named
as server-side (053). No impersonation is unaudited; no free-form external shortcut URL is stored.

**Why this priority**: The legacy rendered Zoom credentials + a raw PAN on the teacher form (S-01), an admin
password as `type=text` with no old-password check (S-02, pixel-verified: `Eslam Essam` /
`eslammekky@gmail.com` on the profile edit), 15 plaintext provider credential inputs + 2 real `type=password` +
saved keys printed as columns (S-04), and one shared OTP for all admins (S-07). None may be reproduced.

**Independent Test**: `grep '<input[^>]*type="password"' public/*.html` → 0; same for `type="file"` and
`<canvas>`; the provider block renders structure-only rows with no value slot. (Falsified by MUT-5.)

**Acceptance Scenarios**:

1. **Given** all 115 built pages, **When** searched for `type=password` / `type=file` / raw PAN / saved-key
   columns, **Then** zero matches (already true at baseline; 043 freezes it as a standing refusal).
2. **Given** `settings.html#view=integrations`, **When** rendered, **Then** the sensitive provider fields are
   documentation rows with no editable value slot; PayPal/Payoneer default Sandbox, not Live.
3. **Given** `settings.html#view=security`, **When** rendered, **Then** 2FA is a structure row + honest Enable
   gate with **no** `otp` destination field (the shared-OTP defect is refused, RJ-30).

---

### User Story 4 — A directly-fetched page leaks nothing (Priority: P1)

With no authentication, every static page is world-readable. Even so, fetching any page directly by URL yields
no sensitive data the requester should not receive: portal pages never link to an admin route; teacher bodies
carry zero pay and zero guardian-contact tokens; no single-family surface bakes another family's data; wording
states plainly that real access control is a backend responsibility not yet built.

**Why this priority**: The frontend-enforceable guarantee IS this one — "hiding a link is not authorization"
means the guarantee has to be data-absence, not link-hiding (C01-27/C03-13/C15-18; the legacy proved role
isolation 4× by redirect, which we cannot reproduce without a backend).

**Independent Test**: Enumerate hrefs across all portal pages → no admin destinations (existing guard M-8);
teacher/family/child bodies carry no pay/guardian-contact/cross-family tokens.

**Acceptance Scenarios**:

1. **Given** any `teacher-*` / `family-*` / `student-*` portal page, **When** its outbound links are
   enumerated, **Then** none targets an admin route (`portals.html→dashboard.html` and the admin exempt board
   `teacher-performance.html` are not portal pages).
2. **Given** `family-portal.html` / `family-child.html`, **When** rendered, **Then** only the fam1 persona
   («أبو سلمان الغامدي») appears; no other guardian's name/contact is baked.
3. **Given** any page's honest-gate copy, **When** read, **Then** it says a capability is available once the
   server is connected — never that authorization/authentication is already enforced.

---

### User Story 5 — Parent-contact permissions are deny-by-default and teacher-unreachable (Priority: P2)

The staff RBAC preview names an explicit, separate set of parent-contact permissions — `view guardian phone`,
`view guardian e-mail`, `export guardian contacts`, `use guardian contact for approved communication`,
`reveal full value from a masked admin view` — every one DENY by default, never "all granted", and structurally
unavailable to any teacher role or teacher-visible surface. The UI describes the policy honestly and states that
real enforcement is a backend responsibility.

**Why this priority**: Our own product's biggest policy gap is that `PERM_GROUPS` has **no parent-contact row
at all** (G-01) — the single most important privacy control in the legacy 170-list is unrepresented. **Spec 043
itself owns** adding the deny-by-default parent-contact rows to the existing RBAC preview host during its own
implement phase (not a later spec). (P2 because it is a structure-only registry addition on an existing host,
not a day-one anti-poaching leak like P1 — but it is 043-owned foundation, not deferred.)

**Independent Test**: The staff-management fixture's parent-contact permission rows all render deny-by-default
and never on a teacher-visible surface. (Falsified by MUT-6 — flipping a privacy grant to default true; MUT-2 —
granting parent-phone to a teacher.)

**Acceptance Scenarios**:

1. **Given** the ratified permission taxonomy, **When** the parent-contact rows are inspected, **Then** each
   defaults DENY and none is grantable to a teacher role.
2. **Given** the staff RBAC preview, **When** it renders these rows, **Then** the copy states enforcement is a
   backend responsibility — it never claims the grant is enforced.

---

### User Story 6 — Certificate delivery cannot expose a minor (Priority: P2)

Certificate generate/preview/send/download stay honest gates. There is no "Send to group" channel, no named
child certificate in a shared group, and no minor data in a URL query string. Any real delivery is private,
per-guardian, opt-in — a backend responsibility (053).

**Why this priority**: The legacy `Send group` option pushed a named child's certificate into a shared WhatsApp
group (P-06/N-2), and the preview URL carried `student_name=` in a shareable query string opened via
`window.open` (P-07/N-3) — both verified in `management-certificate-requests.html`. Both are permanent refusals.

**Independent Test**: `certificates.html` Send is a bare backendRequired gate with no channel/recipient control;
0 `window.open`, 0 `.pdf`, no `student_name=` query param anywhere. (Falsified by MUT-7.)

**Acceptance Scenarios**:

1. **Given** `certificates.html#view=requests`, **When** Send is examined, **Then** it is a gate with no group
   option and no recipient picker.
2. **Given** any built page, **When** hrefs are scanned for a minor's data in a query string, **Then** none is
   present.

---

### Edge Cases

- **A masked admin view still hides more than it shows.** Where a role should receive NO value at all, masking
  is insufficient — the requirement is DENY (data absent from the DOM), not CSS/`hidden` concealment. Masking
  (partial reveal) is reserved for a role that is entitled to a masked identifier and nothing more.
- **A future connection-health view.** If one is ever built it is admin-only, counts + masked identifiers only,
  no full phone/e-mail, no live invite URL, no username dump, no minor record — and 043 does not build it now
  (`privacy-safe-connection-health.md`). Default page/menu counts are unchanged.
- **An UNKNOWN evidence surface.** Where the corpus cannot decide an audience (login UI, staff-category
  semantics, room-recording player, monthly-plan approver), the decision stays `UNKNOWN_EVIDENCE` — never
  manufactured from convenience (`unknown-evidence-and-stop-register.md`).
- **A directly-fetched admin page.** With no auth, an admin page is world-readable — this is the DESIGNED demo
  state, stated honestly. The frontend guarantee is that portal/child surfaces bake no sensitive data; the
  admin console's own protection is `FUTURE_BACKEND` (real login + route enforcement).

---

## Requirements *(mandatory)*

### Functional Requirements — Role visibility & anti-poaching (frontend-enforceable NOW)

- **FR-001**: The specification MUST publish a **role-visibility matrix** (`role-visibility-matrix.md`) with a
  cell for every (role × data-class) pair drawn from 8 roles (platform admin, academy admin, staff/operator,
  reception/advisor, teacher, guardian/family, student child-view, public/unauthenticated) and the 15 data
  classes listed in `sensitive-data-classification.md`. Every cell MUST be exactly one of `ALLOW`, `MASKED`,
  `DENY`, `CONDITIONAL_BACKEND`, `STRUCTURE_ONLY`, `UNKNOWN_EVIDENCE`. No cell may say "based on permissions"
  without naming the permission and its default.
- **FR-002**: The matrix MUST set every teacher cell for guardian phone, guardian e-mail, student private
  phone/e-mail, home address, and lead/prospect contact to `DENY`. Country/locality is `DENY` on teacher
  surfaces unless the audit proves it is necessary to teach an assigned student (it is not — A-02).
- **FR-003**: The **anti-poaching contract** (`anti-poaching-contract.md`) MUST freeze, as absolute negative
  requirements: teacher never sees guardian phone/e-mail; teacher never sees student private phone/e-mail/
  address; teacher never sees unnecessary country/locality; teacher never sees lead/prospect contact; teacher
  never receives Left/Acquired Students attribution; teacher sees only the minimum learning identity needed to
  teach assigned students; no export/copy/share control exposes hidden contact data; no contact value exists in
  DOM, fixtures, data-attributes, query strings, drawer payloads, or hidden panels; DENY (data absence) is
  required wherever the role should receive no value — CSS hiding is never accepted.
- **FR-004**: The specification MUST require that **no teacher-facing permission can grant parent-contact
  visibility** — the grant is structurally unavailable to teacher roles, not merely defaulted off.
- **FR-005**: Admin-only attribution (e.g. a Left/Acquired signal), IF ever retained, MUST require an evidenced
  operational purpose recorded in the RBAC register, MUST NOT expose pay, and MUST NOT be teacher-visible; until
  an operational purpose is proven it is EXCLUDED (safe default, `rbac-and-capability-model-decision-register.md`
  OQ-2).

### Functional Requirements — Parent-contact permissions (deny-by-default policy)

- **FR-006**: The specification MUST define five explicit, separate parent-contact permissions
  (`parent-contact-default-deny-contract.md`): (a) view guardian phone; (b) view guardian e-mail; (c) export
  guardian contacts; (d) use guardian contact for approved communication; (e) reveal full value from a masked
  admin view. Each defaults **DENY**. "All granted" is forbidden. Teachers cannot receive any. Family/student
  roles cannot receive cross-family grants.
- **FR-007**: The frontend MUST describe this policy without claiming enforcement exists; real enforcement is
  `FUTURE_BACKEND`. The RBAC model decision (named roles vs per-member overrides vs hybrid) MUST be made
  explicitly — **decision: named roles + explicit per-member exceptions, backend-required enforcement**
  (`rbac-and-capability-model-decision-register.md` OQ-1) — never left ambiguous.

### Functional Requirements — Teacher capability model

- **FR-008**: The specification MUST rule on the four legacy teacher capabilities `can_chat`, `can_see_library`,
  `can_edit_schedule`, `can_edit_class` and the notification-channel preferences, separating **academic
  capability** (`can_see_library`, `can_edit_schedule`, `can_edit_class`), **communication capability**
  (`can_chat`, notification channels), **privacy-sensitive capability** (none of the four grants parent
  contact — that is a separate, teacher-unreachable class), and **backend enforcement** (all four are
  `FUTURE_BACKEND` — an authz model, not a form today: P-20 shows 0 of 4 teacher + 0 of 2 family controls
  exist). No capability toggle may imply real enforcement in a static frontend.
- **FR-008a** (correction — C02-04/C02-05 frontend-now deliverable): C02-04 and C02-05 are Spec-043
  **primary-owned MISSING** rows, so 043's own implement phase MUST deliver an actual frontend-now outcome, not
  a vague deferral. **Decision**: a **structure-only teacher-capability + notification POLICY preview** rendered
  on the **existing** admin teacher surface, reusing the existing display-only row pattern (the `staff.js`
  `permDrawer` / settings `structRow` precedent) — **no new 044 component**. It (a) separates academic from
  communication capabilities; (b) implies **no** enforcement (structure-only, like the display-only RBAC
  matrix); (c) grants **no** guardian contact (parent contact is the separate teacher-unreachable class);
  (d) renders notification channels as routing rows that **do not claim delivery**, with the `salary_*` row
  **EXCLUDED** (pay-free); (e) leaves real authorization + delivery to `FUTURE_BACKEND`/053. If evidence during
  planning proves a new 044 host unavoidable, 043 still **freezes the content/data interface and implements the
  policy registry + tests**, leaving only host presentation to 044 — the capability outcome is never left
  unimplemented. Full decision: `rbac-and-capability-model-decision-register.md` §"C02-04/C02-05 deliverable".

### Functional Requirements — Role isolation & direct fetch

- **FR-009**: The specification MUST state the correct role landing destination, the role-shell boundary, the
  no-cross-role-links rule, the no-cross-family-fixture-data rule, and the no-sensitive-data-in-world-readable-
  pages rule (`direct-fetch-and-role-boundary-contract.md`), with honest wording that backend enforcement is
  absent. "Hiding the sidebar link" is never accepted as authorization.
- **FR-010**: The current frontend-enforceable guarantee MUST be stated verbatim: **even if a static page is
  fetched directly, it contains no sensitive data the requester should not receive.** Real direct-route denial
  is `FUTURE_BACKEND`.

### Functional Requirements — Child-view account boundary

- **FR-011**: The specification MUST direct: the child-view is not an adult account; **remove the child-view
  password-change gate** (G-03); no admin/guardian account controls; no guardian private data; no
  cross-child/family data; only the child's own learning/session information; no wording implying a standalone
  student login unless real auth later provides one (`child-view-account-boundary.md`).

### Functional Requirements — Secrets, credentials & auth refusal

- **FR-012**: The specification MUST freeze as standing security refusals
  (`credentials-secrets-and-auth-refusal-register.md`): 0 rendered stored secrets; 0 credential values; 0 raw
  PAN; 0 `type=password`; no saved-key table columns; integration configuration stays structure-only; no shared
  OTP destination; no plaintext password/reset UI; no unaudited impersonation; no free-form external shortcut
  URL (an in-app route allowlist only if a shortcut is ever built). Enumerate every applicable RJ / S row.
- **FR-013**: Real authentication, session lifecycle, password change/reset, impersonation-with-audit, bot
  protection, and secret storage MUST be recorded as `FUTURE_BACKEND` and MUST NOT be simulated. No frontend
  behavior may claim any of them exists.

### Functional Requirements — Presence, audit & room-link exposure

- **FR-014**: The specification MUST make explicit audience decisions for: "Student Enter At" / "Teacher Enter
  At" (presence timestamps), "Added by" / audit actor identity, presence timelines, class direct links,
  student/teacher/admin room links, copy-link permission, and per-timezone affected-account counts
  (`presence-audit-and-room-link-visibility.md`). Where evidence cannot decide an audience, the decision stays
  `UNKNOWN_EVIDENCE`. 054 owns the room lifecycle; 055 owns propagation; 043 owns the visibility constraint.

### Functional Requirements — Certificate delivery & connection-health privacy

- **FR-015**: The specification MUST freeze (`certificate-delivery-privacy.md`): "Send to group" rejected
  permanently; no named child certificate in a shared group; private per-guardian delivery only; explicit
  guardian opt-in required by future backend; no minor data in URL query strings; generate/preview/send/
  download remain honest gates without a backend; delivery transport remains 053-owned.
- **FR-016**: IF a connection-health view is specified (`privacy-safe-connection-health.md`), it MUST be
  admin-only, counts + masked identifiers only, with no full phone, no e-mail, no live group invite URL, no
  username dump, no minor record, no provider secret, no copied legacy PII; integration behavior remains
  053-owned. **Decision: 043 implements only the privacy CONTRACT for such a view; it does not build a standalone
  route now** — page/menu counts stay unchanged, no route is invented without evidence.

### Functional Requirements — Staff-category & login/public UI (no-invention holds)

- **FR-017**: Staff-category semantics (U-01/UK-25) MUST remain `UNKNOWN_EVIDENCE`; the current invented
  category/scope model MUST NOT be expanded; a stop condition MUST prevent further implementation until backend/
  domain confirmation, a fresh capture, or an explicit user decision (`unknown-evidence-and-stop-register.md`).
- **FR-018**: The login/register/reset/public UI (C15-01/UK-01) MUST remain `UNKNOWN_EVIDENCE` — the crawler ran
  authenticated, so no such page was ever captured. The specification MUST NOT design a login UI from
  imagination; it defines only the security requirements, the future-backend ownership, and the honest frontend
  boundary, and MUST NOT claim auth/session enforcement exists.

### Non-Functional Requirements (privacy / security posture)

- **NFR-001**: **Zero real corpus PII** in `src/` or `public/` (I-01): the crawl tokens (`eslammekky`,
  `01154859653`, `441200480244`, `201278910727`, `chat.whatsapp.com`, `ui-avatars`, `afaaqonline`,
  `201508604112`, `abod11`, `msadeqx9`, `aboda155502`, `alaashapan1996`) MUST remain 0 hits.
- **NFR-002**: **Zero external hosts** in any built page (I-02) — only `http://www.w3.org` SVG-namespace
  literals. No avatar CDN, no analytics, no invite URL.
- **NFR-003**: The Spec-041 R-2 (a11y `critical=0 serious=0` hard gate) and R-3 (console-error hard gate) MUST
  remain untouched and unweakened; the PAY28 teacher pay-free regex, family zero-pay, child-view, no-secret,
  no-fake, and ROUTES_50 asserts stay byte-verbatim (`protected-test-and-mutation-register.md`).
- **NFR-004**: All existing preservation rows (I-01…I-06, the B-4.* anti-poaching family) MUST be re-asserted
  post-change; regression = review failure (`preservation-and-rejected-behaviour-register.md`).

---

## Frontend / Backend Boundary

Full split: `frontend-now-vs-future-backend.md`. Summary:

- **A. Frontend-enforceable NOW**: omit protected data from fixtures and DOM; remove unsafe child-view
  affordances; deny-by-default authored permission states; structure-only secret rows; masked admin-only
  previews where justified; role-specific route/link inventories; honest backend-required wording; absence
  assertions and mutation tests.
- **B. FUTURE_BACKEND (never claimed to exist)**: authentication; session lifecycle; direct-route denial; real
  RBAC; per-member grants; field-level authorization; secret storage; password change/reset; impersonation with
  audit; consent; rate limiting / bot protection; secure room-link authorization; delivery authorization;
  tenant/family row-level isolation.

**No frontend behavior may claim B exists.** (`contracts/future-spec-dependency-contract.md` §6.2.)

---

## Mandatory Spec-043-owned implementation outcomes (Wave 0 — for 043's own plan/tasks/implement)

Spec 043's own `/speckit.plan` → `/speckit.tasks` → `/speckit.implement` MUST deliver at least the following.
None may be deferred to a dependent spec; each ships with its Spec-043-owned executable guard + falsifying
mutation executed RED→GREEN on an isolated copy, residue 0. This current specify phase writes 0 application
bytes; these are 043's own downstream phases, not later specs.

1. **Child-view account correction** — remove `passwordChange` from `STUDENT_PAGES.profile.gates`
   (`portal.js`), **student-profile ONLY** (family-profile + teacher-profile gates untouched); the declared
   smoke supersession (`student-profile plannedBackend 3→2`; `expPlanned 'student-profile' 3→2`); **MUT-3
   RED→GREEN**, 0 residue. NOT deferred to Spec 047 (which later reviews the already-correct child-view and must
   preserve this rule). `child-view-account-boundary.md`.
2. **Parent-contact deny-by-default foundation** — an actual frontend policy substrate on the **existing** staff
   RBAC preview host: the parent-contact permission rows (view guardian phone/e-mail, export guardian contacts,
   approved contact use, reveal-from-masked), all default **DENY**, never "all granted", structurally
   teacher-unreachable, with honest "backend enforcement does not yet exist" copy; **no new fake permission
   engine**; reuse the existing RBAC preview/fixture/host (do not wait for 044). **MUT-2 + MUT-6** owned +
   executed by 043. `parent-contact-default-deny-contract.md`.
3. **Global privacy absence guards** — the baseline tests that freeze the current safe product (G1–G14:
   teacher-contact absence, teacher-fixture no-locality, teacher-unreachable grants, family isolation,
   child-view no-account, portal no-admin-links, sitewide no-real-PII, no live WhatsApp URL, no credential value
   slot/PAN, deny-by-default privacy rows, no certificate group delivery, no minor-in-query-string, honest
   backend wording). **Implemented by 043 now — green before any dependent spec begins Gate-3 integration.** Each
   new guard ships its 043-owned falsifying mutation. `protected-test-and-mutation-register.md`.
4. **Teacher-capability + notification policy** (FR-008a) — the structure-only teacher policy preview on the
   existing admin teacher host; academic vs communication separated; no enforcement/delivery claim; `salary_*`
   excluded; no guardian contact. 043-owned. `rbac-and-capability-model-decision-register.md`.
5. **Existing-safe-surface freeze** — for frontend-now requirements already true at baseline (connection-health
   absent, certificate group delivery absent, secrets structure-only, no external host/PII, safe role/link
   inventories), the *implementation* is the **executable guard + its mutation proof** — "already safe" is not
   "no implementation." `preservation-and-rejected-behaviour-register.md`.

---

## Explicit Exclusions

- 043 does NOT build the 044 permission-matrix / modal / long-form host, teacher/family/child page redesigns
  (045–047), the time-zone/DST host (050), community/moderation (051), privacy-safe recognition (052),
  transport/integrations/secrets persistence (053), room lifecycle (054), real cross-role propagation (055), or
  the final field-level form audit (056). These are secondary dependencies, consuming 043's rules
  (`cross-spec-handoff-register.md`).
- 043 does NOT silently absorb any row owned by 044–057 (`owned-row-reconciliation.md` §"foreign rows NOT
  absorbed").
- 043 does NOT create a generic "Privacy Center" page. Policy and controls fold into existing
  staff/settings/profile/teacher/family/student surfaces (`count-route-and-impact-contract.md`).

---

## Unknowns (retained `UNKNOWN_EVIDENCE` — never invented)

`unknown-evidence-and-stop-register.md` holds the full list with stop conditions. Owned by 043: C12-19/UK-20
(login-as/impersonation — zero C12 evidence), C15-01/UK-01 (login/register/reset/public UI — never captured),
U-01/UK-25 (staff-category semantics), UK-18 (partial-matrix rendering inferred, not observed), and the
audience-undecidable parts of U-02/UK-08 (who may copy a room link) and U-03/UK-26 (presence/audit exposure)
where the corpus cannot decide.

---

## Assumptions

- The named-roles-vs-per-member RBAC model is genuinely open in the corpus (UK-43: the legacy has no named
  roles, only per-member flat grant lists). 043 records the decision (named roles + per-member exceptions,
  backend-enforced) as a design decision, not as legacy fact.
- The current product already introduces zero privacy/security regressions
  (`privacy-and-sensitive-data-findings.md` verdict); 043 freezes that posture and closes the one policy gap
  (G-01 parent-contact permissions) and the one role-model wart (G-03 child-view password gate). **Both closures
  are implemented and tested by Spec 043's own implement phase (Wave 0), before any dependent spec reaches Gate
  3** — they are 043-owned foundation, not deferred to 045–056.
- Personas stay authored demo fixtures (st1/fam1/sara) until real auth (`FUTURE_BACKEND`).

---

## Dependencies

- **Consumes**: Spec 042 ratified contracts (this register set is authored on them); the 10 owned cluster
  audits + evidence-path registers; the three law registers (preservation / rejected / unknown); the
  cross-role propagation map (N-1…N-7, P-20/P-21/P-22).
- **Consumed by (Gate-3 obligations, `cross-spec-handoff-register.md`)**: 045–050 (each protected-data page
  merges only after the applicable 043 frontend protection is implemented and verified); 051 (`can_chat` gate
  model + safe audiences); 052 (audience-scoping); 053 (structure-only secrets, private certificate delivery,
  connection-health privacy contract); 054 (role/session/time-scoped room links, presence-of-minors visibility);
  055 (audit-actor identity, DST account-count scoping, cross-role propagation obeying 043's refusals); 056
  (field-level audit respecting 043's omit/structure-only field families).
- **FUTURE_BACKEND (post-057)**: authentication, authorization, sessions, password, impersonation-with-audit,
  reCAPTCHA, secret storage.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The role-visibility matrix has **0 ambiguous cells** — every (role × data-class) cell is one of
  the six allowed dispositions, and every `CONDITIONAL_BACKEND` cell names a permission and its default.
- **SC-002**: **17 of 17** owned rows are reconciled with a disposition + a frontend-now/future-backend split +
  a destination; **0** foreign rows are absorbed.
- **SC-003**: The teacher anti-poaching law is stated as **absolute** (guardian/student contact, locality, lead
  contact, Left/Acquired attribution = DENY on every teacher surface) with **0** exceptions and no
  teacher-reachable parent-contact grant.
- **SC-004**: All **5** parent-contact permissions are specified DENY-by-default and teacher-unreachable; the
  RBAC model (named roles + per-member exceptions, backend-enforced) is unambiguous.
- **SC-005**: Every new guarantee has a paired falsifying mutation planned (≥ the 10 mandated) on an isolated
  copy; **0** protected assertions weakened (ROUTES_50, R-2, R-3, PAY28, family zero-pay, child-view, no-secret
  stay byte-verbatim).
- **SC-006**: Page/route/count expectation is unchanged: **115** HTML · **57** PAGES · **50** menu ·
  **24/25/1** · **49/0/1** · `FUTURE_ROUTES {}` · sole lock `classSalaryReport` · orphan pair unchanged. If
  evidence forced a standalone page, the impact would be reported before authoring — it did not.
- **SC-007**: Every applicable RJ row (RJ-11, RJ-13, RJ-19, RJ-21, RJ-22, RJ-26, RJ-30, RJ-33, RJ-36, RJ-38,
  plus all other privacy/security RJ rows reached through owned evidence) is captured as a negative requirement
  with its guard; **0** RJ re-proposals.
- **SC-008**: Every `FUTURE_BACKEND` requirement is honestly gated; **0** wording claims backend authorization/
  authentication/enforcement exists (no-fake authorization law).

---

## Stop Conditions

The specify phase (and any later phase against this spec) MUST STOP and report if any of the following occurs:

1. Any wording implies backend authorization/authentication/session enforcement exists.
2. Any rendered guardian/teacher contact value becomes reachable by an unauthorized role surface.
3. A standalone page proves necessary (would change 115/57/50/24-25-1 or `FUTURE_ROUTES`) — report the
   page/count/route impact **before** authoring that decision (none was needed).
4. An `UNKNOWN_EVIDENCE` row is resolved by inference instead of new evidence.
5. A REJECTED_* / NEVER row is re-proposed.
6. A preservation row (I-01…I-06, B-4.*) would regress.
7. A protected test (ROUTES_50, R-2, R-3, PAY28, family zero-pay, child-view, no-secret) would be weakened
   without a declared supersession + mutation proof.
8. Any `app/**`, test, public HTML, or package file is edited during specify.
9. A Ponytail simplification would remove/narrow a privacy, security, form, test, mutation, or screenshot
   requirement (Ponytail may only simplify HOW a later implementation is built, never shrink an evidenced
   requirement).

---

## No-Fake Claims (binding)

- No live WhatsApp invite URL. No real phone/e-mail. No teacher pay/contact harvesting. No group delivery of
  minor records. No cleartext secrets. No shared OTP. No fake login-as. No fake reset-password success. No fake
  authorization. No CSS-only hiding claimed as security. (Enumerated with guards in
  `preservation-and-rejected-behaviour-register.md`.)

---

## Exact Count / Route Expectation

`count-route-and-impact-contract.md` is authoritative. Default and frozen: **115** public HTML · **57** PAGES ·
admin menu **50** · routes **24 deep / 25 plain / 1 disabled** · **49** implemented / **0** planned / **1**
disabled · `FUTURE_ROUTES = {}` · sole honest lock `classSalaryReport` · gallery orphan pair unchanged. 0 new
page bases. Policy + controls fold into existing tabs/drawers.

---

## Downstream Gate-3 Obligations for 045–056

`cross-spec-handoff-register.md` is authoritative. **The 043 frontend foundation (child-view correction,
parent-contact registry, global privacy guards, teacher-capability policy, existing-safe freeze) is IMPLEMENTED
AND TESTED by Spec 043's own implement phase in Wave 0.** Downstream then: a 045–050 page that handles protected
data consumes that already-implemented foundation, preserves its global guards unchanged, and MAY NOT merge
until it has proven — with page-local tests — that its own new/changed surface complies (a 043 rule ratified is
Gate 1; the 043 foundation implemented is what makes Gate 3 reachable; the page's own compliance is the page's
Gate-3 duty). 051 consumes the `can_chat` model + safe audiences; 052 the audience-scoping; 053 the
structure-only-secrets + private-certificate-delivery + connection-health-privacy contracts; 054 the
role/session/time-scoped room-link + presence-of-minors rules; 055 the audit-actor-identity + DST-count-scoping
rules and must obey N-1…N-7; 056 the omit/structure-only field families. No downstream spec is the primary
implementation owner of a 043 closure, and none may weaken or replace a 043 test. 043's own real *authorization*
(class C) stays `FUTURE_BACKEND`.

---

## Artifact index (this feature directory)

1. `spec.md` (this file) — prioritized stories, acceptance scenarios, FR/NFR, boundary, exclusions, unknowns,
   success criteria, stop conditions, count expectation, downstream gates.
2. `targeted-visual-grounding.md` — the grounding trace + honest reopen counts (screenshots opened as images,
   JSON/raw-HTML/source read).
3. `owned-row-reconciliation.md` — the 17 owned rows: disposition · frontend-now/backend-later · destination;
   foreign-row non-absorption proof.
4. `current-rendered-data-exposure-inventory.md` — what sensitive-class data renders today, where, file:line.
5. `role-visibility-matrix.md` — 8 roles × 15 data classes, one of six dispositions per cell.
6. `sensitive-data-classification.md` — the 15 data classes with definitions and sensitivity tiers.
7. `anti-poaching-contract.md` — the absolute teacher negative-requirement set.
8. `parent-contact-default-deny-contract.md` — the 5 parent-contact permissions, deny-by-default,
   teacher-unreachable.
9. `frontend-now-vs-future-backend.md` — the A/B split matrix.
10. `direct-fetch-and-role-boundary-contract.md` — landing, shell boundary, no cross-role links, honest wording.
11. `child-view-account-boundary.md` — child-view is not an adult account; password-gate removal directive.
12. `privacy-safe-connection-health.md` — the connection-health privacy contract (contract only, no route).
13. `certificate-delivery-privacy.md` — group-delivery rejected; private per-guardian opt-in; no PII in URLs.
14. `credentials-secrets-and-auth-refusal-register.md` — secrets/credentials/auth refusals with RJ/S IDs.
15. `presence-audit-and-room-link-visibility.md` — presence/audit/room-link audience decisions or UNKNOWN.
16. `rbac-and-capability-model-decision-register.md` — RBAC model + teacher capability model + open questions.
17. `unknown-evidence-and-stop-register.md` — retained UNKNOWNs with stop conditions.
18. `preservation-and-rejected-behaviour-register.md` — I-/B- preservation + RJ negative requirements.
19. `count-route-and-impact-contract.md` — the frozen counts + 0-new-page default + stop-and-report rule.
20. `protected-test-and-mutation-register.md` — additive test plan + ≥10 falsifying mutations.
21. `cross-spec-handoff-register.md` — Gate-3 obligations for 045–056 + FUTURE_BACKEND handoffs.
22. `checklists/requirements.md` — the specification-quality + adversarial-review checklist.
