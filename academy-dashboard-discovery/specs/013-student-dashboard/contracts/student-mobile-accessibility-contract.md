# Contract: Student Mobile & Accessibility (Spec 013)

**Status**: Binding · References US7/US8, SC-006/SC-007; research D9/D11.

## 1. Mobile (390px, the student's primary device)

- Single-column card flow at 390px; **zero horizontal overflow** — asserted by the smoke viewport probe (`scrollWidth ≤ 391`) AND the full-page mobile frame.
- Long Arabic names/titles wrap (`min-width:0` discipline on every flex row); time chips stay tabular.
- Touch targets (theme/lang/switch) keep the shell's existing comfortable sizing; the page body adds no smaller interactive targets (it adds none at all).

## 2. Accessibility

- axe critical=0 serious=0 on ALL student scenarios (AR/EN × light/dark × desktop/mobile — the existing 012 scenario set re-run against the deepened page; extend the a11y matrix only if a new combination is needed).
- Contrast: any new accent-on-light text uses the ink-strength tokens (`--pt-accent-ink`) — the Spec-012 lesson is a standing rule; raw sky/teal never carries small bold text.
- Landmarks unchanged (shell provides header/main/footer; skip link → `#page`); new sections are `<section>` with real heading elements in order (h1 hero → h2 sections).
- Status/availability chips remain icon+text (never color-only); the empty state carries readable text, not just an emoji.
- RTL: AR page `dir="rtl"` inherited; week day order and card row direction verified in the AR frames; EN mirrors LTR.

## Acceptance (binding)

1. **Given** the a11y run, **Then** critical=0 serious=0 across the full scenario set.
2. **Given** the smoke probe, **Then** the student AR page at 390px reports no horizontal overflow.
3. **Given** the AR mobile frame, **Then** visual review confirms comfortable reading (spacing, wrap, tap targets) — recorded in REVIEW.md.
