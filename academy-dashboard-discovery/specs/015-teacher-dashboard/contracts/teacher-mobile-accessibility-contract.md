# Contract: Teacher Mobile & Accessibility (Spec 015)

**Status**: Binding · References US9/US10, SC-007/SC-008; research D13/D15.

## 1. Mobile (390px — the between-classes device)

- Single-column cockpit flow at 390px; **zero horizontal overflow** — smoke probe (`scrollWidth ≤ 391`) + the full-page mobile frame.
- The 5-step workflow, roster cards, and day groups stack cleanly; long Arabic titles wrap (`min-width:0` on every flex row); time chips stay tabular.
- The page adds exactly ONE interactive target (the performance link) — touch sizing per the existing card affordance.

## 2. Accessibility

- axe critical=0 serious=0 on the teacher scenario set (AR light/dark + EN light from Spec 012, re-run against the deepened page; extend only if a new combination is needed).
- Contrast: accent-on-light text uses the ink-strength tokens (`--pt-accent-ink` → teal-ink) — the standing 012–014 rule; the flowStep numbers already use it.
- Landmarks unchanged (shell header/main/footer; skip → `#page`); sections are `<section>` with ordered real headings (h1 hero → h2 sections).
- All status/outcome/availability chips remain icon+text (never color-only); the empty state and gates carry readable text.
- RTL: AR `dir="rtl"`; step numbering, day ordering, and card rows verified in AR frames; EN mirrors LTR.

## Acceptance (binding)

1. **Given** the a11y run, **Then** critical=0 serious=0 across the teacher scenarios.
2. **Given** the smoke probe, **Then** the teacher page at 390px reports no horizontal overflow (both languages).
3. **Given** the AR mobile frame, **Then** visual review confirms a comfortable between-classes reading flow — recorded in REVIEW.md.
