# Contract: Static HTML-First & Django-Ready (Spec 011)

**Status**: Binding · Architecture unchanged, re-asserted. References FR-012; US4.

## 1. Static HTML-first (unchanged)

Both fixes are build-time string changes to existing render sites: the Overview `<a href>` value (dashboard render) and the badge value wrapped in the existing build-time `num()` (sidebar render). No whole-page `#app`, no runtime page construction, no new `data-*` hook, no `enhance.js` change, no new library/CDN/TypeScript, relative paths, GitHub-Pages compatible. All 40 pages re-bake (the sidebar badge ripple) — a sanctioned, documented diff.

## 2. Django-template-ready mapping (README note)

- Overview link → `<a href="{% url 'reports' %}">` (a plain onward anchor, like the sibling Reports link).
- Sessions badge → `{{ sessions_total|localize_digits }}` (a locale digit filter — the Django equivalent of `num()`); the value is the same `sessions_total` context variable.
- No new template concept; both are one-token changes on existing partials.

**Acceptance (binding):**
1. **Given** the built output served statically, **When** exercised, **Then** no backend, no external request, no console error, badge localized per page.
2. **Given** `git diff`, **When** reviewed, **Then** `enhance.js` and `package.json` are unchanged and no new `data-` attribute appears.
