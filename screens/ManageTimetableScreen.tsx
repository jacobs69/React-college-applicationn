import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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

interface ManageTimetableScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  masterTimetable: TimetableClass[];
  setMasterTimetable: (timetable: TimetableClass[]) => void;
  currentUser?: any;
}

export default function ManageTimetableScreen({
  onLogout,
  onNavigate,
  masterTimetable,
  setMasterTimetable,
  currentUser,
}: ManageTimetableScreenProps) {
  const [activeNav, setActiveNav] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [day, setDay] = useState('Monday');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');

  const currentUserData = {
    department: 'IT',
    name: 'Prof. Sharma',
  };

  const selectedCourse = 'B.Sc IT';

  // Security check
  const canEdit = currentUserData.department === 'CS' || currentUserData.department === 'IT';

  const currentCourseClasses = masterTimetable
    .filter((c) => c.course === selectedCourse)
    .sort((a, b) => {
      const dayOrder = DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
      if (dayOrder !== 0) return dayOrder;
      return a.time.localeCompare(b.time);
    });

  const handleAddClass = () => {
    if (!subject.trim() || !time.trim() || !room.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newClass: TimetableClass = {
      id: Date.now(),
      course: selectedCourse,
      day,
      subject,
      time,
      room,
      instructor: currentUserData.name,
    };

    setMasterTimetable([...masterTimetable, newClass]);
    setSubject('');
    setTime('');
    setRoom('');
    Alert.alert('Success', 'Class added successfully');
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete Class', 'Are you sure you want to delete this class?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => {
          setMasterTimetable(masterTimetable.filter((c) => c.id !== id));
          Alert.alert('Success', 'Class deleted successfully');
        },
      },
    ]);
  };

  if (!canEdit) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Manage Timetable 📅</Text>
            <Text style={styles.userName}>{currentUserData.name}</Text>
          </View>
        </View>
        <View style={styles.accessDenied}>
          <Text style={styles.accessDeniedIcon}>🔒</Text>
          <Text style={styles.accessDeniedTitle}>Access Denied</Text>
          <Text style={styles.accessDeniedText}>Only CS/IT department teachers can manage timetable</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: TimetableClass }) => (
    <View style={styles.classCard}>
      <View style={styles.classCardLeft}>
        <Text style={styles.classMeta}>
          {item.day} • {item.time}
        </Text>
        <Text style={styles.classSubject}>{item.subject}</Text>
        <Text style={styles.classRoom}>📍 {item.room}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Manage Timetable 📅</Text>
          <Text style={styles.userName}>{currentUserData.name}</Text>
          <Text style={styles.userInfo}>Course: {selectedCourse}</Text>
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
        {/* Add Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Add New Class</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Day</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={day} onValueChange={setDay} style={styles.picker}>
                {DAYS.map((d) => (
                  <Picker.Item key={d} label={d} value={d} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              placeholder="e.g., Java Programming"
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Time</Text>
            <TextInput
              placeholder="e.g., 10:00 AM"
              style={styles.input}
              value={time}
              onChangeText={setTime}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Room</Text>
            <TextInput
              placeholder="e.g., Lab 1"
              style={styles.input}
              value={room}
              onChangeText={setRoom}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={handleAddClass}>
            <Text style={styles.addBtnIcon}>➕</Text>
            <Text style={styles.addBtnText}>Add Class</Text>
          </TouchableOpacity>
        </View>

        {/* Existing Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Existing Classes</Text>
            <Text style={styles.classCountBadge}>{currentCourseClasses.length}</Text>
          </View>
          {currentCourseClasses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No classes added yet</Text>
            </View>
          ) : (
            <FlatList
              data={currentCourseClasses}
              renderItem={renderItem}
              keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
              scrollEnabled={false}
            />
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
            onNavigate('teacherDashboard');
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
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  accessDeniedIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  accessDeniedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  accessDeniedText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  pickerContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#1a1a2e',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 14,
    color: '#1a1a2e',
  },
  addBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addBtnIcon: {
    fontSize: 18,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
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
  classCountBadge: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '700',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  classCardLeft: {
    flex: 1,
  },
  classMeta: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  classRoom: {
    fontSize: 11,
    color: '#666',
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 18,
    color: '#ff3b30',
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
});
