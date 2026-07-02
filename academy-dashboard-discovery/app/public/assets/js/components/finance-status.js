/* Spec 009 — FINANCE status maps. The 11th + 12th labeled vocabularies, distinct as
 * sets from all ten existing maps (session status-map.js, family-status.js,
 * outcome-status.js, course-status.js, group-status.js, enrollment-status.js,
 * teacher-status.js, teacher-signals.js workload + follow-up, report-status.js
 * report-signal + availability):
 *   - invoice-status — paid / unpaid / overdue / cancelled (the invoice's own state)
 *   - payment-status — recorded / pending / returned (a keyed-in transaction's state)
 * Both are authored fixture facts, NEVER a computed lifecycle — no due-date rule turns
 * an invoice `overdue`, no action moves an id between statuses. Rendered via the
 * generic `chip` as icon + label, never numeric or color-only; `tone` is always an
 * EXISTING chip class so colors never drift. The finance availability chip
 * (available/demoOnly/planned/backendRequired) is REUSED as-is from
 * `report-status.js` — it is not redefined here. */
import { chip } from './ui.js';

/* ── invoice-status ────────────────────────────────────────────────────────── */
export const INVOICE_STATUS = {
  paid:      { id: 'paid',      tone: 'completed', icon: 'check-circle',   labelKey: 'fin.status.paid' },
  unpaid:    { id: 'unpaid',    tone: 'amber',      icon: 'clock',         labelKey: 'fin.status.unpaid' },
  overdue:   { id: 'overdue',   tone: 'cancelled',  icon: 'alert-triangle', labelKey: 'fin.status.overdue' },
  cancelled: { id: 'cancelled', tone: 'neutral',    icon: 'x-circle',      labelKey: 'fin.status.cancelled' },
};

/* stable order for tiles/filters */
export const INVOICE_STATUS_ORDER = ['paid', 'unpaid', 'overdue', 'cancelled'];

export function invoiceStatusOf(id) { return INVOICE_STATUS[id] || INVOICE_STATUS.unpaid; }

/** labeled invoice-status chip (icon + label) */
export function invoiceStatusChip(id) {
  const s = invoiceStatusOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}

/* ── payment-status ────────────────────────────────────────────────────────── */
export const PAYMENT_STATUS = {
  recorded: { id: 'recorded', tone: 'completed', icon: 'check',          labelKey: 'fin.pay.recorded' },
  pending:  { id: 'pending',  tone: 'upcoming',   icon: 'clock',         labelKey: 'fin.pay.pending' },
  returned: { id: 'returned', tone: 'amber',      icon: 'alert-triangle', labelKey: 'fin.pay.returned' },
};

/* stable display order (house map shape — payments have no tiles/filter surface) */
export const PAYMENT_STATUS_ORDER = ['recorded', 'pending', 'returned'];

export function paymentStatusOf(id) { return PAYMENT_STATUS[id] || PAYMENT_STATUS.recorded; }

/** labeled payment-status chip (icon + label) */
export function paymentStatusChip(id) {
  const s = paymentStatusOf(id);
  return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon });
}
