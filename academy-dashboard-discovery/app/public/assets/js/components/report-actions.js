/* Spec 008 — the honest report ACTION cluster. Reuses the EXISTING enhance.js hooks
 * (data-demo-action/data-toast · data-disabled-reason/data-reason-key · data-confirm*)
 * — NO new hook, and NO real export/PDF/CSV/send/scheduled-job/persistence:
 *   - Print report        → demo toast (data-demo-action)
 *   - Export CSV / PDF     → disabled-with-reason (clickable, surfaces the reason)
 *   - Share report         → disabled-with-reason
 *   - Schedule report      → confirm modal → demo toast (no backend job created)
 * Every affordance is icon + text; the disabled ones stay keyboard-reachable and show
 * their reason on click/hover/focus (never a dead control). */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';

/** a disabled-with-reason action — styled disabled (aria-disabled) yet clickable so the
 *  reason toast can fire; mirrors the canonical appointment "join" affordance. */
function disabledAction({ labelKey, icon, reasonKey }) {
  return button({
    labelKey,
    icon,
    variant: 'ghost',
    size: 'sm',
    attrs: `aria-disabled="true" data-disabled-reason data-reason-key="${esc(reasonKey)}" title="${esc(t(reasonKey))}"`,
  });
}

/** The full action cluster (wraps on mobile). */
export function reportActions() {
  const print = button({
    labelKey: 'rep.act.print',
    icon: 'printer',
    variant: 'secondary',
    size: 'sm',
    attrs: `data-demo-action data-toast="${esc(t('rep.act.printToast'))}"`,
  });

  const exportCsv = disabledAction({ labelKey: 'rep.act.exportCsv', icon: 'download', reasonKey: 'rep.reason.export' });
  const exportPdf = disabledAction({ labelKey: 'rep.act.exportPdf', icon: 'file-text', reasonKey: 'rep.reason.export' });
  const share = disabledAction({ labelKey: 'rep.act.share', icon: 'share', reasonKey: 'rep.reason.share' });

  const schedule = confirmAction({
    labelKey: 'rep.act.schedule',
    icon: 'calendar-clock',
    variant: 'secondary',
    size: 'sm',
    titleKey: 'rep.act.scheduleTitle',
    msgKey: 'rep.act.scheduleMsg',
    confirmKey: 'rep.act.scheduleCta',
    toastKey: 'rep.act.scheduleToast',
  });

  return `<div class="report-actions flex items-center flex-wrap gap-2" role="group" aria-label="${esc(t('rep.act.group'))}">
    ${print}${exportCsv}${exportPdf}${share}${schedule}
  </div>`;
}
