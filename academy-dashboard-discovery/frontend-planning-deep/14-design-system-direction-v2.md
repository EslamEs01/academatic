# 14 — Design System Direction (v2)

> Confirms v1 ([../frontend-planning/09-design-system-direction.md](../frontend-planning/09-design-system-direction.md)) and grounds it in the verified design‑token observations + visual review. **Direction only — no final tokens** (those land in Spec 001). Original system; legacy tokens are neutral reference, not to be copied. Stack: HTML + Tailwind (no CDN) + native JS; Arabic‑first RTL + LTR; light/dark; themeable.

## Verified legacy token observations (reference only — `output/combined/design-token-summary.md` + `_build/html_signatures.json`)
- **Primary** purple `rgb(94,77,126)` (+ light `rgb(123,107,168)`); **secondary/accent** amber `rgb(248,194,10)` and pink `rgb(255,102,146)`; action accents teal/green. **We pick an original palette.**
- **Surfaces** white / `rgb(250,250,250)` / `rgb(245,248,255)`; **border** `rgb(217,222,229)`; **text** `rgba(33,37,41,.95/.82/.62)`.
- **Font** Inter stack (15px body / 14px secondary / 18px section). **We choose an original Arabic‑capable font.**
- **Radius** 12px cards / 8px inputs / 50% avatars; **shadow** soft `rgba(0,0,0,.08) 0 2px 4px`; spacing on a 4px‑ish base.
- **Widgets** flatpickr, select2, ApexCharts, Quill, dropzone, Bootstrap modals/offcanvas — we provide **original equivalents**, no CDN.

## Direction (unchanged from v1, reconfirmed)
- **Tone:** academy‑friendly, cheerful‑but‑professional; calm surfaces + expressive **semantic status colors**; clean cards, generous whitespace; distinct new identity.
- **Color:** semantic token layer (`--bg/--surface/--border/--text/--primary/--secondary/--success/--warning/--danger/--info` + the **status scale**). The **11 session statuses** (+ account/invoice/payout) are a **single themeable status‑color map** (legacy lets admins recolor them — keep that). AA contrast; never color‑only (pair icon+label).
- **Light/Dark/System:** ship all three (legacy customisation already offers them) via `data-theme` + CSS vars; validate every component in both.
- **RTL/LTR (Arabic‑first):** logical properties, `dir` from locale, mirror directional UI (sidebar/drawers/chevrons/calendar/table order/timeline), keep numbers/times/currency/charts LTR, bidi‑isolate mixed content. **RTL is a fresh requirement** (English‑only crawl).
- **Typography:** modular scale; tabular numerals for finance/schedule tables; one Arabic+Latin UI font; avoid thin weights for Arabic.
- **Layout:** app shell (collapsible sidebar + sticky topbar + content + optional drawer; boxed/full); 4px spacing; 12‑col grid; density modes (admin denser); card system (bordered/shadowed toggle — legacy exposes it).
- **Components:** see [10](10-component-inventory-v2.md). Tables = workhorse (clickable sort headers, sticky first col + h‑scroll for 23‑col, row‑action menu, skeleton, empty); forms always labeled (+ validation/required/autosave on long forms); modals accessible + bottom‑sheet on mobile + destructive‑confirm; calendar custom grid w/ conflict warnings; finance amounts with base‑equivalent.
- **Iconography/imagery:** original icon set; **avatar/logo fallbacks everywhere** (legacy logo 404s on every page); friendly empty/error illustrations.
- **Motion:** subtle 150–250ms; respect `prefers-reduced-motion`.
- **Accessibility:** WCAG AA; full keyboard; correct ARIA (tablist/dialog/menu/listbox/live‑regions); labels for all inputs; ≥44px touch targets; tested in Arabic + English, light + dark.
- **Responsive:** mobile‑first teacher/family; desktop‑optimised‑but‑responsive admin; sidebar→icon‑rail/off‑canvas; tables→card/priority; modals→sheets; calendar→agenda.

## Spec 001 deliverable
Turn this into concrete tokens (original palette, type scale, spacing, radii, shadows), a Tailwind config (no CDN), base component styles, the status‑color map, and the app shell — validated in light/dark and RTL/LTR. **No tokens finalised here.**
