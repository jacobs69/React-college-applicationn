import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, Alert, TextInput } from 'react-native';

interface AdminGalleryScreenProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  albums?: any[];
  setAlbums?: (albums: any[]) => void;
  currentUser?: any;
}

export default function AdminGalleryScreen({ onLogout, onNavigate, albums = [], setAlbums, currentUser }: AdminGalleryScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cultural');
  const [date, setDate] = useState('');
  const [imageCount, setImageCount] = useState(3);

  const categories = ['Cultural', 'Tech Fest', 'Sports', 'Other'];

  const categoryColors: { [key: string]: string } = {
    Cultural: '9333EA',
    'Tech Fest': '2563EB',
    Sports: 'EA580C',
    Other: '4B5563',
  };

  const handlePublishAlbum = () => {
    if (!title.trim() || !date.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const color = categoryColors[category] || '1F2937';
    const cover = `https://placehold.co/600x400/${color}/FFFFFF?text=${title.replace(/ /g, '+')}`;
    const images = [];

    for (let i = 1; i <= imageCount; i++) {
      images.push(`https://placehold.co/400x400/${color}/FFFFFF?text=Pic+${i}`);
    }

    const newAlbum = {
      id: Date.now(),
      title,
      category,
      date,
      cover,
      images,
    };

    if (setAlbums) {
      setAlbums([newAlbum, ...albums]);
    }

    setTitle('');
    setDate('');
    setCategory('Cultural');
    setImageCount(3);
    setShowForm(false);
    Alert.alert('Success', 'Album published successfully');
  };

  const handleDeleteAlbum = (id: number) => {
    Alert.alert('Delete Album', 'Are you sure you want to delete this album?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: () => {
          if (setAlbums) {
            setAlbums(albums.filter((album) => album.id !== id));
          }
          Alert.alert('Success', 'Album deleted successfully');
        },
      },
    ]);
  };

  const renderAlbumCard = ({ item }: any) => (
    <View style={styles.albumCard}>
      <Image source={{ uri: item.cover }} style={styles.cover} />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <View style={styles.albumMeta}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.imageCount}>{item.images?.length || 0} photos</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDeleteAlbum(item.id)}
      >
        <Text style={styles.deleteBtnText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('adminDashboard')}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gallery Management</Text>
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Publish Button */}
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.publishBtnIcon}>➕</Text>
          <Text style={styles.publishBtnText}>{showForm ? 'Cancel' : 'Post New Album'}</Text>
        </TouchableOpacity>

        {/* Form Section */}
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Create New Album</Text>

            <TextInput
              style={styles.input}
              placeholder="Album Title"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
              placeholderTextColor="#999"
            />

            {/* Category Selection */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryRow}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryBtn,
                    category === cat && styles.categoryBtnActive,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === cat && styles.categoryTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Image Count */}
            <Text style={styles.label}>Number of Photos: {imageCount}</Text>
            <View style={styles.sliderRow}>
              <TouchableOpacity
                style={styles.sliderBtn}
                onPress={() => setImageCount(Math.max(1, imageCount - 1))}
              >
                <Text style={styles.sliderText}>−</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sliderBtn}
                onPress={() => setImageCount(Math.min(10, imageCount + 1))}
              >
                <Text style={styles.sliderText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handlePublishAlbum}
            >
              <Text style={styles.submitBtnText}>Publish Album</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Albums List */}
        <Text style={styles.sectionTitle}>Recent Albums</Text>
        {albums.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📸</Text>
            <Text style={styles.emptyText}>No albums yet</Text>
            <Text style={styles.emptySubtext}>Create your first album to get started</Text>
          </View>
        ) : (
          <FlatList
            data={albums}
            renderItem={renderAlbumCard}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  publishBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  publishBtnIcon: {
    fontSize: 18,
    color: '#fff',
  },
  publishBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#1a1a2e',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryBtnActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sliderRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  sliderBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sliderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  submitBtn: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 12,
  },
  albumCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cover: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  albumInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  albumMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  category: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '600',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
  imageCount: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnText: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
  },
});
