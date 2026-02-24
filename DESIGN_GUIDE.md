# Collegegram Design Guide

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #3b82f6 | Buttons, Links, Primary Actions |
| Purple | #8b5cf6 | Teacher Dashboard, Secondary Actions |
| Green | #10b981 | Success, Positive Actions |
| Amber | #f59e0b | Warnings, Pending Items |
| Red | #ff3b30 | Danger, Logout, Errors |
| Light Blue | #e0f2fe | Backgrounds, Highlights |
| Light Gray | #f8f9fa | Main Background |
| Dark | #1a1a2e | Text, Headers |
| Gray | #666 | Secondary Text |
| Light Border | #e5e7eb | Dividers, Borders |

### Typography

- **Headers**: 28px, Weight 700, Color #1a1a2e
- **Section Titles**: 16px, Weight 700, Color #1a1a2e
- **Body Text**: 14px, Weight 400, Color #666
- **Small Text**: 12px, Weight 400, Color #999
- **Labels**: 13px, Weight 600, Color #1a1a2e

### Spacing

- **Padding**: 16px (standard), 20px (large), 12px (small)
- **Gap**: 12px (standard), 8px (compact)
- **Margin**: 24px (sections), 16px (elements)

### Border Radius

- **Cards**: 12px
- **Buttons**: 12px
- **Inputs**: 12px
- **Badges**: 6-8px
- **Circles**: 50% (for avatars)

### Shadows

- **Light**: opacity 0.05, radius 2px
- **Medium**: opacity 0.1, radius 4px
- **Heavy**: opacity 0.3, radius 8px

## 📐 Component Specifications

### Buttons

#### Primary Button
- Background: #3b82f6
- Text: White, 16px, Weight 700
- Padding: 16px vertical, 20px horizontal
- Border Radius: 12px
- Shadow: Heavy

#### Secondary Button
- Background: #e0e7ff
- Text: #3b82f6, 12px, Weight 600
- Padding: 6px vertical, 10px horizontal
- Border Radius: 6px

### Input Fields

- Height: 50px
- Background: White
- Border: 1.5px #e0e0e0
- Border Radius: 12px
- Padding: 14px horizontal
- Icon: 18px, left-aligned
- Placeholder: #999

### Cards

- Background: White
- Border Radius: 12px
- Padding: 12-14px
- Shadow: Light
- Border Left: 4px (colored)

### Badges

- Padding: 4px vertical, 10px horizontal
- Border Radius: 6px
- Font Size: 11px
- Weight: 600

## 🎯 Screen Layouts

### Landing Page
- Full screen dark background (#1a1a2e)
- Centered content
- Animated logo (80px)
- Title (48px)
- Subtitle (16px)
- Loading dots

### Login Page
- Header section (60px top padding)
- Role selector (3 cards in row)
- Form inputs (2 fields)
- Primary button
- Register link

### Dashboard Screens
- Fixed header (white background)
- Scrollable content
- Stats cards (3 in row)
- Action grid (3 columns)
- Content sections
- Floating logout button

## 🎬 Animations

### Landing Page
- Fade In: 800ms
- Scale: 0.8 → 1.0
- Easing: Default

### Transitions
- Page transitions: Instant (state-based)
- Button press: Immediate feedback
- Input focus: Smooth border color change

## 📱 Responsive Design

### Breakpoints
- Mobile: < 480px (default)
- Tablet: 480px - 768px
- Large: > 768px

### Grid Layouts
- 3 columns: Action cards, Stats
- 2 columns: Admin stats
- Full width: Headers, Buttons, Inputs

## ✨ Visual Hierarchy

1. **Primary**: Headers, Main CTAs (Blue)
2. **Secondary**: Section titles, Secondary actions (Gray)
3. **Tertiary**: Labels, Helper text (Light Gray)
4. **Accent**: Status indicators, Badges (Color-coded)

## 🎨 Role-Based Colors

- **Student**: Blue (#3b82f6)
- **Teacher**: Purple (#8b5cf6)
- **Admin**: Multi-color (Blue, Green, Amber)

## 📊 Data Visualization

### Status Badges
- Pending: Amber background (#fef3c7)
- Submitted: Green background (#d1fae5)
- High Priority: Red background (#fee2e2)
- Medium Priority: Amber background (#fef3c7)
- Low Priority: Blue background (#dbeafe)

### Progress Bars
- Height: 6px
- Border Radius: 3px
- Colors: Green (85%), Blue (45%), Amber (62%)

## 🔄 Interaction Patterns

### Button States
- Default: Full opacity
- Pressed: Slight scale down (0.95)
- Disabled: Reduced opacity (0.5)

### Input States
- Default: Border #e0e0e0
- Focused: Border #3b82f6
- Error: Border #ff3b30

### Card States
- Default: Light shadow
- Pressed: Increased shadow
- Hover: Slight background change

## 📝 Typography Hierarchy

```
Landing Title: 48px, Bold
Page Headers: 28px, Bold
Section Titles: 16px, Bold
Body Text: 14px, Regular
Small Text: 12px, Regular
Labels: 13px, Semi-bold
```

## 🎯 Accessibility

- Minimum touch target: 44x44px
- Color contrast: WCAG AA compliant
- Font sizes: Minimum 12px
- Spacing: Adequate for readability
- Icons: Always paired with text labels

## 🚀 Implementation Notes

- Use StyleSheet.create() for performance
- Maintain consistent spacing scale
- Use color variables for consistency
- Test on multiple screen sizes
- Ensure proper contrast ratios
- Use semantic color meanings
