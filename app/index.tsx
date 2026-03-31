import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, BackHandler, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { navigationHistory } from '../utils/navigationHistory';
import { authAPI, tokenAPI } from '../utils/api';
import LandingPage from '../screens/LandingPage';
import LoginPage from '../screens/LoginPage';
import RegisterPage from '../screens/RegisterPage';
import StudentDashboard from '../screens/StudentDashboard';
import TeacherDashboard from '../screens/TeacherDashboard';
import AdminDashboard from '../screens/AdminDashboard';
import IDCardScreen from '../screens/IDCardScreen';
import SendNotice from '../screens/SendNotice';
import NotificationsScreen from '../screens/NotificationsScreen';
import StudentTimetableScreen from '../screens/StudentTimetableScreen';
import ManageTimetableScreen from '../screens/ManageTimetableScreen';
import TeacherAddAssignmentScreen from '../screens/TeacherAddAssignmentScreen';
import StudentAssignmentScreen from '../screens/StudentAssignmentScreen';
import StudentResultsScreen from '../screens/StudentResultsScreen';
import ResultDetailScreen from '../screens/ResultDetailScreen';
import TeacherPostResultsScreen from '../screens/TeacherPostResultsScreen';
import TeacherAttendanceScreen from '../screens/TeacherAttendanceScreen';
import StudentAttendanceScreen from '../screens/StudentAttendanceScreen';
import StudentAttendanceReportScreen from '../screens/StudentAttendanceReportScreen';
import StudentOverallReportScreen from '../screens/StudentOverallReportScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StudentFeesScreen from '../screens/StudentFeesScreen';
import AdminFeesScreen from '../screens/AdminFeesScreen';
import AdminGalleryScreen from '../screens/AdminGalleryScreen';
import StudentGalleryScreen from '../screens/StudentGalleryScreen';
import AlbumDetailScreen from '../screens/AlbumDetailScreen';
import TeacherPostEventScreen from '../screens/TeacherPostEventScreen';
import StudentEventsScreen from '../screens/StudentEventsScreen';
import ClassDetailScreen from '../screens/ClassDetailScreen';
import AboutScreen from '../screens/AboutScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>({
    id: 'B20232637',
    name: 'Jai Kantharia',
    role: 'student',
    department: 'IT',
    semester: 4,
    rollNo: 37,
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Calculus Exercise 4.2',
      description: 'Solve problems 1–10 from textbook page 145.',
      due: '2025-05-21',
      status: 'pending',
      postedBy: 'Prof. Sharma',
      department: 'IT',
      semester: 4,
    },
  ]);
  const [masterTimetable, setMasterTimetable] = useState<any[]>([
    { id: 1, course: 'B.Sc IT', day: 'Monday', subject: 'Java Programming', time: '10:00 AM', room: 'Lab 1', instructor: 'Prof. Sharma', semester: 4 },
    { id: 2, course: 'B.Sc IT', day: 'Monday', subject: 'Database Management', time: '11:30 AM', room: 'LH-4', instructor: 'Prof. Patel', semester: 4 },
    { id: 3, course: 'B.Sc IT', day: 'Tuesday', subject: 'Web Development', time: '02:00 PM', room: 'LH-5', instructor: 'Prof. Singh', semester: 4 },
    { id: 4, course: 'B.Sc IT', day: 'Wednesday', subject: 'Data Structures', time: '10:00 AM', room: 'Lab 2', instructor: 'Prof. Verma', semester: 4 },
    { id: 5, course: 'B.Sc IT', day: 'Thursday', subject: 'Operating Systems', time: '03:30 PM', room: 'LH-3', instructor: 'Prof. Sharma', semester: 4 },
    { id: 6, course: 'B.Sc IT', day: 'Friday', subject: 'Software Engineering', time: '09:00 AM', room: 'LH-1', instructor: 'Prof. Patel', semester: 4 },
  ]);
  const [studentResults, setStudentResults] = useState<any[]>([
    {
      id: 101,
      studentId: 'B20232637',
      semester: 1,
      title: 'Semester 1 Examination',
      month: 'Dec 2023',
      sgpa: '8.40',
      status: 'Pass',
      subjects: [
        { code: 'USIT101', name: 'Imperative Programming', marks: 85, grade: 'O', status: 'Pass' },
        { code: 'USIT102', name: 'Digital Electronics', marks: 72, grade: 'A+', status: 'Pass' },
        { code: 'USIT103', name: 'Mathematics I', marks: 88, grade: 'O', status: 'Pass' },
        { code: 'USIT104', name: 'Physics', marks: 78, grade: 'A', status: 'Pass' },
      ],
    },
    {
      id: 102,
      studentId: 'B20232637',
      semester: 2,
      title: 'Semester 2 Examination',
      month: 'May 2024',
      sgpa: '8.65',
      status: 'Pass',
      subjects: [
        { code: 'USIT201', name: 'Object Oriented Programming', marks: 90, grade: 'O', status: 'Pass' },
        { code: 'USIT202', name: 'Database Management', marks: 82, grade: 'O', status: 'Pass' },
        { code: 'USIT203', name: 'Mathematics II', marks: 85, grade: 'O', status: 'Pass' },
        { code: 'USIT204', name: 'Web Technologies', marks: 79, grade: 'A', status: 'Pass' },
      ],
    },
    {
      id: 103,
      studentId: 'B20232637',
      semester: 3,
      title: 'Semester 3 Examination',
      month: 'Dec 2024',
      sgpa: '8.20',
      status: 'Pass',
      subjects: [
        { code: 'USIT301', name: 'Data Structures', marks: 88, grade: 'O', status: 'Pass' },
        { code: 'USIT302', name: 'Operating Systems', marks: 75, grade: 'A', status: 'Pass' },
        { code: 'USIT303', name: 'Computer Networks', marks: 80, grade: 'O', status: 'Pass' },
        { code: 'USIT304', name: 'Software Engineering', marks: 72, grade: 'A+', status: 'Pass' },
      ],
    },
  ]);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([
    { id: 1, studentId: 'B20232637', rollNo: 37, date: '2025-02-20', status: 'Present', subject: 'Java Programming', class: 'B.Sc IT - Sem 4' },
    { id: 2, studentId: 'B20232637', rollNo: 37, date: '2025-02-19', status: 'Present', subject: 'Database Management', class: 'B.Sc IT - Sem 4' },
    { id: 3, studentId: 'B20232637', rollNo: 37, date: '2025-02-18', status: 'Absent', subject: 'Web Development', class: 'B.Sc IT - Sem 4' },
    { id: 4, studentId: 'B20232637', rollNo: 37, date: '2025-02-17', status: 'Present', subject: 'Java Programming', class: 'B.Sc IT - Sem 4' },
    { id: 5, studentId: 'B20232637', rollNo: 37, date: '2025-02-16', status: 'Present', subject: 'Data Structures', class: 'B.Sc IT - Sem 4' },
  ]);
  const [teacherClasses] = useState<any[]>([
    { id: 1, name: 'Java Programming', section: 'B.Sc IT - Sem 4', students: 45, time: '10:00 AM', department: 'IT', semester: 4, instructor: 'Prof. Sharma' },
    { id: 2, name: 'Data Structures', section: 'B.Sc IT - Sem 4', students: 45, time: '11:30 AM', department: 'IT', semester: 4, instructor: 'Prof. Sharma' },
    { id: 3, name: 'Web Development', section: 'B.Sc IT - Sem 6', students: 38, time: '02:00 PM', department: 'IT', semester: 6, instructor: 'Prof. Sharma' },
  ]);
  const [studentFees, setStudentFees] = useState<any>({
    total: 65000,
    paid: 45000,
    transactions: [
      { id: 1, date: '10 Jan 2025', amount: 25000, title: 'Semester 1 Tuition' },
      { id: 2, date: '15 Mar 2025', amount: 20000, title: 'Lab Charges' },
    ],
  });
  const [allStudentFees, setAllStudentFees] = useState<any[]>([
    { id: 'S101', name: 'Aarav Patel', course: 'B.Sc IT', amount: 15000, status: 'paid' },
    { id: 'S102', name: 'Vivaan Singh', course: 'B.Sc CS', amount: 22000, status: 'pending' },
    { id: 'S103', name: 'Diya Sharma', course: 'B.Com', amount: 12000, status: 'pending' },
    { id: 'S104', name: 'Ananya Gupta', course: 'B.Sc IT', amount: 15000, status: 'paid' },
    { id: 'S105', name: 'Rohan Kumar', course: 'BMS', amount: 18000, status: 'overdue' },
    { id: 'S106', name: 'Jai Kantharia', course: 'B.Sc IT', amount: 20000, status: 'pending' },
  ]);
  const [albums, setAlbums] = useState<any[]>([
    {
      id: 1,
      title: 'Annual Cultural Fest 2025',
      category: 'Cultural',
      date: '2025-05-15',
      cover: 'https://placehold.co/600x400/9333EA/FFFFFF?text=Cultural+Fest',
      images: [
        'https://placehold.co/400x400/9333EA/FFFFFF?text=Pic+1',
        'https://placehold.co/400x400/9333EA/FFFFFF?text=Pic+2',
      ],
    },
  ]);
  const [events, setEvents] = useState<any[]>([
    {
      id: 1,
      title: 'Mid Semester Exam',
      description: 'Exam for Semester 4 IT students',
      date: '2025-06-01',
      time: '10:00 AM',
      location: 'Main Hall',
      postedBy: 'Prof. Sharma',
      semester: 4,
      type: 'exam',
    },
    {
      id: 2,
      title: 'Tech Fest 2025',
      description: 'Annual technology festival with competitions and workshops',
      date: '2025-05-25',
      time: '09:00 AM',
      location: 'Campus Ground',
      postedBy: 'Prof. Patel',
      semester: 4,
      type: 'event',
    },
    {
      id: 3,
      title: 'Web Development Seminar',
      description: 'Learn latest web development trends and technologies',
      date: '2025-05-20',
      time: '02:00 PM',
      location: 'LH-5',
      postedBy: 'Prof. Singh',
      semester: 4,
      type: 'seminar',
    },
    {
      id: 4,
      title: 'React Workshop',
      description: 'Hands-on workshop on React framework',
      date: '2025-05-18',
      time: '11:00 AM',
      location: 'Lab 1',
      postedBy: 'Prof. Verma',
      semester: 4,
      type: 'workshop',
    },
  ]);

  const handleLogin = async (role: string, userData: any) => {
    try {
      // Save token if available
      if (userData.token) {
        await tokenAPI.saveToken(userData.token);
      }

      // Update current user with backend data
      setCurrentUser({
        id: userData.id || userData.studentId || userData.teacherId,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: userData.department || 'IT',
        semester: userData.semester || 4,
        rollNo: userData.rollNo,
        studentId: userData.studentId,
        teacherId: userData.teacherId,
      });

      // Initialize navigation history and navigate to dashboard
      if (role === 'admin') {
        navigationHistory.setInitial('adminDashboard');
        setCurrentPage('adminDashboard');
      } else if (role === 'teacher') {
        navigationHistory.setInitial('teacherDashboard');
        setCurrentPage('teacherDashboard');
      } else {
        navigationHistory.setInitial('studentDashboard');
        setCurrentPage('studentDashboard');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await tokenAPI.removeToken();
      navigationHistory.reset();
      setCurrentUser(null);
      setCurrentPage('login');
    } catch (error) {
      console.error('Logout error:', error);
      setCurrentPage('login');
    }
  };

  // Check for existing token on app start
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await tokenAPI.getToken();
        if (token) {
          try {
            const response = await authAPI.verifyToken(token);
            if (response.success && response.user) {
              // Token is valid, auto-login
              setCurrentUser({
                id: response.user.id || response.user.studentId || response.user.teacherId,
                name: response.user.name,
                email: response.user.email,
                role: response.user.role,
                department: response.user.department || 'IT',
                semester: response.user.semester || 4,
                rollNo: response.user.rollNo,
                studentId: response.user.studentId,
                teacherId: response.user.teacherId,
              });
              
              const role = response.user.role;
              if (role === 'admin') {
                navigationHistory.setInitial('adminDashboard');
                setCurrentPage('adminDashboard');
              } else if (role === 'teacher') {
                navigationHistory.setInitial('teacherDashboard');
                setCurrentPage('teacherDashboard');
              } else {
                navigationHistory.setInitial('studentDashboard');
                setCurrentPage('studentDashboard');
              }
            } else {
              // Token invalid, go to login
              await tokenAPI.removeToken();
              setCurrentPage('login');
            }
          } catch (verifyError) {
            console.error('Token verification error:', verifyError);
            // Token verification failed, go to login
            await tokenAPI.removeToken();
            setCurrentPage('login');
          }
        }
      } catch (error) {
        console.error('Token check failed:', error);
        setCurrentPage('login');
      }
    };

    checkToken();
  }, []);

  const handleNavigate = (page: string, data?: any) => {
    if (data) {
      if (page === 'studentAttendanceReport' || page === 'studentOverallReport') {
        setSelectedStudent(data);
      } else {
        setSelectedClass(data);
      }
    }
    navigationHistory.push(page);
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    const previousPage = navigationHistory.pop();
    if (previousPage) {
      setCurrentPage(previousPage);
      return true; // Prevent default back behavior
    }
    return false; // Allow default back behavior (exit app)
  };

  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleGoBack);
    return () => backHandler.remove();
  }, []);

  const handleSendNotice = (notice: any) => {
    setNotifications([...notifications, notice]);
  };

  const handleMarkNotificationsAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        isNew: false,
      }))
    );
  };

  const handlePostAssignment = (assignment: any) => {
    setAssignments([assignment, ...assignments]);
    
    // Create a notification for the assignment
    const assignmentNotification = {
      id: Date.now(),
      type: 'assignment',
      title: `New Assignment: ${assignment.title}`,
      description: `${assignment.subject} - Due: ${assignment.due}`,
      sentBy: 'Prof. Sharma',
      sentAt: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isNew: true,
    };
    
    setNotifications([...notifications, assignmentNotification]);
  };

  const handlePostResult = (result: any) => {
    setStudentResults([result, ...studentResults]);
    
    // Create a notification for the result
    const resultNotification = {
      id: Date.now(),
      type: 'result',
      title: `Results Published: ${result.title}`,
      description: `Semester ${result.semester} - SGPA: ${result.sgpa}`,
      sentBy: 'Prof. Sharma',
      sentAt: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isNew: true,
    };
    
    setNotifications([...notifications, resultNotification]);
  };

  const handlePostEvent = (event: any) => {
    setEvents([event, ...events]);
    
    // Create a notification for the event
    const eventNotification = {
      id: Date.now(),
      type: 'event',
      title: `New Event: ${event.title}`,
      description: `${event.date} at ${event.time} - ${event.location}`,
      sentBy: event.postedBy,
      sentAt: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isNew: true,
    };
    
    setNotifications([...notifications, eventNotification]);
  };

  let content;
  switch (currentPage) {
    case 'landing':
      content = <LandingPage onGoToLogin={() => setCurrentPage('login')} />;
      break;
    case 'login':
      content = <LoginPage onLogin={handleLogin} onGoToRegister={() => setCurrentPage('register')} />;
      break;
    case 'register':
      content = <RegisterPage onBackToLogin={() => setCurrentPage('login')} />;
      break;
    case 'studentDashboard':
      content = <StudentDashboard onLogout={handleLogout} onNavigate={handleNavigate} notifications={notifications} masterTimetable={masterTimetable} studentResults={studentResults} setSelectedResult={setSelectedResult} assignments={assignments} currentUser={currentUser} attendance={attendanceRecords} events={events} />;
      break;
    case 'teacherDashboard':
      content = <TeacherDashboard onLogout={handleLogout} onNavigate={handleNavigate} currentUser={currentUser} assignments={assignments} teacherClasses={teacherClasses} events={events} attendanceRecords={attendanceRecords} />;
      break;
    case 'adminDashboard':
      content = <AdminDashboard onLogout={handleLogout} onNavigate={handleNavigate} currentUser={currentUser} />;
      break;
    case 'idcard':
      content = <IDCardScreen onLogout={handleLogout} onNavigate={handleNavigate} currentUser={currentUser} />;
      break;
    case 'sendNotice':
      content = <SendNotice onLogout={handleLogout} onNavigate={handleNavigate} onSendNotice={handleSendNotice} currentUser={currentUser} />;
      break;
    case 'notifications':
      content = <NotificationsScreen onLogout={handleLogout} onNavigate={handleNavigate} notifications={notifications} onMarkAsRead={handleMarkNotificationsAsRead} currentUser={currentUser} />;
      break;
    case 'studentTimetable':
      content = <StudentTimetableScreen onLogout={handleLogout} onNavigate={handleNavigate} masterTimetable={masterTimetable} currentUser={currentUser} />;
      break;
    case 'manageTimetable':
      content = <ManageTimetableScreen onLogout={handleLogout} onNavigate={handleNavigate} masterTimetable={masterTimetable} setMasterTimetable={setMasterTimetable} currentUser={currentUser} />;
      break;
    case 'teacherAddAssignment':
      content = <TeacherAddAssignmentScreen onLogout={handleLogout} onNavigate={handleNavigate} assignments={assignments} setAssignments={handlePostAssignment} currentUser={currentUser} />;
      break;
    case 'studentAssignments':
      content = <StudentAssignmentScreen onLogout={handleLogout} onNavigate={handleNavigate} assignments={assignments} setAssignments={setAssignments} currentUser={currentUser} />;
      break;
    case 'studentResults':
      content = <StudentResultsScreen onLogout={handleLogout} onNavigate={(page, data) => { if (data) setSelectedResult(data); handleNavigate(page); }} studentResults={studentResults} currentUser={currentUser} />;
      break;
    case 'resultDetail':
      content = <ResultDetailScreen onLogout={handleLogout} onNavigate={handleNavigate} result={selectedResult} currentUser={currentUser} />;
      break;
    case 'teacherPostResults':
      content = <TeacherPostResultsScreen onLogout={handleLogout} onNavigate={handleNavigate} onPostResult={handlePostResult} currentUser={currentUser} />;
      break;
    case 'teacherPostEvent':
      content = <TeacherPostEventScreen onLogout={handleLogout} onNavigate={handleNavigate} onPostEvent={handlePostEvent} currentUser={currentUser} />;
      break;
    case 'studentEvents':
      content = <StudentEventsScreen onLogout={handleLogout} onNavigate={handleNavigate} events={events} currentUser={currentUser} />;
      break;
    case 'about':
      content = <AboutScreen onLogout={handleLogout} onNavigate={handleNavigate} currentUser={currentUser} />;
      break;
    case 'classDetail':
      content = <ClassDetailScreen onLogout={handleLogout} onNavigate={handleNavigate} classData={selectedClass} attendanceRecords={attendanceRecords} setAttendanceRecords={setAttendanceRecords} currentUser={currentUser} />;
      break;
    case 'teacherAttendance':
      content = <TeacherAttendanceScreen onLogout={handleLogout} onNavigate={handleNavigate} teacherClasses={teacherClasses} attendanceRecords={attendanceRecords} setAttendanceRecords={setAttendanceRecords} currentUser={currentUser} />;
      break;
    case 'studentAttendance':
      content = <StudentAttendanceScreen onLogout={handleLogout} onNavigate={handleNavigate} attendanceRecords={attendanceRecords} currentUser={currentUser} />;
      break;
    case 'studentAttendanceReport':
      content = <StudentAttendanceReportScreen onLogout={handleLogout} onNavigate={handleNavigate} studentId={selectedStudent?.studentId} studentName={selectedStudent?.studentName} attendanceRecords={attendanceRecords} currentUser={currentUser} />;
      break;
    case 'studentOverallReport':
      content = <StudentOverallReportScreen onLogout={handleLogout} onNavigate={handleNavigate} studentId={selectedStudent?.studentId} studentName={selectedStudent?.studentName} attendanceRecords={attendanceRecords} assignments={assignments} studentResults={studentResults} currentUser={currentUser} />;
      break;
    case 'profile':
      content = <ProfileScreen onLogout={handleLogout} onNavigate={handleNavigate} currentUser={currentUser} />;
      break;
    case 'studentFees':
      content = <StudentFeesScreen onLogout={handleLogout} onNavigate={handleNavigate} studentFees={studentFees} setStudentFees={setStudentFees} currentUser={currentUser} />;
      break;
    case 'adminFees':
      content = <AdminFeesScreen onLogout={handleLogout} onNavigate={handleNavigate} studentFees={allStudentFees} setStudentFees={setAllStudentFees} />;
      break;
    case 'adminGallery':
      content = <AdminGalleryScreen onLogout={handleLogout} onNavigate={handleNavigate} albums={albums} setAlbums={setAlbums} currentUser={currentUser} />;
      break;
    case 'studentGallery':
      content = <StudentGalleryScreen onLogout={handleLogout} onNavigate={(page: string, data?: any) => { if (data) setSelectedAlbum(data); handleNavigate(page); }} albums={albums} currentUser={currentUser} />;
      break;
    case 'albumDetail':
      content = <AlbumDetailScreen onLogout={handleLogout} onNavigate={handleNavigate} album={selectedAlbum} currentUser={currentUser} />;
      break;
    default:
      content = <LandingPage onGoToLogin={() => setCurrentPage('login')} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
