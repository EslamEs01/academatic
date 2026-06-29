/* Interface states — empty / loading / error. Warm, human microcopy + clear next step. */
import { t } from '../i18n.js';
import { medallion, button } from './ui.js';

export function loadingSkeleton() {
  const line = (w) => `<div class="skeleton" style="height:12px;width:${w}"></div>`;
  const row = `<div class="flex items-center gap-3">
      <div class="skeleton" style="height:40px;width:40px;border-radius:11px"></div>
      <div class="flex-1 space-y-2">${line('70%')}${line('45%')}</div>
    </div>`;
  return `<div class="card p-5" role="status" aria-label="${t('state.loading')}">
    <div class="flex items-center justify-between mb-4">
      <div class="skeleton" style="height:13px;width:120px"></div>
      <div class="skeleton" style="height:24px;width:60px;border-radius:999px"></div>
    </div>
    <div class="space-y-4">${row}${row}${row}</div>
  </div>`;
}

export function errorState() {
  return `<div class="card p-6 text-center flex flex-col items-center gap-3">
    ${medallion({ icon: 'alert-triangle', tone: 'coral', variant: 'soft', size: 'lg' })}
    <div>
      <h3 class="text-[15px] font-bold text-ink mb-1">${t('state.error.title')}</h3>
      <p class="text-[13px] leading-relaxed max-w-xs mx-auto" style="color:var(--c-ink-3)">${t('state.error.msg')}</p>
    </div>
    ${button({ labelKey: 'state.error.retry', variant: 'secondary', icon: 'retry', size: 'sm', attrs: 'data-action="retry"' })}
  </div>`;
}

export function emptyState() {
  return `<div class="card p-6 text-center flex flex-col items-center gap-3">
    ${medallion({ icon: 'calendar-plus', tone: 'primary', variant: 'soft', size: 'lg' })}
    <div>
      <h3 class="text-[15px] font-bold text-ink mb-1">${t('state.empty.title')}</h3>
      <p class="text-[13px] leading-relaxed max-w-xs mx-auto" style="color:var(--c-ink-3)">${t('state.empty.msg')}</p>
    </div>
    ${button({ labelKey: 'state.empty.cta', variant: 'primary', icon: 'plus', size: 'sm', attrs: 'data-action="add-session"' })}
  </div>`;
}
