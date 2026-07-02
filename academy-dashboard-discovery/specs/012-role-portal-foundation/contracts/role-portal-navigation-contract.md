# Contract: Role Portal Navigation & Demo Entry (Spec 012)

**Status**: Binding · How users move between roles — and how the admin console stays out of it. References FR-003; US1/US5; research D8; data-model §3, §7.

## 1. The demo hub (`portals.html`)

One page pair on the portal shell (neutral/hub accent): honest headline framing it as the demo role switcher, three large friendly role cards (icon + accent + one-line promise + persona note + REAL link to the portal), one labeled "admin console (demo)" link → `dashboard.html` (language-aware), and a short honesty note (fixtures only, no login/auth). Documented demo path = open `portals.html` directly.

## 2. In-portal navigation

Each portal header carries the demo role-switch link back to the hub. Foundation nav stays minimal: the hub link + any real links inside preview sections (e.g. teacher→admin performance page, labeled). Every nav affordance is a real `<a>` to an existing built file or a labeled planned control — zero `href="#"`, zero links to nonexistent pages, language-correct `.en.html` targets on EN pages.

## 3. Admin isolation (hard rule)

The admin console gains NOTHING: no nav item, no body link, no gallery edit, no topbar entry. The hub/portals are reached only by documented URL + portal-internal links. The `FUTURE_ROLE` register still guarantees no portal item ever renders in the admin nav (assertion admin-scoped, kept).

**Acceptance (binding):**
1. **Given** the hub, **When** each role card is clicked, **Then** the correct portal opens (language-correct); the admin link opens the dashboard and is explicitly labeled as the admin demo.
2. **Given** all 40 admin built pages, **When** greped, **Then** zero references to `portals.html`/`*-portal.html`.
3. **Given** every portal nav affordance, **When** crawled, **Then** zero dead/`#`/nonexistent targets.
