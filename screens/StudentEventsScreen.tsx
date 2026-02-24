import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';

interface StudentEventsScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  events?: any[];
  currentUser?: any;
}

export default function StudentEventsScreen({ onLogout, onNavigate, events = [], currentUser }: StudentEventsScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');

  const eventTypes = [
    { id: 'all', label: 'All', icon: '📅' },
    { id: 'exam', label: 'Exams', icon: '📝' },
    { id: 'seminar', label: 'Seminars', icon: '🎤' },
    { id: 'workshop', label: 'Workshops', icon: '🛠️' },
    { id: 'event', label: 'Events', icon: '🎉' },
    { id: 'meeting', label: 'Meetings', icon: '👥' },
  ];

  // Filter events by semester and type
  const filteredEvents = (() => {
    let filtered = events.filter((e) => e.semester === currentUser?.semester);
    if (selectedType !== 'all') {
      filtered = filtered.filter((e) => e.type === selectedType);
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  })();

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return '📝';
      case 'seminar':
        return '🎤';
      case 'workshop':
        return '🛠️';
      case 'meeting':
        return '👥';
      default:
        return '📅';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam':
        return '#fef3c7';
      case 'seminar':
        return '#f3e8ff';
      case 'workshop':
        return '#fce7f3';
      case 'meeting':
        return '#dbeafe';
      default:
        return '#e0f2fe';
    }
  };

  const renderEventCard = ({ item }: any) => (
    <View style={styles.eventCard}>
      <View style={[styles.eventIconBox, { backgroundColor: getEventColor(item.type) }]}>
        <Text style={styles.eventIcon}>{getEventIcon(item.type)}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <View style={styles.eventMeta}>
          <Text style={styles.eventMetaItem}>📅 {item.date}</Text>
          <Text style={styles.eventMetaItem}>🕐 {item.time}</Text>
        </View>
        <View style={styles.eventMeta}>
          <Text style={styles.eventMetaItem}>📍 {item.location}</Text>
          <Text style={styles.eventMetaItem}>👤 {item.postedBy}</Text>
        </View>
      </View>
      <View style={[styles.typeBadge, { backgroundColor: getEventColor(item.type) }]}>
        <Text style={styles.typeBadgeText}>{item.type}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentDashboard')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Events</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuOpen(!menuOpen)}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
          {menuOpen && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
                <Text style={styles.menuItemIcon}>⚙️</Text>
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpen(false); }}>
                <Text style={styles.menuItemIcon}>❓</Text>
                <Text style={styles.menuItemText}>Help</Text>
              </TouchableOpacity>
              <View style={styles.menuDivider} />
              <TouchableOpacity style={[styles.menuItem, styles.logoutMenuItem]} onPress={() => { setMenuOpen(false); onLogout(); }}>
                <Text style={styles.menuItemIcon}>🚪</Text>
                <Text style={[styles.menuItemText, styles.logoutMenuText]}>Log Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Type Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
        style={styles.filterContainer}
      >
        {eventTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.filterBtn,
              selectedType === type.id && styles.filterBtnActive,
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <Text style={styles.filterIcon}>{type.icon}</Text>
            <Text
              style={[
                styles.filterLabel,
                selectedType === type.id && styles.filterLabelActive,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No events found</Text>
          <Text style={styles.emptySubtext}>
            {selectedType === 'all'
              ? 'No events scheduled for your semester'
              : `No ${selectedType} events scheduled`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Event Count */}
      {filteredEvents.length > 0 && (
        <View style={styles.countFooter}>
          <Text style={styles.countText}>
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
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
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  menuContainer: {
    position: 'relative',
  },
  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#1a1a2e',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  logoutMenuItem: {
    backgroundColor: '#fff5f5',
  },
  menuItemIcon: {
    fontSize: 18,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a2e',
  },
  logoutMenuText: {
    color: '#ff3b30',
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    height: 34,
  },
  filterScroll: {
    paddingHorizontal: 12,
    paddingVertical: 0,
    gap: 6,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    height: 32,
  },
  filterBtnActive: {
    backgroundColor: '#3b82f6',
  },
  filterIcon: {
    fontSize: 14,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  filterLabelActive: {
    color: '#fff',
  },
  listContent: {
    padding: 8,
    paddingBottom: 100,
  },
  eventCard: {
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
  eventIconBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventIcon: {
    fontSize: 28,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  eventMetaItem: {
    fontSize: 11,
    color: '#999',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1a1a2e',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  countFooter: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
});
