// Student Database with all student information
export const studentsDatabase = {
  'B20232637': {
    id: 'B20232637',
    name: 'Jai Kantharia',
    email: 'jai@college.edu',
    phone: '9876543210',
    course: 'B.Sc IT',
    department: 'IT',
    semester: 4,
    section: 'A',
    dob: '15-03-2003',
    address: '123 Main Street, City',
    fees: {
      total: 65000,
      paid: 45000,
      transactions: [
        { id: 1, date: '10 Jan 2025', amount: 25000, title: 'Semester 1 Tuition' },
        { id: 2, date: '15 Mar 2025', amount: 20000, title: 'Lab Charges' }
      ]
    },
    attendance: [
      { id: 1, date: '2025-05-12', status: 'Present', subject: 'Java Programming' },
      { id: 2, date: '2025-05-13', status: 'Present', subject: 'Database Mgmt' },
      { id: 3, date: '2025-05-14', status: 'Absent', subject: 'Statistical Methods' }
    ],
    results: [
      {
        id: 101,
        semester: 1,
        title: 'Semester 1 Examination',
        month: 'Dec 2023',
        sgpa: '8.40',
        status: 'Pass',
        subjects: [
          { code: 'USIT101', name: 'Imperative Programming', marks: 85, total: 100, grade: 'O', status: 'Pass' }
        ]
      },
      {
        id: 102,
        semester: 2,
        title: 'Semester 2 Examination',
        month: 'May 2024',
        sgpa: '8.20',
        status: 'Pass',
        subjects: [
          { code: 'USIT201', name: 'Data Structures', marks: 82, total: 100, grade: 'O', status: 'Pass' }
        ]
      }
    ],
    assignments: [
      {
        id: 1,
        subject: 'Mathematics',
        title: 'Calculus Ex 4.2',
        description: 'Solve problems 1-10 from the textbook page 145.',
        due: '2025-05-21',
        status: 'pending'
      }
    ]
  },
  'B20232666': {
    id: 'B20232666',
    name: 'Vikrant Bhosale',
    email: 'vikrant@college.edu',
    phone: '9876543211',
    course: 'B.Sc IT',
    department: 'IT',
    semester: 4,
    section: 'A',
    dob: '22-07-2003',
    address: '456 Oak Avenue, City',
    fees: {
      total: 65000,
      paid: 55000,
      transactions: [
        { id: 1, date: '05 Jan 2025', amount: 30000, title: 'Semester 1 Tuition' },
        { id: 2, date: '20 Mar 2025', amount: 25000, title: 'Lab Charges' }
      ]
    },
    attendance: [
      { id: 1, date: '2025-05-12', status: 'Present', subject: 'Java Programming' },
      { id: 2, date: '2025-05-13', status: 'Absent', subject: 'Database Mgmt' },
      { id: 3, date: '2025-05-14', status: 'Present', subject: 'Statistical Methods' }
    ],
    results: [
      {
        id: 201,
        semester: 1,
        title: 'Semester 1 Examination',
        month: 'Dec 2023',
        sgpa: '8.60',
        status: 'Pass',
        subjects: [
          { code: 'USIT101', name: 'Imperative Programming', marks: 88, total: 100, grade: 'O', status: 'Pass' }
        ]
      },
      {
        id: 202,
        semester: 2,
        title: 'Semester 2 Examination',
        month: 'May 2024',
        sgpa: '8.50',
        status: 'Pass',
        subjects: [
          { code: 'USIT201', name: 'Data Structures', marks: 86, total: 100, grade: 'O', status: 'Pass' }
        ]
      }
    ],
    assignments: [
      {
        id: 2,
        subject: 'Physics',
        title: 'Mechanics Problem Set',
        description: 'Complete all problems from Chapter 5.',
        due: '2025-05-25',
        status: 'pending'
      }
    ]
  }
};

// Function to get student data by ID
export const getStudentData = (studentId) => {
  return studentsDatabase[studentId] || null;
};

// Function to get all student IDs
export const getAllStudentIds = () => {
  return Object.keys(studentsDatabase);
};

// Function to validate student credentials
export const validateStudentLogin = (studentId, password) => {
  // In production, this would validate against backend
  // For now, we accept any password for demo purposes
  return studentsDatabase[studentId] ? true : false;
};

// Function to get student fees
export const getStudentFees = (studentId) => {
  const student = studentsDatabase[studentId];
  return student ? student.fees : null;
};

// Function to get student attendance
export const getStudentAttendance = (studentId) => {
  const student = studentsDatabase[studentId];
  return student ? student.attendance : [];
};

// Function to get student results
export const getStudentResults = (studentId) => {
  const student = studentsDatabase[studentId];
  return student ? student.results : [];
};

// Function to get student assignments
export const getStudentAssignments = (studentId) => {
  const student = studentsDatabase[studentId];
  return student ? student.assignments : [];
};
