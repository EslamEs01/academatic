# Contract: Page Coverage Audit (Spec 010)

**Status**: Binding · The 20-page × 10-dimension review artifact. References FR-014; US5; research D8; data-model §5–6.

## 1. Artifact

`academy-dashboard-discovery/specs/010-capability-coverage-ia-polish/page-coverage-audit.md` — one row per page base (dashboard, sessions, schedule, attendance, families, add-family, family, students, student, teachers, teacher, teacher-performance, courses, course, groups, group, reports, finance, settings, gallery) × ten dimensions: purpose clarity · content richness · link integrity · action honesty · bilingual completeness · RTL/LTR · dark/mobile safety · legacy coverage · better-than-legacy · disposition. Cell values: `pass` / `fixNow` / `future` + short note.

## 2. Disposition rules

- Every `fixNow` cell becomes a PolishAction (target file · defect · change · verification) executed within Spec 010 — **copy/empty-state/style-level only**: no new sections, no new hooks, no layout rework, no content removal.
- Every `future` cell cross-references a coverage-matrix row (nothing is verbally deferred).
- The gallery row documents its dev-only status; `index.html` is a redirect, out of audit scope (noted once).

## 3. Known seeds (from this plan's grounding — to re-verify, not assume)

- attendance: filter visibility `fixNow` (the defect — owned by filter-visibility-contract).
- All filterable pages: zero-match empty-state presence check.
- No page is currently known content-weak (all audited "rich" except the deliberately small settings shell) — the audit must confirm or correct this page by page with fresh eyes/screenshots.

**Acceptance (binding):**
1. **Given** the artifact, **When** read, **Then** all 20 rows × 10 dimensions are filled with a verdict + note, zero cells blank.
2. **Given** every `fixNow` item, **When** implementation ends, **Then** it is checked off with its verification named (smoke assert / screenshot frame / grep).
3. **Given** every `future` item, **When** cross-checked, **Then** a matrix row covers it.
