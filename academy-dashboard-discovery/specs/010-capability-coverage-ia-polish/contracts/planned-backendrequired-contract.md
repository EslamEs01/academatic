# Contract: Planned / Backend-Required Honesty (Spec 010)

**Status**: Binding · The truthfulness sweep — verify, never fake. References FR-017; US7; SC-009; data-model §10.

## 1. The register (verify-only — Spec 010 adds/removes nothing)

- 20 planned nav items: «قريبًا»/"Coming soon" `<button>`, no route, no navigation.
- 7 disabled finance items (six billing + banks): lock icon, `aria-disabled`, visible truthful reason (`nav.reason.finance`), no navigation — regrouped by the nav contract but state-identical.
- 9 Spec 009 finance planned/backendRequired cards: availability chip, inline reason + tooltip, zero figures, never `<a>`.
- Spec 008 planned report cards: same modality, unchanged.
- 3 future-role portals: never rendered (existing smoke absence checks stay).

## 2. Sweep assertions (smoke)

For every planned/disabled nav item across both languages: activating it navigates nowhere and mutates nothing; disabled items expose reason via the existing disabled-with-reason mechanism; planned items show the soon label. For the card sets: counts (9 finance / Spec 008's set), chips present, zero digits on finance planned cards (existing Spec 009 assert stays). Nothing anywhere converts a planned/backendRequired surface into a working link (link crawl cross-check).

## 3. Copy rule

Any reason/soon copy touched by polish stays schedule-free and truthful (no "coming soon!" hype, no fake progress, no implied dates) — the Spec 009 copy precedent.

**Acceptance (binding):**
1. **Given** every planned/disabled item on every page, **When** activated, **Then** location is unchanged and DOM state unmutated, with the honest label/reason visible.
2. **Given** the planned/backendRequired card sets, **When** counted and inspected, **Then** counts, chips, reasons, and figure-free status all match their owning specs.
3. **Given** the whole app, **When** the sweep completes, **Then** zero planned/backendRequired surface behaves as implemented.
