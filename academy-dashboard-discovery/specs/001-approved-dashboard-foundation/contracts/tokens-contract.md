# Contract: Design Tokens

**Status**: Binding · **Source**: body/content values extracted verbatim from `design-references/approved-dashboard/academy-dashboard.html`; the nav-shell tokens (`--c-nav-*`) additionally follow `sidebar-reference.png` (the rail + light nav panel shell).

All visual values come from this single token set. **No component may hard-code a color, shadow, or radius** — it consumes tokens (CSS custom properties, optionally surfaced as Tailwind theme keys). Theme switches by swapping token values under `[data-theme]`; structure does not change.

## T1. Color tokens

Defined on `:root` (light) and overridden under `[data-theme="dark"]`. "System" mode mirrors the dark block via `@media (prefers-color-scheme: dark)` when no explicit theme is set.

### Light theme
| token | value | role |
|---|---|---|
| `--c-canvas` | `#FAF6EF` | warm app background |
| `--c-canvas-2` | `#F1EADC` | secondary canvas |
| `--c-surface` | `#FFFFFF` | card surface |
| `--c-surface-2` | `#F7F1E7` | inset/secondary surface |
| `--c-ink` | `#211D33` | primary text |
| `--c-ink-2` | `#544F66` | secondary text |
| `--c-ink-3` | `#7C7790` | tertiary/muted text |
| `--c-line` | `#E7DECF` | borders |
| `--c-line-2` | `#F1EADD` | subtle dividers |
| `--c-primary` | `#5145CD` | violet primary |
| `--c-primary-2` | `#6E63E0` | primary hover/secondary |
| `--c-primary-weak` | `#EAE7FB` | primary tint surface |
| `--c-primary-btn` | `var(--c-primary)` → `#5145CD` | filled-button violet fill — guarantees AA (≥4.5:1) **white** button text in BOTH themes (the bright dark `--c-primary` `#9486F4` fails as a button fill) |
| `--c-primary-btn-hover` | `#6E63E0` | filled-button hover fill |
| `--c-nav-panel` | `var(--c-surface)` → `#FFFFFF` | light nav-panel surface (dark → `#221F31`) |
| `--c-nav-rail` | `var(--c-canvas-2)` → `#F1EADC` | warm icon-rail plane (dark → `#0E0C18`, deepest plane) |
| `--c-nav-line` | `var(--c-line)` | nav dividers |
| `--c-nav-ink` | `var(--c-ink)` | nav text/icons |
| `--c-nav-ink-muted` | `var(--c-ink-3)` | nav muted labels/headings |
| `--c-nav-hover` | `var(--c-surface-2)` | nav hover wash |
| `--c-sidebar` | `#1F1B38` | **legacy** dark-sidebar base — now reused only as the dark `--c-nav-rail` value (`#0E0C18`); the active pill/square use `--g-violet` |
| `--c-sidebar-2` | `#2B2650` | **legacy — now unused** |
| `--c-sb-ink` | `rgba(255,255,255,.95)` | **legacy — now unused** |
| `--c-sb-ink-2` | `rgba(206,202,232,.72)` | **legacy — now unused** |
| `--c-sb-line` | `rgba(255,255,255,.10)` | **legacy — now unused** |
| `--c-sb-active` | `rgba(148,134,244,.22)` | **legacy — now unused** (active state now uses `--g-violet`) |
| `--c-teal` / `--c-teal-weak` | `#0E8C7E` / `#D3EEEA` | accent (live) |
| `--c-success` / `--c-success-weak` | `#1B8E59` / `#D2ECDC` | success (completed) |
| `--c-sky` / `--c-sky-weak` | `#2774BC` / `#D6E6F6` | info (upcoming) |
| `--c-amber` / `--c-amber-weak` | `#C9781F` / `#F7E5C9` | warning |
| `--c-coral` / `--c-coral-weak` | `#D7503A` / `#F8DAD2` | danger (cancelled) |

### Dark theme overrides
| token | value |
|---|---|
| `--c-canvas` / `--c-canvas-2` | `#141220` / `#1B1828` |
| `--c-surface` / `--c-surface-2` | `#221F31` / `#2A2640` |
| `--c-ink` / `--c-ink-2` / `--c-ink-3` | `#F3F0FB` / `#C2BDD4` / `#928CA8` |
| `--c-line` / `--c-line-2` | `#363046` / `#2A2639` |
| `--c-primary` / `--c-primary-2` / `--c-primary-weak` | `#9486F4` / `#B0A4FA` / `#2D2850` |
| `--c-primary-btn` | `#5F53D6` (darker than `--c-primary` so white button text keeps AA) |
| `--c-nav-panel` (= `--c-surface`) / `--c-nav-rail` | `#221F31` / `#0E0C18` (the rail is the deepest plane beside the dark panel) |
| `--c-sidebar` / `--c-sidebar-2` | `#0E0C18` / `#1B1830` (**legacy**; only `--c-sidebar`'s `#0E0C18` is reused, as the dark `--c-nav-rail`) |
| `--c-teal` / `--c-success` / `--c-sky` / `--c-amber` / `--c-coral` | `#34C9B6` / `#3FBE7E` / `#62A6E6` / `#EAA94F` / `#F2876F` |

Dark surfaces are **true dark, not pure black** (`#141220` canvas). Every token has a dark value; nothing falls back to an undefined variable.

## T2. Radii
`--r-pill: 999px` · `--r-lg: 20px` (large cards/hero) · `--r-md: 13px` · `--r-sm: 11px` / `10px` · `--r-xs: 6px` · avatars `50%`.

## T3. Shadows (elevation) — warm-tinted in light, neutral-dark in dark
| token | light | dark |
|---|---|---|
| `--sh-xs` | `0 1px 2px rgba(40,33,60,.07)` | `0 1px 2px rgba(0,0,0,.34)` |
| `--sh-sm` | `0 5px 18px rgba(40,33,60,.08)` | `0 5px 18px rgba(0,0,0,.36)` |
| `--sh-md` | `0 16px 40px rgba(40,33,60,.11)` | `0 16px 40px rgba(0,0,0,.44)` |
| `--sh-lg` | `0 30px 66px rgba(40,33,60,.17)` | `0 30px 66px rgba(0,0,0,.54)` |

## T4. Gradients
- Hero/welcome: `linear-gradient(135deg,#3C32A6 0%,#5145CD 52%,#0E8C7E 132%)`.
- Icon medallions: 150° two-stop gradients per accent — violet→teal `#6E63E0→#0E8C7E`, teal→sky `#0E8C7E→#2774BC`, violet→sky `#5145CD→#2774BC`, amber→coral `#C9781F→#D7503A`, violet `#7B70EC→#3C32A6`.

## T5. Motion
- Easing `--ease: cubic-bezier(.22,1,.36,1)`; durations 150–250ms.
- Honor `prefers-reduced-motion: reduce` → disable non-essential transitions/animation (e.g. the live-now pulse).

## T6. Typography tokens
- Family: `'Tajawal', system-ui, sans-serif` (self-hosted; weights 400/500/700).
- Scale: micro 11.5px · small 12.5px · body 14px · emphasis 15px · section-title 17px · KPI-display 34–36px.
- Headings use tight negative letter-spacing (≈ −.5px); KPI/table numbers use **tabular numerals**.
- Line-height ≈ 1.6 for body.

## T7. Status → token map (single source)
| statusId | accent token | meaning |
|---|---|---|
| `live` | `--c-teal` (+ `--c-teal-weak`) | جارية الآن |
| `upcoming` | `--c-sky` (+ `--c-sky-weak`) | قادمة |
| `completed` | `--c-success` (+ `--c-success-weak`) | مكتملة |
| `cancelled` | `--c-coral` (+ `--c-coral-weak`) | ملغاة |

Status meaning is always **icon + label + color**, never color alone.

## T8. Tailwind mapping rule
`tailwind.config.js` `theme.extend` maps `colors` (`canvas`, `surface`, `ink`, `primary`, `teal`, `success`, `sky`, `amber`, `coral`, sidebar.*), `borderRadius`, `boxShadow`, and `fontFamily` to the `--c-*`/`--r-*`/`--sh-*` variables so a single utility works in both themes. Tailwind must not introduce a competing literal palette.

## T9. Forbidden token values (legacy — must never appear)
Legacy purple `rgb(94,77,126)` / `#5E4D7E`, amber `rgb(248,194,10)`, pink `rgb(255,102,146)`, teal `rgb(70,202,235)`, the purple-tinted lift shadow `rgba(94,77,126,.23) 0 17px 20px -8px`, and legacy page bg `#FAFAFA`/`#F5F8FF`. See `scope-guard.md`.
