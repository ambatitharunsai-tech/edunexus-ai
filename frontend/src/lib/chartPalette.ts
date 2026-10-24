/**
 * EduNexus AI — Standardized Chart Palette System
 * Strict compliance with exact HEX codes for Dark and Light modes.
 */

export interface ChartThemeColors {
  series1: string; // Indigo
  series2: string; // Cyan
  series3: string; // Violet
  series4: string; // Blue
  series5: string; // Amber
  series6: string; // Rose
  series7: string; // Purple
  series8: string; // Slate
  grid: string;
  axisLabels: string;
  axisTitles: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
  baseline: string;
}

export const DARK_CHART_THEME: ChartThemeColors = {
  series1: '#818CF8', // Indigo
  series2: '#22D3EE', // Cyan
  series3: '#C4B5FD', // Violet
  series4: '#60A5FA', // Blue
  series5: '#FBBF24', // Amber
  series6: '#FB7185', // Rose
  series7: '#A78BFA', // Purple
  series8: '#94A3B8', // Slate
  grid: '#27272A',
  axisLabels: '#A1A1AA',
  axisTitles: '#D4D4D8',
  tooltipBg: '#18181B',
  tooltipBorder: '#3F3F46',
  tooltipText: '#FAFAFA',
  baseline: '#52525B',
};

export const LIGHT_CHART_THEME: ChartThemeColors = {
  series1: '#4F46E5',
  series2: '#0891B2',
  series3: '#7C3AED',
  series4: '#2563EB',
  series5: '#D97706',
  series6: '#E11D48',
  series7: '#6D28D9',
  series8: '#64748B',
  grid: '#E4E4E7',
  axisLabels: '#71717A',
  axisTitles: '#52525B',
  tooltipBg: '#FFFFFF',
  tooltipBorder: '#D4D4D8',
  tooltipText: '#18181B',
  baseline: '#A1A1AA',
};

export function getChartTheme(theme: 'light' | 'dark' = 'dark'): ChartThemeColors {
  return theme === 'light' ? LIGHT_CHART_THEME : DARK_CHART_THEME;
}

export const CHART_PALETTE = {
  dark: DARK_CHART_THEME,
  light: LIGHT_CHART_THEME,
};
