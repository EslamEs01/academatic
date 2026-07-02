# Contract: Family Mobile & Accessibility (Spec 014)

**Status**: Binding · References US8/US9, SC-007/SC-008; research D11/D13.

## 1. Mobile (390px)

- Single-column calm flow at 390px; **zero horizontal overflow** — smoke probe (`scrollWidth ≤ 391`) + the full-page mobile frame.
- Five child cards stack cleanly; long Arabic names wrap (`min-width:0` on every flex row); the requests hub cards stack one-per-row.
- The page adds NO interactive targets (zero body anchors/controls), so touch sizing concerns only the shell (unchanged).

## 2. Accessibility

- axe critical=0 serious=0 on the family scenario set (AR light/dark + EN light from Spec 012, re-run against the deepened page; extend only if a new combination is needed).
- Contrast: accent-on-light text uses the ink-strength tokens (`--pt-accent-ink`) — the standing 012/013 rule; the family violet accent already maps to `--c-primary`.
- Landmarks unchanged (shell header/main/footer; skip → `#page`); sections are `<section>` with ordered real headings (h1 hero → h2 sections).
- All status/availability/outcome chips remain icon+text (never color-only); the caution note and empty state carry readable text.
- RTL: AR `dir="rtl"`; card row direction and the trio tiles verified in AR frames; EN mirrors LTR.

## Acceptance (binding)

1. **Given** the a11y run, **Then** critical=0 serious=0 across the family scenarios.
2. **Given** the smoke probe, **Then** the family page at 390px reports no horizontal overflow (both languages).
3. **Given** the AR mobile frame, **Then** visual review confirms comfortable reading — recorded in REVIEW.md.
