# Bottom Navigation Guide

## Overview

The BottomNav component provides role-based navigation at the bottom of each dashboard screen. It's fully integrated into all three dashboards (Student, Teacher, Admin).

## Component Location

```
CollegegramApp/components/BottomNav.tsx
```

## Features

✅ **Role-Based Navigation** - Different nav items for each role
✅ **Badge Support** - Shows notification counts
✅ **Active State Styling** - Highlights current page
✅ **Smooth Transitions** - Professional appearance
✅ **Responsive Design** - Works on all screen sizes

## Navigation Items by Role

### Student Navigation
- 🏠 **Home** - Student Dashboard
- 🔔 **Notifs** - Notifications (with badge)
- 🆔 **ID Card** - Student ID Card
- 💳 **Fees** - Fee Payment
- 👤 **Profile** - Student Profile

### Teacher Navigation
- 🏠 **Home** - Teacher Dashboard
- 📝 **Assign** - Manage Assignments
- ✅ **Attend** - Mark Attendance
- 📊 **Results** - Upload Results
- 👤 **Profile** - Teacher Profile

### Admin Navigation
- 🏠 **Home** - Admin Dashboard
- 👥 **Users** - User Management
- 📊 **Reports** - System Reports
- ⚙️ **Settings** - System Settings
- 👤 **Profile** - Admin Profile

## Usage

### Basic Implementation

```tsx
import BottomNav from '../components/BottomNav';

export default function StudentDashboard({ onLogout, onNavigate }) {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <View style={styles.container}>
      {/* Your screen content */}
      
      <BottomNav
        role="student"
        active={activeNav}
        unreadCount={2}
        onNavigate={(page) => {
          setActiveNav(page);
          // Handle navigation
          if (page === 'notifications') {
            onNavigate('notifications');
          }
        }}
      />
    </View>
  );
}
```

## Props

```typescript
interface BottomNavProps {
  role?: 'student' | 'teacher' | 'admin';  // Default: 'student'
  active?: string;                          // Current active page
  unreadCount?: number;                     // Badge count (default: 0)
  onNavigate: (page: string) => void;      // Navigation callback
}
```

## Styling

### Colors
- **Active**: #60a5fa (Blue)
- **Inactive**: #9ca3af (Gray)
- **Background**: #1f2937 (Dark Gray)
- **Badge**: #ef4444 (Red)

### Dimensions
- **Icon Size**: 20px
- **Label Size**: 10px
- **Badge Size**: 16px
- **Bottom Padding**: 24px (for safe area)

## Integration in Dashboards

All three dashboards are already integrated with BottomNav:

### StudentDashboard
```tsx
<BottomNav
  role="student"
  active={activeNav}
  unreadCount={2}
  onNavigate={(page) => {
    setActiveNav(page);
    // Navigation logic
  }}
/>
```

### TeacherDashboard
```tsx
<BottomNav
  role="teacher"
  active={activeNav}
  onNavigate={(page) => {
    setActiveNav(page);
    // Navigation logic
  }}
/>
```

### AdminDashboard
```tsx
<BottomNav
  role="admin"
  active={activeNav}
  onNavigate={(page) => {
    setActiveNav(page);
    // Navigation logic
  }}
/>
```

## Customization

### Change Colors

Edit `BottomNav.tsx` styles:

```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937', // Change this
  },
  iconActive: {
    color: '#60a5fa', // Change this
  },
  // ... more styles
});
```

### Add New Navigation Items

1. Update the nav array in BottomNav.tsx:

```typescript
const studentNav = [
  { icon: '🏠', label: 'Home', id: 'home', badge: 0 },
  { icon: '🆕', label: 'New', id: 'new', badge: 0 }, // Add this
  // ... rest of items
];
```

2. Handle the new page in the dashboard's onNavigate callback:

```typescript
onNavigate={(page) => {
  setActiveNav(page);
  if (page === 'new') {
    onNavigate('newpage');
  }
}}
```

### Modify Badge Display

Change badge threshold in BottomNav.tsx:

```typescript
{badge > 0 && (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>
      {badge > 99 ? '99+' : badge}  // Customize this
    </Text>
  </View>
)}
```

## Scroll Content Padding

Each dashboard has `paddingBottom: 100` in scrollContent to prevent content from being hidden behind the bottom nav:

```typescript
scrollContent: {
  paddingVertical: 16,
  paddingBottom: 100,  // Space for bottom nav
},
```

## Best Practices

1. **Always set activeNav state** - Keeps UI in sync
2. **Handle all navigation cases** - Don't leave pages unhandled
3. **Update badge count dynamically** - Reflect real notification count
4. **Test on different devices** - Ensure safe area padding works
5. **Keep labels short** - Fits better on small screens

## Troubleshooting

### Bottom nav overlapping content
- Increase `paddingBottom` in scrollContent
- Check if container has `position: 'absolute'`

### Badge not showing
- Ensure `unreadCount > 0`
- Check badge styling in styles object

### Navigation not working
- Verify `onNavigate` callback is implemented
- Check if page ID matches in nav array

### Colors not updating
- Clear cache: `npm start -c`
- Verify color hex codes are correct

## Future Enhancements

- [ ] Add animation on tab press
- [ ] Add swipe gesture support
- [ ] Add custom badge colors
- [ ] Add icon customization
- [ ] Add label customization
- [ ] Add haptic feedback

---

**Happy Navigating! 🚀**
