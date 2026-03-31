import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import { scale, fontSize, spacing, padding, borderRadius, iconSize } from '../utils/responsive';

interface ClassDetailScreenProps {
  onLogout: () => void;
  onNavigate: (page: string, data?: any) => void;
  classData?: any;
  students?: any[];
  attendanceRecords?: any[];
  setAttendanceRecords?: (records: any[]) => void;
  currentUser?: any;
}

export default function ClassDetailScreen({
  onLogout,
  onNavigate,
  classData,
  students = [],
  attendanceRecords = [],
  setAttendanceRecords,
  currentUser,
}: ClassDetailScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [statusMap, setStatusMap] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  // Initialize status map for attendance
  React.useEffect(() => {
    if (classData) {
      const newStatusMap: any = {};
      for (let i = 1; i <= classData.students; i++) {
        newStatusMap[i] = 'present';
      }
      setStatusMap(newStatusMap);
      setSubmitted(false);
    }
  }, [classData]);

  if (!classData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('teacherDashboard')}>
            <Text style={styles.backBtn}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Class Details</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No class selected</Text>
        </View>
      </View>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const presentCount = Object.values(statusMap).filter((s: any) => s === 'present').length;
  const absentCount = Object.values(statusMap).filter((s: any) => s === 'absent').length;

  // Get class attendance percentage
  const classAttendanceRecords = attendanceRecords.filter(
    (r) => r.subject === classData.name && r.class === classData.section
  );
  const avgAttendance = classAttendanceRecords.length > 0
    ? Math.round(
        (classAttendanceRecords.filter((r) => r.status === 'Present').length /
          classAttendanceRecords.length) *
          100
      )
    : 0;

  const toggleStatus = (rollNo: number) => {
    setStatusMap((prev: any) => ({
      ...prev,
      [rollNo]: prev[rollNo] === 'present' ? 'absent' : 'present',
    }));
  };

  const handleSaveAttendance = () => {
    const newRecords = [];
    for (let i = 1; i <= classData.students; i++) {
      const rollNo = String(i).padStart(2, '0');
      const studentId = `B2023${rollNo}`;

      newRecords.push({
        id: Date.now() + i,
        studentId: studentId,
        rollNo: i,
        date: today,
        status: statusMap[i] === 'present' ? 'Present' : 'Absent',
        subject: classData.name,
        class: classData.section,
      });
    }

    if (setAttendanceRecords) {
      setAttendanceRecords([...attendanceRecords, ...newRecords]);
    }

    setSubmitted(true);
    setShowAttendanceModal(false);
    Alert.alert('Success', `Attendance marked for ${classData.students} students`);
  };

  const renderStudent = ({ item }: { item: number }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>Student {item}</Text>
        <Text style={styles.studentId}>Roll No: {item} | ID: B2023{String(item).padStart(2, '0')}</Text>
      </View>
      <View style={styles.studentActions}>
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => {
            const studentId = `B2023${String(item).padStart(2, '0')}`;
            const studentName = `Student ${item}`;
            onNavigate('studentOverallReport', { studentId, studentName });
          }}
        >
          <Text style={styles.actionIcon}>📊</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOverviewTab = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      {/* Class Header Card */}
      <View style={styles.classHeaderCard}>
        <View>
          <Text style={styles.className}>{classData.name}</Text>
          <Text style={styles.classSection}>{classData.section}</Text>
          <Text style={styles.classTime}>⏰ {classData.time}</Text>
        </View>
        <View style={styles.classStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{classData.students}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: '#e0f2fe' }]}>
          <Text style={styles.statIcon}>👥</Text>
          <Text style={styles.statValue}>{classData.students}</Text>
          <Text style={styles.statLabel}>Total Students</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#d1fae5' }]}>
          <Text style={styles.statIcon}>✅</Text>
          <Text style={styles.statValue}>{avgAttendance}%</Text>
          <Text style={styles.statLabel}>Avg Attendance</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
          <Text style={styles.statIcon}>📝</Text>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Assignments</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => {
            setShowAttendanceModal(true);
          }}
        >
          <Text style={styles.actionCardIcon}>✅</Text>
          <View style={styles.actionCardContent}>
            <Text style={styles.actionCardTitle}>Mark Attendance</Text>
            <Text style={styles.actionCardDesc}>Record attendance for today</Text>
          </View>
          <Text style={styles.actionCardArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionCardIcon}>📊</Text>
          <View style={styles.actionCardContent}>
            <Text style={styles.actionCardTitle}>View Performance</Text>
            <Text style={styles.actionCardDesc}>Class analytics & reports</Text>
          </View>
          <Text style={styles.actionCardArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionCardIcon}>📝</Text>
          <View style={styles.actionCardContent}>
            <Text style={styles.actionCardTitle}>Post Assignment</Text>
            <Text style={styles.actionCardDesc}>Create new assignment</Text>
          </View>
          <Text style={styles.actionCardArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionCardIcon}>📢</Text>
          <View style={styles.actionCardContent}>
            <Text style={styles.actionCardTitle}>Send Announcement</Text>
            <Text style={styles.actionCardDesc}>Notify class members</Text>
          </View>
          <Text style={styles.actionCardArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Class Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Class Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Instructor</Text>
            <Text style={styles.infoValue}>{classData.instructor || 'Prof. Sharma'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>{classData.department || 'IT'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Semester</Text>
            <Text style={styles.infoValue}>Sem {classData.semester || 4}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Schedule</Text>
            <Text style={styles.infoValue}>{classData.time}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderStudentsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Students ({classData.students})</Text>
        <FlatList
          data={Array.from({ length: classData.students }, (_, i) => i + 1)}
          renderItem={renderStudent}
          keyExtractor={(item) => item.toString()}
          scrollEnabled={false}
        />
      </View>
    </View>
  );

  const renderAttendanceTab = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance Records</Text>
        {classAttendanceRecords.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📋</Text>
            <Text style={styles.emptyStateText}>No attendance records yet</Text>
          </View>
        ) : (
          classAttendanceRecords.slice(-5).map((record) => (
            <View key={record.id} style={styles.attendanceCard}>
              <View style={styles.attendanceLeft}>
                <Text style={styles.attendanceDate}>{record.date}</Text>
                <Text style={styles.attendanceCount}>
                  {classAttendanceRecords.filter((r) => r.date === record.date && r.status === 'Present').length} Present
                </Text>
              </View>
              <View
                style={[
                  styles.attendanceStatus,
                  record.status === 'Present' ? styles.statusPresent : styles.statusAbsent,
                ]}
              >
                <Text style={styles.statusText}>{record.status}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('teacherDashboard')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Class Details</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'students' && styles.tabActive]}
          onPress={() => setActiveTab('students')}
        >
          <Text style={[styles.tabText, activeTab === 'students' && styles.tabTextActive]}>
            Students
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'attendance' && styles.tabActive]}
          onPress={() => setActiveTab('attendance')}
        >
          <Text style={[styles.tabText, activeTab === 'attendance' && styles.tabTextActive]}>
            Attendance
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'students' && renderStudentsTab()}
      {activeTab === 'attendance' && renderAttendanceTab()}

      {/* Attendance Modal */}
      <Modal visible={showAttendanceModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mark Attendance</Text>
              <TouchableOpacity onPress={() => setShowAttendanceModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
              {/* Stats */}
              <View style={styles.modalStats}>
                <View style={styles.modalStatItem}>
                  <Text style={styles.modalStatValue}>{presentCount}</Text>
                  <Text style={styles.modalStatLabel}>Present</Text>
                </View>
                <View style={styles.modalStatItem}>
                  <Text style={styles.modalStatValue}>{absentCount}</Text>
                  <Text style={styles.modalStatLabel}>Absent</Text>
                </View>
              </View>

              {/* Students List */}
              <FlatList
                data={Array.from({ length: classData.students }, (_, i) => i + 1)}
                renderItem={({ item }) => (
                  <View style={styles.attendanceStudentCard}>
                    <View style={styles.attendanceStudentInfo}>
                      <Text style={styles.attendanceStudentName}>Roll No: {item}</Text>
                      <Text style={styles.attendanceStudentId}>ID: B2023{String(item).padStart(2, '0')}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.attendanceStatusBtn,
                        statusMap[item] === 'present'
                          ? styles.attendanceStatusBtnPresent
                          : styles.attendanceStatusBtnAbsent,
                      ]}
                      onPress={() => toggleStatus(item)}
                    >
                      <Text style={styles.attendanceStatusBtnText}>
                        {statusMap[item] === 'present' ? 'P' : 'A'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.toString()}
                scrollEnabled={false}
              />
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowAttendanceModal(false)}
              >
                <Text style={styles.modalCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalSaveBtn, submitted && styles.modalSaveBtnDisabled]}
                onPress={handleSaveAttendance}
                disabled={submitted}
              >
                <Text style={styles.modalSaveBtnText}>
                  {submitted ? '✓ Saved' : 'Save Attendance'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 16,
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
  tabsContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
  },
  tabTextActive: {
    color: '#3b82f6',
  },
  tabContent: {
    paddingVertical: spacing.lg,
    paddingHorizontal: padding.lg,
    paddingBottom: scale(120),
  },
  classHeaderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  className: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  classSection: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  classTime: {
    fontSize: 12,
    color: '#999',
  },
  classStats: {
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  actionCardIcon: {
    fontSize: 24,
  },
  actionIcon: {
    fontSize: iconSize.md,
  },
  actionCardContent: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  actionCardDesc: {
    fontSize: 11,
    color: '#999',
  },
  actionCardArrow: {
    fontSize: 16,
    color: '#3b82f6',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 11,
    color: '#999',
  },
  studentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceLeft: {
    flex: 1,
  },
  attendanceDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  attendanceCount: {
    fontSize: 11,
    color: '#999',
  },
  attendanceStatus: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusPresent: {
    backgroundColor: '#d1fae5',
  },
  statusAbsent: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  emptyState: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  modalClose: {
    fontSize: 24,
    color: '#999',
  },
  modalScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalStats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  modalStatItem: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  modalStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
  },
  modalStatLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  attendanceStudentCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceStudentInfo: {
    flex: 1,
  },
  attendanceStudentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  attendanceStudentId: {
    fontSize: 11,
    color: '#999',
  },
  attendanceStatusBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceStatusBtnPresent: {
    backgroundColor: '#d1fae5',
  },
  attendanceStatusBtnAbsent: {
    backgroundColor: '#fee2e2',
  },
  attendanceStatusBtnText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1a1a2e',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  modalCancelBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  modalCancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  modalSaveBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#10b981',
  },
  modalSaveBtnDisabled: {
    backgroundColor: '#9ca3af',
  },
  modalSaveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
