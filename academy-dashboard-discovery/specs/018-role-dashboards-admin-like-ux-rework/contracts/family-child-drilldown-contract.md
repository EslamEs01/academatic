# Contract: Family Child Drill-Down (Spec 018 — THE mandatory capability)

**Status**: Binding · References FR-004, US4; research D4/D5/D6/D8.

1. NEW page pair `family-child.html`/`.en.html` (the sanctioned 2-line build-html registration), family Shell v2, five BAKED child panels for the REAL fam1 roster (st1·st6·st11·st12·st13), default st1, switcher via the existing data-tab/hash machinery, deep links `#child=stX`.
2. The family home's five child cards carry REAL links (bodyAnchors===5, exact targets, each child once). Zero dead buttons, zero href="#".
3. Each panel shows the full per-child slice: identity+lifecycle chip · course/group/teacher · today/next (real or truthful none) · attendance mini + authored progress · latest teacher note (real ref preferred) · homework/materials summary lines · history gate · profile gate.
4. Honesty: zero body forms/anchors on the child page; all deep-capability affordances are labeled gates until Spec 020; zero money figures/payment language (the family zero-pay regex runs on this page too).
5. Django mapping: `family/child/<id>` view over one child; panels = the `{% if %}`/include equivalent; recorded in README.

**Acceptance**: smoke's family-child branch green (5 panels, default st1, switcher hooks, anchors registry, zero-pay); the switched-child frame captured.
