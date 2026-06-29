/* Generalized table (reuses the Spec 001 `.tbl` look). Pages build row HTML
 * (each `<tr data-row data-<facet>=...>`); this wraps head + body + footer.
 * `head`: [{ label, end? }]  ·  `rows`: array of <tr> strings. */
import { esc } from '../dom.js';

export function dataTable({ id, head, rows, footerHTML = '' } = {}) {
  return `<section class="card overflow-hidden" ${id ? `id="${esc(id)}"` : ''} data-table>
    <div class="overflow-x-auto">
      <table class="tbl">
        <thead><tr>${head.map((h) => `<th class="${h.end ? 'text-end' : ''}">${h.label}</th>`).join('')}</tr></thead>
        <tbody>${rows.join('')}</tbody>
      </table>
    </div>
    ${footerHTML ? `<div class="border-t" style="border-color:var(--c-line)">${footerHTML}</div>` : ''}
  </section>`;
}

/** simple "showing X of N" + pager footer (matches the dashboard) */
import { t, num } from '../i18n.js';
export function tableFooter({ shown, total, totalKey = 'table.showing' } = {}) {
  return `<div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
    <span class="text-[12.5px]" style="color:var(--c-ink-3)" data-shown-summary data-total="${total}">${t(totalKey, { shown: num(shown), total: num(total) })}</span>
    <div class="flex items-center gap-1.5" role="navigation" aria-label="pagination">
      <button type="button" class="pager">${num(3)}</button>
      <button type="button" class="pager">${num(2)}</button>
      <button type="button" class="pager is-current" aria-current="page">${num(1)}</button>
    </div>
  </div>`;
}
