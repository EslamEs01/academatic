# Contract: Source Links (Spec 012)

**Status**: Binding · Portal link integrity. References FR-004; US5; SC-003; research D8.

## 1. Allowed link surface (complete)

- Hub ↔ portals: hub role cards → the three portal pages; each portal header → hub. Language-correct targets on EN pages.
- Hub → admin: ONE labeled "admin console (demo)" link → `dashboard.html`/`dashboard.en.html`.
- Teacher portal → admin: at most ONE labeled link to `teacher-performance.html` (plan default: include).
- Family portal billing: DEFAULT no link (planned card); if review overrides, ONE labeled admin-demo link to `finance.html`.
- Any other in-section link must target an existing built page and be honest about being the admin demo view.

## 2. Forbidden

`href="#"` anywhere (Spec 011 sitewide invariant now covers 49 pages) · links to nonexistent files · links FROM any admin page to any portal page · unlabeled admin links inside portals (everything crossing the portal/admin boundary is labeled) · external/CDN links.

## 3. Enforcement

The existing smoke link crawl (auto-extended via the PAGES registry) + the admin-isolation grep (zero portal references in admin files) + review of link labeling.

**Acceptance (binding):**
1. **Given** all 49 built pages, **When** crawled, **Then** zero dead/`#`/external/nonexistent-target links.
2. **Given** the admin 40, **When** greped, **Then** zero portal-page references.
3. **Given** every portal→admin link, **When** reviewed, **Then** it is explicitly labeled as the admin/demo view.
