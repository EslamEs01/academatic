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
import { FAMILY_STATUS } from '../components/family-status.js';

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

  return `
    ${pageHeader({ titleKey: 'fam.title', subKey: 'fam.sub', primary: button({ labelKey: 'fam.add', variant: 'primary', icon: 'user-plus', href: addHref }), summaryHTML: summary })}
    ${filters}
    ${cardGrid(cards, { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'families-grid' })}
    ${noResults()}
  `;
}
