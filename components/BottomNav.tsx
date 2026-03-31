import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { scale, fontSize, spacing, padding, iconSize, bottomNavHeight } from '../utils/responsive';
import { getTheme, componentStyles } from '../utils/theme';

interface NavIconProps {
  icon: string;
  label: string;
  onPress: () => void;
  active: boolean;
  badge?: number;
  themeColor: string;
  isPng?: boolean;
}

function NavIcon({ icon, label, onPress, active, badge = 0, themeColor, isPng = false }: NavIconProps) {
  return (
    <TouchableOpacity
      style={[
        styles.navItem,
        active && {
          backgroundColor: `${themeColor}15`,
          borderRadius: scale(12),
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {isPng ? (
          <Image
            source={icon as any}
            style={[
              styles.pngIcon,
              active ? { tintColor: themeColor } : { tintColor: '#9ca3af' }
            ]}
          />
        ) : (
          <Text style={[
            styles.icon,
            active ? { color: themeColor } : styles.iconInactive
          ]}>
            {icon}
          </Text>
        )}
        {badge > 0 && (
          <View style={[styles.badge, { backgroundColor: themeColor }]}>
            <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
          </View>
        )}
      </View>
      <Text style={[
        styles.label,
        active ? { color: themeColor, fontWeight: '700' } : styles.labelInactive
      ]}>
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
  currentUser?: any;
}

export default function BottomNav({
  role = 'student',
  active = 'home',
  unreadCount = 0,
  onNavigate,
  currentUser,
}: BottomNavProps) {
  const theme = getTheme(role);
  const studentNav = [
    { icon: require('../assets/images/home.png'), label: 'Home', id: 'home', badge: 0, isPng: true },
    { icon: require('../assets/images/noti.png'), label: 'Notifs', id: 'notifications', badge: unreadCount, isPng: true },
    { icon: require('../assets/images/id 12.png'), label: 'ID Card', id: 'idcard', badge: 0, isPng: true },
    { icon: currentUser?.id === 'B20232637' ? require('../assets/images/2.jpg') : require('../assets/images/pro.png'), label: 'Profile', id: 'profile', badge: 0, isPng: true },
  ];

  const teacherNav = [
    { icon: require('../assets/images/home.png'), label: 'Home', id: 'home', badge: 0, isPng: true },
    { icon: require('../assets/images/assign.png'), label: 'Assign', id: 'assignments', badge: 0, isPng: true },
    { icon: '✅', label: 'Attend', id: 'attendance', badge: 0 },
    { icon: require('../assets/images/result.png'), label: 'Results', id: 'results', badge: 0, isPng: true },
    { icon: currentUser?.id === 'B20232637' ? require('../assets/images/2.jpg') : require('../assets/images/pro.png'), label: 'Profile', id: 'profile', badge: 0, isPng: true },
  ];

  const adminNav = [
    { icon: require('../assets/images/home.png'), label: 'Home', id: 'home', badge: 0, isPng: true },
    { icon: '👥', label: 'Users', id: 'users', badge: 0 },
    { icon: '💰', label: 'Fees', id: 'fees', badge: 0 },
    { icon: '📊', label: 'Reports', id: 'reports', badge: 0 },
    { icon: currentUser?.id === 'B20232637' ? require('../assets/images/2.jpg') : require('../assets/images/pro.png'), label: 'Profile', id: 'profile', badge: 0, isPng: true },
  ];

  const navItems = role === 'teacher' ? teacherNav : role === 'admin' ? adminNav : studentNav;

  // Light blue background for nav bar
  const navBackgroundColor = role === 'student' ? '#EFF6FF' : role === 'teacher' ? '#F3F0FF' : '#FEF2F2';
  const navBorderColor = role === 'student' ? '#BFDBFE' : role === 'teacher' ? '#E9D5FF' : '#FECACA';

  return (
    <View style={[styles.container, { backgroundColor: navBackgroundColor, borderTopColor: navBorderColor }]}>
      {navItems.map((item) => (
        <NavIcon
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={active === item.id}
          badge={item.badge || 0}
          themeColor={theme.primary}
          isPng={item.isPng || false}
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
    borderTopWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    paddingBottom: scale(24),
    height: bottomNavHeight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: scale(12),
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    width: scale(32),
    height: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: iconSize.md,
  },
  pngIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  iconInactive: {
    color: '#9ca3af',
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: '#6B7280',
  },
  labelInactive: {
    color: '#6B7280',
  },
  badge: {
    position: 'absolute',
    top: scale(-4),
    right: scale(-4),
    borderRadius: scale(8),
    minWidth: scale(18),
    height: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
});
