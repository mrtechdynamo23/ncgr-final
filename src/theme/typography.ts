/**
 * NCGR Typography System
 * 
 * Latin: Inter (Google Fonts)
 * Arabic: System Arabic fonts (Segoe UI, Tahoma fallback)
 */

export const FONT_FAMILY = {
  latin: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  arabic: "'Segoe UI', 'Tahoma', 'Arial', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
} as const;

export const FONT_SIZE = {
  xs: '0.6875rem',    // 11px
  sm: '0.75rem',      // 12px
  base: '0.8125rem',  // 13px — enterprise-compact base
  md: '0.875rem',     // 14px
  lg: '1rem',         // 16px
  xl: '1.125rem',     // 18px
  '2xl': '1.25rem',   // 20px
  '3xl': '1.5rem',    // 24px
  '4xl': '1.875rem',  // 30px
  '5xl': '2.25rem',   // 36px
} as const;

export const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const LINE_HEIGHT = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export const SPACING = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
} as const;

export const BORDER_RADIUS = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const;
