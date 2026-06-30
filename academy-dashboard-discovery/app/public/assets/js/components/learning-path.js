/* Learning Path — a DISPLAY-ONLY level ladder inside the course profile (Spec 006, R47).
 * The academy level sequence (foundation → l1 → l2 → l3 → advanced) as labeled, ordered
 * `.level-step`s with per-level fixture student counts + a current-level marker + a
 * certificates hint. There is NO curriculum/unit/module/milestone engine, NO editing,
 * NO computed analytics — the reference system had no such structure. Pure markup. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';

export function learningPath(course) {
  const levels = course.levels || [];
  const curIdx = levels.findIndex((l) => l.isCurrent);
  const steps = levels.map((l, idx) => {
    const done = curIdx >= 0 && idx < curIdx;
    const ic = l.isCurrent ? 'target' : (done ? 'check-circle' : 'graduation-cap');
    return `<li class="level-step${l.isCurrent ? ' is-current' : ''}${done ? ' is-done' : ''}">
      <span class="ls-dot">${icon(ic, 'ico ico-sm')}</span>
      <div class="min-w-0">
        <div class="ls-label">${t(l.labelKey)}${l.isCurrent ? ` <span class="ls-cur">· ${t('crs.lp.current')}</span>` : ''}</div>
        <div class="ls-count tabular">${t('crs.lp.students', { n: num(l.studentsCount) })}</div>
      </div>
    </li>`;
  }).join('');
  const certs = course.certificates || 0;
  return `<div class="flex items-center justify-between gap-3 mb-3">
      <h2 class="section-title">${t('crs.lp.title')}</h2>
      <span class="chip tone-neutral">${icon('award', 'ico')}<span>${t('crs.lp.certHint', { n: num(certs) })}</span></span>
    </div>
    <p class="text-[12.5px] mb-4" style="color:var(--c-ink-3)">${t('crs.lp.sub')}</p>
    <ol class="level-ladder">${steps}</ol>
    <p class="text-[12px] mt-3" style="color:var(--c-ink-3)">${icon('alert-triangle', 'ico ico-sm')} ${t('crs.lp.display')}</p>`;
}
