# Contract: Approved Design Fidelity

**Status**: Binding · **Source of truth**: `design-references/approved-dashboard/academy-dashboard.{html,png}` + `sidebar-reference.png`

This contract makes the approved Claude Design dashboard the **primary visual target**. Every other contract derives from it. Implementation is accepted only when the rendered build visibly matches this reference (judged by screenshot review, not tests alone).

## C1. The reference is authoritative

- The approved PNG defines the **arrangement, density, and feel**; the approved HTML defines the **exact token values** (colors, radii, shadows, gradients, type) — see `tokens-contract.md`.
- Two references, two scopes: `academy-dashboard.png` is the **body/content** visual target; `sidebar-reference.png` is the **shell** (rail + light nav panel) source of truth.
- Where prompt text and the reference conflict, the **reference wins**. Where the reference is silent, follow the nearest approved pattern; do not invent a divergent style.
- The old academy system is **product/UX reference only**. Its visuals, colors, classes, Bootstrap structure, icons, logo, and wording MUST NOT appear (see `scope-guard.md`).

## C2. Required "feel" (qualitative acceptance)

The build MUST read as: premium · modern · creative · comfortable · joyful-but-calm · educational · human · trustworthy · client-ready · global SaaS/EduTech quality.

It MUST NOT read as: generic · empty · flat · pale · old · default-Tailwind · Windows-XP · weak admin template · vague placeholder system.

## C3. Canonical layout (RTL, top to bottom)

The dashboard reproduces the approved composition (detailed in `dashboard-layout-contract.md`):

1. **Sidebar shell** — a slim icon rail (hamburger, icon stack with a filled violet active square, bottom profile avatar) beside an expanded light nav panel (brand mark, section label, grouped nav, large violet active pill); per `sidebar-reference.png`.
2. **Topbar** — breadcrumb/title, centered global search, grouped utilities (notifications, theme, language, profile).
3. **Welcome zone** — compact violet→teal gradient hero (greeting, date, summary, two actions, education motif) beside two small stat cards + an attendance ring card.
4. **"نظرة عامة" KPI row** — four soft-tinted cards with icon medallions, trend pills, large numerals, mini sparklines/progress.
5. **Sessions module** — header (title + count + last-updated), integrated filter/action bar (primary action, active-filter chip, search, subject, date, time, apply), and a modern sessions table with status chips + row-action menu + pagination.
6. **Status summary** — four colored tiles (cancelled / upcoming / live / completed) with count + icon + label.
7. **Reports area** — report entry cards with medallions, including one permission-locked disabled card with reason.
8. **Interface states** — loading skeleton, error (with retry), empty (with CTA), each with warm microcopy.

## C4. Signature visual treatments (must be present)

- Warm cream canvas (not white, not gray); white cards with **soft, warm-tinted depth** and rounded corners (10–20px).
- **Icon medallions** (rounded-square gradient/tinted tiles holding an icon) on KPI cards, report cards, and states.
- **Violet/indigo primary** with a calm 5-accent palette (teal, green, sky, amber, coral) used semantically.
- **Rail + light nav panel** sidebar shell with a strong filled violet **active pill** in the panel (and a matching filled violet square in the rail) plus a bottom rail avatar.
- Mini data visuals (sparkline/ring/progress) rendered **without any chart library**.
- Friendly, Arabic-first microcopy in every state.

## C4b. Delivery medium

The approved design is delivered as a **static, HTML-first** site (built to `app/public/`,
previewable on GitHub Pages / Live Server, Django-template-ready). JS only enhances the
markup; no JS-rendered empty app mount. This delivery model MUST NOT alter the visual
result — the rendered output stays pixel-identical to the approved reference (see `scope-guard.md` §G4b).

## C5. Acceptance binding

- Acceptance requires the screenshot matrix in `screenshot-acceptance.md` to pass its failure-condition review against this reference.
- "Passes automated tests but looks bad" is an explicit **fail**.
- "Ignored the reference and guessed" is an explicit **fail**.
