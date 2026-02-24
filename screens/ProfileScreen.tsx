import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import BottomNav from '../components/BottomNav';

interface ProfileScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentUser?: any;
}

const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => {
  return (
    <View style={styles.infoRow}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
};

export default function ProfileScreen({
  onLogout,
  onNavigate,
  currentUser,
}: ProfileScreenProps) {
  const [activeNav, setActiveNav] = useState('profile');
  const isStudent = currentUser?.role === 'student';
  const isTeacher = currentUser?.role === 'teacher';

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change feature coming soon');
  };

  const handleNotificationSettings = () => {
    Alert.alert('Notification Settings', 'Notification settings feature coming soon');
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', onPress: () => {} },
      { text: 'Log Out', onPress: onLogout, style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.headerCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: isStudent
                  ? 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=JK'
                  : 'https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=PS',
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{currentUser?.name || 'User'}</Text>
          <Text style={styles.subtitle}>
            {isStudent
              ? `${currentUser?.department} • Semester ${currentUser?.semester}`
              : `${currentUser?.department} Department`}
          </Text>
          <View style={styles.badgeRow}>
            <View style={isStudent ? styles.badgeBlue : styles.badgePurple}>
              <Text style={isStudent ? styles.badgeTextBlue : styles.badgeTextPurple}>
                {isStudent ? 'Student' : 'Teacher'}
              </Text>
            </View>
            <View style={styles.badgeGreen}>
              <Text style={styles.badgeTextGreen}>Active</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoRow icon="📧" label="Email" value={currentUser?.email || 'email@college.edu'} />
          <InfoRow icon="🆔" label="ID" value={currentUser?.id || 'B20232637'} />
          <InfoRow icon="🏢" label="Department" value={currentUser?.department || 'IT'} />
          {isStudent && (
            <>
              <InfoRow
                icon="🎓"
                label="Semester"
                value={`Semester ${currentUser?.semester || 4}`}
              />
              <InfoRow icon="🔢" label="Roll No" value={`${currentUser?.rollNo || 37}`} />
            </>
          )}
          <InfoRow icon="📍" label="Location" value="Mumbai, India" />
        </View>

        {/* Academic Information (Student Only) */}
        {isStudent && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Academic Information</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>📊</Text>
                <Text style={styles.statValue}>8.4</Text>
                <Text style={styles.statLabel}>SGPA</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>✅</Text>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Attendance</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statIcon}>📝</Text>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>
          </View>
        )}

        {/* Teaching Information (Teacher Only) */}
        {isTeacher && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Teaching Information</Text>
            <InfoRow icon="👥" label="Total Students" value="128" />
            <InfoRow icon="📚" label="Classes" value="3" />
            <InfoRow icon="📝" label="Assignments Posted" value="5" />
            <InfoRow icon="📅" label="Experience" value="8 Years" />
          </View>
        )}

        {/* Account Settings */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <TouchableOpacity style={styles.menuBtn} onPress={handleChangePassword}>
            <Text style={styles.menuIcon}>🔒</Text>
            <Text style={styles.menuText}>Change Password</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn} onPress={handleNotificationSettings}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuText}>Notification Settings</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn}>
            <Text style={styles.menuIcon}>🌙</Text>
            <Text style={styles.menuText}>Dark Mode</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuBtn}>
            <Text style={styles.menuIcon}>ℹ️</Text>
            <Text style={styles.menuText}>About App</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        role={isStudent ? 'student' : 'teacher'}
        active={activeNav}
        unreadCount={0}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            onNavigate(isStudent ? 'studentDashboard' : 'teacherDashboard');
          } else if (page === 'notifications') {
            onNavigate('notifications');
          } else if (page === 'idcard' && isStudent) {
            onNavigate('idcard');
          } else if (page === 'fees' && isStudent) {
            onNavigate('fees');
          } else if (page === 'profile') {
            // Stay on profile
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
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 3,
    backgroundColor: '#3b82f6',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999',
    fontSize: 13,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeBlue: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeTextBlue: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '700',
  },
  badgePurple: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeTextPurple: {
    color: '#7c3aed',
    fontSize: 12,
    fontWeight: '700',
  },
  badgeGreen: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeTextGreen: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  infoContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#1a1a2e',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#999',
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 12,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuText: {
    flex: 1,
    fontWeight: '600',
    color: '#1a1a2e',
    fontSize: 14,
  },
  menuArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  logoutBtn: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  logoutIcon: {
    fontSize: 18,
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 14,
  },
});
