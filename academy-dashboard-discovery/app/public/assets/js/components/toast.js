/* Transient toast — accessible (aria-live), non-blocking. Used to give inert
 * (fixture) actions visible feedback so there are no dead buttons. */
import { icon } from '../icons.js';
import { esc } from '../dom.js';

let wrap;
function ensureWrap() {
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'toast-wrap';
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('role', 'status');
    document.body.appendChild(wrap);
  }
  return wrap;
}

export function toast(message, { ico = 'check-circle' } = {}) {
  const w = ensureWrap();
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${icon(ico, 'ico')}<span>${esc(message)}</span>`;
  w.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(6px)'; }, 2600);
  setTimeout(() => el.remove(), 2900);
}
