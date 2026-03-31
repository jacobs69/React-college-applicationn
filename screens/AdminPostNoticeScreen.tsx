import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

interface AdminPostNoticeScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onSendNotice?: (notice: any) => void;
}

export default function AdminPostNoticeScreen({ onLogout, onNavigate, onSendNotice }: AdminPostNoticeScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [noticeType, setNoticeType] = useState('general');
  const [priority, setPriority] = useState('normal');

  const noticeTypes = [
    { id: 'general', label: 'General', icon: '📢', color: '#3b82f6' },
    { id: 'urgent', label: 'Urgent', icon: '🚨', color: '#ef4444' },
    { id: 'holiday', label: 'Holiday', icon: '🎉', color: '#f59e0b' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧', color: '#8b5cf6' },
    { id: 'academic', label: 'Academic', icon: '📚', color: '#10b981' },
  ];

  const priorityLevels = [
    { id: 'low', label: 'Low', color: '#3b82f6' },
    { id: 'normal', label: 'Normal', color: '#f59e0b' },
    { id: 'high', label: 'High', color: '#ef4444' },
  ];

  const handlePostNotice = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }

    const notice = {
      id: Date.now(),
      type: 'notice',
      title: title,
      description: description,
      noticeType: noticeType,
      priority: priority,
      sentBy: 'Admin',
      sentAt: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isNew: true,
    };

    if (onSendNotice) {
      onSendNotice(notice);
    }

    Alert.alert('Success', 'Notice sent to all students');
    setTitle('');
    setDescription('');
    setNoticeType('general');
    setPriority('normal');
  };

  const selectedType = noticeTypes.find((t) => t.id === noticeType);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('adminDashboard')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Notice</Text>
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
        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Notice Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter notice title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter notice description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Notice Type Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Notice Type</Text>
          <View style={styles.typeGrid}>
            {noticeTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  noticeType === type.id && styles.typeCardActive,
                  { borderLeftColor: type.color },
                ]}
                onPress={() => setNoticeType(type.id)}
              >
                <Text style={styles.typeIcon}>{type.icon}</Text>
                <Text style={styles.typeLabel}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Priority Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Priority Level</Text>
          <View style={styles.priorityGrid}>
            {priorityLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.priorityCard,
                  priority === level.id && styles.priorityCardActive,
                  { backgroundColor: priority === level.id ? level.color : '#f0f0f0' },
                ]}
                onPress={() => setPriority(level.id)}
              >
                <Text style={[styles.priorityText, priority === level.id && styles.priorityTextActive]}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <Text style={styles.label}>Preview</Text>
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewIcon}>{selectedType?.icon}</Text>
              <View style={styles.previewTitleSection}>
                <Text style={styles.previewTitle}>{title || 'Notice Title'}</Text>
                <Text style={styles.previewMeta}>
                  {selectedType?.label} • {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </Text>
              </View>
            </View>
            <Text style={styles.previewDescription}>
              {description || 'Notice description will appear here...'}
            </Text>
            <Text style={styles.previewTime}>Posted by Admin • Just now</Text>
          </View>
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendBtn} onPress={handlePostNotice}>
          <Text style={styles.sendBtnText}>Send Notice to All Students</Text>
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
    paddingVertical: 16,
    paddingTop: 24,
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
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    gap: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  typeCardActive: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  typeIcon: {
    fontSize: 24,
  },
  typeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  priorityGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityCard: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  priorityCardActive: {
    borderColor: '#1a1a2e',
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  priorityTextActive: {
    color: '#fff',
  },
  previewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  previewIcon: {
    fontSize: 28,
  },
  previewTitleSection: {
    flex: 1,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  previewMeta: {
    fontSize: 11,
    color: '#999',
  },
  previewDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  previewTime: {
    fontSize: 10,
    color: '#999',
  },
  sendBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
