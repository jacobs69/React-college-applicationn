import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

interface TeacherAttendanceScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  teacherClasses?: any[];
  attendanceRecords?: any[];
  setAttendanceRecords?: (records: any[]) => void;
}

export default function TeacherAttendanceScreen({
  onLogout,
  onNavigate,
  teacherClasses = [],
  attendanceRecords = [],
  setAttendanceRecords,
}: TeacherAttendanceScreenProps) {
  const [selectedClass, setSelectedClass] = useState<any>(teacherClasses[0] || null);
  const [statusMap, setStatusMap] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  // Initialize status map for selected class
  React.useEffect(() => {
    if (selectedClass) {
      const newStatusMap: any = {};
      for (let i = 1; i <= selectedClass.students; i++) {
        newStatusMap[i] = 'present';
      }
      setStatusMap(newStatusMap);
      setSubmitted(false);
    }
  }, [selectedClass]);

  const today = new Date().toISOString().split('T')[0];

  const toggleStatus = (rollNo: number) => {
    setStatusMap((prev: any) => ({
      ...prev,
      [rollNo]: prev[rollNo] === 'present' ? 'absent' : 'present',
    }));
  };

  const handleSave = () => {
    if (!selectedClass) {
      Alert.alert('Error', 'Please select a class');
      return;
    }

    const newRecords = [];
    for (let i = 1; i <= selectedClass.students; i++) {
      const rollNo = String(i).padStart(2, '0');
      const studentId = `B2023${rollNo}`;
      
      newRecords.push({
        id: Date.now() + i,
        studentId: studentId,
        rollNo: i,
        date: today,
        status: statusMap[i] === 'present' ? 'Present' : 'Absent',
        subject: selectedClass.name,
        class: selectedClass.section,
      });
    }

    if (setAttendanceRecords) {
      setAttendanceRecords([...attendanceRecords, ...newRecords]);
    }

    setSubmitted(true);
    Alert.alert('Success', `Attendance marked for ${selectedClass.students} students`);
  };

  const presentCount = Object.values(statusMap).filter((s: any) => s === 'present').length;
  const absentCount = Object.values(statusMap).filter((s: any) => s === 'absent').length;

  const renderStudent = ({ item }: { item: number }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentInfo}>
        <Text style={styles.rollNo}>Roll No: {item}</Text>
        <Text style={styles.studentId}>ID: B2023{String(item).padStart(2, '0')}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.statusBtn,
          statusMap[item] === 'present' ? styles.presentBtn : styles.absentBtn,
        ]}
        onPress={() => toggleStatus(item)}
      >
        <Text style={styles.statusText}>
          {statusMap[item] === 'present' ? 'P' : 'A'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('teacherDashboard')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mark Attendance</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Class Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Class</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classScroll}>
            {teacherClasses.map((cls) => (
              <TouchableOpacity
                key={cls.id}
                style={[
                  styles.classBtn,
                  selectedClass?.id === cls.id && styles.classBtnActive,
                ]}
                onPress={() => setSelectedClass(cls)}
              >
                <Text
                  style={[
                    styles.classBtnText,
                    selectedClass?.id === cls.id && styles.classBtnTextActive,
                  ]}
                >
                  {cls.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedClass && (
          <>
            {/* Class Info */}
            <View style={styles.classInfoCard}>
              <View>
                <Text style={styles.classInfoTitle}>{selectedClass.name}</Text>
                <Text style={styles.classInfoSubtitle}>{selectedClass.section}</Text>
              </View>
              <View style={styles.classStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{selectedClass.students}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: '#10b981' }]}>{presentCount}</Text>
                  <Text style={styles.statLabel}>Present</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: '#ff3b30' }]}>{absentCount}</Text>
                  <Text style={styles.statLabel}>Absent</Text>
                </View>
              </View>
            </View>

            {/* Date Info */}
            <View style={styles.dateCard}>
              <Text style={styles.dateLabel}>Date</Text>
              <Text style={styles.dateValue}>{new Date(today).toDateString()}</Text>
            </View>

            {/* Students List */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Students ({selectedClass.students})</Text>
              <FlatList
                data={Array.from({ length: selectedClass.students }, (_, i) => i + 1)}
                renderItem={renderStudent}
                keyExtractor={(item) => item.toString()}
                scrollEnabled={false}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveBtn, submitted && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={submitted}
            >
              <Text style={styles.saveBtnText}>
                {submitted ? '✓ Attendance Saved' : 'Save Attendance'}
              </Text>
            </TouchableOpacity>
          </>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  classScroll: {
    marginBottom: 12,
  },
  classBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
  },
  classBtnActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  classBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  classBtnTextActive: {
    color: '#fff',
  },
  classInfoCard: {
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
  classInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  classInfoSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  classStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  dateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  dateLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  studentCard: {
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
  studentInfo: {
    flex: 1,
  },
  rollNo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 11,
    color: '#999',
  },
  statusBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presentBtn: {
    backgroundColor: '#d1fae5',
  },
  absentBtn: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#1a1a2e',
  },
  saveBtn: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
