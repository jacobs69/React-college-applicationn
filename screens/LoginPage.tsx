import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function LoginPage({
  onLogin,
  onGoToRegister,
}: {
  onLogin: (role: string) => void;
  onGoToRegister: () => void;
}) {
  const [role, setRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const roles = [
    { id: 'student', label: 'Student', icon: '👨‍🎓' },
    { id: 'teacher', label: 'Teacher', icon: '👨‍🏫' },
    { id: 'admin', label: 'Admin', icon: '👨‍💼' },
  ];

  const handleIdentifierChange = (text: string) => {
    const wasNotComplete = identifier.length !== 9;
    setIdentifier(text);
    
    // For student: auto-focus when ID is exactly 9 characters
    if (role === 'student' && wasNotComplete && text.length === 9) {
      setTimeout(() => {
        passwordInputRef.current?.focus();
        scrollViewRef.current?.scrollTo({ y: 150, animated: true });
      }, 50);
    }
    // For teacher/admin: auto-focus when email contains @
    else if ((role === 'teacher' || role === 'admin') && text.includes('@') && !identifier.includes('@')) {
      setTimeout(() => {
        passwordInputRef.current?.focus();
        scrollViewRef.current?.scrollTo({ y: 150, animated: true });
      }, 50);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🔐</Text>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.roleContainer}>
          <Text style={styles.sectionLabel}>Select Role</Text>
          <View style={styles.roleGrid}>
            {roles.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[styles.roleCard, role === r.id && styles.roleCardActive]}
                onPress={() => setRole(r.id)}
              >
                <Text style={styles.roleIcon}>{r.icon}</Text>
                <Text style={[styles.roleLabel, role === r.id && styles.roleLabelActive]}>{r.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{role === 'student' ? 'Student ID' : 'Email'}</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>{role === 'student' ? '🆔' : '📧'}</Text>
              <TextInput
                style={styles.input}
                placeholder={role === 'student' ? 'B20232637' : 'your@email.com'}
                placeholderTextColor="#999"
                value={identifier}
                onChangeText={handleIdentifierChange}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                ref={passwordInputRef}
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={() => onLogin(role)}>
            <Text style={styles.loginBtnText}>Sign In</Text>
            <Text style={styles.loginBtnArrow}>→</Text>
          </TouchableOpacity>

          {role === 'student' && (
            <TouchableOpacity onPress={onGoToRegister} style={styles.registerContainer}>
              <Text style={styles.registerText}>
                New here? <Text style={styles.registerLink}>Activate Account</Text>
              </Text>
            </TouchableOpacity>
          )}
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
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  headerIcon: {
    fontSize: 60,
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
  roleContainer: {
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roleGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  roleCard: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    gap: 8,
  },
  roleCardActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  roleIcon: {
    fontSize: 28,
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  roleLabelActive: {
    color: '#fff',
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
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a2e',
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginBtn: {
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
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginBtnArrow: {
    color: '#fff',
    fontSize: 18,
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#3b82f6',
    fontWeight: '700',
  },
});
