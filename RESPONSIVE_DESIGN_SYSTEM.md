# Collegegram - Responsive Design System

## Overview
This document outlines the responsive design system ensuring consistent UI/UX across all device sizes and roles.

## Color Schemes by Role

### Student (Blue Theme)
- Primary: #3B82F6 (Blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)
- Background: #F3F4F6 (Light Gray)

### Teacher (Purple Theme)
- Primary: #8B5CF6 (Purple)
- Secondary: #EC4899 (Pink)
- Accent: #06B6D4 (Cyan)
- Background: #F9F5FF (Light Purple)

### Admin (Red Theme)
- Primary: #DC2626 (Red)
- Secondary: #7C3AED (Violet)
- Accent: #0891B2 (Cyan)
- Background: #FEF2F2 (Light Red)

## Responsive Scaling

### Screen Size Categories
- Small Phone: < 375px (iPhone SE)
- Medium Phone: 375px - 414px (iPhone 12/13)
- Large Phone: > 414px (iPhone 14 Pro Max, Android)

### Scaling Function
All sizes scale proportionally based on screen width:
```
scaledSize = (screenWidth / 375) * baseSize
```

## Font Sizes
- xs: 10px (captions, small labels)
- sm: 12px (small text, hints)
- base: 14px (body text)
- lg: 16px (subheadings)
- xl: 18px (section titles)
- 2xl: 20px (headings)
- 3xl: 24px (large headings)
- 4xl: 28px (page titles)
- 5xl: 32px (main headings)

## Spacing Scale
- xs: 4px (minimal spacing)
- sm: 8px (small gaps)
- md: 12px (standard gaps)
- lg: 16px (medium gaps)
- xl: 20px (large gaps)
- 2xl: 24px (extra large gaps)
- 3xl: 32px (section spacing)

## Icon Sizes
- small: 16px (inline icons)
- medium: 24px (standard icons)
- large: 32px (prominent icons)
- extraLarge: 48px (hero icons)

## Button Sizes

### Primary Button
- Height: 48px (minimum touch target)
- Padding: 12px vertical, 16px horizontal
- Border Radius: 12px
- Font Size: 16px (lg)
- Font Weight: 600

### Secondary Button
- Height: 40px
- Padding: 8px vertical, 12px horizontal
- Border Radius: 8px
- Font Size: 14px (base)
- Font Weight: 500

### Small Button
- Height: 32px
- Padding: 4px vertical, 8px horizontal
- Border Radius: 4px
- Font Size: 12px (sm)
- Font Weight: 500

## Component Guidelines

### Cards
- Padding: 16px
- Border Radius: 12px
- Shadow: 0px 2px 4px rgba(0,0,0,0.1)
- Elevation: 3 (Android)
- Margin Bottom: 12px

### Input Fields
- Height: 48px (minimum)
- Padding: 12px vertical, 16px horizontal
- Border Radius: 12px
- Border Width: 1.5px
- Font Size: 14px (base)

### Back Button
- Size: 24px icon
- Padding: 12px (touch target 48px)
- Color: Primary theme color
- Placement: Top-left corner

### Bottom Navigation
- Height: 70px
- Icon Size: 24px
- Label Font Size: 12px
- Spacing: 8px between icon and label

## Responsive Breakpoints

### Mobile (< 375px)
- 2-column grid layouts
- Reduced padding: 12px
- Smaller font sizes
- Compact spacing

### Tablet (375px - 768px)
- 3-column grid layouts
- Standard padding: 16px
- Standard font sizes
- Standard spacing

### Large Devices (> 768px)
- 4-column grid layouts
- Increased padding: 20px
- Larger font sizes
- Generous spacing

## Implementation Examples

### Using Theme in Components
```typescript
import { getTheme, componentStyles } from '../utils/theme';

const MyComponent = ({ role }) => {
  const theme = getTheme(role);
  
  return (
    <View style={{ backgroundColor: theme.background }}>
      <Text style={{ color: theme.primary, ...componentStyles.text.h2 }}>
        Title
      </Text>
      <TouchableOpacity style={{ 
        ...componentStyles.button.primary,
        backgroundColor: theme.primary 
      }}>
        <Text style={{ color: '#fff' }}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Responsive Padding
```typescript
import { padding } from '../utils/responsive';

<View style={{ paddingHorizontal: padding.lg, paddingVertical: padding.md }}>
  {/* Content */}
</View>
```

### Responsive Font Sizes
```typescript
import { fontSize } from '../utils/responsive';

<Text style={{ fontSize: fontSize.lg, fontWeight: '600' }}>
  Heading
</Text>
```

## Best Practices

1. **Always use responsive utilities** - Never hardcode pixel values
2. **Use theme colors** - Maintain consistency across roles
3. **Minimum touch targets** - Buttons should be at least 48px
4. **Consistent spacing** - Use spacing scale for all gaps
5. **Test on multiple devices** - Small, medium, and large phones
6. **Use safe areas** - Account for notches and home indicators
7. **Readable text** - Minimum font size 12px for body text
8. **Color contrast** - Ensure WCAG AA compliance

## Testing Checklist

- [ ] App looks good on iPhone SE (375px)
- [ ] App looks good on iPhone 12 (390px)
- [ ] App looks good on iPhone 14 Pro Max (430px)
- [ ] App looks good on Android small (360px)
- [ ] App looks good on Android large (480px)
- [ ] All buttons are easily tappable (48px minimum)
- [ ] Text is readable at all sizes
- [ ] Icons scale appropriately
- [ ] Spacing is consistent
- [ ] Colors match theme for role
- [ ] No text overflow
- [ ] No overlapping elements

## Common Issues & Solutions

### Issue: Text too small on large phones
**Solution**: Use responsive font sizes from fontSize object

### Issue: Buttons too small to tap
**Solution**: Ensure minimum height of 48px using scale()

### Issue: Icons inconsistent sizes
**Solution**: Use iconSize object with sm/md/lg/xl

### Issue: Spacing looks wrong on different phones
**Solution**: Use spacing object instead of hardcoded values

### Issue: Colors don't match role
**Solution**: Use getTheme(role) to get correct color scheme

## Future Enhancements

- Dark mode support
- Accessibility improvements
- Animation scaling
- Custom font support
- Theme customization per institution
