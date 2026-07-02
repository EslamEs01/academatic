/* Family-as-hero card (Spec 004, R21) — leads with the guardian + the family's
 * children GROUPED visually (overlapping avatar stack + "+N" overflow, baked at
 * build time), with student & active-course counts, a labeled lifecycle status
 * chip, the category segment, a fixture attention hint, and a "view profile"
 * link to family.html. Filterable via facetAttrs (status/category/search).
 * NO data-drawer here (quick-peek lives on the students list) — per contract. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { avatar, chip } from './ui.js';
import { statMini } from './directory-card.js';
import { attentionFlag } from './attention-flag.js';
import { familyStatusChip } from './family-status.js';
import { FAMILY_CATEGORIES } from '../fixtures/families.js';

const CAT_NAME = Object.fromEntries(FAMILY_CATEGORIES.map((c) => [c.id, c.nameKey]));
const MAX_AVATARS = 4;

/** @param {object} f family · @param {object[]} kids resolved child students */
export function familyCard(f, kids = []) {
  const guardianName = t(f.guardian.nameKey);
  const search = `${guardianName} ${kids.map((k) => t(k.nameKey)).join(' ')}`;
  const shown = kids.slice(0, MAX_AVATARS);
  const extra = kids.length - shown.length;

  const childrenHTML = kids.length
    ? `<div class="fam-avatars" aria-hidden="true">${shown.map((k) => avatar({ nameKey: k.nameKey, accent: k.accent, size: 'sm' })).join('')}${extra > 0 ? `<span class="fam-more">${t('fam.card.more', { n: num(extra) })}</span>` : ''}</div>
       <span class="text-[12.5px] font-bold" style="color:var(--c-ink-2)">${num(kids.length)} ${t('fam.card.students')}</span>
       <span class="sr-only">${esc(kids.map((k) => t(k.nameKey)).join('، '))}</span>`
    : `<span class="fam-children-empty">${icon('user-plus', 'ico ico-sm')}${t('fam.card.noChildren')}</span>`;

  const meta = `${chip({ labelKey: CAT_NAME[f.categoryId], tone: 'neutral', icon: 'filter' })}${f.attention ? attentionFlag(f.attention) : ''}`;
  const stats = statMini(num(kids.length), 'fam.kpi.students') + statMini(num(f.activeCoursesCount), 'fam.kpi.courses');
  const href = getLang() === 'en' ? 'family.en.html' : 'family.html';

  return `<div class="family-card is-hoverable" ${facetAttrs({ status: f.statusId, category: f.categoryId, search, attention: f.attention ? f.attention.kind : '' })}>
    <div class="fam-head">
      ${avatar({ nameKey: f.guardian.nameKey, accent: f.guardian.accent })}
      <div class="fam-id">
        <div class="flex items-center gap-2">
          <h3 class="font-bold text-ink text-[14.5px] truncate">${esc(guardianName)}</h3>${familyStatusChip(f.statusId)}
        </div>
        <p class="text-[12px] truncate" style="color:var(--c-ink-3)">${esc(t(f.location.cityKey))} · ${esc(t(f.joinedDateKey))}</p>
      </div>
      <button type="button" class="icon-btn shrink-0" data-row-menu="${esc(f.id)}" data-row-menu-kind="family" aria-haspopup="menu" aria-label="${esc(t('fam.card.menu'))}">${icon('ellipsis', 'ico')}</button>
    </div>
    <div class="fam-children">${childrenHTML}</div>
    <div class="flex flex-wrap items-center gap-1.5">${meta}</div>
    <div class="fam-stats">${stats}</div>
    <a href="${href}" class="btn btn-secondary btn-sm w-full">${icon('user', 'ico ico-sm')}<span>${t('fam.card.viewProfile')}</span></a>
  </div>`;
}
