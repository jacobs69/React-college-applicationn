import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BottomNav from '../components/BottomNav';

interface Assignment {
  id: number;
  subject: string;
  title: string;
  description: string;
  due: string;
  status: 'pending' | 'submitted';
}

interface TeacherAddAssignmentScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  currentUser?: any;
}

export default function TeacherAddAssignmentScreen({
  onLogout,
  onNavigate,
  assignments,
  setAssignments,
  currentUser,
}: TeacherAddAssignmentScreenProps) {
  const [activeNav, setActiveNav] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [subject, setSubject] = useState('Mathematics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState('');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  const handlePost = () => {
    if (!title.trim() || !description.trim() || !due.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newAssignment: Assignment = {
      id: Date.now(),
      subject,
      title,
      description,
      due,
      status: 'pending',
    };

    setAssignments([newAssignment, ...assignments]);
    setTitle('');
    setDescription('');
    setDue('');
    Alert.alert('Success', 'Assignment posted successfully');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('teacherDashboard')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Post Assignment</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Subject Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Subject</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={subject} onValueChange={setSubject} style={styles.picker}>
                {subjects.map((subj) => (
                  <Picker.Item key={subj} label={subj} value={subj} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Title Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Assignment Title</Text>
            <TextInput
              placeholder="e.g., Calculus Exercise 4.2"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
            />
          </View>

          {/* Description Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Describe the assignment details..."
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={5}
              placeholderTextColor="#999"
            />
          </View>

          {/* Due Date Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Due Date</Text>
            <TextInput
              placeholder="e.g., 2025-05-21"
              style={styles.input}
              value={due}
              onChangeText={setDue}
              placeholderTextColor="#999"
            />
          </View>

          {/* Post Button */}
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnIcon}>📤</Text>
            <Text style={styles.postBtnText}>Post Assignment</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  postBtn: {
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
  postBtnIcon: {
    fontSize: 18,
  },
  postBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
