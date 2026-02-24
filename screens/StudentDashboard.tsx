import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import NotificationPopup from '../components/NotificationPopup';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (page: string, data?: any) => void;
  notifications?: any[];
  masterTimetable?: any[];
  studentResults?: any[];
  setSelectedResult?: (result: any) => void;
  assignments?: any[];
  currentUser?: any;
  attendance?: any[];
  events?: any[];
}

export default function StudentDashboard({ onLogout, onNavigate, notifications = [], masterTimetable = [], studentResults = [], setSelectedResult, assignments = [], currentUser, attendance = [], events = [] }: DashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [showPopup, setShowPopup] = useState(false);
  const [latestNotification, setLatestNotification] = useState<any>(null);

  useEffect(() => {
    // Show popup when a new notification arrives
    if (notifications.length > 0) {
      const newNotifications = notifications.filter((n) => n.isNew);
      if (newNotifications.length > 0) {
        setLatestNotification(newNotifications[newNotifications.length - 1]);
        setShowPopup(true);
      }
    }
  }, [notifications]);

  const quickActions = [
    { id: 1, icon: '📅', label: 'Timetable', color: '#3b82f6' },
    { id: 2, icon: '📝', label: 'Assignments', color: '#8b5cf6' },
    { id: 3, icon: '📊', label: 'Results', color: '#ec4899' },
    { id: 4, icon: '✅', label: 'Attendance', color: '#10b981' },
    { id: 5, icon: '💰', label: 'Fees', color: '#f59e0b' },
    { id: 6, icon: '📚', label: 'Docs', color: '#06b6d4' },
    { id: 7, icon: '🖼️', label: 'Gallery', color: '#8b5cf6' },
    { id: 8, icon: '🎉', label: 'Events', color: '#f59e0b' },
    { id: 9, icon: 'ℹ️', label: 'About', color: '#3b82f6' },
  ];

  const currentSemester = 4;
  const currentStudentId = 'B20232637';

  const upcomingClasses = (() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    // Filter classes by current semester
    const todayClasses = masterTimetable
      .filter((c) => c.course === 'B.Sc IT' && c.day === today && c.semester === currentUser?.semester)
      .sort((a, b) => a.time.localeCompare(b.time));
    
    return todayClasses;
  })();

  // Get latest SGPA from current semester results
  const latestSgpa = (() => {
    const currentSemResults = studentResults
      .filter((r) => r.studentId === currentUser?.id && r.semester === currentUser?.semester)
      .sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime());
    
    return currentSemResults.length > 0 ? currentSemResults[0].sgpa : '8.4';
  })();

  // Get count of pending assignments for current user's semester
  const pendingAssignmentCount = (() => {
    return assignments.filter((a) => a.status === 'pending' && a.semester === currentUser?.semester).length;
  })();

  // Calculate attendance percentage for current user
  const attendancePercentage = (() => {
    if (attendance.length === 0) return '85%';
    const userAttendance = attendance.filter((a) => a.studentId === currentUser?.id);
    if (userAttendance.length === 0) return '85%';
    const presentCount = userAttendance.filter((a) => a.status === 'present').length;
    const percentage = Math.round((presentCount / userAttendance.length) * 100);
    return `${percentage}%`;
  })();

  // Get recent assignments for current user's semester (max 3)
  const recentAssignments = (() => {
    return assignments
      .filter((a) => a.semester === currentUser?.semester)
      .sort((a, b) => new Date(b.due || 0).getTime() - new Date(a.due || 0).getTime())
      .slice(0, 3);
  })();

  // Get upcoming events for current user's semester (max 3)
  const upcomingEvents = (() => {
    return events
      .filter((e) => e.semester === currentUser?.semester)
      .sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime())
      .slice(0, 3);
  })();

  const announcements = [
    { id: 1, title: 'Library Timings Extended', date: '2 hours ago', priority: 'normal' },
    { id: 2, title: 'Holiday Announced', date: '1 day ago', priority: 'high' },
  ];

  return (
    <View style={styles.container}>
      {/* Notification Popup */}
      {showPopup && latestNotification && (
        <NotificationPopup
          notification={latestNotification}
          onDismiss={() => setShowPopup(false)}
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back! 👋</Text>
          <Text style={styles.userName}>{currentUser?.name || 'Jai Kantharia'}</Text>
          <Text style={styles.userInfo}>{currentUser?.department || 'IT'} • Semester {currentUser?.semester || 4}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.profileBtn}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuOpen(!menuOpen)}>
              <Text style={styles.menuIcon}>⋮</Text>
            </TouchableOpacity>
            {menuOpen && (
              <View style={styles.dropdown}>
                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
                  <Text style={styles.menuItemIcon}>⚙️</Text>
                  <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
                  <Text style={styles.menuItemIcon}>❓</Text>
                  <Text style={styles.menuItemText}>Help</Text>
                </TouchableOpacity>
                <View style={styles.menuDivider} />
                <TouchableOpacity style={[styles.menuItem, styles.logoutMenuItem]} onPress={() => { setMenuOpen(false); onLogout(); }}>
                  <Text style={styles.menuItemIcon}>🚪</Text>
                  <Text style={[styles.menuItemText, styles.logoutMenuText]}>Log Out</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Today's Classes - Horizontal Scroll */}
        <View style={styles.classesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Classes</Text>
            <TouchableOpacity onPress={() => onNavigate('studentTimetable')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {upcomingClasses.length === 0 ? (
            <View style={styles.noClassesContainer}>
              <Text style={styles.noClassesText}>No classes today</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.classesScrollContent}
              scrollEventThrottle={16}
            >
              {upcomingClasses.map((cls) => (
                <View key={cls.id} style={styles.classCardHorizontal}>
                  <View style={styles.classTimeHorizontal}>
                    <Text style={styles.classTimeTextHorizontal}>{cls.time}</Text>
                  </View>
                  <Text style={styles.classNameHorizontal}>{cls.subject}</Text>
                  <Text style={styles.classInfoHorizontal}>📍 {cls.room}</Text>
                  <Text style={styles.classInstructorHorizontal}>{cls.instructor}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#e0f2fe' }]}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statValue}>{attendancePercentage}</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statValue}>{latestSgpa}</Text>
            <Text style={styles.statLabel}>SGPA</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statValue}>{pendingAssignmentCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.actionCard, { borderLeftColor: action.color }]}
                onPress={() => {
                  if (action.id === 1) {
                    onNavigate('studentTimetable');
                  } else if (action.id === 2) {
                    onNavigate('studentAssignments');
                  } else if (action.id === 3) {
                    onNavigate('studentResults');
                  } else if (action.id === 4) {
                    onNavigate('studentAttendance');
                  } else if (action.id === 5) {
                    onNavigate('studentFees');
                  } else if (action.id === 7) {
                    onNavigate('studentGallery');
                  } else if (action.id === 8) {
                    onNavigate('studentEvents');
                  } else if (action.id === 9) {
                    onNavigate('about');
                  }
                }}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Assignments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Assignments</Text>
            <TouchableOpacity onPress={() => onNavigate('studentAssignments')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {recentAssignments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📝</Text>
              <Text style={styles.emptyStateText}>No assignments yet</Text>
            </View>
          ) : (
            recentAssignments.map((assignment) => (
              <View key={assignment.id} style={styles.assignmentCard}>
                <View style={styles.assignmentLeft}>
                  <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                  <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                  <Text style={styles.assignmentDue}>Due: {assignment.due}</Text>
                </View>
                <View style={[styles.statusBadge, assignment.status === 'pending' ? styles.statusPending : styles.statusSubmitted]}>
                  <Text style={styles.statusText}>{assignment.status}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={() => onNavigate('studentEvents')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {upcomingEvents.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🎉</Text>
              <Text style={styles.emptyStateText}>No upcoming events</Text>
            </View>
          ) : (
            upcomingEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                onPress={() => onNavigate('studentEvents')}
              >
                <View style={[styles.eventIcon, event.type === 'exam' ? styles.examIcon : event.type === 'seminar' ? styles.seminarIcon : event.type === 'workshop' ? styles.workshopIcon : styles.eventIcon]}>
                  <Text style={styles.eventIconText}>{event.type === 'exam' ? '📝' : event.type === 'seminar' ? '🎤' : event.type === 'workshop' ? '🛠️' : '📅'}</Text>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date} • {event.time}</Text>
                  <Text style={styles.eventLocation}>📍 {event.location}</Text>
                </View>
                <Text style={styles.eventType}>{event.type}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {announcements.map((announcement) => (
            <View key={announcement.id} style={[styles.announcementCard, announcement.priority === 'high' ? styles.announcementHigh : styles.announcementNormal]}>
              <View style={styles.announcementLeft}>
                <Text style={styles.announcementTitle}>{announcement.title}</Text>
                <Text style={styles.announcementDate}>{announcement.date}</Text>
              </View>
              <View style={[styles.priorityDot, announcement.priority === 'high' ? styles.priorityDotHigh : styles.priorityDotNormal]} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        role="student"
        active={activeNav}
        unreadCount={notifications.filter((n) => n.isNew).length}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            // Stay on dashboard
          } else if (page === 'notifications') {
            setShowPopup(false);
            onNavigate('notifications');
          } else if (page === 'idcard') {
            onNavigate('idcard');
          } else if (page === 'fees') {
            onNavigate('studentFees');
          } else if (page === 'profile') {
            onNavigate('profile');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  userInfo: {
    fontSize: 12,
    color: '#999',
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  menuContainer: {
    position: 'relative',
  },
  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#1a1a2e',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  logoutMenuItem: {
    backgroundColor: '#fff5f5',
  },
  menuItemIcon: {
    fontSize: 18,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a2e',
  },
  logoutMenuText: {
    color: '#ff3b30',
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
  classesSection: {
    marginBottom: 24,
  },
  classesScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  noClassesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  noClassesText: {
    fontSize: 13,
    color: '#999',
  },
  classCardHorizontal: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  classTimeHorizontal: {
    backgroundColor: '#e0f2fe',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  classTimeTextHorizontal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0369a1',
  },
  classNameHorizontal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  classInfoHorizontal: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  classInstructorHorizontal: {
    fontSize: 10,
    color: '#999',
  },
  joinBtnHorizontal: {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  joinBtnTextHorizontal: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    paddingLeft: 16,
  },
  seeAll: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  actionCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  assignmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    paddingLeft: 16,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentLeft: {
    flex: 1,
  },
  assignmentSubject: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  assignmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 11,
    color: '#666',
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusSubmitted: {
    backgroundColor: '#d1fae5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
    textTransform: 'capitalize',
  },
  emptyState: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    marginRight: 16,
  },
  emptyStateIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    paddingLeft: 16,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eventIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  examIcon: {
    backgroundColor: '#fef3c7',
  },
  submissionIcon: {
    backgroundColor: '#dbeafe',
  },
  seminarIcon: {
    backgroundColor: '#f3e8ff',
  },
  workshopIcon: {
    backgroundColor: '#fce7f3',
  },
  eventIconText: {
    fontSize: 20,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  eventDate: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 10,
    color: '#666',
  },
  eventType: {
    fontSize: 10,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: 'capitalize',
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    paddingLeft: 16,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  announcementNormal: {
    borderLeftColor: '#3b82f6',
  },
  announcementHigh: {
    borderLeftColor: '#ff3b30',
    backgroundColor: '#fff5f5',
  },
  announcementLeft: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  announcementDate: {
    fontSize: 11,
    color: '#999',
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  priorityDotNormal: {
    backgroundColor: '#3b82f6',
  },
  priorityDotHigh: {
    backgroundColor: '#ff3b30',
  },
});
