# Contract: Forms & Gates — Spec 034

**Binding.** Reuse the Spec-032 form-completion pattern: real fields before the gate; no field-less create/edit modal.

- Every create/edit/compose surface (msg-group, msg-member, lead-new, lead-note, lead-status, task-new/edit, task-section, ann-compose, msg-compose) renders **≥1 visible `input`/`select`/`textarea`** + exactly one `data-disabled-reason`/`data-confirm` final.
- Mechanism: `formDrawer(id,{titleKey,fields,ctaKey,reasonKey})` + `field()`/`optsFrom` (existing); triggers `data-drawer`/`data-confirm` (existing hooks). **No new hook** except the page-scoped `initTimeConverter` (which is not a form gate — it is the working converter).
- **[GATE] affordances** (chat image, ad media, message attachment) = `btn-secondary` inline `data-disabled-reason` — never `<input type="file">`.
- **[OMIT]** (never rendered): password, salary/pay/amount/price, credential/api/secret/webhook/token/otp, computed Total.
- Options from authored fixtures (no PII/pay/secret). Fields INERT (no behavior hook, no persistence).
- **Verify**: smoke per-surface control-count ≥1 + one gate; `fieldlessCreateEdit===0`; noFile; no credential/money control.
