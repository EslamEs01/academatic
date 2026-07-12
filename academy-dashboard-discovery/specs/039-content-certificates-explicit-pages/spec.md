# Feature Specification: Admin Content & Certificates Explicit Pages (Spec 039)

**Feature Branch**: `feature/012-role-portal-foundation` (no per-spec branch cut — project convention)
**Created**: 2026-07-11
**Status**: Specified (specification only — no plan, no tasks, no implementation)
**Input**: Spec 033 roadmap items `materials` + `certificateRequests`; "Admin Content & Certificates Explicit Pages"

## Summary

Two admin sidebar items — **Materials** («المواد التعليمية») and **Certificate Requests** («طلبات الشهادات») —
still render as «قريبًا» (planned) even though their real, honest, display-only surfaces already exist and are
reachable by URL hash: the **Materials tab** on `library.html` and the **Requests tab** on `certificates.html`
(both built in Spec 031, both deep-linkable via enhance.js `#view=` on fresh load). This is a **navigation gap**,
not a functional one.

Spec 039 completes the navigation by **unlocking two deep-links** — the proven Spec 037/038 pattern — with
**zero new pages** (count held **115**), **admin menu held 50**, and **no new behavior**. It does NOT build
standalone pages (the "Explicit Pages" roadmap title does not force duplication), does NOT reproduce the legacy
drag/PDF certificate designer or file uploads, and does NOT touch teacher/family portals. Grounded by a completed
Targeted Visual Grounding gate (16 screenshots opened; see `targeted-visual-grounding.md`) and confirmed by the
Spec 033 roadmap, which assigns Spec 039 exactly these two deep-links at count impact 0.

**Recommended architecture: Option B (deep-link to existing tabs).** Alternatives quantified in
`page-vs-fold-decision-register.md` (Option A new pages → 119, rejected as duplication; Option C leave «قريبًا»,
rejected as dishonest).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Admin reaches Materials from the sidebar (Priority: P1)

An admin clicks **«المواد التعليمية / Materials»** in the sidebar and lands directly on the Materials (subject
catalog) surface — a bilingual subject list with add/edit/delete affordances — instead of a dead «قريبًا» chip.

**Why this priority**: This is the core roadmap deliverable and the honesty fix (a built surface is currently
unreachable from the sidebar).

**Independent Test**: Load any admin page fresh in AR and EN; confirm the Materials nav item is a real link (not
«قريبًا», no `aria-disabled`, no lock) whose href resolves to `library.html#view=materials` and opens the
Materials tab on load.

**Acceptance Scenarios**:
1. **Given** the admin sidebar, **When** admin clicks «Materials», **Then** `library.html#view=materials` loads
   with the Materials tab active and the subject list visible.
2. **Given** the Materials tab, **When** admin opens Add/Edit/Delete, **Then** a real form/confirm appears and the
   final action is an honest `backendRequired` gate (no persistence, no `type=file`).
3. **Given** EN mode, **When** admin clicks «Materials», **Then** `library.en.html#view=materials` opens the same tab.

---

### User Story 2 - Admin understands and reviews Certificate Requests (Priority: P1)

An admin clicks **«طلبات الشهادات / Certificate Requests»** and lands on the request queue (student · course ·
teacher · description · date · status) with a read-only review drawer — instead of «قريبًا».

**Why this priority**: The second roadmap deliverable; the request queue is the admin side of a cross-role flow
and must be reachable to be usable.

**Independent Test**: Fresh load AR/EN; the Certificate Requests nav item resolves to
`certificates.html#view=requests` and opens the Requests tab; a request row opens a read-only review drawer; every
disposition (Approve/Reject/Generate/Preview/Download/Send) is a gate.

**Acceptance Scenarios**:
1. **Given** the admin sidebar, **When** admin clicks «Certificate Requests», **Then**
   `certificates.html#view=requests` loads with the Requests tab active and authored request rows visible.
2. **Given** a request row, **When** admin opens it, **Then** a read-only review drawer shows the request details.
3. **Given** a request, **When** admin clicks Approve/Reject/Generate/Preview/Download/Send, **Then** an honest
   gate fires — **no status mutation, no PDF, no `window.open`, no WhatsApp/email send**.

---

### User Story 3 - Admin can distinguish Materials from Library content (Priority: P2)

An admin can tell the **Material/Subject catalog** (subjects like Arabic/Math with bilingual names) apart from the
**Content Library** (files/video/images/audio/links with categories and view/download counts), each reachable from
its own honest sidebar destination.

**Why this priority**: Removes the legacy "Course/Material" ambiguity (the legacy Materials page was mislabeled
"Courses") and the mild IA blur where the Content item currently opens the Materials tab by default.

**Independent Test**: Materials nav opens the Materials tab; the Content Library nav opens the Books tab (if the
optional `books`→`#view=books` refinement is applied), or at minimum both are labelled distinctly and reachable.

**Acceptance Scenarios**:
1. **Given** the sidebar, **When** admin reads the two content items, **Then** «Materials» and «Content Library»
   are distinct labels routing to distinct tabs/surfaces.
2. **Given** the Materials surface, **Then** it presents a Material/Subject (bilingual name), never a "Course".

---

### User Story 4 - Certificate request handoff is coherent from teacher to admin (Priority: P2)

The admin review destination is reachable and its request entity (student/course/teacher/description/date/status)
is consistent with the teacher-side "Request Certificate" origin — documented, without redesigning portals.

**Why this priority**: Keeps the cross-role data contract coherent; prevents an orphaned admin queue.

**Independent Test**: The admin Requests queue is reachable (US2) and its columns match the documented handoff in
`teacher-admin-certificate-handoff.md`; no teacher/family portal file changes.

**Acceptance Scenarios**:
1. **Given** the documented flow, **When** an admin opens the Requests queue, **Then** its fields match the
   teacher-origin request contract (student/course/teacher/description/date).
2. **Given** role law, **When** teacher/family pages are inspected, **Then** no admin approval/management control
   is exposed and those pages are byte-identical.

---

### User Story 5 - Related real backend actions remain honestly gated (Priority: P1)

Every write in scope (material create/edit/delete, content upload/publish/download, category save, template
create/edit, background upload, certificate approve/reject/generate/preview/download/send) remains an honest
`backendRequired`/`data-disabled-reason` gate — no fake persistence, upload, PDF, issuance, or delivery.

**Why this priority**: The no-fake law is non-negotiable and this scope contains the highest fake-PDF/fake-send
risk in the whole system.

**Independent Test**: Grep the built library/certificates bodies for `type=file`, `type=password`, `<canvas>`,
`.pdf`/`blob:`, `window.open`, `href="#"`, raw keys, fake-success toasts → all zero; every final action is a gate.

**Acceptance Scenarios**:
1. **Given** any in-scope form/drawer, **When** the final action is triggered, **Then** an honest gate fires with
   no mutation and no success claim.
2. **Given** the certificate designer, **Then** it is a static `role="img"` preview — no `<canvas>`, no drag, no
   upload, no PDF.

---

### User Story 6 - Navigation / count / role-law / no-fake contracts remain protected (Priority: P1)

After the two flips, the page count stays 115, the admin menu stays 50, no duplicate route/page appears, locale
parity holds, and all prior protected tests (role laws, no-fake, Spec 031 honesty, finance/families/teachers/
reports asserts) stay byte-verbatim except one sanctioned behavioral repoint + one message correction.

**Why this priority**: Guards against scope creep and regression.

**Independent Test**: Build → 115; admin menu → 50; smoke PASS with exactly the declared amendments; a11y 0/0;
impact `#page-body` snapshot shows only the shared sidebar + no body changes.

**Acceptance Scenarios**:
1. **Given** the build, **Then** public HTML = 115 and admin menu = 50.
2. **Given** the smoke suite, **Then** only the declared amendments changed; all other asserts byte-verbatim.
3. **Given** the impact snapshot, **Then** `library.html`/`certificates.html` bodies + every other admin body +
   all 16 portal pages + index are byte-identical (only the shared sidebar changes).

### Edge Cases

- **Fresh-load deep-link**: a bad/unknown `#view=` falls back to the baked default tab (no error). The two
  Spec-039 hashes match existing tab ids exactly.
- **EN routing**: `sidebar.js langRoute()` is already hash-aware → EN deep-links resolve to `.en.html#view=…`.
- **Admin category now 0-planned**: the dashboard "reveal a still-planned admin item" smoke probe must repoint to
  `settings` (the only category still carrying planned items) — the single sanctioned behavioral amendment.
- **Empty queues**: authored rows populate the boards; the single global `[data-no-results]` handles filtered-empty
  (no second filterBar may be added).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The `materials` nav item MUST become `implemented` with route `library.html#view=materials`; «قريبًا»
  removed; `FUTURE_ROUTES.materials` dropped.
- **FR-002**: The `certificateRequests` nav item MUST become `implemented` with route
  `certificates.html#view=requests`; «قريبًا» removed.
- **FR-003**: Both deep-links MUST open the correct tab on fresh load in AR and EN (Materials tab / Requests tab).
- **FR-004**: Public HTML count MUST remain **115** (0 new page bases, 0 new files); `build-html.mjs` PAGES 0-diff.
- **FR-005**: Admin menu MUST remain **50** items; admin category MUST remain 5 items with **0** «قريبًا».
- **FR-006**: No other nav item MUST change (optional exception: `books`→`library.html#view=books` route
  refinement — see FR-018).
- **FR-007**: `library.js`, `certificates.js`, and all content/certificate fixtures/locales MUST be 0-diff (the
  surfaces already exist); no new page module, hook, or storage key.
- **FR-008**: Every content write (material create/edit/delete; content add/upload/publish/download; category save)
  MUST remain an honest `backendRequired`/confirm gate with no persistence/mutation.
- **FR-009**: Every certificate write (request create; approve/reject/cancel; generate/preview/download/send;
  template create/edit; background upload) MUST remain an honest gate with **no status mutation, no PDF, no
  `window.open`, no WhatsApp/email send, no issuance**.
- **FR-010**: NO `type=file`, `type=password`, `<canvas>`, `.pdf`/`blob:` asset, drag-designer, secret/credential,
  `href="#"`, raw locale key, dead button, or fake-success toast MUST be introduced.
- **FR-011**: The certificate designer MUST remain a static `role="img"` preview (no canvas/drag/upload/PDF).
- **FR-012**: NO backend/API/database/auth/websocket/network request; NO new dependency; `package.json` 0-diff.
- **FR-013**: Teacher/family library/portal pages MUST remain byte-identical (admin-only spec); no admin action
  exposed in any teacher/family surface; no role permission widened.
- **FR-014**: Locale parity (AR/EN mirrored) MUST hold; 0 raw keys; RTL/LTR correct.
- **FR-015**: Exactly the declared test amendments are permitted: (1) repoint the dashboard planned-item probe
  admin→settings; (2) correct the admin "5 planned items" message + add a `admPlanned === 0` companion assert.
  All other protected assertions MUST stay byte-verbatim; additive new asserts allowed (route/fresh-load/a11y).
- **FR-016**: Unrelated `#page-body`s (including `library.html`/`certificates.html` bodies) MUST stay
  byte-identical; only the shared admin sidebar changes (2 «قريبًا» → anchors). Proven via a non-destructive
  `#page-body` md5 snapshot.
- **FR-017**: Materials MUST be presented as a Material/Subject (bilingual name), never a "Course".
- **FR-018** *(optional refinement, recommended)*: `books` MAY be refined to `library.html#view=books` so the two
  library items open distinct tabs (0 count impact). If rejected, `books` stays `library.html`.

### Key Entities *(display-only, authored fixtures — no persistence)*

- **Material/Subject**: `{ name, name_ar }` — a bilingual subject (e.g., Arabic, Math). NOT a Course.
- **Content item (Book/media)**: `{ name, type ∈ {file,video,image,audio,link}, category, publishedAt,
  views (literal), downloads (literal), status ∈ {published,draft,archived}, thumbnail (gated) }`.
- **Content category**: `{ name, count (literal), status }`.
- **Certificate template**: `{ name, background (gated), fields (static x,y), usageCount (literal) }`.
- **Certificate request**: `{ student, course, teacher, description, date, status ∈ {pending,approved,rejected} }`.
- **Certificate (issued)**: display-only label + status; issuance is future-backend.

## Success Criteria *(mandatory)*

- **SC-001**: 100% of admins can reach the Materials surface and the Certificate Requests surface directly from the
  sidebar (0 «قريبًا» for these two items) in both AR and EN.
- **SC-002**: Public HTML count = 115 and admin menu = 50 before and after (0 delta).
- **SC-003**: 0 `type=file`, 0 `type=password`, 0 `<canvas>`, 0 `.pdf`/`blob:` asset, 0 `window.open`, 0 `href="#"`,
  0 raw locale keys, 0 fake-success toasts across the built library/certificates bodies (built-body grep).
- **SC-004**: 0 fake persistence/upload/delete/approval/generation/issuance/delivery — every final action is a gate.
- **SC-005**: Both deep-links open the correct tab on fresh load, AR + EN; no duplicate route/page created.
- **SC-006**: a11y critical = 0, serious = 0; 0 console errors on the covered frames.
- **SC-007**: All prior protected tests pass byte-verbatim except the two declared amendments; role laws (teacher
  pay-free, family zero-pay, student child-view, finance invariant) remain green.
- **SC-008**: Impact snapshot confirms only the shared sidebar changed; `library`/`certificates` bodies + every
  other admin body + 16 portal pages + index byte-identical.

## Test & Screenshot Contract (summary; full detail in `count-and-route-contract.md`)

- **Smoke**: 2 route-anchor asserts (materials/certificateRequests, AR/EN, real anchor, no aria-disabled/lock) +
  fresh-load tab-open (Materials/Requests) + admin 0-planned + admin-menu 50 + no-duplicate-route + the existing
  `a31` honesty block byte-verbatim. Declared amendments: repoint planned-item probe admin→settings; correct the
  admin "5 planned" message + add `admPlanned === 0`.
- **A11y**: (additive, optional) library `#view=materials` + certificates `#view=requests`, AR/EN light/dark,
  mobile 390, open review/create drawer; critical=0 serious=0.
- **Screenshots**: (additive) materials-tab + requests-tab AR/EN + dark + mobile 390; 0 console errors.
- **Impact**: `#page-body` md5 snapshot vs post-build — only shared sidebar differs.

## Assumptions

- Spec 038 is the committed clean baseline (verified: HEAD `4cbcb31`, tree clean, 115 pages, admin menu 50).
- The `library.html` Materials tab and `certificates.html` Requests tab (Spec 031) are complete and honest; no
  body change is needed — only nav routing.
- The Spec 033 roadmap (deep-link, count 0) and the Spec 037/038 nav-unlock precedent govern the approach.
- No per-spec git branch is cut (project convention: all specs land on `feature/012-role-portal-foundation`); the
  mandatory `before_specify` git.feature hook is intentionally not executed.
- The `books`→`#view=books` refinement is recommended but optional; plan/implementation will confirm.

## Open Questions (recommended defaults; none block specification)

1. **`books` route refinement?** Options: (A, recommended) refine `books`→`library.html#view=books` so the two
   library items open distinct tabs; (B) leave `books`→`library.html` (opens Materials by default). Effect: 0 count
   either way; A changes 1 extra nav route + 1 additive smoke assert. **Safe default: A (apply).**
2. **Add materials/certificateRequests-specific a11y + screenshot rows?** Options: (A, recommended) add additive
   rows for the two deep-linked tabs; (B) rely on existing library/certificates coverage. Effect: 0 count; A is
   additive test-only. **Safe default: A (add).**

Neither question changes the count (115), the admin-menu (50), the two required flips, or any no-fake/role law.

## Scope Boundaries

**In scope**: Spec 039 specification artifacts; the two nav deep-link flips; the optional `books` refinement;
count/test/impact contracts; the teacher→admin handoff documentation.
**Out of scope**: implementation, plan.md, tasks.md, app-source/test/HTML changes; backend/API/auth/DB; real
upload/PDF/certificate generation/WhatsApp-email delivery; payment/finance; Settings deep-links (Spec 040); final
freeze (Spec 041); teacher/family portal redesign; unrelated legacy pages; commit/push.
