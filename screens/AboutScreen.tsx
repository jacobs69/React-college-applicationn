import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BottomNav from '../components/BottomNav';

interface AboutScreenProps {
  onLogout: () => void;
  onNavigate: (page: string, data?: any) => void;
  currentUser?: any;
}

export default function AboutScreen({ onLogout, onNavigate, currentUser }: AboutScreenProps) {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentDashboard')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About SASMIRA</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* College Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/sas.jpg')}
            style={styles.collegeImage}
            resizeMode="cover"
          />
        </View>

        {/* College Name */}
        <View style={styles.section}>
          <Text style={styles.collegeName}>SASMIRA College of Commerce and Science</Text>
          <Text style={styles.subtitle}>The Synthetic & Art Silk Mills' Research Association</Text>
        </View>

        {/* History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our History</Text>
          <Text style={styles.description}>
            The Synthetic & Art Silk Mills' Research Association (SASMIRA) Linked to the Ministry of Textile, Govt. of India was established on 12th January 1950 under Registration No. 2505 of 1949-1950 granted under Societies Act XXI of 1860.
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.description}>
            SASMIRA is a cooperative venture set up by the Man-Made Textile industry of India after independence as a multi-functional institute to serve its scientific and technological needs.
          </Text>
        </View>

        {/* Milestone Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Golden Jubilee</Text>
          <Text style={styles.description}>
            SASMIRA entered into its golden jubilee in the year 2000 AD, coinciding with the new millennium, marking 50 years of excellence and contribution to education and research.
          </Text>
        </View>

        {/* Campus Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Campus</Text>
          <View style={styles.campusCard}>
            <Text style={styles.campusIcon}>🏢</Text>
            <View style={styles.campusContent}>
              <Text style={styles.campusTitle}>Worli, Mumbai</Text>
              <Text style={styles.campusDescription}>
                The landmark building of SASMIRA at Worli is in the heart of the city of Mumbai. The imposing building covering nearly 12,000 sq.mts. of area was conceived as far back as in 1950, and completed in 1958.
              </Text>
            </View>
          </View>
        </View>

        {/* Key Facts Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Facts</Text>
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>📅</Text>
            <View>
              <Text style={styles.factTitle}>Established</Text>
              <Text style={styles.factValue}>12th January 1950</Text>
            </View>
          </View>
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>📋</Text>
            <View>
              <Text style={styles.factTitle}>Registration</Text>
              <Text style={styles.factValue}>No. 2505 of 1949-1950</Text>
            </View>
          </View>
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>🏛️</Text>
            <View>
              <Text style={styles.factTitle}>Campus Area</Text>
              <Text style={styles.factValue}>Nearly 12,000 sq.mts.</Text>
            </View>
          </View>
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>🎓</Text>
            <View>
              <Text style={styles.factTitle}>Building Completed</Text>
              <Text style={styles.factValue}>1958</Text>
            </View>
          </View>
        </View>

        {/* Vision Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.description}>
            To be a leading institution providing quality education in commerce and science, fostering innovation, research, and excellence while maintaining strong ties with the textile industry and contributing to national development.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactIcon}>📍</Text>
            <Text style={styles.contactText}>Worli, Mumbai, India</Text>
          </View>
          <View style={styles.contactCard}>
            <Text style={styles.contactIcon}>🌐</Text>
            <Text style={styles.contactText}>Ministry of Textile, Govt. of India</Text>
          </View>
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
          } else if (page === 'idcard') {
            onNavigate('idcard');
          } else if (page === 'fees') {
            onNavigate('studentFees');
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backBtn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
  imageContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collegeImage: {
    width: '100%',
    height: 240,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  lastSection: {
    marginBottom: 24,
  },
  collegeName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    textAlign: 'justify',
  },
  campusCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  campusIcon: {
    fontSize: 32,
  },
  campusContent: {
    flex: 1,
  },
  campusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  campusDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  factCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  factIcon: {
    fontSize: 24,
  },
  factTitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  factValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactIcon: {
    fontSize: 20,
  },
  contactText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
});
