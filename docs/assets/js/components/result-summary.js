/* Student Results surface (Spec 004, R26 / student-result-contract) — FIXTURE
 * ONLY: per-course progress (hand-rolled bars, no chart library) + certificates
 * list + a level/term summary. NO gradebook, NO marks, NO computed score.
 * Rendered inside student.html's Results tabpanel from Student.results. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, chip, button } from './ui.js';
import { progressBar } from './sparkline.js';

const tone = (p) => (p >= 70 ? 'success' : p >= 40 ? 'sky' : 'amber');

function certRow(c) {
  const issued = c.statusId !== 'pending';
  const status = chip({ labelKey: issued ? 'res.certStatus.issued' : 'res.certStatus.pending', tone: issued ? 'completed' : 'amber', icon: issued ? 'award' : 'clock' });
  return `<div class="cert-row">
    <span class="cert-ico">${icon('award', 'ico ico-sm')}</span>
    <div class="min-w-0 flex-1">
      <div class="font-bold text-[13px] text-ink truncate">${t(c.titleKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(c.dateKey)}</div>
    </div>
    ${status}
    <button type="button" class="btn btn-secondary btn-sm" data-demo-action data-toast="${esc(t('res.printToast'))}">${icon('file-text', 'ico ico-sm')}<span>${t('common.view')}</span></button>
  </div>`;
}

export function resultSummary(r) {
  if (!r) return `<div class="empty-row">${t('res.note')}</div>`;
  const courses = r.courses.map((c) => `<div class="result-course">
    <span class="rc-title">${t(c.courseTitleKey)}</span>
    <div class="rc-bar">${progressBar(c.progress, tone(c.progress))}</div>
    <span class="rc-pct tabular">${num(c.progress)}%</span>
  </div>`).join('');

  const certs = r.certificates && r.certificates.length
    ? r.certificates.map(certRow).join('')
    : `<div class="empty-row">${t('res.noCerts')}</div>`;

  return `
    <div class="info-card mb-4">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <div class="ic-title" style="margin-bottom:2px">${icon('trending-up', 'ico')}<span>${t('res.title')}</span></div>
          <p class="text-[12.5px]" style="color:var(--c-ink-3)">${t(r.levelKey)} · ${t(r.termKey)}</p>
        </div>
        <div class="text-end">
          <div class="font-bold tabular text-ink" style="font-size:24px;line-height:1">${num(r.overallProgress)}%</div>
          <div class="text-[11.5px]" style="color:var(--c-ink-3)">${t('res.overall')}</div>
        </div>
      </div>
      <div>${progressBar(r.overallProgress, tone(r.overallProgress))}</div>
    </div>

    <div class="info-card mb-4">
      <div class="ic-title">${icon('book-open', 'ico')}<span>${t('res.courses')}</span></div>
      ${courses}
    </div>

    <div class="info-card">
      <div class="ic-title">${icon('award', 'ico')}<span>${t('res.certificates')}</span></div>
      ${certs}
    </div>

    <div class="flex flex-wrap items-center gap-2 mt-4">
      ${button({ labelKey: 'res.export', variant: 'secondary', size: 'sm', icon: 'file-text', disabled: true, reasonKey: 'res.exportReason' })}
      ${button({ labelKey: 'res.print', variant: 'secondary', size: 'sm', icon: 'file-text', attrs: `data-demo-action data-toast="${esc(t('res.printToast'))}"` })}
      <span class="text-[12px]" style="color:var(--c-ink-3)">${t('res.note')}</span>
    </div>
  `;
}
