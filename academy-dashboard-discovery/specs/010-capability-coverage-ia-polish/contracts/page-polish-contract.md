# Contract: Page Polish (Spec 010)

**Status**: Binding · What "polish" may and may not touch. References FR-013/FR-014/FR-017; US5; data-model §6.

## 1. Allowed polish moves (the complete list)

- Copy-level: headers/subtitles/hints/empty-state wording — both languages in the same change, Arabic-first quality.
- Empty-state completion: adding the existing labeled `states` component where a filterable list can reach zero rows without one.
- Style-level: spacing/token tweaks using EXISTING design tokens and existing chip tones only; the D7 `[data-row][hidden]` rule.
- Truthfulness: the D5/D6 register/badge corrections (owned by the nav contract).

## 2. Forbidden polish moves

No new sections/cards/tabs/drawers; no new `data-*` hooks; no layout restructuring; no content removal (nothing implemented is deleted); no new chip tone or color token; no fixture data change; no action semantics change (demo stays demo, disabled stays disabled with its reason, confirm stays confirm); no page gains or loses finance vocabulary except the one sanctioned family link (source-links contract).

## 3. Quality bar

Every polished string: no raw keys, no machine-translation feel in Arabic, no legacy private wording, no schedule promises ("coming soon" hype stays banned — availability language only). Every polish lands with its verification (smoke assert, screenshot frame, or audit grep) named in the page-audit artifact.

**Acceptance (binding):**
1. **Given** `git diff` over `src/js/pages/`, **When** reviewed, **Then** the only structural addition anywhere is family.js's single link; every other page-module change (if any) is string/empty-state level.
2. **Given** every filterable page filtered to zero matches, **When** viewed, **Then** a calm labeled empty state renders in both languages.
3. **Given** the built output, **When** greped, **Then** zero raw `⟦key⟧`, zero new tones, zero removed sections.
