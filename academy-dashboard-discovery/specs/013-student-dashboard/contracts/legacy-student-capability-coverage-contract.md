# Contract: Legacy Student Capability Coverage (Spec 013)

**Status**: Binding · References FR-025, SC-009; research D2/D3/D6; the Spec-012 coverage artifact is the single source of truth.

## 1. Delivery notes (the ONLY sanctioned coverage edits)

In `specs/012-role-portal-foundation/legacy-role-capability-coverage.md`, append a delivery note to exactly these rows/items — classification scheme, destinations, and all other rows untouched:

| Item | Delivery note |
|---|---|
| **F5** (student timetable) | Delivered by Spec 013 as the week-at-a-glance agenda (SAT-first stacked day groups; guardian view remains Spec 014) |
| **F6** (class history + per-session details) | Delivered by Spec 013 as the recent-sessions feedback cards (summary + homework-note fields; real out1 anchor); the full-history surface remains planned; guardian mirror remains Spec 014 |
| **F12** (materials library) | Delivered by Spec 013 as the materials display-only preview; download backendRequired (F4 unchanged); family/teacher surfaces remain 014/015 |
| **§4 item 6** (leaderboard, net-new) | Delivered by Spec 013 as celebration recognition — unordered, authored, stress-free (research D3) |
| **§4 items 1/4/5/7/8/9** | Marked delivered by the corresponding Spec-013 sections (today-deep · progress-deep · achievements-deep · homework surface · materials surface · profile slice) |

## 2. No silent gaps

Anything the student page shows display-only that has deeper legacy behavior keeps its gate visible: uploads → F4 backendRequired (the submit mini-card) · downloads → backendRequired (the download mini-card) · full history → planned. Nothing else is reclassified; planned-014/planned-015/backendRequired/excluded rows are read-only to this spec.

## Acceptance (binding)

1. **Given** the coverage diff, **Then** ONLY the rows/items above changed, each by an appended delivery note preserving the original classification text.
2. **Given** the §4 Spec-013 list, **Then** all 9 items are delivered or carry an explicit re-deferral reason — zero silent gaps.
