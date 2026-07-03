# Contract: Static HTML-first & Django-ready (Spec 014)

**Status**: Binding · References FR-020; carries the Spec 001–013 architecture spine unchanged.

## 1. Static HTML-first (unchanged)

- Both family files are COMPLETE pre-rendered documents at build; every section baked; runtime JS builds no page DOM.
- No whole-page `#app`, no SPA, no runtime construction, no client fetching, no `<form>` elements.
- Closed `data-*` hook set: the page body uses ZERO hooks (shell menus only); NO new hook.
- No new library/framework/TypeScript/CDN; `package.json` untouched; zero external requests (smoke-asserted).
- Relative paths only; GitHub-Pages compatible (the `docs/` mirror flow keeps working).

## 2. Django-ready mapping

`templates/portal/family.html` extends `templates/portal/_base.html`; each of the 12 sections is an include-able block; `FAMILY_PREVIEW.*` registers → context variables; the children overview maps to `{% for child in family.children %}`; the zero-pay rule maps to the template NEVER receiving amount context (server-side suppression mirror); `t()` keys → `{% trans %}` catalog. README's portal mapping gains a one-line Spec-014 note if wording needs it (docs-only).

## Acceptance (binding)

1. **Given** JS disabled, **Then** the full family page renders complete in both languages (all 12 sections readable).
2. **Given** the network panel on load, **Then** zero external requests; all assets relative.
3. **Given** the source diff, **Then** no new `data-action` string beyond the existing set appears in the page module.
