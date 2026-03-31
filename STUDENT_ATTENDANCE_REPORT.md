# Student Attendance Report Feature

## ✅ Status: IMPLEMENTED

Teachers can now view detailed attendance reports for individual students with sharing capability.

## Features

### 1. Student Overview Report
When a teacher taps on a student's roll number in the attendance management section, they see:

- **Student Information**
  - Name
  - Student ID
  - Avatar

- **Overall Statistics**
  - Attendance Percentage
  - Total Classes Attended
  - Total Classes Absent
  - Total Classes

- **Subject-wise Breakdown**
  - Attendance per subject
  - Percentage for each subject
  - Color-coded (Green ≥75%, Red <75%)

- **Recent Records**
  - Last 10 attendance records
  - Date, subject, and status
  - Color-coded status (Present/Absent)

### 2. Share Report
Teachers can share the attendance report via:
- Email
- WhatsApp
- SMS
- Other sharing apps

Report includes:
- Student name and ID
- Overall statistics
- Subject-wise breakdown
- Recent attendance records

## How to Use

### For Teachers

1. **Open Attendance Management**
   - Go to Teacher Dashboard
   - Tap "Mark Attendance"

2. **Select a Class**
   - Choose the class from the list

3. **View Student Report**
   - Tap on any student's roll number
   - See their attendance overview

4. **Share Report**
   - Tap the "📤 Share Report" button
   - Choose sharing method
   - Report is formatted and shared

### Navigation Flow
```
TeacherDashboard
    ↓
TeacherAttendanceScreen (Mark Attendance)
    ↓
[Tap on student roll number]
    ↓
StudentAttendanceReportScreen (Overview)
    ↓
[Tap Share button]
    ↓
Share via Email/WhatsApp/etc
```

## Technical Implementation

### New Screen
- **File**: `CollegegramApp/screens/StudentAttendanceReportScreen.tsx`
- **Props**:
  - `studentId`: Student's ID
  - `studentName`: Student's name
  - `attendanceRecords`: Array of attendance records
  - `onNavigate`: Navigation callback
  - `onLogout`: Logout callback

### Updated Screens
- **TeacherAttendanceScreen**: Student cards now clickable
- **app/index.tsx**: Added new route and state management

### Data Flow
```
TeacherAttendanceScreen
    ↓ (onNavigate with data)
handleNavigate('studentAttendanceReport', { studentId, studentName })
    ↓
setSelectedStudent(data)
    ↓
StudentAttendanceReportScreen receives props
    ↓
Filters attendance records by studentId
    ↓
Calculates statistics and displays
```

## Report Format

When shared, the report looks like:
```
Attendance Report - Student Name
Student ID: B20232637
Generated: 2/25/2026

Overall Statistics:
- Total Classes: 45
- Present: 42
- Absent: 3
- Attendance: 93%

Subject-wise Breakdown:
Mathematics: 15/15 (100%)
Physics: 14/15 (93%)
Chemistry: 13/15 (87%)

Recent Records:
2/25/2026 - Mathematics: Present
2/24/2026 - Physics: Present
2/23/2026 - Chemistry: Absent
...
```

## Features

✅ **View Student Overview** - Tap roll number to see report
✅ **Statistics** - Overall and subject-wise attendance
✅ **Recent Records** - Last 10 attendance entries
✅ **Share Report** - Send via email, WhatsApp, etc.
✅ **Color Coding** - Visual indicators for attendance status
✅ **Back Navigation** - Proper back button support

## Future Enhancements

- [ ] Export as PDF
- [ ] Email directly from app
- [ ] Attendance trends chart
- [ ] Comparison with class average
- [ ] Alerts for low attendance
- [ ] Parent notifications
- [ ] Attendance history by date range
