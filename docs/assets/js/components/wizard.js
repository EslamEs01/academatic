/* Baked multi-step wizard (Spec 004, R24/D4). ALL steps are pre-rendered static
 * panels; the runtime only TOGGLES which step is visible (a tiny stepper added to
 * enhance.js via data-step-next / data-step-prev — the ONLY new hooks in Spec 004).
 * No form library, no validation engine, no persistence. "Save" = demo toast.
 *
 * Markup: container [data-wizard] · step indicator (role=tablist of data-step-go)
 * · one [data-step] role=tabpanel per step (inactive `hidden`) · each step bakes
 * its own .wiz-nav (Back/Next, Review → Save). Maps to Django `{% if step %}`. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { button } from './ui.js';

/**
 * @param {{ steps: Array<{id:string,labelKey:string,descKey?:string,bodyHTML:string}>,
 *   ariaKey?:string, backKey?:string, nextKey?:string, saveKey:string, saveToastKey:string }} o
 */
export function wizard({ steps, ariaKey = 'fam.wiz.title', backKey = 'fam.wiz.back', nextKey = 'fam.wiz.next', saveKey, saveToastKey }) {
  const last = steps.length - 1;

  const dots = steps.map((s, i) => {
    const active = i === 0;
    return `<button type="button" class="wiz-dot${active ? ' is-active' : ''}" role="tab" id="wiz-tab-${esc(s.id)}" data-step-go="${esc(s.id)}" aria-controls="wiz-step-${esc(s.id)}" aria-selected="${active}" aria-current="${active ? 'step' : 'false'}" tabindex="${active ? '0' : '-1'}">
      <span class="wiz-num">${num(i + 1)}</span><span class="wiz-dot-label">${t(s.labelKey)}</span>
    </button>`;
  }).join('');

  const panels = steps.map((s, i) => {
    const back = i === 0
      ? `<button type="button" class="btn btn-secondary btn-sm" data-step-prev disabled aria-label="${esc(t(backKey))}">${icon('chevronStart', 'ico ico-sm')}<span>${t(backKey)}</span></button>`
      : `<button type="button" class="btn btn-secondary btn-sm" data-step-prev>${icon('chevronStart', 'ico ico-sm')}<span>${t(backKey)}</span></button>`;
    const fwd = i === last
      ? button({ labelKey: saveKey, variant: 'primary', size: 'sm', icon: 'check', attrs: `data-demo-action data-toast="${esc(t(saveToastKey))}"` })
      : `<button type="button" class="btn btn-primary btn-sm" data-step-next><span>${t(nextKey)}</span>${icon('chevronEnd', 'ico ico-sm')}</button>`;
    return `<section class="wiz-step" id="wiz-step-${esc(s.id)}" data-step="${esc(s.id)}" role="tabpanel" aria-labelledby="wiz-tab-${esc(s.id)}" tabindex="0"${i === 0 ? '' : ' hidden'}>
      <div class="wiz-step-head">
        <h2 class="wiz-step-title">${t(s.labelKey)}</h2>
        ${s.descKey ? `<p class="wiz-step-desc">${t(s.descKey)}</p>` : ''}
      </div>
      ${s.bodyHTML}
      <div class="wiz-nav">${back}${fwd}</div>
    </section>`;
  }).join('');

  return `<div class="wizard" data-wizard>
    <div class="wiz-dots" role="tablist" aria-label="${esc(t(ariaKey))}">${dots}</div>
    ${panels}
  </div>`;
}
