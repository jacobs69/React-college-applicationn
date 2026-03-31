import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { scale, fontSize, spacing, padding, borderRadius } from '../utils/responsive';
import BottomNav from '../components/BottomNav';

interface AdminFeesScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  studentFees?: any[];
  setStudentFees?: (fees: any[]) => void;
}

export default function AdminFeesScreen({
  onLogout,
  onNavigate,
  studentFees = [],
  setStudentFees,
}: AdminFeesScreenProps) {
  const [search, setSearch] = useState('');

  // Filter students based on search
  const filteredStudents = studentFees.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate stats
  const totalStudents = studentFees.length;
  const paidCount = studentFees.filter((s) => s.status === 'paid').length;
  const pendingCount = studentFees.filter((s) => s.status === 'pending').length;
  const overdueCount = studentFees.filter((s) => s.status === 'overdue').length;

  const sendReminder = (name: string, id: string) => {
    Alert.alert('Reminder Sent', `Reminder sent to ${name} (${id})`);
  };

  const markAsPaid = (id: string) => {
    if (setStudentFees) {
      setStudentFees(
        studentFees.map((s) =>
          s.id === id ? { ...s, status: 'paid' } : s
        )
      );
      Alert.alert('Success', 'Student marked as paid');
    }
  };

  const markAsOverdue = (id: string) => {
    if (setStudentFees) {
      setStudentFees(
        studentFees.map((s) =>
          s.id === id ? { ...s, status: 'overdue' } : s
        )
      );
    }
  };

  const renderStudent = ({ item }: { item: any }) => {
    const statusColor =
      item.status === 'paid'
        ? '#10b981'
        : item.status === 'pending'
        ? '#f59e0b'
        : '#ff3b30';

    const statusBgColor =
      item.status === 'paid'
        ? '#dcfce7'
        : item.status === 'pending'
        ? '#fef3c7'
        : '#fee2e2';

    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.id}>{item.id}</Text>
          <Text style={styles.course}>{item.course}</Text>
          <Text style={styles.amount}>₹{item.amount.toLocaleString('en-IN')}</Text>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
            <Text style={[styles.status, { color: statusColor }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>

          {item.status !== 'paid' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.reminderBtn}
                onPress={() => sendReminder(item.name, item.id)}
              >
                <Text style={styles.reminderText}>Remind</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paidBtn}
                onPress={() => markAsPaid(item.id)}
              >
                <Text style={styles.paidText}>Paid</Text>
              </TouchableOpacity>
              {item.status === 'pending' && (
                <TouchableOpacity
                  style={styles.overdueBtn}
                  onPress={() => markAsOverdue(item.id)}
                >
                  <Text style={styles.overdueText}>Overdue</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('adminDashboard')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fee Management</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={styles.statValue}>{totalStudents}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#dcfce7' }]}>
            <Text style={styles.statIcon}>✓</Text>
            <Text style={styles.statValue}>{paidCount}</Text>
            <Text style={styles.statLabel}>Paid</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
            <Text style={styles.statIcon}>⏳</Text>
            <Text style={styles.statValue}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#fee2e2' }]}>
            <Text style={styles.statIcon}>⚠️</Text>
            <Text style={styles.statValue}>{overdueCount}</Text>
            <Text style={styles.statLabel}>Overdue</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder="Search by name or ID..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#999"
          />
        </View>

        {/* Students List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Students ({filteredStudents.length})
          </Text>
          <FlatList
            data={filteredStudents}
            renderItem={renderStudent}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={{ height: 40 }} />
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
    color: '#8b5cf6',
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
  statsContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: '48%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 10,
    color: '#999',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardLeft: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1a1a2e',
    marginBottom: 2,
  },
  id: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  course: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
  },
  amount: {
    fontWeight: '700',
    fontSize: 13,
    color: '#3b82f6',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  status: {
    fontSize: 11,
    fontWeight: '700',
  },
  actionButtons: {
    gap: 6,
  },
  reminderBtn: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  reminderText: {
    color: '#dc2626',
    fontSize: 10,
    fontWeight: '700',
  },
  paidBtn: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paidText: {
    color: '#16a34a',
    fontSize: 10,
    fontWeight: '700',
  },
  overdueBtn: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  overdueText: {
    color: '#b45309',
    fontSize: 10,
    fontWeight: '700',
  },
});
