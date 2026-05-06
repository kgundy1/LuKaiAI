export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#06070a',
        deep: '#090b10',
        surface: '#0e1118',
        card: '#131620',
        card2: '#181c28',
        'lk-cyan': '#00c8f0',
        'lk-violet': '#8b5cf6',
        'lk-gold': '#c9a84c',
        'lk-green': '#34d399',
        'lk-red': '#f87171',
        'lk-text-primary': '#e8eaf2',
        'lk-text-secondary': '#b0b8d0',
        'lk-text-tertiary': '#7a8299',
        'lk-text-dim': '#444c65',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
