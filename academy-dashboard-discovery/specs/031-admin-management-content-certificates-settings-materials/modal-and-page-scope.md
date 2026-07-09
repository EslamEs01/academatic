# Modal & Page Scope — Spec 031

Defines, per surface, whether it is a page / fold / modal / drawer / gate, and the expected page-count envelope. **The exact count is fixed in `/speckit.plan`** (build-verified); this artifact records the default fold-first bias and the page-candidate reasoning.

## Count baseline & default
- Baseline (Spec 030 committed): **97** public HTML.
- **Default preference: fold-first / hold 97.** `settings.html` already exists and is the finance.html analogue — the six `settings*` sub-domains + integrations fold into it as `data-tab` panels at **0 page-count cost** (Spec-030 precedent, `nav.config.js` route rules 0-diff).
- **No accidental removals, no unrelated additions.** Any new page must pass the page-candidate test and be build-verified in planning.

## Per-surface page/fold/modal/drawer/gate decision

| Surface | Decision | Rationale | Page delta |
|---|---|---|---|
| **Settings hub** (general/customization/notifications/security/users/integrations) | **FOLD → settings.html tabs/sections** | settings.html exists; finance precedent; six thin sub-forms | **0** |
| **Locations** | FOLD → settings-general display slice | no page evidence (RBAC-group-name only) | 0 |
| **Integrations / WhatsApp / payment-gateway / payout / SMTP** | FOLD → settings Integrations tab (locked-placeholder cards + gates) | sub-surfaces of Integrations in legacy | 0 |
| **Backup / Import / Message-Builder** | GATE / EXCL inside settings | destructive/secret/504 | 0 |
| **Expense heads** | FOLD (lookup list) — settings or a management surface | finance-adjacent, thin, name/status only | 0 |
| **Staff / Users** | **PAGE CANDIDATE** — `staff.html` (route reserved) OR fold as settings "Users" tab | substantial (directory + RBAC matrix + kebab); legacy nests it under Settings | 0 or +2 |
| **Materials** | **PAGE CANDIDATE** — `materials.html` (route reserved) OR fold with books | thin subject catalog | 0 or +2 |
| **Books / Library** | **PAGE CANDIDATE** — `library.html` (route reserved) | media catalog + categories + filters (page-worthy) | 0 or +2 |
| **Certificates** (templates + designer + requests) | **PAGE CANDIDATE** — `certificates.html` (route reserved), folding `certificateRequests` as a tab | templates + static designer + requests queue (page-worthy, distinct IA) | 0 or +2 |

## Page-candidate test (applied per candidate in planning)
For each of staff / materials / books / certificates:
1. **Grounded in legacy evidence?** — yes (all have dedicated `/management/*` routes; see `legacy-management-content-coverage.md`).
2. **In current admin menu / 031 owner register?** — yes (`nav.config.js` planned items + `023` 031×12 footprint).
3. **Can it fold cleanly?** — settings-domain: yes (into settings.html). management/content: staff could fold into a settings "Users" tab; materials/books/certificates are distinct IA (their own left-nav items under the `admin` category) and folding them into settings would be dishonest/cramped.
4. **Can it be a drawer/modal/gate only?** — the *actions* are modals/drawers/gates, but the *list surfaces* (staff directory, media catalog, template list, requests queue) need a hosting page or a hub tab.
5. **Does a standalone route reduce clutter / match IA?** — materials/books/certificates already have reserved routes (`materials.html`/`library.html`/`certificates.html`) and sit under the `admin` rail category → standalone matches legacy IA.
6. **AR/EN page delta** — each new page = +2 HTML (`.html` + `.en.html`).
7. **Smoke/a11y/screenshot coverage** — each added page gets AR/EN load asserts + the additive honesty block + a11y rows + screenshot frames.

## Count envelope (planning fixes the exact number)
- **Lower bound (max fold): 97** — everything folds into settings.html + one management hub; staff→settings "Users" tab.
- **Upper bound (candidate pages): ~97+8** — new `staff.html`, `materials.html`, `library.html`, `certificates.html` (+ `.en`), with `certificateRequests` folded into certificates and all settings sub-domains folded into settings.html.
- **Recommended planning target**: fold the six `settings*` + integrations + Locations + expense-heads into `settings.html` (0-delta), and decide staff/materials/books/certificates as a **small, evidence-justified page set** (the `admin`-category items with reserved routes) — likely **+0 to +8**. Exact number locked + build-verified in `/speckit.plan`. No page ships without smoke/a11y/screenshot coverage.

## Modal/drawer/gate inventory (reused closed hooks — no new hook)
- **Modals** (`data-modal-trigger` + `-title-key`/`-note-key`): Add/Edit staff, Duplicate, Add/Edit material, Add/Edit category, Create/Edit certificate template, Add expense-head.
- **Drawers** (`data-drawer` + `<template data-preview>`): staff detail, category-scope, activity log, material/book detail, certificate detail, permission matrix (if drawer-hosted).
- **Confirms** (`data-confirm[-danger]`): Delete/Deactivate/Activate staff, Delete material/book/category, Delete template, Approve/Reject request.
- **Gates** (`data-disabled-reason` + `-reason-key`): Save-settings, Upload/Download/Publish, Generate/Preview/Send certificate, Connect/Test/Configure integration, Import/Backup, logo, 2FA, policy edit, Save-permissions, Assign-categories, Reset-password/Invite.
- **Tabs** (`data-tab`): settings hub panels; certificates↔requests.
- **Filters** (`data-filter*`): staff/materials/books/certificate-requests lists.
- **Planned** (`data-coming-soon`): any nav item not yet built stays a non-navigating button.
