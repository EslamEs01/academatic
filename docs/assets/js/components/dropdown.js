/* Lightweight popover/menu — anchored, keyboard + outside-click + Esc aware.
 * Direction-aware alignment (RTL/LTR). One open popover at a time. */
let openEl = null;
let cleanup = null;

function closeOpen() {
  if (openEl) { openEl.remove(); openEl = null; }
  if (cleanup) { cleanup(); cleanup = null; }
}

export function isOpen() { return !!openEl; }
export { closeOpen as closeMenu };

/** open a popover with `html` anchored to trigger. align: 'end' (default) | 'start' */
export function openPopover(trigger, html, { align = 'end' } = {}) {
  const wasThis = openEl && openEl._trigger === trigger;
  closeOpen();
  if (wasThis) return null;

  const pop = document.createElement('div');
  pop._trigger = trigger;
  pop.className = 'popover';
  pop.setAttribute('role', 'menu');
  pop.innerHTML = html;
  document.body.appendChild(pop);
  openEl = pop;

  const r = trigger.getBoundingClientRect();
  const dir = document.documentElement.getAttribute('dir') || 'rtl';
  pop.style.position = 'fixed';
  pop.style.top = `${Math.round(r.bottom + 8)}px`;
  const pw = pop.offsetWidth;
  // align the popover edge to the trigger edge, respecting direction
  let left;
  if (align === 'end') left = dir === 'rtl' ? r.left : r.right - pw;
  else left = dir === 'rtl' ? r.right - pw : r.left;
  left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
  pop.style.left = `${Math.round(left)}px`;
  requestAnimationFrame(() => pop.classList.add('is-open'));

  const onDoc = (e) => { if (!pop.contains(e.target) && !trigger.contains(e.target)) closeOpen(); };
  const onKey = (e) => { if (e.key === 'Escape') { closeOpen(); trigger.focus(); } };
  setTimeout(() => document.addEventListener('click', onDoc), 0);
  document.addEventListener('keydown', onKey);
  cleanup = () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };

  const first = pop.querySelector('[role="menuitem"], button, a');
  if (first) first.focus();
  return pop;
}
