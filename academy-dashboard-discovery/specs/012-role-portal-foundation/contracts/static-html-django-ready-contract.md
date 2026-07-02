# Contract: Static HTML-First & Django-Ready (Spec 012)

**Status**: Binding · Same architecture, second shell. References FR-009–FR-011; US9.

## 1. Static HTML-first

Portal pages are complete pre-rendered HTML per language from the SAME generator (`shell: 'portal'` branch); readable with JS disabled; runtime JS enhances only via the existing closed hook set (portal header reuses `theme-menu`/`lang-menu`; tab-like affordances use the existing `data-tabs` engine or stay baked-visible; **no new hook expected** — if implementation proves one unavoidable it must be plan-amended, same-character, documented). No `#app`, no SPA, no runtime page construction, no new library/CDN/TS, relative paths, GitHub Pages compatible. `htmlDoc()` head/sprite/enhance wiring reused unchanged.

## 2. Django mapping (README section required)

- Portal shell → `templates/portal/_base.html` (a second base template beside the admin one), with `{% block %}`s for hero/sections and a `role` context variable driving the accent attribute.
- Each portal page → `templates/portal/{student,family,teacher}.html` extending the portal base; persona fixtures → view context (`student`, `family.children`, `teacher.sessions`).
- The hub → `templates/portal/portals.html`; role cards → a simple loop; admin return → `{% url 'dashboard' %}`.
- Locale overlay `prt.*` → translation catalog entries; digits via the same localize filter as Spec 011.

**Acceptance (binding):**
1. **Given** the built portal pages served statically with JS disabled, **When** read, **Then** all content present; with JS, only enhancement behavior (menus/toasts) is added.
2. **Given** `git diff`, **When** reviewed, **Then** `enhance.js` and `package.json` are unchanged and no new `data-` hook name appears (or a plan-amended documented exception exists).
3. **Given** the README, **When** read, **Then** the portal Django mapping above is present.
