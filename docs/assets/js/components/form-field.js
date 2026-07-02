/* Labeled form-field helpers (Spec 004). Every field has a visible <label>
 * bound to its control (for/id) — fixing the legacy's ~48% unlabeled inputs.
 * Reuses the shared Spec 001 form tokens (.field-label / .input / .select-input).
 * Fields are INERT (demo only) — no behavior hook, no persistence, no validation. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

/**
 * @param {{ labelKey:string, name:string, type?:'text'|'number'|'select'|'textarea',
 *   options?:Array<{value:string,labelKey?:string,label?:string,selected?:boolean}>,
 *   placeholderKey?:string, valueKey?:string, value?:string, full?:boolean }} o
 */
export function field({ labelKey, name, type = 'text', options = [], placeholderKey, valueKey, value, full = false } = {}) {
  const id = `f-${esc(name)}`;
  const ph = placeholderKey ? esc(t(placeholderKey)) : '';
  const label = `<label class="field-label" for="${id}">${t(labelKey)}</label>`;
  let ctrl;
  if (type === 'select') {
    ctrl = `<span class="select-wrap"><select id="${id}" name="${esc(name)}" class="select-input">
      ${options.map((o) => `<option value="${esc(o.value)}"${o.selected ? ' selected' : ''}>${o.labelKey ? t(o.labelKey) : esc(o.label)}</option>`).join('')}
    </select>${icon('chevron-down', 'sel-chev ico')}</span>`;
  } else if (type === 'textarea') {
    ctrl = `<textarea id="${id}" name="${esc(name)}" class="input" rows="3" placeholder="${ph}">${value ? esc(value) : ''}</textarea>`;
  } else {
    const v = valueKey ? esc(t(valueKey)) : (value != null ? esc(value) : '');
    ctrl = `<input id="${id}" name="${esc(name)}" type="${type === 'number' ? 'number' : 'text'}" class="input" placeholder="${ph}" value="${v}" />`;
  }
  return `<div class="field${full ? ' field-full' : ''}">${label}${ctrl}</div>`;
}

/* options helpers */
export const optsFrom = (keys, prefix) => keys.map((k, i) => ({ value: k, labelKey: `${prefix}.${k}`, selected: i === 0 }));
