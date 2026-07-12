# Research — Spec 039 (Phase 0 decisions)

All decisions are evidence-backed (specify artifacts + re-grounded source/screenshots, zero drift). Format:
Decision · Rationale · Alternatives rejected.

## D1 — Deep-link, not standalone pages
**Decision:** Unlock `materials`→`library.html#view=materials` and `certificateRequests`→
`certificates.html#view=requests`; **0 new pages, count 115**.
**Rationale:** the Materials tab (`library.js` tabs group `library`) and Requests tab (`certificates.js` tabs
group `certificates`) already exist (Spec 031) and are hash-reachable (`enhance.js initTabs()` — `#view=` wins on
load). Spec 033 roadmap assigns Spec 039 = "content deep-links", count impact 0. Matches Spec 037/038 precedent.
**Rejected:** Option A new pages (`materials.html`/`certificate-requests.html`, +4 files → 119) = duplication of
existing tabs, split IA, duplicated fixtures. Option C leave «قريبًا» = dishonest (surfaces exist).

## D2 — Books route refinement ACCEPTED
**Decision:** `books`: `library.html` → `library.html#view=books`.
**Rationale:** `library.html` defaults to the first tab (Materials), so today the Content-Library («الكتب») nav
item lands on the Materials tab — a mild IA blur once Materials gets its own deep-link. Refining `books` to
`#view=books` makes each library item open its own tab (mirrors Spec 038's per-item `#view=` discipline). Count
impact 0; no body/fixture/locale impact (nav route string only). `langRoute` (sidebar.js:18) keeps the hash for EN.
**Rejected:** leaving `books`→`library.html` (still valid, but two library items would both open Materials).

## D3 — a11y + screenshot additions ACCEPTED (additive only)
**Decision:** add a11y rows + screenshot frames for `library#view=materials`, `library#view=books`,
`certificates#view=requests` (AR/EN, light/dark, mobile 390, relevant open drawers).
**Rationale:** the two deep-linked entry states weren't previously exercised as first-load states; additive
coverage strengthens the honesty proof without weakening anything.
**Rejected:** relying only on existing library/certificates coverage (would leave the deep-link fresh-load
untested for the flipped items).

## D4 — Two declared smoke amendments only
**Decision:** (1) repoint the dashboard planned-item probe (`run.cjs` 227–230) from admin→**settings** (still 6
planned); (2) correct the `run.cjs:1636` "5 planned items" message + add a companion `admPlanned===0` assert
(mirrors famPlanned/teachersPlanned/reportsPlanned===0). Everything else byte-verbatim; additive route asserts new.
**Rationale:** after the flip the admin category has 0 planned items → the 227–230 probe's selector returns null
and fails. Repointing to the only category still carrying planned items preserves the coming-soon-toast coverage —
exactly the amendment class Specs 034/035/036 used (Control→families, families→teachers, teachers→admin; now
admin→settings). The 1636 message is cosmetically inaccurate post-flip; the count+banks logic stays byte-verbatim.
**Rejected:** deleting the probe (loses coverage); broad test refactor (forbidden).

## D5 — Zero body change
**Decision:** the sole application-source edit is `nav.config.js`; `pages/library.js`, `pages/certificates.js`,
fixtures, locales, `enhance.js`, `tabs.js`, `sidebar.js`, `i18n.js`, `app.css`, `build-html.mjs`, `package.json`
are **0-diff**.
**Rationale:** the surfaces are complete; unlocking is a routing change. The generated `library`/`certificates`
`#page-body` stays byte-identical (only the shared sidebar markup changes as 2 «قريبًا» buttons become anchors).
**Rejected:** any body edit (would break the impact-protection guarantee + risk protected a31 asserts).

## D6 — Future-backend ownership (no-fake preserved)
**Decision:** real content/certificate persistence, file upload (`file`/`thumbnail`/`background`), the drag/PDF
certificate designer, PDF generation/preview/download, issuance, and WhatsApp/email delivery remain
**future-backend** — honest gates now, never mocked. Settings deep-links = Spec 040; final freeze = Spec 041.
**Rationale:** legacy evidence shows real Laravel form-post CRUD + file uploads + PDF render + WhatsApp; Spec 031
laws (static designer, no canvas/drag/type=file/PDF/window.open, gates) are binding and carried forward.
**Rejected:** reproducing any of these as real behavior (violates the no-fake law; highest fake-PDF risk).

## D7 — Count / menu freeze
**Decision:** public HTML **115→115**; admin menu **50→50**; admin category 5 items, planned 2→**0**; settings
stays the only planned-bearing category (6, owner 040).
**Rationale:** status flip changes item *status*, not DOM item *count*; no PAGES entry added. Confirmed against
`navCount32===50` (1300) and `admItems.length===5` (1636).
**Rejected:** any count/menu change (stop condition).

## D8 — English hash routing already supported
**Decision:** rely on existing `langRoute` (sidebar.js:18) — hash-aware since Spec 035.
**Rationale:** it splits file/fragment and rewrites only the file to `.en.html`, keeping `#view=…` →
`library.en.html#view=materials` etc. No change needed.
**Rejected:** any routing-layer edit (unnecessary; would touch a zero-diff file).

## Open questions
None remain. D2 and D3 (the two spec open questions) are resolved as ACCEPTED per the recommended safe defaults.
