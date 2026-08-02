/* Spec 031 (US2) — Materials & Library. A Content hub with two tabs: Materials (bilingual
 * subject catalog) and Books (media catalog with filters + a category drawer). Display-only;
 * views/downloads are authored count LITERALS. Download/Publish/Delete are backendRequired
 * gates — no real upload control (upload stays a gate), NO download link, NO fake
 * publish/delete. Spec 032 (FC-36/37/38): Add/Edit subject + Add library item are form
 * drawers (editable fields + one truthful backend-required terminal state each); the categories drawer gains a
 * real inline create form. Reuses the closed data-* hook set. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { chip, button } from '../components/ui.js';
import { tabs } from '../components/tabs.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { previewTemplate, formDrawer } from '../components/preview-drawer.js';
import { field } from '../components/form-field.js';
import { FORM_STATUS_OPTS } from '../fixtures/form-options.js';
import { SUBJECTS, BOOKS, BOOK_TYPES, BOOK_STATUS, BOOK_CATEGORIES } from '../fixtures/content-library.js';

const gate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-secondary btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;
const ghostGate = (labelKey, ic, reasonKey) =>
  `<button type="button" class="btn btn-ghost btn-sm" data-disabled-reason data-reason-key="${esc(reasonKey)}" aria-disabled="true" title="${esc(t(reasonKey))}">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></button>`;
const drawerBtn = (labelKey, ic, id, variant = 'secondary') =>
  button({ labelKey, variant, size: 'sm', icon: ic, attrs: `data-drawer="${esc(id)}"` });
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
      ${drawerBtn('adm.common.edit', 'edit', 'mat-edit', 'ghost')}
      ${confirmBtn('adm.lib.matDel', 'x-circle', 'adm.lib.matDel')}
    </div></td>
  </tr>`;
}
/* Spec 032/044 (FC-36/37) — subject forms: Add (blank) + Edit (prefilled
 * with the first authored subject). Editable frontend-only fields + one truthful terminal each. */
function matFormDrawer(id, prefix, titleKey, s) {
  const fields = field({ labelKey: 'adm.lib.matName', name: `${prefix}-name`, valueKey: s ? s.nameKey : undefined, full: true })
    + field({ labelKey: 'adm.lib.matNameAr', name: `${prefix}-nameAr`, valueKey: s ? s.nameArKey : undefined, full: true });
  return formDrawer(id, { titleKey, headIcon: s ? 'edit' : 'plus', tone: 'teal', fields, ctaKey: s ? 'common.save' : 'common.add' });
}
function materialsPanel() {
  const add = drawerBtn('adm.lib.matAdd', 'plus', 'mat-add', 'primary');
  return `<div class="flex items-center flex-wrap gap-2 mb-3">${add}</div>
    <section class="card overflow-hidden"><div class="overflow-x-auto"><table class="tbl">
      <thead><tr><th>${t('adm.lib.matName')}</th><th>${t('adm.lib.matNameAr')}</th><th class="text-end"><span class="sr-only">${t('adm.common.edit')}</span></th></tr></thead>
      <tbody>${SUBJECTS.map(subjectRow).join('')}</tbody>
    </table></div></section>
    ${matFormDrawer('mat-add', 'matAdd', 'adm.lib.matAddTitle')}
    ${matFormDrawer('mat-edit', 'matEdit', 'adm.lib.matEditTitle', SUBJECTS[0])}`;
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
/* Spec 032/044 (FC-38) — the categories surface keeps its read-only list and a
 * real inline create form whose shared terminal action validates before showing
 * the truthful backend-required state. */
function categoryDrawer() {
  const rows = BOOK_CATEGORIES.map((c) => `<div class="sheet-row"><span class="k">${t(c.nameKey)}</span><span class="v tabular">${num(c.count)}</span></div>`).join('');
  const form = `<div class="mt-4">
    <div class="font-bold text-[12.5px] text-ink mb-1.5">${t('adm.lib.catAdd')}</div>
    <div class="wiz-grid">
      ${field({ labelKey: 'adm.lib.catName', name: 'libCats-name', full: true })}
      ${field({ labelKey: 'adm.lib.catStatus', name: 'libCats-status', type: 'select', options: FORM_STATUS_OPTS, full: true })}
    </div>
  </div>`;
  const body = `<div class="sheet-rows">${rows}</div>${form}`;
  const footerHTML = `<button type="button" class="btn btn-primary btn-sm" data-interaction-submit data-reason-key="common.backendRequiredNote" title="${esc(t('common.backendRequiredNote'))}">${icon('plus', 'ico ico-sm')}<span>${t('adm.lib.catAdd')}</span></button>`;
  return previewTemplate('lib-cats', { titleKey: 'adm.lib.catDrawerTitle', headIcon: 'filter', tone: 'teal', bodyHTML: body, footerHTML });
}
/* Spec 032 (FC-38) — the Add-library-item form drawer: title + fixture-derived
 * type/category selects; the item source + thumbnail affordances stay inline
 * gates (upload stays a gate). Ends at the ONE formDrawer backendRequired final. */
function libItemDrawer() {
  const typeOpts = Object.keys(BOOK_TYPES).map((k, i) => ({ value: k, labelKey: BOOK_TYPES[k].labelKey, selected: i === 0 }));
  const catOpts = BOOK_CATEGORIES.map((c, i) => ({ value: c.id, labelKey: c.nameKey, selected: i === 0 }));
  const fields = [
    field({ labelKey: 'adm.lib.colName', name: 'libItem-name', full: true }),
    field({ labelKey: 'adm.lib.colType', name: 'libItem-type', type: 'select', options: typeOpts }),
    field({ labelKey: 'adm.lib.colCategory', name: 'libItem-category', type: 'select', options: catOpts }),
  ].join('') + `<div class="field field-full"><div class="flex flex-wrap gap-2">${gate('adm.lib.upload', 'file-text', 'adm.lib.uploadReason')}${gate('adm.lib.thumb', 'award', 'adm.lib.thumbReason')}</div></div>`;
  return formDrawer('lib-item', { titleKey: 'adm.lib.itemAddTitle', headIcon: 'curricula', fields, ctaKey: 'common.add' });
}
function booksPanel() {
  const typeOpts = [{ value: '', labelKey: 'adm.lib.allTypes' }, ...Object.keys(BOOK_TYPES).map((k) => ({ value: k, labelKey: BOOK_TYPES[k].labelKey }))];
  const catOpts = [{ value: '', labelKey: 'adm.lib.allCats' }, ...BOOK_CATEGORIES.map((c) => ({ value: c.nameKey, labelKey: c.nameKey }))];
  const toolbar = `<div class="flex items-center flex-wrap gap-2 mb-3">
    ${drawerBtn('adm.lib.addMaterial', 'plus', 'lib-item', 'primary')}
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
  return `${toolbar}${filters}${table}${categoryDrawer()}${libItemDrawer()}`;
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
