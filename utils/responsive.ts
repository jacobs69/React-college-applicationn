import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Screen size categories
export const isSmallPhone = width < 375;
export const isMediumPhone = width >= 375 && width < 414;
export const isLargePhone = width >= 414;

// Base dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Responsive scaling function
export const scale = (size: number): number => {
  const baseWidth = 375; // iPhone SE width as base
  return Math.round((width / baseWidth) * size);
};

// Responsive font sizes
export const fontSize = {
  xs: scale(10),
  sm: scale(12),
  base: scale(14),
  lg: scale(16),
  xl: scale(18),
  '2xl': scale(20),
  '3xl': scale(24),
  '4xl': scale(28),
  '5xl': scale(32),
};

// Responsive spacing
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  '2xl': scale(24),
  '3xl': scale(32),
};

// Responsive padding/margin helpers
export const padding = {
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
};

// Grid columns based on screen size
export const gridColumns = isSmallPhone ? 2 : isLargePhone ? 4 : 3;

// Card dimensions
export const cardWidth = (columns: number = 2) => {
  const totalPadding = padding.lg * 2;
  const gap = spacing.md * (columns - 1);
  return (width - totalPadding - gap) / columns;
};

// Safe area insets (for notches)
export const getSafeAreaInsets = () => {
  return {
    top: Platform.OS === 'android' ? 0 : 44,
    bottom: Platform.OS === 'android' ? 0 : 34,
  };
};

// Responsive header height
export const headerHeight = scale(60);

// Responsive bottom nav height
export const bottomNavHeight = scale(70);

// Responsive icon sizes
export const iconSize = {
  sm: scale(16),
  md: scale(24),
  lg: scale(32),
  xl: scale(48),
};

// Responsive border radius
export const borderRadius = {
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(16),
};
