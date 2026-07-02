// Fixture-only attention indicator: icon + label, never color-only.
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

export function attentionFlag(att) {
  if (!att) return '';
  const ICON = { conflict:'alert-triangle', delayed:'clock', cancelled:'x-circle', emptyDay:'inbox' };
  const ic = ICON[att.kind] || 'alert-triangle';
  return `<span class="attention-flag att-${esc(att.kind)}" data-attention="${esc(att.kind)}">${icon(ic,'ico ico-sm')}<span>${t(att.labelKey)}</span></span>`;
}
