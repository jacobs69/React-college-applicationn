import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert, Image } from 'react-native';

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
  resultImage?: string;
}

interface ResultDetailScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  result: Result | null;
  currentUser?: any;
}

export default function ResultDetailScreen({
  onLogout,
  onNavigate,
  result,
  currentUser,
}: ResultDetailScreenProps) {
  if (!result) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => onNavigate('studentResults')} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Result Details</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No result selected</Text>
        </View>
      </View>
    );
  }

  const failedSubjects = result.subjects.filter((s) => s.status === 'Fail');

  const handleDownload = () => {
    Alert.alert('Success', 'Marksheet download started');
  };

  const renderSubject = ({ item }: { item: Subject }) => (
    <View style={styles.row}>
      <View style={styles.subjectInfo}>
        <Text style={styles.subName}>{item.name}</Text>
        <Text style={styles.subCode}>{item.code}</Text>
      </View>
      <Text style={[styles.marks, item.status === 'Fail' && styles.failMarks]}>
        {item.marks}
      </Text>
      <Text style={styles.grade}>{item.grade}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentResults')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marksheet</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.title}>{result.title}</Text>
          <Text style={styles.month}>Held in {result.month}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>SGPA</Text>
              <Text style={styles.statValue}>{result.sgpa}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Result</Text>
              <Text
                style={[
                  styles.statValue,
                  {
                    color: result.status === 'Pass' ? '#10b981' : '#ff3b30',
                  },
                ]}
              >
                {result.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Result Image Section */}
        {result.resultImage && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Result Sheet</Text>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: result.resultImage }}
                style={styles.resultImage}
              />
              <TouchableOpacity
                style={styles.downloadImageBtn}
                onPress={() => Alert.alert('Download', 'Result image download started')}
              >
                <Text style={styles.downloadImageIcon}>📥</Text>
                <Text style={styles.downloadImageText}>Download Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Subjects Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Wise Marks</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Subject</Text>
            <Text style={[styles.tableHeaderText, { width: 60 }]}>Marks</Text>
            <Text style={[styles.tableHeaderText, { width: 50 }]}>Grade</Text>
          </View>
          <FlatList
            data={result.subjects}
            renderItem={renderSubject}
            keyExtractor={(item) => item.code}
            scrollEnabled={false}
          />
        </View>

        {/* ATKT Warning */}
        {failedSubjects.length > 0 && (
          <View style={styles.atktBox}>
            <Text style={styles.atktIcon}>⚠️</Text>
            <Text style={styles.atktTitle}>ATKT Application Required</Text>
            <Text style={styles.atktText}>
              You have {failedSubjects.length} uncleared subject(s). Please apply for ATKT examination.
            </Text>
            <View style={styles.failedSubjects}>
              {failedSubjects.map((s) => (
                <Text key={s.code} style={styles.failedSubjectText}>
                  • {s.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
          <Text style={styles.downloadIcon}>📥</Text>
          <Text style={styles.downloadText}>Download Marksheet</Text>
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
  headerCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  month: {
    color: '#999',
    fontSize: 12,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  statBox: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3b82f6',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#e5e7eb',
  },
  subjectInfo: {
    flex: 1,
  },
  subName: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1a1a2e',
    marginBottom: 2,
  },
  subCode: {
    fontSize: 10,
    color: '#999',
  },
  marks: {
    width: 60,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 13,
    color: '#3b82f6',
  },
  failMarks: {
    color: '#ff3b30',
  },
  grade: {
    width: 50,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 13,
    color: '#1a1a2e',
  },
  atktBox: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff3b30',
  },
  atktIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  atktTitle: {
    fontWeight: '700',
    color: '#991b1b',
    marginBottom: 4,
  },
  atktText: {
    fontSize: 12,
    color: '#7f1d1d',
    marginBottom: 8,
  },
  failedSubjects: {
    marginTop: 8,
  },
  failedSubjectText: {
    fontSize: 11,
    color: '#7f1d1d',
    marginBottom: 4,
  },
  downloadBtn: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  downloadIcon: {
    fontSize: 18,
  },
  downloadText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  resultImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#f0f0f0',
  },
  downloadImageBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  downloadImageIcon: {
    fontSize: 18,
  },
  downloadImageText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
