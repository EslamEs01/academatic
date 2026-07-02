# Contract: Static HTML-First & Django-Ready (Spec 010)

**Status**: Binding · The architecture contract, re-proven after the ripple. References FR-019; US9; the Spec 001–009 architecture chain.

## 1. Static HTML-first (unchanged, re-asserted)

Every page pre-rendered complete per language into `public/`; no whole-page `#app` mount; runtime JS enhances existing markup via the CLOSED `data-*` hook set — Spec 010 adds **no hook** and does not touch `enhance.js`. The D7 CSS rule and the family link are baked/static. The chip-tone guard runs at build time (no runtime cost). All 40 pages re-bake due to the sidebar ripple — a sanctioned, documented diff (Spec 009 precedent).

## 2. GitHub Pages

Relative asset paths only; zero external requests; `index.html` redirect untouched; everything verified from a plain static server.

## 3. Django-template-ready mapping (README section updated)

- Finance sub-section: same template shape as the existing teachersPerf sub-section — a nested `{% for section in category.sections %}` include; no new template concept.
- Category relabel + `cat.finance` title: translation-catalog entries.
- Sessions badge: `{{ sessions_total }}` context variable (today: authored fixture total).
- Family→finance link: plain anchor → `{% url 'finance' %}`.
- `[data-row][hidden]` rule: pure CSS, template-agnostic.
- Coverage matrix / audit artifacts: documentation, no template mapping needed.

**Acceptance (binding):**
1. **Given** the built output served statically, **When** every page and interaction is exercised, **Then** no backend, no external request, no console error.
2. **Given** `git diff`, **When** reviewed, **Then** `enhance.js` and `package.json` are unchanged and no new `data-` attribute name appears in any page module.
3. **Given** the README, **When** read, **Then** the Spec 010 Django mapping bullet-set above is present.
