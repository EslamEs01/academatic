# Contract: Static HTML-first & Django-ready (Spec 015)

**Status**: Binding · References FR-019; carries the Spec 001–014 architecture spine unchanged.

## 1. Static HTML-first (unchanged)

- Both teacher files are COMPLETE pre-rendered documents at build; every section baked; runtime JS builds no page DOM.
- No whole-page `#app`, no SPA, no runtime construction, no client fetching, no `<form>` elements.
- Closed `data-*` hook set: the page body uses ZERO hooks (shell menus only); NO new hook.
- No new library/framework/TypeScript/CDN; `package.json` untouched; zero external requests (smoke-asserted).
- Relative paths only; GitHub-Pages compatible (the `docs/` mirror flow keeps working).

## 2. Django-ready mapping

`templates/portal/teacher.html` extends `templates/portal/_base.html`; each of the 13 sections is an include-able block; the `TEACHER_PREVIEW.*` register + the `teacher-links` resolvers map to view context (`teacher`, `teacher.today_classes`, `teacher.followups`, `teacher.students`); the pay-free rule maps to the template NEVER receiving compensation context (server-side suppression mirror); every gated write is a `{% if backend %}` block; the performance link maps to `{% url 'teacher-performance' %}`. README's portal mapping gains a one-line Spec-015 note if wording needs it (docs-only).

## Acceptance (binding)

1. **Given** JS disabled, **Then** the full teacher page renders complete in both languages (all 13 sections readable).
2. **Given** the network panel on load, **Then** zero external requests; all assets relative.
3. **Given** the source diff, **Then** no new `data-action` string beyond the existing set appears in the page module.
