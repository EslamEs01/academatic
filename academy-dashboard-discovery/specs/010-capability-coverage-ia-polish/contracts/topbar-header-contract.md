# Contract: Topbar & Header (Spec 010)

**Status**: Binding · Verify-only — the audit found topbar coverage complete; Spec 010 locks it in. References FR-011/FR-014; US3; data-model §9.

## 1. No changes

Spec 010 changes NO `titleKey`/`crumbKey` in `build-html.mjs`, no topbar markup, no search/quick-actions/notifications/profile chrome. The category relabel (D2) affects the sidebar panel title and rail tooltip only — topbar breadcrumbs are page-scoped and untouched.

## 2. Verified truths (asserted, not assumed)

- All 20 PAGES entries carry `titleKey` + `crumbKey`; both resolve in AR and EN (no raw `⟦key⟧` anywhere — existing smoke assert stays).
- Profile pages (family/student/teacher/course/group) show their own titles/crumbs while the sidebar highlights the owning list item.
- The dev gallery keeps its title/crumb and zero active nav (documented in the coverage matrix as an internal surface).

## 3. Audit record

The page audit artifact (`page-coverage-audit.md`) records per page: topbar title correct (AR/EN) · crumb correct · active nav item correct. Any mismatch found becomes a fix-now PolishAction (locale-side or PAGES-entry-side), but none is currently known.

**Acceptance (binding):**
1. **Given** each of the 20 page bases in both languages, **When** loaded, **Then** the topbar title and crumb are present, localized, and correct, and exactly one nav item is active (zero on gallery).
2. **Given** `git diff`, **When** reviewed, **Then** `topbar.js` and the PAGES title/crumb keys are unchanged.
