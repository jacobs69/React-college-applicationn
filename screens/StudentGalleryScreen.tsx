import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, Alert } from 'react-native';

interface StudentGalleryScreenProps {
  onLogout: () => void;
  onNavigate: (page: string, data?: any) => void;
  albums?: any[];
}

export default function StudentGalleryScreen({ onLogout, onNavigate, albums = [] }: StudentGalleryScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: '📸' },
    { id: 'Cultural', label: 'Cultural', icon: '🎭' },
    { id: 'Tech Fest', label: 'Tech Fest', icon: '💻' },
    { id: 'Sports', label: 'Sports', icon: '⚽' },
    { id: 'Other', label: 'Other', icon: '📷' },
  ];

  const filteredAlbums = selectedCategory === 'all'
    ? albums
    : albums.filter((album) => album.category === selectedCategory);

  const renderAlbumCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.albumCard}
      onPress={() => onNavigate('albumDetail', item)}
    >
      <Image source={{ uri: item.cover }} style={styles.cover} />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <View style={styles.albumMeta}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.imageCount}>{item.images?.length || 0} photos</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('studentDashboard')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campus Gallery</Text>
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

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
        style={styles.categoryContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryBtn,
              selectedCategory === cat.id && styles.categoryBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={[styles.categoryLabel, selectedCategory === cat.id && styles.categoryLabelActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Albums List */}
      {filteredAlbums.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📸</Text>
          <Text style={styles.emptyText}>No albums yet</Text>
          <Text style={styles.emptySubtext}>Check back soon for new gallery updates</Text>
        </View>
      ) : (
        <FlatList
          data={filteredAlbums}
          renderItem={renderAlbumCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.galleryContent}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
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
  categoryContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryBtnActive: {
    backgroundColor: '#3b82f6',
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryLabelActive: {
    color: '#fff',
  },
  galleryContent: {
    padding: 16,
    paddingBottom: 100,
  },
  albumCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cover: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  albumInfo: {
    padding: 12,
  },
  albumTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  albumMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  category: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
  imageCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
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
});
