import { scale, fontSize, spacing, padding, borderRadius, iconSize } from './responsive';

// Professional color schemes for each role
export const themes = {
  student: {
    primary: '#3B82F6', // Blue
    secondary: '#10B981', // Green
    accent: '#F59E0B', // Amber
    background: '#F3F4F6',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  teacher: {
    primary: '#8B5CF6', // Purple
    secondary: '#EC4899', // Pink
    accent: '#06B6D4', // Cyan
    background: '#F9F5FF',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E9D5FF',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#8B5CF6',
  },
  admin: {
    primary: '#DC2626', // Red
    secondary: '#7C3AED', // Violet
    accent: '#0891B2', // Cyan
    background: '#FEF2F2',
    surface: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#FEE2E2',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#DC2626',
  },
};

// Unified component styles
export const componentStyles = {
  // Button styles
  button: {
    primary: {
      paddingVertical: padding.md,
      paddingHorizontal: padding.lg,
      borderRadius: borderRadius.lg,
      minHeight: scale(48),
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondary: {
      paddingVertical: padding.sm,
      paddingHorizontal: padding.md,
      borderRadius: borderRadius.md,
      minHeight: scale(40),
      justifyContent: 'center',
      alignItems: 'center',
    },
    small: {
      paddingVertical: padding.xs,
      paddingHorizontal: padding.sm,
      borderRadius: borderRadius.sm,
      minHeight: scale(32),
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  // Text styles
  text: {
    h1: {
      fontSize: fontSize['5xl'],
      fontWeight: '700',
      lineHeight: scale(40),
    },
    h2: {
      fontSize: fontSize['4xl'],
      fontWeight: '700',
      lineHeight: scale(36),
    },
    h3: {
      fontSize: fontSize['3xl'],
      fontWeight: '700',
      lineHeight: scale(32),
    },
    h4: {
      fontSize: fontSize['2xl'],
      fontWeight: '600',
      lineHeight: scale(28),
    },
    h5: {
      fontSize: fontSize.xl,
      fontWeight: '600',
      lineHeight: scale(24),
    },
    body: {
      fontSize: fontSize.base,
      fontWeight: '400',
      lineHeight: scale(20),
    },
    bodySmall: {
      fontSize: fontSize.sm,
      fontWeight: '400',
      lineHeight: scale(18),
    },
    caption: {
      fontSize: fontSize.xs,
      fontWeight: '400',
      lineHeight: scale(14),
    },
  },

  // Card styles
  card: {
    padding: padding.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Input styles
  input: {
    paddingVertical: padding.md,
    paddingHorizontal: padding.lg,
    borderRadius: borderRadius.lg,
    fontSize: fontSize.base,
    minHeight: scale(48),
    borderWidth: 1.5,
  },

  // Icon sizes (responsive)
  icon: {
    small: iconSize.sm,
    medium: iconSize.md,
    large: iconSize.lg,
    extraLarge: iconSize.xl,
  },

  // Spacing helpers
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing['2xl'],
  },

  // Border radius helpers
  radius: {
    sm: borderRadius.sm,
    md: borderRadius.md,
    lg: borderRadius.lg,
    xl: borderRadius.xl,
  },
};

// Get theme based on role
export const getTheme = (role: 'student' | 'teacher' | 'admin') => {
  return themes[role];
};

// Common styles used across app
export const commonStyles = {
  container: {
    flex: 1,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: padding.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
