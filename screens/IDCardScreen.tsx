import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import BottomNav from '../components/BottomNav';
import { scale, fontSize, spacing, padding, borderRadius, iconSize } from '../utils/responsive';

interface IDCardScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentUser?: any;
}

export default function IDCardScreen({ onLogout, onNavigate, currentUser }: IDCardScreenProps) {
  const [activeNav, setActiveNav] = useState('idcard');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentDashboard')} style={styles.backBtn}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Digital ID Card</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Card Container */}
      <ScrollView style={styles.cardContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* ID Card */}
        <View style={styles.card}>
          {/* Top Banner */}
          <View style={styles.banner}>
            {/* Profile Image */}
            <View style={styles.profileImageWrapper}>
              <Image
                source={{ uri: `https://placehold.co/100x100/3B82F6/FFFFFF?text=${(currentUser?.name || 'JK').split(' ').map((n: string) => n[0]).join('')}` }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* Card Details */}
          <View style={styles.cardDetails}>
            <Text style={styles.studentName}>{currentUser?.name || 'Jai Kantharia'}</Text>
            <Text style={styles.studentInfo}>{currentUser?.course || 'Computer Science'} • Semester {currentUser?.semester || 4}</Text>

            {/* Info Rows */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>ID Number</Text>
                <Text style={styles.infoValue}>{currentUser?.id || 'B20232637'}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Department</Text>
                <Text style={styles.infoValue}>{currentUser?.department || 'Computer Science'}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{currentUser?.email || 'student@college.edu'}</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Valid Thru</Text>
                <Text style={styles.infoValue}>May 2026</Text>
              </View>
            </View>

            {/* Barcode */}
            <View style={styles.barcodeContainer}>
              <Text style={styles.barcode}>||| |||| || ||||| |||| ||</Text>
            </View>

            {/* Issue Date */}
            <Text style={styles.issueDate}>Issued: May 2023</Text>
          </View>
        </View>

        {/* Card Info */}
        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoTitle}>📋 Card Information</Text>
          <View style={styles.cardInfoItem}>
            <Text style={styles.cardInfoLabel}>Status:</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          <View style={styles.cardInfoItem}>
            <Text style={styles.cardInfoLabel}>Type:</Text>
            <Text style={styles.cardInfoValue}>Student ID</Text>
          </View>
          <View style={styles.cardInfoItem}>
            <Text style={styles.cardInfoLabel}>Issued:</Text>
            <Text style={styles.cardInfoValue}>May 2023</Text>
          </View>
          <View style={styles.cardInfoItem}>
            <Text style={styles.cardInfoLabel}>Expires:</Text>
            <Text style={styles.cardInfoValue}>May 2026</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>🖨️</Text>
            <Text style={styles.actionBtnText}>Print</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>📥</Text>
            <Text style={styles.actionBtnText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>📤</Text>
            <Text style={styles.actionBtnText}>Share</Text>
          </TouchableOpacity>
        </View>
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
          } else if (page === 'profile') {
            onNavigate('profile');
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    paddingTop: padding.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backBtn: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    fontSize: fontSize['2xl'],
    color: '#3b82f6',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  headerSpacer: {
    width: scale(40),
  },
  cardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: padding.lg,
    paddingVertical: spacing.lg,
    paddingBottom: scale(120),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    marginBottom: spacing['2xl'],
  },
  banner: {
    height: scale(100),
    backgroundColor: '#3b82f6',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: scale(40),
  },
  profileImageWrapper: {
    position: 'absolute',
    bottom: scale(-40),
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: 4,
    borderColor: '#fff',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cardDetails: {
    paddingTop: scale(50),
    paddingHorizontal: padding.lg,
    paddingBottom: padding.lg,
    alignItems: 'center',
  },
  studentName: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: spacing.xs,
  },
  studentInfo: {
    fontSize: fontSize.sm,
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: spacing.lg,
  },
  infoSection: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    color: '#999',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  barcodeContainer: {
    width: '100%',
    height: scale(50),
    backgroundColor: '#f0f0f0',
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  barcode: {
    fontFamily: 'monospace',
    fontSize: fontSize.xs,
    letterSpacing: 2,
    color: '#999',
    fontWeight: '600',
  },
  issueDate: {
    fontSize: fontSize.xs,
    color: '#999',
    fontStyle: 'italic',
  },
  cardInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: borderRadius.lg,
    padding: padding.lg,
    marginBottom: spacing['2xl'],
  },
  cardInfoTitle: {
    fontSize: fontSize.base,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: spacing.md,
  },
  cardInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  cardInfoLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: '#666',
  },
  cardInfoValue: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  statusBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: borderRadius.md,
    paddingHorizontal: padding.md,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: '#10b981',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: borderRadius.lg,
    paddingVertical: padding.md,
    alignItems: 'center',
    gap: spacing.sm,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnIcon: {
    fontSize: iconSize.md,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
});
