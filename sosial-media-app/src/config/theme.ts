// config/theme.ts

export const theme = {
  colors: {
    // Brand (Primary)
    brand: {
      50:  '#eff6ff',
      100: '#dbeafe',
      500: '#137fec',  // main
      600: '#0d66c2',  // hover
      700: '#0b519b',  // active
    },

    // App (Dark UI System)
    app: {
      bg:     '#0f172a', // main background
      card:   '#1e293b', // surface / card
      border: '#334155', // border color
    },

    // Text Colors (Dark Mode Focus)
    text: {
      primary:   '#ffffff',
      secondary: '#cbd5e1', // slate-300
      muted:     '#94a3b8', // slate-400
    },

    // Semantic
    success: '#22c55e',
    warning: '#f59e0b',
    error:   '#ef4444',
    info:    '#137fec',

    // Social-specific
    like:   '#ef4444',
    repost: '#22c55e',
  },

  typography: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs:   '0.75rem',
      sm:   '0.875rem',
      base: '1rem',
      lg:   '1.125rem',
      xl:   '1.25rem',
      '2xl':'1.5rem',
      '3xl':'1.875rem',
    },
    fontWeight: {
      normal:   '400',
      medium:   '500',
      semibold: '600',
      bold:     '700',
    },
  },

  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1536px',
  },

  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
  },

  borderRadius: {
    custom: '8px', // sesuai HTML
    full: '9999px',
  },

  shadows: {
    sm:  '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md:  '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg:  '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },

  zIndex: {
    dropdown: 10,
    sticky:   20,
    overlay:  30,
    modal:    40,
    toast:    50,
  },
} as const;

export type Theme = typeof theme;