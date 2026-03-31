import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import { scale, fontSize, spacing, padding, borderRadius, iconSize } from '../utils/responsive';

interface ClassPerformanceReportScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  classData?: any;
  attendanceRecords?: any[];
  assignments?: any[];
  studentResults?: any[];
  currentUser?: any;
}

export default function ClassPerformanceReportScreen({
  onLogout,
  onNavigate,
  classData,
  attendanceRecords = [],
  assignments = [],
  currentUser,
  studentResults = [],
}: ClassPerformanceReportScreenProps) {
  const [activeNav, setActiveNav] = useState('home');

  const className = classData?.name || 'Class Performance';
  const classSection = classData?.section || 'B.Sc IT - Sem 4';
  const totalStudents = classData?.students || 45;

  // Calculate class statistics
  const avgAttendance = attendanceRecords.length > 0
    ? Math.round(
        (attendanceRecords.filter((r) => r.status === 'Present').length / attendanceRecords.length) * 100
      )
    : 85;

  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter((a) => a.status === 'submitted').length;

  const avgGPA = studentResults.length > 0
    ? (
        studentResults.reduce((sum, r) => sum + parseFloat(r.sgpa || 0), 0) / studentResults.length
      ).toFixed(2)
    : '8.4';

  const performanceMetrics = [
    { label: 'Avg Attendance', value: `${avgAttendance}%`, icon: '✅', color: '#10b981' },
    { label: 'Assignments', value: `${submittedAssignments}/${totalAssignments}`, icon: '📝', color: '#3b82f6' },
    { label: 'Avg GPA', value: avgGPA, icon: '📊', color: '#8b5cf6' },
    { label: 'Total Students', value: totalStudents, icon: '👥', color: '#f59e0b' },
  ];

  const subjectPerformance = [
    { subject: 'Java Programming', attendance: 88, avgScore: 82, trend: 'up' },
    { subject: 'Database Management', attendance: 85, avgScore: 78, trend: 'stable' },
    { subject: 'Web Development', attendance: 92, avgScore: 85, trend: 'up' },
    { subject: 'Data Structures', attendance: 80, avgScore: 75, trend: 'down' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('teacherDashboard')}>
            <Text style={styles.backBtn}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{className}</Text>
            <Text style={styles.subtitle}>{classSection}</Text>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsContainer}>
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <Text style={[styles.metricIcon, { color: metric.color }]}>{metric.icon}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        {/* Subject Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Performance</Text>
          {subjectPerformance.map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectName}>{subject.subject}</Text>
                <Text style={styles.trendIcon}>
                  {subject.trend === 'up' ? '📈' : subject.trend === 'down' ? '📉' : '➡️'}
                </Text>
              </View>
              <View style={styles.subjectStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Attendance</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${subject.attendance}%`, backgroundColor: '#10b981' },
                      ]}
                    />
                  </View>
                  <Text style={styles.statValue}>{subject.attendance}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Avg Score</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${subject.avgScore}%`, backgroundColor: '#3b82f6' },
                      ]}
                    />
                  </View>
                  <Text style={styles.statValue}>{subject.avgScore}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityIcon}>📝</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Assignment Posted</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityIcon}>✅</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Attendance Marked</Text>
              <Text style={styles.activityTime}>1 hour ago</Text>
            </View>
          </View>
          <View style={styles.activityCard}>
            <Text style={styles.activityIcon}>📊</Text>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Results Published</Text>
              <Text style={styles.activityTime}>Yesterday</Text>
            </View>
          </View>
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
  scrollContent: {
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    paddingBottom: scale(100),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(24),
    gap: spacing.md,
  },
  backBtn: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#3b82f6',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: scale(4),
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: '#666',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: scale(24),
  },
  metricCard: {
    flex: 1,
    minWidth: scale(150),
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    padding: padding.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  metricIcon: {
    fontSize: iconSize.lg,
    marginBottom: scale(8),
  },
  metricValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: scale(4),
  },
  metricLabel: {
    fontSize: fontSize.xs,
    color: '#999',
    textAlign: 'center',
  },
  section: {
    marginBottom: scale(24),
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: scale(12),
  },
  subjectCard: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    padding: padding.md,
    marginBottom: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(12),
  },
  subjectName: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  trendIcon: {
    fontSize: iconSize.md,
  },
  subjectStats: {
    gap: spacing.md,
  },
  statItem: {
    gap: scale(6),
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: '#666',
    fontWeight: '600',
  },
  progressBar: {
    height: scale(6),
    backgroundColor: '#e0e0e0',
    borderRadius: scale(3),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: scale(3),
  },
  statValue: {
    fontSize: fontSize.xs,
    color: '#1a1a2e',
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: borderRadius.md,
    padding: padding.md,
    marginBottom: scale(12),
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIcon: {
    fontSize: iconSize.lg,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: scale(4),
  },
  activityTime: {
    fontSize: fontSize.xs,
    color: '#999',
  },
});
