# Contract: Static HTML-first & Django-ready (Spec 013)

**Status**: Binding · References FR-018; carries the Spec 001–012 architecture spine forward unchanged.

## 1. Static HTML-first (unchanged)

- Both student files are COMPLETE pre-rendered documents at build; every section baked; runtime JS builds no page DOM.
- No whole-page `#app`, no SPA, no runtime page construction, no client fetching.
- Closed `data-*` hook set: the page uses ZERO hooks of its own (shell menus only); NO new hook introduced.
- No new library/framework/TypeScript/CDN; `package.json` untouched; zero external requests (smoke-asserted).
- Relative paths only; GitHub-Pages compatible (the `docs/` mirror flow keeps working via `npm run deploy:pages`).

## 2. Django-ready mapping

The deepened page maps 1:1 to the documented portal template family: `templates/portal/student.html` extends `templates/portal/_base.html`; each of the 13 sections is an include-able block; `STUDENT_PREVIEW.*` registers correspond to context variables; `t()` keys map to `{% trans %}` catalog entries. No JS-side routing/state to port. README's Spec-012 portal mapping note gains a one-line Spec-013 extension if wording needs it (docs-only).

## Acceptance (binding)

1. **Given** JS disabled, **Then** the full student page renders complete in both languages (all 13 sections readable).
2. **Given** the network panel on load, **Then** zero external requests; all assets relative.
3. **Given** the source diff, **Then** no new hook string `data-action="…"` beyond the existing set appears in the page module.
