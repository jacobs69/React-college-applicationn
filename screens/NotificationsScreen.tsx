import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import BottomNav from '../components/BottomNav';

interface Notification {
  id: number;
  type: string;
  title: string;
  description: string;
  sentBy: string;
  sentAt: string;
  date: string;
  isNew: boolean;
  dueDate?: string;
}

interface NotificationsScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  notifications: Notification[];
  onMarkAsRead: () => void;
  currentUser?: any;
}

export default function NotificationsScreen({ onLogout, onNavigate, notifications, onMarkAsRead, currentUser }: NotificationsScreenProps) {
  const [activeNav, setActiveNav] = useState('notifications');
  const [menuOpen, setMenuOpen] = useState(false);

  // Mark all notifications as read when screen loads
  React.useEffect(() => {
    onMarkAsRead();
  }, []);

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return '📝';
      case 'exam':
        return '📋';
      case 'holiday':
        return '🎉';
      case 'urgent':
        return '⚠️';
      case 'general':
        return '📢';
      default:
        return '📬';
    }
  };

  const getNoticeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return '#8b5cf6';
      case 'exam':
        return '#ec4899';
      case 'holiday':
        return '#10b981';
      case 'urgent':
        return '#ff3b30';
      case 'general':
        return '#3b82f6';
      default:
        return '#666';
    }
  };

  const sortedNotifications = [...notifications].sort((a, b) => b.id - a.id);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Notifications 🔔</Text>
          <Text style={styles.userName}>Jai Kantharia</Text>
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
        {sortedNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No notifications yet</Text>
            <Text style={styles.emptySubtext}>Check back later for updates from your teachers</Text>
          </View>
        ) : (
          <View>
            {sortedNotifications.map((notification) => (
              <View key={notification.id} style={styles.notificationCard}>
                {notification.isNew && <View style={styles.newBadge} />}
                <View style={[styles.noticeIconContainer, { backgroundColor: getNoticeColor(notification.type) + '20' }]}>
                  <Text style={styles.noticeIcon}>{getNoticeIcon(notification.type)}</Text>
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {notification.isNew && <View style={styles.newDot} />}
                  </View>
                  <Text style={styles.notificationDescription}>{notification.description}</Text>
                  <View style={styles.notificationMeta}>
                    <Text style={styles.sentBy}>From: {notification.sentBy}</Text>
                    <Text style={styles.sentTime}>{notification.sentAt}</Text>
                  </View>
                  {notification.dueDate && (
                    <View style={styles.dueDateContainer}>
                      <Text style={styles.dueDateLabel}>Due: {notification.dueDate}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        role="student"
        active={activeNav}
        unreadCount={sortedNotifications.filter((n) => n.isNew).length}
        currentUser={currentUser}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            onNavigate('studentDashboard');
          } else if (page === 'idcard') {
            onNavigate('idcard');
          } else if (page === 'fees') {
            onNavigate('fees');
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
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    position: 'relative',
  },
  newBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff3b30',
  },
  noticeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeIcon: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
  },
  newDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
  },
  notificationDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  notificationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sentBy: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  sentTime: {
    fontSize: 11,
    color: '#999',
  },
  dueDateContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  dueDateLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400e',
  },
});
