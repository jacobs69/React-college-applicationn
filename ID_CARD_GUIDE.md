# ID Card Screen Guide

## Overview

The IDCardScreen displays a digital student ID card with all relevant information. It's a professional, visually appealing screen that shows student details in a card format.

## File Location

```
CollegegramApp/screens/IDCardScreen.tsx
```

## Features

✅ **Professional ID Card Design** - Mimics real ID cards
✅ **Student Information** - Name, ID, Department, Email, Validity
✅ **Profile Image** - Circular profile picture with border
✅ **Barcode Display** - Fake barcode for authenticity
✅ **Card Status** - Shows if card is active
✅ **Action Buttons** - Print, Download, Share options
✅ **Bottom Navigation** - Integrated with BottomNav
✅ **Responsive Design** - Works on all screen sizes

## Screen Layout

```
┌─────────────────────────────┐
│ ← Digital ID Card           │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐   │
│  │   Blue Banner       │   │
│  │      [Profile]      │   │
│  │                     │   │
│  │ Jai Kantharia       │   │
│  │ CS • Semester 4     │   │
│  │                     │   │
│  │ ID: B20232637       │   │
│  │ Dept: CS            │   │
│  │ Email: jai@...      │   │
│  │ Valid: May 2026     │   │
│  │                     │   │
│  │ ||| |||| || |||     │   │
│  │ (Barcode)           │   │
│  └─────────────────────┘   │
│                             │
│ 📋 Card Information         │
│ Status: Active              │
│ Type: Student ID            │
│ Issued: May 2023            │
│ Expires: May 2026           │
│                             │
│ [🖨️ Print] [📥 Download]   │
│ [📤 Share]                  │
│                             │
├─────────────────────────────┤
│ 🏠 🔔 🆔 💳 👤             │
└─────────────────────────────┘
```

## Component Props

```typescript
interface IDCardScreenProps {
  onLogout: () => void;           // Logout callback
  onNavigate: (page: string) => void;  // Navigation callback
}
```

## Usage

### Integration in App

Add to your main app navigation:

```typescript
// In app/index.tsx
case 'idcard':
  content = <IDCardScreen onLogout={handleLogout} onNavigate={setCurrentPage} />;
  break;
```

### From StudentDashboard

Navigate to ID Card:

```typescript
onNavigate={(page) => {
  setActiveNav(page);
  if (page === 'idcard') {
    onNavigate('idcard');
  }
}}
```

## Customization

### Change Student Information

Edit the hardcoded values in the component:

```typescript
<Text style={styles.studentName}>Jai Kantharia</Text>
<Text style={styles.studentInfo}>Computer Science • Semester 4</Text>
```

### Change Card Colors

Modify the banner color:

```typescript
banner: {
  backgroundColor: '#3b82f6',  // Change this color
},
```

### Update Profile Image

Change the image URL:

```typescript
source={{ uri: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=JK' }}
```

### Modify Card Details

Update the info rows:

```typescript
<View style={styles.infoRow}>
  <Text style={styles.infoLabel}>Your Label</Text>
  <Text style={styles.infoValue}>Your Value</Text>
</View>
```

## Styling Details

### Colors Used
- **Primary**: #3b82f6 (Blue)
- **Background**: #1a1a2e (Dark)
- **Card**: #fff (White)
- **Text**: #1a1a2e (Dark)
- **Secondary**: #999 (Gray)
- **Success**: #10b981 (Green)

### Dimensions
- **Card Border Radius**: 20px
- **Profile Image Size**: 80x80px
- **Banner Height**: 100px
- **Barcode Height**: 50px

### Shadows
- **Card Shadow**: 8px offset, 0.3 opacity, 12px radius
- **Button Shadow**: 4px offset, 0.2 opacity, 8px radius

## Features Breakdown

### 1. Header
- Back button to return to dashboard
- Title "Digital ID Card"
- Clean, professional styling

### 2. ID Card
- Blue banner at top
- Circular profile image overlapping banner
- Student name and info
- Detailed information rows
- Barcode display
- Issue date

### 3. Card Information Section
- Status badge (Active/Inactive)
- Card type
- Issue and expiry dates
- Color-coded status

### 4. Action Buttons
- **Print**: Print the ID card
- **Download**: Save as PDF/image
- **Share**: Share via messaging apps

### 5. Bottom Navigation
- Role-based navigation
- Active state highlighting
- Badge support

## Data Structure

```typescript
{
  name: "Jai Kantharia",
  id: "B20232637",
  department: "Computer Science",
  semester: 4,
  email: "jai@college.edu",
  validThru: "May 2026",
  issued: "May 2023",
  status: "Active",
  profileImage: "https://placehold.co/100x100/3B82F6/FFFFFF?text=JK"
}
```

## Navigation Flow

```
StudentDashboard
    ↓
BottomNav (ID Card tab)
    ↓
IDCardScreen
    ↓
Back Button → StudentDashboard
```

## Best Practices

1. **Keep Information Updated** - Sync with backend data
2. **Secure Display** - Don't log sensitive data
3. **Test on Devices** - Verify layout on different sizes
4. **Handle Missing Data** - Show placeholders if needed
5. **Implement Actions** - Actually print/download/share

## Future Enhancements

- [ ] Dynamic student data from backend
- [ ] QR code instead of barcode
- [ ] Print functionality
- [ ] Download as PDF
- [ ] Share functionality
- [ ] Card expiry warning
- [ ] Multiple ID cards (if applicable)
- [ ] Card renewal option

## Troubleshooting

### Profile image not showing
- Check image URL is valid
- Verify internet connection
- Use placeholder if image fails

### Card not centered
- Check flex properties
- Verify padding values
- Test on different screen sizes

### Bottom nav overlapping
- Increase `paddingBottom` in cardContainer
- Verify nav positioning

### Text overflow
- Reduce font size
- Add ellipsizeMode
- Adjust container width

## Integration Checklist

- [ ] Import IDCardScreen in app/index.tsx
- [ ] Add navigation case for 'idcard'
- [ ] Update StudentDashboard navigation
- [ ] Test navigation flow
- [ ] Verify bottom nav works
- [ ] Test on multiple devices
- [ ] Update student data if needed

---

**Professional ID Card Display Ready! 🎓**
