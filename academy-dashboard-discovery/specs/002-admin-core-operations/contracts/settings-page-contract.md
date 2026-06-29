# Contract: Settings Page

**Status**: Binding · `public/settings.html` (+ `.en`). A settings **shell** — no real backend save. Active nav: `settings`.

1. **Purpose**: Prove the settings experience/layout with grouped panels; appearance controls work for real, everything else demos or is disabled-with-reason.
2. **Layout** (RTL): page header (title "الإعدادات" + breadcrumb + subtitle) → a sectioned layout (optional left/section nav or stacked cards) of **settings sections**: **Academy Profile** (name, logo placeholder, contact — demo), **Appearance** (theme + language — **real**), **Account** (profile summary — demo/disabled), **Notifications preferences** (toggles — demo), **Roles & Permissions preview** (read-only grouped list — no enforcement).
3. **Reused**: `ui` (button/medallion/avatar/badge), `status-chip`, theme/lang controls (Spec 001 behavior), `states`, `toast`, `confirm-modal`.
4. **New**: `page-header`, `settings-section` (panel + rows + control kinds), read-only permission-preview list.
5. **Fixture**: `settings.js` — sections with rows tagged `kind` ∈ `real`/`demo`/`disabled`; roles preview groups.
6. **States**: a saved/empty/disabled visual; no error fetch (no backend).
7. **Demo interactions**: "save" → success **toast** (no persistence); theme/language → **real** switch (reuse Spec 001); destructive demo (e.g., "reset") → **confirmation modal** then toast.
8. **Disabled-with-reason**: backend-bound toggles (e.g., billing, integrations) render disabled with a visible reason; never silently inert.
9. **Screenshots**: Settings AR-RTL light desktop.
10. **Django mapping**: `templates/admin/settings.html`; sections → partials/includes; rows → `{% for row %}`; control `kind` distinguishes real vs demo vs disabled in the template.

**Control taxonomy** (research R7): every control is exactly one of **real** (`data-action` theme/lang), **demo** (`data-demo-action` → toast), or **disabled** (`data-disabled-reason`). No real persistence.
