# Data Model — Spec 024 Corrections From Legacy Coverage Audit

**Date**: 2026-07-07

Spec 024 is a correction/alignment spec. It creates **no new fixture data models, no API-shaped objects, and no live data**. The "entities" below are the correction constructs the implementation manipulates — copy keys, gate descriptors, and documentation records — plus the explicit boundary of what MUST NOT be modeled.

## Entities

### 1. Child-view note (edited, not created)
- **What**: the `noteT` / `noteD` locale-key pair rendered as a `pt-note` inside child-view `#page-body`.
- **Fields**: `noteT` (string, title), `noteD` (string, description).
- **Location**: `ar.prt.js:297-298`, `en.prt.js:294` (+ rebaked mirror in `public/assets/locales/`).
- **Validation**: after edit, MUST NOT contain «لوحة الطالب» / «بوابة الطالب» / "Student Portal" / "student dashboard"; MUST use child-view/family-owned wording aligned to existing `heroSub`/`cvT`/`foldT` keys; AR and EN MUST be mirrored.
- **State transition**: Student-primary wording → child-view/family-owned wording (one-way; B-01).
- **Guard**: the FAMILY note (`ar.prt.js:387-388`, «لوحة العائلة») and TEACHER note (`ar.prt.js:446-447`, «لوحة المعلم») are DISTINCT entities and MUST remain byte-unchanged.

### 2. Honest gate (reused pattern, optionally instantiated)
- **What**: a labeled, non-interactive `backendRequired`/`planned` control (Soon-badged, `aria-disabled`, `data-disabled-reason`), or a planned non-anchor `is-planned` nav button.
- **Fields**: `id`, `labelKey`, `icon`, `status: 'planned'` OR `availability: 'backendRequired'`; `reasonKey` for the disabled reason.
- **Instances in 024**: B-03 role-shell notifications gate (reuses `data-action="notifications"` + existing `topbar.notif*` keys); B-05 teacher `library` planned nav item (reuses `is-planned` + new `prt.nav.tch.library` key).
- **Validation**: renders as a non-anchor (no `href`, or `href` to a real target only); NO fake count/read/send/enter behavior; `plannedNavAnchors===0` holds; zero `href="#"`; reuses an EXISTING `data-*` hook (no new hook).

### 3. Provenance / decision record (created as documentation)
- **What**: a text record naming an intentional exclusion, an ownership decision, or a boundary, with its governing law.
- **Fields**: subject, disposition (future-backend / owner-spec / excluded-by-law / intentional), law/evidence citation.
- **Instances**: B-02 (Locations → 031), B-04 (live-room → future-backend), B-06 (teacher chat → recorded exclusion, owner decision to 025), B-07 (pay-free exemption for the Spec 007 board), B-08 (exclusion register status), B-09 (finance boundary sentence), B-10 (moved-vs-deleted determination + family-children no-fold-link intentional).
- **Location**: `correction-scope.md`, append-only notes to `specs/023-…/{coverage-matrix,missing-capabilities-register}.md`, `specs/016-…/contracts/teacher-pay-free-global-contract.md`, `README.md`, `CLAUDE.md`.
- **Validation**: no code/UI change implied; each record cites a law or evidence path.

### 4. Hash supersession (declared baseline change)
- **What**: an intentional re-recording of the Spec 022 documented `#page-body` extraction-hash baseline for the pages B-01 (and any pinned-body B-11 row) changes.
- **Fields**: page id, language, old-baseline reference, new-baseline reason, smoke re-pin status.
- **Scope**: 5 child-view internals × 2 langs (10 of the 12 recorded 022 hashes; `student-schedule` × 2 unchanged) for B-01; any D-04/D-05/D-09 pinned body for B-11.
- **Validation**: declared (never silent); structural smoke probes re-run and unchanged (or re-pinned with a stated reason); follows the Spec 022 family-child precedent.

## Explicitly NOT modeled (forbidden)

- fake live-room / session data (B-04)
- fake notifications (counts, read/unread, feed items) (B-03)
- fake chat threads / messages / send payloads (B-06)
- any payment / invoice-amount object on family or teacher surfaces
- any teacher pay / salary / payroll figure
- any computed score / rank / percentile / chart series
- any new API-shaped object, storage key, or persistence layer

## Relationships

- A **correction item (B-NN)** references zero-or-more of the above entities (e.g., B-01 → Child-view note + Hash supersession; B-05 → Honest gate + Provenance record).
- A **Hash supersession** is triggered only by an entity change inside a pinned `#page-body` (B-01, and conditionally B-11 D-04/D-05/D-09).
- **Provenance records** never trigger a Hash supersession (documentation-only).
