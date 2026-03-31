import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import { scale, fontSize, spacing, padding } from '../utils/responsive';

interface StudentFeesScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  studentFees?: any;
  setStudentFees?: (fees: any) => void;
  currentUser?: any;
}

export default function StudentFeesScreen({
  onLogout,
  onNavigate,
  studentFees,
  setStudentFees,
  currentUser,
}: StudentFeesScreenProps) {
  const [amount, setAmount] = useState('');
  const [activeNav, setActiveNav] = useState('fees');

  const due = studentFees?.total - studentFees?.paid || 0;
  const paidPercentage = studentFees?.total > 0 ? Math.round((studentFees?.paid / studentFees?.total) * 100) : 0;

  const handlePayment = () => {
    const payAmount = parseInt(amount);
    if (!payAmount || payAmount <= 0) {
      Alert.alert('Error', 'Enter valid amount');
      return;
    }

    if (payAmount > due) {
      Alert.alert('Error', `Amount exceeds due fees (₹${due})`);
      return;
    }

    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      amount: payAmount,
      title: 'Online Payment',
    };

    if (setStudentFees) {
      setStudentFees((prev: any) => ({
        ...prev,
        paid: prev.paid + payAmount,
        transactions: [newTransaction, ...prev.transactions],
      }));
    }

    setAmount('');
    Alert.alert('Success', `Payment of ₹${payAmount} successful`);
  };

  const renderTransaction = ({ item }: { item: any }) => (
    <View style={styles.txnCard}>
      <View style={styles.txnLeft}>
        <Text style={styles.txnTitle}>{item.title}</Text>
        <Text style={styles.txnDate}>{item.date}</Text>
      </View>
      <Text style={styles.txnAmount}>+ ₹{item.amount.toLocaleString('en-IN')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('studentDashboard')} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fee Management</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Fee Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Fees</Text>
              <Text style={styles.summaryValue}>₹{studentFees?.total?.toLocaleString('en-IN') || '0'}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Paid</Text>
              <Text style={[styles.summaryValue, { color: '#10b981' }]}>
                ₹{studentFees?.paid?.toLocaleString('en-IN') || '0'}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Due</Text>
              <Text style={[styles.summaryValue, { color: due > 0 ? '#ff3b30' : '#10b981' }]}>
                ₹{due.toLocaleString('en-IN')}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${paidPercentage}%`,
                    backgroundColor: paidPercentage === 100 ? '#10b981' : '#3b82f6',
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{paidPercentage}% Paid</Text>
          </View>
        </View>

        {/* Outstanding Card */}
        <View style={[styles.dueCard, due === 0 && styles.dueCardPaid]}>
          <Text style={styles.dueLabel}>Total Outstanding</Text>
          <Text
            style={[
              styles.dueAmount,
              due === 0 && styles.dueAmountPaid,
            ]}
          >
            ₹{due.toLocaleString('en-IN')}
          </Text>
          {due === 0 && <Text style={styles.paidMessage}>✓ All fees paid</Text>}
        </View>

        {/* Payment Box */}
        {due > 0 && (
          <View style={styles.payCard}>
            <Text style={styles.payLabel}>Make Payment</Text>
            <View style={styles.payRow}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
                <Text style={styles.payText}>Pay</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.payHint}>Max: ₹{due.toLocaleString('en-IN')}</Text>
          </View>
        )}

        {/* Payment History */}
        {studentFees?.transactions && studentFees.transactions.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Payment History</Text>
            <FlatList
              data={studentFees.transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        role="student"
        active={activeNav}
        unreadCount={0}
        currentUser={currentUser}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            onNavigate('studentDashboard');
          } else if (page === 'notifications') {
            onNavigate('notifications');
          } else if (page === 'idcard') {
            onNavigate('idcard');
          } else if (page === 'fees') {
            // Stay on fees
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
    paddingVertical: spacing.lg,
    paddingHorizontal: padding.lg,
    paddingBottom: scale(120),
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
    marginHorizontal: -16,
    marginTop: -16,
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
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
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    textAlign: 'right',
  },
  dueCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
  },
  dueCardPaid: {
    borderLeftColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  dueLabel: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  dueAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: '#ff3b30',
  },
  dueAmountPaid: {
    color: '#10b981',
  },
  paidMessage: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  payCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#0d9488',
  },
  payLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  payRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    fontSize: 14,
  },
  payBtn: {
    backgroundColor: '#0d9488',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  payText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  payHint: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
  },
  historySection: {
    marginBottom: 20,
  },
  historyTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  txnCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  txnLeft: {
    flex: 1,
  },
  txnTitle: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1a1a2e',
    marginBottom: 2,
  },
  txnDate: {
    fontSize: 11,
    color: '#999',
  },
  txnAmount: {
    color: '#10b981',
    fontWeight: '700',
    fontSize: 14,
  },
});
