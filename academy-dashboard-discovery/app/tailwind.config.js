/** Tailwind config — maps utilities onto the approved CSS custom-property tokens.
 *  Themeable values reference var(--c-*) so a single utility works in light/dark/system.
 *  See contracts/tokens-contract.md. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  // component classes composed at runtime (e.g. `av-${accent}`, `tone-${t}`) are
  // invisible to the content scanner — keep them explicitly.
  safelist: [
    'av-violet', 'av-teal', 'av-amber', 'av-sky', 'av-success',
    'm-soft', 'm-grad',
    'tone-primary', 'tone-amber', 'tone-success', 'tone-teal', 'tone-sky', 'tone-coral', 'tone-muted',
    'tone-live', 'tone-upcoming', 'tone-completed', 'tone-cancelled',
    'trend-up', 'trend-down', 'trend-flat',
    'is-active', 'is-current', 'is-disabled', 'is-open', 'is-open',
  ],
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: 'var(--c-canvas)', 2: 'var(--c-canvas-2)' },
        surface: { DEFAULT: 'var(--c-surface)', 2: 'var(--c-surface-2)' },
        ink: { DEFAULT: 'var(--c-ink)', 2: 'var(--c-ink-2)', 3: 'var(--c-ink-3)' },
        line: { DEFAULT: 'var(--c-line)', 2: 'var(--c-line-2)' },
        primary: { DEFAULT: 'var(--c-primary)', 2: 'var(--c-primary-2)', weak: 'var(--c-primary-weak)' },
        sidebar: { DEFAULT: 'var(--c-sidebar)', 2: 'var(--c-sidebar-2)' },
        teal: { DEFAULT: 'var(--c-teal)', weak: 'var(--c-teal-weak)' },
        success: { DEFAULT: 'var(--c-success)', weak: 'var(--c-success-weak)' },
        sky: { DEFAULT: 'var(--c-sky)', weak: 'var(--c-sky-weak)' },
        amber: { DEFAULT: 'var(--c-amber)', weak: 'var(--c-amber-weak)' },
        coral: { DEFAULT: 'var(--c-coral)', weak: 'var(--c-coral-weak)' },
        'sb-ink': 'var(--c-sb-ink)',
        'sb-ink-2': 'var(--c-sb-ink-2)',
        'sb-line': 'var(--c-sb-line)',
      },
      borderRadius: {
        card: '20px',
        tile: '13px',
        field: '11px',
        pill: '999px',
      },
      boxShadow: {
        hair: 'var(--sh-xs)',
        card: 'var(--sh-sm)',
        pop: 'var(--sh-md)',
        hi: 'var(--sh-lg)',
      },
      fontFamily: {
        sans: ['Tajawal', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        micro: ['11.5px', { lineHeight: '1.5' }],
        kpi: ['34px', { lineHeight: '1.05', letterSpacing: '-0.8px' }],
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.22,1,.36,1)',
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
};
