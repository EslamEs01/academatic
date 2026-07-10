# Contract: Smoke Coverage — Spec 034

**Binding.** Additive smoke block only; protected asserts byte-verbatim.

**New assertions (Control block):**
- count = **113**; the 5 new bases load AR + EN (add to the PAGES loop list).
- the 5 Control nav items are `<a>` implemented links (0 «قريبًا» in Control); `plannedNavAnchors===0`; admin-menu 50.
- **messages**: inbox rows render; thread panel renders; compose has ≥1 control; Send is a `data-disabled-reason` gate; no fake sent; no-mutation; noFile.
- **leads**: KPI cards + list render; a status filter narrows the list; detail drawer forms have controls; Create/Convert/Assign/Update are gates; no status flip; no money figure.
- **tasks**: KPI strip + board render; create form has controls; move/status/assign gated; no fake persistence; no drag mutation; "Average" is a literal.
- **announcements**: list + compose render; compose has controls; preview renders; Publish/Send + media are gates; no fake published; noFile.
- **time-converter**: controls render; changing a control updates the output; **0 external request**; **no gate** on the conversion.
- blanket: `FAKE` guard=0 over the 5 pages; `href="#"`=0; raw-keys=0; dead-buttons=0; no `input[type=file]`/`input[type=password]`/credential control; no money figure.

**Protected (byte-verbatim, NOT in the diff):** payHit · tchPay · famPay · payFigure · child-view · finance `forbidden`/no-mutation · settings block · `FAKE` · Spec-032 form-completion block · 026–031 asserts. **Diff = insertions + the Control block only.**
