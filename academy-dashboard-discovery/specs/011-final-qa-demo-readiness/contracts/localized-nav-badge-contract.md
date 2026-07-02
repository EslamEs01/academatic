# Contract: Localized Nav Badge (Spec 011)

**Status**: Binding · Sessions badge digit localization. References FR-003/FR-004/FR-005; US2; SC-002/SC-003; research D2; data-model §2.

## 1. The change (complete)

`src/js/components/sidebar.js` imports `num` from `../i18n.js` and renders the badge value through it: `<span class="badge nav-badge tabular">${num(it.badge)}</span>` (was `${it.badge}`). `nav.config.js` is unchanged — the badge stays `badge: SESSIONS.total`.

## 2. MUST

- Arabic built pages show the sessions badge in Arabic-Indic digits (e.g. ٢٤) equal to `SESSIONS.total`.
- English built pages show Western digits (e.g. 24) equal to the same `SESSIONS.total`.
- The value remains the single fixture-derived source — no duplicated hard-coded count, no per-language hard-coded badge string.
- Formatting happens at build time via `num()` (locale from `applyLang`); no runtime-only rendering, no new library.

## 3. MUST NOT

No formatting logic added to `nav.config.js` (data/config layer stays language-free); no change to the badge's fixture source; no other component's rendering changed; the badge is not removed.

**Acceptance (binding):**
1. **Given** any Arabic built page, **When** the sessions badge renders, **Then** it is the Arabic-Indic form of `SESSIONS.total`.
2. **Given** any English built page, **When** it renders, **Then** it is the Western form of the same count.
3. **Given** the source, **When** inspected, **Then** the only badge value is `SESSIONS.total` passed through `num()` — no literal `24` reintroduced.
