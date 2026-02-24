import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import BottomNav from '../components/BottomNav';

interface IDCardScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export default function IDCardScreen({ onLogout, onNavigate }: IDCardScreenProps) {
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
      <View style={styles.cardContainer}>
        {/* ID Card */}
        <View style={styles.card}>
          {/* Top Banner */}
          <View style={styles.banner}>
            {/* Profile Image */}
            <View style={styles.profileImageWrapper}>
              <Image
                source={{ uri: 'https://placehold.co/100x100/3B82F6/FFFFFF?text=JK' }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* Card Details */}
          <View style={styles.cardDetails}>
            <Text style={styles.studentName}>Jai Kantharia</Text>
            <Text style={styles.studentInfo}>Computer Science • Semester 4</Text>

            {/* Info Rows */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>ID Number</Text>
                <Text style={styles.infoValue}>B20232637</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Department</Text>
                <Text style={styles.infoValue}>Computer Science</Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>jai@college.edu</Text>
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
      </View>

      {/* Bottom Navigation */}
      <BottomNav
        role="student"
        active={activeNav}
        unreadCount={0}
        onNavigate={(page) => {
          setActiveNav(page);
          if (page === 'home') {
            onNavigate('studentDashboard');
          } else if (page === 'notifications') {
            onNavigate('notifications');
          } else if (page === 'fees') {
            onNavigate('fees');
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
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  headerSpacer: {
    width: 40,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    marginBottom: 20,
  },
  banner: {
    height: 100,
    backgroundColor: '#3b82f6',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  profileImageWrapper: {
    position: 'absolute',
    bottom: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  studentName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  studentInfo: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: 20,
  },
  infoSection: {
    width: '100%',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  barcodeContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  barcode: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    color: '#999',
    fontWeight: '600',
  },
  issueDate: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  cardInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  cardInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cardInfoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  cardInfoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  statusBadge: {
    backgroundColor: '#d1fae5',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10b981',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnIcon: {
    fontSize: 20,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
