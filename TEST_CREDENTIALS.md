# Test Credentials - Ready to Use

## Backend Status
✅ Running on `http://192.168.0.105:5000`
✅ MongoDB Connected
✅ All test accounts registered

## Login Credentials

### Student Account
- **Role**: Student
- **Identifier**: `B20232637` (Student ID) or `jai@college.edu` (Email)
- **Password**: `password123`
- **Name**: Jai Kantharia
- **Department**: IT
- **Semester**: 4

### Teacher Account
- **Role**: Teacher
- **Identifier**: `sharma@college.edu` (Email) or `T001` (Teacher ID)
- **Password**: `password123`
- **Name**: Prof. Sharma
- **Department**: IT
- **Semester**: 4

### Admin Account
- **Role**: Admin
- **Identifier**: `admin@college.edu` (Email)
- **Password**: `password123`
- **Name**: Admin User
- **Department**: Administration

## How to Test

1. Open the app
2. Select role (Student/Teacher/Admin)
3. Enter identifier (ID or email)
4. Enter password: `password123`
5. Click "Sign In"

## What to Expect

### Student Login
- Navigates to Student Dashboard
- Shows assignments, timetable, results, fees, etc.

### Teacher Login
- Navigates to Teacher Dashboard
- Shows classes, post assignment, post results, etc.

### Admin Login
- Navigates to Admin Dashboard
- Shows admin features, manage fees, gallery, etc.

## API Endpoints

### Register
```
POST /api/auth/register
Body: {
  name, email, password, role, 
  department, semester, rollNo, studentId, teacherId
}
```

### Login
```
POST /api/auth/login
Body: { identifier, password }
```

### Verify Token
```
POST /api/auth/verify
Headers: Authorization: Bearer {token}
```

## Notes

- All passwords are `password123`
- Student ID format: `B20232637` (9 characters)
- Teacher ID format: `T001`
- Tokens expire in 30 days
- Token is saved to AsyncStorage on login
- App auto-logs in if valid token exists
