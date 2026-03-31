import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';

export default function RegisterPage({ onBackToLogin }: { onBackToLogin: () => void }) {
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={onBackToLogin}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Image
            source={require('../assets/images/CLGlogo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Activate Account</Text>
          <Text style={styles.headerSubtitle}>Create your student account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Student ID</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🆔</Text>
              <TextInput
                style={styles.input}
                placeholder="B20232637"
                placeholderTextColor="#999"
                value={studentId}
                onChangeText={setStudentId}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={require('../assets/images/email.png')}
                style={styles.emailIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="your@college.edu"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={require('../assets/images/Lock.png')}
                style={styles.lockIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={require('../assets/images/Lock.png')}
                style={styles.lockIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.activateBtn} onPress={onBackToLogin}>
            <Text style={styles.activateBtnText}>Activate Account</Text>
            <Text style={styles.activateBtnArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerLogo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    height: 50,
    gap: 10,
  },
  inputIcon: {
    fontSize: 18,
  },
  lockIcon: {
    width: 20,
    height: 20,
  },
  emailIcon: {
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a2e',
  },
  activateBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  activateBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  activateBtnArrow: {
    color: '#fff',
    fontSize: 18,
  },
});
