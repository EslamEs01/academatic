# Contract: Settings Hub

**Purpose**: `settings.html` becomes a tabbed hub folding the six settings sub-domains at 0 page-count cost.

**MUST**:
- `renderSettings()` wraps panels in `tabs({group:'settings', items:[general, notifications, customization, security, users, integrations]})`; first tab active, others hidden.
- **Preserve** the real theme/language controls (functional).
- **General**: identity rows + Locations slice + course-automation display + expense-heads lookup (name/status, **no amount**); Save/logo = gate; **pay-rate/salary omitted**.
- **Notifications**: figure-free event×role×channel matrix + Save gate.
- **Customization**: theme/lang REAL + brand/status colors display + Save gate.
- **Security**: 2FA gate + Family/Teacher policy display-only text + edit gate; backup/import excluded/gate.
- **Users**: RBAC preview + real deep-link to `staff.html`.
- **Integrations**: locked-placeholder cards + gates.
- `settings` stays implemented (route `settings.html`); the six `settings*` items stay `planned` (folded). **0 page-count delta.**
- Only `settings.html`/`.en` change among existing HTML.

**Verify**: smoke — settings renders 6 tabs, 1 visible; theme/lang functional; every Save = gate; `figureFree`; no `type=file`/`type=password`.

**Status**: Binding. `settings-and-integration-scope.md`.
