/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'), surface: v('surface'), raised: v('raised'), line: v('line'),
        ink: v('ink'), muted: v('muted'), accent: v('accent'), accent2: v('accent2'),
        'on-accent': v('on-accent'), ok: v('ok'),
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        serif: ['"Instrument Serif"', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
        float: 'var(--shadow-float)',
      },
      maxWidth: { page: '76rem', prose: '38rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.8,.2,1)' },
    },
  },
  plugins: [],
};
