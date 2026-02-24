import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Image,
} from 'react-native';

interface TeacherPostResultsScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onPostResult: (result: any) => void;
}

export default function TeacherPostResultsScreen({
  onLogout,
  onNavigate,
  onPostResult,
}: TeacherPostResultsScreenProps) {
  const [semester, setSemester] = useState('4');
  const [examType, setExamType] = useState('Semester');
  const [month, setMonth] = useState('');
  const [sgpa, setSgpa] = useState('');
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [marks, setMarks] = useState('');
  const [grade, setGrade] = useState('O');
  const [resultImage, setResultImage] = useState<string | null>(null);

  const gradeOptions = ['O', 'A+', 'A', 'B+', 'B', 'C', 'F'];

  const handlePickImage = () => {
    // Mock image picker - in real app, use expo-image-picker
    // For now, we'll use a placeholder image URI
    const mockImageUri = 'https://via.placeholder.com/400x600?text=Result+Sheet';
    setResultImage(mockImageUri);
    Alert.alert('Success', 'Image selected (mock)');
  };

  const handleRemoveImage = () => {
    setResultImage(null);
  };

  const addSubject = () => {
    if (!subjectName || !subjectCode || !marks) {
      Alert.alert('Error', 'Please fill all subject fields');
      return;
    }

    const marksNum = parseInt(marks);
    if (marksNum < 0 || marksNum > 100) {
      Alert.alert('Error', 'Marks must be between 0 and 100');
      return;
    }

    const newSubject = {
      id: Date.now(),
      code: subjectCode,
      name: subjectName,
      marks: marksNum,
      grade: grade,
      status: marksNum >= 40 ? 'Pass' : 'Fail',
    };

    setSubjects([...subjects, newSubject]);
    setSubjectName('');
    setSubjectCode('');
    setMarks('');
    setGrade('O');
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handlePostResult = () => {
    if (!semester || !month || !sgpa || subjects.length === 0) {
      Alert.alert('Error', 'Please fill all fields and add at least one subject');
      return;
    }

    const sgpaNum = parseFloat(sgpa);
    if (sgpaNum < 0 || sgpaNum > 10) {
      Alert.alert('Error', 'SGPA must be between 0 and 10');
      return;
    }

    const result = {
      id: Date.now(),
      studentId: 'B20232637', // This would be dynamic in real app
      semester: parseInt(semester),
      title: `${examType} ${semester} Examination`,
      month: month,
      sgpa: sgpa,
      status: subjects.some((s) => s.status === 'Fail') ? 'ATKT' : 'Pass',
      subjects: subjects,
      resultImage: resultImage, // Add image to result
    };

    onPostResult(result);
    Alert.alert('Success', 'Result posted successfully');
    
    // Reset form
    setSemester('4');
    setExamType('Semester');
    setMonth('');
    setSgpa('');
    setSubjects([]);
    setSubjectName('');
    setSubjectCode('');
    setMarks('');
    setGrade('O');
    setResultImage(null);

    onNavigate('teacherDashboard');
  };

  const renderSubject = ({ item }: { item: any }) => (
    <View style={styles.subjectItem}>
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectCode}>{item.code}</Text>
        <Text style={styles.subjectName}>{item.name}</Text>
        <View style={styles.subjectDetails}>
          <Text style={styles.subjectMarks}>Marks: {item.marks}</Text>
          <Text style={styles.subjectGrade}>Grade: {item.grade}</Text>
          <Text style={[styles.subjectStatus, item.status === 'Pass' ? styles.statusPass : styles.statusFail]}>
            {item.status}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => removeSubject(item.id)}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
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
        <Text style={styles.headerTitle}>Post Results</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Result Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Semester</Text>
            <View style={styles.inputRow}>
              {['1', '2', '3', '4', '5', '6'].map((sem) => (
                <TouchableOpacity
                  key={sem}
                  style={[styles.semesterBtn, semester === sem && styles.semesterBtnActive]}
                  onPress={() => setSemester(sem)}
                >
                  <Text style={[styles.semesterBtnText, semester === sem && styles.semesterBtnTextActive]}>
                    Sem {sem}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Exam Type</Text>
            <View style={styles.inputRow}>
              {['Semester', 'Mid', 'Final'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeBtn, examType === type && styles.typeBtnActive]}
                  onPress={() => setExamType(type)}
                >
                  <Text style={[styles.typeBtnText, examType === type && styles.typeBtnTextActive]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Month & Year</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Dec 2024"
              value={month}
              onChangeText={setMonth}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>SGPA</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00 - 10.00"
              value={sgpa}
              onChangeText={setSgpa}
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Upload Result Image Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Result Image (Optional)</Text>
          
          {resultImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: resultImage }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={handleRemoveImage}
              >
                <Text style={styles.removeImageBtnText}>Remove Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadImageBtn}
              onPress={handlePickImage}
            >
              <Text style={styles.uploadImageIcon}>📸</Text>
              <Text style={styles.uploadImageText}>Upload Result Image</Text>
              <Text style={styles.uploadImageSubtext}>Optional - Students can download</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Add Subject Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Subjects</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Subject Code</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., USIT401"
              value={subjectCode}
              onChangeText={setSubjectCode}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Subject Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Advanced Java"
              value={subjectName}
              onChangeText={setSubjectName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Marks (0-100)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 85"
              value={marks}
              onChangeText={setMarks}
              keyboardType="number-pad"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Grade</Text>
            <View style={styles.gradeGrid}>
              {gradeOptions.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.gradeBtn, grade === g && styles.gradeBtnActive]}
                  onPress={() => setGrade(g)}
                >
                  <Text style={[styles.gradeBtnText, grade === g && styles.gradeBtnTextActive]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={addSubject}>
            <Text style={styles.addBtnText}>+ Add Subject</Text>
          </TouchableOpacity>
        </View>

        {/* Subjects List */}
        {subjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subjects ({subjects.length})</Text>
            <FlatList
              data={subjects}
              renderItem={renderSubject}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Post Button */}
        <TouchableOpacity style={styles.postBtn} onPress={handlePostResult}>
          <Text style={styles.postBtnText}>Post Results</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1a1a2e',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  semesterBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
  },
  semesterBtnActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  semesterBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  semesterBtnTextActive: {
    color: '#fff',
  },
  typeBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
  },
  typeBtnActive: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  typeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  typeBtnTextActive: {
    color: '#fff',
  },
  gradeGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  gradeBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: '22%',
    alignItems: 'center',
  },
  gradeBtnActive: {
    backgroundColor: '#ec4899',
    borderColor: '#ec4899',
  },
  gradeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  gradeBtnTextActive: {
    color: '#fff',
  },
  addBtn: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  subjectItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectCode: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    marginBottom: 2,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  subjectDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  subjectMarks: {
    fontSize: 11,
    color: '#666',
  },
  subjectGrade: {
    fontSize: 11,
    color: '#666',
  },
  subjectStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusPass: {
    color: '#10b981',
  },
  statusFail: {
    color: '#ff3b30',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 18,
    color: '#ff3b30',
    fontWeight: '700',
  },
  postBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  postBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  uploadImageBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  uploadImageIcon: {
    fontSize: 40,
  },
  uploadImageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  uploadImageSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  imagePreviewContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  removeImageBtn: {
    backgroundColor: '#fee2e2',
    paddingVertical: 10,
    alignItems: 'center',
  },
  removeImageBtnText: {
    color: '#ff3b30',
    fontWeight: '600',
    fontSize: 14,
  },
});
