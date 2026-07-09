# Contract: Admin Management Menu Coverage

**Purpose**: Every 031-owned menu item classified; no dead placeholder; coverage gate green.

**MUST**:
- All items in `admin-management-menu-coverage-inventory.md` classified — **0 unclassified**.
- Implemented items (`staff`/`books`/`certificates`/`settings`) have a route + built page.
- Folded items (`materials`/`certificateRequests`/`settingsGeneral`/`Integrations`/`Customization`/`Notifications`/`Security`/`Users`) stay `planned` and are reachable as tabs inside their host page.
- Future-backend items (payment-gateway/payout/SMTP/backup/import/message-builder/reset/invite) render as honest gates with an owner.
- The Spec-010/029 nav block stays green: 6 rail categories · link-integrity (deadHash/badTarget=0) · planned-truthfulness (every non-implemented item = non-navigating `data-coming-soon` button).
- `nav.config.js` build guard passes (implemented⇒route · non-implemented⇒no route · disabled⇒reasonKey).

**Verify**: smoke coverage sweep + nav build guard + inventory review (0 unclassified).

**Status**: inventory complete. Binding.
