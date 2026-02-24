# Quick Start Guide - Collegegram App

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your phone (SDK 54)

### Installation

1. **Navigate to the app directory:**
   ```bash
   cd CollegegramApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Scan the QR code:**
   - Open Expo Go on your phone
   - Tap the "Scan QR Code" button
   - Point your camera at the QR code in the terminal
   - The app will load automatically

## 📱 Testing the App

### Landing Page
- Shows for 2.5 seconds
- Auto-transitions to login
- Features animated logo and title

### Login Page
- **Select Role**: Choose between Student, Teacher, or Admin
- **Enter Credentials**: 
  - Student: Any Student ID (e.g., B20232637)
  - Teacher/Admin: Any email
  - Password: Any value
- **Sign In**: Tap the "Sign In" button

### Student Dashboard
- **Welcome Header**: Shows your name and course info
- **Quick Stats**: Attendance, SGPA, Pending assignments
- **Quick Access**: 6 action cards for common tasks
- **Today's Classes**: Shows upcoming classes
- **Recent Assignments**: Lists pending and submitted work
- **Log Out**: Tap the red button at the bottom

### Teacher Dashboard
- **Welcome Header**: Shows your name and department
- **System Stats**: Total students, assignments, classes
- **Quick Actions**: 6 management tools
- **My Classes**: List of classes you teach
- **Recent Activities**: Timeline of recent actions
- **Log Out**: Tap the red button at the bottom

### Admin Dashboard
- **Admin Portal**: Full system access
- **System Overview**: Key metrics and stats
- **Management Tools**: 6 admin functions
- **Recent Notices**: Posted notices with priority
- **System Health**: Database, server, and storage status
- **Log Out**: Tap the red button at the bottom

### Register Page (Student Only)
- **From Login**: Tap "Activate Account" link
- **Fill Form**: Student ID, Email, Password, Confirm Password
- **Activate**: Tap "Activate Account" button
- **Back to Login**: Returns to login page

## 🎨 Design Highlights

### Modern UI
- Clean, minimal design
- Consistent color scheme
- Smooth animations
- Intuitive navigation

### Color Coding
- **Blue**: Primary actions and student features
- **Purple**: Teacher features
- **Green**: Success and positive actions
- **Amber**: Warnings and pending items
- **Red**: Danger and logout

### Interactive Elements
- Tap any card or button to interact
- Smooth transitions between screens
- Visual feedback on interactions
- Status indicators and badges

## 🔧 Troubleshooting

### App Shows Blank Screen
1. Clear cache: `npm start -c`
2. Restart Expo Go on your phone
3. Check that you're using SDK 54

### QR Code Not Scanning
1. Ensure good lighting
2. Hold phone steady
3. Try scanning again
4. Manually enter the connection URL if needed

### Dependencies Not Installing
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Port Already in Use
1. Kill the process: `npm start` will prompt you
2. Or use a different port: `npm start -- --port 19001`

## 📁 File Structure

```
CollegegramApp/
├── app/
│   ├── _layout.tsx          # Router configuration
│   └── index.tsx            # Main app component
├── screens/
│   ├── LandingPage.tsx      # Splash screen
│   ├── LoginPage.tsx        # Login screen
│   ├── RegisterPage.tsx     # Registration screen
│   ├── StudentDashboard.tsx # Student home
│   ├── TeacherDashboard.tsx # Teacher home
│   └── AdminDashboard.tsx   # Admin home
├── package.json             # Dependencies
├── app.json                 # Expo configuration
└── tsconfig.json            # TypeScript config
```

## 🎯 Key Features

✅ **Three Role-Based Dashboards**
- Student: Classes, assignments, fees, attendance
- Teacher: Class management, assignments, attendance
- Admin: System management, notices, health monitoring

✅ **Modern Design**
- Clean, professional UI
- Consistent styling
- Smooth animations
- Responsive layout

✅ **Easy Navigation**
- Intuitive role selection
- Clear visual hierarchy
- Quick access cards
- Floating action buttons

✅ **Type-Safe**
- Full TypeScript support
- Proper type annotations
- No runtime errors

## 🚀 Next Steps

### To Customize:
1. Edit colors in `DESIGN_GUIDE.md`
2. Modify screen content in `screens/` folder
3. Add new screens following the same pattern
4. Update navigation in `app/index.tsx`

### To Add Features:
1. Create new screen component in `screens/`
2. Add navigation case in `app/index.tsx`
3. Update dashboard navigation handlers
4. Style consistently with design guide

### To Deploy:
1. Build for iOS: `eas build --platform ios`
2. Build for Android: `eas build --platform android`
3. Submit to app stores
4. Or use Expo Go for testing

## 📚 Documentation

- **APP_STRUCTURE.md**: Detailed project structure
- **DESIGN_GUIDE.md**: Complete design system
- **RUNNING_THE_APP.md**: Detailed running instructions

## 💡 Tips

- Use the design guide for consistent styling
- Keep components modular and reusable
- Test on multiple devices
- Use TypeScript for type safety
- Follow the existing code patterns

## 🆘 Need Help?

1. Check the documentation files
2. Review existing screen components
3. Check Expo documentation: https://docs.expo.dev
4. Check React Native docs: https://reactnative.dev

---

**Happy Coding! 🎉**
