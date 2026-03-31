import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import BottomNav from '../components/BottomNav';

interface Assignment {
  id: number;
  subject: string;
  title: string;
  description: string;
  due: string;
  status: 'pending' | 'submitted';
}

interface StudentAssignmentScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  currentUser?: any;
}

export default function StudentAssignmentScreen({
  onLogout,
  onNavigate,
  assignments,
  setAssignments,
  currentUser,
}: StudentAssignmentScreenProps) {
  const [activeNav, setActiveNav] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (id: number) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, status: 'submitted' as const } : a
      )
    );
    Alert.alert('Success', 'Assignment submitted');
  };

  const renderAssignment = ({ item }: { item: Assignment }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.dueContainer}>
          <Text style={styles.dueIcon}>📅</Text>
          <Text style={styles.due}>Due: {item.due}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.statusBtn,
          item.status === 'submitted' ? styles.submittedBtn : styles.pendingBtn,
        ]}
        onPress={() => item.status === 'pending' && handleSubmit(item.id)}
        disabled={item.status === 'submitted'}
      >
        <Text style={styles.statusText}>
          {item.status === 'submitted' ? '✓ Submitted' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentDashboard')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Assignments</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {assignments.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No assignments yet</Text>
          <Text style={styles.emptySubtext}>Check back later for new assignments</Text>
        </View>
      ) : (
        <FlatList
          data={assignments}
          renderItem={renderAssignment}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav
        role="student"
        active={activeNav}
        unreadCount={assignments.filter((a) => a.status === 'pending').length}
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
            onNavigate('fees');
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
  listContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardLeft: {
    flex: 1,
  },
  subject: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dueIcon: {
    fontSize: 12,
  },
  due: {
    fontSize: 11,
    color: '#ff3b30',
    fontWeight: '600',
  },
  statusBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  pendingBtn: {
    backgroundColor: '#3b82f6',
  },
  submittedBtn: {
    backgroundColor: '#10b981',
  },
  statusText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 11,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
