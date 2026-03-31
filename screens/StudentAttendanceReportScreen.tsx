import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  FlatList,
} from 'react-native';

interface StudentAttendanceReportScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  studentId: string;
  studentName: string;
  attendanceRecords?: any[];
  currentUser?: any;
}

export default function StudentAttendanceReportScreen({
  onLogout,
  onNavigate,
  studentId,
  studentName,
  attendanceRecords = [],
  currentUser,
}: StudentAttendanceReportScreenProps) {
  const [shareLoading, setShareLoading] = useState(false);

  // Filter records for this student
  const studentRecords = attendanceRecords.filter((r) => r.studentId === studentId);

  // Calculate statistics
  const totalClasses = studentRecords.length;
  const presentCount = studentRecords.filter((r) => r.status === 'Present').length;
  const absentCount = studentRecords.filter((r) => r.status === 'Absent').length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  // Get attendance by subject
  const attendanceBySubject = studentRecords.reduce((acc: any, record: any) => {
    const subject = record.subject || 'Unknown';
    if (!acc[subject]) {
      acc[subject] = { present: 0, absent: 0, total: 0 };
    }
    acc[subject].total += 1;
    if (record.status === 'Present') {
      acc[subject].present += 1;
    } else {
      acc[subject].absent += 1;
    }
    return acc;
  }, {});

  const subjectStats = Object.entries(attendanceBySubject).map(([subject, stats]: any) => ({
    subject,
    ...stats,
    percentage: Math.round((stats.present / stats.total) * 100),
  }));

  const handleShare = async () => {
    try {
      setShareLoading(true);
      const reportText = `
Attendance Report - ${studentName}
Student ID: ${studentId}
Generated: ${new Date().toLocaleDateString()}

Overall Statistics:
- Total Classes: ${totalClasses}
- Present: ${presentCount}
- Absent: ${absentCount}
- Attendance: ${attendancePercentage}%

Subject-wise Breakdown:
${subjectStats.map((s) => `${s.subject}: ${s.present}/${s.total} (${s.percentage}%)`).join('\n')}

Recent Records:
${studentRecords
  .slice(-5)
  .map((r) => `${r.date} - ${r.subject}: ${r.status}`)
  .join('\n')}
      `.trim();

      await Share.share({
        message: reportText,
        title: `Attendance Report - ${studentName}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share report');
    } finally {
      setShareLoading(false);
    }
  };

  const renderSubjectStat = ({ item }: { item: any }) => (
    <View style={styles.subjectCard}>
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectName}>{item.subject}</Text>
        <Text style={styles.subjectStats}>
          {item.present}/{item.total} classes
        </Text>
      </View>
      <View style={styles.subjectPercentage}>
        <Text style={[styles.percentageText, { color: item.percentage >= 75 ? '#10b981' : '#ff3b30' }]}>
          {item.percentage}%
        </Text>
      </View>
    </View>
  );

  const renderRecentRecord = ({ item }: { item: any }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordLeft}>
        <Text style={styles.recordDate}>{item.date}</Text>
        <Text style={styles.recordSubject}>{item.subject}</Text>
      </View>
      <View
        style={[
          styles.recordStatus,
          item.status === 'Present' ? styles.statusPresent : styles.statusAbsent,
        ]}
      >
        <Text style={styles.recordStatusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('teacherAttendance')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Report</Text>
        <TouchableOpacity onPress={handleShare} disabled={shareLoading}>
          <Text style={styles.shareBtn}>📤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Student Info */}
        <View style={styles.studentCard}>
          <View>
            <Text style={styles.studentName}>{studentName}</Text>
            <Text style={styles.studentId}>{studentId}</Text>
          </View>
          <View style={styles.studentAvatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        </View>

        {/* Overall Statistics */}
        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: '#e0f2fe' }]}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statValue}>{attendancePercentage}%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#d1fae5' }]}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={styles.statValue}>{presentCount}</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fee2e2' }]}>
            <Text style={styles.statIcon}>❌</Text>
            <Text style={styles.statValue}>{absentCount}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fef3c7' }]}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statValue}>{totalClasses}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        {/* Subject-wise Breakdown */}
        {subjectStats.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subject-wise Attendance</Text>
            <FlatList
              data={subjectStats}
              renderItem={renderSubjectStat}
              keyExtractor={(item) => item.subject}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Recent Records */}
        {studentRecords.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Records</Text>
            <FlatList
              data={studentRecords.slice(-10)}
              renderItem={renderRecentRecord}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Share Button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare} disabled={shareLoading}>
          <Text style={styles.shareButtonIcon}>📤</Text>
          <Text style={styles.shareButtonText}>
            {shareLoading ? 'Sharing...' : 'Share Report'}
          </Text>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  shareBtn: {
    fontSize: 20,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  studentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 12,
    color: '#999',
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    minWidth: '48%',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  subjectCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  subjectStats: {
    fontSize: 11,
    color: '#999',
  },
  subjectPercentage: {
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '700',
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#e5e7eb',
  },
  recordLeft: {
    flex: 1,
  },
  recordDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  recordSubject: {
    fontSize: 11,
    color: '#999',
  },
  recordStatus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusPresent: {
    backgroundColor: '#d1fae5',
  },
  statusAbsent: {
    backgroundColor: '#fee2e2',
  },
  recordStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  shareButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shareButtonIcon: {
    fontSize: 18,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
