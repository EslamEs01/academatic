# Contract — Admin Menu Coverage Gate (MANDATORY)

**Guarantee**: every `nav.config.js` item is classified; none is unclassified or a dead placeholder.
- All 43 items covered in `admin-menu-coverage-inventory.md` with status + owner.
- `nav.config.js` stays **0-diff** (all items already in honest state; folded capabilities live on reports.html).
- Build guard (`nav.config.js:148-154`) intact: implemented⇒route, non-implemented⇒no route, disabled⇒reasonKey.
**Verify (smoke)**: derive nav-id set; assert == classified-id set; every implemented route resolves to a public file; every planned item is an honest «قريبًا» button (no route); every disabled item has a reason; feedback/forms render on reports.html.
**Fail if**: any nav id lacks a classification; any implemented item lacks a route; any planned item has a live route; guard weakened.
