import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

interface NotificationPopupProps {
  notification: any;
  onDismiss: () => void;
}

export default function NotificationPopup({ notification, onDismiss }: NotificationPopupProps) {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onDismiss());
    }, 5000);

    return () => clearTimeout(timer);
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

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.popup, { borderLeftColor: getNoticeColor(notification.type) }]}>
        <View style={[styles.iconContainer, { backgroundColor: getNoticeColor(notification.type) + '20' }]}>
          <Text style={styles.icon}>{getNoticeIcon(notification.type)}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>New Notification! 🔔</Text>
          <Text style={styles.message}>{notification.title}</Text>
          <Text style={styles.sender}>From: {notification.sentBy}</Text>
        </View>
        <TouchableOpacity onPress={onDismiss} style={styles.closeBtn}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  sender: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: '#999',
    fontWeight: '700',
  },
});
