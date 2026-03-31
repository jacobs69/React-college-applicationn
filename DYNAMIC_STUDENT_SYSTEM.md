# Collegegram - Dynamic Student System

## Overview

The app now supports multiple students with dynamic data loading. When a student logs in with their ID, all their personal information, fees, attendance, results, and assignments are automatically loaded and displayed throughout the app.

---

## Student Database

### Location
`CollegegramApp/data/studentsDatabase.js`

### Supported Students

#### 1. Jai Kantharia
- **Student ID**: B20232637
- **Email**: jai@college.edu
- **Phone**: 9876543210
- **Course**: B.Sc IT
- **Department**: IT
- **Semester**: 4
- **Section**: A
- **DOB**: 15-03-2003

**Fees**:
- Total: ₹65,000
- Paid: ₹45,000
- Due: ₹20,000

**Attendance**: 3 records (2 Present, 1 Absent)

**Results**: 2 semesters (SGPA: 8.40, 8.20)

**Assignments**: 1 pending

---

#### 2. Vikrant Bhosale
- **Student ID**: B20232666
- **Email**: vikrant@college.edu
- **Phone**: 9876543211
- **Course**: B.Sc IT
- **Department**: IT
- **Semester**: 4
- **Section**: A
- **DOB**: 22-07-2003

**Fees**:
- Total: ₹65,000
- Paid: ₹55,000
- Due: ₹10,000

**Attendance**: 3 records (2 Present, 1 Absent)

**Results**: 2 semesters (SGPA: 8.60, 8.50)

**Assignments**: 1 pending

---

## How It Works

### 1. Login Process

When a student logs in:

```
Student enters ID (e.g., B20232666)
    ↓
LoginPage checks local database
    ↓
Student data found
    ↓
All user data loaded (fees, attendance, results, etc.)
    ↓
onLogin() called with complete user data
    ↓
App.js updates currentUserData state
    ↓
StudentDashboard displays personalized information
```

### 2. Data Flow

```
studentsDatabase.js (Student Data)
    ↓
LoginPage.tsx (Authentication)
    ↓
App.js (State Management)
    ↓
StudentDashboard.tsx (Display)
    ├─ Header shows student name
    ├─ Fees show student's fees
    ├─ Attendance shows student's records
    ├─ Results show student's grades
    └─ Assignments show student's tasks
```

### 3. Dynamic Display

All screens now use `currentUser` data:

**StudentDashboard Header**:
```typescript
<Text style={styles.userName}>{currentUser?.name || 'Student'}</Text>
<Text style={styles.userInfo}>
  {currentUser?.department || 'IT'} • Semester {currentUser?.semester || 4}
</Text>
```

**StudentFeesScreen**:
```typescript
const due = studentFees?.total - studentFees?.paid || 0;
// Shows fees specific to logged-in student
```

**StudentAttendanceScreen**:
```typescript
const userAttendance = attendance.filter((a) => a.studentId === currentUser?.id);
// Shows attendance for logged-in student
```

---

## Adding New Students

To add a new student to the system:

### Step 1: Update `studentsDatabase.js`

```javascript
'B20232XXX': {
  id: 'B20232XXX',
  name: 'Student Name',
  email: 'student@college.edu',
  phone: '9876543212',
  course: 'B.Sc IT',
  department: 'IT',
  semester: 4,
  section: 'A',
  dob: 'DD-MM-YYYY',
  address: 'Address',
  fees: {
    total: 65000,
    paid: 45000,
    transactions: [...]
  },
  attendance: [...],
  results: [...],
  assignments: [...]
}
```

### Step 2: Test Login

1. Open app
2. Select "Student" role
3. Enter new student ID
4. Verify all data displays correctly

---

## Data Structure

### Student Object

```javascript
{
  id: 'B20232XXX',              // Unique student ID
  name: 'Student Name',          // Full name
  email: 'email@college.edu',    // Email address
  phone: '9876543210',           // Phone number
  course: 'B.Sc IT',             // Course name
  department: 'IT',              // Department
  semester: 4,                   // Current semester
  section: 'A',                  // Section
  dob: 'DD-MM-YYYY',            // Date of birth
  address: 'Address',            // Address
  
  fees: {
    total: 65000,                // Total fees
    paid: 45000,                 // Amount paid
    transactions: [              // Payment history
      {
        id: 1,
        date: '10 Jan 2025',
        amount: 25000,
        title: 'Semester 1 Tuition'
      }
    ]
  },
  
  attendance: [                  // Attendance records
    {
      id: 1,
      date: '2025-05-12',
      status: 'Present',
      subject: 'Java Programming'
    }
  ],
  
  results: [                     // Exam results
    {
      id: 101,
      semester: 1,
      title: 'Semester 1 Examination',
      month: 'Dec 2023',
      sgpa: '8.40',
      status: 'Pass',
      subjects: [...]
    }
  ],
  
  assignments: [                 // Assignments
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Calculus Ex 4.2',
      description: 'Solve problems...',
      due: '2025-05-21',
      status: 'pending'
    }
  ]
}
```

---

## Dynamic Features

### 1. Personalized Dashboard Header

**Before**: 
```
Welcome Back! 👋
Jai Kantharia
IT • Semester 4
```

**After Login as Vikrant**:
```
Welcome Back! 👋
Vikrant Bhosale
IT • Semester 4
```

### 2. Student-Specific Fees

**Jai's Fees**:
- Total: ₹65,000
- Paid: ₹45,000
- Due: ₹20,000

**Vikrant's Fees**:
- Total: ₹65,000
- Paid: ₹55,000
- Due: ₹10,000

### 3. Student-Specific Attendance

**Jai's Attendance**: 2 Present, 1 Absent

**Vikrant's Attendance**: 2 Present, 1 Absent

### 4. Student-Specific Results

**Jai's SGPA**: 8.40 (Semester 1), 8.20 (Semester 2)

**Vikrant's SGPA**: 8.60 (Semester 1), 8.50 (Semester 2)

---

## Testing the Dynamic System

### Test Case 1: Login as Jai Kantharia

1. Open app
2. Select "Student" role
3. Enter ID: `B20232637`
4. Enter any password
5. Verify:
   - Name shows "Jai Kantharia"
   - Fees show ₹20,000 due
   - SGPA shows 8.40

### Test Case 2: Login as Vikrant Bhosale

1. Open app
2. Select "Student" role
3. Enter ID: `B20232666`
4. Enter any password
5. Verify:
   - Name shows "Vikrant Bhosale"
   - Fees show ₹10,000 due
   - SGPA shows 8.60

### Test Case 3: Logout and Switch Users

1. Login as Jai
2. Verify Jai's data
3. Logout
4. Login as Vikrant
5. Verify Vikrant's data (different from Jai)

---

## API Functions

### `getStudentData(studentId)`
Returns complete student object

```javascript
const student = getStudentData('B20232637');
// Returns: { id, name, email, fees, attendance, results, assignments, ... }
```

### `getAllStudentIds()`
Returns array of all student IDs

```javascript
const ids = getAllStudentIds();
// Returns: ['B20232637', 'B20232666']
```

### `validateStudentLogin(studentId, password)`
Validates student credentials

```javascript
const isValid = validateStudentLogin('B20232637', 'password');
// Returns: true or false
```

### `getStudentFees(studentId)`
Returns student's fee information

```javascript
const fees = getStudentFees('B20232637');
// Returns: { total, paid, transactions }
```

### `getStudentAttendance(studentId)`
Returns student's attendance records

```javascript
const attendance = getStudentAttendance('B20232637');
// Returns: [{ id, date, status, subject }, ...]
```

### `getStudentResults(studentId)`
Returns student's exam results

```javascript
const results = getStudentResults('B20232637');
// Returns: [{ id, semester, sgpa, subjects }, ...]
```

### `getStudentAssignments(studentId)`
Returns student's assignments

```javascript
const assignments = getStudentAssignments('B20232637');
// Returns: [{ id, subject, title, due, status }, ...]
```

---

## Files Modified

1. **LoginPage.tsx**
   - Added import for `getStudentData`
   - Updated `handleLoginPress` to check local database
   - Loads complete student data on login

2. **StudentDashboard.tsx**
   - Updated to use `currentUser?.id` and `currentUser?.semester`
   - All data now filtered by logged-in student

3. **New File: studentsDatabase.js**
   - Contains all student data
   - Provides helper functions for data access

---

## Future Enhancements

1. **Backend Integration**
   - Replace local database with API calls
   - Fetch student data from backend on login

2. **More Students**
   - Add more students to database
   - Implement pagination for student list

3. **Real-time Updates**
   - Sync fees, attendance, results from backend
   - Real-time notifications for updates

4. **Student Search**
   - Admin can search for students
   - View any student's data

5. **Data Export**
   - Export student data to PDF
   - Generate reports

---

## Summary

✅ **Dynamic Student System Implemented**

- Multiple students supported
- Each student sees their own data
- Personalized dashboard
- Student-specific fees, attendance, results
- Easy to add new students
- Ready for backend integration

**Test Credentials**:
- Student 1: B20232637 (Jai Kantharia)
- Student 2: B20232666 (Vikrant Bhosale)
