/* Confirmation action — renders a trigger button carrying the (pre-resolved)
 * confirm copy as data-* attributes. enhance.js builds the modal on click and,
 * on confirm, runs a demo (toast). No real persistence. */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { button } from './ui.js';

export function confirmAction({ label, labelKey, variant = 'secondary', icon: ic, size = 'sm', titleKey, msgKey, confirmKey = 'common.confirm', toastKey, danger = false } = {}) {
  const attrs = [
    'data-confirm',
    `data-confirm-title="${esc(t(titleKey))}"`,
    `data-confirm-msg="${esc(t(msgKey))}"`,
    `data-confirm-cta="${esc(t(confirmKey))}"`,
    toastKey ? `data-confirm-toast="${esc(t(toastKey))}"` : '',
    danger ? 'data-confirm-danger="1"' : '',
  ].join(' ');
  return button({ label, labelKey, variant, icon: ic, size, attrs });
}
