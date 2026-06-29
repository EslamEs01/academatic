/* Reports overview — reuses the shell, shows report entry cards only (no detail). */
import { REPORTS } from '../fixtures/reports.js';
import { PROFILE } from '../fixtures/profile.js';
import { reportCard } from '../components/report-card.js';
import { t } from '../i18n.js';

const can = (r) => !r.requiresPermission || PROFILE.permissions.includes(r.requiresPermission);

export function renderReports() {
  return `
    <div class="mb-6">
      <h1 class="section-title" style="font-size:22px">${t('reportsPage.title')}</h1>
      <p class="text-[13.5px] mt-1" style="color:var(--c-ink-3)">${t('reportsPage.subtitle')}</p>
    </div>
    <div class="grid-reports">
      ${REPORTS.map((r) => reportCard(r, { hasPermission: can(r) })).join('')}
    </div>
  `;
}
