# Contract: Role Portal Foundation (Spec 012)

**Status**: Binding · The shared shell + the foundation pattern. References FR-001/FR-002/FR-004/FR-005; US1–US5; research D1–D5; data-model §1–2, §4–5.

## 1. The shared portal shell (one component, three accents)

`portal-shell.js` renders: a warm sticky header — brand medallion + portal name (`prt.*`), role-identity chip, persona greeting, language/theme controls (the EXISTING `data-action="lang-menu"`/`"theme-menu"` hooks, reused verbatim), and a labeled demo role-switch link to `portals.html` — above a single-column `main#page > #page-body`. Root carries `class="portal-shell" data-role="student|family|teacher|hub"`; the role attribute drives accenting from EXISTING palette tokens. The shell MUST NOT contain `.app-shell`, `.nav-rail`, `.nav-panel`, or admin topbar/crumb markup. The three portals and the hub all use this one shell.

## 2. Foundation pages

Three page pairs (`student-portal`, `family-portal`, `teacher-portal`) + the hub pair (`portals`), registered in the generator with `shell: 'portal'`, `activeId: null`; the admin render path is untouched. Each portal compiles exactly its spec.md "Foundation Composition" — no more (deep-dashboard restraint) and no less (every listed preview section + planned card present). Personas: st1 (∈ fam1) / fam1 / sara — cross-portal coherent.

## 3. Honesty rules

Every number fixture-authored or a sanctioned row count (no computed scores). Every control one of: real link to an existing page · demo toast · confirm→demo · labeled planned/disabled. Planned cards carry labeled availability (icon+text, never color-only). Each portal ends with the honest owning-spec note (013/014/015). No fake login, join, chat, upload, or payment affordance anywhere.

## 4. Visual direction (binding qualities)

Warm/soft/friendly, card-based, mobile-first single column, low density, minimal tables (student portal: zero tables), generous spacing, role-accented — visually distinct from the admin console while sharing token/brand quality. Student = bright-not-childish; family = calm/trustworthy; teacher = organized/fast-daily.

**Acceptance (binding):**
1. **Given** any portal page, **When** inspected, **Then** the portal shell renders with the correct role accent and ZERO admin shell markup.
2. **Given** each portal, **When** its sections are enumerated, **Then** they match the binding composition exactly, personas resolve to st1/fam1/sara, and every control passes the honesty classes.
3. **Given** the four new pairs, **When** built, **Then** they are complete static HTML readable with JS disabled.
