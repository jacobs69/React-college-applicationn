import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import BottomNav from '../components/BottomNav';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface TimetableClass {
  id: number;
  course: string;
  day: string;
  subject: string;
  time: string;
  room: string;
  instructor?: string;
}

interface StudentTimetableScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  masterTimetable: TimetableClass[];
  currentUser?: any;
}

export default function StudentTimetableScreen({
  onLogout,
  onNavigate,
  masterTimetable,
  currentUser,
}: StudentTimetableScreenProps) {
  const [activeNav, setActiveNav] = useState('home');

  const currentUserData = {
    course: 'B.Sc IT',
    name: 'Jai Kantharia',
  };

  const myClasses = masterTimetable.filter((c) => c.course === currentUserData.course);

  const renderClass = ({ item }: { item: TimetableClass }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.instructor}>{item.instructor || 'Prof. Sharma'}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeIcon}>🕐</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.roomContainer}>
          <Text style={styles.roomIcon}>📍</Text>
          <Text style={styles.room}>{item.room}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentDashboard')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Timetable</Text>
          <Text style={styles.monthYear}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {DAYS.map((day) => {
          const dayClasses = myClasses
            .filter((c) => c.day === day)
            .sort((a, b) => a.time.localeCompare(b.time));

          if (dayClasses.length === 0) return null;

          return (
            <View key={day} style={styles.daySection}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{day}</Text>
                <Text style={styles.classCount}>{dayClasses.length} classes</Text>
              </View>
              <FlatList
                data={dayClasses}
                renderItem={renderClass}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                scrollEnabled={false}
              />
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        role="student"
        active={activeNav}
        unreadCount={0}
        currentUser={currentUser}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            onNavigate('studentDashboard');
          } else if (page === 'notifications') {
            onNavigate('notifications');
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    fontSize: 24,
    color: '#3b82f6',
    fontWeight: '700',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  daySection: {
    marginBottom: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  classCount: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    marginBottom: 10,
  },
  subject: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1a1a2e',
    marginBottom: 2,
  },
  instructor: {
    fontSize: 11,
    color: '#999',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeIcon: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomIcon: {
    fontSize: 14,
  },
  room: {
    fontSize: 12,
    color: '#666',
  },
});
