# Contract: Role Nav Registry (Spec 017)

**Status**: Binding · References FR-002/007; research D2/D3. Consumed by Specs 018–020.

1. `ROLE_NAV` in `src/js/fixtures/portal.js`: student 7 · family 8 · teacher 7 entries, order/labels per the spec's frozen table; entry = {id, labelKey 'prt.nav.<role>.<id>', icon, page, status}.
2. 017: home=implemented; all others planned. planned renders as a non-anchor BUTTON with the «قريبًا/Soon» pill + the existing acknowledge toast (zero new hooks). implemented renders as a language-correct anchor.
3. 018–020 flip statuses ONLY (one line per delivered page) — zero shell rework; the flip is invalid unless both built files exist (crawl-asserted).
4. Never `href="#"`; never a dead link; billing stays the status-register label; teacher entries pass the extended pay grep forever.

**Acceptance**: registry ↔ rendered nav ↔ smoke expectations agree in both languages.
