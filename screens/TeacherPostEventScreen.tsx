import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

interface TeacherPostEventScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onPostEvent: (event: any) => void;
  currentUser?: any;
}

export default function TeacherPostEventScreen({ onLogout, onNavigate, onPostEvent, currentUser }: TeacherPostEventScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('event');

  const eventTypes = ['event', 'exam', 'seminar', 'workshop', 'meeting'];

  const handlePostEvent = () => {
    if (!title.trim() || !description.trim() || !date.trim() || !time.trim() || !location.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      time,
      location,
      postedBy: currentUser?.name || 'Prof. Sharma',
      semester: 4,
      type: eventType,
    };

    onPostEvent(newEvent);
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setEventType('event');
    Alert.alert('Success', 'Event posted successfully');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('teacherDashboard')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post Event</Text>
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Create New Event</Text>

          {/* Event Title */}
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Mid Semester Exam"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the event details..."
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />

          {/* Date */}
          <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            placeholder="2025-06-01"
            value={date}
            onChangeText={setDate}
            placeholderTextColor="#999"
          />

          {/* Time */}
          <Text style={styles.label}>Time (HH:MM AM/PM)</Text>
          <TextInput
            style={styles.input}
            placeholder="10:00 AM"
            value={time}
            onChangeText={setTime}
            placeholderTextColor="#999"
          />

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Main Hall, Lab 1"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#999"
          />

          {/* Event Type */}
          <Text style={styles.label}>Event Type</Text>
          <View style={styles.typeRow}>
            {eventTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeBtn,
                  eventType === type && styles.typeBtnActive,
                ]}
                onPress={() => setEventType(type)}
              >
                <Text
                  style={[
                    styles.typeText,
                    eventType === type && styles.typeTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handlePostEvent}
          >
            <Text style={styles.submitBtnText}>Post Event</Text>
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Events will be visible to all students in your semester. Make sure to provide accurate details.
          </Text>
        </View>
      </ScrollView>
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
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
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
    padding: 16,
    paddingBottom: 100,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 14,
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  typeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  typeBtnActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  typeTextActive: {
    color: '#fff',
  },
  submitBtn: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#1e40af',
    fontWeight: '500',
  },
});
