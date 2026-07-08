/* Spec 009 — the honest finance ACTION cluster. Reuses the EXISTING enhance.js hooks
 * (data-demo-action/data-toast · data-disabled-reason/data-reason-key · data-confirm* ·
 * data-drawer) — NO new hook, and NO action generates a file, sends anything, mutates a
 * status, or persists:
 *   - financeActions()          → page cluster: Create invoice / Export CSV / Export PDF /
 *                                  Print all stay disabled-with-reason (Spec 030 F-J made
 *                                  Print a backendRequired export gate — no fake print).
 *   - invoiceRowActions(inv)     → View opens the baked invoice drawer; Record payment is
 *                                  a confirm→demo toast, EXCEPT on a cancelled invoice
 *                                  where it renders disabled-with-reason (status-gated at
 *                                  build time from the authored statusId — mirrors the
 *                                  course/group "full" gate, never a runtime check).
 *   - invoiceDrawerActions(inv)  → Mark as paid + Send reminder are confirm→demo toasts
 *                                  (Mark as paid is also disabled-with-reason on a
 *                                  cancelled invoice); Send invoice + Print stay
 *                                  disabled-with-reason (Spec 030 F-J).
 * Disabled controls use the clickable honest-disabled variant (aria-disabled + the reason
 * attributes + title) so they stay keyboard-reachable and always surface their reason on
 * click/hover/focus — never a dead button. Confirmed actions fire exactly one toast and
 * change nothing (no chip flips, no row changes, no storage write). This file adds only
 * the four action classes listed above — nothing else. */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';

/** a disabled-with-reason action — styled disabled (aria-disabled) yet clickable so the
 *  reason toast can fire; mirrors the canonical `report-actions.js` disabled variant. */
function disabledAction({ labelKey, icon, reasonKey }) {
  return button({
    labelKey,
    icon,
    variant: 'ghost',
    size: 'sm',
    attrs: `aria-disabled="true" data-disabled-reason data-reason-key="${esc(reasonKey)}" title="${esc(t(reasonKey))}"`,
  });
}

/** Spec 030 (F-J) — Print is a backendRequired export gate (disabled-with-reason), consistent with
 * Export CSV/PDF; printing a real file needs the billing system, so it never fires a "success" toast. */
function printAction() {
  return disabledAction({ labelKey: 'fin.act.print', icon: 'printer', reasonKey: 'fin.reason.export' });
}

/** The page-level action cluster (wraps on mobile). */
export function financeActions() {
  const createInvoice = disabledAction({ labelKey: 'fin.act.createInvoice', icon: 'plus', reasonKey: 'fin.reason.backend' });
  const exportCsv = disabledAction({ labelKey: 'fin.act.exportCsv', icon: 'download', reasonKey: 'fin.reason.export' });
  const exportPdf = disabledAction({ labelKey: 'fin.act.exportPdf', icon: 'file-text', reasonKey: 'fin.reason.export' });

  return `<div class="report-actions flex items-center flex-wrap gap-2" role="group" aria-label="${esc(t('fin.act.group'))}">
    ${createInvoice}${exportCsv}${exportPdf}${printAction()}
  </div>`;
}

/** the invoice row action cluster: View drawer + status-gated Record payment. */
export function invoiceRowActions(inv) {
  const view = button({
    labelKey: 'fin.act.view',
    icon: 'file-text',
    variant: 'ghost',
    size: 'sm',
    attrs: `data-drawer="inv-${esc(inv.id)}"`,
  });

  const recordPayment = inv.statusId === 'cancelled'
    ? disabledAction({ labelKey: 'fin.act.recordPayment', icon: 'wallet', reasonKey: 'fin.reason.cancelled' })
    : confirmAction({
        labelKey: 'fin.act.recordPayment',
        icon: 'wallet',
        variant: 'secondary',
        size: 'sm',
        titleKey: 'fin.act.recordTitle',
        msgKey: 'fin.act.recordMsg',
        confirmKey: 'fin.act.recordCta',
        toastKey: 'fin.act.recordToast',
      });

  return `<div class="flex flex-wrap gap-2">${view}${recordPayment}</div>`;
}

/** the baked invoice drawer action cluster: status-gated Mark as paid, Send reminder,
 *  disabled Send invoice, and the shared Print demo toast. */
export function invoiceDrawerActions(inv) {
  const markPaid = inv.statusId === 'cancelled'
    ? disabledAction({ labelKey: 'fin.act.markPaid', icon: 'check-circle', reasonKey: 'fin.reason.cancelled' })
    : confirmAction({
        labelKey: 'fin.act.markPaid',
        icon: 'check-circle',
        variant: 'secondary',
        size: 'sm',
        titleKey: 'fin.act.markTitle',
        msgKey: 'fin.act.markMsg',
        confirmKey: 'fin.act.markCta',
        toastKey: 'fin.act.markToast',
      });

  const sendReminder = confirmAction({
    labelKey: 'fin.act.sendReminder',
    icon: 'megaphone',
    variant: 'secondary',
    size: 'sm',
    titleKey: 'fin.act.remindTitle',
    msgKey: 'fin.act.remindMsg',
    confirmKey: 'fin.act.remindCta',
    toastKey: 'fin.act.remindToast',
  });

  const sendInvoice = disabledAction({ labelKey: 'fin.act.sendInvoice', icon: 'mail', reasonKey: 'fin.reason.send' });

  return `<div class="flex flex-wrap gap-2">${markPaid}${sendReminder}${sendInvoice}${printAction()}</div>`;
}
