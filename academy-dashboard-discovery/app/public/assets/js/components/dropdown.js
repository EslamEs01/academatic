/* Lightweight popover/menu — anchored, keyboard + outside-click + Esc aware.
 * Direction-aware alignment (RTL/LTR). One open popover at a time. */
let openEl = null;
let cleanup = null;

function closeOpen() {
  if (openEl) {
    if (openEl._trigger) openEl._trigger.setAttribute('aria-expanded', 'false');
    openEl.remove(); openEl = null;
  }
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
  (trigger.closest('.interaction-surface') || document.body).appendChild(pop);
  openEl = pop;
  trigger.setAttribute('aria-haspopup', 'menu');
  trigger.setAttribute('aria-expanded', 'true');

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
  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeOpen(); trigger.focus(); return; }
    if (!pop.contains(e.target)) return;
    const items = Array.from(pop.querySelectorAll('[role="menuitem"], button:not([disabled]), a[href]'))
      .filter((item) => item.getClientRects().length > 0 && item.getAttribute('aria-disabled') !== 'true');
    if (!items.length) return;
    const index = Math.max(0, items.indexOf(document.activeElement));
    let next = -1;
    if (e.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (e.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next >= 0) { e.preventDefault(); items[next].focus(); }
  };
  const outsideListenerTimer = setTimeout(() => document.addEventListener('click', onDoc), 0);
  document.addEventListener('keydown', onKey);
  cleanup = () => {
    clearTimeout(outsideListenerTimer);
    document.removeEventListener('click', onDoc);
    document.removeEventListener('keydown', onKey);
  };

  const first = pop.querySelector('[role="menuitem"], button, a');
  if (first) first.focus();
  return pop;
}
