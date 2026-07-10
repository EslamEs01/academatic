/* Interface states — empty / loading / error. Warm, human microcopy + clear next step. */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { medallion, button } from './ui.js';

/** parameterized empty box (page-specific empty + filter "no results") */
export function emptyBox({ icon = 'inbox', tone = 'primary', titleKey, msgKey, ctaKey, ctaIcon = 'plus', ctaAttrs = '', attrs = '' } = {}) {
  return `<div class="card p-8 text-center flex flex-col items-center gap-3" ${attrs}>
    ${medallion({ icon, tone, variant: 'soft', size: 'lg' })}
    <div>
      <h3 class="text-[15px] font-bold text-ink mb-1">${t(titleKey)}</h3>
      <p class="text-[13px] leading-relaxed max-w-xs mx-auto" style="color:var(--c-ink-3)">${t(msgKey)}</p>
    </div>
    ${ctaKey ? button({ labelKey: ctaKey, variant: 'primary', icon: ctaIcon, size: 'sm', attrs: ctaAttrs }) : ''}
  </div>`;
}

/** hidden "no results" panel shown by enhance.js when a filter matches nothing */
export function noResults() {
  return `<div class="hidden" data-no-results>${emptyBox({ icon: 'search', tone: 'muted', titleKey: 'filter.noResults.title', msgKey: 'filter.noResults.msg' })}</div>`;
}

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
  // Spec 032 (FC-40): the empty-state CTA is a REAL link to the sessions page,
  // whose Add-session action opens the sess-new form drawer — no field-less modal.
  const sessionsHref = getLang() === 'en' ? 'sessions.en.html' : 'sessions.html';
  return `<div class="card p-6 text-center flex flex-col items-center gap-3">
    ${medallion({ icon: 'calendar-plus', tone: 'primary', variant: 'soft', size: 'lg' })}
    <div>
      <h3 class="text-[15px] font-bold text-ink mb-1">${t('state.empty.title')}</h3>
      <p class="text-[13px] leading-relaxed max-w-xs mx-auto" style="color:var(--c-ink-3)">${t('state.empty.msg')}</p>
    </div>
    <a class="btn btn-primary btn-sm" href="${sessionsHref}">${icon('plus', 'ico')}<span>${t('state.empty.cta')}</span></a>
  </div>`;
}
