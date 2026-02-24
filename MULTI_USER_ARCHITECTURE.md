# Multi-User Architecture & Database Preparation

## Current Implementation (Pre-Database)

### User Structure
```typescript
currentUser: {
  id: string;           // Unique identifier (B20232637 for students, PROF001 for teachers)
  name: string;         // User's full name
  role: 'student' | 'teacher' | 'admin';
  department: string;   // Department (IT, CS, etc.)
  semester?: number;    // For students (1-6)
  rollNo?: number;      // For students (extracted from last 2 digits of ID)
}
```

### Data Filtering Strategy

#### Student Dashboard
- **Classes**: Filtered by `semester` field
  - Sem 4 student sees only Sem 4 classes
  - Automatically updates when semester changes
  - Query: `masterTimetable.filter(c => c.semester === currentUser.semester)`

- **Results**: Filtered by `studentId` and `semester`
  - Shows all results before current semester
  - Query: `studentResults.filter(r => r.studentId === currentUser.id && r.semester < currentUser.semester)`

- **Assignments**: Filtered by `status`
  - Shows pending assignments for the student's department/semester
  - Query: `assignments.filter(a => a.status === 'pending')`

- **Attendance**: Filtered by `studentId`
  - Calculates percentage from attendance records
  - Query: `attendance.filter(a => a.studentId === currentUser.id)`

#### Teacher Dashboard
- **Classes**: Filtered by `instructor` name
  - Shows only classes taught by this teacher
  - Query: `teacherClasses.filter(c => c.instructor === currentUser.name)`

- **Assignments**: Filtered by `postedBy`
  - Shows assignments posted by this teacher
  - Query: `assignments.filter(a => a.postedBy === currentUser.name)`

- **Students**: Aggregated from all classes
  - Total students = sum of students in all teacher's classes
  - Query: `teacherClasses.reduce((sum, cls) => sum + cls.students, 0)`

### Dynamic Stats

#### Student Dashboard
1. **Attendance**: `(presentCount / totalAttendance) * 100`
2. **SGPA**: Latest result's SGPA for current semester
3. **Pending**: Count of assignments with `status === 'pending'`

#### Teacher Dashboard
1. **Total Students**: Sum of students across all classes
2. **Assignments**: Count of all assignments posted
3. **Classes**: Count of all classes taught

## Database Schema (Future Implementation)

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('student', 'teacher', 'admin'),
  department VARCHAR(50),
  semester INT (for students),
  roll_no INT (for students),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Classes Table
```sql
CREATE TABLE classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  section VARCHAR(50),
  department VARCHAR(50),
  semester INT,
  instructor_id VARCHAR(20),
  total_students INT,
  time VARCHAR(20),
  FOREIGN KEY (instructor_id) REFERENCES users(id)
);
```

### Assignments Table
```sql
CREATE TABLE assignments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  subject VARCHAR(100),
  title VARCHAR(200),
  description TEXT,
  due_date DATE,
  status ENUM('pending', 'submitted'),
  posted_by VARCHAR(20),
  department VARCHAR(50),
  semester INT,
  created_at TIMESTAMP,
  FOREIGN KEY (posted_by) REFERENCES users(id)
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id VARCHAR(20),
  class_id INT,
  date DATE,
  subject VARCHAR(100),
  status ENUM('present', 'absent'),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (class_id) REFERENCES classes(id)
);
```

### Results Table
```sql
CREATE TABLE results (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id VARCHAR(20),
  semester INT,
  title VARCHAR(100),
  month VARCHAR(50),
  sgpa DECIMAL(3,2),
  status ENUM('Pass', 'ATKT'),
  result_image VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES users(id)
);
```

### Result Subjects Table
```sql
CREATE TABLE result_subjects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  result_id INT,
  code VARCHAR(20),
  name VARCHAR(100),
  marks INT,
  grade VARCHAR(5),
  status ENUM('Pass', 'Fail'),
  FOREIGN KEY (result_id) REFERENCES results(id)
);
```

## Attendance Marking System

### Current Implementation (Mock)
```typescript
// Teacher marks attendance by roll number
// Roll number extracted from last 2 digits of student ID
// Example: B20232637 → Roll No 37

attendance: [
  { 
    id: 1, 
    studentId: 'B20232637',  // Derived from roll no 37
    date: '2025-02-20',
    subject: 'Java Programming',
    status: 'present'
  }
]
```

### Future Database Implementation
1. **Teacher selects class** → Gets list of all students (1-72)
2. **Teacher marks attendance** → Updates attendance table with roll number
3. **System converts roll number** → Finds corresponding student ID
4. **Attendance calculated** → 
   - Daily: Present/Absent
   - Weekly: Percentage
   - Monthly: Percentage
   - Semester: Percentage

### Attendance Calculation Logic
```typescript
// Calculate attendance percentage for a student
const calculateAttendance = (studentId: string, month?: string) => {
  let records = attendance.filter(a => a.studentId === studentId);
  
  if (month) {
    records = records.filter(a => a.date.includes(month));
  }
  
  const presentCount = records.filter(r => r.status === 'present').length;
  return (presentCount / records.length) * 100;
};
```

## Multi-Teacher, Multi-Student Workflow

### Scenario: Prof. Sharma teaches 3 classes with 128 total students

1. **Login**: Prof. Sharma logs in
   - `currentUser.id = 'PROF001'`
   - `currentUser.name = 'Prof. Sharma'`

2. **Dashboard Shows**:
   - Total Students: 128 (sum of all class students)
   - Assignments: 5 (all assignments posted by Prof. Sharma)
   - Classes: 3 (all classes taught by Prof. Sharma)

3. **Mark Attendance**:
   - Select class (e.g., Java Programming - 45 students)
   - See roll numbers 1-45
   - Mark each student present/absent
   - System creates attendance records with student IDs

4. **Post Assignment**:
   - Assignment saved with `postedBy: 'Prof. Sharma'`
   - Automatically sent to all students in department/semester
   - Each student sees it in their dashboard

5. **Upload Results**:
   - Upload for specific semester
   - All students in that semester receive notification
   - Results filtered by student ID and semester

## Migration Path to Database

### Phase 1: Current State
- All data in React state
- Single user simulation
- Mock data

### Phase 2: Backend API Integration
- Replace state with API calls
- Implement authentication
- Add user session management

### Phase 3: Database
- Migrate mock data to database
- Implement queries with proper filtering
- Add data validation

### Phase 4: Multi-User
- Multiple concurrent users
- Real-time updates
- Proper access control

## Key Principles for Scalability

1. **Always filter by user ID/role**
   - Never show all data
   - Always check `currentUser` before displaying

2. **Use department and semester for grouping**
   - Reduces data load
   - Improves query performance

3. **Aggregate data at source**
   - Calculate totals in backend
   - Don't calculate in frontend

4. **Maintain referential integrity**
   - Use IDs for relationships
   - Validate foreign keys

5. **Timestamp all records**
   - Track creation and updates
   - Enable audit trails

## Current Limitations & Future Improvements

### Current
- ✅ Single user per session
- ✅ Mock data in state
- ✅ Semester-based filtering
- ✅ Department-based grouping
- ✅ Roll number to ID mapping

### Future
- 🔄 Multiple concurrent users
- 🔄 Real database persistence
- 🔄 Real-time notifications
- 🔄 Advanced analytics
- 🔄 Bulk operations
- 🔄 Audit logs
- 🔄 Access control lists
