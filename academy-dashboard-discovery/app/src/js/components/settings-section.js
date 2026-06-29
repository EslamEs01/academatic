/* Settings section — a card panel of rows. Each control is one of three kinds:
 *   real  (theme / language — reuse Spec 001 behavior)
 *   demo  (toggle/button → toast, no persistence)
 *   disabled (disabled + visible reason)  */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, button } from './ui.js';
import { confirmAction } from './confirm-modal.js';

function themeSwitch() {
  const opt = (m, ic) => `<button type="button" class="tab" data-set-theme="${m}" data-theme-opt="${m}">${icon(ic, 'ico ico-sm')}<span>${t('theme.' + m)}</span></button>`;
  return `<div class="tabs">${opt('light', 'sun')}${opt('dark', 'moon')}${opt('system', 'monitor')}</div>`;
}
function langSwitch() {
  const opt = (l) => `<button type="button" class="tab" data-set-lang="${l}" data-lang-opt="${l}"><span>${t('lang.' + l)}</span></button>`;
  return `<div class="tabs">${opt('ar')}${opt('en')}</div>`;
}

function control(c) {
  switch (c.kind) {
    case 'theme': return themeSwitch();
    case 'lang': return langSwitch();
    case 'toggle':
      if (c.mode === 'disabled') {
        return `<button type="button" class="toggle" disabled aria-disabled="true" title="${esc(t(c.reasonKey))}" aria-label="${esc(t(c.reasonKey))}"><span class="knob"></span></button>`;
      }
      return `<button type="button" class="toggle ${c.on ? 'is-on' : ''}" role="switch" aria-checked="${!!c.on}" aria-label="${esc(t(c.ariaKey || 'set.toggle'))}" data-toggle data-toast="${esc(t(c.toastKey || 'set.savedToast'))}"><span class="knob"></span></button>`;
    case 'button':
      if (c.mode === 'disabled') return button({ labelKey: c.labelKey, variant: 'secondary', size: 'sm', icon: c.icon, disabled: true, reasonKey: c.reasonKey });
      return button({ labelKey: c.labelKey, variant: c.variant || 'secondary', size: 'sm', icon: c.icon, attrs: `data-demo-action data-toast="${esc(t(c.toastKey || 'settings.savedToast'))}"` });
    case 'text': return `<span class="font-medium text-[13px] text-ink">${c.valueKey ? t(c.valueKey) : esc(c.value)}</span>`;
    case 'reset': return confirmAction({ labelKey: 'set.row.resetData', variant: 'secondary', icon: 'retry', danger: true, titleKey: 'set.confirm.resetTitle', msgKey: 'set.confirm.resetMsg', confirmKey: 'set.confirm.resetCta', toastKey: 'set.confirm.resetToast' });
    default: return '';
  }
}

function row(r) {
  return `<div class="set-row">
    <div class="min-w-0">
      <div class="set-label">${t(r.labelKey)}</div>
      ${r.helpKey ? `<div class="set-help">${t(r.helpKey)}</div>` : ''}
    </div>
    <div class="shrink-0">${control(r.control)}</div>
  </div>`;
}

export function settingsSection(sec) {
  return `<section class="set-section" id="set-${esc(sec.id)}">
    <div class="flex items-center gap-3 mb-2">
      ${medallion({ icon: sec.icon, tone: sec.accent || 'primary', variant: 'soft', size: 'sm' })}
      <div>
        <h2 class="text-[15px] font-bold text-ink">${t(sec.titleKey)}</h2>
        ${sec.descKey ? `<p class="text-[12px]" style="color:var(--c-ink-3)">${t(sec.descKey)}</p>` : ''}
      </div>
    </div>
    ${(sec.rows || []).map(row).join('')}
    ${sec.extraHTML || ''}
  </section>`;
}
