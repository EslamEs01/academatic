# Contract — Living Design Primitives (D11/D12/D13)
Five additive portal-page.js exports: idHero, dayRail, storyRow, flowStrip, guidePanel — appended
after the six existing exports which remain BYTE-IDENTICAL (append-only diff proof required).
CSS: one additive app.css section (tokens --lv-*, classes .pt-idhero/.pt-rail/.pt-stop/.pt-story/
.pt-flow/.pt-guide/.pt-lift/.pt-cele, keyframes lv-fill/lv-fadeup/lv-pulse); ZERO edits to
pre-existing rules; .pt-idhero is a NEW name (the hub owns .pt-hero). ALL motion inside
@media (prefers-reduced-motion: no-preference); static end-state is the no-media default (audit
grep: no lv- animation reference outside the query). No JS animation, no new hooks/keys/engines.
Heroes NEVER render pay data (structural rule, all roles).
