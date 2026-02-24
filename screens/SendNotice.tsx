import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

interface SendNoticeProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onSendNotice: (notice: any) => void;
}

export default function SendNotice({ onLogout, onNavigate, onSendNotice }: SendNoticeProps) {
  const [noticeType, setNoticeType] = useState('assignment');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const noticeTypes = [
    { id: 'assignment', label: 'Assignment', icon: '📝' },
    { id: 'exam', label: 'Exam Notice', icon: '📋' },
    { id: 'holiday', label: 'Holiday', icon: '🎉' },
    { id: 'urgent', label: 'Urgent Notice', icon: '⚠️' },
    { id: 'general', label: 'General Notice', icon: '📢' },
  ];

  const handleSendNotice = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newNotice = {
      id: Date.now(),
      type: noticeType,
      title,
      description,
      dueDate,
      sentBy: 'Prof. Sharma',
      sentAt: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isNew: true,
    };

    onSendNotice(newNotice);
    Alert.alert('Success', 'Notice sent to all students');
    setTitle('');
    setDescription('');
    setDueDate('');
    setNoticeType('assignment');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Send Notice 📢</Text>
          <Text style={styles.userName}>Prof. Sharma</Text>
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
        {/* Notice Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notice Type</Text>
          <View style={styles.typeGrid}>
            {noticeTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeCard, noticeType === type.id && styles.typeCardActive]}
                onPress={() => setNoticeType(type.id)}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={[styles.typeLabel, noticeType === type.id && styles.typeLabelActive]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Notice Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter notice title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter detailed description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
          />
        </View>

        {/* Due Date Input */}
        {(noticeType === 'assignment' || noticeType === 'exam') && (
          <View style={styles.section}>
            <Text style={styles.inputLabel}>Due Date</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 2025-05-25"
              placeholderTextColor="#999"
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>
        )}

        {/* Send Button */}
        <TouchableOpacity style={styles.sendBtn} onPress={handleSendNotice}>
          <Text style={styles.sendBtnIcon}>📤</Text>
          <Text style={styles.sendBtnText}>Send Notice to All Students</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => onNavigate('teacherDashboard')}>
          <Text style={styles.backBtnText}>← Back to Dashboard</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  typeCardActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  typeIcon: {
    fontSize: 24,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  typeLabelActive: {
    color: '#3b82f6',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    fontSize: 14,
    color: '#1a1a2e',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  sendBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sendBtnIcon: {
    fontSize: 20,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  backBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backBtnText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
});
