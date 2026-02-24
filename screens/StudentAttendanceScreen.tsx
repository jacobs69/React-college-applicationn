import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface StudentAttendanceScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  attendanceRecords?: any[];
  currentUser?: any;
}

export default function StudentAttendanceScreen({
  onLogout,
  onNavigate,
  attendanceRecords = [],
  currentUser,
}: StudentAttendanceScreenProps) {
  // Filter records for current student
  const myRecords = useMemo(() => {
    return attendanceRecords
      .filter((r) => r.studentId === currentUser?.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [attendanceRecords, currentUser?.id]);

  // Calculate overall percentage
  const overallStats = useMemo(() => {
    const total = myRecords.length;
    const present = myRecords.filter((r) => r.status === 'Present').length;
    const absent = total - present;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, percentage };
  }, [myRecords]);

  // Calculate weekly stats
  const weeklyStats = useMemo(() => {
    const weeks: any = {};
    const today = new Date();

    myRecords.forEach((record) => {
      const recordDate = new Date(record.date);
      const dayDiff = Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
      
      let weekLabel = '';
      if (dayDiff <= 7) {
        weekLabel = 'This Week';
      } else if (dayDiff <= 14) {
        weekLabel = 'Last Week';
      } else if (dayDiff <= 21) {
        weekLabel = '2 Weeks Ago';
      } else if (dayDiff <= 28) {
        weekLabel = '3 Weeks Ago';
      } else {
        return;
      }

      if (!weeks[weekLabel]) {
        weeks[weekLabel] = { total: 0, present: 0, absent: 0 };
      }
      weeks[weekLabel].total++;
      if (record.status === 'Present') {
        weeks[weekLabel].present++;
      } else {
        weeks[weekLabel].absent++;
      }
    });

    return weeks;
  }, [myRecords]);

  // Calculate monthly stats
  const monthlyStats = useMemo(() => {
    const months: any = {};

    myRecords.forEach((record) => {
      const date = new Date(record.date);
      const monthKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });

      if (!months[monthKey]) {
        months[monthKey] = { total: 0, present: 0, absent: 0 };
      }
      months[monthKey].total++;
      if (record.status === 'Present') {
        months[monthKey].present++;
      } else {
        months[monthKey].absent++;
      }
    });

    return months;
  }, [myRecords]);

  const renderDailyRecord = ({ item }: { item: any }) => (
    <View style={styles.dailyCard}>
      <View style={styles.dailyLeft}>
        <Text style={styles.dailySubject}>{item.subject}</Text>
        <Text style={styles.dailyDate}>{new Date(item.date).toDateString()}</Text>
      </View>
      <View
        style={[
          styles.dailyBadge,
          item.status === 'Present' ? styles.presentBadge : styles.absentBadge,
        ]}
      >
        <Text style={styles.dailyBadgeText}>{item.status}</Text>
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
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Overall Stats Card */}
        <View style={styles.overallCard}>
          <View style={styles.overallContent}>
            <Text style={styles.overallPercentage}>{overallStats.percentage}%</Text>
            <Text style={styles.overallLabel}>Overall Attendance</Text>
          </View>
          <View style={styles.overallStats}>
            <View style={styles.overallStatItem}>
              <Text style={styles.overallStatValue}>{overallStats.total}</Text>
              <Text style={styles.overallStatLabel}>Total</Text>
            </View>
            <View style={styles.overallStatItem}>
              <Text style={[styles.overallStatValue, { color: '#10b981' }]}>
                {overallStats.present}
              </Text>
              <Text style={styles.overallStatLabel}>Present</Text>
            </View>
            <View style={styles.overallStatItem}>
              <Text style={[styles.overallStatValue, { color: '#ff3b30' }]}>
                {overallStats.absent}
              </Text>
              <Text style={styles.overallStatLabel}>Absent</Text>
            </View>
          </View>
        </View>

        {/* Status Indicator */}
        <View
          style={[
            styles.statusIndicator,
            overallStats.percentage >= 75
              ? styles.statusGood
              : overallStats.percentage >= 60
              ? styles.statusWarning
              : styles.statusCritical,
          ]}
        >
          <Text style={styles.statusIcon}>
            {overallStats.percentage >= 75 ? '✓' : overallStats.percentage >= 60 ? '⚠' : '✕'}
          </Text>
          <View style={styles.statusText}>
            <Text style={styles.statusTitle}>
              {overallStats.percentage >= 75
                ? 'Good Attendance'
                : overallStats.percentage >= 60
                ? 'Warning'
                : 'Critical'}
            </Text>
            <Text style={styles.statusSubtitle}>
              {overallStats.percentage >= 75
                ? 'Keep it up!'
                : overallStats.percentage >= 60
                ? 'Improve your attendance'
                : 'Urgent action needed'}
            </Text>
          </View>
        </View>

        {/* Weekly Summary */}
        {Object.keys(weeklyStats).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Summary</Text>
            {Object.entries(weeklyStats).map(([week, stats]: [string, any]) => {
              const weekPercentage = Math.round((stats.present / stats.total) * 100);
              return (
                <View key={week} style={styles.weekCard}>
                  <View style={styles.weekLeft}>
                    <Text style={styles.weekLabel}>{week}</Text>
                    <Text style={styles.weekStats}>
                      {stats.present}/{stats.total} Present
                    </Text>
                  </View>
                  <View style={styles.weekRight}>
                    <Text
                      style={[
                        styles.weekPercentage,
                        weekPercentage >= 75
                          ? { color: '#10b981' }
                          : weekPercentage >= 60
                          ? { color: '#f59e0b' }
                          : { color: '#ff3b30' },
                      ]}
                    >
                      {weekPercentage}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Monthly Summary */}
        {Object.keys(monthlyStats).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Summary</Text>
            <View style={styles.monthGrid}>
              {Object.entries(monthlyStats).map(([month, stats]: [string, any]) => {
                const monthPercentage = Math.round((stats.present / stats.total) * 100);
                return (
                  <View key={month} style={styles.monthCard}>
                    <Text style={styles.monthName}>{month}</Text>
                    <Text
                      style={[
                        styles.monthPercentage,
                        monthPercentage >= 75
                          ? { color: '#10b981' }
                          : monthPercentage >= 60
                          ? { color: '#f59e0b' }
                          : { color: '#ff3b30' },
                      ]}
                    >
                      {monthPercentage}%
                    </Text>
                    <Text style={styles.monthStats}>
                      {stats.present}/{stats.total}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Daily Logs */}
        {myRecords.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Logs ({myRecords.length})</Text>
            <FlatList
              data={myRecords}
              renderItem={renderDailyRecord}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Empty State */}
        {myRecords.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No attendance records yet</Text>
            <Text style={styles.emptySubtext}>Attendance will appear here once marked</Text>
          </View>
        )}
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
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  overallCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  overallContent: {
    alignItems: 'center',
    marginBottom: 16,
  },
  overallPercentage: {
    fontSize: 48,
    fontWeight: '700',
    color: '#3b82f6',
  },
  overallLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  overallStatItem: {
    alignItems: 'center',
  },
  overallStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  overallStatLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  statusIndicator: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusGood: {
    backgroundColor: '#d1fae5',
  },
  statusWarning: {
    backgroundColor: '#fef3c7',
  },
  statusCritical: {
    backgroundColor: '#fee2e2',
  },
  statusIcon: {
    fontSize: 24,
  },
  statusText: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statusSubtitle: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
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
  weekCard: {
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
  weekLeft: {
    flex: 1,
  },
  weekLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  weekStats: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  weekRight: {
    alignItems: 'flex-end',
  },
  weekPercentage: {
    fontSize: 16,
    fontWeight: '700',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  monthCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#e5e7eb',
  },
  monthName: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 6,
  },
  monthPercentage: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  monthStats: {
    fontSize: 10,
    color: '#999',
  },
  dailyCard: {
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
  dailyLeft: {
    flex: 1,
  },
  dailySubject: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  dailyDate: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  dailyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  presentBadge: {
    backgroundColor: '#d1fae5',
  },
  absentBadge: {
    backgroundColor: '#fee2e2',
  },
  dailyBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a2e',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#999',
  },
});
