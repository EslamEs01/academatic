# Contract: Planned / Backend-Required Portal Cards (Spec 012)

**Status**: Binding · Honest not-yet-real surfaces in the portals. References FR-005/FR-012; US2–US4/US7; data-model §4–5.

## 1. The card set (binding)

Student: homework/tasks · materials · leaderboard. Family: billing/finance · feedback meetings · subscriptions/plans. Teacher: materials/library · tasks. Each card: friendly icon, title pair, ONE honest descriptive line, labeled availability (icon+text — reusing the existing availability vocabulary where it fits; any portal-specific label set is labeled, never color-only), and a 1:1 mapping to a `legacy-role-capability-coverage.md` row (or the net-new note for leaderboard/achievements-adjacent cards).

## 2. MUST NOT

No figures on any planned card (no counts pretending to be real, no amounts EVER on the family billing card) · no navigation from a planned card to a locked/nonexistent destination · no "coming soon" hype/schedule promises (availability language only — the established copy rule) · no gateway/join/chat affordance styling that implies function · planned cards never `<a>` elements.

## 3. The owning-spec notes

Each portal ends with one honest note card: deep dashboard in Spec 013/014/015 respectively — factual, calm, no marketing.

**Acceptance (binding):**
1. **Given** the eight planned cards, **When** inspected in both languages, **Then** each shows labeled availability, zero figures, and maps to a classification row.
2. **Given** any planned card, **When** activated, **Then** nothing navigates or mutates; any reason/label is visible and accessible.
3. **Given** the three owning-spec notes, **When** read, **Then** schedule-free, honest, present on every portal.
