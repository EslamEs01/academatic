# Visual Reference Audit (Spec 016 — design conclusions from the evidence)

Inputs: the legacy screenshot review (companion doc) · the approved-design references (`design-references/academy-dashboard.png` + `approved-dashboard/` — the Spec-001 visual target, still canonical) · the current build's 20-frame Spec-015 review plus the standing REVIEW.md record across 001–015.

## What the current build already does right (frozen, don't touch)

The approved admin shell and token system (warm-cream/violet, category rail) — proven across 40 admin files · the portal design language (rail-less warmth, role accents, `.pt-*` card rhythm) — proven across 8 portal files and three deepened homes · labeled icon+text chips everywhere · truthful empty states · honest gate vocabulary · RTL-first typography with Arabic-Indic counters · dark mode with axe-clean contrast · 390px single-column comfort.

## What legacy does that we must NOT carry (visual anti-patterns, now in the freeze's forbidden register)

Money fragments on operational surfaces (home table "(3.00 Fine)"; salary-till-today tile on teacher home) · KPI tile walls as landing content · 10–23-column ledgers · 7×24 hour grids as the only schedule view · per-row action-pill clusters · pink/alarm empty states · dual notification badges · broken-route navigation (500/404 as everyday UX) · vendor-branded footer clutter.

## What legacy does that we SHOULD carry (ideas, redesigned)

Role mini-apps with their own sidebars (→ portal shell v2) · today-first ops answers (→ already our homes' spine) · hours/attendance gauges as friendly progress (→ student/family gauges, authored) · request-trial as a first-class guardian affordance (→ requests page previews + GATE) · stage-funnel view of leads (→ 021 cards) · the notification routing matrix and RBAC matrix as *legible* admin knowledge (→ display-only matrices + GATE) · certificate designer/queue split (→ 026 preview + GATE).

## Per-surface design treatments (the "design treatment" column's vocabulary, applied)

- Ops/analysis surfaces (sessions-analysis, teachers-details, analytics): **STAT bands + labeled lists** — authored figures, no charts.
- Queues/funnels/inboxes (leads, schedule-requests, certificate queue, payouts): **stage/status cards + TILES + detail DRAWER**, actions gated.
- Catalogs (materials, library, banks, categories, integrations): **CARDS with type icons**, CRUD gated.
- Matrices (notifications, RBAC): **LINES/matrix display-only** + one GATE.
- Ledgers (invoices, expense, payroll): invoices = fixture CARDS/list with status chips (REAL, Spec-009 lineage); payroll family = **GATE shells, zero figures**.
- Schedules: admin keeps the tabbed list/timetable; role apps get AGENDA day-groups only.
- Wizards (add-teacher, trial, invoice builder): **baked step display** (add-family lineage), saves gated.

## Screenshot acceptance going forward

Every future spec keeps the screenshot-based visual acceptance: full-page AR light/dark + EN light + AR mobile for each new page family, element-scoped area frames for dense sections, unchanged-proof frames for protected surfaces, verdicts recorded in REVIEW.md against the freeze's forbidden-pattern register. The 016 freeze makes "looks right" checkable: a frame fails if it exhibits any forbidden pattern or deviates from the frozen primitives.
