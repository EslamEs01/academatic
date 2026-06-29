/* Responsive card-grid wrapper. `items` may be an array of HTML strings or a string. */
export function cardGrid(items, { cols = 'sm:grid-cols-2 xl:grid-cols-3', id = '' } = {}) {
  const inner = Array.isArray(items) ? items.join('') : items;
  return `<div class="grid gap-4 grid-cols-1 ${cols}" ${id ? `id="${id}"` : ''} data-grid>${inner}</div>`;
}
