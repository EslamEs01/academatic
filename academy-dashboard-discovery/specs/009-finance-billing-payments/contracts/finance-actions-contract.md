# Contract: Finance Actions (Spec 009)

**Status**: Binding · The complete honest-action matrix for the finance shell. References FR-014; SC-003; data-model §7. Mechanism mirrors `report-actions.js`/`teacher-actions.js`/`course-group-actions.js` verbatim (demo / `confirmAction` / clickable `aria-disabled` + `data-disabled-reason` / real link).

## 1. Action matrix (binding — exact)

| key | where | kind | hook(s) | labelKey (AR / EN) |
|---|---|---|---|---|
| `createInvoice` | page cluster | disabled-with-reason | `data-disabled-reason` `data-reason-key="fin.reason.backend"` | إنشاء فاتورة / Create invoice |
| `exportCsv` | page cluster | disabled-with-reason | `data-reason-key="fin.reason.export"` | تصدير CSV / Export CSV |
| `exportPdf` | page cluster | disabled-with-reason | `data-reason-key="fin.reason.export"` | تصدير PDF / Export PDF |
| `print` | page cluster + drawer | demo toast | `data-demo-action` `data-toast="fin.act.print.toast"` | طباعة / Print |
| `view` | invoice row | drawer | `data-drawer="inv-<id>"` | عرض الفاتورة / View invoice |
| `recordPayment` | invoice row | confirm → demo toast | `confirmAction({ titleKey, msgKey, confirmKey, toastKey })` | تسجيل دفعة / Record payment |
| `recordPayment` (on `cancelled` invoice) | invoice row | **disabled-with-reason** | `data-reason-key="fin.reason.cancelled"` | تسجيل دفعة / Record payment |
| `markPaid` | drawer | confirm → demo toast | `confirmAction(…)` | تحديد كمدفوعة / Mark as paid |
| `sendReminder` | drawer | confirm → demo toast | `confirmAction(…)` | إرسال تذكير / Send reminder |
| `sendInvoice` | drawer | disabled-with-reason | `data-reason-key="fin.reason.send"` | إرسال الفاتورة / Send invoice |
| `viewLinkedInvoice` | payment row | drawer | `data-drawer="inv-<invoiceId>"` | عرض الفاتورة / View invoice |
| — family/student/course/group/source links | rows + drawer | real link | plain `<a href>` to implemented pages | (per `source-links-contract.md`) |

## 2. Status-gating (the Spec 006 group-full pattern)

`recordPayment` renders as confirm→demo on `paid/unpaid/overdue` invoices and as disabled-with-reason on the `cancelled` invoice — the gate is decided at **build time** from the authored statusId (baked markup differs), not by runtime logic.

## 3. Honesty guarantees (binding)

- Confirm→demo actions open the existing confirm modal; confirming fires ONE toast and mutates **nothing** — no chip change, no row change, no storage write. Reload proves idempotence.
- Disabled actions use the clickable honest-disabled variant (`aria-disabled="true"` + `data-disabled-reason` + `title`) so they are keyboard-reachable and pass the smoke rule "every disabled control carries a reason".
- Every control yields feedback (drawer / toast / navigation) — the no-dead-button catch-all must never fire as the primary handler for a finance control.

## 4. MUST NOT (binding boundary)

- No **`uploadReceipt`** action, label, field, or i18n key — anywhere (the verified reference had no receipt concept; FR-014).
- No real file/CSV/PDF generation; no `window`-blob/download faking an export; no `mailto:`/WhatsApp deep-link faking a send; no scheduled job; no gateway call; no persistence.
- No fake state flip: Mark-as-paid MUST NOT re-render, toggle a class on, or otherwise alter the invoice's status chip.
- No new action `data-*` hook; only `data-demo-action`, `data-disabled-reason`, `data-confirm*`, `data-drawer`, real `<a href>`.

## 5. i18n

All action labels/toasts/reasons under `fin.act.*` / `fin.reason.*` (export · backend · send · cancelled), key-mirrored AR/EN; reason copy names the missing capability honestly ("يتطلب نظام الفوترة الفعلي" / "Requires the real billing backend").

**Acceptance (binding):**
1. **Given** every action in §1, **When** activated (mouse + keyboard), **Then** it produces exactly its contracted behavior class and nothing else.
2. **Given** an unpaid invoice, **When** Record payment is confirmed, **Then** a toast appears and the chip still reads «غير مدفوعة» (no mutation).
3. **Given** the cancelled invoice, **When** Record payment is activated, **Then** a reason toast appears (status-gated disabled variant).
4. **Given** the built pages, **When** grepped, **Then** zero receipt/upload tokens and zero `type="file"` inputs exist.
