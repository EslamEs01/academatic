/* Families directory (Spec 004, US1) — a premium grid of family-as-hero CARDS
 * that group each family's children, with search + status + category filters.
 * Admin directory only — NOT a family portal/dashboard. */
import { FAMILIES, FAMILY_CATEGORIES } from '../fixtures/families.js';
import { studentsOfFamily } from '../fixtures/students.js';
import { t, num, getLang } from '../i18n.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { button } from '../components/ui.js';
import { familyCard } from '../components/family-card.js';
import { noResults } from '../components/states.js';
import { FAMILY_STATUS, familyStatusChip } from '../components/family-status.js';
import { famEditDrawer, famCatDrawer } from './family.js';
import { tabs } from '../components/tabs.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

export function renderFamilies() {
  const rows = FAMILIES.rows;
  const active = rows.filter((r) => r.statusId === 'active').length;
  const attention = rows.filter((r) => r.attention).length;
  const addHref = getLang() === 'en' ? 'add-family.en.html' : 'add-family.html';

  const summary = summaryCards([
    { icon: 'families', tone: 'primary', value: num(rows.length), labelKey: 'fam.sum.total' },
    { icon: 'check-circle', tone: 'success', value: num(active), labelKey: 'fam.sum.active' },
    { icon: 'alert-triangle', tone: 'amber', value: num(attention), labelKey: 'fam.sum.attention' },
  ], { cols: 'grid-cols-1 sm:grid-cols-3' });

  const filters = filterBar({
    targetId: 'families-grid', searchKey: 'fam.searchPh',
    selects: [
      { name: 'status', labelKey: 'fam.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...Object.keys(FAMILY_STATUS).map((v) => ({ value: v, labelKey: FAMILY_STATUS[v].labelKey }))] },
      { name: 'category', labelKey: 'fam.fCategory', options: [{ value: 'all', labelKey: 'fam.allCategories' }, ...FAMILY_CATEGORIES.map((c) => ({ value: c.id, labelKey: c.nameKey }))] },
    ],
  });

  const cards = rows.map((f) => familyCard(f, studentsOfFamily(f.id)));

  /* Spec 037 — the existing directory (filters + cards) becomes the Directory tab;
   * a labeled Family Categories board is added as the Categories tab
   * (families.html#view=categories). The single filterBar stays in Directory only. */
  const directory = `
    ${filters}
    ${cardGrid(cards, { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'families-grid' })}
    ${noResults()}
  `;

  /* Spec 032 (FC-04/FC-05) — this page hosts the card kebab (Edit / Reclassify),
   * so the shared fam-edit form drawer + fam-cat picker drawer are baked here
   * once (same builders as family.html — no duplicate template per card). */
  return `
    ${pageHeader({ titleKey: 'fam.title', subKey: 'fam.sub', primary: button({ labelKey: 'fam.add', variant: 'primary', icon: 'user-plus', href: addHref }), summaryHTML: summary })}
    ${tabs({
      group: 'families',
      ariaKey: 'fam.title',
      items: [
        { id: 'directory', labelKey: 'fam.cats.tabDirectory', icon: 'families' },
        { id: 'categories', labelKey: 'fam.cats.tabCategories', icon: 'filter' },
      ],
      panels: { directory, categories: categoriesPanel() },
    })}
    ${famEditDrawer()}
    ${famCatDrawer(rows[0])}
  `;
}

/* Spec 037 — Family Categories display board (families.html#view=categories).
 * Renders the authored FAMILY_CATEGORIES (name + description + authored member
 * count + status chip). Reclassify reuses the existing fam-cat drawer; Create is a
 * backendRequired gate. NO computed statistic, NO fake persistence/mutation. */
function categoryCard(c) {
  return `<div class="card p-4">
    <div class="flex items-center justify-between gap-2 mb-2">
      <span class="font-bold text-ink text-[14px]">${esc(t(c.nameKey))}</span>
      ${familyStatusChip(c.statusId)}
    </div>
    <p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${esc(t(c.descKey))}</p>
    <div class="flex items-center gap-2">${icon('families', 'ico ico-sm')}<span class="text-[13px] tabular" style="color:var(--c-ink-2)">${t('fam.cat.members', { n: num(c.count) })}</span></div>
  </div>`;
}
function categoriesPanel() {
  const createGate = `<button type="button" class="btn btn-primary btn-sm" data-disabled-reason data-reason-key="fam.cats.createReason" aria-disabled="true" title="${esc(t('fam.cats.createReason'))}">${icon('plus', 'ico ico-sm')}<span>${esc(t('fam.cats.create'))}</span></button>`;
  const actions = `<div class="flex flex-wrap gap-2">
    ${createGate}
    ${button({ labelKey: 'fam.cat.reclass', variant: 'secondary', size: 'sm', icon: 'filter', attrs: 'data-drawer="fam-cat"' })}
  </div>`;
  return `<section class="mt-4">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div>
        <h2 class="section-title">${esc(t('fam.cats.title'))}</h2>
        <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('fam.cats.sub'))}</p>
      </div>
      ${actions}
    </div>
    ${cardGrid(FAMILY_CATEGORIES.map(categoryCard), { cols: 'sm:grid-cols-2 lg:grid-cols-3', id: 'fam-cats-grid' })}
  </section>`;
}
