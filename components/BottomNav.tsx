import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NavIconProps {
  icon: string;
  label: string;
  onPress: () => void;
  active: boolean;
  badge?: number;
}

function NavIcon({ icon, label, onPress, active, badge = 0 }: NavIconProps) {
  return (
    <TouchableOpacity
      style={[styles.navItem, active && styles.navItemActive]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, active ? styles.iconActive : styles.iconInactive]}>
          {icon}
        </Text>
        {badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

interface BottomNavProps {
  role?: 'student' | 'teacher' | 'admin';
  active?: string;
  unreadCount?: number;
  onNavigate: (page: string) => void;
}

export default function BottomNav({
  role = 'student',
  active = 'home',
  unreadCount = 0,
  onNavigate,
}: BottomNavProps) {
  const studentNav = [
    { icon: '🏠', label: 'Home', id: 'home', badge: 0 },
    { icon: '🔔', label: 'Notifs', id: 'notifications', badge: unreadCount },
    { icon: '🆔', label: 'ID Card', id: 'idcard', badge: 0 },
    { icon: '💳', label: 'Fees', id: 'fees', badge: 0 },
    { icon: '👤', label: 'Profile', id: 'profile', badge: 0 },
  ];

  const teacherNav = [
    { icon: '🏠', label: 'Home', id: 'home', badge: 0 },
    { icon: '📝', label: 'Assign', id: 'assignments', badge: 0 },
    { icon: '✅', label: 'Attend', id: 'attendance', badge: 0 },
    { icon: '📊', label: 'Results', id: 'results', badge: 0 },
    { icon: '👤', label: 'Profile', id: 'profile', badge: 0 },
  ];

  const adminNav = [
    { icon: '🏠', label: 'Home', id: 'home', badge: 0 },
    { icon: '👥', label: 'Users', id: 'users', badge: 0 },
    { icon: '💰', label: 'Fees', id: 'fees', badge: 0 },
    { icon: '📊', label: 'Reports', id: 'reports', badge: 0 },
    { icon: '👤', label: 'Profile', id: 'profile', badge: 0 },
  ];

  const navItems = role === 'teacher' ? teacherNav : role === 'admin' ? adminNav : studentNav;

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <NavIcon
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={active === item.id}
          badge={item.badge || 0}
          onPress={() => onNavigate(item.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1f2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingBottom: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    position: 'relative',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconActive: {
    color: '#60a5fa',
  },
  iconInactive: {
    color: '#9ca3af',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
  },
  labelActive: {
    color: '#60a5fa',
  },
  labelInactive: {
    color: '#9ca3af',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '700',
  },
});
