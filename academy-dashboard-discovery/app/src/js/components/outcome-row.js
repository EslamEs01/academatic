/* Attendance list/card-hybrid row (Spec 005, R39). One airy `.outcome-row` per
 * session outcome: when · teacher · session+course · student/family link-chips ·
 * the labeled OUTCOME chip (PRIMARY here) · a follow-up flag · a kebab that opens
 * the canonical outcome drawer. Filterable via facetAttrs; reflows to a card on
 * mobile (CSS). Presentational — the page passes an item enriched with the
 * resolved student/family (nameKey/accent/href). NOT a table; NOT a numeric dump. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { avatar } from './ui.js';
import { outcomeChip } from './outcome-status.js';
import { attentionFlag } from './attention-flag.js';

export function outcomeRow(i) {
  const search = `${t(i.titleKey)} ${t(i.trainer.nameKey)} ${i.studentNameKey ? t(i.studentNameKey) : ''} ${i.familyKey ? t(i.familyKey) : ''}`;
  const facets = facetAttrs({ outcome: i.outcomeId, teacher: i.trainer.id, family: i.familyId, day: i.dayId, subject: i.subject, attention: i.followUp ? '1' : '', search });
  const studentChip = (i.studentHref && i.studentNameKey)
    ? `<a href="${esc(i.studentHref)}" class="link-chip">${icon('user', 'ico')}<span>${t(i.studentNameKey)}</span></a>` : '';
  const familyChip = (i.familyHref && i.familyKey)
    ? `<a href="${esc(i.familyHref)}" class="link-chip">${icon('families', 'ico')}<span>${t(i.familyKey)}</span></a>` : '';
  const follow = i.followUp ? attentionFlag({ kind: 'attention', labelKey: i.followUp.labelKey }) : '';
  return `<div class="outcome-row is-hoverable" ${facets}>
    <div class="or-when"><div class="t1">${i.time}</div><div class="t2">${t(i.dateKey)}</div></div>
    ${avatar({ nameKey: i.trainer.nameKey, accent: i.trainer.accent, size: 'sm' })}
    <div class="or-body">
      <div class="or-title">${t(i.titleKey)}</div>
      <div class="or-sub">${t(i.subjectKey)} · ${t(i.trainer.nameKey)}</div>
      <div class="or-meta">${outcomeChip(i.outcomeId)}${studentChip}${familyChip}${follow}</div>
    </div>
    <div class="or-end">
      <button type="button" class="icon-btn" data-row-menu="${esc(i.id)}" aria-haspopup="menu" aria-label="${esc(t('att.outcome'))}">${icon('ellipsis', 'ico')}</button>
    </div>
  </div>`;
}
