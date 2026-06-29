/* Tiny native DOM helpers — no framework. */

export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function frag(html) {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content;
}

export function setHTML(node, html) { node.innerHTML = html; return node; }

export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* event delegation: on(root, 'click', '.sel', (e, matchedEl) => {}) */
export function on(root, type, selector, handler) {
  root.addEventListener(type, (e) => {
    const m = e.target.closest(selector);
    if (m && root.contains(m)) handler(e, m);
  });
}

export const qs = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
