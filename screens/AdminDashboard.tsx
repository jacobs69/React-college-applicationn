import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';

interface DashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onLogout, onNavigate }: DashboardProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState('home');
  const quickActions = [
    { id: 1, icon: '🎓', label: 'Exam Cell', color: '#3b82f6' },
    { id: 2, icon: '💰', label: 'Fee Management', color: '#10b981' },
    { id: 3, icon: '👥', label: 'User Management', color: '#8b5cf6' },
    { id: 4, icon: '🖼️', label: 'Gallery', color: '#f59e0b' },
    { id: 5, icon: '📈', label: 'Analytics', color: '#ec4899' },
    { id: 6, icon: '⚙️', label: 'Settings', color: '#06b6d4' },
  ];

  const systemStats = [
    { id: 1, label: 'Total Students', value: '2,450', icon: '👨‍🎓' },
    { id: 2, label: 'Total Teachers', value: '180', icon: '👨‍🏫' },
    { id: 3, label: 'Active Courses', value: '45', icon: '📚' },
    { id: 4, label: 'Pending Fees', value: '₹45L', icon: '💰' },
  ];

  const recentNotices = [
    { id: 1, title: 'Semester Exam Schedule Released', date: '2 hours ago', priority: 'high' },
    { id: 2, title: 'Fee Payment Deadline Extended', date: '1 day ago', priority: 'medium' },
    { id: 3, title: 'New Holiday Announced', date: '2 days ago', priority: 'low' },
  ];

  const systemAlerts = [
    { id: 1, alert: 'Database Backup Completed', status: 'success', time: '1 hour ago' },
    { id: 2, alert: 'High Server Load Detected', status: 'warning', time: '30 mins ago' },
    { id: 3, alert: 'New User Registration', status: 'info', time: '15 mins ago' },
  ];

  const recentLogins = [
    { id: 1, user: 'Prof. Sharma', role: 'Teacher', time: '10:30 AM', device: 'Mobile' },
    { id: 2, user: 'Jai Kantharia', role: 'Student', time: '10:15 AM', device: 'Mobile' },
    { id: 3, user: 'Admin User', role: 'Admin', time: '09:45 AM', device: 'Desktop' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Portal 🔐</Text>
          <Text style={styles.userName}>System Administrator</Text>
          <Text style={styles.userInfo}>Full System Access</Text>
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
        {/* System Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Overview</Text>
          <View style={styles.statsGrid}>
            {systemStats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management Tools</Text>
          <View style={styles.actionGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={[styles.actionCard, { borderLeftColor: action.color }]}
                onPress={() => {
                  if (action.id === 2) {
                    onNavigate('adminFees');
                  } else if (action.id === 4) {
                    onNavigate('adminGallery');
                  }
                }}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Notices */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notices</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {recentNotices.map((notice) => (
            <View key={notice.id} style={styles.noticeCard}>
              <View style={styles.noticeLeft}>
                <View
                  style={[
                    styles.priorityBadge,
                    notice.priority === 'high'
                      ? styles.priorityHigh
                      : notice.priority === 'medium'
                        ? styles.priorityMedium
                        : styles.priorityLow,
                  ]}
                >
                  <Text style={styles.priorityDot}>●</Text>
                </View>
                <View style={styles.noticeContent}>
                  <Text style={styles.noticeTitle}>{notice.title}</Text>
                  <Text style={styles.noticeDate}>{notice.date}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editBtn}>
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* System Health */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <View style={styles.healthCard}>
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>Database</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { width: '85%', backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.healthValue}>85% Healthy</Text>
            </View>
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>Server Load</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { width: '45%', backgroundColor: '#3b82f6' }]} />
              </View>
              <Text style={styles.healthValue}>45% Load</Text>
            </View>
            <View style={styles.healthItem}>
              <Text style={styles.healthLabel}>Storage</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { width: '62%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.healthValue}>62% Used</Text>
            </View>
          </View>
        </View>

        {/* System Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>System Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {systemAlerts.map((alert) => (
            <View key={alert.id} style={[styles.alertCard, alert.status === 'success' ? styles.alertSuccess : alert.status === 'warning' ? styles.alertWarning : styles.alertInfo]}>
              <View style={styles.alertLeft}>
                <Text style={styles.alertIcon}>{alert.status === 'success' ? '✅' : alert.status === 'warning' ? '⚠️' : 'ℹ️'}</Text>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.alert}</Text>
                  <Text style={styles.alertTime}>{alert.time}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Logins */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Logins</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {recentLogins.map((login) => (
            <View key={login.id} style={styles.loginCard}>
              <View style={styles.loginLeft}>
                <Text style={styles.loginUser}>{login.user}</Text>
                <Text style={styles.loginRole}>{login.role}</Text>
              </View>
              <View style={styles.loginRight}>
                <Text style={styles.loginTime}>{login.time}</Text>
                <Text style={styles.loginDevice}>{login.device}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        role="admin"
        active={activeNav}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            // Stay on dashboard
          } else if (page === 'users') {
            onNavigate('users');
          } else if (page === 'fees') {
            onNavigate('adminFees');
          } else if (page === 'reports') {
            onNavigate('reports');
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 100,
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
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statIcon: {
    fontSize: 28,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
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
  noticeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noticeLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priorityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityHigh: {
    backgroundColor: '#fee2e2',
  },
  priorityMedium: {
    backgroundColor: '#fef3c7',
  },
  priorityLow: {
    backgroundColor: '#dbeafe',
  },
  priorityDot: {
    fontSize: 16,
    color: '#1a1a2e',
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  noticeDate: {
    fontSize: 11,
    color: '#999',
  },
  editBtn: {
    backgroundColor: '#e0e7ff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  editBtnText: {
    color: '#3b82f6',
    fontSize: 11,
    fontWeight: '600',
  },
  healthCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    gap: 14,
  },
  healthItem: {
    gap: 6,
  },
  healthLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  healthBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 3,
  },
  healthValue: {
    fontSize: 11,
    color: '#666',
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  alertSuccess: {
    borderLeftColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  alertWarning: {
    borderLeftColor: '#f59e0b',
    backgroundColor: '#fffbeb',
  },
  alertInfo: {
    borderLeftColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  alertLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertIcon: {
    fontSize: 20,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 11,
    color: '#999',
  },
  loginCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginLeft: {
    flex: 1,
  },
  loginUser: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  loginRole: {
    fontSize: 11,
    color: '#999',
  },
  loginRight: {
    alignItems: 'flex-end',
  },
  loginTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 2,
  },
  loginDevice: {
    fontSize: 10,
    color: '#999',
  },
});
