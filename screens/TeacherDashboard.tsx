import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BottomNav from '../components/BottomNav';
import { scale, fontSize, spacing, padding, borderRadius, iconSize } from '../utils/responsive';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (page: string, data?: any) => void;
  currentUser?: any;
  assignments?: any[];
  teacherClasses?: any[];
  events?: any[];
  attendanceRecords?: any[];
}

export default function TeacherDashboard({ onLogout, onNavigate, currentUser, assignments = [], teacherClasses = [], events = [], attendanceRecords = [] }: DashboardProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState('home');

  // Calculate dynamic stats - filter by current teacher
  const totalAssignments = assignments.filter((a) => a.postedBy === currentUser?.name).length;
  const totalStudents = teacherClasses.reduce((sum, cls) => sum + cls.students, 0);
  const totalClasses = teacherClasses.length;

  // Get upcoming events posted by this teacher (max 3)
  const upcomingEvents = (() => {
    return events
      .filter((e) => e.postedBy === currentUser?.name)
      .sort((a, b) => new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime())
      .slice(0, 3);
  })();

  const quickActions = [
    { id: 1, icon: '📝', label: 'Post Assignment', color: '#8b5cf6' },
    { id: 2, icon: '📅', label: 'Manage Timetable', color: '#3b82f6' },
    { id: 3, icon: '✅', label: 'Mark Attendance', color: '#10b981' },
    { id: 4, icon: '📊', label: 'Upload Results', color: '#ec4899' },
    { id: 5, icon: '📢', label: 'Send Notice', color: '#f59e0b' },
    { id: 6, icon: '🎉', label: 'Post Event', color: '#06b6d4' },
  ];

  const recentActivities = (() => {
    const activities: any[] = [];

    // Add posted assignments
    assignments
      .filter((a) => a.postedBy === currentUser?.name)
      .forEach((assignment) => {
        activities.push({
          id: `assignment-${assignment.id}`,
          action: 'Assignment Posted',
          subject: assignment.subject,
          time: 'Recently',
          icon: '📝',
          type: 'assignment',
          data: assignment,
        });
      });

    // Add posted events
    events
      .filter((e) => e.postedBy === currentUser?.name)
      .forEach((event) => {
        activities.push({
          id: `event-${event.id}`,
          action: 'Event Posted',
          subject: event.title,
          time: 'Recently',
          icon: '🎉',
          type: 'event',
          data: event,
        });
      });

    // Add attendance marked
    const teacherAttendance = attendanceRecords.filter(
      (r) => r.subject && teacherClasses.some((c) => c.name === r.subject)
    );
    if (teacherAttendance.length > 0) {
      const latestAttendance = teacherAttendance[teacherAttendance.length - 1];
      activities.push({
        id: `attendance-${latestAttendance.id}`,
        action: 'Attendance Marked',
        subject: latestAttendance.subject,
        time: 'Recently',
        icon: '✅',
        type: 'attendance',
        data: latestAttendance,
      });
    }

    // Sort by most recent (newest first) and limit to 5
    return activities.slice(0, 5);
  })();

  const pendingTasks = [
    { id: 1, task: 'Grade 25 Assignments', subject: 'Java Programming', priority: 'high' },
    { id: 2, task: 'Review Lab Reports', subject: 'Data Structures', priority: 'medium' },
    { id: 3, task: 'Prepare Exam Paper', subject: 'Web Development', priority: 'high' },
  ];

  const studentPerformance = [
    { id: 1, name: 'Average Score', value: '78%', trend: 'up' },
    { id: 2, name: 'Class Attendance', value: '82%', trend: 'stable' },
    { id: 3, name: 'Assignment Submission', value: '91%', trend: 'up' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back! 👋</Text>
          <Text style={styles.userName}>{currentUser?.name || 'Prof. Sharma'}</Text>
          <Text style={styles.userInfo}>{currentUser?.department || 'Computer Science'} Department</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.profileBtn}>
            <Image
              source={currentUser?.id === 'B20232637' ? require('../assets/images/2.jpg') : require('../assets/images/pro.png')}
              style={styles.profileImage}
            />
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
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#e0f2fe' }]}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={styles.statValue}>{totalStudents}</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statValue}>{totalAssignments}</Text>
            <Text style={styles.statLabel}>Assignments</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statValue}>{totalClasses}</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.actionCard, { borderLeftColor: action.color }]}
                onPress={() => {
                  if (action.id === 1) {
                    onNavigate('teacherAddAssignment');
                  } else if (action.id === 2) {
                    onNavigate('manageTimetable');
                  } else if (action.id === 3) {
                    onNavigate('teacherAttendance');
                  } else if (action.id === 4) {
                    onNavigate('teacherPostResults');
                  } else if (action.id === 5) {
                    onNavigate('sendNotice');
                  } else if (action.id === 6) {
                    onNavigate('teacherPostEvent');
                  }
                }}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* My Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Classes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {teacherClasses.map((cls) => (
            <View key={cls.id} style={styles.classCard}>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{cls.name}</Text>
                <Text style={styles.classSection}>{cls.section}</Text>
                <Text style={styles.classDetails}>👥 {cls.students} students • {cls.time}</Text>
              </View>
              <TouchableOpacity
                style={styles.manageBtn}
                onPress={() => onNavigate('classDetail', cls)}
              >
                <Text style={styles.manageBtnText}>Manage</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {recentActivities.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📋</Text>
              <Text style={styles.emptyStateText}>No activities yet</Text>
            </View>
          ) : (
            recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activitySubject}>{activity.subject}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))
          )}
        </View>

        {/* Pending Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {pendingTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskLeft}>
                <Text style={styles.taskName}>{task.task}</Text>
                <Text style={styles.taskSubject}>{task.subject}</Text>
              </View>
              <View style={[styles.priorityBadge, task.priority === 'high' ? styles.priorityHigh : styles.priorityMedium]}>
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Student Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Class Performance</Text>
          {studentPerformance.map((perf) => (
            <View key={perf.id} style={styles.performanceCard}>
              <View style={styles.performanceLeft}>
                <Text style={styles.performanceName}>{perf.name}</Text>
              </View>
              <View style={styles.performanceRight}>
                <Text style={styles.performanceValue}>{perf.value}</Text>
                <Text style={styles.performanceTrend}>{perf.trend === 'up' ? '📈' : perf.trend === 'down' ? '📉' : '➡️'}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* My Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Events</Text>
            <TouchableOpacity onPress={() => onNavigate('teacherPostEvent')}>
              <Text style={styles.seeAll}>Add Event →</Text>
            </TouchableOpacity>
          </View>
          {upcomingEvents.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🎉</Text>
              <Text style={styles.emptyStateText}>No events posted yet</Text>
            </View>
          ) : (
            upcomingEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={[styles.eventIcon, event.type === 'exam' ? styles.examIcon : event.type === 'seminar' ? styles.seminarIcon : event.type === 'workshop' ? styles.workshopIcon : styles.eventIcon]}>
                  <Text style={styles.eventIconText}>{event.type === 'exam' ? '📝' : event.type === 'seminar' ? '🎤' : event.type === 'workshop' ? '🛠️' : '📅'}</Text>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date} • {event.time}</Text>
                  <Text style={styles.eventLocation}>📍 {event.location}</Text>
                </View>
                <Text style={styles.eventType}>{event.type}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        role="teacher"
        active={activeNav}
        currentUser={currentUser}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            // Stay on dashboard
          } else if (page === 'assignments') {
            onNavigate('teacherAddAssignment');
          } else if (page === 'attendance') {
            onNavigate('teacherAttendance');
          } else if (page === 'results') {
            onNavigate('teacherPostResults');
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
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    paddingTop: padding.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  greeting: {
    fontSize: fontSize.sm,
    color: '#666',
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: fontSize['2xl'],
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
    overflow: 'hidden',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    resizeMode: 'cover',
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
    paddingHorizontal: padding.lg,
    paddingVertical: spacing.lg,
    paddingBottom: scale(120),
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  seeAll: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  actionCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#fff',
    borderRadius: borderRadius.lg,
    padding: padding.md,
    alignItems: 'center',
    gap: spacing.sm,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIcon: {
    fontSize: iconSize.lg,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  classSection: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  classDetails: {
    fontSize: 11,
    color: '#999',
  },
  manageBtn: {
    backgroundColor: '#8b5cf6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  manageBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  activitySubject: {
    fontSize: 12,
    color: '#666',
  },
  activityTime: {
    fontSize: 11,
    color: '#999',
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskLeft: {
    flex: 1,
  },
  taskName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  taskSubject: {
    fontSize: 11,
    color: '#999',
  },
  priorityBadge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priorityHigh: {
    backgroundColor: '#fee2e2',
  },
  priorityMedium: {
    backgroundColor: '#fef3c7',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1a1a2e',
    textTransform: 'capitalize',
  },
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  performanceLeft: {
    flex: 1,
  },
  performanceName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  performanceRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  performanceValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3b82f6',
  },
  performanceTrend: {
    fontSize: 16,
  },
  emptyState: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
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
});
