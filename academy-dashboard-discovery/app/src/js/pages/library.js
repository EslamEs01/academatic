/* Spec 031 (US2) — Materials & Library. A Content hub with two tabs: Materials (bilingual
 * subject catalog, name-only modals) and Books (media catalog with filters + a category
 * drawer). Display-only; views/downloads are authored count LITERALS. Add-Material/Upload/
 * Download/Publish/Delete are backendRequired gates — NO type=file, NO download link, NO fake
 * publish/delete. Reuses the closed data-* hook set. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { chip, button } from '../components/ui.js';
import { tabs } from '../components/tabs.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { previewTemplate } from '../components/preview-drawer.js';
import { SUBJECTS, BOOKS, BOOK_TYPES, BOOK_STATUS, BOOK_CATEGORIES } from '../fixtures/content-library.js';

const gate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;
const ghostGate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-ghost btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;
const modalBtn = (labelKey, ic, titleKey, variant = 'secondary') =>
  button({ labelKey, variant, size: 'sm', icon: ic, attrs: `data-modal-trigger data-modal-title-key="${esc(titleKey)}" data-modal-note-key="common.backendRequiredNote"` });
const confirmBtn = (labelKey, ic, k) =>
  `<button type="button" class="btn btn-ghost btn-sm" data-confirm data-confirm-danger data-confirm-title="${esc(t(k + 'Title'))}" data-confirm-msg="${esc(t(k + 'Msg'))}" data-confirm-cta="${esc(t(k + 'Cta'))}" data-confirm-toast="${esc(t(k + 'Toast'))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;

const typeChip = (id) => chip({ labelKey: (BOOK_TYPES[id] || {}).labelKey || 'adm.lib.type.file', tone: (BOOK_TYPES[id] || {}).tone || 'neutral', icon: (BOOK_TYPES[id] || {}).icon || 'file-text' });
const bookStatusChip = (id) => chip({ labelKey: (BOOK_STATUS[id] || {}).labelKey || 'adm.lib.st.draft', tone: (BOOK_STATUS[id] || {}).tone || 'neutral', icon: (BOOK_STATUS[id] || {}).icon || 'clock' });

/* ---------------- Materials tab (subject catalog) ---------------- */
function subjectRow(s) {
  return `<tr data-row>
    <td><span class="font-bold text-ink">${t(s.nameKey)}</span></td>
    <td><span style="color:var(--c-ink-2)">${t(s.nameArKey)}</span></td>
    <td class="text-end"><div class="flex flex-wrap gap-1.5 justify-end">
      ${modalBtn('adm.common.edit', 'edit', 'adm.lib.matEditTitle', 'ghost')}
      ${confirmBtn('adm.lib.matDel', 'x-circle', 'adm.lib.matDel')}
    </div></td>
  </tr>`;
}
function materialsPanel() {
  const add = modalBtn('adm.lib.matAdd', 'plus', 'adm.lib.matAddTitle', 'primary');
  return `<div class="flex items-center flex-wrap gap-2 mb-3">${add}</div>
    <section class="card overflow-hidden"><div class="overflow-x-auto"><table class="tbl">
      <thead><tr><th>${t('adm.lib.matName')}</th><th>${t('adm.lib.matNameAr')}</th><th class="text-end"><span class="sr-only">${t('adm.common.edit')}</span></th></tr></thead>
      <tbody>${SUBJECTS.map(subjectRow).join('')}</tbody>
    </table></div></section>`;
}

/* ---------------- Books tab (media catalog) ---------------- */
function bookRow(b) {
  return `<tr data-row ${facetAttrs({ search: t(b.nameKey), type: b.typeId, category: b.categoryKey })}>
    <td><span class="font-bold text-ink">${t(b.nameKey)}</span></td>
    <td>${typeChip(b.typeId)}</td>
    <td><span style="color:var(--c-ink-2)">${t(b.categoryKey)}</span></td>
    <td><span class="text-[12.5px]" style="color:var(--c-ink-3)">${t(b.publishedKey)}</span></td>
    <td><span class="tabular">${num(b.views)}</span></td>
    <td><span class="tabular">${num(b.downloads)}</span></td>
    <td>${bookStatusChip(b.statusId)}</td>
    <td class="text-end"><div class="flex flex-wrap gap-1.5 justify-end">
      ${ghostGate('adm.lib.download', 'download', 'adm.lib.downloadReason')}
      ${ghostGate('adm.lib.publish', 'check-circle', 'adm.lib.publishReason')}
      ${confirmBtn('adm.lib.del', 'x-circle', 'adm.lib.del')}
    </div></td>
  </tr>`;
}
function categoryDrawer() {
  const rows = BOOK_CATEGORIES.map((c) => `<div class="sheet-row"><span class="k">${t(c.nameKey)}</span><span class="v tabular">${num(c.count)}</span></div>`).join('');
  const body = `<div class="sheet-rows">${rows}</div><div class="mt-4">${modalBtn('adm.lib.catAdd', 'plus', 'adm.lib.catAddTitle')}</div>`;
  return previewTemplate('lib-cats', { titleKey: 'adm.lib.catDrawerTitle', headIcon: 'filter', tone: 'teal', bodyHTML: body });
}
function booksPanel() {
  const typeOpts = [{ value: '', labelKey: 'adm.lib.allTypes' }, ...Object.keys(BOOK_TYPES).map((k) => ({ value: k, labelKey: BOOK_TYPES[k].labelKey }))];
  const catOpts = [{ value: '', labelKey: 'adm.lib.allCats' }, ...BOOK_CATEGORIES.map((c) => ({ value: c.nameKey, labelKey: c.nameKey }))];
  const toolbar = `<div class="flex items-center flex-wrap gap-2 mb-3">
    ${gate('adm.lib.addMaterial', 'plus', 'adm.lib.addMaterialReason')}
    ${button({ labelKey: 'adm.lib.categories', variant: 'secondary', size: 'sm', icon: 'filter', attrs: 'data-drawer="lib-cats"' })}
  </div>`;
  const filters = filterBar({
    targetId: 'books-rows', searchKey: 'adm.lib.filterSearch',
    selects: [
      { name: 'type', labelKey: 'adm.lib.filterType', options: typeOpts },
      { name: 'category', labelKey: 'adm.lib.filterCat', options: catOpts },
    ],
  });
  const table = `<section class="card overflow-hidden"><div class="overflow-x-auto"><table class="tbl">
    <thead><tr>
      <th>${t('adm.lib.colName')}</th><th>${t('adm.lib.colType')}</th><th>${t('adm.lib.colCategory')}</th>
      <th>${t('adm.lib.colPublished')}</th><th>${t('adm.lib.colViews')}</th><th>${t('adm.lib.colDownloads')}</th>
      <th>${t('adm.lib.colStatus')}</th><th class="text-end"><span class="sr-only">${t('adm.lib.download')}</span></th>
    </tr></thead>
    <tbody id="books-rows">${BOOKS.map(bookRow).join('')}</tbody>
  </table></div></section>`;
  return `${toolbar}${filters}${table}${categoryDrawer()}`;
}

export function renderLibrary() {
  const views = tabs({
    group: 'library', ariaKey: 'adm.lib.tab.aria',
    items: [
      { id: 'materials', labelKey: 'adm.lib.tab.materials', icon: 'materials' },
      { id: 'books', labelKey: 'adm.lib.tab.books', icon: 'curricula' },
    ],
    panels: { materials: materialsPanel(), books: booksPanel() },
  });
  return `${pageHeader({ titleKey: 'adm.lib.title', subKey: 'adm.lib.sub' })}${views}`;
}
