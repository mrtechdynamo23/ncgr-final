/**
 * NCGR Official Brand Colour System
 * Source: NCGR Brand Identity Guideline (Section 43 of specification)
 * 
 * This is the single source of truth for all colours used in the portal.
 * CSS custom properties in index.css mirror these values.
 */

// ─── PRIMARY PALETTE ───────────────────────────────────────────
export const NCGR_DEEP_BLUE = '#074A76';    // Trust, Reliability, Enterprise identity
export const NCGR_DEEP_SKY = '#4AA6DC';     // Leadership, Technology, Digital interaction
export const NCGR_PURPLE = '#671E75';       // Innovation, Transformation, AI

// ─── SECONDARY PALETTE ─────────────────────────────────────────
export const NCGR_MINT_GREEN = '#40904F';   // Positive states, operational accents
export const NCGR_LEMON = '#CFDB51';        // Highlights
export const NCGR_TIFFANY_BLUE = '#1FBBB0'; // Information accents
export const NCGR_ORANGE = '#CE813C';       // Warm accents, warnings
export const NCGR_BLACK = '#000000';
export const NCGR_WHITE = '#FFFFFF';

// ─── SEMANTIC STATUS COLOURS ───────────────────────────────────
// These are used ONLY for operational status — not for branding.
// Always pair with text + icon + label (never colour alone).
export const STATUS = {
  healthy: '#22A06B',       // Green family — Healthy / On Track
  healthyBg: '#E3FCEF',
  atRisk: '#E97F0A',       // Amber/Orange — Warning / At Risk
  atRiskBg: '#FFF7E6',
  degraded: '#E97F0A',     // Same amber for degraded (distinguished by label)
  degradedBg: '#FFF7E6',
  critical: '#DE350B',     // Red — Critical / Breached
  criticalBg: '#FFEBE6',
  information: '#4AA6DC',  // NCGR Deep Sky for info
  informationBg: '#E6F4FC',
  inactive: '#8993A4',     // Neutral grey — Inactive / Unknown
  inactiveBg: '#F4F5F7',
  dataStale: '#8993A4',
  dataStaleBg: '#F4F5F7',
} as const;

// ─── LIGHT MODE SURFACES ──────────────────────────────────────
export const LIGHT = {
  bg: '#FFFFFF',
  bgSecondary: '#F7F8FA',
  bgTertiary: '#F0F1F4',
  surface: '#FFFFFF',
  surfaceRaised: '#FFFFFF',
  border: '#E4E7EC',
  borderStrong: '#D0D5DD',
  text: '#101828',
  textSecondary: '#475467',
  textTertiary: '#98A2B3',
  shadow: 'rgba(16, 24, 40, 0.05)',
  shadowMd: 'rgba(16, 24, 40, 0.08)',
  overlay: 'rgba(16, 24, 40, 0.4)',
  sidebarBg: NCGR_DEEP_BLUE,
  sidebarText: '#FFFFFF',
  sidebarTextMuted: 'rgba(255,255,255,0.65)',
  sidebarHover: 'rgba(255,255,255,0.08)',
  sidebarActive: 'rgba(255,255,255,0.15)',
  headerBg: '#FFFFFF',
  headerBorder: '#E4E7EC',
} as const;

// ─── DARK MODE SURFACES ───────────────────────────────────────
export const DARK = {
  bg: '#0C1222',
  bgSecondary: '#111827',
  bgTertiary: '#1A2332',
  surface: '#151F2E',
  surfaceRaised: '#1A2638',
  border: '#243044',
  borderStrong: '#2D3D54',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowMd: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  sidebarBg: '#0A1628',
  sidebarText: '#F1F5F9',
  sidebarTextMuted: 'rgba(241,245,249,0.55)',
  sidebarHover: 'rgba(74,166,220,0.1)',
  sidebarActive: 'rgba(74,166,220,0.18)',
  headerBg: '#111827',
  headerBorder: '#243044',
} as const;

// ─── CHART COLOURS ─────────────────────────────────────────────
// Restrained NCGR palette for data visualisation
export const CHART_COLORS = [
  NCGR_DEEP_BLUE,
  NCGR_DEEP_SKY,
  NCGR_PURPLE,
  NCGR_MINT_GREEN,
  NCGR_TIFFANY_BLUE,
  NCGR_ORANGE,
  NCGR_LEMON,
] as const;
