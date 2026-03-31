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

interface StudentOverallReportScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  studentId: string;
  studentName: string;
  attendanceRecords?: any[];
  assignments?: any[];
  studentResults?: any[];
  currentUser?: any;
}

export default function StudentOverallReportScreen({
  onLogout,
  onNavigate,
  studentId,
  studentName,
  attendanceRecords = [],
  assignments = [],
  studentResults = [],
  currentUser,
}: StudentOverallReportScreenProps) {
  const [shareLoading, setShareLoading] = useState(false);

  // Filter records for this student
  const studentAttendance = attendanceRecords.filter((r) => r.studentId === studentId);
  const studentAssignments = assignments.filter((a) => a.semester === 4); // Assuming semester 4
  const studentResultsData = studentResults.filter((r) => r.studentId === studentId);

  // Calculate attendance statistics
  const totalClasses = studentAttendance.length;
  const presentCount = studentAttendance.filter((r) => r.status === 'Present').length;
  const absentCount = studentAttendance.filter((r) => r.status === 'Absent').length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  // Calculate assignment statistics
  const totalAssignments = studentAssignments.length;
  const submittedAssignments = studentAssignments.filter((a) => a.status === 'submitted').length;
  const pendingAssignments = studentAssignments.filter((a) => a.status === 'pending').length;

  // Get latest result
  const latestResult = studentResultsData.length > 0 ? studentResultsData[0] : null;

  // Get attendance by subject
  const attendanceBySubject = studentAttendance.reduce((acc: any, record: any) => {
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
STUDENT OVERALL REPORT
${studentName}
Student ID: ${studentId}
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════

ATTENDANCE SUMMARY
- Total Classes: ${totalClasses}
- Present: ${presentCount}
- Absent: ${absentCount}
- Attendance: ${attendancePercentage}%

SUBJECT-WISE ATTENDANCE
${subjectStats.map((s) => `${s.subject}: ${s.present}/${s.total} (${s.percentage}%)`).join('\n')}

═══════════════════════════════════════

ASSIGNMENT SUMMARY
- Total Assignments: ${totalAssignments}
- Submitted: ${submittedAssignments}
- Pending: ${pendingAssignments}

RECENT ASSIGNMENTS
${studentAssignments
  .slice(0, 5)
  .map((a) => `${a.title} (${a.subject}) - Due: ${a.due}`)
  .join('\n')}

═══════════════════════════════════════

ACADEMIC PERFORMANCE
${
  latestResult
    ? `Latest Result: Semester ${latestResult.semester}
SGPA: ${latestResult.sgpa}
Status: ${latestResult.status}

Subject Scores:
${latestResult.subjects.map((s: any) => `${s.name}: ${s.marks} (${s.grade})`).join('\n')}`
    : 'No results available'
}

═══════════════════════════════════════
      `.trim();

      await Share.share({
        message: reportText,
        title: `Overall Report - ${studentName}`,
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
        <Text style={styles.subjectStats}>{item.present}/{item.total} classes</Text>
      </View>
      <View style={styles.subjectPercentage}>
        <Text style={[styles.percentageText, { color: item.percentage >= 75 ? '#10b981' : '#ff3b30' }]}>
          {item.percentage}%
        </Text>
      </View>
    </View>
  );

  const renderAssignment = ({ item }: { item: any }) => (
    <View style={styles.assignmentCard}>
      <View style={styles.assignmentLeft}>
        <Text style={styles.assignmentTitle}>{item.title}</Text>
        <Text style={styles.assignmentSubject}>{item.subject}</Text>
        <Text style={styles.assignmentDue}>Due: {item.due}</Text>
      </View>
      <View
        style={[
          styles.assignmentStatus,
          item.status === 'submitted' ? styles.statusSubmitted : styles.statusPending,
        ]}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('classDetail')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Overall Report</Text>
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
          <View style={[styles.statBox, { backgroundColor: '#fef3c7' }]}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statValue}>{totalAssignments}</Text>
            <Text style={styles.statLabel}>Assignments</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: '#fee2e2' }]}>
            <Text style={styles.statIcon}>❌</Text>
            <Text style={styles.statValue}>{absentCount}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
        </View>

        {/* Attendance Section */}
        {subjectStats.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📚 Subject-wise Attendance</Text>
            <FlatList
              data={subjectStats}
              renderItem={renderSubjectStat}
              keyExtractor={(item) => item.subject}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Assignment Section */}
        {studentAssignments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Recent Assignments</Text>
            <FlatList
              data={studentAssignments.slice(0, 5)}
              renderItem={renderAssignment}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Results Section */}
        {latestResult && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎓 Latest Results</Text>
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View>
                  <Text style={styles.resultTitle}>{latestResult.title}</Text>
                  <Text style={styles.resultSemester}>Semester {latestResult.semester}</Text>
                </View>
                <View style={styles.sgpaBox}>
                  <Text style={styles.sgpaValue}>{latestResult.sgpa}</Text>
                  <Text style={styles.sgpaLabel}>SGPA</Text>
                </View>
              </View>
              <View style={styles.resultDivider} />
              <View style={styles.subjectsContainer}>
                {latestResult.subjects.map((subject: any, index: number) => (
                  <View key={index} style={styles.resultSubject}>
                    <View style={styles.resultSubjectLeft}>
                      <Text style={styles.resultSubjectName}>{subject.name}</Text>
                      <Text style={styles.resultSubjectCode}>{subject.code}</Text>
                    </View>
                    <View style={styles.resultSubjectRight}>
                      <Text style={styles.resultMarks}>{subject.marks}</Text>
                      <Text style={[styles.resultGrade, { color: subject.grade === 'O' ? '#10b981' : '#3b82f6' }]}>
                        {subject.grade}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Share Button */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare} disabled={shareLoading}>
          <Text style={styles.shareButtonIcon}>📤</Text>
          <Text style={styles.shareButtonText}>
            {shareLoading ? 'Sharing...' : 'Share Full Report'}
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
  assignmentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
  },
  assignmentLeft: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  assignmentSubject: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  assignmentDue: {
    fontSize: 10,
    color: '#ff3b30',
  },
  assignmentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusSubmitted: {
    backgroundColor: '#d1fae5',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ec4899',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  resultSemester: {
    fontSize: 11,
    color: '#999',
  },
  sgpaBox: {
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sgpaValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  sgpaLabel: {
    fontSize: 10,
    color: '#999',
  },
  resultDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 12,
  },
  subjectsContainer: {
    gap: 10,
  },
  resultSubject: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultSubjectLeft: {
    flex: 1,
  },
  resultSubjectName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  resultSubjectCode: {
    fontSize: 10,
    color: '#999',
  },
  resultSubjectRight: {
    alignItems: 'flex-end',
  },
  resultMarks: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  resultGrade: {
    fontSize: 12,
    fontWeight: '700',
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
