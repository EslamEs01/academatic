/* Spec 026 — the two folded ops bands (display-only). Every write is an honest
 * backendRequired gate (button disabled + reasonKey → the existing data-disabled-reason
 * toast). No new hook, no persistence, no pay figures. */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { icon } from '../icons.js';
import { medallion, button, chip } from './ui.js';
import { QUEUE_ITEMS, SCHEDULE_REQUESTS } from '../fixtures/ops-bands.js';

const LEVEL_TONE = { urgent: 'cancelled', medium: 'amber', normal: 'neutral' };
const QSTATUS_TONE = { open: 'upcoming', inprogress: 'amber', closed: 'completed' };
const KIND_TONE = { regular: 'neutral', trial: 'amber' };

/* honest backendRequired gate — clickable (aria-disabled, not HTML-disabled) so the
 * existing data-disabled-reason handler toasts the reason on click; never a dead button. */
const gate = (labelKey, ic) => button({ labelKey, icon: ic, variant: 'secondary', size: 'sm', attrs: `aria-disabled="true" data-disabled-reason data-reason-key="ops.reason.backend" title="${esc(t('ops.reason.backend'))}"` });

function bandHead(ic, titleKey, subKey, actionHTML = '') {
  return `<div class="flex items-center gap-3 mb-3">
    ${medallion({ icon: ic, tone: 'primary', variant: 'soft', size: 'sm' })}
    <div class="min-w-0">
      <h2 class="text-[15px] font-bold text-ink">${t(titleKey)}</h2>
      <p class="text-[12px]" style="color:var(--c-ink-3)">${t(subKey)}</p>
    </div>
    <div class="ms-auto shrink-0">${actionHTML}</div>
  </div>`;
}

/* total-queues fold → Sessions page: authored ops queue/notes, add = backendRequired */
export function queueBand() {
  const addGate = gate('ops.queue.add', 'plus');
  const rows = QUEUE_ITEMS.map((q) => `<div class="card p-4 flex items-center gap-3">
      ${chip({ labelKey: 'ops.queue.lvl.' + q.levelId, tone: LEVEL_TONE[q.levelId] || 'neutral', icon: 'flag' })}
      <div class="min-w-0 flex-1">
        <div class="text-[13px] font-bold text-ink">${t(q.textKey)}</div>
        <div class="text-[12px]" style="color:var(--c-ink-3)">${t(q.classKey)}</div>
      </div>
      ${chip({ labelKey: 'ops.queue.st.' + q.statusId, tone: QSTATUS_TONE[q.statusId] || 'neutral', icon: 'clock' })}
    </div>`).join('');
  return `<section class="mt-7" aria-label="${esc(t('ops.queue.title'))}">
    ${bandHead('inbox', 'ops.queue.title', 'ops.queue.sub', addGate)}
    <div class="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">${rows}</div>
  </section>`;
}

/* schedule-requests fold → Schedule page: pending inbox preview, accept/reject = backendRequired */
export function scheduleRequestsBand() {
  const rows = SCHEDULE_REQUESTS.map((r) => {
    const accept = gate('ops.req.accept', 'check-circle');
    const reject = gate('ops.req.reject', 'x-circle');
    return `<div class="card p-4">
      <div class="flex items-center gap-2 mb-2">
        ${chip({ labelKey: 'ops.req.kind.' + r.kindId, tone: KIND_TONE[r.kindId] || 'neutral', icon: 'calendar' })}
        <span class="text-[12px] tabular" style="color:var(--c-ink-3)">${t(r.whenKey)}</span>
      </div>
      <div class="text-[13px] font-bold text-ink">${t(r.studentKey)}</div>
      <div class="text-[12px] mb-3" style="color:var(--c-ink-3)">${t(r.courseKey)}</div>
      <div class="flex flex-wrap gap-2">${accept}${reject}</div>
    </div>`;
  }).join('');
  return `<section class="mt-7" aria-label="${esc(t('ops.req.title'))}">
    ${bandHead('inbox', 'ops.req.title', 'ops.req.sub')}
    <div class="grid gap-3 grid-cols-1 md:grid-cols-2">${rows}</div>
  </section>`;
}
