import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import BottomNav from '../components/BottomNav';

interface Subject {
  code: string;
  name: string;
  marks: number;
  grade: string;
  status: 'Pass' | 'Fail';
}

interface Result {
  id: number;
  studentId: string;
  semester: number;
  title: string;
  month: string;
  sgpa: string;
  status: 'Pass' | 'ATKT';
  subjects: Subject[];
}

interface StudentResultsScreenProps {
  onLogout: () => void;
  onNavigate: (page: string, data?: any) => void;
  studentResults: Result[];
  currentUser?: any;
}

export default function StudentResultsScreen({
  onLogout,
  onNavigate,
  studentResults,
  currentUser,
}: StudentResultsScreenProps) {
  const [activeNav, setActiveNav] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const currentUserData = {
    id: 'B20232637',
    name: 'Jai Kantharia',
    currentSemester: 4,
  };

  // Filter results: show all semesters before current semester
  const visibleResults = studentResults
    .filter((r) => r.studentId === currentUserData.id && r.semester < currentUserData.currentSemester)
    .sort((a, b) => b.semester - a.semester); // Sort by semester descending

  const renderResult = ({ item }: { item: Result }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onNavigate('resultDetail', item)}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.month}>{item.month}</Text>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.sgpaLabel}>SGPA</Text>
            <Text style={styles.sgpa}>{item.sgpa}</Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.badge,
          item.status === 'Pass' ? styles.passBadge : styles.failBadge,
        ]}
      >
        <Text style={styles.badgeText}>{item.status === 'Pass' ? 'PASS' : 'ATKT'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentDashboard')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.greeting}>Results</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {visibleResults.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No results published yet</Text>
          <Text style={styles.emptySubtext}>Results will appear here once published</Text>
        </View>
      ) : (
        <FlatList
          data={visibleResults}
          renderItem={renderResult}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}

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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1a1a2e',
    marginBottom: 4,
  },
  month: {
    color: '#999',
    fontSize: 12,
    marginBottom: 8,
  },
  bottomRow: {
    marginTop: 8,
  },
  sgpaLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 2,
  },
  sgpa: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
  },
  passBadge: {
    backgroundColor: '#d1fae5',
  },
  failBadge: {
    backgroundColor: '#fee2e2',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1a1a2e',
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
